document.getElementById("year") &&
  (document.getElementById("year").textContent = new Date().getFullYear());

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

const localeMap = {
  en: {
    brandName: "Love Tarot AI",
    brandSub: "tarot, love reading, free tarot reading",
    nav: [
      { label: "Free Reading", href: "#free" },
      { label: "Plans", href: "#plans" },
      { label: "Bazi", href: "#bazi" },
      { label: "Privacy", href: "#privacy" },
      { label: "Support", href: "mailto:support@aitarot.online" }
    ],
    hero: {
      eyebrow: "free tarot reading + eastern bazi perspective",
      title: "A calmer, clearer Tarot reading experience for love, career, and life pressure.",
      text:
        "Start with a free reading, then unlock deeper Tarot card reading formats when you want more structure, more detail, and better timing guidance.",
      ctaPrimary: "Try Free Reading",
      ctaSecondary: "Compare Paid Plans",
      ctaTertiary: "Read Ancient Bazi Wisdom"
    },
    orbit: {
      kicker: "Tonight's reading mood",
      title: "Blue-hour divination, not fear marketing.",
      text:
        "The site is built for people who need emotional steadiness first. We keep the tone human, private, and practical.",
      tags: [
        { title: "Free first", text: "Short reading before any payment decision." },
        { title: "Deeper paid layers", text: "Different depth, action plans, and follow-up space." },
        { title: "Love + Career focus", text: "Specialized tracks for the questions people ask most." },
        { title: "Bazi timing", text: "Ancient Eastern timing perspective layered onto Tarot." }
      ]
    },
    signals: [
      { title: "Free Tarot Reading", text: "A short response that helps users feel the tone before paying." },
      { title: "Love Tarot", text: "Built for relationship clarity, communication, and emotional timing." },
      { title: "Career Tarot", text: "Useful when work pressure, role changes, or decisions feel heavy." },
      { title: "Privacy First", text: "Anonymous by default, no unnecessary personal data collection." }
    ],
    free: {
      kicker: "Free experience",
      title: "A real free reading, not a fake teaser.",
      text:
        "The free tier should feel helpful on its own, while still being clearly lighter than the paid formats.",
      label: "Choose a reading topic",
      button: "Draw a Free Card",
      previewTitle: "What free users receive",
      previewPoints: [
        "1 card or 1 short symbolic pull",
        "A quick emotional read in 120-180 words",
        "1 practical next step",
        "No follow-up threads or long-term timing map"
      ],
      topics: [
        {
          value: "love",
          label: "Love & connection",
          card: "The Star",
          insight:
            "There is still softness available to you, even if recent conversations felt cold or unfinished.",
          next:
            "Your best next step is a calm message, not a heavy confrontation. Paid love readings go deeper into timing, boundary patterns, and what to say next."
        },
        {
          value: "career",
          label: "Career & work pressure",
          card: "Two of Wands",
          insight:
            "You are between what feels familiar and what feels possible. The pressure is real, but so is the opening.",
          next:
            "Choose one concrete direction to explore this week. Paid career readings add risk mapping, opportunity timing, and decision structure."
        },
        {
          value: "general",
          label: "General life clarity",
          card: "The Moon",
          insight:
            "Some of what is exhausting you is uncertainty itself. The reading points to slowing down before forcing a conclusion.",
          next:
            "Protect your energy and avoid dramatic decisions tonight. Paid readings give a fuller 7-30 day action map."
        }
      ]
    },
    room: {
      kicker: "Interactive reading room",
      title: "Ask your question and get a result shaped by the tier you choose.",
      text:
        "Free results stay brief. Paid results become more structured, more specific, and more useful for action. Love Focus stays in love. Career Focus stays in career.",
      focusLabel: "Choose a reading focus",
      tierLabel: "Choose a result depth",
      questionLabel: "Describe your situation or ask your question",
      questionPlaceholder: "Example: Should I reach out to them this week? / Should I stay in this role or move on?",
      submit: "Generate Reading",
      placeholder:
        "Your result will appear here. Start with a focus, choose a tier, and enter your question.",
      focusOptions: [
        { value: "general", label: "General clarity" },
        { value: "love", label: "Love and relationship" },
        { value: "career", label: "Career and work" }
      ],
      tierOptions: [
        { value: "free", label: "Free Reading" },
        { value: "starter", label: "Starter Reading" },
        { value: "core", label: "Core Reading" },
        { value: "deep", label: "Deep Reading" },
        { value: "love", label: "Love Focus" },
        { value: "career", label: "Career Focus" },
        { value: "monthly", label: "Monthly Membership" },
        { value: "quarterly", label: "Quarterly Membership" },
        { value: "yearly", label: "Annual Membership" }
      ]
    },
    plans: {
      kicker: "Paid reading paths",
      title: "Different paid formats should feel meaningfully different.",
      text:
        "We separate quick insight, layered interpretation, specialized focus, and long-horizon support so users understand exactly what changes with price."
    },
    singlePlans: [
      {
        name: "Free Reading",
        price: "$0",
        type: "Entry layer",
        desc: "A genuine short Tarot experience for first-time visitors.",
        features: [
          "1 short symbolic pull",
          "120-180 word response",
          "1 practical next step",
          "No follow-up or timing layer"
        ],
        cta: "Start Free",
        href: "#free"
      },
      {
        name: "Starter Reading",
        price: "$4.9",
        type: "One-time",
        desc: "Best for one immediate question when you need slightly more than the free tier.",
        features: [
          "1 focused question",
          "Clearer emotional interpretation",
          "1 action suggestion with more context",
          "Still short, but more personal than free"
        ],
        cta: "Unlock Starter",
        href: productLinks.starter
      },
      {
        name: "Core Reading",
        price: "$14.9",
        type: "One-time",
        desc: "Tarot plus Bazi support for people who want structure, not just reassurance.",
        features: [
          "1-2 questions",
          "3-card structure",
          "3 action points",
          "1 follow-up question"
        ],
        cta: "Unlock Core",
        href: productLinks.core
      },
      {
        name: "Deep Reading",
        price: "$19",
        type: "One-time",
        desc: "A more complete reading with timing, priority, and risk awareness.",
        features: [
          "2-3 questions",
          "Tarot + Bazi timing layer",
          "7-30 day action planning",
          "3 follow-up prompts"
        ],
        cta: "Unlock Deep",
        href: productLinks.deep
      }
    ],
    focusPlans: [
      {
        name: "Love Focus",
        price: "$29",
        type: "Specialized",
        desc: "For people stuck in relationship confusion, silence, mixed signals, or hard conversations.",
        features: [
          "Relationship dynamic read",
          "Communication strategy",
          "Boundary guidance",
          "What to do next"
        ],
        cta: "Enter Love Focus",
        href: productLinks.love
      },
      {
        name: "Career Focus",
        price: "$29",
        type: "Specialized",
        desc: "For job stress, role changes, leaving, staying, or choosing between paths.",
        features: [
          "Career decision framing",
          "Risk and opportunity scan",
          "Short timing guidance",
          "Execution suggestions"
        ],
        cta: "Enter Career Focus",
        href: productLinks.career
      }
    ],
    memberPlans: [
      {
        name: "Monthly Membership",
        price: "$29",
        type: "Subscription",
        desc: "For people in an active chapter who need consistent check-ins.",
        features: [
          "Monthly support rhythm",
          "Useful for emotional pressure periods",
          "Better than repeating one-off paid sessions",
          "Built for continuity"
        ],
        cta: "Start Monthly",
        href: productLinks.monthly
      },
      {
        name: "Quarterly Membership",
        price: "$59",
        type: "Subscription",
        desc: "A medium-range plan for trend review and strategy correction.",
        features: [
          "Quarter-by-quarter review",
          "Pattern tracking",
          "Adjustment guidance",
          "Ideal for transitions"
        ],
        cta: "Start Quarterly",
        href: productLinks.quarterly
      },
      {
        name: "Annual Membership",
        price: "$199",
        type: "Subscription",
        desc: "A long-range support format for bigger life chapters and repeating decision cycles.",
        features: [
          "Yearly rhythm planning",
          "Major milestone support",
          "Long-horizon perspective",
          "Best value for repeat users"
        ],
        cta: "Start Annual",
        href: productLinks.yearly
      }
    ],
    difference: {
      kicker: "Why the pricing differs",
      title: "Free, one-time, specialized, and membership tiers are not the same product.",
      text:
        "The difference is not just word count. It is interpretation depth, structure, timing logic, and how much follow-through a user receives.",
      cards: [
        {
          title: "Free tier",
          text: "Helpful, simple, and short. Enough to feel the tone, not enough to replace a fuller reading."
        },
        {
          title: "Starter + Core",
          text: "For immediate clarity with more structure, more personal relevance, and more direct next steps."
        },
        {
          title: "Deep + Focus + Membership",
          text: "For users who need timing, repeated support, or a full decision framework around love or career."
        }
      ]
    },
    focus: {
      kicker: "How people use it",
      title: "The most common high-intent reading themes.",
      text:
        "These are the questions that convert best because they connect to real pressure: relationships, work, emotional exhaustion, and timing.",
      cards: [
        {
          title: "Love confusion",
          text: "Mixed signals, silence, old feelings returning, difficult conversations.",
          list: ["What do they feel?", "Should I reach out?", "Is this relationship repairable?"]
        },
        {
          title: "Career pressure",
          text: "Leaving, staying, promotion anxiety, interviews, team conflict.",
          list: ["Is this the right role?", "Should I move now?", "What risk am I missing?"]
        },
        {
          title: "Emotional reset",
          text: "When life feels crowded and the user mainly needs a calmer internal read.",
          list: ["What is draining me?", "What should I stop carrying?", "What should I do this week?"]
        },
        {
          title: "Timing clarity",
          text: "The point where Bazi adds value beyond a purely symbolic Tarot reading.",
          list: ["When to act", "When to wait", "Where pressure changes next"]
        }
      ]
    },
    bazi: {
      kicker: "Ancient Eastern wisdom",
      title: "Bazi gives the site a deeper cultural and timing layer.",
      text:
        "Tarot reads the emotional field of the moment. Bazi adds a longer rhythm perspective rooted in classical Chinese metaphysical thinking.",
      points: [
        "Tarot is excellent for present dynamics and emotional truth.",
        "Bazi helps frame cycles, timing, strengths, and pressure windows.",
        "Together they produce warmer guidance with more practical timing."
      ],
      link: "Read the Bazi guide",
      quote:
        "\"For many users, Bazi is not only a tool, but a bridge to the long-view thinking of an ancient Eastern civilization.\""
    },
    privacy: {
      kicker: "Privacy and trust",
      title: "People come here vulnerable. The product should act like it knows that.",
      text:
        "Privacy is not decorative copy here. It is part of why a user feels safe enough to stay and ask the real question.",
      cards: [
        { title: "Anonymous-first", text: "No real name required for the reading experience." },
        { title: "Minimal collection", text: "Only data needed for service and payment flow." },
        { title: "No ad profiling", text: "No unnecessary cross-site tracking behavior." },
        { title: "Delete on request", text: "Users can ask to remove identifiable session data." }
      ]
    },
    footer: {
      brandName: "Love Tarot AI",
      description:
        "A multilingual, privacy-first Tarot reading platform built for love, career, and life clarity with optional Bazi depth.",
      supportLabel: "Support: ",
      companyTitle: "Company",
      companyLinks: [
        { label: "Pricing", href: "#plans" },
        { label: "About", href: "./about.html" },
        { label: "Privacy Policy", href: "./privacy.html" },
        { label: "Terms of Service", href: "./terms.html" }
      ],
      resourcesTitle: "Resources",
      resourcesLinks: [
        { label: "Bazi Guide", href: "./bazi-guide.html" },
        { label: "Free Reading", href: "#free" },
        { label: "Love Focus", href: "#focus" },
        { label: "Career Focus", href: "#focus" }
      ],
      popularTitle: "Popular",
      popularLinks: [
        { label: "Free Tarot Reading", href: "#free" },
        { label: "Love Tarot Reading", href: productLinks.love },
        { label: "Career Tarot Reading", href: productLinks.career },
        { label: "Tarot + Bazi Reading", href: productLinks.core }
      ],
      tagline: "[ Built for global tarot seekers ]"
    },
    paidMessage:
      "Payment successful. Your deeper reading is ready to begin. Start with your question and we will take it from there."
  }
};

