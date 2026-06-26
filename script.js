/* ══════════════════════════════════════
   IKHSAN FADILLA — PORTFOLIO JAVASCRIPT
   script.js
   ══════════════════════════════════════ */

// ── TYPING EFFECT ──
const roles = ['App Designer', 'UI/UX Enthusiast', 'Desktop Developer', 'Creative Technologist'];
let roleIndex = 0, charIndex = 0, isDeleting = false;
const heroRoleEl = document.getElementById('heroRole');

function typeEffect() {
  const cur = roles[roleIndex];
  if (!isDeleting) {
    heroRoleEl.innerHTML = cur.slice(0, charIndex + 1) + '<span class="cursor"></span>';
    charIndex++;
    if (charIndex === cur.length) { isDeleting = true; setTimeout(typeEffect, 1800); return; }
  } else {
    heroRoleEl.innerHTML = cur.slice(0, charIndex - 1) + '<span class="cursor"></span>';
    charIndex--;
    if (charIndex === 0) { isDeleting = false; roleIndex = (roleIndex + 1) % roles.length; }
  }
  setTimeout(typeEffect, isDeleting ? 50 : 90);
}
typeEffect();

// ── HAMBURGER ──
function toggleNav() {
  document.getElementById('navLinks').classList.toggle('open');
}
document.querySelectorAll('#navLinks a').forEach(a => {
  a.addEventListener('click', () => document.getElementById('navLinks').classList.remove('open'));
});

// ── SCROLL REVEAL ──
const revealEls = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => obs.observe(el));

// ── SKILL BARS ──
let skillsAnimated = false;
const skillObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting && !skillsAnimated) {
      skillsAnimated = true;
      document.querySelectorAll('.skill-fill').forEach(bar => { bar.style.width = bar.dataset.pct + '%'; });
    }
  });
}, { threshold: 0.3 });
const skillSection = document.getElementById('skills');
if (skillSection) skillObs.observe(skillSection);

// ── NAV HIGHLIGHT ──
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) cur = s.id; });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + cur ? 'var(--cyan)' : '';
  });
});
