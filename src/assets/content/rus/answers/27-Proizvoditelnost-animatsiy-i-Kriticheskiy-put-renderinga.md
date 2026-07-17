<p>
  <span class="accent">Критический путь рендеринга (Critical Rendering Path, CRP)</span> — это конвейер, по которому браузер
  превращает HTML, CSS и JavaScript в пиксели на экране.
</p>

<p>
  Главная мысль: <strong>анимация — это тот же конвейер, пройденный заново на каждом кадре</strong>. Значит, чем меньше
  этапов конвейера мы трогаем на каждом кадре, тем плавнее анимация. Отсюда единственный практический вывод, который
  закрывает большую часть вопроса:
</p>

<p class="info info--blue">
  <strong>Анимируй только <code>transform</code> и <code>opacity</code>.</strong> Только эти два свойства позволяют
  пропустить самые дорогие этапы конвейера — Layout и Paint — и работать почти бесплатно.
</p>

<hr />

<h3>Три этапа конвейера и правило каскада</h3>

<p>При анимации нас интересуют последние три этапа CRP. Они идут строго по порядку:</p>

<ul>
  <li>
    <strong>Layout (Reflow)</strong> — расчёт геометрии: где элемент и какого он размера. <span class="accent">Самый дорогой</span>:
    сдвиг одного элемента заставляет пересчитать соседей и родителей.
  </li>
  <li>
    <strong>Paint</strong> — заливка пикселей: цвета, тени, границы, текст. Дорого, но дешевле Layout.
  </li>
  <li>
    <strong>Composite</strong> — склейка уже готовых слоёв в картинку силами GPU. <span class="accent">Почти бесплатно.</span>
  </li>
</ul>

<p class="info info--orange">
  <strong>Правило каскада:</strong> этапы срабатывают «сверху вниз». Запустил Layout — за ним <strong>обязательно</strong>
  идут Paint и Composite. Запустил Paint — за ним идёт Composite. А вот наоборот нельзя: можно сделать только Composite,
  не трогая Layout и Paint. Вся оптимизация анимаций — про то, чтобы остаться на самом нижнем этапе.
</p>

<h4>Что какой этап запускает</h4>

<code class="code">
  /* Layout + Paint + Composite — НЕ анимировать */
  width, height, top, left, right, bottom
  margin, padding, border-width, font-size

  /* Paint + Composite — дорого */
  color, background, border-color, box-shadow, border-radius

  /* Только Composite — анимируем ЭТО */
  transform   /* translate, scale, rotate */
  opacity
</code>

<hr />

<h3>Бюджет кадра: почему всё упирается в 16.7 мс</h3>

<p>
  Экран обновляется 60 раз в секунду, значит на один кадр у браузера есть <strong>1000 / 60 ≈ 16.7 мс</strong>. И это бюджет
  не только на твой код — в те же 16.7 мс браузер должен уложить стили, Layout, Paint, Composite и сборку мусора.
</p>

<p>
  Не уложился в кадр — кадр пропущен (<strong>dropped frame</strong>), и пользователь видит рывок (jank). Анимация
  <code>transform</code> дешёвая именно поэтому: она почти не тратит этот бюджет.
</p>

<p class="info info--blue">
  Между 60 FPS и 30 FPS нет плавного перехода — есть обрыв. Либо кадр укладывается в бюджет, либо нет.
</p>

<hr />

<h3>Как анимировать правильно: практика</h3>

<h4>Плохо — через геометрию (каждый кадр Layout + Paint)</h4>

<code class="code">
  .box {
    position: absolute;
    left: 0;
    transition: left 300ms;
  }
  .box:hover {
    left: 300px;
  }
</code>

<h4>Хорошо — через transform (каждый кадр только Composite)</h4>

<code class="code">
  .box {
    transition: transform 300ms;
  }
  .box:hover {
    transform: translateX(300px);
  }
</code>

<p>Визуально одинаково, но цена кадра разная. Держи в голове таблицу замен:</p>

