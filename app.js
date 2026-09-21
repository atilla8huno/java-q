(function () {
  const STORAGE_KEY = "java-q-simulator-state-v1";

  const els = {
    categoryFilter: document.getElementById("categoryFilter"),
    resetBtn: document.getElementById("resetBtn"),
    questionCounter: document.getElementById("questionCounter"),
    scoreValue: document.getElementById("scoreValue"),
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
    nextBtn: document.getElementById("nextBtn"),
    questionPalette: document.getElementById("questionPalette"),
  };

  const state = {
    category: "All",
    index: 0,
    answers: {},
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
    } catch {
      state.answers = {};
    }
  }

  function persistState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      category: state.category,
      index: state.index,
      answers: state.answers,
    }));
  }

  function categories() {
    const unique = [...new Set(QUESTIONS.map((q) => q.category))];
    return ["All", ...unique];
  }

  function filteredQuestions() {
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
    return { correct, answered, total: pool.length };
  }

  function canGoNext() {
    const question = currentQuestion();
    if (!question) return false;
    const rec = answerRecord(question.id);
    if (!rec.submitted) return true;
    return rec.correct;
  }

  function updateControls() {
    const pool = filteredQuestions();
    const question = currentQuestion();
    const rec = question ? answerRecord(question.id) : null;
    const selectedCount = rec ? rec.selected.length : 0;
    const required = question ? question.requiredCount : 1;
    const atStart = state.index <= 0;
    const atEnd = state.index >= pool.length - 1;

    els.prevBtn.disabled = atStart;
    els.nextBtn.disabled = atEnd || !canGoNext();
    els.submitBtn.disabled = !question || selectedCount !== required || (rec && rec.correct);
    els.submitBtn.textContent = rec && rec.submitted && !rec.correct
      ? "Resubmit answer"
      : "Submit answer";
  }

  function renderStats() {
    const pool = filteredQuestions();
    const summary = scoreSummary();
    els.questionCounter.textContent = `${pool.length ? state.index + 1 : 0} / ${pool.length}`;
    els.scoreValue.textContent = `${summary.correct} / ${summary.answered}`;
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
        const current = currentQuestion();
        const currentRec = answerRecord(current.id);
        if (i > state.index && currentRec.submitted && !currentRec.correct) return;
        state.index = i;
        persistState();
        render();
      });
      els.questionPalette.appendChild(btn);
    });
  }

  function optionClass(question, optionId, rec) {
    const selected = rec.selected.includes(optionId);
    const classes = ["option"];
    if (selected) classes.push("selected");
    if (rec.submitted) {
      const isCorrect = question.correct.includes(optionId);
      if (isCorrect) classes.push("correct");
      if (selected && !isCorrect) classes.push("incorrect");
    }
    if (rec.correct) classes.push("disabled");
    return classes.join(" ");
  }

  function renderQuestion() {
    const question = currentQuestion();
    if (!question) {
      els.questionText.textContent = "No questions in this topic.";
      els.optionsForm.innerHTML = "";
      els.feedback.classList.add("hidden");
      return;
    }

    const rec = answerRecord(question.id);
    els.categoryBadge.textContent = question.category;
    els.selectHint.textContent = question.requiredCount === 1
      ? "Select 1 option"
      : `Select ${question.requiredCount} options`;
    els.questionText.innerHTML = formatRichText(question.question);

    els.optionsForm.innerHTML = "";
    question.options.forEach((option) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = optionClass(question, option.id, rec);
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
      els.feedbackBanner.textContent = rec.correct
        ? "Correct"
        : "Incorrect — review the highlighted answers and resubmit";
      els.explanationText.innerHTML = formatRichText(question.explanation);
    } else {
      els.feedback.classList.add("hidden");
    }
  }

  function toggleOption(question, optionId) {
    const rec = answerRecord(question.id);
    if (rec.correct) return;

    let selected = [...rec.selected];
    if (selected.includes(optionId)) {
      selected = selected.filter((id) => id !== optionId);
    } else if (question.requiredCount === 1) {
      selected = [optionId];
    } else if (selected.length < question.requiredCount) {
      selected.push(optionId);
    } else {
      return;
    }

    setAnswer(question.id, {
      selected,
      submitted: rec.submitted ? rec.submitted : false,
      correct: false,
    });
    render();
  }

  function submitAnswer() {
    const question = currentQuestion();
    if (!question) return;
    const rec = answerRecord(question.id);
    if (rec.selected.length !== question.requiredCount) return;
    const correct = arraysEqual(rec.selected, question.correct);
    setAnswer(question.id, {
      submitted: true,
      correct,
    });
    render();
  }

  function go(delta) {
    const pool = filteredQuestions();
    const nextIndex = state.index + delta;
    if (nextIndex < 0 || nextIndex >= pool.length) return;
    if (delta > 0 && !canGoNext()) return;
    state.index = nextIndex;
    persistState();
    render();
  }

  function populateFilters() {
    els.categoryFilter.innerHTML = "";
    categories().forEach((category) => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      els.categoryFilter.appendChild(option);
    });
    els.categoryFilter.value = state.category;
  }

  function render() {
    const pool = filteredQuestions();
    if (state.index >= pool.length) state.index = Math.max(0, pool.length - 1);
    renderQuestion();
    renderStats();
    renderPalette();
    updateControls();
  }

  function resetProgress() {
    state.answers = {};
    state.index = 0;
    persistState();
    render();
  }

  els.prevBtn.addEventListener("click", () => go(-1));
  els.nextBtn.addEventListener("click", () => go(1));
  els.submitBtn.addEventListener("click", submitAnswer);
  els.resetBtn.addEventListener("click", resetProgress);
  els.categoryFilter.addEventListener("change", () => {
    state.category = els.categoryFilter.value;
    state.index = 0;
    persistState();
    render();
  });

  loadState();
  populateFilters();
  render();
})();
