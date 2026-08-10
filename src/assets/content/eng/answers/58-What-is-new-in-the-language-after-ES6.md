<h3>Why there was no second revolution after ES6</h3>
<p>After ES6 the TC39 committee switched to a <span class="accent">yearly release cycle</span>: once a year a new version of the standard ships with whatever managed to mature. So the language grows in small steps — ES2016 had only two features.</p>

<p class="info"><strong>Main idea:</strong> ES6 closed the holes in the language, everything after that polishes everyday code. In an interview they expect not a list by year, but an understanding of which pain each feature removed.</p>

<h3>Asynchrony was finished properly</h3>
<p><code>async/await</code> (ES2017) — the code looks synchronous but works on top of promises. Then came <code>Promise.finally</code> and <code>for await...of</code> (ES2018), <code>Promise.allSettled</code> (ES2020), <code>Promise.any</code> (ES2021) and <code>await</code> at the top level of a module (ES2022).</p>

<h3>Safe access to data</h3>
<code class="code">
  const city = user?.address?.city ?? 'not specified';  // ?. and ?? (ES2020)
  settings.theme ??= 'dark';                            // logical assignment (ES2021)
</code>
<p>The <code>?.</code> operator breaks the chain on <code>null</code> or <code>undefined</code> and returns <code>undefined</code> instead of an error. And <code>??</code> substitutes a fallback value only for <code>null</code> and <code>undefined</code> — unlike <code>||</code>, which swallows valid <code>0</code> and an empty string.</p>

