# Portfolio — Damir Kranjčević

Terminal-inspired personal site: hero, projects (featured + legacy), experience, skills, certifications, contact, resume download with optional email/SMS verification.

**Live:** [damirkranjcevic.com](https://damirkranjcevic.com)

## Stack

- **Vite** + **React** + **TypeScript**
- **Tailwind CSS** + **shadcn/ui**
- **React Router**
- Hosted on **Cloudflare Pages** (static `dist/`)

## Local development

Requires **Node.js 20+** and npm.

```sh
git clone https://github.com/getGit789/bash-inspired-portfolio.git
cd bash-inspired-portfolio
npm ci
npm run dev
```

## Environment variables

Secrets are **not** committed. Use the committed template only:

1. Copy [`env.example.template`](./env.example.template) to `.env` or `.env.local`.
2. Fill in values locally. For production, set the same keys in **Cloudflare Pages → Settings → Environment variables** (Production and Preview as needed).

| Prefix | Purpose |
|--------|---------|
| `VITE_EMAILJS_*` | Email OTP for resume download (optional) |
| `VITE_INFOBIP_*` | SMS OTP via Infobip 2FA (optional) |
| `VITE_WEB3FORMS_ACCESS_KEY` | Contact form + owner notifications |
| `VITE_OWNER_EMAIL` | Where Web3Forms / notifications go |
| `VITE_EMAIL_API_ENDPOINT` | Optional custom backend for codes |

**Security:** Any `VITE_*` variable is embedded in the client bundle at build time. Treat them as **public** in the shipped site. For highly sensitive APIs, use a backend proxy (see [`SECURITY.md`](./SECURITY.md) if present).

Do **not** commit `.env`, `.env.local`, or a populated `.env.example`. Infobip **Application ID** / **Message ID** are also sensitive for abuse—keep them in env/dashboard only.

## Cloudflare Pages (deploy)

- **Build command:** `npm ci && npm run build`
- **Output directory:** `dist`
- If the dashboard runs `bun install` by mistake, set **`SKIP_DEPENDENCY_INSTALL=1`** and keep the build command above (see comments in `env.example.template`).

Custom domain and DNS are configured in Cloudflare; email (e.g. Hostinger) can stay **DNS only** while web goes to Pages.

## Project layout (high level)

- `src/pages/` — `Index`, `Projects`, `Experience`, `Skills`, `Certifications`, `Contact`, `Why`
- `src/components/` — shared UI, `Navbar`, resume download dialog, contact form
- `src/utils/resumeVerification.ts` — EmailJS / Infobip / Web3Forms flows
- `public/` — static assets, resume PDF, project screenshots

## Docs

- [`TROUBLESHOOTING.md`](./TROUBLESHOOTING.md) — env and build issues
- [`INFOBIP_SETUP.md`](./INFOBIP_SETUP.md) — Infobip 2FA setup (placeholders only)

## License / usage

Personal portfolio; reuse patterns with attribution if helpful.
