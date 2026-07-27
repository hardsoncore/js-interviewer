<h3>Introduction</h3>
<p><span class="accent">Combinators</span> in CSS describe the relationship between different selectors, allowing you to exactly specify where an element should be in the DOM structure relative to another element in order for styles to apply.</p>
<p class="info"><strong>TL;DR:</strong> Combinators let you target elements based on their relationships: <code>&gt;</code> for direct children, <code>+</code> for the first adjacent sibling, <code>~</code> for all following siblings.</p>

<h3>Child combinator (&gt;)</h3>
<p>Selects all elements that are <b>direct children</b> of the specified element. It does not select descendants deeper down (grandchildren, etc.).</p>

<code class="code">
  /* Selects <li> that are directly inside <ul> */
  ul &gt; li {
    color: red;
  }
</code>

<h3>Adjacent sibling combinator (+)</h3>
<p>Selects <b>only one</b> element that comes <b>immediately</b> after the specified element, if they share the same parent (are on the same level).</p>

<code class="code">
  /* Selects the first <p> going right after <h1> */
  h1 + p {
    font-weight: bold;
  }
</code>

<h3>General sibling combinator (~)</h3>
<p>Selects <b>all</b> following elements at the <b>same level</b> of nesting as the first element, even if there are other elements between them.</p>

<code class="code">
  /* Selects all <p> that come after <h2> at the same level */
  h2 ~ p {
    color: blue;
  }
</code>

<p class="info info--orange">Don't confuse the descendant combinator (space) and the child one (<code>&gt;</code>). A space (e.g. <code>div p</code>) will select <b>all</b> <code>&lt;p&gt;</code> inside a <code>&lt;div&gt;</code> at any nesting depth, while <code>&gt;</code> — only direct, first-level children.</p>