
<h3>What a Promise is</h3>
<p>A <span class="accent">Promise</span> is an object that wraps the result of an asynchronous operation; it appeared in <strong>ES6 (2015)</strong>. It links the "producing" code, which needs time to do its work, with the "consuming" code, which needs the result: subscribe via <code>.then()</code> and you get the value as soon as it is ready.</p>

<p class="info"><strong>Key idea:</strong> a promise gives control back to the caller. With a callback we hand our function to someone else's code and hope it will be called once and on time. A promise, in contrast, is returned to us as an ordinary value — and we subscribe to it ourselves.</p>

<h3>What problem they solved</h3>
<p>Before ES6, asynchrony lived on callbacks alone. One task was fine, but dependent tasks had to be nested inside one another, and the code grew sideways like a tree — <strong>Callback Hell</strong>, also known as the <strong>Pyramid of Doom</strong>. Worse than the nesting was something else: error handling was duplicated at every level through <code>if (err)</code>, and one forgotten check silently swallowed the failure.</p>
<p>Promises straightened out both: nesting became a flat chain, and errors moved into a single channel — one <code>.catch()</code> at the end catches a failure from any step.</p>

<code class="code">
  const promise = new Promise((resolve, reject) =&gt; {
    // the executor function, runs immediately
    setTimeout(() =&gt; resolve('data'), 1000);
  });

  promise
    .then((data) =&gt; console.log(data))  // 'data'
    .catch((err) =&gt; console.log(err));
</code>

<h3>Three states</h3>
<p>A promise is a state machine with exactly three states:</p>
<ul>
  <li><strong>pending</strong> — the initial one: the operation has started, there is no result yet;</li>
  <li><strong>fulfilled</strong> — <code>resolve(value)</code> was called, the <code>.then()</code> handlers run;</li>
  <li><strong>rejected</strong> — <code>reject(error)</code> was called, <code>.catch()</code> runs.</li>
</ul>

<img src="assets/img/promise.jpg">

<h3>The result is frozen forever</h3>
<p>A promise leaves <code>pending</code> only once and becomes <strong>settled</strong>. After that its state and value are immutable: repeated calls to <code>resolve</code> or <code>reject</code> are simply ignored.</p>

<p class="info info--orange">That is why a promise is not a replacement for events: an event fires many times, a promise exactly once. On the other hand, you cannot be "too late" for a settled promise: subscribe even an hour later and <code>.then()</code> immediately hands you the stored result.</p>

<h3>then, catch, finally</h3>
<ul>
  <li><code>.then(onFulfilled, onRejected)</code> — handlers for success and, as the second argument, for an error;</li>
  <li><code>.catch(onRejected)</code> — errors only; it is sugar over <code>.then(null, onRejected)</code>;</li>
  <li><code>.finally(onFinally)</code> — runs in any case and receives no arguments: the place to "hide the spinner", not to inspect the result.</li>
</ul>

<p class="info info--blue">All three methods return a <strong>new</strong> promise — that is where chains come from, and why <code>.catch()</code> can intercept an error from any previous step.</p>

<p class="deep-dive">Deep Dive</p>

<h3>What runs when</h3>
<p>The executor runs <strong>synchronously</strong>, right at the moment of <code>new Promise</code> — a promise is not lazy, you cannot defer its start. The <code>.then/.catch/.finally</code> callbacks, however, always go into the <strong>microtask</strong> queue and run only after the stack is empty.</p>
<code class="code">
  console.log('1');
  const p = new Promise((resolve) =&gt; {
    console.log('2');       // synchronously, inside the executor
    resolve();
  });
  p.then(() =&gt; console.log('4'));
  console.log('3');

  // 1, 2, 3, 4
</code>
<p>Hence a practical consequence: <code>.then()</code> is called asynchronously even on an already settled promise. The specification forbids "sometimes synchronous, sometimes not" — the order must always be predictable.</p>

<h3>Inversion of control — the main sin of callbacks</h3>
<p>Handing a callback to someone else's function means trusting it with everything: whether it will call the callback at all, whether it will call it twice, whether it will pass the error along, whether it will call it synchronously. A promise takes that trust back into the specification: it guarantees a single call, asynchrony and an immutable result. That is why promises are not merely "prettier", but more reliable.</p>

<h3>What exactly is "frozen"</h3>
<p>The state and the <em>reference</em> to the value are immutable. If a promise resolved with an object, that object stays mutable — <code>result.name = 'new'</code> works, and every subscriber sees the change. The promise guarantees the identity of the value, not its immutability.</p>

<h3>Thenable: why promises are compatible with everything</h3>
<p>A promise treats any object with a <code>.then(resolve, reject)</code> method as a promise — this is called a <strong>thenable</strong>. If you return such an object from <code>.then()</code>, the engine subscribes to it and waits on its own. Thanks to this, native promises seamlessly accepted objects from older libraries (Q, Bluebird, jQuery Deferred).</p>

<h3>Shortcut constructors and promisification</h3>
<p><code>Promise.resolve(value)</code> and <code>Promise.reject(error)</code> create an already settled promise without an executor — handy for stubs in tests, for caches and for coercing a value into a promise. The reverse operation is <strong>promisification</strong>: wrapping an old callback-based API into a promise.</p>
<code class="code">
  const delay = (ms) =&gt; new Promise((resolve) =&gt; setTimeout(resolve, ms));

  const readFile = (path) =&gt; new Promise((resolve, reject) =&gt; {
    fs.readFile(path, (err, data) =&gt; err ? reject(err) : resolve(data));
  });
</code>

<h3>Unhandled rejections</h3>
<p>If a rejected promise has no error handler at all, the engine reports it separately: in the browser it is the <code>unhandledrejection</code> event on <code>window</code>, and in Node.js since version 15 the process exits with a non-zero code. An error inside a promise does not bubble into an ordinary <code>try/catch</code> outside — only inside <code>async/await</code>.</p>

<p class="info info--orange">An error thrown inside the executor automatically turns into a <code>reject</code>. But only synchronously: a <code>throw</code> inside a <code>setTimeout</code> in the executor body will not reject the promise — it flies off to the global handler, and the promise stays in <code>pending</code> forever.</p>

<h3>What a promise does not have</h3>
<ul>
  <li><strong>Cancellation.</strong> A promise cannot stop an operation that has started; for that there is a separate <code>AbortController</code>, which is passed into <code>fetch</code>.</li>
  <li><strong>Progress.</strong> There are no intermediate notifications — only the final result. If you need a stream of values, that is an Observable from RxJS.</li>
  <li><strong>Laziness.</strong> The work starts at the moment of creation, not on subscription.</li>
</ul>

<h3>Historical note</h3>
<p>Promises were not invented in ES6 — they were standardized. The idea came from languages of the 70s and 80s (futures), and in JS it matured in libraries: Q, when.js, Bluebird and the community agreement <strong>Promises/A+</strong>, which became the basis of the specification. jQuery Deferred taught a separate lesson: its <code>.then()</code> did not follow A+ (it neither caught exceptions nor unwrapped thenables), so chains behaved differently — jQuery was brought into line only in version 3.</p>
