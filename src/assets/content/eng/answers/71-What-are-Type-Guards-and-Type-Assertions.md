<p>
  In TypeScript, we work with the dynamic nature of JavaScript, trying to overlay it with strict types.
  <br>
  <span class="accent">Type Narrowing</span> is a process where TypeScript analyzes the control flow of the code and automatically refines the type of a variable to a more specific one within a certain block (for example, inside an <code>if</code> statement).
</p>

<p>This process relies on two main mechanisms: <span class="accent">Type Guards</span> (safe runtime checks) and <span class="accent">Type Assertions</span> (instructions to the compiler at development time).</p>

<h3>1. Type Guards</h3>

<p><span class="accent">Type Guards</span> are expressions that perform a real check during code execution (runtime). TypeScript understands these checks and narrows the type inside the corresponding conditional block.</p>

<h4>1.1 typeof</h4>

<p><code>typeof</code>: Used to check built-in types (<code>string</code>, <code>number</code>, <code>boolean</code>, <code>symbol</code>, <code>bigint</code>, <code>function</code>, <code>object</code>).</p>

<code class="code">
  function process(value: string | number) {
    if (typeof value === "string") {
      value.toUpperCase(); // TS knows exactly that this is a string
    } else {
      value.toFixed(); // TS knows that this is a number
    }
  }
</code>

<h4>1.2 instanceof</h4>

<p><code>instanceof</code>: Checks the prototype chain. Ideal for classes (e.g., built-in errors or custom models).</p>

<code class="code">
  function handleDate(value: Date | string) {
    if (value instanceof Date) {
      value.getTime(); // TS: this is a Date object
    }
  }
</code>

<h4>1.3 in</h4>

<p><code>in</code>: Checks for the existence of a property in an object. Great for distinguishing interfaces (discriminated unions) when working with APIs.</p>

<code class="code">
  interface CorrectResponse {
    data: string;
  }

  interface ErrorResponse {
    error: string;
  }

   function handleApiResponse(response: CorrectResponse | ErrorResponse) {
    if ("data" in response) {
      console.log(response.data); // TS: this is an object with data
    } else {
      console.log(response.error); // TS: this is an object with an error
    }
  }
</code>

<h4>1.4 Equality Narrowing</h4>

<p><strong>Equality Narrowing</strong>: Using <code>===</code>, <code>!==</code>, <code>==</code>, <code>!=</code> to filter out <code>null</code> / <code>undefined</code> or literal types.</p>

<code class="code">
  function check(val: string | null) {
    if (val !== null) {
      val.trim(); // TS: val is a string
    }
  }
</code>

<h4>1.5 Custom Type Guards</h4>

<p><strong>Custom Type Guards</strong>: When basic checks are not enough, you can write your own predicate function. This is a function that uses the special <code>is</code> syntax and returns a <code>boolean</code>, but its return type is written as <code>parameterName is Type</code>.</p>

<code class="code">
  interface Cat { meow(): void; }
  interface Dog { bark(): void; }

  // The return type `animal is Cat` is the magic of a custom guard
  function isCat(animal: Cat | Dog): animal is Cat {
    return (animal as Cat).meow !== undefined;
  }

  function makeSound(pet: Cat | Dog) {
    if (isCat(pet)) {
      pet.meow(); // TS knows that this is a Cat
    } else {
      pet.bark(); // TS knows that this is a Dog
    }
  }
</code>

<h3>2. Type Assertions</h3>

<p><span class="accent">Type Assertions</span> are a way to tell the compiler: "I know more about this type than you do, just trust me."</p>
<p>Type assertions do not perform any checks at runtime. They simply tell the compiler that you are confident about the type of a variable. This can be useful when you know that an API returns a specific type, but TypeScript cannot infer it.</p>

<p class="info info--orange">Important: Type assertions are removed during compilation and do not affect the code at runtime in any way. If you make a mistake, the application will crash with a runtime error.</p>

<h4>2.1 as Type Syntax (Recommended)</h4>

<p>Allows you to strictly cast one type to another. Often used when parsing <code>JSON</code> or working with DOM elements.</p>

<code class="code">
  // TS sees the return type as 'any'
  const data = JSON.parse('{"name": "John"}');

  // Asserting that this is a specific interface
  const user = data as User;
</code>

<h4>2.2 <code>&lt;Type&gt;</code> Syntax (Outdated)</h4>

<p>This is an alternative syntax for type assertions, but it can conflict with JSX in React, so it is recommended to use <code>as</code>.</p>

<code class="code">
  const user = &lt;User>data;
</code>

<h4>2.3 Non-null Assertion Operator (!)</h4>

<p>
  If you are sure that a variable will not be <code>null</code> or <code>undefined</code>, you can use the <code>!</code> operator. This tells the compiler that it can safely remove these types (<code>null</code> or <code>undefined</code>) from the union.
  <br>
  It must be used with extreme caution, as it is a common cause of runtime crashes.
</p>

<code class="code">
  const element = document.getElementById('app'); // Type: HTMLElement | null
  element!.innerHTML = 'Hello'; // We guarantee that the element exists
</code>

<h4>2.4 Const Assertions (as const)</h4>

<p>
  If you want literal types to be as narrow as possible, you can use <code>as const</code>. This turns <strong>all object properties into <code>readonly</code></strong>. Object properties become immutable at the type system level.
  <br>
  <code>as const</code> does something like <code>Object.freeze()</code> for types, ensuring that you cannot accidentally change these values in code. Of course, this does not make the object immutable at runtime, but at the type level it makes it something similar to <code>Object.freeze()</code> (but <code>Object.freeze()</code> will be available in runtime, and <code>as const</code> — only at the TypeScript level and will be discarded during transpilation).
  <br>
  This is useful for creating constant configurations or for working with APIs that require exact literal types.
</p>

<code class="code">
  const config = {
    mode: "dark",
    version: 1,
  } as const;

  // The type of config is now:
  // {
  //   readonly mode: "dark";
  //   readonly version: 1;
  // }

  // config.mode = "light"; // Compilation error: cannot change a readonly property
</code>
