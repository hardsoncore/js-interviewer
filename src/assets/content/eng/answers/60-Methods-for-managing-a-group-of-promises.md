<h3>What problem do they solve?</h3>
<p><span class="accent">Promise combinators</span> are four static methods (<code>Promise.all</code>, <code>allSettled</code>, <code>race</code>, <code>any</code>) that take an iterable of promises and return a single combining promise. They are needed when several independent asynchronous tasks are better executed in parallel rather than with sequential <code>await</code>.</p>

<p class="info"><strong>Key idea:</strong> combinators don't start anything — a promise runs from the moment it is created. The methods merely subscribe to the group and differ in their aggregation policy: what to wait for (all or the first one) and what counts as an error.</p>

<h3>The four methods</h3>
<ul>
  <li><code>Promise.all</code> — "all or nothing": waits for all to succeed and returns an array of results in the order of the input array. The very first error instantly fails the whole method with that same reason. Use it when continuing makes no sense without every result.</li>
  <li><code>Promise.allSettled</code> (ES2020) — "wait for everyone": never rejects, returns an array of objects <code>{ status: 'fulfilled', value }</code> or <code>{ status: 'rejected', reason }</code>. For independent tasks where partial success is fine.</li>
  <li><code>Promise.race</code> — "who is faster": mirrors the outcome of the first settled promise — both success and error. The classic use case is a timeout: racing a request against a timer that rejects.</li>
  <li><code>Promise.any</code> (ES2021) — "first successful": ignores errors and waits for the first fulfilled one. If they all fail, it rejects with an <code>AggregateError</code>, where all the reasons live in the <code>errors</code> property.</li>
</ul>

<h3>Example</h3>
<code class="code">
  // both requests run in parallel, results follow the array order
  const [user, posts] = await Promise.all([
    fetchUser(id),
    fetchPosts(id),
  ]);

  const results = await Promise.allSettled([a, b, c]);
  const ok = results.filter(r => r.status === 'fulfilled');
</code>

<p class="info info--blue">Cheat sheet: you need all results and any failure is critical — <code>all</code>; you need all outcomes, including errors — <code>allSettled</code>; you need the first outcome (timeout) — <code>race</code>; you need the first success (fallback sources) — <code>any</code>.</p>

<p class="info info--orange">Trap: an error in <code>Promise.all</code> does <strong>not cancel</strong> the remaining promises — they keep running, their results are simply ignored. Promises have no cancellation mechanism at all; for real cancellation you need an <code>AbortController</code>.</p>

<p class="deep-dive">Deep Dive</p>

<h3>How to write Promise.all by hand</h3>
<p>The classic hands-on task that follows this question. Key details: store the result by index (not <code>push</code>) to preserve the order; wrap non-promises in <code>Promise.resolve</code>; forward the first reject immediately.</p>
<code class="code">
  function promiseAll(iterable) {
    return new Promise((resolve, reject) => {
      const results = [];
      let pending = 0;
      let index = 0;

      for (const item of iterable) {
        const i = index++;
        pending++;
        Promise.resolve(item).then(value => {
          results[i] = value; // by index — input order, not completion order
          if (--pending === 0) resolve(results);
        }, reject);
      }

      if (index === 0) resolve([]); // empty iterable
    });
  }
</code>

<h3>Behavior with an empty array</h3>
<ul>
  <li><code>Promise.all([])</code> — immediately fulfilled with <code>[]</code>.</li>
  <li><code>Promise.allSettled([])</code> — immediately fulfilled with <code>[]</code>.</li>
  <li><code>Promise.any([])</code> — immediately rejected with an <code>AggregateError</code>.</li>
  <li><code>Promise.race([])</code> — <strong>forever pending</strong>: a race with no participants never finishes. A source of rare hangs when the array of promises is built dynamically and turns out empty.</li>
</ul>

<h3>Non-promises and result order</h3>
<p>Elements of the iterable that are not promises (numbers, strings, plain objects) are wrapped in <code>Promise.resolve()</code> and count as instantly fulfilled. The order in the result array of <code>all</code> and <code>allSettled</code> always mirrors the input order, not the completion time — which makes it safe to destructure the result. In <code>any</code>, the order of <code>AggregateError.errors</code> also matches the input array.</p>

<h3>Timeout via race and real cancellation</h3>
<code class="code">
  const timeout = ms => new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Timeout')), ms));

  const data = await Promise.race([fetch(url), timeout(5000)]);
</code>
<p>Racing against a timer solves only half of the problem: the losing request keeps hanging on the network and consuming resources. For real cancellation, an <code>AbortController</code> signal is passed to <code>fetch</code>, and the modern shortcut <code>AbortSignal.timeout(5000)</code> replaces the hand-made timer and actually aborts the request.</p>

<h3>Parallelism and limiting it</h3>
<p>Combinators do not control the degree of parallelism: by the time you call them, all the promises are already running. With hundreds of tasks (say, file uploads), this "parallelism" hits the browser's limit on concurrent connections. Limiting it requires a pool: a library like p-limit or a hand-written pipeline that keeps no more than N tasks active at once.</p>

<p class="info info--blue">History: <code>all</code> and <code>race</code> come from ES6 (2015), <code>allSettled</code> — ES2020, <code>any</code> — ES2021. The latter two appeared as answers to real pains: "all fails entirely because of a single error" and "race catches the first error instead of the first success".</p>
