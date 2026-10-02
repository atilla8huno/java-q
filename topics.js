const AREAS = [
  {
    id: "scenarios",
    group: "Lab",
    title: "Scenarios",
    blurb: "Eight interviews from the videos. Practice hides the answer. Reveal one section at a time.",
    topicIds: [
      "system-design-overall",
      "spotify",
      "tinyurl",
      "twitter",
      "payment-system",
      "booking",
      "whatsapp",
      "chatgpt",
    ],
  },
  {
    id: "concepts",
    group: "Lab",
    title: "What you need to know",
    blurb: "Short lists only. The reasoning lives in the interview each line points at.",
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
  "system-design-overall": {
    "kind": "scenario",
    "title": "System design overall",
    "mustKnow": [
      "You are scored on more than the drawing",
      "Lock functional and non-functional requirements before any box",
      "Spend the hour in order: clarify, design, scale, wrap up",
      "Say what is out of scope. Spotify does not fit in 60 minutes.",
      "There is no single correct architecture"
    ],
    "niceToKnow": [
      "API and data can come before or after the high-level picture",
      "Check with the interviewer at the end of each phase",
      "The wrap-up is the list of what you would do with more time"
    ],
    "prompt": "Design a system. You have about 45 to 60 minutes. The prompt is vague on purpose.",
    "functional": [
      "Name the users and the few use cases you will actually design",
      "Name what you are leaving out"
    ],
    "nonFunctional": [
      "Daily or monthly active users, and the read to write ratio",
      "Latency the user will notice, and how much downtime is acceptable"
    ],
    "questions": [
      "Who are the users, and which use cases are in scope?",
      "What is explicitly out of scope for this hour?",
      "How many people use it, and is it read-heavy or write-heavy?",
      "What latency and availability are we designing for?",
      "Should I start from the API and data, or from the architecture?"
    ],
    "steps": [
      {
        "title": "The skeleton, after the requirements",
        "image": "diagrams/overall-skeleton.png",
        "alt": "Client, load balancer, stateless API, cache, database, and a queue of workers",
        "caption": "Five things the hour is scoring. **Communication:** you ask and you check assumptions, you do not invent the product and discover it was wrong. **Structure:** you have an outline and you stay on the step you named. **Judgment:** when you pick a database, a cache, or a queue, you say why. **Depth:** a memorized picture of Spotify or WhatsApp is not enough when they change one constraint. **The design:** the boxes still have to work. The clock is 5 to 10 minutes on requirements, about 15 to 20 on the API and the data or on the architecture (either order), then scale and failures, then a short wrap-up. *Do not draw this skeleton until the requirements are locked.*"
      }
    ],
    "why": [
      {
        "name": "Why clarify first?",
        "text": "A coding interview has inputs and outputs. This one does not. If you design the whole of Spotify you will not finish, and you will have skipped the question they meant."
      },
      {
        "name": "Why a stateless API?",
        "text": "The load balancer can only add copies if any instance can take the next request. Session data in memory breaks that."
      },
      {
        "name": "Why a cache and a database as different boxes?",
        "text": "The cache is allowed to be wrong for a TTL. The database is the source of truth. Mixing them is how you lose a write."
      },
      {
        "name": "Why a queue at all?",
        "text": "Some work can finish after the response. The queue is how a spike does not hit the database at full speed. If the user must see the result in this HTTP call, it does not go on the queue."
      }
    ],
    "failures": [
      {
        "name": "You assumed the scope",
        "text": "You built recommendations and they wanted playback. Ask, then write the out-of-scope list where they can see it."
      },
      {
        "name": "You jumped between phases",
        "text": "Requirements, then a box, then a new requirement, then a schema. Name the step you are on."
      },
      {
        "name": "The drawing has no failure",
        "text": "The last part of the hour is scale and what breaks: a dead instance, a slow dependency, a hot key. A diagram that only shows the happy path is unfinished."
      }
    ],
    "tradeoffs": [
      {
        "left": "Architecture first",
        "right": "API and data first",
        "leftWhen": "The product is a flow you can point at: play, post, book. You draw the path, then name the tables and the routes.",
        "rightWhen": "The hard part is the record: inventory, a payment, a conversation. You write the row and the route, then show which box owns them."
      },
      {
        "left": "Go deep on one path",
        "right": "Sketch every feature",
        "leftWhen": "The hour is short. One path with a failure story beats five boxes you cannot defend.",
        "rightWhen": "They ask you to show the edges of the product. You still mark which path you will go deep on."
      }
    ],
    "tips": [
      "I will spend the first few minutes on who uses this and what is out of scope.",
      "I am picking this database because of this access path, not because it is familiar.",
      "I will do the happy path, then one failure, then what I would add with more time.",
      "Tell me if you want the API before the picture. I can do either."
    ],
    "mistakes": [
      "Drawing boxes in the first minute",
      "Designing every feature of a company",
      "A component with no reason",
      "Never asking whether the assumption is right",
      "No wrap-up, so the things you knew but skipped are invisible"
    ]
  },
  "spotify": {
    "kind": "scenario",
    "title": "Design Spotify",
    "mustKnow": [
      "Audio bytes do not flow through the API",
      "SQL holds metadata. Object storage holds the file.",
      "A signed URL plus a CDN is the play path",
      "The load balancer uses round-robin or least connections, and health checks",
      "Play events for counts and royalties are off the play path"
    ],
    "niceToKnow": [
      "64, 128, and 320 kbps are different renditions of one track",
      "Hot tracks live at the edge. The long tail can miss to origin.",
      "The same framework scales from about 500k users toward 50M by adding copies, not by streaming through the app tier"
    ],
    "prompt": "Design a music streaming platform. Artists upload songs. People search, play, and keep playlists.",
    "functional": [
      "Artists upload a track",
      "Listeners search and play",
      "Listeners create playlists on a profile"
    ],
    "nonFunctional": [
      "Start around 500,000 users and 30 million songs. Be able to talk about 50 million users without a redesign.",
      "Playback starts quickly. Metadata reads dwarf uploads.",
      "A dead API instance does not stop playback that already has a URL"
    ],
    "questions": [
      "Are recommendations and radio in scope, or only upload, search, play, and playlists?",
      "Which bitrates do we store?",
      "Is the catalog global, or do licenses differ by country?",
      "Do play counts have to be exact, or is a short delay acceptable?",
      "How stale can search be after an upload?"
    ],
    "steps": [
      {
        "title": "Play",
        "image": "diagrams/spotify-play.png",
        "alt": "App to load balancer to API, SQL for metadata, CDN and object storage for audio, play-event log on the side",
        "caption": "The app talks to a **load balancer** in front of stateless API servers. Round-robin or least connections, plus health checks. The API checks the **JWT**, reads song, artist, and playlist rows from **SQL**, and returns a **signed URL**. The app then fetches the audio from the **CDN**, which fills from **object storage** on a miss. *The file never passes through the API.* A play-event log records the listen for counts and royalties. That write is async. It must not sit on the play request."
      },
      {
        "title": "Upload",
        "image": "diagrams/spotify-upload.png",
        "alt": "Artist upload through a load balancer and API into object storage, SQL, and a transcode queue",
        "caption": "The artist upload hits the same kind of front door. The original lands in **object storage**. The **SQL** row points at that key. A **transcode queue** builds the renditions, about 64 kbps for a mobile save, 128 as the default, 320 for a higher tier. An average 128 kbps track is a few megabytes, which is why the bytes go to object storage and not to a SQL blob. Workers write the new keys back and mark the track playable."
      }
    ],
    "why": [
      {
        "name": "Why SQL for metadata?",
        "text": "A playlist is a relation: user, tracks, order. You want constraints and a query. The audio file is not a row."
      },
      {
        "name": "Why a signed URL?",
        "text": "The CDN and the bucket should not be a public directory. The URL expires. The API is the authorization check, once."
      },
      {
        "name": "Why a CDN?",
        "text": "The same hit song is played everywhere. Edge caches absorb that. A cold track misses and pays the origin. Say that split."
      },
      {
        "name": "Why the play event is not in the play request?",
        "text": "Royalty and analytics can lag. Playback cannot wait on that pipeline. At-least-once into that log is enough if the consumer dedupes on a play id."
      }
    ],
    "failures": [
      {
        "name": "The API is down",
        "text": "The balancer stops using that instance. A client that already holds a signed URL can keep streaming until it expires."
      },
      {
        "name": "The CDN misses a popular track",
        "text": "Origin QPS spikes. The long tail is supposed to miss. A hot track should have been cached. Watch origin request rate next to hit ratio."
      },
      {
        "name": "Upload succeeds and the row is missing",
        "text": "You have an object nobody can find, or a row pointing at nothing. Write the object, then the row, and a sweeper deletes orphans. Do not claim they commit together."
      },
      {
        "name": "Search does not show a track you just uploaded",
        "text": "Search can lag the SQL row. Say the window. Do not serve search from the primary if the catalog is large."
      }
    ],
    "tradeoffs": [
      {
        "left": "CDN for audio",
        "right": "Stream from the API",
        "leftWhen": "The same bytes are requested by many people. The API stays small.",
        "rightWhen": "You want one place to enforce a per-second license check. You will not survive a hit song this way."
      },
      {
        "left": "A few fixed bitrates",
        "right": "On-the-fly transcode",
        "leftWhen": "You know the clients. You pay storage and a queue at upload time.",
        "rightWhen": "The format set changes constantly. You pay CPU on the play path, which is the wrong place."
      }
    ],
    "tips": [
      "I separate metadata from the audio file before I draw anything else.",
      "The play path is JWT, SQL, signed URL, CDN. The bytes do not enter the API.",
      "Play counts are a log. I will not add them to the request that starts the song.",
      "Least connections if request time varies. Round-robin if it does not. Health checks either way.",
      "At 50 million users I add API copies and CDN edges. I do not put the file in the database."
    ],
    "mistakes": [
      "Proxying the audio through the application servers",
      "Storing the file in SQL",
      "A load balancer with no health check",
      "Doing royalty accounting inside the play request",
      "One bitrate for every network"
    ]
  },
  "tinyurl": {
    "kind": "scenario",
    "title": "Design TinyURL",
    "mustKnow": [
      "Seven base62 characters cover on the order of 315 billion codes",
      "About 1 KB per row, so the table is hundreds of terabytes over a decade",
      "Redirect with 302 if you still want to count the click",
      "Cache hot codes. Do not cache the whole table.",
      "A counter, a hash, or a pre-generated key all need a collision story"
    ],
    "niceToKnow": [
      "301 is cacheable by clients and you go blind",
      "Custom aliases are a separate unique index",
      "Expiry is a column and a delete, not a second system"
    ],
    "prompt": "Design a URL shortener. People create a short link. Other people open it and land on the long URL.",
    "functional": [
      "Create a short code for a long URL",
      "Redirect a visitor to that long URL",
      "Optionally let the owner see click counts"
    ],
    "nonFunctional": [
      "Reads dwarf creates",
      "Plan for about a thousand creates a second for years, not for a demo",
      "A redirect should be a cache hit for anything popular"
    ],
    "questions": [
      "Do we need custom aliases, expiry, or analytics?",
      "Is one long URL allowed to have many short codes?",
      "How long must a link keep working?",
      "Can the redirect be slightly stale?"
    ],
    "steps": [
      {
        "title": "Create and redirect",
        "image": "diagrams/tinyurl.png",
        "alt": "Create path into a database, redirect path through a cache then the database, responding 302",
        "caption": "A year is about 31.5 million seconds. Ten years is about 315 million. At 1,000 new URLs a second that is about **315 billion** codes. Base62 to the 6th power is about 56 billion, short of that. **Seven characters** is about 3.5 trillion, which covers it. Store the 7-character code, the long URL (say up to 100 bytes), and some owner metadata. Round the row to about **1 KB** and the decade is on the order of **315 TB**. Create goes through the load balancer to the shortener, which inserts the row. Redirect is the same front door, then a **cache of hot codes**, then the database on a miss. Respond **302**. *A 301 lets browsers and intermediaries cache the redirect and your click count goes to zero.*"
      }
    ],
    "why": [
      {
        "name": "Why estimate before the boxes?",
        "text": "The length of the code and the size of the table are the design. Seven characters is not a style choice."
      },
      {
        "name": "Why 302?",
        "text": "You still see the click, so analytics and abuse checks stay on your side. 301 is a promise that the mapping never changes."
      },
      {
        "name": "Why a cache at all?",
        "text": "A few links take most of the reads. The 315 TB table is not what you want on the redirect path. Cache the hot code to long URL. Let the tail hit the database."
      },
      {
        "name": "Why not a random string with no check?",
        "text": "At this volume you will collide. A database unique key plus a retry, or a counter range handed to each server, is the story. A hash of the long URL dedupes the same URL and still collides."
      }
    ],
    "failures": [
      {
        "name": "Two servers mint the same code",
        "text": "The unique index rejects one insert. That server tries the next id. Do not return the code before the insert commits."
      },
      {
        "name": "The cache is stale after an update",
        "text": "Links are usually immutable. If you allow edit or delete, delete the cache key in that request. The TTL is the backstop."
      },
      {
        "name": "A popular link expires in the cache at once",
        "text": "Every miss hits the database together. Jitter the TTL, or let one request refill while others wait."
      },
      {
        "name": "The database is down",
        "text": "Cached redirects still work. Creates fail. Say that out loud."
      }
    ],
    "tradeoffs": [
      {
        "left": "Counter per server range",
        "right": "Hash of the long URL",
        "leftWhen": "You want short, dense codes and you can coordinate ranges so servers do not overlap.",
        "rightWhen": "The same long URL should reuse one code. You still handle collisions, and the code is not guess-resistant unless you add a secret."
      },
      {
        "left": "302",
        "right": "301",
        "leftWhen": "You count clicks or you might change the target.",
        "rightWhen": "The mapping is permanent and you want clients to skip you. You give up analytics."
      }
    ],
    "tips": [
      "I size the code from the 10-year create rate before I talk about Redis.",
      "Redirect is 302 so I can still count. 301 is for a link that will never change and does not need a count.",
      "I cache hot codes only. The table is hundreds of terabytes.",
      "The unique index is what makes a collision safe. I do not return a code I have not inserted."
    ],
    "mistakes": [
      "Picking 6 characters because it looks short",
      "301 and then wondering why analytics are empty",
      "Putting every URL in the cache",
      "Generating the code in memory and inserting later",
      "No story for two app servers allocating the same id"
    ]
  },
  "twitter": {
    "kind": "scenario",
    "title": "Design Twitter",
    "mustKnow": [
      "Write path and read path are different APIs",
      "Fanout on write for a normal account",
      "Fanout on read for a celebrity",
      "Media goes to object storage, not the tweet row",
      "The home timeline cache is the read path"
    ],
    "niceToKnow": [
      "A peak is a queue and a cache, not a bigger loop on the request",
      "The tweet table is the source of truth. The cache can be rebuilt.",
      "Search and notifications are consumers of the write, not part of the post"
    ],
    "prompt": "Design a service where people post short messages, follow each other, and read a home timeline.",
    "functional": [
      "Post a tweet, with optional media",
      "Follow and unfollow",
      "Read a home timeline of people you follow"
    ],
    "nonFunctional": [
      "Reads of the home timeline dwarf posts",
      "A celebrity post must not fan out to hundreds of millions of caches inside the request",
      "The timeline can be a moment stale. A post you just made should show for you."
    ],
    "questions": [
      "Is the home timeline in scope, or also search, trends, and ads?",
      "How uneven is followership? Do we have celebrities?",
      "Can a tweet be edited, or is it immutable?",
      "What media sizes are we storing?"
    ],
    "steps": [
      {
        "title": "Write",
        "image": "diagrams/twitter-write.png",
        "alt": "Write API stores the tweet, puts media in object storage, and fans out to timeline caches except for celebrities",
        "caption": "The **write API** inserts the tweet and stores media in **object storage**. For a normal account it publishes a **fanout**: prepend this tweet id onto each follower's **home timeline cache**. *A celebrity does not fan out.* That request would try to write hundreds of millions of cache keys. The tweet row is enough. Readers will merge it."
      },
      {
        "title": "Read",
        "image": "diagrams/twitter-read.png",
        "alt": "Read API hits the timeline cache, and on a celebrity merges from the tweets table",
        "caption": "The **read API** is a separate service so a post storm does not steal the threads that serve timelines. A normal home timeline is a cache hit. When someone you follow is a celebrity, the read merges their recent tweets from the **tweets table** into the cached list. Your own just-posted tweet is written into your cache, or read from the primary, so you do not wait for a replica."
      }
    ],
    "why": [
      {
        "name": "Why split read and write?",
        "text": "They fail differently and they scale differently. A write spike should not take down the timeline, and a cache stampede should not block posts."
      },
      {
        "name": "Why fanout on write at all?",
        "text": "The home timeline is read far more than it is written. Doing the merge at write time makes the read a single cache get. That trade is worth it until the follower count gets absurd."
      },
      {
        "name": "Why not fanout a celebrity?",
        "text": "One post becomes one write per follower. That is not a request. It is a batch job you will not finish before the next post. Fanout on read for that user only."
      },
      {
        "name": "Why object storage for media?",
        "text": "The tweet row is ids and text. A video in the row makes every timeline query heavy and the database the wrong tool."
      }
    ],
    "failures": [
      {
        "name": "Fanout falls behind",
        "text": "The tweet exists. Some followers see it late. The queue depth is the metric. You do not block the post on the last follower."
      },
      {
        "name": "The timeline cache is cold",
        "text": "Rebuild from the tweets of people you follow, which is the celebrity path applied to everyone. Cap it. A full rebuild for a user who follows 5,000 accounts is a slow query you should have precomputed."
      },
      {
        "name": "A hot tweet key",
        "text": "The tweet row is one key. Reads of that URL go to a cache. The timeline cache spreads the home view. The single tweet page does not."
      },
      {
        "name": "The database fills with writes",
        "text": "More app servers make it worse. Shard tweets by user id so one person's posts stay together. A time-based shard key puts today on one server."
      }
    ],
    "tradeoffs": [
      {
        "left": "Fanout on write",
        "right": "Fanout on read",
        "leftWhen": "Follower counts are modest and the timeline is read constantly. The write does the work once.",
        "rightWhen": "A user has so many followers that the fanout is the outage. The read merges, and it is more expensive."
      },
      {
        "left": "Cache the timeline",
        "right": "Query the database every time",
        "leftWhen": "The home request is the product. You accept rebuilds and a short staleness.",
        "rightWhen": "You are small enough that the query is cheap. You will not stay there."
      }
    ],
    "tips": [
      "I split read and write before I talk about Redis.",
      "Normal users fan out on write. A celebrity fans out on read. I need both.",
      "Media is object storage. The tweet row stores the key.",
      "The cache can be dropped. The tweet table cannot.",
      "Peak load is queue depth and cache hit ratio, not another for-loop in the post handler."
    ],
    "mistakes": [
      "Fanout to every follower inside the post request, including celebrities",
      "One API pool for reads and writes",
      "Storing the video in the tweet row",
      "Sharding by created_at",
      "No path to rebuild a timeline when the cache is empty"
    ]
  },
  "payment-system": {
    "kind": "scenario",
    "title": "Design a payment system",
    "mustKnow": [
      "The provider moves the money. You store the intent and the key.",
      "Authorize, then capture",
      "The webhook is the source of truth for the final status",
      "A timeout is unknown. Look up the key. Do not charge again.",
      "The ledger is append-only. A refund is a new row."
    ],
    "niceToKnow": [
      "Index payment-intent id, customer id, and merchant id",
      "Amounts are integers in minor units, plus a currency",
      "Do not put the provider inside your database transaction"
    ],
    "prompt": "Design the payment flow for a checkout. Cards are handled by a provider such as Stripe. You must not charge twice, and you must be able to refund.",
    "functional": [
      "Take a payment once",
      "Learn the final status even if our call times out",
      "Refund without rewriting history"
    ],
    "nonFunctional": [
      "Correctness beats QPS",
      "A retried checkout is the same payment",
      "The provider is outside our transaction"
    ],
    "questions": [
      "Do we authorize and capture separately?",
      "Who is the source of truth if our row and the provider disagree?",
      "Do we hold inventory across the payment, or is this payment alone?",
      "Which currencies, and is the amount minor units?"
    ],
    "steps": [
      {
        "title": "Intent, provider, webhook, ledger",
        "image": "diagrams/payment.png",
        "alt": "Checkout stores an idempotency key, calls the provider with that key, and a webhook updates an append-only ledger",
        "caption": "Write the **payment row and the idempotency key** before the call. The row stores amount as an integer, currency, status, customer, merchant, and the provider's **payment-intent id**. Call the provider with that same key: **authorize**, then **capture** if you still might void. The provider's **webhook** is what moves the status to the final value. Your call's HTTP response can be lost. *A timeout is not a decline.* Look the key up. A second charge with a new key is the bug. The **ledger** only inserts. A refund is a new entry. Indexes you will actually use: intent id, customer id, merchant id."
      }
    ],
    "why": [
      {
        "name": "Why store the key first?",
        "text": "The retry arrives because the response was lost. If the key is written after the charge, both attempts pass the check and you charge twice."
      },
      {
        "name": "Why a webhook?",
        "text": "The provider may finish after your timeout. The webhook is the fact. Your row catches up. Do not treat the synchronous response as the only truth."
      },
      {
        "name": "Why authorize then capture?",
        "text": "A later step can still fail. Voiding an authorization is cleaner than refunding a capture. Capture immediately only if the product accepts a refund as the compensation."
      },
      {
        "name": "Why an append-only ledger?",
        "text": "You will be wrong once. An update hides it. A new row shows the charge and the refund. Reconciliation is a sum, not a guess."
      }
    ],
    "failures": [
      {
        "name": "Timeout after the provider charged",
        "text": "Look up by the idempotency key and the intent id. Do not mint a new key. Do not show the user a failure if the lookup says paid."
      },
      {
        "name": "Webhook arrives before your row commits",
        "text": "The handler must tolerate a missing row and retry. The provider will deliver the webhook more than once. The status update is idempotent."
      },
      {
        "name": "You held a database lock during the provider call",
        "text": "The pool fills with waiters. The lock is only around your own rows, before and after the call, never across it."
      },
      {
        "name": "Provider and ledger disagree",
        "text": "A job compares intent status to the ledger. The provider wins on what the money did. Your ledger records the correction as a new line."
      }
    ],
    "tradeoffs": [
      {
        "left": "Authorize, then capture",
        "right": "Capture immediately",
        "leftWhen": "A later step, such as inventory, can still fail. A void is cheaper than a refund.",
        "rightWhen": "The product takes the money at click and a refund is acceptable. Fewer states."
      },
      {
        "left": "Webhook as source of truth",
        "right": "Trust the synchronous response",
        "leftWhen": "The call can time out after the money moved. You need a second channel.",
        "rightWhen": "You are in a demo. You will double-charge the first time the network blips."
      }
    ],
    "tips": [
      "I store the idempotency key in the same transaction as the payment row, before I call the provider.",
      "A timeout means I look the key up. I do not start a second charge.",
      "The webhook closes the status. My HTTP client does not.",
      "I do not wrap the provider in a database transaction.",
      "A refund inserts a ledger row. I do not edit the charge."
    ],
    "mistakes": [
      "A new idempotency key on every retry",
      "Treating a timeout as a failed charge",
      "Two-phase commit with the card network",
      "Updating the ledger in place",
      "Holding a row lock while the provider thinks"
    ]
  },
  "booking": {
    "kind": "scenario",
    "title": "Design Booking.com",
    "mustKnow": [
      "Almost all traffic is browsing. Booking writes are a thin slice.",
      "Inventory is one row per hotel, room type, and date",
      "The book check is reserved + n <= inventory, inside a transaction",
      "Overbooking is a factor on that inequality, not a hope",
      "Search is an index. It is not the source of truth for a free room."
    ],
    "niceToKnow": [
      "Prefill inventory for the next couple of years. A daily job extends the horizon.",
      "A hold expires if payment does not finish",
      "10% of browsers search. A tenth of those book. Size the two paths separately."
    ],
    "prompt": "Design a hotel booking site. Guests search by city and dates and book a room. Two guests must not take the last room unless we have chosen to overbook.",
    "functional": [
      "Search hotels and room types for a date range",
      "Book a number of rooms if inventory allows",
      "Release a hold that is never paid"
    ],
    "nonFunctional": [
      "Search results in a few hundred milliseconds. A booking can take a couple of seconds.",
      "Availability for the book call is consistent. Search can be slightly stale.",
      "The write rate is far below the search rate"
    ],
    "questions": [
      "Do we overbook, and by how much?",
      "Is payment in this design, or does booking stop at a confirmed hold?",
      "Are we one hotel chain or many properties?",
      "How far ahead can someone book?"
    ],
    "steps": [
      {
        "title": "Search path and book path",
        "image": "diagrams/booking.png",
        "alt": "Search API reads an index. Booking API updates SQL inventory in a transaction.",
        "caption": "Think of a funnel. Everyone can view. About **10%** go on to search. About **10%** of those reserve. Search QPS and booking writes are different problems. Inventory is a row per **hotel, room type, and date**, with `total_inventory` and `total_reserved`, filled ahead for a couple of years and extended by a daily job. For 23 to 27 December you select those rows and allow the book when `total_reserved + rooms <= total_inventory`. A 10% overbook is the same check against `inventory * 1.1`. That range query and that update are why this stays on **SQL**. *The search index is allowed to be a moment behind. The book path is not. It reads the inventory rows inside the transaction.*"
      }
    ],
    "why": [
      {
        "name": "Why a row per date?",
        "text": "A stay is a range. You need every night in the range to have room. A single 'available' flag cannot answer 23 to 27 December."
      },
      {
        "name": "Why SQL?",
        "text": "The check and the increment commit together, and the query is a date range plus two ids. A document per hotel makes the conflict your problem."
      },
      {
        "name": "Why not book against the search index?",
        "text": "The index is built to be fast and a bit stale. Two guests will both see the last room. The inventory table is the decision."
      },
      {
        "name": "Why a hold?",
        "text": "Payment takes seconds and can fail. `total_reserved` includes a hold with an expiry. If you wait for the card with a lock, you block every other booker of that room type."
      }
    ],
    "failures": [
      {
        "name": "Two guests book the last room",
        "text": "Both pass a check outside the transaction. The update must be conditional: increment only if the inequality still holds. One gets zero rows and a sold-out answer."
      },
      {
        "name": "Payment fails after the hold",
        "text": "The hold expires and `total_reserved` comes back down. You do not leave the room stuck."
      },
      {
        "name": "Search shows a room the table does not have",
        "text": "Expected, inside the lag you named. The book call re-checks. Do not confirm from the index."
      },
      {
        "name": "A popular hotel's inventory row is hot",
        "text": "That room type on that date is one row. A queue or a short lock serializes it. A cache of the count will oversell."
      }
    ],
    "tradeoffs": [
      {
        "left": "Row per room type per date",
        "right": "One row per physical room per date",
        "leftWhen": "Guests book a type, not room 414. The table stays smaller and the check is one inequality.",
        "rightWhen": "You assign a specific room at book time. You store more rows and you lock more of them."
      },
      {
        "left": "Allow overbooking",
        "right": "Never overbook",
        "leftWhen": "Some guests cancel. The factor is explicit, like 10%, and the hotel can walk a guest if you are wrong.",
        "rightWhen": "Walking a guest is unacceptable. The inequality uses the real inventory and you will refuse a few books that would have been fine."
      }
    ],
    "tips": [
      "I size search and booking separately. Most people never book.",
      "The source of truth is the inventory row, not the search result they clicked.",
      "The book is one conditional update for every date in the stay.",
      "Overbooking is a number in that update, or it is zero. It is not a surprise.",
      "The hold expires. I do not hold a lock across payment."
    ],
    "mistakes": [
      "Confirming the last room from the search index",
      "A lock across the payment call",
      "One capacity number for the whole hotel, ignoring dates",
      "Treating search QPS as if it were booking writes",
      "Updating inventory without a conditional check"
    ]
  },
  "whatsapp": {
    "kind": "scenario",
    "title": "Design WhatsApp",
    "mustKnow": [
      "A connection is a WebSocket on one chat server",
      "A directory maps the user to that server",
      "Offline users get store-and-forward, not a dropped message",
      "Media goes to object storage",
      "A group is one stored message and many deliveries"
    ],
    "niceToKnow": [
      "Receipts can lag the send",
      "Shard by user so a person's devices land together",
      "End-to-end encryption is a constraint on what the server is allowed to read, not a box you skip"
    ],
    "prompt": "Design a messaging app. One person sends a message to another, or to a group. Recipients can be offline.",
    "functional": [
      "Send a message to a person or a group",
      "Deliver it when they are online, or store it until they are",
      "Send a photo or a voice note",
      "Show a receipt that can arrive later"
    ],
    "nonFunctional": [
      "Delivery is at-least-once. The client dedupes on message id.",
      "A chat server dying drops sockets, not the stored messages",
      "The message store is not the path for the media bytes"
    ],
    "questions": [
      "One-to-one only, or groups?",
      "Do we store history on the server or only until delivery?",
      "Are read receipts required in the first design?",
      "How large can a group be?"
    ],
    "steps": [
      {
        "title": "Online, offline, and media",
        "image": "diagrams/whatsapp.png",
        "alt": "Phone to gateway, session directory to a chat server shard, message store for offline users, object storage for media",
        "caption": "The phone holds a **WebSocket** to a **gateway**, which asks a **session directory** which **chat server** owns that user. Online delivery is a push on that socket. If there is no socket, the message sits in the **store** and is forwarded on the next connect. *Shard by user id so one person's sessions are not a lookup across every server.* Photos and voice notes go to **object storage**. The message carries the key. A **group** stores the message once and fans out deliveries. Receipts are another small message. They can lag."
      }
    ],
    "why": [
      {
        "name": "Why a directory?",
        "text": "The socket is state. It lives on one machine. The next message has to find that machine. A user id in a table or a cache is the directory. Without it every server is a broadcast."
      },
      {
        "name": "Why store-and-forward?",
        "text": "Phones sleep. The send already succeeded for the sender. You keep the message until the recipient acks, then you can drop it if you are not a history product."
      },
      {
        "name": "Why not put the photo in the message store?",
        "text": "The store is small, ordered, per user. A video makes it the wrong database and couples delivery to bandwidth."
      },
      {
        "name": "Why at-least-once?",
        "text": "A crash between send and ack delivers twice. The message id makes the second one a no-op on the client and in the store."
      }
    ],
    "failures": [
      {
        "name": "The chat server dies",
        "text": "Sockets drop. Clients reconnect, the directory moves them, and the store still has anything unacked. Messages are not only in RAM."
      },
      {
        "name": "A hot group",
        "text": "Fanout of a huge group is a queue, not a loop in the send request. Members can see it a moment apart."
      },
      {
        "name": "The directory is stale",
        "text": "You push to a server that no longer has the socket. That server says so, you refresh the directory, you try once more, or you fall back to the store."
      },
      {
        "name": "Media upload succeeds and the message does not",
        "text": "The object can be orphaned. The message is the source of truth for 'this was sent'. A sweeper deletes unreferenced objects."
      }
    ],
    "tradeoffs": [
      {
        "left": "Store until ack",
        "right": "Keep full history",
        "leftWhen": "The phone is the archive. You delete from the server after delivery. Less data, no multi-device history unless the clients sync.",
        "rightWhen": "A new phone should download the chat. You keep the log, and you now have a retention and an encryption story for data at rest."
      },
      {
        "left": "WebSocket",
        "right": "Polling",
        "leftWhen": "You want the message now, and you will run a fleet that holds a socket per online user.",
        "rightWhen": "You cannot hold connections. Delivery waits for the next poll. Fine for a prototype, wrong for this product."
      }
    ],
    "tips": [
      "I find the server that holds the socket before I talk about the database.",
      "Offline is a store, not an error.",
      "Media is object storage. The message is the pointer.",
      "A group fanout is a queue once the group is large.",
      "I dedupe on message id because I will send twice."
    ],
    "mistakes": [
      "Broadcasting every message to every chat server",
      "Keeping the only copy of a message in the socket process",
      "Putting the video in the message row",
      "Fanout of a large group inside the send request",
      "Exactly-once with no id"
    ]
  },
  "chatgpt": {
    "kind": "scenario",
    "title": "Design ChatGPT",
    "mustKnow": [
      "Stream tokens with server-sent events, not a WebSocket",
      "Conversation metadata stays on one primary database",
      "The GPU fleet is not that database",
      "Rate-limit tokens, not only requests",
      "Time to first token is the latency that matters"
    ],
    "niceToKnow": [
      "Summarize old turns so the context window stays bounded",
      "Cancel generation when the client disconnects",
      "Cost is GPU first, then bandwidth, then the database"
    ],
    "prompt": "Design a chat product where a person sends a message and tokens stream back. History is kept. Hundreds of millions of people may use it. Do not assume we shard the chat database on day one.",
    "functional": [
      "Start a conversation and send a message",
      "Stream the reply as it is generated",
      "Reload history later"
    ],
    "nonFunctional": [
      "Time to first token is short. The full answer can take longer.",
      "A disconnected client stops spending GPU",
      "History is durable. A token in flight can be lost if you have not stored it yet."
    ],
    "questions": [
      "Are tools, images, and memory in scope, or text chat only?",
      "Do we host the model or call a provider?",
      "What is the context limit, and may we summarize?",
      "Are there free and paid tiers with different budgets?"
    ],
    "steps": [
      {
        "title": "Stream, store, generate",
        "image": "diagrams/chatgpt.png",
        "alt": "Browser uses SSE through a gateway and chat service, with PostgreSQL for history and a GPU fleet for tokens",
        "caption": "The browser opens **server-sent events**. The server pushes tokens. The client sends the next turn with an ordinary request. A WebSocket is bidirectional and you do not need that. The **gateway** authenticates and enforces a **token budget**, because one request can be cheap or enormous. The **chat service** loads history from **PostgreSQL**, builds the prompt, and calls an **inference gateway** in front of the **GPU fleet**. Tokens stream back on the same response. *Shard the chat database only when one primary is actually full.* Cross-row transactions and 'show me this conversation' are easier on one primary. The model tier is the thing that is expensive and separately scaled. When the context window fills, **summarize** older turns and keep the recent ones. If the client leaves, **cancel** the generation."
      }
    ],
    "why": [
      {
        "name": "Why SSE?",
        "text": "The reply is a one-way stream. SSE is HTTP. Proxies and auth you already have keep working. A WebSocket is for when the client is also pushing on that socket the whole time."
      },
      {
        "name": "Why one primary?",
        "text": "A conversation is a small ordered log for one user. The hard scale is the GPU, not the rows. Sharding early buys cross-shard reads and a migration you did not need. Add replicas for read-heavy history. Keep writes on the primary."
      },
      {
        "name": "Why limit tokens?",
        "text": "A request count lets one user run a huge context all day. The budget that matches the cost is tokens in plus tokens out."
      },
      {
        "name": "Why summarize?",
        "text": "Resending the entire transcript forever blows the context window and the bill. A summary plus the last turns is the product compromise. Say that you lose detail."
      }
    ],
    "failures": [
      {
        "name": "The client disconnects mid-answer",
        "text": "Cancel the GPU work. Store what you already streamed if you want the history to match the screen, or store nothing and let them retry. Do not keep generating into a void."
      },
      {
        "name": "The model is slow",
        "text": "Time to first token is the metric. Queue by tier. A paid budget jumps the queue. A free tier waits or gets a smaller model."
      },
      {
        "name": "The primary's connections fill",
        "text": "The pool is instances times pool size. History reads can use a replica. The insert of the user message and the finished answer still go to the primary."
      },
      {
        "name": "A retry sends the same prompt twice",
        "text": "The user message has an id. The second submit returns the in-flight or finished answer. You do not start a second GPU job."
      }
    ],
    "tradeoffs": [
      {
        "left": "One primary for chat history",
        "right": "Shard by user",
        "leftWhen": "The working set fits, and you want a simple transaction around a conversation. Replicas take history reads.",
        "rightWhen": "Write rate or disk on that primary is actually exhausted. You shard by user so a conversation stays on one shard."
      },
      {
        "left": "SSE",
        "right": "WebSocket",
        "leftWhen": "The server streams and the client posts the next turn separately.",
        "rightWhen": "Both sides send continuously on one connection, as in a voice session. Text chat does not require it."
      }
    ],
    "tips": [
      "I stream with SSE. I say time to first token, not average request time.",
      "I keep conversations on one primary until that primary is the bottleneck. The GPUs will be first.",
      "I limit tokens. A request cap does not match the cost.",
      "I cancel when the socket closes.",
      "I summarize old turns instead of resending a year of chat."
    ],
    "mistakes": [
      "Putting the model weights in the request path as if they were a library call with no capacity",
      "Sharding the chat database before saying why one primary fails",
      "WebSockets because chat sounds bidirectional",
      "Rate-limiting requests while one request burns a huge context",
      "Generating after the client has gone"
    ]
  },
  "concept-kafka": {
    "kind": "concept",
    "title": "Kafka and event-driven systems",
    "mustKnow": [
      {
        "text": "Topics, partitions, a consumer group, and the offset as one picture",
        "scenario": "spotify"
      },
      {
        "text": "Key choice is the order and the hotspot",
        "scenario": "spotify"
      },
      {
        "text": "At-least-once into a database, and the idempotent consumer",
        "scenario": "spotify"
      },
      {
        "text": "Poison messages, a dead letter, and lag per partition",
        "scenario": "spotify"
      },
      {
        "text": "An outbox when the event must match a commit",
        "scenario": "payment-system"
      }
    ],
    "niceToKnow": [
      {
        "text": "Idempotent producer and Kafka transactions, and where they stop",
        "scenario": "spotify"
      },
      {
        "text": "Backpressure when consumers fall behind the database",
        "scenario": "spotify"
      }
    ]
  },
  "concept-databases": {
    "kind": "concept",
    "title": "Databases and scaling",
    "mustKnow": [
      {
        "text": "Replicas scale reads. They do not scale the writes in the prompt",
        "scenario": "twitter"
      },
      {
        "text": "Shard key from the access path, never from the clock",
        "scenario": "whatsapp"
      },
      {
        "text": "A local transaction around the order, not around the bank",
        "scenario": "payment-system"
      },
      {
        "text": "The write that must be visible to the same user goes to the primary",
        "scenario": "twitter"
      }
    ],
    "niceToKnow": [
      {
        "text": "Batch or a log before you operate a cluster",
        "scenario": "spotify"
      },
      {
        "text": "Isolation does not by itself stop a lost update",
        "scenario": "booking"
      }
    ]
  },
  "concept-caching": {
    "kind": "concept",
    "title": "Caching",
    "mustKnow": [
      {
        "text": "Cache-aside, delete on write, TTL as the backstop",
        "scenario": "twitter"
      },
      {
        "text": "What you do when Redis is down, including the cap",
        "scenario": "tinyurl"
      },
      {
        "text": "A hot key stays on one slot",
        "scenario": "twitter"
      }
    ],
    "niceToKnow": [
      {
        "text": "Stampede when a hot key expires together",
        "scenario": "tinyurl"
      },
      {
        "text": "Write-through only when the next read must be fresh and you will wait",
        "scenario": "twitter"
      }
    ]
  },
  "concept-balancing": {
    "kind": "concept",
    "title": "Load balancing and scale-out",
    "mustKnow": [
      {
        "text": "Stateless API instances behind a balancer, or you cannot add them",
        "scenario": "spotify"
      },
      {
        "text": "More instances do not fix a database or a single hot key",
        "scenario": "twitter"
      },
      {
        "text": "The gateway is where a shared limit belongs",
        "scenario": "chatgpt"
      }
    ],
    "niceToKnow": [
      {
        "text": "Health checks decide who receives traffic; a deep check can drain the whole fleet",
        "scenario": "spotify"
      },
      {
        "text": "Sticky sessions are a smell when the alternative is a shared session",
        "scenario": "spotify"
      }
    ]
  },
  "concept-distributed": {
    "kind": "concept",
    "title": "Distributed systems",
    "mustKnow": [
      {
        "text": "One writer for a sequence: a partition, a shard, a payment key",
        "scenario": "payment-system"
      },
      {
        "text": "A timeout does not tell you the remote work failed",
        "scenario": "payment-system"
      },
      {
        "text": "At-least-once, at-most-once, and exactly-once need a boundary",
        "scenario": "whatsapp"
      },
      {
        "text": "Two regions with two counters over-admit",
        "scenario": "chatgpt"
      }
    ],
    "niceToKnow": [
      {
        "text": "Quorum and a leader are how a broker or a primary survives one dead copy",
        "scenario": "chatgpt"
      },
      {
        "text": "Read-your-writes versus a replica everyone else may use",
        "scenario": "booking"
      }
    ]
  },
  "concept-reliability": {
    "kind": "concept",
    "title": "Reliability and failure",
    "mustKnow": [
      {
        "text": "Timeouts, backoff, jitter, and why a retry storm happens",
        "scenario": "payment-system"
      },
      {
        "text": "Breaker and bulkhead: fail one feature, not the process",
        "scenario": "payment-system"
      },
      {
        "text": "Shed or 429 when you cannot do the work",
        "scenario": "chatgpt"
      },
      {
        "text": "Dead letters so one bad record does not block the rest",
        "scenario": "spotify"
      }
    ],
    "niceToKnow": [
      {
        "text": "A fallback that calls the database without a cap is the next outage",
        "scenario": "tinyurl"
      },
      {
        "text": "Degrade optional work; do not invent a successful payment",
        "scenario": "payment-system"
      }
    ]
  },
  "concept-outbox": {
    "kind": "concept",
    "title": "Transactions, outbox, and saga",
    "mustKnow": [
      {
        "text": "Local transaction plus an outbox, not commit-then-publish",
        "scenario": "payment-system"
      },
      {
        "text": "A saga step compensates; it does not roll back someone else's commit",
        "scenario": "payment-system"
      },
      {
        "text": "Idempotency key stored before the side effect",
        "scenario": "payment-system"
      },
      {
        "text": "Same idea when the side effect is a notification",
        "scenario": "whatsapp"
      }
    ],
    "niceToKnow": [
      {
        "text": "The relay can publish twice; the consumer still dedupes",
        "scenario": "whatsapp"
      },
      {
        "text": "Do not compensate a step whose outcome you have not looked up",
        "scenario": "payment-system"
      }
    ]
  },
  "concept-api": {
    "kind": "concept",
    "title": "API design",
    "mustKnow": [
      {
        "text": "202 when the work continues after the response",
        "scenario": "spotify"
      },
      {
        "text": "429 and Retry-After when the client must slow down",
        "scenario": "chatgpt"
      },
      {
        "text": "Idempotency-Key on a POST that must not happen twice",
        "scenario": "payment-system"
      },
      {
        "text": "401 versus 403",
        "scenario": "spotify"
      }
    ],
    "niceToKnow": [
      {
        "text": "A sync API when the user needs the answer; an event when they do not",
        "scenario": "spotify"
      },
      {
        "text": "Pagination and versioning matter when you expose a list that moves",
        "scenario": "twitter"
      }
    ]
  },
  "concept-networking": {
    "kind": "concept",
    "title": "Networking and HTTP",
    "mustKnow": [
      {
        "text": "The timeout budget shrinks as you go deeper",
        "scenario": "payment-system"
      },
      {
        "text": "A connection pool sized like a thread pool will exhaust the database",
        "scenario": "chatgpt"
      },
      {
        "text": "TLS ends at the gateway; identity is still a token",
        "scenario": "spotify"
      }
    ],
    "niceToKnow": [
      {
        "text": "Keep-alive so a short call does not pay a handshake every time",
        "scenario": "spotify"
      },
      {
        "text": "L7 when you route by path or header; L4 when you only balance connections",
        "scenario": "spotify"
      }
    ]
  },
  "concept-security": {
    "kind": "concept",
    "title": "Authentication and security",
    "mustKnow": [
      {
        "text": "Gateway verifies the token; the service checks the row",
        "scenario": "spotify"
      },
      {
        "text": "Short access token, refresh token stored as a secret",
        "scenario": "spotify"
      },
      {
        "text": "A service needs its own identity when it calls another",
        "scenario": "payment-system"
      }
    ],
    "niceToKnow": [
      {
        "text": "Audience and issuer, or a token for another API is accepted by mistake",
        "scenario": "spotify"
      },
      {
        "text": "Rate limit at the edge is not authorization",
        "scenario": "chatgpt"
      }
    ]
  },
  "concept-observability": {
    "kind": "concept",
    "title": "Observability",
    "mustKnow": [
      {
        "text": "Lag per partition, and the age of the oldest outbox row",
        "scenario": "spotify"
      },
      {
        "text": "Cache hit ratio next to database QPS",
        "scenario": "twitter"
      },
      {
        "text": "Orders stuck in a pending payment state",
        "scenario": "payment-system"
      },
      {
        "text": "OTP lag is a page; campaign lag is not",
        "scenario": "whatsapp"
      }
    ],
    "niceToKnow": [
      {
        "text": "Breaker open/close and fail-open events",
        "scenario": "payment-system"
      },
      {
        "text": "Latency from 100ms to 2s is one hop: pool, dependency, or a deploy",
        "scenario": "chatgpt"
      }
    ]
  }
};
