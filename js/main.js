/* =====================================================
   PAWAN KUMAR SAH — Portfolio JavaScript
   ===================================================== */

/* ---- Navbar scroll effect ---- */
const navbar = document.getElementById('navbar');
const progressBar = document.getElementById('progressBar');

function onScroll() {
  const scrollY = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;

  progressBar.style.width = progress + '%';

  if (scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  updateActiveNavLink();
}

window.addEventListener('scroll', onScroll, { passive: true });

/* ---- Active nav link on scroll ---- */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNavLink() {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + id) {
          link.classList.add('active');
        }
      });
    }
  });
}

/* ---- Mobile hamburger ---- */
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinksEl.classList.toggle('open');
});

// Close menu on link click
navLinksEl.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinksEl.classList.remove('open');
  });
});

/* ---- Reveal on scroll (Intersection Observer) ---- */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger sibling reveals
        const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal:not(.visible)'));
        const idx = siblings.indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, idx * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
);

revealEls.forEach(el => revealObserver.observe(el));

/* ---- Typed text effect ---- */
const phrases = [
  'Consultant at Deloitte',
  'Power Automate Specialist',
  'Selenium + Java Expert',
  'BDD / Cucumber Practitioner',
  'AI-Assisted Testing Advocate',
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingTimeout;

const typedTextEl = document.getElementById('typedText');

function type() {
  const current = phrases[phraseIndex];
  const speed = isDeleting ? 40 : 75;

  if (!isDeleting) {
    typedTextEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      isDeleting = true;
      typingTimeout = setTimeout(type, 2200);
      return;
    }
  } else {
    typedTextEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingTimeout = setTimeout(type, 400);
      return;
    }
  }

  typingTimeout = setTimeout(type, speed);
}

type();

/* ---- Counter animation ---- */
const counters = document.querySelectorAll('.stat-num');

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

counters.forEach(counter => counterObserver.observe(counter));

function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeOutExpo(progress);
    el.textContent = Math.round(eased * target);
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target;
    }
  }

  requestAnimationFrame(update);
}

function easeOutExpo(x) {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}

/* ---- Smooth scroll for anchor links ---- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'), 10) || 70;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ---- Cursor glow on hero ---- */
const hero = document.querySelector('.hero');
if (hero) {
  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    hero.style.setProperty('--mx', x + 'px');
    hero.style.setProperty('--my', y + 'px');
  });
}

