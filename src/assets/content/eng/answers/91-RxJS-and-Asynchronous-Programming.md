<h3>Introduction</h3>
<p><span class="accent">Reactive programming</span> is a paradigm where data is represented as asynchronous streams, and the code declaratively describes reactions to new values. <span class="accent">RxJS</span> (Reactive Extensions for JavaScript) is the main implementation of this paradigm in JS: a library built on the Observer pattern.</p>

<p class="info"><strong>Key idea:</strong> everything that happens over time — clicks, input, HTTP responses, websockets — can be described with a single "stream of values" interface and handled uniformly: subscribe, transform with operators, unsubscribe.</p>

<h3>Streams and push vs pull</h3>
<p>A <span class="accent">stream</span> is a sequence of events ordered in time. It can emit a value, an error, or a completion signal.</p>
<p>The key to understanding is who decides when the data arrives. Calling a function or an iterator is <strong>pull</strong>: the consumer "pulls" the value itself. Promise and Observable are <strong>push</strong>: the producer "pushes" data to the subscriber. What sets Observable apart from Promise: it can emit any number of values, it is lazy (does nothing until subscribed), and the subscription can be cancelled.</p>

<h3>Problems RxJS solves</h3>
<ul>
  <li><strong>Multiple values:</strong> a Promise delivers a result once, an Observable delivers continuously (mouse coordinates, chat messages).</li>
  <li><strong>Cancellation:</strong> <code>unsubscribe()</code> aborts the work — for example, a pending HTTP request.</li>
  <li><strong>Composition:</strong> dozens of ready-made operators for filtering, transforming and combining streams.</li>
  <li><strong>State:</strong> <code>BehaviorSubject</code> holds the current value and reactively distributes it to subscribers.</li>
</ul>

<h3>Basic entities</h3>
<ul>
  <li><code>Observable</code> — the data stream itself; does nothing until someone subscribes.</li>
  <li><code>Observer</code> — the consumer: an object with <code>next</code>, <code>error</code>, <code>complete</code> methods.</li>
  <li><code>Subscription</code> — the result of <code>subscribe()</code>; used to unsubscribe.</li>
  <li><code>Subject</code> — an Observable and an Observer at the same time: broadcasts to many subscribers (multicast).</li>
</ul>

<h3>Operators and pipe()</h3>
<p><span class="accent">Operators</span> are pure functions for manipulating a stream, chained together with the <code>pipe()</code> method. The classic example is search with autocomplete:</p>
<code class="code">
  fromEvent(input, 'input').pipe(
    map(e =&gt; e.target.value),
    filter(text =&gt; text.length &gt; 2),
    switchMap(text =&gt; this.http.get(`/api?q=${text}`)) // cancels the previous request
  ).subscribe(showResults);
</code>
<p>Main families: creation (<code>of</code>, <code>from</code>, <code>fromEvent</code>), transformation (<code>map</code>), filtering (<code>filter</code>, <code>takeUntil</code>), higher-order (<code>switchMap</code>, <code>mergeMap</code>), combination (<code>combineLatest</code>, <code>forkJoin</code>).</p>

<p class="info info--orange">Common mistake: subscribing without unsubscribing — a memory leak. In Angular prefer the <code>async</code> pipe in the template or <code>takeUntil</code> / <code>takeUntilDestroyed</code> instead of manual <code>unsubscribe()</code>.</p>

<p class="deep-dive">Deep Dive</p>

<h3>The pull/push matrix</h3>
<ul>
  <li><strong>Function</strong> — pull, single value: call it — get it.</li>
  <li><strong>Iterator / generator</strong> — pull, multiple values: the consumer pulls one at a time via <code>next()</code>.</li>
  <li><strong>Promise</strong> — push, single value: the producer calls the callback itself, but exactly once.</li>
  <li><strong>Observable</strong> — push, multiple values: it fills the empty cell of the matrix, and that is why RxJS exists.</li>
</ul>

<h3>Laziness and unicast</h3>
<p>A plain Observable is "cold": the data producer is created anew on every subscription, and each subscriber gets its own independent stream. A Subject is "hot": it broadcasts regardless of subscriptions, and everyone listens to the same source. This is a big separate topic (Observable vs Subject).</p>

<h3>Why declarative code is more reliable</h3>
<p>In the imperative version, autocomplete requires manual flags: "is a request in flight", "is the response stale", "how long since the last keystroke". In the reactive version, all intermediate state lives inside the stream, and the code describes only the relationships between business-logic events. There is less code, and there is nowhere in it to forget to reset a flag.</p>

<h3>RxJS in Angular</h3>
<ul>
  <li><code>HttpClient</code> returns a cold Observable: the request is sent only after subscription.</li>
  <li><code>Router.events</code>, <code>ActivatedRoute.params</code>, reactive forms' <code>valueChanges</code> — all streams.</li>
  <li>The <code>async</code> pipe subscribes, unsubscribes when the component is destroyed and triggers change detection.</li>
</ul>

<h3>Scheduler and a bit of history</h3>
<p>A <code>Scheduler</code> controls when and in what context a subscription executes (synchronously, microtask, macrotask, animation frame) — rarely used, but handy in tests (marble testing with virtual time).</p>
<p>RxJS is a port of ReactiveX: the concept was born in Rx.NET (Erik Meijer, Microsoft) and then spread as RxJava, RxSwift and others. That is why the API is recognizable across platforms.</p>
