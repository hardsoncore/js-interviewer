<h3>Введение</h3>

<p>
  Тип элемента — это то, какой <span class="accent">бокс</span> он создаёт в нормальном потоке. Задаёт его свойство
  <code>display</code>, а тег лишь даёт значение по умолчанию из таблицы стилей браузера:
  <code>div</code> — <code>block</code>, <code>span</code> — <code>inline</code>.
</p>

<p class="info">
  <strong>Главная мысль:</strong> «блочный» и «строчный» — не свойство тега, а поведение бокса. Любой элемент
  переключается через <code>display</code>; семантика тега при этом не меняется.
</p>

<h3>Блочные (block)</h3>

<ul>
  <li>Занимают всю ширину родителя и всегда начинаются с новой строки.</li>
  <li><code>width</code>, <code>height</code>, все <code>margin</code> и <code>padding</code> работают полностью.</li>
  <li>Вертикальные <code>margin</code> соседей схлопываются (margin collapsing).</li>
  <li>Примеры: <code>div</code>, <code>p</code>, <code>h1</code>—<code>h6</code>, <code>section</code>, <code>ul</code>.</li>
</ul>

<h3>Строчные (inline)</h3>

<ul>
  <li>Живут внутри строки текста, ширина — по содержимому, перенос идёт по словам.</li>
  <li><code>width</code> и <code>height</code> <strong>игнорируются</strong>.</li>
  <li>Вертикальные <code>margin</code> не действуют; вертикальные <code>padding</code> рисуются, но
    <strong>не раздвигают</strong> строку и залезают на соседние.</li>
  <li>Примеры: <code>span</code>, <code>a</code>, <code>em</code>, <code>code</code>.</li>
</ul>

<h3>inline-block — гибрид</h3>

<p>Снаружи ведёт себя как строчный (встаёт в строку), внутри — как блочный (принимает размеры и отступы).</p>

<code class="code">
  .tag {
    display: inline-block;
    width: 120px;   /* работает, в отличие от inline */
    padding: 8px;   /* раздвигает соседей по вертикали */
  }
</code>

<p class="info info--orange">
  Между <code>inline-block</code>-элементами появляется зазор ~4px — это реальный пробел в разметке между тегами.
  Лечится переходом на flex/grid у родителя, а не «костылём» <code>font-size: 0</code>.
</p>

<h3>Остальные значения display</h3>

<ul>
  <li><code>none</code> — элемент убран из дерева рендеринга: нет бокса, нет места, недоступен скринридеру.</li>
  <li><code>flex</code> / <code>grid</code> — блочный снаружи, но задаёт детям свою модель раскладки.</li>
  <li><code>contents</code> — бокс самого элемента исчезает, дети поднимаются к бабушке-родителю
    (удобно для лишней обёртки внутри flex).</li>
  <li><code>list-item</code>, <code>table</code>, <code>table-cell</code> — специализированные боксы.</li>
</ul>

<p class="info info--blue">
  Не путай <code>display: none</code> (нет бокса, места не занимает) и <code>visibility: hidden</code>
  (бокс есть, место занято, просто не отрисован).
</p>

<p class="deep-dive">Углубленный конспект</p>

<h3>Внешний и внутренний display</h3>

<p>
  В CSS Display Level 3 <code>display</code> — это две независимые роли, и современный синтаксис принимает обе явно:
</p>

<ul>
  <li><strong>outer</strong> — как бокс ведёт себя относительно соседей (<code>block</code> / <code>inline</code>).</li>
  <li><strong>inner</strong> — какой контекст форматирования он создаёт для детей
    (<code>flow</code>, <code>flow-root</code>, <code>flex</code>, <code>grid</code>, <code>table</code>).</li>
</ul>

<code class="code">
  display: block;         /* legacy-запись, равна block flow      */
  display: inline-block;  /* равна inline flow-root               */
  display: flex;          /* равна block flex                     */
  display: inline flex;   /* flex-контейнер, стоящий в строке     */
</code>

<p>
  Отсюда видно, что <code>inline-block</code> — не отдельная сущность, а комбинация: снаружи <code>inline</code>,
  внутри <code>flow-root</code>, то есть собственный BFC. Именно BFC объясняет его свойства: внутри не схлопываются
  margin и не «вываливаются» float.
</p>

<h3>flow-root и BFC</h3>

<p>
  <code>display: flow-root</code> — блочный бокс, который создаёт новый Block Formatting Context без побочных
  эффектов. Это современная замена clearfix: родитель обхватывает плавающих детей, а внешние
  <code>margin</code> детей не протекают наружу.
</p>

<code class="code">
  .wrapper {
    display: flow-root; /* вместо .clearfix::after { content: ""; clear: both } */
  }
</code>

<h3>Почему inline игнорирует размеры</h3>

<p>
  Строчный бокс — часть <span class="accent">line box</span>, высота которого считается по
  <code>line-height</code> и метрикам шрифта, а не по содержимому бокса. Указать высоту такому фрагменту
  нельзя — иначе поехала бы вся строка. По той же причине вертикальные <code>padding</code> и <code>border</code>
  рисуются, но в расчёт высоты строки не входят и перекрывают соседние строки.
</p>

<h3>Замещаемые элементы (replaced)</h3>

<p>
  <code>img</code>, <code>video</code>, <code>input</code>, <code>iframe</code> формально <code>inline</code>,
  но размеры принимают: их содержимое рисует не CSS, а внешний ресурс, и у него есть собственные внутренние
  размеры (intrinsic size). Практическое следствие — «загадочный» отступ под картинкой:
  <code>img</code> стоит на baseline строки, ниже которой остаётся место под нижние выносные элементы.
</p>

<code class="code">
  img { display: block; }      /* убирает зазор под картинкой */
  img { vertical-align: top; } /* альтернатива, если нужен inline */
</code>

<h3>Анонимные боксы</h3>

<p>
  Если в блочном контейнере блочные и строчные дети перемешаны, браузер оборачивает строчные в
  <strong>анонимные блочные боксы</strong> — стилизовать их нельзя, но они объясняют, почему голый текст рядом
  с <code>div</code> ведёт себя как отдельная строка.
</p>

<p class="info info--orange">
  <code>display: contents</code> долго ломал доступность: элемент терял семантику в дереве доступности.
  В актуальных браузерах баг исправлен для большинства ролей, но проверяй на <code>li</code>, <code>button</code>
  и таблицах — там поведение всё ещё расходится.
</p>
