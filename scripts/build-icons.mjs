// Convert icon.svg to PNG at the sizes stores expect.
// Run with: npm run build-icons
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const svg = fs.readFileSync(path.join(root, "icon.svg"));

const sizes = [192, 512, 1024];
for (const size of sizes) {
  const resvg = new Resvg(svg, { fitTo: { mode: "width", value: size } });
  const png = resvg.render().asPng();
  const out = path.join(root, `icon-${size}.png`);
  fs.writeFileSync(out, png);
  console.log(`wrote ${path.relative(root, out)} (${png.length} bytes)`);
}
