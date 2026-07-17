<h3>Introduction</h3>

<p>
  The <span class="accent">Critical Rendering Path (CRP)</span> is the pipeline through which the browser turns HTML, CSS,
  and JavaScript into pixels on the screen. Animation is that same pipeline, walked again on every frame.
</p>

<p class="info">
  <strong>The main idea:</strong> the fewer pipeline stages touched per frame, the smoother the animation. So
  <strong>animate only <code>transform</code> and <code>opacity</code></strong> — the only properties that skip the
  expensive Layout and Paint stages and get away with the almost-free Composite.
</p>

<hr />

<h3>The three pipeline stages and the cascade rule</h3>

<p>For animation we care about the last three stages of the CRP, and they run strictly in order:</p>

<ul>
  <li>
    <strong>Layout (Reflow)</strong> — calculating geometry: where the element is and what size it is.
    <span class="accent">The most expensive</span>: moving one element forces a recalculation of its siblings and parents.
  </li>
  <li>
    <strong>Paint</strong> — filling in pixels: colors, shadows, borders, text. Expensive, but cheaper than Layout.
  </li>
  <li>
    <strong>Composite</strong> — gluing already-painted layers into a picture on the GPU. <span class="accent">Almost free.</span>
  </li>
</ul>

<p class="info info--blue">
  <strong>The cascade rule:</strong> the stages fire "top-down": trigger Layout — Paint and Composite necessarily follow;
  trigger Paint — Composite follows. Never the other way around. The whole animation optimization is about staying on the
  lowest stage.
</p>

<code class="code">
  /* Layout + Paint + Composite — DO NOT animate */
  width, height, top, left, right, bottom
  margin, padding, border-width, font-size

  /* Paint + Composite — expensive */
  color, background, border-color, box-shadow, border-radius

  /* Composite only — animate THIS */
  transform   /* translate, scale, rotate */
  opacity
</code>

<hr />

<h3>The frame budget: 60 FPS and 16.7 ms</h3>

<p>
  The screen refreshes 60 times per second, so the browser has <strong>1000 / 60 ≈ 16.7 ms</strong> per frame — and
  JavaScript, styles, Layout, Paint, and Composite must all fit into it. Miss it — the frame is dropped
  (<strong>dropped frame</strong>), and the user sees a stutter (jank). A <code>transform</code> animation is cheap for
  exactly this reason: it barely spends this budget.
</p>

<hr />

<h3>How to animate correctly: practice</h3>

<code class="code">
  /* Bad: Layout + Paint every frame */
  .box { transition: left 300ms; }
  .box:hover { left: 300px; }

  /* Good: Composite only every frame */
  .box { transition: transform 300ms; }
  .box:hover { transform: translateX(300px); }
</code>

<p>Visually the same, but the price of the frame differs. Keep this substitution table in your head:</p>

<ul>
  <li><code>left / top</code> → <code>transform: translate()</code></li>
  <li><code>width / height</code> → <code>transform: scale()</code></li>
  <li><code>display / visibility</code> → <code>opacity</code> (+ <code>pointer-events: none</code>)</li>
</ul>

<p>
  To animate on the Composite stage, the browser promotes the element into a separate layer (a texture on the GPU). The
  <code>will-change: transform</code> hint warns it about this in advance.
</p>

<p class="info info--orange">
  But <code>will-change</code> is not a "make it fast" switch — it is a promise to the browser: every layer eats GPU memory.
  Slap it on everything "just in case" and you will get a drop in performance instead of a gain. Set it selectively, only on
  what is about to be animated.
</p>

<hr />

<p class="deep-dive">Deep Dive</p>

<h4>The full CRP pipeline</h4>

<p>Layout, Paint, and Composite are only the tail of the path. In full it looks like this:</p>

<ol>
  <li><strong>DOM</strong> — parsing HTML into a tree of nodes.</li>
  <li><strong>CSSOM</strong> — parsing CSS into a style tree.</li>
  <li><strong>Render Tree</strong> — DOM + CSSOM, only visible elements (no <code>display: none</code>).</li>
  <li><strong>Layout → Paint → Composite</strong> — those same three stages that repeat on every frame.</li>
</ol>

<p>The first three steps are one-off work at load; animation only spins the last three.</p>

<h4>The frame budget: a cliff instead of degradation</h4>

<p>
  Frames are synchronized with the screen refresh (vsync), so there is no smooth transition between 60 FPS and 30 FPS —
  there is a cliff: either the frame fits into 16.7 ms and makes the current screen refresh, or it waits for the next one.
  An animation that misses by just a little visually drops straight to half the frame rate.
</p>

<h4>The main thread versus the compositor thread</h4>

<p>
  The real reason <code>transform</code> is fast goes deeper than "fewer stages". In Chrome (Blink) rendering is split across
  threads:
</p>

<ul>
  <li>
    <span class="accent">Main thread</span> — this is where JavaScript, Style, Layout, and Paint live. It is easy to block with heavy JS.
  </li>
  <li>
    <span class="accent">Compositor thread</span> — a separate thread that glues the layers together and talks to the GPU.
  </li>
</ul>

