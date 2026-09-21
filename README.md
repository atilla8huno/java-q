# Java Practice Simulator

A browser-based quiz for Java certification and interview practice. Each question is shown one at a time, with single- or multi-select options, color-coded feedback, and a short explanation after you submit.

The question bank is based on `Java interview.docx` / `Java interview.pdf`, reviewed and expanded with common exam topics (records, virtual threads, sealed classes, and similar).

## Run it

No build step or server is required.

1. Open `index.html` in a modern browser (Chrome, Firefox, Safari, Edge).
2. If scripts fail to load from `file://`, serve the folder instead:

```bash
python3 -m http.server 8765
```

Then visit [http://127.0.0.1:8765](http://127.0.0.1:8765).

Progress (current question, answers, score) is stored in `localStorage` on that browser.

## How to practice

1. Read the prompt and the **Select N option(s)** hint.
2. Click the option cards until you have selected exactly that many.
3. Click **Submit answer**.
   - Correct options turn **green**.
   - Your wrong picks turn **red**.
   - An explanation is shown whether you were right or wrong.
4. Use **Next** / **Previous**, or the question map on the right.

Navigation rules:

- **Next** and **Previous** are always visible.
- You can skip a question with **Next** until you submit it.
- After a **wrong** submit, **Next** stays locked until you correct the answer and submit again.

Use the **Topic** dropdown to practice one category. **Reset progress** clears saved answers.

## Topics

153 high-yield questions across:

- Core Java (Inheritance, Overloading, String Pool, Try-With-Resources, Generics, Text Blocks)
- Collections (PECS Wildcards, HashMaps, Unmodifiable Lists, Sequenced Collections)
- Concurrency (ThreadLocal leaks, Volatile DCL, CompletableFuture, Virtual Threads, ForkJoinPool)
- Streams & Functional (Lazy evaluation, Collectors.toMap, Optional best practices)
- JVM & GC (Safepoints, Memory Layout, Metaspace, GC roots)
- Spring & Hibernate (ProxyBeanMethods, Transactional propagation, N+1 problem)
- REST & Web (HTTP semantics, Idempotency, Status codes)
- Database (ACID, Isolation levels, Indexing)
- Testing & Design (Clean architecture, GoF patterns, Unit/Integration testing)
- Architecture (Microservices, Circuit Breaker, Event-Driven patterns)
- Modern Java (Records, Sealed Classes, Pattern Matching for Switch, Virtual Threads)

## Project layout

| File | Role |
| --- | --- |
| `index.html` | Page shell |
| `styles.css` | Layout and green/red feedback |
| `app.js` | Selection, scoring, navigation gating, persistence |
| `questions.js` | Question bank (`QUESTIONS` array) |

## Adding or editing questions

Edit `questions.js`. Each item looks like:

```js
{
  id: 1,
  category: "Core Java",
  question: "What typically causes a `StackOverflowError` in Java?",
  options: [
    { id: "A", text: "..." },
    { id: "B", text: "..." }
  ],
  correct: ["B"],
  requiredCount: 1,
  explanation: "..."
}
```

- `correct` is the list of option ids that must be selected.
- `requiredCount` must equal `correct.length` (1 for single-select, 2+ for multi-select).
- Backticks in `question`, `options`, and `explanation` render as inline code.
