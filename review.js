if (typeof FOCUS_AREAS !== "undefined") {
  FOCUS_AREAS.forEach((area) => AREAS.push(area));
  Object.assign(TOPICS, FOCUS_TOPICS);
}

(function () {
  const STORAGE_KEY = "java-q-review-state-v1";
  const LAST_STAGE = 5;
  const CHECKLIST = [
    "Requirements",
    "Capacity estimation",
    "API",
    "Data model",
    "Architecture",
    "Scaling",
    "Consistency",
    "Failure handling",
    "Security",
    "Observability",
    "Trade-offs",
  ];

  const els = {
    areaFilter: document.getElementById("areaFilter"),
    areaBlurb: document.getElementById("areaBlurb"),
    topicList: document.getElementById("topicList"),
    areaBadge: document.getElementById("areaBadge"),
    noteTitle: document.getElementById("noteTitle"),
    noteBody: document.getElementById("noteBody"),
    practiceBtn: document.getElementById("practiceBtn"),
    revealBtn: document.getElementById("revealBtn"),
  };

  const state = {
    areaId: AREAS[0] ? AREAS[0].id : "",
    topicId: "",
    practice: false,
    reveal: LAST_STAGE,
  };

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  function formatRichText(text) {
    if (!text) return "";
    const codeBlocks = [];
    const placeholderText = String(text).replace(/```([\s\S]*?)```/g, (_, code) => {
      codeBlocks.push(`<pre><code>${escapeHtml(code.trim())}</code></pre>`);
      return `___CODE_BLOCK_${codeBlocks.length - 1}___`;
    });
    const inlineCodes = [];
    const withInline = placeholderText.replace(/`([^`]+)`/g, (_, code) => {
      inlineCodes.push(`<code>${escapeHtml(code)}</code>`);
      return `___INLINE_${inlineCodes.length - 1}___`;
    });
    let escaped = escapeHtml(withInline);
    escaped = escaped.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    escaped = escaped.replace(/(^|[\s>(\n])\*([^*\n]+)\*/g, "$1<em>$2</em>");
    inlineCodes.forEach((html, i) => {
      escaped = escaped.replace(`___INLINE_${i}___`, html);
    });
    escaped = escaped.replace(/\n\n+/g, "<br><br>");
    escaped = escaped.replace(/(?<!<br>)\n/g, "<br>");
    codeBlocks.forEach((block, i) => {
      escaped = escaped.replace(`___CODE_BLOCK_${i}___`, block);
    });
    return escaped;
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw);
      if (saved.areaId && AREAS.some((area) => area.id === saved.areaId)) {
        state.areaId = saved.areaId;
      }
      if (saved.topicId) state.topicId = saved.topicId;
      state.practice = Boolean(saved.practice);
      if (Number.isInteger(saved.reveal)) state.reveal = saved.reveal;
    } catch {
      state.topicId = "";
    }
  }

  function persistState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      areaId: state.areaId,
      topicId: state.topicId,
      practice: state.practice,
      reveal: state.reveal,
    }));
  }

  function currentArea() {
    return AREAS.find((area) => area.id === state.areaId) || AREAS[0];
  }

  function topicsIn(area) {
    return (area.topicIds || [])
      .map((id) => TOPICS[id] ? { id, ...TOPICS[id] } : null)
      .filter(Boolean);
  }

  function shown(stage) {
    return !state.practice || state.reveal >= stage;
  }

  function list(items) {
    return `<ul>${items.map((item) => `<li>${formatRichText(item)}</li>`).join("")}</ul>`;
  }

  function renderBoard(rows) {
    const width = 720;
    const boxH = 48;
    const gapY = 36;
    const pad = 12;
    const rowGap = 14;
    const height = pad * 2 + rows.length * boxH + (rows.length - 1) * gapY;
    const marker = `<defs><marker id="lab-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="#94a3b8"/></marker></defs>`;
    const shapes = [];
    const centers = [];
    rows.forEach((row, i) => {
      const n = row.length;
      const boxW = Math.min(240, Math.floor((width - pad * 2 - (n - 1) * rowGap) / n));
      const total = n * boxW + (n - 1) * rowGap;
      let x = (width - total) / 2;
      const y = pad + i * (boxH + gapY);
      const xs = [];
      row.forEach((label) => {
        const cx = x + boxW / 2;
        xs.push(cx);
        shapes.push(`<rect x="${x}" y="${y}" width="${boxW}" height="${boxH}" rx="8"/>`);
        shapes.push(`<text x="${cx}" y="${y + 29}" text-anchor="middle">${escapeHtml(label)}</text>`);
        x += boxW + rowGap;
      });
      centers.push({ y, xs });
    });
    const arrows = [];
    for (let i = 0; i < centers.length - 1; i += 1) {
      const from = centers[i];
      const to = centers[i + 1];
      const x1 = from.xs[Math.floor((from.xs.length - 1) / 2)];
      const x2 = to.xs[Math.floor((to.xs.length - 1) / 2)];
      arrows.push(`<line x1="${x1}" y1="${from.y + boxH}" x2="${x2}" y2="${to.y}" marker-end="url(#lab-arrow)"/>`);
    }
    return `<svg class="board" viewBox="0 0 ${width} ${height}" role="img" aria-label="Architecture diagram">${marker}${arrows.join("")}${shapes.join("")}</svg>`;
  }

  function section(title, html, stage) {
    if (!shown(stage)) return "";
    return `<section class="lab-section"><h3>${escapeHtml(title)}</h3>${html}</section>`;
  }

  function renderScenario(topic) {
    const know = shown(4) ? `
      <div class="know-grid">
        <div class="know-col"><h3>Must know</h3>${list(topic.mustKnow)}</div>
        <div class="know-col"><h3>Nice to know</h3>${list(topic.niceToKnow)}</div>
      </div>` : "";

    const requirements = `
      <h4>Functional</h4>${list(topic.functional)}
      <h4>Non-functional</h4>${list(topic.nonFunctional)}`;

    const steps = (topic.steps || []).map((step, index) => `
      <div class="step-card">
        <h4>Step ${index + 1} — ${escapeHtml(step.title)}</h4>
        ${renderBoard(step.rows)}
        <p>${formatRichText(step.caption)}</p>
      </div>`).join("");

    const why = `<dl class="why-list">${topic.why.map((item) =>
      `<dt>${escapeHtml(item.name)}</dt><dd>${formatRichText(item.text)}</dd>`).join("")}</dl>`;

    const failures = `<dl class="fail-list">${topic.failures.map((item) =>
      `<dt>${escapeHtml(item.name)}</dt><dd>${formatRichText(item.text)}</dd>`).join("")}</dl>`;

    const trades = topic.tradeoffs.map((item) => `
      <div class="trade">
        <article><h4>${escapeHtml(item.left)}</h4><p>${formatRichText(item.leftWhen)}</p></article>
        <article><h4>${escapeHtml(item.right)}</h4><p>${formatRichText(item.rightWhen)}</p></article>
      </div>`).join("");

    const hidden = state.practice && state.reveal < LAST_STAGE
      ? `<p class="area-blurb">Work from what is on the board. Reveal the next section when you are ready.</p>`
      : "";

    return `
      ${know}
      ${section("Interview scenario", `<blockquote class="prompt-quote">${formatRichText(topic.prompt)}</blockquote>`, 0)}
      ${section("Requirements", requirements, 1)}
      ${section("Clarifying questions", list(topic.questions), 2)}
      ${section("What happens when things fail?", failures, 3)}
      ${section("Whiteboard", steps, 4)}
      ${section("Why this design?", why, 4)}
      ${section("Trade-offs", trades, 4)}
      ${section("What a Principal Engineer should say", list(topic.tips), 5)}
      ${section("Common interview mistakes", list(topic.mistakes), 5)}
      ${section("Interview checklist", `<ul class="check-list">${CHECKLIST.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`, 5)}
      ${hidden}`;
  }

  function renderConcept(topic) {
    function lines(items) {
      return `<ul>${items.map((item) => {
        const title = TOPICS[item.scenario] ? TOPICS[item.scenario].title : item.scenario;
        return `<li>${formatRichText(item.text)} <button type="button" class="scenario-link" data-scenario="${escapeHtml(item.scenario)}">${escapeHtml(title)}</button></li>`;
      }).join("")}</ul>`;
    }
    return `
      <div class="know-grid">
        <div class="know-col"><h3>Must know</h3>${lines(topic.mustKnow)}</div>
        <div class="know-col"><h3>Nice to know</h3>${lines(topic.niceToKnow)}</div>
      </div>
      <p class="area-blurb">Each line is learned inside a scenario. Open that interview and walk the board.</p>`;
  }

  function populateAreas() {
    els.areaFilter.innerHTML = "";
    const groups = [];
    AREAS.forEach((area) => {
      let group = groups.find((item) => item.label === area.group);
      if (!group) {
        group = { label: area.group, areas: [] };
        groups.push(group);
      }
      group.areas.push(area);
    });
    groups.forEach((group) => {
      const optgroup = document.createElement("optgroup");
      optgroup.label = group.label;
      group.areas.forEach((area) => {
        const option = document.createElement("option");
        option.value = area.id;
        option.textContent = `${area.title} (${topicsIn(area).length})`;
        optgroup.appendChild(option);
      });
      els.areaFilter.appendChild(optgroup);
    });
    if ([...els.areaFilter.options].some((option) => option.value === state.areaId)) {
      els.areaFilter.value = state.areaId;
    }
  }

  function updatePracticeControls(topic) {
    const isScenario = topic && topic.kind === "scenario";
    els.practiceBtn.classList.toggle("hidden", !isScenario);
    els.revealBtn.classList.toggle("hidden", !isScenario || !state.practice || state.reveal >= LAST_STAGE);
    els.practiceBtn.textContent = state.practice ? "Show the full answer" : "Practice this prompt";
    els.revealBtn.textContent = state.reveal >= LAST_STAGE - 1 ? "Reveal the checklist" : "Reveal next";
  }

  function render() {
    const area = currentArea();
    const topics = topicsIn(area);
    if (!topics.some((topic) => topic.id === state.topicId)) {
      state.topicId = topics[0] ? topics[0].id : "";
    }
    const topic = TOPICS[state.topicId];

    els.areaBlurb.textContent = area.blurb || "";
    els.areaBadge.textContent = area.title;
    els.topicList.innerHTML = "";
    topics.forEach((item) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "topic-btn";
      if (item.id === state.topicId) button.classList.add("current");
      button.textContent = item.title;
      button.addEventListener("click", () => {
        state.topicId = item.id;
        if (state.practice) state.reveal = 0;
        persistState();
        render();
      });
      els.topicList.appendChild(button);
    });

    updatePracticeControls(topic);
    if (!topic) {
      els.noteTitle.textContent = "Nothing in this area";
      els.noteBody.innerHTML = "";
      return;
    }
    els.noteTitle.textContent = topic.title;
    els.noteBody.innerHTML = topic.kind === "scenario"
      ? renderScenario(topic)
      : topic.kind === "note"
        ? formatRichText(topic.body)
        : renderConcept(topic);

    els.noteBody.querySelectorAll("[data-scenario]").forEach((button) => {
      button.addEventListener("click", () => openScenario(button.getAttribute("data-scenario")));
    });
  }

  function openScenario(id) {
    const area = AREAS.find((item) => item.topicIds.includes(id));
    if (!area || !TOPICS[id]) return;
    state.areaId = area.id;
    state.topicId = id;
    state.practice = false;
    state.reveal = LAST_STAGE;
    persistState();
    populateAreas();
    render();
  }

  els.areaFilter.addEventListener("change", () => {
    state.areaId = els.areaFilter.value;
    state.topicId = "";
    if (state.practice) state.reveal = 0;
    persistState();
    render();
  });

  els.practiceBtn.addEventListener("click", () => {
    state.practice = !state.practice;
    state.reveal = state.practice ? 0 : LAST_STAGE;
    persistState();
    render();
  });

  els.revealBtn.addEventListener("click", () => {
    state.reveal = Math.min(LAST_STAGE, state.reveal + 1);
    if (state.reveal >= LAST_STAGE) state.practice = false;
    persistState();
    render();
  });

  loadState();
  populateAreas();
  render();
})();
