/* ───────────────────────────────────────────────────────────────────────────
 * CONFIG — s4sf hub
 * ▟ AQUÍ van TUS enlaces. Cambia solo los valores con "PEGA_AQUI_...".
 *   Mientras tengan ese valor, el botón se marca como "próximamente" y no
 *   navega a ningún sitio roto. En cuanto pegues el enlace real, se activa.
 * ─────────────────────────────────────────────────────────────────────────── */
window.S4SF = {
  brand: {
    handle: 's4sf_ai',          // cuenta principal de IG/redes (confírmame el handle exacto)
    name: 'Alejandro Silvestre',
    role: 'Automatización & IA · Ciberseguridad',
    instagram: 'https://instagram.com/alexsilvstre_',
    linkedin: 'https://www.linkedin.com/in/alejandro-silvestre-s4sf/',
    company: 'BlackWolf Enterprises LLC',
    companyWeb: 'https://blackwolfsec.io',
  },

  // ── CTA principal: la formación ──────────────────────────────────────────
  formacion: {
    url: 'https://www.skool.com/apex-closers-4657/about',   // ← enlace de tu formación
    name: 'La formación',
    price: '',                       // opcional, ej. '49€/mes' (vacío = no se muestra)
  },

  // ── Los 4 botones del hub ────────────────────────────────────────────────
  links: {
    whatsapp: 'https://chat.whatsapp.com/F9s5CXiB5eE72j8MpOWBdK?mode=gi_t',   // comunidad de WhatsApp
    skool:    'https://www.skool.com/apex-closers-4657/about',   // comunidad / formación
    // "empresas" y "repos" son páginas internas de este mismo sitio:
    empresas: 'empresas.html',
    repos:    'repos.html',
  },

  // ── Productos / software propios (sección Empresas) ──────────────────────
  apex: {
    demo: 'https://central.blackwolfsec.io/apexdemo',
    repo: 'https://github.com/aatshadow/Apex-operations',
  },
  apexCloser: {
    repo: 'https://github.com/SASbot01/apexclosers',
    demo: 'https://www.skool.com/apex-closers-4657/about',    // comunidad / web pública de Apex Closer
  },

  // Marketplace de repos: SOLO aportes de la comunidad.
  // Tus propios repos no se publican aquí; la gente añade los suyos y se guardan
  // en su navegador (localStorage). Por eso el marketplace arranca vacío.
  seedRepos: [],
};
