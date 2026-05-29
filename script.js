const productLinks = {
  starter: "https://www.creem.io/payment/prod_30q7e53WSC3RYYkA5SiUj3",
  core: "https://www.creem.io/payment/prod_4DGdRimLy3vYK1XB1GmWjN",
  deep: "https://www.creem.io/payment/prod_6VIbvZBOw32APnthsAhSDG",
  love: "https://www.creem.io/payment/prod_7ifdb45YSixCackbjYu1zD",
  career: "https://www.creem.io/payment/prod_6mJB2TxJ6M5D5TvLfKnEDx",
  monthly: "https://www.creem.io/payment/prod_zRezGp0kvYaQzQIW55Eu6",
  quarterly: "https://www.creem.io/payment/prod_63Le2mp7GII2xkjES4CuQ9",
  yearly: "https://www.creem.io/payment/prod_33LtzEJl1mQlsnciNsYWm6"
};

const freeTopics = {
  love: {
    card: "The Star",
    insight:
      "There is still emotional openness here, but it responds better to warmth and patience than to pressure.",
    next:
      "If you reach out, make it light and clear. Paid Love Focus goes deeper into timing, reciprocity, and communication strategy."
  },
  career: {
    card: "Two of Wands",
    insight:
      "You are at a genuine decision edge. The issue is less about ability and more about whether the current path is still worth your energy.",
    next:
      "Choose one practical move this week. Paid Career Focus adds risk, opportunity, and execution guidance."
  },
  general: {
    card: "The Moon",
    insight:
      "This is a moment for clearer emotional sorting, not a dramatic leap. Uncertainty itself may be exhausting you more than the actual problem.",
    next:
      "Pause long enough to separate fear from signal. Paid readings turn that into a more structured path."
  }
};

const singlePlans = [
  {
    name: "Starter Reading",
    price: "$4.9",
    type: "One-time",
    desc: "A short paid answer that goes one layer beyond the free reading.",
    features: [
      "1 question",
      "More personal interpretation than free",
      "1 clear next step",
      "No account required"
    ],
    cta: "Unlock Starter",
    href: productLinks.starter
  },
  {
    name: "Core Reading",
    price: "$14.9",
    type: "One-time",
    desc: "Structured Tarot + Bazi reading with more depth and more usable output.",
    features: [
      "1-2 questions",
      "3-card structure",
      "3 action points",
      "No account required"
    ],
    cta: "Unlock Core",
    href: productLinks.core
  },
  {
    name: "Deep Reading",
    price: "$19",
    type: "One-time",
    desc: "A deeper result for users who want stronger timing and decision guidance.",
    features: [
      "2-3 questions",
      "7-30 day guidance",
      "Risk and priority framing",
      "No account required"
    ],
    cta: "Unlock Deep",
    href: productLinks.deep
  }
];

const focusPlans = [
  {
    name: "Love Focus",
    price: "$29",
    type: "One-time specialized",
    desc: "Only relationship, connection, silence, reciprocity, and next-step communication.",
    features: [
      "Love-only result scope",
      "No career drift",
      "Communication guidance",
      "No account required"
    ],
    cta: "Unlock Love Focus",
    href: productLinks.love
  },
  {
    name: "Career Focus",
    price: "$29",
    type: "One-time specialized",
    desc: "Only work, role fit, opportunity timing, risk, and execution guidance.",
    features: [
      "Career-only result scope",
      "No romance drift",
      "Decision and risk guidance",
      "No account required"
    ],
    cta: "Unlock Career Focus",
    href: productLinks.career
  }
];

const memberPlans = [
  {
    name: "Monthly Membership",
    price: "$29",
    type: "Recurring",
    desc: "Login-based monthly access for repeat users in active situations.",
    features: [
      "Requires account",
      "Saved member access",
      "Better for repeat questions",
      "Supports ongoing use"
    ],
    cta: "Start Monthly",
    href: productLinks.monthly
  },
  {
    name: "Quarterly Membership",
    price: "$59",
    type: "Recurring",
    desc: "Longer view support with account-based history and return access.",
    features: [
      "Requires account",
      "Quarter-by-quarter check-ins",
      "Best for transitions",
      "Saved member path"
    ],
    cta: "Start Quarterly",
    href: productLinks.quarterly
  },
  {
    name: "Annual Membership",
    price: "$199",
    type: "Recurring",
    desc: "For recurring users who want the longest support horizon and account history.",
    features: [
      "Requires account",
      "Long-horizon access",
      "Best value for repeat use",
      "Saved member path"
    ],
    cta: "Start Annual",
    href: productLinks.yearly
  }
];

