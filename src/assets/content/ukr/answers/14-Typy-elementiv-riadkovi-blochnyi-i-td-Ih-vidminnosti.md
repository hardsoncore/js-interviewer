<h3>Вступ</h3>

<p>
  Тип елемента — це те, який <span class="accent">бокс</span> він створює у нормальному потоці. Задає його властивість
  <code>display</code>, а тег лише дає значення за замовчуванням із таблиці стилів браузера:
  <code>div</code> — <code>block</code>, <code>span</code> — <code>inline</code>.
</p>

<p class="info">
  <strong>Головна думка:</strong> «блочний» і «рядковий» — не властивість тега, а поведінка бокса. Будь-який елемент
  перемикається через <code>display</code>; семантика тега при цьому не змінюється.
</p>

<h3>Блочні (block)</h3>

<ul>
  <li>Займають усю ширину батька і завжди починаються з нового рядка.</li>
  <li><code>width</code>, <code>height</code>, усі <code>margin</code> і <code>padding</code> працюють повністю.</li>
  <li>Вертикальні <code>margin</code> сусідів схлопуються (margin collapsing).</li>
  <li>Приклади: <code>div</code>, <code>p</code>, <code>h1</code>—<code>h6</code>, <code>section</code>, <code>ul</code>.</li>
</ul>

<h3>Рядкові (inline)</h3>

<ul>
  <li>Живуть усередині рядка тексту, ширина — за вмістом, перенесення йде по словах.</li>
  <li><code>width</code> і <code>height</code> <strong>ігноруються</strong>.</li>
  <li>Вертикальні <code>margin</code> не діють; вертикальні <code>padding</code> малюються, але
    <strong>не розсувають</strong> рядок і налазять на сусідні.</li>
  <li>Приклади: <code>span</code>, <code>a</code>, <code>em</code>, <code>code</code>.</li>
</ul>

<h3>inline-block — гібрид</h3>

<p>Ззовні поводиться як рядковий (стає в рядок), усередині — як блочний (приймає розміри та відступи).</p>

<code class="code">
  .tag {
    display: inline-block;
    width: 120px;   /* працює, на відміну від inline */
    padding: 8px;   /* розсуває сусідів по вертикалі */
  }
</code>

<p class="info info--orange">
  Між <code>inline-block</code>-елементами з'являється проміжок ~4px — це реальний пробіл у розмітці між тегами.
  Лікується переходом на flex/grid у батька, а не «милицею» <code>font-size: 0</code>.
</p>

<h3>Інші значення display</h3>

<ul>
  <li><code>none</code> — елемент прибрано з дерева рендерингу: немає бокса, немає місця, недоступний скрінрідеру.</li>
  <li><code>flex</code> / <code>grid</code> — блочний ззовні, але задає дітям свою модель розкладки.</li>
  <li><code>contents</code> — бокс самого елемента зникає, діти піднімаються до батька рівнем вище
    (зручно для зайвої обгортки всередині flex).</li>
  <li><code>list-item</code>, <code>table</code>, <code>table-cell</code> — спеціалізовані бокси.</li>
</ul>

<p class="info info--blue">
  Не плутай <code>display: none</code> (немає бокса, місця не займає) і <code>visibility: hidden</code>
  (бокс є, місце зайняте, просто не відмальований).
</p>

<p class="deep-dive">Поглиблений конспект</p>

<h3>Зовнішній і внутрішній display</h3>

<p>
  У CSS Display Level 3 <code>display</code> — це дві незалежні ролі, і сучасний синтаксис приймає обидві явно:
</p>

<ul>
  <li><strong>outer</strong> — як бокс поводиться відносно сусідів (<code>block</code> / <code>inline</code>).</li>
  <li><strong>inner</strong> — який контекст форматування він створює для дітей
    (<code>flow</code>, <code>flow-root</code>, <code>flex</code>, <code>grid</code>, <code>table</code>).</li>
</ul>

<code class="code">
  display: block;         /* legacy-запис, дорівнює block flow     */
  display: inline-block;  /* дорівнює inline flow-root             */
  display: flex;          /* дорівнює block flex                   */
  display: inline flex;   /* flex-контейнер, що стоїть у рядку     */
</code>

<p>
  Звідси видно, що <code>inline-block</code> — не окрема сутність, а комбінація: ззовні <code>inline</code>,
  усередині <code>flow-root</code>, тобто власний BFC. Саме BFC пояснює його властивості: усередині не схлопуються
  margin і не «вивалюються» float.
</p>

<h3>flow-root і BFC</h3>

<p>
  <code>display: flow-root</code> — блочний бокс, який створює новий Block Formatting Context без побічних
  ефектів. Це сучасна заміна clearfix: батько обхоплює плаваючих дітей, а зовнішні
  <code>margin</code> дітей не протікають назовні.
</p>

<code class="code">
  .wrapper {
    display: flow-root; /* замість .clearfix::after { content: ""; clear: both } */
  }
</code>

<h3>Чому inline ігнорує розміри</h3>

<p>
  Рядковий бокс — частина <span class="accent">line box</span>, висота якого рахується за
  <code>line-height</code> і метриками шрифту, а не за вмістом бокса. Вказати висоту такому фрагменту
  не можна — інакше поїхав би весь рядок. З тієї ж причини вертикальні <code>padding</code> і <code>border</code>
  малюються, але в розрахунок висоти рядка не входять і перекривають сусідні рядки.
</p>

<h3>Замінювані елементи (replaced)</h3>

<p>
  <code>img</code>, <code>video</code>, <code>input</code>, <code>iframe</code> формально <code>inline</code>,
  але розміри приймають: їхній вміст малює не CSS, а зовнішній ресурс, і в нього є власні внутрішні
  розміри (intrinsic size). Практичний наслідок — «загадковий» відступ під картинкою:
  <code>img</code> стоїть на baseline рядка, нижче якого лишається місце під нижні виносні елементи.
</p>

<code class="code">
  img { display: block; }      /* прибирає проміжок під картинкою */
  img { vertical-align: top; } /* альтернатива, якщо потрібен inline */
</code>

<h3>Анонімні бокси</h3>

<p>
  Якщо в блочному контейнері блочні та рядкові діти перемішані, браузер загортає рядкові в
  <strong>анонімні блочні бокси</strong> — стилізувати їх не можна, але вони пояснюють, чому голий текст поруч
  із <code>div</code> поводиться як окремий рядок.
</p>

<p class="info info--orange">
  <code>display: contents</code> довго ламав доступність: елемент втрачав семантику в дереві доступності.
  В актуальних браузерах баг виправлено для більшості ролей, але перевіряй на <code>li</code>, <code>button</code>
  і таблицях — там поведінка все ще розходиться.
</p>
