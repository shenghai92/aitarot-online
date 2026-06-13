import { readMemberAccess, readMemberSession, readSingleAccess } from "./_lib/access.js";

const singlePaidTiers = new Set(["starter", "core", "deep", "love", "career"]);
const membershipTiers = new Set(["monthly", "quarterly", "yearly"]);

export async function onRequestPost(context) {
  try {
    const body = await safeReadJson(context.request);
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
      return json(accessError, accessError.status);
    }

    const aiResult = await fetchAiReading(context, { focus, tier, question, profile });
    const response = buildReading({ focus, tier, question, profile, aiReading: aiResult.reading });
    return json(response);
  } catch (error) {
    const fallback = buildReading({
      focus: "general",
      tier: "free",
      question: "",
      profile: { name: "", birthDate: "", birthTime: "", context: "" },
      aiReading: null
    });

    return json(
      {
        ...fallback,
        debug: "reading-fallback",
        error: String(error?.message || error || "unknown-error")
      },
      200
    );
  }
}

async function safeReadJson(request) {
  try {
    return await request.json();
  } catch {
    return {};
  }
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
      followups: 0,
      timeHorizon: "right now",
      emphasis: "one clear emotional or practical signal"
    },
    starter: {
      title: "Starter Reading",
      depth: "Short paid",
      paragraphs: 2,
      listCount: 1,
      followups: 0,
      timeHorizon: "the next few days",
      emphasis: "the main pattern plus the immediate risk"
    },
    core: {
      title: "Core Reading",
      depth: "Structured",
      paragraphs: 3,
      listCount: 3,
      followups: 1,
      timeHorizon: "the next 1-3 weeks",
      emphasis: "pattern, pressure, and decision structure"
    },
    deep: {
      title: "Deep Reading",
      depth: "Extended",
      paragraphs: 4,
      listCount: 4,
      followups: 3,
      timeHorizon: "the next 7-30 days",
      emphasis: "hidden pressure, timing, and what changes first"
    },
    love: {
      title: "Love Focus",
      depth: "Specialized",
      paragraphs: 4,
      listCount: 4,
      followups: 2,
      timeHorizon: "the next 2-4 weeks in the connection",
      emphasis: "relationship pattern, reciprocity, and contact strategy"
    },
    career: {
      title: "Career Focus",
      depth: "Specialized",
      paragraphs: 4,
      listCount: 4,
      followups: 2,
      timeHorizon: "the next 2-6 weeks at work",
      emphasis: "professional leverage, risk, and next move"
    },
    monthly: {
      title: "Monthly Membership Reading",
      depth: "Ongoing",
      paragraphs: 4,
      listCount: 4,
      followups: 2,
      timeHorizon: "this week and later this month",
      emphasis: "check-in rhythm, short-cycle changes, and watchpoints"
    },
    quarterly: {
      title: "Quarterly Membership Reading",
      depth: "Trend review",
      paragraphs: 5,
      listCount: 5,
      followups: 3,
      timeHorizon: "the next 30-90 days",
      emphasis: "trend line, turning points, and reassessment windows"
    },
    yearly: {
      title: "Annual Membership Reading",
      depth: "Long horizon",
      paragraphs: 6,
      listCount: 5,
      followups: 4,
      timeHorizon: "this quarter inside the wider year",
      emphasis: "phase-of-year guidance, pacing, and long-cycle pattern"
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
    `At the ${tier.title} level, the reading widens into ${tier.emphasis} across ${tier.timeHorizon}, so the answer should guide action, not only mood.${profileLine ? ` Input used: ${profileLine}.` : ""}`;
  const fourth =
    `The reading also points to ${focus.themes[2]}. This is where hesitation can either protect you or trap you, depending on whether you are waiting for clarity or avoiding contact with reality.`;
  const fifth =
    `Longer memberships widen the lens further. Instead of answering only today's emotional question, they track how the same pattern evolves over weeks or months and what should be reassessed next.`;
  const sixth =
    `That long-horizon view is especially useful when the issue repeats: the same person, the same work dynamic, the same kind of pressure, or the same fear showing up in a different shape.`;

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
      return cleaned.concat(fallbackParagraphs).slice(0, count);
    }
  }
  return fallbackParagraphs.slice(0, count);
}

function normalizeActions(aiActions, fallbackActions, count) {
  if (Array.isArray(aiActions) && aiActions.length > 0) {
    const cleaned = aiActions.map((item) => String(item || "").trim()).filter(Boolean);
    if (cleaned.length > 0) {
      return cleaned.concat(fallbackActions).slice(0, count);
    }
  }
  return fallbackActions.slice(0, count);
}