["ja", "ko", "de", "fr"].forEach((lang) => {
  localeMap[lang] = JSON.parse(JSON.stringify(localeMap.en));
});

Object.assign(localeMap.ja, {
  brandName: "Love Tarot AI",
  nav: [
    { label: "無料鑑定", href: "#free" },
    { label: "プラン", href: "#plans" },
    { label: "八字", href: "#bazi" },
    { label: "プライバシー", href: "#privacy" },
    { label: "サポート", href: "mailto:support@aitarot.online" }
  ],
  hero: {
    eyebrow: "無料タロット + 東洋古典の八字視点",
    title: "恋愛、仕事、人生の重さに向き合うための、落ち着いたタロット体験。",
    text:
      "まず無料鑑定から始めて、必要なときだけ、より深いタロットと八字の読みへ進めます。",
    ctaPrimary: "無料鑑定を試す",
    ctaSecondary: "有料プランを見る",
    ctaTertiary: "八字ガイドを読む"
  },
  room: {
    kicker: "鑑定ルーム",
    title: "質問を入力し、選んだプランに応じた深さの結果を受け取れます。",
    text:
      "無料は短く、有料はより構造化されます。Love Focus は恋愛だけ、Career Focus は仕事だけを扱います。",
    focusLabel: "鑑定テーマを選ぶ",
    tierLabel: "結果の深さを選ぶ",
    questionLabel: "状況や質問を入力してください",
    questionPlaceholder: "例：今週連絡するべき？ / この仕事を続けるべき？",
    submit: "鑑定を生成",
    placeholder: "ここに結果が表示されます。",
    focusOptions: [
      { value: "general", label: "全体の流れ" },
      { value: "love", label: "恋愛と関係" },
      { value: "career", label: "仕事とキャリア" }
    ],
    tierOptions: localeMap.en.room.tierOptions
  },
  plans: {
    kicker: "有料リーディング",
    title: "価格ごとに、きちんと違う深さの結果を返します。",
    text: "短い有料、構造化、専門特化、継続支援を明確に分けています。"
  },
  privacy: {
    kicker: "安心とプライバシー",
    title: "弱っている時に使うサイトだからこそ、扱いは丁寧であるべきです。",
    text: "匿名性と最小限のデータ取得を前提に設計しています。",
    cards: [
      { title: "匿名優先", text: "本名なしでも利用できます。" },
      { title: "最小限の取得", text: "必要なデータだけを扱います。" },
      { title: "広告追跡なし", text: "不要な横断トラッキングはしません。" },
      { title: "削除依頼可", text: "識別可能なデータの削除依頼ができます。" }
    ]
  },
  footer: {
    brandName: "Love Tarot AI",
    description: "恋愛、仕事、人生の重圧に向けた、多言語対応・プライバシー重視のタロット体験。",
    supportLabel: "サポート: ",
    companyTitle: "会社情報",
    companyLinks: localeMap.en.footer.companyLinks,
    resourcesTitle: "リソース",
    resourcesLinks: localeMap.en.footer.resourcesLinks,
    popularTitle: "人気",
    popularLinks: localeMap.en.footer.popularLinks,
    tagline: "[ 世界中のタロット利用者のために ]"
  }
});

