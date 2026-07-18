<h3>Semantic markup: what it is and why</h3>

<p>
  <span class="accent">Semantic markup</span> — choosing a tag by meaning, not by appearance:
  <code>&lt;nav&gt;</code> for navigation instead of a faceless <code>&lt;div&gt;</code>.
</p>

<p class="info">
  <strong>Key idea:</strong> HTML describes meaning, not appearance. This structure is understood
  by "machine readers": screen readers, search engines, the browser.
</p>

<ul>
  <li>
    <strong>Accessibility (a11y).</strong> Semantics gives the screen reader a "map" of the page
    for free: landmarks and headings.
  </li>
  <li><strong>SEO.</strong> Bots understand the structure better and rank more accurately.</li>
  <li>
    <strong>Readability and maintenance.</strong> Built-in behavior of native elements:
    focus and keyboard support for <code>&lt;button&gt;</code> come without extra code.
  </li>
</ul>

<h3>Main semantic HTML5 tags</h3>

<ul>
  <li><code>&lt;header&gt;</code> — header of the site or a section; there can be several.</li>
  <li><code>&lt;nav&gt;</code> — main navigation.</li>
  <li><code>&lt;main&gt;</code> — unique content; exactly one.</li>
  <li><code>&lt;section&gt;</code> — meaningful section; a heading is recommended.</li>
  <li><code>&lt;article&gt;</code> — independent unit: article, comment.</li>
  <li><code>&lt;aside&gt;</code> — secondary content: sidebar.</li>
  <li><code>&lt;footer&gt;</code> — closing part of the site or a section.</li>
</ul>

<code class="code">
  &lt;header&gt;&lt;nav&gt;Menu&lt;/nav&gt;&lt;/header&gt;
  &lt;main&gt;
    &lt;article&gt;
      &lt;h1&gt;Article&lt;/h1&gt;
      &lt;section&gt;Section&lt;/section&gt;
    &lt;/article&gt;
    &lt;aside&gt;Related&lt;/aside&gt;
  &lt;/main&gt;
  &lt;footer&gt;Copyright&lt;/footer&gt;
</code>

<h3>article vs section vs div</h3>

<ol>
  <li>Can be named and moved to another site — <code>&lt;article&gt;</code>.</li>
  <li>Can be named but not moved — <code>&lt;section&gt;</code>.</li>
  <li>No sensible name comes to mind — just a container, <code>&lt;div&gt;</code>.</li>
</ol>

<h3>Accessibility and ARIA</h3>

<p>
  Semantic tags have built-in <span class="accent">ARIA roles</span>
  (<code>&lt;nav&gt;</code> → <code>navigation</code>), which the screen reader uses to build navigation.
  No native tag available — add the role via ARIA attributes (<code>role</code>, <code>aria-label</code>).
</p>

<p class="info info--orange">
  A "button" made of <code>&lt;div onclick&gt;</code>: no focus, no Enter/Space, no role for the screen
  reader. The first rule of ARIA — don't use ARIA if a native tag exists.
</p>

<p class="deep-dive">Deep Dive</p>

<h3>Tags in detail: meaning, specifics, common mistakes</h3>

<h4>&lt;article&gt;</h4>
<p>
  An independent, detachable unit of meaning: comment, tweet, article, widget. A heading inside is
  recommended. Common mistake — confusing it with <code>&lt;section&gt;</code> and <code>&lt;div&gt;</code>.
</p>

<h4>&lt;section&gt;</h4>
<p>
  A meaningful section of the document, non-detachable unlike <code>&lt;article&gt;</code>. A heading inside
  is recommended. A <code>&lt;section&gt;</code> without an accessible name (a heading or
  <code>aria-label</code>) is barely different from a <code>&lt;div&gt;</code> for a screen reader —
  it only gets the <code>region</code> landmark role when named.
</p>

<h4>&lt;aside&gt;</h4>
<p>
  Secondary, tangential content of the page; may appear several times. Common mistake — treating it as
  a "sidebar" tag and using it for main content related to the surrounding elements.
</p>

<h4>&lt;nav&gt;</h4>
<p>
  A section with the main navigation; whether it is "main" is up to the developer. A short list of links
  in the footer (home, terms, copyright) does not need a <code>&lt;nav&gt;</code> wrapper — the
  <code>&lt;footer&gt;</code> itself is enough. It may contain navigation in any form,
  not necessarily a list.
