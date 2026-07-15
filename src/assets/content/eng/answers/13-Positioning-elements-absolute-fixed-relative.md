<h3>Introduction</h3>
<p><span class="accent">Positioning</span> is a CSS mechanism, controlled by the <code>position</code> property, that defines how an element is placed in the document: whether it participates in the normal flow, what its coordinates (<code>top</code>, <code>right</code>, <code>bottom</code>, <code>left</code>) are measured from, and how it interacts with its neighbours.</p>
<p>The <code>position</code> property has five main values: <code>static</code>, <code>relative</code>, <code>absolute</code>, <code>fixed</code> and <code>sticky</code>. The offset properties (<code>top</code>/<code>left</code> etc.) only take effect when <code>position</code> is different from <code>static</code>.</p>

<h3>In a nutshell</h3>
<p>The intuition behind each value in one line:</p>
<ul>
  <li><code>static</code> — "stay where you are": the element sits in the normal flow and can't be offset.</li>
  <li><code>relative</code> — "shift, but keep your seat": neighbours don't notice the shift.</li>
  <li><code>absolute</code> — "leave the flow and stand at coordinates": measured from the nearest positioned ancestor.</li>
  <li><code>fixed</code> — "glue yourself to the screen": scrolling the page doesn't affect the element.</li>
  <li><code>sticky</code> — "stick to the edge once you scroll to it": behaves like <code>relative</code> before the threshold, like <code>fixed</code> after.</li>
</ul>
<p class="info info--blue">One term is worth knowing up front: the <span class="accent">containing block</span> — the ancestor rectangle whose edges the percentages and the <code>top</code>/<code>right</code>/<code>bottom</code>/<code>left</code> coordinates are measured from. Each <code>position</code> value determines it by its own rules (full breakdown at the end).</p>

<h3>Basic example</h3>
<p>Shifting an element relative to its normal place:</p>
<code class="code">
  .box {
    position: relative;
    top: 20px;   /* shift down from the original position */
    left: 40px;  /* shift right from the original position */
  }
</code>

<h3>position values</h3>

<h4>static</h4>
<p>The default value. The element sits in the normal document flow, and the <code>top</code>, <code>left</code>, <code>right</code>, <code>bottom</code> and <code>z-index</code> properties have <strong>no effect</strong> on it.</p>
<ul>
  <li>The element does not create a containing block for absolutely positioned descendants.</li>
  <li><code>position: static</code> is exactly what we reset an element to when we need to return it to the flow.</li>
</ul>

<h4>relative</h4>
<p>The element stays in the flow (its original place is preserved), but is visually shifted relative to <strong>itself</strong> using <code>top</code>/<code>left</code> etc.</p>
<ul>
  <li>The space the element occupied remains reserved — neighbours do not move.</li>
  <li>Its main use: making the element a <span class="accent">reference point</span> for nested <code>absolute</code> descendants, often without any offset at all.</li>
</ul>

<code class="code">
  .parent {
    position: relative; /* becomes the containing block */
  }

  .child {
    position: absolute;
    top: 0;
    right: 0; /* pins to the top-right corner of .parent */
  }
</code>

<h4>absolute</h4>
<p>The element is <strong>completely removed from the flow</strong> — neighbours behave as if it doesn't exist. Its coordinates are measured from the nearest ancestor whose <code>position</code> is not <code>static</code> (or, if there is none, from <code>&lt;html&gt;</code>/the initial containing block).</p>
<ul>
  <li>By default its width collapses to fit the content (shrink-to-fit) instead of stretching to the full line.</li>
  <li>Classic use cases: badges, tooltips, close buttons in a card corner, dropdown menus.</li>
</ul>

<h4>fixed</h4>
<p>Also removed from the flow, but anchored to the <span class="accent">viewport</span> (the browser window) rather than to an ancestor. The element stays in place while the page scrolls.</p>
<ul>
  <li>Perfect for sticky headers, floating action buttons, modal windows and cookie banners.</li>
  <li>Important caveat: if any ancestor has <code>transform</code>, <code>filter</code> or <code>perspective</code> set, that ancestor becomes the containing block instead of the viewport (see Deep Dive).</li>
</ul>

<h4>sticky</h4>
<p>A hybrid of <code>relative</code> and <code>fixed</code>. The element behaves like <code>relative</code> until it reaches a given threshold during scrolling (e.g. <code>top: 0</code>), after which it "sticks" and behaves like <code>fixed</code> within the bounds of its parent.</p>
<ul>
  <li>You must specify at least one offset (<code>top</code>, <code>bottom</code> etc.) — otherwise sticking will not work.</li>
  <li>Stickiness is bounded by the parent container: as soon as the parent scrolls up, the "stuck" element goes with it.</li>
</ul>

<code class="code">
  .table-header {
    position: sticky;
    top: 0;      /* sticks to the top while scrolling */
    z-index: 10;
  }
</code>

