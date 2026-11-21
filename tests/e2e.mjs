// Testes de ponta a ponta do protótipo conceptual (Playwright + axe-core).
// Uso: npm run build && npm run test:e2e
// O preview é iniciado e terminado pelo próprio script.
import { createRequire } from "node:module";
import { spawn } from "node:child_process";
import { readFile } from "node:fs/promises";

const require = createRequire(import.meta.url);
let chromium;
try {
  ({ chromium } = require("playwright"));
} catch {
  console.error("Falta o Playwright. Corre: npm install && npx playwright install chromium");
  process.exit(2);
}

const PORT = 4179;
const BASE = `http://localhost:${PORT}/`;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

if (await fetch(BASE).then(() => true, () => false)) {
  console.error(`A porta ${PORT} já está em uso. Termina esse processo e volta a correr.`);
  process.exit(2);
}

const server = spawn(process.execPath, ["node_modules/vite/bin/vite.js", "preview", "--port", String(PORT), "--strictPort"], { stdio: "ignore" });
const results = [];
const check = (name, ok, detail = "") => {
  results.push({ name, ok });
  console.log(`${ok ? "PASSOU" : "FALHOU"}  ${name}${detail ? ` — ${detail}` : ""}`);
};

let browser;
try {
  for (let i = 0; i < 50; i++) {
    try { if ((await fetch(BASE)).ok) break; } catch {}
    await sleep(200);
  }

  browser = await chromium.launch();
  const axeSrc = await readFile("node_modules/axe-core/axe.min.js", "utf8");
  const html = await (await fetch(BASE)).text();
  check("HTML pré-renderizado identifica a proposta conceptual", /CUTTING CREW/i.test(html) && /Surpreendendo/i.test(html));
  check("página bloqueia indexação", /name="robots" content="noindex, nofollow, noarchive"/i.test(html));

  const robotsResponse = await fetch(`${BASE}robots.txt`);
  const robots = await robotsResponse.text();
  check("robots.txt impede indexação", robotsResponse.ok && /Disallow: \/\s*$/m.test(robots));

  const removedAssets = [
    "images/logo-240.webp",
    "images/emblema-340.webp",
    "images/fotos/foto-1-640.webp",
    "og-image.jpg",
  ];
  for (const asset of removedAssets) {
    const response = await fetch(`${BASE}${asset}`);
    const type = response.headers.get("content-type") || "";
    check(`recurso gráfico removido: ${asset}`, !type.startsWith("image/"));
  }
  const favicon = await (await fetch(`${BASE}favicon.svg`)).text();
  check("favicon neutro da proposta disponível", /<svg/i.test(favicon) && /#171717/.test(favicon));

  for (const [name, viewport] of [
    ["telemóvel", { width: 390, height: 844 }],
    ["tablet", { width: 768, height: 1024 }],
    ["computador", { width: 1440, height: 900 }],
    ["ecrã estreito", { width: 320, height: 640 }],
  ]) {
    const context = await browser.newContext({ viewport });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
    page.on("requestfailed", (request) => errors.push(`pedido falhado: ${request.url()}`));
    page.on("response", (response) => { if (response.status() >= 400) errors.push(`HTTP ${response.status()}: ${response.url()}`); });

    await page.goto(BASE, { waitUntil: "networkidle" });
    check(`[${name}] sem erros de JavaScript ou pedidos falhados`, errors.length === 0, errors.slice(0, 3).join(" | "));
    check(`[${name}] sem scroll horizontal`, await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    check(`[${name}] apenas um título principal`, (await page.locator("h1").count()) === 1);
    check(`[${name}] não apresenta imagens nem ligações externas`,
      (await page.locator("img").count()) === 0 && (await page.locator("a[href^=http]").count()) === 0);

    const disclaimer = await page.locator("body").innerText();
    check(`[${name}] identifica o protótipo como não oficial`, /protótipo/i.test(disclaimer));
    check(`[${name}] galeria e equipa têm espaços reservados sem imagens de terceiros`,
      (await page.locator("#galeria li").count()) === 6 && (await page.locator("#equipa li").count()) === 3 && (await page.locator("#galeria img, #equipa img").count()) === 0);
    check(`[${name}] botão de marcação aponta para o Fresha`,
      (await page.locator("a[href*=\"fresha.com\"]").count()) >= 1);

    const anchors = await page.locator("a[href^=\"#\"]").evaluateAll((links) => links.map((link) => link.getAttribute("href")));
    const missingAnchors = await page.evaluate((hrefs) => hrefs.filter((href) => href && href !== "#" && !document.querySelector(href)), anchors);
    check(`[${name}] âncoras internas funcionam`, missingAnchors.length === 0, missingAnchors.join(", "));

    if (name === "telemóvel") {
      const menu = page.getByRole("button", { name: /menu/i });
      await menu.click();
      check("menu móvel abre", (await menu.getAttribute("aria-expanded")) === "true");
      check("conteúdo fica inerte com o menu aberto", await page.locator("main").evaluate((el) => el.inert));
      await page.keyboard.press("Escape");
      check("Escape fecha o menu", (await menu.getAttribute("aria-expanded")) === "false");
    }

    if (name === "computador") {
      const metadata = await page.evaluate(() => ({
        title: document.title,
        description: document.querySelector('meta[name="description"]')?.content ?? "",
        ogImage: document.querySelector('meta[property="og:image"]'),
        twitterImage: document.querySelector('meta[name="twitter:image"]'),
        lang: document.documentElement.lang,
      }));
      check("metadados identificam a proposta e não incluem imagens externas",
        /protótipo/i.test(metadata.title) && /protótipo/i.test(metadata.description) && !metadata.ogImage && !metadata.twitterImage && metadata.lang === "pt-PT");
      check("nenhum dado de equipa é apresentado",
        !/Almeida|Rúben|Hiago|Cutting Gu/i.test(await page.locator("#equipa").innerText()));
      check("secções comerciais assinalam os dados como provisórios",
        /não foram confirmados/i.test(await page.locator("#servicos").innerText()) && /não foram confirmados/i.test(await page.locator("#localizacao").innerText()));

      await page.evaluate(axeSrc);
      const accessibility = await page.evaluate(() => window.axe.run(document, {
        runOnly: ["wcag2a", "wcag2aa", "wcag21aa", "best-practice"],
      }));
      check("axe-core: sem violações WCAG detetadas", accessibility.violations.length === 0,
        accessibility.violations.map((item) => item.id).join(", "));
    }

    await context.close();
  }

  const reduced = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
  const reducedPage = await reduced.newPage();
  await reducedPage.goto(BASE, { waitUntil: "networkidle" });
  const animation = await reducedPage.locator(".hero__reveal").evaluate((el) => getComputedStyle(el).animationName);
  check("prefers-reduced-motion desativa a animação do hero", animation === "none", animation);
  await reduced.close();
} catch (error) {
  check("execução dos testes terminou sem exceções", false, error instanceof Error ? error.message : String(error));
} finally {
  await browser?.close();
  server.kill();
}

const failures = results.filter((result) => !result.ok);
console.log(`\n${results.length - failures.length}/${results.length} testes passaram`);
process.exit(failures.length ? 1 : 0);