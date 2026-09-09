/* =========================================================
   SENTRAL BYGG AS — «SB.02» interaksjon
   ========================================================= */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Sticky nav ---------- */
  var nav = document.getElementById('nav');
  function onScroll() {
    if (window.scrollY > 40) { nav.classList.add('nav--solid'); nav.classList.remove('nav--top'); }
    else { nav.classList.remove('nav--solid'); nav.classList.add('nav--top'); }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  var burger = document.getElementById('burger');
  var sheet = document.getElementById('msheet');
  function setMenu(open) {
    sheet.classList.toggle('open', open);
    document.body.classList.toggle('lock', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    sheet.setAttribute('aria-hidden', open ? 'false' : 'true');
    burger.setAttribute('aria-label', open ? 'Lukk meny' : 'Åpne meny');
    var b = burger.querySelectorAll('span');
    b[0].style.transform = open ? 'translateY(7px) rotate(45deg)' : '';
    b[1].style.transform = open ? 'translateY(-7px) rotate(-45deg)' : '';
  }
  if (burger) burger.addEventListener('click', function () { setMenu(!sheet.classList.contains('open')); });
  if (sheet) sheet.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && sheet.classList.contains('open')) setMenu(false); });

  /* ---------- Reveal on scroll ----------
     A viewport sweep is the primary mechanism (reliable for large media, where
     IntersectionObserver on clip-path elements proved flaky). rAF-scheduled so
     rects are always current; multiple post-load passes catch late layout. */
  var revs = Array.prototype.slice.call(document.querySelectorAll('.rv, .rvimg'));
  var reveal = function (el) { el.classList.add('in'); };
  if (reduce) {
    revs.forEach(reveal);
  } else {
    // Viewport sweep — reveals anything whose top is within (or above) the lower
    // 90% of the viewport, so nothing can stay hidden once reached or passed.
    var sweep = function () {
      var vh = window.innerHeight || document.documentElement.clientHeight;
      for (var i = revs.length - 1; i >= 0; i--) {
        if (revs[i].getBoundingClientRect().top < vh * 0.9) { reveal(revs[i]); revs.splice(i, 1); }
      }
    };
    var scheduled = false;
    var schedule = function () {
      if (scheduled) return; scheduled = true;
      requestAnimationFrame(function () { scheduled = false; sweep(); });
    };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    window.addEventListener('load', schedule);
    // IntersectionObserver as an additional trigger for elements entering on scroll.
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (ents) {
        ents.forEach(function (en) { if (en.isIntersecting) { reveal(en.target); io.unobserve(en.target); } });
      }, { threshold: 0, rootMargin: '0px 0px -8% 0px' });
      revs.forEach(function (el) { io.observe(el); });
    }
    // Initial + post-load passes catch whatever is already in view (any landing point).
    [0, 150, 400, 800, 1500, 2500].forEach(function (t) { setTimeout(sweep, t); });
  }

  /* ---------- Subtle parallax on project images ---------- */
  var px = Array.prototype.slice.call(document.querySelectorAll('[data-parallax]'));
  if (px.length && !reduce && window.matchMedia('(min-width:821px)').matches) {
    var ticking = false;
    function frame() {
      var vh = window.innerHeight;
      px.forEach(function (img) {
        var r = img.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        var progress = (r.top + r.height / 2 - vh / 2) / vh; // -0.5..0.5-ish
        img.style.transform = 'scale(1.08) translateY(' + (progress * -26).toFixed(1) + 'px)';
      });
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(frame); }
    }, { passive: true });
    frame();
  }

  /* ---------- Select: keep floating label up when chosen ---------- */
  document.querySelectorAll('.fld select').forEach(function (sel) {
    function sync() { sel.classList.toggle('filled', !!sel.value); }
    sel.addEventListener('change', sync); sync();
  });

  /* ---------- Contact form ---------- */
  var form = document.getElementById('form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true;
      form.querySelectorAll('[required]').forEach(function (input) {
        var val = (input.value || '').trim();
        var valid = !!val;
        if (input.type === 'email') valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
        input.closest('.fld').classList.toggle('bad', !valid);
        if (!valid) ok = false;
      });
      if (!ok) { var b = form.querySelector('.fld.bad input, .fld.bad select, .fld.bad textarea'); if (b) b.focus(); return; }
      form.classList.add('done');
      form.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
    });
    form.querySelectorAll('[required]').forEach(function (input) {
      input.addEventListener('input', function () { input.closest('.fld').classList.remove('bad'); });
    });
  }

  /* ---------- To top ---------- */
  var toTop = document.getElementById('toTop');
  if (toTop) toTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  });
})();
