<h3>Чотири способи підключення CSS</h3>

<p>
  Зовнішній файл через <code>&lt;link&gt;</code>, тег <code>&lt;style&gt;</code>, inline-атрибут
  <code>style</code> та <code>@import</code> всередині CSS. П'ятий, динамічний шлях — через JavaScript.
</p>

<p class="info">
  <strong>Головна думка:</strong> стандарт за замовчуванням — зовнішній файл через <code>&lt;link&gt;</code>
  у <code>&lt;head&gt;</code>: браузер кешує його та перевикористовує між сторінками, а стилі відокремлені
  від розмітки. Решта — під конкретні задачі.
</p>

<h3>Зовнішній файл: тег link</h3>

<code class="code">
  &lt;link rel="stylesheet" href="styles.css"&gt;
</code>

<ul>
  <li>Кілька файлів завантажуються паралельно.</li>
  <li>Атрибут <code>media</code> підключає стилі за умовою: <code>media="(max-width: 600px)"</code>.</li>
  <li>Атрибут <code>type="text/css"</code> у HTML5 писати не потрібно.</li>
</ul>

<h3>Вбудовані стилі: тег style</h3>

<code class="code">
  &lt;style&gt;
    .promo { color: tomato; }
  &lt;/style&gt;
</code>

<p>
  Стилі живуть прямо в HTML: не кешуються окремо і не перевикористовуються іншими сторінками.
  Практичний кейс — <span class="accent">Critical CSS</span>: інлайн стилів першого екрана,
  щоб відмалювати його без очікування файлу.
</p>

<h3>Inline-стилі: атрибут style</h3>

<code class="code">
  &lt;p style="color: tomato"&gt;Текст&lt;/p&gt;
</code>

<p>
  Застосовується до одного елемента, має найвищу специфічність (перебивається лише <code>!important</code>)
  і не перевизначається з файлів — тому в ручній верстці його уникають. Легітимні кейси —
  динамічні значення з JS та email-верстка.
</p>

<h3>Імпорт всередині CSS: @import</h3>

<code class="code">
  @import url("theme.css");
</code>

<p>
  Підключає один CSS-файл з іншого (або з тега <code>&lt;style&gt;</code>). Директива має стояти
  до всіх правил.
</p>

<p class="info info--orange">
  У продакшені <code>@import</code> уникають: браузер дізнається про вкладений файл лише після завантаження
  батьківського — файли завантажуються послідовно, рендер блокується довше. У Sass і бандлерах імпорт
  безпечний — розгортається під час збірки.
</p>

<h3>Стилі через JavaScript</h3>

<p>
  <code>element.style</code> пише в inline-атрибут; краще перемикати класи через
  <code>classList</code>; можна створювати теги <code>&lt;style&gt;</code> та <code>&lt;link&gt;</code>
  на льоту — так працюють CSS-in-JS бібліотеки.
</p>

<p class="deep-dive">Поглиблений конспект</p>

<h3>CSS блокує рендеринг</h3>

<p>
  Будь-який підключений CSS — <span class="accent">render-blocking</span> ресурс: браузер не відмалює сторінку,
  доки не завантажить стилі й не побудує CSSOM, інакше користувач побачив би «спалах» неоформленого контенту
  (FOUC). Тому стилі підключають у <code>&lt;head&gt;</code> — що раніше браузер про них дізнається, то раніше
  почне завантаження. Виняток: <code>&lt;link&gt;</code> з <code>media</code>, що не збігається з поточним
  оточенням (наприклад, <code>media="print"</code> на екрані), завантажується з низьким пріоритетом
  і рендер не блокує.
</p>

<h4>Трюк з асинхронним завантаженням стилів</h4>

<code class="code">
  &lt;link rel="stylesheet" href="rest.css" media="print" onload="this.media='all'"&gt;
</code>

<p>
  Так підключають некритичні стилі: <code>media="print"</code> знімає блокування рендера, а після завантаження
  файл вмикається для всіх пристроїв. Це пара до Critical CSS у <code>&lt;style&gt;</code>: критичне — інлайном,
  решта — асинхронно.
</p>

<h3>Чому @import настільки поганий: каскад запитів</h3>

<p>
  <span class="accent">Preload scanner</span> браузера знаходить <code>&lt;link&gt;</code> та
  <code>&lt;script&gt;</code> у HTML ще до основного парсингу і запускає завантаження заздалегідь. Для нього
  <code>@import</code> невидимий: про вкладений файл браузер дізнається, лише завантаживши й розпарсивши
  батьківський CSS. Ланцюжок із трьох <code>@import</code> — три послідовні мережеві round-trip замість одного
  паралельного залпу.
</p>

<h3>Способи, про які рідко згадують</h3>

<ul>
  <li>
    <code>&lt;link rel="stylesheet"&gt;</code> всередині <code>&lt;body&gt;</code> — валідно за сучасним
    стандартом; використовується для стилів окремих віджетів, але ризикує спричинити FOUC контенту вище
    по документу.
  </li>
  <li>
    <strong>Constructable Stylesheets</strong>: <code>new CSSStyleSheet()</code> +
    <code>adoptedStyleSheets</code> — програмна таблиця стилів, один об'єкт шариться між документом
    і Shadow DOM без дублювання та повторного парсингу.
  </li>
  <li>
    <strong>CSSOM API</strong>: <code>document.styleSheets</code>, <code>insertRule</code> /
    <code>deleteRule</code> — пряме редагування правил із JS; так CSS-in-JS бібліотеки працюють
    у production-режимі, оминаючи перезапис тексту стилів.
  </li>
  <li>
    <strong>Alternate stylesheets</strong>: <code>rel="alternate stylesheet" title="..."</code> —
    перемикані теми засобами браузера; на практиці майже не використовується.
  </li>
</ul>

<h3>Чи впливає спосіб підключення на пріоритет</h3>

<p>
  Між <code>&lt;link&gt;</code>, <code>&lt;style&gt;</code> та <code>@import</code> пріоритету «за способом»
  немає — за однакової специфічності виграє правило, оголошене пізніше. Правила з <code>@import</code>
  вважаються оголошеними в точці імпорту, тобто раніше за власні правила батьківського файлу.
  Осторонь стоять inline-стилі: вони перемагають будь-які селектори. Детальніше каскад і специфічність —
  у питанні про пріоритет стилів у CSS.
</p>
