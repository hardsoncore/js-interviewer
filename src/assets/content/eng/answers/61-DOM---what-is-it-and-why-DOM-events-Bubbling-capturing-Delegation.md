<h3>Event Flow</h3>

<p>When an event occurs (for example, a mouse click), it doesn't just happen on a specific element. It travels through the DOM tree. According to the standard, this journey is divided into three phases:</p>

<p><strong>Capturing phase:</strong> The event goes down from the root (<code>Window</code>, <code>Document</code>, <code>&lt;html&gt;</code>, <code>&lt;body&gt;</code>) to the target element.</p>

<p><strong>Target phase:</strong> The event reaches the deepest element where it occurred.</p>

<p><strong>Bubbling phase:</strong> The event goes back up from the target element to the root.</p>

<h3>Capturing ⬇️</h3>
<p>In this phase, the event goes from top to bottom. In real development, catching events during the capturing phase is rarely used, mostly for tricky analytics or specific intercept logic (when you need to handle the event before it reaches the target).</p>

<p><strong>How to catch it:</strong> By default, <code>addEventListener</code> only listens to the bubbling phase. To catch an event during capturing, you need to pass a third argument — an object <code>{ capture: true }</code> or simply <code>true</code>.</p>

<code class="code">
  document.body.addEventListener('click', (event) => {
    console.log('Caught a click on the body during capturing!');
  }, { capture: true });
</code>

<h3>Bubbling ⬆️</h3>

<p>In this phase, the event goes from bottom to top. If a user clicks on a <code>&lt;span&gt;</code> tag inside a <code>&lt;button&gt;</code>, which is inside a <code>&lt;div&gt;</code>, the handlers will trigger in this exact order: <code>span -> button -> div -> body</code> and so on.</p>

<h5>Important properties of the <code>event</code> object:</h5>

<ul>
  <li><code>event.target</code> — the element where the event occurred (for example, <code>&lt;span&gt;</code>).</li>
  <li><code>event.currentTarget</code> — the element that the handler is attached to (for example, <code>&lt;button&gt;</code> or <code>&lt;div&gt;</code>).</li>
  <li><code>event.eventPhase</code> — the event phase (1 — capturing, 2 — target, 3 — bubbling).</li>
</ul>

<h5>How to stop bubbling?</h5>

<ul>
  <li><code>event.stopPropagation()</code> — stops the event from moving further up the DOM tree. The event will not be passed to parent elements.</li>
  <li><code>event.stopImmediatePropagation()</code> — besides stopping the propagation, it also prevents other handlers from running on the same element.</li>
</ul>

<h3>Event Delegation</h3>

<p>This is a powerful design pattern based on the bubbling mechanism.</p>

<p><strong>Core idea:</strong> Instead of attaching a handler to every nested element (for example, to 100 buttons in a list), we attach one single handler to their common parent (for example, to the <code>&lt;ul&gt;</code> list itself).</p>

<h5>Why is this needed?</h5>

<p>1. <strong>Memory saving and performance:</strong> One listener weighs much less than thousands.</p>
<p>2. <strong>Working with a dynamic DOM:</strong> If you add a new element to the list via JavaScript, you don't need to bind a handler to it again. The parent will still catch the click thanks to bubbling.</p>

<h3>When to use delegation?</h3>

<p>
  In most daily tasks, adding <code>@click</code> or <code>(click)</code> to each element of a dynamic list is the right approach, because the code remains declarative, easy to read, and you can directly pass the context (for example, <code>(click)="selectItem(item)"</code>).
</p>

<p>
  However, there are clear scenarios when delegation becomes useful and even necessary.
</p>

<h5>1. A large number of elements</h5>

<p>If you have a list with hundreds or thousands of elements, a complex calendar, etc. - attaching a handler to each of them can lead to performance issues. In such cases, delegation allows you to handle events efficiently using just one listener.</p>

<h5>2. Rendering raw HTML (v-html / innerHTML)</h5>

<p>
  This is a classic case where delegation is a must. If some content comes from the backend as ready-made markup and is inserted via <code>v-html</code> (in Vue) or <code>[innerHTML]</code> (in Angular), the framework does not compile its directives inside this markup.
</p>

<p>
  You won't be able to make <code>@click</code> work inside a string that came from the server. The only way to catch clicks on links or buttons inside such a block is to add a listener to the parent <code>div</code> and use delegation with an <code>event.target</code> check.
</p>

<h5>Integration with third-party libraries</h5>

<p>
  Often, you have to wrap Vanilla JS plugins in components (for example, D3.js charts, Leaflet maps, or complex calendars), which generate DOM nodes themselves, bypassing the framework's engine. To catch events from these nodes and trigger component methods, delegation on the root wrapper is the most reliable pattern.
</p>
