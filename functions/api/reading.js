export async function onRequestPost(context) {
  const body = await context.request.json();
  const focus = body.focus || "general";
  const tier = body.tier || "free";
  const question = String(body.question || "").trim();
  const profile = {
    name: String(body.name || "").trim(),
    birthDate: String(body.birthDate || "").trim(),
    birthTime: String(body.birthTime || "").trim(),
    context: String(body.context || "").trim()
  };

  const aiDraft = await fetchAiDraft(context, { focus, tier, question, profile });
  const response = buildReading({ focus, tier, question, profile, aiDraft });

  return new Response(JSON.stringify(response), {
    headers: {
      "content-type": "application/json; charset=UTF-8",
      "cache-control": "no-store"
    }
  });
}

function buildReading({ focus, tier, question, profile, aiDraft }) {
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
        "focus on whether closeness is mutual, not only desired"
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
        "separate fear of change from actual downside"
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
        "avoid dramatic conclusions before the pattern is clear"
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
  const paragraphs = buildParagraphs(cleanQuestion, chosenFocus, chosenTier, profile, aiDraft);
  const actionList = chosenFocus.actions.slice(0, chosenTier.listCount);
  const followupText =
    chosenTier.followups > 0
      ? `${chosenTier.followups} follow-up slots available in this tier.`
      : "No follow-up thread included at this level.";

  return {
    tier: chosenTier.title,
    focus: chosenFocus.label,
    symbol: chosenFocus.symbol,
    depth: chosenTier.depth,
    profileUsed: summarizeProfile(profile),
    summary: chosenFocus.summary,
    paragraphs,
    actions: actionList,
    followup: followupText
  };
}

function buildParagraphs(question, focus, tier, profile, aiDraft) {
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
  if (aiDraft) {
    all[1] = aiDraft;
  }
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

async function fetchAiDraft(context, { focus, tier, question, profile }) {
  const apiKey = context.env.API_KEY;
  const apiBase = context.env.API_BASE_URL;
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

  const tierPrompt =
    tier === "free"
      ? "Keep it compact, around 80-120 words."
      : tier === "starter"
        ? "Keep it concise, around 140-180 words."
        : tier === "core"
          ? "Write around 220-320 words with structured practical guidance."
          : "Write around 320-520 words with stronger structure and more concrete action guidance.";

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
            content: `${tierPrompt}\nQuestion: ${question}\nFocus: ${focus}\nTier: ${tier}\nOptional profile: ${summarizeProfile(profile) || "none"}`
          }
        ]
      })
    });

    if (!response.ok) {
      return "";
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content?.trim() || data.result?.response?.trim() || "";
  } catch {
    return "";
  }
}
