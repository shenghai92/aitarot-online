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
        <a class="nav-secondary" href="./#reading-room">Ask a question</a>
        <a class="nav-secondary" href="./#plans">Plans</a>
        <a href="./tarot-for-no-contact">Love guides</a>
        <a href="./career-tarot-reading-online">Career guides</a>
        <a class="nav-secondary" href="./ai-tarot-accuracy">How it works</a>
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
      <a href="./about#editorial-standards">Editorial Standards</a>
      <a href="./privacy">Privacy</a>
    </span>
  </aside>
`;

const subpageFooterMarkup = `
  <footer class="site-footer site-footer-subpage">
    <div class="footer-grid">
      <div class="footer-brand">
        <div class="footer-brandline">
          <span class="brand-mark">LT</span>
          <span class="footer-brandname">Love AI Tarot</span>
        </div>
        <p>Private, guidance-only reflection for love, career, and life decisions.</p>
        <p>Support: <a href="mailto:support@aitarot.online">support@aitarot.online</a></p>
      </div>
      <div>
        <h3>Explore</h3>
        <div class="footer-links">
          <a href="./tarot-for-no-contact">Love and no contact</a>
          <a href="./career-tarot-reading-online">Career and job decisions</a>
          <a href="./tarot-guide">Beginner Tarot guide</a>
          <a href="./tarot-for-decision-making">Tarot for decisions</a>
        </div>
      </div>
      <div>
        <h3>Method</h3>
        <div class="footer-links">
          <a href="./ai-tarot-accuracy">How AI Tarot works</a>
          <a href="./astrology-guide">Astrology guide</a>
          <a href="./bazi-guide">Bazi guide</a>
          <a href="./yijing-guide">I Ching guide</a>
        </div>
      </div>
      <div>
        <h3>Trust and start</h3>
        <div class="footer-links">
          <a href="./#free-reading">Free reading</a>
          <a href="./#reading-room">Ask a question</a>
          <a href="./about#editorial-standards">Editorial Standards</a>
          <a href="./privacy">Privacy</a>
          <a href="./terms">Terms</a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2026 Love AI Tarot. All rights reserved.</p>
      <p>For reflection, not certainty.</p>
    </div>
  </footer>
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
  if (!document.querySelector(".site-footer")) {
    main.insertAdjacentHTML("afterend", subpageFooterMarkup);
  }
}
