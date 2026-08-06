
<h3>Why we need the Event Loop</h3>
<p><span class="accent">The Event Loop</span> is an endless dispatcher loop that decides which piece of code to send into the single JS thread next. JavaScript itself is single-threaded: as long as there is at least one function in the Call Stack, nothing else can run. Long operations (timers, network, events) are handed off by the engine to the environment's Web APIs, and the Event Loop brings their callbacks back once the stack is free.</p>

<p class="info"><strong>Key idea:</strong> asynchrony in JS is not parallelism, it is ordering. No callback can interrupt running code — it waits until the stack becomes empty.</p>

<h3>The participants</h3>
<ul>
  <li><strong>Call Stack</strong> — what is executing right now, works as LIFO. While it is not empty, the loop is blocked.</li>
  <li><strong>Web APIs</strong> — background tools of the environment (timers, <code>fetch</code>, DOM events). Once done, they put the callback into a queue and forget about it — they do not keep queues inside themselves.</li>
  <li><strong>Microtask Queue</strong> — promise callbacks (<code>.then</code>, <code>.catch</code>, <code>.finally</code>), continuations after <code>await</code>, <code>queueMicrotask</code>. Higher priority than macrotasks.</li>
  <li><strong>Macrotask Queue</strong> — <code>setTimeout</code> and <code>setInterval</code> callbacks, UI events (clicks, scroll), I/O.</li>
</ul>

<h3>The algorithm of a single tick</h3>
<ol>
  <li>Run the synchronous code until the Call Stack is empty.</li>
  <li>Run <strong>ALL</strong> microtasks in a row — including those added during this very step.</li>
  <li>Render a frame if needed (Style → Layout → Paint, usually ~60 times per second).</li>
  <li>Take <strong>ONE</strong> task from the macrotask queue and run it.</li>
  <li>Repeat from step 1.</li>
</ol>

<p class="info info--blue"><strong>The interview formula:</strong> all synchronous code → ALL microtasks → render → ONE macrotask → repeat.</p>

<h3>The classic output-order puzzle</h3>
<code class="code">
  console.log('1');
  setTimeout(() =&gt; console.log('2'), 0);
  Promise.resolve().then(() =&gt; console.log('3'));
  console.log('4');

  // 1, 4, 3, 2
</code>
<p><code>setTimeout(fn, 0)</code> does not mean "run immediately": the callback goes into the macrotask queue and waits until the stack is empty and the entire microtask queue is drained.</p>

<p class="info info--orange">Microtasks that endlessly spawn themselves (a <code>.then</code> that resolves another promise) freeze the page completely: rendering and macrotasks will never get control, because the microtask queue must be drained to the very end.</p>

<img src="assets/img/event-loop.png">

<p class="deep-dive">Deep Dive</p>

<h3>Heap and why the stack is "cheap"</h3>
<p><strong>Heap</strong> is a large unstructured memory area for reference types (objects, arrays, functions). The Call Stack holds only execution contexts and primitives, which is why it is compact, fast and has a fixed size — with too deep a recursion you get <code>RangeError: Maximum call stack size exceeded</code>.</p>

<h3>What the specification does not have</h3>
<p>The term "macrotask" does not exist in the HTML standard — it defines <strong>task queues</strong> and <strong>task sources</strong> (timers, DOM events, networking, history, etc.). There are actually several queues, and the browser itself decides which source to take the next task from — so two <code>setTimeout</code> callbacks and a click are not obliged to run in insertion order. The microtask queue, in contrast, is exactly one and is drained strictly FIFO.</p>

<p class="info info--blue">Promises are part of the language (ECMAScript), not a Web API. That is why microtasks are queued by the JS engine itself, and the browser only drains the queue (a microtask checkpoint) between tasks. For the same reason microtasks behave identically in the browser and in Node.js.</p>

<h3>Where rendering actually happens</h3>
<p>The "render a frame" step is tied not to every macrotask but to the monitor's vsync. The order inside a frame is:</p>
<ol>
  <li><code>requestAnimationFrame</code> callbacks;</li>
  <li>style recalculation and Layout;</li>
  <li>Paint and Composite.</li>
</ol>
<p>Hence the practical rule: <code>rAF</code> is the only place where it is safe to mutate the DOM for animation, because the changes land in exactly the next frame and cause no extra reflow. <code>requestIdleCallback</code>, on the contrary, runs in the leftover time of a frame and suits non-critical background work.</p>

<h3>Timer subtleties</h3>
<ul>
  <li>The delay in <code>setTimeout</code> is a <strong>minimum</strong> guarantee, not an exact time: if the stack is busy, the callback will be late.</li>
  <li>The specification requires clamping: starting from the fifth level of nested timers the minimum delay becomes 4 ms.</li>
  <li>In a background tab browsers throttle timers to 1000 ms and more to save battery.</li>
</ul>

<h3>async/await under the hood</h3>
<p>The code before the first <code>await</code> runs <strong>synchronously</strong>. <code>await</code> itself is syntactic sugar over <code>.then</code>: it schedules the rest of the function as a microtask and returns control outwards.</p>
<code class="code">
  async function f() {
    console.log('A');       // synchronous
    await null;             // exit point → the rest becomes a microtask
    console.log('B');
  }

  f();
  Promise.resolve().then(() =&gt; console.log('C'));
  console.log('D');

  // A, D, B, C
</code>
<p><code>await null</code> also creates a microtask: the value is wrapped into an already resolved promise. Hence the typical anti-pattern — <code>await</code> inside a loop: every iteration costs at least one trip through the microtask queue; collect the promises and hand them to <code>Promise.all</code> instead.</p>

<h3>Other sources of microtasks</h3>
<ul>
  <li><code>queueMicrotask(fn)</code> — schedule a microtask explicitly without creating a promise (cheaper and it does not swallow exceptions into a chain).</li>
  <li><code>MutationObserver</code> — DOM mutation callbacks are delivered as microtasks.</li>
  <li><code>IntersectionObserver</code>, on the contrary, works as a separate step of the render phase.</li>
</ul>

<h3>How Node.js differs</h3>
<p>In Node the event loop is implemented by libuv and split into phases: <em>timers</em> (<code>setTimeout</code>, <code>setInterval</code>) → <em>pending callbacks</em> → <em>poll</em> (I/O) → <em>check</em> (<code>setImmediate</code>) → <em>close callbacks</em>. The microtask queue is drained between phases, not only between tasks.</p>
<p>On top of that there is <code>process.nextTick</code> — a separate queue with priority <strong>higher</strong> than promises: it is drained before microtasks. The order of <code>setTimeout(fn, 0)</code> and <code>setImmediate(fn)</code> at the top level of a module is non-deterministic (it depends on whether the process managed to start within 1 ms), but inside an I/O callback <code>setImmediate</code> always fires first.</p>

<p class="info info--orange">Do not confuse the Event Loop with multithreading. Real parallelism in the browser is provided only by <strong>Web Workers</strong> — each has its own thread, its own stack and its own separate event loop, and they communicate via <code>postMessage</code>.</p>
