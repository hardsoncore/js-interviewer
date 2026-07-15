<h3>Введение</h3>
<p><span class="accent">Позиционирование</span> — это механизм CSS, управляемый свойством <code>position</code>, который определяет, как элемент располагается в документе: участвует ли он в обычном потоке (flow), от чего отсчитываются его координаты (<code>top</code>, <code>right</code>, <code>bottom</code>, <code>left</code>) и как он взаимодействует с соседями.</p>
<p>Свойство <code>position</code> имеет пять основных значений: <code>static</code>, <code>relative</code>, <code>absolute</code>, <code>fixed</code> и <code>sticky</code>. Смещающие свойства (<code>top</code>/<code>left</code> и т.д.) работают только тогда, когда <code>position</code> отличается от <code>static</code>.</p>

<h3>Если коротко</h3>
<p>Интуиция по каждому значению одной фразой:</p>
<ul>
  <li><code>static</code> — «стой где стоишь»: элемент в обычном потоке, сдвинуть его нельзя.</li>
  <li><code>relative</code> — «сдвинься, но место за собой оставь»: соседи сдвига не замечают.</li>
  <li><code>absolute</code> — «выйди из потока и встань по координатам»: точка отсчёта — ближайший позиционированный предок.</li>
  <li><code>fixed</code> — «приклейся к экрану»: прокрутка страницы на элемент не влияет.</li>
  <li><code>sticky</code> — «прилипни к краю, когда докрутили до него»: до порога ведёт себя как <code>relative</code>, после — как <code>fixed</code>.</li>
</ul>
<p class="info info--blue">Один термин пригодится сразу: <span class="accent">содержащий блок</span> (containing block) — это прямоугольник-предок, от границ которого отсчитываются проценты и координаты <code>top</code>/<code>right</code>/<code>bottom</code>/<code>left</code>. У каждого значения <code>position</code> он определяется по своим правилам (подробный разбор — в конце).</p>

<h3>Базовый пример</h3>
<p>Смещение элемента относительно его нормального места:</p>
<code class="code">
  .box {
    position: relative;
    top: 20px;   /* сдвиг вниз от исходной позиции */
    left: 40px;  /* сдвиг вправо от исходной позиции */
  }
</code>

<h3>Значения position</h3>

<h4>static</h4>
<p>Значение по умолчанию. Элемент находится в обычном потоке документа, свойства <code>top</code>, <code>left</code>, <code>right</code>, <code>bottom</code> и <code>z-index</code> на него <strong>не действуют</strong>.</p>
<ul>
  <li>Элемент не создаёт содержащий блок (containing block) для абсолютно спозиционированных потомков.</li>
  <li>Именно на <code>position: static</code> мы сбрасываем элемент, когда нужно вернуть его в поток.</li>
</ul>

<h4>relative</h4>
<p>Элемент остаётся в потоке (его исходное место сохраняется), но визуально смещается относительно <strong>самого себя</strong> с помощью <code>top</code>/<code>left</code> и т.д.</p>
<ul>
  <li>Место, которое элемент занимал, остаётся зарезервированным — соседи не сдвигаются.</li>
  <li>Главное применение: сделать элемент <span class="accent">точкой отсчёта</span> для вложенных <code>absolute</code>-потомков, часто без всякого смещения.</li>
</ul>

<code class="code">
  .parent {
    position: relative; /* становится containing block */
  }

  .child {
    position: absolute;
    top: 0;
    right: 0; /* прижмётся к правому верхнему углу .parent */
  }
</code>

<h4>absolute</h4>
<p>Элемент <strong>полностью выпадает из потока</strong> — соседи ведут себя так, будто его нет. Координаты отсчитываются от ближайшего предка с <code>position</code>, отличным от <code>static</code> (а если такого нет — от <code>&lt;html&gt;</code>/начального содержащего блока).</p>
<ul>
  <li>Ширина по умолчанию «схлопывается» под контент (shrink-to-fit), а не растягивается на всю строку.</li>
  <li>Классические кейсы: бейджи, тултипы, кнопки-крестики в углу карточки, выпадающие меню.</li>
</ul>

<h4>fixed</h4>
<p>Тоже выпадает из потока, но привязан к <span class="accent">viewport</span> (окну браузера), а не к предку. Элемент остаётся на месте при прокрутке страницы.</p>
<ul>
  <li>Идеален для «липких» шапок, плавающих кнопок действия, модальных окон и cookie-баннеров.</li>
  <li>Важный нюанс: если у любого предка задан <code>transform</code>, <code>filter</code> или <code>perspective</code>, содержащим блоком становится этот предок, а не viewport (см. Deep Dive).</li>
</ul>

<h4>sticky</h4>
<p>Гибрид <code>relative</code> и <code>fixed</code>. Элемент ведёт себя как <code>relative</code>, пока при прокрутке не достигнет заданного порога (например, <code>top: 0</code>), после чего «прилипает» и ведёт себя как <code>fixed</code> в пределах своего родителя.</p>
<ul>
  <li>Обязательно нужно указать хотя бы одно смещение (<code>top</code>, <code>bottom</code> и т.д.) — иначе прилипание не сработает.</li>
  <li>Липкость ограничена рамками родительского контейнера: как только родитель уходит вверх, «прилипший» элемент уходит вместе с ним.</li>
</ul>

<code class="code">
  .table-header {
    position: sticky;
    top: 0;      /* прилипнет к верху при прокрутке */
    z-index: 10;
  }
</code>

