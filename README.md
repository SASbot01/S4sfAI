# s4sf — Hub

Sitio de marca de **s4sf_ai**: hub de acceso + páginas de empresas y marketplace de repos.
Estética portada fielmente del software **APEX / APEX Closer** (tema "Apex Neón": verde lima
`#B2F23C` sobre negro-verdoso, Inter Tight + JetBrains Mono, atmósfera de nebulosas).

HTML/CSS/JS puro. **Cero build, cero dependencias.** Abre `index.html` y funciona.

## Páginas
| Archivo | Qué es |
|---|---|
| `index.html` | Hub principal: marca, CTA a la formación y los **4 botones** (WhatsApp · Skool · Empresas · Repos) |
| `empresas.html` | BlackWolf, APEX, APEX Closer y la cartera de clientes |
| `repos.html` | Marketplace de repos de GitHub (explorar + aportar el tuyo) |
| `assets/` | `theme.css` (diseño) · `atmosphere.js` (fondo) · `config.js` (**tus enlaces**) · `main.js` · `repos.js` |

## ⚙️ Lo único que tienes que tocar: `assets/config.js`

Cambia los valores que empiezan por `PEGA_AQUI_`:

```js
formacion.url → enlace de tu Skool / formación
links.whatsapp → invitación a la comunidad de WhatsApp
links.skool    → comunidad de Skool (normalmente el mismo de la formación)
apexCloser.demo → demo / web pública de Apex Closer (si la tienes)
```

Mientras un enlace siga con `PEGA_AQUI_...`, su botón queda en modo **"pendiente"**:
no navega a nada roto y avisa al hacer click. En cuanto pegas el enlace real, se activa solo.

> También puedes confirmar el handle exacto de la cuenta (`brand.handle`) y tu Instagram.

## Probar en local
```bash
cd /Users/s4sf/Documents/formacions4sf
python3 -m http.server 8080
# abre http://localhost:8080
```

## Desplegar
Cualquier hosting estático: **Vercel**, Netlify, Cloudflare Pages o GitHub Pages.
Con Vercel: arrastra la carpeta o `vercel deploy`. No hay paso de build.

> **Open Graph (vista al compartir):** las páginas ya traen meta OG/Twitter + imagen
> `assets/og.png` (1200×630). Al desplegar bajo tu dominio, cambia las URLs `og:image`
> y añade `og:url` con la ruta **absoluta** (`https://tudominio.com/assets/og.png`) — la
> mayoría de scrapers de redes no resuelven rutas relativas.

## Marketplace de repos — nota importante
Las altas de repos se guardan en `localStorage` (el navegador de cada visitante). Para que
los repos que aporta la gente se vean **entre todos**, hay que conectar un backend. Lo natural
con tu stack es **Supabase**: una tabla `repos` y sustituir en `assets/repos.js` las funciones
`load()` / `save()` / `add()` por llamadas al cliente de Supabase. La UI (búsqueda, validación,
tarjetas, modal) ya está montada para ello.
