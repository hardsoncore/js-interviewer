<h3>Четыре способа подключения CSS</h3>

<p>
  Внешний файл через <code>&lt;link&gt;</code>, тег <code>&lt;style&gt;</code>, inline-атрибут
  <code>style</code> и <code>@import</code> внутри CSS. Пятый, динамический путь — через JavaScript.
</p>

<p class="info">
  <strong>Главная мысль:</strong> стандарт по умолчанию — внешний файл через <code>&lt;link&gt;</code>
  в <code>&lt;head&gt;</code>: браузер кеширует его и переиспользует между страницами, а стили отделены
  от разметки. Остальное — под конкретные задачи.
</p>

<h3>Внешний файл: тег link</h3>

<code class="code">
  &lt;link rel="stylesheet" href="styles.css"&gt;
</code>

<ul>
  <li>Несколько файлов скачиваются параллельно.</li>
  <li>Атрибут <code>media</code> подключает стили по условию: <code>media="(max-width: 600px)"</code>.</li>
  <li>Атрибут <code>type="text/css"</code> в HTML5 писать не нужно.</li>
</ul>

<h3>Встроенные стили: тег style</h3>

<code class="code">
  &lt;style&gt;
    .promo { color: tomato; }
  &lt;/style&gt;
</code>

<p>
  Стили живут прямо в HTML: не кешируются отдельно и не переиспользуются другими страницами.
  Практический кейс — <span class="accent">Critical CSS</span>: инлайн стилей первого экрана,
  чтобы отрисовать его без ожидания файла.
</p>

<h3>Inline-стили: атрибут style</h3>

<code class="code">
  &lt;p style="color: tomato"&gt;Текст&lt;/p&gt;
</code>

<p>
  Применяется к одному элементу, имеет наивысшую специфичность (перебивается только <code>!important</code>)
  и не переопределяется из файлов — поэтому в ручной вёрстке избегается. Легитимные кейсы —
  динамические значения из JS и email-вёрстка.
</p>

<h3>Импорт внутри CSS: @import</h3>

<code class="code">
  @import url("theme.css");
</code>

<p>
  Подключает один CSS-файл из другого (или из тега <code>&lt;style&gt;</code>). Директива должна стоять
  до всех правил.
</p>

<p class="info info--orange">
  В продакшене <code>@import</code> избегают: браузер узнаёт о вложенном файле только после загрузки
  родительского — файлы качаются последовательно, рендер блокируется дольше. В Sass и бандлерах импорт
  безопасен — разворачивается при сборке.
</p>

<h3>Стили через JavaScript</h3>

<p>
  <code>element.style</code> пишет в inline-атрибут; предпочтительнее переключать классы через
  <code>classList</code>; можно создавать теги <code>&lt;style&gt;</code> и <code>&lt;link&gt;</code>
  на лету — так работают CSS-in-JS библиотеки.
</p>

<p class="deep-dive">Углубленный конспект</p>

<h3>CSS блокирует рендеринг</h3>

<p>
  Любой подключённый CSS — <span class="accent">render-blocking</span> ресурс: браузер не отрисует страницу,
  пока не скачает стили и не построит CSSOM, иначе пользователь увидел бы «вспышку» неоформленного контента
  (FOUC). Поэтому стили подключают в <code>&lt;head&gt;</code> — чем раньше браузер о них узнает, тем раньше
  начнёт загрузку. Исключение: <code>&lt;link&gt;</code> с <code>media</code>, не совпадающим с текущим
  окружением (например, <code>media="print"</code> на экране), скачивается с низким приоритетом
  и рендер не блокирует.
</p>

<h4>Трюк с асинхронной загрузкой стилей</h4>

<code class="code">
  &lt;link rel="stylesheet" href="rest.css" media="print" onload="this.media='all'"&gt;
</code>

<p>
  Так подключают некритичные стили: <code>media="print"</code> снимает блокировку рендера, а после загрузки
  файл включается для всех устройств. Это пара к Critical CSS в <code>&lt;style&gt;</code>: критичное — инлайном,
  остальное — асинхронно.
</p>

<h3>Почему @import настолько плох: каскад запросов</h3>

<p>
  <span class="accent">Preload scanner</span> браузера находит <code>&lt;link&gt;</code> и
  <code>&lt;script&gt;</code> в HTML ещё до основного парсинга и запускает загрузки заранее. Для него
  <code>@import</code> невидим: о вложенном файле браузер узнаёт, только скачав и распарсив родительский CSS.
  Цепочка из трёх <code>@import</code> — три последовательных сетевых round-trip вместо одного
  параллельного залпа.
</p>

<h3>Способы, о которых редко вспоминают</h3>

<ul>
  <li>
    <code>&lt;link rel="stylesheet"&gt;</code> внутри <code>&lt;body&gt;</code> — валидно по современному
    стандарту; используется для стилей отдельных виджетов, но рискует вызвать FOUC контента выше по документу.
  </li>
  <li>
    <strong>Constructable Stylesheets</strong>: <code>new CSSStyleSheet()</code> +
    <code>adoptedStyleSheets</code> — программная таблица стилей, один объект шарится между документом
    и Shadow DOM без дублирования и повторного парсинга.
  </li>
  <li>
    <strong>CSSOM API</strong>: <code>document.styleSheets</code>, <code>insertRule</code> /
    <code>deleteRule</code> — прямое редактирование правил из JS; так CSS-in-JS библиотеки работают
    в production-режиме, минуя перезапись текста стилей.
  </li>
  <li>
    <strong>Alternate stylesheets</strong>: <code>rel="alternate stylesheet" title="..."</code> —
    переключаемые темы средствами браузера; на практике почти не используется.
  </li>
</ul>

<h3>Влияет ли способ подключения на приоритет</h3>

<p>
  Между <code>&lt;link&gt;</code>, <code>&lt;style&gt;</code> и <code>@import</code> приоритета «по способу»
  нет — при равной специфичности выигрывает правило, объявленное позже. Правила из <code>@import</code>
  считаются объявленными в точке импорта, то есть раньше собственных правил родительского файла.
  Особняком стоят inline-стили: они побеждают любые селекторы. Подробнее каскад и специфичность —
  в вопросе о приоритете стилей в CSS.
</p>