Object.assign(localeMap.ko, {
  nav: [
    { label: "무료 리딩", href: "#free" },
    { label: "플랜", href: "#plans" },
    { label: "사주", href: "#bazi" },
    { label: "개인정보", href: "#privacy" },
    { label: "지원", href: "mailto:support@aitarot.online" }
  ],
  hero: {
    eyebrow: "무료 타로 + 동양 고전 사주 관점",
    title: "사랑, 일, 삶의 압박 속에서 더 차분한 타로 리딩 경험.",
    text:
      "먼저 무료 리딩을 해보고, 필요할 때만 더 깊은 타로와 사주 리딩으로 넘어갈 수 있습니다.",
    ctaPrimary: "무료 리딩 시작",
    ctaSecondary: "유료 플랜 비교",
    ctaTertiary: "사주 가이드 읽기"
  },
  room: {
    kicker: "리딩 룸",
    title: "질문을 입력하고, 선택한 티어에 맞는 깊이의 결과를 받으세요.",
    text:
      "무료 결과는 짧고, 유료 결과는 더 구조적입니다. Love Focus 는 사랑만, Career Focus 는 일만 다룹니다.",
    focusLabel: "리딩 주제 선택",
    tierLabel: "결과 깊이 선택",
    questionLabel: "상황이나 질문을 입력하세요",
    questionPlaceholder: "예: 이번 주 연락해야 할까? / 이 일을 계속해야 할까?",
    submit: "리딩 생성",
    placeholder: "결과가 여기에 표시됩니다.",
    focusOptions: [
      { value: "general", label: "전체 흐름" },
      { value: "love", label: "사랑과 관계" },
      { value: "career", label: "일과 커리어" }
    ],
    tierOptions: localeMap.en.room.tierOptions
  },
  plans: {
    kicker: "유료 리딩",
    title: "가격마다 결과의 깊이가 분명히 달라집니다.",
    text: "짧은 유료, 구조형, 전문형, 장기 지원형을 분리했습니다."
  }
});

