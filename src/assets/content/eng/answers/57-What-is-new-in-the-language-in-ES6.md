<h3>What ES6 is and why people still talk about it</h3>
<p><span class="accent">ES6 (ECMAScript 2015)</span> is the largest update to the language in its entire history. Before it, JS was a language for short page scripts; after it, writing large applications became realistic. Hence the habit of calling "ES6" modern JavaScript.</p>

<p class="info"><strong>Main idea:</strong> ES6 is not a bag of syntax sugar, it closes three holes in the language: there was no block scope, no modules and no standard way to work with asynchrony. Everything else is convenient syntax on top of that.</p>

<h3>Variables: let and const</h3>
<p>Instead of function-scoped <code>var</code> we got block-scoped <code>let</code> and <code>const</code>: a variable lives inside its own curly braces and does not leak outside. Accessing it before the declaration line throws a <code>ReferenceError</code> — this is the <span class="accent">Temporal Dead Zone</span>.</p>

<h3>New syntax: functions and data</h3>
<ul>
  <li><strong>Arrow functions</strong> — short notation and no own <code>this</code>: it is taken from the place where the function is written.</li>
  <li><strong>Default parameters</strong>: <code>function greet(name = 'Guest')</code>.</li>
  <li><strong>Template literals</strong> — interpolation via <code>${}</code> and multiline strings out of the box.</li>
  <li><strong>Destructuring</strong> — unpacking objects and arrays into variables.</li>
  <li><strong>Spread and rest</strong> <code>...</code> — spill an array into elements and collect the remaining arguments.</li>
  <li><strong>Shorthand property notation</strong> and computed key names.</li>
</ul>

<code class="code">
  const { name, role = 'user' } = payload;      // destructuring + default
  const users = [...oldUsers, { name, role }];  // spread + shorthand

  const sum = (...args) =&gt; args.reduce((a, b) =&gt; a + b, 0); // rest + arrow
  console.log(`${name}: ${sum(1, 2)}`);         // template literal
</code>

<h3>Code structure: classes and modules</h3>
<p><code>class</code>, <code>extends</code>, <code>super</code>, <code>static</code> are syntax sugar over prototypal inheritance: under the hood it is still constructor functions and the prototype chain. And <code>import</code> / <code>export</code> is the first modularity at the level of the language itself; before that it was imitated with CommonJS, AMD and IIFE wrappers.</p>

<h3>Asynchrony and new types</h3>
<p><code>Promise</code> is a built-in wrapper around a future result, the answer to callback hell. Plus new data structures: <code>Map</code> (a key can be an object), <code>Set</code> (unique values only), <code>Symbol</code> (a unique identifier) and the iterator protocol with generators, on which <code>for...of</code> runs.</p>

<p class="info info--blue">Mnemonic for the answer — four blocks: <strong>scope</strong> (let, const), <strong>syntax</strong> (arrows, templates, destructuring, spread), <strong>structure</strong> (classes, modules), <strong>asynchrony and types</strong> (Promise, Map, Set, Symbol).</p>

<p class="info info--orange">A common mistake is crediting ES6 with someone else's features. <code>async/await</code> is ES2017, object spread <code>{ ...obj }</code> is ES2018, class fields and private <code>#</code> properties are ES2022. In ES6 spread only worked with arrays, strings and call arguments.</p>

<p class="deep-dive">Deep Dive</p>

<h3>Arrow functions: what they lack</h3>
<p>An arrow is not a "short function" but a function with a stripped-down set of internal mechanisms. It has no own <code>this</code>, <code>arguments</code>, <code>super</code> or <code>new.target</code>, no <code>prototype</code> property, and it cannot be called with <code>new</code>. It takes all of these from the outer lexical scope — the same place where it looks up ordinary variables.</p>
<p>Hence a practical consequence: <code>call</code>, <code>apply</code> and <code>bind</code> do not work on an arrow — its context cannot be substituted, it is fixed at creation time. That is why arrows are perfect for callbacks inside methods and absolutely unsuitable for object methods, prototype methods and handlers where <code>this</code> must be the DOM element.</p>