<p>
  An animation of <code>transform</code> and <code>opacity</code> can be handed off entirely to the <strong>compositor thread</strong>.
  So even if the main thread is dead-locked by a heavy JS loop, such an animation <strong>will keep running smoothly</strong> — it is
  physically executed on another thread. That is exactly why CSS animations survive JS lag, while an animation via <code>left</code> does not.
</p>

<p class="info info--orange">
  This also explains scroll "detaching": scrolling is handled by the compositor, while <code>scroll</code> handlers are handled by the
  main thread. Hence <code>addEventListener('scroll', fn, { passive: true })</code>: you promise not to call
  <code>preventDefault()</code>, and the compositor can scroll without waiting for the main thread.
</p>

<h4>Layout Thrashing (forced synchronous Layout)</h4>

<p>
  The browser batches DOM changes and applies them in one go at the end of the frame. But if you <strong>read</strong> geometry right after
  a <strong>write</strong> — it is forced to recalculate Layout immediately, in order to give you an honest value. Inside a loop this
  turns into Layout on every iteration.
</p>

<code class="code">
  // BAD: reading after writing inside a loop = Layout on every iteration
  boxes.forEach((box) => {
    box.style.width = box.offsetWidth + 10 + 'px';
  });

  // GOOD: all reads first, then all writes
  const widths = boxes.map((box) => box.offsetWidth); // batch read
  boxes.forEach((box, i) => {
    box.style.width = widths[i] + 10 + 'px';         // batch write
  });
</code>

<p>Properties that trigger a forced Layout when read: <code>offsetWidth</code>, <code>offsetTop</code>,
  <code>clientHeight</code>, <code>scrollTop</code>, <code>getComputedStyle()</code>, <code>getBoundingClientRect()</code>.</p>

<h4>How a layer is born and the implicit compositing trap</h4>

<p>
  A layer is created by the browser, not the developer. Typical reasons for promotion: 3D transforms,
  <code>will-change: transform / opacity</code>, <code>&lt;video&gt;</code> and <code>&lt;canvas&gt;</code>,
  <code>position: fixed</code>, composited animations.
</p>

<p>
  Next comes <strong>implicit compositing</strong>: if an element with a higher <code>z-index</code> overlaps a promoted layer,
  the browser is <strong>obliged</strong> to create a layer for it too — otherwise the stacking order would break. A single
  <code>will-change</code> can cascade into a dozen layers (in DevTools → Layers their reason is "overlap"). This is the
  <strong>layer explosion</strong> that is why <code>will-change</code> must not be put on everything.
</p>

<h4>Rasterization and tiles</h4>

<p>
  Paint does not draw pixels directly — it records a <strong>list of drawing commands</strong> (a display list). Only afterwards
  does rasterization turn them into bits, splitting the layer into <strong>tiles</strong> (usually 256×256 or 512×512), so as to
  rasterize only the visible part and reuse tiles while scrolling. That is why white areas sometimes flash during fast scrolling —
  the compositor showed the frame before the rasterizer prepared the tiles.
</p>

<h4>The FLIP technique — when you do need to animate geometry</h4>

<p>
  FLIP resolves the contradiction: you need to animate a change of position/size (Layout properties), but the only thing you can
  animate is <code>transform</code>. The acronym is <strong>First, Last, Invert, Play</strong>:
</p>

<ol>
  <li><strong>First</strong> — measured the position before the change.</li>
  <li><strong>Last</strong> — instantly applied the final state and measured again.</li>
  <li><strong>Invert</strong> — used <code>transform</code> to visually move the element back to the start.</li>
  <li><strong>Play</strong> — removed the transform with an animation.</li>
</ol>

<code class="code">
  const first = el.getBoundingClientRect();

  el.classList.add('final-state');           // Last: change layout instantly
  const last = el.getBoundingClientRect();

  const dx = first.left - last.left;         // Invert
  const dy = first.top - last.top;

  el.animate([
    { transform: `translate(${dx}px, ${dy}px)` },
    { transform: 'translate(0, 0)' }         // Play
  ], { duration: 300, easing: 'ease-out' });
</code>

<p>Layout is computed once, not 60 times per second. The <code>View Transitions API</code> and most layout animations are built on this.</p>

<h4>Isolation: contain and content-visibility</h4>

<p>Expensive Layout can not only be avoided, but also localized:</p>

<code class="code">
  .widget {
    contain: layout paint;    /* changes inside will not touch the page */
  }

  .long-list-item {
    content-visibility: auto; /* do not render until it appears in the viewport */
    contain-intrinsic-size: 0 120px;
  }
</code>

<p>
  <code>content-visibility: auto</code> is effectively native virtualization: the browser skips Layout and Paint for elements
  outside the viewport. Always specify <code>contain-intrinsic-size</code>, otherwise you will get scrollbar jumps (CLS).
</p>

<h4>Diagnostics in DevTools</h4>

<ul>
  <li><strong>Performance</strong> + CPU throttling 4–6x — locally everything "flies", the real picture is only visible with throttling.</li>
  <li><strong>Layers</strong> — the real compositor layers and their memory weight.</li>
  <li><strong>Rendering → Paint flashing</strong> — highlights the areas being repainted; half the screen flashing = the animation dropped into Paint.</li>
  <li><code>requestAnimationFrame</code> instead of <code>setInterval</code> — synchronizes the animation with the screen frame.</li>
</ul>