Object.assign(localeMap.de, {
  nav: [
    { label: "Kostenlos", href: "#free" },
    { label: "Pläne", href: "#plans" },
    { label: "Bazi", href: "#bazi" },
    { label: "Datenschutz", href: "#privacy" },
    { label: "Support", href: "mailto:support@aitarot.online" }
  ],
  hero: {
    eyebrow: "kostenlose tarot-lesung + ostasiatische bazi-perspektive",
    title: "Eine ruhigere Tarot-Erfahrung für Liebe, Beruf und innere Unklarheit.",
    text:
      "Beginnen Sie kostenlos und wechseln Sie erst dann zu tieferen Formaten, wenn Sie mehr Struktur und mehr Tiefe möchten.",
    ctaPrimary: "Kostenlos starten",
    ctaSecondary: "Pläne vergleichen",
    ctaTertiary: "Bazi lesen"
  },
  room: {
    kicker: "Leseraum",
    title: "Stellen Sie Ihre Frage und erhalten Sie ein Ergebnis passend zur gewählten Tiefe.",
    text:
      "Kostenlos bleibt kurz. Bezahlt wird strukturierter. Love Focus bleibt bei Liebe, Career Focus bleibt bei Beruf.",
    focusLabel: "Lesefokus wählen",
    tierLabel: "Tiefe wählen",
    questionLabel: "Ihre Situation oder Frage",
    questionPlaceholder: "Beispiel: Soll ich diese Woche schreiben? / Soll ich in dieser Rolle bleiben?",
    submit: "Reading erzeugen",
    placeholder: "Hier erscheint Ihr Ergebnis.",
    focusOptions: [
      { value: "general", label: "Allgemeine Klarheit" },
      { value: "love", label: "Liebe und Beziehung" },
      { value: "career", label: "Beruf und Arbeit" }
    ],
    tierOptions: localeMap.en.room.tierOptions
  },
  plans: {
    kicker: "Bezahlte Formate",
    title: "Jede Preisstufe liefert eine andere Tiefe.",
    text: "Kurze Antworten, strukturierte Lesungen, Fokusformate und fortlaufende Begleitung sind getrennt."
  }
});

