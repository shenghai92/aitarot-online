const subpageHeaderMarkup = `
  <header class="site-header site-header-subpage">
    <div class="nav-shell">
      <a class="brand-lockup" href="./" aria-label="Love AI Tarot home">
        <span class="brand-mark">LT</span>
        <span>
          <strong class="brand-name">Love AI Tarot</strong>
          <span class="brand-sub">free tarot reading, love tarot, bazi timing</span>
        </span>
      </a>
      <nav class="top-nav" aria-label="Primary">
        <a href="./#free-reading">Free Reading</a>
        <a href="./#reading-room">Ask a Question</a>
        <a href="./#plans">Plans</a>
        <a href="./#memberships">Memberships</a>
        <a href="./2026-forecast-special">2026 Forecast Special</a>
        <a href="./2026-chinese-zodiac-forecast">2026 Zodiac Forecast</a>
        <a href="./#insights">Guides</a>
      </nav>
    </div>
  </header>
`;

const body = document.body;
const main = document.querySelector("main");
const existingHeader = document.querySelector(".site-header");

if (body && main && !existingHeader) {
  body.insertAdjacentHTML("afterbegin", subpageHeaderMarkup);
  body.classList.add("has-subpage-nav");
}
