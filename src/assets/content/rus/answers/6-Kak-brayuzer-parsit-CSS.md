<h3>Что происходит, когда браузер видит CSS?</h3>

<p>
  Когда браузер загружает страницу, он не «понимает» CSS-текст напрямую. Прежде чем применить стили,
  движок рендеринга проходит через несколько чётко определённых этапов: сначала разбивает поток символов на токены,
  затем строит из них дерево правил, и только после этого формирует
  <span class="accent">CSSOM (CSS Object Model)</span> — структуру, которую движок рендеринга
  может использовать совместно с DOM для построения <span class="accent">Render Tree</span>.
</p>

<h3>1. Токенизация CSS: как браузер разбивает код на токены</h3>

<p>
  <span class="accent">Токенизация</span> — это первая фаза парсинга. Браузер читает CSS-файл как поток байт,
  декодирует его в символы (UTF-8/UTF-16) и передаёт в <strong>лексер (tokenizer)</strong>,
  который разбивает поток на логические единицы — <strong>токены</strong>.
</p>

<p>Типы токенов, которые выделяет CSS-лексер:</p>

<code class="code">
  /* Исходный CSS */
  .button:hover { color: red; font-size: 16px; }

  /* Лексер выделяет следующие токены:
    DELIM-token      → .
    IDENT-token      → button
    COLON-token      → :
    IDENT-token      → hover
    {-token          → {
    IDENT-token      → color
    COLON-token      → :
    IDENT-token      → red
    SEMICOLON-token  → ;
    IDENT-token      → font-size
    COLON-token      → :
    DIMENSION-token  → 16px
    SEMICOLON-token  → ;
    }-token          → }
  */
</code>

