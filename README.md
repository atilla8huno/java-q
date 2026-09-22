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

Progress (current question, answers, score, and saved questions) is stored in `localStorage` on that browser.

## Interview lab

Open `review.html` the same way, from disk or from GitHub Pages. No server and no build are required.

The lab is eight system-design interviews, plus short must-know lists that point back at those interviews:

- 100k events per second
- High-traffic API, Redis, and database
- Order, payment, and inventory
- Distributed rate limiter
- Notification platform
- Database writes that do not fit one primary
- Reliable calls between services
- Authentication for many services

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
- Use the **Topic** dropdown to take a **Quick Exam 1–8** (each is 25 unique mixed questions covering the full bank with no overlap), filter by topic, select **Wrong Answers**, or select **Saved** to review questions you bookmarked.
- The bookmark next to the topic name saves the current question for later. Click it again to remove it.
- The stats header displays current question, score, live **Success %**, and total answered. **Reset progress** clears answers and score. Saved questions stay.

## Topics

200 high-yield questions, plus 8 **Quick Exams** of 25 unique mixed questions each (every question appears in exactly one exam). Topics:

- Core Java (Inheritance, Overloading, String Pool, Try-With-Resources, Generics, Text Blocks)
- Collections (PECS Wildcards, HashMaps, Unmodifiable Lists, Sequenced Collections)
- Concurrency (ThreadLocal leaks, Volatile DCL, CompletableFuture, Virtual Threads, ForkJoinPool)
- Streams & Functional (Lazy evaluation, Collectors.toMap, Optional best practices)
- JVM & GC (Safepoints, Memory Layout, Metaspace, GC roots)
- Spring & Hibernate (ProxyBeanMethods, Transactional propagation, N+1 problem)
- REST & Web (HTTP semantics, Idempotency, Status codes)
- Database (ACID, Isolation levels, Indexing)
- Testing & Design (Clean architecture, GoF patterns, Unit/Integration testing)
- Modern Java (Records, Sealed Classes, Pattern Matching for Switch, Virtual Threads)
- Staff Java & Kotlin (CompletableFuture exception handling, Virtual Thread Pinning in synchronized/JNI, Kotlin Coroutines vs Threads, Kotlin Platform Types & Nullability, LongAdder vs AtomicLong under contention, lateinit vs by lazy, Heap Dump & GC Log Leak Diagnostics, CountDownLatch vs CyclicBarrier vs Semaphore, Kotlin Data Classes, BlockingQueue implementations, JIT Compilation & Service Warm-up, Spring @Transactional Self-Invocation Proxy Trap, JPA N+1 Query Resolution, Spring Bean Lifecycle Callbacks, jstack Deadlock Analysis, Kotlin Coroutine Exception Propagation)
- Architecture & System Design (Sync REST/gRPC vs Async Event-Driven, Cache Stampede / Thundering Herd mitigation, Caching Strategies: Cache-Aside vs Write-Through vs Write-Behind, Composite Index Leftmost Prefix Rule & Covering Indexes, Idempotent REST API Design, Horizontal Database Sharding Trade-offs, Token Bucket vs Sliding Window Rate Limiting, Circuit Breakers & Cascading Failures, URI Path vs Header API Versioning, HikariCP Connection Pool Sizing, Database-per-Service Microservice Challenges, Graceful Shutdown in Kubernetes, Disaster Recovery: RPO vs RTO, JWT Architecture & Revocation, At-Least-Once Delivery & Idempotent Consumers, L4 vs L7 Load Balancing)
- Algorithms & Data Structures (Hash Table Collisions: Chaining vs Open Addressing, $O(1)$ LRU Cache Design with HashMap + Doubly Linked List, Binary Search Integer Overflow & Monotonicity, BFS vs DFS Traversal & Shortest Path, Floyd's Cycle Detection with Fast & Slow Pointers, Sliding Window Pattern, Top K Frequent Elements with Min-Heap, MergeSort vs TimSort vs QuickSort, Binary Search Tree In-Order Traversal, Trie (Prefix Tree) Lookup & Autocomplete, Stack vs Queue Optimal Use Cases, Adjacency List vs Matrix for Sparse Graphs, Dynamic Programming: Optimal Substructure & Overlapping Subproblems, Bit Manipulation: Powers of 2 with `n & (n - 1)`, Big-O Time & Call Stack Space Complexity Analysis)

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
