/* ───────────────────────────────────────────────────────────────────────────
 * repos.js — Marketplace de repositorios de GitHub.
 * La gente añade su repo (url + descripción + lenguaje + tags). Se guarda en el
 * navegador (localStorage) y se renderiza en la cuadrícula. Búsqueda en vivo.
 *
 * NOTA: la persistencia es local del navegador (cliente). Para que las altas se
 * compartan entre todos los visitantes hace falta un backend (Supabase encaja
 * con tu stack). Ver README. La UI ya está lista para conectarlo.
 * ─────────────────────────────────────────────────────────────────────────── */
(function () {
  var KEY = 's4sf_repos_v1';
  var S = window.S4SF || {};
  var seed = (S.seedRepos || []).map(function (r) { return Object.assign({ id: 'seed:' + r.owner + '/' + r.name, seed: true }, r); });

  var LANG_COLORS = {
    TypeScript: '#3178c6', JavaScript: '#f1e05a', Python: '#3572A5', HTML: '#e34c26',
    CSS: '#563d7c', Go: '#00ADD8', Rust: '#dea584', Java: '#b07219', 'C++': '#f34b7d',
    Shell: '#89e051', Solidity: '#AA6746', Ruby: '#701516', PHP: '#4F5D95', Otro: '#B2F23C',
  };

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; }
  }
  function save(list) { localStorage.setItem(KEY, JSON.stringify(list)); }

  function all() { return seed.concat(load()); }

  function parseGitHub(url) {
    var m = String(url).trim().match(/github\.com\/([\w.-]+)\/([\w.-]+)/i);
    if (!m) return null;
    return { owner: m[1], name: m[2].replace(/\.git$/, '') };
  }

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  }); }

  var GH_SVG = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.5v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.6.8.5 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5Z"/></svg>';
  var EXT_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M9 7h8v8"/></svg>';

  function repoCard(r) {
    var color = LANG_COLORS[r.lang] || LANG_COLORS.Otro;
    var tags = (r.tags || []).map(function (t) { return '<span class="tag">' + esc(t) + '</span>'; }).join('');
    var featured = r.featured ? '<span class="hub-tile-badge" style="border-color:var(--apex-border-strong);color:var(--apex-accent)">Destacado</span>' : '';
    var del = r.seed ? '' : '<button class="modal-close" style="width:28px;height:28px" title="Quitar" data-del="' + esc(r.id) + '">&times;</button>';
    return '' +
      '<article class="apex-card repo-card reveal">' +
        '<div class="repo-card-head">' +
          '<span class="gh">' + GH_SVG + '</span>' +
          '<div style="min-width:0;flex:1">' +
            '<div class="repo-title">' + esc(r.name) + '</div>' +
            '<div class="repo-owner">@' + esc(r.owner) + '</div>' +
          '</div>' +
          (featured || del ? '<div class="row" style="gap:8px;flex:none">' + featured + del + '</div>' : '') +
        '</div>' +
        '<p class="repo-desc">' + esc(r.desc) + '</p>' +
        (tags ? '<div class="repo-tags">' + tags + '</div>' : '') +
        '<div class="repo-foot">' +
          '<span class="repo-lang"><span class="lang-dot" style="background:' + color + '"></span>' + esc(r.lang || 'Otro') + '</span>' +
          '<a class="repo-link" href="' + esc(r.url) + '" target="_blank" rel="noopener">Ver repo ' + EXT_SVG + '</a>' +
        '</div>' +
      '</article>';
  }

  function render(filter) {
    var grid = document.getElementById('repoGrid');
    var count = document.getElementById('repoCount');
    if (!grid) return;
    var list = all();
    var q = (filter || '').trim().toLowerCase();
    if (q) {
      list = list.filter(function (r) {
        return (r.name + ' ' + r.owner + ' ' + r.desc + ' ' + r.lang + ' ' + (r.tags || []).join(' ')).toLowerCase().indexOf(q) > -1;
      });
    }
    // destacados primero
    list.sort(function (a, b) { return (b.featured ? 1 : 0) - (a.featured ? 1 : 0); });
    if (count) count.textContent = all().length;

    if (!list.length) {
      grid.innerHTML = '<div class="repo-empty" style="grid-column:1/-1">' +
        (q ? 'Ningún repo coincide con “' + esc(q) + '”.' : 'Aún no hay repos. Sé el primero en aportar el tuyo.') + '</div>';
      return;
    }
    grid.innerHTML = list.map(repoCard).join('');
    // re-disparar reveal
    grid.querySelectorAll('.reveal').forEach(function (e) { e.classList.add('in'); });
    grid.querySelectorAll('[data-del]').forEach(function (b) {
      b.addEventListener('click', function () { remove(b.getAttribute('data-del')); });
    });
  }

  function remove(id) {
    var list = load().filter(function (r) { return r.id !== id; });
    save(list);
    render(document.getElementById('repoSearch') ? document.getElementById('repoSearch').value : '');
    window.toast('Repo eliminado');
  }

  function add(data) {
    var list = load();
    list.unshift(data);
    save(list);
  }

  // ── Modal de alta ────────────────────────────────────────────────────────
  function openModal() { var m = document.getElementById('repoModal'); if (m) m.classList.add('open'); }
  function closeModal() {
    var m = document.getElementById('repoModal'); if (m) m.classList.remove('open');
    var err = document.getElementById('repoErr'); if (err) err.textContent = '';
  }

  function initModalDatalist() {
    var dl = document.getElementById('langList');
    if (!dl) return;
    dl.innerHTML = Object.keys(LANG_COLORS).map(function (l) { return '<option value="' + l + '">'; }).join('');
  }

  function submit(e) {
    e.preventDefault();
    var err = document.getElementById('repoErr');
    var url = document.getElementById('f_url').value;
    var gh = parseGitHub(url);
    if (!gh) { err.textContent = 'Pon una URL válida de GitHub (github.com/usuario/repo).'; return; }
    var desc = document.getElementById('f_desc').value.trim();
    if (desc.length < 12) { err.textContent = 'Describe el repo un poco más (mín. 12 caracteres).'; return; }
    var lang = document.getElementById('f_lang').value.trim() || 'Otro';
    var tags = document.getElementById('f_tags').value.split(',').map(function (t) { return t.trim().toLowerCase(); }).filter(Boolean).slice(0, 4);

    add({
      id: 'u:' + Date.now() + ':' + gh.owner + '/' + gh.name,
      name: gh.name, owner: gh.owner,
      url: 'https://github.com/' + gh.owner + '/' + gh.name,
      desc: desc, lang: lang, tags: tags,
    });
    closeModal();
    document.getElementById('repoForm').reset();
    render('');
    var grid = document.getElementById('repoGrid');
    if (grid) grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.toast('¡Repo publicado! Gracias por aportar 🐺');
  }

  function init() {
    initModalDatalist();
    render('');
    var search = document.getElementById('repoSearch');
    if (search) search.addEventListener('input', function () { render(search.value); });
    document.querySelectorAll('[data-open-repo]').forEach(function (b) { b.addEventListener('click', openModal); });
    document.querySelectorAll('[data-close-repo]').forEach(function (b) { b.addEventListener('click', closeModal); });
    var backdrop = document.getElementById('repoModal');
    if (backdrop) backdrop.addEventListener('click', function (e) { if (e.target === backdrop) closeModal(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });
    var form = document.getElementById('repoForm');
    if (form) form.addEventListener('submit', submit);
  }

  if (document.readyState !== 'loading') init();
  else document.addEventListener('DOMContentLoaded', init);
})();
