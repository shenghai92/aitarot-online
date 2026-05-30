import { readMemberAccess, readMemberSession, readSingleAccess } from "./_lib/access.js";

const singlePaidTiers = new Set(["starter", "core", "deep", "love", "career"]);
const membershipTiers = new Set(["monthly", "quarterly", "yearly"]);

export async function onRequestPost(context) {
  const body = await context.request.json();
  const focus = body.focus || "general";
  const tier = body.tier || "free";
  const question = String(body.question || "").trim();
  const sessionSecret = context.env.SESSION_SECRET;
  const profile = {
    name: String(body.name || "").trim(),
    birthDate: String(body.birthDate || "").trim(),
    birthTime: String(body.birthTime || "").trim(),
    context: String(body.context || "").trim()
  };

  const accessError = await verifyTierAccess(context.request, sessionSecret, tier);
  if (accessError) {
    return new Response(JSON.stringify(accessError), {
      status: accessError.status,
      headers: {
        "content-type": "application/json; charset=UTF-8",
        "cache-control": "no-store"
      }
    });
  }

  const aiReading = await fetchAiReading(context, { focus, tier, question, profile });
  const response = buildReading({ focus, tier, question, profile, aiReading });

  return new Response(JSON.stringify(response), {
    headers: {
      "content-type": "application/json; charset=UTF-8",
      "cache-control": "no-store"
    }
  });
}

async function verifyTierAccess(request, sessionSecret, tier) {
  if (tier === "free") return null;
  if (!sessionSecret) {
    return {
      ok: false,
      status: 500,
      message: "Access control is not configured yet."
    };
  }

  if (singlePaidTiers.has(tier)) {
    const singleAccess = await readSingleAccess(request, sessionSecret);
    if (!singleAccess || singleAccess.tier !== tier || Number(singleAccess.expiresAt || 0) < Date.now()) {
      return {
        ok: false,
        status: 402,
        message: "This one-time reading is locked until payment is completed."
      };
    }
  }

  if (membershipTiers.has(tier)) {
    const session = await readMemberSession(request, sessionSecret);
    const memberAccess = await readMemberAccess(request, sessionSecret);
    if (!session) {
      return {
        ok: false,
        status: 401,
        message: "Please log in to use membership readings."
      };
    }
    if (!memberAccess || memberAccess.tier !== tier || Number(memberAccess.expiresAt || 0) < Date.now()) {
      return {
        ok: false,
        status: 402,
        message: "Your membership payment has not been activated for this reading tier yet."
      };
    }
  }

  return null;
}

