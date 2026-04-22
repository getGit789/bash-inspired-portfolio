const SITE_ORIGIN = "https://damirkranjcevic.com";

export type PageSeo = {
  title: string;
  description: string;
  /** pathname including leading slash */
  path: string;
  /** e.g. noindex for soft-404 SPA routes */
  robots?: string;
};

const ROUTES: Record<string, PageSeo> = {
  "/": {
    title: "Damir Kranjcevic - Full-Stack Engineer",
    description:
      "Full-stack and AI engineer. Founder of Beekio — FastAPI, React, LLM pipelines, and production infrastructure. Previously system administrator and enterprise support. Open to remote roles.",
    path: "/",
  },
  "/why": {
    title: "Why I Build | Damir Kranjcevic",
    description:
      "Why I ship side projects, learn in public, and invest in a terminal-style portfolio — passion, purpose, and growth as a full-stack engineer.",
    path: "/why",
  },
  "/projects": {
    title: "Projects | Damir Kranjcevic",
    description:
      "Selected work: Beekio, PriceRuled, Sudowear, Pingit, Python interpreter, dashboards, and more — React, FastAPI, AI integrations, and e-commerce.",
    path: "/projects",
  },
  "/experience": {
    title: "Experience | Damir Kranjcevic",
    description:
      "Professional background: founder and full-stack engineer, system administrator at Mozzartbet, IT support and training at AT&T Brno, and web development roles.",
    path: "/experience",
  },
  "/certifications": {
    title: "Certifications | Damir Kranjcevic",
    description:
      "Google IT Automation with Python, CompTIA Security+, CompTIA A+, JavaScript certifications, and other credentials supporting full-stack and security work.",
    path: "/certifications",
  },
  "/skills": {
    title: "Skills | Damir Kranjcevic",
    description:
      "Languages, frontend and backend frameworks, databases, AI/LLM tooling, DevOps, auth, payments, and system administration — skills overview.",
    path: "/skills",
  },
  "/education": {
    title: "Education | Damir Kranjcevic",
    description: "Education history and academic background on Damir Kranjcevic's portfolio.",
    path: "/education",
  },
  "/contact": {
    title: "Contact | Damir Kranjcevic",
    description:
      "Get in touch with Damir Kranjcevic for full-stack, AI engineering, or collaboration opportunities — contact form and links.",
    path: "/contact",
  },
};

const DEFAULT_SEO: PageSeo = {
  title: "Page not found | Damir Kranjcevic",
  description: "The requested page could not be found on damirkranjcevic.com.",
  path: "/",
  robots: "noindex, follow",
};

export function getSeoForPath(pathname: string): PageSeo {
  const known = ROUTES[pathname];
  if (known) return known;
  const path = pathname || "/";
  return { ...DEFAULT_SEO, path };
}

function ensureMeta(name: string, attr: "name" | "property"): HTMLMetaElement {
  const selector = `meta[${attr}="${name}"]`;
  let el = document.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  return el;
}

function ensureLink(rel: string): HTMLLinkElement {
  const selector = `link[rel="${rel}"]`;
  let el = document.querySelector<HTMLLinkElement>(selector);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  return el;
}

/** Updates document title, meta description, and canonical for the current SPA route. */
export function applyPageSeo(seo: PageSeo): void {
  document.title = seo.title;

  const desc = ensureMeta("description", "name");
  desc.setAttribute("content", seo.description);

  const canonical = ensureLink("canonical");
  const path = seo.path === "/" ? "/" : seo.path.replace(/\/$/, "") || "/";
  const url = path === "/" ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${path}`;
  canonical.setAttribute("href", url);

  const robotsMeta = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
  if (seo.robots) {
    ensureMeta("robots", "name").setAttribute("content", seo.robots);
  } else if (robotsMeta) {
    robotsMeta.remove();
  }
}
