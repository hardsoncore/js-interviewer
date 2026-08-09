
<h3>What a chain is</h3>
<p><span class="accent">Promise chaining</span> is a sequence of asynchronous steps where each next one starts after the previous and receives its result. This works because <code>.then()</code>, <code>.catch()</code> and <code>.finally()</code> return a <strong>new</strong> promise, not the same one.</p>

<p class="info"><strong>Main idea:</strong> to answer the question — yes, both variants are legal. A chain is a conveyor of identical links, so the methods can be combined in any order and as many times as you like.</p>

<h3>The conveyor rule</h3>
<p>The state of the next promise is determined by what the handler of the current link did:</p>
<ul>
  <li>returned a value → the next promise is <strong>fulfilled</strong> with that value;</li>
  <li>threw an exception → the next one is <strong>rejected</strong>;</li>
  <li>returned a promise → the chain waits for it and takes its result;</li>
  <li>returned nothing → fulfilled with the value <code>undefined</code>.</li>
</ul>

<code class="code">
  fetch(url)
    .then((res) =&gt; res.json())    // returned a promise — the chain will wait for it
    .then((data) =&gt; data.items)   // returned a value — it travels further
    .then((items) =&gt; console.log(items));
</code>

<h3>promise.catch().then() — the chain recovers</h3>
<p>An error skips past every <code>.then()</code> down to the nearest <code>.catch()</code>. But <code>.catch()</code> is an ordinary link of the conveyor: if its handler ran and threw nothing itself, it returns a <strong>fulfilled</strong> promise. The chain returns to the «green» path and continues.</p>

<code class="code">
  Promise.resolve()
    .then(() =&gt; { throw new Error('failure'); })
    .then(() =&gt; console.log('skipped'))       // skipped: the promise is rejected
    .catch(() =&gt; console.log('caught'))       // caught → fulfilled again
    .then(() =&gt; console.log('moving on'));    // will run

  // caught
  // moving on
</code>

<h3>promise.then().finally().then() — a transparent link</h3>
<p>The <code>.finally()</code> method is designed to be completely transparent. It takes no arguments — inside it you do not know whether this is a success or an error — and it passes the result or the error through itself further down the chain. Its own <code>return</code> is ignored.</p>

<p class="info info--blue">That is why the second <code>.then()</code> receives the result of the first one, as if <code>finally</code> were not in the chain at all. It is the place to «hide the spinner», not to change the data.</p>

<p class="info info--orange">Two classic traps. A forgotten <code>return</code> inside <code>.then()</code>: without it the next link will not wait for the nested promise and will receive <code>undefined</code>. And believing that <code>finally</code> swallows an error: it does not, the rejection travels further and you still have to catch it with <code>.catch()</code>.</p>

<p class="deep-dive">Deep Dive</p>

<h3>Chaining versus branching</h3>
<p>A new promise on every link exists precisely so that the steps do not interfere with each other. If instead of a chain you attach several handlers to one promise, that is no longer a conveyor but <strong>branching</strong>: all subscribers receive the same original result, not the result of their neighbour.</p>
<code class="code">
  const p = Promise.resolve(1);

  p.then((v) =&gt; v + 1);
  p.then((v) =&gt; console.log(v)); // 1, not 2

  p.then((v) =&gt; v + 1)
   .then((v) =&gt; console.log(v)); // 2
</code>
<p>The danger of branching is lost errors: each branch has its own tail, and a <code>.catch()</code> at the end of one branch knows nothing about a failure in another.</p>

<h3>The error does not teleport</h3>
<p>It looks as if a rejection «jumps» to <code>.catch()</code>, but in fact it passes through every link. <code>.then(onFulfilled)</code> has no second handler, so such a link simply hands the rejection further along unchanged. <code>.catch(f)</code> itself is syntactic sugar for <code>.then(null, f)</code> — there is no separate magic in it.</p>

<h3>then(f, g) versus then(f).catch(g)</h3>
<p>The forms look alike but catch different things. The second argument of <code>.then()</code> handles only the error of the <em>previous</em> promise — it will not catch an exception from <code>f</code> itself, because <code>f</code> and <code>g</code> live in the same link. A separate <code>.catch()</code> stands as the next link and therefore catches both.</p>
<code class="code">
  // an error from f is NOT caught
  promise.then(f, g);

  // an error from f is caught
  promise.then(f).catch(g);
</code>
<p class="info info--blue">A practical rule: <code>.then(f, g)</code> is appropriate only when you need to separate handling of a step's own error from the error of its predecessor. In all other cases — <code>.catch()</code> at the end of the chain.</p>

<h3>An error inside catch</h3>
<p>An error handler is ordinary code too, and it can also throw an exception or deliberately rethrow the error further with <code>throw err</code>. Then the chain becomes rejected again, and it will be caught by the next <code>.catch()</code>. Hence the idiom «catch, log, rethrow»: <code>.catch((e) =&gt; { log(e); throw e; })</code>.</p>

<h3>How finally works under the hood</h3>
<p>The transparency of <code>finally</code> is not a separate mechanism but an ordinary <code>.then()</code> with two handlers that restore the previous result:</p>
<code class="code">
  promise.finally(cb);

  // roughly equivalent to
  promise.then(
    (v) =&gt; Promise.resolve(cb()).then(() =&gt; v),
    (e) =&gt; Promise.resolve(cb()).then(() =&gt; { throw e; })
  );
</code>
<p>Two non-obvious consequences follow from this. If <code>cb</code> returns a promise, the chain <strong>will wait</strong> for it — what is ignored is the value, not the execution time. And if <code>cb</code> throws an error or returns a rejected promise, the original result will after all be overridden by this new error: transparency works only up to the first failure inside <code>finally</code> itself.</p>

<h3>Unwrapping a promise costs ticks</h3>
<p>When <code>.then()</code> returns a value, the next handler joins the microtask queue immediately. When it returns a promise, the engine first has to subscribe to it and wait — this adds <strong>two extra microtask ticks</strong>. In interviews this shows up in output-order puzzles where two parallel chains interleave in something other than one-to-one fashion.</p>
<code class="code">
  Promise.resolve().then(() =&gt; console.log(1))
    .then(() =&gt; console.log(3))
    .then(() =&gt; console.log(5));

  Promise.resolve().then(() =&gt; console.log(2))
    .then(() =&gt; console.log(4))
    .then(() =&gt; console.log(6));

  // 1 2 3 4 5 6 — the links interleave, tick by tick
</code>

<h3>Returning a «raw» value from an async function</h3>
<p>The unwrapping rule works in <code>async/await</code> too: <code>return somePromise</code> inside an async function does not hand out a promise inside a promise — the engine unwraps the nested one and returns a single-level promise. Promises do not nest at all: <code>Promise.resolve(promise)</code> gives back the very same object.</p>

<h3>How a chain differs from await</h3>
<p><code>async/await</code> is the same conveyor, simply written linearly: <code>await</code> subscribes to a promise, while ordinary <code>try/catch/finally</code> play the roles of <code>.catch()</code> and <code>.finally()</code>. The difference is practical: in a chain the intermediate results live only in the handlers' arguments, so a value from the first step is not visible in the fourth — you have to carry it along in an object or nest the <code>.then()</code> calls. In the <code>await</code> version all steps share one scope, and the problem disappears by itself.</p>
