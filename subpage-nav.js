const subpageHeaderMarkup = `
  <a class="skip-link" href="#main-content">Skip to main content</a>
  <header class="site-header site-header-subpage">
    <div class="nav-shell">
      <a class="brand-lockup" href="./" aria-label="Love AI Tarot home">
        <span class="brand-mark">LT</span>
        <span>
          <strong class="brand-name">Love AI Tarot</strong>
          <span class="brand-sub">Private tarot guidance for love, career, and life decisions</span>
        </span>
      </a>
      <nav class="top-nav" aria-label="Primary">
        <a href="./#free-reading">Free reading</a>
        <a href="./#reading-room">Ask a question</a>
        <a href="./#plans">Plans</a>
        <a href="./tarot-for-no-contact">Love guides</a>
        <a href="./career-tarot-reading-online">Career guides</a>
        <a href="./ai-tarot-accuracy">How it works</a>
        <a href="./about#editorial-standards">Trust</a>
      </nav>
    </div>
  </header>
`;

const guideBoundaryMarkup = `
  <aside class="guide-boundary" aria-label="How to use this guide">
    <strong>Use this as reflection, not certainty.</strong>
    <span>Tarot and timing language can help you explore patterns and next steps, but they do not guarantee another person’s choices or replace professional advice.</span>
    <span class="guide-boundary-links" aria-label="Trust and method links">
      <a href="./ai-tarot-accuracy">How AI Tarot works</a>
      <a href="./about#editorial-standards">Editorial standards</a>
      <a href="./privacy">Privacy</a>
    </span>
  </aside>
`;

const body = document.body;
const main = document.querySelector("main");
const existingHeader = document.querySelector(".site-header");

if (body && main && !existingHeader) {
  body.insertAdjacentHTML("afterbegin", subpageHeaderMarkup);
  body.classList.add("has-subpage-nav");
}

if (main) {
  if (!main.id) main.id = "main-content";
  const guideShell = main.querySelector(".guide-shell");
  if (guideShell && !guideShell.querySelector(".guide-boundary")) {
    guideShell.insertAdjacentHTML("afterbegin", guideBoundaryMarkup);
  }
}