<ul>
  <li><code>left / top</code> → <code>transform: translate()</code></li>
  <li><code>width / height</code> → <code>transform: scale()</code></li>
  <li><code>display / visibility</code> → <code>opacity</code> (+ <code>pointer-events: none</code>)</li>
</ul>

<h4>will-change — подсказка браузеру</h4>

<p>
  Чтобы анимировать элемент только на этапе Composite, браузер выносит его в отдельный слой (текстуру на GPU). Свойство
  <code>will-change</code> предупреждает об этом заранее:
</p>

<code class="code">
  .modal {
    will-change: transform, opacity;
  }
</code>

<p class="info info--orange">
  Но <code>will-change</code> — это не «сделать быстро», а обещание браузеру. Каждый слой ест память GPU. Навесишь его
  на всё подряд «на всякий случай» — получишь падение производительности вместо роста. Ставь точечно, только на то,
  что реально вот-вот будет анимироваться.
</p>

<hr />

<p class="deep-dive">Углубленный конспект</p>

<h4>Полный конвейер CRP</h4>

<p>Layout, Paint и Composite — это лишь хвост пути. Целиком он выглядит так:</p>

<ol>
  <li><strong>DOM</strong> — парсинг HTML в дерево узлов.</li>
  <li><strong>CSSOM</strong> — парсинг CSS в дерево стилей.</li>
  <li><strong>Render Tree</strong> — DOM + CSSOM, только видимые элементы (без <code>display: none</code>).</li>
  <li><strong>Layout → Paint → Composite</strong> — те самые три этапа, что повторяются на каждом кадре.</li>
</ol>

<p>Первые три шага — разовая работа при загрузке; анимация крутит только последние три.</p>

<h4>Главный поток против потока композитора</h4>

<p>
  Настоящая причина, по которой <code>transform</code> быстрый, глубже, чем «меньше этапов». В Chrome (Blink) рендеринг
  разделён на потоки:
</p>

<ul>
  <li>
    <span class="accent">Main thread</span> — здесь живут JavaScript, Style, Layout, Paint. Его легко заблокировать тяжёлым JS.
  </li>
  <li>
    <span class="accent">Compositor thread</span> — отдельный поток, который склеивает слои и общается с GPU.
  </li>
</ul>

<p>
  Анимация <code>transform</code> и <code>opacity</code> может целиком уйти <strong>потоку композитора</strong>. Поэтому даже
  если главный поток намертво заблокирован тяжёлым JS-циклом, такая анимация <strong>продолжит идти плавно</strong> — она
  физически исполняется в другом потоке. Именно поэтому CSS-анимации переживают лаги JS, а анимация через <code>left</code> — нет.
</p>

<p class="info info--orange">
  Это же объясняет «отклеивание» скролла: скролл обрабатывается композитором, а обработчики <code>scroll</code> — главным
  потоком. Отсюда <code>addEventListener('scroll', fn, { passive: true })</code>: обещаешь, что не вызовешь
  <code>preventDefault()</code>, и композитор скроллит, не дожидаясь главного потока.
</p>

<h4>Layout Thrashing (принудительный синхронный Layout)</h4>

<p>
  Браузер копит изменения DOM и применяет их пачкой в конце кадра. Но если <strong>прочитать</strong> геометрию сразу после
  <strong>записи</strong> — он вынужден немедленно пересчитать Layout, чтобы отдать честное значение. В цикле это
  превращается в Layout на каждой итерации.
</p>

<code class="code">
  // ПЛОХО: чтение после записи в цикле = Layout на каждой итерации
  boxes.forEach((box) => {
    box.style.width = box.offsetWidth + 10 + 'px';
  });

  // ХОРОШО: сначала все чтения, потом все записи
  const widths = boxes.map((box) => box.offsetWidth); // batch read
  boxes.forEach((box, i) => {
    box.style.width = widths[i] + 10 + 'px';         // batch write
  });
</code>

<p>Свойства-триггеры принудительного Layout при чтении: <code>offsetWidth</code>, <code>offsetTop</code>,
  <code>clientHeight</code>, <code>scrollTop</code>, <code>getComputedStyle()</code>, <code>getBoundingClientRect()</code>.</p>

