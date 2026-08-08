<h3>What is __proto__</h3>
<p><span class="accent">__proto__</span> is a historical getter/setter that lets you read or change an object's hidden <code>[[Prototype]]</code> property — the reference to the prototype where the engine looks up missing properties.</p>

<p class="info"><strong>Key idea:</strong> <code>__proto__</code> is not the prototype itself but a legacy "door" to it. The prototype lives in the internal <code>[[Prototype]]</code> slot, and the standard way to access it today is <code>Object.getPrototypeOf / setPrototypeOf</code>.</p>

<h3>__proto__ vs [[Prototype]] vs F.prototype</h3>
<p>Three concepts that get constantly confused:</p>
<ul>
  <li><code>[[Prototype]]</code> — an internal hidden slot of every object: a reference to the prototype or <code>null</code>. Not directly accessible from code.</li>
  <li><code>__proto__</code> — an accessor for reading and writing this slot on an already created object.</li>
  <li><code>F.prototype</code> — a regular property of a constructor function: the object that will become the <code>[[Prototype]]</code> of instances created via <code>new F()</code>. It does not affect the prototype of the function <code>F</code> itself.</li>
</ul>

<code class="code">
  function Person(name) {
    this.name = name;
  }

  const alice = new Person('Alice');

  // new wrote Person.prototype into the instance's [[Prototype]] slot
  console.log(alice.__proto__ === Person.prototype);              // true
  console.log(Object.getPrototypeOf(alice) === Person.prototype); // true
</code>

<h3>Modern alternatives</h3>
<ul>
  <li>Reading: <code>Object.getPrototypeOf(obj)</code>.</li>
  <li>Writing: <code>Object.setPrototypeOf(obj, proto)</code>.</li>
  <li>Creating with the right prototype from the start: <code>Object.create(proto)</code> — the best option, the object is born with the correct chain.</li>
</ul>
<p><code>__proto__</code> itself was standardized in ES6 solely for backward compatibility with old code — it has no place in new code.</p>

<p class="info info--blue">Rule of thumb: <code>__proto__</code> — only for peeking in the console while debugging. In code — <code>Object.getPrototypeOf / create</code>, and changing the prototype of a live object — don't do it at all.</p>

<h3>Performance: why you must not change the prototype on the fly</h3>
<p>Changing the <code>[[Prototype]]</code> of a live object is one of the slowest operations in JS, no matter how you do it. Engines optimize property access with hidden classes and inline caches, which rely on the stability of an object's shape and its chain. Swapping the prototype breaks these caches and deoptimizes all code working with the object. That's why the prototype is set once — at creation time.</p>

<p class="info info--orange">Trap: an arrow function has no <code>prototype</code> property, but it does have <code>__proto__</code> — like any object. <code>prototype</code> exists only on functions that can act as constructors.</p>

<p class="deep-dive">Deep Dive</p>

<h3>Why __proto__ works at all: an accessor on Object.prototype</h3>
<p><code>__proto__</code> is not an own property of every object but a getter/setter declared once on <code>Object.prototype</code>. Accessing <code>obj.__proto__</code> finds this accessor through the prototype chain and calls it with <code>this = obj</code>. A consequence follows: if <code>Object.prototype</code> is not in the chain, the "door" disappears:</p>
<code class="code">
  const dict = Object.create(null); // object without a prototype

  dict.__proto__ = { hacked: true };
  console.log(dict.hacked);    // undefined — the prototype was NOT replaced
  console.log(dict.__proto__); // { hacked: true } — a regular data property
</code>
<p>The accessor was not found, so the assignment simply created an own property named <code>__proto__</code>. This is exactly why <code>Object.create(null)</code> is a safe dictionary for user-provided keys.</p>

<h3>Prototype Pollution — an attack via __proto__</h3>
<p>A classic vulnerability: code recursively merges external data into an object (deep merge of settings, query parameters, JSON from the backend). An attacker sends a <code>"__proto__"</code> key, the assignment <code>obj[key] = value</code> triggers the setter — and the properties get written straight into <code>Object.prototype</code>, "appearing" on every object in the application. This is how flags like <code>isAdmin</code> get spoofed or the whole logic gets broken.</p>
<p>A nuance: <code>JSON.parse('{"__proto__": {...}}')</code> itself is safe — the parser creates a regular data property, bypassing the setter. The danger is the subsequent naive key-by-key merge. Protection: <code>Object.create(null)</code> or <code>Map</code> for dictionaries, filtering out the keys <code>__proto__</code>, <code>constructor</code>, <code>prototype</code>.</p>

<h3>Setter edge cases</h3>
<ul>
  <li>The setter accepts only an object or <code>null</code>: assigning a primitive (<code>obj.__proto__ = 42</code>) is silently ignored.</li>
  <li>Trying to close the chain into a cycle (<code>a.__proto__ = b; b.__proto__ = a</code>) throws <code>TypeError: Cyclic __proto__ value</code>.</li>
  <li>On a non-extensible object (<code>Object.preventExtensions</code>) changing the prototype throws a <code>TypeError</code>.</li>
</ul>

<h3>History: Annex B</h3>
<p><code>__proto__</code> appeared in the 1990s as a non-standard extension of the SpiderMonkey engine (Netscape), spread to other engines, and the web came to rely on it. In ES6 (2015) it had to be legitimized — but not in the main specification, rather in Annex B, the section of legacy features for web compatibility. The official replacements: <code>Object.getPrototypeOf</code> — as early as ES5, <code>Object.setPrototypeOf</code> — ES6.</p>

<h3>What exactly breaks in the engine when the prototype changes</h3>
<p>V8 describes the structure of every object with a hidden class (shape): which properties, at which offsets, which prototype. Optimized machine code and inline caches are tied to a specific hidden class: "for objects of this shape, the method lives right there". Changing the prototype moves the object to a new hidden class — every piece of code that saw the object becomes polymorphic or megamorphic, and the engine drops its optimizations (deoptimization). What becomes slow is not the <code>setPrototypeOf</code> operation itself, but all subsequent property access on that object.</p>