<h3>Key features (comparison)</h3>
<ul>
  <li><strong>In flow:</strong> <code>static</code> and <code>relative</code> stay in the flow; <code>absolute</code> and <code>fixed</code> are removed; <code>sticky</code> stays, but temporarily "detaches".</li>
  <li><strong>Reference point:</strong> <code>relative</code> — from itself; <code>absolute</code> — from a positioned ancestor; <code>fixed</code> — from the viewport; <code>sticky</code> — from the nearest scroll container.</li>
  <li><strong>z-index:</strong> works on everything except <code>static</code>, and creates a new stacking context.</li>
</ul>

<h3>Important nuances and recommendations</h3>
<ul>
  <li>To centre an absolute element, combine <code>top: 50%; left: 50%;</code> with <code>transform: translate(-50%, -50%)</code> — this compensates for the element's own dimensions.</li>
  <li>You can stretch an <code>absolute</code> element over its whole parent by setting <code>top: 0; right: 0; bottom: 0; left: 0</code> (or the shorthand <code>inset: 0</code>).</li>
  <li>Don't overuse absolute positioning for the main layout — use Flexbox or Grid for grids and columns, as they are responsive by nature.</li>
</ul>

<p class="info info--orange">Common mistake: giving a child <code>position: absolute</code> and forgetting <code>position: relative</code> on the parent. The element is then measured not from the card but from the whole page (or from an unexpected ancestor higher up the tree) and "flies off" to an unpredictable spot.</p>

<p class="info info--blue">Tip: <code>position: sticky</code> silently fails if the parent has <code>overflow: hidden</code>, <code>overflow: auto</code> or <code>overflow: scroll</code> — the element then sticks to that container, and if the container has no scrollbar, no effect is visible.</p>

<p class="deep-dive">Deep Dive</p>
<p>The key to understanding positioning is the concept of the <span class="accent">containing block</span>. It is from its edges (the padding box in most cases) that percentages and offsets are measured. The rules for determining the containing block differ by <code>position</code> value:</p>
<ul>
  <li>For <code>absolute</code> — it's the padding box of the nearest ancestor whose <code>position</code> is not <code>static</code>.</li>
  <li>For <code>fixed</code> — it's the viewport… but only when ancestors have no "magic" properties.</li>
</ul>

<p>This is where things get counter-intuitive. We already said that <code>fixed</code> is measured from the <span class="accent">viewport</span> — that's exactly why a fixed element doesn't move while you scroll. But this rule can be broken by accident: if <strong>any</strong> ancestor higher up the tree has one of a few "special" CSS properties, the containing block for the <code>fixed</code> descendant becomes that ancestor rather than the browser window.</p>

<p>The properties that cause this include:</p>
<ul>
  <li><code>transform</code> — any non-zero value, even a harmless <code>translate(0)</code>;</li>
  <li><code>filter</code> and <code>backdrop-filter</code>;</li>
  <li><code>perspective</code>;</li>
  <li><code>will-change</code>, if its value names one of these properties (e.g. <code>will-change: transform</code>);</li>
  <li><code>contain</code> with a value of <code>paint</code>, <code>layout</code>, <code>strict</code> or <code>content</code>;</li>
  <li><code>container-type</code> (container queries: <code>size</code> or <code>inline-size</code>).</li>
</ul>

<p>Why does this happen? The <code>transform</code> property (and its relatives) establishes a <span class="accent">new coordinate system</span> for descendants — the element effectively declares: "from now on all child coordinates are measured from me." Because of that, the browser has to anchor the <code>fixed</code> descendant to this ancestor instead of the viewport.</p>

<p>In practice it looks like this: an element with <code>position: fixed</code> inside such a container starts to behave like a regular <code>absolute</code> — it's anchored to the container and <strong>scrolls together with the page</strong>, even though you expected it to "stick" to the screen.</p>

<code class="code">
  .animated-wrapper {
    transform: translateY(0);  /* looks like a harmless line */
  }

  .modal {
    position: fixed;  /* expected: sticks to the browser window */
    top: 0;
    left: 0;          /* actually: measured from .animated-wrapper and scrolls with it */
  }
</code>

<p class="info info--orange">This is one of the most common and confusing CSS traps: someone adds an animation or <code>will-change</code> for optimization somewhere up the tree — and a completely different, fixed element "breaks." If <code>position: fixed</code> suddenly scrolls with the page, the first thing to check is whether an ancestor has <code>transform</code>, <code>filter</code>, <code>perspective</code> or <code>will-change</code>. The fix is to move the fixed element out of the problematic subtree (e.g. closer to <code>&lt;body&gt;</code>) or to drop the "special" property on the ancestor.</p>

<p>A separate topic is the <span class="accent">stacking context</span>. <code>z-index</code> only compares elements within the same context. A positioned element with a numeric <code>z-index</code> (as well as elements with <code>opacity &lt; 1</code>, <code>transform</code>, <code>filter</code>, <code>isolation: isolate</code>) creates a new context. This explains why an element with <code>z-index: 9999</code> sometimes cannot cover a neighbour with <code>z-index: 1</code>: they live in different, isolated stacking contexts, and it's actually their parents that get compared.</p>