<h4>Как рождается слой и ловушка implicit compositing</h4>

<p>
  Слой создаёт браузер, а не разработчик. Типичные причины промоушена: 3D-трансформации,
  <code>will-change: transform / opacity</code>, <code>&lt;video&gt;</code> и <code>&lt;canvas&gt;</code>,
  <code>position: fixed</code>, композитные анимации.
</p>

<p>
  Дальше вступает <strong>implicit compositing</strong>: если элемент с более высоким <code>z-index</code> перекрывает
  промотированный слой, браузер <strong>обязан</strong> создать слой и ему — иначе сломается порядок наложения. Один
  <code>will-change</code> может лавинообразно породить десяток слоёв (в DevTools → Layers их причина — «overlap»). Это и есть
  <strong>layer explosion</strong>, из-за которого <code>will-change</code> нельзя вешать на всё подряд.
</p>

<h4>Растеризация и tiles</h4>

<p>
  Paint не рисует пиксели напрямую — он записывает <strong>список команд рисования</strong> (display list). Уже потом
  растеризация превращает их в биты, разбивая слой на <strong>плитки (tiles)</strong> (обычно 256×256 или 512×512), чтобы
  растеризовать только видимую часть и переиспользовать плитки при скролле. Поэтому при быстром скролле иногда мелькают белые
  области — композитор показал кадр раньше, чем растеризатор подготовил плитки.
</p>

<h4>Техника FLIP — когда всё-таки нужно анимировать геометрию</h4>

<p>
  FLIP решает противоречие: нужно анимировать смену позиции/размера (Layout-свойства), но анимировать можно только
  <code>transform</code>. Аббревиатура — <strong>First, Last, Invert, Play</strong>:
</p>

<ol>
  <li><strong>First</strong> — замерили позицию до изменения.</li>
  <li><strong>Last</strong> — мгновенно применили конечное состояние и замерили снова.</li>
  <li><strong>Invert</strong> — через <code>transform</code> вернули элемент визуально в старт.</li>
  <li><strong>Play</strong> — сняли трансформацию с анимацией.</li>
</ol>

<code class="code">
  const first = el.getBoundingClientRect();

  el.classList.add('final-state');           // Last: меняем layout мгновенно
  const last = el.getBoundingClientRect();

  const dx = first.left - last.left;         // Invert
  const dy = first.top - last.top;

  el.animate([
    { transform: `translate(${dx}px, ${dy}px)` },
    { transform: 'translate(0, 0)' }         // Play
  ], { duration: 300, easing: 'ease-out' });
</code>

<p>Layout считается один раз, а не 60 раз в секунду. На этом построены <code>View Transitions API</code> и большинство layout-анимаций.</p>

<h4>Изоляция: contain и content-visibility</h4>

<p>Дорогой Layout можно не только избегать, но и локализовать:</p>

<code class="code">
  .widget {
    contain: layout paint;    /* изменения внутри не тронут страницу */
  }

  .long-list-item {
    content-visibility: auto; /* не рендерить, пока не появится в вьюпорте */
    contain-intrinsic-size: 0 120px;
  }
</code>

<p>
  <code>content-visibility: auto</code> — фактически нативная виртуализация: браузер пропускает Layout и Paint для элементов
  вне вьюпорта. Обязательно указывай <code>contain-intrinsic-size</code>, иначе получишь скачки скроллбара (CLS).
</p>

<h4>Диагностика в DevTools</h4>

<ul>
  <li><strong>Performance</strong> + CPU throttling 4–6x — локально всё «летает», реальную картину видно только с троттлингом.</li>
  <li><strong>Layers</strong> — реальные слои композитора и их вес в памяти.</li>
  <li><strong>Rendering → Paint flashing</strong> — подсветит перерисовываемые области; мигает пол-экрана = анимация упала в Paint.</li>
  <li><code>requestAnimationFrame</code> вместо <code>setInterval</code> — синхронизирует анимацию с кадром экрана.</li>
</ul>
