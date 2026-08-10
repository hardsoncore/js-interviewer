
<h3>What async/await is</h3>
<p><span class="accent">async/await</span> is syntactic sugar over promises, introduced in <strong>ES2017 (ES8)</strong>. There is no new mechanics here: under the hood it is the same promises and microtasks. The point is readability: asynchronous code is written like synchronous code — linear, top to bottom.</p>

<p class="info"><strong>Key idea:</strong> <code>await</code> does not block the thread. It suspends only its own async function, while the engine runs other code in the meantime; once the promise settles, the function resumes from the same spot.</p>

<h3>What problem they solve</h3>
<p>Promises freed us from Callback Hell, but long <code>.then()</code> chains created noise of their own: each step has its own scope, so passing a value from the first step to the third means piling up nesting or outer variables. Conditions and loops in the middle of a chain look even heavier.</p>
<p>With async/await the result simply lands in a constant, and from there the familiar <code>if</code>, loops and <code>try/catch</code> just work.</p>

<h3>How the two keywords work</h3>
<ul>
  <li><strong>async</strong> before a function guarantees one thing: it always returns a promise. Even <code>return 1</code> is implicitly wrapped into <code>Promise.resolve(1)</code>, and a thrown error becomes a rejected promise.</li>
  <li><strong>await</strong> suspends the function until the promise on its right settles, and returns its result. If the promise is rejected — <code>await</code> throws that error as a regular exception.</li>
</ul>

<p class="info info--blue">Formula: <strong>async</strong> — always a promise on the outside, <strong>await</strong> — an unwrapped value on the inside. <code>await</code> can only be used inside an async function (and at the top level of an ES module).</p>

<code class="code">
  async function getUser() {
    try {
      const response = await fetch('/api/user');
      const user = await response.json();
      return user;                      // from outside this is Promise.resolve(user)
    } catch (error) {
      console.error('Error:', error);   // catches a reject from any await above
    } finally {
      hideSpinner();                    // runs in any case
    }
  }
</code>

<h3>Error handling: try...catch...finally</h3>
<p>A promise reject turns into an exception, so instead of a <code>.catch()</code> on every step, a single <code>try/catch</code> around several <code>await</code>s is enough. The <code>finally</code> block is the place for "in any case" code: hide the spinner, release resources.</p>

<h3>The main pitfall: accidental sequencing</h3>
<p class="info info--orange">Every <code>await</code> waits for the previous one to finish. Two independent requests written with <code>await</code> one after another will run sequentially and take the total time. Run independent operations in parallel: <code>const [a, b] = await Promise.all([getA(), getB()])</code>.</p>

<p class="deep-dive">Deep Dive</p>

<h3>Under the hood: the pause is a microtask</h3>
<p>Physically there is no "pause" at all. When the engine hits <code>await</code>, it slices the function: everything that follows is packed into a continuation and subscribed to the promise — essentially a hidden <code>.then()</code>. The function itself returns control immediately, and the continuation lands in the microtask queue once the promise settles. That is why output-order puzzles with <code>await</code> are solved by the same Event Loop rules as with <code>.then()</code>.</p>
<code class="code">
  async function f() {
    console.log('2');
    await null;        // even awaiting a non-promise goes through microtasks
    console.log('4');
  }

  console.log('1');
  f();                 // runs synchronously up to the first await
  console.log('3');
  // 1, 2, 3, 4
</code>
<p>Conceptually an async function is a state machine on top of a generator: before ES2017 the same pattern was assembled by hand from generators and the co library, and Babel still transpiles async/await this way for older environments.</p>

<h3>Awaiting anything: thenable</h3>
<p><code>await</code> accepts any value. A non-promise is wrapped into <code>Promise.resolve()</code>, and an object with a <code>.then()</code> method (a <strong>thenable</strong>) is awaited like a real promise — which is why <code>await</code> is compatible with old promise libraries like Bluebird or jQuery Deferred.</p>

<h3>A forgotten await — a floating promise</h3>
<p>Calling an async function without <code>await</code> and without <code>.catch()</code> does not suspend execution, and its reject becomes an unhandled rejection: an outer <code>try/catch</code> will not catch it, and in Node.js the process exits with an error. Such "floating promises" are caught with a linter — the <code>no-floating-promises</code> rule in typescript-eslint.</p>

<h3>return await: when it is not redundant</h3>
<p>Outside of <code>try</code> there is almost no difference: <code>return promise</code> and <code>return await promise</code> give the same result. But inside <code>try</code> the difference is fundamental: <code>return promise</code> exits the function immediately, and that promise's reject will never reach the function's own <code>catch</code>; <code>return await</code> waits for the result and catches the error right there.</p>

<h3>Top-level await and Node.js</h3>
<p><code>await</code> at the top level of a module — without wrapping it in an async function — was standardized in ES2022 and works only in ES modules; in CommonJS it is a syntax error. In Node.js, async/await itself appeared in 7.0 behind the <code>--harmony-async-await</code> flag and was enabled by default since 7.6 (2017), while top-level await has been available without flags since 14.8. A nuance: a module with top-level await delays the execution of every module that imports it.</p>

<h3>Asynchronous loops: for await...of</h3>
<p>For iterating over asynchronous sources — streams, paginated APIs — there is <code>for await...of</code> (ES2018), which works through <code>Symbol.asyncIterator</code>. Both a regular loop with <code>await</code> inside and <code>for await...of</code> process items strictly sequentially: for rate limiting that is exactly what you want, while for independent items it is the same performance pitfall from the core section.</p>
