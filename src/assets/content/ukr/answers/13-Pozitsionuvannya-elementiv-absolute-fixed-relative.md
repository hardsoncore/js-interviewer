<h3>Вступ</h3>
<p><span class="accent">Позиціонування</span> — це механізм CSS, керований властивістю <code>position</code>, який визначає, як елемент розташовується в документі: чи бере він участь у звичайному потоці (flow), від чого відлічуються його координати (<code>top</code>, <code>right</code>, <code>bottom</code>, <code>left</code>) і як він взаємодіє із сусідами.</p>
<p>Властивість <code>position</code> має п'ять основних значень: <code>static</code>, <code>relative</code>, <code>absolute</code>, <code>fixed</code> і <code>sticky</code>. Зміщувальні властивості (<code>top</code>/<code>left</code> тощо) працюють лише тоді, коли <code>position</code> відрізняється від <code>static</code>.</p>

<h3>Якщо коротко</h3>
<p>Інтуїція щодо кожного значення однією фразою:</p>
<ul>
  <li><code>static</code> — «стій де стоїш»: елемент у звичайному потоці, зсунути його не можна.</li>
  <li><code>relative</code> — «зсунься, але місце за собою залиш»: сусіди зсуву не помічають.</li>
  <li><code>absolute</code> — «вийди з потоку і стань за координатами»: точка відліку — найближчий спозиційований предок.</li>
  <li><code>fixed</code> — «приклейся до екрана»: прокручування сторінки на елемент не впливає.</li>
  <li><code>sticky</code> — «прилипни до краю, коли докрутили до нього»: до порога поводиться як <code>relative</code>, після — як <code>fixed</code>.</li>
</ul>
<p class="info info--blue">Один термін знадобиться одразу: <span class="accent">містковий блок</span> (containing block) — це прямокутник-предок, від меж якого відлічуються відсотки та координати <code>top</code>/<code>right</code>/<code>bottom</code>/<code>left</code>. У кожного значення <code>position</code> він визначається за своїми правилами (докладний розбір — у кінці).</p>

<h3>Базовий приклад</h3>
<p>Зміщення елемента відносно його нормального місця:</p>
<code class="code">
  .box {
    position: relative;
    top: 20px;   /* зсув униз від початкової позиції */
    left: 40px;  /* зсув праворуч від початкової позиції */
  }
</code>

<h3>Значення position</h3>

<h4>static</h4>
<p>Значення за замовчуванням. Елемент перебуває у звичайному потоці документа, властивості <code>top</code>, <code>left</code>, <code>right</code>, <code>bottom</code> та <code>z-index</code> на нього <strong>не діють</strong>.</p>
<ul>
  <li>Елемент не створює містковий блок (containing block) для абсолютно спозиціонованих нащадків.</li>
  <li>Саме на <code>position: static</code> ми скидаємо елемент, коли потрібно повернути його в потік.</li>
</ul>

<h4>relative</h4>
<p>Елемент залишається в потоці (його початкове місце зберігається), але візуально зміщується відносно <strong>самого себе</strong> за допомогою <code>top</code>/<code>left</code> тощо.</p>
<ul>
  <li>Місце, яке елемент займав, залишається зарезервованим — сусіди не зсуваються.</li>
  <li>Головне застосування: зробити елемент <span class="accent">точкою відліку</span> для вкладених <code>absolute</code>-нащадків, часто без жодного зміщення.</li>
</ul>

<code class="code">
  .parent {
    position: relative; /* стає containing block */
  }

  .child {
    position: absolute;
    top: 0;
    right: 0; /* притиснеться до правого верхнього кута .parent */
  }
</code>

<h4>absolute</h4>
<p>Елемент <strong>повністю випадає з потоку</strong> — сусіди поводяться так, ніби його немає. Координати відлічуються від найближчого предка з <code>position</code>, відмінним від <code>static</code> (а якщо такого немає — від <code>&lt;html&gt;</code>/початкового місткового блоку).</p>
<ul>
  <li>Ширина за замовчуванням «схлопується» під контент (shrink-to-fit), а не розтягується на весь рядок.</li>
  <li>Класичні кейси: бейджі, тултипи, кнопки-хрестики в куті картки, випадні меню.</li>
</ul>

<h4>fixed</h4>
<p>Також випадає з потоку, але прив'язаний до <span class="accent">viewport</span> (вікна браузера), а не до предка. Елемент залишається на місці під час прокручування сторінки.</p>
<ul>
  <li>Ідеальний для «липких» шапок, плаваючих кнопок дії, модальних вікон та cookie-банерів.</li>
  <li>Важливий нюанс: якщо в будь-якого предка задано <code>transform</code>, <code>filter</code> або <code>perspective</code>, містковим блоком стає цей предок, а не viewport (див. Deep Dive).</li>
</ul>

<h4>sticky</h4>
<p>Гібрид <code>relative</code> і <code>fixed</code>. Елемент поводиться як <code>relative</code>, доки під час прокручування не досягне заданого порога (наприклад, <code>top: 0</code>), після чого «прилипає» і поводиться як <code>fixed</code> у межах свого батька.</p>
<ul>
  <li>Обов'язково потрібно вказати хоча б одне зміщення (<code>top</code>, <code>bottom</code> тощо) — інакше прилипання не спрацює.</li>
  <li>Липкість обмежена рамками батьківського контейнера: щойно батько йде вгору, «прилиплий» елемент іде разом із ним.</li>
</ul>

<code class="code">
  .table-header {
    position: sticky;
    top: 0;      /* прилипне до верху під час прокручування */
    z-index: 10;
  }
</code>

