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
    tier: "starter",
    name: "Starter Reading",
    price: "$4.9",
    type: "One-time",
    desc: "A short paid reading that adds one more layer of interpretation beyond the free pull.",
    features: [
      "2 concise reading paragraphs",
      "1 question focus",
      "1 clear action step",
      "No account required"
    ],
    cta: "Unlock Starter",
    focus: "general"
  },
  {
    tier: "core",
    name: "Core Reading",
    price: "$14.9",
    type: "One-time",
    desc: "A structured reading for users who want a clearer interpretation, stronger guidance, and a more usable answer.",
    features: [
      "3 structured reading paragraphs",
      "3 action points",
      "1 follow-up line",
      "No account required"
    ],
    cta: "Unlock Core",
    focus: "general"
  },
  {
    tier: "deep",
    name: "Deep Reading",
    price: "$19",
    type: "One-time",
    desc: "A deeper reading for users who want timing, priority, and decision pressure mapped more clearly.",
    features: [
      "4 detailed reading paragraphs",
      "4 action points",
      "7-30 day guidance",
      "No account required"
    ],
    cta: "Unlock Deep",
    focus: "general"
  }
];

const focusPlans = [
  {
    tier: "love",
    name: "Love Focus",
    price: "$29",
    type: "One-time specialized",
    desc: "A specialized relationship reading focused only on connection, silence, reciprocity, trust, and next-step communication.",
    features: [
      "4 relationship-only paragraphs",
      "4 love-focused action steps",
      "No career drift",
      "No account required"
    ],
    cta: "Unlock Love Focus",
    focus: "love"
  },
  {
    tier: "career",
    name: "Career Focus",
    price: "$29",
    type: "One-time specialized",
    desc: "A specialized work reading focused only on role fit, opportunity timing, execution, leverage, and risk.",
    features: [
      "4 career-only paragraphs",
      "4 work-focused action steps",
      "No romance drift",
      "No account required"
    ],
    cta: "Unlock Career Focus",
    focus: "career"
  }
];

