<h3>Critical Rendering Path</h3>
<p>Rendering optimization means speeding up the <span class="accent">Critical Rendering Path</span> (DOM → CSSOM → Render Tree → Layout → Paint → Composite): the less work and blocking along the path, the sooner the user sees content.</p>

<p class="info"><strong>Key idea:</strong> fewer blockers on the critical path: a light DOM, critical CSS inlined, scripts with <code>defer</code>, heavy resources loaded lazily, and the effect measured with Core Web Vitals.</p>

<h3>Optimizing DOM (HTML)</h3>
<ul>
  <li>Fewer nodes and less nesting: the bigger the tree, the more expensive every Layout (Lighthouse complains from ~800 nodes).</li>
  <li>Long lists — virtual scrolling; off-screen content — <code>content-visibility: auto</code>.</li>
</ul>

<h3>Optimizing CSSOM (CSS)</h3>
<ul>
  <li>CSS blocks rendering: inline the critical above-the-fold styles into <code>&lt;head&gt;</code>, load the rest asynchronously.</li>
  <li>Animate only <code>transform</code> and <code>opacity</code> — they skip Layout and Paint, running on the GPU (Composite).</li>
</ul>

<h3>Optimizing JavaScript</h3>
<ul>
  <li>JS blocks HTML parsing — external scripts with <code>defer</code>/<code>async</code>.</li>
  <li>Code Splitting + Lazy Loading: load code per route instead of the whole bundle at once.</li>
  <li>Heavy computations go to a Web Worker, keeping the main thread free.</li>
</ul>

<h3>Media and fonts</h3>
<ul>
  <li>WebP/AVIF formats and explicit <code>width</code>/<code>height</code> — protection against layout shifts (CLS).</li>
  <li><code>loading="lazy"</code> for images and iframes below the fold.</li>
  <li>Fonts: <code>font-display: swap</code> — text is immediately visible in a system font (no FOIT).</li>
</ul>

<h3>Network and delivery</h3>
<ul>
  <li>Resource Hints: <code>preconnect</code> to critical domains, <code>preload</code> for fonts and the hero image.</li>
  <li>Compression (Brotli), HTTP caching, CDN, HTTP/2+.</li>
  <li>SSR/SSG — ready-made markup from the server drastically speeds up FCP/LCP.</li>
</ul>

<h3>Profiling and metrics</h3>
<p>The benchmark is <span class="accent">Core Web Vitals</span>: <strong>LCP</strong> (main content paint), <strong>INP</strong> (responsiveness, replaced FID), <strong>CLS</strong> (layout stability). Tools: Lighthouse and the Performance panel in DevTools.</p>

<p class="info info--orange">A common mistake is optimizing "by eye" on a powerful dev machine: profile with CPU/network throttling and fix the most expensive thing, not the first one you spot.</p>

<p class="deep-dive">Deep Dive</p>

<h3>What optimized loading looks like</h3>
<code class="code">
  &lt;head&gt;
    &lt;link rel="preconnect" href="https://cdn.example.com"&gt;
    &lt;style&gt;/* critical above-the-fold CSS */&lt;/style&gt;
    &lt;link rel="stylesheet" href="rest.css" media="print" onload="this.media='all'"&gt;
    &lt;script src="app.js" defer&gt;&lt;/script&gt;
  &lt;/head&gt;

  &lt;!-- LCP element: high priority, no lazy --&gt;
  &lt;img src="hero.avif" width="800" height="400" fetchpriority="high" alt="..."&gt;
  &lt;!-- below the fold --&gt;
  &lt;img src="feed.webp" width="400" height="300" loading="lazy" alt="..."&gt;
</code>
<p>The <code>media="print"</code> trick downloads non-critical styles at low priority without blocking rendering, and <code>onload</code> switches them on. <code>fetchpriority="high"</code> raises the LCP image's priority in the network queue.</p>