Object.assign(localeMap.fr, {
  nav: [
    { label: "Gratuit", href: "#free" },
    { label: "Offres", href: "#plans" },
    { label: "Bazi", href: "#bazi" },
    { label: "Confidentialité", href: "#privacy" },
    { label: "Support", href: "mailto:support@aitarot.online" }
  ],
  hero: {
    eyebrow: "tarot gratuit + perspective bazi d'orient ancien",
    title: "Une expérience Tarot plus calme pour l'amour, la carrière et les périodes difficiles.",
    text:
      "Commencez avec une lecture gratuite, puis passez à des formats plus profonds seulement si vous avez besoin de plus de structure.",
    ctaPrimary: "Essayer gratuitement",
    ctaSecondary: "Comparer les offres",
    ctaTertiary: "Lire le guide Bazi"
  },
  room: {
    kicker: "Salle de lecture",
    title: "Entrez votre question et obtenez un résultat adapté au niveau choisi.",
    text:
      "Le gratuit reste court. Les offres payantes deviennent plus structurées. Love Focus reste sur l'amour, Career Focus reste sur le travail.",
    focusLabel: "Choisir l'axe de lecture",
    tierLabel: "Choisir la profondeur",
    questionLabel: "Décrivez votre situation ou votre question",
    questionPlaceholder: "Exemple : Dois-je lui écrire cette semaine ? / Dois-je rester dans ce poste ?",
    submit: "Générer la lecture",
    placeholder: "Votre résultat apparaîtra ici.",
    focusOptions: [
      { value: "general", label: "Clarté générale" },
      { value: "love", label: "Amour et relation" },
      { value: "career", label: "Carrière et travail" }
    ],
    tierOptions: localeMap.en.room.tierOptions
  },
  plans: {
    kicker: "Lectures payantes",
    title: "Chaque niveau payant doit produire une profondeur différente.",
    text: "Lecture courte, lecture structurée, spécialisation et accompagnement continu sont séparés."
  }
});

