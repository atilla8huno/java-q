const QUESTIONS = [
  {
    "id": 1,
    "category": "Core Java",
    "question": "What typically causes a `StackOverflowError` in Java?",
    "options": [
      {
        "id": "A",
        "text": "The heap runs out of memory while allocating objects"
      },
      {
        "id": "B",
        "text": "A thread's call stack exceeds its allocated stack memory, often due to unbounded recursion"
      },
      {
        "id": "C",
        "text": "The Metaspace runs out of room for class metadata"
      },
      {
        "id": "D",
        "text": "Too many threads are waiting on a monitor lock"
      }
    ],
    "correct": [
      "B"
    ],
    "requiredCount": 1,
    "explanation": "A `StackOverflowError` is thrown when a thread's call stack is exhausted. Unbounded or very deep recursion is the usual cause (each call pushes a new frame). Heap exhaustion is `OutOfMemoryError: Java heap space`; Metaspace exhaustion is a different OOME; waiting on a monitor is blocking, not stack overflow."
  },
  {
    "id": 2,
    "category": "Core Java",
    "question": "Which statements about Java packages are correct?",
    "options": [
      {
        "id": "A",
        "text": "Packages help avoid name clashes between classes"
      },
      {
        "id": "B",
        "text": "Packages can provide access control (for example package-private members)"
      },
      {
        "id": "C",
        "text": "A package can contain types that are only visible within that package"
      },
      {
        "id": "D",
        "text": "Packages replace the need for access modifiers such as `private`"
      }
    ],
    "correct": [
      "A",
      "B",
      "C"
    ],
    "requiredCount": 3,
    "explanation": "Packages group related types under a namespace, which avoids class-name clashes and enables package-private access. Package-private (default) types and members are visible only inside that package. They complement `private`/`protected`/`public` — they do not replace those modifiers."
  },
  {
    "id": 3,
    "category": "Core Java",
    "question": "How do you create a well-designed immutable class in Java?",
    "options": [
      {
        "id": "A",
        "text": "Declare the class `final`, make fields `private` (and typically `final`), assign them only in the constructor, and never expose mutable state"
      },
      {
        "id": "B",
        "text": "Make all methods `static` so no instance can change state"
      },
      {
        "id": "C",
        "text": "Use `synchronized` on every setter"
      },
      {
        "id": "D",
        "text": "Extend `java.lang.Immutable`"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "An immutable object never changes after construction. Mark the class `final` (or otherwise stop subclassing), keep fields `private`/`final`, assign them in the constructor, copy any mutable arguments/returns, and provide no setters. `static` methods, synchronized setters, and a mythical `java.lang.Immutable` class do not make an instance immutable."
  },
  {
    "id": 4,
    "category": "Core Java",
    "question": "What is the difference between `StringBuffer` and `StringBuilder`?",
    "options": [
      {
        "id": "A",
        "text": "`StringBuffer` is synchronized (thread-safe); `StringBuilder` is not and is usually faster for single-threaded use"
      },
      {
        "id": "B",
        "text": "Both are immutable like `String`"
      },
      {
        "id": "C",
        "text": "`StringBuilder` can be used as a `Map` key because it overrides `equals`"
      },
      {
        "id": "D",
        "text": "`StringBuffer` was added in Java 8 to replace `StringBuilder`"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "Both `StringBuffer` and `StringBuilder` are mutable character sequences. `StringBuffer` methods are `synchronized` (thread-safe but slower). `StringBuilder` is unsynchronized and preferred for local, single-thread work. Neither is immutable like `String`, and `StringBuilder` does not override `equals`/`hashCode` in a value-based way, so it is a poor `Map` key. `StringBuilder` arrived in Java 5; it did not replace `StringBuffer` in Java 8."
  },
  {
    "id": 5,
    "category": "Core Java",
    "question": "Why are `String` objects immutable in Java?",
    "options": [
      {
        "id": "A",
        "text": "So the string pool can safely reuse interned instances and so `String` can be used safely as a hash-based key"
      },
      {
        "id": "B",
        "text": "Because the JVM cannot allocate char arrays on the heap"
      },
      {
        "id": "C",
        "text": "So `String` can extend `StringBuilder`"
      },
      {
        "id": "D",
        "text": "Immutability is required by the Unicode standard"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "Immutability lets the JVM intern literals in the string pool, share them across threads, cache `hashCode`, and use `String` safely as a `HashMap` key or in class loading. The JVM can allocate char/byte arrays on the heap. `String` does not extend `StringBuilder`. Unicode does not require language-level immutability."
  },
  {
    "id": 6,
    "category": "Core Java",
    "question": "Where are string literals stored, and what does `intern()` do?",
    "options": [
      {
        "id": "A",
        "text": "Literals are interned in the string pool; `intern()` returns the pooled instance equal to that string"
      },
      {
        "id": "B",
        "text": "All `new String(\"x\")` objects are automatically pooled"
      },
      {
        "id": "C",
        "text": "The string pool lives on the thread stack"
      },
      {
        "id": "D",
        "text": "`intern()` copies the string into heap memory from native memory"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "String literals are interned in the heap string pool (the runtime string table). `s.intern()` returns the pooled instance equal to `s`. `new String(\"x\")` allocates a new object; it is not pooled unless you call `intern()`. The pool is not on a thread stack."
  },
  {
    "id": 7,
    "category": "Core Java",
    "question": "If you override `equals()`, what else must you do?",
    "options": [
      {
        "id": "A",
        "text": "Also override `hashCode()` so equal objects have the same hash code"
      },
      {
        "id": "B",
        "text": "Also override `clone()`"
      },
      {
        "id": "C",
        "text": "Make the class `volatile`"
      },
      {
        "id": "D",
        "text": "Disable garbage collection for those objects"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "The `equals`/`hashCode` contract: if `a.equals(b)` then `a.hashCode()` must equal `b.hashCode()`. Hash collections (`HashMap`, `HashSet`) use the hash to find a bucket, then `equals` to find the key. Collisions (different objects, same hash) are allowed. You do not need `clone()`, `volatile`, or GC tricks."
  },
  {
    "id": 8,
    "category": "Core Java",
    "question": "What is a functional interface?",
    "options": [
      {
        "id": "A",
        "text": "An interface with exactly one abstract method; it may also have default/static methods and can be annotated with `@FunctionalInterface`"
      },
      {
        "id": "B",
        "text": "Any interface that extends `java.util.function.Function`"
      },
      {
        "id": "C",
        "text": "An interface with only default methods"
      },
      {
        "id": "D",
        "text": "A class with a single `main` method"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "A functional interface has exactly one abstract method (a SAM). It may still have default or static methods. Lambdas and method references can implement it. `@FunctionalInterface` is optional, but if present the compiler rejects a second abstract method. It is not limited to `Function`, and a class with `main` is not an interface."
  },
  {
    "id": 9,
    "category": "Core Java",
    "question": "What is autoboxing in Java?",
    "options": [
      {
        "id": "A",
        "text": "Automatic conversion between primitives and their wrapper types, for example `int` ↔ `Integer`"
      },
      {
        "id": "B",
        "text": "Automatic promotion of `byte` to `String`"
      },
      {
        "id": "C",
        "text": "The compiler wrapping checked exceptions in `RuntimeException`"
      },
      {
        "id": "D",
        "text": "Converting a collection to an array"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "Autoboxing converts a primitive to its wrapper (`int` → `Integer`); unboxing is the reverse. It happens when you put primitives in collections or pass them to APIs that take wrappers. Unboxing `null` throws `NullPointerException`. `==` on wrappers compares identity, not value, except for cached values (e.g. `Integer` -128..127)."
  },
  {
    "id": 10,
    "category": "Core Java",
    "question": "What is the difference among `final`, `finally`, and `finalize`?",
    "options": [
      {
        "id": "A",
        "text": "`final` restricts modification/overriding; `finally` always runs after try/catch (unless the JVM exits); `finalize()` was a GC cleanup hook, now deprecated and unreliable"
      },
      {
        "id": "B",
        "text": "They are three names for the same JVM feature"
      },
      {
        "id": "C",
        "text": "`finally` makes a variable constant"
      },
      {
        "id": "D",
        "text": "`finalize` is called every time a method returns"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "`final` stops reassignment/overriding/subclassing depending on where it is used. `finally` is a `try` clause that runs on both success and exception unless the JVM exits (`System.exit`) or the thread dies. `finalize()` was a GC cleanup hook; it is deprecated, unreliable, and must not replace try-with-resources."
  },
  {
    "id": 11,
    "category": "Core Java",
    "question": "What does the `transient` keyword do?",
    "options": [
      {
        "id": "A",
        "text": "Marks a field to be skipped by default Java serialization"
      },
      {
        "id": "B",
        "text": "Prevents the field from being garbage-collected"
      },
      {
        "id": "C",
        "text": "Makes the field visible across threads"
      },
      {
        "id": "D",
        "text": "Allows a local variable to be used in a lambda"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "`transient` tells default Java serialization (`ObjectOutputStream`) to skip that field. On deserialize it gets the type's default (`null`/0/false). It has nothing to do with thread visibility (`volatile`) or garbage collection. Typical uses: passwords, sockets, cached derived data."
  },
  {
    "id": 12,
    "category": "Core Java",
    "question": "What does `volatile` guarantee?",
    "options": [
      {
        "id": "A",
        "text": "Visibility: writes to the variable are flushed so other threads read the latest value; it does not make compound actions (like `i++`) atomic"
      },
      {
        "id": "B",
        "text": "Mutual exclusion, equivalent to `synchronized`"
      },
      {
        "id": "C",
        "text": "The variable cannot be `null`"
      },
      {
        "id": "D",
        "text": "The variable is stored on the stack"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "`volatile` gives visibility and a happens-before edge for that variable's reads/writes, so other threads see the latest value. It does **not** make `i++` atomic — that is still a race. Use `AtomicInteger`, `synchronized`, or a lock for read-modify-write. It is not mutual exclusion and does not live on the stack."
  },
  {
    "id": 13,
    "category": "Core Java",
    "question": "Can a field be declared both `volatile` and `final`?",
    "options": [
      {
        "id": "A",
        "text": "No. `final` fields are initialized once and safely published; `volatile` is for variables that change and need visibility"
      },
      {
        "id": "B",
        "text": "Yes, and it is the recommended way to create constants"
      },
      {
        "id": "C",
        "text": "Only on `static` fields"
      },
      {
        "id": "D",
        "text": "Only inside inner classes"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "A field cannot be both `volatile` and `final` (compile error). `final` fields are assigned once and safely published after the constructor. `volatile` is for variables that other threads will reassign and must observe. Constants should be `static final`, not `volatile`."
  },
  {
    "id": 14,
    "category": "Core Java",
    "question": "If an array is declared `volatile`, what is volatile?",
    "options": [
      {
        "id": "A",
        "text": "Only the array reference. Writes to individual elements are not automatically volatile"
      },
      {
        "id": "B",
        "text": "Every element of the array"
      },
      {
        "id": "C",
        "text": "The array length only"
      },
      {
        "id": "D",
        "text": "Nothing; arrays cannot be `volatile`"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "You may declare the array *reference* `volatile`, so replacing the whole array is visible to other threads. Stores into `arr[i]` are ordinary writes and are not automatically volatile. Use `AtomicIntegerArray`/`AtomicReferenceArray` or extra synchronization for element-level visibility. Arrays can be `volatile`; the myth that they cannot is false."
  },
  {
    "id": 15,
    "category": "Core Java",
    "question": "Checked vs unchecked exceptions: which statements are correct?",
    "options": [
      {
        "id": "A",
        "text": "Checked exceptions (subclasses of `Exception` excluding `RuntimeException`) must be declared or caught"
      },
      {
        "id": "B",
        "text": "`RuntimeException` and `Error` are unchecked"
      },
      {
        "id": "C",
        "text": "All exceptions must be listed in `throws` or the code will not compile"
      },
      {
        "id": "D",
        "text": "You can create a custom unchecked exception by extending `RuntimeException`"
      }
    ],
    "correct": [
      "A",
      "B",
      "D"
    ],
    "requiredCount": 3,
    "explanation": "Checked exceptions extend `Exception` but not `RuntimeException` and must be caught or declared. `RuntimeException` and `Error` (and their subclasses) are unchecked. You create a custom unchecked exception by extending `RuntimeException`. You do **not** list every exception in `throws` — only checked ones."
  },
  {
    "id": 16,
    "category": "Core Java",
    "question": "What happens if you cast an `int` larger than 127 (or smaller than -128) to `byte`?",
    "options": [
      {
        "id": "A",
        "text": "The value is truncated to 8 bits (overflow / wrap-around); no exception is thrown"
      },
      {
        "id": "B",
        "text": "Java throws `OverflowException`"
      },
      {
        "id": "C",
        "text": "The result is always 127"
      },
      {
        "id": "D",
        "text": "The compiler rejects the cast"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "Narrowing `int` → `byte` keeps the low 8 bits (two's complement wrap). `(byte)128` is `-128`; `(byte)129` is `-127`. The compiler allows an explicit cast; no `OverflowException` exists. The result is not clamped to 127."
  },
  {
    "id": 17,
    "category": "Core Java",
    "question": "What is a bounded type parameter such as `<T extends Number>`?",
    "options": [
      {
        "id": "A",
        "text": "A generic type restricted to `Number` or its subtypes, so you can call `Number` methods on `T`"
      },
      {
        "id": "B",
        "text": "A type that cannot be used with collections"
      },
      {
        "id": "C",
        "text": "A primitive type alias"
      },
      {
        "id": "D",
        "text": "A way to disable type erasure"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "`<T extends Number>` is an upper bound: `T` must be `Number` or a subtype, so you can call `Number` methods on `T`. Lower bounds (`? super T`) appear mainly on wildcards. Bounds do not disable erasure: at runtime `T` becomes its bound (`Number` here)."
  },
  {
    "id": 18,
    "category": "Core Java",
    "question": "What is type erasure?",
    "options": [
      {
        "id": "A",
        "text": "The compiler removes generic type parameters at compile time, replacing them with their bounds (often `Object`) so the JVM sees raw types"
      },
      {
        "id": "B",
        "text": "The GC deleting unused class files"
      },
      {
        "id": "C",
        "text": "Converting a `List<String>` to a `String[]` automatically"
      },
      {
        "id": "D",
        "text": "A Java 21 feature that keeps generics at runtime"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "Generics are erased at compile time. Unbounded `T` becomes `Object`; `<T extends Number>` becomes `Number`. That is why `new T()`, `T[].class`, and overloads that differ only by generic type are illegal or heap-polluting. Erasure is not GC, and Java still does not reify generic types at runtime."
  },
  {
    "id": 19,
    "category": "Core Java",
    "question": "What is a classloader in Java?",
    "options": [
      {
        "id": "A",
        "text": "A JVM component that loads class bytecode into memory; commonly bootstrap, platform/extension, and application (system) class loaders, plus custom loaders"
      },
      {
        "id": "B",
        "text": "The tool that compiles `.java` to `.class`"
      },
      {
        "id": "C",
        "text": "The GC thread that unloads methods"
      },
      {
        "id": "D",
        "text": "A Spring annotation for scanning packages"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "A classloader locates bytecode, defines a `Class`, and typically delegates to a parent first (bootstrap → platform → application). Custom loaders appear in app servers and plugin systems. `javac` compiles; it is not a classloader. Spring `@ComponentScan` is not class loading."
  },
  {
    "id": 20,
    "category": "Core Java",
    "question": "Abstraction vs encapsulation: which pairing is correct?",
    "options": [
      {
        "id": "A",
        "text": "Abstraction hides implementation details behind a contract (interface/abstract class); encapsulation hides internal state and exposes controlled accessors"
      },
      {
        "id": "B",
        "text": "They are identical OOP terms"
      },
      {
        "id": "C",
        "text": "Encapsulation means using only abstract classes"
      },
      {
        "id": "D",
        "text": "Abstraction is only achieved with the `private` keyword"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "Abstraction exposes a contract (`interface` / abstract class) and hides how it is implemented. Encapsulation bundles state with behavior and hides fields (`private` + accessors). They often appear together but are not the same. `private` alone is encapsulation, not the whole of abstraction."
  },
  {
    "id": 21,
    "category": "Core Java",
    "question": "Overloading vs overriding: which statements are correct?",
    "options": [
      {
        "id": "A",
        "text": "Overloading: same name, different parameter list, resolved at compile time"
      },
      {
        "id": "B",
        "text": "Overriding: same signature in a subclass, resolved at runtime (dynamic dispatch)"
      },
      {
        "id": "C",
        "text": "You can override a `static` method polymorphically"
      },
      {
        "id": "D",
        "text": "Return type alone is enough to overload a method"
      }
    ],
    "correct": [
      "A",
      "B"
    ],
    "requiredCount": 2,
    "explanation": "Overloading: same name, different parameter list, chosen at compile time. Overriding: same instance-method signature in a subclass, chosen at runtime (virtual dispatch). `static` methods are hidden, not overridden. Return type alone cannot overload a method (it is not part of the JVM overload key besides covariant returns on overrides)."
  },
  {
    "id": 22,
    "category": "Core Java",
    "question": "What is a shallow copy vs a deep copy?",
    "options": [
      {
        "id": "A",
        "text": "Shallow copy duplicates the object but shares nested references; deep copy recursively copies nested objects too"
      },
      {
        "id": "B",
        "text": "Shallow copy is always illegal in Java"
      },
      {
        "id": "C",
        "text": "Deep copy is what `=` does between two variables"
      },
      {
        "id": "D",
        "text": "`clone()` always performs a deep copy"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "A shallow copy duplicates the root object but reuses nested references. A deep copy recursively copies the graph. `=` copies the reference only. `Object.clone()` is shallow unless you override it and clone children. Neither is illegal; choose based on whether shared mutable nested state is acceptable."
  },
  {
    "id": 23,
    "category": "Core Java",
    "question": "If `B extends A`, which statement is true?",
    "options": [
      {
        "id": "A",
        "text": "A `B` instance *is-a* `A`, so you may treat it as `A`; the reverse is not generally true without a cast, and the cast fails if the runtime type is not `B`"
      },
      {
        "id": "B",
        "text": "`A` can always be assigned to `B` without a cast"
      },
      {
        "id": "C",
        "text": "Inheritance is symmetric: `A` is-a `B` and `B` is-a `A`"
      },
      {
        "id": "D",
        "text": "Subclassing swaps the types at runtime"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "Inheritance is a one-way is-a: `B extends A` means a `B` may be used as an `A` (`A a = new B()`). The reverse needs a cast and fails at runtime (`ClassCastException`) if the object is not actually a `B`. Types are not swapped."
  },
  {
    "id": 24,
    "category": "Core Java",
    "question": "Which API is the usual way to read a text file in modern Java?",
    "options": [
      {
        "id": "A",
        "text": "`Files.readString(path)` or `Files.lines(path)` / `new BufferedReader(new FileReader(...))` with try-with-resources"
      },
      {
        "id": "B",
        "text": "`System.gc()` then `File.dump()`"
      },
      {
        "id": "C",
        "text": "`Thread.readFile()`"
      },
      {
        "id": "D",
        "text": "`Runtime.getRuntime().load(path)`"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "Prefer NIO.2: `Files.readString(path)`, `Files.lines(path)`, or a `BufferedReader` inside try-with-resources so the stream is closed. `System.gc()` and `Runtime.load` are unrelated (`load` loads a native library). There is no `Thread.readFile()`."
  },
  {
    "id": 25,
    "category": "Core Java",
    "question": "How does Java reflection typically work?",
    "options": [
      {
        "id": "A",
        "text": "You obtain a `Class` object and can inspect/invoke constructors, methods, and fields at runtime, even private ones if the module system allows it"
      },
      {
        "id": "B",
        "text": "Reflection compiles Java source on the fly only"
      },
      {
        "id": "C",
        "text": "Reflection is only available for interfaces"
      },
      {
        "id": "D",
        "text": "Reflection disables the garbage collector"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "Reflection starts from a `Class` object (`obj.getClass()`, `Foo.class`) and can read/call constructors, methods, and fields — including private ones if the module system allows. It is slower, can break encapsulation, and is not limited to interfaces. It does not disable GC and is not a source compiler."
  },
  {
    "id": 26,
    "category": "Core Java",
    "question": "What is the difference between instance methods and `static` methods?",
    "options": [
      {
        "id": "A",
        "text": "Instance methods belong to an object and can use instance state; `static` methods belong to the class and cannot access instance fields without an instance"
      },
      {
        "id": "B",
        "text": "Static methods are dispatched polymorphically like instance methods"
      },
      {
        "id": "C",
        "text": "Instance methods cannot be `synchronized`"
      },
      {
        "id": "D",
        "text": "Static methods run on a separate JVM"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "Instance methods have `this` and can use instance fields. `static` methods belong to the class, have no `this`, and cannot touch instance state unless you pass an instance in. Static calls are resolved at compile time (hiding, not polymorphism). They do not run on a separate JVM."
  },
  {
    "id": 27,
    "category": "Collections",
    "question": "How does `HashSet` work internally?",
    "options": [
      {
        "id": "A",
        "text": "It is backed by a `HashMap`: elements are keys, a dummy value is stored, and uniqueness is based on `hashCode()`/`equals()`"
      },
      {
        "id": "B",
        "text": "It stores elements in a balanced red-black tree only"
      },
      {
        "id": "C",
        "text": "It keeps insertion order using a linked list as its sole structure"
      },
      {
        "id": "D",
        "text": "It allows duplicate keys as long as hash codes differ"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "`HashSet` is a wrapper around `HashMap`: each element is a key, the value is a dummy (`PRESENT`). Uniqueness uses `hashCode()` then `equals()`. Java 8+ collision bins start as lists and treeify when long. It is not a TreeSet, does not keep insertion order, and does not allow duplicates."
  },
  {
    "id": 28,
    "category": "Collections",
    "question": "ArrayList vs Vector: which statements are correct?",
    "options": [
      {
        "id": "A",
        "text": "`ArrayList` is not synchronized; `Vector` methods are synchronized"
      },
      {
        "id": "B",
        "text": "`ArrayList` typically grows by 50% (old + old/2); `Vector` doubles by default"
      },
      {
        "id": "C",
        "text": "`ArrayList` is generally preferred; `Vector` is a legacy class"
      },
      {
        "id": "D",
        "text": "`ArrayList` can only be traversed with `Enumeration`"
      }
    ],
    "correct": [
      "A",
      "B",
      "C"
    ],
    "requiredCount": 3,
    "explanation": "`ArrayList` is unsynchronized and grows by about 50% (`old + old/2`). `Vector` is a legacy synchronized list that doubles by default and can use `Enumeration` as well as `Iterator`. Prefer `ArrayList` plus explicit concurrency if needed. `ArrayList` is not limited to `Enumeration`."
  },
  {
    "id": 29,
    "category": "Collections",
    "question": "ArrayList vs LinkedList: which is accurate?",
    "options": [
      {
        "id": "A",
        "text": "`ArrayList` uses a dynamic array — fast random access, slower inserts/removes in the middle"
      },
      {
        "id": "B",
        "text": "`LinkedList` is a doubly linked list — cheaper inserts/removes at known nodes, poor random access"
      },
      {
        "id": "C",
        "text": "`LinkedList` is always faster than `ArrayList` in practice"
      },
      {
        "id": "D",
        "text": "Both forbid `null` elements"
      }
    ],
    "correct": [
      "A",
      "B"
    ],
    "requiredCount": 2,
    "explanation": "`ArrayList` is a resizable array: O(1) random access, O(n) inserts/removes in the middle because elements must shift. `LinkedList` is a doubly linked list: cheap insert/remove if you already have the node, but O(n) index access and poor cache locality. In practice `ArrayList` is the default. Both allow `null`. `LinkedList` is not always faster."
  },
  {
    "id": 30,
    "category": "Collections",
    "question": "Which statements about `TreeSet` are correct?",
    "options": [
      {
        "id": "A",
        "text": "It implements `NavigableSet`/`SortedSet`, stores unique elements, and sorts by natural order or a `Comparator`"
      },
      {
        "id": "B",
        "text": "It does not preserve insertion order"
      },
      {
        "id": "C",
        "text": "Elements must be mutually comparable or you get `ClassCastException`"
      },
      {
        "id": "D",
        "text": "It is the fastest Set when ordering does not matter"
      }
    ],
    "correct": [
      "A",
      "B",
      "C"
    ],
    "requiredCount": 3,
    "explanation": "`TreeSet` is a red-black tree implementing `NavigableSet`. Elements are unique and sorted by natural order or a `Comparator`. Insertion order is not kept. Heterogeneous, incomparable elements throw `ClassCastException`. It is O(log n), not the fastest set when you do not need sorting — use `HashSet` or `EnumSet`."
  },
  {
    "id": 31,
    "category": "Collections",
    "question": "Which are the main Collection/Map families in `java.util`?",
    "options": [
      {
        "id": "A",
        "text": "`List`, `Set`, `Queue`/`Deque`, and `Map` (plus sorted/navigable variants)"
      },
      {
        "id": "B",
        "text": "Only `Array` and `Vector`"
      },
      {
        "id": "C",
        "text": "`Stream` is a `Collection`"
      },
      {
        "id": "D",
        "text": "`Optional` is a `List`"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "The `Collection` hierarchy is `List`, `Set`, and `Queue`/`Deque` (plus sorted/navigable variants). `Map` is a separate interface (not a `Collection`). `Stream` is a pipeline, not a collection. `Optional` is a 0-or-1 wrapper, not a `List`. Arrays/`Vector` are not the whole library."
  },
  {
    "id": 32,
    "category": "Collections",
    "question": "Set vs List: what is the key uniqueness difference?",
    "options": [
      {
        "id": "A",
        "text": "A `Set` contains unique elements (`equals`); a `List` is ordered and allows duplicates"
      },
      {
        "id": "B",
        "text": "A `List` never allows duplicates"
      },
      {
        "id": "C",
        "text": "A `Set` always preserves insertion order"
      },
      {
        "id": "D",
        "text": "`Map` is a subtype of `List`"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "A `Set` forbids duplicates according to `equals` (and `compareTo` for `SortedSet`). A `List` is ordered by index and allows duplicates. `Set` iteration order depends on the implementation: `HashSet` none, `LinkedHashSet` insertion, `TreeSet` sorted. `Map` is not a `List`."
  },
  {
    "id": 33,
    "category": "Collections",
    "question": "What is the root interface of the Collection hierarchy?",
    "options": [
      {
        "id": "A",
        "text": "`Iterable` — `Collection` extends `Iterable`"
      },
      {
        "id": "B",
        "text": "`Map`"
      },
      {
        "id": "C",
        "text": "`Serializable`"
      },
      {
        "id": "D",
        "text": "`Cloneable`"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "`Collection` extends `Iterable`, so every collection supports for-each. That makes `Iterable` the root of the collection *hierarchy*. `Map` does not extend `Collection` (use `keySet()`/`values()`/`entrySet()`). `Serializable`/`Cloneable` are unrelated markers."
  },
  {
    "id": 34,
    "category": "Collections",
    "question": "How do you create an unmodifiable list with one element, and an empty unmodifiable list?",
    "options": [
      {
        "id": "A",
        "text": "`List.of(e)` or `Collections.singletonList(e)`; empty: `List.of()` or `Collections.emptyList()`"
      },
      {
        "id": "B",
        "text": "`new ArrayList<>()` is already unmodifiable"
      },
      {
        "id": "C",
        "text": "`Collections.shuffle(list)` returns an unmodifiable list"
      },
      {
        "id": "D",
        "text": "`Arrays.asList()` always rejects `set()`"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "`List.of(e)` or `Collections.singletonList(e)` gives a one-element unmodifiable list. Empty: `List.of()` or `Collections.emptyList()`. `new ArrayList<>()` is mutable. `Collections.shuffle` returns `void`. `Arrays.asList` is fixed-size but still allows `set`."
  },
  {
    "id": 35,
    "category": "Collections",
    "question": "How do you sort a list, and what is Comparable vs Comparator?",
    "options": [
      {
        "id": "A",
        "text": "`Collections.sort(list)` / `list.sort(...)`; `Comparable` defines natural order (`compareTo`); `Comparator` is an external ordering"
      },
      {
        "id": "B",
        "text": "Only arrays can be sorted in Java"
      },
      {
        "id": "C",
        "text": "`Comparable` and `Comparator` are the same interface"
      },
      {
        "id": "D",
        "text": "Sorting a `HashSet` keeps it a `HashSet` with a guaranteed order"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "`list.sort(comparator)` or `Collections.sort(list)` sorts a `List`. `Comparable.compareTo` is the type's natural order. A `Comparator` is an external ordering. You cannot sort a `HashSet` in place and keep it a `HashSet`; dump to a `List` or use `TreeSet`."
  },
  {
    "id": 36,
    "category": "Collections",
    "question": "What does `Collections.shuffle(list)` return?",
    "options": [
      {
        "id": "A",
        "text": "`void` — it shuffles the list in place. Do not assign the result to a variable"
      },
      {
        "id": "B",
        "text": "A new shuffled copy of the list"
      },
      {
        "id": "C",
        "text": "An unmodifiable view"
      },
      {
        "id": "D",
        "text": "`Optional<List<E>>`"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "`Collections.shuffle(list)` shuffles in place and returns `void`. The notes' `list = Collections.shuffle(list)` does not compile. It does not return a copy, an unmodifiable view, or an `Optional`."
  },
  {
    "id": 37,
    "category": "Collections",
    "question": "How do you make an existing list unmodifiable?",
    "options": [
      {
        "id": "A",
        "text": "`Collections.unmodifiableList(list)` (a live unmodifiable view) or copy via `List.copyOf(list)` (an unmodifiable snapshot)"
      },
      {
        "id": "B",
        "text": "`list.freeze()`"
      },
      {
        "id": "C",
        "text": "`list.setReadOnly(true)`"
      },
      {
        "id": "D",
        "text": "Declaring the variable `final`"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "`Collections.unmodifiableList(list)` is a live view: you cannot mutate through the view, but mutating the original list is still visible. `List.copyOf(list)` takes an unmodifiable snapshot and rejects `null`. `final` only protects the variable, not the list contents. There is no `freeze()`/`setReadOnly()`."
  },
  {
    "id": 38,
    "category": "Collections",
    "question": "HashSet vs LinkedHashSet: what is the difference?",
    "options": [
      {
        "id": "A",
        "text": "`LinkedHashSet` maintains insertion order via a linked list on top of hashing; `HashSet` has no order guarantee"
      },
      {
        "id": "B",
        "text": "`HashSet` sorts elements; `LinkedHashSet` does not"
      },
      {
        "id": "C",
        "text": "`LinkedHashSet` allows duplicates"
      },
      {
        "id": "D",
        "text": "`HashSet` is synchronized; `LinkedHashSet` is not"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "`LinkedHashSet` = `HashSet` plus a linked list that preserves *insertion* order. `HashSet` has no order guarantee. Both reject duplicates and are unsynchronized. `LinkedHashMap` (not `LinkedHashSet`) can optionally use access order. `HashSet` does not sort; `TreeSet` does."
  },
  {
    "id": 39,
    "category": "Collections",
    "question": "When should you choose HashSet, LinkedHashSet, or TreeSet?",
    "options": [
      {
        "id": "A",
        "text": "`HashSet` for fastest unique storage; `LinkedHashSet` when insertion order matters; `TreeSet` when you need sorted order"
      },
      {
        "id": "B",
        "text": "Always `TreeSet` because it is fastest"
      },
      {
        "id": "C",
        "text": "`HashSet` if you need `null` keys in a `Map`"
      },
      {
        "id": "D",
        "text": "`LinkedHashSet` is the only Set that forbids `null`"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "Use `HashSet` when you only need uniqueness (fastest). Use `LinkedHashSet` when iteration must follow insertion. Use `TreeSet` when you need sorted order. `HashSet` allows one `null`; `TreeSet` with natural order does not. `EnumSet` is better when all values are one enum. `TreeSet` is not the fastest default."
  },
  {
    "id": 40,
    "category": "Collections",
    "question": "HashMap vs Hashtable: which is correct?",
    "options": [
      {
        "id": "A",
        "text": "`HashMap` allows one `null` key and is unsynchronized; `Hashtable` is legacy, synchronized, and allows no `null` keys/values"
      },
      {
        "id": "B",
        "text": "They are identical aside from the name"
      },
      {
        "id": "C",
        "text": "`Hashtable` is in `java.util.concurrent`"
      },
      {
        "id": "D",
        "text": "`HashMap` is always thread-safe"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "`HashMap` is unsynchronized and allows one `null` key and many `null` values. `Hashtable` is a legacy synchronized map and allows neither `null` keys nor `null` values. Prefer `HashMap` (single thread) or `ConcurrentHashMap` (many threads). `Hashtable` is not in `java.util.concurrent`."
  },
  {
    "id": 41,
    "category": "Collections",
    "question": "ConcurrentHashMap vs `Collections.synchronizedMap` vs Hashtable: pick the accurate statements.",
    "options": [
      {
        "id": "A",
        "text": "`ConcurrentHashMap` allows concurrent readers/writers with fine-grained coordination and does not lock the whole map for most operations"
      },
      {
        "id": "B",
        "text": "`synchronizedMap` and `Hashtable` lock the entire map on each method"
      },
      {
        "id": "C",
        "text": "`ConcurrentHashMap` allows `null` keys"
      },
      {
        "id": "D",
        "text": "`ConcurrentHashMap` iterators are weakly consistent and do not throw `ConcurrentModificationException`"
      }
    ],
    "correct": [
      "A",
      "B",
      "D"
    ],
    "requiredCount": 3,
    "explanation": "`ConcurrentHashMap` allows concurrent reads/writes with per-bin coordination, forbids `null` keys/values, and offers weakly consistent iterators (no `ConcurrentModificationException`). `Hashtable` and `Collections.synchronizedMap` lock the entire map on each call and scale poorly."
  },
  {
    "id": 42,
    "category": "Collections",
    "question": "How is locking implemented in `ConcurrentHashMap` (Java 8+)?",
    "options": [
      {
        "id": "A",
        "text": "CAS on table cells plus locking only the affected bin/node for contended updates; Java 7 used segments, but Java 8 removed that design"
      },
      {
        "id": "B",
        "text": "A single `synchronized (this)` around every call"
      },
      {
        "id": "C",
        "text": "It never uses any CPU atomic operations"
      },
      {
        "id": "D",
        "text": "It copies the entire map on each write (copy-on-write)"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "Java 7 `ConcurrentHashMap` used a fixed number of segments (often remembered as 16). Java 8+ dropped that: updates use CAS on table cells and lock only the contended bin/node; long bins treeify. It is not one giant `synchronized (this)` and not copy-on-write."
  },
  {
    "id": 43,
    "category": "Collections",
    "question": "What is the average and worst-case complexity of `HashMap.get`?",
    "options": [
      {
        "id": "A",
        "text": "Average O(1); worst case O(log n) after treeification of a bin (Java 8+), or O(n) on a degenerate pre-Java-8 chain"
      },
      {
        "id": "B",
        "text": "Always O(n)"
      },
      {
        "id": "C",
        "text": "Always O(log n) like `TreeMap`"
      },
      {
        "id": "D",
        "text": "O(1) guaranteed even with a hostile hashCode"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "With a decent `hashCode`, `HashMap.get` is amortized O(1). Java 8+ treeifies long collision bins (once the table is large enough), so a hostile/degenerate bucket is O(log n). Before Java 8 a long chain was O(n). It is not always O(log n) like `TreeMap`, and O(1) is not a worst-case guarantee."
  },
  {
    "id": 44,
    "category": "Collections",
    "question": "How do you create a `Deque` in Java?",
    "options": [
      {
        "id": "A",
        "text": "`ArrayDeque` is the usual general-purpose deque; `LinkedList` also implements `Deque`"
      },
      {
        "id": "B",
        "text": "`new Deque()` — it is a concrete class"
      },
      {
        "id": "C",
        "text": "Only `Stack` implements `Deque`"
      },
      {
        "id": "D",
        "text": "`HashSet` is a double-ended queue"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "`Deque` is an interface. The usual implementation is `ArrayDeque` (resizable array, no `null`s). `LinkedList` also implements `Deque`. Prefer `ArrayDeque` over the legacy `Stack` class. You cannot `new Deque()`, and `HashSet` is not a deque."
  },
  {
    "id": 45,
    "category": "Collections",
    "question": "What does an `Iterator` provide, and what is fail-fast behavior?",
    "options": [
      {
        "id": "A",
        "text": "`hasNext()`/`next()` (and optional `remove()`); most `java.util` iterators are fail-fast and may throw `ConcurrentModificationException` if the collection is structurally changed during iteration"
      },
      {
        "id": "B",
        "text": "Iterators make collections thread-safe"
      },
      {
        "id": "C",
        "text": "`Iterator` is only for `Map`"
      },
      {
        "id": "D",
        "text": "Fail-fast iterators lock the collection for the entire loop"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "An `Iterator` offers `hasNext()`, `next()`, and optional `remove()`. Most `java.util` iterators are fail-fast: a structural change other than `Iterator.remove()` may throw `ConcurrentModificationException`. They do not lock the collection for the whole loop and do not make it thread-safe. Enhanced for-each uses an iterator."
  },
  {
    "id": 46,
    "category": "Collections",
    "question": "Array vs ArrayList: which differences are correct?",
    "options": [
      {
        "id": "A",
        "text": "Arrays have a fixed length; `ArrayList` grows dynamically"
      },
      {
        "id": "B",
        "text": "Arrays can hold primitives; `ArrayList` stores objects (primitives are boxed)"
      },
      {
        "id": "C",
        "text": "`ArrayList` is a `List` with helpers like `add`/`remove`; arrays use index assignment"
      },
      {
        "id": "D",
        "text": "`ArrayList` lives only on the stack"
      }
    ],
    "correct": [
      "A",
      "B",
      "C"
    ],
    "requiredCount": 3,
    "explanation": "Arrays have a fixed length and can store primitives. `ArrayList` grows, stores references (primitives are boxed), and offers `List` methods. Both the array object and the `ArrayList` live on the heap. `ArrayList` is not stack-only."
  },
  {
    "id": 47,
    "category": "Collections",
    "question": "What is `Map` in Java, as opposed to hashing?",
    "options": [
      {
        "id": "A",
        "text": "`Map` is an interface for key-value associations; `HashMap` is a hash-table implementation of `Map`"
      },
      {
        "id": "B",
        "text": "`Hash` is a Java interface in `java.lang`"
      },
      {
        "id": "C",
        "text": "`Map` cannot use hashing"
      },
      {
        "id": "D",
        "text": "`Hashtable` is not a `Map`"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "`Map` is the key-value interface. `HashMap` is a hash-table implementation of `Map`. There is no `java.lang.Hash` collection interface. Other maps: `TreeMap`, `LinkedHashMap`, `ConcurrentHashMap`. `Hashtable` *is* a `Map`."
  },
  {
    "id": 48,
    "category": "Concurrency",
    "question": "Process vs thread: which statements are correct?",
    "options": [
      {
        "id": "A",
        "text": "A process has its own memory space; threads of a process share heap and so can communicate via shared objects"
      },
      {
        "id": "B",
        "text": "Creating a thread is typically cheaper than creating a process"
      },
      {
        "id": "C",
        "text": "Every Java thread has its own stack"
      },
      {
        "id": "D",
        "text": "Threads never share anything, which is why deadlocks cannot occur"
      }
    ],
    "correct": [
      "A",
      "B",
      "C"
    ],
    "requiredCount": 3,
    "explanation": "A process has its own address space. Threads in one JVM share the heap and statics, but each thread has its own stack. Creating a thread is cheaper than a process. Because memory is shared, races and deadlocks are possible — threads do share data."
  },
  {
    "id": 49,
    "category": "Concurrency",
    "question": "What is a deadlock?",
    "options": [
      {
        "id": "A",
        "text": "Two or more threads (or DB sessions) wait forever for locks the others hold; typical conditions include mutual exclusion and circular wait"
      },
      {
        "id": "B",
        "text": "A thread using 100% CPU in a tight loop"
      },
      {
        "id": "C",
        "text": "The GC pausing the application"
      },
      {
        "id": "D",
        "text": "A `StackOverflowError`"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "Deadlock: a cycle of waiters, each holding a lock the next needs (mutual exclusion + hold-and-wait + no preemption + circular wait). CPU spin is a livelock/busy-wait issue, not deadlock. GC pauses and `StackOverflowError` are different. Prevent with lock ordering, timeouts, and smaller critical sections. Databases abort a victim transaction."
  },
  {
    "id": 50,
    "category": "Concurrency",
    "question": "Is `i++` thread-safe on a shared `int`?",
    "options": [
      {
        "id": "A",
        "text": "No. It is a read-modify-write that can lose updates; use `AtomicInteger`, `synchronized`, or a lock"
      },
      {
        "id": "B",
        "text": "Yes, the JVM makes `++` atomic for all types"
      },
      {
        "id": "C",
        "text": "Only if the variable is `final`"
      },
      {
        "id": "D",
        "text": "Yes if the variable is `static`"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "`i++` is read-modify-write (load, add, store). Two threads can lose an update. `volatile` only publishes each single write; it does not make `++` atomic. `final`/`static` do not help. Use `AtomicInteger`, `synchronized`, or a `Lock`."
  },
  {
    "id": 51,
    "category": "Concurrency",
    "question": "What does thread safety mean?",
    "options": [
      {
        "id": "A",
        "text": "Correct behavior when multiple threads access shared state, without race conditions, visibility bugs, or deadlocks"
      },
      {
        "id": "B",
        "text": "That a class uses as many threads as possible"
      },
      {
        "id": "C",
        "text": "That the code never uses `synchronized`"
      },
      {
        "id": "D",
        "text": "That `Thread.sleep` is called in every method"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "Thread safety means shared mutable state stays correct under concurrent access: no lost updates, stale reads, or deadlocks. It is not 'use as many threads as possible' and not 'never synchronize'. Immutability, confinement, atomics, and locks are the usual tools. `Thread.sleep` is not a safety strategy."
  },
  {
    "id": 52,
    "category": "Concurrency",
    "question": "How can you run work on a thread in Java?",
    "options": [
      {
        "id": "A",
        "text": "Implement `Runnable`/`Callable` and pass it to a `Thread` or an `ExecutorService`"
      },
      {
        "id": "B",
        "text": "Extend `Thread` and override `run()` (less flexible)"
      },
      {
        "id": "C",
        "text": "Call `new Thread().start()` vs `run()` — `start()` actually spawns a thread"
      },
      {
        "id": "D",
        "text": "Implementing `Runnable` automatically starts a thread at class load"
      }
    ],
    "correct": [
      "A",
      "B",
      "C"
    ],
    "requiredCount": 3,
    "explanation": "Implement `Runnable` or `Callable` and pass it to a `Thread` or, better, an `ExecutorService`. You may also subclass `Thread` and override `run()`. `start()` actually creates an OS/JVM thread; calling `run()` yourself runs it on the current thread. Implementing `Runnable` does not auto-start anything."
  },
  {
    "id": 53,
    "category": "Concurrency",
    "question": "Why use a thread pool (`ExecutorService`)?",
    "options": [
      {
        "id": "A",
        "text": "Reuse threads, bound concurrency, and avoid the cost and unbounded growth of creating a new `Thread` per task"
      },
      {
        "id": "B",
        "text": "To disable the garbage collector"
      },
      {
        "id": "C",
        "text": "Because only pools can run `Runnable`"
      },
      {
        "id": "D",
        "text": "To make every task run on the UI thread"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "A pool reuses worker threads, caps concurrency, and avoids unbounded `new Thread` per task. Typical factories: `newFixedThreadPool`, `newCachedThreadPool`, `ThreadPoolExecutor`. Always `shutdown()`. Pools do not disable GC, and `Runnable` can run without a pool."
  },
  {
    "id": 54,
    "category": "Concurrency",
    "question": "`Runnable` vs `Callable`: what is the difference?",
    "options": [
      {
        "id": "A",
        "text": "`Runnable.run()` returns `void` and cannot throw checked exceptions; `Callable.call()` returns a value and may throw `Exception`"
      },
      {
        "id": "B",
        "text": "They are identical functional interfaces"
      },
      {
        "id": "C",
        "text": "`Callable` cannot be used with `ExecutorService`"
      },
      {
        "id": "D",
        "text": "`Runnable` is only for Java 1.0 applets"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "`Runnable.run()` returns `void` and cannot throw checked exceptions. `Callable.call()` returns a value and may throw `Exception`. `ExecutorService.submit(Callable)` gives `Future<V>`; `submit(Runnable)` gives a `Future` with a null result. They are different functional interfaces."
  },
  {
    "id": 55,
    "category": "Streams & Functional",
    "question": "What is a Stream in Java?",
    "options": [
      {
        "id": "A",
        "text": "A pipeline of aggregate operations on a source; it does not store elements and is not a data structure"
      },
      {
        "id": "B",
        "text": "A synchronized `List`"
      },
      {
        "id": "C",
        "text": "A replacement for `InputStream` only"
      },
      {
        "id": "D",
        "text": "A thread pool"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "A `Stream` is a lazy pipeline over a source, not a storage structure. Intermediate ops (`map`, `filter`) are lazy; a terminal op (`collect`, `forEach`) runs the pipeline and consumes the stream — you cannot reuse it. Streams may be sequential or parallel. They are not a `List` and not an `InputStream`."
  },
  {
    "id": 56,
    "category": "Streams & Functional",
    "question": "What is the difference between `map` and `flatMap` on a stream?",
    "options": [
      {
        "id": "A",
        "text": "`map` maps each element to one value; `flatMap` maps each element to a stream (or optional) and flattens the results"
      },
      {
        "id": "B",
        "text": "`flatMap` is only for primitives"
      },
      {
        "id": "C",
        "text": "`map` always filters nulls"
      },
      {
        "id": "D",
        "text": "They differ only in name"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "`map` transforms each element to one value (`Stream<T>` → `Stream<R>`). `flatMap` transforms each element to a stream (or optional) and concatenates the results, flattening `Stream<Stream<T>>` to `Stream<T>`. Use it to unwrap nested lists. `flatMap` is not primitive-only; `map` does not auto-filter nulls."
  },
  {
    "id": 57,
    "category": "Streams & Functional",
    "question": "Should you always use `parallelStream()`?",
    "options": [
      {
        "id": "A",
        "text": "No. Parallel streams help CPU-bound work on large, splittable sources; they add overhead, can hurt latency, and share the common ForkJoinPool"
      },
      {
        "id": "B",
        "text": "Yes, the compiler makes them faster in every case"
      },
      {
        "id": "C",
        "text": "Only parallel streams can use lambdas"
      },
      {
        "id": "D",
        "text": "Parallel streams are always thread-safe with any shared mutable accumulator"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "Do not default to `parallelStream()`. It helps CPU-bound work on large, easily split sources, but it uses the common `ForkJoinPool`, adds overhead, and is a poor fit for tiny lists, blocking I/O, or shared unsynchronized mutation. Measure. Lambdas work on sequential streams too."
  },
  {
    "id": 58,
    "category": "Streams & Functional",
    "question": "Why use functional style and immutability?",
    "options": [
      {
        "id": "A",
        "text": "Fewer accidental shared-mutation bugs, easier reasoning, and safer parallelism — at the cost of some allocations"
      },
      {
        "id": "B",
        "text": "It is the only way to write Java before version 5"
      },
      {
        "id": "C",
        "text": "Immutability makes `hashCode` illegal"
      },
      {
        "id": "D",
        "text": "Functional style disables exceptions"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "Immutable data and pure functions avoid accidental shared mutation, which makes reasoning and parallelism easier. The trade-off is extra allocations. It is not required pre-Java 5, does not ban `hashCode`, and does not disable exceptions. Prefer it at concurrency boundaries and in stream pipelines."
  },
  {
    "id": 59,
    "category": "JVM & GC",
    "question": "What is the Java heap?",
    "options": [
      {
        "id": "A",
        "text": "The runtime data area where objects (and arrays) are allocated, shared among threads, and reclaimed by the GC"
      },
      {
        "id": "B",
        "text": "The per-thread area for local variables and call frames"
      },
      {
        "id": "C",
        "text": "Native memory used only for JNI"
      },
      {
        "id": "D",
        "text": "The disk cache for `.class` files"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "The heap is the shared area where objects and arrays are allocated and reclaimed by the GC. Threads share it. When it cannot grow, you get `OutOfMemoryError: Java heap space`. Size it with `-Xms`/`-Xmx`. It is not a per-thread stack and not the `.class` disk cache."
  },
  {
    "id": 60,
    "category": "JVM & GC",
    "question": "What is Java stack memory?",
    "options": [
      {
        "id": "A",
        "text": "Per-thread memory for frames: local variables, partial results, and method invocation; primitives and references live there, objects do not"
      },
      {
        "id": "B",
        "text": "The place where all objects are stored"
      },
      {
        "id": "C",
        "text": "Shared among all threads like the heap"
      },
      {
        "id": "D",
        "text": "Only used by the JIT compiler"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "Each thread has a stack of frames: locals, operand stack, and return info. Primitive locals and *references* live there; the objects they point to live on the heap. Stacks are not shared. Deep recursion or huge local primitive arrays can throw `StackOverflowError`."
  },
  {
    "id": 61,
    "category": "JVM & GC",
    "question": "Heap vs stack: which comparison is correct?",
    "options": [
      {
        "id": "A",
        "text": "Heap: shared, GC-managed objects. Stack: thread-local frames, automatic pop on method return, faster allocation of locals"
      },
      {
        "id": "B",
        "text": "Stack stores objects; heap stores method calls"
      },
      {
        "id": "C",
        "text": "Both are always the same size"
      },
      {
        "id": "D",
        "text": "The stack is garbage-collected the same way as the old generation"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "Heap: shared, GC-managed objects. Stack: thread-local frames, popped on return, cheap for locals. Assignment of an object puts a reference on the stack (or in a field) and the object on the heap. When no GC root can reach it, it becomes collectible. Stacks are not the old generation."
  },
  {
    "id": 62,
    "category": "JVM & GC",
    "question": "When does an object become eligible for garbage collection?",
    "options": [
      {
        "id": "A",
        "text": "When it is no longer reachable from any GC root (thread stacks, static fields, JNI refs, etc.)"
      },
      {
        "id": "B",
        "text": "Immediately after the constructor finishes"
      },
      {
        "id": "C",
        "text": "Only when you call `obj.delete()`"
      },
      {
        "id": "D",
        "text": "When its `hashCode` is 0"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "An object is eligible when it is unreachable from GC roots (thread stacks, static fields, JNI refs, etc.). Cycles among unreachable objects can still be collected. There is no `delete()`. Finish of a constructor does not free the object. `hashCode == 0` is irrelevant. Nulling a field only helps if it was the last live reference."
  },
  {
    "id": 63,
    "category": "JVM & GC",
    "question": "Can you force the garbage collector to run?",
    "options": [
      {
        "id": "A",
        "text": "No. `System.gc()` is only a hint; collection is not guaranteed and should not be relied on in production"
      },
      {
        "id": "B",
        "text": "Yes, `System.gc()` always stops the world and collects everything immediately"
      },
      {
        "id": "C",
        "text": "`finalize()` forces a full GC"
      },
      {
        "id": "D",
        "text": "`Thread.yield()` runs the GC"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "`System.gc()` is a hint. The JVM may ignore it. You cannot force or guarantee a collection, and production code should not depend on it. `finalize()` and `Thread.yield()` do not run a full GC either."
  },
  {
    "id": 64,
    "category": "JVM & GC",
    "question": "What is `finalize()`?",
    "options": [
      {
        "id": "A",
        "text": "A deprecated method the GC *might* call before reclaiming an object; it is not guaranteed, is slow, and must not be used for resource cleanup"
      },
      {
        "id": "B",
        "text": "The method that always runs when leaving a `try` block"
      },
      {
        "id": "C",
        "text": "A keyword that makes fields constant"
      },
      {
        "id": "D",
        "text": "The only way to close a `FileInputStream`"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "`finalize()` is a deprecated cleanup callback the GC *might* invoke before reclaiming an object. It is not guaranteed, is single-threaded and slow, and was deprecated (Java 9) then deprecated-for-removal (Java 18). Use try-with-resources, `Cleaner`, or `PhantomReference`. It is not `finally` and not a keyword."
  },
  {
    "id": 65,
    "category": "JVM & GC",
    "question": "Which collectors are commonly discussed for HotSpot?",
    "options": [
      {
        "id": "A",
        "text": "Serial, Parallel, CMS (deprecated/removed), G1 (often default), and low-pause collectors such as ZGC and Shenandoah"
      },
      {
        "id": "B",
        "text": "Only the Serial collector exists"
      },
      {
        "id": "C",
        "text": "The JIT compiler is a garbage collector"
      },
      {
        "id": "D",
        "text": "CMS is the only collector in Java 21"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "HotSpot collectors you should name: Serial, Parallel, CMS (deprecated in 9, removed in 14), G1 (default since Java 9), plus low-pause ZGC and Shenandoah. The JIT is not a GC. CMS is not the Java 21 default."
  },
  {
    "id": 66,
    "category": "JVM & GC",
    "question": "Which GC-related changes are associated with Java 7 and 8?",
    "options": [
      {
        "id": "A",
        "text": "Java 7 made G1 production-ready (JDK 7u4); Java 8 kept Parallel/CMS/G1 as the main options and improved G1"
      },
      {
        "id": "B",
        "text": "Java 7 removed the heap"
      },
      {
        "id": "C",
        "text": "Java 8 made CMS the only collector"
      },
      {
        "id": "D",
        "text": "ZGC shipped in Java 7"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "G1 became production-ready in JDK 7u4. Java 8 still offered Parallel, CMS, and G1, with ongoing G1 work. ZGC was not in Java 7 (experimental in 11, production in 15). Java 7 did not remove the heap; Java 8 did not make CMS the only collector."
  },
  {
    "id": 67,
    "category": "JVM & GC",
    "question": "Strong vs weak vs soft references: which is correct?",
    "options": [
      {
        "id": "A",
        "text": "Strong: ordinary references; object stays alive. Weak: does not prevent GC (used by `WeakHashMap` keys). Soft: kept until memory pressure (caches)"
      },
      {
        "id": "B",
        "text": "Weak references prevent GC forever"
      },
      {
        "id": "C",
        "text": "Soft references are collected at every minor GC always"
      },
      {
        "id": "D",
        "text": "There is no difference among them"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "Strong refs (ordinary fields/locals) keep an object alive. Weak refs do not — used as `WeakHashMap` keys. Soft refs tend to stick around until memory pressure (caches). Soft is stronger than weak. Phantom refs are for post-mortem cleanup. They are not interchangeable."
  },
  {
    "id": 68,
    "category": "JVM & GC",
    "question": "How does `WeakHashMap` work?",
    "options": [
      {
        "id": "A",
        "text": "Keys are weak references; when a key is no longer strongly reachable, its entry can be removed after GC"
      },
      {
        "id": "B",
        "text": "Values are always interned strings"
      },
      {
        "id": "C",
        "text": "It is a concurrent map with strong keys"
      },
      {
        "id": "D",
        "text": "It never allows `null` values because of the GC"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "`WeakHashMap` holds keys weakly. After GC, an entry whose key is only weakly reachable can disappear. Values are strong: if a value points back to its key, the entry leaks. It is not concurrent and not interned strings. Use it for canonical maps/caches keyed by objects you do not own."
  },
  {
    "id": 69,
    "category": "Spring & Hibernate",
    "question": "What is Inversion of Control (IoC) in Spring?",
    "options": [
      {
        "id": "A",
        "text": "The container creates and wires objects (beans) rather than your code calling `new` and looking up dependencies"
      },
      {
        "id": "B",
        "text": "A database isolation level"
      },
      {
        "id": "C",
        "text": "A JPA annotation for lazy loading"
      },
      {
        "id": "D",
        "text": "Replacing HTTP with RMI"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "IoC means the Spring container constructs beans and injects collaborators instead of your code calling `new` and looking up services. That *is* dependency injection. It is not an isolation level, a JPA fetch type, or a protocol swap."
  },
  {
    "id": 70,
    "category": "Spring & Hibernate",
    "question": "What is Dependency Injection?",
    "options": [
      {
        "id": "A",
        "text": "Supplying a class its collaborators from the outside (constructor injection preferred) instead of constructing them internally"
      },
      {
        "id": "B",
        "text": "A Hibernate cascade type"
      },
      {
        "id": "C",
        "text": "Bytecode weaving of `final` fields"
      },
      {
        "id": "D",
        "text": "An HTTP verb"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "DI supplies collaborators from the outside. Prefer constructor injection: dependencies are required, final, and easy to test. Field `@Autowired` hides the graph and is harder to test. DI is not a cascade type, a bytecode trick, or an HTTP verb."
  },
  {
    "id": 71,
    "category": "Spring & Hibernate",
    "question": "Which Spring bean scopes are standard, and what is the default?",
    "options": [
      {
        "id": "A",
        "text": "Default is `singleton`. Core scopes also include `prototype`. Web-aware scopes include `request`, `session`, and `application`"
      },
      {
        "id": "B",
        "text": "Default is `prototype`"
      },
      {
        "id": "C",
        "text": "There is only `singleton`"
      },
      {
        "id": "D",
        "text": "`@Scope(\"thread\")` is the default in Spring MVC"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "Default scope is `singleton` (one instance per container). `prototype` creates a new instance on each lookup — it is a *core* scope, not web-specific. Web-aware scopes (`request`, `session`, `application`, websocket) need a web-capable `ApplicationContext`. Default is not `prototype`."
  },
  {
    "id": 72,
    "category": "Spring & Hibernate",
    "question": "When are singleton beans instantiated by default?",
    "options": [
      {
        "id": "A",
        "text": "Eagerly at application context startup. You can switch to lazy with `@Lazy` or `default-lazy-init`"
      },
      {
        "id": "B",
        "text": "Only on JVM shutdown"
      },
      {
        "id": "C",
        "text": "Never until the first HTTP 500"
      },
      {
        "id": "D",
        "text": "Singletons are created per HTTP request by default"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "By default Spring instantiates singletons eagerly at context startup, which fails fast on wiring errors. `@Lazy` / `default-lazy-init` delays creation until first use. They are not created per HTTP request unless you change the scope, and not at JVM shutdown."
  },
  {
    "id": 73,
    "category": "Spring & Hibernate",
    "question": "What is a detached Hibernate/JPA entity?",
    "options": [
      {
        "id": "A",
        "text": "An entity that was persistent but is no longer associated with a persistence context; changes are not flushed until you `merge` (or reattach)"
      },
      {
        "id": "B",
        "text": "An entity that was never saved"
      },
      {
        "id": "C",
        "text": "A bean without a no-arg constructor"
      },
      {
        "id": "D",
        "text": "A Spring prototype bean"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "JPA states: transient (new, not persisted) → persistent (managed) → detached (session closed / entity evicted). Detached instances are not flushed. `merge` copies state onto a managed instance. `persist` is for new entities. Detached is not 'never saved' and not a Spring prototype."
  },
  {
    "id": 74,
    "category": "Spring & Hibernate",
    "question": "What does `@Transactional` do, and what is a common limitation?",
    "options": [
      {
        "id": "A",
        "text": "It wraps a method in a transaction via a proxy; self-invocation (`this.method()`) bypasses the proxy so the annotation does not apply"
      },
      {
        "id": "B",
        "text": "It makes every field persist automatically without a session"
      },
      {
        "id": "C",
        "text": "It replaces `@Entity`"
      },
      {
        "id": "D",
        "text": "It only works on `private` methods, which is the recommended style"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "`@Transactional` is applied by a Spring AOP proxy (or AspectJ). Self-invocation `this.foo()` skips the proxy, so no transaction starts. Put it on public methods of Spring beans. Default rollback is on unchecked exceptions. It does not replace `@Entity` and does not work as intended on `private` methods via JDK proxies."
  },
  {
    "id": 75,
    "category": "Spring & Hibernate",
    "question": "How should `@ManyToOne` and `@OneToMany` typically be used?",
    "options": [
      {
        "id": "A",
        "text": "`@ManyToOne` is the owning side with a FK; `@OneToMany(mappedBy=...)` is the inverse collection. Keep both sides in sync in code"
      },
      {
        "id": "B",
        "text": "Always make `@OneToMany` the owning side with no `mappedBy`"
      },
      {
        "id": "C",
        "text": "You cannot use both on the same association"
      },
      {
        "id": "D",
        "text": "`@ManyToOne` must be `FetchType.EAGER` by specification and cannot be changed"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "On a bidirectional association the `@ManyToOne` side owns the foreign key. `@OneToMany(mappedBy = \"...\")` is the inverse collection — keep both sides in sync in code. `@ManyToOne` defaults to EAGER (usually set LAZY); `@OneToMany` defaults to LAZY. You can map both; the collection is not automatically the owning side."
  },
  {
    "id": 76,
    "category": "Spring & Hibernate",
    "question": "Which are common Spring stereotype / wiring annotations?",
    "options": [
      {
        "id": "A",
        "text": "`@Component`, `@Service`, `@Repository`, `@Controller`/`@RestController`, `@Autowired`/`@Inject`, `@Bean`"
      },
      {
        "id": "B",
        "text": "`@HashMap` and `@Thread`"
      },
      {
        "id": "C",
        "text": "`@GC` and `@Heap`"
      },
      {
        "id": "D",
        "text": "`@SelectOne` from JAX-RS only"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "Stereotypes `@Component`, `@Service`, `@Repository`, `@Controller`/`@RestController` mark beans. `@Bean` methods also contribute beans. Prefer constructor injection over field `@Autowired`. `@Entity`/`@Table` are JPA; `@Override` is unrelated."
  },
  {
    "id": 77,
    "category": "REST & Web",
    "question": "What is REST / a RESTful API?",
    "options": [
      {
        "id": "A",
        "text": "An architectural style: resources identified by URIs, manipulated with uniform HTTP methods, typically JSON, stateless on the server"
      },
      {
        "id": "B",
        "text": "A Java GUI toolkit"
      },
      {
        "id": "C",
        "text": "A replacement for TCP"
      },
      {
        "id": "D",
        "text": "An ORM identical to JPA"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "REST is an architectural style: resources with URIs, a uniform interface (HTTP verbs), representations (usually JSON), and stateless servers. 'RESTful' means an API that follows those constraints, not RPC-over-POST. It is not Swing, TCP, or JPA."
  },
  {
    "id": 78,
    "category": "REST & Web",
    "question": "What is the MVC pattern?",
    "options": [
      {
        "id": "A",
        "text": "Model holds data, View renders it, Controller handles input and updates the model — used by Spring MVC among others"
      },
      {
        "id": "B",
        "text": "A three-node Kafka cluster"
      },
      {
        "id": "C",
        "text": "A GC algorithm"
      },
      {
        "id": "D",
        "text": "A type of Java Monitor"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "MVC splits Model (state/rules), View (rendering), and Controller (input). Spring MVC `@Controller` methods call services and return a view name or a `@ResponseBody` payload. It is not Kafka, a GC, or a monitor."
  },
  {
    "id": 79,
    "category": "REST & Web",
    "question": "When should you use GET, POST, PUT, and DELETE?",
    "options": [
      {
        "id": "A",
        "text": "GET: read. POST: create or non-idempotent action. PUT: replace a resource at a URI (idempotent). DELETE: remove (idempotent)"
      },
      {
        "id": "B",
        "text": "GET to create hidden records in the database"
      },
      {
        "id": "C",
        "text": "DELETE to fetch a large report"
      },
      {
        "id": "D",
        "text": "PUT is never idempotent"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "GET reads. POST creates or performs a non-idempotent action. PUT replaces the resource at a URI (idempotent). DELETE removes it (idempotent). PATCH is partial update. Never use GET to mutate — caches and crawlers assume it is safe. PUT *is* idempotent when implemented correctly."
  },
  {
    "id": 80,
    "category": "REST & Web",
    "question": "Which HTTP methods are *safe* (no server-side state change)?",
    "options": [
      {
        "id": "A",
        "text": "GET, HEAD, and OPTIONS (also TRACE). POST, PUT, PATCH, DELETE are not safe"
      },
      {
        "id": "B",
        "text": "POST and PUT"
      },
      {
        "id": "C",
        "text": "Only DELETE"
      },
      {
        "id": "D",
        "text": "Every HTTP method is safe by definition"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "Safe methods must not change server state: GET, HEAD, OPTIONS, and TRACE. POST/PUT/PATCH/DELETE are not safe. Caches, prefetchers, and crawlers rely on that. TRACE is technically safe in HTTP even though it is often disabled for security."
  },
  {
    "id": 81,
    "category": "REST & Web",
    "question": "What is an idempotent HTTP method, and which verbs are idempotent?",
    "options": [
      {
        "id": "A",
        "text": "Repeating the request has the same effect as calling it once. GET, PUT, DELETE, HEAD, OPTIONS are idempotent; POST generally is not"
      },
      {
        "id": "B",
        "text": "Idempotent means the method is encrypted"
      },
      {
        "id": "C",
        "text": "Only POST is idempotent"
      },
      {
        "id": "D",
        "text": "Idempotent means the method cannot be cached"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "Idempotent means N identical requests have the same effect as 1. GET, HEAD, PUT, DELETE, OPTIONS (and TRACE) are idempotent. POST is not (retries can create duplicates). Idempotent is not 'encrypted' or 'uncacheable'. PUT/DELETE *are* idempotent; POST is the usual counterexample."
  },
  {
    "id": 82,
    "category": "REST & Web",
    "question": "How can a GET request send parameters?",
    "options": [
      {
        "id": "A",
        "text": "Query string (`?id=1`) and path variables (`/users/{id}`). GET has no standard body semantics you should depend on"
      },
      {
        "id": "B",
        "text": "Only via HTTP cookies"
      },
      {
        "id": "C",
        "text": "Only as a JSON body, which is required by HTTP/1.1"
      },
      {
        "id": "D",
        "text": "GET cannot have parameters"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "Pass GET data as a query string (`?id=1`) or path variable (`/users/{id}`). JAX-RS: `@QueryParam`, `@PathParam`; Spring: `@RequestParam`, `@PathVariable`. Do not rely on a GET body — proxies and caches may drop it. GET can have parameters; they are not cookies-only."
  },
  {
    "id": 83,
    "category": "REST & Web",
    "question": "Which are common JAX-RS annotations?",
    "options": [
      {
        "id": "A",
        "text": "`@Path`, `@GET`/`@POST`/`@PUT`/`@DELETE`, `@PathParam`, `@QueryParam`, `@Produces`, `@Consumes`"
      },
      {
        "id": "B",
        "text": "`@Bean` and `@Autowired` only"
      },
      {
        "id": "C",
        "text": "`@Entity` and `@Table`"
      },
      {
        "id": "D",
        "text": "`@Override` and `@Deprecated` only"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "JAX-RS (Jakarta REST): `@Path`, HTTP method annotations, `@PathParam`/`@QueryParam`, `@Produces`/`@Consumes`. Spring MVC is a parallel mapping model (`@GetMapping`). `@Entity` is JPA; `@Bean` is Spring config; `@Override` is unrelated."
  },
  {
    "id": 84,
    "category": "REST & Web",
    "question": "What is OAuth (in interview terms)?",
    "options": [
      {
        "id": "A",
        "text": "A delegated authorization framework: a client obtains an access token to call APIs on behalf of a user or itself, without sharing the user's password with every service"
      },
      {
        "id": "B",
        "text": "A hashing algorithm like SHA-256"
      },
      {
        "id": "C",
        "text": "A replacement for TLS"
      },
      {
        "id": "D",
        "text": "A Java collection"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "OAuth 2.0 is delegated *authorization*: a client gets an access token (with scopes) to call APIs without collecting the user's password for every service. OpenID Connect adds authentication (ID token) on top. It is not a hash, not TLS, and not a collection."
  },
  {
    "id": 85,
    "category": "Database",
    "question": "What do the ACID properties mean?",
    "options": [
      {
        "id": "A",
        "text": "Atomicity: all-or-nothing. Consistency: constraints hold. Isolation: concurrent txns do not see each other's dirty work. Durability: committed data survives crashes"
      },
      {
        "id": "B",
        "text": "A caching algorithm used by HashMap"
      },
      {
        "id": "C",
        "text": "Four HTTP methods"
      },
      {
        "id": "D",
        "text": "Spring bean scopes"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "ACID: Atomicity (all-or-nothing), Consistency (constraints hold after commit), Isolation (concurrent transactions do not see each other's uncommitted/illegal states, per isolation level), Durability (committed data survives a crash). Isolation is tunable. ACID is not HTTP, bean scopes, or HashMap caching."
  },
  {
    "id": 86,
    "category": "Database",
    "question": "Which are standard SQL transaction isolation levels (from weakest to strongest)?",
    "options": [
      {
        "id": "A",
        "text": "READ UNCOMMITTED, READ COMMITTED, REPEATABLE READ, SERIALIZABLE"
      },
      {
        "id": "B",
        "text": "NONE, FULL, EXTRA"
      },
      {
        "id": "C",
        "text": "LAZY, EAGER, EXTRA"
      },
      {
        "id": "D",
        "text": "READ, WRITE, REPEAT"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "From weakest to strongest: READ UNCOMMITTED, READ COMMITTED (common default), REPEATABLE READ, SERIALIZABLE. Anomalies: dirty read, non-repeatable read, phantom. Stronger isolation reduces anomalies but can increase locks or serialization failures. Those four names are the SQL standard set."
  },
  {
    "id": 87,
    "category": "Database",
    "question": "What is a database deadlock?",
    "options": [
      {
        "id": "A",
        "text": "Two transactions each hold a lock the other needs; the DB typically aborts one (deadlock victim)"
      },
      {
        "id": "B",
        "text": "A table without an index"
      },
      {
        "id": "C",
        "text": "A committed transaction that cannot roll back"
      },
      {
        "id": "D",
        "text": "The same as a dirty read"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "Two transactions each hold a lock the other needs → wait cycle. The engine aborts a victim; the app should retry. It is not a missing index, not a dirty read, and a committed transaction is already durable. Prevent with consistent update order and short transactions."
  },
  {
    "id": 88,
    "category": "Database",
    "question": "What is an index and why add one?",
    "options": [
      {
        "id": "A",
        "text": "A separate structure (often a B-tree) that speeds lookups/sorts/joins at the cost of extra storage and slower writes"
      },
      {
        "id": "B",
        "text": "A synonym for a primary key that cannot exist on non-key columns"
      },
      {
        "id": "C",
        "text": "A guarantee that queries never need EXPLAIN"
      },
      {
        "id": "D",
        "text": "A Hibernate entity state"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "An index (usually a B-tree, sometimes hash/GIN) speeds WHERE, JOIN, and ORDER BY at the cost of extra storage and slower writes. You can index non-key columns. Too many indexes hurt INSERT/UPDATE. Always check `EXPLAIN`. An index is not a Hibernate state."
  },
  {
    "id": 89,
    "category": "Database",
    "question": "GROUP BY, HAVING, UNION, INNER vs LEFT join: which statements are correct?",
    "options": [
      {
        "id": "A",
        "text": "`GROUP BY` aggregates rows; `HAVING` filters groups (after aggregation); `WHERE` filters rows before grouping"
      },
      {
        "id": "B",
        "text": "`UNION` concatenates result sets and removes duplicates (`UNION ALL` keeps them)"
      },
      {
        "id": "C",
        "text": "INNER JOIN keeps only matching rows; LEFT JOIN keeps all left rows and NULLs on the right when missing"
      },
      {
        "id": "D",
        "text": "RIGHT JOIN is identical to INNER JOIN"
      }
    ],
    "correct": [
      "A",
      "B",
      "C"
    ],
    "requiredCount": 3,
    "explanation": "`WHERE` filters rows before grouping; `GROUP BY` aggregates; `HAVING` filters groups. `UNION` concatenates and deduplicates; `UNION ALL` keeps duplicates (faster). INNER JOIN keeps matches only; LEFT JOIN keeps all left rows (NULLs on the right). RIGHT JOIN is not INNER JOIN."
  },
  {
    "id": 90,
    "category": "Testing & Design",
    "question": "Adapter vs Proxy: what is the difference?",
    "options": [
      {
        "id": "A",
        "text": "Adapter converts one interface to another. Proxy implements the same interface to control access (lazy load, security, remote, caching)"
      },
      {
        "id": "B",
        "text": "They are the same GoF pattern"
      },
      {
        "id": "C",
        "text": "Proxy converts JSON to XML only"
      },
      {
        "id": "D",
        "text": "Adapter is only used in Hibernate"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "Adapter: convert interface A to interface B (wrap a third-party API). Proxy: same interface, extra behavior (security, lazy load, remote, transactions). Spring AOP/`@Transactional` use proxies. They are different GoF patterns. Adapter is not Hibernate-only."
  },
  {
    "id": 91,
    "category": "Testing & Design",
    "question": "Mock vs stub vs spy?",
    "options": [
      {
        "id": "A",
        "text": "Stub: canned answers. Mock: also verifies interactions. Spy: wraps a real object and can stub selected methods"
      },
      {
        "id": "B",
        "text": "They are three names for `@Entity`"
      },
      {
        "id": "C",
        "text": "A spy is only used in production monitoring, never tests"
      },
      {
        "id": "D",
        "text": "Mocks cannot be used with JUnit"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "Stub: canned return values. Mock: also verifies calls (Mockito `verify`). Spy: real object with selected methods stubbed (`spy()`). Use stubs for queries and mocks for commands you must observe. They are test doubles, not `@Entity`, and work with JUnit."
  },
  {
    "id": 92,
    "category": "Testing & Design",
    "question": "What is the TDD cycle?",
    "options": [
      {
        "id": "A",
        "text": "Red: write a failing test. Green: write the minimum code to pass. Refactor: clean up while tests stay green"
      },
      {
        "id": "B",
        "text": "Write production code first, tests only if there is time"
      },
      {
        "id": "C",
        "text": "TDD means only testing through the UI"
      },
      {
        "id": "D",
        "text": "TDD forbids refactoring"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "TDD is Red → Green → Refactor: write a failing test, write the smallest code that passes, then clean up with tests still green. It is a design loop, not 'code first, tests if time'. It does not forbid refactoring and is not UI-only testing."
  },
  {
    "id": 93,
    "category": "Testing & Design",
    "question": "How do you assert that a method throws an exception in JUnit 5?",
    "options": [
      {
        "id": "A",
        "text": "`Assertions.assertThrows(Type.class, () -> obj.method())`"
      },
      {
        "id": "B",
        "text": "`try { method(); } catch (Exception e) {}` with no assertion"
      },
      {
        "id": "C",
        "text": "`@Test(expected)` is the only JUnit 5 API"
      },
      {
        "id": "D",
        "text": "You cannot test exceptions"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "JUnit 5: `assertThrows(Type.class, () -> obj.method())` returns the exception so you can assert the message. An empty try/catch proves nothing. `@Test(expected=...)` is JUnit 4. You can and should test exceptions."
  },
  {
    "id": 94,
    "category": "Testing & Design",
    "question": "If the class under test depends on external services, what should you do?",
    "options": [
      {
        "id": "A",
        "text": "Inject fakes/stubs/mocks at the boundary so the unit test does not need the real network or database"
      },
      {
        "id": "B",
        "text": "Always call the real production service from unit tests"
      },
      {
        "id": "C",
        "text": "Make the dependency `static` so it cannot be replaced"
      },
      {
        "id": "D",
        "text": "Disable tests that touch collaborators"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "Inject test doubles at the boundary so the unit test does not hit the network or database. Keep real I/O for integration/contract tests. `static` dependencies and calling production services from unit tests make tests slow and brittle."
  },
  {
    "id": 95,
    "category": "Testing & Design",
    "question": "JUnit: `@BeforeEach`/`@Before` vs `@BeforeAll`/`@BeforeClass`?",
    "options": [
      {
        "id": "A",
        "text": "`@BeforeEach` (JUnit 5) / `@Before` (JUnit 4) runs before every test. `@BeforeAll` / `@BeforeClass` runs once per class and must be `static` (unless a test-instance lifecycle is changed)"
      },
      {
        "id": "B",
        "text": "They are identical and run only after tests"
      },
      {
        "id": "C",
        "text": "`@BeforeClass` runs for every method including `main`"
      },
      {
        "id": "D",
        "text": "`@BeforeEach` runs only once for the JVM"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "`@BeforeEach` (JUnit 5) / `@Before` (JUnit 4) runs before *every* test. `@BeforeAll` / `@BeforeClass` runs once per class and is `static` unless you change the test-instance lifecycle. Use per-test setup when tests mutate state; use once-per-class for expensive immutable fixtures."
  },
  {
    "id": 96,
    "category": "Testing & Design",
    "question": "Describe OOP in one exam-ready set of pillars.",
    "options": [
      {
        "id": "A",
        "text": "Encapsulation, inheritance, polymorphism, and abstraction — objects combine state and behavior"
      },
      {
        "id": "B",
        "text": "Only inheritance matters"
      },
      {
        "id": "C",
        "text": "OOP means never using interfaces"
      },
      {
        "id": "D",
        "text": "OOP is a database normal form"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "OOP pillars: encapsulation, inheritance, polymorphism, abstraction. Objects combine state and behavior. Interfaces matter (polymorphism). Inheritance is only one pillar. OOP is not a normal form and is not 'never use interfaces'."
  },
  {
    "id": 97,
    "category": "Testing & Design",
    "question": "What is SDLC?",
    "options": [
      {
        "id": "A",
        "text": "Software Development Life Cycle: phases such as requirements, design, implementation, test, deploy, maintain (waterfall, iterative, or agile variants)"
      },
      {
        "id": "B",
        "text": "A Spring Data annotation"
      },
      {
        "id": "C",
        "text": "A JVM garbage collector"
      },
      {
        "id": "D",
        "text": "A REST status code"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "SDLC is the software life cycle: requirements, design, build, test, deploy, maintain. Waterfall, iterative, and Agile are process shapes *of* that cycle, not replacements. Scrum ceremonies sit inside it. It is not a Spring annotation, GC, or HTTP code."
  },
  {
    "id": 98,
    "category": "Architecture",
    "question": "What is back-pressure in reactive systems?",
    "options": [
      {
        "id": "A",
        "text": "A downstream consumer signals it cannot keep up so the producer slows, buffers boundedly, or drops according to a strategy — instead of crashing or unbounded queues"
      },
      {
        "id": "B",
        "text": "A SQL isolation level"
      },
      {
        "id": "C",
        "text": "A type of Java reference"
      },
      {
        "id": "D",
        "text": "Increasing thread-pool size without limit"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "Back-pressure: a slow consumer signals `request(n)` (Reactive Streams) so the producer slows, uses a *bounded* buffer, or drops by policy. Unbounded queues and unbounded thread pools hide overload until collapse. It is not SQL isolation or a Java reference type."
  },
  {
    "id": 99,
    "category": "Architecture",
    "question": "Which are typical goals of a microservice architecture?",
    "options": [
      {
        "id": "A",
        "text": "Independent deployability, better resilience/isolation, and team autonomy — not automatically lower cost in every case"
      },
      {
        "id": "B",
        "text": "A single shared database as the only communication channel"
      },
      {
        "id": "C",
        "text": "One giant WAR with all modules forever"
      },
      {
        "id": "D",
        "text": "Removing the need for observability"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "Microservices aim for independent deployability, failure isolation, and team autonomy. They can improve speed and visibility but add distributed complexity and do not automatically cut cost. A shared database as the only bus, one giant WAR, and no observability work against those goals."
  },
  {
    "id": 100,
    "category": "Architecture",
    "question": "How do you scale a web app and a database?",
    "options": [
      {
        "id": "A",
        "text": "Web: horizontal scale behind a load balancer (stateless app). DB: vertical scale, read replicas, sharding, caching — harder than scaling stateless compute"
      },
      {
        "id": "B",
        "text": "Add `Thread.sleep` in controllers"
      },
      {
        "id": "C",
        "text": "Store sessions only in memory on one node and never replicate"
      },
      {
        "id": "D",
        "text": "Databases cannot be scaled at all"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "Scale web tiers horizontally behind a load balancer and keep apps stateless (externalize sessions). Databases scale with vertical size, replicas, caching, then sharding. `Thread.sleep` and in-memory sessions on one node do not scale. Databases *can* scale, but it is harder than scaling compute."
  },
  {
    "id": 101,
    "category": "Architecture",
    "question": "If database queries are slow, what is a sound first approach?",
    "options": [
      {
        "id": "A",
        "text": "Measure: EXPLAIN the plan, add/fix indexes, avoid N+1, reduce data scanned, then cache or reshape the model"
      },
      {
        "id": "B",
        "text": "Immediately shard into 64 databases"
      },
      {
        "id": "C",
        "text": "Disable the transaction log"
      },
      {
        "id": "D",
        "text": "Replace SQL with `Thread.sleep(0)`"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "First measure: `EXPLAIN`, missing/wrong indexes, N+1/ORM chatter, then cache or reshape. Sharding and turning off the WAL are last resorts. Most slow queries are access-path problems, not cluster-size problems."
  },
  {
    "id": 102,
    "category": "Architecture",
    "question": "How do you run an app across several servers?",
    "options": [
      {
        "id": "A",
        "text": "Package a stateless service, put a load balancer in front, share nothing on local disk, and use centralized config, logs, and session/cache stores"
      },
      {
        "id": "B",
        "text": "Copy a folder manually onto one machine only"
      },
      {
        "id": "C",
        "text": "Use `System.exit` as a health check"
      },
      {
        "id": "D",
        "text": "Pin all traffic to a single JVM forever"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "Run multiple stateless instances behind a load balancer, with shared config, logs, and session/cache stores. Use health checks and rolling deploys. Avoid sticky sessions unless you must. Copying one folder to one machine is not horizontal scale."
  },
  {
    "id": 103,
    "category": "Architecture",
    "question": "Maven dependency scopes: compile, test, provided, runtime — which mapping is correct?",
    "options": [
      {
        "id": "A",
        "text": "`compile` (default): everywhere. `test`: tests only. `provided`: compile/test, not packaged (e.g. servlet API). `runtime`: not needed to compile, needed to run"
      },
      {
        "id": "B",
        "text": "All scopes are identical"
      },
      {
        "id": "C",
        "text": "`provided` means the dependency is copied twice"
      },
      {
        "id": "D",
        "text": "`test` scope is included in the production WAR"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "`compile` (default): compile + test + runtime. `test`: test classpath only. `provided`: compile/test, supplied at runtime (servlet API). `runtime`: not needed to compile, needed to run (JDBC driver). `test` is not packaged into the WAR. Scopes are not identical."
  },
  {
    "id": 104,
    "category": "Architecture",
    "question": "Direct vs transitive Maven dependency?",
    "options": [
      {
        "id": "A",
        "text": "Direct: you declare it in `pom.xml`. Transitive: pulled in by those direct libraries"
      },
      {
        "id": "B",
        "text": "Transitive means optional JDK modules only"
      },
      {
        "id": "C",
        "text": "Direct dependencies cannot have versions"
      },
      {
        "id": "D",
        "text": "Transitive dependencies never cause classpath issues"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "Direct dependencies are what you write in the `pom.xml`. Transitive ones are pulled in by those libraries. Conflicts follow Maven mediation (nearest-wins). Use `mvn dependency:tree`. Transitives *do* cause classpath issues; they are not 'JDK modules only'."
  },
  {
    "id": 105,
    "category": "Architecture",
    "question": "How do you trace a request across microservices?",
    "options": [
      {
        "id": "A",
        "text": "Propagate a correlation / trace id (OpenTelemetry, Sleuth/Micrometer Tracing, Zipkin/Jaeger) through HTTP headers and logs"
      },
      {
        "id": "B",
        "text": "Only use `System.out.println` without ids"
      },
      {
        "id": "C",
        "text": "Put the whole user payload in every URL"
      },
      {
        "id": "D",
        "text": "Tracing is impossible once you have more than one service"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "Propagate a trace/correlation id (W3C traceparent, OpenTelemetry, Micrometer Tracing, Zipkin/Jaeger) through HTTP headers and logs so one user action is visible across services. Bare `System.out` without ids cannot join the timeline. Tracing is how you debug >1 service."
  },
  {
    "id": 106,
    "category": "Architecture",
    "question": "What happens in a Daily Stand-up, and which are Scrum's main ceremonies?",
    "options": [
      {
        "id": "A",
        "text": "Stand-up: what I did, what I'll do, blockers (short). Scrum: Sprint Planning, Daily Scrum, Review, Retrospective (plus backlog refinement)"
      },
      {
        "id": "B",
        "text": "Stand-up is a 3-hour status meeting for managers only"
      },
      {
        "id": "C",
        "text": "Scrum has no retrospective"
      },
      {
        "id": "D",
        "text": "Ceremonies replace the need for a working increment"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "Daily Scrum: what I did, what I'll do, blockers — short, for the team, about flow. Scrum events: Sprint Planning, Daily Scrum, Sprint Review, Sprint Retrospective, plus backlog refinement. The retro is required. Ceremonies do not replace a working increment. It is not a 3-hour manager meeting."
  },
  {
    "id": 107,
    "category": "Modern Java",
    "question": "What is a Java `record`?",
    "options": [
      {
        "id": "A",
        "text": "A concise immutable data carrier: final fields, canonical constructor, accessors, `equals`/`hashCode`/`toString` generated"
      },
      {
        "id": "B",
        "text": "A mutable JavaBean with setters for every field"
      },
      {
        "id": "C",
        "text": "A replacement for `enum`"
      },
      {
        "id": "D",
        "text": "A Spring scope"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "A `record` (Java 16) is a shallowly immutable data carrier: final components, canonical constructor, accessors, and value-based `equals`/`hashCode`/`toString`. Compact constructors can validate. Records cannot extend another class (they already extend `Record`) but can implement interfaces. They are not JavaBeans with setters and not enums."
  },
  {
    "id": 108,
    "category": "Modern Java",
    "question": "What are sealed classes?",
    "options": [
      {
        "id": "A",
        "text": "A type that permits only a known set of subtypes (`permits`), enabling exhaustive `switch` over the hierarchy"
      },
      {
        "id": "B",
        "text": "Classes that cannot be loaded by a classloader"
      },
      {
        "id": "C",
        "text": "A synonym of `final` with no extra semantics"
      },
      {
        "id": "D",
        "text": "A Hibernate proxy type"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "A sealed class/interface (`sealed ... permits A, B`) allows only those subtypes, so `switch` can be exhaustive. Subtypes are `final`, `sealed`, or `non-sealed`. It is stronger than a comment and not a synonym of `final` alone. Unrelated to Hibernate proxies and classloaders."
  },
  {
    "id": 109,
    "category": "Modern Java",
    "question": "What is pattern matching for `instanceof` / `switch`?",
    "options": [
      {
        "id": "A",
        "text": "The compiler binds a typed pattern variable after a successful test, avoiding an explicit cast; `switch` can match types and null"
      },
      {
        "id": "B",
        "text": "A regex-only feature unrelated to types"
      },
      {
        "id": "C",
        "text": "It disables type erasure"
      },
      {
        "id": "D",
        "text": "It only works on primitives in Java 8"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "Pattern matching binds a typed variable after a successful test: `if (o instanceof String s) { ... s ... }` — no extra cast. `switch` can match types and `null` (Java 21). It is not regex, does not disable erasure, and is not a Java 8 primitive-only feature."
  },
  {
    "id": 110,
    "category": "Modern Java",
    "question": "What are virtual threads (Project Loom)?",
    "options": [
      {
        "id": "A",
        "text": "Lightweight JVM-scheduled threads that let you write blocking-style I/O code with high concurrency; they map onto a pool of carrier OS threads"
      },
      {
        "id": "B",
        "text": "A new kind of daemon OS process"
      },
      {
        "id": "C",
        "text": "Threads that cannot block on I/O"
      },
      {
        "id": "D",
        "text": "A replacement for the heap"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "Virtual threads (Java 21 / Loom) are lightweight JVM-scheduled threads that unmount from a carrier OS thread when they block on most I/O, so you can write simple blocking code at high concurrency. Create with `Thread.ofVirtual()` or `newVirtualThreadPerTaskExecutor()`. They *can* block on I/O; watch pinning (`synchronized`) and expensive thread-locals. They do not replace the heap."
  },
  {
    "id": 111,
    "category": "Modern Java",
    "question": "What is a sound way to use `Optional`?",
    "options": [
      {
        "id": "A",
        "text": "Return type for 'value may be absent'; use `map`/`flatMap`/`orElse`/`orElseThrow`. Do not use `Optional` as a field, bean property, or method parameter style in most APIs"
      },
      {
        "id": "B",
        "text": "Call `get()` without checking, always"
      },
      {
        "id": "C",
        "text": "Wrap every list element in `Optional` inside a stream"
      },
      {
        "id": "D",
        "text": "Use `Optional` instead of `null` in a `HashMap` key"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "`Optional` signals an absent return value. Chain `map`/`flatMap`/`filter`, and finish with `orElse`, `orElseGet` (lazy), or `orElseThrow`. Do not call `get()` blindly. Avoid `Optional` as a field, parameter, or map key in typical APIs. Do not wrap every stream element."
  },
  {
    "id": 112,
    "category": "Modern Java",
    "question": "Which `List` / `Map` / `Set` factories create unmodifiable copies (Java 9+ / 10+)?",
    "options": [
      {
        "id": "A",
        "text": "`List.of`, `Set.of`, `Map.of`, and `List.copyOf` / `Set.copyOf` / `Map.copyOf`"
      },
      {
        "id": "B",
        "text": "`new ArrayList<>()`"
      },
      {
        "id": "C",
        "text": "`Collections.shuffle`"
      },
      {
        "id": "D",
        "text": "`Arrays.asList` which allows `add`"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "`List.of`/`Set.of`/`Map.of` (Java 9) and `copyOf` (Java 10) create unmodifiable collections and reject `null`. `new ArrayList<>()` is mutable. `Arrays.asList` is fixed-size (`add` throws) but `set` is allowed. `shuffle` is unrelated."
  },
  {
    "id": 113,
    "category": "Modern Java",
    "question": "What does `var` do (Java 10 local-variable type inference)?",
    "options": [
      {
        "id": "A",
        "text": "The compiler infers the type of a *local* variable from the initializer; it is still statically typed"
      },
      {
        "id": "B",
        "text": "`var` makes the variable dynamically typed like JavaScript"
      },
      {
        "id": "C",
        "text": "`var` can declare method parameters in all Java versions"
      },
      {
        "id": "D",
        "text": "`var` is a synonym of `Object`"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "`var` infers a *local* variable's type from the initializer; the type is still static and checked at compile time. It is not JavaScript `var`, not `Object`, and (except lambdas/Java 11+) not a general method-parameter keyword. Use it when the right-hand side makes the type obvious."
  },
  {
    "id": 114,
    "category": "Modern Java",
    "question": "What is the difference between `==` and `equals` for objects?",
    "options": [
      {
        "id": "A",
        "text": "`==` compares references (identity); `equals` compares logical equality if overridden (as in `String`)"
      },
      {
        "id": "B",
        "text": "They are always identical for objects"
      },
      {
        "id": "C",
        "text": "`==` calls `equals` internally for all objects"
      },
      {
        "id": "D",
        "text": "`equals` cannot be overridden"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "For objects, `==` is identity (same reference); `equals` is logical equality when overridden (`String`, wrappers). For primitives, `==` compares values. Interning can make `==` *appear* to work on strings — exams still want `equals`. `==` does not call `equals` for objects."
  },
  {
    "id": 115,
    "category": "Modern Java",
    "question": "What is the purpose of `equals` and `hashCode` together in hash-based collections?",
    "options": [
      {
        "id": "A",
        "text": "The map/set first uses `hashCode` to find a bucket, then `equals` to find the exact key. Both must stay consistent while the object is in the collection"
      },
      {
        "id": "B",
        "text": "`hashCode` is ignored by `HashMap`"
      },
      {
        "id": "C",
        "text": "Only `toString` is used for lookups"
      },
      {
        "id": "D",
        "text": "You should mutate key fields after inserting into a `HashMap`"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "`HashMap`/`HashSet` use `hashCode` to pick a bucket, then `equals` to find the key. Both must stay consistent while the object is in the collection. Mutating key fields after insert loses the entry. `hashCode` is not ignored; `toString` is not used for lookup."
  },
  {
    "id": 116,
    "category": "Concurrency",
    "question": "Which tools help you write thread-safe code?",
    "options": [
      {
        "id": "A",
        "text": "Immutability, confinement, `synchronized`/`Lock`, concurrent collections, and `java.util.concurrent.atomic`"
      },
      {
        "id": "B",
        "text": "Calling `Thread.stop()`"
      },
      {
        "id": "C",
        "text": "Making every field `public`"
      },
      {
        "id": "D",
        "text": "Using `HashMap` from many threads without extra care"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "Thread-safe designs: immutability, thread confinement, `synchronized`/`Lock`, concurrent collections, and atomics. `Thread.stop` is unsafe. `public` fields invite races. A plain `HashMap` used from many threads can lose data (historically even livelock on resize)."
  },
  {
    "id": 117,
    "category": "Core Java",
    "question": "What does `try-with-resources` require and why use it?",
    "options": [
      {
        "id": "A",
        "text": "Resources implementing `AutoCloseable` are closed automatically; it is the correct way to close files/streams/sockets"
      },
      {
        "id": "B",
        "text": "It replaces `catch` entirely"
      },
      {
        "id": "C",
        "text": "It only works with `String`"
      },
      {
        "id": "D",
        "text": "It runs `finalize()` on the resource"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "try-with-resources closes `AutoCloseable`/`Closeable` resources in reverse order, even on exception. Suppressed exceptions are attached via `getSuppressed()`. Prefer it over `finally { close() }`. It does not replace `catch`, does not call `finalize()`, and works for files, streams, sockets — not only `String`."
  },
  {
    "id": 118,
    "category": "Collections",
    "question": "What is `EnumSet`?",
    "options": [
      {
        "id": "A",
        "text": "A specialized, very fast `Set` for a single enum type; prefer it over `HashSet` for enums"
      },
      {
        "id": "B",
        "text": "A synchronized `TreeSet`"
      },
      {
        "id": "C",
        "text": "A list of primitive ints"
      },
      {
        "id": "D",
        "text": "The superclass of `HashMap`"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "`EnumSet` is a bit-vector `Set` specialized for one enum type: very fast and compact. Prefer it over `HashSet<Enum>`. All elements must be the same enum. It is not a `TreeSet`, not `int[]`, and not a `HashMap` superclass. Nulls are forbidden."
  },
  {
    "id": 119,
    "category": "JVM & GC",
    "question": "What is the difference between a weak reference and a strong reference?",
    "options": [
      {
        "id": "A",
        "text": "A strong reference keeps the object alive; a weak reference does not — the object can be collected while weakly reachable"
      },
      {
        "id": "B",
        "text": "Weak references are stronger than soft references"
      },
      {
        "id": "C",
        "text": "Strong references are used only by the GC thread"
      },
      {
        "id": "D",
        "text": "Weak references pin objects in Metaspace forever"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "A strong reference (normal field/local) keeps the object alive. A weak reference does not: once only weakly reachable, the GC may reclaim it. Soft refs last longer under memory pressure (caches); weak refs are for `WeakHashMap`/canonical maps; phantom refs for cleanup. Weak is weaker than soft."
  },
  {
    "id": 120,
    "category": "REST & Web",
    "question": "Which HTTP methods are both safe *and* idempotent?",
    "options": [
      {
        "id": "A",
        "text": "GET and HEAD (also OPTIONS). PUT and DELETE are idempotent but not safe"
      },
      {
        "id": "B",
        "text": "POST"
      },
      {
        "id": "C",
        "text": "PATCH is always safe"
      },
      {
        "id": "D",
        "text": "CONNECT"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "Safe *and* idempotent: GET, HEAD, OPTIONS (and TRACE). PUT and DELETE are idempotent but **not** safe — they change state, though repeating them should not change the outcome further. POST is neither. PATCH is not required to be idempotent."
  },
  {
    "id": 121,
    "category": "Spring & Hibernate",
    "question": "Which isolation-related caveat applies to `@Transactional` services?",
    "options": [
      {
        "id": "A",
        "text": "The isolation level and rollback rules come from the transaction manager; default rollback is on unchecked exceptions, not checked ones, unless configured"
      },
      {
        "id": "B",
        "text": "`@Transactional` always uses SERIALIZABLE"
      },
      {
        "id": "C",
        "text": "It disables the database"
      },
      {
        "id": "D",
        "text": "It only works with MongoDB"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "Spring rolls back on unchecked exceptions by default, not on checked ones unless you set `rollbackFor`. Isolation comes from the transaction manager/database (often READ COMMITTED), not automatically SERIALIZABLE. `@Transactional` is not Mongo-only and does not disable the database."
  },
  {
    "id": 122,
    "category": "Testing & Design",
    "question": "SOLID — which statement matches ISP (Interface Segregation)?",
    "options": [
      {
        "id": "A",
        "text": "Clients should not be forced to depend on methods they do not use; prefer small, focused interfaces"
      },
      {
        "id": "B",
        "text": "Every class must have only static methods"
      },
      {
        "id": "C",
        "text": "You must use inheritance instead of composition"
      },
      {
        "id": "D",
        "text": "One giant interface is better than many small ones"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "ISP: many small interfaces beat one fat interface — clients should not depend on methods they do not use. SOLID: SRP, OCP, LSP, ISP, DIP. ISP is not 'static-only classes' and not 'prefer inheritance'."
  },
  {
    "id": 123,
    "category": "Core Java",
    "question": "Which `equals`/`hashCode` collision statement is true?",
    "options": [
      {
        "id": "A",
        "text": "Different objects may share a hash code (collision); then `equals` distinguishes them. Equal objects must share a hash code"
      },
      {
        "id": "B",
        "text": "Collisions are impossible if you override `equals`"
      },
      {
        "id": "C",
        "text": "A collision always throws `ClassCastException`"
      },
      {
        "id": "D",
        "text": "`HashMap` forbids collisions by rejecting the insert"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "Collisions are normal: different objects may share a hash. `equals` then tells them apart. Equal objects **must** share a hash. `HashMap` does not reject collisions; it chains or treeifies the bin (Java 8+). A collision is not a `ClassCastException`."
  },
  {
    "id": 124,
    "category": "Collections",
    "question": "How do you shuffle a list correctly?",
    "options": [
      {
        "id": "A",
        "text": "`Collections.shuffle(list);` — in place, using the default RNG (or pass a `Random`)"
      },
      {
        "id": "B",
        "text": "`list = Collections.shuffle(list);`"
      },
      {
        "id": "C",
        "text": "`list.shuffle() = true;`"
      },
      {
        "id": "D",
        "text": "`Arrays.sort(list)` randomizes order"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "Call `Collections.shuffle(list)` (optionally with a `Random`). It mutates the list and returns `void`, so do not assign the result. `Arrays.sort` orders; it does not randomize. There is no `list.shuffle() = true`."
  },
  {
    "id": 125,
    "category": "Architecture",
    "question": "What is a typical way to keep microservices observable?",
    "options": [
      {
        "id": "A",
        "text": "Centralized logs, metrics, distributed tracing, and health/readiness probes"
      },
      {
        "id": "B",
        "text": "Hiding all errors from operators"
      },
      {
        "id": "C",
        "text": "One shared memory heap across services"
      },
      {
        "id": "D",
        "text": "Disabling HTTP status codes"
      }
    ],
    "correct": [
      "A"
    ],
    "requiredCount": 1,
    "explanation": "Observability is logs + metrics + traces, plus liveness/readiness probes. That is how you get the 'visibility' microservice goal. Hiding errors, sharing one heap across services, or dropping HTTP status codes works against operations."
  }
];
