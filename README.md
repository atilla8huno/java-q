# Software Engineer Practice Simulator

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

Progress (current question, answers, score, and saved questions) is stored in `localStorage` on that browser.

## Interview lab

Open `review.html` the same way, from disk or from GitHub Pages. No server and no build are required.

The lab is eight system-design interviews, plus short must-know lists that point back at those interviews:

- System design overall
- Spotify
- TinyURL
- Twitter
- Payment system
- Booking.com
- WhatsApp
- ChatGPT

**Practice this prompt** hides the answer. **Reveal next** walks requirements, questions, failures, the board, then the checklist.

The same area menu has a **Focus** group after the lab: databases, Kafka, caching, scale, consistency, reliability, idempotency, HTTP, capacity, observability, and security. Each subtopic is a page of its own. Use **Simulator** and **Interview lab** in the header to move between the quiz and the lab. The last page is remembered in this browser.

## How to practice

1. Read the prompt and the **Select N option(s)** hint.
2. Click the option cards until you have selected exactly that many.
3. Click **Submit answer**.
   - Correct options turn **green**.
   - Your wrong picks turn **red**.
   - An explanation is shown whether you were right or wrong.
4. Use **Next** / **Previous**, or the question map on the right.

Navigation rules:

- **Next** and **Previous** are always visible and unlocked, allowing free navigation between questions at any time without being blocked on wrong answers.
- After submitting an answer (correct or incorrect), an **Answer again** button appears, allowing you to reset that question back to unanswered and practice it afresh.
- Use the **Topic** dropdown to take a **Quick Exam 1–10** (each is 25 unique mixed questions covering the full bank with no overlap, and every exam includes every topic), filter by topic, select **Wrong Answers**, or select **Saved** to review questions you bookmarked.
- The bookmark next to the topic name saves the current question for later. Click it again to remove it.
- The stats header displays current question, score, live **Success %**, and total answered. **Reset progress** clears answers and score. Saved questions stay.

## Topics

250 high-yield questions, plus 10 **Quick Exams** of 25 unique mixed questions each (every question appears in exactly one exam, and every exam includes every topic). Topics:

- Core Java & JVM (Inheritance, overloading, string pool, try-with-resources, generics, records, sealed classes, heap versus stack, garbage collection, safepoints, heap dumps, JIT warmup)
- Collections & Streams (PECS wildcards, HashMap, unmodifiable lists, sequenced collections, lazy streams, `Collectors.toMap`, `Optional`)
- Concurrency (ThreadLocal leaks, volatile double-checked locking, CompletableFuture, virtual threads, pinning, latches, ForkJoinPool)
- Spring & Hibernate (ProxyBeanMethods, transactional propagation and the self-invocation proxy, bean lifecycle)
- Kotlin (`val` versus `var`, extension functions, `object` and `companion object`, scope functions, `suspend`, coroutines, platform types, data classes)
- HTTP & REST (HTTP method semantics, safe and idempotent methods, status codes, PUT versus PATCH, OAuth)
- Databases (ACID, isolation anomalies, indexes and the leftmost prefix, N+1 queries, connection pool sizing, read-replica lag, slow-query diagnosis)
- Build Tools (Maven scopes and transitive dependencies, the default lifecycle, `package` versus `install` versus `deploy`, phase bindings, the `clean` lifecycle, reactor builds, Gradle configuration versus `doLast`)
- System Design (CAP, consistent hashing, cache stampede and cache strategies, sharding, multi-region active-passive versus active-active, partitioned logs and consumer groups, circuit breakers, rate limiting, at-least-once delivery)
- Design Patterns (Gang of Four creational: Singleton, Factory Method, Abstract Factory, Builder, Prototype; structural: Decorator, Facade, Composite, Bridge, Flyweight, Proxy, Adapter; behavioral: Strategy, Observer, Command, Chain of Responsibility, State, Template Method, Iterator, Mediator, Memento, Visitor, Interpreter)
- SOLID & DDD (test doubles, TDD, SOLID, entities and value objects, aggregates, domain versus integration events, bounded contexts, anti-corruption layer, unit of work, data mapper versus active record, CQRS, event sourcing)
- Docker & Kubernetes (Image versus container, Dockerfile layer cache, CMD versus ENTRYPOINT, multi-stage builds, volumes versus bind mounts; probes, graceful shutdown, CPU throttling versus OOMKilled, rolling updates, StatefulSet, DaemonSet, Service types, ConfigMaps and Secrets, Horizontal Pod Autoscaler, kubectl drain and PodDisruptionBudgets)
- Algorithms (Hash collisions, LRU cache, binary search, BFS versus DFS, Floyd cycle detection, sliding window, top-K with a heap, sorting, BST in-order traversal, trie, stack versus queue, adjacency list versus matrix)

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
  category: "Core Java & JVM",
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
