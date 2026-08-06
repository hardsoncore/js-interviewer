<h3>Introduction</h3>
<p>An object never takes part in arithmetic or concatenation "as is": before the operation the engine runs the internal <span class="accent">ToPrimitive</span> algorithm that reduces the object to a primitive. It is driven by a <strong>hint</strong> — a suggestion about which type of value the operation expects.</p>

<p class="info"><strong>Key idea:</strong> the hint does not pick the result — it only picks the <strong>order</strong> in which <code>valueOf</code> and <code>toString</code> are called. The engine takes the first returned primitive, and if a method returns an object it tries the second one.</p>

<h3>Three hints and the call order</h3>
<ul>
  <li><code>"string"</code> — <code>String(obj)</code> and template literals: <code>toString()</code> first, then <code>valueOf()</code>.</li>
  <li><code>"number"</code> — math (<code>obj * 2</code>, <code>obj &lt; other</code>) and <code>Number(obj)</code>: <code>valueOf()</code> first, then <code>toString()</code>.</li>
  <li><code>"default"</code> — binary <code>+</code> and <code>==</code>: the operation does not know what it expects, so it behaves like <code>"number"</code> (except for <code>Date</code>).</li>
</ul>

<h3>Default behavior</h3>
<p>For a plain object <code>valueOf()</code> returns <strong>the object itself</strong> — that is not a primitive, so the result is discarded and the engine falls back to <code>toString()</code> with its <code>"[object Object]"</code>. Hence <code>obj1 + obj2</code> gives <code>"[object Object][object Object]"</code>, while <code>obj * 2</code> gives <code>NaN</code>. For arrays, though, <code>toString()</code> is <code>join(',')</code>, so <code>[1, 2] + ''</code> gives <code>"1,2"</code>.</p>

<h3>Customization</h3>
<code class="code">
  const money = {
    amount: 100,
    valueOf() { return this.amount; },        // hints "number" and "default"
    toString() { return `$${this.amount}`; }  // hint "string"
  };

  money * 2;           // 200
  money + 5;           // 105 — "default" takes the numeric path
  `Price: ${money}`;   // "Price: $100"
</code>
<p>Since ES6 there is a higher-priority way — the <code>[Symbol.toPrimitive](hint)</code> method: if it is declared, the engine calls only it and passes the hint explicitly.</p>

<p class="info info--orange">Trap: by overriding <code>toString()</code> alone you cover <strong>both</strong> contexts — in the numeric one <code>valueOf()</code> returns an object, so the engine ends up at it anyway. The reverse is not true: with only <code>valueOf()</code> a string context still yields <code>"[object Object]"</code> — the default <code>toString()</code> runs first and returns a valid primitive.</p>

<p class="deep-dive">Deep Dive</p>

<h3>The ToPrimitive algorithm per the spec</h3>
<ol>
  <li>If the object has <code>[Symbol.toPrimitive]</code> — call it with the hint. Returned an object → <code>TypeError</code>, nothing else is tried.</li>
  <li>Otherwise <code>OrdinaryToPrimitive</code> runs with a method list: <code>["valueOf", "toString"]</code> for the <code>"number"</code>/<code>"default"</code> hints and <code>["toString", "valueOf"]</code> for <code>"string"</code>.</li>
  <li>For each method in the list: if it is callable and returned <strong>a non-object</strong> — that is the result. Otherwise move on to the next one.</li>
  <li>Neither produced a primitive → <code>TypeError: Cannot convert object to primitive value</code>.</li>
</ol>

<code class="code">
  const bare = Object.create(null); // no prototype → no toString and no valueOf
  `${bare}`;                        // TypeError: Cannot convert object to primitive value

  const weird = { [Symbol.toPrimitive]() { return {}; } };
  weird + 1;                        // TypeError — an object was returned from toPrimitive
</code>

<h3>Date — the only exception for the "default" hint</h3>
<p>Historically <code>Date</code> treats <code>"default"</code> as <code>"string"</code>: before ES6 adding dates was considered concatenation, and that behavior was locked into the standard. The practical consequence is asymmetric operators:</p>
<code class="code">
  const a = new Date(2026, 0, 1);
  const b = new Date(2026, 0, 2);

  b - a;   // 86400000 — minus gives the "number" hint → valueOf() → timestamp
  a + b;   // "Thu Jan 01 2026...Fri Jan 02 2026..." — plus gives "default" → toString()
</code>
<p class="info info--blue">Hence the idioms <code>+new Date()</code> and <code>date * 1</code>: the unary plus and multiplication force the numeric hint, bypassing the string behavior of <code>Date</code>.</p>

<h3>Where ToPrimitive is not involved</h3>
<ul>
  <li><strong>Boolean conversion.</strong> It calls neither <code>valueOf</code> nor <code>toString</code>: any object is always <code>true</code>. That is why <code>if (new Boolean(false))</code> enters the branch and <code>if ([])</code> is truthy, even though <code>[] == false</code> gives <code>true</code> (there ToPrimitive and numeric comparison do kick in).</li>
  <li><strong><code>JSON.stringify</code>.</strong> It uses its own <code>toJSON()</code> hook, not ToPrimitive. An overridden <code>toString()</code> does not affect serialization.</li>
  <li><strong><code>Object.prototype.toString.call(x)</code>.</strong> It reads <code>Symbol.toStringTag</code> and serves to detect the internal type (<code>"[object Array]"</code>, <code>"[object Date]"</code>). The object's own <code>toString()</code> does not affect it.</li>
</ul>

<h3>Edge cases and interview tricks</h3>
<ul>
  <li><code>[] + {}</code> → <code>"[object Object]"</code>: an empty array gives <code>""</code>. But <code>{} + []</code> in the console returns <code>0</code> — the braces are parsed as a code block, leaving a unary plus applied to the array.</li>
  <li>If <code>ToPrimitive</code> returned a <code>Symbol</code>, a string context throws a <code>TypeError</code>: symbols are not implicitly converted to strings.</li>
  <li><code>==</code> between an object and a primitive first converts the object using the <code>"default"</code> hint, which is why <code>[1] == 1</code> is <code>true</code>.</li>
  <li>The result of <code>ToPrimitive</code> is not required to match the hint: you may return a string for the <code>"number"</code> hint, and the engine will accept it and continue the operation with it.</li>
</ul>

<p class="info info--blue">In practice: for value objects (money, temperature, date range) declare <code>Symbol.toPrimitive</code> — it explicitly separates formatting (<code>"string"</code>) from computation (<code>"number"</code>), whereas the <code>valueOf</code>/<code>toString</code> pair leaves the behavior under <code>+</code> non-obvious to the reader.</p>
