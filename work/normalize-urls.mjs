import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = "C:/Users/赵海升/Documents/Codex/2026-05-29/corepapers";
const siteUrl = "https://aitarot.online";
const htmlFiles = readdirSync(root).filter((file) => file.endsWith(".html"));

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

for (const file of htmlFiles) {
  const fullPath = join(root, file);
  let text = readFileSync(fullPath, "utf8");

  for (const target of htmlFiles) {
    if (target === "index.html") continue;

    const slug = target.replace(/\.html$/, "");
    const escapedTarget = escapeRegex(target);

    text = text.replace(new RegExp(`${escapeRegex(siteUrl)}/${escapedTarget}`, "g"), `${siteUrl}/${slug}`);
    text = text.replace(new RegExp(`([\"'(/])${escapedTarget}([\"'#?])`, "g"), `$1${slug}$2`);
    text = text.replace(new RegExp(`([\"'(])\\./${escapedTarget}([\"'#?])`, "g"), `$1./${slug}$2`);
  }

  text = text.replace(/https:\/\/aitarot\.online\/index\.html/g, `${siteUrl}/`);
  text = text.replace(/([\"'(])\.\/index\.html([\"'#?])/g, "$1./$2");

  writeFileSync(fullPath, text, "utf8");
}
