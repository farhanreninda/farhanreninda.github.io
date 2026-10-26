import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';

test('GarasiKu has a self-contained Pages entry, valid local destinations, and captions', async () => {
  const html = await readFile(new URL('../public/garasiku/index.html', import.meta.url), 'utf8');
  assert.match(html, /<html lang="id">/);
  assert.match(html, /rel="canonical" href="https:\/\/farhanreninda\.my\.id\/garasiku\/"/);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length, 'Page IDs must be unique');
  for (const [, destination] of html.matchAll(/(?:href|src|poster)="([^"]+)"/g)) {
    if (destination.startsWith('#')) assert.ok(ids.includes(destination.slice(1)), destination);
    if (destination.startsWith('/garasiku/')) {
      const asset = new URL(`../public${destination}`, import.meta.url);
      assert.ok((await stat(asset)).size > 0, destination);
    }
  }
  assert.equal((html.match(/data-feature=/g) || []).length, 5);
  assert.match(html, /preload="none"/);
  const captions = await readFile(new URL('../public/garasiku/assets/demo-id.vtt', import.meta.url), 'utf8');
  assert.match(captions, /^WEBVTT\r?\n/);
  assert.ok((captions.match(/-->/g) || []).length > 20);
});