<h3>Reflow, Repaint, and Layout Thrashing</h3>
<p>Changing geometry (<code>width</code>, <code>top</code>, adding nodes) triggers Reflow; changing appearance (<code>color</code>, <code>box-shadow</code>) triggers Repaint. Reading layout properties (<code>offsetHeight</code>, <code>getBoundingClientRect()</code>) on a "dirty" tree forces the browser to recalculate Layout synchronously. Alternating reads and writes in a loop is <span class="accent">layout thrashing</span>: N forced reflows instead of one.</p>
<ul>
  <li>Group operations: all reads first, then all writes; visual changes via <code>requestAnimationFrame</code>.</li>
  <li>Swap a whole class instead of a series of inline styles; batch insertions via <code>DocumentFragment</code>.</li>
</ul>

<h3>Compositor layers and the GPU</h3>
<p><code>will-change: transform</code> (or <code>translateZ(0)</code>) promotes an element to its own compositor layer: its movement is handled by the compositor on the GPU without touching Layout/Paint of the rest of the page.</p>
<p class="info info--blue">Every layer consumes GPU memory. <code>will-change</code> is a targeted tool for genuinely animated elements, not a global "accelerator": sprinkled everywhere, it causes layer explosion and slows the page down.</p>

<h3>content-visibility: auto</h3>
<p>Tells the browser to skip Layout and Paint of a block's contents until it nears the viewport; the content is rendered on the fly as you scroll. Unlike virtual scroll, the nodes stay in the DOM (Ctrl+F finds them, screen readers reach them) — only the rendering cost is cut, not the DOM itself. It fits a long page of heavy, heterogeneous sections (an article, a card feed), whereas virtualization suits thousands of uniform rows.</p>
<p><code>contain-intrinsic-size</code> gives the block a placeholder height while it is unrendered — without it the scrollbar and layout jump (CLS) as sections render in.</p>
<code class="code">
  .section {
    content-visibility: auto;
    contain-intrinsic-size: auto 500px; /* estimated height before render */
  }
</code>
<p class="info info--blue">The height estimate in <code>contain-intrinsic-size</code> is a trade-off: a large gap from the real height causes scroll jumps. The <code>auto</code> keyword asks the browser to remember the actual size after the first render and reuse it.</p>

<h3>Framework-level optimizations</h3>
<ul>
  <li><strong>Angular:</strong> <code>ChangeDetectionStrategy.OnPush</code> and Signals — change checks only where data actually changed; <code>trackBy</code> in lists; <code>@defer</code> for deferred template blocks.</li>
  <li><strong>Vue:</strong> <code>v-once</code>/<code>v-memo</code> for static template chunks, <code>shallowRef</code> for large structures without deep reactivity.</li>
  <li>The common principle is narrowing the re-render zone: list virtualization, memoizing computations, splitting heavy components.</li>
</ul>

<h3>Fonts in detail</h3>
<ul>
  <li>WOFF2 only, subsetting via <code>unicode-range</code> (don't load Cyrillic on an English-only page and vice versa).</li>
  <li><code>&lt;link rel="preload" as="font"&gt;</code> for the above-the-fold font + self-hosting instead of third-party CDNs.</li>
  <li>Tuning the fallback font via <code>size-adjust</code>/<code>ascent-override</code> removes CLS during the font swap.</li>
</ul>

<h3>Delivery: details</h3>
<ul>
  <li>HTTP/2 multiplexes requests over a single connection; HTTP/3 (QUIC) speeds up the handshake and resilience on mobile networks.</li>
  <li>Brotli compresses text ~15–20% better than gzip.</li>
  <li>Caching: hashes in bundle names + long <code>Cache-Control: immutable</code>; a Service Worker for instant repeat visits.</li>
  <li>103 Early Hints: the server sends preload/preconnect hints before the HTML is even generated.</li>
</ul>

<h3>Metrics: thresholds and practice</h3>
<ul>
  <li>"Green" thresholds: LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1 — at the 75th percentile of real users.</li>
  <li>INP replaced FID (2024): FID measured only the first input's delay, INP — the worst interaction of the whole visit.</li>
  <li>Lab data (Lighthouse, DevTools) is for debugging; field data (RUM, CrUX) is the source of truth about real users.</li>
</ul>
