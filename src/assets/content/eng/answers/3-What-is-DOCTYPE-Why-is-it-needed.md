<h3>What is DOCTYPE?</h3>
<p>
  <span class="accent">&lt;!DOCTYPE html></span> is a declaration (not an HTML tag) that must be
  the very first line of the document. It tells the browser which rules to use for parsing and rendering the page.
</p>

<p class="info">
  <strong>Key idea:</strong> today DOCTYPE is a rendering-mode switch.
  With it, the browser works in <strong>standards mode</strong> (following modern specs);
  without it — in <strong>quirks mode</strong>, emulating the bugs of late-90s browsers.
</p>

<code class="code">
  &lt;!DOCTYPE html>
  &lt;html>
    ...
  &lt;/html>
</code>

<h3>Why is DOCTYPE needed?</h3>
<ul>
  <li>
    It enables <strong>standards mode</strong> — the page renders predictably
    and identically across all browsers.
  </li>
  <li>
    Without it, the browser falls into <strong>quirks mode</strong>: a different box model (like in old IE),
    different sizing of inline elements and tables — the layout "drifts".
  </li>
  <li>
    It is needed for validation: the validator checks the code against the declared HTML version.
  </li>
</ul>

<p class="info info--orange">
  DOCTYPE does not "enable" HTML5 features: new tags and APIs work without it.
  It affects specifically the rendering mode (primarily CSS layout),
  so its absence breaks the layout, not JavaScript.
</p>

<h3>Types of DOCTYPE</h3>
<p>
  Before HTML5, the declaration referenced a <span class="accent">DTD</span> (Document Type Definition) —
  a formal grammar description of a specific language version. Hence the bulky variants:
  <strong>HTML 4.01</strong> and <strong>XHTML 1.0</strong> in Strict / Transitional / Frameset editions, plus XHTML 1.1.
</p>

<p>
  HTML5 shortened the declaration to <code>&lt;!DOCTYPE html></code> — the minimal string
  guaranteed to trigger standards mode in all browsers. Today it is the only one in use.
</p>

<h3>Can you do without DOCTYPE?</h3>
<p>
  Technically — yes, the page will render, but in quirks mode, and every browser has
  its own "quirks": the layout will differ, and debugging those discrepancies is painful.
</p>

<p class="info info--blue">
  In practice: always start the document with <code>&lt;!DOCTYPE html></code>.
  Case does not matter (<code>&lt;!doctype html></code> is also valid),
  but the declaration must come before any other page content.
</p>

<p class="deep-dive">Deep Dive</p>

<h3>Rendering modes: there are actually three</h3>
<p>
  The browser picks the mode by "sniffing" the DOCTYPE — by its exact text:
</p>
<ul>
  <li>
    <strong>No-quirks (standards) mode</strong> — triggered by the modern <code>&lt;!DOCTYPE html></code>
    and by old Strict DTDs. Full compliance with the specifications.
  </li>
  <li>
    <strong>Limited-quirks (almost standards) mode</strong> — triggered by Transitional/Frameset DTDs with a URI.
    It differs from standards mode only in how images are rendered in table cells:
    the image sits flush with the bottom of the cell, with no gap under the text baseline.
  </li>
  <li>
    <strong>Quirks mode</strong> — when the DOCTYPE is missing, or outdated/incomplete.
  </li>
</ul>

<h4>What exactly breaks in quirks mode</h4>
<ul>
  <li>
    The IE5-style box model: <code>width</code>/<code>height</code> include
    <code>padding</code> and <code>border</code> (like <code>box-sizing: border-box</code>,
    but forced, for all elements).
  </li>
  <li>
    Unitless dimensions are treated as pixels (<code>width: 100</code> will work).
  </li>
  <li>
    Font styles are not inherited into tables — text inside <code>&lt;table></code>
    ignores the parent's <code>font-family</code> and <code>font-size</code>.
  </li>
  <li>
    <code>line-height</code>, vertical alignment of inline content,
    and color values in non-standard formats all behave differently.
  </li>
</ul>

<p>
  You can check the current mode from JavaScript via <code>document.compatMode</code>:
  <code>"CSS1Compat"</code> — standards/limited-quirks, <code>"BackCompat"</code> — quirks mode.
</p>

<h3>Historical background: where all this came from</h3>
<p>
  In the 90s, browsers rendered pages with deviations from the standards (the most famous example —
  the IE box model). When browsers started fixing their behavior to match the specs,
  a problem arose: millions of old sites were built around the bugs and would "break" under honest rendering.
  The solution was <strong>DOCTYPE switching</strong> (first in IE5/Mac): the new correct rendering
  is enabled only when a "modern" DOCTYPE is present, while old pages without one
  keep being processed the old way. Thus quirks mode became a museum of bugs that browsers
  are obliged to maintain to this day.
</p>

<p>
  This is what the declaration looked like before HTML5:
</p>

<code class="code">
  &lt;!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN"
    "http://www.w3.org/TR/html4/strict.dtd">
</code>

<p>
  DTD is a legacy of SGML, on which HTML was formally based up to and including version 4.01.
  HTML5 abandoned SGML: its parser is described algorithmically in the specification, the DTD is no longer needed,
  so the declaration degenerated into a short marker saying "render by the standards".
</p>

<p class="info info--blue">
  An XHTML document served with the MIME type <code>application/xhtml+xml</code>
  always renders in standards mode — DOCTYPE sniffing applies only to <code>text/html</code>.
</p>