function renderPlanCards(containerId, plans) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = "";
  plans.forEach((plan) => {
    const article = document.createElement("article");
    article.className = "plan-card";
    const features = plan.features.map((item) => `<li>${item}</li>`).join("");
    article.innerHTML = `
      <span class="plan-type">${plan.type}</span>
      <h3>${plan.name}</h3>
      <p class="price">${plan.price}</p>
      <p>${plan.desc}</p>
      <ul class="plan-features">${features}</ul>
      <a class="btn btn-primary" href="${plan.href}" target="_blank" rel="noopener">${plan.cta}</a>
    `;
    container.appendChild(article);
  });
}

function drawFreeReading() {
  const topic = document.getElementById("free-topic").value;
  const data = freeTopics[topic] || freeTopics.general;
  document.getElementById("free-result").innerHTML = `
    <div class="result-card">${data.card}</div>
    <p class="result-insight">${data.insight}</p>
    <p class="result-next">${data.next}</p>
  `;
}

function renderReadingResult(result) {
  const paragraphs = result.paragraphs
    .map((text) => `<div class="reading-section"><strong>Reading</strong><p>${text}</p></div>`)
    .join("");
  const actions = result.actions.map((item) => `<li>${item}</li>`).join("");
  const profileUsed = result.profileUsed
    ? `<div class="reading-section"><strong>Input used</strong><p>${result.profileUsed}</p></div>`
    : "";

  document.getElementById("reading-output").innerHTML = `
    <div class="reading-result">
      <h3>${result.symbol} | ${result.tier}</h3>
      <div class="reading-meta">
        <span>${result.focus}</span>
        <span>${result.depth}</span>
      </div>
      <div class="reading-section"><strong>Summary</strong><p>${result.summary}</p></div>
      ${profileUsed}
      ${paragraphs}
      <div class="reading-section"><strong>Action steps</strong><ul class="reading-list">${actions}</ul></div>
      <div class="reading-section"><strong>Follow-up</strong><p>${result.followup}</p></div>
    </div>
  `;
}

function readingPayload() {
  return {
    focus: document.getElementById("reading-focus").value,
    tier: document.getElementById("reading-tier").value,
    question: document.getElementById("reading-question").value.trim(),
    name: document.getElementById("reading-name").value.trim(),
    birthDate: document.getElementById("reading-birth-date").value,
    birthTime: document.getElementById("reading-birth-time").value,
    context: document.getElementById("reading-context").value.trim()
  };
}

async function submitReading(event) {
  event.preventDefault();
  const output = document.getElementById("reading-output");
  const payload = readingPayload();

  if (!payload.question) {
    output.innerHTML = `<div class="reading-placeholder">Please enter your question first.</div>`;
    return;
  }

  output.innerHTML = `<div class="reading-placeholder">Generating reading...</div>`;

  try {
    const response = await fetch("/api/reading", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload)
    });
    const result = await response.json();
    renderReadingResult(result);
  } catch {
    output.innerHTML = `<div class="reading-placeholder">The reading service is not ready yet. Please try again in a moment.</div>`;
  }
}

async function fakeAccountAction(event, mode) {
  event.preventDefault();
  const note = document.getElementById("member-note");
  const email = document.getElementById(`${mode}-email`).value.trim();
  const password = document.getElementById(`${mode}-password`).value;

  if (!email || !password) {
    note.textContent = "Please enter both email and password.";
    return;
  }

  try {
    const response = await fetch(`/api/${mode}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const result = await response.json();
    note.textContent = result.message;
  } catch {
    note.textContent = "Account actions are not live yet. Add the D1 database binding in Cloudflare first.";
  }
}

renderPlanCards("single-plans", singlePlans);
renderPlanCards("focus-plans", focusPlans);
renderPlanCards("member-plans", memberPlans);

document.getElementById("free-draw").addEventListener("click", drawFreeReading);
document.getElementById("free-topic").addEventListener("change", drawFreeReading);
document.getElementById("reading-form").addEventListener("submit", submitReading);
document.getElementById("login-form").addEventListener("submit", (event) => fakeAccountAction(event, "login"));
document.getElementById("signup-form").addEventListener("submit", (event) => fakeAccountAction(event, "signup"));

drawFreeReading();
