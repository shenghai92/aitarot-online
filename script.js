document.getElementById("year").textContent = new Date().getFullYear();

const i18n = {
  en: {
    eyebrow: "for aitarot.online",
    hero_title: "Be understood first, then guided forward.",
    hero_subtitle: "Tarot at the center, supported by I Ching Bazi perspective. Built for people who feel stuck and need calm, practical next steps.",
    cta_plans: "View Plans", cta_privacy: "Privacy Promise",
    single_title: "One-Time Tarot Readings", per_session: "session",
    starter_name: "Starter Reading", starter_desc: "Quick clarity for one immediate concern.", buy_starter: "Start Starter Reading",
    core_name: "Core Reading", core_desc: "Tarot + I Ching Bazi support for relationship, career, and money rhythm.", buy_core: "Unlock Core Reading",
    deep_name: "Deep Reading", deep_desc: "7-30 day action priorities and risk reminders.", buy_deep: "Unlock Deep Reading",
    subscription_title: "Membership Plans (Ongoing Support)", per_month: "month", per_quarter: "quarter", per_year: "year",
    monthly_name: "Monthly Membership", monthly_desc: "Continuous monthly tracking for high-pressure periods.", buy_monthly: "Start Monthly",
    quarterly_name: "Quarterly Membership", quarterly_desc: "Quarter-by-quarter review and strategy adjustment.", buy_quarterly: "Start Quarterly",
    yearly_name: "Annual Membership", yearly_desc: "Long-range annual rhythm planning for major decisions.", buy_yearly: "Start Annual",
    special_title: "Specialized Tarot Services",
    love_name: "Love Focus Reading", love_desc: "Relationship direction, communication strategy, and boundary guidance.", buy_love: "Enter Love Focus",
    career_name: "Career Focus Reading", career_desc: "Career choices, opportunity windows, and risk-aware decision support.", buy_career: "Enter Career Focus",
    privacy_title: "Privacy-First Promise",
    privacy_1: "Anonymous-first experience. Real name is not required.",
    privacy_2: "Minimal data collection strictly for service delivery.",
    privacy_3: "No selling personal data. No cross-site ad profiling.",
    privacy_4: "You can request data deletion at any time.",
    privacy_link: "Full Privacy Policy",
    paid_message: "Payment successful. We have received your order. Please continue to start your personalized Tarot reading."
  },
  ja: { hero_title: "まず理解され、次に前へ進む。", cta_plans: "プランを見る", cta_privacy: "プライバシー" },
  ko: { hero_title: "먼저 이해받고, 그다음 앞으로 나아가세요.", cta_plans: "플랜 보기", cta_privacy: "개인정보 약속" },
  de: { hero_title: "Zuerst verstanden werden, dann weitergehen.", cta_plans: "Pläne ansehen", cta_privacy: "Datenschutz" },
  fr: { hero_title: "D'abord être compris, puis avancer.", cta_plans: "Voir les offres", cta_privacy: "Confidentialité" }
};

function applyLang(lang) {
  const base = i18n.en;
  const current = { ...base, ...(i18n[lang] || {}) };
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (current[key]) el.textContent = current[key];
  });
  document.querySelectorAll(".lang-btn").forEach((b) => b.classList.toggle("active", b.dataset.lang === lang));
  localStorage.setItem("lang", lang);
}

document.querySelectorAll(".lang-btn").forEach((btn) => {
  btn.addEventListener("click", () => applyLang(btn.dataset.lang));
});

applyLang(localStorage.getItem("lang") || "en");

const paid = new URLSearchParams(window.location.search).get("paid");
if (paid) {
  const note = document.createElement("div");
  note.style.maxWidth = "1100px";
  note.style.margin = "1rem auto";
  note.style.padding = "0.8rem 1rem";
  note.style.border = "1px solid #e5d8cb";
  note.style.borderRadius = "10px";
  note.style.background = "#fffaf4";
  note.textContent = (i18n[localStorage.getItem("lang") || "en"] || i18n.en).paid_message || i18n.en.paid_message;
  document.body.insertBefore(note, document.body.firstChild);
}
