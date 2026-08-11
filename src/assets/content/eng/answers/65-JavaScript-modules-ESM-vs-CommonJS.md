<h3>Introduction</h3>
<p>A <span class="accent">module</span> is a file with its own scope that explicitly declares what it exports and what it imports. JavaScript has two main module systems: <span class="accent">CommonJS</span> (<code>require</code>, grew up in Node.js) and the language standard <span class="accent">ES Modules</span> (<code>import/export</code>, ES6).</p>

<p class="info"><strong>Key idea:</strong> CommonJS resolves dependencies at runtime, while ESM resolves them statically, before the code runs. Everything else follows from this difference: tree shaking, live bindings, asynchronous loading.</p>

<h3>CommonJS</h3>
<p><code>require()</code> is a regular function: it runs at runtime and reads the module from disk synchronously. <code>module.exports</code> is a regular object. That is why you can import conditionally, in the middle of a file, with a computed path.</p>
<code class="code">
  // math.js
  module.exports = { sum: (a, b) =&gt; a + b };

  // app.js
  const { sum } = require('./math');
</code>

<h3>ES Modules</h3>
<p><code>import/export</code> is language syntax, not a function. The parser builds the whole dependency graph before executing the code, so imports are allowed only at the top level and are hoisted. A module always runs in strict mode, and in the browser it is included via <code>&lt;script type="module"&gt;</code> and loads asynchronously without blocking parsing (defer behavior by default).</p>
<code class="code">
  // math.js
  export const sum = (a, b) =&gt; a + b;

  // app.js
  import { sum } from './math.js';
</code>

<h3>Key differences</h3>
<ul>
  <li><strong>Resolution time:</strong> CJS — at runtime, ESM — at parse time.</li>
  <li><strong>What the importer gets:</strong> CJS — a copy of the value at the moment of <code>require</code>, ESM — a <strong>live binding</strong>, a live reference to the variable: if it changes in the module, everyone sees it.</li>
  <li><strong>Loading:</strong> CJS — synchronous (fine for a server's disk), ESM — asynchronous (designed for the network and the browser).</li>
  <li><strong>ESM only:</strong> top-level <code>await</code>; strict mode by default; top-level <code>this</code> is <code>undefined</code>.</li>
</ul>

<h3>Tree shaking</h3>
<p>The ESM graph is known before execution, so the bundler sees which exports nobody uses and drops them from the bundle. With CommonJS this cannot be done reliably: what gets exported and where only becomes known at runtime.</p>

<h3>Dynamic import()</h3>
<p><code>import('./module.js')</code> is a dynamic import inside ESM: it works like a function and returns a <code>Promise</code> with the module. It is the foundation of code splitting and lazy loading of routes in frameworks.</p>

<p class="info info--blue">Remember: both standards cache the module — no matter how many times it is imported, the code runs once and everyone gets the same instance (which is why a module is the simplest singleton).</p>

<p class="deep-dive">Deep Dive</p>

<h3>The three phases of ESM loading</h3>
<ol>
  <li><strong>Construction</strong> — files are fetched and parsed into Module Records, the dependency graph is built.</li>
  <li><strong>Instantiation</strong> — memory is allocated for all exports, imports and exports are linked to the same memory cells (this is where live bindings come from). No code has run yet.</li>
  <li><strong>Evaluation</strong> — the code runs and the cells are filled with values.</li>
</ol>
<p>Separating linking from execution is the reason ESM handles circular dependencies better.</p>

<h3>Live bindings in action</h3>
<code class="code">
  // counter.js
  export let count = 0;
  export const inc = () =&gt; count++;

  // app.js (ESM)
  import { count, inc } from './counter.js';
  inc();
  console.log(count); // 1 — a live reference

  // app.js (CJS equivalent)
  let { count, inc } = require('./counter');
  inc();
  console.log(count); // 0 — a copy at the moment of require
</code>
<p>Note that a live binding is read-only: assigning <code>count = 5</code> from the importer is not allowed — it throws an error.</p>

<h3>Circular dependencies</h3>
<p>In CJS, with an <code>A → B → A</code> cycle, module B receives a <strong>partially filled</strong> <code>module.exports</code> of module A — only the fields assigned before <code>require(B)</code>. This is a source of hard-to-catch <code>undefined</code> values. In ESM the references are linked in advance: if the value has already been evaluated by the time it is used — everything works; if not — you get an explicit ReferenceError (similar to TDZ) instead of a silent <code>undefined</code>.</p>

<h3>Interop in Node.js</h3>
<ul>
  <li>The file's mode is chosen by the <code>.mjs</code> / <code>.cjs</code> extensions or the <code>"type": "module"</code> field in package.json.</li>
  <li>ESM can import CJS: <code>module.exports</code> becomes the default export.</li>
  <li><code>require()</code> of ESM modules was long forbidden (ESM is asynchronous); starting with Node 22, <code>require(esm)</code> is allowed for modules without top-level await.</li>
  <li>The <code>"exports"</code> field in package.json defines entry points and makes it possible to publish a dual package (CJS + ESM).</li>
  <li>ESM has no <code>__dirname</code> and <code>__filename</code> — use <code>import.meta.url</code> instead.</li>
</ul>

<h3>A bit of history</h3>
<p>Before the standard, modules were emulated: IIFE and the closure-based "module pattern" → AMD/RequireJS (asynchronous, for the browser) → UMD (a "both ways" wrapper) → CommonJS (Node) → ES Modules (ES6, 2015). Today ESM is the only standard that works both in the browser and in Node, and new libraries are published ESM-first.</p>