<p>
  Спецификация CSS Syntax Level 3 (W3C) описывает более 20 видов токенов:
  <code>IDENT-token</code>, <code>STRING-token</code>, <code>URL-token</code>,
  <code>DELIM-token</code>, <code>NUMBER-token</code>, <code>DIMENSION-token</code>,
  <code>PERCENTAGE-token</code>, <code>HASH-token</code> (для <code>#id</code>), и другие.
</p>

<p class="info info--blue">
  Токенизатор работает по алгоритму конечного автомата (Finite State Machine). Его входные символы управляют переходами
  между состояниями: <em>data state → ident state → end state</em> и т.д. Это крайне быстрый и предсказуемый процесс.
</p>

<h3>2. Архитектура парсинга CSS в браузере</h3>

<p>
  После токенизации поток токенов поступает в <span class="accent">CSS-парсер</span>,
  который строит дерево правил (Rule Tree) по стандарту CSS Object Model.
  Итоговая структура — это не плоский список стилей, а иерархия объектов.
</p>

<p>Упрощённая схема этапов:</p>

<code class="code">
  Байты (raw bytes)
    → Символы (Characters, UTF-8 decode)
      → Токены (Tokenization / Lexing)
        → Правила CSS (CSS Rules, Parsing)
          → CSSOM (CSS Object Model)
            → Render Tree (совместно с DOM)
              → Layout → Paint → Composite
</code>

<p>
  Каждое CSS-правило превращается в объект вида:
</p>

<code class="code">
  // Внутреннее представление правила после парсинга (псевдокод)
  CSSRule {
    selector: ".button:hover",       // строка селектора
    selectorList: [".button:hover"], // распарсенный список
    declarations: [
      { property: "color",     value: "red"  },
      { property: "font-size", value: "16px" }
    ]
  }
</code>

<p>
  В V8/Blink (Chrome) этим занимается модуль <strong>CSSParser</strong>.
  В Gecko (Firefox) — аналогичный модуль <strong>nsCSSParser</strong>.
  Оба реализуют одну спецификацию, но по-разному оптимизируют внутренние структуры.
</p>

<h3>3. Right-to-Left парсинг селекторов и его преимущества</h3>

<p>
  Это один из самых часто задаваемых вопросов на интервью. Браузер применяет CSS-правила,
  читая <span class="accent">селектор справа налево</span> — от самого конкретного (ключевого) элемента к более общим.
</p>

<code class="code">
  /* Для этого правила: */
  nav ul li a span { color: red; }

  /* Браузер НЕ ищет nav, а затем внутри него ul и т.д.
    Вместо этого он делает так:
    1. Берёт КАЖДЫЙ &lt;span> на странице (ключевой элемент — правый)
    2. Проверяет: его родитель — &lt;a>?
    3. Если да → родитель &lt;a> — это &lt;li>?
    4. Если да → родитель &lt;li> — это &lt;ul>?
    5. Если да → предок &lt;ul> — это &lt;nav>?
    6. Если всё совпало → применяем стиль.
  */
</code>

<p><strong>Почему справа налево, а не слева направо?</strong></p>

<p>
  Подход Left-to-Right потребовал бы обхода всего поддерева DOM для каждого правила —
  это O(n) операций на каждый узел дерева при каждом применении стилей.
  Подход <strong>Right-to-Left</strong> позволяет браузеру быстро отсеять
  большинство узлов на первом же шаге: если элемент не совпал с ключевым (правым)
  селектором — всё остальное в цепочке даже не проверяется.
</p>

<p class="info info--orange">
  Именно поэтому универсальный селектор <code>*</code> и чрезмерно длинные цепочки
  (<code>.parent .child .grand-child span em</code>) — это антипаттерны производительности.
  Ключевым элементом является самый правый, и чем он конкретнее (например, <code>.btn-primary</code>),
  тем меньше узлов браузер будет проверять.
</p>

<h3>4. Как парсинг CSS влияет на рендеринг страницы</h3>

<p>
  CSS является <span class="accent">render-blocking ресурсом</span>.
  Браузер не построит Render Tree и не запустит Layout, пока не будет полностью
  загружен и распарсен каждый синхронный CSS-файл из <code>&lt;head&gt;</code>.
</p>

<code class="code">
  &lt;head&gt;
    &lt;!-- Оба файла блокируют рендеринг! Страница будет пустой, пока они не загрузятся. --&gt;
    &lt;link rel="stylesheet" href="main.css"&gt;
    &lt;link rel="stylesheet" href="theme.css"&gt;
  &lt;/head&gt;
</code>

<p>
  Браузер блокирует рендер намеренно — чтобы избежать <span class="accent">FOUC</span>
  (Flash of Unstyled Content), то есть ситуации, когда пользователь на долю секунды
  видит страницу без стилей.
</p>

<p>
  <strong>Ключевое взаимодействие CSS и JavaScript:</strong> если JavaScript-скрипт выполняется
  в момент, когда CSSOM ещё не построен, браузер <em>заблокирует</em> выполнение JS и будет
  ждать завершения загрузки и парсинга CSS. Это делает CSS косвенным блокировщиком и для HTML-парсера.
</p>

<h3>5. Ошибки в CSS и как браузер их обрабатывает</h3>

<p>
  В отличие от JavaScript, ошибки в CSS не бросают исключений и не останавливают обработку файла.
  CSS-парсер реализует принцип <span class="accent">Error Handling / Graceful Degradation</span>:
  при встрече с неизвестным или некорректным правилом он <strong>молча пропускает его</strong>
  и продолжает разбор остального файла.
</p>

<code class="code">
  .element {
    color: red;           /* ✅ Применится */
    unkn0wn: value;       /* ❌ Неизвестное свойство → пропускается */
    display: grid;        /* ✅ Применится (в поддерживаемых браузерах) */
    display: -ms-flexbox; /* ❌ Устаревший префикс (в Chrome) → пропускается */
    font-size: ;          /* ❌ Нет значения → пропускается */
    color: blue;          /* ✅ Применится */
  }
</code>

<p>
  Это позволяет использовать прогрессивное улучшение (Progressive Enhancement):
  сначала пишется базовое значение, потом — современное. Браузеры, не знающие нового,
  просто проигнорируют его и возьмут предыдущее.
</p>

<h3>6. Оптимизации парсинга CSS в современных браузерах</h3>

<p>Современные браузерные движки применяют ряд техник для ускорения работы с CSS:</p>

<p>
  <strong>Параллельный парсинг:</strong> Blink (Chrome) и Gecko (Firefox) умеют парсить
  CSS-файлы в фоновом (worker) потоке, не блокируя основной поток HTML-парсера.
</p>

<p>
  <strong>Style Invalidation:</strong> При изменении DOM или стилей браузер не перестраивает
  весь CSSOM. Он использует систему <em>инвалидации</em> — помечает только «грязные» узлы,
  которые требуют пересчёта стилей (Style Recalculation).
</p>

<p>
  <strong>Rule Hashing:</strong> Браузер индексирует правила по тегу, классу, id и атрибутам
  в отдельные хэш-таблицы. Это позволяет при матчинге не перебирать все правила подряд, а
  сразу обращаться только к релевантным кандидатам.
</p>

<p class="info info--blue">
  В Chrome DevTools вкладки <strong>Performance → Rendering</strong> и <strong>Recalculate Style</strong>
  позволяют увидеть, сколько времени тратится на пересчёт стилей. Если этот показатель высокий —
  обычно проблема в слишком общих CSS-селекторах или частом изменении DOM.
</p>

<h3>7. Блокировка рендера и этапы Layout, Paint, Composite</h3>

<p>
  После того как CSSOM и DOM готовы, браузер объединяет их в <span class="accent">Render Tree</span>
  (дерево рендеринга) — в нём присутствуют только видимые элементы с уже вычисленными стилями.
  Элементы с <code>display: none</code> в Render Tree не включаются.
</p>

<code class="code">
  /*
    Pipeline (конвейер рендеринга):

    JavaScript → Style → Layout → Paint → Composite

    Style:     Вычисление итоговых стилей для каждого узла
    Layout:    Вычисление геометрии (размеры, позиции) — самый «дорогой» этап
    Paint:     Заполнение пикселей (цвет, тени, текст)
    Composite: Наложение слоёв (layers) — выполняется на GPU

    Изменение свойств по «стоимости»:
    - width/height/margin → запускает Layout + Paint + Composite (самое дорогое)
    - color/background    → запускает Paint + Composite
    - transform/opacity   → запускает только Composite (самое дешевое, GPU)
  */
</code>

<p>
  Для создания плавных анимаций (60fps) нужно анимировать исключительно свойства,
  обрабатываемые на этапе <strong>Composite</strong> — это <code>transform</code> и <code>opacity</code>.
  Все остальные свойства вызывают Layout (reflow) или Paint (repaint) и нагружают CPU.
</p>

<p class="info info--orange">
  Вызов <code>element.offsetWidth</code>, <code>getBoundingClientRect()</code> и других «геометрических»
  свойств из JavaScript <strong>немедленно запускает синхронный reflow</strong> (Forced Layout),
  так как браузер вынужден применить все накопленные изменения CSS прямо сейчас.
  Это типичная причина «лагающих» интерфейсов — называется <strong>Layout Thrashing</strong>.
</p>
