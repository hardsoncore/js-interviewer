<h3>Введение</h3>
<p>Браузер парсит HTML и строит DOM — дерево, в котором <span class="accent">каждая часть документа представлена узлом (Node)</span>: тег — элементом, текст — текстовым узлом, комментарий — узлом-комментарием. Спецификация определяет 12 типов узлов, но в современном DOM реально используются около пяти.</p>

<p class="info"><strong>Главная мысль:</strong> все узлы наследуют общий интерфейс <code>Node</code> — отсюда единые навигация и <code>nodeType</code>, — а различаются собственным API: атрибуты, стили и поиск есть только у элементов, текст и комментарии хранят лишь строку данных.</p>

<h3>Основные типы узлов</h3>
<ul>
  <li><strong>Document</strong> (<code>nodeType: 9</code>) — корень дерева и точка входа в DOM: объект <code>document</code>.</li>
  <li><strong>Element</strong> (<code>1</code>) — HTML-теги. Единственный тип с атрибутами, классами, стилями и поиском (<code>querySelector</code>).</li>
  <li><strong>Text</strong> (<code>3</code>) — любой текст внутри элементов, включая пробелы и переводы строк между тегами.</li>
  <li><strong>Comment</strong> (<code>8</code>) — <code>&lt;!-- --&gt;</code>: не отображается, но это полноценный узел дерева, доступный из JS.</li>
  <li><strong>DocumentFragment</strong> (<code>11</code>) — лёгкий контейнер для сборки поддерева в памяти; при вставке в DOM переносятся его дети, а не сам фрагмент.</li>
</ul>

<h3>Чем отличаются</h3>
<ul>
  <li><code>nodeType</code> — числовой код типа (1, 3, 8, 9…).</li>
  <li><code>nodeName</code> — имя: у элемента — тег (<code>DIV</code>), у текста — <code>#text</code>, у документа — <code>#document</code>.</li>
  <li><code>nodeValue</code> — содержимое текста и комментариев; у элементов — <code>null</code>.</li>
  <li><code>children</code> есть только у элементов и содержит только элементы, а <code>childNodes</code> — все узлы, включая текстовые и комментарии.</li>
</ul>

<code class="code">
  &lt;div&gt;Привет &lt;!-- x --&gt;&lt;b&gt;мир&lt;/b&gt;&lt;/div&gt;

  div.children.length;   // 1 — только &lt;b&gt;
  div.childNodes.length; // 3 — текст, комментарий, &lt;b&gt;
</code>

<p class="info info--orange">Частая ловушка: пробелы и переводы строк между тегами — тоже <code>Text</code>-узлы, поэтому <code>firstChild</code> часто оказывается текстом, а не элементом. Для навигации по элементам есть <code>firstElementChild</code> и <code>nextElementSibling</code>.</p>

<h3>Для чего нужны разные типы</h3>
<p>Это разделение ответственности: каждый вид содержимого получает свой объект со своим API, и любой частью документа можно управлять из JS единообразно — как узлом дерева. Практические применения:</p>
<ul>
  <li><strong>DocumentFragment</strong> — батчинг вставок: собрать список в памяти и вставить одной операцией, вызвав один reflow вместо многих.</li>
  <li><strong>Comment</strong> — «якоря» фреймворков: Angular и Vue помечают комментариями места условного рендеринга (<code>ng-container</code>, <code>v-if</code>).</li>
</ul>

<p class="deep-dive">Углубленный конспект</p>

<h3>Иерархия классов</h3>
<p>Типы узлов образуют цепочку наследования: <code>EventTarget</code> → <code>Node</code> → конкретные классы.</p>
<ul>
  <li><code>Element</code> → <code>HTMLElement</code> → <code>HTMLInputElement</code>, <code>HTMLDivElement</code> и т.д. — чем ниже по цепочке, тем специфичнее API: например, <code>value</code> есть только у полей ввода.</li>
  <li><code>CharacterData</code> — общий родитель <code>Text</code> и <code>Comment</code>: хранит строку <code>data</code> и методы работы с ней (<code>appendData</code>, <code>deleteData</code>).</li>
  <li><code>Document</code>, <code>DocumentFragment</code>, <code>DocumentType</code> — отдельные ветки от <code>Node</code>.</li>
</ul>
<p class="info info--blue">Проверять вид узла удобнее через <code>instanceof</code> (<code>node instanceof HTMLElement</code>) — это читабельнее сравнения магических чисел <code>nodeType</code> и учитывает наследование.</p>

<h3>Полный список из 12 типов</h3>
<p>Исторически DOM определял 12 типов, часть — реликты XML-эпохи, удалённые из современного стандарта (DOM4): <code>CDATASection</code> (4), <code>EntityReference</code> (5), <code>Entity</code> (6), <code>Notation</code> (12). <code>ProcessingInstruction</code> (7) встречается только в XML-документах. <code>DocumentType</code> (10) — узел <code>&lt;!DOCTYPE html&gt;</code>, доступный как <code>document.doctype</code>. <code>Attr</code> (2) формально остался, но атрибуты больше не являются дочерними узлами дерева — с ними работают через <code>getAttribute</code> / <code>setAttribute</code>.</p>

<h3>Text-узлы под капотом</h3>
<ul>
  <li>После DOM-манипуляций в дереве могут появиться соседние текстовые узлы: <code>normalize()</code> склеивает их, а <code>splitText(offset)</code> разрезает один узел на два — этим пользуется, например, Range API при выделении текста.</li>
  <li><code>textContent</code> собирает текст всех потомков без reflow; <code>innerText</code> учитывает CSS-видимость и провоцирует reflow; <code>innerHTML</code> парсит строку как разметку — с ним связан риск XSS.</li>
</ul>

<h3>DocumentFragment и современные API</h3>
<ul>
  <li>Содержимое <code>&lt;template&gt;</code> (свойство <code>content</code>) — это DocumentFragment: оно инертно — скрипты не выполняются, картинки не загружаются, пока фрагмент не клонируют в документ.</li>
  <li><code>ShadowRoot</code> из Shadow DOM наследуется от DocumentFragment — это корень изолированного поддерева веб-компонента.</li>
  <li>Современные движки неплохо батчат последовательные вставки сами, поэтому выигрыш фрагмента не всегда драматичен, но он остаётся идиоматичным способом собрать поддерево «вне» документа.</li>
</ul>

<h3>Нюансы имён и значений</h3>
<ul>
  <li><code>tagName</code> есть только у элементов, <code>nodeName</code> — у всех узлов. В HTML-документах имя тега возвращается в верхнем регистре, в XML — в исходном.</li>
  <li>У <code>Text</code> и <code>Comment</code> свойства <code>nodeValue</code> и <code>data</code> — синонимы.</li>
</ul>
