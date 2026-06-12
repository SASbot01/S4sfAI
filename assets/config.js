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

  // ── CTA principal: la formación (Skool) ──────────────────────────────────
  formacion: {
    url: 'PEGA_AQUI_LINK_SKOOL',     // ← enlace de tu Skool / formación
    name: 'La formación',
    price: '',                       // opcional, ej. '49€/mes' (vacío = no se muestra)
  },

  // ── Los 4 botones del hub ────────────────────────────────────────────────
  links: {
    whatsapp: 'PEGA_AQUI_LINK_WHATSAPP',   // ← invitación a la comunidad de WhatsApp
    skool:    'PEGA_AQUI_LINK_SKOOL',      // ← comunidad de Skool (suele ser el mismo que la formación)
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
    demo: 'PEGA_AQUI_LINK_APEX_CLOSER',    // ← demo / web pública de Apex Closer si la tienes
  },

  // Repos que aparecen "destacados" de serie en el marketplace (semilla).
  // El resto los va añadiendo la gente; se guardan en su navegador (localStorage).
  seedRepos: [
    {
      name: 'Apex-operations', owner: 'aatshadow',
      url: 'https://github.com/aatshadow/Apex-operations',
      desc: 'Plataforma de operaciones de BlackWolf. CRM, ventas, métricas, IA local. El producto estrella.',
      lang: 'TypeScript', tags: ['saas', 'crm', 'ia'], featured: true,
    },
    {
      name: 'apexclosers', owner: 'SASbot01',
      url: 'https://github.com/SASbot01/apexclosers',
      desc: 'Sistema operativo para closers de habla hispana: graba, transcribe y analiza tus llamadas de venta con IA.',
      lang: 'JavaScript', tags: ['ventas', 'ia', 'closers'], featured: true,
    },
    {
      name: 'ai-agent-console', owner: 'aatshadow',
      url: 'https://github.com/aatshadow',
      desc: 'Orquestación multi-agente: tmux + Claude Code + Telegram, self-hosted en VPS.',
      lang: 'Python', tags: ['agentes', 'automatizacion'], featured: true,
    },
  ],
};
