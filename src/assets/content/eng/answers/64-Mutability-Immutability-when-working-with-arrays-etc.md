<h3>Introduction</h3>
<p><span class="accent">Mutability</span> is the ability to change an object "in place", in the same memory cell. <span class="accent">Immutability</span> is the opposite approach: data never changes after creation — instead of modifying it, you create a new copy. In JavaScript, primitives (strings, numbers, booleans) are immutable, while objects and arrays are mutable.</p>

<p class="info"><strong>Key idea:</strong> a variable stores not the object itself but a <strong>reference</strong> to it. A mutation is visible to everyone holding that reference — hence unexpected side effects. Immutability turns the question "did the data change?" into a cheap reference comparison: new reference = new data.</p>

<h3>Reference vs value</h3>
<code class="code">
  const a = [1, 2, 3];
  const b = a;        // the reference was copied, not the array
  b.push(4);
  console.log(a);     // [1, 2, 3, 4] — a is "affected" too

  const c = [...a];   // a new copy
  c.push(5);
  console.log(a);     // [1, 2, 3, 4] — a is untouched
</code>

<h3>Array methods: mutating and not</h3>
<ul>
  <li><strong>Mutate</strong> the original array: <code>push</code>, <code>pop</code>, <code>shift</code>, <code>unshift</code>, <code>splice</code>, <code>sort</code>, <code>reverse</code>, <code>fill</code>.</li>
  <li><strong>Return a new one</strong>: <code>map</code>, <code>filter</code>, <code>slice</code>, <code>concat</code>, <code>flat</code>, spread <code>[...arr]</code>.</li>
  <li><strong>ES2023</strong> added immutable counterparts to the mutating methods: <code>toSorted</code>, <code>toReversed</code>, <code>toSpliced</code> and <code>with</code> (replacing an element by index).</li>
</ul>

<p class="info info--orange">A classic trap: <code>sort()</code> and <code>reverse()</code> not only return the result but also change the original array. Safe options: <code>arr.toSorted()</code> or <code>[...arr].sort()</code>.</p>

<h3>Immutable updates</h3>
<code class="code">
  const added = [...arr, newItem];              // add
  const removed = arr.filter(i =&gt; i.id !== id); // remove
  const updated = arr.map(i =&gt;                  // change
    i.id === id ? { ...i, done: true } : i
  );
</code>

<h3>Why it matters</h3>
<ul>
  <li><strong>Predictability:</strong> a function that does not mutate its arguments produces no hidden side effects.</li>
  <li><strong>Cheap change tracking:</strong> React, Angular OnPush and Redux/NgRx compare states by reference in O(1) instead of a deep traversal. If you mutate the state, the reference stays the same — the framework won't notice the change, and the UI won't update.</li>
  <li><strong>State history:</strong> undo/redo and time-travel debugging are possible because old versions are never overwritten by anyone.</li>
</ul>

<p class="info info--blue"><code>const</code> does not make an object immutable: it only forbids reassigning the reference itself — the contents can still be changed. Real (but shallow) freezing is provided by <code>Object.freeze()</code>.</p>

<p class="deep-dive">Deep Dive</p>

<h3>Why primitives are immutable</h3>
<p>All string methods (<code>toUpperCase</code>, <code>slice</code>, <code>replace</code>) return a new string — the original cannot be changed at all. The assignment <code>str[0] = 'A'</code> is silently ignored, and in strict mode it throws a <code>TypeError</code>. This gives the engine freedom to optimize: strings can be safely cached and reused, since nobody can ever change them.</p>

<h3>Shallow vs deep copying</h3>
<p>Spread, <code>slice</code> and <code>Object.assign</code> copy only the first level: nested objects remain shared references between the "copy" and the original.</p>
<code class="code">
  const orig = { user: { name: 'Ann' } };
  const copy = { ...orig };
  copy.user.name = 'Bob';
  console.log(orig.user.name); // 'Bob' — the nested object is shared
</code>
<p>For deep cloning there is the native <code>structuredClone()</code>. The old hack <code>JSON.parse(JSON.stringify(obj))</code> is considered legacy: it loses <code>undefined</code>, functions and <code>Symbol</code>, turns <code>Date</code> into a string and crashes on circular references.</p>

<h3>Object.freeze and its limits</h3>
<p><code>Object.freeze(obj)</code> forbids adding, deleting and overwriting properties, but the freeze is <strong>shallow</strong> — nested objects remain mutable; full protection requires a recursive one (deep freeze). There are also softer gradations: <code>Object.preventExtensions</code> (no adding) and <code>Object.seal</code> (no adding or deleting, but values can be changed).</p>
<p class="info info--orange">Violating a freeze in sloppy mode is ignored <strong>silently</strong>, and only strict mode throws a <code>TypeError</code> — a frequent source of "mystical" bugs.</p>

<h3>The cost of immutability and structural sharing</h3>
<p>Copying is O(n) in time and memory, plus extra work for the garbage collector. For frequent updates of large structures, persistent data structures were invented (Immutable.js): a new version <strong>reuses</strong> the unchanged branches of the old one (structural sharing), so a "copy" costs O(log n) instead of O(n).</p>
<p>The Immer library solves the same problem with ergonomics: you write familiar "mutating" code against a <code>Proxy</code> draft and get a new immutable object as the output. This is exactly how <code>createReducer</code> works in Redux Toolkit and NgRx.</p>

<h3>Relation to change detection</h3>
<p>Angular with <code>OnPush</code> re-renders a component when an <code>@Input</code> reference has changed; React compares state via <code>Object.is</code>, while <code>React.memo</code> and <code>useMemo</code> compare props and dependencies by reference. In both cases a mutated array is invisible: same reference — no re-render. That is why immutability in modern frameworks is not a "style" but a prerequisite for correct behavior.</p>
