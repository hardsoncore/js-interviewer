<h3>Семантическая вёрстка: что это и зачем</h3>

<p>
  <span class="accent">Семантическая вёрстка</span> — выбор тега по смыслу, а не по виду:
  <code>&lt;nav&gt;</code> для навигации вместо безликого <code>&lt;div&gt;</code>.
</p>

<p class="info">
  <strong>Главная мысль:</strong> HTML описывает смысл, а не вид. Эту структуру понимают
  «машинные читатели»: скринридеры, поисковики, браузер.
</p>

<ul>
  <li>
    <strong>Доступность (a11y).</strong> Семантика бесплатно даёт скринридеру «карту» страницы:
    ориентиры (landmarks) и заголовки.
  </li>
  <li><strong>SEO.</strong> Боты лучше понимают структуру и точнее ранжируют.</li>
  <li>
    <strong>Читаемость и поддержка.</strong> Встроенное поведение нативных элементов:
    фокус и клавиатуру у <code>&lt;button&gt;</code> не пишем руками.
  </li>
</ul>

<h3>Основные семантические теги HTML5</h3>

<ul>
  <li><code>&lt;header&gt;</code> — шапка сайта или раздела; может быть несколько.</li>
  <li><code>&lt;nav&gt;</code> — основная навигация.</li>
  <li><code>&lt;main&gt;</code> — уникальный контент; ровно один.</li>
  <li><code>&lt;section&gt;</code> — смысловой раздел; желателен заголовок.</li>
  <li><code>&lt;article&gt;</code> — независимая единица: статья, комментарий.</li>
  <li><code>&lt;aside&gt;</code> — побочный контент: сайдбар.</li>
  <li><code>&lt;footer&gt;</code> — заключение сайта или раздела.</li>
</ul>

<code class="code">
  &lt;header&gt;&lt;nav&gt;Меню&lt;/nav&gt;&lt;/header&gt;
  &lt;main&gt;
    &lt;article&gt;
      &lt;h1&gt;Статья&lt;/h1&gt;
      &lt;section&gt;Раздел&lt;/section&gt;
    &lt;/article&gt;
    &lt;aside&gt;Похожее&lt;/aside&gt;
  &lt;/main&gt;
  &lt;footer&gt;Копирайт&lt;/footer&gt;
</code>

<h3>article vs section vs div</h3>

<ol>
  <li>Можно назвать и вынести на другой сайт — <code>&lt;article&gt;</code>.</li>
  <li>Назвать можно, вынести нельзя — <code>&lt;section&gt;</code>.</li>
  <li>Название не придумывается — просто контейнер, <code>&lt;div&gt;</code>.</li>
</ol>

<h3>Доступность и ARIA</h3>

<p>
  У семантических тегов есть встроенные <span class="accent">ARIA-роли</span>
  (<code>&lt;nav&gt;</code> → <code>navigation</code>), по ним скринридер строит навигацию.
  Нет нативного тега — роль добавляют ARIA-атрибутами (<code>role</code>, <code>aria-label</code>).
</p>

<p class="info info--orange">
  «Кнопка» из <code>&lt;div onclick&gt;</code>: нет фокуса, Enter/Space и роли для скринридера.
  Первое правило ARIA — не использовать ARIA, если есть нативный тег.
</p>

<p class="deep-dive">Углубленный конспект</p>

<h3>Теги подробнее: значение, особенности, типовые ошибки</h3>

<h4>&lt;article&gt;</h4>
<p>
  Независимая, отделяемая смысловая единица: комментарий, твит, статья, виджет. Желателен заголовок внутри.
  Типовая ошибка — путать с <code>&lt;section&gt;</code> и <code>&lt;div&gt;</code>.
</p>

<h4>&lt;section&gt;</h4>
<p>
  Смысловой раздел документа, неотделяемый в отличие от <code>&lt;article&gt;</code>. Желателен заголовок внутри.
  <code>&lt;section&gt;</code> без доступного имени (заголовка или <code>aria-label</code>) для скринридера
  почти не отличается от <code>&lt;div&gt;</code> — landmark-роль <code>region</code> он получает только с именем.
</p>

<h4>&lt;aside&gt;</h4>
<p>
  Побочный, косвенный для страницы контент; может встречаться несколько раз. Типовая ошибка — считать его
  тегом «боковой панели» и размечать им основной контент, связанный с окружающими элементами.
</p>

<h4>&lt;nav&gt;</h4>
<p>
  Раздел с основной навигацией; основная она или нет — на усмотрение верстальщика. Краткий список ссылок
  в подвале (главная, условия, копирайт) оборачивать в <code>&lt;nav&gt;</code> не нужно — для этого
  достаточно самого <code>&lt;footer&gt;</code>. Внутри может быть навигация в любой форме,
  не обязательно список.
