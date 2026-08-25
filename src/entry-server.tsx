import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { AppShell } from "./App";
import { ROUTES, getSeoForPath } from "./utils/seo";

export const routes = Object.keys(ROUTES);

export function render(path: string) {
  const html = renderToString(
    <StaticRouter location={path}>
      <AppShell />
    </StaticRouter>
  );
  return { html, seo: getSeoForPath(path) };
}
