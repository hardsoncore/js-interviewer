<h3>1. The Essence of Relative Units</h3>

<p>
  <span class="accent">Relative units</span> are a way to set sizes in CSS that allows elements to adapt to different display conditions.
</p>

<p>
  Unlike absolute units (such as <code>px</code>, which are strictly tied to the physical pixels of the screen), relative units calculate their final value dynamically. Their value always depends on the context.
</p>

<p>
  Knowing how to manage this context is the key to creating flexible UI components.
</p>

<h3>2. Context Management: <code>em</code> vs. <code>rem</code></h3>
<p>
  This is a classic pair that trips up many developers. It is important to clearly explain the difference in their context.
</p>

<p>
  <code>rem</code> (Root em): The context is the base font size of the root element (<code>&lt;html&gt;</code>).
</p>

<p>
  Pros: Absolute predictability. <code>1rem</code> will be equal to the same value everywhere on the page. This is the gold standard for setting global typography and grid spacing (<code>margin</code>/<code>padding</code>).
</p>

<p>
  <code>em</code>: The context is the font size of the current or parent element.
</p>

<p>
  Cons (snowball effect): If you nest elements with a font size in <code>em</code> inside each other, they will start multiplying in a cascade, and the text will either disappear or become huge. Therefore, <code>em</code> should not be used for global typography.
</p>

<p>
  Pros (component isolation): This is an ideal tool for scalable UI components. For example, if a button has a <code>padding: 0.5em 1em</code> and an icon size of <code>1.5em</code>, you only need to change the <code>font-size</code> on the button component itself, and all internal spacings and icons will proportionally change on their own.
</p>

<h3>3. Window Context: Viewport units (vw, vh)</h3>
<p>
  The context is the size of the visible area of the browser window.
</p>

<p>
  It is important to show here that you know about modern issues. The classic <code>100vh</code> behaves poorly on mobile devices (especially in Safari): the bottom part of the block hides behind the browser's navigation bar.
</p>

<p>
  Interview trump card: Mention that to solve this problem, you use modern relative units: <code>dvh</code> (Dynamic Viewport Height), which dynamically recalculates the height taking into account the appearance/disappearance of the browser UI, and <code>svh</code> (Small Viewport Height).
</p>

<h3>4. Accessibility Issues (a11y)</h3>
<p>
  This is the most important part of the answer. The interviewer expects an understanding of how CSS affects real people, especially those with visual impairments.
</p>

<p>
  Rule #1: A taboo on pixels in typography<br>
  Never use <code>px</code> for <code>font-size</code>. Browsers have a base font size setting (the default is <code>16px</code>, but visually impaired users often set it to <code>24px</code> or <code>32px</code>).
</p>

<p>
  If you set <code>font-size: 16px</code>, you rigidly lock this size. The browser will ignore the user's settings. This is a failure for a11y.
</p>

<p>
  If you use <code>font-size: 1rem</code>, a regular user will have <code>16px</code> text, and for a visually impaired person, it will automatically adjust to their <code>24px</code>. The interface will remain accessible.
</p>

<p>
  Rule #2: The scaling trap with Viewport units<br>
  A typical mistake is to make "fluid" typography by setting <code>font-size: 2vw</code>.
</p>

<p>
  a11y problem: If the user tries to zoom in on the page using <code>Ctrl/Cmd +</code>, the text will not increase. Zoom changes the scale, but the physical window width (<code>vw</code>) remains the same. A person with poor vision will not be able to read the text.
</p>

<p>
  Solution: Use the CSS functions <code>calc()</code> or <code>clamp()</code>.
</p>

<p>
  Example: <code>font-size: clamp(1rem, 2vw + 1rem, 3rem);</code>. In this case, we guarantee that the font will never be smaller than the safe system <code>1rem</code> (keeping it accessible), while it smoothly grows with the screen up to a limit of <code>3rem</code>.
</p>

<h3>Brief Summary:</h3>
<p>
  "Relative units are a control tool. We use <code>rem</code> for global predictability and to ensure accessibility (respecting the user's browser settings). <code>em</code> is used locally to create self-scaling isolated components. And when using <code>vw</code>/<code>vh</code>, we must combine them with <code>rem</code> using <code>clamp</code> so as not to break the system browser zoom for people with poor vision."
</p>