function currentLocale() {
  return localeMap[localStorage.getItem("lang") || "en"] || localeMap.en;
}

function el(id) {
  return document.getElementById(id);
}

function renderLinks(containerId, links) {
  const container = el(containerId);
  container.innerHTML = "";
  links.forEach((link) => {
    const a = document.createElement("a");
    a.href = link.href;
    if (link.href.startsWith("http")) {
      a.target = "_blank";
      a.rel = "noopener";
    }
    a.textContent = link.label;
    container.appendChild(a);
  });
}

function renderTopNav(data) {
  const nav = el("top-nav");
  nav.innerHTML = "";
  data.nav.forEach((item) => {
    const a = document.createElement("a");
    a.href = item.href;
    a.textContent = item.label;
    nav.appendChild(a);
  });
}

function renderSignalGrid(items) {
  const grid = el("signal-grid");
  grid.innerHTML = "";
  items.forEach((item) => {
    const card = document.createElement("div");
    card.className = "signal-chip";
    card.innerHTML = `<strong>${item.title}</strong><span>${item.text}</span>`;
    grid.appendChild(card);
  });
}

function renderOrbitTags(tags) {
  const wrap = el("orbit-tags");
  wrap.innerHTML = "";
  tags.forEach((item) => {
    const card = document.createElement("div");
    card.className = "tag-chip";
    card.innerHTML = `<strong>${item.title}</strong><span>${item.text}</span>`;
    wrap.appendChild(card);
  });
}

function renderPreviewPoints(points) {
  const wrap = el("free-preview-points");
  wrap.innerHTML = "";
  points.forEach((text) => {
    const row = document.createElement("div");
    row.className = "preview-point";
    row.textContent = text;
    wrap.appendChild(row);
  });
}

function renderPlanCards(containerId, cards) {
  const container = el(containerId);
  container.innerHTML = "";
  cards.forEach((cardData) => {
    const card = document.createElement("article");
    card.className = "plan-card";
    const list = cardData.features.map((item) => `<li>${item}</li>`).join("");
    card.innerHTML = `
      <span class="plan-type">${cardData.type}</span>
      <h3>${cardData.name}</h3>
      <p class="price">${cardData.price}</p>
      <p>${cardData.desc}</p>
      <ul class="plan-features">${list}</ul>
      <a class="btn btn-primary" href="${cardData.href}" ${cardData.href.startsWith("http") ? 'target="_blank" rel="noopener"' : ""}>${cardData.cta}</a>
    `;
    container.appendChild(card);
  });
}

