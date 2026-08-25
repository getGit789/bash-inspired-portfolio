// Runs after `vite build`: renders every route to static HTML so crawlers
// (which do not execute JS) see real content, links, H1s, and canonicals.
import { execSync } from "node:child_process";
import { readFileSync, writeFileSync, rmSync } from "node:fs";

const ORIGIN = "https://damirkranjcevic.com";
const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
const setMeta = (html, attr, name, value) =>
  html.replace(new RegExp(`(<meta ${attr}="${name}" content=")[^"]*(")`), `$1${esc(value)}$2`);

execSync("npx vite build --ssr src/entry-server.tsx --outDir dist/server", { stdio: "inherit" });
const { render, routes } = await import("../dist/server/entry-server.js");
const template = readFileSync("dist/index.html", "utf8");

for (const path of [...routes, "/404"]) {
  const { html, seo } = render(path);
  const url = path === "/" ? `${ORIGIN}/` : `${ORIGIN}${path}`;
  let page = template
    .replace(/<title>[^<]*<\/title>/, `<title>${seo.title}</title>`)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
    .replace("</head>", `    <link rel="canonical" href="${url}" />\n${seo.robots ? `    <meta name="robots" content="${seo.robots}" />\n` : ""}  </head>`);
  page = setMeta(page, "name", "description", seo.description);
  page = setMeta(page, "property", "og:title", seo.title);
  page = setMeta(page, "property", "og:description", seo.description);
  page = setMeta(page, "property", "og:url", url);
  page = setMeta(page, "property", "twitter:title", seo.title);
  page = setMeta(page, "property", "twitter:description", seo.description);
  page = setMeta(page, "property", "twitter:url", url);
  const file = path === "/" ? "dist/index.html" : `dist${path}.html`;
  writeFileSync(file, page);
  console.log("prerendered", file);
}
rmSync("dist/server", { recursive: true, force: true });
