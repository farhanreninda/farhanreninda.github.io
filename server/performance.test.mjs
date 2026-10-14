import test from 'node:test';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { readFile } from 'node:fs/promises';
import { build } from 'esbuild';
import { parse, compileScript } from '@vue/compiler-sfc';
import { ref, reactive, effectScope, nextTick } from 'vue';
import { navigateNatural } from '../src/components/naturalNavigation.ts';

test('Metadata follows CMS revisions and route changes without creating duplicate tags', async () => {
  const savedDocument = globalThis.document;
  const tags = [{ attributes: { name: 'description', content: 'Old' }, setAttribute(key, value) { this.attributes[key] = value; } }];
  const scope = effectScope();
  const copy = ref({ app: { description: 'Description ID', ogTitle: 'Title ID', ogDescription: 'Share ID' }, notFound: { title: '404 ID' } });
  const route = reactive({ meta: { admin: false }, name: 'home' });
  globalThis.__metaFixture = { copy, route };
  globalThis.document = {
    head: { querySelector(selector) { const [, attribute, name] = selector.match(/\[(\w+)="([^"]+)"\]/); return tags.find(tag => tag.attributes[attribute] === name); }, append(tag) { tags.push(tag); } },
    createElement(name) { assert.equal(name, 'meta'); return { attributes: {}, setAttribute(key, value) { this.attributes[key] = value; } }; },
  };
  try {
    const { descriptor } = parse(await readFile(new URL('../src/app/App.vue', import.meta.url), 'utf8'));
    const script = compileScript(descriptor, { id: 'metadata-test' });
    const mocks = {
      vue: 'export { defineComponent, watchEffect, nextTick } from "vue"; export const onMounted = () => {};',
      'vue-router': 'export const useRoute = () => globalThis.__metaFixture.route;',
      '@/composables/useLocale': 'export const useLocale = () => ({ copy: globalThis.__metaFixture.copy });',
      '@/composables/usePortfolio': 'export const usePortfolio = () => ({ natural: false });',
      '@/composables/useTheme': 'export const useTheme = () => {};',
    };
    const bundle = await build({ stdin: { contents: script.content, loader: 'ts' }, bundle: true, format: 'esm', write: false,
      plugins: [{ name: 'metadata-fixture', setup(builder) {
        builder.onResolve({ filter: /.*/ }, args => args.path === 'vue' && args.namespace === 'fixture'
          ? { path: import.meta.resolve('vue'), external: true } : { path: args.path, namespace: 'fixture' });
        builder.onLoad({ filter: /.*/, namespace: 'fixture' }, args => ({ contents: mocks[args.path] || 'export default {};', loader: 'js' }));
      } }],
    });
    const component = (await import('data:text/javascript;base64,' + Buffer.from(bundle.outputFiles[0].text).toString('base64'))).default;
    scope.run(() => component.setup({}, { expose() {} }));
    assert.equal(document.title, 'Title ID');
    assert.equal(tags.length, 4);
    copy.value = { app: { description: 'Description EN', ogTitle: 'Title EN', ogDescription: 'Share EN' }, notFound: { title: '404 EN' } };
    await nextTick();
    assert.equal(document.title, 'Title EN');
    assert.equal(tags[0].attributes.content, 'Description EN');
    assert.equal(tags.find(tag => tag.attributes.property === 'og:description').attributes.content, 'Share EN');
    route.meta.admin = true;
    await nextTick();
    assert.equal(document.title, 'Admin Portfolio');
    route.meta.admin = false;
    route.name = 'not-found';
    await nextTick();
    assert.equal(document.title, '404 EN');
    assert.equal(tags.length, 4);
  } finally { scope.stop(); globalThis.document = savedDocument; delete globalThis.__metaFixture; }
});

test('Public content keeps both transports and HTTP errors, while GitHub admin stays authenticated', async () => {
  const savedFetch = globalThis.fetch;
  try {
    for (const mode of ['github', 'local']) {
      const bundle = await build({ entryPoints: [fileURLToPath(new URL('../src/cms/api.ts', import.meta.url))],
        bundle: true, format: 'esm', platform: 'browser', write: false,
        define: { 'import.meta.env': JSON.stringify({ VITE_CMS_MODE: mode }) } });
      const api = await import('data:text/javascript;base64,' + Buffer.from(bundle.outputFiles[0].text).toString('base64'));
      const signal = new AbortController().signal;
      globalThis.fetch = async (url, options) => {
        assert.equal(url, mode === 'github' ? '/cms/content.json' : '/api/content');
        assert.equal(options.signal, signal);
        return new Response(JSON.stringify({ revision: 7 }), { headers: { 'Content-Type': 'application/json' } });
      };
      assert.deepEqual(await api.request('/content', { signal }), { revision: 7 });
      assert.equal(api.mediaUrl('/media/photo.webp'), '/media/photo.webp');
      globalThis.fetch = async () => new Response(JSON.stringify({ error: 'Unavailable' }), { status: 503 });
      await assert.rejects(api.request('/content'), error => error.status === 503);
      if (mode === 'github') await assert.rejects(api.request('/admin/session'), error => error.status === 401);
    }
  } finally { globalThis.fetch = savedFetch; }
});

test('Bootstrap overlaps content and route loading, retains a usable retry, and mounts only when both are ready', async () => {
  const content = Promise.withResolvers();
  const route = Promise.withResolvers();
  const calls = [];
  const root = { children: [], replaceChildren(...children) { this.children = children; } };
  const element = () => ({ style: {}, attributes: {}, children: [], setAttribute(key, value) { this.attributes[key] = value; }, append(child) { this.children.push(child); } });
  const saved = { document: globalThis.document, location: globalThis.location };
  globalThis.document = { getElementById: () => root, createElement: element };
  globalThis.location = { pathname: '/', origin: 'https://portfolio.example' };
  globalThis.__pageSpeedTest = {
    load: () => { calls.push('content'); return content.promise; },
    router: { isReady: () => { calls.push('route'); return route.promise; } },
    app: { use() {}, mount() { calls.push('mount'); } },
    refresh: () => calls.push('refresh'),
  };
  const mocks = {
    vue: 'export const createApp = () => globalThis.__pageSpeedTest.app;',
    '@/cms/githubPublic': 'export const githubMode = true;',
    './router': 'export const router = globalThis.__pageSpeedTest.router;',
    '@/composables/usePortfolio': 'export const loadPortfolio = () => globalThis.__pageSpeedTest.load(); export const setupPortfolioRefresh = () => globalThis.__pageSpeedTest.refresh();',
  };
  try {
    const bundle = await build({
      entryPoints: [fileURLToPath(new URL('../src/app/main.ts', import.meta.url))],
      bundle: true, format: 'esm', write: false, define: { 'import.meta.env': '{}' },
      plugins: [{ name: 'bootstrap-fixture', setup(builder) {
        builder.onResolve({ filter: /.*/ }, args => args.kind === 'entry-point' ? undefined : { path: args.path, namespace: 'fixture' });
        builder.onLoad({ filter: /.*/, namespace: 'fixture' }, args => ({ contents: mocks[args.path] || 'export default {};', loader: 'js' }));
      } }],
    });
    await import('data:text/javascript;base64,' + Buffer.from(bundle.outputFiles[0].text).toString('base64'));
    assert.deepEqual(calls, ['content', 'route']);
    assert.match(root.children[0].style.cssText, /position:fixed/);
    route.resolve();
    content.reject(new Error('Offline'));
    await new Promise(setImmediate);
    const message = root.children[0];
    assert.equal(message.attributes.role, 'alert');
    assert.equal(calls.includes('mount'), false);
    assert.equal(message.children[0].textContent, 'Coba lagi');
    const retryContent = Promise.withResolvers();
    globalThis.__pageSpeedTest.load = () => retryContent.promise;
    message.children[0].onclick();
    await new Promise(setImmediate);
    assert.equal(calls.includes('mount'), false);
    retryContent.resolve();
    await new Promise(setImmediate);
    assert.deepEqual(calls.slice(-2), ['mount', 'refresh']);
  } finally {
    globalThis.document = saved.document;
    globalThis.location = saved.location;
    delete globalThis.__pageSpeedTest;
  }
});

test('Natural anchors expand deferred sections before measuring, with native modifier clicks preserved', () => {
  const keys = ['document', 'history', 'window', 'getComputedStyle', 'matchMedia'];
  const saved = Object.fromEntries(keys.map(key => [key, globalThis[key]]));
  let expanded = false;
  let scroll;
  let prevented = false;
  const section = { getBoundingClientRect: () => { assert.equal(expanded, true); return { top: 1000, height: 400 }; } };
  const event = { button: 0, target: { closest: () => ({ getAttribute: () => '#skills' }) }, preventDefault() { prevented = true; } };
  try {
    globalThis.document = { getElementById: () => section, querySelector: selector => selector === '.natural-home'
      ? { classList: { add(name) { assert.equal(name, 'has-navigation'); expanded = true; } } }
      : { getBoundingClientRect: () => ({ bottom: 80 }) } };
    globalThis.history = { pushState(_state, _title, hash) { assert.equal(hash, '#skills'); assert.equal(expanded, true); } };
    globalThis.window = { innerHeight: 800, scrollY: 0, scrollTo(value) { scroll = value; } };
    globalThis.getComputedStyle = () => ({ paddingTop: '20px', paddingBottom: '20px' });
    globalThis.matchMedia = () => ({ matches: true });
    navigateNatural({ ...event, ctrlKey: true });
    assert.equal(expanded, false);
    assert.equal(prevented, false);
    navigateNatural(event);
    assert.equal(prevented, true);
    assert.deepEqual(scroll, { top: 760, behavior: 'instant' });
  } finally {
    for (const key of keys) globalThis[key] = saved[key];
  }
});