function buildReading({ focus, tier, question, profile, aiReading }) {
  const cleanQuestion = question || fallbackQuestion(focus);
  const focusMap = {
    love: {
      label: "Love",
      symbol: "The Lovers",
      summary:
        "This reading stays on relationship energy, emotional reciprocity, communication tone, and next-step closeness.",
      themes: [
        "emotional temperature",
        "mixed signals versus genuine care",
        "what kind of contact helps instead of harms"
      ],
      actions: [
        "say the simplest true thing first",
        "watch for reciprocity instead of chasing intensity",
        "protect your dignity while staying warm",
        "focus on whether closeness is mutual, not only desired",
        "review whether the connection is growing steadier over time, not just more intense in the moment"
      ]
    },
    career: {
      label: "Career",
      symbol: "Eight of Pentacles",
      summary:
        "This reading stays on work pressure, role choice, opportunity timing, and execution decisions.",
      themes: [
        "whether effort is compounding or draining",
        "where the real risk sits",
        "what concrete move matters most next"
      ],
      actions: [
        "focus on one practical priority this week",
        "measure the opportunity cost of waiting",
        "make your next move visible and specific",
        "separate fear of change from actual downside",
        "check whether the current path is building leverage or only consuming effort"
      ]
    },
    general: {
      label: "General",
      symbol: "The Moon",
      summary:
        "This reading centers on emotional fog, inner pressure, and short-term clarity rather than a single domain.",
      themes: [
        "uncertainty and projection",
        "what is draining your energy",
        "which small action restores steadiness"
      ],
      actions: [
        "reduce noise before forcing a decision",
        "name what is true right now",
        "choose one stabilizing action",
        "avoid dramatic conclusions before the pattern is clear",
        "revisit the same question after one concrete step to see what actually changed"
      ]
    }
  };

  const tierMap = {
    free: {
      title: "Free Reading",
      depth: "Light",
      paragraphs: 1,
      listCount: 1,
      followups: 0
    },
    starter: {
      title: "Starter Reading",
      depth: "Short paid",
      paragraphs: 2,
      listCount: 1,
      followups: 0
    },
    core: {
      title: "Core Reading",
      depth: "Structured",
      paragraphs: 3,
      listCount: 3,
      followups: 1
    },
    deep: {
      title: "Deep Reading",
      depth: "Extended",
      paragraphs: 4,
      listCount: 4,
      followups: 3
    },
    love: {
      title: "Love Focus",
      depth: "Specialized",
      paragraphs: 4,
      listCount: 4,
      followups: 2
    },
    career: {
      title: "Career Focus",
      depth: "Specialized",
      paragraphs: 4,
      listCount: 4,
      followups: 2
    },
    monthly: {
      title: "Monthly Membership Reading",
      depth: "Ongoing",
      paragraphs: 4,
      listCount: 4,
      followups: 2
    },
    quarterly: {
      title: "Quarterly Membership Reading",
      depth: "Trend review",
      paragraphs: 5,
      listCount: 5,
      followups: 3
    },
    yearly: {
      title: "Annual Membership Reading",
      depth: "Long horizon",
      paragraphs: 6,
      listCount: 5,
      followups: 4
    }
  };

  const chosenFocus =
    focus === "love" || tier === "love"
      ? focusMap.love
      : focus === "career" || tier === "career"
        ? focusMap.career
        : focusMap.general;

  const chosenTier = tierMap[tier] || tierMap.free;
  const fallbackParagraphs = buildParagraphs(cleanQuestion, chosenFocus, chosenTier, profile);
  const paragraphs = normalizeParagraphs(aiReading?.paragraphs, fallbackParagraphs, chosenTier.paragraphs);
  const actionList = normalizeActions(aiReading?.actions, chosenFocus.actions, chosenTier.listCount);
  const followupText =
    aiReading?.followup?.trim() ||
    (chosenTier.followups > 0
      ? `${chosenTier.followups} follow-up slots available in this tier.`
      : "No follow-up thread included at this level.");

  return {
    tier: chosenTier.title,
    focus: chosenFocus.label,
    symbol: chosenFocus.symbol,
    depth: chosenTier.depth,
    profileUsed: summarizeProfile(profile),
    summary: aiReading?.summary?.trim() || chosenFocus.summary,
    paragraphs,
    actions: actionList,
    followup: followupText
  };
}

function buildParagraphs(question, focus, tier, profile) {
  const profileLine = summarizeProfile(profile);
  const first =
    `Question focus: "${question}". ${focus.symbol} suggests that the most important movement here is not noise, but pattern recognition.`;
  const second =
    `In ${focus.label.toLowerCase()} terms, the reading emphasizes ${focus.themes[0]}, then ${focus.themes[1]}. That means the next move should be simple, deliberate, and easier to sustain than to regret.`;
  const third =
    `The stronger paid layers add more than length: they add structure, timing, and decision pressure mapping. At the ${tier.title} level, the answer should guide action, not only mood.${profileLine ? ` Input used: ${profileLine}.` : ""}`;
  const fourth =
    `The reading also points to ${focus.themes[2]}. This is where hesitation can either protect you or trap you, depending on whether you are waiting for clarity or avoiding contact with reality.`;
  const fifth =
    `Longer memberships widen the lens. Instead of answering only today's emotional question, they track how the same pattern evolves over weeks or months.`;
  const sixth =
    `That longer horizon is especially useful when the issue repeats: the same person, the same work dynamic, the same kind of pressure, or the same fear showing up in a different shape.`;

  const all = [first, second, third, fourth, fifth, sixth];
  return all.slice(0, tier.paragraphs);
}

function fallbackQuestion(focus) {
  if (focus === "love") return "What is the real energy in this connection right now?";
  if (focus === "career") return "What should I focus on in my work situation right now?";
  return "What do I most need to understand about my current situation?";
}

function summarizeProfile(profile) {
  const parts = [];
  if (profile.name) parts.push(`name: ${profile.name}`);
  if (profile.birthDate) parts.push(`birth date: ${profile.birthDate}`);
  if (profile.birthTime) parts.push(`birth time: ${profile.birthTime}`);
  if (profile.context) parts.push(`context: ${profile.context}`);
  return parts.join("; ");
}

function normalizeParagraphs(aiParagraphs, fallbackParagraphs, count) {
  if (Array.isArray(aiParagraphs) && aiParagraphs.length > 0) {
    const cleaned = aiParagraphs.map((item) => String(item || "").trim()).filter(Boolean);
    if (cleaned.length > 0) {
      return cleaned.slice(0, count);
    }
  }
  return fallbackParagraphs.slice(0, count);
}

