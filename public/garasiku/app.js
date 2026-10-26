const root = document.documentElement;
const themeButton = document.querySelector('.theme-toggle');
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
let savedTheme;
try { savedTheme = localStorage.getItem('garasiku-theme'); } catch { /* Storage can be blocked by browser privacy settings. */ }
function applyTheme(dark) {
  root.dataset.theme = dark ? 'dark' : 'light';
  document.querySelector('meta[name="theme-color"]').content = dark ? '#101924' : '#f8fafc';
  themeButton.setAttribute('aria-label', dark ? 'Gunakan tema terang' : 'Gunakan tema gelap');
  themeButton.setAttribute('aria-pressed', String(dark));
}
applyTheme(savedTheme === 'dark' || (savedTheme !== 'light' && systemTheme.matches));
themeButton.hidden = false;
themeButton.addEventListener('click', () => {
  const dark = root.dataset.theme !== 'dark';
  savedTheme = dark ? 'dark' : 'light';
  applyTheme(dark);
  try { localStorage.setItem('garasiku-theme', savedTheme); } catch { /* Theme still works for this visit. */ }
});
systemTheme.addEventListener('change', event => { if (!savedTheme) applyTheme(event.matches); });

const choices = [...document.querySelectorAll('[data-feature]')];
const panels = [...document.querySelectorAll('.feature-panel')];
function selectFeature(id) {
  if (!panels.some(panel => panel.id === id)) return;
  panels.forEach(panel => { panel.hidden = panel.id !== id; });
  choices.forEach(choice => {
    const selected = choice.hash === `#${id}`;
    choice.classList.toggle('active', selected);
    if (selected) choice.setAttribute('aria-current', 'true');
    else choice.removeAttribute('aria-current');
  });
}
root.classList.add('js');
selectFeature(panels.some(panel => `#${panel.id}` === location.hash) ? location.hash.slice(1) : 'panel-beranda');
choices.forEach(choice => choice.addEventListener('click', event => {
  event.preventDefault();
  selectFeature(choice.hash.slice(1));
  history.replaceState(null, '', choice.hash);
}));
window.addEventListener('hashchange', () => selectFeature(location.hash.slice(1)));


const menuButton = document.querySelector('.menu-toggle');
const header = document.querySelector('.header');
function closeMenu() {
  header.dataset.menuOpen = 'false';
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Buka menu navigasi');
}
menuButton.hidden = false;
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  header.dataset.menuOpen = String(open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Tutup menu navigasi' : 'Buka menu navigasi');
});
header.querySelectorAll('nav a').forEach(link => link.addEventListener('click', closeMenu));
header.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuButton.focus();
  }
});
