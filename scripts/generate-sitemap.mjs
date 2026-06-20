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
  "ai-tarot-bazi-relationship-timing.html": { changefreq: "weekly", priority: "0.8" },
  "best-job-search-timing-tarot-bazi.html": { changefreq: "weekly", priority: "0.8" },
  "relationship-problems-tarot-bazi.html": { changefreq: "weekly", priority: "0.8" },
  "online-fortune-telling-guide.html": { changefreq: "weekly", priority: "0.8" },
  "tarot-for-decision-making.html": { changefreq: "weekly", priority: "0.8" },
  "how-to-ask-better-tarot-questions.html": { changefreq: "weekly", priority: "0.8" },
  "tarot-for-no-contact.html": { changefreq: "weekly", priority: "0.8" },
  "no-contact-rule-tarot-bazi-timing.html": { changefreq: "weekly", priority: "0.8" },
  "tarot-yes-or-no-love.html": { changefreq: "weekly", priority: "0.8" },
  "should-i-text-him-tarot.html": { changefreq: "weekly", priority: "0.8" },
  "should-i-text-him-after-no-contact-tarot-faq.html": { changefreq: "weekly", priority: "0.8" },
  "is-this-relationship-over-tarot.html": { changefreq: "weekly", priority: "0.8" },
  "when-will-i-get-a-job-tarot.html": { changefreq: "weekly", priority: "0.8" },
  "2026-forecast-special.html": { changefreq: "weekly", priority: "0.9" },
  "2026-fire-horse-career-guide.html": { changefreq: "weekly", priority: "0.8" },
  "2026-love-forecast-tarot-bazi.html": { changefreq: "weekly", priority: "0.8" },
  "2026-tarot-i-ching-change-guide.html": { changefreq: "weekly", priority: "0.8" },
  "2026-no-contact-love-reading.html": { changefreq: "weekly", priority: "0.8" },
  "2026-bazi-reading-for-jia-wood-daymaster.html": { changefreq: "weekly", priority: "0.8" },
  "2026-chinese-zodiac-forecast.html": { changefreq: "weekly", priority: "0.9" },
  "2026-dog-horoscope.html": { changefreq: "weekly", priority: "0.8" },
  "2026-dragon-horoscope.html": { changefreq: "weekly", priority: "0.8" },
  "2026-fire-horse-year-for-water-signs-career.html": { changefreq: "weekly", priority: "0.8" },
  "2026-entrepreneur-bazi-luck-pillar-guide.html": { changefreq: "weekly", priority: "0.8" },
  "2026-should-i-quit-my-job-tarot-i-ching.html": { changefreq: "weekly", priority: "0.8" },
  "2026-should-i-accept-this-job-offer-tarot.html": { changefreq: "weekly", priority: "0.8" },
  "2026-final-round-interview-tarot-guide.html": { changefreq: "weekly", priority: "0.8" },
  "2026-goat-horoscope.html": { changefreq: "weekly", priority: "0.8" },
  "2026-horse-horoscope.html": { changefreq: "weekly", priority: "0.8" },
  "2026-will-they-reach-out-no-contact.html": { changefreq: "weekly", priority: "0.8" },
  "2026-star-tarot-vs-bazi-wood-luck.html": { changefreq: "weekly", priority: "0.8" },
  "2026-i-ching-hexagram-1-bazi-career-guide.html": { changefreq: "weekly", priority: "0.8" },
  "2026-monkey-horoscope.html": { changefreq: "weekly", priority: "0.8" },
  "2026-ox-horoscope.html": { changefreq: "weekly", priority: "0.8" },
  "2026-pig-horoscope.html": { changefreq: "weekly", priority: "0.8" },
  "2026-rabbit-horoscope.html": { changefreq: "weekly", priority: "0.8" },
  "2026-rat-horoscope.html": { changefreq: "weekly", priority: "0.8" },
  "2026-rooster-horoscope.html": { changefreq: "weekly", priority: "0.8" },
  "2026-snake-horoscope.html": { changefreq: "weekly", priority: "0.8" },
  "2026-tiger-horoscope.html": { changefreq: "weekly", priority: "0.8" },
  "about.html": { changefreq: "monthly", priority: "0.6" },
  "privacy.html": { changefreq: "monthly", priority: "0.6" },
  "terms.html": { changefreq: "monthly", priority: "0.6" },
  "is-he-thinking-about-me-tarot.html": { changefreq: "weekly", priority: "0.8" },
  "should-i-change-careers-tarot.html": { changefreq: "weekly", priority: "0.8" },
  "should-i-leave-my-job-tarot.html": { changefreq: "weekly", priority: "0.8" },
  "should-i-stay-in-my-current-job-tarot.html": { changefreq: "weekly", priority: "0.8" },
  "should-i-take-this-job-tarot.html": { changefreq: "weekly", priority: "0.8" },
  "will-he-contact-me-again-tarot.html": { changefreq: "weekly", priority: "0.8" },
  "will-he-realize-what-he-lost-tarot.html": { changefreq: "weekly", priority: "0.8" },
  "will-he-regret-losing-me-tarot.html": { changefreq: "weekly", priority: "0.8" },
  "will-i-get-the-job-tarot.html": { changefreq: "weekly", priority: "0.8" },
  "will-my-ex-come-back-tarot.html": { changefreq: "weekly", priority: "0.8" }
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
    const path = file === "index.html" ? "/" : `/${file.replace(/\.html$/, "")}`;
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

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`;

writeFileSync(join(rootDir, "sitemap.xml"), sitemapXml, "utf8");
console.log(`Generated sitemap.xml with ${htmlFiles.length} URLs.`);
