// Converte fotografias autorizadas (pasta photos/) em WebP responsivo (public/images/fotos/).
// Uso: coloca ficheiros .jpg/.jpeg/.png em photos/ e corre: npm run imagens
import { readdir, mkdir } from "node:fs/promises";
import { join, parse } from "node:path";
import sharp from "sharp";

const ENTRADA = "photos";
const SAIDA = "public/images/fotos";
const LARGURAS = [640, 1200, 1800];

const ficheiros = (await readdir(ENTRADA).catch(() => [])).filter((f) => /\.(jpe?g|png)$/i.test(f));
if (ficheiros.length === 0) {
  console.log(`Nenhuma imagem em ${ENTRADA}/. Coloca lá fotografias autorizadas (.jpg ou .png) e volta a correr.`);
  process.exit(0);
}
await mkdir(SAIDA, { recursive: true });

for (const f of ficheiros) {
  const nome = parse(f).name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const img = sharp(join(ENTRADA, f)).rotate(); // respeita a orientação EXIF
  const { width, height } = await img.clone().metadata();
  for (const w of LARGURAS) {
    if (width && w > width) continue; // nunca aumentar
    await img.clone().resize({ width: w }).webp({ quality: 78 }).toFile(join(SAIDA, `${nome}-${w}.webp`));
  }
  const usadas = LARGURAS.filter((w) => !width || w <= width);
  console.log(`\n${f} -> ${usadas.map((w) => `${nome}-${w}.webp`).join(", ")}`);
  console.log(`Em src/data/gallery.ts usa:\n  image: responsiveImage("/images/fotos/${nome}", [${usadas.join(", ")}], { width: ${width}, height: ${height} }),`);
}