/* ---- Skill card tilt effect ---- */
document.querySelectorAll('.skill-card, .project-card, .achievement-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const tiltX = ((y - cy) / cy) * 4;
    const tiltY = ((x - cx) / cx) * -4;
    card.style.transform = `perspective(600px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.5s ease';
    setTimeout(() => { card.style.transition = ''; }, 500);
  });
});

/* ---- Timeline marker animation ---- */
const timelineItems = document.querySelectorAll('.timeline-item');
const tlObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelector('.marker-dot')?.classList.add('pulse');
      }
    });
  },
  { threshold: 0.3 }
);
timelineItems.forEach(item => tlObserver.observe(item));

/* =====================================================
   RECOGNITIONS CAROUSEL
   ===================================================== */
(function initCarousel() {
  const slides  = document.querySelectorAll('.carousel-slide');
  const dots    = document.querySelectorAll('.carousel-dots .dot');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  const wrap    = document.querySelector('.carousel-wrap');
  if (!slides.length) return;

  let current = 0;
  let timer   = null;
  let paused  = false;
  const DELAY = 5000;

  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
    refreshProgressBar();
  }

  function refreshProgressBar() {
    document.querySelectorAll('.carousel-progress').forEach(b => b.remove());
    const bar = document.createElement('div');
    bar.className = 'carousel-progress';
    slides[current].querySelector('.slide-inner').appendChild(bar);
  }

  function startTimer() {
    clearInterval(timer);
    if (!paused) timer = setInterval(() => goTo(current + 1), DELAY);
  }

  prevBtn.addEventListener('click', () => { goTo(current - 1); startTimer(); });
  nextBtn.addEventListener('click', () => { goTo(current + 1); startTimer(); });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      goTo(parseInt(dot.dataset.index, 10));
      startTimer();
    });
  });

  wrap.addEventListener('mouseenter', () => { paused = true;  clearInterval(timer); });
  wrap.addEventListener('mouseleave', () => { paused = false; startTimer(); });

  let touchStartX = 0;
  wrap.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  wrap.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { diff > 0 ? goTo(current + 1) : goTo(current - 1); startTimer(); }
  });

  refreshProgressBar();
  startTimer();
})();

/* =====================================================
   PARTICLE / NETWORK BACKGROUND
   ===================================================== */
(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles;
  const mouse = { x: null, y: null };
  const MAX_DIST = 130;
  const PARTICLE_COUNT_DIVISOR = 12000;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  class Particle {
    constructor() { this.init(); }
    init() {
      this.x  = Math.random() * W;
      this.y  = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.r  = Math.random() * 1.8 + 0.8;
      this.alpha = Math.random() * 0.45 + 0.15;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > W) this.vx *= -1;
      if (this.y < 0 || this.y > H) this.vy *= -1;
      if (mouse.x !== null) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const d  = Math.hypot(dx, dy);
        if (d < 160) {
          const force = (160 - d) / 160 * 0.25;
          this.vx += (dx / d) * force;
          this.vy += (dy / d) * force;
          const speed = Math.hypot(this.vx, this.vy);
          if (speed > 2.5) { this.vx = (this.vx / speed) * 2.5; this.vy = (this.vy / speed) * 2.5; }
        }
      }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(79,142,247,${this.alpha})`;
      ctx.fill();
    }
  }

  function buildParticles() {
    const count = Math.min(Math.floor((W * H) / PARTICLE_COUNT_DIVISOR), 110);
    particles = Array.from({ length: count }, () => new Particle());
  }

  function drawEdges() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d  = Math.hypot(dx, dy);
        if (d < MAX_DIST) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(79,142,247,${(1 - d / MAX_DIST) * 0.25})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    drawEdges();
    requestAnimationFrame(animate);
  }

  const heroSection = document.getElementById('hero');
  heroSection.addEventListener('mousemove', e => {
    const r = canvas.getBoundingClientRect();
    mouse.x = e.clientX - r.left;
    mouse.y = e.clientY - r.top;
  });
  heroSection.addEventListener('mouseleave', () => { mouse.x = null; mouse.y = null; });

  window.addEventListener('resize', () => { resize(); buildParticles(); });

  resize();
  buildParticles();
  animate();
})();

/* =====================================================
   GLASSMORPHISM THEME TOGGLE
   ===================================================== */
(function initThemeToggle() {
  const btn  = document.getElementById('themeToggle');
  const root = document.documentElement;

  if (localStorage.getItem('portfolioTheme') === 'glass') {
    root.setAttribute('data-theme', 'glass');
    btn.classList.add('active');
  }

  btn.addEventListener('click', () => {
    const isGlass = root.getAttribute('data-theme') === 'glass';
    if (isGlass) {
      root.removeAttribute('data-theme');
      localStorage.setItem('portfolioTheme', 'dark');
      btn.classList.remove('active');
    } else {
      root.setAttribute('data-theme', 'glass');
      localStorage.setItem('portfolioTheme', 'glass');
      btn.classList.add('active');
    }
  });
})();

/* =====================================================
   COPY EMAIL BUTTON
   ===================================================== */
function showToast(msg) {
  const toast   = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  toastMsg.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

/* =====================================================
   VISITOR COUNTER
   ===================================================== */
(function initVisitorCounter() {
  const el = document.getElementById('visitorCount');
  if (!el) return;
  fetch('https://api.counterapi.dev/v1/pawan-kumar-github/portfolio/up')
    .then(r => r.json())
    .then(data => {
      if (data && data.count != null) {
        el.textContent = data.count.toLocaleString();
      }
    })
    .catch(() => {
      // Silently hide badge if API is unavailable
      const badge = document.getElementById('visitorBadge');
      if (badge) badge.style.display = 'none';
    });
})();

document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    e.stopPropagation();
    const text = btn.dataset.copy;
    navigator.clipboard.writeText(text).then(() => {
      btn.classList.add('copied');
      showToast('Email copied to clipboard!');
      setTimeout(() => btn.classList.remove('copied'), 2500);
    }).catch(() => {
      // Fallback for older browsers
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      btn.classList.add('copied');
      showToast('Email copied to clipboard!');
      setTimeout(() => btn.classList.remove('copied'), 2500);
    });
  });
});
