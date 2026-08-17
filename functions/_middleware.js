const retiredRedirects = new Map([
  ["/2026-will-they-reach-out-no-contact", "/tarot-for-no-contact"],
  ["/2026-final-round-interview-tarot-guide", "/tarot-spread-for-job-interview"],
  ["/2026-star-tarot-vs-bazi-wood-luck", "/2026-forecast-special"],
  ["/2026-entrepreneur-bazi-luck-pillar-guide", "/2026-forecast-special"],
  ["/2026-tarot-i-ching-change-guide", "/yijing-guide"],
  ["/2026-i-ching-hexagram-1-bazi-career-guide", "/career-guidance-i-ching-astrology"],
  ["/2026-should-i-quit-my-job-tarot-i-ching", "/should-i-leave-my-job-tarot"],
  ["/2026-fire-horse-year-for-water-signs-career", "/2026-fire-horse-career-guide"],
  ["/2026-no-contact-love-reading", "/tarot-for-no-contact"]
]);

for (const [source, target] of [...retiredRedirects.entries()]) {
  retiredRedirects.set(`${source}.html`, target);
}

function redirectResponse(location, status = 301) {
  return new Response(null, {
    status,
    headers: {
      Location: location,
      "Cache-Control": "public, max-age=3600"
    }
  });
}

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const normalizedPath = url.pathname === "/"
    ? "/"
    : url.pathname.replace(/\/+$/, "");

  if (url.protocol === "http:" || url.hostname.toLowerCase() === "www.aitarot.online") {
    const canonical = new URL(`https://aitarot.online${normalizedPath}`);
    canonical.search = url.search;
    return redirectResponse(canonical.toString());
  }

  const targetPath = retiredRedirects.get(normalizedPath);
  if (targetPath) {
    const target = new URL(targetPath, "https://aitarot.online");
    target.search = url.search;
    return redirectResponse(target.toString());
  }

  return context.next();
}
