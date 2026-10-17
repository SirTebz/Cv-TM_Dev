// Footer year: updates automatically every new year (2026, 2027, ...)
document.getElementById('year').textContent = new Date().getFullYear();

// Live local time for Bloemfontein (South Africa Standard Time)
const clock = document.getElementById('clock');
function tick() {
  clock.textContent = new Intl.DateTimeFormat('en-ZA', {
    hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Africa/Johannesburg'
  }).format(new Date());
}
tick();
setInterval(tick, 30000);

// Theme toggle (remembers choice when storage is available)
const root = document.documentElement;
try {
  const saved = localStorage.getItem('theme');
  if (saved) root.dataset.theme = saved;
} catch (e) {}
document.getElementById('theme').addEventListener('click', () => {
  const isDark = root.dataset.theme
    ? root.dataset.theme === 'dark'
    : matchMedia('(prefers-color-scheme: dark)').matches;
  const next = isDark ? 'light' : 'dark';
  root.dataset.theme = next;
  try { localStorage.setItem('theme', next); } catch (e) {}
});

// Highlight the current section in the side navigation
const links = [...document.querySelectorAll('.nav a')];
const io = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id));
    }
  });
}, { rootMargin: '-30% 0px -60% 0px' });
document.querySelectorAll('main section').forEach(s => io.observe(s));
