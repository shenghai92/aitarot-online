import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const rootDir = process.cwd();
const siteUrl = "https://aitarot.online";
const expectedRobots = [
  "User-agent: *",
  "Allow: /",
  `Sitemap: ${siteUrl}/sitemap.xml`
];
const expectedRedirects = [
  "https://www.aitarot.online/* https://aitarot.online/:splat 301!",
  "http://www.aitarot.online/* https://aitarot.online/:splat 301!",
  "http://aitarot.online/* https://aitarot.online/:splat 301!"
];
const htmlFiles = readdirSync(rootDir)
  .filter((file) => file.endsWith(".html"))
  .sort((a, b) => a.localeCompare(b));

const slugs = new Set(
  htmlFiles.map((file) => (file === "index.html" ? "" : file.replace(/\.html$/, "")))
);

const expectedUrlForFile = (file) =>
  file === "index.html" ? `${siteUrl}/` : `${siteUrl}/${file.replace(/\.html$/, "")}`;

const sitemapText = readFileSync(join(rootDir, "sitemap.xml"), "utf8");
const robotsText = readFileSync(join(rootDir, "robots.txt"), "utf8");
const redirectsText = readFileSync(join(rootDir, "_redirects"), "utf8");
const sitemapUrls = new Set(
  Array.from(sitemapText.matchAll(/<loc>(.*?)<\/loc>/g), (match) => match[1].trim())
);

const issues = [];

for (const file of htmlFiles) {
  const source = readFileSync(join(rootDir, file), "utf8");
  const expectedUrl = expectedUrlForFile(file);

  const canonicalMatch = source.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i);
  if (!canonicalMatch) {
    issues.push(`${file}: missing canonical link`);
  } else if (canonicalMatch[1] !== expectedUrl) {
    issues.push(`${file}: canonical mismatch, expected ${expectedUrl} but found ${canonicalMatch[1]}`);
  }

  const ogUrlMatch = source.match(/<meta\s+property="og:url"\s+content="([^"]+)"/i);
  if (!ogUrlMatch) {
    issues.push(`${file}: missing og:url meta`);
  } else if (ogUrlMatch[1] !== expectedUrl) {
    issues.push(`${file}: og:url mismatch, expected ${expectedUrl} but found ${ogUrlMatch[1]}`);
  }

  if (!source.includes('<script src="ga4-proxy.js"></script>')) {
    issues.push(`${file}: missing ga4-proxy.js loader`);
  }

  if (!source.includes("cookie_domain: 'aitarot.online'")) {
    issues.push(`${file}: missing GA4 cookie_domain configuration`);
  }

  const mainEntityMatches = Array.from(
    source.matchAll(/"mainEntityOfPage"\s*:\s*"([^"]+)"/g),
    (match) => match[1]
  );
  for (const url of mainEntityMatches) {
    if (url !== expectedUrl) {
      issues.push(`${file}: mainEntityOfPage mismatch, expected ${expectedUrl} but found ${url}`);
    }
  }

  const localHtmlLinks = Array.from(
    source.matchAll(/(?:href|content|url)\s*=\s*"([^"]+\.html(?:[#?][^"]*)?)"/gi),
    (match) => match[1]
  );
  for (const link of localHtmlLinks) {
    issues.push(`${file}: found .html URL that should be extensionless -> ${link}`);
  }

  const siteHtmlLinks = Array.from(
    source.matchAll(new RegExp(`${siteUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}/[^"\\s]*\\.html`, "gi")),
    (match) => match[0]
  );
  for (const link of siteHtmlLinks) {
    issues.push(`${file}: found absolute .html URL that should be extensionless -> ${link}`);
  }

  const relativeLinks = Array.from(
    source.matchAll(/href="(\.\/[^"#?]+)"/g),
    (match) => match[1]
  );
  for (const href of relativeLinks) {
    const target = href.replace(/^\.\//, "");
    if (!slugs.has(target)) {
      issues.push(`${file}: relative link points to missing page -> ${href}`);
    }
  }

  if (!sitemapUrls.has(expectedUrl)) {
    issues.push(`${file}: missing from sitemap.xml -> ${expectedUrl}`);
  }
}

for (const url of sitemapUrls) {
  if (!url.startsWith(siteUrl)) continue;
  const path = url.slice(siteUrl.length);
  const slug = path === "/" ? "" : path.replace(/^\//, "");
  if (!slugs.has(slug)) {
    issues.push(`sitemap.xml: URL has no matching HTML file -> ${url}`);
  }
}

if (robotsText.charCodeAt(0) === 0xfeff) {
  issues.push("robots.txt: contains UTF-8 BOM, expected plain UTF-8 text");
}

const robotsLines = robotsText
  .split(/\r?\n/)
  .map((line) => line.trim())
  .filter(Boolean);

if (robotsLines.length !== expectedRobots.length) {
  issues.push(
    `robots.txt: expected ${expectedRobots.length} non-empty lines but found ${robotsLines.length}`
  );
}

expectedRobots.forEach((line, index) => {
  if (robotsLines[index] !== line) {
    issues.push(`robots.txt: line ${index + 1} mismatch, expected "${line}"`);
  }
});

const redirectLines = redirectsText
  .split(/\r?\n/)
  .map((line) => line.trim())
  .filter(Boolean);

if (redirectLines.length < expectedRedirects.length) {
  issues.push(`_redirects: expected at least ${expectedRedirects.length} rules`);
}

expectedRedirects.forEach((line) => {
  if (!redirectLines.includes(line)) {
    issues.push(`_redirects: missing rule "${line}"`);
  }
});

if (issues.length > 0) {
  console.error("Site validation failed:");
  for (const issue of issues) {
    console.error(`- ${issue}`);
  }
  process.exit(1);
}

console.log(`Site validation passed for ${htmlFiles.length} HTML files.`);
