/* =====================================================
   CHHAYANKA DABHADKER — PORTFOLIO SCRIPT
===================================================== */

/* ---- CUSTOM CURSOR ---- */
const cursor     = document.getElementById('cursor');
const cursorDot  = document.getElementById('cursor-dot');
let cx = 0, cy = 0, dx = 0, dy = 0;

document.addEventListener('mousemove', e => {
  dx = e.clientX; dy = e.clientY;
  cursorDot.style.left = dx + 'px';
  cursorDot.style.top  = dy + 'px';
});

function animateCursor() {
  cx += (dx - cx) * 0.14;
  cy += (dy - cy) * 0.14;
  cursor.style.left = cx + 'px';
  cursor.style.top  = cy + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll('a, button, input, textarea').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width  = '56px';
    cursor.style.height = '56px';
    cursor.style.borderColor = 'rgba(6,182,212,0.6)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width  = '36px';
    cursor.style.height = '36px';
    cursor.style.borderColor = 'rgba(124,58,237,0.5)';
  });
});

/* ---- NAVBAR SCROLL ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

/* ---- MOBILE MENU ---- */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
let menuOpen = false;

hamburger.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('open', menuOpen);
  const spans = hamburger.querySelectorAll('span');
  if (menuOpen) {
    spans[0].style.transform = 'rotate(45deg) translate(5px,5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => {
    menuOpen = false;
    mobileMenu.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => { s.style.transform=''; s.style.opacity=''; });
  });
});

/* ---- SMOOTH SCROLL ---- */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});

/* ---- ACTIVE NAV ---- */
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -50% 0px' });

sections.forEach(s => navObserver.observe(s));

/* ---- TYPING ANIMATION ---- */
const roles = [
  'Full-Stack Developer',
  'AI & NLP Builder',
  'AR/VR Enthusiast',
  'Drone Systems Dev',
  'Hackathon Top 10'
];
const typingEl = document.getElementById('typing');
let rIdx = 0, cIdx = 0, deleting = false;

function type() {
  const role = roles[rIdx];
  if (deleting) {
    typingEl.textContent = role.slice(0, cIdx - 1);
    cIdx--;
  } else {
    typingEl.textContent = role.slice(0, cIdx + 1);
    cIdx++;
  }
  if (!deleting && cIdx === role.length) {
    setTimeout(() => deleting = true, 2000);
  } else if (deleting && cIdx === 0) {
    deleting = false;
    rIdx = (rIdx + 1) % roles.length;
  }
  setTimeout(type, deleting ? 32 : 68);
}

/* ---- COUNTER ANIMATION ---- */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1400;
  const start = performance.now();
  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(ease * target);
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

/* ---- SCROLL REVEAL (staggered) ---- */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('in');
      }, i * 90);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.10 });

document.querySelectorAll('.reveal, .reveal-left').forEach(el => {
  revealObserver.observe(el);
});

/* Counter observer (hero stats) */
const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.stat-num').forEach(animateCounter);
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.5 });
const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

/* ---- PROJECT CARD TILT ---- */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect  = card.getBoundingClientRect();
    const x     = e.clientX - rect.left;
    const y     = e.clientY - rect.top;
    const cx    = rect.width  / 2;
    const cy    = rect.height / 2;
    const rotX  = ((y - cy) / cy) * -5;   // max ±5deg
    const rotY  = ((x - cx) / cx) *  5;
    card.style.transform = `translateY(-8px) scale(1.01) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1), border-color 0.3s, box-shadow 0.3s';
    // reset the transition property after it settles
    setTimeout(() => { card.style.transition = ''; }, 500);
  });
});

/* ---- MARQUEE TICKER (build + inject) ---- */
function buildMarquee() {
  const techs = [
    'Python', 'Flask', 'Node.js', 'Express.js', 'React.js',
    'TypeScript', 'MongoDB Atlas', 'spaCy', 'Tailwind CSS',
    'Figma', 'Streamlit', 'scikit-learn', 'pandas', 'Git',
    'Postman', 'Netlify', 'Render', 'Bootstrap', 'NLP',
  ];

  // Duplicate for seamless loop
  const allItems = [...techs, ...techs];

  const section = document.createElement('div');
  section.className = 'marquee-section';

  const track = document.createElement('div');
  track.className = 'marquee-track';

  allItems.forEach(tech => {
    const item = document.createElement('span');
    item.className = 'marquee-item';
    item.innerHTML = `<span class="marquee-dot"></span>${tech}`;
    track.appendChild(item);
  });

  section.appendChild(track);

  // Insert after hero section
  const hero = document.getElementById('hero');
  if (hero && hero.nextSibling) {
    hero.parentNode.insertBefore(section, hero.nextSibling);
  }
}

/* ---- CONTACT FORM ---- */
document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn     = this.querySelector('.form-submit');
  const success = document.getElementById('form-success');
  btn.textContent = 'Sending…';
  btn.style.opacity = '0.7';
  setTimeout(() => {
    this.reset();
    btn.textContent = 'Send Message →';
    btn.style.opacity = '1';
    success.classList.add('show');
    setTimeout(() => success.classList.remove('show'), 4000);
  }, 1000);
});

/* ---- INIT ---- */
window.addEventListener('load', () => {
  type();
  buildMarquee();
});