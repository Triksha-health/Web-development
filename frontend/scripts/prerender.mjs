/**
 * Build step 3 of 3 (see "build" in package.json).
 *
 * The site is a single-page React app, which on its own ships an almost
 * empty HTML file: Google, WhatsApp and LinkedIn previews saw no content.
 * This script renders the public pages to HTML at build time and writes
 * them into dist/, each with its own title, description and social tags.
 * The browser then attaches React to that HTML (see src/main.tsx).
 *
 *   dist/index.html          homepage, prerendered
 *   dist/privacy.html        prerendered, served at /privacy
 *   dist/terms.html          prerendered, served at /terms
 *   dist/app.html            the plain app shell, served for every other
 *                            route (sign in, admin, ...) via netlify.toml
 *   dist/sitemap.xml         generated from the same route list
 */
import { readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const ssrDir = join(root, "dist-ssr");

const template = readFileSync(join(dist, "index.html"), "utf8");
const ROOT_TAG = '<div id="root"></div>';
if (!template.includes(ROOT_TAG)) {
  throw new Error(`prerender: could not find ${ROOT_TAG} in dist/index.html`);
}

// Keep an untouched copy of the shell for routes that are not prerendered.
writeFileSync(join(dist, "app.html"), template);

const { render, PAGE_META, PRERENDER_ROUTES, SITE_URL } = await import(
  pathToFileURL(join(ssrDir, "entry-server.js")).href
);

const escapeAttr = (s) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Replace the content="..." (or href="...") of one tag, failing loudly if it is missing. */
function setAttr(html, tagPattern, attr, value) {
  const re = new RegExp(`(<${tagPattern}[^>]*?\\s${attr}=")[^"]*(")`, "s");
  if (!re.test(html)) throw new Error(`prerender: tag not found: <${tagPattern} ${attr}>`);
  return html.replace(re, (_, a, b) => a + escapeAttr(value) + b);
}

function withHead(html, route) {
  const { title, description } = PAGE_META[route];
  const url = SITE_URL + (route === "/" ? "/" : route);

  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeAttr(title)}</title>`);
  html = setAttr(html, 'meta\\s+name="description"', "content", description);
  html = setAttr(html, 'link\\s+rel="canonical"', "href", url);
  html = setAttr(html, 'meta\\s+property="og:title"', "content", title);
  html = setAttr(html, 'meta\\s+property="og:description"', "content", description);
  html = setAttr(html, 'meta\\s+property="og:url"', "content", url);
  html = setAttr(html, 'meta\\s+name="twitter:title"', "content", title);
  html = setAttr(html, 'meta\\s+name="twitter:description"', "content", description);

  // The hero image is only on the homepage; don't make other pages fetch it early.
  if (route !== "/") {
    html = html.replace(/\s*<link rel="preload" as="image"[^>]*>/, "");
  }
  return html;
}

for (const route of PRERENDER_ROUTES) {
  const markup = render(route);
  // A page that renders to almost nothing means something broke; don't ship it.
  if (markup.length < 2000 || !markup.includes("<footer")) {
    throw new Error(`prerender: ${route} rendered suspiciously little HTML (${markup.length} chars)`);
  }

  // data-prerendered tells main.tsx which page this HTML belongs to, so it
  // only attaches to it when the address in the browser matches.
  const html = withHead(template, route).replace(
    ROOT_TAG,
    `<div id="root" data-prerendered="${route}">${markup}</div>`
  );
  // Flat files (privacy.html, not privacy/index.html) so /privacy is served
  // as-is, with no redirect to a trailing slash.
  const outFile = route === "/" ? "index.html" : `${route.slice(1)}.html`;
  writeFileSync(join(dist, outFile), html);
  console.log(`prerendered ${route.padEnd(10)} ${(html.length / 1024).toFixed(1)} kB`);
}

const today = new Date().toISOString().slice(0, 10);
const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  PRERENDER_ROUTES.map(
    (route) =>
      `  <url><loc>${SITE_URL}${route === "/" ? "/" : route}</loc><lastmod>${today}</lastmod></url>\n`
  ).join("") +
  `</urlset>\n`;
writeFileSync(join(dist, "sitemap.xml"), sitemap);

// The server bundle was only needed to produce the HTML above.
rmSync(ssrDir, { recursive: true, force: true });
