<h3>Вступ</h3>

<p>
  <span class="accent">Критичний шлях рендерингу (Critical Rendering Path, CRP)</span> — це конвеєр, яким браузер
  перетворює HTML, CSS і JavaScript на пікселі на екрані. Анімація — це той самий конвеєр, пройдений заново на кожному кадрі.
</p>

<p class="info">
  <strong>Головна думка:</strong> чим менше етапів конвеєра зачеплено на кожному кадрі, тим плавніша анімація. Тому
  <strong>анімуй лише <code>transform</code> і <code>opacity</code></strong> — єдині властивості, які пропускають
  дорогі етапи Layout і Paint та обходяться майже безкоштовним Composite.
</p>

<hr />

<h3>Три етапи конвеєра і правило каскаду</h3>

<p>Під час анімації нас цікавлять останні три етапи CRP, вони йдуть строго по порядку:</p>

<ul>
  <li>
    <strong>Layout (Reflow)</strong> — розрахунок геометрії: де елемент і якого він розміру. <span class="accent">Найдорожчий</span>:
    зсув одного елемента змушує перерахувати сусідів і батьків.
  </li>
  <li>
    <strong>Paint</strong> — заливка пікселів: кольори, тіні, межі, текст. Дорого, але дешевше за Layout.
  </li>
  <li>
    <strong>Composite</strong> — склеювання вже готових шарів у картинку силами GPU. <span class="accent">Майже безкоштовно.</span>
  </li>
</ul>

<p class="info info--blue">
  <strong>Правило каскаду:</strong> етапи спрацьовують «згори вниз»: запустив Layout — за ним обов'язково йдуть Paint і
  Composite; запустив Paint — за ним Composite. Навпаки не можна. Уся оптимізація анімацій — про те, щоб залишитися на
  найнижчому етапі.
</p>

<code class="code">
  /* Layout + Paint + Composite — НЕ анімувати */
  width, height, top, left, right, bottom
  margin, padding, border-width, font-size

  /* Paint + Composite — дорого */
  color, background, border-color, box-shadow, border-radius

  /* Тільки Composite — анімуємо ЦЕ */
  transform   /* translate, scale, rotate */
  opacity
</code>

<hr />

<h3>Бюджет кадра: 60 FPS і 16.7 мс</h3>

<p>
  Екран оновлюється 60 разів на секунду, отже на кадр у браузера є <strong>1000 / 60 ≈ 16.7 мс</strong> — і в них мають
  вкластися JavaScript, стилі, Layout, Paint і Composite. Не вклався — кадр пропущено (<strong>dropped frame</strong>), і
  користувач бачить ривок (jank). Анімація <code>transform</code> дешева саме тому: вона майже не витрачає цей бюджет.
</p>

<hr />

<h3>Як анімувати правильно: практика</h3>

<code class="code">
  /* Погано: кожен кадр Layout + Paint */
  .box { transition: left 300ms; }
  .box:hover { left: 300px; }

  /* Добре: кожен кадр лише Composite */
  .box { transition: transform 300ms; }
  .box:hover { transform: translateX(300px); }
</code>

<p>Візуально однаково, але ціна кадра різна. Тримай у голові таблицю замін:</p>

<ul>
  <li><code>left / top</code> → <code>transform: translate()</code></li>
  <li><code>width / height</code> → <code>transform: scale()</code></li>
  <li><code>display / visibility</code> → <code>opacity</code> (+ <code>pointer-events: none</code>)</li>
</ul>

<p>
  Для анімації на етапі Composite браузер виносить елемент в окремий шар (текстуру на GPU). Підказка
  <code>will-change: transform</code> попереджає його про це заздалегідь.
</p>

<p class="info info--orange">
  Але <code>will-change</code> — це не «зробити швидко», а обіцянка браузеру: кожен шар їсть пам'ять GPU. Навісиш на все
  підряд «про всяк випадок» — отримаєш падіння продуктивності замість зростання. Став точково, лише на те, що ось-ось
  буде анімуватися.
