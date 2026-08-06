<h3>Introduction</h3>

<p>
  A <span class="accent">pseudo-class</span> is a single-colon selector (<code>:hover</code>) that picks an
  <strong>already existing</strong> element by its state or position in the tree. It adds nothing to the markup —
  that separates it from a pseudo-element (<code>::before</code>), which creates a new box.
</p>

<p class="info">
  <strong>Key idea:</strong> a pseudo-class is a condition on an element that the browser evaluates itself and
  recomputes in real time. That is why CSS reacts to the user, form validity and DOM structure without a line of JS.
</p>

<hr />

<h3>State pseudo-classes (interactive)</h3>

<ul>
  <li><code>:hover</code> — cursor over element; <code>:active</code> — moment of pressing.</li>
  <li><code>:focus</code> — focus received anyhow (click, Tab, script).</li>
  <li><code>:focus-visible</code> — focus the browser chose to highlight (usually keyboard).</li>
  <li><code>:focus-within</code> — on the parent, if focus is inside it.</li>
</ul>

<p class="info info--orange">
  Do not remove <code>outline</code> on <code>:focus</code> — it breaks keyboard accessibility. Trick: drop it on
  <code>:focus</code>, bring it back on <code>:focus-visible</code> — the mouse won't see it, the keyboard will.
</p>

<h3>Structural pseudo-classes</h3>

<p>They pick an element by position among <strong>siblings</strong> (children of one parent):</p>

<ul>
  <li><code>:first-child</code>, <code>:last-child</code>, <code>:only-child</code>.</li>
  <li><code>:nth-child(An+B)</code> — by formula: <code>2n</code>, <code>odd</code>, <code>3n+1</code>.</li>
  <li><code>:nth-of-type()</code>, <code>:first-of-type</code> — same, counting only elements of the same tag.</li>
  <li><code>:empty</code> — no children, no text.</li>
</ul>

<code class="code">
  li:nth-child(2n)      /* zebra striping */
  li:nth-child(-n + 3)  /* first three */
  p:first-of-type       /* first p, even if an h2 comes before it */
</code>

<h3>Functional pseudo-classes (Modern CSS)</h3>

<ul>
  <li><code>:is(a, b)</code> — grouping instead of long comma lists.</li>
  <li><code>:where(a, b)</code> — same, but with <span class="accent">specificity 0</span>: for base styles and libraries.</li>
  <li><code>:not(sel)</code> — negation.</li>
  <li><code>:has(sel)</code> — "parent selector": element with a matching descendant <strong>inside</strong> it.</li>
</ul>

<code class="code">
  /* before: 6 comma-separated selectors */
  :is(.content, .section) :is(h1, h2, h3) { color: red; }

  .card:has(img)                 /* a card containing an image */
  label:has(+ input:invalid)     /* highlight label before an invalid field */
</code>

<h3>Form pseudo-classes</h3>

<ul>
  <li><code>:checked</code> — checked checkbox, radio, <code>option</code>.</li>
  <li><code>:disabled</code> / <code>:enabled</code>, <code>:required</code> / <code>:optional</code>, <code>:read-only</code>.</li>
  <li><code>:valid</code> / <code>:invalid</code> — result of built-in HTML validation.</li>
  <li><code>:user-valid</code> / <code>:user-invalid</code> — same, but only <strong>after</strong> user interaction.</li>
  <li><code>:placeholder-shown</code> — field empty, placeholder visible (basis for floating labels).</li>
</ul>

<p class="info info--blue">
  <code>:checked</code> + <code>~</code>/<code>+</code> gives accordions and tabs without JS, and <code>:has()</code>
  drops the requirement that the trigger come before the target in the markup.
</p>

<p class="deep-dive">Deep Dive</p>

<h3>Specificity of functional pseudo-classes</h3>

<p>
  This is the main trap. <code>:is()</code>, <code>:not()</code> and <code>:has()</code> weigh 0 by themselves, but they take on
  the specificity of the <strong>heaviest argument</strong> in the list. <code>:where()</code> always weighs 0, no matter what you put in it.
</p>

<code class="code">
  :is(#main, p) span { }    /* specificity 1,0,1 — same as #main! */
  :where(#main, p) span { } /* specificity 0,0,1 — same as a single span */
  li:not(.a, #b) { }        /* 1,0,1 — #b is taken */
</code>

<p class="info info--orange">
  Conclusion: <code>:where()</code> is for styles that must be easy to override (reset, design-system defaults).
  <code>:is()</code> — only when you deliberately need the argument's weight.
</p>

<h3>Forgiving selector list</h3>

<p>
  <code>:is()</code> and <code>:where()</code> use a forgiving list: if one selector inside is invalid or unknown to the
  browser, the rest keep working. In a plain comma-separated list a single mistake kills the whole rule —
  which makes <code>:is()</code> handy for progressively adopting new selectors.
</p>

<code class="code">
  /* the rule is dropped entirely */
  .a, .b:unknown-thing { color: red; }

  /* .a still works */
  :is(.a, .b:unknown-thing) { color: red; }
</code>

<p>
  <code>:has()</code> and <code>:not()</code> are <strong>not</strong> forgiving: an invalid argument inside them discards the whole selector.
</p>

<h3>:nth-child(An+B of S)</h3>

<p>
  The extended syntax: first filter the siblings by selector <code>S</code>, then count by the formula.
  This is not the same as <code>:nth-child(2n).item</code> — there counting runs over all children and the filter is applied at the end.
</p>

<code class="code">
  li:nth-child(2n of .visible)  /* every second among the visible ones */
  li:nth-child(2n).visible      /* every second of ALL, and it must be .visible */
</code>

<h3>Why :has() took so long to arrive</h3>

<p>
  The browser matches selectors <span class="accent">right to left</span> — from the candidate element up through its ancestors.
  A "parent" selector breaks that model: to decide the parent's fate you have to look into the subtree, and that subtree may
  change later (streaming parsing, dynamic DOM). Style invalidation then has to propagate upwards, not only downwards.
  Only in 2023 did engines learn to do this cheaply enough, so <code>:has()</code> is safe in practice —
  but you should not hang it on very broad selectors like <code>*:has(...)</code>.
</p>

<h3>:focus-visible: the browser heuristic</h3>

<p>
  The spec does not pin down an exact algorithm. In practice engines highlight focus if it came from the keyboard,
  if the element is a text field (the caret is always needed there), or if focus was set by a script while the previous
  interaction was keyboard-based. A mouse click on a button gives <code>:focus</code>, but not <code>:focus-visible</code>.
</p>

<h3>:valid / :invalid vs :user-valid / :user-invalid</h3>

<p>
  An empty required field is <code>:invalid</code> right at page load — the form turns red before the user has typed
  anything. <code>:user-invalid</code> solves this: the browser applies it only after input or a submit attempt.
  That is exactly why "correct" pure-CSS validation today is written with <code>:user-invalid</code>,
  not with <code>:invalid</code>.
</p>
