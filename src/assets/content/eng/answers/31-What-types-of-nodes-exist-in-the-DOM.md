<h3>Introduction</h3>
<p>The browser parses HTML and builds the DOM — a tree where <span class="accent">every part of the document is represented by a node (Node)</span>: a tag becomes an element, text becomes a text node, a comment becomes a comment node. The specification defines 12 node types, but in the modern DOM only about five are actually used.</p>

<p class="info"><strong>Key idea:</strong> all nodes inherit the common <code>Node</code> interface — hence the shared navigation and <code>nodeType</code> — but differ in their own API: attributes, styles, and querying exist only on elements, while text and comments store nothing but a string of data.</p>

<h3>Main node types</h3>
<ul>
  <li><strong>Document</strong> (<code>nodeType: 9</code>) — the root of the tree and the entry point into the DOM: the <code>document</code> object.</li>
  <li><strong>Element</strong> (<code>1</code>) — HTML tags. The only type with attributes, classes, styles, and querying (<code>querySelector</code>).</li>
  <li><strong>Text</strong> (<code>3</code>) — any text inside elements, including spaces and line breaks between tags.</li>
  <li><strong>Comment</strong> (<code>8</code>) — <code>&lt;!-- --&gt;</code>: not rendered, but a full-fledged tree node accessible from JS.</li>
  <li><strong>DocumentFragment</strong> (<code>11</code>) — a lightweight container for assembling a subtree in memory; when inserted into the DOM, its children are moved, not the fragment itself.</li>
</ul>

<h3>How they differ</h3>
<ul>
  <li><code>nodeType</code> — the numeric type code (1, 3, 8, 9…).</li>
  <li><code>nodeName</code> — the name: for an element — the tag (<code>DIV</code>), for text — <code>#text</code>, for the document — <code>#document</code>.</li>
  <li><code>nodeValue</code> — the content of text nodes and comments; <code>null</code> for elements.</li>
  <li><code>children</code> exists only on elements and contains only elements, while <code>childNodes</code> holds all nodes, including text and comments.</li>
</ul>

<code class="code">
  &lt;div&gt;Hello &lt;!-- x --&gt;&lt;b&gt;world&lt;/b&gt;&lt;/div&gt;

  div.children.length;   // 1 — only &lt;b&gt;
  div.childNodes.length; // 3 — text, comment, &lt;b&gt;
</code>

<p class="info info--orange">A common trap: spaces and line breaks between tags are also <code>Text</code> nodes, so <code>firstChild</code> often turns out to be text rather than an element. For element-only navigation there are <code>firstElementChild</code> and <code>nextElementSibling</code>.</p>

<h3>Why different types are needed</h3>
<p>It is separation of concerns: each kind of content gets its own object with its own API, and any part of the document can be manipulated from JS uniformly — as a tree node. Practical applications:</p>
<ul>
  <li><strong>DocumentFragment</strong> — batching insertions: assemble a list in memory and insert it in a single operation, triggering one reflow instead of many.</li>
  <li><strong>Comment</strong> — framework "anchors": Angular and Vue mark conditional rendering spots with comments (<code>ng-container</code>, <code>v-if</code>).</li>
</ul>

<p class="deep-dive">Deep Dive</p>

<h3>Class hierarchy</h3>
<p>Node types form an inheritance chain: <code>EventTarget</code> → <code>Node</code> → concrete classes.</p>
<ul>
  <li><code>Element</code> → <code>HTMLElement</code> → <code>HTMLInputElement</code>, <code>HTMLDivElement</code>, etc. — the further down the chain, the more specific the API: for example, <code>value</code> exists only on input fields.</li>
  <li><code>CharacterData</code> — the common parent of <code>Text</code> and <code>Comment</code>: it stores the <code>data</code> string and methods for working with it (<code>appendData</code>, <code>deleteData</code>).</li>
  <li><code>Document</code>, <code>DocumentFragment</code>, <code>DocumentType</code> — separate branches off <code>Node</code>.</li>
</ul>
<p class="info info--blue">Checking a node's kind is more convenient via <code>instanceof</code> (<code>node instanceof HTMLElement</code>) — it reads better than comparing magic <code>nodeType</code> numbers and respects inheritance.</p>

<h3>The full list of 12 types</h3>
<p>Historically the DOM defined 12 types; some are relics of the XML era removed from the modern standard (DOM4): <code>CDATASection</code> (4), <code>EntityReference</code> (5), <code>Entity</code> (6), <code>Notation</code> (12). <code>ProcessingInstruction</code> (7) occurs only in XML documents. <code>DocumentType</code> (10) is the <code>&lt;!DOCTYPE html&gt;</code> node, accessible as <code>document.doctype</code>. <code>Attr</code> (2) formally remains, but attributes are no longer child nodes of the tree — they are accessed via <code>getAttribute</code> / <code>setAttribute</code>.</p>

<h3>Text nodes under the hood</h3>
<ul>
  <li>After DOM manipulations, adjacent text nodes can appear in the tree: <code>normalize()</code> merges them, and <code>splitText(offset)</code> splits one node into two — used, for example, by the Range API during text selection.</li>
  <li><code>textContent</code> collects the text of all descendants without a reflow; <code>innerText</code> respects CSS visibility and triggers a reflow; <code>innerHTML</code> parses the string as markup — it carries an XSS risk.</li>
</ul>

<h3>DocumentFragment and modern APIs</h3>
<ul>
  <li>The content of <code>&lt;template&gt;</code> (the <code>content</code> property) is a DocumentFragment: it is inert — scripts do not run and images do not load until the fragment is cloned into the document.</li>
  <li><code>ShadowRoot</code> from Shadow DOM inherits from DocumentFragment — it is the root of a web component's isolated subtree.</li>
  <li>Modern engines batch sequential insertions quite well on their own, so the fragment's win is not always dramatic, but it remains the idiomatic way to assemble a subtree "outside" the document.</li>
</ul>

<h3>Nuances of names and values</h3>
<ul>
  <li><code>tagName</code> exists only on elements, <code>nodeName</code> — on all nodes. In HTML documents the tag name is returned in uppercase, in XML — as written.</li>
  <li>On <code>Text</code> and <code>Comment</code>, the <code>nodeValue</code> and <code>data</code> properties are synonyms.</li>
</ul>