</p>

<hr />

<p class="deep-dive">Поглиблений конспект</p>

<h4>Повний конвеєр CRP</h4>

<p>Layout, Paint і Composite — це лише хвіст шляху. Цілком він виглядає так:</p>

<ol>
  <li><strong>DOM</strong> — парсинг HTML у дерево вузлів.</li>
  <li><strong>CSSOM</strong> — парсинг CSS у дерево стилів.</li>
  <li><strong>Render Tree</strong> — DOM + CSSOM, лише видимі елементи (без <code>display: none</code>).</li>
  <li><strong>Layout → Paint → Composite</strong> — ті самі три етапи, що повторюються на кожному кадрі.</li>
</ol>

<p>Перші три кроки — разова робота під час завантаження; анімація крутить лише останні три.</p>

<h4>Бюджет кадра: обрив замість деградації</h4>

<p>
  Кадри синхронізовані з оновленням екрана (vsync), тому між 60 FPS і 30 FPS немає плавного переходу — є обрив:
  або кадр вклався в 16.7 мс і потрапив у поточне оновлення екрана, або чекає наступного. Анімація, що трохи не встигає,
  візуально просідає одразу вдвічі.
</p>

<h4>Головний потік проти потоку композитора</h4>

<p>
  Справжня причина, з якої <code>transform</code> швидкий, глибша, ніж «менше етапів». У Chrome (Blink) рендеринг
  розділений на потоки:
</p>

<ul>
  <li>
    <span class="accent">Main thread</span> — тут живуть JavaScript, Style, Layout, Paint. Його легко заблокувати важким JS.
  </li>
  <li>
    <span class="accent">Compositor thread</span> — окремий потік, який склеює шари та спілкується з GPU.
  </li>
</ul>

<p>
  Анімація <code>transform</code> і <code>opacity</code> може цілком піти <strong>потоку композитора</strong>. Тому навіть
  якщо головний потік намертво заблокований важким JS-циклом, така анімація <strong>продовжить іти плавно</strong> — вона
  фізично виконується в іншому потоці. Саме тому CSS-анімації переживають лаги JS, а анімація через <code>left</code> — ні.
</p>

<p class="info info--orange">
  Це ж пояснює «відклеювання» скролу: скрол обробляється композитором, а обробники <code>scroll</code> — головним
  потоком. Звідси <code>addEventListener('scroll', fn, { passive: true })</code>: обіцяєш, що не викличеш
  <code>preventDefault()</code>, і композитор скролить, не чекаючи головного потоку.
</p>

<h4>Layout Thrashing (примусовий синхронний Layout)</h4>

<p>
  Браузер накопичує зміни DOM і застосовує їх пачкою наприкінці кадра. Але якщо <strong>прочитати</strong> геометрію одразу після
  <strong>запису</strong> — він змушений негайно перерахувати Layout, щоб віддати чесне значення. У циклі це
  перетворюється на Layout на кожній ітерації.
</p>

<code class="code">
  // ПОГАНО: читання після запису в циклі = Layout на кожній ітерації
  boxes.forEach((box) => {
    box.style.width = box.offsetWidth + 10 + 'px';
  });

  // ДОБРЕ: спочатку всі читання, потім усі записи
  const widths = boxes.map((box) => box.offsetWidth); // batch read
  boxes.forEach((box, i) => {
    box.style.width = widths[i] + 10 + 'px';         // batch write
  });
</code>

<p>Властивості-тригери примусового Layout під час читання: <code>offsetWidth</code>, <code>offsetTop</code>,
  <code>clientHeight</code>, <code>scrollTop</code>, <code>getComputedStyle()</code>, <code>getBoundingClientRect()</code>.</p>

<h4>Як народжується шар і пастка implicit compositing</h4>

