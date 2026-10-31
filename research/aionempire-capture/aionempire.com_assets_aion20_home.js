/* ============================================================
   AION 2.0 — главная страница (home.js)
   Извлечено из mockup; язык переключается на сервере (/lang).
   ============================================================ */
(function () {
  // preloader — dismiss when hero video is ready (with a safety timeout)
  (function () {
    const pre = document.getElementById('preloader');
    if (!pre) return;
    const fill = document.getElementById('pre-fill');
    const status = document.getElementById('pre-status');
    const welcome = pre.getAttribute('data-welcome') || '';
    const video = document.querySelector('video.hero-bg');
    let progress = 0, done = false;

    const setProgress = (p) => { progress = Math.max(progress, p); if (fill) fill.style.width = progress + '%'; };

    // creep upward while the asset loads so it never feels stuck
    const creep = setInterval(() => { if (progress < 90) setProgress(progress + Math.max(1, (90 - progress) * 0.06)); }, 200);

    function finish() {
      if (done) return; done = true;
      clearInterval(creep);
      setProgress(100);
      if (status && welcome) status.textContent = welcome;
      setTimeout(() => {
        pre.classList.add('done');
        document.body.style.overflow = '';
      }, 420);
    }

    // lock scroll while loading
    document.body.style.overflow = 'hidden';

    if (video) {
      if (video.readyState >= 3) finish();
      video.addEventListener('canplaythrough', finish, { once: true });
      video.addEventListener('loadeddata', () => setProgress(70), { once: true });
      video.addEventListener('error', finish, { once: true });
    }
    // never trap the user: hard fallback
    window.addEventListener('load', () => setTimeout(finish, 600));
    setTimeout(finish, 8000);
  })();

  // sticky header
  const header = document.getElementById('header');
  if (header) {
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // mobile menu
  const burger = document.getElementById('burger');
  const menu = document.getElementById('mobileMenu');
  if (burger && menu) {
    burger.addEventListener('click', () => menu.classList.toggle('open'));
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));
  }

  // language selector — open/close only; selection is a real link to /lang
  const lang = document.getElementById('lang');
  const langBtn = document.getElementById('langBtn');
  if (lang && langBtn) {
    langBtn.addEventListener('click', (e) => { e.stopPropagation(); const open = lang.classList.toggle('open'); langBtn.setAttribute('aria-expanded', open); });
    document.addEventListener('click', () => { lang.classList.remove('open'); langBtn.setAttribute('aria-expanded', 'false'); });
  }

  // subtle hero parallax (rAF-throttled, respects reduced motion)
  const heroBg = document.querySelector('.hero-bg');
  const heroLede = document.querySelector('.hero-lede');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (heroBg && !reduceMotion) {
    let ticking = false;
    const parallax = () => {
      const y = window.scrollY;
      if (y < window.innerHeight) {
        heroBg.style.translate = '0 ' + (y * 0.16).toFixed(1) + 'px';
        if (heroLede) heroLede.style.translate = '0 ' + (y * 0.06).toFixed(1) + 'px';
      }
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(parallax); ticking = true; }
    }, { passive: true });
  }

  // reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // endless bonus carousel — JS-driven so it always runs; pauses on card hover
  (function () {
    const track = document.querySelector('.reel-track');
    if (!track) return;
    let offset = 0, paused = false, last = null;
    const speed = 38; // px per second
    track.addEventListener('pointerover', (e) => { if (e.target.closest('.bonus-card')) paused = true; });
    track.addEventListener('pointerout',  (e) => { if (e.target.closest('.bonus-card')) paused = false; });
    function frame(ts) {
      if (last == null) last = ts;
      const dt = Math.min((ts - last) / 1000, 0.05); last = ts;
      if (!paused) {
        offset -= speed * dt;
        const half = track.scrollWidth / 2;
        if (half > 0 && -offset >= half) offset += half;
        track.style.transform = 'translateX(' + offset.toFixed(2) + 'px)';
      }
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  })();

  // access-help toast
  function initAccessToast() {
    const toast = document.getElementById('access-toast');
    if (!toast) return;
    requestAnimationFrame(() => requestAnimationFrame(() => toast.classList.add('show')));
    const close = toast.querySelector('.toast-close');
    if (close) close.addEventListener('click', () => { toast.classList.remove('show'); });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAccessToast);
  } else {
    initAccessToast();
  }

  // launcher download — URL computed in JS (mirrors classic2025_mainpage/script.js),
  // so the zip URL isn't baked into the HTML; CN locale uses the cn-uploads mirror.
  (function () {
    var SITE_BASE = (function () {
      var h = window.location.hostname.replace(/^www\./, '');
      var p = h.split('.');
      if (p.length > 2) p.shift();
      return p.join('.');
    })();
    function siteSub(sub) { return 'https://' + sub + '.' + SITE_BASE; }
    var isCN = !!document.getElementById('downloadLauncherBtn-cn');
    var dlUrl = isCN
      ? siteSub('cn-uploads') + '/AionEmpire-Setup.zip'
      : 'https://' + SITE_BASE + '/static/AionEmpire-Setup.zip';
    ['downloadLauncherBtn', 'downloadLauncherBtn-cn'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.addEventListener('click', function () { window.location.href = dlUrl; });
    });
  })();
})();
