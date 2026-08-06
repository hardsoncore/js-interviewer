<h3>Introduction</h3>

<p>
  The type of an element is the kind of <span class="accent">box</span> it generates in normal flow. It is set by the
  <code>display</code> property, and the tag only provides the default value from the browser stylesheet:
  <code>div</code> — <code>block</code>, <code>span</code> — <code>inline</code>.
</p>

<p class="info">
  <strong>Key idea:</strong> "block" and "inline" are not a property of the tag but the behaviour of the box. Any
  element can be switched via <code>display</code>; the semantics of the tag stay the same.
</p>

<h3>Block elements (block)</h3>

<ul>
  <li>Take the full width of the parent and always start on a new line.</li>
  <li><code>width</code>, <code>height</code>, all <code>margin</code> and <code>padding</code> work fully.</li>
  <li>Vertical <code>margin</code> of neighbours collapse (margin collapsing).</li>
  <li>Examples: <code>div</code>, <code>p</code>, <code>h1</code>—<code>h6</code>, <code>section</code>, <code>ul</code>.</li>
</ul>

<h3>Inline elements (inline)</h3>

<ul>
  <li>Live inside a line of text, width is defined by the content, wrapping happens by words.</li>
  <li><code>width</code> and <code>height</code> are <strong>ignored</strong>.</li>
  <li>Vertical <code>margin</code> has no effect; vertical <code>padding</code> is painted but
    <strong>does not push</strong> the line apart and overlaps neighbouring lines.</li>
  <li>Examples: <code>span</code>, <code>a</code>, <code>em</code>, <code>code</code>.</li>
</ul>

<h3>inline-block — the hybrid</h3>

<p>On the outside it behaves like an inline element (sits in the line), on the inside like a block one (accepts sizes and paddings).</p>

<code class="code">
  .tag {
    display: inline-block;
    width: 120px;   /* works, unlike inline */
    padding: 8px;   /* pushes neighbours apart vertically */
  }
</code>

<p class="info info--orange">
  A gap of about 4px appears between <code>inline-block</code> elements — it is the real whitespace in the markup
  between the tags. The cure is switching the parent to flex/grid, not the <code>font-size: 0</code> hack.
</p>

<h3>Other display values</h3>

<ul>
  <li><code>none</code> — the element is removed from the render tree: no box, no space, not exposed to a screen reader.</li>
  <li><code>flex</code> / <code>grid</code> — block on the outside, but imposes its own layout model on the children.</li>
  <li><code>contents</code> — the box of the element itself disappears, the children are raised to the grandparent
    (handy for a redundant wrapper inside flex).</li>
  <li><code>list-item</code>, <code>table</code>, <code>table-cell</code> — specialised boxes.</li>
</ul>

<p class="info info--blue">
  Do not confuse <code>display: none</code> (no box, takes no space) with <code>visibility: hidden</code>
  (the box exists, the space is taken, it is simply not painted).
</p>

<p class="deep-dive">Deep Dive</p>

<h3>Outer and inner display</h3>

<p>
  In CSS Display Level 3 <code>display</code> is two independent roles, and the modern syntax accepts both explicitly:
</p>

<ul>
  <li><strong>outer</strong> — how the box behaves relative to its neighbours (<code>block</code> / <code>inline</code>).</li>
  <li><strong>inner</strong> — which formatting context it establishes for its children
    (<code>flow</code>, <code>flow-root</code>, <code>flex</code>, <code>grid</code>, <code>table</code>).</li>
</ul>

<code class="code">
  display: block;         /* legacy notation, equals block flow    */
  display: inline-block;  /* equals inline flow-root               */
  display: flex;          /* equals block flex                     */
  display: inline flex;   /* a flex container sitting in a line    */
</code>

<p>
  This shows that <code>inline-block</code> is not a separate entity but a combination: <code>inline</code> on the
  outside, <code>flow-root</code> on the inside, i.e. its own BFC. It is exactly the BFC that explains its
  properties: margins do not collapse inside it and floats do not spill out.
</p>

<h3>flow-root and BFC</h3>

<p>
  <code>display: flow-root</code> is a block box that establishes a new Block Formatting Context without side
  effects. It is the modern replacement for clearfix: the parent wraps its floating children, and the outer
  <code>margin</code> of the children does not leak outside.
</p>

<code class="code">
  .wrapper {
    display: flow-root; /* instead of .clearfix::after { content: ""; clear: both } */
  }
</code>

<h3>Why inline ignores sizes</h3>

<p>
  An inline box is part of a <span class="accent">line box</span>, whose height is computed from
  <code>line-height</code> and the font metrics, not from the content of the box. You cannot set a height on such a
  fragment — otherwise the whole line would break. For the same reason vertical <code>padding</code> and
  <code>border</code> are painted but are not counted in the line height and overlap the neighbouring lines.
</p>

<h3>Replaced elements</h3>

<p>
  <code>img</code>, <code>video</code>, <code>input</code>, <code>iframe</code> are formally <code>inline</code>,
  yet they do accept sizes: their content is painted not by CSS but by an external resource that has its own
  intrinsic size. A practical consequence is the "mysterious" gap under an image:
  <code>img</code> sits on the baseline of the line, below which room is left for descenders.
</p>

<code class="code">
  img { display: block; }      /* removes the gap under the image */
  img { vertical-align: top; } /* an alternative if inline is needed */
</code>

<h3>Anonymous boxes</h3>

<p>
  If block and inline children are mixed inside a block container, the browser wraps the inline ones in
  <strong>anonymous block boxes</strong> — they cannot be styled, but they explain why bare text next to a
  <code>div</code> behaves as a separate line.
</p>

<p class="info info--orange">
  <code>display: contents</code> broke accessibility for a long time: the element lost its semantics in the
  accessibility tree. In current browsers the bug is fixed for most roles, but check <code>li</code>,
  <code>button</code> and tables — the behaviour there still diverges.
</p>