async function fetchAiReading(context, { focus, tier, question, profile }) {
  const apiKey = context.env.API_KEY;
  const apiBase = normalizeApiBase(context.env.API_BASE_URL);
  const apiModel = context.env.API_MODEL;

  if (!apiKey || !apiBase || !apiModel || !question) {
    return {
      reading: null,
      debug: {
        usedAi: false,
        reason: "missing-config-or-question",
        hasApiKey: Boolean(apiKey),
        hasApiBase: Boolean(apiBase),
        hasApiModel: Boolean(apiModel),
        hasQuestion: Boolean(question)
      }
    };
  }

  const systemPrompt =
    focus === "love" || tier === "love"
      ? [
          "You are a warm, grounded tarot-style relationship reader.",
          "Write only about romantic relationships, emotional reciprocity, communication, boundaries, attachment, trust, and next-step connection.",
          "Do not discuss career, money, or unrelated life themes.",
          "Sound emotionally perceptive and specific, not mystical for the sake of it.",
          "Avoid generic therapy filler, vague affirmations, and repeated stock phrases.",
          "Name the central relationship pattern clearly, then give one practical next step."
        ].join(" ")
      : focus === "career" || tier === "career"
        ? [
            "You are a grounded career tarot-style reader with strong decision clarity.",
            "Write only about work, career decisions, opportunity timing, execution, professional risk, leverage, burnout, fit, and momentum.",
            "Do not discuss romance or unrelated emotional themes.",
            "Sound specific, strategic, and direct rather than corporate or generic.",
            "Avoid vague motivation language and empty encouragement.",
            "Name the real career tension clearly, then give one practical next step."
          ].join(" ")
        : [
            "You are a practical tarot-style reader for present emotional clarity and life direction.",
            "Sound calm, insightful, and concrete.",
            "Avoid therapy clichés, horoscope vagueness, and repetitive phrasing.",
            "Name the core pattern, the pressure underneath it, and one realistic next move."
          ].join(" ");

  const tierPromptMap = {
    free:
      "Return exactly 1 concise but vivid paragraph, 1 practical action step, and 1 short follow-up line. Keep it brief, specific, and clearly tied to the user's real question.",
    starter:
      "Return exactly 2 concise paragraphs, 1 practical action step, and 1 short follow-up line. This should feel noticeably deeper than free by naming the main pattern and the likely risk or opportunity.",
    core:
      "Return exactly 3 substantial paragraphs, 3 action steps, and 1 follow-up line. Use a structured reading style with clearer interpretation, emotional or strategic pattern recognition, and decision guidance.",
    deep:
      "Return exactly 4 substantial paragraphs, 4 action steps, and a follow-up line that mentions the next 7-30 days. Include timing, risk, hidden pressure, and priority guidance. Make this feel layered rather than repetitive.",
    love:
      "Return exactly 4 relationship-only paragraphs, 4 action steps, and a follow-up line. Keep the scope strictly on love, reciprocity, communication, distance, trust, timing, and relationship pattern. Do not drift into career or general life advice.",
    career:
      "Return exactly 4 career-only paragraphs, 4 action steps, and a follow-up line. Keep the scope strictly on work, opportunity, execution, role fit, timing, leverage, and professional risk. Do not drift into romance or general life advice.",
    monthly:
      "Return exactly 4 paragraphs, 4 action steps, and a follow-up line written as an ongoing member reading. Include what to watch this week and what to revisit later this month. Make it feel like a check-in, not a one-off answer.",
    quarterly:
      "Return exactly 5 paragraphs, 5 action steps, and a follow-up line written as a 30-90 day review. Include trend, timing, momentum shifts, and what to reassess next month.",
    yearly:
      "Return exactly 6 paragraphs, 5 action steps, and a follow-up line written as a long-horizon reading. Include the broader year pattern, the current phase, and how to pace the next quarter."
  };

  const outputContract =
    'Reply with valid JSON only. Use this shape: {"summary":"...","paragraphs":["..."],"actions":["..."],"followup":"..."}. No markdown fences, no extra text.';

  const styleContract = [
    "Write in plain, natural English.",
    "Do not mention tarot cards unless needed for tone; focus on the reading itself.",
    "Do not repeat the question back in slightly different words for the whole answer.",
    "Do not use filler such as 'trust the universe', 'everything happens for a reason', or 'you already know the answer'.",
    "Make each paragraph add a new layer: pattern, pressure, likely dynamic, timing, and next move as appropriate for the tier.",
    "Respect the requested tier depth. Higher tiers should feel tangibly more layered, more specific, and more time-aware than lower tiers."
  ].join(" ");

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
              `${styleContract}\n` +
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
      const errorText = await response.text();
      return {
        reading: null,
        debug: {
          usedAi: false,
          reason: "upstream-http-error",
          status: response.status,
          statusText: response.statusText || "",
          bodyPreview: String(errorText || "").slice(0, 400),
          apiBase,
          apiModel
        }
      };
    }

    const data = await response.json();
    const raw =
      data.choices?.[0]?.message?.content?.trim() ||
      data.result?.response?.trim() ||
      data.output_text?.trim() ||
      "";

    const parsed = parseAiReading(raw);
    if (!parsed) {
      return {
        reading: null,
        debug: {
          usedAi: false,
          reason: "unparseable-upstream-payload",
          apiBase,
          apiModel,
          responseKeys: Object.keys(data || {}).slice(0, 20),
          rawPreview: String(raw || "").slice(0, 400)
        }
      };
    }

    return {
      reading: parsed,
      debug: {
        usedAi: true,
        reason: "ok",
        apiBase,
        apiModel
      }
    };
  } catch {
    return {
      reading: null,
      debug: {
        usedAi: false,
        reason: "fetch-threw",
        apiBase,
        apiModel
      }
    };
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

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=UTF-8",
      "cache-control": "no-store"
    }
  });
}
