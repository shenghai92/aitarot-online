import { readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const siteUrl = "https://aitarot.online";
const rootDir = process.cwd();

const priorityMap = {
  "index.html": { changefreq: "daily", priority: "1.0" },
  "tarot-guide.html": { changefreq: "weekly", priority: "0.8" },
  "astrology-guide.html": { changefreq: "weekly", priority: "0.8" },
  "yijing-guide.html": { changefreq: "weekly", priority: "0.8" },
  "bazi-guide.html": { changefreq: "weekly", priority: "0.8" },
  "ai-tarot-accuracy.html": { changefreq: "weekly", priority: "0.8" },
  "privacy-first-tarot-reading.html": { changefreq: "weekly", priority: "0.8" },
  "love-tarot-bazi-guide.html": { changefreq: "weekly", priority: "0.8" },
  "career-guidance-i-ching-astrology.html": { changefreq: "weekly", priority: "0.8" },
  "best-free-love-tarot-reading.html": { changefreq: "weekly", priority: "0.8" },
  "career-tarot-reading-online.html": { changefreq: "weekly", priority: "0.8" },
  "bazi-compatibility-guide.html": { changefreq: "weekly", priority: "0.8" },
  "tarot-for-no-contact.html": { changefreq: "weekly", priority: "0.8" },
  "tarot-yes-or-no-love.html": { changefreq: "weekly", priority: "0.8" },
  "should-i-text-him-tarot.html": { changefreq: "weekly", priority: "0.8" },
  "is-this-relationship-over-tarot.html": { changefreq: "weekly", priority: "0.8" },
  "when-will-i-get-a-job-tarot.html": { changefreq: "weekly", priority: "0.8" },
  "about.html": { changefreq: "monthly", priority: "0.6" },
  "privacy.html": { changefreq: "monthly", priority: "0.6" },
  "terms.html": { changefreq: "monthly", priority: "0.6" }
};

const excluded = new Set(["404.html"]);

const htmlFiles = readdirSync(rootDir)
  .filter((file) => file.endsWith(".html"))
  .filter((file) => !excluded.has(file))
  .sort((a, b) => {
    if (a === "index.html") return -1;
    if (b === "index.html") return 1;
    return a.localeCompare(b);
  });

const urlEntries = htmlFiles
  .map((file) => {
    const path = file === "index.html" ? "/" : `/${file}`;
    const meta = priorityMap[file] || { changefreq: "weekly", priority: "0.7" };
    const lastmod = statSync(join(rootDir, file)).mtime.toISOString().slice(0, 10);
    return `  <url>
    <loc>${siteUrl}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${meta.changefreq}</changefreq>
    <priority>${meta.priority}</priority>
  </url>`;
  })
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`;

writeFileSync(join(rootDir, "sitemap.xml"), xml, "utf8");
console.log(`Generated sitemap.xml with ${htmlFiles.length} URLs.`);
