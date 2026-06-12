/* ───────────────────────────────────────────────────────────────────────────
 * main.js — interacciones compartidas: reveal-on-scroll, año, toast,
 * y resolución de enlaces "placeholder" (botones que aún no tienen URL real).
 * ─────────────────────────────────────────────────────────────────────────── */
(function () {
  // ── Reveal on scroll ─────────────────────────────────────────────────────
  function initReveal() {
    var els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window) || !els.length) {
      els.forEach(function (e) { e.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (e, i) { e.style.transitionDelay = (Math.min(i, 6) * 60) + 'ms'; io.observe(e); });
  }

  // ── Año en footer ────────────────────────────────────────────────────────
  function initYear() {
    document.querySelectorAll('[data-year]').forEach(function (e) {
      e.textContent = new Date().getFullYear();
    });
  }

  // ── Toast ────────────────────────────────────────────────────────────────
  window.toast = function (msg) {
    var t = document.querySelector('.toast');
    if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); }
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(window.__toastT);
    window.__toastT = setTimeout(function () { t.classList.remove('show'); }, 2600);
  };

  // ── Resolver placeholders de config ──────────────────────────────────────
  // Cualquier <a data-link="whatsapp|skool|formacion|apexCloserDemo"> se rellena
  // desde window.S4SF. Si el valor sigue siendo PEGA_AQUI_..., el botón queda
  // "próximamente": no navega y muestra un aviso al hacer click.
  function isPlaceholder(v) { return !v || /^PEGA_AQUI/.test(v); }

  function resolveLinks() {
    var S = window.S4SF || {};
    var map = {
      whatsapp: (S.links || {}).whatsapp,
      skool: (S.links || {}).skool,
      formacion: (S.formacion || {}).url,
      apexCloserDemo: (S.apexCloser || {}).demo,
    };
    document.querySelectorAll('[data-link]').forEach(function (a) {
      var key = a.getAttribute('data-link');
      var url = map[key];
      if (isPlaceholder(url)) {
        a.setAttribute('data-pending', '1');
        a.addEventListener('click', function (e) {
          e.preventDefault();
          window.toast('Enlace pendiente — pásame el de ' + (key === 'apexCloserDemo' ? 'Apex Closer' : key) + ' y lo activo');
        });
      } else {
        a.href = url;
        if (/^https?:/.test(url)) { a.target = '_blank'; a.rel = 'noopener'; }
      }
    });
  }

  // ── Barra de progreso de scroll ──────────────────────────────────────────
  function initScrollProgress() {
    var bar = document.createElement('div');
    bar.className = 'apex-scroll-progress';
    bar.setAttribute('aria-hidden', 'true');
    document.body.appendChild(bar);
    var ticking = false;
    function update() {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      var p = max > 0 ? h.scrollTop / max : 0;
      bar.style.transform = 'scaleX(' + p.toFixed(4) + ')';
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  // ── Menú móvil ───────────────────────────────────────────────────────────
  function initMobileMenu() {
    var toggle = document.querySelector('.apex-nav-toggle');
    var menu = document.querySelector('.apex-mobile-menu');
    if (!toggle || !menu) return;
    function close() { menu.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', close); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  }

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }
  ready(function () { initReveal(); initYear(); resolveLinks(); initScrollProgress(); initMobileMenu(); });
})();