<h3>Classes matured</h3>
<p>ES2022 added what classes did not have in ES6: fields right in the class body, real privacy via <code>#</code> and static initialization blocks.</p>
<code class="code">
  class Counter {
    #count = 0;              // private field, unreachable from outside
    inc() { this.#count++; }
  }
</code>

<h3>New object and array methods</h3>
<ul>
  <li><code>Object.values</code> and <code>Object.entries</code> (ES2017), and their inverse <code>Object.fromEntries</code> (ES2019).</li>
  <li>Spread and rest for objects <code>{ ...obj }</code> (ES2018) — the thing often mistakenly credited to ES6.</li>
  <li><code>flat</code>, <code>flatMap</code>, <code>trimStart</code>, <code>trimEnd</code> (ES2019), <code>replaceAll</code> (ES2021).</li>
  <li><code>at(-1)</code> — access from the end (ES2022), <code>findLast</code> (ES2023).</li>
  <li><code>toSorted</code>, <code>toReversed</code>, <code>with</code> (ES2023) — return a copy instead of mutating the array.</li>
</ul>

<p class="info info--blue">If the year slips your mind, answer by problems rather than by dates: asynchrony (<code>async/await</code>, <code>allSettled</code>), safe access (<code>?.</code>, <code>??</code>), privacy in classes (<code>#</code>), immutable methods (<code>toSorted</code>). They test command of the language, not the calendar.</p>

<p class="info info--orange">A common confusion: <code>??</code> cannot be written next to <code>||</code> or <code>&amp;&amp;</code> without parentheses — that is a SyntaxError. And <code>?.</code> does not save you from a typo in a property name: <code>user?.adress?.city</code> silently returns <code>undefined</code> instead of an error.</p>

<p class="deep-dive">Deep Dive</p>

<h3>How a feature gets into the language: the TC39 process</h3>
<p>Every proposal goes through five stages: <strong>Stage 0</strong> — an idea, <strong>Stage 1</strong> — accepted for consideration, <strong>Stage 2</strong> — a draft specification, <strong>Stage 3</strong> — a candidate, engines start implementing, <strong>Stage 4</strong> — accepted and will land in the nearest release. The specification is frozen in March every year, the release ships in June.</p>
<p>The practical takeaway: browsers and TypeScript usually support a feature already at Stage 3, long before its official year. Hence the confusion with dates — developers remember the year they started using it, not the year of the standard.</p>

<h3>Cheat sheet by year</h3>
<ul>
  <li><strong>ES2016</strong>: the exponentiation operator <code>**</code>, <code>Array.prototype.includes</code>.</li>
  <li><strong>ES2017</strong>: <code>async/await</code>, <code>Object.values</code>, <code>Object.entries</code>, <code>padStart</code>, <code>padEnd</code>, <code>Object.getOwnPropertyDescriptors</code>, <code>SharedArrayBuffer</code>, <code>Atomics</code>.</li>
  <li><strong>ES2018</strong>: rest and spread for objects, <code>for await...of</code> and async iterators, <code>Promise.finally</code>, named groups and lookbehind in regular expressions.</li>
  <li><strong>ES2019</strong>: <code>flat</code>, <code>flatMap</code>, <code>Object.fromEntries</code>, <code>trimStart</code>, <code>trimEnd</code>, optional catch binding, stable <code>Array.prototype.sort</code>.</li>
  <li><strong>ES2020</strong>: <code>?.</code>, <code>??</code>, <code>BigInt</code>, <code>Promise.allSettled</code>, dynamic <code>import()</code>, <code>globalThis</code>, <code>String.matchAll</code>.</li>
  <li><strong>ES2021</strong>: <code>replaceAll</code>, <code>Promise.any</code>, logical assignments <code>??=</code>, <code>||=</code>, <code>&amp;&amp;=</code>, numeric separators <code>1_000_000</code>, <code>WeakRef</code>.</li>
  <li><strong>ES2022</strong>: class fields and private <code>#</code> members, static blocks, top-level await, <code>at()</code>, <code>Object.hasOwn</code>, <code>error.cause</code>.</li>
  <li><strong>ES2023</strong>: <code>findLast</code>, <code>findLastIndex</code>, <code>toSorted</code>, <code>toReversed</code>, <code>toSpliced</code>, <code>with</code>, hashbang.</li>
  <li><strong>ES2024</strong>: <code>Object.groupBy</code>, <code>Map.groupBy</code>, <code>Promise.withResolvers</code>, <code>Array.fromAsync</code>, <code>String.isWellFormed</code>.</li>
  <li><strong>ES2025</strong>: set methods (<code>union</code>, <code>intersection</code>, <code>difference</code>), iterator helpers (<code>map</code>, <code>filter</code>, <code>take</code> for any iterator), <code>RegExp.escape</code>, <code>Promise.try</code>, JSON module imports.</li>
</ul>

<h3>Optional chaining: the fine print</h3>
<p><code>?.</code> has three forms: <code>obj?.prop</code>, <code>obj?.[key]</code> for a dynamic key and <code>fn?.()</code> for calling a function that may not exist. <span class="accent">Short-circuiting</span> applies: if the left-hand side is <code>null</code> or <code>undefined</code>, the whole rest of the chain is simply not evaluated — including the call arguments.</p>
<p>You cannot write <code>?.</code> on the left of an assignment: <code>obj?.a = 1</code> is a syntax error. And on its own it is not a replacement for checks: if the variable is not declared at all, you get a <code>ReferenceError</code> — the operator protects only against an "empty" value, not against a missing variable.</p>

<h3>Private fields: why this is not a convention</h3>
<p>An underscore <code>_private</code> was an agreement between people, while <code>#count</code> is an engine mechanism. A private field is not visible in <code>Object.keys</code>, nor in <code>JSON.stringify</code>, nor through <code>Proxy</code>, nor through <code>Reflect.ownKeys</code>. Accessing it from outside the class is a syntax error at parse time, not a runtime error.</p>
<p>Hence the brand check idiom: the expression <code>#count in obj</code> tells you whether the object was created by this class. Previously such a check required keeping a separate <code>WeakMap</code>.</p>

<h3>Top-level await and module loading order</h3>
<p><code>await</code> at the top level works only in ES modules, because a module can behave like an async function. The price is blocking: while the module waits, every module importing it waits too. That is why a long network request at the top level easily turns into a startup delay for the whole application.</p>

<h3>Immutable array methods</h3>
<p>The pairs <code>sort</code>/<code>toSorted</code>, <code>reverse</code>/<code>toReversed</code>, <code>splice</code>/<code>toSpliced</code> differ in one thing: the old ones mutate the original array and return a reference to it, the new ones return a new copy. This is a direct answer to the pain of frameworks with immutable state, where <code>state.items.sort()</code> quietly broke reference comparison and change tracking.</p>
<code class="code">
  const sorted = items.toSorted((a, b) =&gt; a.age - b.age); // items is untouched
  const patched = items.with(0, newItem);                  // a copy with a replacement by index
</code>

<h3>What else is worth knowing</h3>
<ul>
  <li><code>BigInt</code> — integers of arbitrary length, the literal <code>10n</code>. Mixing them with regular numbers in arithmetic is not allowed, you get a <code>TypeError</code>.</li>
  <li><code>globalThis</code> — a single reference to the global object in the browser, Node.js and workers instead of <code>window</code>/<code>global</code>/<code>self</code>.</li>
  <li>Dynamic <code>import()</code> returns a promise and works anywhere in the code — lazy loading of chunks and routes relies on it.</li>
  <li><code>Promise.withResolvers</code> hands you a promise together with its <code>resolve</code> and <code>reject</code> — the pattern of assigning functions to outer variables disappears.</li>
  <li><code>Object.groupBy(items, fn)</code> returns a prototype-less object whose keys are the function's results. The equivalent of lodash's <code>groupBy</code>, only built in.</li>
</ul>

<h3>Is Babel still needed</h3>
<p>For modern browsers syntax transpilation is almost unnecessary — all current engines understand recent years of the standard. Two real jobs remain: supporting old environments via <code>browserslist</code>, and Stage 2–3 proposals that are not in the standard yet (decorators, for example). Polyfills are a separate story: new methods like <code>toSorted</code> or <code>Object.groupBy</code> are added to the runtime via core-js, whereas new syntax cannot be added by a polyfill at all.</p>
