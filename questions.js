const QUESTIONS = [
  {
    "id": 1,
    "category": "Core Java",
    "question": "Which TWO conditions or runtime behaviors typically trigger a `StackOverflowError` in Java?",
    "options": [
      {
        "id": "A",
        "text": "Method invocation frames accumulate continuously on the thread stack without returning, exceeding `-Xss` capacity."
      },
      {
        "id": "B",
        "text": "The JVM fails to allocate space in the young generation heap despite executing repeated garbage collection cycles."
      },
      {
        "id": "C",
        "text": "A thread's call stack exhausts its configured memory limit, typically caused by deep or unbounded recursion."
      },
      {
        "id": "D",
        "text": "Native memory allocated for Metaspace reaches its configured maximum limit while defining dynamic class metadata."
      }
    ],
    "correct": [
      "A",
      "C"
    ],
    "requiredCount": 2,
    "explanation": "Why this is correct:\n• A thread's execution call stack is allocated with a fixed memory limit per thread (governed by `-Xss`, typically 1MB on 64-bit systems).\n• Each method call pushes a new stack frame storing local variables, operand stacks, and return addresses.\n• In unbounded or excessively deep recursion, frames are pushed continuously without popping, exhausting the allocated thread stack and causing the JVM to throw `java.lang.StackOverflowError` (a subclass of `VirtualMachineError` / `Error`).\n\nWhy other options are incorrect:\n• Young or Old generation heap exhaustion occurs when allocating objects on the heap that cannot be reclaimed by GC, throwing `OutOfMemoryError: Java heap space`.\n• Metaspace exhaustion occurs when too many dynamic classes, constant pools, or proxies are loaded beyond `-XX:MaxMetaspaceSize`, throwing `OutOfMemoryError: Metaspace`.\n• Native thread exhaustion occurs when the OS cannot allocate new OS threads, throwing `OutOfMemoryError: unable to create new native thread`."
  },
  {
    "id": 2,
    "category": "Core Java",
    "question": "Which THREE statements regarding Java packages and access control boundaries are correct?",
    "options": [
      {
        "id": "A",
        "text": "Packages prevent namespace collisions between classes that share identical simple names in different libraries."
      },
      {
        "id": "B",
        "text": "Subpackages in Java are independent namespaces and do not inherit access privileges from enclosing parent packages."
      },
      {
        "id": "C",
        "text": "Packages establish access control boundaries via default package-private visibility for classes and class members."
      },
      {
        "id": "D",
        "text": "Declaring a class in a subpackage automatically grants protected access to members in the enclosing parent package."
      },
      {
        "id": "E",
        "text": "Packages completely eliminate the necessity of declaring access modifiers like `private` on class instance fields."
      }
    ],
    "correct": [
      "A",
      "B",
      "C"
    ],
    "requiredCount": 3,
    "explanation": "Why this is correct:\n• Packages prevent naming collisions: Two classes named `CustomerService` can coexist seamlessly if packaged in different namespaces (e.g. `com.billing.CustomerService` vs `com.crm.CustomerService`).\n• Packages establish encapsulation boundaries: Package-private access (default with no access modifier) restricts visibility to classes within the exact same package.\n• Subpackages are completely independent namespaces: In Java, `com.example.util` is a distinct package from `com.example`. There is no hierarchical privilege inheritance between parent and child package names.\n\nWhy other options are incorrect:\n• Declaring a class in a subpackage does NOT grant access to `protected` or package-private members of the outer package; in Java, `protected` members are accessible only within the same package or by subclasses.\n• Packages do not eliminate access modifiers: without `private`, fields have package-private visibility, exposing internal state to any class residing in the same package."
  },
  {
    "id": 3,
    "category": "Core Java",
    "question": "Which TWO design practices are essential to guarantee that a class is truly immutable in Java?",
    "options": [
      {
        "id": "A",
        "text": "Provide public getter and setter methods while enforcing strict non-null validation checks on all incoming parameters."
      },
      {
        "id": "B",
        "text": "Declare all fields `private` and `final`, and perform defensive copies of all mutable input and output references."
      },
      {
        "id": "C",
        "text": "Declare the class `final` so that subclasses cannot override methods to introduce mutable state or expose fields."
      },
      {
        "id": "D",
        "text": "Declare all methods `synchronized` to prevent concurrent threads from mutating internal state during read operations."
      }
    ],
    "correct": [
      "B",
      "C"
    ],
    "requiredCount": 2,
    "explanation": "Why this is correct:\n• Declaring the class `final` prevents subclasses from overriding methods to introduce mutable state or expose mutable references.\n• Declaring all fields `private` and `final` ensures fields cannot be directly accessed or reassigned after initialization.\n• Defensive copying is critical: mutable objects passed into the constructor (like `java.util.Date` or `List`) must be cloned/copied so the caller cannot mutate internal state, and getters must return defensive copies for the same reason.\n\nWhy other options are incorrect:\n• Declaring methods `synchronized` provides thread synchronization on mutable state, but synchronization does NOT make an object immutable; callers can still alter its state over time.\n• Providing public setter methods—even with strict non-null validation—directly breaks immutability by allowing post-construction mutation."
  },
  {
    "id": 4,
    "category": "Core Java",
    "question": "Which TWO statements accurately contrast `StringBuffer` and `StringBuilder`?",
    "options": [
      {
        "id": "A",
        "text": "`StringBuilder` overrides `equals()` and `hashCode()` for content equality; `StringBuffer` inherits reference identity."
      },
      {
        "id": "B",
        "text": "`StringBuffer` stores characters in the heap string pool; `StringBuilder` stores character sequences on the stack."
      },
      {
        "id": "C",
        "text": "`StringBuilder` is unsynchronized and faster, making it preferred for single-threaded string construction operations."
      },
      {
        "id": "D",
        "text": "`StringBuffer` methods are synchronized for thread safety, incurring intrinsic monitor lock overhead on invocations."
      }
    ],
    "correct": [
      "C",
      "D"
    ],
    "requiredCount": 2,
    "explanation": "Why this is correct:\n• `StringBuffer` (since Java 1.0) synchronizes almost all of its public methods (e.g., `append()`, `insert()`), guaranteeing thread safety at the expense of intrinsic monitor acquisition overhead.\n• `StringBuilder` (introduced in Java 5) provides an identical mutable character buffer API but without synchronization, making it significantly faster and the preferred choice for method-local string concatenation.\n\nWhy other options are incorrect:\n• Neither `StringBuffer` nor `StringBuilder` overrides `equals()` or `hashCode()` from `java.lang.Object`; they inherit identity comparison (`==`). To compare their text content, call `sb1.toString().equals(sb2.toString())`.\n• Both `StringBuffer` and `StringBuilder` store character buffers in dynamically resized `char[]` (or byte arrays in Java 9+ compact strings) allocated on the heap, never on the stack or in the String Pool."
  },
  {
    "id": 5,
    "category": "Core Java",
    "question": "Which TWO reasons explain why `String` objects were designed to be immutable in Java?",
    "options": [
      {
        "id": "A",
        "text": "To enable safe sharing and reuse of string literals across threads within the JVM shared string intern pool."
      },
      {
        "id": "B",
        "text": "To ensure that the class loader automatically promotes string instances directly into permanent Metaspace memory."
      },
      {
        "id": "C",
        "text": "To allow the JVM to allocate character arrays on CPU cache registers to completely eliminate garbage collection."
      },
      {
        "id": "D",
        "text": "To guarantee that cached hash codes remain constant, allowing strings to be used safely as hash collection keys."
      }
    ],
    "correct": [
      "A",
      "D"
    ],
    "requiredCount": 2,
    "explanation": "Why this is correct:\n• String Pool Caching: Because `String` is immutable, the JVM can safely share identical string literals across the entire runtime without risk of one thread's modification corrupting another thread's literal.\n• Hash Code Caching: `String` caches its `hashCode` (stored in the private field `hash`) after the first calculation. Immutability guarantees this hash never changes, making `String` highly performant and reliable as a hash key in `HashMap` and `HashSet`.\n• Security & Class Loading: Strings are used for sensitive system parameters (file paths, network hostnames, database connection strings, class loader names). If strings were mutable, a malicious thread could pass security checks and then alter the path before execution (Time-of-Check to Time-of-Use race condition).\n\nWhy other options are incorrect:\n• Immutability does not eliminate garbage collection or store character arrays in CPU registers; string instances still reside on the heap and are garbage collected when unreferenced.\n• ClassLoaders do not automatically promote strings to Metaspace; string objects live in the standard Java heap."
  },
  {
    "id": 6,
    "category": "Core Java",
    "question": "Which TWO statements accurately describe string literal storage and the behavior of `String.intern()`?",
    "options": [
      {
        "id": "A",
        "text": "Calling `intern()` returns the canonical reference from the string pool that is logically equal to the target string."
      },
      {
        "id": "B",
        "text": "Creating strings via `new String(\"abc\")` bypasses heap allocation and places instances on the thread stack frame."
      },
      {
        "id": "C",
        "text": "The string pool is allocated outside of JVM memory within unmanaged operating system virtual paging swap files."
      },
      {
        "id": "D",
        "text": "String literals are automatically interned and stored in the heap-based string pool upon class initialization."
      }
    ],
    "correct": [
      "A",
      "D"
    ],
    "requiredCount": 2,
    "explanation": "Why this is correct:\n• String literals (e.g., `\"java\"`) and compile-time constants are automatically interned by the compiler and JVM, residing in the heap-based String Pool.\n• Calling `str.intern()` returns the canonical reference from the string pool: if the pool already contains a string equal to `str`, that pooled instance reference is returned; otherwise, `str` is added to the pool and returned.\n\nWhy other options are incorrect:\n• `new String(\"abc\")` explicitly bypasses string pool reuse: it allocates a distinct new `String` object on the heap, even if `\"abc\"` already exists in the pool.\n• Since Java 7, the String Pool resides in the main Java Heap (prior to Java 7, it was in PermGen). It is never allocated in operating system paging swap files."
  },
  {
    "id": 7,
    "category": "Core Java",
    "question": "If you override `equals()`, what else must you do according to the general contract?",
    "options": [
      {
        "id": "A",
        "text": "Override `hashCode()` so that any two objects deemed equal by `equals()` produce the exact same integer hash code."
      },
      {
        "id": "B",
        "text": "Implement `Cloneable` and override `clone()` to guarantee defensive deep copies when storing instances as map keys."
      },
      {
        "id": "C",
        "text": "Implement `Comparable` and override `compareTo()` so that identity consistency is preserved in sorted collections."
      },
      {
        "id": "D",
        "text": "Override `toString()` to ensure the JVM generates distinct string representations for objects that are not equal."
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "Why this is correct:\n• The `Object.equals()` and `Object.hashCode()` general contract mandates:\n  1. If `a.equals(b)` evaluates to `true`, then `a.hashCode()` MUST equal `b.hashCode()`.\n  2. If `a.hashCode() == b.hashCode()`, `a.equals(b)` is NOT required to be true (hash collision).\n  3. If you override `equals()`, you MUST override `hashCode()`. Failing to do so causes equal objects to yield different hash codes, breaking hash-based collections (`HashMap`, `HashSet`) when looking up or removing entries.\n\nWhy other options are incorrect:\n• `Comparable` and `compareTo()` are required only for sorted collections (`TreeSet`, `TreeMap`), not for general equality contracts.\n• `Cloneable` and `clone()` are optional and completely unrelated to the equality contract.\n• `toString()` provides human-readable representation and is never used by hash algorithms or equality checks."
  },
  {
    "id": 8,
    "category": "Core Java",
    "question": "Which TWO characteristics define a Functional Interface in Java?",
    "options": [
      {
        "id": "A",
        "text": "It must be explicitly annotated with `@FunctionalInterface` or the Java compiler will reject lambda assignment."
      },
      {
        "id": "B",
        "text": "It declares exactly one abstract method, which acts as the target type for lambda expressions and method references."
      },
      {
        "id": "C",
        "text": "It is strictly forbidden from declaring public abstract methods that override methods of `java.lang.Object`."
      },
      {
        "id": "D",
        "text": "It can define any number of `default` or `static` methods in addition to its single declared abstract method."
      }
    ],
    "correct": [
      "B",
      "D"
    ],
    "requiredCount": 2,
    "explanation": "Why this is correct:\n• A functional interface (Single Abstract Method or SAM type) must declare exactly one abstract method. This single abstract method serves as the signature target for lambda expressions and method references.\n• Functional interfaces are permitted to declare any number of `default` methods (concrete instance implementations) and `static` methods without violating the single abstract method constraint.\n\nWhy other options are incorrect:\n• The `@FunctionalInterface` annotation is informative: it prompts the compiler to enforce the single abstract method rule, but it is NOT mandatory. An interface with one abstract method is functional even without the annotation.\n• An interface MAY declare abstract methods that match public methods of `java.lang.Object` (e.g., `boolean equals(Object obj)`), and these do NOT count toward the single abstract method limit because all implementations implicitly inherit them from `Object`."
  },
  {
    "id": 9,
    "category": "Core Java",
    "question": "What is autoboxing in Java?",
    "options": [
      {
        "id": "A",
        "text": "The JVM runtime optimization that packs multiple primitive fields into a single 64-bit machine word to reduce memory footprint."
      },
      {
        "id": "B",
        "text": "The automatic conversion that the Java compiler performs between primitive types and their corresponding wrapper classes."
      },
      {
        "id": "C",
        "text": "The compiler mechanism that automatically wraps checked exceptions inside an unchecked `RuntimeException` at boundary methods."
      },
      {
        "id": "D",
        "text": "The automatic promotion of smaller primitive types like `byte` or `short` to `int` during arithmetic evaluation in expressions."
      }
    ],
    "correct": [
      "B"
    ],
    "requiredCount": 1,
    "explanation": "Why this is correct:\n• Autoboxing is the compiler's automatic translation between primitive types and their wrapper classes:\n  - Autoboxing: `int` → `Integer` (compiler generates `Integer.valueOf(i)`).\n  - Unboxing: `Integer` → `int` (compiler generates `integerObj.intValue()`).\n• Note on performance and safety: Autoboxing in loops creates unnecessary heap allocations, and unboxing a `null` wrapper reference throws a runtime `NullPointerException`.\n\nWhy other options are incorrect:\n• Widening primitive conversions (e.g. `byte` or `short` promoted to `int` in expressions like `b1 + b2`) is standard numeric promotion specified by JLS §5.6, not autoboxing.\n• Bit packing in machine words is a low-level JVM JIT optimization, not autoboxing.\n• Converting checked exceptions to runtime exceptions requires manual wrapping or bytecode manipulation (Lombok `@SneakyThrows`), not autoboxing."
  },
  {
    "id": 10,
    "category": "Core Java",
    "question": "Which THREE statements correctly contrast the keywords `final`, `finally`, and `finalize` in Java?",
    "options": [
      {
        "id": "A",
        "text": "`finalize()` was an `Object` cleanup hook historically invoked by the GC, now deprecated due to severe unpredictability."
      },
      {
        "id": "B",
        "text": "`final` restricts class inheritance, prevents method overriding, and prohibits variable reassignment after initialization."
      },
      {
        "id": "C",
        "text": "`finally` blocks execute even if a thread executes `System.exit(0)` or experiences an immediate virtual machine crash."
      },
      {
        "id": "D",
        "text": "`finally` defines a block attached to try-catch statements that guarantees execution during normal and exceptional exits."
      },
      {
        "id": "E",
        "text": "Declaring a local variable `final` instructs the compiler to allocate that variable directly within Metaspace memory."
      }
    ],
    "correct": [
      "A",
      "B",
      "D"
    ],
    "requiredCount": 3,
    "explanation": "Why this is correct:\n• `final`: Modifier preventing reassignment for variables, inheritance for classes, and overriding for methods.\n• `finally`: Control-flow block attached to `try`/`catch` that executes whether an exception is thrown, caught, or omitted, ensuring reliable resource release.\n• `finalize()`: Protected method of `java.lang.Object` deprecated in Java 9 and marked for removal in Java 18+. It was invoked by GC before object reclamation, but suffers from unpredictable execution timing, deadlocks, and resurrection bugs.\n\nWhy other options are incorrect:\n• `finally` blocks do NOT execute if `System.exit(status)` is called, if the JVM encounters a `FatalError` (like `OutOfMemoryError` in native code), or if the underlying OS thread is terminated abruptly.\n• Declaring a variable `final` does not place it in Metaspace; local variables always reside on the execution thread stack, and instance fields reside inside their object on the heap."
  },
  {
    "id": 11,
    "category": "Core Java",
    "question": "What is the purpose of the `transient` keyword in Java?",
    "options": [
      {
        "id": "A",
        "text": "It ensures that read and write operations to the field bypass the CPU L1/L2 caches and interact directly with RAM."
      },
      {
        "id": "B",
        "text": "It allows a local variable declared in an outer method to be accessed and mutated inside an anonymous inner class."
      },
      {
        "id": "C",
        "text": "It instructs default Java serialization to ignore the field so its value is not written to the serialized byte stream."
      },
      {
        "id": "D",
        "text": "It informs the garbage collector that the object referenced by the field should be treated as a weak reference."
      }
    ],
    "correct": [
      "C"
    ],
    "requiredCount": 1,
    "explanation": "Why this is correct:\n• When an object implementing `java.io.Serializable` is serialized using `ObjectOutputStream`, any field marked with `transient` is skipped and excluded from the serialized byte stream.\n• Upon deserialization (via `ObjectInputStream`), transient fields are restored to their default initial values (`null` for references, `0` for numeric primitives, `false` for booleans).\n• Common use cases: passwords, encryption keys, thread references, open database sockets, and cached computed fields.\n\nWhy other options are incorrect:\n• Bypassing CPU caches and reading directly from main memory is the role of `volatile`, not `transient`.\n• Weak references are created using `java.lang.ref.WeakReference`, not the `transient` keyword.\n• Local variables accessed inside anonymous classes must be `final` or effectively final, which has nothing to do with `transient`."
  },
  {
    "id": 12,
    "category": "Core Java",
    "question": "Which TWO memory guarantees does the `volatile` keyword provide for a shared variable?",
    "options": [
      {
        "id": "A",
        "text": "Mutual exclusion: it prevents concurrent threads from executing any method within the enclosing class simultaneously."
      },
      {
        "id": "B",
        "text": "Atomicity: it guarantees that compound operations such as pre-increment (`++count`) execute as an atomic transaction."
      },
      {
        "id": "C",
        "text": "Instruction ordering: it establishes a happens-before relationship that prevents compiler and CPU memory reordering."
      },
      {
        "id": "D",
        "text": "Memory visibility: writes to a volatile variable are immediately visible to subsequent reads by any other thread."
      }
    ],
    "correct": [
      "C",
      "D"
    ],
    "requiredCount": 2,
    "explanation": "Why this is correct:\n• Visibility: Writes to a `volatile` variable are immediately flushed to main memory, and subsequent reads by other threads bypass local CPU L1/L2 caches to fetch the freshest value from main memory.\n• Instruction Ordering (Happens-Before): The JMM inserts memory barriers (LoadLoad, LoadStore, StoreStore, StoreLoad) around volatile reads and writes, preventing the compiler and hardware out-of-order execution from reordering instructions across the boundary.\n\nWhy other options are incorrect:\n• `volatile` provides NO mutual exclusion; it does not block threads or lock objects like `synchronized` or `ReentrantLock`.\n• `volatile` does NOT guarantee atomicity for compound operations: `count++` consists of 3 distinct bytecode instructions (`getfield`, `iadd`, `putfield`). If multiple threads execute `count++` concurrently, race conditions still occur. Use `AtomicInteger` instead."
  },
  {
    "id": 13,
    "category": "Core Java",
    "question": "Can a field be declared both `volatile` and `final` simultaneously?",
    "options": [
      {
        "id": "A",
        "text": "Yes, and combining them is the recommended practice for declaring high-performance thread-safe global constants."
      },
      {
        "id": "B",
        "text": "Yes, but only if the field is also declared `static` and initialized inside a static initialization block."
      },
      {
        "id": "C",
        "text": "No, unless the field is of a primitive type and declared within an interface definition."
      },
      {
        "id": "D",
        "text": "No, the compiler disallows it because `final` fields cannot change value while `volatile` is intended for mutable shared state."
      }
    ],
    "correct": [
      "D"
    ],
    "requiredCount": 1,
    "explanation": "Why this is correct:\n• The Java compiler rejects `volatile final int x = 10;` with a compilation error: `illegal combination of modifiers: final and volatile`.\n• The reason is architectural: `final` implies that a variable's value is set once during construction and can never change. The JMM already guarantees safe publication of `final` fields without memory barriers.\n• `volatile`, conversely, exists specifically to synchronize concurrent, mutable state changes across threads. Combining them is a logical contradiction."
  },
  {
    "id": 14,
    "category": "Core Java",
    "question": "Which TWO statements are true when an array reference is declared `volatile` (`volatile int[] arr = new int[5];`)?",
    "options": [
      {
        "id": "A",
        "text": "The volatile modifier applies exclusively to the array reference pointer, ensuring reference updates are visible."
      },
      {
        "id": "B",
        "text": "Volatile read and write semantics for individual array elements require `AtomicIntegerArray` or `VarHandle` accessors."
      },
      {
        "id": "C",
        "text": "The compiler rejects `volatile` on arrays because arrays are dynamically sized, mutable heap reference structures."
      },
      {
        "id": "D",
        "text": "Declaring the array reference `volatile` automatically propagates volatile read-write visibility to all indexed elements."
      }
    ],
    "correct": [
      "A",
      "B"
    ],
    "requiredCount": 2,
    "explanation": "Why this is correct:\n• Declaring `volatile int[] arr = new int[5];` applies volatile memory semantics ONLY to the reference variable `arr` itself. Changing the reference (`arr = new int[10];`) is visible to all threads.\n• Reading or writing individual elements (e.g., `arr[0] = 42;`) does NOT inherit volatile semantics; threads may observe stale element values due to CPU cache caching.\n• To achieve volatile element semantics, Java provides `java.util.concurrent.atomic.AtomicIntegerArray` or `java.lang.invoke.VarHandle` with volatile array accessors (`setVolatile`, `getVolatile`)."
  },
  {
    "id": 15,
    "category": "Core Java",
    "question": "Which THREE statements accurately describe Java checked vs unchecked exceptions?",
    "options": [
      {
        "id": "A",
        "text": "Subclasses of `Exception` (excluding `RuntimeException`) are checked and must be caught or declared in the `throws` clause."
      },
      {
        "id": "B",
        "text": "Custom unchecked exceptions can be created by subclassing `RuntimeException` or any of its descendants."
      },
      {
        "id": "C",
        "text": "Methods that throw unchecked exceptions must explicitly declare them in their method signature using `throws`."
      },
      {
        "id": "D",
        "text": "`Error` and its subclasses are unchecked and typically represent abnormal conditions that applications should not catch."
      },
      {
        "id": "E",
        "text": "All checked exceptions are automatically converted to unchecked exceptions when thrown inside lambda expressions."
      }
    ],
    "correct": [
      "A",
      "B",
      "D"
    ],
    "requiredCount": 3,
    "explanation": "Why this is correct:\n• Checked Exceptions: Subclasses of `java.lang.Exception` (excluding `RuntimeException`). The compiler verifies that they are either caught via `try-catch` or declared in the enclosing method's `throws` clause (e.g., `IOException`, `SQLException`).\n• Unchecked Exceptions: Subclasses of `java.lang.RuntimeException` (e.g., `NullPointerException`, `IllegalArgumentException`). They represent programming bugs or unexpected runtime states and do not require handling or declaration.\n• `Error`: Subclasses of `java.lang.Error` (e.g., `OutOfMemoryError`, `StackOverflowError`) represent catastrophic conditions that applications should rarely attempt to catch.\n\nWhy other options are incorrect:\n• Lambda expressions cannot throw unhandled checked exceptions unless the target functional interface's abstract method explicitly declares them in its `throws` clause.\n• Methods throwing unchecked exceptions are NOT required to declare them in a `throws` clause."
  },
  {
    "id": 16,
    "category": "Core Java",
    "question": "What happens when casting an `int` value of `130` to a `byte` in Java (`byte b = (byte) 130;`)?",
    "options": [
      {
        "id": "A",
        "text": "The value overflows and wraps around to `-126` via two's complement 8-bit truncation without throwing any exception."
      },
      {
        "id": "B",
        "text": "The code fails to compile because narrowing primitive conversions require explicit invocation of `Byte.valueOf()`."
      },
      {
        "id": "C",
        "text": "The value saturates at the maximum byte boundary, resulting in `b` holding the value `127`."
      },
      {
        "id": "D",
        "text": "The compiler throws an `ArithmeticException` because 130 exceeds the maximum signed byte capacity of 127."
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "Why this is correct:\n• Java uses two's complement 8-bit signed representation for `byte`, with a range of `-128` to `+127`.\n• In 32-bit binary, `130` is `00000000 00000000 00000000 10000010`.\n• Casting to `byte` discards the high 24 bits, leaving `10000010`.\n• Because the most significant bit (MSB) is `1`, the value is negative. To compute its two's complement value: invert bits (`01111101` = 125) and add 1 = 126, yielding `-126`.\n• Primitive narrowing overflow in Java never throws exceptions.\n\nWhy other options are incorrect:\n• No `ArithmeticException` is thrown: primitive conversions wrap around silently per JLS §5.1.3.\n• Primitive values do not saturate or clamp at maximum values in Java.\n• Explicit calls to `Byte.valueOf()` are not required; cast syntax `(byte)` is standard primitive narrowing."
  },
  {
    "id": 17,
    "category": "Core Java",
    "question": "Which TWO capabilities are provided by a bounded type parameter such as `<T extends Number>` in generic definitions?",
    "options": [
      {
        "id": "A",
        "text": "It restricts generic type arguments to `Number` or any of its subclasses (such as `Integer` or `Double`)."
      },
      {
        "id": "B",
        "text": "It instructs the compiler to retain generic type information at runtime, disabling type erasure for class `T`."
      },
      {
        "id": "C",
        "text": "It allows invoking `Number` methods (such as `doubleValue()`) directly on instances of `T` without explicit casting."
      },
      {
        "id": "D",
        "text": "It allows adding any arbitrary subtype of `Number` into a generic `List<T>` collection container at runtime."
      }
    ],
    "correct": [
      "A",
      "C"
    ],
    "requiredCount": 2,
    "explanation": "Why this is correct:\n• Upper bound `<T extends Number>` restricts acceptable type arguments to `Number` or its subclasses (such as `Integer`, `Double`, `BigDecimal`).\n• Inside the generic scope, the compiler guarantees that `T` has at least the capabilities of `Number`, allowing direct invocation of `Number` methods (such as `doubleValue()`, `longValue()`) without casting.\n\nWhy other options are incorrect:\n• Type erasure still occurs: at compile time, `T` is erased to its first bound (`Number`), not retained as generic metadata.\n• Upper bounds do NOT allow you to add arbitrary subtypes to a collection: if you have `List<? extends Number>`, you cannot add an `Integer` or `Double` to it (PECS: Producer Extends, Consumer Super). Only `null` can be added."
  },
  {
    "id": 18,
    "category": "Core Java",
    "question": "Which TWO statements correctly describe type erasure in Java generics?",
    "options": [
      {
        "id": "A",
        "text": "The JVM garbage collector deletes unused generic class definitions dynamically from Metaspace memory buffers."
      },
      {
        "id": "B",
        "text": "Parameterized instances share the same runtime `Class` object (for example, `List<String>` and `List<Integer>` share `List.class`)."
      },
      {
        "id": "C",
        "text": "Type erasure completely prevents reflection from inspecting generic return types and parameter types on methods."
      },
      {
        "id": "D",
        "text": "The compiler removes generic type arguments at compile time and inserts synthetic casts into bytecode where needed."
      }
    ],
    "correct": [
      "B",
      "D"
    ],
    "requiredCount": 2,
    "explanation": "Why this is correct:\n• Type Erasure: Java compilers enforce generic type constraints at compile time, then strip (erase) all generic type parameters from the generated bytecode, inserting synthetic bridge methods and casts where necessary.\n• Shared Runtime Class: Because type arguments are erased, `new ArrayList<String>().getClass() == new ArrayList<Integer>().getClass()` is `true`, both evaluating to `ArrayList.class`.\n\nWhy other options are incorrect:\n• Type erasure does NOT eliminate all generic metadata: reflection CAN inspect generic signatures of class declarations, field declarations, and method parameters/returns via `Class.getGenericSuperclass()`, `Method.getGenericParameterTypes()`, etc.\n• Metaspace memory deletion is performed by GC during class unloading, not during type erasure."
  },
  {
    "id": 19,
    "category": "Core Java",
    "question": "Which THREE statements accurately describe the ClassLoader mechanism and hierarchy in the Java Virtual Machine?",
    "options": [
      {
        "id": "A",
        "text": "The Bootstrap ClassLoader is written in Java and can be inspected as an ordinary public Spring singleton bean."
      },
      {
        "id": "B",
        "text": "ClassLoaders load `.class` bytecode files into JVM memory and instantiate corresponding `java.lang.Class` objects."
      },
      {
        "id": "C",
        "text": "ClassLoaders automatically recompile loaded bytecode into native C++ code whenever memory consumption rises."
      },
      {
        "id": "D",
        "text": "They follow a parent-delegation model where a loader delegates search requests to its parent before searching locally."
      },
      {
        "id": "E",
        "text": "Custom class loaders can be implemented to load class bytecode from network URLs, databases, or encrypted streams."
      }
    ],
    "correct": [
      "B",
      "D",
      "E"
    ],
    "requiredCount": 3,
    "explanation": "Why this is correct:\n• ClassLoaders load compiled `.class` bytecode streams into JVM memory and instantiate the runtime `java.lang.Class` instance.\n• Parent Delegation Model: When a ClassLoader receives a request to load a class, it delegates the search to its parent loader first. Only if the parent hierarchy fails to find the class does the child loader call `findClass()`.\n• Custom Loaders: Subclassing `java.lang.ClassLoader` allows loading bytecode dynamically from remote HTTP endpoints, encrypted archives, or database blobs.\n\nWhy other options are incorrect:\n• The Bootstrap ClassLoader is the root loader written in native C/C++ inside the JVM core (returning `null` from `String.class.getClassLoader()`), not a Java Spring bean.\n• ClassLoaders load bytecode; they do NOT recompile bytecode into native C++ code (that is done by JIT compilers like C1/C2 or GraalVM)."
  },
  {
    "id": 20,
    "category": "Core Java",
    "question": "What is the difference between abstraction and encapsulation in object-oriented design?",
    "options": [
      {
        "id": "A",
        "text": "Abstraction restricts subclassing using final modifiers; encapsulation forces all class methods to be declared abstract."
      },
      {
        "id": "B",
        "text": "Abstraction hides implementation complexity behind high-level interfaces; encapsulation hides internal state behind controlled methods."
      },
      {
        "id": "C",
        "text": "Abstraction binds runtime polymorphic calls dynamically; encapsulation translates checked exceptions into unchecked ones."
      },
      {
        "id": "D",
        "text": "Abstraction is achieved solely through private variables; encapsulation is achieved exclusively through public static methods."
      }
    ],
    "correct": [
      "B"
    ],
    "requiredCount": 1,
    "explanation": "Why this is correct:\n• Abstraction: Focuses on the *outside* view of an object. It hides implementation complexity and shows only essential functionality through abstract classes and interfaces (e.g. `List` defines `add()` without revealing array vs linked-node storage).\n• Encapsulation: Focuses on the *inside* view. It bundles state and operations together while restricting direct access to internal representations via `private` fields and providing controlled access through methods.\n\nWhy other options are incorrect:\n• Final modifiers and abstract methods are specific language keywords, not the defining principles of abstraction vs encapsulation.\n• Abstraction is not restricted to private variables; private variables belong to encapsulation.\n• Dynamic dispatch and exception handling are polymorphism and exception handling mechanisms, respectively."
  },
  {
    "id": 21,
    "category": "Core Java",
    "question": "Which THREE statements correctly contrast method overloading and method overriding in Java?",
    "options": [
      {
        "id": "A",
        "text": "Private and static methods declared in a superclass can be overridden polymorphically by extending subclasses."
      },
      {
        "id": "B",
        "text": "Overloading defines methods with the same name but different parameter lists within a class and is resolved at compile time."
      },
      {
        "id": "C",
        "text": "Overloading can be achieved simply by declaring two methods with identical parameter lists and different return types."
      },
      {
        "id": "D",
        "text": "Overriding provides a new implementation in a subclass with the same signature and is resolved at runtime via dynamic dispatch."
      },
      {
        "id": "E",
        "text": "An overriding method cannot declare a checked exception that is broader or higher in the hierarchy than the overridden method."
      }
    ],
    "correct": [
      "B",
      "D",
      "E"
    ],
    "requiredCount": 3,
    "explanation": "Why this is correct:\n• Overriding (Runtime Polymorphism): A subclass provides a specific implementation of an instance method already declared in its superclass, using the exact same name and parameter types. It is resolved dynamically at runtime based on the actual object instance.\n• Overloading (Compile-Time Polymorphism): Methods in the same class share the same name but have different parameter lists (count, types, or order). It is resolved statically at compile time.\n• Exception Rule in Overriding: An overriding method cannot declare new or broader checked exceptions than the overridden method, because callers expecting the superclass contract could not handle unforeseen checked exceptions.\n\nWhy other options are incorrect:\n• Overloading CANNOT be achieved by changing the return type alone; the parameter list must differ.\n• Private methods are not visible to subclasses and cannot be overridden; static methods belong to the class and are hidden, not overridden (compile-time resolution)."
  },
  {
    "id": 22,
    "category": "Core Java",
    "question": "Which TWO statements accurately contrast a shallow copy and a deep copy of an object?",
    "options": [
      {
        "id": "A",
        "text": "A shallow copy duplicates the outer object instance but shares references to internal nested objects with the original."
      },
      {
        "id": "B",
        "text": "A deep copy creates an independent object graph by recursively duplicating all nested referenced objects in memory."
      },
      {
        "id": "C",
        "text": "The default implementation of `Object.clone()` automatically performs a deep recursive copy of all member fields."
      },
      {
        "id": "D",
        "text": "Shallow copies are strictly prohibited by the JVM security manager when executing within named Java module systems."
      }
    ],
    "correct": [
      "A",
      "B"
    ],
    "requiredCount": 2,
    "explanation": "Why this is correct:\n• Shallow Copy: Duplicates the root object container, but copies field values directly. Any reference fields in the copy point to the exact same objects in memory as the original. Mutating a referenced object affects both copies.\n• Deep Copy: Recursively clones the entire object graph, creating fresh independent instances of all referenced child objects. Mutating child objects in a deep copy leaves the original completely unaffected.\n\nWhy other options are incorrect:\n• The default implementation of `Object.clone()` performs a SHALLOW copy (field-by-field bitwise copy).\n• Shallow copies are not prohibited by JVM security managers; they are standard Java behavior."
  },
  {
    "id": 23,
    "category": "Core Java",
    "question": "If class `Dog extends Animal`, which THREE statements accurately reflect Java reference assignment and casting rules?",
    "options": [
      {
        "id": "A",
        "text": "Testing `a instanceof Dog` before performing a downcast prevents unexpected runtime `ClassCastException` failures."
      },
      {
        "id": "B",
        "text": "Assigning `Animal a = new Dog();` is an implicit upcast that succeeds because every `Dog` is an `Animal`."
      },
      {
        "id": "C",
        "text": "Downcasting an `Animal` reference pointing to an `Animal` instance into a `Dog` reference succeeds silently."
      },
      {
        "id": "D",
        "text": "Assigning `Dog d = (Dog) a;` is an explicit downcast that compiles but throws `ClassCastException` at runtime if `a` is not a `Dog`."
      },
      {
        "id": "E",
        "text": "The compiler permits `Dog d = a;` without an explicit cast whenever both classes reside within the exact same package."
      }
    ],
    "correct": [
      "A",
      "B",
      "D"
    ],
    "requiredCount": 3,
    "explanation": "Why this is correct:\n• If `Dog` extends `Animal`, upcasting `Animal a = new Dog();` is safe and implicit because every `Dog` is an `Animal`.\n• Downcasting `(Cat) a` attempts to cast an instance whose actual runtime type is `Dog` to an incompatible sibling type `Cat`.\n• Because the runtime instance is not a `Cat`, the JVM immediately throws `java.lang.ClassCastException`.\n• To avoid this, always guard explicit downcasts using the `instanceof` operator or pattern matching (`if (a instanceof Cat c)`)."
  },
  {
    "id": 24,
    "category": "Core Java",
    "question": "Which approach is considered standard practice for reading an entire text file into memory in modern Java (Java 11+)?",
    "options": [
      {
        "id": "A",
        "text": "Invoking `Runtime.getRuntime().readFile(path)` to stream file contents directly from the OS kernel buffer."
      },
      {
        "id": "B",
        "text": "Creating a raw `FileInputStream` and invoking `readObject()` to deserialize the raw character buffer."
      },
      {
        "id": "C",
        "text": "Using `Files.readString(path)` or `Files.lines(path)` with try-with-resources for automatic file descriptor closure."
      },
      {
        "id": "D",
        "text": "Using `FileReader.readAll()` followed by calling `System.gc()` to ensure OS file lock release."
      }
    ],
    "correct": [
      "C"
    ],
    "requiredCount": 1,
    "explanation": "Why this is correct:\n• Java NIO.2 (`java.nio.file`) was introduced in Java 7 to overcome severe limitations of classic `java.io.File`.\n• `java.nio.file.Path` and `Files` support advanced file attributes (POSIX permissions, file owner, symbolic links).\n• `Files.readAllLines()` and `Files.lines()` provide stream-based reading of text files.\n• Classic `java.io.File` lacked robust error reporting: many methods (like `delete()` or `mkdir()`) returned a boolean `false` on failure without explaining whether permission was denied or the file was missing.\n\nWhy other options are incorrect:\n• Classic `File` has NOT been deprecated or removed; it remains available for backward compatibility.\n• `Path` does not load entire files into CPU cache registers; it is an abstraction representing a filesystem path."
  },
  {
    "id": 25,
    "category": "Core Java",
    "question": "Which TWO statements accurately characterize Java Reflection capabilities and trade-offs?",
    "options": [
      {
        "id": "A",
        "text": "It enables runtime inspection and dynamic invocation of constructors, methods, and fields without compile-time binding."
      },
      {
        "id": "B",
        "text": "It can access private members using `setAccessible(true)`, subject to JVM security and module encapsulation boundaries."
      },
      {
        "id": "C",
        "text": "It executes with zero performance overhead because the JIT compiler completely inlines all reflective method lookups."
      },
      {
        "id": "D",
        "text": "It preserves compile-time type safety and prevents runtime exceptions such as `NoSuchMethodException` and `IllegalAccessException`."
      }
    ],
    "correct": [
      "A",
      "B"
    ],
    "requiredCount": 2,
    "explanation": "Why this is correct:\n• The Reflection API (`java.lang.reflect`) allows inspecting class metadata at runtime, invoking methods dynamically, and accessing fields—even `private` ones via `setAccessible(true)` (subject to module system barriers).\n• Reflection is the foundation of modern frameworks like Spring (IoC container, `@Autowired`), Hibernate (ORM entity mapping), and Jackson (JSON serialization).\n• Trade-offs: Reflection incurs performance overhead (bypassing JIT inlining and optimizations) and circumvents compile-time type safety.\n\nWhy other options are incorrect:\n• Modern JVMs allow reflection, though the Java Platform Module System (JPMS since Java 9) restricts deep reflection across encapsulated module packages unless opened (`opens ...`).\n• Reflection does not automatically convert synchronous code into non-blocking reactive pipelines."
  },
  {
    "id": 26,
    "category": "Core Java",
    "question": "Which TWO statements correctly contrast instance methods and `static` methods in Java?",
    "options": [
      {
        "id": "A",
        "text": "Static methods can be overridden polymorphically by subclasses that declare methods with identical signatures."
      },
      {
        "id": "B",
        "text": "Instance methods cannot be declared `synchronized` or throw checked exceptions across inheritance hierarchies."
      },
      {
        "id": "C",
        "text": "Instance methods belong to an object, receive an implicit `this` reference, and participate in dynamic polymorphic dispatch."
      },
      {
        "id": "D",
        "text": "Static methods belong to the class, cannot access `this` or instance fields directly, and are bound at compile time."
      }
    ],
    "correct": [
      "C",
      "D"
    ],
    "requiredCount": 2,
    "explanation": "Why this is correct:\n• `static` methods belong to the class itself, not to any individual instance. They can be invoked without creating an object (`Math.sqrt(4.0)`).\n• Because static methods have no implicit `this` reference, they cannot access instance fields or call instance methods directly.\n• Static methods are bound at compile time based on the reference type (method hiding), whereas instance methods are dispatched dynamically at runtime based on the actual object type.\n\nWhy other options are incorrect:\n• Static methods CANNOT access instance fields directly without an explicit instance reference, because there is no `this` context.\n• Declaring a method static does not allocate its return value in Metaspace; returned objects are created on the heap."
  },
  {
    "id": 27,
    "category": "Collections",
    "question": "Which TWO statements accurately describe the internal implementation of `HashSet`?",
    "options": [
      {
        "id": "A",
        "text": "It is internally backed by a `HashMap` where set elements are stored as map keys to ensure uniqueness."
      },
      {
        "id": "B",
        "text": "It permits duplicate keys as long as their respective computed 32-bit integer hash codes are identical."
      },
      {
        "id": "C",
        "text": "It maintains elements in a balanced red-black binary search tree, ordering items via natural `Comparable` logic."
      },
      {
        "id": "D",
        "text": "A shared static dummy `Object` instance is stored as the associated value for every key in the backing map."
      }
    ],
    "correct": [
      "A",
      "D"
    ],
    "requiredCount": 2,
    "explanation": "Why this is correct:\n• `HashSet` is internally backed by a `HashMap` instance (specifically, `private transient HashMap<E,Object> map;`).\n• When you call `set.add(element)`, `HashSet` executes `map.put(element, PRESENT)`, where `PRESENT` is a static dummy `new Object()`.\n• Because `HashMap` requires unique keys, `HashSet` guarantees element uniqueness.\n• Constant-time performance: `add()`, `remove()`, and `contains()` run in $O(1)$ amortized time, assuming a proper hash distribution.\n\nWhy other options are incorrect:\n• `HashSet` does NOT maintain elements in a balanced red-black binary search tree; that is `TreeSet`.\n• `HashSet` does NOT sort elements or maintain insertion order (that is `LinkedHashSet`)."
  },
  {
    "id": 28,
    "category": "Collections",
    "question": "Which THREE statements accurately contrast `ArrayList` and legacy `Vector`?",
    "options": [
      {
        "id": "A",
        "text": "`ArrayList` grows its internal array capacity by approximately 50% by default, whereas `Vector` doubles its capacity by default."
      },
      {
        "id": "B",
        "text": "`Vector` allows storing primitive types directly without autoboxing; `ArrayList` can only store reference types."
      },
      {
        "id": "C",
        "text": "`Vector` completely prevents memory reallocation by allocating an infinite buffer array upon initial construction."
      },
      {
        "id": "D",
        "text": "`ArrayList` is part of modern Java Collections; `Vector` is a legacy Java 1.0 class retained primarily for backward compatibility."
      },
      {
        "id": "E",
        "text": "`ArrayList` is unsynchronized and faster for single-threaded use; `Vector` synchronizes every method, incurring locking overhead."
      }
    ],
    "correct": [
      "A",
      "D",
      "E"
    ],
    "requiredCount": 3,
    "explanation": "Why this is correct:\n• `ArrayList` is backed by a contiguous resizable array. It provides $O(1)$ random access (`get(i)`), but element insertions or removals in the middle take $O(n)$ time due to shifting elements (`System.arraycopy`).\n• `LinkedList` is backed by a doubly-linked list. It provides $O(1)$ insertions or deletions once a node reference is located, but random access (`get(i)`) is $O(n)$ because it must traverse nodes from head or tail.\n• In practice, `ArrayList` is almost always preferred due to CPU cache locality and lower memory overhead per element (no node pointer overhead).\n\nWhy other options are incorrect:\n• `LinkedList` does NOT provide $O(1)$ index-based access; accessing by index requires linear traversal.\n• `ArrayList` does not allocate elements in CPU registers, and `LinkedList` is not allocated exclusively in native off-heap memory."
  },
  {
    "id": 29,
    "category": "Collections",
    "question": "Which THREE statements accurately contrast `ArrayList` and `LinkedList`?",
    "options": [
      {
        "id": "A",
        "text": "`LinkedList` provides O(1) insertion/deletion at known iterator nodes, but indexing to an arbitrary position requires O(n) pointer traversal."
      },
      {
        "id": "B",
        "text": "Due to CPU cache locality and lower per-node pointer memory overhead, `ArrayList` is practically faster than `LinkedList` for most use cases."
      },
      {
        "id": "C",
        "text": "`LinkedList` stores primitive data types directly in nodes without requiring wrapper object autoboxing."
      },
      {
        "id": "D",
        "text": "`LinkedList` is synchronized and thread-safe by default, whereas `ArrayList` requires external locking."
      },
      {
        "id": "E",
        "text": "`ArrayList` provides O(1) random access by index via its backing array, but middle insertions and deletions require O(n) element shifting."
      }
    ],
    "correct": [
      "A",
      "B",
      "E"
    ],
    "requiredCount": 3,
    "explanation": "Why this is correct:\n• `TreeSet` implements `NavigableSet` (which extends `SortedSet`), guaranteeing that elements are stored in ascending order according to their natural ordering (`Comparable`) or an explicit `Comparator`.\n• Under the hood, `TreeSet` is backed by a `TreeMap`, which is implemented as a Red-Black tree (a self-balancing binary search tree).\n• Core operations (`add()`, `remove()`, `contains()`) guarantee $O(\\log n)$ time complexity.\n• In `TreeSet`, element equality is determined strictly by `compareTo()` or `compare()`, NOT by `equals()`. If `compare(a, b) == 0`, `TreeSet` treats them as duplicates.\n\nWhy other options are incorrect:\n• `TreeSet` uses red-black trees, NOT a hash table.\n• `TreeSet` does not maintain FIFO insertion order; that is `LinkedHashSet`."
  },
  {
    "id": 30,
    "category": "Collections",
    "question": "Which THREE statements about `TreeSet` are accurate?",
    "options": [
      {
        "id": "A",
        "text": "Elements must be mutually comparable; attempting to insert non-comparable objects causes a runtime `ClassCastException`."
      },
      {
        "id": "B",
        "text": "It implements `NavigableSet` and maintains elements in sorted order based on natural ordering or an explicit `Comparator`."
      },
      {
        "id": "C",
        "text": "`TreeSet` determines element uniqueness using `compareTo()` or `compare()` returning 0, rather than using `equals()`."
      },
      {
        "id": "D",
        "text": "`TreeSet` allows multiple `null` elements as long as a custom comparator handles null values explicitly."
      },
      {
        "id": "E",
        "text": "`TreeSet` provides constant O(1) time complexity for `add()`, `remove()`, and `contains()` operations."
      }
    ],
    "correct": [
      "A",
      "B",
      "C"
    ],
    "requiredCount": 3,
    "explanation": "Why this is correct:\n• `Collection` is the root interface for `List`, `Set`, and `Queue`.\n• `Map` is NOT a subinterface of `Collection`; it sits in its own independent branch because key-value mappings have fundamentally different operations than single-element collections.\n• `Set` represents an unordered collection of unique elements; `List` is an ordered sequence that allows duplicates; `Queue` is designed for holding elements prior to processing.\n\nWhy other options are incorrect:\n• `Map` does NOT extend `Collection`; `Map.values()` returns a `Collection`, but `Map` itself is a distinct hierarchy.\n• `ArrayList` does not implement `Set`; it implements `List`."
  },
  {
    "id": 31,
    "category": "Collections",
    "question": "Which core interfaces constitute the primary hierarchy of the `java.util` Collection and Map frameworks?",
    "options": [
      {
        "id": "A",
        "text": "`Collection` as the unified root interface that extends both `List` and `Map` to provide common iteration methods."
      },
      {
        "id": "B",
        "text": "`Iterable` as the parent interface of `Map`, allowing direct enhanced for-loop iteration over map entries without calling `entrySet()`."
      },
      {
        "id": "C",
        "text": "`Map` as the top-level parent interface from which `Set`, `List`, and `Queue` inherit key-value storage properties."
      },
      {
        "id": "D",
        "text": "`Collection` (with subinterfaces `List`, `Set`, and `Queue`/`Deque`) and `Map` (as a distinct, parallel key-value hierarchy)."
      }
    ],
    "correct": [
      "D"
    ],
    "requiredCount": 1,
    "explanation": "Why this is correct:\n• `Comparable<T>`: Defines the natural ordering of a class. Implemented *internally* by the class itself via `int compareTo(T other)`. Found in `java.lang`.\n• `Comparator<T>`: Defines custom or alternative sorting orders. Implemented *externally* via `int compare(T o1, T o2)`. Found in `java.util`.\n• Modern Java provides convenient factory and combinator methods on `Comparator` (e.g., `Comparator.comparing(Person::getName).thenComparing(Person::getAge)`).\n\nWhy other options are incorrect:\n• `Comparable` is in `java.lang`, while `Comparator` is in `java.util` (the opposite of the incorrect distractor).\n• `Comparable` does NOT require implementing `Serializable`."
  },
  {
    "id": 32,
    "category": "Collections",
    "question": "Which TWO statements correctly contrast a `Set` and a `List` in Java?",
    "options": [
      {
        "id": "A",
        "text": "A `Set` always preserves the exact chronological insertion order of elements across all concrete implementations."
      },
      {
        "id": "B",
        "text": "A `List` is an ordered sequence that permits duplicate elements and allows positional access via integer indices."
      },
      {
        "id": "C",
        "text": "A `Set` contains unique elements according to `equals()`, rejecting duplicate additions by returning `false`."
      },
      {
        "id": "D",
        "text": "A `List` automatically sorts all inserted elements according to their natural `Comparable` implementations."
      }
    ],
    "correct": [
      "B",
      "C"
    ],
    "requiredCount": 2,
    "explanation": "Why this is correct:\n• `Collections.shuffle(List<?> list)` randomly permutes the elements of the specified list in place.\n• It uses the Fisher-Yates shuffle algorithm, running in $O(n)$ linear time for lists implementing `RandomAccess` (like `ArrayList`).\n• An overloaded version accepts a custom `java.util.Random` instance (`Collections.shuffle(list, rnd)`), which is useful for reproducible testing.\n\nWhy other options are incorrect:\n• `Collections.shuffle()` modifies the list IN PLACE; it does not return a new list instance (return type is `void`).\n• It works on any `List`, not only arrays of primitive integers."
  },
  {
    "id": 33,
    "category": "Collections",
    "question": "What is the root interface of the Java Collection hierarchy that enables the enhanced for-each loop syntax?",
    "options": [
      {
        "id": "A",
        "text": "`java.lang.Iterable`, which declares `iterator()` and is extended by `java.util.Collection`."
      },
      {
        "id": "B",
        "text": "`java.lang.Cloneable`, which guarantees that all collection implementations can produce deep element copies."
      },
      {
        "id": "C",
        "text": "`java.util.Collection`, which is the absolute root interface and contains no parent superinterfaces."
      },
      {
        "id": "D",
        "text": "`java.util.Enumeration`, which provides the underlying cursor mechanism for all modern collection classes."
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "Why this is correct:\n• `Collections.unmodifiableList(list)` returns an unmodifiable *view* wrapper around the underlying list. If the backing list is modified, those modifications are visible through the unmodifiable view!\n• `List.copyOf(list)` (introduced in Java 10) creates an independent, truly immutable copy. Changes to the original list have NO effect on the copied list.\n• Neither list allows mutations like `add()` or `set()`; doing so throws `UnsupportedOperationException`.\n\nWhy other options are incorrect:\n• `Collections.unmodifiableList()` is a view, not an independent deep clone.\n• Modifying an unmodifiable collection throws `UnsupportedOperationException`, never `ConcurrentModificationException`."
  },
  {
    "id": 34,
    "category": "Collections",
    "question": "Which THREE statements regarding unmodifiable collections and factory methods in Java 9+ are correct?",
    "options": [
      {
        "id": "A",
        "text": "Collections created via `List.of(...)` allow mutating elements in-place by providing custom `Comparator` sorting instances."
      },
      {
        "id": "B",
        "text": "`List.of(...)` returns an unmodifiable list that throws `UnsupportedOperationException` on any attempt to add or remove elements."
      },
      {
        "id": "C",
        "text": "`Collections.emptyList()` and `List.of()` return unmodifiable empty lists with zero memory allocation overhead."
      },
      {
        "id": "D",
        "text": "`Arrays.asList(...)` returns an unmodifiable list that prevents element replacement via index `set()` operations."
      },
      {
        "id": "E",
        "text": "`List.of(...)` and `List.copyOf(...)` strictly prohibit `null` elements and throw `NullPointerException` if null is passed."
      }
    ],
    "correct": [
      "B",
      "C",
      "E"
    ],
    "requiredCount": 3,
    "explanation": "Why this is correct:\n• `LinkedHashSet` maintains a doubly-linked list running through all of its entries, preserving predictable iteration order matching the insertion order of elements.\n• Like `HashSet`, it guarantees element uniqueness and provides $O(1)$ performance for basic operations (`add`, `contains`, `remove`), with only slight overhead for maintaining link pointers.\n\nWhy other options are incorrect:\n• `LinkedHashSet` preserves insertion order, NOT natural sorted order (natural sorting is provided by `TreeSet`).\n• It is not a synchronized collection; concurrent access requires external synchronization or `Collections.synchronizedSet()`."
  },
  {
    "id": 35,
    "category": "Collections",
    "question": "Which TWO statements correctly contrast `Comparable` and `Comparator`?",
    "options": [
      {
        "id": "A",
        "text": "`Comparator` defines external or alternative ordering strategies via `compare(o1, o2)` passed to sort methods."
      },
      {
        "id": "B",
        "text": "`Comparable` defines a class's natural ordering via `compareTo()` implemented directly by the domain class itself."
      },
      {
        "id": "C",
        "text": "`Comparable` can only be implemented by numeric classes; `Comparator` is used exclusively for sorting String objects."
      },
      {
        "id": "D",
        "text": "Implementing `Comparable` requires the class to override `hashCode()` and `equals()` with identical return values."
      }
    ],
    "correct": [
      "A",
      "B"
    ],
    "requiredCount": 2,
    "explanation": "Why this is correct:\n• `HashMap` is unsynchronized and allows one `null` key and multiple `null` values. It is not thread-safe.\n• `Hashtable` (legacy class since Java 1.0) synchronizes all public methods, making it thread-safe but suffering from heavy lock contention. It prohibits `null` keys and `null` values (throws `NullPointerException`).\n• In modern applications, `Hashtable` is considered obsolete; use `ConcurrentHashMap` for concurrent scenarios and `HashMap` for non-concurrent scenarios.\n\nWhy other options are incorrect:\n• `Hashtable` does NOT allow `null` keys or values.\n• `HashMap` does not maintain thread safety via optimistic locks; it is completely unsynchronized."
  },
  {
    "id": 36,
    "category": "Collections",
    "question": "What is the return type and behavior of `Collections.shuffle(List<?> list)`?",
    "options": [
      {
        "id": "A",
        "text": "It returns a `boolean` indicating whether the permutation succeeded without encountering thread concurrency locks."
      },
      {
        "id": "B",
        "text": "It returns `void` because it permutes elements in-place directly within the provided mutable list argument."
      },
      {
        "id": "C",
        "text": "It returns a new `List<?>` containing a randomly shuffled copy of the elements without mutating the original list."
      },
      {
        "id": "D",
        "text": "It returns a `Stream<?>` that yields randomly ordered elements lazily upon invoking a terminal collector."
      }
    ],
    "correct": [
      "B"
    ],
    "requiredCount": 1,
    "explanation": "Why this is correct:\n• Prior to Java 8, `ConcurrentHashMap` used Segment-based locking (ReentrantLock on 16 segment stripes).\n• In Java 8+, `ConcurrentHashMap` abandoned segments. It now uses a bucket array with:\n  1. Lock-free CAS (`compareAndSet`) for inserting the first node in an empty bucket.\n  2. Fine-grained `synchronized` locks on the specific bucket's head node when inserting into an occupied bucket.\n  3. Lock-free reads: reads use `volatile` node values and links, requiring no locks at all.\n\nWhy other options are incorrect:\n• `ConcurrentHashMap` does NOT lock the entire map with a single global lock; that would defeat concurrency.\n• It does not clone the entire array on every write (that is `CopyOnWriteArrayList`)."
  },
  {
    "id": 37,
    "category": "Collections",
    "question": "Which THREE statements correctly contrast `Collections.unmodifiableList(list)` and `List.copyOf(list)`?",
    "options": [
      {
        "id": "A",
        "text": "`Collections.unmodifiableList(list)` returns a read-only view that reflects subsequent mutations made to the underlying backing list."
      },
      {
        "id": "B",
        "text": "`List.copyOf(list)` creates an independent immutable snapshot that is completely isolated from subsequent backing list modifications."
      },
      {
        "id": "C",
        "text": "`List.copyOf(list)` returns a mutable collection copy that allows modifying elements via index `set()` invocations."
      },
      {
        "id": "D",
        "text": "`List.copyOf(list)` strictly rejects `null` elements in the source list and throws `NullPointerException` if any are present."
      },
      {
        "id": "E",
        "text": "`Collections.unmodifiableList(list)` performs a deep recursive clone of all elements contained within the source list."
      }
    ],
    "correct": [
      "A",
      "B",
      "D"
    ],
    "requiredCount": 3,
    "explanation": "Why this is correct:\n• In Java 8+, when the number of entries in a single hash bucket reaches the `TREEIFY_THRESHOLD` (default 8) and total map capacity reaches at least `MIN_TREEIFY_CAPACITY` (default 64), the bucket converts from a linked list to a balanced Red-Black tree (`TreeNode`).\n• This improves worst-case lookup from $O(n)$ down to $O(\\log n)$ in the event of poor hash distribution or malicious hash collision attacks.\n• If entries in a treeified bucket drop to `UNTREEIFY_THRESHOLD` (default 6) during deletion, it converts back to a linked list.\n\nWhy other options are incorrect:\n• Worst-case lookup without treeification is $O(n)$, not $O(1)$.\n• `HashMap` does not throw `HashCollisionException`; collisions are handled naturally by chaining and treeification."
  },
  {
    "id": 38,
    "category": "Collections",
    "question": "What is the structural and behavioral difference between `HashSet` and `LinkedHashSet`?",
    "options": [
      {
        "id": "A",
        "text": "`LinkedHashSet` uses intrinsic monitor locking on all methods for thread safety; `HashSet` is unsynchronized."
      },
      {
        "id": "B",
        "text": "`LinkedHashSet` forbids `null` elements to maintain list integrity; `HashSet` permits multiple `null` elements."
      },
      {
        "id": "C",
        "text": "`LinkedHashSet` maintains a doubly linked list running through all entries to preserve insertion order; `HashSet` provides no ordering."
      },
      {
        "id": "D",
        "text": "`LinkedHashSet` sorts elements in natural ascending order; `HashSet` preserves the exact sequence of element insertions."
      }
    ],
    "correct": [
      "C"
    ],
    "requiredCount": 1,
    "explanation": "Why this is correct:\n• `Deque` (Double Ended Queue) supports element insertion and removal at both ends. It can function as both a FIFO queue (`offer()`, `poll()`) and a LIFO stack (`push()`, `pop()`).\n• `ArrayDeque` is backed by a circular resizable array and is significantly faster and more cache-friendly than `Stack` or `LinkedList` for stack and queue operations.\n• `ArrayDeque` prohibits `null` elements (throws `NullPointerException`), whereas `LinkedList` permits `null`.\n\nWhy other options are incorrect:\n• `ArrayDeque` is NOT thread-safe; use `ConcurrentLinkedDeque` or `BlockingDeque` for concurrency.\n• `ArrayDeque` does NOT allow `null` elements."
  },
  {
    "id": 39,
    "category": "Collections",
    "question": "Which THREE architectural guidelines correctly inform the selection of `HashSet`, `LinkedHashSet`, or `TreeSet`?",
    "options": [
      {
        "id": "A",
        "text": "Choose `LinkedHashSet` when predictable insertion-order iteration is required, such as building LRU cache eviction queues."
      },
      {
        "id": "B",
        "text": "Choose `TreeSet` when elements must be sorted or queried using range operations (such as `subSet`, `headSet`, or `tailSet`)."
      },
      {
        "id": "C",
        "text": "Choose `TreeSet` for memory-constrained embedded environments because red-black trees consume less memory than hash tables."
      },
      {
        "id": "D",
        "text": "Choose `HashSet` whenever duplicate keys must be retained in the exact chronological sequence in which they were added."
      },
      {
        "id": "E",
        "text": "Choose `HashSet` when looking for maximum lookup, insertion, and deletion throughput and iteration order does not matter."
      }
    ],
    "correct": [
      "A",
      "B",
      "E"
    ],
    "requiredCount": 3,
    "explanation": "Why this is correct:\n• Fail-Fast Iterators (e.g. `ArrayList`, `HashMap`): Detect structural modifications during iteration via a private `modCount` counter. If `modCount` changes while iterating (other than via the iterator's own `remove()` method), the iterator immediately throws `ConcurrentModificationException`.\n• Fail-Safe / Weakly Consistent Iterators (e.g. `CopyOnWriteArrayList`, `ConcurrentHashMap`): Operate on an immutable snapshot or traverse the live collection without throwing `ConcurrentModificationException` if modifications occur during iteration.\n\nWhy other options are incorrect:\n• Fail-fast iterators do NOT acquire database row locks.\n• Fail-safe iterators do NOT roll back transactions; they simply avoid throwing exceptions upon structural mutation."
  },
  {
    "id": 40,
    "category": "Collections",
    "question": "Which statements accurately contrast `HashMap` and legacy `Hashtable`?",
    "options": [
      {
        "id": "A",
        "text": "`Hashtable` uses fine-grained lock striping across buckets; `HashMap` uses a single coarse monitor lock on the table array."
      },
      {
        "id": "B",
        "text": "`HashMap` guarantees consistent insertion-order iteration; `Hashtable` orders elements based on their internal hash codes."
      },
      {
        "id": "C",
        "text": "`Hashtable` is part of modern `java.util.concurrent`; `HashMap` is a deprecated legacy class retained for compatibility."
      },
      {
        "id": "D",
        "text": "`HashMap` is unsynchronized and permits one `null` key and multiple `null` values; `Hashtable` is synchronized and rejects all `null`s."
      }
    ],
    "correct": [
      "D"
    ],
    "requiredCount": 1,
    "explanation": "Why this is correct:\n• `EnumSet` is a specialized, high-performance `Set` implementation designed exclusively for `enum` types.\n• Internally, it is implemented as a bit vector: if the enum has $\\le 64$ elements, it uses a single `long` field (`RegularEnumSet`), where each bit represents the presence or absence of an enum constant!\n• Operations (`add`, `contains`, `remove`) are executed via bitwise operations (`AND`, `OR`, `XOR`), resulting in blazing fast performance with minimal memory overhead.\n\nWhy other options are incorrect:\n• `EnumSet` does NOT use an internal hash table with open addressing.\n• `EnumSet` prohibits `null` elements (throws `NullPointerException`)."
  },
  {
    "id": 41,
    "category": "Collections",
    "question": "Which THREE statements correctly contrast `ConcurrentHashMap`, `Collections.synchronizedMap`, and `Hashtable`?",
    "options": [
      {
        "id": "A",
        "text": "Iterators in `ConcurrentHashMap` are weakly consistent, reflecting map state at or since creation without throwing `ConcurrentModificationException`."
      },
      {
        "id": "B",
        "text": "`ConcurrentHashMap` permits `null` keys and `null` values to maintain compatibility with standard `HashMap` semantics."
      },
      {
        "id": "C",
        "text": "`ConcurrentHashMap` uses lock-free CAS and bucket-level locking, avoiding whole-map locks during concurrent reads and writes."
      },
      {
        "id": "D",
        "text": "`Collections.synchronizedMap` provides lock-free non-blocking read access by utilizing copy-on-write table arrays."
      },
      {
        "id": "E",
        "text": "`Collections.synchronizedMap` and `Hashtable` lock the entire backing map object on every method invocation via a single monitor."
      }
    ],
    "correct": [
      "A",
      "C",
      "E"
    ],
    "requiredCount": 3,
    "explanation": "Why this is correct:\n• Process: An independent executing program with its own isolated address space and private system resources. Communication between processes requires Inter-Process Communication (IPC, e.g. sockets, pipes).\n• Thread: A lightweight unit of execution within a process. Multiple threads within the same process share the same memory heap and open resources, but each thread maintains its own private call stack and program counter (PC).\n• Context switching between threads is faster than switching between processes due to shared memory spaces.\n\nWhy other options are incorrect:\n• Threads do NOT have isolated private heaps; all threads in a JVM process share the exact same heap.\n• Processes do not share CPU registers across operating system boundaries without virtualization."
  },
  {
    "id": 42,
    "category": "Collections",
    "question": "Which TWO statements describe how concurrency and synchronization are implemented in `ConcurrentHashMap` (Java 8+)?",
    "options": [
      {
        "id": "A",
        "text": "It creates a full copy-on-write clone of the entire internal node table array on every put, replace, and delete invocation."
      },
      {
        "id": "B",
        "text": "It synchronizes exclusively on the first head node of an occupied bin during contended hash bucket insertion and update operations."
      },
      {
        "id": "C",
        "text": "It uses lock-free atomic CAS instructions to populate empty bucket bins without acquiring intrinsic monitor locks."
      },
      {
        "id": "D",
        "text": "It partitions the hash table into sixteen fixed `Segment` arrays, where each segment acquires an independent `ReentrantLock`."
      }
    ],
    "correct": [
      "B",
      "C"
    ],
    "requiredCount": 2,
    "explanation": "Why this is correct:\n• A Deadlock occurs when two or more threads are permanently blocked, each waiting for a lock held by the other.\n• Coffman Conditions (all 4 must hold simultaneously for a deadlock to occur):\n  1. Mutual Exclusion: At least one resource must be held in a non-shareable mode.\n  2. Hold and Wait: A thread holds a resource while requesting additional resources.\n  3. No Preemption: Resources cannot be forcibly confiscated from threads.\n  4. Circular Wait: A closed chain of threads exists where each waits for a resource held by the next.\n• Breaking circular wait (e.g. acquiring locks in a strict global order) prevents deadlocks.\n\nWhy other options are incorrect:\n• Deadlocks can occur with just 2 threads and 2 locks; 16 threads are not required.\n• Virtual threads do not eliminate deadlocks caused by synchronized monitors or lock ordering."
  },
  {
    "id": 43,
    "category": "Collections",
    "question": "What are the average and worst-case time complexities of `HashMap.get(key)` in Java 8+?",
    "options": [
      {
        "id": "A",
        "text": "Average time complexity is O(1); worst-case is O(log n) due to bucket treeification when many keys collide in a single bin."
      },
      {
        "id": "B",
        "text": "Average time complexity is O(1); worst-case is strictly O(1) guaranteed by cryptographic murmur hashing algorithms."
      },
      {
        "id": "C",
        "text": "Average time complexity is O(n); worst-case is O(n^2) when hash codes are distributed uniformly across all buckets."
      },
      {
        "id": "D",
        "text": "Average time complexity is O(log n); worst-case is O(n) because of dynamic array resizing and rehashing overhead."
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "Why this is correct:\n• The expression `i++` (post-increment) is NOT an atomic operation.\n• At the bytecode level, it consists of three separate instructions:\n  1. `iload`: Read current value of `i` from memory into local operand stack.\n  2. `iadd`: Add 1 to the value.\n  3. `istore`: Write the incremented value back to memory.\n• If two threads execute `i++` concurrently, their read-modify-write sequences can interleave, causing lost updates (race condition).\n• Declaring `volatile int i` ensures visibility, but does NOT make `i++` atomic! Use `AtomicInteger.incrementAndGet()` or `synchronized`.\n\nWhy other options are incorrect:\n• `i++` is not atomic in 64-bit JVMs.\n• `volatile` alone does not make compound operations atomic."
  },
  {
    "id": 44,
    "category": "Collections",
    "question": "What are the characteristics and primary implementations of the `Deque` interface in Java?",
    "options": [
      {
        "id": "A",
        "text": "`Deque` is an immutable sorted collection; standard implementations include `TreeDeque` and `ConcurrentSkipListDeque`."
      },
      {
        "id": "B",
        "text": "`Deque` is a double-ended queue supporting insertion/removal at both ends; standard implementations include `ArrayDeque` and `LinkedList`."
      },
      {
        "id": "C",
        "text": "`Deque` is a blocking-only concurrency interface designed exclusively for thread-to-thread message exchange in executors."
      },
      {
        "id": "D",
        "text": "`Deque` requires elements to implement `Comparable` and is implemented solely by the legacy `java.util.Stack` class."
      }
    ],
    "correct": [
      "B"
    ],
    "requiredCount": 1,
    "explanation": "Why this is correct:\n• `Runnable`: Found in `java.lang`. Its method `public void run()` takes no arguments, returns no result (`void`), and cannot throw checked exceptions.\n• `Callable<V>`: Introduced in Java 5 in `java.util.concurrent`. Its method `V call() throws Exception` returns a parameterized result of type `V` and can throw checked exceptions.\n• `ExecutorService.submit()` can accept both, returning a `Future<V>` to track completion.\n\nWhy other options are incorrect:\n• `Callable` is in `java.util.concurrent`, not `java.lang`.\n• `Runnable` cannot return values directly or declare checked exceptions."
  },
  {
    "id": 45,
    "category": "Collections",
    "question": "What is fail-fast behavior in Java collection iterators, and what exception does it trigger?",
    "options": [
      {
        "id": "A",
        "text": "Iterators immediately discard elements that do not match a predicate filter, throwing `NoSuchElementException` on next."
      },
      {
        "id": "B",
        "text": "Iterators acquire an exclusive monitor lock on the collection and terminate the JVM if an unhandled exception occurs."
      },
      {
        "id": "C",
        "text": "Iterators detect structural modification during traversal using internal modification counters and throw `ConcurrentModificationException`."
      },
      {
        "id": "D",
        "text": "Iterators block the calling thread until all concurrent modifying threads complete their database transactions."
      }
    ],
    "correct": [
      "C"
    ],
    "requiredCount": 1,
    "explanation": "Why this is correct:\n• `ExecutorService` decouples task submission from execution mechanics, managing a pool of worker threads.\n• Fixed vs Cached Pools: `newFixedThreadPool(n)` maintains a fixed number of threads, whereas `newCachedThreadPool()` creates new threads as needed and reclaims idle threads.\n• Shutdown lifecycle: `shutdown()` initiates an orderly shutdown allowing previously submitted tasks to complete before terminating. `shutdownNow()` attempts to stop actively executing tasks via thread interruption (`Thread.interrupt()`) and returns unexecuted tasks.\n\nWhy other options are incorrect:\n• `shutdownNow()` does NOT wait indefinitely for tasks to complete; it immediately attempts cancellation via interruption.\n• Thread pools are not garbage collected immediately upon task completion; they must be explicitly shut down."
  },
  {
    "id": 46,
    "category": "Collections",
    "question": "Which THREE statements accurately contrast Java native arrays and `ArrayList`?",
    "options": [
      {
        "id": "A",
        "text": "Arrays provide built-in type-safe resizing methods; `ArrayList` requires manual array allocation to expand capacity."
      },
      {
        "id": "B",
        "text": "Arrays can store both primitive types and object references directly; `ArrayList` can store only object references (primitives are autoboxed)."
      },
      {
        "id": "C",
        "text": "Arrays have a fixed size established at instantiation; `ArrayList` dynamically resizes its backing array as elements are added."
      },
      {
        "id": "D",
        "text": "Arrays implement `Collection` and `Iterable`, allowing native array instances to invoke stream collectors directly."
      },
      {
        "id": "E",
        "text": "Arrays support covariant typing (`String[]` can be assigned to `Object[]`), whereas generic `ArrayList<String>` is invariant."
      }
    ],
    "correct": [
      "B",
      "C",
      "E"
    ],
    "requiredCount": 3,
    "explanation": "Why this is correct:\n• `map(Function<T, R>)`: Transforms each element of type `T` into a single value of type `R` (one-to-one mapping). For a stream of size $N$, `map()` yields a stream of size $N$.\n• `flatMap(Function<T, Stream<R>>)`: Transforms each element into a stream of values, then flattens all generated streams into a single composite stream (one-to-many mapping).\n• Example: Given a list of sentences, `map(s -> s.split(\" \"))` yields `Stream<String[]>`, whereas `flatMap(s -> Arrays.stream(s.split(\" \")))` yields `Stream<String>`.\n\nWhy other options are incorrect:\n• `flatMap()` does not execute operations across multiple worker threads asynchronously; parallel execution requires `parallelStream()`.\n• `map()` does not drop null values automatically; it processes nulls like any other element."
  },
  {
    "id": 47,
    "category": "Collections",
    "question": "What is the role of `Map` in Java, and why is it distinct from `Collection`?",
    "options": [
      {
        "id": "A",
        "text": "`Map` stores data exclusively in disk-backed hash files, whereas `Collection` stores data exclusively in JVM RAM."
      },
      {
        "id": "B",
        "text": "`Map` can only be traversed using legacy `Enumeration` cursors rather than modern iterator or stream pipelines."
      },
      {
        "id": "C",
        "text": "`Map` is an implementation class of `Collection` that restricts keys and values to identical generic types."
      },
      {
        "id": "D",
        "text": "`Map` represents key-value associations where keys are unique, and its dual-value design does not conform to the single-element `Collection` contract."
      }
    ],
    "correct": [
      "D"
    ],
    "requiredCount": 1,
    "explanation": "Why this is correct:\n• `parallelStream()` splits data using a `Spliterator` and processes chunks concurrently using the common `ForkJoinPool.commonPool()`.\n• Not always faster: for small collections, the overhead of task decomposition, thread coordination, and context switching often outweighs sequential execution.\n• Side-effects and shared state: Operations must be stateless and thread-safe. Modifying shared mutable collections (like adding to an unsynchronized `ArrayList`) inside a parallel stream leads to data corruption.\n• Blocking I/O danger: Performing blocking network or database I/O inside a parallel stream starves the shared `ForkJoinPool`, degrading application-wide throughput.\n\nWhy other options are incorrect:\n• Parallel streams do NOT guarantee that element processing order matches original collection encounter order.\n• Parallel streams do not eliminate all concurrency bugs or lock contention."
  },
  {
    "id": 48,
    "category": "Concurrency",
    "question": "Which THREE statements accurately contrast an operating system process and a Java thread?",
    "options": [
      {
        "id": "A",
        "text": "Threads never share memory, which prevents data races and eliminates the possibility of deadlocks in multi-threaded programs."
      },
      {
        "id": "B",
        "text": "Context switching between threads within the same process is generally faster and less resource-intensive than inter-process switching."
      },
      {
        "id": "C",
        "text": "A process possesses its own isolated virtual address space; threads within the same process share heap memory and resources."
      },
      {
        "id": "D",
        "text": "Each Java thread has its own private call stack to manage local variables, partial results, and method invocation frames."
      },
      {
        "id": "E",
        "text": "Terminating a thread immediately destroys the parent process and releases all operating system file descriptor handles."
      }
    ],
    "correct": [
      "B",
      "C",
      "D"
    ],
    "requiredCount": 3,
    "explanation": "Why this is correct:\n• `Optional<T>` was introduced in Java 8 to represent the presence or absence of a value, primarily as a method return type to eliminate `null` returns and prevent `NullPointerException`.\n• Idiomatic usage favors functional methods: `orElse()`, `orElseGet(() -> computeDefault())`, `orElseThrow()`, `map()`, and `filter()`.\n• Anti-patterns: Calling `opt.get()` without checking `opt.isPresent()` defeats the purpose of `Optional` and throws `NoSuchElementException`.\n• `Optional` is NOT `Serializable`, so it should not be used as field types in serializable entity classes or method parameter types.\n\nWhy other options are incorrect:\n• `Optional.of(null)` throws `NullPointerException` immediately! To accept null, use `Optional.ofNullable(null)`.\n• Using `Optional` for method arguments is discouraged as it clutters client call sites."
  },
  {
    "id": 49,
    "category": "Concurrency",
    "question": "Which THREE of the four Coffman conditions are required for a thread deadlock to occur in a concurrent Java program?",
    "options": [
      {
        "id": "A",
        "text": "Forced Preemption: the operating system forcibly reclaims resources held by threads whenever contention is detected."
      },
      {
        "id": "B",
        "text": "Active Livelock: all threads continuously modify their internal states in response to each other without blocking."
      },
      {
        "id": "C",
        "text": "Circular Wait: a closed chain of threads exists such that each thread holds a resource needed by the subsequent thread."
      },
      {
        "id": "D",
        "text": "Mutual Exclusion: at least one shared resource must be held in a non-shareable mode by an active thread."
      },
      {
        "id": "E",
        "text": "Hold and Wait: a thread currently holding at least one resource must be waiting to acquire additional busy resources."
      }
    ],
    "correct": [
      "C",
      "D",
      "E"
    ],
    "requiredCount": 3,
    "explanation": "Why this is correct:\n• Java Records (finalized in Java 16) provide a compact syntax for declaring immutable data carriers: `record Point(int x, int y) {}`.\n• The compiler automatically generates: `private final` fields, canonical constructor, public accessors (`x()`, `y()`, not `getX()`), `equals()`, `hashCode()`, and `toString()`.\n• Records are implicitly `final` and cannot extend other classes (they implicitly extend `java.lang.Record`), but they can implement interfaces.\n\nWhy other options are incorrect:\n• Record accessor methods do NOT follow the JavaBeans prefix `get`: they match the component name directly (e.g. `point.x()`, NOT `point.getX()`).\n• Records cannot be extended by subclasses because they are final."
  },
  {
    "id": 50,
    "category": "Concurrency",
    "question": "Why is the post-increment operation `count++` not thread-safe on a shared integer variable?",
    "options": [
      {
        "id": "A",
        "text": "It consists of three separate operations (read, modify, write) that can be interleaved by other threads, leading to lost updates."
      },
      {
        "id": "B",
        "text": "The compiler automatically caches incremented variables in local CPU registers and never writes them back to main memory."
      },
      {
        "id": "C",
        "text": "Integer primitive types in Java do not support two's complement arithmetic when modified concurrently across threads."
      },
      {
        "id": "D",
        "text": "The JVM converts the increment instruction into a hardware floating-point instruction that disables atomic memory synchronization."
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "Why this is correct:\n• Sealed Classes (finalized in Java 17) allow a class or interface to explicitly restrict which other classes or interfaces may extend or implement it.\n• Syntax: `sealed class Shape permits Circle, Rectangle, Triangle {}`.\n• Subclasses declared in the `permits` clause must reside in the same package (or module) and must explicitly declare one of three modifiers: `final`, `sealed`, or `non-sealed`.\n• Exhaustive Pattern Matching: The compiler can verify whether all permitted subclasses are covered in a `switch` expression, eliminating the need for a fallback `default` branch!\n\nWhy other options are incorrect:\n• Permitted subclasses are NOT required to be declared within the exact same source file (unless they are nested); they can be separate top-level classes in the same package.\n• Permitted subclasses cannot leave their inheritance status open without declaring `final`, `sealed`, or `non-sealed`."
  },
  {
    "id": 51,
    "category": "Concurrency",
    "question": "Which TWO statements correctly describe the concept and attributes of thread safety in Java?",
    "options": [
      {
        "id": "A",
        "text": "A class is guaranteed thread-safe if all of its instance methods execute asynchronously on background daemon threads."
      },
      {
        "id": "B",
        "text": "Thread safety can be established via immutability, thread confinement, explicit locks, or non-blocking atomic classes."
      },
      {
        "id": "C",
        "text": "A class is thread-safe if it behaves correctly when accessed by concurrent threads without extra caller synchronization."
      },
      {
        "id": "D",
        "text": "Thread safety requires that all class fields be declared `volatile` and accessed exclusively through static methods."
      }
    ],
    "correct": [
      "B",
      "C"
    ],
    "requiredCount": 2,
    "explanation": "Why this is correct:\n• Thread Safety Definition: A class is thread-safe if it continues to behave correctly (maintaining internal state invariants and satisfying its specification) when accessed concurrently by multiple threads, without requiring additional synchronization by callers.\n• Strategies to Achieve Thread Safety:\n  1. Immutability (e.g. `String`, records): Immutable objects have no mutable state, making them inherently thread-safe.\n  2. Thread Confinement (e.g. `ThreadLocal`): Confining state to a single thread eliminates shared state.\n  3. Mutual Exclusion Locks (e.g. `synchronized`, `ReentrantLock`): Synchronizing access ensures only one thread mutates state at a time.\n  4. Non-blocking Atomics (e.g. `AtomicInteger`, `VarHandle`): Utilizing hardware CAS (Compare-And-Swap) for lock-free thread safety.\n\nWhy other options are incorrect:\n• Running on daemon threads does NOT make code thread-safe; multiple daemon threads can still corrupt shared state concurrently.\n• Declaring fields `volatile` and using static methods does NOT ensure thread safety for compound actions (like read-modify-write); `volatile` provides visibility and ordering, but not mutual exclusion."
  },
  {
    "id": 52,
    "category": "Concurrency",
    "question": "Which THREE approaches can be used to execute concurrent units of work in Java?",
    "options": [
      {
        "id": "A",
        "text": "Annotating a private helper method with `@Async` without configuring a Spring task executor bean."
      },
      {
        "id": "B",
        "text": "Invoking `start()` on a `Thread` instance to create and register a new native OS thread with the scheduler."
      },
      {
        "id": "C",
        "text": "Subclassing `Thread`, overriding its `run()` method, and invoking `start()` on the resulting instance."
      },
      {
        "id": "D",
        "text": "Submitting a `Runnable` or `Callable` task to an `ExecutorService` thread pool for managed execution."
      },
      {
        "id": "E",
        "text": "Invoking `run()` directly on a `Runnable` instance to launch a separate background OS worker thread."
      }
    ],
    "correct": [
      "B",
      "C",
      "D"
    ],
    "requiredCount": 3,
    "explanation": "Why this is correct:\n• `Thread.start()`: Allocates native OS thread resources, registers the thread with the OS scheduler, and causes the JVM to invoke the thread's `run()` method asynchronously on a new call stack.\n• `ExecutorService.submit()` / `execute()`: Submits tasks (`Runnable` or `Callable`) to a managed thread pool, decoupling task submission from thread lifecycle and execution.\n• Subclassing `Thread` and overriding `run()`: The classic object-oriented approach where `start()` launches the new thread.\n\nWhy other options are incorrect:\n• Calling `run()` directly does NOT create or launch a new thread; it simply executes the code synchronously within the caller's existing thread on the current call stack!\n• Annotating a method with `@Async` requires enabling asynchronous processing via `@EnableAsync` and having a configured `TaskExecutor` bean; without it, the annotation is either ignored or fails."
  },
  {
    "id": 53,
    "category": "Concurrency",
    "question": "Which TWO motivations justify using thread pools (`ExecutorService`) instead of creating unmanaged `Thread` instances?",
    "options": [
      {
        "id": "A",
        "text": "To reuse existing worker threads, avoiding the steep operating system allocation and teardown costs of native threads."
      },
      {
        "id": "B",
        "text": "To eliminate the possibility of thread race conditions on shared unsynchronized mutable heap variables."
      },
      {
        "id": "C",
        "text": "To guarantee that all submitted tasks run with elevated operating system kernel priorities across CPU cores."
      },
      {
        "id": "D",
        "text": "To bound concurrent resource consumption, preventing `OutOfMemoryError` caused by uncontrolled thread creation."
      }
    ],
    "correct": [
      "A",
      "D"
    ],
    "requiredCount": 2,
    "explanation": "Why this is correct:\n• Worker Thread Reuse: Creating a native OS thread is an expensive operation involving kernel-level allocations, page table creation, and allocating call stack memory (~1MB default). Reusing worker threads amortizes this allocation overhead.\n• Resource Bounding: Unbounded thread spawning (`new Thread()`) during traffic spikes quickly exhausts system memory, leading to `java.lang.OutOfMemoryError: unable to create new native thread`. Thread pools bound maximum concurrent threads and queue pending tasks.\n\nWhy other options are incorrect:\n• Thread pools do NOT elevate operating system kernel priorities across CPU cores.\n• Thread pools do NOT eliminate race conditions on shared mutable heap variables; tasks executed by thread pools still require proper synchronization or atomic variables if they access shared state."
  },
  {
    "id": 54,
    "category": "Concurrency",
    "question": "Which TWO statements correctly contrast `java.lang.Runnable` and `java.util.concurrent.Callable`?",
    "options": [
      {
        "id": "A",
        "text": "`Runnable` can only be executed by raw `Thread` instances; `Callable` can only be invoked within Spring transactions."
      },
      {
        "id": "B",
        "text": "`Callable.call()` can throw checked exceptions directly, whereas `Runnable.run()` cannot declare checked exceptions."
      },
      {
        "id": "C",
        "text": "`Runnable.run()` returns `void`, whereas `Callable.call()` returns a parameterized generic result value `V`."
      },
      {
        "id": "D",
        "text": "`Runnable` tasks execute asynchronously on background threads; `Callable` tasks execute strictly on the caller thread."
      }
    ],
    "correct": [
      "B",
      "C"
    ],
    "requiredCount": 2,
    "explanation": "Why this is correct:\n• Return Type: `Runnable.run()` has a `void` return type, whereas `Callable.call()` is parameterized as `Callable<V>` and returns a computed value of type `V`.\n• Exception Handling: `Runnable.run()` signature does not declare any checked exceptions (any checked exception must be caught internally). `Callable.call()` declares `throws Exception`, allowing checked exceptions to propagate to the caller (wrapped in an `ExecutionException` via `Future.get()`).\n\nWhy other options are incorrect:\n• `Runnable` can be executed by `ExecutorService` (via `executor.submit(runnable)`), not only by raw `Thread` instances.\n• Both `Runnable` and `Callable` can be executed asynchronously across background worker threads in an executor pool."
  },
  {
    "id": 55,
    "category": "Streams & Functional",
    "question": "What defines a Java Stream (`java.util.stream.Stream`) as introduced in Java 8?",
    "options": [
      {
        "id": "A",
        "text": "An asynchronous I/O channel designed exclusively for streaming binary network packets across sockets."
      },
      {
        "id": "B",
        "text": "A sequence of elements supporting sequential and parallel aggregate operations that does not store data itself."
      },
      {
        "id": "C",
        "text": "A persistent database transaction cursor that automatically synchronizes entity changes with SQL tables."
      },
      {
        "id": "D",
        "text": "A specialized high-throughput concurrent collection that replaces `Vector` and `CopyOnWriteArrayList`."
      }
    ],
    "correct": [
      "B"
    ],
    "requiredCount": 1,
    "explanation": "Why this is correct:\n• A Java Stream (`java.util.stream.Stream`) is a sequence of elements supporting aggregate operations (filter, map, reduce, sort) evaluated sequentially or in parallel.\n• Key stream properties:\n  1. No storage: A stream does not hold data; it conveys elements from a source (collection, array, generator, I/O).\n  2. Functional nature: Operations produce a result without mutating the underlying data source.\n  3. Laziness: Intermediate operations (`filter`, `map`) are lazy; computation only happens when a terminal operation (`collect`, `count`, `forEach`) is invoked.\n  4. Single-use: A stream cannot be reused once consumed; calling another terminal operation throws `IllegalStateException`.\n\nWhy other options are incorrect:\n• A Stream is NOT a collection and cannot replace `Vector` or `CopyOnWriteArrayList`.\n• It is not a binary network socket channel (which is `java.nio.channels.SocketChannel`).\n• It is not a database transaction cursor."
  },
  {
    "id": 56,
    "category": "Streams & Functional",
    "question": "Which TWO statements accurately contrast `Stream.map()` and `Stream.flatMap()`?",
    "options": [
      {
        "id": "A",
        "text": "`map` produces a one-to-one mapping, transforming each stream element into a single output value."
      },
      {
        "id": "B",
        "text": "`map` executes sequentially on the caller thread; `flatMap` executes concurrently across the `ForkJoinPool`."
      },
      {
        "id": "C",
        "text": "`map` filters out null elements automatically; `flatMap` throws a runtime `NullPointerException` on empty collections."
      },
      {
        "id": "D",
        "text": "`flatMap` produces a one-to-many mapping, transforming each element into a stream and flattening the results."
      }
    ],
    "correct": [
      "A",
      "D"
    ],
    "requiredCount": 2,
    "explanation": "Why this is correct:\n• `map(Function<T, R>)`: Performs a one-to-one transformation. For each element of type `T`, it returns exactly one element of type `R`. The resulting stream has the exact same count of elements as the input stream.\n• `flatMap(Function<T, Stream<R>>)`: Performs a one-to-many transformation. Each element is mapped to an intermediate stream of elements, and all intermediate streams are flattened into a single unified stream of type `R`.\n\nWhy other options are incorrect:\n• `map` and `flatMap` both evaluate in whatever mode the stream pipeline is configured in (sequential or parallel); `flatMap` does not automatically spawn threads in the `ForkJoinPool`.\n• `map` does not automatically drop nulls; it passes nulls through to downstream operations."
  },
  {
    "id": 57,
    "category": "Streams & Functional",
    "question": "Which TWO statements describe the appropriate use and caveats of `parallelStream()`?",
    "options": [
      {
        "id": "A",
        "text": "It automatically synchronizes access to shared mutable collection accumulators used inside stream lambda operations."
      },
      {
        "id": "B",
        "text": "It is always faster than a sequential stream regardless of dataset size or underlying collection splittability."
      },
      {
        "id": "C",
        "text": "It executes tasks across the common shared `ForkJoinPool`, meaning blocking I/O inside the pipeline can starve other workloads."
      },
      {
        "id": "D",
        "text": "It benefits CPU-intensive workloads operating on large, easily splittable in-memory data structures like arrays or `ArrayList`."
      }
    ],
    "correct": [
      "C",
      "D"
    ],
    "requiredCount": 2,
    "explanation": "Why this is correct:\n• `parallelStream()` partitions the data source and distributes chunks across the JVM-wide `ForkJoinPool.commonPool()`.\n• Parallelism Overhead: For small data sets or lightweight operations, the overhead of splitting tasks, managing thread queues, and merging results makes parallel streams slower than sequential streams.\n• Thread-Safety Trap: Stream operations must be stateless and free of side-effects. Modifying shared state (e.g. `list.parallelStream().forEach(unsharedList::add)`) causes race conditions and lost updates.\n\nWhy other options are incorrect:\n• Parallel streams do NOT guarantee preservation of encounter order during processing (though order-preserving collectors like `toList()` can reconstruct order at the end).\n• Parallel streams do not eliminate synchronization bugs when accessing shared mutable data."
  },
  {
    "id": 58,
    "category": "Streams & Functional",
    "question": "Which THREE architectural benefits arise from adopting immutability and functional programming patterns in Java?",
    "options": [
      {
        "id": "A",
        "text": "Pure functions with no side effects make software easier to reason about, refactor, and verify with automated unit tests."
      },
      {
        "id": "B",
        "text": "Immutable instances can be safely shared across concurrent threads and cached globally without making defensive copies."
      },
      {
        "id": "C",
        "text": "Immutable objects eliminate shared mutable state, preventing data races without requiring explicit lock synchronization."
      },
      {
        "id": "D",
        "text": "Immutable objects bypass JVM garbage collection entirely by pinning memory blocks directly into CPU register caches."
      },
      {
        "id": "E",
        "text": "Functional stream pipelines guarantee zero runtime memory allocation overhead regardless of collection sizes."
      }
    ],
    "correct": [
      "A",
      "B",
      "C"
    ],
    "requiredCount": 3,
    "explanation": "Why this is correct:\n• Inherent Thread Safety: Immutable objects can be shared freely across threads without synchronization, locks, or defensive copying, eliminating data races.\n• Freedom from Side-Effects: Pure functional operations take inputs and return new values without altering external state, making system behavior deterministic and easier to reason about.\n• Cacheability & Idempotence: Function results can be safely memoized and reused because identical inputs always yield identical outputs.\n\nWhy other options are incorrect:\n• Immutability does not eliminate garbage collection; creating new objects during functional transformations allocates heap memory that will eventually need to be collected.\n• Immutability does not allow the compiler to bypass all CPU L1 caches; cache hierarchies are managed at the CPU hardware level."
  },
  {
    "id": 59,
    "category": "JVM & GC",
    "question": "Which TWO statements correctly describe the JVM Heap memory space?",
    "options": [
      {
        "id": "A",
        "text": "Local primitive variables declared inside method bodies are allocated directly on the young generation heap."
      },
      {
        "id": "B",
        "text": "Heap memory size is configured using the `-Xss` command-line flag during Java Virtual Machine startup."
      },
      {
        "id": "C",
        "text": "It is the runtime data area shared by all application threads where all class instances and arrays are allocated."
      },
      {
        "id": "D",
        "text": "Memory allocated on the heap is reclaimed automatically by the garbage collector according to object reachability."
      }
    ],
    "correct": [
      "C",
      "D"
    ],
    "requiredCount": 2,
    "explanation": "Why this is correct:\n• Shared JVM-Wide: The Java Heap is created upon JVM startup and is shared across all executing threads. It is the runtime data area from which memory for all class instances and arrays is allocated.\n• Garbage Collection: Memory management in the Heap is automated by the Garbage Collector. Objects are allocated on the heap (often in the Young Generation / Eden space) and reclaimed when no longer reachable from GC roots.\n\nWhy other options are incorrect:\n• Heap memory is NOT private to a single thread; it is shared across all threads.\n• The default size is not fixed at 64KB, and it does not store local primitive variables (local variables live on the thread call stack)."
  },
  {
    "id": 60,
    "category": "JVM & GC",
    "question": "Which TWO statements accurately describe the Java Stack memory region?",
    "options": [
      {
        "id": "A",
        "text": "When a method returns, its allocated stack frame is retained until cleared by the generational garbage collector."
      },
      {
        "id": "B",
        "text": "Stack memory is shared across all concurrent threads to facilitate high-speed inter-thread communication."
      },
      {
        "id": "C",
        "text": "Stack frames store local primitive variables, partial results, and reference handles pointing to heap objects."
      },
      {
        "id": "D",
        "text": "Each Java thread possesses its own private stack that allocates a new frame for every method invocation."
      }
    ],
    "correct": [
      "C",
      "D"
    ],
    "requiredCount": 2,
    "explanation": "Why this is correct:\n• Thread-Private: Each Java thread possesses its own private call stack created when the thread starts. Stack memory is completely isolated from other threads.\n• Fast LIFO Allocation: Stack frames are allocated and deallocated automatically as methods are called and return (Last-In, First-Out). Stack frames store method-local primitive variables, object reference pointers, and partial results.\n• Size Configuration: Thread stack size is controlled via the `-Xss` JVM flag (e.g., `-Xss1m`).\n\nWhy other options are incorrect:\n• The stack is NOT shared globally across all threads.\n• Heap objects are NOT allocated on the thread stack; only the reference pointer to the heap object resides on the stack frame."
  },
  {
    "id": 61,
    "category": "JVM & GC",
    "question": "Which THREE statements accurately contrast Java Heap memory and Java Stack memory?",
    "options": [
      {
        "id": "A",
        "text": "Heap stores all class instances and arrays; Stack stores method frames, local primitives, and reference pointers."
      },
      {
        "id": "B",
        "text": "Heap objects are deallocated by the garbage collector; Stack frames are popped and reclaimed immediately upon method return."
      },
      {
        "id": "C",
        "text": "Heap memory is shared among all threads in the JVM; Stack memory is private to each individual thread."
      },
      {
        "id": "D",
        "text": "Heap memory allocation is configured via `-Xss`; Stack memory allocation is configured via the `-Xmx` startup flag."
      },
      {
        "id": "E",
        "text": "Stack memory access is managed by the generational garbage collector using Mark-Sweep-Compact algorithms."
      }
    ],
    "correct": [
      "A",
      "B",
      "C"
    ],
    "requiredCount": 3,
    "explanation": "Why this is correct:\n• Lifetime: Stack memory allocations are tied to method invocation lifetimes and freed automatically upon method return. Heap memory allocations persist until reclaimed by the Garbage Collector.\n• Concurrency: The Heap is shared among all threads, requiring synchronization for shared mutable state. Stack memory is thread-confined, making local variables inherently thread-safe.\n• Failure Modes: Stack exhaustion (e.g., deep recursion) throws `StackOverflowError`. Heap exhaustion (allocating objects beyond available heap capacity) throws `OutOfMemoryError: Java heap space`.\n\nWhy other options are incorrect:\n• Stack frames are NOT garbage collected by CMS or G1; they are pushed and popped via CPU stack pointer manipulation.\n• Primitive types declared as instance fields reside inside the object on the Heap, not on the Stack."
  },
  {
    "id": 62,
    "category": "JVM & GC",
    "question": "Which TWO conditions govern when an object on the Java heap becomes eligible for garbage collection?",
    "options": [
      {
        "id": "A",
        "text": "When the object is no longer reachable from any active GC root via an unbroken chain of strong references."
      },
      {
        "id": "B",
        "text": "Immediately when an object's internal state fields are assigned to `null` or when its constructor finishes."
      },
      {
        "id": "C",
        "text": "When an object's identity hash code integer value is reset to zero by the Just-In-Time bytecode compiler."
      },
      {
        "id": "D",
        "text": "Isolated islands of unreachable objects that reference each other in cycles are eligible for collection."
      }
    ],
    "correct": [
      "A",
      "D"
    ],
    "requiredCount": 2,
    "explanation": "Why this is correct:\n• Reachability from GC Roots: An object becomes eligible for garbage collection when it is no longer reachable through any chain of strong references originating from GC Roots (active thread stacks, local variables, static fields, JNI handles).\n• Cyclic References Handled: Java GC uses tracing collectors (mark-and-sweep, copying, compacting), NOT reference counting. An isolated island of objects that reference each other but are disconnected from GC roots is recognized as unreachable and collected.\n\nWhy other options are incorrect:\n• Objects are NOT collected immediately when their reference count reaches zero; modern JVMs do not use reference counting.\n• Exiting a method does not automatically collect heap objects if references to those objects were returned, stored in fields, or passed to other threads."
  },
  {
    "id": 63,
    "category": "JVM & GC",
    "question": "Can an application explicitly force the JVM Garbage Collector to run?",
    "options": [
      {
        "id": "A",
        "text": "Yes, calling `Runtime.getRuntime().freeMemory()` forces the JVM to collect all unreachable young generation objects."
      },
      {
        "id": "B",
        "text": "Yes, `System.gc()` guarantees an immediate synchronous Stop-The-World full garbage collection before returning."
      },
      {
        "id": "C",
        "text": "No, `System.gc()` is merely an advisory hint; the JVM is free to ignore the request and timing remains non-deterministic."
      },
      {
        "id": "D",
        "text": "No, because the garbage collector only runs when an application explicitly encounters an `OutOfMemoryError`."
      }
    ],
    "correct": [
      "C"
    ],
    "requiredCount": 1,
    "explanation": "Why this is correct:\n• Calling `System.gc()` or `Runtime.getRuntime().gc()` merely sends a suggestion or hint to the JVM that it might be an opportune time to run garbage collection.\n• The JVM is free to ignore this request, delay it, or run a partial collection based on its internal heuristics.\n• Furthermore, the JVM argument `-XX:+DisableExplicitGC` completely disables `System.gc()` calls, turning them into no-ops. Explicit GC calls in production code are strongly discouraged.\n\nWhy other options are incorrect:\n• `System.gc()` does NOT guarantee an immediate full garbage collection sweep.\n• `Runtime.getRuntime().forceGC()` does not exist in the standard Java API."
  },
  {
    "id": 64,
    "category": "JVM & GC",
    "question": "What is `Object.finalize()` and why was it deprecated in Java 9?",
    "options": [
      {
        "id": "A",
        "text": "A native method designed to synchronize heap object state with disk storage before an operating system process terminates."
      },
      {
        "id": "B",
        "text": "A mandatory compiler cleanup hook executed automatically at the conclusion of every try-with-resources statement block."
      },
      {
        "id": "C",
        "text": "A thread lifecycle callback invoked whenever a background worker thread transitions from RUNNABLE to TERMINATED."
      },
      {
        "id": "D",
        "text": "An unreliable, performance-degrading GC callback prone to deadlocks and object resurrection; use try-with-resources instead."
      }
    ],
    "correct": [
      "D"
    ],
    "requiredCount": 1,
    "explanation": "Why this is correct:\n• `finalize()` was a method defined on `java.lang.Object` intended to allow objects to perform cleanup before memory reclamation by the GC.\n• Problems that led to deprecation in Java 9:\n  1. Unpredictable timing: No guarantee when, or even if, `finalize()` will run.\n  2. Severe performance penalties: Finalizable objects require at least two GC cycles to be collected and slow down allocation.\n  3. Zombie resurrection: An object could make itself reachable again inside `finalize()`.\n  4. Deadlocks and resource leaks: Exceptions thrown during finalization are ignored.\n• Modern Replacement: Use `AutoCloseable` with `try-with-resources` or `java.lang.ref.Cleaner`.\n\nWhy other options are incorrect:\n• `finalize()` was never removed to make room for virtual threads.\n• It is not an alternative to `@Transactional`."
  },
  {
    "id": 65,
    "category": "JVM & GC",
    "question": "Which THREE garbage collectors are standard, production-ready options in modern HotSpot JVM distributions (Java 17+)?",
    "options": [
      {
        "id": "A",
        "text": "Ephemeral Reference Collector, which completely eliminates pauses by writing allocations directly to flash storage."
      },
      {
        "id": "B",
        "text": "Parallel Collector, which optimizes multi-threaded throughput for batch processing workloads."
      },
      {
        "id": "C",
        "text": "G1 (Garbage-First) Collector, which operates as the default generational, region-based collector."
      },
      {
        "id": "D",
        "text": "Concurrent Mark Sweep (CMS) Collector, which remains the mandatory default collector in Java 21 LTS."
      },
      {
        "id": "E",
        "text": "ZGC (Z Garbage Collector), an ultra-low latency collector engineered for sub-millisecond maximum pause times."
      }
    ],
    "correct": [
      "B",
      "C",
      "E"
    ],
    "requiredCount": 3,
    "explanation": "Why this is correct:\n• G1 GC (Garbage-First): Default collector since Java 9. Divides the heap into equal-sized regions and prioritizes collecting regions with the most garbage to meet user-defined pause time targets (`-XX:MaxGCPauseMillis`).\n• ZGC (Z Garbage Collector): Scalable low-latency collector introduced in Java 11 and production-ready in Java 15. Performs concurrent marking, relocation, and reference processing with sub-millisecond pause times regardless of heap size (up to 16TB).\n• Parallel GC: Throughput-focused collector that uses multiple threads for Young and Old generation collection. Ideal for batch processing workloads where overall throughput matters more than pause times.\n\nWhy other options are incorrect:\n• CMS (Concurrent Mark Sweep) was deprecated in Java 9 and permanently REMOVED in Java 14.\n• Ephemeral GC is a fictional collector name; it does not exist in OpenJDK."
  },
  {
    "id": 66,
    "category": "JVM & GC",
    "question": "Which TWO landmark architectural memory and GC milestones occurred in Java 7 and Java 8?",
    "options": [
      {
        "id": "A",
        "text": "Java 7 completely replaced the Java heap with off-heap direct byte buffers for all object allocations."
      },
      {
        "id": "B",
        "text": "Java 8 introduced the ZGC collector as the mandatory default collector across all 64-bit platforms."
      },
      {
        "id": "C",
        "text": "Java 7 made the Garbage-First (G1) collector production-ready for general enterprise deployment."
      },
      {
        "id": "D",
        "text": "Java 8 completely removed the Permanent Generation (PermGen), replacing it with native Metaspace."
      }
    ],
    "correct": [
      "C",
      "D"
    ],
    "requiredCount": 2,
    "explanation": "Why this is correct:\n• PermGen Removal (Java 8): Permanent Generation (PermGen) was completely removed and replaced by Metaspace. Metaspace stores class metadata in native off-heap memory, dynamically expanding up to available system RAM unless bounded via `-XX:MaxMetaspaceSize`.\n• G1 GC Default (Java 9): G1 GC replaced the legacy Parallel GC as the default garbage collector in Java 9, delivering predictable pause times for modern enterprise workloads.\n\nWhy other options are incorrect:\n• Compact Strings (byte arrays with LATIN1/UTF16 encoding) was introduced in Java 9, not Java 8.\n• ZGC was introduced as experimental in Java 11 and production-ready in Java 15, not Java 8."
  },
  {
    "id": 67,
    "category": "JVM & GC",
    "question": "Which THREE statements accurately describe reference strengths in `java.lang.ref`?",
    "options": [
      {
        "id": "A",
        "text": "Soft references are retained by the JVM until memory pressure threatens an `OutOfMemoryError`, making them useful for caches."
      },
      {
        "id": "B",
        "text": "Phantom references prevent objects from being finalized and allow restoring reclaimed instances back into active heap memory."
      },
      {
        "id": "C",
        "text": "All four reference types behave identically and differ only in the specific CPU cache tier where reference pointers reside."
      },
      {
        "id": "D",
        "text": "Strong references represent ordinary object assignments and prevent garbage collection while reachable from roots."
      },
      {
        "id": "E",
        "text": "Weak references do not prevent collection and are reclaimed on the subsequent garbage collection cycle once strongly unreachable."
      }
    ],
    "correct": [
      "A",
      "D",
      "E"
    ],
    "requiredCount": 3,
    "explanation": "Why this is correct:\n• Strong Reference (`Object o = new Object()`): The default reference type. An object held by an active strong reference will never be reclaimed by GC, even if memory is exhausted (throwing `OutOfMemoryError`).\n• Soft Reference (`SoftReference<T>`): Collected before `OutOfMemoryError` is thrown, making them suitable for memory-sensitive caches.\n• Weak Reference (`WeakReference<T>`): Collected eagerly during the very next GC cycle once no strong or soft references exist, making them ideal for canonical mappings (e.g. `WeakHashMap`).\n\nWhy other options are incorrect:\n• Soft references are NOT retained indefinitely; they are cleared when memory pressure threatens `OutOfMemoryError`.\n• Weak references do NOT require explicit caller confirmation before reclamation."
  },
  {
    "id": 68,
    "category": "JVM & GC",
    "question": "Which TWO statements explain the internal mechanics and lifecycle of `java.util.WeakHashMap`?",
    "options": [
      {
        "id": "A",
        "text": "Map values are stored as weak references, causing values to be reclaimed while keys remain permanently pinned."
      },
      {
        "id": "B",
        "text": "When a key is garbage-collected, its weak reference is enqueued, allowing the map to purge the corresponding value entry."
      },
      {
        "id": "C",
        "text": "Map keys are wrapped in `WeakReference` objects pointing to a private internal `ReferenceQueue`."
      },
      {
        "id": "D",
        "text": "`WeakHashMap` synchronizes all read and write methods, providing thread-safe access across concurrent threads."
      }
    ],
    "correct": [
      "B",
      "C"
    ],
    "requiredCount": 2,
    "explanation": "Why this is correct:\n• `PhantomReference<T>`: Enqueued in a `ReferenceQueue` only after the referenced object has been finalized and reclaimed by the GC.\n• `get()` always returns `null`: Unlike Soft or Weak references, calling `phantomRef.get()` always returns `null` to prevent resurrecting the object.\n• Purpose: Used for pre-mortem cleanups and managing native (off-heap) resources more safely than `finalize()`.\n\nWhy other options are incorrect:\n• `PhantomReference` does NOT pin objects permanently in Metaspace.\n• Its `get()` method does NOT return the referenced object; it always returns `null`."
  },
  {
    "id": 69,
    "category": "Spring & Hibernate",
    "question": "What is Inversion of Control (IoC) in the Spring Framework?",
    "options": [
      {
        "id": "A",
        "text": "A design principle where object lifecycle and dependency assembly are managed by the container rather than by manual instantiation."
      },
      {
        "id": "B",
        "text": "A compiler transformation that converts private instance fields into public static accessible properties."
      },
      {
        "id": "C",
        "text": "A pattern where HTTP client requests are inverted into asynchronous server-side websocket push events."
      },
      {
        "id": "D",
        "text": "A database optimization where relational foreign keys are inverted to point from parent tables to child tables."
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "Why this is correct:\n• Inversion of Control (IoC) is a software engineering architectural principle where control of object creation, configuration, and lifecycle management is transferred from the application code to a framework or container.\n• Traditional approach: A class uses `new Service()` directly inside its code, tightly coupling itself to concrete implementations.\n• Inversion of Control: The Spring `ApplicationContext` container instantiates dependencies and injects them into the dependent component (Dependency Injection).\n\nWhy other options are incorrect:\n• IoC is not about converting synchronous code into reactive streams.\n• It does not invert database relationships or reverse foreign keys.\n• It is not a mechanism for byte-compiling Java into native binary code."
  },
  {
    "id": 70,
    "category": "Spring & Hibernate",
    "question": "Which TWO advantages explain why constructor-based Dependency Injection is preferred over field injection in Spring?",
    "options": [
      {
        "id": "A",
        "text": "It allows simple instantiation and unit testing of components using plain `new` without requiring Spring test containers."
      },
      {
        "id": "B",
        "text": "It allows circular bean dependencies to be resolved automatically at runtime without throwing any startup exceptions."
      },
      {
        "id": "C",
        "text": "It enables declaring dependent collaborator fields as `final`, promoting immutability and preventing uninitialized state."
      },
      {
        "id": "D",
        "text": "It forces all dependent Spring beans to be created as prototypes, reducing heap memory consumption during startup."
      }
    ],
    "correct": [
      "A",
      "C"
    ],
    "requiredCount": 2,
    "explanation": "Why this is correct:\n• Immutability: Dependencies injected through constructors can be declared `private final`, ensuring they are assigned during construction and cannot be mutated afterwards.\n• Testability & Verification: Dependencies are explicitly declared in the constructor signature, making it trivial to pass mocks (e.g., via Mockito) in plain unit tests without starting a Spring container or using reflection.\n• Fail-Fast Safety: Prevents constructing half-initialized objects with missing required dependencies at runtime.\n\nWhy other options are incorrect:\n• Constructor injection does NOT automatically resolve circular dependencies; in fact, constructor cycles cause an immediate `BeanCurrentlyInCreationException`.\n• Constructor injection does not eliminate the need for Spring configuration or component scanning."
  },
  {
    "id": 71,
    "category": "Spring & Hibernate",
    "question": "Which THREE bean scopes are standard components of the Spring Framework?",
    "options": [
      {
        "id": "A",
        "text": "`cluster` (synchronizes a shared bean instance across disparate JVM machines using distributed shared memory)."
      },
      {
        "id": "B",
        "text": "`request` (creates a single bean instance per HTTP request lifecycle in web-aware Spring applications)."
      },
      {
        "id": "C",
        "text": "`thread` (creates a new bean instance per OS native thread, enabled by default across all Spring MVC controllers)."
      },
      {
        "id": "D",
        "text": "`singleton` (the default scope, where a single shared bean instance exists per `ApplicationContext`)."
      },
      {
        "id": "E",
        "text": "`prototype` (a new bean instance is created every time the bean is requested from the container)."
      }
    ],
    "correct": [
      "B",
      "D",
      "E"
    ],
    "requiredCount": 3,
    "explanation": "Why this is correct:\n• `singleton` (default): Exactly one shared instance of the bean per Spring IoC container (`ApplicationContext`).\n• `prototype`: A brand new bean instance is created every time the bean is requested from the container.\n• Web-Aware Scopes:\n  - `request`: A single bean instance per HTTP request lifecycle.\n  - `session`: A single bean instance per HTTP session lifecycle.\n  - `application`: A single bean instance per `ServletContext`.\n\nWhy other options are incorrect:\n• `ephemeral`, `transient`, `global`, and `cluster` are NOT standard Spring bean scopes.\n• `volatile` is a Java language keyword, not a Spring bean scope."
  },
  {
    "id": 72,
    "category": "Spring & Hibernate",
    "question": "When are singleton beans instantiated and initialized by default in a Spring `ApplicationContext`?",
    "options": [
      {
        "id": "A",
        "text": "Immediately after the JVM garbage collector performs its initial minor collection cycle on startup."
      },
      {
        "id": "B",
        "text": "Eagerly during application startup when the context refreshes, unless explicitly configured as `@Lazy`."
      },
      {
        "id": "C",
        "text": "Only when an active database connection is opened within an enclosing `@Transactional` boundary."
      },
      {
        "id": "D",
        "text": "Lazily upon the first method invocation or HTTP request directed to that specific bean instance."
      }
    ],
    "correct": [
      "B"
    ],
    "requiredCount": 1,
    "explanation": "Why this is correct:\n• In a standard Spring `ApplicationContext`, singleton beans are instantiated and initialized eagerly at container startup (bootstrapping time).\n• Benefits: Any configuration issues, missing dependencies, or initialization failures are caught immediately at application startup rather than on the first user request.\n• Lazy initialization: Can be configured per bean using `@Lazy` or globally via `spring.main.lazy-initialization=true`.\n\nWhy other options are incorrect:\n• Singleton beans are NOT created lazily upon the first request by default.\n• They are not re-created every 60 seconds; singletons live for the lifetime of the container."
  },
  {
    "id": 73,
    "category": "Spring & Hibernate",
    "question": "What is a 'detached' entity state in JPA / Hibernate, and how are changes persisted?",
    "options": [
      {
        "id": "A",
        "text": "An entity that was instantiated using `new` and has never been persisted to the database or assigned an identifier."
      },
      {
        "id": "B",
        "text": "An entity that is permanently pinned in the Hibernate second-level cache across multiple application instances."
      },
      {
        "id": "C",
        "text": "An entity with a database identifier that is no longer associated with an active `EntityManager`; changes require `merge()` to persist."
      },
      {
        "id": "D",
        "text": "An entity whose database row has been permanently removed by a SQL `DELETE` statement inside the active transaction."
      }
    ],
    "correct": [
      "C"
    ],
    "requiredCount": 1,
    "explanation": "Why this is correct:\n• JPA Entity Lifecycle States:\n  1. Transient / New: Newly instantiated with `new`; not associated with an `EntityManager` and has no database representation.\n  2. Managed / Persistent: Associated with an active `EntityManager` persistence context; changes are tracked and automatically synchronized (dirty checking).\n  3. Detached: Was previously managed, but the `EntityManager` was closed, cleared, or serialized. Changes to detached instances are NOT tracked.\n  4. Removed: Scheduled for deletion from the database.\n• To persist modifications made to a detached entity, it must be merged back into an active persistence context via `entityManager.merge(detachedEntity)`.\n\nWhy other options are incorrect:\n• Detached entity modifications are NOT automatically synchronized; they are completely untracked.\n• A detached entity is not permanently locked in read-only mode; calling `merge()` brings it back to managed state."
  },
  {
    "id": 74,
    "category": "Spring & Hibernate",
    "question": "Which TWO statements accurately describe the proxy architecture and self-invocation limitation of Spring `@Transactional`?",
    "options": [
      {
        "id": "A",
        "text": "Spring `@Transactional` modifies the JVM bytecode instruction pointer to execute transaction commits at the OS level."
      },
      {
        "id": "B",
        "text": "Self-invocation bypasses can be resolved only by converting the target Spring bean into an unmanaged prototype bean."
      },
      {
        "id": "C",
        "text": "Invoking an annotated method from within the same class (`this.method()`) bypasses the proxy, causing `@Transactional` to be ignored."
      },
      {
        "id": "D",
        "text": "Spring wraps the target bean in an AOP proxy that intercepts external method calls to manage transaction lifecycles."
      }
    ],
    "correct": [
      "C",
      "D"
    ],
    "requiredCount": 2,
    "explanation": "Why this is correct:\n• Proxy Architecture: Spring `@Transactional` works via AOP (Aspect-Oriented Programming) proxies. The Spring container wraps the target bean in a dynamic proxy that intercepts method calls to manage transactions (`begin`, `commit`, `rollback`).\n• The Self-Invocation Gotcha: When method A calls method B within the same class (`this.methodB()`), the call bypasses the proxy and executes directly on `this`. Consequently, any `@Transactional` annotations on method B are ignored!\n• Visibility Requirement: By default, Spring transaction proxies only intercept `public` methods. Annotating `private` or `protected` methods with `@Transactional` has no effect.\n\nWhy other options are incorrect:\n• Transactional proxies do NOT intercept internal `this` method invocations.\n• Annotating private methods does NOT work out-of-the-box with standard Spring AOP proxies."
  },
  {
    "id": 75,
    "category": "Spring & Hibernate",
    "question": "Which TWO guidelines govern proper configuration of bidirectional `@OneToMany` and `@ManyToOne` associations in JPA?",
    "options": [
      {
        "id": "A",
        "text": "The `@ManyToOne` side is typically the owning side of the association that holds the physical database foreign key column."
      },
      {
        "id": "B",
        "text": "The `@ManyToOne` annotation must always be configured with `fetch = FetchType.EAGER` by mandatory JPA specification rules."
      },
      {
        "id": "C",
        "text": "Both sides of the association must omit `mappedBy` to instruct Hibernate to automatically maintain join table integrity."
      },
      {
        "id": "D",
        "text": "The `@OneToMany` side specifies `mappedBy` referencing the field name on the child entity, acting as the inverse collection side."
      }
    ],
    "correct": [
      "A",
      "D"
    ],
    "requiredCount": 2,
    "explanation": "Why this is correct:\n• `mappedBy` Attribute: In a bidirectional `@OneToMany` / `@ManyToOne` association, the `mappedBy` attribute MUST be placed on the `@OneToMany` side. It specifies the field in the child entity that owns the relationship.\n• Owning Side: The `@ManyToOne` side is always the owning side of the relationship because it holds the foreign key column (`@JoinColumn`) in the database table.\n• Maintaining Both Sides in Memory: In Java code, you must keep both sides of the bidirectional relationship in sync in memory (e.g. using helper methods like `addChild()` / `removeChild()`), otherwise in-memory navigations will observe stale relationships.\n\nWhy other options are incorrect:\n• `mappedBy` does NOT belong on the `@ManyToOne` side.\n• Bidirectional relationships do not require foreign keys on both tables."
  },
  {
    "id": 76,
    "category": "Spring & Hibernate",
    "question": "Which THREE annotations serve as specialized Spring component stereotypes to designate specific architectural layer roles?",
    "options": [
      {
        "id": "A",
        "text": "`@Entity` to register managed Spring singleton service beans for automatic classpath component scanning."
      },
      {
        "id": "B",
        "text": "`@Repository` to encapsulate data access and enable automatic persistence exception translation into Spring hierarchies."
      },
      {
        "id": "C",
        "text": "`@Controller` or `@RestController` to handle incoming HTTP requests and coordinate presentation layer responses."
      },
      {
        "id": "D",
        "text": "`@Service` to designate beans encapsulating domain business logic and workflow transaction boundaries."
      },
      {
        "id": "E",
        "text": "`@Configuration` to designate database table schema definitions that map directly onto relational database rows."
      }
    ],
    "correct": [
      "B",
      "C",
      "D"
    ],
    "requiredCount": 3,
    "explanation": "Why this is correct:\n• `@Component`: The generic root stereotype annotation for any Spring-managed component.\n• Specialized Subtypes:\n  - `@Service`: Denotes business logic and service-layer components.\n  - `@Repository`: Denotes persistence/data-access components; also enables automatic translation of SQL exceptions into Spring's `DataAccessException` hierarchy.\n  - `@Controller` / `@RestController`: Denotes web request presentation controllers.\n\nWhy other options are incorrect:\n• `@Entity` is a JPA specification annotation (`jakarta.persistence.Entity`), NOT a Spring component stereotype.\n• `@Table` is also a JPA mapping annotation.\n• `@Bean` is a method-level annotation in `@Configuration` classes, not a class-level stereotype."
  },
  {
    "id": 77,
    "category": "REST & Web",
    "question": "Which THREE architectural constraints are core tenets of REST (Representational State Transfer)?",
    "options": [
      {
        "id": "A",
        "text": "Client-Server separation: user interface concerns are separated from data storage concerns to improve portability and scalability."
      },
      {
        "id": "B",
        "text": "Cacheability: responses must explicitly or implicitly designate themselves as cacheable or non-cacheable to improve efficiency."
      },
      {
        "id": "C",
        "text": "Statelessness: each request from client to server must contain all of the contextual information necessary to understand it."
      },
      {
        "id": "D",
        "text": "Stateful Session Affinity: servers must store client conversation state in memory across subsequent HTTP connections."
      },
      {
        "id": "E",
        "text": "Strict Schema Serialization: all messages must be formatted as binary protocol buffers validated against central schemas."
      }
    ],
    "correct": [
      "A",
      "B",
      "C"
    ],
    "requiredCount": 3,
    "explanation": "Why this is correct:\n• REST (Representational State Transfer) Architectural Constraints (Roy Fielding):\n  1. Client-Server Architecture: Separation of concerns between user interface and data storage.\n  2. Statelessness: Each request from client to server must contain all necessary information to understand and process the request; no client session context is stored on the server.\n  3. Cacheability: Responses must explicitly indicate whether they are cacheable or non-cacheable to prevent clients from reusing stale data.\n  4. Layered System: Hierarchical layers (proxies, load balancers, gateways) can exist without client awareness.\n  5. Uniform Interface: Standard resource identification (URIs), resource manipulation through representations, self-descriptive messages, and HATEOAS.\n\nWhy other options are incorrect:\n• Server-side session affinity is the opposite of REST; REST strictly mandates statelessness.\n• XML payloads are NOT mandatory; REST is format-agnostic and commonly uses JSON."
  },
  {
    "id": 78,
    "category": "REST & Web",
    "question": "Which TWO statements accurately describe component responsibilities in the Model-View-Controller (MVC) architectural pattern?",
    "options": [
      {
        "id": "A",
        "text": "The View communicates directly with the database engine to execute high-throughput relational SQL queries."
      },
      {
        "id": "B",
        "text": "The Model encapsulates application state, domain entities, and core business logic independent of presentation format."
      },
      {
        "id": "C",
        "text": "The Controller stores user session tokens inside operating system kernel memory to ensure cross-process isolation."
      },
      {
        "id": "D",
        "text": "The Controller interprets incoming user requests, invokes operations on the Model, and selects the appropriate View to render."
      }
    ],
    "correct": [
      "B",
      "D"
    ],
    "requiredCount": 2,
    "explanation": "Why this is correct:\n• Model-View-Controller (MVC) Pattern:\n  - Controller: Handles incoming HTTP user requests, coordinates business workflows, interacts with service/model layers, and selects the view to render.\n  - Model: Represents application business data and domain logic; holds state that will be presented to the user.\n  - View: Formats and renders the model data into a presentation UI (e.g. HTML, Thymeleaf, JSON for REST).\n\nWhy other options are incorrect:\n• The View does NOT establish direct JDBC database connections or execute SQL transactions.\n• The Model does NOT render graphical buttons or DOM events."
  },
  {
    "id": 79,
    "category": "REST & Web",
    "question": "Which THREE statements accurately reflect the standard semantic use of HTTP/1.1 methods?",
    "options": [
      {
        "id": "A",
        "text": "`POST` is defined as strictly idempotent because repeating a request never creates duplicate records on the server."
      },
      {
        "id": "B",
        "text": "`GET` is intended for safe, read-only retrieval of resources without modifying server-side state."
      },
      {
        "id": "C",
        "text": "`PUT` is used to create or replace the entire target resource at a specific URI and is defined as idempotent."
      },
      {
        "id": "D",
        "text": "`PUT` requests are safe methods that must never produce any state side effects on the origin server."
      },
      {
        "id": "E",
        "text": "`DELETE` removes the specified resource at the target URI and is defined as idempotent on repeated calls."
      }
    ],
    "correct": [
      "B",
      "C",
      "E"
    ],
    "requiredCount": 3,
    "explanation": "Why this is correct:\n• `GET`: Requests representation of a specified resource; safe and idempotent.\n• `POST`: Submits an entity to the specified resource, often causing a change in state or side effects on the server (non-idempotent).\n• `PUT`: Replaces all current representations of the target resource with the request payload (idempotent).\n• `DELETE`: Removes the specified resource (idempotent).\n\nWhy other options are incorrect:\n• `POST` is NOT idempotent; submitting the same POST request multiple times typically results in duplicate resource creations or orders.\n• `GET` requests must NOT cause state modifications or data mutations on the server."
  },
  {
    "id": 80,
    "category": "REST & Web",
    "question": "Which TWO HTTP methods are designated as 'safe' according to RFC 7231 (they do not alter server resource state)?",
    "options": [
      {
        "id": "A",
        "text": "`GET`, intended exclusively for information retrieval without altering origin server state."
      },
      {
        "id": "B",
        "text": "`POST`, which is safe because clients can submit arbitrary JSON payloads without modifying database schemas."
      },
      {
        "id": "C",
        "text": "`HEAD`, which is identical to `GET` except that the server must not return a message-body in the response."
      },
      {
        "id": "D",
        "text": "`DELETE`, which is safe because deleting a resource leaves the server in a clean, pristine operating condition."
      }
    ],
    "correct": [
      "A",
      "C"
    ],
    "requiredCount": 2,
    "explanation": "Why this is correct:\n• Safe Methods (RFC 7231 §4.2.1): HTTP methods that are essentially read-only. Calling a safe method does not alter server state or produce side effects.\n• Standard Safe Methods: `GET` and `HEAD` (also `OPTIONS` and `TRACE`).\n• `PUT`, `POST`, `DELETE`, and `PATCH` are NOT safe methods because they are intended to mutate resources on the server."
  },
  {
    "id": 81,
    "category": "REST & Web",
    "question": "Which THREE HTTP methods are defined as 'idempotent' (making multiple identical requests produces the same server state as one request)?",
    "options": [
      {
        "id": "A",
        "text": "`DELETE` (deleting a resource repeatedly leaves the resource removed, producing the same net state change)."
      },
      {
        "id": "B",
        "text": "`PUT` (replacing a resource repeatedly with the same payload results in the identical final server state)."
      },
      {
        "id": "C",
        "text": "`POST` (submitting an order creation form repeatedly creates exactly one unique database entity record)."
      },
      {
        "id": "D",
        "text": "`GET` (retrieving a resource repeatedly produces no cumulative state mutations on the origin server)."
      },
      {
        "id": "E",
        "text": "`PATCH` (applying relative mathematical increment deltas repeatedly produces the exact same final state)."
      }
    ],
    "correct": [
      "A",
      "B",
      "D"
    ],
    "requiredCount": 3,
    "explanation": "Why this is correct:\n• Idempotent Methods (RFC 7231 §4.2.2): Methods where making multiple identical requests has the same intended effect on the server as making a single request:\n  - `GET`: Reading a resource multiple times leaves server state identical.\n  - `PUT`: Overwriting a resource with the exact same payload multiple times produces the identical server state.\n  - `DELETE`: Deleting resource `/items/5` once deletes it; calling DELETE again leaves the item deleted.\n• `POST` is NOT idempotent: calling `POST /orders` 3 times creates 3 distinct orders.\n• `PATCH` is generally NOT idempotent (e.g., patching `{ \"increment\": 1 }`)."
  },
  {
    "id": 82,
    "category": "REST & Web",
    "question": "Which TWO mechanisms are standard practices for transmitting parameters in an HTTP GET request?",
    "options": [
      {
        "id": "A",
        "text": "Query string parameters appended to the URL (such as `?status=shipped&page=2`) for filtering, sorting, and pagination."
      },
      {
        "id": "B",
        "text": "Path variables embedded within the URL path hierarchy (such as `/api/v1/orders/1024`) to identify specific resources."
      },
      {
        "id": "C",
        "text": "Enclosing large nested JSON document payloads directly within the HTTP GET request message-body stream."
      },
      {
        "id": "D",
        "text": "Injecting binary parameter byte arrays directly into custom TCP transport segment header options."
      }
    ],
    "correct": [
      "A",
      "B"
    ],
    "requiredCount": 2,
    "explanation": "Why this is correct:\n• Query Parameters: Appended to the URL after a `?` (e.g. `/users?role=admin&sort=desc`), typically used for filtering, pagination, and sorting.\n• Path Parameters (Path Variables): Embedded directly into the URL path hierarchy (e.g. `/users/{id}`), used for identifying specific resources.\n• Request Body: Used with `POST`, `PUT`, `PATCH` to send structured payloads (JSON, XML).\n• HTTP Headers: Used for metadata (`Authorization`, `Content-Type`, `Accept`).\n\nWhy other options are incorrect:\n• Modifying TCP segment sequence numbers is a low-level transport protocol mechanic, not a REST practice.\n• Storing parameters in CPU hardware registers is impossible across HTTP networks."
  },
  {
    "id": 83,
    "category": "REST & Web",
    "question": "Which annotations are core components of the Jakarta RESTful Web Services (JAX-RS) specification?",
    "options": [
      {
        "id": "A",
        "text": "`@RestController`, `@GetMapping`, `@PostMapping`, `@PathVariable`, and `@RequestParam`."
      },
      {
        "id": "B",
        "text": "`@Entity`, `@Table`, `@Column`, `@Id`, `@GeneratedValue`, and `@NamedQuery`."
      },
      {
        "id": "C",
        "text": "`@BeforeEach`, `@AfterEach`, `@Test`, `@ParameterizedTest`, and `@Disabled`."
      },
      {
        "id": "D",
        "text": "`@Path`, `@GET`/`@POST`/`@PUT`/`@DELETE`, `@PathParam`, `@QueryParam`, `@Produces`, and `@Consumes`."
      }
    ],
    "correct": [
      "D"
    ],
    "requiredCount": 1,
    "explanation": "Why this is correct:\n• Jakarta RESTful Web Services (formerly JAX-RS) core annotations:\n  - `@Path`: Specifies relative URI path for a resource class or method.\n  - `@GET`, `@POST`, `@PUT`, `@DELETE`: HTTP method designators.\n  - `@Produces`: Specifies media types returned to client (`application/json`).\n  - `@Consumes`: Specifies accepted request payload formats.\n  - `@PathParam`, `@QueryParam`, `@HeaderParam`: Parameter extractors.\n\nWhy other options are incorrect:\n• `@Endpoint`, `@Step`, and `@Action` are not standard JAX-RS annotations.\n• `@GetMapping` and `@PostMapping` are Spring MVC annotations, NOT Jakarta RESTful Web Services (JAX-RS) annotations."
  },
  {
    "id": 84,
    "category": "REST & Web",
    "question": "What is the OAuth 2.0 framework and what fundamental security problem does it address?",
    "options": [
      {
        "id": "A",
        "text": "A delegated authorization framework that grants third-party applications scoped access to APIs without sharing passwords."
      },
      {
        "id": "B",
        "text": "A symmetric encryption protocol designed to replace Transport Layer Security (`TLS`) across distributed databases."
      },
      {
        "id": "C",
        "text": "A database access control model that enforces table-level row security within relational database engines."
      },
      {
        "id": "D",
        "text": "A session clustering algorithm that synchronizes HTTP cookie states across disparate microservice JVM instances."
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "Why this is correct:\n• OAuth 2.0 (RFC 6749) is an authorization delegation framework.\n• Problem Solved: It enables third-party client applications to obtain limited access to a user's resources on an HTTP service without requiring the user to disclose their secret credentials (username/password) to the third-party application.\n• Key roles: Resource Owner (user), Client (app), Authorization Server, and Resource Server (API).\n• Uses short-lived access tokens and refresh tokens.\n\nWhy other options are incorrect:\n• OAuth 2.0 is NOT a database encryption algorithm.\n• It is not an alternative to JDBC connection pooling.\n• It is an authorization framework, not an ACID transaction protocol."
  },
  {
    "id": 85,
    "category": "Database",
    "question": "Which THREE properties are guaranteed by the ACID model in relational database transactions?",
    "options": [
      {
        "id": "A",
        "text": "Availability: every read or write request receives a non-error response without requiring active quorum consensus."
      },
      {
        "id": "B",
        "text": "Consistency: transactions ensure that data transitions strictly from one valid state to another, satisfying all database constraints."
      },
      {
        "id": "C",
        "text": "Partition Tolerance: database nodes continue operating normally during arbitrary network communication partitions."
      },
      {
        "id": "D",
        "text": "Durability: once a transaction is committed, its updates survive subsequent power failures, system crashes, or restarts."
      },
      {
        "id": "E",
        "text": "Atomicity: all statements within a transaction succeed completely or the entire transaction is rolled back with no effect."
      }
    ],
    "correct": [
      "B",
      "D",
      "E"
    ],
    "requiredCount": 3,
    "explanation": "Why this is correct:\n• ACID Guarantees in Relational Databases:\n  - Atomicity (All-or-Nothing): A transaction's operations either all succeed and commit, or all fail and roll back completely.\n  - Consistency: A transaction transforms the database from one valid state to another, preserving all schema constraints, checks, and foreign keys.\n  - Isolation: Concurrent transactions execute without interfering with one another, preventing dirty reads and conflicting writes.\n  - Durability: Once a transaction commits, its changes survive system crashes or power failures (written to write-ahead log / disk).\n\nWhy other options are incorrect:\n• Availability is part of the CAP theorem and BASE model, NOT ACID.\n• Asynchrony is a messaging paradigm, not an ACID guarantee."
  },
  {
    "id": 86,
    "category": "Database",
    "question": "Which TWO statements correctly describe transaction isolation anomalies in ANSI SQL?",
    "options": [
      {
        "id": "A",
        "text": "A 'Phantom Read' occurs when a transaction rolls back automatically because another session deleted an index."
      },
      {
        "id": "B",
        "text": "A 'Non-Repeatable Read' occurs when re-reading a row retrieves different data because another transaction committed an update."
      },
      {
        "id": "C",
        "text": "A 'Dirty Read' occurs when a transaction reads uncommitted modifications made by another concurrent transaction."
      },
      {
        "id": "D",
        "text": "`READ UNCOMMITTED` is the strictest isolation level and prevents all phantom reads and serialization failures."
      }
    ],
    "correct": [
      "B",
      "C"
    ],
    "requiredCount": 2,
    "explanation": "Why this is correct:\n• Dirty Read: Transaction A reads data modified by concurrent Transaction B before Transaction B commits. If Transaction B rolls back, Transaction A operated on invalid data. (Prevented by `READ COMMITTED`).\n• Non-Repeatable Read: Transaction A reads a row, Transaction B modifies or deletes that row and commits, and Transaction A reads the row again, observing modified values. (Prevented by `REPEATABLE READ`).\n• Phantom Read: Transaction A reads a range of rows matching a criteria, Transaction B inserts new rows matching that criteria and commits, and Transaction A queries the range again, seeing 'phantom' new rows. (Prevented by `SERIALIZABLE`)."
  },
  {
    "id": 87,
    "category": "Database",
    "question": "What is a database deadlock and how does a relational database management system resolve it?",
    "options": [
      {
        "id": "A",
        "text": "A table becomes corrupted when two transactions write to the same column; the RDBMS locks the table permanently."
      },
      {
        "id": "B",
        "text": "Two transactions hold locks that the other requires to proceed; the RDBMS detects the cycle and aborts one transaction as victim."
      },
      {
        "id": "C",
        "text": "An uncommitted transaction commits automatically when a secondary transaction issues a `SELECT` statement."
      },
      {
        "id": "D",
        "text": "A query scans an unindexed table exceeding the connection pool timeout; the RDBMS restarts the entire database service."
      }
    ],
    "correct": [
      "B"
    ],
    "requiredCount": 1,
    "explanation": "Why this is correct:\n• Database Deadlock: Occurs when two or more concurrent transactions hold locks on database rows or tables that each other needs, creating a circular wait where neither can proceed.\n• Detection & Resolution: Modern RDBMSs (PostgreSQL, MySQL InnoDB, Oracle) run internal deadlock detection algorithms that maintain a wait-for graph. When a cycle is detected, the database automatically breaks the deadlock by choosing a transaction as the victim, aborting it, rolling back its changes, and throwing a deadlock exception to the application so it can retry.\n\nWhy other options are incorrect:\n• The database does NOT shut down the engine or delete the table.\n• Deadlocks are not resolved by merging transactions into a single batch."
  },
  {
    "id": 88,
    "category": "Database",
    "question": "What is the primary function and performance trade-off of adding a database index (e.g. B-Tree index)?",
    "options": [
      {
        "id": "A",
        "text": "It converts relational tables into in-memory key-value stores to guarantee single-digit microsecond responses."
      },
      {
        "id": "B",
        "text": "It compresses table data on disk to eliminate memory consumption during complex full table scans."
      },
      {
        "id": "C",
        "text": "It accelerates query lookups, filters, and joins at the cost of additional storage space and slower write operations."
      },
      {
        "id": "D",
        "text": "It enforces unique constraints on columns while eliminating the need for foreign key constraints across tables."
      }
    ],
    "correct": [
      "C"
    ],
    "requiredCount": 1,
    "explanation": "Why this is correct:\n• Primary Function: Database indexes (commonly B-Tree or Hash indexes) provide quick random access paths to rows matching search criteria (`WHERE`, `JOIN`, `ORDER BY`), transforming $O(n)$ full table scans into $O(\\log n)$ tree traversals.\n• Performance Trade-off: Every index consumes disk and buffer memory, and incurs a performance penalty on write operations (`INSERT`, `UPDATE`, `DELETE`) because every index on the table must be updated whenever data changes.\n\nWhy other options are incorrect:\n• Indexes do NOT accelerate `INSERT` queries; they slow them down due to index tree maintenance.\n• Indexes do not encrypt table data."
  },
  {
    "id": 89,
    "category": "Database",
    "question": "Which THREE statements accurately reflect SQL query clauses and join behaviors?",
    "options": [
      {
        "id": "A",
        "text": "`WHERE` filters individual rows before grouping; `HAVING` filters aggregated group records produced by `GROUP BY`."
      },
      {
        "id": "B",
        "text": "`GROUP BY` automatically sorts all output rows in descending order based on the primary key column."
      },
      {
        "id": "C",
        "text": "`INNER JOIN` returns only rows with matches in both tables; `LEFT JOIN` returns all left rows, populating missing right attributes with `NULL`."
      },
      {
        "id": "D",
        "text": "`UNION` combines results and removes duplicate rows; `UNION ALL` concatenates result sets while preserving duplicate rows."
      },
      {
        "id": "E",
        "text": "`RIGHT JOIN` is semantically equivalent to `CROSS JOIN`, generating a complete Cartesian product of both tables."
      }
    ],
    "correct": [
      "A",
      "C",
      "D"
    ],
    "requiredCount": 3,
    "explanation": "Why this is correct:\n• `GROUP BY` & `HAVING`: `GROUP BY` aggregates rows sharing identical column values. `HAVING` filters aggregated groups (evaluated after aggregation), whereas `WHERE` filters individual rows (evaluated before aggregation).\n• `UNION` vs `UNION ALL`: `UNION` combines result sets and removes duplicate rows (requiring an expensive sort/distinct operation); `UNION ALL` retains all duplicates and is much faster.\n• Outer Joins: A `LEFT JOIN` returns all rows from the left table, plus matched rows from the right table (with `NULL` for missing right-side values).\n\nWhy other options are incorrect:\n• `WHERE` cannot filter on aggregate functions like `WHERE SUM(price) > 100`; that requires `HAVING`.\n• `UNION` does not retain duplicates; `UNION ALL` does."
  },
  {
    "id": 90,
    "category": "Testing & Design",
    "question": "What is the primary architectural distinction between the Adapter and Proxy design patterns?",
    "options": [
      {
        "id": "A",
        "text": "Adapter wraps multiple subsystems behind a unified facade; Proxy clones existing prototype instances."
      },
      {
        "id": "B",
        "text": "Adapter can only be implemented using multiple inheritance; Proxy requires static class initialization."
      },
      {
        "id": "C",
        "text": "Adapter is an architectural behavioral pattern; Proxy is exclusively a creational factory pattern."
      },
      {
        "id": "D",
        "text": "Adapter translates between two incompatible interfaces; Proxy implements the same interface to control or augment access."
      }
    ],
    "correct": [
      "D"
    ],
    "requiredCount": 1,
    "explanation": "Why this is correct:\n• Adapter Pattern: Converts the existing interface of a class into another interface that callers expect. It bridges incompatibility between two existing interfaces without altering underlying behavior.\n• Proxy Pattern: Provides a surrogate or placeholder object that has the EXACT same interface as the target object, controlling or augmenting access to it (e.g. lazy loading, security authorization, transaction boundary management, logging).\n\nWhy other options are incorrect:\n• Adapter does not wrap interfaces into abstract classes exclusively.\n• Proxy does not convert synchronous calls into multithreaded queues by definition."
  },
  {
    "id": 91,
    "category": "Testing & Design",
    "question": "Which THREE statements accurately define standard unit test double roles?",
    "options": [
      {
        "id": "A",
        "text": "A Fake is an uncompiled source file used exclusively for compile-time syntax verification in IDEs."
      },
      {
        "id": "B",
        "text": "A Mock verifies interaction behavior by asserting that expected methods were called with specific parameters."
      },
      {
        "id": "C",
        "text": "A Dummy executes production SQL database transactions on an isolated background worker thread."
      },
      {
        "id": "D",
        "text": "A Spy wraps a real object to record invocations while allowing real methods to execute unless explicitly stubbed."
      },
      {
        "id": "E",
        "text": "A Stub provides pre-programmed canned answers to method calls made during test execution."
      }
    ],
    "correct": [
      "B",
      "D",
      "E"
    ],
    "requiredCount": 3,
    "explanation": "Why this is correct:\n• Gerard Meszaros Test Double Definitions:\n  - Dummy: Objects passed around but never actually used (e.g., filling parameter lists).\n  - Stub: Provides canned, predetermined answers to method calls during a test.\n  - Mock: Pre-programmed with expectations about which calls it should receive, verifying interactions (e.g., verifying `sendEmail()` was called once with specific arguments).\n  - Spy: A wrapper around a real object that records method calls and parameters while executing real logic.\n\nWhy other options are incorrect:\n• A Stub does NOT verify interactions or record call counts; that is the role of a Mock or Spy.\n• A Dummy does not execute real network requests."
  },
  {
    "id": 92,
    "category": "Testing & Design",
    "question": "What are the three iterative phases of Test-Driven Development (TDD)?",
    "options": [
      {
        "id": "A",
        "text": "Red (write a failing test), Green (write minimal code to pass the test), and Refactor (clean code without changing behavior)."
      },
      {
        "id": "B",
        "text": "Analyze (profile memory heap dumps), Optimize (tune garbage collector flags), and Benchmark (run load tests)."
      },
      {
        "id": "C",
        "text": "Plan (draft comprehensive UML class diagrams), Code (implement all classes), and Test (verify manually in staging)."
      },
      {
        "id": "D",
        "text": "Build (compile application bytecode), Package (assemble deployment container), and Deploy (publish to production)."
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "Why this is correct:\n• Test-Driven Development (TDD) Red-Green-Refactor Cycle (Kent Beck):\n  1. Red: Write a small, focused unit test for functionality that does not exist yet. Run it and watch it fail.\n  2. Green: Write the minimal amount of production code necessary to make the failing test pass.\n  3. Refactor: Clean up the code, eliminate duplication, improve naming and design while keeping all tests green.\n\nWhy other options are incorrect:\n• TDD does not involve deploying to production before writing code.\n• TDD is an iterative coding practice, not an architecture decomposition methodology."
  },
  {
    "id": 93,
    "category": "Testing & Design",
    "question": "How do you assert that a method call throws an expected exception in JUnit 5?",
    "options": [
      {
        "id": "A",
        "text": "Configuring the expected exception class in the `pom.xml` Surefire test runner plugin configuration."
      },
      {
        "id": "B",
        "text": "Using `Assertions.assertThrows(ExpectedException.class, () -> objectUnderTest.targetMethod());`."
      },
      {
        "id": "C",
        "text": "Enclosing the invocation in a `try-catch` block and calling `fail()` inside the `catch` block."
      },
      {
        "id": "D",
        "text": "Annotating the test method with `@Test(expected = ExpectedException.class)`."
      }
    ],
    "correct": [
      "B"
    ],
    "requiredCount": 1,
    "explanation": "Why this is correct:\n• In JUnit 5, `Assertions.assertThrows(Class<T> expectedType, Executable executable)` is the standard way to assert exceptions.\n• It verifies that executing the lambda throws an exception of the specified type (or subtype) and returns the thrown exception instance for further assertions (e.g. checking message text).\n• Example:\n```java\nIllegalArgumentException ex = assertThrows(IllegalArgumentException.class, () -> service.withdraw(-50));\nassertEquals(\"Amount must be positive\", ex.getMessage());\n```\n\nWhy other options are incorrect:\n• `@Test(expected = ...)` is JUnit 4 syntax and does not exist in JUnit 5 (`org.junit.jupiter.api.Test`).\n• `catchThrowable()` is an AssertJ assertion, not native JUnit 5."
  },
  {
    "id": 94,
    "category": "Testing & Design",
    "question": "When designing a class for unit testability that depends on external services (e.g. database, HTTP API), what is best practice?",
    "options": [
      {
        "id": "A",
        "text": "Declare all external collaborators as global static variables to allow test cases to overwrite them reflection-free."
      },
      {
        "id": "B",
        "text": "Instantiate concrete dependency implementations directly inside the class constructor using `new`."
      },
      {
        "id": "C",
        "text": "Inject collaborator interfaces via constructor injection so test doubles (mocks/stubs) can be passed during testing."
      },
      {
        "id": "D",
        "text": "Configure the unit test to connect directly to the shared production database to ensure realistic test data."
      }
    ],
    "correct": [
      "C"
    ],
    "requiredCount": 1,
    "explanation": "Why this is correct:\n• Inversion of Control & Loose Coupling: Relying on concrete implementations instantiated via `new` tightly couples a class to external infrastructure (databases, payment gateways, message queues), making unit testing in isolation impossible.\n• Best Practice: Depend on abstractions (interfaces) and inject dependencies through constructors. During unit tests, you can inject mocks or stubs instead of real infrastructure components without spinning up servers or databases.\n\nWhy other options are incorrect:\n• Making methods `final` and `static` hinders unit testability because static methods cannot be easily substituted with test doubles without specialized bytecode manipulation tools like PowerMock.\n• Reading configuration directly from hardcoded static properties reduces configurability and testability."
  },
  {
    "id": 95,
    "category": "Testing & Design",
    "question": "What is the difference between `@BeforeEach` and `@BeforeAll` in JUnit 5?",
    "options": [
      {
        "id": "A",
        "text": "`@BeforeAll` runs before every test method; `@BeforeEach` runs once when the JVM process is initialized."
      },
      {
        "id": "B",
        "text": "`@BeforeEach` executes asynchronously on worker threads; `@BeforeAll` blocks the main application process."
      },
      {
        "id": "C",
        "text": "`@BeforeEach` is evaluated at compile time; `@BeforeAll` is evaluated dynamically during maven package packaging."
      },
      {
        "id": "D",
        "text": "`@BeforeEach` runs before every individual test method; `@BeforeAll` runs once before all tests in the class and must be `static`."
      }
    ],
    "correct": [
      "D"
    ],
    "requiredCount": 1,
    "explanation": "Why this is correct:\n• `@BeforeEach`: Executes before EACH individual `@Test` method in the test class. Used to set up fresh state or instantiate new test targets for test isolation.\n• `@BeforeAll`: Executes once before ALL test methods in the test class. By default, it must be annotated on a `static` method (unless `@TestInstance(Lifecycle.PER_CLASS)` is configured). Used for expensive one-time setup (starting test containers, shared embedded databases).\n\nWhy other options are incorrect:\n• `@BeforeAll` does not run after tests; that is `@AfterAll`.\n• `@BeforeEach` does not run once per suite; it runs before every single test method."
  },
  {
    "id": 96,
    "category": "Testing & Design",
    "question": "Which THREE concepts constitute fundamental pillars of Object-Oriented Programming (OOP)?",
    "options": [
      {
        "id": "A",
        "text": "Polymorphism: enabling objects of different classes to respond to the same method invocation with custom behaviors."
      },
      {
        "id": "B",
        "text": "Normalization: eliminating data redundancy across relational database schemas through primary key constraints."
      },
      {
        "id": "C",
        "text": "Immutability: forcing all class members to be declared `final` and preventing garbage collector reclamation."
      },
      {
        "id": "D",
        "text": "Abstraction: hiding implementation complexity and exposing clear, high-level contracts via interfaces or abstract classes."
      },
      {
        "id": "E",
        "text": "Encapsulation: bundling data and methods while restricting direct external modification of internal object state."
      }
    ],
    "correct": [
      "A",
      "D",
      "E"
    ],
    "requiredCount": 3,
    "explanation": "Why this is correct:\n• The 4 Fundamental Pillars of Object-Oriented Programming (OOP):\n  1. Encapsulation: Bundling data and behavior, restricting direct access to internal state.\n  2. Abstraction: Hiding implementation complexity behind clear, simple interfaces.\n  3. Inheritance: Reusing and extending state and behavior from existing classes.\n  4. Polymorphism: Allowing entities to take many forms (method overriding and overloading).\n\nWhy other options are incorrect:\n• Normalization is a database relational design concept, not an OOP pillar.\n• Compilation and Threading are platform/system mechanics, not OOP pillars."
  },
  {
    "id": 97,
    "category": "Testing & Design",
    "question": "What does Software Development Life Cycle (SDLC) describe in software engineering?",
    "options": [
      {
        "id": "A",
        "text": "The structured process of planning, creating, testing, deploying, and maintaining software applications."
      },
      {
        "id": "B",
        "text": "The compile-time sequence of transforming Java source code into native machine bytecode instructions."
      },
      {
        "id": "C",
        "text": "The memory allocation lifecycle of an object from young generation allocation to garbage collection."
      },
      {
        "id": "D",
        "text": "The runtime network handshake protocol established between microservices and API gateways."
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "Why this is correct:\n• Software Development Life Cycle (SDLC): The structured framework defining the stages involved in building, deploying, and maintaining software applications.\n• Standard Phases: Requirements Gathering & Analysis -> System Design -> Implementation (Coding) -> Testing -> Deployment -> Maintenance.\n• Methodologies implementing SDLC include Waterfall, Agile, Scrum, and Kanban.\n\nWhy other options are incorrect:\n• SDLC is not an operating system memory paging algorithm.\n• It is not a hardware manufacturing cycle for semiconductor chips."
  },
  {
    "id": 98,
    "category": "Architecture",
    "question": "What is 'back-pressure' in reactive asynchronous systems?",
    "options": [
      {
        "id": "A",
        "text": "A thread scheduler algorithm that increases thread priority when CPU hardware temperatures exceed safe operating limits."
      },
      {
        "id": "B",
        "text": "A flow-control mechanism where a downstream consumer signals its processing capacity to upstream producers to prevent overload."
      },
      {
        "id": "C",
        "text": "A garbage collection optimization that compresses young generation heap space when object allocation rates drop."
      },
      {
        "id": "D",
        "text": "A database connection pooling technique that automatically cancels slow-running queries during peak traffic spikes."
      }
    ],
    "correct": [
      "B"
    ],
    "requiredCount": 1,
    "explanation": "Why this is correct:\n• Back-pressure: A feedback flow-control mechanism used in reactive asynchronous streams (Reactive Streams specification, Project Reactor, RxJava, Akka).\n• Mechanism: When a fast producer emits data at a rate faster than a slow consumer can process, back-pressure allows the consumer to signal its capacity to the producer (`request(n)`), preventing buffer overflows, thread exhaustion, and `OutOfMemoryError`.\n\nWhy other options are incorrect:\n• Back-pressure is not an HTTP caching header.\n• It is not a database dead-letter queue mechanism.\n• It does not invert SQL foreign key constraints."
  },
  {
    "id": 99,
    "category": "Architecture",
    "question": "Which THREE architectural motivations justify decomposing a monolith into microservices?",
    "options": [
      {
        "id": "A",
        "text": "Independent deployability: services can be built, tested, and deployed to production on separate release cycles."
      },
      {
        "id": "B",
        "text": "Guaranteed transactional ACID consistency across all service boundaries without two-phase commit protocols."
      },
      {
        "id": "C",
        "text": "Complete elimination of network latency, inter-process serialization overhead, and distributed tracing needs."
      },
      {
        "id": "D",
        "text": "Team autonomy: engineering teams can own domain boundaries end-to-end and adopt tailored technology stacks."
      },
      {
        "id": "E",
        "text": "Fault isolation: failures or resource exhaustion in one service do not automatically bring down unrelated services."
      }
    ],
    "correct": [
      "A",
      "D",
      "E"
    ],
    "requiredCount": 3,
    "explanation": "Why this is correct:\n• Independent Deployability: Services can be built, tested, and deployed to production independently without redeploying the entire system.\n• Autonomous Scaling: Specific bottlenecks (e.g., payment processing vs search) can be scaled horizontally without scaling the entire monolith.\n• Fault Isolation: A failure in an isolated microservice (e.g. recommendation engine) does not bring down the entire application.\n\nWhy other options are incorrect:\n• Microservices do NOT eliminate network latency; distributed network calls introduce latency and network failure modes that monoliths do not have.\n• Microservices do NOT guarantee zero-latency transactions; distributed transactions (Saga pattern) are significantly more complex than monolithic ACID transactions."
  },
  {
    "id": 100,
    "category": "Architecture",
    "question": "Which THREE strategies are standard approaches for scaling relational database tiers under heavy workloads?",
    "options": [
      {
        "id": "A",
        "text": "Disabling database write-ahead logging (WAL) permanently to eliminate storage subsystem input/output latency."
      },
      {
        "id": "B",
        "text": "Sharding (horizontal partitioning) to distribute data across multiple distinct database instances by partition key."
      },
      {
        "id": "C",
        "text": "Introducing an in-memory caching layer (such as Redis) to serve high-frequency repetitive queries without hitting disk."
      },
      {
        "id": "D",
        "text": "Configuring all table columns as unindexed text fields to accelerate write throughput on the primary instance."
      },
      {
        "id": "E",
        "text": "Adding read replicas to offload read-heavy query traffic from the primary write master node."
      }
    ],
    "correct": [
      "B",
      "C",
      "E"
    ],
    "requiredCount": 3,
    "explanation": "Why this is correct:\n• Database Scaling Strategies:\n  - Read Replicas: Direct read queries (`SELECT`) to asynchronous replica databases, offloading read traffic from the primary read-write node.\n  - Horizontal Sharding: Partitioning tables horizontally across multiple database servers based on a shard key (e.g. `tenant_id` or `user_id`).\n  - Connection Pooling (HikariCP): Maintaining a pool of reusable database connections to prevent the high cost of opening/closing TCP connections.\n\nWhy other options are incorrect:\n• Disabling write-ahead logging (WAL) destroys ACID Durability and causes catastrophic data loss during system crashes.\n• Storing all binary images and video files directly in relational database BLOB columns creates extreme bloat and degrades performance; object stores like AWS S3 should be used instead."
  },
  {
    "id": 101,
    "category": "Architecture",
    "question": "Which TWO diagnostic techniques are recommended starting points when troubleshooting slow database queries?",
    "options": [
      {
        "id": "A",
        "text": "Auditing application ORM data-access patterns to detect and eliminate N+1 select query loops using fetch joins."
      },
      {
        "id": "B",
        "text": "Immediately increasing the connection pool size to ten thousand to allow queued queries to wait in memory buffers."
      },
      {
        "id": "C",
        "text": "Inspecting the database query execution plan using `EXPLAIN ANALYZE` to check for unindexed full table scans."
      },
      {
        "id": "D",
        "text": "Disabling relational database transaction logging permanently to eliminate storage subsystem write overhead."
      }
    ],
    "correct": [
      "A",
      "C"
    ],
    "requiredCount": 2,
    "explanation": "Why this is correct:\n• Thread Dumps (`jstack`, `jcmd <pid> Thread.print`): Capture the execution stack trace and lock states of all threads. Essential for diagnosing thread contention, deadlocks (BLOCKED threads), and CPU spikes (RUNNABLE threads in tight loops).\n• Heap Dumps (`jcmd <pid> GC.heap_dump`, `-XX:+HeapDumpOnOutOfMemoryError`): Capture an instantaneous snapshot of all heap objects. Essential for analyzing memory leaks and identifying which object classes consume the most memory using tools like Eclipse Memory Analyzer (MAT).\n\nWhy other options are incorrect:\n• Deleting the Linux swap partition does not solve JVM memory leaks and can cause kernel panic / OOM killer terminations.\n• Restarting servers without capturing dumps destroys volatile memory state, discarding critical diagnostic evidence needed for root cause analysis."
  },
  {
    "id": 102,
    "category": "Architecture",
    "question": "Which TWO design principles enable scaling a stateless application tier horizontally across multiple server instances?",
    "options": [
      {
        "id": "A",
        "text": "Pinning user sessions permanently to specific server instances and storing uploaded files on local container disks."
      },
      {
        "id": "B",
        "text": "Configuring all distributed application instances to execute background batch jobs concurrently without distributed locks."
      },
      {
        "id": "C",
        "text": "Externalizing user session state and mutable data into centralized distributed stores like Redis or managed databases."
      },
      {
        "id": "D",
        "text": "Deploying identical container instances behind a layer 7 load balancer using round-robin or least-connections routing."
      }
    ],
    "correct": [
      "C",
      "D"
    ],
    "requiredCount": 2,
    "explanation": "Why this is correct:\n• Externalizing Session State: Storing session state externally (e.g. in Redis, Memcached, or distributed caches) ensures that requests can be routed to any instance by a load balancer without losing user state.\n• Idempotency & Statelessness: Designing endpoints so that requests carry all necessary context and can be safely retried enables the load balancer to scale instances up or down dynamically behind a round-robin or least-connections policy.\n\nWhy other options are incorrect:\n• Sticky sessions (session affinity) tie users to specific server nodes, preventing even traffic distribution and hindering autoscaling when instances scale down.\n• Storing user file uploads on local ephemeral server filesystems causes data loss when requests hit different instances or when instances terminate during autoscaling."
  },
  {
    "id": 103,
    "category": "Architecture",
    "question": "Which THREE Maven dependency scopes accurately match their standard classpath and packaging behaviors?",
    "options": [
      {
        "id": "A",
        "text": "`compile` (default): available on all classpaths during build, test execution, and packaged into the final artifact."
      },
      {
        "id": "B",
        "text": "`provided`: required for compiling code, but expected to be supplied at runtime by the container (and thus not packaged)."
      },
      {
        "id": "C",
        "text": "`system`: automatically downloads missing artifact dependencies from remote public artifact repositories on demand."
      },
      {
        "id": "D",
        "text": "`runtime`: required for compiling production source code, but excluded from test execution and final deployment archives."
      },
      {
        "id": "E",
        "text": "`test`: available exclusively for test compilation and test execution, and never packaged into production JAR/WAR archives."
      }
    ],
    "correct": [
      "A",
      "B",
      "E"
    ],
    "requiredCount": 3,
    "explanation": "Why this is correct:\n• `compile` (default scope): Dependency is required and available across all classpaths (build/compile, test execution, runtime). It is packaged into the final artifact.\n• `provided`: Dependency is required for compilation and testing, but is expected to be provided by the runtime container (e.g., `servlet-api` provided by Tomcat). It is NOT packaged in the WAR/JAR.\n• `test`: Dependency is required only for compiling and running test classes (e.g. `junit-jupiter`, `mockito-core`). It is omitted from the production compile classpath and final artifact packaging.\n\nWhy other options are incorrect:\n• `runtime` scope indicates the dependency is NOT needed for compilation, but is required at execution time (e.g., JDBC driver implementation).\n• `system` scope requires an explicit system path to a local JAR and is generally discouraged."
  },
  {
    "id": 104,
    "category": "Architecture",
    "question": "Which TWO statements correctly contrast direct and transitive dependencies in Maven projects?",
    "options": [
      {
        "id": "A",
        "text": "Transitive dependencies are dependencies required by your direct dependencies, which Maven resolves and includes automatically."
      },
      {
        "id": "B",
        "text": "Direct dependencies are explicitly declared in the project's `pom.xml` `<dependencies>` configuration section."
      },
      {
        "id": "C",
        "text": "Maven rejects transitive dependencies unless each transitive artifact is also explicitly redeclared in `pom.xml`."
      },
      {
        "id": "D",
        "text": "Direct dependencies are loaded into the JVM heap; transitive dependencies reside exclusively in Metaspace native memory."
      }
    ],
    "correct": [
      "A",
      "B"
    ],
    "requiredCount": 2,
    "explanation": "Why this is correct:\n• Direct Dependencies: Explicitly declared in your project's `pom.xml` `<dependencies>` section.\n• Transitive Dependencies: Dependencies required by your direct dependencies. Maven resolves the transitive dependency graph automatically.\n• Dependency Mediation Rule: When conflicting versions of a transitive dependency appear, Maven uses the \"nearest definition\" rule: the version closest to your project's root in the dependency tree wins. If two versions are at the same depth, the first declared one wins.\n• Exclusion: Transitive dependencies can be excluded via the `<exclusions>` tag.\n\nWhy other options are incorrect:\n• Transitive dependencies are NOT automatically discarded; they are resolved and included unless excluded or overridden.\n• Direct dependencies do not inherit runtime scopes without standard resolution rules."
  },
  {
    "id": 105,
    "category": "Architecture",
    "question": "Which TWO mechanisms are standard components of distributed tracing implementations across microservice architectures?",
    "options": [
      {
        "id": "A",
        "text": "Configuring all distributed microservices to stream unstructured raw text files into a single shared database table."
      },
      {
        "id": "B",
        "text": "Generating a unique Trace ID at the ingress gateway and propagating it across services via standardized HTTP headers."
      },
      {
        "id": "C",
        "text": "Serializing complete JVM thread stack memory dumps into URL query string parameters for every inter-service call."
      },
      {
        "id": "D",
        "text": "Injecting the correlation ID into application logging frameworks (MDC) so log aggregators can correlate service events."
      }
    ],
    "correct": [
      "B",
      "D"
    ],
    "requiredCount": 2,
    "explanation": "Why this is correct:\n• Trace Context Propagation: In distributed tracing (W3C Trace Context standard / OpenTelemetry), every user request is assigned a unique `TraceId`, and each service-to-service hop is assigned a `SpanId`.\n• HTTP Header Propagation: These identifiers are injected into outbound HTTP request headers (e.g. `traceparent: 00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01`) and extracted by downstream services, linking disparate service logs and spans into a single end-to-end distributed trace.\n\nWhy other options are incorrect:\n• Distributed tracing does NOT require a single shared monolithic SQL database; modern tracing backends (Jaeger, Zipkin, Tempo) use distributed columnar or document storage.\n• Tracing does not run synchronous locking across network boundaries."
  },
  {
    "id": 106,
    "category": "Architecture",
    "question": "Which THREE agile ceremonies are defined as core recurring events in the official Scrum Framework?",
    "options": [
      {
        "id": "A",
        "text": "Release Code Freeze: a mandatory two-week milestone where all developer code commits are strictly prohibited."
      },
      {
        "id": "B",
        "text": "Sprint Retrospective: an event at sprint conclusion for the team to inspect processes and plan quality improvements."
      },
      {
        "id": "C",
        "text": "Sprint Planning: a collaborative event where the Scrum team scopes and plans the work to be completed in the sprint."
      },
      {
        "id": "D",
        "text": "Architecture Review Board: a monthly committee meeting where external managers approve UML class inheritance designs."
      },
      {
        "id": "E",
        "text": "Daily Scrum: a 15-minute daily synchronization event for developers to inspect progress toward the Sprint Goal."
      }
    ],
    "correct": [
      "B",
      "C",
      "E"
    ],
    "requiredCount": 3,
    "explanation": "Why this is correct:\n• Official Scrum Events (The Scrum Guide by Ken Schwaber & Jeff Sutherland):\n  1. Sprint Planning: The team inspects the Product Backlog and defines what can be delivered in the Sprint and how that work will be achieved (creating the Sprint Backlog).\n  2. Daily Scrum (Standup): 15-minute daily event for developers to inspect progress toward the Sprint Goal and adapt the Sprint Backlog.\n  3. Sprint Review: Held at the end of the Sprint to inspect the Increment and adapt the Product Backlog with stakeholders.\n  4. Sprint Retrospective: The team inspects how the Sprint went regarding individuals, interactions, processes, and tools, creating an improvement plan.\n\nWhy other options are incorrect:\n• Backlog Refinement (Grooming) is an ongoing collaborative activity, but is not officially classified as a formal Scrum ceremony/event.\n• Architectural Governance Board is a corporate enterprise meeting, not an official Scrum event."
  },
  {
    "id": 107,
    "category": "Modern Java",
    "question": "Which THREE features are automatically generated by the Java compiler for a `record` class (Java 16+)?",
    "options": [
      {
        "id": "A",
        "text": "`private final` fields for all declared components, ensuring shallow immutability across record instances."
      },
      {
        "id": "B",
        "text": "A default parameterless constructor that initializes all declared primitive record components to `-1`."
      },
      {
        "id": "C",
        "text": "Public JavaBean setter methods prefixed with `set` to allow mutating component fields after initialization."
      },
      {
        "id": "D",
        "text": "A canonical constructor with parameter types and names that match the record header component declaration."
      },
      {
        "id": "E",
        "text": "Public accessor methods matching component names (`name()`, `age()`) along with value-based `equals()`, `hashCode()`, and `toString()`."
      }
    ],
    "correct": [
      "A",
      "D",
      "E"
    ],
    "requiredCount": 3,
    "explanation": "Why this is correct:\n• Java Records (Java 16+): Designed as transparent, immutable data carriers.\n• Automatically Generated by Compiler:\n  1. Canonical Constructor whose parameter list matches the record components.\n  2. Public accessor methods for each component, named after the component (e.g. `record Point(int x, int y)` gets `x()` and `y()`, NOT `getX()`).\n  3. Correct implementations of `equals()` and `hashCode()` that compare all record components.\n  4. A descriptive `toString()` showing component names and values.\n\nWhy other options are incorrect:\n• Records do NOT generate JavaBean-style `get...()` prefixes; accessors use the exact component name.\n• Records do NOT generate setter methods because record fields are implicitly `private final` and immutable."
  },
  {
    "id": 108,
    "category": "Modern Java",
    "question": "Which TWO statements correctly describe the purpose and benefits of Sealed Classes and Interfaces (Java 17+)?",
    "options": [
      {
        "id": "A",
        "text": "They prevent subclasses from declaring any private instance variables or throwing checked exception types."
      },
      {
        "id": "B",
        "text": "They enable exhaustive pattern matching with `switch`, allowing the compiler to verify that all possible subtypes are handled."
      },
      {
        "id": "C",
        "text": "They encrypt compiled class bytecode on disk so that only authorized, cryptographically signed class loaders can read them."
      },
      {
        "id": "D",
        "text": "They restrict which specific subclasses or implementations are permitted to extend or implement them using `permits`."
      }
    ],
    "correct": [
      "B",
      "D"
    ],
    "requiredCount": 2,
    "explanation": "Why this is correct:\n• Sealed Classes (Java 17 / JEP 409): Allow a class or interface to explicitly restrict which classes or interfaces may extend or implement it using the `permits` keyword.\n• Domain Modeling & Security: Provides developers with strict control over class hierarchies, preventing unauthorized third-party subclasses from extending sensitive business or framework models.\n• Exhaustive Pattern Matching: When combined with pattern matching in `switch`, the compiler knows all permitted subtypes at compile time, eliminating the requirement for a fallback `default` clause.\n\nWhy other options are incorrect:\n• Sealed classes do NOT bypass heap allocation or store instances in Metaspace.\n• Sealed classes do not prohibit all subclassing; they permit explicitly listed subclasses."
  },
  {
    "id": 109,
    "category": "Modern Java",
    "question": "Which TWO advantages are introduced by Pattern Matching for `instanceof` (Java 16+)?",
    "options": [
      {
        "id": "A",
        "text": "It forces the Java Virtual Machine to retain all generic collection type arguments at runtime, disabling type erasure."
      },
      {
        "id": "B",
        "text": "It converts regular expression pattern searches into native machine instructions to optimize string parsing."
      },
      {
        "id": "C",
        "text": "It combines type checking and conditional variable extraction into a single statement (`if (obj instanceof String s)`)."
      },
      {
        "id": "D",
        "text": "It eliminates the boilerplate and potential runtime bugs associated with redundant explicit downcasting operations."
      }
    ],
    "correct": [
      "C",
      "D"
    ],
    "requiredCount": 2,
    "explanation": "Why this is correct:\n• Pattern Matching for `instanceof` (Java 16 / JEP 394): Combines the type test and conditional extraction into a single concise expression:\n```java\n// Traditional:\nif (obj instanceof String) {\n    String s = (String) obj; // Redundant boilerplate cast\n    System.out.println(s.length());\n}\n// Pattern Matching:\nif (obj instanceof String s) {\n    System.out.println(s.length()); // Directly accessible!\n}\n```\n• Flow Scoping: The pattern variable `s` is only in scope where the condition is known to be true. For example: `if (obj instanceof String s && s.length() > 5)` is valid because `&&` short-circuits, guaranteeing `s` is initialized.\n\nWhy other options are incorrect:\n• It does not disable type erasure or alter generic bytecode.\n• Pattern matching does not cause objects to be allocated in thread CPU registers."
  },
  {
    "id": 110,
    "category": "Modern Java",
    "question": "Which TWO statements correctly contrast Virtual Threads (Project Loom / Java 21) with traditional platform threads?",
    "options": [
      {
        "id": "A",
        "text": "Applications can spawn millions of concurrent virtual threads with negligible memory footprint (~a few KB stack each)."
      },
      {
        "id": "B",
        "text": "Virtual threads are lightweight, JVM-managed user-mode threads that unmount from carrier threads during blocking I/O."
      },
      {
        "id": "C",
        "text": "Virtual threads execute directly in kernel space and consume 1MB of physical operating system stack memory per thread."
      },
      {
        "id": "D",
        "text": "Virtual threads strictly prohibit the execution of blocking socket reads and require reactive non-blocking API syntax."
      }
    ],
    "correct": [
      "A",
      "B"
    ],
    "requiredCount": 2,
    "explanation": "Why this is correct:\n• Platform Threads: Bound 1:1 to operating system kernel threads. They are heavy (~1MB stack), expensive to create, and context switches involve OS kernel transitions.\n• Virtual Threads (Project Loom / Java 21): Lightweight threads managed directly by the Java Virtual Machine. Millions of virtual threads can run concurrently.\n• M:N Scheduling: The JVM mounts virtual threads onto a small pool of carrier platform threads (typically equal to `Runtime.getRuntime().availableProcessors()`). When a virtual thread performs a blocking I/O operation (e.g. socket read, JDBC query), the JVM unmounts it from the carrier thread until the I/O completes, allowing the carrier thread to execute other virtual threads.\n\nWhy other options are incorrect:\n• Virtual threads do NOT execute faster for CPU-bound computations; they are designed specifically to provide high throughput for IO-bound blocking operations.\n• Virtual threads do not have shared stack memory; each virtual thread maintains its own call stack (stored in the heap)."
  },
  {
    "id": 111,
    "category": "Modern Java",
    "question": "Which TWO design practices reflect idiomatic, intended usage of `java.util.Optional` in Java?",
    "options": [
      {
        "id": "A",
        "text": "Use `Optional` primarily as a method return type to clearly signal to callers that a return value may be absent."
      },
      {
        "id": "B",
        "text": "Transform and unwrap `Optional` values using functional methods like `.map()`, `.flatMap()`, `.orElse()`, and `.orElseThrow()`."
      },
      {
        "id": "C",
        "text": "Use `Optional` as method parameter types to avoid creating overloaded method signatures for optional arguments."
      },
      {
        "id": "D",
        "text": "Declare `Optional` as class instance fields to ensure all JavaBean domain properties support serialization safely."
      }
    ],
    "correct": [
      "A",
      "B"
    ],
    "requiredCount": 2,
    "explanation": "Why this is correct:\n• Primary Purpose: `java.util.Optional<T>` was designed specifically as a method return type to clearly indicate that a method may return no value, forcing callers to explicitly consider and handle the empty case.\n• Functional Processing: Idiomatic usage leverages functional chaining methods such as `map()`, `flatMap()`, `filter()`, `orElseGet()`, and `ifPresent()`.\n• Anti-Patterns:\n  - Using `Optional` for class fields: `Optional` does not implement `Serializable`.\n  - Using `Optional` as method parameters: Clutters call sites with `Optional.of(...)` instead of natural arguments or method overloading.\n  - Blindly calling `opt.get()` without `isPresent()`.\n\nWhy other options are incorrect:\n• Calling `Optional.of(null)` throws an immediate `NullPointerException`; you must use `Optional.ofNullable(null)`.\n• Declaring `Optional` instance fields in domain entities breaks serialization and increases heap memory overhead."
  },
  {
    "id": 112,
    "category": "Modern Java",
    "question": "Which THREE characteristics accurately define collections created via `List.of()`, `Set.of()`, and `Map.of()` (Java 9+)?",
    "options": [
      {
        "id": "A",
        "text": "They create shallow mutable wrappers that permit modifying underlying elements via index `set()` operations."
      },
      {
        "id": "B",
        "text": "They synchronize all internal method calls using intrinsic monitor locks to provide synchronized thread safety."
      },
      {
        "id": "C",
        "text": "`Set.of()` and `Map.of()` reject duplicate elements or keys at creation time, throwing `IllegalArgumentException`."
      },
      {
        "id": "D",
        "text": "They strictly prohibit `null` elements or keys, immediately throwing `NullPointerException` if any `null` is supplied."
      },
      {
        "id": "E",
        "text": "They are structurally immutable; invoking modifying methods (`add`, `remove`, `set`) throws `UnsupportedOperationException`."
      }
    ],
    "correct": [
      "C",
      "D",
      "E"
    ],
    "requiredCount": 3,
    "explanation": "Why this is correct:\n• Unmodifiable: Collections produced by `List.of()`, `Set.of()`, and `Map.of()` are structurally immutable. Calling mutation methods (`add()`, `remove()`, `set()`, `clear()`) throws `UnsupportedOperationException`.\n• Null Prohibition: Passing `null` elements (or keys/values in maps) throws an immediate `NullPointerException`.\n• Compact Memory Footprint: Unlike `ArrayList` (which wraps an array with extra capacity), `List.of()` uses optimized internal classes with zero extra capacity overhead.\n\nWhy other options are incorrect:\n• They do NOT allow `null` values; `null` is rejected at creation.\n• They do NOT return mutable array copies; mutations are strictly disallowed."
  },
  {
    "id": 113,
    "category": "Modern Java",
    "question": "Which TWO statements describe the rules and scope governing the `var` keyword in Java (Java 10+)?",
    "options": [
      {
        "id": "A",
        "text": "`var` introduces dynamic typing at runtime, allowing a variable to be reassigned to arbitrary unrelated object types."
      },
      {
        "id": "B",
        "text": "`var` is restricted strictly to local variables, enhanced for-loop declarations, and try-with-resources resource variables."
      },
      {
        "id": "C",
        "text": "The compiler infers the static type of the variable from its mandatory initializer expression at compile time."
      },
      {
        "id": "D",
        "text": "`var` can be used to declare class instance fields, method parameters, and public interface return types."
      }
    ],
    "correct": [
      "B",
      "C"
    ],
    "requiredCount": 2,
    "explanation": "Why this is correct:\n• Local Variable Type Inference (`var`, Java 10 / JEP 286): The compiler infers the static type of the variable from the right-hand side initializer expression at compile time.\n• Still Statically Typed: `var` is NOT dynamic typing like in JavaScript or Python! Once inferred, the type is fixed and cannot hold values of incompatible types.\n• Restrictions:\n  - Allowed: Local variables inside methods, loop control variables, and resource variables in `try-with-resources`.\n  - Prohibited: Class instance/static fields, method parameter types, method return types, and variables without initializers (`var x;` fails compilation).\n\nWhy other options are incorrect:\n• `var` can NOT be used for class fields, method parameters, or return types.\n• `var` does not represent dynamic typing; it is strictly static typing inferred by `javac`."
  },
  {
    "id": 114,
    "category": "Core Java",
    "question": "Which TWO statements correctly contrast the `==` reference operator and the `equals()` method in Java?",
    "options": [
      {
        "id": "A",
        "text": "`==` evaluates logical content equivalence for all classes that implement the `java.lang.Comparable` interface."
      },
      {
        "id": "B",
        "text": "`equals()` evaluates logical equivalence based on object content when appropriately overridden by the target class."
      },
      {
        "id": "C",
        "text": "`equals()` cannot be overridden by subclasses because it is declared `final` on `java.lang.Object`."
      },
      {
        "id": "D",
        "text": "`==` compares reference identity (whether two object variables point to the exact same memory address on the heap)."
      }
    ],
    "correct": [
      "B",
      "D"
    ],
    "requiredCount": 2,
    "explanation": "Why this is correct:\n• Reference Comparison (`==`): Evaluates whether two reference variables point to the exact same memory address on the heap (identity equality).\n• Content Comparison (`equals()`): Evaluates whether two objects are logically equal in value or state according to their overridden implementation of `equals()`.\n• Inherited Default: By default, `java.lang.Object.equals()` performs reference identity check (`return this == obj;`), which is why classes like `String`, `Integer`, and `LocalDate` override it to compare field values.\n\nWhy other options are incorrect:\n• `==` cannot be overloaded in Java; operator overloading is not supported in the Java language.\n• Primitive types cannot use `equals()` because primitives are not objects; primitives are compared using `==`."
  },
  {
    "id": 115,
    "category": "Core Java",
    "question": "Which TWO statements explain why `hashCode()` and `equals()` must be implemented consistently in hash collections?",
    "options": [
      {
        "id": "A",
        "text": "If two objects produce identical hash codes, they are mathematically guaranteed to evaluate as equal via `equals()`."
      },
      {
        "id": "B",
        "text": "The collection uses `hashCode()` to compute the bucket array index and `equals()` to find the matching key in that bucket."
      },
      {
        "id": "C",
        "text": "If two objects are considered equal by `equals()`, they must produce the exact same integer return value from `hashCode()`."
      },
      {
        "id": "D",
        "text": "Hash collections ignore `equals()` entirely and rely exclusively on 32-bit hash codes to identify unique stored keys."
      }
    ],
    "correct": [
      "B",
      "C"
    ],
    "requiredCount": 2,
    "explanation": "Why this is correct:\n• The General Contract: If two objects are equal according to `equals(Object)`, they MUST produce the identical integer result from `hashCode()`.\n• Hash Bucket Placement: Hash collections (`HashMap`, `HashSet`, `Hashtable`) calculate an entry's bucket index using `hash & (capacity - 1)`. If two equal objects have different hash codes, they are assigned to different buckets, making it impossible for `map.get(key)` to find the existing value!\n• Hash Collisions: Two unequal objects MAY produce the same hash code (a collision); collisions are placed in the same bucket (chained via linked list or tree).\n\nWhy other options are incorrect:\n• Two objects with identical hash codes are NOT required to be equal; hash collisions are expected and allowed.\n• Overriding `equals()` does not automatically override `hashCode()`; you must explicitly override both."
  },
  {
    "id": 116,
    "category": "Concurrency",
    "question": "Which THREE programming patterns and synchronization tools promote thread safety in Java concurrent applications?",
    "options": [
      {
        "id": "A",
        "text": "Immutability: designing objects whose state cannot be modified after construction, eliminating synchronization needs."
      },
      {
        "id": "B",
        "text": "Atomic variables: using `java.util.concurrent.atomic` classes to execute lock-free compare-and-swap (CAS) memory updates."
      },
      {
        "id": "C",
        "text": "Thread interruption: calling `Thread.stop()` on long-running threads to clear memory race conditions automatically."
      },
      {
        "id": "D",
        "text": "Synchronization: using `synchronized` blocks or `ReentrantLock` to enforce mutual exclusion on critical code sections."
      },
      {
        "id": "E",
        "text": "Global static fields: sharing unsynchronized mutable data across threads to allow direct memory bus register access."
      }
    ],
    "correct": [
      "A",
      "B",
      "D"
    ],
    "requiredCount": 3,
    "explanation": "Why this is correct:\n• `AtomicInteger`, `AtomicLong`, `AtomicReference`: Provide lock-free, atomic operations using low-level hardware Compare-And-Swap (CAS) instructions.\n• `CopyOnWriteArrayList`: A thread-safe `List` implementation where all mutative operations (`add`, `set`) make a fresh copy of the underlying array, enabling lock-free reads without `ConcurrentModificationException`.\n• Immutable Objects: Classes whose state cannot change after instantiation can be safely shared across threads with zero synchronization.\n\nWhy other options are incorrect:\n• `ArrayList` is NOT thread-safe; unsynchronized concurrent access causes race conditions, lost updates, and `ConcurrentModificationException`.\n• Standard static fields are shared across all threads and without synchronization or `volatile` access, they are prone to data races."
  },
  {
    "id": 117,
    "category": "Core Java",
    "question": "Which THREE statements accurately describe the requirements and behavior of Try-With-Resources statements?",
    "options": [
      {
        "id": "A",
        "text": "Resources are closed only if the try block completes successfully without encountering any checked exceptions."
      },
      {
        "id": "B",
        "text": "Resources are closed automatically in reverse order of their declaration upon leaving the try-with-resources block."
      },
      {
        "id": "C",
        "text": "Declared resource variables must implement `java.lang.AutoCloseable` (or its subinterface `java.io.Closeable`)."
      },
      {
        "id": "D",
        "text": "Try-with-resources statements prohibit declaring `catch` or `finally` blocks attached to the try resource header."
      },
      {
        "id": "E",
        "text": "Exceptions thrown during resource closure are added as suppressed exceptions to any primary exception thrown in the try block."
      }
    ],
    "correct": [
      "B",
      "C",
      "E"
    ],
    "requiredCount": 3,
    "explanation": "Why this is correct:\n• `AutoCloseable` Contract: The resource type must implement `java.lang.AutoCloseable` (or its child `java.io.Closeable`). The compiler automatically emits cleanup bytecode ensuring `close()` is invoked upon exiting the `try` block.\n• Execution Order: Resources are closed in the REVERSE order of their declaration in the `try (...)` parentheses.\n• Suppressed Exceptions: If an exception is thrown in the `try` block AND an exception is thrown while closing the resource, the try block exception is propagated to the caller, and the close exception is attached to it as a suppressed exception (retrievable via `ex.getSuppressed()`).\n\nWhy other options are incorrect:\n• Resources are NOT closed in the forward order of declaration; they are closed in reverse order.\n• Close exceptions are NOT discarded silently; they are attached as suppressed exceptions."
  },
  {
    "id": 118,
    "category": "Collections",
    "question": "What is `java.util.EnumSet` and why is it preferred over `HashSet` for enum types?",
    "options": [
      {
        "id": "A",
        "text": "An unmodifiable collection created by the compiler that prevents adding new instances of enums at runtime."
      },
      {
        "id": "B",
        "text": "A legacy collection from Java 1.0 designed exclusively for serializing enum ordinal integers to binary streams."
      },
      {
        "id": "C",
        "text": "A specialized `Set` implementation backed internally by bit vectors (e.g. `long`), offering superior speed and minimal memory."
      },
      {
        "id": "D",
        "text": "A synchronized thread-safe wrapper around a `TreeSet` that automatically alphabetizes enum constant name declarations."
      }
    ],
    "correct": [
      "C"
    ],
    "requiredCount": 1,
    "explanation": "Why this is correct:\n• Implementation: `EnumSet` is implemented internally as a bit vector (`RegularEnumSet` using a single `long` for enums with $\\le 64$ constants, or `JumboEnumSet` using a `long[]` array).\n• Performance: Operations like `contains()`, `add()`, and bulk operations (`containsAll()`, `addAll()`) are compiled down to extremely fast bitwise CPU instructions (`AND`, `OR`, `NOT`), outperforming `HashSet` by a wide margin while using negligible memory.\n• Null Safety: `EnumSet` does not permit `null` elements (throws `NullPointerException`).\n\nWhy other options are incorrect:\n• `EnumSet` does NOT use a dynamic hash table with open addressing.\n• It is not an immutable collection by default; instances created via `EnumSet.of()` are mutable."
  },
  {
    "id": 119,
    "category": "JVM & GC",
    "question": "What is the key functional difference between a Weak Reference and a Strong Reference in Java?",
    "options": [
      {
        "id": "A",
        "text": "Strong references can only reference primitive types; weak references can only reference collection implementations."
      },
      {
        "id": "B",
        "text": "Strong references are cleared on every minor GC cycle; weak references remain alive until full JVM system shutdown."
      },
      {
        "id": "C",
        "text": "Weak references are stored exclusively in Metaspace; strong references are allocated exclusively within CPU L2 cache."
      },
      {
        "id": "D",
        "text": "Strong references prevent garbage collection; weak references do not prevent collection once only weakly reachable."
      }
    ],
    "correct": [
      "D"
    ],
    "requiredCount": 1,
    "explanation": "Why this is correct:\n• Strong Reference (`Object o = new Object()`): The default reference in Java. An object with an active chain of strong references from GC roots is immune to garbage collection. The JVM will throw `OutOfMemoryError` before collecting it.\n• Weak Reference (`WeakReference<T>`): Does not prevent GC. When the garbage collector runs, if an object is only weakly reachable (no strong or soft references remain), it is immediately cleared and scheduled for finalization/reclamation, regardless of available memory.\n\nWhy other options are incorrect:\n• Weak references do NOT survive GC until memory exhaustion; that describes Soft References (`SoftReference`).\n• Weak references are not stored in Metaspace; they reside on the heap like other objects."
  },
  {
    "id": 120,
    "category": "REST & Web",
    "question": "Which TWO HTTP methods are classified as both 'safe' and 'idempotent' according to HTTP/1.1 specifications?",
    "options": [
      {
        "id": "A",
        "text": "`GET`, which retrieves a representation without modifying origin server resource state."
      },
      {
        "id": "B",
        "text": "`POST`, which is safe because clients can submit arbitrary JSON payloads without modifying schemas."
      },
      {
        "id": "C",
        "text": "`HEAD`, which retrieves header metadata identically to `GET` without altering server state."
      },
      {
        "id": "D",
        "text": "`DELETE`, which is safe because deleting a resource leaves the server in a clean operating state."
      }
    ],
    "correct": [
      "A",
      "C"
    ],
    "requiredCount": 2,
    "explanation": "Why this is correct:\n• Safe Methods (RFC 7231): Read-only operations that do not alter the resource state on the origin server (`GET`, `HEAD`, `OPTIONS`, `TRACE`).\n• Idempotent Methods (RFC 7231): Operations where the intended effect on the server of multiple identical requests is the same as for a single request (`GET`, `HEAD`, `PUT`, `DELETE`).\n• Intersection: `GET` and `HEAD` are both safe AND idempotent.\n\nWhy other options are incorrect:\n• `POST` is NEITHER safe nor idempotent.\n• `PUT` and `DELETE` are idempotent, but they are NOT safe because they modify/delete resources on the server."
  },
  {
    "id": 121,
    "category": "Spring & Hibernate",
    "question": "Which TWO statements correctly describe the default exception rollback behavior of Spring `@Transactional`?",
    "options": [
      {
        "id": "A",
        "text": "It automatically rolls back for all checked and unchecked exceptions without requiring any custom configuration."
      },
      {
        "id": "B",
        "text": "It triggers automatic transaction rollback when an unchecked exception (`RuntimeException` or `Error`) is thrown."
      },
      {
        "id": "C",
        "text": "It commits the transaction by default when a checked exception (e.g. `Exception`, `IOException`) is thrown."
      },
      {
        "id": "D",
        "text": "It disables rollback behavior completely unless explicitly paired with a Hibernate entity interceptor class."
      }
    ],
    "correct": [
      "B",
      "C"
    ],
    "requiredCount": 2,
    "explanation": "Why this is correct:\n• Default Rollback Rule: In Spring's `@Transactional`, a transaction rolls back automatically on Unchecked Exceptions (`RuntimeException` and `Error`).\n• Checked Exceptions: By default, Spring does NOT roll back on Checked Exceptions (`Exception` subclasses like `IOException` or `SQLException`); it commits the transaction!\n• Customization: To roll back on checked exceptions, use the `rollbackFor` attribute: `@Transactional(rollbackFor = Exception.class)`.\n\nWhy other options are incorrect:\n• Spring does NOT roll back on checked exceptions by default.\n• The `noRollbackFor` attribute prevents rollback, rather than configuring it."
  },
  {
    "id": 122,
    "category": "Testing & Design",
    "question": "Which statement accurately captures the Interface Segregation Principle (ISP) from SOLID design?",
    "options": [
      {
        "id": "A",
        "text": "Clients should not be forced to depend upon methods they do not use; prefer small, cohesive, focused interfaces."
      },
      {
        "id": "B",
        "text": "Classes must be open for extension but closed for modification by utilizing inheritance hierarchies exclusively."
      },
      {
        "id": "C",
        "text": "Subclasses must be completely substitutable for their base types without altering program correctness or contracts."
      },
      {
        "id": "D",
        "text": "High-level modules should not depend on low-level modules; both should depend on abstract interfaces."
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "Why this is correct:\n• Interface Segregation Principle (ISP - the 'I' in SOLID, Robert C. Martin):\n  \"Clients should not be forced to depend upon interfaces that they do not use.\"\n• Best Practice: Prefer many small, cohesive, client-specific interfaces over one large, monolithic \"fat\" interface. When an interface is too broad, implementors are forced to write empty or dummy implementations (e.g. `throw new UnsupportedOperationException()`) for irrelevant methods.\n\nWhy other options are incorrect:\n• Single Responsibility Principle (SRP) states a class should have one reason to change.\n• Liskov Substitution Principle (LSP) governs subtype substitutability.\n• Dependency Inversion Principle (DIP) states high-level modules should depend on abstractions."
  },
  {
    "id": 123,
    "category": "Core Java",
    "question": "Which statement regarding hash collisions in Java `hashCode()` and `equals()` is mathematically and technically true?",
    "options": [
      {
        "id": "A",
        "text": "If two objects produce the same hash code, they are guaranteed to return `true` from `equals()`."
      },
      {
        "id": "B",
        "text": "Equal objects must have the same hash code; distinct objects can have the same hash code (a hash collision)."
      },
      {
        "id": "C",
        "text": "Distinct objects must always produce distinct hash codes; equal objects can have different hash codes."
      },
      {
        "id": "D",
        "text": "Hash collisions in `HashMap` cause the JVM to immediately throw a `ConcurrentModificationException`."
      }
    ],
    "correct": [
      "B"
    ],
    "requiredCount": 1,
    "explanation": "Why this is correct:\n• The Pigeonhole Principle: In Java, `hashCode()` returns a 32-bit signed integer (`int`), which can represent at most $2^{32}$ (about 4.3 billion) distinct values.\n• Because the number of possible object states (e.g. all possible `String` combinations) is infinite, distinct objects WILL inevitably map to identical hash codes (hash collision).\n• The contract dictates:\n  - Equal objects MUST have equal hash codes.\n  - Unequal objects CAN share the same hash code.\n• Hash collisions are expected and handled in hash tables via separate chaining (linked list / red-black tree) or open addressing.\n\nWhy other options are incorrect:\n• Collisions do NOT throw an exception or invalidate the collection.\n• Hash algorithms cannot guarantee zero collisions across all input domains within 32 bits."
  },
  {
    "id": 124,
    "category": "Collections",
    "question": "What is the correct way to randomize the order of elements in a `List` in Java?",
    "options": [
      {
        "id": "A",
        "text": "`Arrays.sort(list, Comparator.randomOrder());` to sort the list with a pseudo-random comparator."
      },
      {
        "id": "B",
        "text": "`list = Collections.shuffle(list);` to assign the newly returned shuffled list copy to the variable."
      },
      {
        "id": "C",
        "text": "`Collections.shuffle(list);` to permute the elements in-place using the default or custom random source."
      },
      {
        "id": "D",
        "text": "`list.stream().unordered().collect(Collectors.toList());` to randomize stream processing order."
      }
    ],
    "correct": [
      "C"
    ],
    "requiredCount": 1,
    "explanation": "Why this is correct:\n• `java.util.Collections.shuffle(List<?> list)` is the standard, optimized method for randomizing list element order.\n• It runs in $O(n)$ time using the Fisher-Yates (Knuth) shuffling algorithm.\n• It operates directly in place on the provided list. An overloaded variant `Collections.shuffle(list, Random rnd)` accepts a custom pseudo-random number generator for deterministic testing.\n\nWhy other options are incorrect:\n• `list.sort(Comparator.comparing(x -> Math.random()))` is flawed, violates the transitive contract of `Comparator`, and can throw `IllegalArgumentException: Comparison method violates its general contract!`.\n• `Arrays.shuffle()` does not exist in standard Java."
  },
  {
    "id": 125,
    "category": "Architecture",
    "question": "Which THREE foundational telemetry data types constitute the Three Pillars of Observability in distributed systems?",
    "options": [
      {
        "id": "A",
        "text": "Structured Logs: discrete, timestamped event records capturing contextual execution detail within a service."
      },
      {
        "id": "B",
        "text": "Metrics: numerically measured aggregations (such as request rates, error counts, latency percentiles) over time."
      },
      {
        "id": "C",
        "text": "Distributed Tracing: end-to-end request journeys tracked across network hops using shared correlation IDs."
      },
      {
        "id": "D",
        "text": "Database Backups: automated point-in-time snapshots of relational storage disk volumes."
      },
      {
        "id": "E",
        "text": "Git Commit Diffs: source code revisions tracked in centralized version control repositories."
      }
    ],
    "correct": [
      "A",
      "B",
      "C"
    ],
    "requiredCount": 3,
    "explanation": "Why this is correct:\n• The Three Pillars of Observability in Distributed Systems:\n  1. Metrics: Numerically aggregable data measured over intervals of time (CPU usage, request rates, error counts, latency histograms), ideal for alerting and trend dashboards.\n  2. Logs: Discrete, timestamped, structured or unstructured textual records of events that occurred within a service.\n  3. Traces: Represent the end-to-end journey of a single request as it traverses distributed network boundaries, decomposing the request into timed spans.\n\nWhy other options are incorrect:\n• Unit tests, Git commits, and CI/CD pipelines are software development artifacts, not observability telemetry pillars."
  },
  {
    "id": 126,
    "category": "Core Java",
    "question": "Given the following method overload resolution scenario, which method is invoked by `test(10)`?\n\n```java\npublic class OverloadTest {\n    static void test(long x) { System.out.print(\"primitive \"); }\n    static void test(Integer x) { System.out.print(\"boxed \"); }\n    static void test(int... x) { System.out.print(\"varargs \"); }\n    \n    public static void main(String[] args) {\n        test(10);\n    }\n}\n```",
    "options": [
      {
        "id": "A",
        "text": "`varargs ` (variable arity is the default fallback for integer literals in Java expressions)."
      },
      {
        "id": "B",
        "text": "`boxed ` (autoboxing to `Integer` takes precedence over widening to primitive numeric types)."
      },
      {
        "id": "C",
        "text": "Compilation error due to ambiguity between the `test(long)` and `test(Integer)` method candidates."
      },
      {
        "id": "D",
        "text": "`primitive ` (primitive widening to `long` takes precedence over autoboxing and variable arity)."
      }
    ],
    "correct": [
      "D"
    ],
    "requiredCount": 1,
    "explanation": "Why this is correct:\n• Overload Resolution Rule (JLS §15.12.2): When multiple overloaded methods are applicable for an argument, the compiler chooses the **most specific** method.\n• Here, `null` is a valid argument for both `print(Object)` and `print(String)`.\n• Because `String` is a subtype of `Object` (every `String` is an `Object`, but not every `Object` is a `String`), `String` is strictly more specific than `Object`.\n• Therefore, `print(String)` is chosen and invoked at compile time.\n\nWhy other options are incorrect:\n• The code compiles without error; it would only be ambiguous if two sibling types at the same hierarchy level (e.g., `print(String)` and `print(Integer)`) both accepted `null`.\n• It does not invoke `print(Object)` because `String` is more specific."
  },
  {
    "id": 127,
    "category": "Core Java",
    "question": "Which TWO assertions accurately explain the output of evaluating string equality below?\n\n```java\nString s1 = \"Java\";\nString s2 = \"Ja\" + \"va\";\nString part = \"va\";\nString s3 = \"Ja\" + part;\n```",
    "options": [
      {
        "id": "A",
        "text": "`s1 == s3` evaluates to `false` because concatenation involving non-final variables creates a new heap object at runtime."
      },
      {
        "id": "B",
        "text": "`s1 == s2` evaluates to `true` because compile-time constant expressions of string literals are interned in the pool."
      },
      {
        "id": "C",
        "text": "`s1 == s3` evaluates to `true` because the JVM automatically interns every concatenated string at runtime."
      },
      {
        "id": "D",
        "text": "`s1 == s2` evaluates to `false` because the `+` operator always allocates a distinct heap object bypassing the pool."
      }
    ],
    "correct": [
      "A",
      "B"
    ],
    "requiredCount": 2,
    "explanation": "Why this is correct:\n• In Java:\n```java\nString s1 = \"Java\";\nString s2 = \"Java\";\nString s3 = new String(\"Java\");\n```\n• Literal Pooling: `s1` and `s2` are string literals. The JVM interns literals in the String Pool, so `s1` and `s2` point to the EXACT same object in the pool. Therefore, `s1 == s2` is `true`.\n• Explicit Instantiation: `new String(\"Java\")` explicitly allocates a brand new `String` object on the heap, bypassing pool reuse. Therefore, `s1 == s3` is `false` (different memory references).\n• Logical Content: All three strings have the identical character sequence `\"Java\"`, so `s1.equals(s2)` and `s1.equals(s3)` are both `true`.\n\nWhy other options are incorrect:\n• `s1 == s3` is `false`, NOT `true`.\n• `s1.equals(s3)` is `true`, NOT `false`."
  },
  {
    "id": 128,
    "category": "Core Java",
    "question": "Which THREE statements accurately describe how polymorphism, method hiding, and field access operate in Java inheritance?",
    "options": [
      {
        "id": "A",
        "text": "Static methods participate in dynamic runtime dispatch when invoked through subclass reference variables."
      },
      {
        "id": "B",
        "text": "Instance methods are virtual and dispatch dynamically at runtime based on the actual object instance type."
      },
      {
        "id": "C",
        "text": "Instance fields override superclass fields polymorphically when declared with identical identifiers."
      },
      {
        "id": "D",
        "text": "Instance fields are shadowed rather than polymorphic and resolve at compile time based on the reference type."
      },
      {
        "id": "E",
        "text": "Static methods are hidden rather than overridden and bind at compile time based on the declared reference type."
      }
    ],
    "correct": [
      "B",
      "D",
      "E"
    ],
    "requiredCount": 3,
    "explanation": "Why this is correct:\n• Instance Method Overriding: Resolved dynamically at runtime based on the actual object instance (runtime polymorphism / dynamic dispatch). Subclass implementations override superclass implementations.\n• Static Method Hiding: Static methods belong to the class, not the instance. If a subclass declares a static method with the same signature as a superclass static method, it **hides** it rather than overriding it. Resolution is determined at compile time based on the declared reference type.\n• Field Shadowing: Fields in Java are NOT polymorphic. If a subclass declares a field with the same name as a superclass field, it shadows it. The field accessed is determined statically by the reference type.\n\nWhy other options are incorrect:\n• Static methods are NOT dispatched polymorphically at runtime.\n• Subclass fields do not override superclass fields polymorphically."
  },
  {
    "id": 129,
    "category": "Core Java",
    "question": "What value is returned by `calculate()` in the following code snippet?\n\n```java\npublic class FlowTest {\n    public static int calculate() {\n        try {\n            int x = 10 / 2;\n            return x;\n        } catch (Exception e) {\n            return 0;\n        } finally {\n            return 99;\n        }\n    }\n}\n```",
    "options": [
      {
        "id": "A",
        "text": "`99` (a return statement inside a finally block overrides any prior return value or pending exception)."
      },
      {
        "id": "B",
        "text": "`5` (the initial return value from the try block is preserved and finally executes without mutation)."
      },
      {
        "id": "C",
        "text": "`0` (the catch block fallback return value is chosen when finally blocks are declared with returns)."
      },
      {
        "id": "D",
        "text": "Compilation error because the compiler forbids declaring return statements inside a finally block."
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "Why this is correct:\n• In a `try-catch-finally` block, the `finally` block is guaranteed to execute before the method returns to the caller.\n• If both the `try` block and the `finally` block contain a `return` statement:\n```java\ntry {\n    return 1;\n} finally {\n    return 2;\n}\n```\n• The `try` block prepares to return `1`. Before the method exits, control transfers to the `finally` block.\n• The `finally` block executes `return 2;`, which permanently discards and overwrites the pending return value from the `try` block! The method returns `2`.\n• Note: Putting return statements in `finally` blocks is a major code smell (suppresses unhandled exceptions and return values).\n\nWhy other options are incorrect:\n• The method does not return `1`.\n• It does not throw an exception or fail compilation."
  },
  {
    "id": 130,
    "category": "Core Java",
    "question": "Which THREE statements accurately describe the resource lifecycle and exception handling in Try-With-Resources?",
    "options": [
      {
        "id": "A",
        "text": "Resources declared in the try-with-resources statement header must be marked explicitly with the `final` keyword."
      },
      {
        "id": "B",
        "text": "Resources declared in the try header are closed in reverse order of their declaration (LIFO order)."
      },
      {
        "id": "C",
        "text": "Resource `close()` methods are invoked automatically whether the try block completes normally or throws an exception."
      },
      {
        "id": "D",
        "text": "Exceptions thrown during resource closure completely overwrite and discard the primary exception from the try block."
      },
      {
        "id": "E",
        "text": "Exceptions thrown during resource closure are attached as suppressed exceptions accessible via `Throwable.getSuppressed()`."
      }
    ],
    "correct": [
      "B",
      "C",
      "E"
    ],
    "requiredCount": 3,
    "explanation": "Why this is correct:\n• Reverse Close Order: Resources declared in `try (R1 r1 = ...; R2 r2 = ...)` are closed in the reverse order of their initialization: `r2.close()` runs first, followed by `r1.close()`.\n• Suppressed Exceptions: If the `try` block throws an exception $E_1$ and a resource's `close()` method subsequently throws an exception $E_2$, $E_1$ is propagated to the caller, and $E_2$ is appended to $E_1$ as a suppressed exception via `E1.addSuppressed(E2)`.\n• Inspection: Suppressed exceptions can be retrieved using `Throwable.getSuppressed()`.\n\nWhy other options are incorrect:\n• Resources are not closed in forward order.\n• Close exceptions do not discard the primary exception thrown by the try block."
  },
  {
    "id": 131,
    "category": "Core Java",
    "question": "Which THREE rules apply when declaring a multi-catch block in Java (`catch (IOException | SQLException e)`)?",
    "options": [
      {
        "id": "A",
        "text": "The multi-catch parameter `e` must be explicitly declared `volatile` to allow multi-threaded exception inspection."
      },
      {
        "id": "B",
        "text": "The alternative exception types separated by `|` cannot have a subclass-superclass inheritance relationship."
      },
      {
        "id": "C",
        "text": "A single multi-catch block can handle multiple disjoint checked or unchecked exception types simultaneously."
      },
      {
        "id": "D",
        "text": "The multi-catch exception parameter `e` is implicitly `final` and cannot be reassigned within the catch block."
      },
      {
        "id": "E",
        "text": "Multi-catch blocks can only catch subclasses of `RuntimeException` and strictly reject all checked exception types."
      }
    ],
    "correct": [
      "B",
      "C",
      "D"
    ],
    "requiredCount": 3,
    "explanation": "Why this is correct:\n• Multi-catch syntax (`catch (IOException | SQLException ex)`):\n  1. The exception parameter (`ex`) is implicitly `final`; reassigning `ex = new Exception()` causes a compile-time error.\n  2. Disjoint Rule: The caught exception types cannot have an inheritance relationship (subclass/superclass). For example, `catch (FileNotFoundException | IOException ex)` causes a compile error because `FileNotFoundException` is already an `IOException` (alternative is redundant).\n  3. The union type: The static type of `ex` inside the catch block is the most specific common supertype of the alternatives.\n\nWhy other options are incorrect:\n• `ex` is NOT mutable; it is implicitly `final`.\n• A subclass and its parent class CANNOT be combined in the same multi-catch statement."
  },
  {
    "id": 132,
    "category": "Core Java",
    "question": "Which TWO statements describe how Java resolves the Diamond Problem when a class implements two interfaces declaring identical default methods?",
    "options": [
      {
        "id": "A",
        "text": "The conflict causes an immediate `ClassFormatError` when the compiled class bytecode is loaded by the class loader."
      },
      {
        "id": "B",
        "text": "The compiler automatically selects the default method implementation from the interface listed first in the `implements` clause."
      },
      {
        "id": "C",
        "text": "Inside the overriding method, the class can explicitly choose an implementation via `InterfaceName.super.method()`."
      },
      {
        "id": "D",
        "text": "The implementing class must explicitly override the conflicting method to resolve the inheritance ambiguity."
      }
    ],
    "correct": [
      "C",
      "D"
    ],
    "requiredCount": 2,
    "explanation": "Why this is correct:\n• Diamond Problem with Default Methods: If class `C` implements interfaces `A` and `B`, and both interfaces provide an identical default method `default void hello()`, the compiler reports an ambiguity error unless `C` overrides the method.\n• Explicit Disambiguation Syntax: Inside the overriding method in `C`, the specific interface default implementation can be invoked using:\n```java\nInterfaceName.super.methodName();\n// e.g.:\nA.super.hello();\n```\n• Class Wins Rule: If a superclass and an interface provide methods with the same signature, the superclass method ALWAYS wins (concrete class implementation takes precedence over interface default).\n\nWhy other options are incorrect:\n• The compiler does NOT pick the alphabetically first interface; it generates a compilation error.\n• Interface default methods do not override superclass concrete methods."
  },
  {
    "id": 133,
    "category": "Core Java",
    "question": "What is the recommended approach for instantiating `BigDecimal` from a floating-point value to prevent precision loss?",
    "options": [
      {
        "id": "A",
        "text": "`new BigDecimal(0.1)` because passing a primitive double creates the most mathematically precise decimal instance."
      },
      {
        "id": "B",
        "text": "`BigDecimal.valueOf(0.1)` or `new BigDecimal(\"0.1\")` to avoid binary floating-point representation inaccuracies."
      },
      {
        "id": "C",
        "text": "`BigDecimal.fromDouble(0.1)` as the dedicated high-performance numerical factory method in `java.math`."
      },
      {
        "id": "D",
        "text": "`(BigDecimal) 0.1` using primitive decimal casting to preserve full floating-point register precision."
      }
    ],
    "correct": [
      "B"
    ],
    "requiredCount": 1,
    "explanation": "Why this is correct:\n• Binary Floating-Point Pitfall: `new BigDecimal(0.1)` does NOT create a `BigDecimal` equal to exactly 0.1. Because `0.1` cannot be represented precisely as a binary `double`, it creates `0.1000000000000000055511151231257827021181583404541015625`!\n• Safe Instantiations:\n  1. `new BigDecimal(\"0.1\")`: Uses the string representation, guaranteeing exact decimal representation.\n  2. `BigDecimal.valueOf(0.1)`: Internally converts the `double` to a `String` using `Double.toString(d)` before creating the `BigDecimal`, preserving exact decimal value.\n\nWhy other options are incorrect:\n• `new BigDecimal(0.1)` introduces IEEE 754 precision inaccuracies.\n• Casting `(BigDecimal) 0.1` fails to compile because primitive `double` cannot be cast to an object type."
  },
  {
    "id": 134,
    "category": "Core Java",
    "question": "Which TWO statements accurately describe the indentation and delimiter rules of Java Text Blocks (Java 15+)?",
    "options": [
      {
        "id": "A",
        "text": "Incidental leading white space common to all lines and the closing delimiter is automatically stripped by the compiler."
      },
      {
        "id": "B",
        "text": "Escape sequences like `\\n` and `\\t` are prohibited inside text blocks and cause compile-time parsing errors."
      },
      {
        "id": "C",
        "text": "Placing the closing `\"\"\"` delimiter on its own line preserves the trailing newline character of the preceding text line."
      },
      {
        "id": "D",
        "text": "Text blocks require the opening delimiter `\"\"\"` to be immediately followed by characters on the exact same line."
      }
    ],
    "correct": [
      "A",
      "C"
    ],
    "requiredCount": 2,
    "explanation": "Why this is correct:\n• Text Blocks (Java 15 / JEP 378): Multiline string literals opened with `\"\"\"` followed by a mandatory line break.\n• Incidental Whitespace Stripping: The compiler automatically inspects the indentation of each line and strips common leading whitespace (`stripIndent()`), preserving relative indentation.\n• Escape Sequences:\n  - `\\` at the end of a line suppresses the newline, allowing long single-line strings to be split across multiple source lines.\n  - `\\s` translates into a single ASCII space (`\\u0020`), preventing trailing whitespace from being stripped.\n\nWhy other options are incorrect:\n• Text blocks do NOT require closing delimiters on the exact same line; the opening delimiter must be followed by a line terminator.\n• Text blocks are NOT stored in Metaspace; they produce standard heap `String` instances."
  },
  {
    "id": 135,
    "category": "Collections",
    "question": "Why does the assignment `List<Object> list = new ArrayList<String>();` fail compilation in Java?",
    "options": [
      {
        "id": "A",
        "text": "The compiler requires an explicit `(List<Object>)` cast to convert invariant collections into covariant collections."
      },
      {
        "id": "B",
        "text": "`Object` is a non-generic class that cannot be used as an upper bound for parameterized collections."
      },
      {
        "id": "C",
        "text": "Java generics are invariant; allowing the assignment would permit inserting non-String objects and break type safety."
      },
      {
        "id": "D",
        "text": "`ArrayList` does not implement the `List` interface when parameterized with non-primitive reference types."
      }
    ],
    "correct": [
      "C"
    ],
    "requiredCount": 1,
    "explanation": "Why this is correct:\n• Generics Invariance: In Java, generics are **invariant**. Even though `String` is a subtype of `Object`, `List<String>` is NOT a subtype of `List<Object>`.\n• Why Invariance is Enforced: If `List<Object> list = new ArrayList<String>();` were allowed, you could execute `list.add(Integer.valueOf(42));`. Because `list` actually points to an `ArrayList<String>`, reading the integer out as a string would corrupt heap memory and throw `ClassCastException`!\n• Covariance with Wildcards: To accept a list of any subtype of `Object`, use wildcards: `List<? extends Object>`.\n\nWhy other options are incorrect:\n• Generics are not covariant by default.\n• The compilation error is not caused by `ArrayList` being an interface (it is a class)."
  },
  {
    "id": 136,
    "category": "Collections",
    "question": "Which THREE statements accurately reflect the PECS rule (Producer Extends, Consumer Super) in Java generics?",
    "options": [
      {
        "id": "A",
        "text": "You cannot add elements (except literal `null`) into a collection parameterized with `<? extends T>` because the exact subtype is unknown."
      },
      {
        "id": "B",
        "text": "Reading from a `<? super T>` collection returns strongly typed instances of `T` without requiring casts to `Object`."
      },
      {
        "id": "C",
        "text": "A wildcard `<? super T>` acts as a Consumer: you can safely add instances of type `T` (or its subtypes) into the collection."
      },
      {
        "id": "D",
        "text": "A collection declared as `<? extends T>` can be both read from and added to with complete compile-time type safety."
      },
      {
        "id": "E",
        "text": "A wildcard `<? extends T>` acts as a Producer: you can safely read elements as type `T` from the collection."
      }
    ],
    "correct": [
      "A",
      "C",
      "E"
    ],
    "requiredCount": 3,
    "explanation": "Why this is correct:\n• PECS Rule (Joshua Bloch, *Effective Java*):\n  - **P**roducer **E**xtends: If a parameterized collection produces items (read-only from collection), use `<? extends T>`. You can read elements as `T`, but you cannot add anything to it (except `null`).\n  - **C**onsumer **S**uper: If a parameterized collection consumes items (write-only to collection), use `<? super T>`. You can safely add instances of `T` (or its subtypes) to the collection.\n• Invariant when both: If you need to both read from and write to the collection, do NOT use wildcards; use exact type `<T>`.\n\nWhy other options are incorrect:\n• `<? extends T>` does NOT allow adding elements of type `T`.\n• `<? super T>` does not prevent reading, but elements read out have static type `Object`."
  },
  {
    "id": 137,
    "category": "Collections",
    "question": "What is the output of executing the following `Map` operations involving keys mapped to `null`?\n\n```java\nMap<String, Integer> map = new HashMap<>();\nmap.put(\"A\", null);\n\nmap.putIfAbsent(\"A\", 10);\nmap.computeIfAbsent(\"A\", k -> 20);\nmap.computeIfAbsent(\"B\", k -> 30);\n\nSystem.out.println(map.get(\"A\") + \" \" + map.get(\"B\"));\n```",
    "options": [
      {
        "id": "A",
        "text": "`20 30` (`computeIfAbsent` overwrites previous entries regardless of whether the existing mapped value is null or non-null)."
      },
      {
        "id": "B",
        "text": "`null null` (`HashMap` rejects `null` values by throwing a silent runtime exception and discarding both keys)."
      },
      {
        "id": "C",
        "text": "`null 30` (`putIfAbsent` detects that key 'A' is already present in the map and leaves the `null` value unchanged)."
      },
      {
        "id": "D",
        "text": "`10 30` (both `putIfAbsent` and `computeIfAbsent` treat keys mapped to `null` as absent and compute/store values)."
      }
    ],
    "correct": [
      "D"
    ],
    "requiredCount": 1,
    "explanation": "Why this is correct:\n• Mutable Keys in Hash Collections:\n```java\nMap<Person, String> map = new HashMap<>();\nPerson p = new Person(\"Alice\");\nmap.put(p, \"Admin\");\np.setName(\"Bob\"); // Mutating key's field!\nmap.get(p); // Returns NULL!\n```\n• Why Lookup Fails: `p.setName(\"Bob\")` changes the fields used by `Person.hashCode()`. When `map.get(p)` is called, the map computes the NEW hash code to look up the bucket. Because the entry was placed in a bucket matching the OLD hash code, the entry cannot be found and `null` is returned!\n• Golden Rule: Keys in a `HashMap` or elements in a `HashSet` MUST be immutable.\n\nWhy other options are incorrect:\n• The map does NOT throw `ConcurrentModificationException`.\n• The map does NOT automatically relocate entries to new buckets when key fields change."
  },
  {
    "id": 138,
    "category": "Collections",
    "question": "What occurs when mutating an object stored inside an unmodifiable collection created via `List.of(sb)`?\n\n```java\nStringBuilder sb = new StringBuilder(\"Hello\");\nList<StringBuilder> list = List.of(sb);\nsb.append(\" World\");\nSystem.out.println(list.get(0));\n```",
    "options": [
      {
        "id": "A",
        "text": "`Hello World` (the list structure itself is unmodifiable, but the objects referenced within it remain mutable)."
      },
      {
        "id": "B",
        "text": "Compilation error because `List.of` rejects mutable argument types such as `StringBuilder` at compile time."
      },
      {
        "id": "C",
        "text": "Throws `UnsupportedOperationException` on `sb.append()` because `List.of` deeply freezes all contained objects."
      },
      {
        "id": "D",
        "text": "`Hello` because `List.of` automatically creates an isolated defensive deep clone of all constructor arguments."
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "Why this is correct:\n• Shallow Immutability: Collections created via `Collections.unmodifiableList()` or `List.of()` are unmodifiable wrappers around object references.\n• Internal State Mutation: The collection prevents adding, removing, or reassigning element references. However, if the referenced objects themselves are mutable, calling setter methods on those objects (e.g. `list.get(0).setName(\"NewName\")`) succeeds completely!\n• True Deep Immutability requires both an unmodifiable collection container AND immutable element objects (or defensive deep copies).\n\nWhy other options are incorrect:\n• Calling a setter on an element does NOT throw `UnsupportedOperationException`; that exception is thrown only when calling mutative methods on the collection itself (`list.add()`).\n• The JVM does not prevent mutating heap objects stored inside unmodifiable collections."
  },
  {
    "id": 139,
    "category": "Streams & Functional",
    "question": "What is printed to the console when the following stream pipeline is executed?\n\n```java\nList<String> list = List.of(\"alpha\", \"bravo\", \"charlie\");\nlist.stream().filter(s -> {\n    System.out.print(s + \" \");\n    return s.length() > 5;\n});\n```",
    "options": [
      {
        "id": "A",
        "text": "A runtime `IllegalStateException` is thrown because the stream pipeline was discarded without calling `close()`."
      },
      {
        "id": "B",
        "text": "Nothing is printed (streams are lazy; intermediate operations like `filter` do not execute without a terminal operation)."
      },
      {
        "id": "C",
        "text": "`alpha bravo charlie ` (all stream intermediate operations evaluate immediately upon invocation)."
      },
      {
        "id": "D",
        "text": "`charlie ` (only stream elements satisfying the predicate filter are evaluated and printed)."
      }
    ],
    "correct": [
      "B"
    ],
    "requiredCount": 1,
    "explanation": "Why this is correct:\n• Stream Laziness & Short-Circuiting:\n```java\nList<String> list = List.of(\"alpha\", \"beta\", \"gamma\");\nlist.stream()\n    .filter(s -> s.length() > 3)\n    .peek(System.out::println)\n    .limit(1)\n    .count();\n```\n• Execution Flow: Streams process elements horizontally, one element at a time through the entire pipeline:\n  1. `\"alpha\"` passes the filter (`5 > 3`).\n  2. `peek()` prints `\"alpha\"`.\n  3. `limit(1)` satisfies its requirement of 1 element and short-circuits the pipeline!\n  4. `\"beta\"` and `\"gamma\"` are NEVER evaluated or processed by `filter` or `peek`.\n• Only `\"alpha\"` is printed to the console.\n\nWhy other options are incorrect:\n• It does not print all three elements because `limit(1)` short-circuits immediately after the first passing element.\n• Intermediate operations are lazy and do not execute in separate batch passes."
  },
  {
    "id": 140,
    "category": "Streams & Functional",
    "question": "What happens when `Collectors.toMap()` encounters duplicate keys in a stream without an explicit merge function?\n\n```java\nList<String> list = List.of(\"apple\", \"banana\", \"apricot\");\nMap<Character, String> map = list.stream()\n    .collect(Collectors.toMap(s -> s.charAt(0), s -> s));\n```",
    "options": [
      {
        "id": "A",
        "text": "The code fails to compile because the `Collectors.toMap()` factory method strictly requires three arguments."
      },
      {
        "id": "B",
        "text": "The map stores both values within an internal collision linked list under key `'a'` without throwing an error."
      },
      {
        "id": "C",
        "text": "An `IllegalStateException` is thrown at runtime because both 'apple' and 'apricot' generate the identical key `'a'`."
      },
      {
        "id": "D",
        "text": "The second value ('apricot') silently overwrites the first value ('apple') in the resulting map."
      }
    ],
    "correct": [
      "C"
    ],
    "requiredCount": 1,
    "explanation": "Why this is correct:\n• `Collectors.toMap(keyMapper, valueMapper)` expects keys to be strictly unique.\n• When duplicate keys are encountered without a merge function, `toMap()` throws `java.lang.IllegalStateException: Duplicate key ...`.\n• Resolution: Provide a merge binary operator to handle collisions:\n```java\nCollectors.toMap(\n    Person::getDepartment,\n    Person::getName,\n    (existingVal, newVal) -> existingVal + \", \" + newVal\n);\n```\n\nWhy other options are incorrect:\n• By default, `toMap()` does NOT overwrite existing values with newer values (that only happens if you pass `(oldVal, newVal) -> newVal` as merge function).\n• It does not return null or discard duplicates silently."
  },
  {
    "id": 141,
    "category": "Streams & Functional",
    "question": "What is the critical difference between `Optional.orElse()` and `Optional.orElseGet()` regarding argument evaluation?\n\n```java\nOptional<String> opt = Optional.of(\"Existing\");\nString r1 = opt.orElse(computeDefault());\nString r2 = opt.orElseGet(() -> computeDefault());\n```",
    "options": [
      {
        "id": "A",
        "text": "`orElseGet` throws `NullPointerException` if the `Optional` contains a value; `orElse` handles present values safely."
      },
      {
        "id": "B",
        "text": "`orElse` can only accept primitive integer constants; `orElseGet` accepts arbitrary generic reference types."
      },
      {
        "id": "C",
        "text": "Both methods evaluate `computeDefault()` lazily on demand only when the `Optional` is determined to be empty."
      },
      {
        "id": "D",
        "text": "`orElse` evaluates its argument eagerly even if value is present; `orElseGet` evaluates its lambda lazily only if empty."
      }
    ],
    "correct": [
      "D"
    ],
    "requiredCount": 1,
    "explanation": "Why this is correct:\n• `orElse(T other)`: The argument `other` is evaluated **eagerly**, regardless of whether the `Optional` contains a value or not!\n• `orElseGet(Supplier<? extends T> supplier)`: The supplier is evaluated **lazily**, only if the `Optional` is empty.\n• Critical Performance/Bug Gotcha:\n```java\n// Danger: findDefaultFromDatabase() executes EVERY TIME, even if user is present!\nUser u = optUser.orElse(findDefaultFromDatabase());\n\n// Safe: findDefaultFromDatabase() executes ONLY if optUser is empty!\nUser u = optUser.orElseGet(() -> findDefaultFromDatabase());\n```\n\nWhy other options are incorrect:\n• `orElse()` does NOT evaluate lazily.\n• `orElseGet()` does not throw `NullPointerException` on present values."
  },
  {
    "id": 142,
    "category": "Modern Java",
    "question": "Which THREE statements regarding Java `record` classes (standardized in Java 16) are correct?",
    "options": [
      {
        "id": "A",
        "text": "Records permit declaring abstract instance methods to be implemented by extending subclass declarations."
      },
      {
        "id": "B",
        "text": "A compact constructor in a record allows parameter normalization without repeating explicit `this.x = x` assignments."
      },
      {
        "id": "C",
        "text": "Record instance fields can be declared non-final to allow mutating record state through JavaBeans setter methods."
      },
      {
        "id": "D",
        "text": "A record cannot extend any other class because it implicitly extends `java.lang.Record`, but it can implement interfaces."
      },
      {
        "id": "E",
        "text": "Records are shallowly immutable data carriers whose component fields are implicitly declared `private final`."
      }
    ],
    "correct": [
      "B",
      "D",
      "E"
    ],
    "requiredCount": 3,
    "explanation": "Why this is correct:\n• Record Class Rules (Java 16+ / JEP 395):\n  1. Records are implicitly `final` and cannot be declared `abstract`.\n  2. Records cannot extend any class (they implicitly extend `java.lang.Record`), but they can implement interfaces.\n  3. All instance fields corresponding to components are implicitly `private final`. No additional instance fields can be declared (only `static` fields are allowed).\n  4. Compact Constructors: Allow validation and normalization without repeating the parameter list (`public Point { if (x < 0) throw ...; }`).\n\nWhy other options are incorrect:\n• Records CANNOT declare additional non-static instance fields.\n• Records cannot be extended by subclasses because they are final."
  },
  {
    "id": 143,
    "category": "Modern Java",
    "question": "Which THREE rules govern Sealed Classes and Interfaces as introduced in Java 17?",
    "options": [
      {
        "id": "A",
        "text": "Every permitted subclass must explicitly declare an inheritance modifier: `final`, `sealed`, or `non-sealed`."
      },
      {
        "id": "B",
        "text": "A sealed class restricts which subtypes may extend it using the `permits` clause (or same-file declarations)."
      },
      {
        "id": "C",
        "text": "All permitted subclasses must automatically be declared `sealed` to enforce infinite sealing across the hierarchy."
      },
      {
        "id": "D",
        "text": "The `permits` clause allows any external library class in any package to extend the sealed class without restriction."
      },
      {
        "id": "E",
        "text": "All permitted subclasses must belong to the exact same named module (or same package if in an unnamed module)."
      }
    ],
    "correct": [
      "A",
      "B",
      "E"
    ],
    "requiredCount": 3,
    "explanation": "Why this is correct:\n• Sealed Classes Rules (Java 17+ / JEP 409):\n  1. A sealed class or interface declares permitted subtypes using the `permits` clause: `sealed class Shape permits Circle, Square {}`.\n  2. Every permitted subclass MUST directly extend the sealed class and reside in the same package (or same named module).\n  3. Every permitted subclass MUST explicitly declare one of three modifiers:\n     - `final`: Prohibits any further extension.\n     - `sealed`: Extends the sealed hierarchy with its own permitted subclasses.\n     - `non-sealed`: Opens the hierarchy, allowing arbitrary subclasses.\n\nWhy other options are incorrect:\n• Permitted subclasses cannot omit modifiers; they must explicitly declare `final`, `sealed`, or `non-sealed`.\n• Permitted subclasses do not have to be private inner classes."
  },
  {
    "id": 144,
    "category": "Modern Java",
    "question": "Which THREE statements accurately characterize Virtual Threads (Java 21) and carrier thread pinning?",
    "options": [
      {
        "id": "A",
        "text": "Calling `Thread.sleep()` or performing socket I/O permanently pins virtual threads to kernel CPU cores."
      },
      {
        "id": "B",
        "text": "When a virtual thread blocks on non-pinning I/O, the JVM unmounts it from the carrier thread to execute other tasks."
      },
      {
        "id": "C",
        "text": "Virtual threads are lightweight JVM-scheduled threads running on top of a pool of OS carrier threads."
      },
      {
        "id": "D",
        "text": "Virtual threads completely eliminate the necessity for thread safety and memory visibility synchronization in Java."
      },
      {
        "id": "E",
        "text": "Blocking inside a `synchronized` block/method or native JNI call pins the virtual thread to its OS carrier thread."
      }
    ],
    "correct": [
      "B",
      "C",
      "E"
    ],
    "requiredCount": 3,
    "explanation": "Why this is correct:\n• Virtual Threads (Java 21 / JEP 444):\n  1. Virtual threads are managed by the JVM runtime and multiplexed over a small pool of carrier platform threads.\n  2. Blocking I/O operations (network, file, `Thread.sleep`) unmount the virtual thread from the carrier thread, freeing the carrier thread to execute other virtual threads.\n  3. Pinning: A virtual thread is **pinned** to its carrier thread if it blocks inside a `synchronized` block or method, or while executing a native method (JNI). When pinned, the carrier thread cannot be released, reducing scalability. (Fix: replace `synchronized` with `ReentrantLock`).\n\nWhy other options are incorrect:\n• Virtual threads do NOT execute CPU-intensive tasks faster than platform threads.\n• Virtual threads do not eliminate thread synchronization or thread safety requirements."
  },
  {
    "id": 145,
    "category": "Modern Java",
    "question": "Which THREE features are standardized in Pattern Matching for `switch` (Java 21 / JEP 441)?",
    "options": [
      {
        "id": "A",
        "text": "Explicit `case null` labels that handle `null` reference values directly without throwing `NullPointerException`."
      },
      {
        "id": "B",
        "text": "Guarded patterns using `when` clauses (e.g. `case Integer i when i > 100`) to refine pattern match conditions."
      },
      {
        "id": "C",
        "text": "Automatic runtime optimization that converts all switch expressions into native regular expression automata."
      },
      {
        "id": "D",
        "text": "Guarded `when` pattern branches are evaluated only after all standard type patterns fail to match."
      },
      {
        "id": "E",
        "text": "Type patterns (e.g. `case Integer i`) that match types and bind a strongly typed pattern variable without casting."
      }
    ],
    "correct": [
      "A",
      "B",
      "E"
    ],
    "requiredCount": 3,
    "explanation": "Why this is correct:\n• Pattern Matching for `switch` (Java 21 / JEP 441):\n  1. Type Patterns: Allows switching on arbitrary reference types (e.g. `case Integer i -> ...`).\n  2. Guarded Patterns (`when`): Allows adding boolean expressions to case labels (`case String s when s.length() > 5 -> ...`).\n  3. Direct `null` Handling: Allows explicit `case null -> ...` labels, eliminating boilerplate null checks before switch statements.\n  4. Exhaustiveness Checking: The compiler verifies all possible cases are covered (especially powerful with sealed types), rejecting non-exhaustive switches without `default`.\n\nWhy other options are incorrect:\n• Guarded patterns use the `when` keyword, NOT `if`.\n• `switch` on objects does not convert objects into integer hash codes at runtime."
  },
  {
    "id": 146,
    "category": "Modern Java",
    "question": "Which THREE capabilities are introduced by Sequenced Collections (Java 21 / JEP 431)?",
    "options": [
      {
        "id": "A",
        "text": "Automatic compile-time sorting of all `HashSet` and `HashMap` instances according to natural element order."
      },
      {
        "id": "B",
        "text": "A unified interface hierarchy (`SequencedCollection`, `SequencedSet`, `SequencedMap`) defining defined encounter order."
      },
      {
        "id": "C",
        "text": "Uniform first and last element access and mutation methods (`getFirst()`, `getLast()`, `addFirst()`, `addLast()`)."
      },
      {
        "id": "D",
        "text": "A collection type that replaces generic type parameters with native integer indices to eliminate autoboxing overhead."
      },
      {
        "id": "E",
        "text": "The `reversed()` method, which provides a live, reverse-ordered view of the underlying collection in O(1) time."
      }
    ],
    "correct": [
      "B",
      "C",
      "E"
    ],
    "requiredCount": 3,
    "explanation": "Why this is correct:\n• Sequenced Collections (Java 21 / JEP 431): Introduces unified interfaces for collections with a defined encounter order:\n  - `SequencedCollection<E>`: Extends `Collection`, adds `getFirst()`, `getLast()`, `addFirst()`, `addLast()`, `removeFirst()`, `removeLast()`, and `reversed()`.\n  - `SequencedSet<E>`: Extends `Set` and `SequencedCollection` (implemented by `LinkedHashSet`).\n  - `SequencedMap<K, V>`: Adds `firstEntry()`, `lastEntry()`, `pollFirstEntry()`, `pollLastEntry()`, `sequencedKeySet()`, and `reversed()`.\n• Solves historic inconsistency where getting the first element required `list.get(0)`, `deque.getFirst()`, or `set.iterator().next()`.\n\nWhy other options are incorrect:\n• `HashSet` does NOT implement `SequencedSet` because standard `HashSet` has no defined encounter order.\n• Sequenced collections are not thread-safe by default."
  },
  {
    "id": 147,
    "category": "Concurrency",
    "question": "Which THREE statements accurately describe the risks and mechanics of using `ThreadLocal` in thread-pooled environments?",
    "options": [
      {
        "id": "A",
        "text": "`ThreadLocal` variables are automatically synchronized across all JVM processes running on the same operating system host."
      },
      {
        "id": "B",
        "text": "Failing to call `ThreadLocal.remove()` causes ClassLoader memory leaks when web applications are redeployed in containers."
      },
      {
        "id": "C",
        "text": "Calling `ThreadLocal.get()` causes an immediate `ConcurrentModificationException` when accessed by concurrent threads."
      },
      {
        "id": "D",
        "text": "Uncleared `ThreadLocal` state can leak security contexts or tenant IDs from a previous user request into an unrelated task."
      },
      {
        "id": "E",
        "text": "Because thread pool worker threads are reused, values stored in `ThreadLocal` persist across independent requests if not cleared."
      }
    ],
    "correct": [
      "B",
      "D",
      "E"
    ],
    "requiredCount": 3,
    "explanation": "Why this is correct:\n• `ThreadLocal<T>` Mechanics & Leaks:\n  1. Each `Thread` instance holds a reference to a `ThreadLocalMap` (`threadLocals`).\n  2. Keys in `ThreadLocalMap` are weak references to `ThreadLocal` objects, but values are STRONG references.\n  3. In thread pools (e.g. Tomcat request threads, `ExecutorService`), threads are reused and never terminate. If `threadLocal.remove()` is not called in a `finally` block, values remain referenced by the thread's map, causing severe classloader/memory leaks!\n  4. Stale Data: Subsequent requests processed by the same worker thread may observe leftover data from previous requests.\n\nWhy other options are incorrect:\n• Calling `set(null)` does not clean up map entries; you must call `threadLocal.remove()`.\n• ThreadLocals are not synchronized across threads; each thread has its own isolated copy."
  },
  {
    "id": 148,
    "category": "Concurrency",
    "question": "Which THREE statements explain why `volatile` is required in the Double-Checked Locking singleton pattern?",
    "options": [
      {
        "id": "A",
        "text": "A concurrent thread performing the first unsynchronized `null` check could observe a partially initialized singleton instance."
      },
      {
        "id": "B",
        "text": "Object instantiation (`new Singleton()`) is a multi-step operation that involves memory allocation, construction, and assignment."
      },
      {
        "id": "C",
        "text": "Declaring the field `volatile` instructs the JVM to serialize singleton state to disk on every method invocation."
      },
      {
        "id": "D",
        "text": "Without `volatile`, the compiler or CPU can reorder reference assignment before constructor field initialization completes."
      },
      {
        "id": "E",
        "text": "Without `volatile`, the Java Virtual Machine fails to acquire the class monitor lock during the synchronized block."
      }
    ],
    "correct": [
      "A",
      "B",
      "D"
    ],
    "requiredCount": 3,
    "explanation": "Why this is correct:\n• Double-Checked Locking (DCL) Singleton:\n```java\npublic class Singleton {\n    private static volatile Singleton instance;\n    public static Singleton getInstance() {\n        if (instance == null) {\n            synchronized (Singleton.class) {\n                if (instance == null) {\n                    instance = new Singleton();\n                }\n            }\n        }\n        return instance;\n    }\n}\n```\n• Why `volatile` is MANDATORY: The expression `instance = new Singleton()` is not atomic. In bytecode, it:\n  1. Allocates memory for `Singleton`.\n  2. Invokes constructor `<init>`.\n  3. Assigns reference to `instance`.\n• Without `volatile`, the CPU/compiler can reorder steps 2 and 3 (publish reference before constructor finishes). Another thread executing the first check `if (instance == null)` observes non-null and uses a partially initialized object!\n• `volatile` prevents this instruction reordering.\n\nWhy other options are incorrect:\n• `volatile` is NOT optional in multithreaded environments without synchronization on reads.\n• Double-checked locking does not throw `IllegalMonitorStateException`."
  },
  {
    "id": 149,
    "category": "Concurrency",
    "question": "Which TWO statements correctly contrast `CompletableFuture.thenApply()` and `CompletableFuture.thenCompose()`?",
    "options": [
      {
        "id": "A",
        "text": "`thenApply()` executes tasks synchronously; `thenCompose()` executes tasks asynchronously across loopback sockets."
      },
      {
        "id": "B",
        "text": "`thenCompose()` blocks the calling thread until the underlying future completes and returns its final computed result."
      },
      {
        "id": "C",
        "text": "`thenCompose()` accepts a function returning `CompletableFuture<U>` and flattens it, preventing nested `CompletableFuture`s."
      },
      {
        "id": "D",
        "text": "`thenApply()` maps a value `T -> U`, producing a resulting `CompletableFuture<U>` upon completion of the stage."
      }
    ],
    "correct": [
      "C",
      "D"
    ],
    "requiredCount": 2,
    "explanation": "Why this is correct:\n• `thenApply(Function<T, U>)`: Maps the result of a `CompletableFuture<T>` to type `U`, returning `CompletableFuture<U>`. Used for synchronous value transformations.\n• `thenCompose(Function<T, CompletionStage<U>>)`: Maps the result of a `CompletableFuture<T>` to another `CompletableFuture<U>` and flattens the result, returning `CompletableFuture<U>` (analogous to `flatMap`). Prevents nested `CompletableFuture<CompletableFuture<U>>`.\n\nWhy other options are incorrect:\n• `thenApply` does NOT flatten nested futures; `thenCompose` does.\n• `thenCompose` is not a terminal operation; it returns another stage in the pipeline."
  },
  {
    "id": 150,
    "category": "Concurrency",
    "question": "How does `AtomicReference.compareAndSet(V expected, V update)` operate?",
    "options": [
      {
        "id": "A",
        "text": "It sets the reference to `update` atomically if and only if the current value reference-equals (`==`) `expected`."
      },
      {
        "id": "B",
        "text": "It compares values using `equals()` and throws `ConcurrentModificationException` whenever comparison fails."
      },
      {
        "id": "C",
        "text": "It acquires an exclusive monitor lock on all threads in the JVM until the value is updated in main memory."
      },
      {
        "id": "D",
        "text": "It writes the update to disk storage first to ensure transactional durability before updating JVM memory."
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "Why this is correct:\n• `AtomicReference.compareAndSet(V expectedValue, V newValue)`:\n  - Atomically compares the current reference with `expectedValue`.\n  - If equal (using reference equality `==`), updates the reference to `newValue` and returns `true`.\n  - If unequal (another thread modified the value), leaves the reference unchanged and returns `false`.\n• Hardware Primitive: Backed directly by CPU hardware Compare-And-Swap (CAS) instructions (e.g. `LOCK CMPXCHG` on x86), enabling lock-free thread synchronization.\n\nWhy other options are incorrect:\n• It does NOT acquire an intrinsic monitor lock on the object.\n• It does not retry infinitely on failure; it returns `false` immediately so the caller can retry in a loop."
  },
  {
    "id": 151,
    "category": "Concurrency",
    "question": "How does the `ForkJoinPool` work-stealing algorithm optimize multi-core CPU utilization?",
    "options": [
      {
        "id": "A",
        "text": "Threads take turns executing tasks in a round-robin schedule coordinated by a single centralized monitor lock."
      },
      {
        "id": "B",
        "text": "Worker threads maintain private deques; when a worker finishes its tasks, it steals tasks from the tail of another busy worker's deque."
      },
      {
        "id": "C",
        "text": "Work is serialized and transmitted to idle worker processes over local TCP loopback network sockets."
      },
      {
        "id": "D",
        "text": "The pool spawns one thousand native threads per CPU core to prevent any thread idle time during execution."
      }
    ],
    "correct": [
      "B"
    ],
    "requiredCount": 1,
    "explanation": "Why this is correct:\n• `ForkJoinPool` Work-Stealing Algorithm:\n  1. Each worker thread maintains its own double-ended queue (deque) of tasks.\n  2. The owning worker thread pushes and pops tasks from the HEAD of its own deque in LIFO (Last-In, First-Out) order to optimize CPU data cache locality.\n  3. When a worker thread runs out of tasks, it becomes a \"thief\" and steals tasks from the TAIL of another busy worker's deque in FIFO order.\n  4. This access pattern minimizes lock contention between owner and thief threads and maximizes multi-core CPU utilization.\n\nWhy other options are incorrect:\n• It does not allocate tasks to a single global FIFO queue; that would cause extreme lock contention across cores.\n• Tasks are not preempted by aborting OS threads."
  },
  {
    "id": 152,
    "category": "JVM & GC",
    "question": "Which THREE statements accurately describe JVM Safepoints and Stop-The-World (STW) pauses?",
    "options": [
      {
        "id": "A",
        "text": "Safepoints are used exclusively by the Just-In-Time compiler and are completely bypassed during all garbage collection cycles."
      },
      {
        "id": "B",
        "text": "Safepoints are points where all database transactions are committed to persistent disk before garbage collection starts."
      },
      {
        "id": "C",
        "text": "The JVM brings threads to safepoints to execute GC root scanning, object relocation, deoptimization, or thread dumps."
      },
      {
        "id": "D",
        "text": "A Safepoint is a designated point where all mutator threads bring their execution state to a consistent, stable halt."
      },
      {
        "id": "E",
        "text": "The time required to bring all mutator threads to a halt ('Time To Safepoint' or TTSP) contributes directly to STW pauses."
      }
    ],
    "correct": [
      "C",
      "D",
      "E"
    ],
    "requiredCount": 3,
    "explanation": "Why this is correct:\n• JVM Safepoints: Predefined points in application thread execution where thread state is known and consistent, allowing the JVM to safely pause threads for runtime operations.\n• Stop-The-World (STW) Pauses: During garbage collection phases (e.g. initial mark, remark), deoptimization, or thread dumps, all application mutator threads are brought to a safepoint and paused.\n• Safepoint Polling: The JIT compiler inserts safepoint polling checks into compiled code (e.g., at method exits and loop back-edges).\n• Long Safepoint Delays: Uncounted loops (e.g. `for (long i = 0; ...)` in older JVMs) without safepoint checks can delay entering a safepoint, causing prolonged STW pauses.\n\nWhy other options are incorrect:\n• Safepoints do NOT save heap state to SSD disk storage.\n• Threads are not paused asynchronously at arbitrary machine instructions; they must reach a designated safepoint."
  },
  {
    "id": 153,
    "category": "Spring & Hibernate",
    "question": "What is the difference between `@Configuration(proxyBeanMethods = true)` and `@Configuration(proxyBeanMethods = false)` in Spring?",
    "options": [
      {
        "id": "A",
        "text": "`true` requires all bean methods to be declared `private`; `false` requires all bean methods to be declared `public static`."
      },
      {
        "id": "B",
        "text": "`false` converts all singleton beans into prototype beans automatically to eliminate JVM memory consumption."
      },
      {
        "id": "C",
        "text": "`true` creates CGLIB proxies so inter-`@Bean` calls return cached singletons; `false` (Lite mode) treats them as plain Java method calls."
      },
      {
        "id": "D",
        "text": "`false` disables dependency injection across the entire Spring application context and prevents `@Autowired` from functioning."
      }
    ],
    "correct": [
      "C"
    ],
    "requiredCount": 1,
    "explanation": "Why this is correct:\n• In Spring `@Configuration` classes:\n  - `proxyBeanMethods = true` (default in `@Configuration`): Spring wraps the configuration class in a CGLIB runtime proxy. When one `@Bean` method calls another `@Bean` method directly in Java (e.g. `dataSource()`), the proxy intercepts the call and checks if an instance already exists in the container. If so, it returns the cached singleton bean, preserving singleton semantics.\n  - `proxyBeanMethods = false` (Lite mode): Spring skips CGLIB proxy generation. Direct `@Bean` method calls invoke the method as plain Java, creating a brand new object instance and bypassing container caching!\n• Lite mode is preferred when bean methods do not call each other, improving startup speed and GraalVM Native Image compatibility.\n\nWhy other options are incorrect:\n• `proxyBeanMethods = false` does NOT disable all Spring dependency injection.\n• Setting it to false does not prevent beans from being registered in the container."
  }
];
