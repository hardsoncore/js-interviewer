<h3>Critical Rendering Path</h3>
<p>Turning HTML, CSS, and JS into an interactive page is the <span class="accent">Critical Rendering Path</span>: a chain of sequential steps from bytes to pixels.</p>

<p class="info"><strong>Answer skeleton:</strong> parse HTML → <code>DOM</code>, parse CSS → <code>CSSOM</code>, combine them into a <strong>Render Tree</strong>, then <strong>Layout → Paint → Composite</strong>. HTML is parsed incrementally, but CSS and synchronous JS block this pipeline.</p>

<h3>Parsing HTML → DOM, CSS → CSSOM</h3>
<p>Once the first bytes arrive, the HTML parser reads the code top to bottom, turns tags into tokens and tokens into nodes, from which it builds the <span class="accent">DOM</span> — the tree of the page's content. Parsing happens incrementally, as bytes are downloaded.</p>

<p>In parallel, the browser builds the <span class="accent">CSSOM</span> from CSS — the tree of styles. CSS is <strong>render-blocking</strong>: the browser won't paint the page until the full CSSOM is built — otherwise you'd get FOUC (a flash of unstyled content).</p>

<h3>JavaScript blocks parsing</h3>
<p>By default, <code>&lt;script&gt;</code> stops DOM construction: the browser downloads and executes the script, and only then resumes parsing the HTML.</p>
<ul>
  <li><code>defer</code> — downloaded in the background, executed after the HTML is fully parsed, preserving the script order.</li>
  <li><code>async</code> — downloaded in the background and executed as soon as it's ready, pausing parsing during execution; order is not guaranteed.</li>
</ul>

<h3>Render Tree → Layout → Paint → Composite</h3>
<p>The DOM and CSSOM are combined into the <span class="accent">Render Tree</span> — only visible nodes make it in (no <code>&lt;head&gt;</code>, <code>&lt;script&gt;</code>, or elements with <code>display: none</code>).</p>
<ul>
  <li><strong>Layout (Reflow)</strong> — computing the size and coordinates of each element relative to the viewport.</li>
  <li><strong>Paint</strong> — filling in pixels: text, colors, borders, shadows, backgrounds.</li>
  <li><strong>Composite</strong> — assembling the layers in the right order on the GPU into the final image.</li>
</ul>

<h3>DOMContentLoaded vs load</h3>
<ul>
  <li><code>DOMContentLoaded</code> — the HTML is loaded and parsed into the DOM, without waiting for stylesheets, images, and frames.</li>
  <li><code>load</code> — the page is fully loaded with all dependent resources (images, styles, frames).</li>
</ul>

<p class="deep-dive">Deep Dive</p>

<h3>Preload Scanner</h3>
<p>While the main parser is stalled on a synchronous script, the auxiliary <span class="accent">Preload Scanner</span> "runs ahead" through the HTML, finds external resources (CSS, JS, images, fonts), and starts downloading them in advance — so one blocking script doesn't halt the entire load.</p>

<h3>Why CSS is not parsed incrementally</h3>
<p>Unlike HTML, the CSSOM cannot be built in pieces: a rule at the end of the file may override a rule from the beginning (the cascade). So the browser waits for all the CSS before considering the CSSOM ready.</p>
<p class="info info--orange">A synchronous script after a <code>&lt;link&gt;</code> waits for the CSSOM to be built: JS can read computed styles, so it won't run until the CSS is loaded — this is how CSS can indirectly block parsing too.</p>

<h3>What ends up in the Render Tree</h3>
<ul>
  <li><code>display: none</code> — the node is excluded from the tree: it isn't rendered at all.</li>
  <li><code>visibility: hidden</code> and <code>opacity: 0</code> — stay in the tree: the elements are invisible but still occupy space and affect geometry.</li>
</ul>

<h3>Reflow and Repaint</h3>
<p><span class="accent">Reflow</span> — a repeated Layout: recomputing geometry when sizes or positions change (window resize, node insertion, reading <code>offsetHeight</code>). Expensive, since it can cascade to both descendants and ancestors.</p>
<p><span class="accent">Repaint</span> — redrawing without a geometry change (color, background change). Cheaper than reflow, but still loads the CPU.</p>
<p class="info info--blue">Animating only via <code>transform</code> and <code>opacity</code> changes just the Composite stage, skipping Layout and Paint — so it runs on the GPU and holds 60 FPS (more in the question on animation performance).</p>

<h3>Layers and compositing</h3>
<p>Elements with <code>transform</code>, <code>opacity</code>, <code>will-change</code>, or <code>z-index</code> may be promoted to a separate composite layer. The browser rasterizes layers independently and stitches them on the GPU — this lets it move a layer without repainting the rest of the page.</p>