function normalizeActions(aiActions, fallbackActions, count) {
  if (Array.isArray(aiActions) && aiActions.length > 0) {
    const cleaned = aiActions.map((item) => String(item || "").trim()).filter(Boolean);
    if (cleaned.length > 0) {
      return cleaned.slice(0, count);
    }
  }
  return fallbackActions.slice(0, count);
}

async function fetchAiReading(context, { focus, tier, question, profile }) {
  const apiKey = context.env.API_KEY;
  const apiBase = normalizeApiBase(context.env.API_BASE_URL);
  const apiModel = context.env.API_MODEL;

  if (!apiKey || !apiBase || !apiModel || !question) {
    return "";
  }

  const systemPrompt =
    focus === "love" || tier === "love"
      ? "You write only about romantic relationships, emotional reciprocity, communication, boundaries, and next-step connection. Do not discuss career, money, or unrelated life themes."
      : focus === "career" || tier === "career"
        ? "You write only about work, career decisions, opportunity timing, execution, and professional risk. Do not discuss romance or unrelated emotional themes."
        : "You write about present emotional clarity and short-term life direction in a practical tone.";

  const tierPromptMap = {
    free:
      "Return exactly 1 concise paragraph, 1 action step, and a short follow-up line. Keep the whole response brief and useful.",
    starter:
      "Return exactly 2 concise paragraphs, 1 action step, and a short follow-up line. This should feel clearly deeper than free but still compact.",
    core:
      "Return exactly 3 substantial paragraphs, 3 action steps, and 1 follow-up line. Use a structured reading style with clearer interpretation and decision guidance.",
    deep:
      "Return exactly 4 substantial paragraphs, 4 action steps, and a follow-up line that mentions the next 7-30 days. Include timing, risk, and priority guidance.",
    love:
      "Return exactly 4 relationship-only paragraphs, 4 action steps, and a follow-up line. Keep the scope strictly on love, reciprocity, communication, distance, trust, and timing.",
    career:
      "Return exactly 4 career-only paragraphs, 4 action steps, and a follow-up line. Keep the scope strictly on work, opportunity, execution, role fit, and timing.",
    monthly:
      "Return exactly 4 paragraphs, 4 action steps, and a follow-up line written as an ongoing member reading. Include what to watch this week and what to revisit later this month.",
    quarterly:
      "Return exactly 5 paragraphs, 5 action steps, and a follow-up line written as a 30-90 day review. Include trend, timing, and what to reassess next month.",
    yearly:
      "Return exactly 6 paragraphs, 5 action steps, and a follow-up line written as a long-horizon reading. Include the broader year pattern and how to pace the next quarter."
  };

  const outputContract =
    'Reply with valid JSON only. Use this shape: {"summary":"...","paragraphs":["..."],"actions":["..."],"followup":"..."}. No markdown fences, no extra text.';

  try {
    const response = await fetch(apiBase, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: apiModel,
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content:
              `${tierPromptMap[tier] || tierPromptMap.deep}\n` +
              `${outputContract}\n` +
              `Question: ${question}\n` +
              `Focus: ${focus}\n` +
              `Tier: ${tier}\n` +
              `Optional profile: ${summarizeProfile(profile) || "none"}`
          }
        ]
      })
    });

    if (!response.ok) {
      return "";
    }

    const data = await response.json();
    const raw =
      data.choices?.[0]?.message?.content?.trim() ||
      data.result?.response?.trim() ||
      data.output_text?.trim() ||
      "";

    return parseAiReading(raw);
  } catch {
    return null;
  }
}

function parseAiReading(raw) {
  const text = String(raw || "").trim();
  if (!text) return null;

  const cleaned = text
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  try {
    const parsed = JSON.parse(cleaned);
    if (!parsed || typeof parsed !== "object") return null;
    return {
      summary: String(parsed.summary || "").trim(),
      paragraphs: Array.isArray(parsed.paragraphs) ? parsed.paragraphs : [],
      actions: Array.isArray(parsed.actions) ? parsed.actions : [],
      followup: String(parsed.followup || "").trim()
    };
  } catch {
    return null;
  }
}

function normalizeApiBase(apiBase) {
  const raw = String(apiBase || "").trim().replace(/\/+$/, "");
  if (!raw) return "";

  if (raw.endsWith("/chat/completions") || raw.endsWith("/responses")) {
    return raw;
  }

  if (raw.endsWith("/chatgpt/v1")) {
    return `${raw}/chat/completions`;
  }

  if (raw === "https://api.aicodewith.com") {
    return "https://api.aicodewith.com/chatgpt/v1/chat/completions";
  }

  if (raw === "https://api.jiuwanliguoxue.com") {
    return "https://api.jiuwanliguoxue.com/chatgpt/v1/chat/completions";
  }

  return raw;
}
