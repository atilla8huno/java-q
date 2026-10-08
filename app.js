(function () {
  const STORAGE_KEY = "java-q-simulator-state-v1";

  const QUICK_EXAMS = {
    "Quick Exam 1": [1, 27, 48, 69, 7, 38, 85, 36, 97, 90, 91, 241, 186, 12, 23, 107, 129, 164, 56, 139, 158, 178, 213, 223, 239],
    "Quick Exam 2": [2, 28, 49, 70, 26, 42, 86, 45, 98, 201, 92, 242, 187, 13, 24, 108, 131, 168, 57, 140, 161, 180, 214, 230, 240],
    "Quick Exam 3": [3, 29, 50, 71, 64, 77, 87, 59, 99, 202, 93, 243, 188, 14, 25, 109, 132, 39, 58, 141, 163, 181, 215, 231, 251],
    "Quick Exam 4": [4, 30, 51, 72, 96, 78, 88, 60, 102, 203, 122, 244, 189, 15, 61, 113, 133, 40, 111, 146, 167, 182, 216, 232, 252],
    "Quick Exam 5": [5, 31, 52, 73, 123, 79, 89, 103, 105, 204, 224, 245, 190, 17, 62, 114, 134, 41, 118, 148, 144, 183, 217, 233, 253],
    "Quick Exam 6": [6, 32, 53, 74, 156, 80, 100, 104, 106, 205, 225, 246, 191, 18, 63, 115, 142, 43, 124, 149, 165, 184, 218, 234, 254],
    "Quick Exam 7": [8, 33, 54, 75, 157, 81, 101, 112, 125, 206, 226, 247, 192, 19, 65, 117, 143, 44, 135, 150, 174, 185, 219, 235, 255],
    "Quick Exam 8": [9, 34, 110, 76, 159, 82, 166, 119, 170, 207, 227, 248, 193, 20, 66, 126, 145, 46, 136, 151, 175, 210, 220, 236, 256],
    "Quick Exam 9": [10, 35, 116, 121, 162, 83, 173, 120, 171, 208, 228, 249, 194, 21, 67, 127, 152, 47, 137, 154, 176, 211, 221, 237, 196],
    "Quick Exam 10": [11, 37, 147, 153, 169, 84, 179, 130, 172, 209, 229, 250, 195, 22, 68, 128, 160, 55, 138, 155, 177, 212, 222, 238, 197],
  };

  const QUICK_EXAM_NAMES = Object.keys(QUICK_EXAMS);

  const els = {
    categoryFilter: document.getElementById("categoryFilter"),
    resetBtn: document.getElementById("resetBtn"),
    questionCounter: document.getElementById("questionCounter"),
    scoreValue: document.getElementById("scoreValue"),
    successRate: document.getElementById("successRate"),
    answeredValue: document.getElementById("answeredValue"),
    progressBar: document.getElementById("progressBar"),
    categoryBadge: document.getElementById("categoryBadge"),
    selectHint: document.getElementById("selectHint"),
    questionText: document.getElementById("questionText"),
    optionsForm: document.getElementById("optionsForm"),
    feedback: document.getElementById("feedback"),
    feedbackBanner: document.getElementById("feedbackBanner"),
    explanationText: document.getElementById("explanationText"),
    prevBtn: document.getElementById("prevBtn"),
    submitBtn: document.getElementById("submitBtn"),
    retryBtn: document.getElementById("retryBtn"),
    saveBtn: document.getElementById("saveBtn"),
    nextBtn: document.getElementById("nextBtn"),
    questionPalette: document.getElementById("questionPalette"),
  };

  const state = {
    category: "All",
    index: 0,
    answers: {},
    wrongReviewIds: null,
    savedIds: [],
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
    let escaped = escapeHtml(placeholderText);
    escaped = escaped.replace(/`([^`]+)`/g, "<code>$1</code>");
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
      state.category = saved.category || "All";
      state.index = Number.isInteger(saved.index) ? saved.index : 0;
      state.answers = saved.answers || {};
      if (Array.isArray(saved.wrongReviewIds)) {
        state.wrongReviewIds = saved.wrongReviewIds;
      }
      if (Array.isArray(saved.savedIds)) {
        state.savedIds = saved.savedIds;
      }
    } catch {
      state.answers = {};
    }
  }

  function persistState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      category: state.category,
      index: state.index,
      answers: state.answers,
      wrongReviewIds: state.wrongReviewIds || null,
      savedIds: state.savedIds,
    }));
  }

  function countWrongAnswers() {
    return QUESTIONS.filter((q) => {
      const rec = answerRecord(q.id);
      return rec.submitted && !rec.correct;
    }).length;
  }

  const TOPIC_ORDER = [
    "Core Java & JVM",
    "Collections & Streams",
    "Concurrency",
    "Spring & Hibernate",
    "Kotlin",
    "HTTP & REST",
    "Databases",
    "Build Tools",
    "System Design",
    "Design Patterns",
    "SOLID & DDD",
    "Docker & Kubernetes",
    "Algorithms",
  ];

  function categories() {
    const present = new Set(QUESTIONS.map((q) => q.category));
    const ordered = TOPIC_ORDER.filter((name) => present.has(name));
    for (const name of present) {
      if (!ordered.includes(name)) ordered.push(name);
    }
    return ordered;
  }

  function isQuickExam(name) {
    return Object.prototype.hasOwnProperty.call(QUICK_EXAMS, name);
  }

  function questionsById(ids) {
    const lookup = new Map(QUESTIONS.map((q) => [q.id, q]));
    return ids.map((id) => lookup.get(id)).filter(Boolean);
  }

  function filteredQuestions() {
    if (state.category === "Wrong Answers") {
      if (!state.wrongReviewIds) {
        state.wrongReviewIds = QUESTIONS.filter((q) => {
          const rec = answerRecord(q.id);
          return rec.submitted && !rec.correct;
        }).map((q) => q.id);
      }
      return QUESTIONS.filter((q) => state.wrongReviewIds.includes(q.id));
    }
    if (state.category === "Saved") {
      return questionsById(state.savedIds);
    }
    if (isQuickExam(state.category)) {
      return questionsById(QUICK_EXAMS[state.category]);
    }
    if (state.category === "All") return QUESTIONS;
    return QUESTIONS.filter((q) => q.category === state.category);
  }

  function currentQuestion() {
    return filteredQuestions()[state.index];
  }

  function answerRecord(questionId) {
    return state.answers[questionId] || {
      selected: [],
      submitted: false,
      correct: false,
    };
  }

  function setAnswer(questionId, patch) {
    state.answers[questionId] = {
      ...answerRecord(questionId),
      ...patch,
    };
    persistState();
  }

  function arraysEqual(a, b) {
    if (a.length !== b.length) return false;
    const left = [...a].sort();
    const right = [...b].sort();
    return left.every((value, i) => value === right[i]);
  }

  function scoreSummary() {
    const pool = filteredQuestions();
    let correct = 0;
    let answered = 0;
    for (const question of pool) {
      const rec = answerRecord(question.id);
      if (rec.submitted) {
        answered += 1;
        if (rec.correct) correct += 1;
      }
    }
    const percent = answered > 0 ? Math.round((correct / answered) * 100) : 0;
    return { correct, answered, total: pool.length, percent };
  }

  function updateControls() {
    const pool = filteredQuestions();
    const question = currentQuestion();
    const rec = question ? answerRecord(question.id) : null;
    const selectedCount = rec ? rec.selected.length : 0;
    const required = question ? requiredCount(question) : 1;
    const atStart = state.index <= 0;
    const atEnd = state.index >= pool.length - 1;

    els.prevBtn.disabled = atStart || pool.length === 0;
    els.nextBtn.disabled = atEnd || pool.length === 0;
    els.submitBtn.disabled = !question || selectedCount !== required || (rec && rec.submitted);
    els.submitBtn.textContent = "Submit answer";
    if (els.retryBtn) {
      els.retryBtn.classList.toggle("hidden", !rec || !rec.submitted);
    }
  }

  function renderStats() {
    const pool = filteredQuestions();
    const summary = scoreSummary();
    els.questionCounter.textContent = `${pool.length ? state.index + 1 : 0} / ${pool.length}`;
    els.scoreValue.textContent = `${summary.correct} / ${summary.answered}`;
    if (els.successRate) {
      els.successRate.textContent = summary.answered > 0 ? `${summary.percent}%` : "—";
    }
    els.answeredValue.textContent = String(summary.answered);
    const pct = pool.length ? Math.round((summary.answered / pool.length) * 100) : 0;
    els.progressBar.style.width = `${pct}%`;
  }

  function renderPalette() {
    const pool = filteredQuestions();
    els.questionPalette.innerHTML = "";
    pool.forEach((question, i) => {
      const rec = answerRecord(question.id);
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "palette-btn";
      btn.textContent = String(i + 1);
      if (i === state.index) btn.classList.add("current");
      if (rec.submitted && rec.correct) btn.classList.add("answered-correct");
      if (rec.submitted && !rec.correct) btn.classList.add("needs-correction");
      btn.addEventListener("click", () => {
        state.index = i;
        persistState();
        render();
      });
      els.questionPalette.appendChild(btn);
    });
  }

  function requiredCount(question) {
    if (!question) return 1;
    if (Array.isArray(question.correct) && question.correct.length) {
      return question.correct.length;
    }
    return question.requiredCount || 1;
  }

  function optionClass(question, optionId, rec) {
    const selected = rec.selected.includes(optionId);
    const max = requiredCount(question);
    const atLimit = !rec.submitted && max > 1 && rec.selected.length >= max && !selected;
    const classes = ["option"];
    if (selected) classes.push("selected");
    if (atLimit) classes.push("at-limit");
    if (rec.submitted) {
      const isCorrect = question.correct.includes(optionId);
      if (isCorrect) classes.push("correct");
      if (selected && !isCorrect) classes.push("incorrect");
      classes.push("disabled");
    }
    return classes.join(" ");
  }

  function renderQuestion() {
    const pool = filteredQuestions();
    const question = currentQuestion();
    if (!question) {
      if (state.category === "Wrong Answers") {
        els.categoryBadge.textContent = "Review";
        els.selectHint.textContent = "";
        els.questionText.textContent = "No wrong answers to review! You answered all questions correctly.";
      } else if (state.category === "Saved") {
        els.categoryBadge.textContent = "Saved";
        els.selectHint.textContent = "";
        els.questionText.textContent = "No saved questions yet. Use the bookmark next to the topic name.";
      } else if (isQuickExam(state.category)) {
        els.categoryBadge.textContent = state.category;
        els.selectHint.textContent = "";
        els.questionText.textContent = "This exam has no questions.";
      } else {
        els.categoryBadge.textContent = state.category;
        els.selectHint.textContent = "";
        els.questionText.textContent = "No questions in this topic.";
      }
      els.optionsForm.innerHTML = "";
      els.feedback.classList.add("hidden");
      if (els.saveBtn) els.saveBtn.disabled = true;
      return;
    }

    const rec = answerRecord(question.id);
    const max = requiredCount(question);
    const picked = rec.selected.length;
    els.categoryBadge.textContent = question.category;
    if (els.saveBtn) {
      const saved = state.savedIds.includes(question.id);
      els.saveBtn.disabled = false;
      els.saveBtn.setAttribute("aria-pressed", saved ? "true" : "false");
      els.saveBtn.setAttribute("aria-label", saved ? "Remove from saved" : "Save for later");
      els.saveBtn.title = saved ? "Remove from saved" : "Save for later";
    }
    if (rec.submitted) {
      els.selectHint.textContent = max === 1 ? "Select 1 option" : `Select ${max} options`;
    } else if (max === 1) {
      els.selectHint.textContent = "Select 1 option";
    } else if (picked >= max) {
      els.selectHint.textContent = `${max} of ${max} selected — deselect one to change`;
    } else {
      els.selectHint.textContent = `Select ${max} options (${picked} of ${max})`;
    }
    els.questionText.innerHTML = formatRichText(question.question);

    els.optionsForm.innerHTML = "";
    question.options.forEach((option) => {
      const button = document.createElement("button");
      const selected = rec.selected.includes(option.id);
      const atLimit = !rec.submitted && max > 1 && picked >= max && !selected;
      button.type = "button";
      button.className = optionClass(question, option.id, rec);
      button.disabled = rec.submitted || atLimit;
      button.setAttribute("aria-disabled", button.disabled ? "true" : "false");
      button.innerHTML = `
        <span class="option-id">${option.id}</span>
        <span class="option-text">${formatRichText(option.text)}</span>
      `;
      button.addEventListener("click", () => toggleOption(question, option.id));
      els.optionsForm.appendChild(button);
    });

    if (rec.submitted) {
      els.feedback.classList.remove("hidden");
      els.feedback.classList.toggle("correct", rec.correct);
      els.feedback.classList.toggle("incorrect", !rec.correct);
      els.feedbackBanner.textContent = rec.correct ? "Correct" : "Incorrect";
      els.explanationText.innerHTML = formatRichText(question.explanation);
    } else {
      els.feedback.classList.add("hidden");
    }
  }

  function toggleOption(question, optionId) {
    const rec = answerRecord(question.id);
    if (rec.submitted) return;

    const max = requiredCount(question);
    let selected = [...rec.selected];
    if (selected.includes(optionId)) {
      selected = selected.filter((id) => id !== optionId);
    } else if (max === 1) {
      selected = [optionId];
    } else if (selected.length < max) {
      selected.push(optionId);
    } else {
      return;
    }

    setAnswer(question.id, {
      selected,
      submitted: false,
      correct: false,
    });
    render();
  }

  function submitAnswer() {
    const question = currentQuestion();
    if (!question) return;
    const rec = answerRecord(question.id);
    if (rec.selected.length !== requiredCount(question)) return;
    const correct = arraysEqual(rec.selected, question.correct);
    setAnswer(question.id, {
      submitted: true,
      correct,
    });
    render();
  }

  function resetCurrentQuestion() {
    const question = currentQuestion();
    if (!question) return;
    delete state.answers[question.id];
    persistState();
    render();
  }

  function go(delta) {
    const pool = filteredQuestions();
    const nextIndex = state.index + delta;
    if (nextIndex < 0 || nextIndex >= pool.length) return;
    state.index = nextIndex;
    persistState();
    render();
  }

  function addOption(parent, value, label) {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = label;
    parent.appendChild(option);
    return option;
  }

  function populateFilters() {
    els.categoryFilter.innerHTML = "";

    const examGroup = document.createElement("optgroup");
    examGroup.label = "Quick Exams";
    QUICK_EXAM_NAMES.forEach((name) => {
      addOption(examGroup, name, `${name} (${QUICK_EXAMS[name].length})`);
    });
    els.categoryFilter.appendChild(examGroup);

    const reviewGroup = document.createElement("optgroup");
    reviewGroup.label = "Review";
    addOption(reviewGroup, "All", `All Topics (${QUESTIONS.length})`);
    addOption(reviewGroup, "Wrong Answers", `Wrong Answers (${countWrongAnswers()})`);
    addOption(reviewGroup, "Saved", `Saved (${state.savedIds.length})`);
    els.categoryFilter.appendChild(reviewGroup);

    const topicGroup = document.createElement("optgroup");
    topicGroup.label = "Topics";
    categories().forEach((category) => {
      const count = QUESTIONS.filter((q) => q.category === category).length;
      addOption(topicGroup, category, `${category} (${count})`);
    });
    els.categoryFilter.appendChild(topicGroup);

    const allowed = new Set(["All", "Wrong Answers", "Saved", ...QUICK_EXAM_NAMES, ...categories()]);
    if (!allowed.has(state.category)) {
      state.category = "All";
      state.index = 0;
    }
    els.categoryFilter.value = state.category;
  }

  function render() {
    const pool = filteredQuestions();
    if (state.index >= pool.length) state.index = Math.max(0, pool.length - 1);
    renderQuestion();
    renderStats();
    renderPalette();
    updateControls();

    const wrongOpt = els.categoryFilter.querySelector('option[value="Wrong Answers"]');
    if (wrongOpt) {
      wrongOpt.textContent = `Wrong Answers (${countWrongAnswers()})`;
    }
    const savedOpt = els.categoryFilter.querySelector('option[value="Saved"]');
    if (savedOpt) {
      savedOpt.textContent = `Saved (${state.savedIds.length})`;
    }
  }

  function toggleSaved() {
    const question = currentQuestion();
    if (!question) return;
    if (state.savedIds.includes(question.id)) {
      state.savedIds = state.savedIds.filter((id) => id !== question.id);
      if (state.category === "Saved" && state.index >= state.savedIds.length) {
        state.index = Math.max(0, state.savedIds.length - 1);
      }
    } else {
      state.savedIds = state.savedIds.concat(question.id);
    }
    persistState();
    render();
  }

  function resetProgress() {
    state.answers = {};
    state.index = 0;
    state.category = "All";
    state.wrongReviewIds = null;
    els.categoryFilter.value = "All";
    persistState();
    populateFilters();
    render();
  }

  els.prevBtn.addEventListener("click", () => go(-1));
  els.nextBtn.addEventListener("click", () => go(1));
  els.submitBtn.addEventListener("click", submitAnswer);
  if (els.retryBtn) {
    els.retryBtn.addEventListener("click", resetCurrentQuestion);
  }
  if (els.saveBtn) {
    els.saveBtn.addEventListener("click", toggleSaved);
  }
  els.resetBtn.addEventListener("click", resetProgress);
  els.categoryFilter.addEventListener("change", () => {
    state.category = els.categoryFilter.value;
    state.index = 0;
    if (state.category === "Wrong Answers") {
      state.wrongReviewIds = QUESTIONS.filter((q) => {
        const rec = answerRecord(q.id);
        return rec.submitted && !rec.correct;
      }).map((q) => q.id);
    } else {
      state.wrongReviewIds = null;
    }
    persistState();
    render();
  });

  loadState();
  populateFilters();
  render();
})();
