<h3>The essence: delegation, not copying</h3>
<p><span class="accent">Inheritance in JavaScript</span> is prototypal: every object has a hidden reference <code>[[Prototype]]</code> to another object — its prototype. When a property is missing on the object itself, the engine looks it up in the prototype, then in the prototype's prototype — and so on along the whole chain.</p>

<p class="info"><strong>Key idea:</strong> inheritance in JS is delegation: a property is not copied into the descendant but found on the prototype at the moment of access. The <code>class</code> syntax is sugar over this very mechanism.</p>

<h3>Prototype Chain</h3>
<code class="code">
  const animal = { eats: true };
  const rabbit = Object.create(animal); // rabbit.[[Prototype]] === animal

  rabbit.jumps = true;
  console.log(rabbit.jumps); // true — own property
  console.log(rabbit.eats);  // true — found on the prototype
</code>
<p>The lookup goes bottom-up until the first match. The top of almost any chain is <code>Object.prototype</code> (that's where every object gets its "free" <code>toString</code> and <code>hasOwnProperty</code>), whose prototype is <code>null</code> — the end of the lookup.</p>

<h3>Three ways to set up inheritance</h3>
<ul>
  <li><code>class ... extends</code> — the modern standard: constructors, <code>super</code>, readable hierarchies.</li>
  <li><code>Object.create(proto)</code> — create an object with the desired prototype directly, no constructors.</li>
  <li>Constructor function + <code>F.prototype</code> + <code>new</code> — the "pre-class" classic everything relied on before ES6.</li>
</ul>
<code class="code">
  class Animal {
    constructor(name) { this.name = name; }
    eat() { return this.name + ' eats'; }
  }

  class Rabbit extends Animal {
    jump() { return this.name + ' jumps'; }
  }

  new Rabbit('Rabbit').eat(); // method found on Animal.prototype
</code>

<h3>Reads go up the chain, writes go to the object itself</h3>
<p>The chain works only for <strong>reading</strong>. Writing <code>rabbit.eats = false</code> creates an own property right on the object and "shadows" the inherited one (shadowing) — the prototype itself does not change. That's why methods are shared by all instances (they live in one prototype and are not duplicated in memory), while state is per-instance.</p>

<p class="info info--orange">A common confusion: <code>class</code> does not turn JS into Java. There is no classical inheritance "by copying" here — there is a live chain of objects: add a method to a prototype at runtime, and it instantly becomes available to all descendants.</p>

<p class="deep-dive">Deep Dive</p>

<h3>What extends actually does</h3>
<p><code>class Rabbit extends Animal</code> builds <strong>two</strong> chains at once: <code>Rabbit.prototype.[[Prototype]] = Animal.prototype</code> — for instance methods, and <code>Rabbit.[[Prototype]] = Animal</code> — which is why even statics are inherited (<code>Rabbit.create()</code> will find <code>static create()</code> from <code>Animal</code>). There are also differences between a class and a "manual" constructor: class methods are non-enumerable (they don't show up in <code>for..in</code>), the class body always runs in strict mode, and calling without <code>new</code> throws a <code>TypeError</code>.</p>

<h3>super and [[HomeObject]]</h3>
<p><code>super.method()</code> does not work through <code>this</code>: a method declared with the shorthand syntax has a hidden property <code>[[HomeObject]]</code> — a reference to the object where the method was created. <code>super</code> looks the property up in the prototype of <code>[[HomeObject]]</code>, which is why it works correctly in deep hierarchies where the <code>this.__proto__.method.call(this)</code> trick ends up in an infinite loop. The flip side: a method using <code>super</code> is "bound" to the place of its declaration and can't be safely copied into another object, while a regular function expression has no <code>[[HomeObject]]</code> at all.</p>

<h3>The exception to the write rule: setters</h3>
<p>If there is an accessor with a setter higher up the chain, a write does not create an own property but calls that setter instead. This is how properties defined via <code>get</code>/<code>set</code> in a class control instance state right from the prototype.</p>

<h3>instanceof and property enumeration</h3>
<ul>
  <li><code>obj instanceof F</code> walks the object's <code>[[Prototype]]</code> chain and checks whether <code>F.prototype</code> shows up there.</li>
  <li><code>for..in</code> enumerates inherited enumerable properties too; <code>Object.keys</code> — own properties only.</li>
  <li>To check "own or inherited" — <code>Object.hasOwn(obj, key)</code>, the modern replacement for <code>obj.hasOwnProperty(key)</code>.</li>
</ul>

<h3>Object.create(null) — an object without a prototype</h3>
<p>Creates a "pure dictionary": it has no <code>Object.prototype</code>, hence no <code>toString</code> and no collisions with the <code>__proto__</code> key. Such objects are a good fit for storing key-value pairs from user input — and double as protection against prototype pollution.</p>

<h3>Limitations and practice</h3>
<ul>
  <li>There is only one chain — no multiple inheritance. The workaround is mixins: <code>Object.assign(Rabbit.prototype, mixin)</code>.</li>
  <li>Changing <code>[[Prototype]]</code> "on the fly" (<code>Object.setPrototypeOf</code>, writing to <code>__proto__</code>) hits engine optimizations hard: hidden classes get discarded. Set the prototype once, at object creation.</li>
</ul>

<p class="info info--blue">Rule of thumb: deep inheritance hierarchies in JS almost always lose to composition. Inheritance is for the "is-a" relation (a Rabbit is an Animal), composition and mixins — for "can-do".</p>
