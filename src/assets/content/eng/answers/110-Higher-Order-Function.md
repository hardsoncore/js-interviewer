<h3>Introduction and Basic Definition</h3>

<p>
  <span class="accent">A Higher-Order Function (HOF)</span> is a function that takes one or more functions as arguments, or returns a function as its result (or does both).
</p>

<p class="info info--blue">
  This approach is possible because functions in JavaScript are "First-Class Citizens". This means you can work with them just like regular variables (numbers, strings, objects). The HOF concept is at the very core of functional programming.
</p>

<hr />

<h3>Code Examples</h3>

<h4>Example 1: A function taking another function as an argument (Callback)</h4>
<p>The most basic and common example is built-in array methods or passing a custom calculation function:</p>
<code class="code">
  function doOperation(a, b, operationCallback) {
    // operationCallback is the passed function
    return operationCallback(a, b);
  }

  const add = (x, y) => x + y;
  const multiply = (x, y) => x * y;

  console.log(doOperation(5, 3, add)); // 8
  console.log(doOperation(5, 3, multiply)); // 15
</code>

<h4>Example 2: A function returning another function</h4>
<p>This approach is often used for closures and function factories (for example, in currying):</p>
<code class="code">
  function multiplyBy(factor) {
    // Return a new anonymous function
    return function(number) {
      return number * factor;
    };
  }

  const double = multiplyBy(2);
  const triple = multiplyBy(3);

  console.log(double(5)); // 10
  console.log(triple(5)); // 15
</code>

<hr />

<h3>Key Features and Use Cases</h3>

<ul>
  <li>
    <strong>Encapsulation and Logic Abstraction:</strong> HOFs allow us to abstract repetitive logic. For example, array looping is hidden "under the hood" in the <code>Array.prototype.map</code> method, so we don't need to write a routine <code>for</code> loop every time.
  </li>
  <li>
    <strong>Composition and Decorators:</strong> You can create "wrapper" functions around other functions to extend their capabilities (for example, adding logging, cache memoization, or a debounce/throttle wrapper).
  </li>
  <li>
    <strong>Currying and Partial Application:</strong> Transforming a function with multiple arguments into a chain of function calls with a single argument, which improves logic reuse.
  </li>
</ul>

<hr />

<h3>Important Nuances and Best Practices</h3>

<p class="info info--orange">
  Functions passed as arguments (callbacks) can often lose their execution context (<strong>this</strong>). When using HOFs inside class methods, make sure to pass the context, use arrow functions, or bind the object using <code>bind</code>.
</p>

<p class="info info--blue">
  The most popular classic HOFs in JS are array methods (<code>map</code>, <code>filter</code>, <code>reduce</code>, <code>forEach</code>, <code>some</code>, <code>every</code>), timers (<code>setTimeout</code>, <code>setInterval</code>), and DOM event listeners like <code>addEventListener</code>.
</p>

<hr />

<p class="deep-dive">Deep Dive</p>

<h4>HOFs in Ecosystem Patterns (React / Redux / Node.js)</h4>
<p>In real-world projects and libraries, higher-order functions are the foundation of powerful patterns, such as <span class="accent">Higher-Order Components (HOC)</span> in React (a function taking a component and returning a new one) or middlewares in Express and Redux. For instance, the <code>connect()</code> method in Redux is a function that returns another function, which then wraps your UI component.</p>

<h4>Decorators and Memoization</h4>
<p>An advanced but very practical example of creating a HOF is implementing a decorator, such as memoization (giving a function "memory" for heavy calculations).</p>
<code class="code">
  function memoize(fn) {
    const cache = new Map();
    // Return a new wrapper function that encloses the cache in a closure
    return function(...args) {
      const key = JSON.stringify(args);
      if (cache.has(key)) {
        return cache.get(key); // Return from cache, without calling the heavy original function
      }
      const result = fn(...args);
      cache.set(key, result);
      return result;
    };
  }

  const expensiveCalc = memoize((num) => {
    console.log('Computing...');
    return num * 1000;
  });

  expensiveCalc(10); // Prints 'Computing...', returns 10000
  expensiveCalc(10); // Prints nothing, returns 10000 directly from the Map cache
</code>

<h4>Connection to Execution Context and Closures</h4>
<p>When a HOF calls <code>return function() {...}</code>, the returned inner function "remembers" variables from its parent environment (Lexical Environment) where it was created. This is exactly what the <span class="accent">Closure</span> mechanism is.</p>
<p>Even when the outer (parent) function has finished running and its Execution Context is removed from the Call Stack, the returned function will still have access to the HOF's variables via the hidden internal property <code>[[Environment]]</code>. This is exactly why private counters and caches (like in the memoize function above) work — this cache lives in memory managed by the Garbage Collector, saved from deletion by the active closure.</p>