<h3>Ключові особливості (порівняння)</h3>
<ul>
  <li><strong>У потоці:</strong> <code>static</code> і <code>relative</code> залишаються в потоці; <code>absolute</code> і <code>fixed</code> — випадають; <code>sticky</code> — залишається, але тимчасово «відривається».</li>
  <li><strong>Точка відліку:</strong> <code>relative</code> — від себе; <code>absolute</code> — від спозиційованого предка; <code>fixed</code> — від viewport; <code>sticky</code> — від найближчого скрол-контейнера.</li>
  <li><strong>z-index:</strong> працює в усіх, крім <code>static</code>, і створює новий контекст накладання (stacking context).</li>
</ul>

<h3>Важливі нюанси та рекомендації</h3>
<ul>
  <li>Щоб відцентрувати абсолютний елемент, комбінуйте <code>top: 50%; left: 50%;</code> із <code>transform: translate(-50%, -50%)</code> — це компенсує власні розміри елемента.</li>
  <li>Розтягнути <code>absolute</code>-елемент на всього батька можна, задавши <code>top: 0; right: 0; bottom: 0; left: 0</code> (або коротке <code>inset: 0</code>).</li>
  <li>Не зловживайте абсолютним позиціонуванням для основної розкладки — для сіток і колонок використовуйте Flexbox або Grid, які адаптивні за своєю природою.</li>
</ul>

<p class="info info--orange">Часта помилка: задати нащадку <code>position: absolute</code> і забути про <code>position: relative</code> у батька. Тоді елемент відлічиться не від картки, а від усієї сторінки (або від несподіваного предка вище по дереву) і «полетить» у непередбачуване місце.</p>

<p class="info info--blue">Порада: <code>position: sticky</code> мовчки не працює, якщо в батька стоїть <code>overflow: hidden</code>, <code>overflow: auto</code> або <code>overflow: scroll</code> — елемент прилипає вже до цього контейнера, а якщо в контейнера немає смуги прокручування, ефекту не видно.</p>

<p class="deep-dive">Поглиблений конспект</p>
<p>Ключ до розуміння позиціонування — концепція <span class="accent">місткового блоку</span> (containing block). Саме від його меж (padding box у більшості випадків) відлічуються відсотки та зміщення. Правила визначення containing block різняться за значенням <code>position</code>:</p>
<ul>
  <li>Для <code>absolute</code> — це padding box найближчого предка з <code>position</code> не <code>static</code>.</li>
  <li>Для <code>fixed</code> — це viewport… але лише за відсутності «магічних» властивостей у предків.</li>
</ul>

<p>Тут починається найнеочевидніше. Ми вже казали, що <code>fixed</code> відлічується від <span class="accent">viewport</span> — саме тому фіксований елемент і не рухається під час прокручування. Але це правило можна ненавмисно «зламати»: якщо в <strong>будь-якого</strong> предка вище по дереву стоїть одна з «особливих» CSS-властивостей, то містковим блоком для <code>fixed</code>-нащадка стає вже цей предок, а не вікно браузера.</p>

<p>Такий ефект дають, зокрема:</p>
<ul>
  <li><code>transform</code> — будь-яке ненульове значення, навіть безневинне <code>translate(0)</code>;</li>
  <li><code>filter</code> і <code>backdrop-filter</code>;</li>
  <li><code>perspective</code>;</li>
  <li><code>will-change</code>, якщо в його значенні вказано одну з цих властивостей (наприклад, <code>will-change: transform</code>);</li>
  <li><code>contain</code> зі значенням <code>paint</code>, <code>layout</code>, <code>strict</code> або <code>content</code>;</li>
  <li><code>container-type</code> (контейнерні запити: <code>size</code> або <code>inline-size</code>).</li>
</ul>

<p>Чому так відбувається? Властивість <code>transform</code> (і її «родичі») заводить для нащадків <span class="accent">нову систему координат</span> — елемент ніби оголошує: «тепер усі дочірні координати відлічуються від мене». Через це браузер змушений прив'язати <code>fixed</code>-нащадка до цього предка, а не до viewport.</p>

<p>На практиці це має такий вигляд: елемент із <code>position: fixed</code> усередині такого контейнера починає поводитися як звичайний <code>absolute</code> — він прив'язаний до контейнера і <strong>прокручується разом зі сторінкою</strong>, хоча ви очікували, що він «прилипне» до екрана.</p>

<code class="code">
  .animated-wrapper {
    transform: translateY(0);  /* здавалося б, безневинний рядок */
  }

  .modal {
    position: fixed;  /* очікуємо: прилипне до вікна браузера */
    top: 0;
    left: 0;          /* насправді: рахується від .animated-wrapper і скролиться разом із ним */
  }
</code>

<p class="info info--orange">Це одна з найчастіших і найзаплутаніших пасток CSS: десь угорі дерева додали анімацію або <code>will-change</code> заради оптимізації — і «зламався» зовсім інший, фіксований елемент. Якщо <code>position: fixed</code> раптом поїхав разом зі сторінкою, насамперед шукайте в предків <code>transform</code>, <code>filter</code>, <code>perspective</code> або <code>will-change</code>. Лікується це винесенням фіксованого елемента з проблемного піддерева (наприклад, ближче до <code>&lt;body&gt;</code>) або відмовою від «особливої» властивості в предка.</p>

<p>Окрема тема — <span class="accent">stacking context</span> (контекст накладання). <code>z-index</code> порівнює елементи лише всередині одного контексту. Спозиційований елемент із числовим <code>z-index</code> (а також елементи з <code>opacity &lt; 1</code>, <code>transform</code>, <code>filter</code>, <code>isolation: isolate</code>) створює новий контекст. Це пояснює, чому елемент із <code>z-index: 9999</code> часом не може перекрити сусіда з <code>z-index: 1</code>: вони лежать у різних, ізольованих контекстах накладання, і порівнюються вже їхні батьки.</p>
