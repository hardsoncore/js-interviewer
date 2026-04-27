<h3>Definition</h3>
<p><span class="accent">__proto__</span> is a legacy getter/setter (accessor property) that allows you to read or change the hidden internal property of an object called <code>[[Prototype]]</code>.</p>

<p>In JavaScript, inheritance is based on prototypes. <code>[[Prototype]]</code> is a physical link to another object (or <code>null</code>) from which the current object inherits properties and methods.</p>

<h3>How the Prototype Chain works</h3>
<p>When the engine tries to read a property or call an object's method, the following happens:</p>

<p>1. It looks for the property in the object itself.</p>

<p>2. If the property is not found, the search goes to the object that <code>__proto__</code> points to.</p>

<p>3. This process repeats up the chain until the property is found or until <code>__proto__</code> becomes <code>null</code> (this usually happens after <code>Object.prototype</code>).</p>

<h3>__proto__ vs prototype (The main confusion)</h3>
<p>These are two completely different concepts that work together when creating objects:</p>

<p><strong>prototype</strong> is a property of constructor functions (and classes). It exists before the instance is created and holds the object that will be set as the prototype for all future instances created with <code>new</code>.</p>

<p><strong>__proto__</strong> is a link inside an <strong>already created instance</strong> that points to its prototype.</p>

<p class="info info--blue">
  The connection is simple: instance.__proto__ === Constructor.prototype
</p>

<p>For example:</p>
<code class="code">
  function Person(name) {
    this.name = name;
  }

  Person.prototype.greet = function() {
    return `Hello, my name is ${this.name}`;
  };

  const alice = new Person('Alice');
  console.log(alice.greet()); // "Hello, my name is Alice"
  console.log(alice.__proto__ === Person.prototype); // true
</code>

<h3>Modern standard (Why __proto__ is Legacy)</h3>

<p>Even though <code>__proto__</code> was standardized in ES6 (only for backward compatibility with browsers), using it in production code is bad practice.</p>

<p>Modern alternatives:</p>

<p><strong>Reading:</strong> Instead of <code>obj.__proto__</code>, use <code>Object.getPrototypeOf(obj)</code>.</p>

<p><strong>Writing:</strong> Instead of <code>obj.__proto__ = newProto</code>, use <code>Object.setPrototypeOf(obj, newProto)</code>.</p>

<p><strong>Creating from scratch:</strong> The best way to set a prototype is when creating an object: <code>Object.create(newProto)</code>.</p>

<h3>Warning: Performance</h3>
<p>Changing <code>[[Prototype]]</code> of an existing object (whether through <code>__proto__</code> or <code>Object.setPrototypeOf</code>) is a very slow operation. Modern JS engines (like V8) optimize property access by creating hidden classes. Changing the prototype on the fly destroys these optimizations, forcing the engine to deoptimize the code.</p>