<h3>Ключевые особенности (сравнение)</h3>
<ul>
  <li><strong>В потоке:</strong> <code>static</code> и <code>relative</code> остаются в потоке; <code>absolute</code> и <code>fixed</code> — выпадают; <code>sticky</code> — остаётся, но временно «отрывается».</li>
  <li><strong>Точка отсчёта:</strong> <code>relative</code> — от себя; <code>absolute</code> — от позиционированного предка; <code>fixed</code> — от viewport; <code>sticky</code> — от ближайшего скролл-контейнера.</li>
  <li><strong>z-index:</strong> работает у всех, кроме <code>static</code>, и создаёт новый контекст наложения (stacking context).</li>
</ul>

<h3>Важные нюансы и рекомендации</h3>
<ul>
  <li>Чтобы отцентрировать абсолютный элемент, комбинируйте <code>top: 50%; left: 50%;</code> с <code>transform: translate(-50%, -50%)</code> — это компенсирует собственные размеры элемента.</li>
  <li>Растянуть <code>absolute</code>-элемент на всего родителя можно, задав <code>top: 0; right: 0; bottom: 0; left: 0</code> (или короткое <code>inset: 0</code>).</li>
  <li>Не злоупотребляйте абсолютным позиционированием для основной раскладки — для сеток и колонок используйте Flexbox или Grid, которые адаптивны по своей природе.</li>
</ul>

<p class="info info--orange">Частая ошибка: задать потомку <code>position: absolute</code> и забыть про <code>position: relative</code> у родителя. Тогда элемент отсчитается не от карточки, а от всей страницы (или от неожиданного предка выше по дереву) и «улетит» в непредсказуемое место.</p>

<p class="info info--blue">Совет: <code>position: sticky</code> молча не работает, если у родителя стоит <code>overflow: hidden</code>, <code>overflow: auto</code> или <code>overflow: scroll</code> — элемент прилипает уже к этому контейнеру, а если у контейнера нет полосы прокрутки, эффекта не видно.</p>

<p class="deep-dive">Углубленный конспект</p>
<p>Ключ к пониманию позиционирования — концепция <span class="accent">содержащего блока</span> (containing block). Именно от его границ (padding box в большинстве случаев) отсчитываются проценты и смещения. Правила определения containing block различаются по значению <code>position</code>:</p>
<ul>
  <li>Для <code>absolute</code> — это padding box ближайшего предка с <code>position</code> не <code>static</code>.</li>
  <li>Для <code>fixed</code> — это viewport… но только при отсутствии «магических» свойств у предков.</li>
</ul>

<p>Здесь начинается самое неочевидное. Мы уже говорили, что <code>fixed</code> отсчитывается от <span class="accent">viewport</span> — именно поэтому фиксированный элемент и не двигается при прокрутке. Но это правило можно нечаянно «сломать»: если у <strong>любого</strong> предка выше по дереву стоит одно из «особых» CSS-свойств, то содержащим блоком для <code>fixed</code>-потомка становится уже этот предок, а не окно браузера.</p>

<p>Такой эффект дают, в частности:</p>
<ul>
  <li><code>transform</code> — любое ненулевое значение, даже безобидное <code>translate(0)</code>;</li>
  <li><code>filter</code> и <code>backdrop-filter</code>;</li>
  <li><code>perspective</code>;</li>
  <li><code>will-change</code>, если в его значении указано одно из этих свойств (например, <code>will-change: transform</code>);</li>
  <li><code>contain</code> со значением <code>paint</code>, <code>layout</code>, <code>strict</code> или <code>content</code>;</li>
  <li><code>container-type</code> (контейнерные запросы: <code>size</code> или <code>inline-size</code>).</li>
</ul>

<p>Почему так происходит? Свойство <code>transform</code> (и его «родственники») заводит для потомков <span class="accent">новую систему координат</span> — элемент как бы объявляет: «теперь все дочерние координаты отсчитываются от меня». Из-за этого браузер вынужден привязать <code>fixed</code>-потомка к этому предку, а не к viewport.</p>

<p>На практике это выглядит так: элемент с <code>position: fixed</code> внутри такого контейнера начинает вести себя как обычный <code>absolute</code> — он привязан к контейнеру и <strong>прокручивается вместе со страницей</strong>, хотя вы ожидали, что он «прилипнет» к экрану.</p>

<code class="code">
  .animated-wrapper {
    transform: translateY(0);  /* казалось бы, безобидная строчка */
  }

  .modal {
    position: fixed;  /* ожидаем: прилипнет к окну браузера */
    top: 0;
    left: 0;          /* по факту: считается от .animated-wrapper и скроллится вместе с ним */
  }
</code>

<p class="info info--orange">Это одна из самых частых и запутанных ловушек CSS: где-то наверху дерева добавили анимацию или <code>will-change</code> ради оптимизации — и «сломался» совершенно другой, фиксированный элемент. Если <code>position: fixed</code> внезапно поехал вместе со страницей, первым делом ищите у предков <code>transform</code>, <code>filter</code>, <code>perspective</code> или <code>will-change</code>. Лечится это выносом фиксированного элемента из проблемного поддерева (например, ближе к <code>&lt;body&gt;</code>) или отказом от «особого» свойства у предка.</p>

<p>Отдельная тема — <span class="accent">stacking context</span> (контекст наложения). <code>z-index</code> сравнивает элементы только внутри одного контекста. Позиционированный элемент с числовым <code>z-index</code> (а также элементы с <code>opacity &lt; 1</code>, <code>transform</code>, <code>filter</code>, <code>isolation: isolate</code>) создаёт новый контекст. Это объясняет, почему элемент с <code>z-index: 9999</code> порой не может перекрыть соседа с <code>z-index: 1</code>: они лежат в разных, изолированных контекстах наложения, и сравниваются уже их родители.</p>