</p>

<h4>&lt;header&gt; and &lt;footer&gt;</h4>
<p>
  The introductory and closing parts of the site <strong>or of any meaningful section</strong> — that's why
  there can be several per page (each <code>&lt;article&gt;</code> can have its own). Common mistake —
  using them only as the site header and footer. A <code>&lt;footer&gt;</code> doesn't have to be
  at the end of its section.
</p>

<h4>&lt;main&gt;</h4>
<p>
  The main content that doesn't repeat on other pages; one per page. Mistake — putting cross-page
  elements inside it: navigation, copyright.
</p>

<h3>Landmarks: the page map for a screen reader</h3>

<p>The mapping between tags and landmark roles that powers quick navigation in screen readers:</p>

<ul>
  <li><code>&lt;header&gt;</code> (top-level) → <code>banner</code></li>
  <li><code>&lt;nav&gt;</code> → <code>navigation</code></li>
  <li><code>&lt;main&gt;</code> → <code>main</code></li>
  <li><code>&lt;aside&gt;</code> → <code>complementary</code></li>
  <li><code>&lt;footer&gt;</code> (top-level) → <code>contentinfo</code></li>
  <li><code>&lt;section&gt;</code> with an accessible name → <code>region</code></li>
  <li><code>&lt;form&gt;</code> with an accessible name → <code>form</code>, search — <code>&lt;search&gt;</code> → <code>search</code></li>
</ul>

<p class="info info--blue">
  If a page has several identical landmarks (e.g. two <code>&lt;nav&gt;</code>), give each a distinguishable
  name via <code>aria-label</code>: "Main menu", "Breadcrumbs".
</p>

<h3>Text semantics and the "old" tags</h3>

<p>
  Semantics is not only about the page skeleton. <code>&lt;p&gt;</code>, <code>&lt;ul&gt;/&lt;ol&gt;</code>,
  <code>&lt;table&gt;</code>, <code>&lt;blockquote&gt;</code> are semantic tags too. But
  <code>&lt;b&gt;</code> and <code>&lt;i&gt;</code> are presentational: they describe appearance, not meaning.
  The semantic counterparts are <code>&lt;strong&gt;</code> (importance) and <code>&lt;em&gt;</code>
  (emphasis, intonation): screen readers and search engines respect exactly those. For small phrase-level
  fragments with no meaning of their own, <code>&lt;span&gt;</code> remains.
</p>

<p>
  Useful but often forgotten semantic tags: <code>&lt;figure&gt;/&lt;figcaption&gt;</code>
  (illustration with a caption), <code>&lt;time datetime="..."&gt;</code> (machine-readable date),
  <code>&lt;details&gt;/&lt;summary&gt;</code> (native accordion), <code>&lt;dialog&gt;</code>
  (modal with focus management), <code>&lt;address&gt;</code> (contact information).
</p>

<h3>The order of semantic page markup</h3>

<ol>
  <li>Large page blocks: <code>&lt;header&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;footer&gt;</code>.</li>
  <li>Sections inside blocks: <code>&lt;nav&gt;</code>, <code>&lt;section&gt;</code>, <code>&lt;article&gt;</code>, <code>&lt;aside&gt;</code>.</li>
  <li>The document heading and section headings: <code>&lt;h1&gt;–&lt;h6&gt;</code>.</li>
  <li>Smaller elements inside sections: lists, tables, forms, paragraphs, quotes.</li>
  <li>Phrase-level elements: links, buttons, images, time, text emphasis.</li>
</ol>

<p class="info info--orange">
  The heading hierarchy must be sequential (no jumping from <code>h2</code> to <code>h5</code>).
  The HTML5 "outline algorithm", which promised to recalculate <code>&lt;h1&gt;</code> levels based on
  section nesting, was never implemented by any browser and was removed from the specification —
  heading levels must be set explicitly.
</p>

<h3>Historical note</h3>

<p>
  Before HTML5 (2008+), page skeletons were built from tables and <code>&lt;div id="nav"&gt;</code>-style
  constructs. Analysis of millions of pages (including a Google study) revealed the most popular
  <code>id</code> and <code>class</code> values — <code>header</code>, <code>footer</code>,
  <code>nav</code>, <code>content</code>. Those became the new tags of the standard: the specification
  codified what developers were already marking up by hand.
</p>
