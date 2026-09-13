<h3>Observable — what it is</h3>
<p>An <span class="accent">Observable</span> is an object that wraps a function which, over time, hands the subscriber zero, one, or any number of values. Put simply, it is a stream of data: clicks, server responses, form field values. On its own it does nothing: it is only a description of what will happen once someone subscribes.</p>

<p class="info"><strong>Main idea:</strong> an Observable is lazy — a function sits inside it, and <code>subscribe()</code> merely calls that function. Everything else follows from this: no subscription means no work, every new subscription runs that function from scratch, and to stop it you have to close the subscription.</p>

<h3>The contract: next, error, complete</h3>
<p>An Observable talks to its subscriber through three signals:</p>
<ul>
  <li><code>next(value)</code> — emit a value, any number of calls;</li>
  <li><code>error(err)</code> — an error, the stream ends, no more values will arrive;</li>
  <li><code>complete()</code> — the stream finished normally, no value is passed.</li>
</ul>
<p><code>error</code> and <code>complete</code> are mutually exclusive and arrive at most once — that is the end of the subscription's life.</p>
<code class="code">
  const obs = new Observable((subscriber) =&gt; {
    subscriber.next(1);

    setTimeout(() =&gt; {
      subscriber.next(2);
      subscriber.complete(); // anything after this is ignored
    }, 500);
  });

  const sub = obs.subscribe({
    next: (v) =&gt; console.log(v),
    error: (e) =&gt; console.log('Error:', e),
    complete: () =&gt; console.log('Done'),
  });
</code>
<p>You rarely write them by hand with <code>new Observable</code> — usually you take ready-made ones: <code>of</code>, <code>from</code>, <code>fromEvent</code>, <code>HttpClient</code> requests, a form's <code>valueChanges</code>.</p>

<h3>How it differs from a Promise</h3>
<ul>
  <li><strong>Laziness:</strong> a promise starts the moment it is created, an Observable only on subscription.</li>
  <li><strong>Number of values:</strong> a promise delivers exactly one and fixes it forever, an Observable is a stream of values until it completes.</li>
  <li><strong>Cancellation:</strong> a subscription can be closed and the work interrupted, a promise cannot be cancelled.</li>
  <li><strong>Composition:</strong> a stream has <code>pipe()</code> with operators — filtering, transformation, combining streams.</li>
</ul>

<h3>Subscription and unsubscribing</h3>
<p><code>subscribe()</code> returns a <code>Subscription</code> object — a handle on the running execution, with an <code>unsubscribe()</code> method. It stops the work and releases the resources.</p>
<p>Streams that reach <code>complete()</code> on their own (an <code>HttpClient</code> request) close themselves. Infinite ones — <code>fromEvent</code>, <code>interval</code>, <code>valueChanges</code> — will never complete, so unsubscribing is on us.</p>

<p class="info info--orange">A forgotten subscription is a memory leak: its callback keeps a reference to a destroyed component, and every return to the page adds one more living subscriber. In Angular you close them with the <code>async</code> pipe in the template or the <code>takeUntilDestroyed()</code> operator.</p>

<p class="deep-dive">Deep Dive</p>

<h3>What an Observable is under the hood</h3>
<p>The <code>Observable</code> class is essentially an object with a single field: the function passed to its constructor. The <code>subscribe()</code> method creates a <code>Subscriber</code> object (a safe wrapper around your observer) and calls that function with it. There is no registry of subscribers inside — which is why one Observable knows nothing about its other subscriptions.</p>
<p>The subscribe function may return a <strong>teardown</strong> — a cleanup function that RxJS calls on <code>unsubscribe()</code>, <code>complete()</code>, or <code>error()</code>. This is exactly how real resources get released:</p>
<code class="code">
  const timer$ = new Observable((subscriber) =&gt; {
    const id = setInterval(() =&gt; subscriber.next(Date.now()), 1000);

    return () =&gt; clearInterval(id); // called on unsubscribe
  });
</code>
<p>The Subscriber also guarantees the contract: after <code>complete()</code> or <code>error()</code> it silences every further <code>next()</code> call, even if the original function keeps making them.</p>

<h3>Cold and hot streams, unicast</h3>
<p>A regular Observable is <strong>cold</strong> and <strong>unicast</strong>: the producer function lives inside it, so every subscription runs it from scratch and gets its own set of values. Two subscribers on one <code>http.get()</code> means two real HTTP requests.</p>
<p>A <strong>hot</strong> stream is one whose source lives outside and is shared by everyone: <code>fromEvent(document, 'click')</code> or any <code>Subject</code>. Subscribers share a single execution and receive only the values emitted after they subscribed.</p>
<p>You can turn a cold stream into a hot one with multicasting operators: <code>share()</code> — one shared subscription while at least one subscriber is present; <code>shareReplay(1)</code> — the same, but new subscribers immediately get the last value (a common way to cache a server response).</p>

<h3>Operators and pipe</h3>
<p>An operator is a pure function that takes an Observable and returns a <strong>new</strong> Observable. The source stream is not mutated, so a <code>pipe(map(...), filter(...))</code> chain is simply wrappers nested inside one another.</p>
<p>Here is how it works: subscribing to the resulting stream cascades subscriptions downwards, all the way to the source, and the values travel back up through the operators' callbacks. That is why <code>pipe()</code> by itself executes nothing — without <code>subscribe()</code> the chain is dead.</p>

<p class="info info--blue">A common code review finding: someone calls <code>http.get(...).pipe(tap(...))</code> and wonders why the request never went out. As long as there is no subscription, there is no request.</p>

<h3>Synchronicity and execution order</h3>
<p>An Observable is not required to be asynchronous. <code>of(1, 2, 3).subscribe(...)</code> runs fully synchronously, before the next line of code. A promise can never do that: <code>.then()</code> is always deferred to the microtask queue.</p>
<code class="code">
  console.log('start');
  of(1).subscribe((v) =&gt; console.log(v));
  Promise.resolve(2).then((v) =&gt; console.log(v));
  console.log('end');

  // start, 1, end, 2
</code>
<p>The timing is set by the source or the scheduler: <code>of</code> is synchronous, <code>timer</code> and <code>interval</code> use timers, and the <code>observeOn(asyncScheduler)</code> operator forces the stream into asynchronous mode.</p>

<h3>Errors end the stream for good</h3>
<p>After <code>error</code> the subscription is dead — you cannot "resume" it, you can only subscribe again. That is why errors are handled by operators inside <code>pipe()</code>: <code>catchError</code> substitutes a fallback stream for the failed one, <code>retry(n)</code> resubscribes to the source from scratch.</p>
<p class="info info--orange">In RxJS 7 an error in a stream with no handler is not swallowed — it is thrown outwards as an unhandled exception. There will be no silent failure, but the subscription will not recover either.</p>

<h3>Historical note</h3>
<p>The positional form <code>subscribe(next, error, complete)</code> was deprecated in RxJS 6.4 and will be removed in version 8 — pass an observer object instead. The idea itself comes from the Observer pattern of the "Gang of Four", and Observable is currently being standardised: Chromium-based browsers have shipped a native DOM method <code>element.when()</code> that hands you events as an Observable already.</p>
