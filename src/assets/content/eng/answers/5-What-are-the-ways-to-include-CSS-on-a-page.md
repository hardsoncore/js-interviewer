<h3>Four ways to include CSS</h3>

<p>
  An external file via <code>&lt;link&gt;</code>, the <code>&lt;style&gt;</code> tag, the inline
  <code>style</code> attribute, and <code>@import</code> inside CSS. The fifth, dynamic path — through JavaScript.
</p>

<p class="info">
  <strong>Key idea:</strong> the default standard is an external file via <code>&lt;link&gt;</code>
  in <code>&lt;head&gt;</code>: the browser caches it and reuses it across pages, and styles stay separated
  from the markup. Everything else serves specific use cases.
</p>

<h3>External file: the link tag</h3>

<code class="code">
  &lt;link rel="stylesheet" href="styles.css"&gt;
</code>

<ul>
  <li>Multiple files download in parallel.</li>
  <li>The <code>media</code> attribute applies styles conditionally: <code>media="(max-width: 600px)"</code>.</li>
  <li>The <code>type="text/css"</code> attribute is unnecessary in HTML5.</li>
</ul>

<h3>Embedded styles: the style tag</h3>

<code class="code">
  &lt;style&gt;
    .promo { color: tomato; }
  &lt;/style&gt;
</code>

<p>
  Styles live right in the HTML: they aren't cached separately and aren't reused by other pages.
  The practical use case is <span class="accent">Critical CSS</span>: inlining above-the-fold styles
  so the first screen renders without waiting for a file.
</p>

<h3>Inline styles: the style attribute</h3>

<code class="code">
  &lt;p style="color: tomato"&gt;Text&lt;/p&gt;
</code>

<p>
  Applies to a single element, has the highest specificity (beaten only by <code>!important</code>)
  and can't be overridden from stylesheets — which is why it's avoided in hand-written markup. Legitimate
  use cases are dynamic values from JS and email markup.
</p>

<h3>Import inside CSS: @import</h3>

<code class="code">
  @import url("theme.css");
</code>

<p>
  Includes one CSS file from another (or from a <code>&lt;style&gt;</code> tag). The directive must come
  before all rules.
</p>

<p class="info info--orange">
  In production, <code>@import</code> is avoided: the browser learns about the nested file only after loading
  the parent one — files download sequentially, and rendering stays blocked longer. In Sass and bundlers
  imports are safe — they are resolved at build time.
</p>

<h3>Styles through JavaScript</h3>

<p>
  <code>element.style</code> writes to the inline attribute; toggling classes via <code>classList</code>
  is preferable; you can also create <code>&lt;style&gt;</code> and <code>&lt;link&gt;</code> tags
  on the fly — that's how CSS-in-JS libraries work.
</p>

<p class="deep-dive">Deep Dive</p>

<h3>CSS blocks rendering</h3>

<p>
  Any included CSS is a <span class="accent">render-blocking</span> resource: the browser won't paint the page
  until it downloads the styles and builds the CSSOM — otherwise the user would see a flash of unstyled content
  (FOUC). That's why styles go into <code>&lt;head&gt;</code> — the earlier the browser learns about them,
  the earlier the download starts. The exception: a <code>&lt;link&gt;</code> whose <code>media</code> doesn't
  match the current environment (e.g. <code>media="print"</code> on screen) downloads with low priority
  and doesn't block rendering.
</p>

<h4>The async stylesheet loading trick</h4>

<code class="code">
  &lt;link rel="stylesheet" href="rest.css" media="print" onload="this.media='all'"&gt;
</code>

<p>
  That's how non-critical styles are loaded: <code>media="print"</code> removes the render blocking, and once
  loaded, the file activates for all devices. It pairs with Critical CSS in <code>&lt;style&gt;</code>:
  the critical part inlined, the rest async.
</p>

<h3>Why @import is that bad: a request waterfall</h3>

<p>
  The browser's <span class="accent">preload scanner</span> finds <code>&lt;link&gt;</code> and
  <code>&lt;script&gt;</code> in the HTML even before the main parsing and kicks off downloads early.
  <code>@import</code> is invisible to it: the browser learns about the nested file only after downloading
  and parsing the parent CSS. A chain of three <code>@import</code>s means three sequential network
  round-trips instead of one parallel volley.
</p>

<h3>Rarely remembered ways</h3>

<ul>
  <li>
    <code>&lt;link rel="stylesheet"&gt;</code> inside <code>&lt;body&gt;</code> — valid per the modern
    standard; used for styling individual widgets, but risks causing FOUC for content earlier in the document.
  </li>
  <li>
    <strong>Constructable Stylesheets</strong>: <code>new CSSStyleSheet()</code> +
    <code>adoptedStyleSheets</code> — a programmatic stylesheet; a single object is shared between the document
    and Shadow DOM without duplication or re-parsing.
  </li>
  <li>
    <strong>CSSOM API</strong>: <code>document.styleSheets</code>, <code>insertRule</code> /
    <code>deleteRule</code> — direct rule editing from JS; that's how CSS-in-JS libraries work
    in production mode, bypassing stylesheet text rewrites.
  </li>
  <li>
    <strong>Alternate stylesheets</strong>: <code>rel="alternate stylesheet" title="..."</code> —
    switchable themes via browser UI; barely used in practice.
  </li>
</ul>

<h3>Does the inclusion method affect priority</h3>

<p>
  Between <code>&lt;link&gt;</code>, <code>&lt;style&gt;</code> and <code>@import</code> there is no
  "per-method" priority — with equal specificity, the rule declared later wins. Rules from <code>@import</code>
  count as declared at the import point, i.e. before the parent file's own rules. Inline styles stand apart:
  they beat any selectors. The cascade and specificity are covered in detail in the question about CSS
  style priority.
</p>
