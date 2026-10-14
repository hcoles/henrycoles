// ===== Particle System =====
(function initParticles() {
  // Skip particle system entirely if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (prefersReducedMotion.matches) return;

  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  let w, h;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = (Math.random() - 0.5) * 0.3 - 0.1;
      this.opacity = Math.random() * 0.5 + 0.1;
      this.fadeSpeed = Math.random() * 0.005 + 0.002;
      this.growing = Math.random() > 0.5;
      // Color: mix of gold and teal
      this.isGold = Math.random() > 0.6;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.growing) {
        this.opacity += this.fadeSpeed;
        if (this.opacity >= 0.6) this.growing = false;
      } else {
        this.opacity -= this.fadeSpeed;
        if (this.opacity <= 0.05) this.reset();
      }
      if (this.x < 0 || this.x > w || this.y < 0 || this.y > h) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      if (this.isGold) {
        ctx.fillStyle = `rgba(212, 168, 67, ${this.opacity})`;
      } else {
        ctx.fillStyle = `rgba(61, 212, 192, ${this.opacity * 0.7})`;
      }
      ctx.fill();
    }
  }

  function init() {
    resize();
    particles = [];
    // Reduced particle count for better performance (halved from original)
    const count = Math.min(Math.floor((w * h) / 16000), 50);
    for (let i = 0; i < count; i++) particles.push(new Particle());
  }

  let animating = true;
  function animate() {
    if (!animating) return;
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }

  // Pause animation when tab is hidden to save GPU
  document.addEventListener('visibilitychange', () => {
    animating = !document.hidden;
    if (!document.hidden && particles.length > 0) animate();
  });

  window.addEventListener('resize', init);
  init();
  animate();
})();

// ===== Navbar scroll effect =====
(function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  toggle?.addEventListener('click', () => {
    links.classList.toggle('open');
  });

  // Close mobile menu on link click
  links?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => links.classList.remove('open'));
  });
})();

// ===== Scroll reveal =====
(function initReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  reveals.forEach(el => observer.observe(el));
})();


