<h3>Introduction</h3>
<p><span class="accent">DOM (Document Object Model)</span> is the object model of the document: the browser parses HTML and builds a live tree of nodes from it, and JavaScript reads and modifies the page through this tree's API. "Live" means: change a node, and the browser repaints the page. <span class="accent">DOM events</span> are the mechanism for reacting to user and browser actions: click, input, scroll.</p>

<p class="info"><strong>Key idea:</strong> an event does not fire "at a point" — it travels a path through the tree: <strong>capturing → target → bubbling</strong>. Bubbling is the foundation of the main practical pattern — <strong>delegation</strong>: one handler on the parent instead of hundreds on the descendants.</p>

<h3>Three phases of an event (Event Flow)</h3>
<ul>
  <li><strong>Capturing</strong> — the event descends from <code>window</code> and <code>document</code> down to the target.</li>
  <li><strong>Target phase</strong> — the event has reached the deepest element on which it occurred.</li>
  <li><strong>Bubbling</strong> — the event rises back up to the root, calling parent handlers along the way.</li>
</ul>
<p><code>addEventListener</code> listens to the bubbling phase by default. To intercept an event during capturing, pass the third argument <code>{ capture: true }</code>.</p>

<h3>target vs currentTarget and stopping</h3>
<ul>
  <li><code>event.target</code> — the element on which the event occurred (the deepest one);</li>
  <li><code>event.currentTarget</code> — the element the current handler is attached to;</li>
  <li><code>event.stopPropagation()</code> — cuts off the event's further path through the tree.</li>
</ul>

<h3>Event Delegation</h3>
<p>Instead of a handler on every list element, we attach one to their common parent: bubbling itself carries the event upward, and <code>event.target</code> tells us where exactly the click happened.</p>
<code class="code">
  list.addEventListener('click', (event) => {
    const item = event.target.closest('li');
    if (!item) return; // click outside list items

    selectItem(item);
  });
</code>
<p>Two benefits: memory savings (one listener instead of thousands) and working with a dynamic DOM — elements added later don't need to be subscribed again: the parent will catch their events anyway.</p>

<p class="info info--blue">In declarative frameworks, attaching <code>(click)</code> / <code>@click</code> to every list element is a perfectly fine approach: the code stays readable and context is passed directly. Enable delegation deliberately — for huge lists, raw HTML, and third-party libraries (covered in the Deep Dive).</p>

<p class="info info--orange">Not all events bubble: <code>focus</code>, <code>blur</code>, <code>mouseenter</code>, <code>mouseleave</code>. For delegating focus there are bubbling counterparts <code>focusin</code>/<code>focusout</code>. And don't confuse them: <code>stopPropagation()</code> stops the path through the tree, while <code>preventDefault()</code> cancels the browser's default action.</p>

<p class="deep-dive">Deep Dive</p>

<h3>Why the capturing phase exists</h3>
<p>In practice capturing is used rarely: to intercept an event before all other handlers (analytics, temporarily blocking the UI) or to catch a non-bubbling event on an ancestor — the capturing phase always passes through the ancestors, even if the event has no bubbling.</p>
<p><code>event.eventPhase</code> helps figure out where the event currently is (1 — capturing, 2 — target, 3 — bubbling). And <code>event.stopImmediatePropagation()</code> cuts off not only the path through the tree but also the remaining handlers on the current element.</p>

<h3>addEventListener options</h3>
<ul>
  <li><code>capture</code> — listen during the capturing phase;</li>
  <li><code>once</code> — the handler removes itself after the first invocation;</li>
  <li><code>passive</code> — a promise not to call <code>preventDefault()</code>: the browser doesn't wait for the JS to run and scrolls the page immediately. Critical for <code>touchstart</code> and <code>wheel</code>, which is why Chrome enables passive for them by default;</li>
  <li><code>signal</code> — binding to an <code>AbortController</code>: a single <code>controller.abort()</code> call removes a whole group of handlers without keeping references to the functions.</li>
</ul>

<h3>When delegation is truly necessary</h3>
<p><strong>A large number of elements.</strong> Hundreds of table rows, cells of a complex calendar: thousands of listeners mean extra memory and time spent subscribing/unsubscribing on every re-render.</p>
<p><strong>Rendering raw HTML.</strong> If markup arrives from the backend as a string and is inserted via <code>[innerHTML]</code> (Angular) or <code>v-html</code> (Vue), the framework doesn't compile its directives inside it — <code>@click</code> simply won't work there. The only way to catch clicks inside such a block is a listener on the wrapper plus an <code>event.target</code> check.</p>
<p><strong>Third-party libraries.</strong> Vanilla JS plugins (D3.js charts, Leaflet maps) generate DOM nodes bypassing the framework's engine. Delegation on the root wrapper is the most reliable way to connect their events to component methods.</p>

<h3>Frameworks and Shadow DOM</h3>
<p>React itself is built on delegation: synthetic events are listened to not on the elements but on the application's root container (before React 17 — on <code>document</code>). That's why a handler "on every element" in JSX costs almost nothing.</p>
<p>Shadow DOM adds retargeting: when an event bubbles out of the shadow tree, <code>event.target</code> is replaced with the host element so the component's internals aren't exposed. The event's real path is returned by <code>event.composedPath()</code>, and whether it crosses the shadow boundary is determined by the <code>composed</code> flag.</p>