function renderSimpleCards(containerId, cards, className) {
  const container = el(containerId);
  container.innerHTML = "";
  cards.forEach((item) => {
    const card = document.createElement("article");
    card.className = className;
    card.innerHTML = `<h3>${item.title}</h3><p>${item.text}</p>`;
    if (item.list) {
      const ul = document.createElement("ul");
      ul.className = "focus-list";
      item.list.forEach((line) => {
        const li = document.createElement("li");
        li.textContent = line;
        ul.appendChild(li);
      });
      card.appendChild(ul);
    }
    container.appendChild(card);
  });
}

function renderBaziPoints(points) {
  const wrap = el("bazi-points");
  wrap.innerHTML = "";
  points.forEach((text) => {
    const row = document.createElement("div");
    row.className = "bazi-point";
    row.textContent = text;
    wrap.appendChild(row);
  });
}

function renderFreeTopics(data) {
  const select = el("free-topic");
  select.innerHTML = "";
  data.free.topics.forEach((topic) => {
    const option = document.createElement("option");
    option.value = topic.value;
    option.textContent = topic.label;
    select.appendChild(option);
  });
}

function renderRoomSelectors(data) {
  const focus = el("reading-focus");
  const tier = el("reading-tier");
  focus.innerHTML = "";
  tier.innerHTML = "";
  data.room.focusOptions.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.value;
    option.textContent = item.label;
    focus.appendChild(option);
  });
  data.room.tierOptions.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.value;
    option.textContent = item.label;
    tier.appendChild(option);
  });
}

function drawFreeReading() {
  const data = currentLocale();
  const topicValue = el("free-topic").value;
  const topic = data.free.topics.find((entry) => entry.value === topicValue) || data.free.topics[0];
  const result = el("free-result");
  result.innerHTML = `
    <div class="result-card">${topic.card}</div>
    <p class="result-insight">${topic.insight}</p>
    <p class="result-next">${topic.next}</p>
  `;
}

function renderFooter(data) {
  el("footer-brand-name").textContent = data.footer.brandName;
  el("footer-description").textContent = data.footer.description;
  el("footer-support-label").textContent = data.footer.supportLabel;
  el("footer-company-title").textContent = data.footer.companyTitle;
  el("footer-resources-title").textContent = data.footer.resourcesTitle;
  el("footer-popular-title").textContent = data.footer.popularTitle;
  el("footer-copyright").textContent = `© ${new Date().getFullYear()} ${data.footer.brandName}. All rights reserved.`;
  el("footer-tagline").textContent = data.footer.tagline;
  renderLinks("footer-company-links", data.footer.companyLinks);
  renderLinks("footer-resource-links", data.footer.resourcesLinks);
  renderLinks("footer-popular-links", data.footer.popularLinks);
}

function renderReadingPlaceholder(text) {
  el("reading-output").innerHTML = `<div class="reading-placeholder">${text}</div>`;
}

function renderReadingResult(result) {
  const paragraphs = result.paragraphs
    .map((text) => `<div class="reading-section"><strong>Reading</strong><p>${text}</p></div>`)
    .join("");
  const actions = result.actions.map((item) => `<li>${item}</li>`).join("");
  el("reading-output").innerHTML = `
    <div class="reading-result">
      <h3>${result.symbol} · ${result.tier}</h3>
      <div class="reading-meta">
        <span>${result.focus}</span>
        <span>${result.depth}</span>
      </div>
      <div class="reading-section"><strong>Summary</strong><p>${result.summary}</p></div>
      ${paragraphs}
      <div class="reading-section"><strong>Action steps</strong><ul class="reading-list">${actions}</ul></div>
      <div class="reading-section"><strong>Follow-up</strong><p>${result.followup}</p></div>
    </div>
  `;
}