</p>

<h4>&lt;header&gt; и &lt;footer&gt;</h4>
<p>
  Вводная и заключительная части сайта <strong>или любого смыслового раздела</strong> — поэтому их может быть
  несколько на странице (у каждого <code>&lt;article&gt;</code> может быть свой). Типовая ошибка — использовать
  только как шапку и подвал сайта. <code>&lt;footer&gt;</code> не обязан находиться в конце раздела.
</p>

<h4>&lt;main&gt;</h4>
<p>
  Основное, не повторяющееся на других страницах содержимое; один на странице. Ошибка — включать в него
  сквозные элементы: навигацию, копирайт.
</p>

<h3>Landmarks: карта страницы для скринридера</h3>

<p>Соответствие тегов и landmark-ролей, по которым работает быстрая навигация в скринридерах:</p>

<ul>
  <li><code>&lt;header&gt;</code> (верхнего уровня) → <code>banner</code></li>
  <li><code>&lt;nav&gt;</code> → <code>navigation</code></li>
  <li><code>&lt;main&gt;</code> → <code>main</code></li>
  <li><code>&lt;aside&gt;</code> → <code>complementary</code></li>
  <li><code>&lt;footer&gt;</code> (верхнего уровня) → <code>contentinfo</code></li>
  <li><code>&lt;section&gt;</code> с доступным именем → <code>region</code></li>
  <li><code>&lt;form&gt;</code> с доступным именем → <code>form</code>, поиск — <code>&lt;search&gt;</code> → <code>search</code></li>
</ul>

<p class="info info--blue">
  Если на странице несколько одинаковых landmarks (например, два <code>&lt;nav&gt;</code>), дай каждому
  различимое имя через <code>aria-label</code>: «Основное меню», «Хлебные крошки».
</p>

<h3>Семантика текста и «старые» теги</h3>

<p>
  Семантика — не только про каркас страницы. <code>&lt;p&gt;</code>, <code>&lt;ul&gt;/&lt;ol&gt;</code>,
  <code>&lt;table&gt;</code>, <code>&lt;blockquote&gt;</code> — тоже семантические теги. А вот
  <code>&lt;b&gt;</code> и <code>&lt;i&gt;</code> — презентационные: они описывают вид, а не смысл.
  Смысловые аналоги — <code>&lt;strong&gt;</code> (важность) и <code>&lt;em&gt;</code> (акцент, интонация):
  скринридеры и поисковики учитывают именно их. Для мелких фразовых кусков без собственного смысла
  остаётся <code>&lt;span&gt;</code>.
</p>

<p>
  Полезные, но часто забываемые семантические теги: <code>&lt;figure&gt;/&lt;figcaption&gt;</code>
  (иллюстрация с подписью), <code>&lt;time datetime="..."&gt;</code> (машиночитаемая дата),
  <code>&lt;details&gt;/&lt;summary&gt;</code> (нативный аккордеон), <code>&lt;dialog&gt;</code>
  (модальное окно с управлением фокусом), <code>&lt;address&gt;</code> (контактная информация).
</p>

<h3>Порядок семантической разметки страницы</h3>

<ol>
  <li>Крупные блоки страницы: <code>&lt;header&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;footer&gt;</code>.</li>
  <li>Разделы внутри блоков: <code>&lt;nav&gt;</code>, <code>&lt;section&gt;</code>, <code>&lt;article&gt;</code>, <code>&lt;aside&gt;</code>.</li>
  <li>Заголовок документа и заголовки разделов: <code>&lt;h1&gt;–&lt;h6&gt;</code>.</li>
  <li>Мелкие элементы разделов: списки, таблицы, формы, параграфы, цитаты.</li>
  <li>Фразовые элементы: ссылки, кнопки, изображения, время, выделения текста.</li>
</ol>

<p class="info info--orange">
  Иерархия заголовков должна быть последовательной (без перескока <code>h2</code> → <code>h5</code>).
  «Outline-алгоритм» HTML5, обещавший пересчитывать уровни <code>&lt;h1&gt;</code> по вложенности секций,
  так и не был реализован ни одним браузером и удалён из спецификации — уровни заголовков нужно
  проставлять явно.
</p>

<h3>Историческая справка</h3>

<p>
  До HTML5 (2008+) каркас страниц собирали из таблиц и <code>&lt;div id="nav"&gt;</code>-подобных конструкций.
  Анализ миллионов страниц (в том числе исследование Google) показал самые популярные значения
  <code>id</code> и <code>class</code> — <code>header</code>, <code>footer</code>, <code>nav</code>,
  <code>content</code>. Именно они и стали новыми тегами стандарта: спецификация закрепила то,
  что разработчики и так размечали вручную.
</p>
