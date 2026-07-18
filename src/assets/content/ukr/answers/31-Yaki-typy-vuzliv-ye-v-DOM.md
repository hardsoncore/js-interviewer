<h3>Вступ</h3>
<p>Браузер парсить HTML і будує DOM — дерево, в якому <span class="accent">кожна частина документа представлена вузлом (Node)</span>: тег — елементом, текст — текстовим вузлом, коментар — вузлом-коментарем. Специфікація визначає 12 типів вузлів, але в сучасному DOM реально використовуються близько п'яти.</p>

<p class="info"><strong>Головна думка:</strong> усі вузли наслідують спільний інтерфейс <code>Node</code> — звідси єдині навігація та <code>nodeType</code>, — а різняться власним API: атрибути, стилі та пошук є лише в елементів, текст і коментарі зберігають тільки рядок даних.</p>

<h3>Основні типи вузлів</h3>
<ul>
  <li><strong>Document</strong> (<code>nodeType: 9</code>) — корінь дерева та точка входу в DOM: об'єкт <code>document</code>.</li>
  <li><strong>Element</strong> (<code>1</code>) — HTML-теги. Єдиний тип з атрибутами, класами, стилями та пошуком (<code>querySelector</code>).</li>
  <li><strong>Text</strong> (<code>3</code>) — будь-який текст усередині елементів, включно з пробілами та переносами рядків між тегами.</li>
  <li><strong>Comment</strong> (<code>8</code>) — <code>&lt;!-- --&gt;</code>: не відображається, але це повноцінний вузол дерева, доступний із JS.</li>
  <li><strong>DocumentFragment</strong> (<code>11</code>) — легкий контейнер для збирання піддерева в пам'яті; під час вставлення в DOM переносяться його діти, а не сам фрагмент.</li>
</ul>

<h3>Чим відрізняються</h3>
<ul>
  <li><code>nodeType</code> — числовий код типу (1, 3, 8, 9…).</li>
  <li><code>nodeName</code> — ім'я: в елемента — тег (<code>DIV</code>), у тексту — <code>#text</code>, у документа — <code>#document</code>.</li>
  <li><code>nodeValue</code> — вміст тексту та коментарів; в елементів — <code>null</code>.</li>
  <li><code>children</code> є лише в елементів і містить лише елементи, а <code>childNodes</code> — усі вузли, включно з текстовими та коментарями.</li>
</ul>

<code class="code">
  &lt;div&gt;Привіт &lt;!-- x --&gt;&lt;b&gt;світ&lt;/b&gt;&lt;/div&gt;

  div.children.length;   // 1 — лише &lt;b&gt;
  div.childNodes.length; // 3 — текст, коментар, &lt;b&gt;
</code>

<p class="info info--orange">Часта пастка: пробіли та переноси рядків між тегами — теж <code>Text</code>-вузли, тому <code>firstChild</code> часто виявляється текстом, а не елементом. Для навігації по елементах є <code>firstElementChild</code> і <code>nextElementSibling</code>.</p>

<h3>Для чого потрібні різні типи</h3>
<p>Це розділення відповідальності: кожен вид вмісту отримує свій об'єкт зі своїм API, і будь-якою частиною документа можна керувати з JS однаково — як вузлом дерева. Практичні застосування:</p>
<ul>
  <li><strong>DocumentFragment</strong> — батчинг вставлень: зібрати список у пам'яті та вставити однією операцією, спричинивши один reflow замість багатьох.</li>
  <li><strong>Comment</strong> — «якорі» фреймворків: Angular і Vue позначають коментарями місця умовного рендерингу (<code>ng-container</code>, <code>v-if</code>).</li>
</ul>

<p class="deep-dive">Поглиблений конспект</p>

<h3>Ієрархія класів</h3>
<p>Типи вузлів утворюють ланцюжок наслідування: <code>EventTarget</code> → <code>Node</code> → конкретні класи.</p>
<ul>
  <li><code>Element</code> → <code>HTMLElement</code> → <code>HTMLInputElement</code>, <code>HTMLDivElement</code> тощо — що нижче по ланцюжку, то специфічніший API: наприклад, <code>value</code> є лише в полів введення.</li>
  <li><code>CharacterData</code> — спільний батько <code>Text</code> і <code>Comment</code>: зберігає рядок <code>data</code> та методи роботи з ним (<code>appendData</code>, <code>deleteData</code>).</li>
  <li><code>Document</code>, <code>DocumentFragment</code>, <code>DocumentType</code> — окремі гілки від <code>Node</code>.</li>
</ul>
<p class="info info--blue">Перевіряти вид вузла зручніше через <code>instanceof</code> (<code>node instanceof HTMLElement</code>) — це читабельніше за порівняння магічних чисел <code>nodeType</code> і враховує наслідування.</p>

<h3>Повний список із 12 типів</h3>
<p>Історично DOM визначав 12 типів, частина — релікти XML-епохи, видалені з сучасного стандарту (DOM4): <code>CDATASection</code> (4), <code>EntityReference</code> (5), <code>Entity</code> (6), <code>Notation</code> (12). <code>ProcessingInstruction</code> (7) трапляється лише в XML-документах. <code>DocumentType</code> (10) — вузол <code>&lt;!DOCTYPE html&gt;</code>, доступний як <code>document.doctype</code>. <code>Attr</code> (2) формально залишився, але атрибути більше не є дочірніми вузлами дерева — з ними працюють через <code>getAttribute</code> / <code>setAttribute</code>.</p>

<h3>Text-вузли під капотом</h3>
<ul>
  <li>Після DOM-маніпуляцій у дереві можуть з'явитися сусідні текстові вузли: <code>normalize()</code> склеює їх, а <code>splitText(offset)</code> розрізає один вузол на два — цим користується, наприклад, Range API під час виділення тексту.</li>
  <li><code>textContent</code> збирає текст усіх нащадків без reflow; <code>innerText</code> враховує CSS-видимість і провокує reflow; <code>innerHTML</code> парсить рядок як розмітку — з ним пов'язаний ризик XSS.</li>
</ul>

<h3>DocumentFragment і сучасні API</h3>
<ul>
  <li>Вміст <code>&lt;template&gt;</code> (властивість <code>content</code>) — це DocumentFragment: він інертний — скрипти не виконуються, зображення не завантажуються, доки фрагмент не клонують у документ.</li>
  <li><code>ShadowRoot</code> із Shadow DOM наслідується від DocumentFragment — це корінь ізольованого піддерева веб-компонента.</li>
  <li>Сучасні рушії непогано батчать послідовні вставлення самі, тому виграш фрагмента не завжди драматичний, але він залишається ідіоматичним способом зібрати піддерево «поза» документом.</li>
</ul>

<h3>Нюанси імен і значень</h3>
<ul>
  <li><code>tagName</code> є лише в елементів, <code>nodeName</code> — в усіх вузлів. В HTML-документах ім'я тега повертається у верхньому регістрі, в XML — у вихідному.</li>
  <li>У <code>Text</code> і <code>Comment</code> властивості <code>nodeValue</code> та <code>data</code> — синоніми.</li>
</ul>
