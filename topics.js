const AREAS = [
  {
    id: "scenarios",
    group: "Lab",
    title: "Scenarios",
    blurb: "Eight interviews. Practice hides the answer. Reveal one section at a time, then check the list.",
    topicIds: [
      "kafka-100k",
      "high-traffic-api",
      "order-payment",
      "rate-limiter",
      "notifications",
      "db-sharding",
      "reliable-calls",
      "auth-services",
    ],
  },
  {
    id: "concepts",
    group: "Lab",
    title: "What you need to know",
    blurb: "Short lists only. The reasoning lives in the scenario each line points at.",
    topicIds: [
      "concept-kafka",
      "concept-databases",
      "concept-caching",
      "concept-balancing",
      "concept-distributed",
      "concept-reliability",
      "concept-outbox",
      "concept-api",
      "concept-networking",
      "concept-security",
      "concept-observability",
    ],
  },
];

const TOPICS = {
  "kafka-100k": {
    kind: "scenario",
    title: "100k events per second",
    mustKnow: [
      "Partition by the id that must stay ordered, here `customerId`",
      "One consumer in the group owns a partition",
      "At-least-once into a database means an idempotent sink",
      "Commit the offset after the database transaction",
      "A poison record blocks that partition",
      "Lag per partition, not the average",
    ],
    niceToKnow: [
      "Idempotent producer sequence numbers",
      "Kafka transactions are exactly-once only back into Kafka",
      "`max.poll.interval.ms` and rebalance storms",
    ],
    prompt: "We need to process 100,000 events per second. Events belong to customers. Events for the same customer must be processed in order. Consumers may be down for 30 minutes. Duplicates are acceptable if the effect is safe. The database cannot take 100,000 writes per second. Design the system.",
    functional: [
      "Accept the event stream and keep it until it is processed",
      "Apply each customer's events in order",
      "Persist a result that is smaller than the raw stream",
    ],
    nonFunctional: [
      "100k events/sec sustained, not the average of a quiet day",
      "Order per customer, not global order",
      "Survive a 30 minute consumer outage without dropping the backlog",
      "Duplicates may be delivered; the effect must not double-apply",
      "The primary database is not the ingest path",
    ],
    questions: [
      "Is order global, or only per customer?",
      "How long must we keep events for replay?",
      "What latency is acceptable from produce to the result being visible?",
      "May we lose events, or only repeat them?",
      "Is the sink another topic, or a database and external APIs?",
      "Is one customer allowed to be a huge fraction of the traffic?",
    ],
    steps: [
      {
        title: "Simple",
        rows: [["Producers"], ["API"], ["Database"]],
        caption: "Say this out loud, then reject it. One insert per event at 100k/sec is the bottleneck they already gave you. Do not spend the interview tuning that insert.",
      },
      {
        title: "Put a log in front",
        rows: [["Producers"], ["Kafka topic"], ["Consumers"], ["Database"]],
        caption: "The API, or the producers, append and return. Consumers drain at a pace the database can take. A 30 minute outage is now disk on the log, not lost work.",
      },
      {
        title: "Order and parallelism",
        rows: [["Producers"], ["Topic, key = customerId"], ["Consumer A", "Consumer B", "Consumer C"], ["Partitioned store"]],
        caption: "The key is the design. Same customer, same partition, one consumer, in order. Different customers run in parallel. The table is partitioned the same way so each consumer writes a slice, in batches.",
      },
      {
        title: "Reliability on the sink",
        rows: [["Partition"], ["Apply + processed(event id)"], ["Commit offset"], ["Dead letter after N"]],
        caption: "The offset moves only after the transaction commits. A duplicate finds the event id and does nothing. A record that will never succeed leaves the partition so one bad payload cannot stall that customer forever.",
      },
    ],
    why: [
      { name: "Why Kafka?", text: "Several consumers may need the same history, and the backlog has to outlive a process. A queue that deletes on ack cannot replay 30 minutes. A log can." },
      { name: "Why customerId?", text: "Order was required per customer. A random key spreads load and destroys that order. Global order would be one partition, which cannot do 100k/sec of real work." },
      { name: "Why a consumer group?", text: "The group is how partitions are shared. You scale consumers up to the partition count. Past that they sit idle. Say the number of partitions before you say the number of instances." },
      { name: "Why not exactly-once?", text: "Producer idempotence dedupes retries into the broker. A transaction back into Kafka can be exact. A write to this database is not in that transaction. The honest contract is at-least-once plus `processed(event_id)`." },
      { name: "Why batch the writes?", text: "The database was the constraint. One round trip per event recreates it. A batch per partition, in one transaction with the event ids, is how the sink survives." },
    ],
    failures: [
      { name: "A consumer crashes", text: "It had not committed the offset, so the group reassigns the partition and the records are read again. The event id makes the second apply a no-op." },
      { name: "Consumers are down for 30 minutes", text: "Producers keep appending. Lag grows. Retention and disk must cover that backlog plus your normal replay window. When consumers return, they catch up. Lag still growing after they are back is a different incident." },
      { name: "The database slows down", text: "Do not add consumers past what the database can commit. More consumers make a saturated primary worse. Slow the sink, batch harder, or shed at the producer if lag crosses a line you set." },
      { name: "A broker dies", text: "The partition has a follower. With `acks=all` and a minimum number of in-sync replicas, the write waited for that copy. Producers retry the idempotent sequence. They do not invent a new event." },
      { name: "The same event is processed twice", text: "Expected. The unique `event_id` is inserted in the same transaction as the effect. A conflict means you already did it." },
      { name: "One customer sends millions of events", text: "That key is one partition. Adding partitions does not move it. Isolate that customer or split the key, and accept that the pieces are ordered only inside themselves." },
    ],
    tradeoffs: [
      {
        left: "Key by customerId",
        right: "Random partition",
        leftWhen: "You keep per-customer order and you accept a hot customer as a ceiling. This is the requirement they stated.",
        rightWhen: "Events are independent jobs. You get an even spread and no order. Use it for email or image work, not for this prompt.",
      },
      {
        left: "At-least-once plus idempotency",
        right: "Commit the offset first",
        leftWhen: "Losing an event is worse than doing it twice, and the sink can ignore a second delivery.",
        rightWhen: "You would rather skip than repeat, for metrics you can lose. That is at-most-once. Do not pick it for a balance.",
      },
    ],
    tips: [
      "Before naming Kafka I want the throughput, whether order is global or per customer, how long we retain, and whether a duplicate may change the result.",
      "I partition by customerId because order is per customer. Global order is one partition, and one partition is the ceiling.",
      "Delivery into the database is at-least-once. The consumer inserts the event id in the same transaction as the effect.",
      "I commit the offset after that transaction. A timeout from the database is not a reason to move the offset.",
      "I watch lag per partition. An average hides the one hot customer.",
    ],
    mistakes: [
      "Choosing Kafka before asking if order is global",
      "Promising exactly-once across the database",
      "Committing offsets on a timer",
      "Adding consumers to fix one hot partition",
      "Retrying a poison record until the partition is stuck",
      "Sizing retention for the average day and not for a 30 minute outage",
    ],
  },

  "high-traffic-api": {
    kind: "scenario",
    title: "High-traffic API, Redis, and database",
    mustKnow: [
      "The app tier is stateless so any instance can take the request",
      "Cache-aside: the database is the source of truth, Redis is the read path",
      "Delete the key on write; do not race two updates into the cache",
      "A Redis failure must not stampede the database",
      "The cache does not keep the write path alive",
    ],
    niceToKnow: [
      "Request coalescing or a lock per hot key on expiry",
      "Negative caching for ids that do not exist",
      "Local copies only for a key that is read constantly and can be a second stale",
    ],
    prompt: "The API receives about 100,000 reads per second. The database can do about 10,000. Design the read path. Then tell me what happens when Redis is down.",
    functional: [
      "Serve the read from the closest correct store",
      "Accept writes that the next read of that user can see",
      "Stay up when the cache is empty or unreachable",
    ],
    nonFunctional: [
      "About 100k reads/sec, so a 90% hit ratio is the difference between fine and down",
      "Writes stay on the primary; they are not 100k",
      "A user who just wrote should not read a replica or a stale key",
      "A cache miss storm is a database outage",
    ],
    questions: [
      "What fraction of reads are a single key, and what fraction are reports?",
      "How stale may a value be for someone who did not just write it?",
      "Are we allowed to shed traffic when both cache and database are in trouble?",
      "Is there one key everyone reads, a config or a celebrity?",
    ],
    steps: [
      {
        title: "One box",
        rows: [["Client"], ["API"], ["Database"]],
        caption: "This is honest and it is already over budget. 100k reads on a database that can do 10k. Name that before you draw Redis, so the cache is a response to a number.",
      },
      {
        title: "Scale the API",
        rows: [["Client"], ["Load balancer"], ["API", "API", "API"], ["Database"]],
        caption: "More instances help only if a request can land on any of them. Session data in memory breaks that. It does not help the database. You just multiplied the clients of the same primary.",
      },
      {
        title: "Cache the read",
        rows: [["Client"], ["Load balancer"], ["API"], ["Redis"], ["Primary"]],
        caption: "Cache-aside. Get by key. On a miss, load from the primary and set a TTL. On a write, commit the database, then delete the key. The next read fills it. Reports that scan do not go through this cache.",
      },
      {
        title: "Redis is down",
        rows: [["API"], ["Redis timeout"], ["Primary, with a cap"], ["429 or a stale page"]],
        caption: "The API catches a short timeout and reads the database. If that would be 100k again, you shed. You do not retry Redis in a loop. Cached work is gone; the product gets smaller on purpose.",
      },
    ],
    why: [
      { name: "Why Redis?", text: "The working set of hot keys fits in memory and the read is a key lookup. Redis is not a second database. If the only copy of a write lives there, you chose a different design and you should say so." },
      { name: "Why cache-aside?", text: "The application already knows the key, and the database remains the source of truth. Read-through hides the load and makes a failed loader your problem inside the cache." },
      { name: "Why delete, not update?", text: "Two writers can both read the old value and the slower one puts it back. A delete loses that race less often. The cost is one miss." },
      { name: "Why a TTL at all?", text: "The delete can fail. The TTL is the longest you will serve a wrong value when invalidation is missed. Pick it from the product, and jitter it so keys do not expire together." },
      { name: "Why shed instead of 'just read the database'?", text: "The database was sized for the miss rate, not for the full read rate. Falling back without a cap is how a cache incident becomes a database incident." },
    ],
    failures: [
      { name: "Redis times out", text: "One attempt, a few milliseconds, then the database, then a limit. Threads blocked on Redis are the outage. A circuit opens if the timeouts pile up, and you serve a degraded read or a 503." },
      { name: "A hot key expires", text: "Every request misses at once and runs the same query. One request rebuilds the key. The others wait briefly or serve the previous value. Jitter on the TTL stops them expiring in the same second." },
      { name: "The database is down", text: "Hits still succeed. Misses fail. Writes fail. Say that clearly. The cache does not accept orders." },
      { name: "A write deletes the key and the delete fails", text: "Readers see the old value until the TTL. Retry the delete. The TTL is your consistency bound when the retry also fails." },
      { name: "One key is most of the traffic", text: "It hashes to one Redis slot. Sharding the cluster does not spread it. Keep a one-second copy in the process, or split a counter into several keys." },
    ],
    tradeoffs: [
      {
        left: "Cache-aside with delete-on-write",
        right: "Write-through",
        leftWhen: "The cache is an optimization and you can tolerate a miss after a write. This is the default for a product read.",
        rightWhen: "The next request on any instance must see the write and you will pay the database latency on the write path. Do not use it to 'be safer' on a read-heavy API.",
      },
      {
        left: "Fail open to the database, with a cap",
        right: "Fail closed when Redis is down",
        leftWhen: "A public read can be smaller or slower and the database can take a slice of the traffic.",
        rightWhen: "A wrong or missing authorization decision is worse than an error. Do not serve a permission from a fallback you did not design.",
      },
    ],
    tips: [
      "The database can do 10k reads and the API sees 100k, so something else has to absorb the difference. That something is the cache, and the hit ratio is the number I will alert on.",
      "I delete the key after the commit. I do not update the cache in place.",
      "If Redis is down I will not send 100k queries at the primary. I cap the fallback.",
      "A user who just wrote reads the primary or skips the cache for that key. Everyone else can be a TTL behind.",
    ],
    mistakes: [
      "Adding API servers and calling it scaled",
      "Putting the only copy of a write in Redis",
      "No TTL and no delete, then debugging ghosts",
      "Retrying the cache until the threads are gone",
      "One global key for a value every request reads",
    ],
  },

  "order-payment": {
    kind: "scenario",
    title: "Order, payment, and inventory",
    mustKnow: [
      "No distributed transaction across your database and the card network",
      "The order row is the state machine",
      "The idempotency key is stored before the charge",
      "A timeout is unknown, not a decline",
      "Stock is a reservation with an expiry, not a lock held across HTTP",
      "Email and the warehouse leave through an outbox",
    ],
    niceToKnow: [
      "Authorize then capture, so a void is cheaper than a refund",
      "A reconciliation job for rows stuck in AUTH_PENDING",
      "Read-your-writes for the buyer, a replica for everyone else",
    ],
    prompt: "Design checkout. Create the order, charge the card, reserve the inventory, then hand it to shipping. A double click and a timeout must not charge twice. You cannot lock a row while the bank thinks.",
    functional: [
      "Create an order the customer can see",
      "Take payment once",
      "Reserve stock, and release it if payment does not finish",
      "Tell shipping only after the order is paid",
    ],
    nonFunctional: [
      "Correctness beats QPS; this is not a 100k write problem",
      "The provider is outside your transaction",
      "Retries happen: the browser, your worker, and the webhook",
      "The buyer reads their own result; other views may lag",
    ],
    questions: [
      "Do we authorize and capture separately, or capture immediately?",
      "How long may a stock hold live before it returns to the shelf?",
      "Is a scarce SKU in scope, a flash sale, or is contention rare?",
      "Who is the source of truth if our row and the provider disagree?",
    ],
    steps: [
      {
        title: "One transaction",
        rows: [["Checkout"], ["Order + payment + stock"]],
        caption: "Draw it, then cross it out. The card network is not in your database. Two-phase commit with a provider is the answer you refuse.",
      },
      {
        title: "A row that remembers the step",
        rows: [["CREATED"], ["RESERVED"], ["AUTHORIZED"], ["PAID"]],
        caption: "Each arrow is a local commit. The process can die. Another worker loads the row and continues. The row is the workflow.",
      },
      {
        title: "Charge with a key",
        rows: [["Store key, status AUTH_PENDING"], ["Provider, same key"], ["Look up on timeout"]],
        caption: "You write the key before the call. A retry, a double click, and a crash all send that key. The provider returns the original payment. A timeout means you look the key up. You do not mint a new one.",
      },
      {
        title: "After PAID",
        rows: [["PAID + outbox"], ["Warehouse"], ["Email"]],
        caption: "The outbox row commits with the status. Shipping does not sit inside the charge. If inventory cannot be kept, the compensation is a refund with its own key, or a void if you had only authorized.",
      },
    ],
    why: [
      { name: "Why a state machine?", text: "You need a place that survives the process. A chain of HTTP calls in memory cannot be resumed, and it holds nothing when you crash after the bank said yes." },
      { name: "Why the key first?", text: "Call, then insert, is a charge with no order when you die in between. The key and the status commit together. Then you call." },
      { name: "Why a reservation, not a lock?", text: "A row lock across the provider timeout fills the pool with waiters. Decrement available, commit, then call. The hold expires if you never reach PAID." },
      { name: "Why an outbox?", text: "Commit the order and then publish is how shipping never hears about a paid order. Publish and then commit is a shipment of an order that rolled back." },
      { name: "Why not a saga framework on day one?", text: "Four steps and one row is a worker plus the table. A engine earns its place when the path is long and many teams own steps. Say you would start with the row." },
    ],
    failures: [
      { name: "The provider times out", text: "Unknown. Query by the same key. No record: retry that key. Authorized: capture. Captured: mark paid. Do not tell the customer it failed." },
      { name: "The webhook arrives twice", text: "Dedup on the provider event id. The webhook is not the only signal. A job walks AUTH_PENDING because webhooks are late." },
      { name: "Inventory cannot reserve", text: "You have not captured, so you void the authorization if it exists, and you leave the order cancelled. You do not refund a charge that did not happen." },
      { name: "You captured and then cannot ship", text: "The compensation is a refund, a new call with its own key. It is not a rollback." },
      { name: "The buyer refreshes", text: "That read hits the primary, or waits until the replica has the commit. A call center in another region can be a second behind. Say which read is which." },
    ],
    tradeoffs: [
      {
        left: "Authorize, then capture",
        right: "Capture immediately",
        leftWhen: "You might still fail a later step. Voiding an authorization is cleaner than refunding.",
        rightWhen: "The product takes the money at click and a refund is an acceptable compensation. Fewer states, worse failure.",
      },
      {
        left: "Optimistic version on the SKU",
        right: "A queue in front of a hot SKU",
        leftWhen: "Two shoppers are not buying the last unit. A conflict is rare and the loser retries.",
        rightWhen: "A flash sale. Every writer conflicts. A version column becomes a retry storm. Serialize that one SKU.",
      },
    ],
    tips: [
      "I will not put the charge and the order update in one distributed transaction.",
      "The idempotency key is stored with the order before I call the provider, and I pass that same key through.",
      "A timeout is not a decline. I look the key up before I void or retry.",
      "I do not hold a stock lock across that HTTP call. The hold has an expiry.",
      "Shipping and email are an outbox written in the same commit as PAID.",
    ],
    mistakes: [
      "Two-phase commit with the payment provider",
      "A new idempotency key on every retry",
      "Treating a timeout as a failed charge",
      "Holding SELECT FOR UPDATE while the bank thinks",
      "Publishing the event after the commit, in a second step that can crash",
    ],
  },

  "rate-limiter": {
    kind: "scenario",
    title: "Distributed rate limiter",
    mustKnow: [
      "The check sits on the gateway, on one shared counter",
      "Token bucket if a burst is allowed",
      "Refill and take are one atomic operation",
      "429 and Retry-After, not 500",
      "Fail open or fail closed is a choice per route",
    ],
    niceToKnow: [
      "A local hint only for keys far under the limit",
      "Two regions over-admit if each has its own bucket",
      "The limiter is not the idempotency layer",
    ],
    prompt: "Design a rate limiter for a public API. Many app instances. A client may burst, then must settle. Login is stricter than a public read. Tell me what happens when the counter store is down.",
    functional: [
      "Allow or reject a request before it does expensive work",
      "Different routes get different budgets",
      "Tell the client when to try again",
    ],
    nonFunctional: [
      "The check is on the hot path, so it is one round trip",
      "Ten instances must not mean ten times the quota",
      "A limiter outage has an explicit policy",
      "A hard billing quota is stricter than abuse control",
    ],
    questions: [
      "Is the limit per user, per API key, per IP, or per route?",
      "Is a short burst acceptable?",
      "Is this abuse control or a contractual quota?",
      "One region or two, and may we over-admit?",
    ],
    steps: [
      {
        title: "In the process",
        rows: [["API instance", "API instance"], ["Local counter", "Local counter"]],
        caption: "Fast and wrong. Each instance allows the full budget. Say that, and move the counter out.",
      },
      {
        title: "One bucket at the edge",
        rows: [["Client"], ["Gateway"], ["Redis, one key"], ["Allow or 429"]],
        caption: "The gateway already sees every request. The key is user or API key, plus the route. Login has a small bucket. A public read has a large one.",
      },
      {
        title: "The atomic update",
        rows: [["EVALSHA"], ["Refill from elapsed time"], ["Take one token or reject"]],
        caption: "Two requests must not both read the last token and both pass. Redis runs the refill and the decrement as one script on one key. Return the wait until the next token.",
      },
      {
        title: "The store is down",
        rows: [["Gateway"], ["Redis timeout"], ["Fail open with a local cap", "Fail closed"]],
        caption: "A public read fails open behind a coarse local cap, so one client cannot melt you. Login and payments fail closed. You decide per route, in the interview, out loud.",
      },
    ],
    why: [
      { name: "Why a token bucket?", text: "It allows a burst and then a steady rate. A fixed window lets a client spend the whole budget at the end of one minute and again at the start of the next." },
      { name: "Why the gateway?", text: "Application code forgets the check. The edge cannot. Business rules like 'may this user refund this order' still belong in the service." },
      { name: "Why Lua?", text: "A get and a set are two round trips and a race. One script on one key is the atomic section. EVALSHA so you do not upload the script every time." },
      { name: "Why 429?", text: "The client must back off. A 500 invites an immediate retry, and the limiter becomes the outage." },
      { name: "Why this is not idempotency?", text: "A retry still spends a token, and it can still double-charge. The handler needs its own key. Do not blur the two." },
    ],
    failures: [
      { name: "Redis times out", text: "Do not retry inside the request. Apply the fail-open or fail-closed rule for that route. A few milliseconds is the budget." },
      { name: "Two regions, two buckets", text: "Each allows the full quota. Fine for abuse. Wrong for a contract. One region owns the key and the other pays the latency." },
      { name: "One key is global", text: "Every request hits one slot. Key by user and route. A single cluster-wide counter is a hotspot you built." },
      { name: "The client retries the 429 immediately", text: "Retry-After is the mitigation you already returned. If they ignore it, the bucket stays empty and they keep failing. That is the point." },
    ],
    tradeoffs: [
      {
        left: "Token bucket",
        right: "Sliding window of timestamps",
        leftWhen: "A burst is acceptable and you want one small hash per key.",
        rightWhen: "The boundary between two windows must not double the quota, and you can pay the memory of the timestamps.",
      },
      {
        left: "Shared Redis",
        right: "Local counter only",
        leftWhen: "The quota has to mean something across the fleet.",
        rightWhen: "You only need a coarse shield and you have already accepted that N instances allow about N times the cap.",
      },
    ],
    tips: [
      "I put the limiter at the gateway so every instance shares one bucket.",
      "The race is two requests reading the last token. The refill and the take are one script.",
      "I return 429 with Retry-After.",
      "If Redis is down, public reads fail open with a local cap. Login fails closed.",
      "A contractual quota cannot be counted independently in two regions.",
    ],
    mistakes: [
      "A counter in each JVM and calling it distributed",
      "Get then set without an atomic update",
      "Returning 500",
      "One global key",
      "Using the limiter as a substitute for an idempotency key",
    ],
  },

  notifications: {
    kind: "scenario",
    title: "Notification platform",
    mustKnow: [
      "The API accepts and returns 202; it does not call the provider",
      "Transactional mail and campaigns do not share a consumer",
      "Fan-out happens after the row is durable",
      "The outbox commits with the notification",
      "A provider timeout is maybe-sent",
    ],
    niceToKnow: [
      "Quiet hours apply to marketing, not to an OTP",
      "Templates render in the worker, per locale",
      "Webhooks update status; they are not the send path",
    ],
    prompt: "Design notifications for email, push, and SMS. A password reset must arrive in seconds. A campaign to millions must not delay it. Providers are slow and they retry on their own.",
    functional: [
      "Accept a request to notify a user or an audience",
      "Deliver on the channels that user allows",
      "Record whether it was sent",
    ],
    nonFunctional: [
      "OTP latency is a page; campaign latency is a chart",
      "At least once, so a second send must collapse",
      "One provider being down does not stop the other channels",
      "The HTTP call returns when the intent is stored",
    ],
    questions: [
      "Which messages are transactional, and which can wait?",
      "Do we expand a broadcast inside the request?",
      "May we send during quiet hours?",
      "Does the provider support an idempotency key?",
    ],
    steps: [
      {
        title: "Send inside the request",
        rows: [["API"], ["Email provider"]],
        caption: "The user's checkout now waits on a mail vendor. Reject it. Return 202 after a local commit.",
      },
      {
        title: "Durable intent",
        rows: [["API"], ["Notification row + outbox"], ["Relay"], ["Kafka, key = userId"]],
        caption: "One transaction writes the notification and the outbox. A relay publishes. If you commit and then publish, a crash drops the OTP.",
      },
      {
        title: "Split the work",
        rows: [["Transactional topic"], ["Marketing topic"], ["Email", "Push", "SMS"]],
        caption: "Separate topics, or separate consumer groups. An OTP consumer stays small and still wins, because it is not reading the campaign. Fan-out to channels happens in a worker, after preferences are read.",
      },
      {
        title: "The provider call",
        rows: [["Worker"], ["Mark sending, with notification id"], ["Provider"], ["Webhook or timeout = maybe sent"]],
        caption: "A broadcast is not expanded in the API. A worker writes per-user jobs. A timeout does not mean you send a second OTP. You reconcile with the provider.",
      },
    ],
    why: [
      { name: "Why 202?", text: "The provider is slower than the product request. The product needs the intent, not the SMTP conversation." },
      { name: "Why two topics?", text: "A shared queue is won by whichever has more messages. Campaigns are larger. The password reset waits behind them unless you isolate it." },
      { name: "Why fan-out after the write?", text: "A million-subscriber send is a job. Doing it in the request is the same mistake as pushing a celebrity tweet into every timeline on the POST." },
      { name: "Why an id before the call?", text: "The relay and the provider both deliver at least once. The notification id is how the second attempt becomes a no-op." },
      { name: "Why render in the worker?", text: "Locale and preferences change while a campaign sits. The producer sends a template id and variables, not a finished HTML blob." },
    ],
    failures: [
      { name: "The email provider returns 429", text: "Back off. More threads into a vendor that is rejecting you gets the account limited. Lag on that consumer is the signal." },
      { name: "The provider times out", text: "Maybe sent. Treat the id as used and reconcile. A second OTP is the bug." },
      { name: "Kafka is down", text: "The API can still accept. The outbox holds the row. Alert on the age of the oldest unpublished row, not only on consumer lag." },
      { name: "Push is down, email is fine", text: "That consumer pauses. The other channels keep going. Do not fail the whole notification because one adapter is sick." },
      { name: "A campaign and an OTP share a partition", text: "You will page on marketing lag and miss the OTP. Split them before you add instances." },
    ],
    tradeoffs: [
      {
        left: "Separate topics by priority",
        right: "One topic and a priority field",
        leftWhen: "You need an OTP to stay ahead even when a campaign is large. Isolation is the point.",
        rightWhen: "Volume is small and one consumer can sort fairly. It will not survive the first real campaign.",
      },
      {
        left: "Outbox then relay",
        right: "Publish inside the request",
        leftWhen: "A committed notification must not depend on the broker being up at that moment.",
        rightWhen: "You can lose the message, or you are willing to fail the user request when Kafka is down.",
      },
    ],
    tips: [
      "I return 202 after the notification and the outbox commit. I do not call the provider on that thread.",
      "Password reset and the campaign do not share a consumer. Lag on one is not lag on the other.",
      "I expand a broadcast in a worker. The request only stores the intent.",
      "A timeout from the provider is maybe-sent. I dedupe on the notification id.",
    ],
    mistakes: [
      "Sending mail inside the checkout request",
      "One queue for OTP and marketing",
      "Expanding a million recipients in the API",
      "Retrying a timeout with a new id",
      "Alerting on campaign lag the same way you alert on password-reset lag",
    ],
  },

  "db-sharding": {
    kind: "scenario",
    title: "Database writes that do not fit",
    mustKnow: [
      "A replica does not take writes",
      "Shard only when one primary is actually out of disk, CPU, or write rate",
      "The shard key comes from the access path",
      "A key that is 'today' puts all writes on one shard",
      "Two rows that must commit together belong on the same shard",
    ],
    niceToKnow: [
      "Partitioning inside one database for retention, before you shard across servers",
      "A directory of key ranges, because resharding is the operation you will fear",
      "Reports are scatter-gather or a warehouse, not the hot path",
    ],
    prompt: "The API takes 50,000 writes per second. One database can do about 5,000. Reads of a single user must stay on one place. Design how you scale the writes. Do not start by sharding if a simpler step still fits.",
    functional: [
      "Persist the write durably",
      "Read one user's recent rows without asking every server",
      "Run the rare report somewhere that is not the hot primary",
    ],
    nonFunctional: [
      "50k writes/sec is the constraint, not read QPS",
      "A user reads their own writes",
      "A single hot key is still one shard even after you split the cluster",
      "Cross-shard transactions are the cost you are trying not to pay",
    ],
    questions: [
      "Is the write an insert of an independent event, or an update of one hot row?",
      "What is the read: by user, by time, or ad hoc?",
      "Do two entities have to commit together?",
      "How do we reshard later, and who is in the maintenance window?",
    ],
    steps: [
      {
        title: "One primary",
        rows: [["API"], ["Primary"], ["Replica for reports"]],
        caption: "Replicas take reads. They do not take these writes. If the workload is read-heavy you stop here. They told you it is writes, so a replica is for the report, not the fix.",
      },
      {
        title: "Make the write cheaper",
        rows: [["API"], ["Batch or log"], ["Primary"]],
        caption: "50k single-row round trips is often the problem, not the disk. Batch, or put a log in front and let a consumer write in bulk. If one row is the hot spot, a shard does not help until you stop updating that row on the request."
      },
      {
        title: "Split by the read",
        rows: [["Router, key = userId"], ["Shard A", "Shard B", "Shard C"]],
        caption: "If every screen loads one user, shard by user. That user's writes and reads stay together. A query without the key is scatter-gather. Keep it off the hot path.",
      },
      {
        title: "What you refuse",
        rows: [["Time-based key"], ["One hot shard"], ["Idle shards"]],
        caption: "A key of 'today' or a country that is most of the traffic builds the hotspot. Also refuse a transaction across shards. If two rows must commit together, put them on the same shard or split the business action.",
      },
    ],
    why: [
      { name: "Why not replicas?", text: "Every write still lands on the primary. A replica scales reads and gives you a failover. Quoting it here is a sign you did not hear 50k writes." },
      { name: "Why userId?", text: "The read they care about is one user. The key is chosen from that path. A pretty hash that ignores the query makes every read a fan-out." },
      { name: "Why batch first?", text: "Sharding a chatty write path multiplies operational pain and may still lose if each event is its own commit. Cheaper writes can bring 50k down into what one primary can do. Measure before you split." },
      { name: "Why a directory of ranges?", text: "You will double the shard count later. `hash % N` moves almost every row when N changes. A range map, or consistent hashing, limits what moves. It is still a live data copy." },
    ],
    failures: [
      { name: "One shard gets hot", text: "The key is skewed, or one user is huge. Adding shards does not move that key. Split the key or isolate the tenant. The other shards being idle is the clue." },
      { name: "A shard primary dies", text: "Promote that shard's replica. Other shards stay up. Clients for that range must learn the new primary. That is the outage window, and it is per shard, which is the point of the split." },
      { name: "A report scans everything", text: "It fans out to every shard and takes their IO. Run it on replicas or a warehouse. Do not put it on the write path." },
      { name: "You need a cross-shard transaction", text: "You drew the boundary in the wrong place. Move the rows together, or make it a saga with compensations. Do not hold locks on two shards for one checkout." },
    ],
    tradeoffs: [
      {
        left: "Shard by userId",
        right: "Partition by time in one database",
        leftWhen: "Write rate or disk of one primary is actually exhausted, and reads are by user.",
        rightWhen: "The pain is deleting old rows, not write QPS. Dropping a month partition is cheaper than operating a cluster. Do this first if it fits.",
      },
      {
        left: "A log, then batched writes",
        right: "Synchronous insert per event",
        leftWhen: "The caller can accept a 202 and the result can lag.",
        rightWhen: "The request must reject a constraint now, in one transaction. Then you need a primary that can take the rate, or a queue in front of the one hot row, not a pretend shard.",
      },
    ],
    tips: [
      "Replicas do not scale these writes. I will not draw them as the answer to 50k inserts.",
      "I try a cheaper write, a batch or a log, before I operate shards.",
      "If I shard, the key is how we read. Here that is the user. A timestamp key is a single shard in disguise.",
      "Two rows that must commit together stay on one shard.",
      "A hot user is still one shard. I say that before they ask.",
    ],
    mistakes: [
      "Read replicas as a write strategy",
      "Sharding on day one without a measured primary limit",
      "A time or country key",
      "Cross-shard transactions for the common path",
      "Scatter-gather on every user request",
    ],
  },

  "reliable-calls": {
    kind: "scenario",
    title: "Reliable calls between services",
    mustKnow: [
      "A timeout is a budget, and it means unknown",
      "Retry only what is safe to repeat, with backoff and jitter",
      "Retries into an overload make it worse",
      "A breaker fails fast so you stop waiting",
      "A bulkhead stops one dependency taking every thread",
      "An outbox if the call is 'tell them this committed'",
    ],
    niceToKnow: [
      "A shared retry budget, not three tries times a thousand callers",
      "Hedged requests only for idempotent reads",
      "The difference between a sync call you need now and an event you do not",
    ],
    prompt: "Service A calls service B on the request path. B gets slow, then errors. Teams are retrying. The site is worse than B's outage. Design the call so A survives B being sick, and so a fact A has committed is not lost if B never sees it.",
    functional: [
      "Complete the user request when B is required, or degrade when B is optional",
      "Deliver a committed fact to B even if B was down at commit time",
      "Stop calling B when calling B is the outage",
    ],
    nonFunctional: [
      "The user's budget is the outer timeout",
      "A slow B must not fill A's pool",
      "No retry storm",
      "At-least-once between services, with a key on B",
    ],
    questions: [
      "Does the user need B's answer in this response?",
      "Is the call safe to repeat?",
      "What do we show if B is down: an error, or a smaller product?",
      "Is this a query, or a fact that already committed in A?",
    ],
    steps: [
      {
        title: "A naked call",
        rows: [["Service A"], ["Service B"]],
        caption: "No timeout, so a slow B holds A's threads until A is down too. This is the picture you replace.",
      },
      {
        title: "Bound it",
        rows: [["A, timeout shorter than the user"], ["One retry, backoff, jitter"], ["B"]],
        caption: "The timeout is shorter than the caller's budget, and shorter again at the next hop. Retry a blip only if the call is idempotent or carries a key. Jitter so a thousand callers do not return in the same millisecond.",
      },
      {
        title: "Stop helping",
        rows: [["A"], ["Breaker"], ["Bulkhead pool"], ["B or a fallback"]],
        caption: "After enough failures the breaker opens and A fails in microseconds instead of waiting for the timeout. The pool for B is separate, so a hung B does not take the threads that serve healthy routes.",
      },
      {
        title: "A fact that must arrive",
        rows: [["A commits row + outbox"], ["Relay"], ["B, idempotent"]],
        caption: "If A has already committed and B must find out, do not call B inside the transaction. The outbox sends later. B dedupes. A sync retry is the wrong tool for a message that can wait.",
      },
    ],
    why: [
      { name: "Why a timeout at all?", text: "Without one, B's latency becomes A's thread count. The user has already left and your pool is full of waiters." },
      { name: "Why backoff and jitter?", text: "Immediate retries arrive while B is still dead and multiply the load. Aligned retries from every instance recreate the spike. Jitter spreads them." },
      { name: "Why a breaker?", text: "Timeouts still occupy a thread for the whole wait. An open breaker is how you give B room to recover, and how you spend the user's budget on a fallback instead of on waiting." },
      { name: "Why a bulkhead?", text: "One shared pool means the sick dependency takes every request, including the ones that do not need it. A separate pool fails that feature and leaves the rest of A up." },
      { name: "Why an outbox here?", text: "A call you needed for the answer is sync, with a timeout. A fact you already committed is a message. Mixing them is how you hold a database lock across a slow HTTP call." },
    ],
    failures: [
      { name: "B is slow", text: "A hits its timeout and stops waiting. If the call might have succeeded, A does not assume it failed. For a charge, look it up. For an optional recommendation, skip it." },
      { name: "Everyone retries", text: "B was at the edge and the retries push it over. Cap attempts and use a budget for the whole process. Past the budget, fail the request." },
      { name: "The breaker flaps", text: "The threshold is too sensitive, or a single route is failing and you wrapped the whole host. Break per dependency, sometimes per endpoint." },
      { name: "A dies after the commit, before B hears", text: "The outbox still has the row. The relay sends when it can. B applies once because of the key." },
      { name: "There is no honest fallback", text: "Do not invent a cached success for a payment. Fail the request. A recommendation can disappear. A charge cannot." },
    ],
    tradeoffs: [
      {
        left: "Sync call with a breaker",
        right: "Event and an outbox",
        leftWhen: "The user cannot continue without the answer, and you have a timeout and a fallback or a clean error.",
        rightWhen: "The fact has already committed and the other service can catch up. The user should not wait.",
      },
      {
        left: "Retry with a budget",
        right: "No retry",
        leftWhen: "The failure is a blip, the call is safe to repeat, and B is not already overloaded.",
        rightWhen: "B is overloaded, or the call charges money and you have no key. A retry is then the incident.",
      },
    ],
    tips: [
      "I set the timeout from the caller's budget, not from hope. A timeout means I do not know if the work happened.",
      "I retry with backoff and jitter, and only when the call is idempotent. I stop when B is overloaded.",
      "Unlimited retries are how a downstream outage becomes a retry storm.",
      "If the fact is already committed, I use an outbox. I do not call B inside the database transaction.",
      "One dependency gets its own pool. When that pool is full, that feature fails and the process does not.",
    ],
    mistakes: [
      "No timeout",
      "Immediate retries on a 503",
      "Retrying a payment with a new key",
      "A breaker around the entire host because one route failed",
      "Calling another service while holding a row lock",
      "A cached success as a fallback for a charge",
    ],
  },

  "auth-services": {
    kind: "scenario",
    title: "Authentication for many services",
    mustKnow: [
      "The gateway authenticates; the service authorizes the row",
      "A JWT is signed and readable; keep the access token short",
      "A refresh token is a secret",
      "401 is 'who are you'; 403 is 'you may not'",
      "Service identity is not the user's identity",
    ],
    niceToKnow: [
      "mTLS or a mesh for service identity, still with the user token on the call",
      "A denylist only if you must revoke before expiry",
      "OIDC if you need who the user is, not only an access token",
    ],
    prompt: "We have about twenty services. Browsers and other services call them. Design authentication and authorization. Logging out should mean something. A stolen long-lived token should not be a permanent admin.",
    functional: [
      "Know who is calling",
      "Decide whether they may touch this resource",
      "Let a service call another without sharing a password",
    ],
    nonFunctional: [
      "Any instance can verify a token without a central session lookup, or you accept the lookup",
      "Revocation has a bound: expiry, or a denylist",
      "The gateway is not the only place that checks ownership of a row",
      "Secrets are not in the client",
    ],
    questions: [
      "Do we need instant logout, or is a short access token enough?",
      "Are callers browsers, services, or both?",
      "Who issues the token?",
      "Is 'this user owns this order' a role, or a check against the row?",
    ],
    steps: [
      {
        title: "Each service invents login",
        rows: [["Browser"], ["Service A login", "Service B login", "Service C login"]],
        caption: "Twenty password checks and twenty session stores. You will not revoke them together. Draw it so you can leave it.",
      },
      {
        title: "One issuer, many verifiers",
        rows: [["Client"], ["Issuer"], ["Access token, short"], ["Gateway verifies signature"]],
        caption: "The user logs in once. The gateway checks issuer, audience, expiry, and signature. It does not decide if this user may refund this order. That is the next box.",
      },
      {
        title: "The service checks the row",
        rows: [["Gateway"], ["Service"], ["Load the order"], ["Subject owns it, or 403"]],
        caption: "A valid token is not authorization. The service that owns the table loads the row and compares the subject. A role in the token is the job. Ownership is the query.",
      },
      {
        title: "Service to service",
        rows: [["Caller service"], ["Its own credential"], ["Callee"], ["User token, if it acts for a user"]],
        caption: "The network location is not an identity. The caller has a credential, a token or a certificate. If the action is on a user's behalf, the user token goes too. The service identity says who is calling. The user token says who they are calling for.",
      },
    ],
    why: [
      { name: "Why a short access token?", text: "A JWT is valid until exp even after logout or after you remove the person. Minutes, not days. The refresh token gets a new access token and is stored like a password." },
      { name: "Why not a session for everything?", text: "A session row gives you instant logout, and every service must read that store. That is a fine design for one website. Across twenty services it is a hotspot and a coupling. Use it if they demand instant revoke and you will operate the store." },
      { name: "Why the gateway does not authorize the order?", text: "It would have to understand every resource. Every rule change waits on the gateway. It checks the token. The order service checks the order." },
      { name: "Why not trust the VPC?", text: "Other teams and compromised workloads share it. A packet from inside is not a user and not a service." },
      { name: "Why 401 and 403 differ?", text: "Clients refresh a token on 401. They should stop on 403. Mixing them up makes a forbidden refund look like an expired login." },
    ],
    failures: [
      { name: "A token is stolen", text: "It works until exp. That is why exp is short. A refresh token theft is worse; you revoke that grant at the issuer. A denylist of access tokens is optional and is a Redis read on every call." },
      { name: "The issuer is down", text: "Existing access tokens still verify if you have the public keys cached. New logins fail. Do not bake a key into the deploy with no rotation. Fetch JWKS and tolerate a stale key set for the overlap." },
      { name: "A service trusts a token meant for another audience", text: "Check audience and issuer. A token for the mobile app is not a token for the admin API." },
      { name: "The gateway is the only check", text: "A internal caller that skips the gateway, or a bug in a route, never hits it. The service still checks the subject against the row." },
    ],
    tradeoffs: [
      {
        left: "Short-lived JWT",
        right: "Server session",
        leftWhen: "Many services must verify without sharing a session store, and you accept that logout waits for exp.",
        rightWhen: "One site, and logout or a fired employee must take effect on the next request. You pay a lookup.",
      },
      {
        left: "User token forwarded",
        right: "Service credential only",
        leftWhen: "The callee decides based on the user. Dropping the user token means the callee trusts the caller completely.",
        rightWhen: "The call is not on a user's behalf: a cron, a projection, a worker. Then a service identity is the right caller, and it should be a narrow one.",
      },
    ],
    tips: [
      "The gateway authenticates. The service that owns the row authorizes.",
      "I keep access tokens short because I cannot easily take a JWT back. The refresh token is the secret.",
      "A role is the job. 'Owns this order' is a query, not a role.",
      "Service-to-service needs its own identity. Being inside the network is not one.",
      "I validate issuer, audience, expiry, and signature. A token for another API is not this user.",
    ],
    mistakes: [
      "The gateway loads every order to decide permissions",
      "A long-lived JWT and no story for logout",
      "Putting secrets or a large permission matrix in the token",
      "Trusting the VPC as authentication",
      "Forwarding a user token and never checking it again in the callee",
      "Using 401 when you mean 403",
    ],
  },

  "concept-kafka": {
    kind: "concept",
    title: "Kafka and event-driven systems",
    mustKnow: [
      { text: "Topics, partitions, a consumer group, and the offset as one picture", scenario: "kafka-100k" },
      { text: "Key choice is the order and the hotspot", scenario: "kafka-100k" },
      { text: "At-least-once into a database, and the idempotent consumer", scenario: "kafka-100k" },
      { text: "Poison messages, a dead letter, and lag per partition", scenario: "kafka-100k" },
      { text: "An outbox when the event must match a commit", scenario: "notifications" },
    ],
    niceToKnow: [
      { text: "Idempotent producer and Kafka transactions, and where they stop", scenario: "kafka-100k" },
      { text: "Backpressure when consumers fall behind the database", scenario: "kafka-100k" },
    ],
  },

  "concept-databases": {
    kind: "concept",
    title: "Databases and scaling",
    mustKnow: [
      { text: "Replicas scale reads. They do not scale the writes in the prompt", scenario: "db-sharding" },
      { text: "Shard key from the access path, never from the clock", scenario: "db-sharding" },
      { text: "A local transaction around the order, not around the bank", scenario: "order-payment" },
      { text: "The write that must be visible to the same user goes to the primary", scenario: "high-traffic-api" },
    ],
    niceToKnow: [
      { text: "Batch or a log before you operate a cluster", scenario: "db-sharding" },
      { text: "Isolation does not by itself stop a lost update", scenario: "order-payment" },
    ],
  },

  "concept-caching": {
    kind: "concept",
    title: "Caching",
    mustKnow: [
      { text: "Cache-aside, delete on write, TTL as the backstop", scenario: "high-traffic-api" },
      { text: "What you do when Redis is down, including the cap", scenario: "high-traffic-api" },
      { text: "A hot key stays on one slot", scenario: "high-traffic-api" },
    ],
    niceToKnow: [
      { text: "Stampede when a hot key expires together", scenario: "high-traffic-api" },
      { text: "Write-through only when the next read must be fresh and you will wait", scenario: "high-traffic-api" },
    ],
  },

  "concept-balancing": {
    kind: "concept",
    title: "Load balancing and scale-out",
    mustKnow: [
      { text: "Stateless API instances behind a balancer, or you cannot add them", scenario: "high-traffic-api" },
      { text: "More instances do not fix a database or a single hot key", scenario: "high-traffic-api" },
      { text: "The gateway is where a shared limit belongs", scenario: "rate-limiter" },
    ],
    niceToKnow: [
      { text: "Health checks decide who receives traffic; a deep check can drain the whole fleet", scenario: "reliable-calls" },
      { text: "Sticky sessions are a smell when the alternative is a shared session", scenario: "auth-services" },
    ],
  },

  "concept-distributed": {
    kind: "concept",
    title: "Distributed systems",
    mustKnow: [
      { text: "One writer for a sequence: a partition, a shard, a payment key", scenario: "kafka-100k" },
      { text: "A timeout does not tell you the remote work failed", scenario: "reliable-calls" },
      { text: "At-least-once, at-most-once, and exactly-once need a boundary", scenario: "kafka-100k" },
      { text: "Two regions with two counters over-admit", scenario: "rate-limiter" },
    ],
    niceToKnow: [
      { text: "Quorum and a leader are how a broker or a primary survives one dead copy", scenario: "kafka-100k" },
      { text: "Read-your-writes versus a replica everyone else may use", scenario: "order-payment" },
    ],
  },

  "concept-reliability": {
    kind: "concept",
    title: "Reliability and failure",
    mustKnow: [
      { text: "Timeouts, backoff, jitter, and why a retry storm happens", scenario: "reliable-calls" },
      { text: "Breaker and bulkhead: fail one feature, not the process", scenario: "reliable-calls" },
      { text: "Shed or 429 when you cannot do the work", scenario: "rate-limiter" },
      { text: "Dead letters so one bad record does not block the rest", scenario: "kafka-100k" },
    ],
    niceToKnow: [
      { text: "A fallback that calls the database without a cap is the next outage", scenario: "high-traffic-api" },
      { text: "Degrade optional work; do not invent a successful payment", scenario: "reliable-calls" },
    ],
  },

  "concept-outbox": {
    kind: "concept",
    title: "Transactions, outbox, and saga",
    mustKnow: [
      { text: "Local transaction plus an outbox, not commit-then-publish", scenario: "order-payment" },
      { text: "A saga step compensates; it does not roll back someone else's commit", scenario: "order-payment" },
      { text: "Idempotency key stored before the side effect", scenario: "order-payment" },
      { text: "Same idea when the side effect is a notification", scenario: "notifications" },
    ],
    niceToKnow: [
      { text: "The relay can publish twice; the consumer still dedupes", scenario: "notifications" },
      { text: "Do not compensate a step whose outcome you have not looked up", scenario: "order-payment" },
    ],
  },

  "concept-api": {
    kind: "concept",
    title: "API design",
    mustKnow: [
      { text: "202 when the work continues after the response", scenario: "notifications" },
      { text: "429 and Retry-After when the client must slow down", scenario: "rate-limiter" },
      { text: "Idempotency-Key on a POST that must not happen twice", scenario: "order-payment" },
      { text: "401 versus 403", scenario: "auth-services" },
    ],
    niceToKnow: [
      { text: "A sync API when the user needs the answer; an event when they do not", scenario: "reliable-calls" },
      { text: "Pagination and versioning matter when you expose a list that moves", scenario: "high-traffic-api" },
    ],
  },

  "concept-networking": {
    kind: "concept",
    title: "Networking and HTTP",
    mustKnow: [
      { text: "The timeout budget shrinks as you go deeper", scenario: "reliable-calls" },
      { text: "A connection pool sized like a thread pool will exhaust the database", scenario: "db-sharding" },
      { text: "TLS ends at the gateway; identity is still a token", scenario: "auth-services" },
    ],
    niceToKnow: [
      { text: "Keep-alive so a short call does not pay a handshake every time", scenario: "high-traffic-api" },
      { text: "L7 when you route by path or header; L4 when you only balance connections", scenario: "rate-limiter" },
    ],
  },

  "concept-security": {
    kind: "concept",
    title: "Authentication and security",
    mustKnow: [
      { text: "Gateway verifies the token; the service checks the row", scenario: "auth-services" },
      { text: "Short access token, refresh token stored as a secret", scenario: "auth-services" },
      { text: "A service needs its own identity when it calls another", scenario: "auth-services" },
    ],
    niceToKnow: [
      { text: "Audience and issuer, or a token for another API is accepted by mistake", scenario: "auth-services" },
      { text: "Rate limit at the edge is not authorization", scenario: "rate-limiter" },
    ],
  },

  "concept-observability": {
    kind: "concept",
    title: "Observability",
    mustKnow: [
      { text: "Lag per partition, and the age of the oldest outbox row", scenario: "kafka-100k" },
      { text: "Cache hit ratio next to database QPS", scenario: "high-traffic-api" },
      { text: "Orders stuck in a pending payment state", scenario: "order-payment" },
      { text: "OTP lag is a page; campaign lag is not", scenario: "notifications" },
    ],
    niceToKnow: [
      { text: "Breaker open/close and fail-open events", scenario: "reliable-calls" },
      { text: "Latency from 100ms to 2s is one hop: pool, dependency, or a deploy", scenario: "reliable-calls" },
    ],
  },
};
