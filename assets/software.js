/* ───────────────────────────────────────────────────────────────────────────
 * software.js — experiencia de "historia" cinematográfica por software.
 * Orbes flotantes → al pulsar se abre un overlay que narra la historia del
 * producto capítulo a capítulo (con animación). Navega con ← → / botones / Esc.
 *
 * Para añadir un software nuevo: 1) añade un <button class="sw-orb" data-story="x">
 * en software.html, y 2) añade su entrada en STORIES aquí abajo.
 * ─────────────────────────────────────────────────────────────────────────── */
(function () {
  var S = window.S4SF || {};

  var STORIES = {
    'apex-operations': {
      badge: 'Producto estrella',
      title: 'APEX Operations',
      chapters: [
        { kick: 'El problema', line: 'Una empresa que crece se ahoga en su propio <b>caos</b>: hojas de cálculo, chats sueltos, datos que no cuadran.' },
        { kick: 'La idea', line: 'Y si todo — ventas, clientes, métricas, equipo — viviera en <b>un solo sitio</b>, hablando el mismo idioma.' },
        { kick: 'La construcción', line: 'Así nació APEX: una plataforma de operaciones centralizada, con <b>IA dentro</b>, montada desde cero por BlackWolf.' },
        { kick: 'Hoy', line: 'Es el <b>núcleo</b> sobre el que opera todo. CRM, ventas verificadas y panel de mando, en tiempo real.' },
      ],
      cta: [
        { label: 'Ver demo', href: (S.apex && S.apex.demo) || 'https://central.blackwolfsec.io/apexdemo', primary: true, ext: true },
        { label: 'Repositorio', href: (S.apex && S.apex.repo) || 'https://github.com/aatshadow/Apex-operations', ext: true },
      ],
    },
    'apex-closer': {
      badge: 'Vertical de ventas',
      title: 'APEX Closer',
      chapters: [
        { kick: 'El problema', line: 'Un closer cierra hablando. Pero entre llamada y llamada, los <b>seguimientos se pierden</b> y el dinero se escapa.' },
        { kick: 'La idea', line: 'Y si una IA entrara a tus calls, las <b>grabara y transcribiera</b>, y te dijera exactamente qué mejorar.' },
        { kick: 'La construcción', line: 'APEX Closer: el sistema operativo del closer de habla hispana. Confirmar → transcribir → <b>resumen + feedback</b> → seguir.' },
        { kick: 'El resultado', line: 'No pierdes un seguimiento, aprendes de cada llamada y <b>cierras más</b>. Tu día, en piloto.' },
      ],
      cta: [
        { label: 'Ver Apex Closer', href: (S.apexCloser && S.apexCloser.demo), primary: true, ext: true, pending: true },
        { label: 'Repositorio', href: (S.apexCloser && S.apexCloser.repo) || 'https://github.com/SASbot01/apexclosers', ext: true },
      ],
    },
  };

  var ARROW_L = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>';
  var ARROW_R = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  var EXT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:15px;height:15px"><path d="M7 17 17 7M9 7h8v8"/></svg>';

  function isPlaceholder(v) { return !v || /^PEGA_AQUI/.test(v); }

  var state = { key: null, i: 0 };

  function el(id) { return document.getElementById(id); }

  function render() {
    var story = STORIES[state.key];
    if (!story) return;
    var n = story.chapters.length;
    var last = state.i === n - 1;

    // progress
    var prog = '';
    for (var k = 0; k < n; k++) {
      var cls = k < state.i ? 'done' : (k === state.i ? 'active' : '');
      prog += '<span class="' + cls + '"></span>';
    }
    el('swProgress').innerHTML = prog;

    // chapter (re-trigger animation by replacing node)
    var ch = story.chapters[state.i];
    var ctaHtml = '';
    if (last) {
      var btns = story.cta.map(function (c) {
        if (c.pending && isPlaceholder(c.href)) {
          return '<button class="apex-btn ' + (c.primary ? 'apex-btn--primary' : 'apex-btn--ghost') + '" data-pending-cta="1">' + c.label + '</button>';
        }
        var cls = c.primary ? 'apex-btn--primary' : 'apex-btn--ghost';
        var t = c.ext ? ' target="_blank" rel="noopener"' : '';
        return '<a class="apex-btn ' + cls + '" href="' + c.href + '"' + t + '>' + c.label + (c.ext ? ' ' + EXT : '') + '</a>';
      }).join('');
      ctaHtml = '<div class="sw-cta sw-anim" style="animation-delay:.25s">' + btns + '</div>';
    }
    el('swChapter').innerHTML =
      '<div class="sw-chapter">' +
        '<span class="kick sw-anim">' + ch.kick + '</span>' +
        '<p class="line sw-anim" style="animation-delay:.12s">' + ch.line + '</p>' +
        ctaHtml +
      '</div>';

    el('swPrev').disabled = state.i === 0;
    el('swNext').disabled = last;
    // pending cta toast
    var pc = el('swChapter').querySelector('[data-pending-cta]');
    if (pc) pc.addEventListener('click', function () { window.toast('Pásame el enlace de Apex Closer y lo activo'); });
  }

  function open(key) {
    state.key = key; state.i = 0;
    var story = STORIES[key];
    el('swBadge').textContent = story.badge;
    el('swTitle').textContent = story.title;
    el('swStory').classList.add('open');
    document.body.style.overflow = 'hidden';
    render();
  }
  function close() {
    el('swStory').classList.remove('open');
    document.body.style.overflow = '';
    state.key = null;
  }
  function next() { var s = STORIES[state.key]; if (s && state.i < s.chapters.length - 1) { state.i++; render(); } }
  function prev() { if (state.i > 0) { state.i--; render(); } }

  function init() {
    document.querySelectorAll('.sw-orb[data-story]').forEach(function (o) {
      o.addEventListener('click', function () { open(o.getAttribute('data-story')); });
    });
    el('swPrev').addEventListener('click', prev);
    el('swNext').addEventListener('click', next);
    el('swClose').addEventListener('click', close);
    document.addEventListener('keydown', function (e) {
      if (!el('swStory').classList.contains('open')) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
    });
    el('swStory').addEventListener('click', function (e) { if (e.target === el('swStory')) close(); });
    // deep-link: software.html#apex-closer abre la historia directamente
    var h = (location.hash || '').replace('#', '');
    if (STORIES[h]) open(h);
  }

  if (document.readyState !== 'loading') init();
  else document.addEventListener('DOMContentLoaded', init);

  window.SW = { ARROW_L: ARROW_L, ARROW_R: ARROW_R };
})();