<h3>Classes are sugar, but not entirely</h3>
<p>A class really does compile into a constructor function, but it has differences you cannot reproduce by hand with prototypes:</p>
<ul>
  <li>The class body always runs in strict mode.</li>
  <li>Methods are non-enumerable — they do not show up in <code>for...in</code>.</li>
  <li>Calling the constructor without <code>new</code> throws a <code>TypeError</code>.</li>
  <li>A class declaration is not hoisted like a function: before the declaration line it sits in the TDZ.</li>
  <li>Methods get a hidden <code>[[HomeObject]]</code> reference — that is exactly what makes <code>super</code> work.</li>
</ul>
<p>In ES6 a class only had a constructor, methods, static methods and getters/setters. Fields and privacy did not exist yet — ES2022 added them.</p>

<h3>ES modules vs CommonJS</h3>
<p>The key difference is not the syntax but the fact that the structure of an ES module is <span class="accent">static</span>: all <code>import</code> statements are known before the code runs. Everything else follows from that:</p>
<ul>
  <li>The bundler sees the dependency graph in advance — hence tree shaking and elimination of unused code.</li>
  <li><code>import</code> cannot be written inside a condition — for dynamics there is a separate <code>import()</code>, but that is already ES2020.</li>
  <li>An import is a live binding, a live reference to the module's variable, not a copy of the value like <code>module.exports</code> in CommonJS.</li>
  <li>A module is always in strict mode, has its own scope and runs once, no matter how many times it is imported.</li>
</ul>
<p>The syntax was accepted in 2015, but native <code>&lt;script type="module"&gt;</code> support in browsers only arrived around 2017 — before that everything was built by bundlers.</p>

<h3>Destructuring in full</h3>
<code class="code">
  const { user: { name = 'anonymous' }, ...restProps } = data; // nesting, default, rest
  const [, second] = list;                    // skipping an element
  [a, b] = [b, a];                            // swapping values

  function draw({ size = 10, color = 'red' } = {}) { ... } // parameter destructuring
</code>
<p>The last trick is the standard way to make named arguments: the calling code does not depend on parameter order, and <code>= {}</code> lets you call the function with no arguments at all.</p>

<h3>Symbol and the language protocols</h3>
<p>Symbol is needed not so much for "private" properties as for extending the language itself. Well-known symbols are hook points into the engine's internal mechanisms: <code>Symbol.iterator</code> makes an object iterable in <code>for...of</code> and spread, <code>Symbol.toPrimitive</code> controls conversion to a primitive, <code>Symbol.toStringTag</code> controls the output of <code>Object.prototype.toString</code>. Previously such hooks were hard-wired into the engine and unavailable to the developer.</p>

<h3>What else ES6 brought but is rarely named</h3>
<ul>
  <li><code>Proxy</code> and <code>Reflect</code> — interception of operations on an object, the foundation of reactivity in Vue 3 and MobX.</li>
  <li><code>WeakMap</code> and <code>WeakSet</code> — collections with weak references that do not block the garbage collector.</li>
  <li><code>Object.assign</code>, <code>Array.from</code>, <code>Array.of</code>, the <code>find</code> and <code>findIndex</code> methods.</li>
  <li>String methods <code>includes</code>, <code>startsWith</code>, <code>endsWith</code>, <code>repeat</code>.</li>
  <li>Tagged templates — the basis of styled-components and <code>gql</code>.</li>
  <li>Binary and octal literals, <code>Number.isNaN</code>, <code>Number.isInteger</code>.</li>
</ul>

<h3>Why ES6 was learned through Babel for so long</h3>
<p>The specification was accepted before browsers supported it, so code was written in ES6 and transpiled to ES5. It is important to understand the limit here: syntax (arrows, classes, destructuring) transpiles losslessly, missing APIs (<code>Promise</code>, <code>Map</code>, <code>Symbol</code>) are added by polyfills, but <code>Proxy</code> cannot be polyfilled in principle — it intercepts operations at the engine level. Today transpiling ES6 is practically unnecessary: every current browser supports it fully, and bundlers already target much fresher versions of the standard.</p>
