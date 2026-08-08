<h3>The essence of F.prototype</h3>
<p><span class="accent">F.prototype</span> is an ordinary property of a constructor function that holds a template object. The <code>new</code> operator takes that object and writes it into the hidden <code>[[Prototype]]</code> slot of the new instance — this is how the instance gets its shared methods.</p>

<p class="info"><strong>Main idea:</strong> <code>F.prototype</code> is not the prototype of the function <code>F</code> itself, it is the prototype blueprint for its future instances. Only the <code>new</code> operator reads this property, and only at the moment of the call.</p>

<h3>What new does: four steps</h3>
<ol>
  <li>Creates a new empty object.</li>
  <li>Writes the current value of <code>F.prototype</code> into its <code>[[Prototype]]</code>.</li>
  <li>Calls <code>F</code> with <code>this</code> bound to that object: the constructor body fills it with own properties.</li>
  <li>Returns <code>this</code>. Exception: if the constructor explicitly returns an object, that object is returned instead, while a primitive <code>return</code> is ignored.</li>
</ol>

<code class="code">
  function Person(name) {
    this.name = name;                 // step 3: own property of the instance
  }

  Person.prototype.hi = function () { // shared method for all instances
    return 'Hello, ' + this.name;
  };

  const alice = new Person('Alice');

  alice.hi();                                        // 'Hello, Alice' — method found in the prototype
  Object.getPrototypeOf(alice) === Person.prototype; // true
</code>

<h3>The constructor property</h3>
<p>By default <code>F.prototype</code> is an object with a single property <code>constructor</code> pointing back to <code>F</code> itself. Instances see it through the chain: <code>alice.constructor === Person</code>.</p>

<h3>Three classic pitfalls</h3>
<ul>
  <li><strong>The link is fixed at call time.</strong> If you completely overwrite <code>F.prototype = { ... }</code> after <code>new F()</code>, the already created objects keep referencing the old prototype, and only the next instances get the new one.</li>
  <li><strong>Mutation is a different story.</strong> <code>F.prototype.sayHi = ...</code> changes the very same object in memory, so the method instantly appears on previously created instances as well.</li>
  <li><strong>Losing constructor.</strong> Fully overwriting <code>F.prototype</code> wipes out the default <code>constructor</code>. Either add methods one by one, or restore the reference manually: <code>F.prototype = { constructor: F, method() {} }</code>.</li>
</ul>

<p class="info info--orange">The <code>prototype</code> property exists only on functions that can act as a constructor. Arrow functions and methods written with shorthand syntax do not have it — <code>new</code> with them throws a <code>TypeError</code>.</p>

<p class="deep-dive">Deep Dive</p>

<h3>What new looks like «from the inside»</h3>
<p>Behind <code>new</code> stands the internal method <code>[[Construct]]</code>, which not every function has. A rough emulation in plain JS:</p>
<code class="code">
  function myNew(F, ...args) {
    const obj = Object.create(F.prototype);  // steps 1-2
    const result = F.apply(obj, args);       // step 3

    return (typeof result === 'object' &amp;&amp; result !== null) || typeof result === 'function'
      ? result
      : obj;                                 // step 4
  }
</code>
<p>One more nuance of step 2: if <code>F.prototype</code> holds something other than an object (say, someone assigned a number there), the engine does not crash — the instance silently gets <code>Object.prototype</code>.</p>

<h3>Who can be a constructor</h3>
<ul>
  <li><code>[[Construct]]</code> exists on function declarations / function expressions and on classes.</li>
  <li>It does not exist on arrow functions, on shorthand methods (<code>{ foo() {} }</code>), on generators and async functions.</li>
  <li>A bound function (<code>F.bind(...)</code>) keeps <code>[[Construct]]</code>, but when called with <code>new</code> the bound <code>this</code> is ignored — <code>this</code> still becomes the new object.</li>
</ul>

<h3>new.target</h3>
<p>Inside a function <code>new.target</code> equals the function itself when called with <code>new</code>, and <code>undefined</code> on a regular call. This is a way to guard against calling a constructor without <code>new</code> — otherwise <code>this</code> would be <code>undefined</code> in strict mode (or the global object outside of it), and the properties would leak into the wrong place.</p>
<code class="code">
  function Person(name) {
    if (!new.target) return new Person(name); // safety net

    this.name = name;
  }
</code>
<p>Classes solve the same problem more strictly: calling a class without <code>new</code> always throws a <code>TypeError</code>.</p>

<h3>Why put methods in the prototype at all</h3>
<p>A method declared inside the constructor (<code>this.hi = function () {}</code>) is created anew for every instance: a thousand objects means a thousand identical functions in memory. A method in <code>F.prototype</code> exists in a single copy, and all objects reach it through the chain. That is exactly why behavior goes into the prototype and state goes into <code>this</code>.</p>

<h3>How prototype differs for classes</h3>
<ul>
  <li>A class's <code>prototype</code> property is non-enumerable and <strong>non-writable</strong> — you cannot overwrite <code>Class.prototype = {}</code>, only mutate it.</li>
  <li>Class methods are non-enumerable too: they do not show up in <code>for..in</code>, unlike methods added manually to <code>F.prototype</code>.</li>
</ul>

<h3>instanceof relies on prototype, not on constructor</h3>
<p><code>obj instanceof F</code> walks the object's <code>[[Prototype]]</code> chain looking for the current <code>F.prototype</code>. Hence the unpleasant consequence of overwriting the prototype: old instances stop being <code>instanceof F</code>, even though it was exactly this function that created them.</p>
<code class="code">
  function F() {}
  const old = new F();

  F.prototype = { hello() {} }; // the prototype is replaced entirely

  old instanceof F;             // false — the chain leads to the previous object
  new F() instanceof F;         // true
</code>
<p>The behavior of <code>instanceof</code> itself can be overridden through <code>Symbol.hasInstance</code>.</p>

<p class="info info--blue">You cannot rely on <code>constructor</code> as a guarantee: it is an ordinary writable property of the prototype. It is easy to wipe out or fake, and the engine does not verify its origin. To determine whether an object is «of the right type», use <code>instanceof</code> or duck typing.</p>