const memberPlans = [
  {
    tier: "monthly",
    name: "Monthly Membership",
    price: "$29",
    type: "Recurring",
    desc: "Login-based monthly access for repeat users who want ongoing readings with short-cycle check-ins.",
    features: [
      "Requires account",
      "4 ongoing-reading paragraphs",
      "Weekly focus + later-this-month watchpoints",
      "Saved member access"
    ],
    cta: "Start Monthly",
    focus: "general"
  },
  {
    tier: "quarterly",
    name: "Quarterly Membership",
    price: "$59",
    type: "Recurring",
    desc: "A 30-90 day reading format for transitions, trend review, and strategic reassessment.",
    features: [
      "Requires account",
      "5 trend-review paragraphs",
      "5 action points",
      "30-90 day reassessment guidance",
      "Saved member path"
    ],
    cta: "Start Quarterly",
    focus: "general"
  },
  {
    tier: "yearly",
    name: "Annual Membership",
    price: "$199",
    type: "Recurring",
    desc: "The longest-horizon reading tier for users who want broader life pattern guidance across the year ahead.",
    features: [
      "Requires account",
      "6 long-horizon paragraphs",
      "5 action points",
      "Quarter pacing across the year",
      "Saved member path"
    ],
    cta: "Start Annual",
    focus: "general"
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
    const checkoutMode = plan.type === "Recurring" ? "member" : "single";

    article.innerHTML = `
      <span class="plan-type">${plan.type}</span>
      <h3>${plan.name}</h3>
      <p class="price">${plan.price}</p>
      <p>${plan.desc}</p>
      <ul class="plan-features">${features}</ul>
      <button
        class="btn btn-primary checkout-trigger"
        type="button"
        data-tier="${plan.tier}"
        data-focus="${plan.focus}"
        data-mode="${checkoutMode}"
      >${plan.cta}</button>
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

function closeCustomSelects(exceptId = "") {
  document.querySelectorAll(".custom-select").forEach((root) => {
    if (root.dataset.selectId !== exceptId) {
      root.classList.remove("open");
      const button = root.querySelector(".custom-select-button");
      if (button) button.setAttribute("aria-expanded", "false");
    }
  });
}

function syncCustomSelect(select) {
  const root = select.parentElement?.querySelector(".custom-select");
  if (!root) return;
  const buttonLabel = root.querySelector(".custom-select-label");
  const options = root.querySelectorAll(".custom-select-option");
  const current = select.options[select.selectedIndex];
  if (buttonLabel && current) {
    buttonLabel.textContent = current.textContent;
  }
  options.forEach((option) => {
    option.classList.toggle("selected", option.dataset.value === select.value);
  });
}

function createCustomSelect(select) {
  if (!select || select.dataset.customized === "true") return;

  select.dataset.customized = "true";
  select.classList.add("native-select");

  const wrapper = document.createElement("div");
  wrapper.className = "custom-select";
  wrapper.dataset.selectId = select.id;

  const button = document.createElement("button");
  button.type = "button";
  button.className = "custom-select-button";
  button.setAttribute("aria-haspopup", "listbox");
  button.setAttribute("aria-expanded", "false");
  button.innerHTML = `<span class="custom-select-label"></span><span class="custom-select-caret">▾</span>`;

  const list = document.createElement("div");
  list.className = "custom-select-list";
  list.setAttribute("role", "listbox");

  [...select.options].forEach((nativeOption) => {
    const option = document.createElement("button");
    option.type = "button";
    option.className = "custom-select-option";
    option.dataset.value = nativeOption.value;
    option.textContent = nativeOption.textContent;
    option.addEventListener("click", () => {
      select.value = nativeOption.value;
      select.dispatchEvent(new Event("change", { bubbles: true }));
      syncCustomSelect(select);
      closeCustomSelects();
    });
    list.appendChild(option);
  });

  button.addEventListener("click", () => {
    const willOpen = !wrapper.classList.contains("open");
    closeCustomSelects(willOpen ? select.id : "");
    wrapper.classList.toggle("open", willOpen);
    button.setAttribute("aria-expanded", willOpen ? "true" : "false");
  });

  select.insertAdjacentElement("afterend", wrapper);
  wrapper.appendChild(button);
  wrapper.appendChild(list);

  select.addEventListener("change", () => syncCustomSelect(select));
  syncCustomSelect(select);
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

    if (!response.ok) {
      output.innerHTML = `<div class="reading-placeholder">${result.message || "This reading is locked right now."}</div>`;
      return;
    }

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

async function startCheckout(button) {
  const note = document.getElementById("member-note");
  const originalLabel = button.textContent;
  button.disabled = true;
  button.textContent = "Opening checkout...";

  try {
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        tier: button.dataset.tier,
        focus: button.dataset.focus
      })
    });
    const result = await response.json();

    if (!response.ok || !result.checkoutUrl) {
      if (button.dataset.mode === "member") {
        note.textContent = result.message || "Please log in before starting a membership checkout.";
      } else {
        showPurchaseMessage(result.message || "Checkout could not be started.");
      }
      return;
    }

    window.location.href = result.checkoutUrl;
  } catch {
    if (button.dataset.mode === "member") {
      note.textContent = "Checkout is not available right now. Please try again.";
    } else {
      showPurchaseMessage("Checkout is not available right now. Please try again.");
    }
  } finally {
    button.disabled = false;
    button.textContent = originalLabel;
  }
}

function showPurchaseMessage(message) {
  const banner = document.getElementById("purchase-message");
  if (!banner) return;
  banner.textContent = message;
  banner.hidden = false;
}

function handlePurchaseState() {
  const params = new URLSearchParams(window.location.search);
  const purchase = params.get("purchase");
  const tier = params.get("tier");
  if (purchase === "success" && tier) {
    const tierSelect = document.getElementById("reading-tier");
    if ([...tierSelect.options].some((option) => option.value === tier)) {
      tierSelect.value = tier;
    }
    showPurchaseMessage(`Payment confirmed for ${tier}. You can enter your question below now.`);
    window.history.replaceState({}, "", `${window.location.pathname}#reading-room`);
  }
}

function setupCustomSelects() {
  ["free-topic", "reading-focus", "reading-tier"].forEach((id) => {
    createCustomSelect(document.getElementById(id));
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".custom-select")) {
      closeCustomSelects();
    }
  });
}

renderPlanCards("single-plans", singlePlans);
renderPlanCards("focus-plans", focusPlans);
renderPlanCards("member-plans", memberPlans);
setupCustomSelects();

document.getElementById("free-draw").addEventListener("click", drawFreeReading);
document.getElementById("free-topic").addEventListener("change", drawFreeReading);
document.getElementById("reading-form").addEventListener("submit", submitReading);
document.getElementById("login-form").addEventListener("submit", (event) => fakeAccountAction(event, "login"));
document.getElementById("signup-form").addEventListener("submit", (event) => fakeAccountAction(event, "signup"));
document.querySelectorAll(".checkout-trigger").forEach((button) => {
  button.addEventListener("click", () => startCheckout(button));
});

drawFreeReading();
handlePurchaseState();