<p>
  Шар створює браузер, а не розробник. Типові причини промоушену: 3D-трансформації,
  <code>will-change: transform / opacity</code>, <code>&lt;video&gt;</code> і <code>&lt;canvas&gt;</code>,
  <code>position: fixed</code>, композитні анімації.
</p>

<p>
  Далі вступає <strong>implicit compositing</strong>: якщо елемент з вищим <code>z-index</code> перекриває
  промотований шар, браузер <strong>зобов'язаний</strong> створити шар і йому — інакше зламається порядок накладання. Один
  <code>will-change</code> може лавиноподібно породити десяток шарів (у DevTools → Layers їхня причина — «overlap»). Це і є
  <strong>layer explosion</strong>, через який <code>will-change</code> не можна вішати на все підряд.
</p>

<h4>Растеризація і tiles</h4>

<p>
  Paint не малює пікселі напряму — він записує <strong>список команд малювання</strong> (display list). Уже потім
  растеризація перетворює їх на біти, розбиваючи шар на <strong>плитки (tiles)</strong> (зазвичай 256×256 або 512×512), щоб
  растеризувати лише видиму частину та перевикористовувати плитки під час скролу. Тому при швидкому скролі іноді мерехтять білі
  області — композитор показав кадр раніше, ніж растеризатор підготував плитки.
</p>

<h4>Техніка FLIP — коли все-таки треба анімувати геометрію</h4>

<p>
  FLIP вирішує протиріччя: потрібно анімувати зміну позиції/розміру (Layout-властивості), але анімувати можна лише
  <code>transform</code>. Абревіатура — <strong>First, Last, Invert, Play</strong>:
</p>

<ol>
  <li><strong>First</strong> — заміряли позицію до зміни.</li>
  <li><strong>Last</strong> — миттєво застосували кінцевий стан і заміряли знову.</li>
  <li><strong>Invert</strong> — через <code>transform</code> повернули елемент візуально в старт.</li>
  <li><strong>Play</strong> — зняли трансформацію з анімацією.</li>
</ol>

<code class="code">
  const first = el.getBoundingClientRect();

  el.classList.add('final-state');           // Last: змінюємо layout миттєво
  const last = el.getBoundingClientRect();

  const dx = first.left - last.left;         // Invert
  const dy = first.top - last.top;

  el.animate([
    { transform: `translate(${dx}px, ${dy}px)` },
    { transform: 'translate(0, 0)' }         // Play
  ], { duration: 300, easing: 'ease-out' });
</code>

<p>Layout рахується один раз, а не 60 разів на секунду. На цьому побудовані <code>View Transitions API</code> та більшість layout-анімацій.</p>

<h4>Ізоляція: contain і content-visibility</h4>

<p>Дорогий Layout можна не лише уникати, але й локалізувати:</p>

<code class="code">
  .widget {
    contain: layout paint;    /* зміни всередині не торкнуться сторінки */
  }

  .long-list-item {
    content-visibility: auto; /* не рендерити, поки не з'явиться у в'юпорті */
    contain-intrinsic-size: 0 120px;
  }
</code>

<p>
  <code>content-visibility: auto</code> — фактично нативна віртуалізація: браузер пропускає Layout і Paint для елементів
  поза в'юпортом. Обов'язково вказуй <code>contain-intrinsic-size</code>, інакше отримаєш стрибки скролбара (CLS).
</p>

<h4>Діагностика в DevTools</h4>

<ul>
  <li><strong>Performance</strong> + CPU throttling 4–6x — локально все «літає», реальну картину видно лише з тротлінгом.</li>
  <li><strong>Layers</strong> — реальні шари композитора та їхня вага в пам'яті.</li>
  <li><strong>Rendering → Paint flashing</strong> — підсвітить області, що перемальовуються; миготить пів екрана = анімація впала в Paint.</li>
  <li><code>requestAnimationFrame</code> замість <code>setInterval</code> — синхронізує анімацію з кадром екрана.</li>
</ul>
