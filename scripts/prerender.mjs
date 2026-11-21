// Pré-renderiza a página: escreve o HTML da aplicação dentro de dist/index.html.
// Resultado: o conteúdo existe no HTML (rápido, bom para SEO e para quem tem JavaScript desligado)
// e o React só "hidrata" por cima.
import { readFile, writeFile, rm } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const ssr = resolve("dist-ssr/entry-server.js");
const { render } = await import(pathToFileURL(ssr).href);

const caminho = resolve("dist/index.html");
const pagina = await readFile(caminho, "utf8");
const marcador = '<div id="root"></div>';
if (!pagina.includes(marcador)) throw new Error("Marcador <div id=\"root\"></div> não encontrado em dist/index.html");

await writeFile(caminho, pagina.replace(marcador, `<div id="root">${render()}</div>`));
await rm(resolve("dist-ssr"), { recursive: true, force: true });
console.log("Pré-renderização concluída: dist/index.html");
