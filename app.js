(function () {
  const STORAGE_KEY = "java-q-simulator-state-v1";

  const QUICK_EXAMS = {
    "Quick Exam 1": [82, 45, 49, 111, 172, 129, 16, 105, 119, 26, 176, 190, 50, 9, 3, 186, 102, 108, 196, 125, 43, 163, 161, 194, 37],
    "Quick Exam 2": [20, 53, 149, 52, 56, 29, 30, 128, 95, 126, 146, 150, 47, 78, 40, 55, 142, 136, 144, 87, 18, 21, 152, 180, 38],
    "Quick Exam 3": [66, 44, 173, 92, 120, 2, 198, 11, 34, 72, 189, 124, 46, 91, 79, 174, 23, 86, 114, 118, 6, 185, 121, 67, 99],
    "Quick Exam 4": [122, 192, 170, 106, 63, 133, 153, 132, 165, 17, 75, 70, 159, 59, 103, 5, 33, 12, 171, 137, 96, 15, 39, 74, 65],
    "Quick Exam 5": [115, 160, 182, 89, 168, 25, 148, 135, 54, 100, 32, 19, 123, 158, 80, 155, 94, 71, 187, 81, 48, 175, 73, 166, 24],
    "Quick Exam 6": [134, 162, 101, 199, 60, 77, 97, 42, 112, 188, 98, 151, 164, 64, 116, 69, 117, 61, 113, 57, 193, 107, 8, 83, 109],
    "Quick Exam 7": [139, 138, 197, 183, 191, 156, 140, 51, 130, 184, 157, 36, 167, 177, 13, 154, 181, 90, 28, 147, 76, 31, 169, 145, 88],
    "Quick Exam 8": [127, 35, 200, 195, 141, 14, 68, 110, 104, 85, 178, 27, 62, 179, 4, 22, 93, 1, 143, 58, 84, 7, 131, 41, 10],
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
    nextBtn: document.getElementById("nextBtn"),
    questionPalette: document.getElementById("questionPalette"),
  };

  const state = {
    category: "All",
    index: 0,
    answers: {},
    wrongReviewIds: null,
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
    }));
  }

  function countWrongAnswers() {
    return QUESTIONS.filter((q) => {
      const rec = answerRecord(q.id);
      return rec.submitted && !rec.correct;
    }).length;
  }

  function categories() {
    const unique = [...new Set(QUESTIONS.map((q) => q.category))];
    return unique;
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
      return;
    }

    const rec = answerRecord(question.id);
    const max = requiredCount(question);
    const picked = rec.selected.length;
    els.categoryBadge.textContent = question.category;
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
      addOption(examGroup, name, `${name} (25)`);
    });
    els.categoryFilter.appendChild(examGroup);

    const reviewGroup = document.createElement("optgroup");
    reviewGroup.label = "Review";
    addOption(reviewGroup, "All", `All Topics (${QUESTIONS.length})`);
    addOption(reviewGroup, "Wrong Answers", `Wrong Answers (${countWrongAnswers()})`);
    els.categoryFilter.appendChild(reviewGroup);

    const topicGroup = document.createElement("optgroup");
    topicGroup.label = "Topics";
    categories().forEach((category) => {
      const count = QUESTIONS.filter((q) => q.category === category).length;
      addOption(topicGroup, category, `${category} (${count})`);
    });
    els.categoryFilter.appendChild(topicGroup);

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
