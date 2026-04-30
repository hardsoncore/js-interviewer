<p class="info info--blue">
  In modern development, prototypal inheritance is often hidden under the hood of classes or framework abstractions, but a clear understanding of these mechanics is the hallmark of a solid engineer.
</p>

<h3>How the new operator works</h3>

<p>
  When a function is called as a constructor using <code>new</code> (for example, <code>const obj = new F()</code>), JS performs exactly four steps under the hood:
</p>

<p>
  1. Creation: A new empty object is created in memory.
</p>

<p>
  2. Prototype linking: The internal hidden <code>[[Prototype]]</code> property of this new object is assigned a reference to the object that is stored in the <code>F.prototype</code> property at the time of the call.
</p>

<p>
  3. <code>this</code> initialization: The function F is called, and the <code>this</code> context is strictly bound to the newly created object. Inside the function, this object is usually populated with properties.
</p>

<p>
  4. Return: If the constructor function explicitly returns another object (via <code>return { ... }</code>), the <code>new</code> operator will return that other object. In all other cases (if there is no <code>return</code>, a primitive is returned, or the <code>return</code> is empty), <code>new</code> will return the created <code>this</code>.
</p>

<h3>The essence of the F.prototype property</h3>
<p>
  Confusion often arises here, so it is important to clarify:
</p>

<p>
  It is just a property. Any regular function (except arrow functions) has a default property named "prototype".
</p>

<p>
  It is <strong>not the prototype of the function itself</strong>. The <code>F.prototype</code> property does not affect the function <code>F</code> itself in any way. It is only used by the <code>new</code> operator to set the <code>[[Prototype]]</code> for new objects.
</p>

<p>
  Default state. Initially, <code>F.prototype</code> is an object with a single <code>constructor</code> property that points back to the function <code>F</code> itself:
</p>

<code class="code">
  F.prototype = {
    constructor: F
  };
</code>

<p class="info info--blue">
  Thus, the <code>F.prototype</code> property does not affect the function <code>F</code> itself and is only used by the <code>new</code> operator to set the <code>[[Prototype]]</code> for new objects.
  <br>
  <code>F.prototype</code> is simply a template for new objects created via <code>new F()</code>.
  <br>
  If you do not alter <code>F.prototype</code>, all objects created via <code>new F()</code> will inherit from this object with its single <code>constructor</code> property.
</p>

<h3>Critical nuances and pitfalls:</h3>
<p>
  1. The link is fixed at the moment of creation.
  <br>
  If, after creating <code>obj = new F()</code>, you completely redefine the <code>F.prototype = { ... }</code> property, the created <code>obj</code> will continue to reference the old prototype object. New objects created via <code>new F()</code> will receive the new prototype.
</p>

<p>
  2. Mutation vs Overwriting.
  <br>
  If you do not overwrite <code>F.prototype</code> entirely, but mutate it (for example, <code>F.prototype.sayHi = function() {}</code>), then old objects will see this method, as they reference the exact same object in memory.
</p>

<p>
  3. Losing the constructor.
  <br>
  If you decide to completely replace the prototype object with <code>F.prototype = { method1() {} }</code>, you overwrite the default <code>constructor</code> property. To avoid breaking the ecosystem and <code>instanceof</code> checks, the correct approach is either to add methods individually (<code>F.prototype.method = ...</code>) or to manually restore the <code>constructor</code>:
</p>

<code class="code">
  F.prototype = {
    constructor: F,
    method1() {}
  };
</code>
