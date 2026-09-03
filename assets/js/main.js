/* =========================================================
   SENTRAL BYGG AS — interaksjon
   ========================================================= */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Hero intro ---------- */
  var hero = document.getElementById('hero');
  window.addEventListener('load', function () {
    if (hero) requestAnimationFrame(function () { hero.classList.add('loaded'); });
  });
  // fallback if load already fired
  if (document.readyState === 'complete' && hero) hero.classList.add('loaded');

  /* ---------- Sticky nav (transparent over hero -> solid) ---------- */
  var nav = document.getElementById('nav');
  function onScroll() {
    var threshold = (hero ? hero.offsetHeight : window.innerHeight) - 90;
    if (window.scrollY > threshold) {
      nav.classList.remove('nav--top');
      nav.classList.add('nav--solid');
    } else {
      nav.classList.add('nav--top');
      nav.classList.remove('nav--solid');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  /* ---------- Mobile menu ---------- */
  var burger = document.getElementById('burger');
  var menu = document.getElementById('mobileMenu');
  function setMenu(open) {
    menu.classList.toggle('open', open);
    document.body.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    menu.setAttribute('aria-hidden', open ? 'false' : 'true');
    burger.setAttribute('aria-label', open ? 'Lukk meny' : 'Åpne meny');
    // morph burger to X
    var bars = burger.querySelectorAll('span');
    if (bars.length === 2) {
      bars[0].style.transform = open ? 'translateY(8px) rotate(45deg)' : '';
      bars[1].style.transform = open ? 'translateY(-8px) rotate(-45deg)' : '';
    }
  }
  if (burger) burger.addEventListener('click', function () { setMenu(!menu.classList.contains('open')); });
  if (menu) menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { setMenu(false); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu.classList.contains('open')) setMenu(false);
  });

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll('.reveal, .reveal-img');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Services floating hover image ---------- */
  var hoverBox = document.getElementById('svcHover');
  var hoverImg = hoverBox ? hoverBox.querySelector('img') : null;
  var svcs = document.querySelectorAll('.svc[data-img]');
  var finePointer = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  if (hoverBox && finePointer) {
    var curTargetX = 0, curTargetY = 0, curX = 0, curY = 0, rafActive = false;
    function animate() {
      curX += (curTargetX - curX) * 0.16;
      curY += (curTargetY - curY) * 0.16;
      hoverBox.style.left = curX + 'px';
      hoverBox.style.top = curY + 'px';
      if (rafActive) requestAnimationFrame(animate);
    }
    svcs.forEach(function (svc) {
      svc.addEventListener('mouseenter', function () {
        hoverImg.src = svc.getAttribute('data-img');
        hoverBox.classList.add('show');
        if (!rafActive) { rafActive = true; requestAnimationFrame(animate); }
      });
      svc.addEventListener('mousemove', function (e) {
        curTargetX = e.clientX; curTargetY = e.clientY;
        if (curX === 0 && curY === 0) { curX = e.clientX; curY = e.clientY; }
      });
      svc.addEventListener('mouseleave', function () {
        hoverBox.classList.remove('show');
        setTimeout(function () { rafActive = false; }, 350);
      });
    });
  }

  /* ---------- Contact form ---------- */
  var form = document.getElementById('contactForm');
  if (form) {
    var wrap = form.closest('.form');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true;
      form.querySelectorAll('[required]').forEach(function (input) {
        var field = input.closest('.field');
        var val = (input.value || '').trim();
        var valid = !!val;
        if (input.type === 'email') valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
        field.classList.toggle('invalid', !valid);
        if (!valid) ok = false;
      });
      if (!ok) {
        var firstBad = form.querySelector('.field.invalid input, .field.invalid select, .field.invalid textarea');
        if (firstBad) firstBad.focus();
        return;
      }
      wrap.classList.add('sent');
      wrap.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
    });
    form.querySelectorAll('[required]').forEach(function (input) {
      input.addEventListener('input', function () {
        input.closest('.field').classList.remove('invalid');
      });
    });
  }

  /* ---------- To top ---------- */
  var toTop = document.getElementById('toTop');
  if (toTop) toTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  });

  /* ---------- Custom cursor ---------- */
  if (finePointer && !reduce) {
    var dot = document.querySelector('.cursor');
    var ring = document.querySelector('.cursor-ring');
    var rx = 0, ry = 0, dx = 0, dy = 0;
    document.addEventListener('mousemove', function (e) {
      dx = e.clientX; dy = e.clientY;
      dot.style.left = dx + 'px'; dot.style.top = dy + 'px';
      document.body.classList.add('cursor-ready');
    });
    (function loop() {
      rx += (dx - rx) * 0.18; ry += (dy - ry) * 0.18;
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
      requestAnimationFrame(loop);
    })();
    document.querySelectorAll('a, button, [data-cursor], input, select, textarea, .svc, .proj, .dcell').forEach(function (el) {
      el.addEventListener('mouseenter', function () { document.body.classList.add('cursor-hover'); });
      el.addEventListener('mouseleave', function () { document.body.classList.remove('cursor-hover'); });
    });
    // dark sections -> lighter ring
    document.querySelectorAll('.hero, .about, .contact, .footer, .mobile-menu').forEach(function (sec) {
      sec.addEventListener('mouseenter', function () { document.body.classList.add('cursor-dark'); });
      sec.addEventListener('mouseleave', function () { document.body.classList.remove('cursor-dark'); });
    });
    document.addEventListener('mouseleave', function () { document.body.classList.remove('cursor-ready'); });
  }
})();
