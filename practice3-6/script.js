// Все настройки темы хранятся только в браузере. Сервер не нужен.
const root = document.documentElement;
const themeSwitcher = document.querySelector('.theme-switcher');
const toggle = document.querySelector('.theme-toggle');
const options = document.querySelector('.theme-options');
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
const themeButtons = document.querySelectorAll('[data-theme]');
let theme = 'system';

try {
  const saved = localStorage.getItem('ocean-landing-theme');
  if (['light', 'dark', 'system'].includes(saved)) theme = saved;
} catch {
  // При открытии файла напрямую браузер может запретить localStorage.
}

function applyTheme() {
  root.classList.toggle('dark', theme === 'dark' || (theme === 'system' && systemTheme.matches));
  themeButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.theme === theme)));
}

function closeOptions() {
  options.hidden = true;
  toggle.setAttribute('aria-expanded', 'false');
}

applyTheme();
themeSwitcher.hidden = false;
systemTheme.addEventListener('change', applyTheme);

toggle.addEventListener('click', () => {
  options.hidden = !options.hidden;
  toggle.setAttribute('aria-expanded', String(!options.hidden));
});

themeButtons.forEach(button => button.addEventListener('click', () => {
  theme = button.dataset.theme;
  try { localStorage.setItem('ocean-landing-theme', theme); } catch { /* Тема работает и без сохранения. */ }
  applyTheme();
  closeOptions();
  toggle.focus();
}));

document.addEventListener('click', event => {
  if (!themeSwitcher.contains(event.target)) closeOptions();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !options.hidden) {
    closeOptions();
    toggle.focus();
  }
});

const navbar = document.querySelector('.navbar');
function updateNavbar() { navbar.classList.toggle('scrolled', window.scrollY > 10); }
window.addEventListener('scroll', updateNavbar, { passive: true });
updateNavbar();
