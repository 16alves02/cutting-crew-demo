import { existsSync, rmSync } from "node:fs";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv, type Plugin } from "vite";
import { seo } from "./src/data/seo.ts";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

function siteUrlFrom(env: Record<string, string>): string {
  const bruto = env.SITE_URL ||
    (env.VERCEL_PROJECT_PRODUCTION_URL && `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
    env.URL ||
    env.CF_PAGES_URL ||
    "";
  return bruto.replace(/\/+$/, "");
}

/** Metadados do protótipo. A indexação é sempre bloqueada nesta fase. */
function siteMeta(siteUrl: string): Plugin {
  let base = "/";
  let isSsr = false;
  return {
    name: "concept-proposal-site-meta",
    configResolved(c) {
      base = c.base;
      isSsr = !!c.build.ssr;
    },
    transformIndexHtml: {
      order: "post",
      handler(html, ctx) {
        const t: string[] = [];
        t.push(`<title>${esc(seo.demo.title)}</title>`);
        t.push(`<meta name="description" content="${esc(seo.demo.description)}" />`);
        t.push(`<meta name="theme-color" content="${seo.themeColor}" />`);
        t.push(`<meta name="robots" content="noindex, nofollow, noarchive" />`);
        t.push(`<meta name="googlebot" content="noindex, nofollow, noarchive" />`);
        t.push(`<meta property="og:type" content="website" />`);
        t.push(`<meta property="og:site_name" content="${esc(seo.siteName)}" />`);
        t.push(`<meta property="og:locale" content="${seo.ogLocale}" />`);
        t.push(`<meta property="og:title" content="${esc(seo.demo.title)}" />`);
        t.push(`<meta property="og:description" content="${esc(seo.demo.description)}" />`);
        if (siteUrl) t.push(`<meta property="og:url" content="${siteUrl}/" />`);
        t.push(`<meta name="twitter:card" content="summary" />`);
        t.push(`<meta name="twitter:title" content="${esc(seo.demo.title)}" />`);
        t.push(`<meta name="twitter:description" content="${esc(seo.demo.description)}" />`);
        if (ctx.bundle) {
          for (const nome of Object.keys(ctx.bundle)) {
            if (nome.endsWith(".woff2")) {
              t.push(`<link rel="preload" as="font" type="font/woff2" href="${base}${nome}" crossorigin />`);
            }
          }
        }
        return html.replace("<!--seo-->", t.join("\n    "));
      },
    },
    closeBundle() {
      if (!isSsr && existsSync("dist/images/pendentes")) rmSync("dist/images/pendentes", { recursive: true, force: true });
    },
    generateBundle() {
      this.emitFile({
        type: "asset",
        fileName: "robots.txt",
        source: "# Protótipo privado: não indexar.\nUser-agent: *\nDisallow: /\n",
      });
      const geral = [
        "  X-Content-Type-Options: nosniff",
        "  Referrer-Policy: strict-origin-when-cross-origin",
        "  Permissions-Policy: camera=(), microphone=(), geolocation=()",
        "  X-Robots-Tag: noindex, nofollow, noarchive",
      ].join("\n");
      this.emitFile({
        type: "asset",
        fileName: "_headers",
        source: `/*\n${geral}\n/assets/*\n  Cache-Control: public, max-age=31536000, immutable\n`,
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: { __ANO_COMPILACAO__: JSON.stringify(new Date().getFullYear()) },
    plugins: [react(), siteMeta(siteUrlFrom(env))],
      };
});