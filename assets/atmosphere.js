/* ───────────────────────────────────────────────────────────────────────────
 * Atmósfera Apex — 7 capas (base, radiales, grid, 4 nebulosas, estrellas,
 * viñeta, grano). Portado del AtmosphericCanvas de Apex, re-tintado a NEÓN.
 * Inyecta el HTML + CSS al cargar. Sin dependencias.
 * ─────────────────────────────────────────────────────────────────────────── */
(function () {
  function buildStars(total) {
    var rand = function (i, seed) {
      var x = Math.sin((i + 1) * 12.9898 + seed * 78.233) * 43758.5453;
      return x - Math.floor(x);
    };
    var a = [], b = [];
    for (var i = 0; i < total; i++) {
      var x = (rand(i, 1) * 100).toFixed(2);
      var y = (rand(i, 2) * 100).toFixed(2);
      var size = rand(i, 3) > 0.85 ? 1.5 : 1;
      var bright = rand(i, 4) > 0.85;
      var color = bright ? 'rgba(220,255,190,0.85)' : 'rgba(207,214,203,0.45)';
      var shadow = x + 'vw ' + y + 'vh 0 ' + (size === 1.5 ? '0.5px' : '0') + ' ' + color;
      if (i % 2 === 0) a.push(shadow); else b.push(shadow);
    }
    return { a: a.join(', '), b: b.join(', ') };
  }

  var stars = buildStars(150);

  var css = `
  .apex-atmosphere { position: fixed; inset: 0; z-index: 0; pointer-events: none; overflow: hidden; }
  .apex-atm-base { position: absolute; inset: 0; background: #0C0F0D; }
  .apex-atm-radials { position: absolute; inset: 0; background:
      radial-gradient(ellipse 120% 80% at 30% 18%, rgba(178,242,60,0.05), transparent 60%),
      radial-gradient(ellipse 100% 60% at 72% 82%, rgba(76,86,74,0.18), transparent 70%); }
  .apex-atm-grid { position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(150,172,148,0.045) 1px, transparent 1px),
      linear-gradient(90deg, rgba(150,172,148,0.045) 1px, transparent 1px);
    background-size: 80px 80px;
    -webkit-mask-image: radial-gradient(ellipse 80% 60% at 50% 36%, #000 30%, transparent 80%);
            mask-image: radial-gradient(ellipse 80% 60% at 50% 36%, #000 30%, transparent 80%);
    opacity: 0.6; }
  .apex-nebula { position: absolute; border-radius: 50%; filter: blur(180px); will-change: transform, opacity;
    animation: apex-nebula-pulse 16s cubic-bezier(0.16,1,0.3,1) infinite; }
  .apex-nebula--1 { top: 3%; left: 10%; width: 700px; height: 800px;
    background: radial-gradient(circle, rgba(178,242,60,0.14), rgba(76,86,74,0.16) 60%, transparent 80%); animation-duration: 12s; }
  .apex-nebula--2 { bottom: 4%; right: 7%; width: 600px; height: 600px;
    background: radial-gradient(circle, rgba(150,172,148,0.12), rgba(27,33,26,0.18) 55%, transparent 80%); animation-duration: 14s; animation-delay: -3s; }
  .apex-nebula--3 { top: 14%; right: 12%; width: 480px; height: 480px;
    background: radial-gradient(circle, rgba(198,250,92,0.10), transparent 70%); animation-duration: 16s; animation-delay: -6s; }
  .apex-nebula--4 { bottom: 16%; left: 5%; width: 420px; height: 420px;
    background: radial-gradient(circle, rgba(150,172,148,0.12), transparent 70%); animation-duration: 20s; animation-delay: -8s; }
  .apex-stars-a, .apex-stars-b { position: absolute; top: 0; left: 0; width: 1px; height: 1px; background: transparent; border-radius: 50%; }
  .apex-stars-a { animation: apex-twinkle-a 4s cubic-bezier(0.16,1,0.3,1) infinite; }
  .apex-stars-b { animation: apex-twinkle-b 6s cubic-bezier(0.16,1,0.3,1) infinite; }
  .apex-atm-vignette { position: absolute; inset: 0; background: radial-gradient(ellipse at center, transparent 28%, rgba(12,15,13,0.72) 85%, #0C0F0D 100%); }
  .apex-grain-layer { position: fixed; inset: 0; z-index: 1; pointer-events: none; opacity: 0.03; mix-blend-mode: overlay;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
    background-size: 200px 200px; animation: apex-grain 0.5s steps(2) infinite; }
  @keyframes apex-nebula-pulse { 0%,100%{opacity:.7;transform:scale(1)} 50%{opacity:1;transform:scale(1.06)} }
  @keyframes apex-twinkle-a { 0%,100%{opacity:.5} 50%{opacity:1} }
  @keyframes apex-twinkle-b { 0%,100%{opacity:1} 50%{opacity:.5} }
  @keyframes apex-grain { 0%{transform:translate(0,0)} 100%{transform:translate(-4px,3px)} }
  @media (prefers-reduced-motion: reduce){ .apex-nebula,.apex-stars-a,.apex-stars-b,.apex-grain-layer{ animation: none !important; } }
  /* ── Móvil: el blur(180px) y el grano machacan la GPU. Aligeramos. ── */
  @media (max-width: 720px) {
    .apex-nebula { filter: blur(80px); animation: none; }
    .apex-nebula--3, .apex-nebula--4 { display: none; }
    .apex-stars-a, .apex-stars-b { animation: none; }
    .apex-grain-layer { display: none; }
    .apex-atm-grid { background-size: 56px 56px; }
  }
  `;

  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  var atm = document.createElement('div');
  atm.className = 'apex-atmosphere';
  atm.setAttribute('aria-hidden', 'true');
  atm.innerHTML =
    '<div class="apex-atm-base"></div>' +
    '<div class="apex-atm-radials"></div>' +
    '<div class="apex-atm-grid"></div>' +
    '<div class="apex-nebula apex-nebula--1"></div>' +
    '<div class="apex-nebula apex-nebula--2"></div>' +
    '<div class="apex-nebula apex-nebula--3"></div>' +
    '<div class="apex-nebula apex-nebula--4"></div>' +
    '<div class="apex-stars-a"></div>' +
    '<div class="apex-stars-b"></div>' +
    '<div class="apex-atm-vignette"></div>';
  atm.querySelector('.apex-stars-a').style.boxShadow = stars.a;
  atm.querySelector('.apex-stars-b').style.boxShadow = stars.b;

  var grain = document.createElement('div');
  grain.className = 'apex-grain-layer';
  grain.setAttribute('aria-hidden', 'true');

  function mount() {
    document.body.insertBefore(atm, document.body.firstChild);
    document.body.appendChild(grain);
  }
  if (document.body) mount();
  else document.addEventListener('DOMContentLoaded', mount);
})();