function applyLang(lang) {
  localStorage.setItem("lang", lang);
  document.documentElement.lang = lang;
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });

  const data = currentLocale();

  el("brand-name").textContent = data.brandName;
  el("brand-sub").textContent = data.brandSub;
  renderTopNav(data);

  el("hero-eyebrow").textContent = data.hero.eyebrow;
  el("hero-title").textContent = data.hero.title;
  el("hero-text").textContent = data.hero.text;
  el("hero-cta-primary").textContent = data.hero.ctaPrimary;
  el("hero-cta-secondary").textContent = data.hero.ctaSecondary;
  el("hero-cta-tertiary").textContent = data.hero.ctaTertiary;

  el("orbit-kicker").textContent = data.orbit.kicker;
  el("orbit-title").textContent = data.orbit.title;
  el("orbit-text").textContent = data.orbit.text;
  renderOrbitTags(data.orbit.tags);

  renderSignalGrid(data.signals);

  el("free-kicker").textContent = data.free.kicker;
  el("free-title").textContent = data.free.title;
  el("free-text").textContent = data.free.text;
  el("free-label").textContent = data.free.label;
  el("free-draw").textContent = data.free.button;
  el("free-preview-title").textContent = data.free.previewTitle;
  renderPreviewPoints(data.free.previewPoints);
  renderFreeTopics(data);

  el("plans-kicker").textContent = data.plans.kicker;
  el("plans-title").textContent = data.plans.title;
  el("plans-text").textContent = data.plans.text;
  renderPlanCards("single-plans", data.singlePlans);
  renderPlanCards("focus-plans", data.focusPlans);
  renderPlanCards("member-plans", data.memberPlans);

  el("room-kicker").textContent = data.room.kicker;
  el("room-title").textContent = data.room.title;
  el("room-text").textContent = data.room.text;
  el("field-focus-label").textContent = data.room.focusLabel;
  el("field-tier-label").textContent = data.room.tierLabel;
  el("field-question-label").textContent = data.room.questionLabel;
  el("reading-question").placeholder = data.room.questionPlaceholder;
  el("reading-submit").textContent = data.room.submit;
  renderRoomSelectors(data);
  renderReadingPlaceholder(data.room.placeholder);

  el("difference-kicker").textContent = data.difference.kicker;
  el("difference-title").textContent = data.difference.title;
  el("difference-text").textContent = data.difference.text;
  renderSimpleCards("difference-grid", data.difference.cards, "difference-card");

  el("focus-kicker").textContent = data.focus.kicker;
  el("focus-title").textContent = data.focus.title;
  el("focus-text").textContent = data.focus.text;
  renderSimpleCards("focus-grid", data.focus.cards, "focus-card");

  el("bazi-kicker").textContent = data.bazi.kicker;
  el("bazi-title").textContent = data.bazi.title;
  el("bazi-text").textContent = data.bazi.text;
  renderBaziPoints(data.bazi.points);
  el("bazi-link").textContent = data.bazi.link;
  el("bazi-quote").textContent = data.bazi.quote;

  el("privacy-kicker").textContent = data.privacy.kicker;
  el("privacy-title").textContent = data.privacy.title;
  el("privacy-text").textContent = data.privacy.text;
  renderSimpleCards("privacy-grid", data.privacy.cards, "privacy-card");

  renderFooter(data);
  drawFreeReading();
}

document.querySelectorAll(".lang-btn").forEach((btn) => {
  btn.addEventListener("click", () => applyLang(btn.dataset.lang));
});

el("free-draw").addEventListener("click", drawFreeReading);
el("free-topic").addEventListener("change", drawFreeReading);

el("reading-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = currentLocale();
  const focus = el("reading-focus").value;
  const tier = el("reading-tier").value;
  const question = el("reading-question").value.trim();

  renderReadingPlaceholder("Generating reading...");

  try {
    const response = await fetch("/api/reading", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ focus, tier, question })
    });
    const result = await response.json();
    renderReadingResult(result);
  } catch {
    renderReadingPlaceholder(data.room.placeholder);
  }
});

applyLang(localStorage.getItem("lang") || "en");

const paid = new URLSearchParams(window.location.search).get("paid");
if (paid) {
  const note = document.createElement("div");
  note.style.maxWidth = "1180px";
  note.style.margin = "20px auto 0";
  note.style.padding = "14px 18px";
  note.style.border = "1px solid rgba(147, 190, 255, 0.22)";
  note.style.borderRadius = "8px";
  note.style.background = "rgba(10, 23, 46, 0.92)";
  note.style.color = "#e8f0ff";
  note.textContent = currentLocale().paidMessage;
  document.body.insertBefore(note, document.body.firstChild);
}
