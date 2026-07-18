<h3>Семантична верстка: що це і навіщо</h3>

<p>
  <span class="accent">Семантична верстка</span> — вибір тегу за змістом, а не за виглядом:
  <code>&lt;nav&gt;</code> для навігації замість безликого <code>&lt;div&gt;</code>.
</p>

<p class="info">
  <strong>Головна думка:</strong> HTML описує зміст, а не вигляд. Цю структуру розуміють
  «машинні читачі»: скрінрідери, пошуковики, браузер.
</p>

<ul>
  <li>
    <strong>Доступність (a11y).</strong> Семантика безкоштовно дає скрінрідеру «карту» сторінки:
    орієнтири (landmarks) та заголовки.
  </li>
  <li><strong>SEO.</strong> Боти краще розуміють структуру і точніше ранжують.</li>
  <li>
    <strong>Читабельність і підтримка.</strong> Вбудована поведінка нативних елементів:
    фокус і клавіатуру для <code>&lt;button&gt;</code> не пишемо руками.
  </li>
</ul>

<h3>Основні семантичні теги HTML5</h3>

<ul>
  <li><code>&lt;header&gt;</code> — шапка сайту або розділу; може бути кілька.</li>
  <li><code>&lt;nav&gt;</code> — основна навігація.</li>
  <li><code>&lt;main&gt;</code> — унікальний контент; рівно один.</li>
  <li><code>&lt;section&gt;</code> — змістовий розділ; бажаний заголовок.</li>
  <li><code>&lt;article&gt;</code> — незалежна одиниця: стаття, коментар.</li>
  <li><code>&lt;aside&gt;</code> — побічний контент: сайдбар.</li>
  <li><code>&lt;footer&gt;</code> — завершення сайту або розділу.</li>
</ul>

<code class="code">
  &lt;header&gt;&lt;nav&gt;Меню&lt;/nav&gt;&lt;/header&gt;
  &lt;main&gt;
    &lt;article&gt;
      &lt;h1&gt;Стаття&lt;/h1&gt;
      &lt;section&gt;Розділ&lt;/section&gt;
    &lt;/article&gt;
    &lt;aside&gt;Схоже&lt;/aside&gt;
  &lt;/main&gt;
  &lt;footer&gt;Копірайт&lt;/footer&gt;
</code>

<h3>article vs section vs div</h3>

<ol>
  <li>Можна назвати і винести на інший сайт — <code>&lt;article&gt;</code>.</li>
  <li>Назвати можна, винести не можна — <code>&lt;section&gt;</code>.</li>
  <li>Назва не вигадується — просто контейнер, <code>&lt;div&gt;</code>.</li>
</ol>

<h3>Доступність і ARIA</h3>

<p>
  Семантичні теги мають вбудовані <span class="accent">ARIA-ролі</span>
  (<code>&lt;nav&gt;</code> → <code>navigation</code>), за ними скрінрідер будує навігацію.
  Немає нативного тегу — роль додають ARIA-атрибутами (<code>role</code>, <code>aria-label</code>).
</p>

<p class="info info--orange">
  «Кнопка» з <code>&lt;div onclick&gt;</code>: немає фокуса, Enter/Space і ролі для скрінрідера.
  Перше правило ARIA — не використовувати ARIA, якщо є нативний тег.
</p>

<p class="deep-dive">Поглиблений конспект</p>

<h3>Теги докладніше: значення, особливості, типові помилки</h3>

<h4>&lt;article&gt;</h4>
<p>
  Незалежна, відокремлювана змістова одиниця: коментар, твіт, стаття, віджет. Бажаний заголовок усередині.
  Типова помилка — плутати з <code>&lt;section&gt;</code> і <code>&lt;div&gt;</code>.
</p>

<h4>&lt;section&gt;</h4>
<p>
  Змістовий розділ документа, невідокремлюваний на відміну від <code>&lt;article&gt;</code>. Бажаний заголовок
  усередині. <code>&lt;section&gt;</code> без доступного імені (заголовка або <code>aria-label</code>)
  для скрінрідера майже не відрізняється від <code>&lt;div&gt;</code> — landmark-роль <code>region</code>
  він отримує лише з іменем.
</p>

<h4>&lt;aside&gt;</h4>
<p>
  Побічний, непрямий для сторінки контент; може траплятися кілька разів. Типова помилка — вважати його
  тегом «бічної панелі» і розмічати ним основний контент, пов'язаний з навколишніми елементами.
</p>

<h4>&lt;nav&gt;</h4>
<p>
  Розділ з основною навігацією; основна вона чи ні — на розсуд верстальника. Короткий список посилань
  у підвалі (головна, умови, копірайт) обгортати в <code>&lt;nav&gt;</code> не потрібно — для цього
  достатньо самого <code>&lt;footer&gt;</code>. Усередині може бути навігація в будь-якій формі,
  не обов'язково список.
</p>

<h4>&lt;header&gt; і &lt;footer&gt;</h4>
<p>
  Вступна і завершальна частини сайту <strong>або будь-якого змістового розділу</strong> — тому їх може бути
  кілька на сторінці (кожен <code>&lt;article&gt;</code> може мати свої). Типова помилка — використовувати
  лише як шапку і підвал сайту. <code>&lt;footer&gt;</code> не зобов'язаний бути в кінці розділу.
</p>

<h4>&lt;main&gt;</h4>
<p>
  Основний вміст, що не повторюється на інших сторінках; один на сторінці. Помилка — включати в нього
  наскрізні елементи: навігацію, копірайт.
</p>

<h3>Landmarks: карта сторінки для скрінрідера</h3>

<p>Відповідність тегів і landmark-ролей, за якими працює швидка навігація у скрінрідерах:</p>

<ul>
  <li><code>&lt;header&gt;</code> (верхнього рівня) → <code>banner</code></li>
  <li><code>&lt;nav&gt;</code> → <code>navigation</code></li>
  <li><code>&lt;main&gt;</code> → <code>main</code></li>
  <li><code>&lt;aside&gt;</code> → <code>complementary</code></li>
  <li><code>&lt;footer&gt;</code> (верхнього рівня) → <code>contentinfo</code></li>
  <li><code>&lt;section&gt;</code> з доступним іменем → <code>region</code></li>
  <li><code>&lt;form&gt;</code> з доступним іменем → <code>form</code>, пошук — <code>&lt;search&gt;</code> → <code>search</code></li>
</ul>

<p class="info info--blue">
  Якщо на сторінці кілька однакових landmarks (наприклад, два <code>&lt;nav&gt;</code>), дай кожному
  розрізнюване ім'я через <code>aria-label</code>: «Основне меню», «Хлібні крихти».
</p>

<h3>Семантика тексту і «старі» теги</h3>

<p>
  Семантика — не лише про каркас сторінки. <code>&lt;p&gt;</code>, <code>&lt;ul&gt;/&lt;ol&gt;</code>,
  <code>&lt;table&gt;</code>, <code>&lt;blockquote&gt;</code> — теж семантичні теги. А от
  <code>&lt;b&gt;</code> і <code>&lt;i&gt;</code> — презентаційні: вони описують вигляд, а не зміст.
  Змістові аналоги — <code>&lt;strong&gt;</code> (важливість) і <code>&lt;em&gt;</code> (акцент, інтонація):
  скрінрідери та пошуковики враховують саме їх. Для дрібних фразових шматків без власного змісту
  залишається <code>&lt;span&gt;</code>.
</p>

<p>
  Корисні, але часто забувані семантичні теги: <code>&lt;figure&gt;/&lt;figcaption&gt;</code>
  (ілюстрація з підписом), <code>&lt;time datetime="..."&gt;</code> (машиночитана дата),
  <code>&lt;details&gt;/&lt;summary&gt;</code> (нативний акордеон), <code>&lt;dialog&gt;</code>
  (модальне вікно з керуванням фокусом), <code>&lt;address&gt;</code> (контактна інформація).
</p>

<h3>Порядок семантичної розмітки сторінки</h3>

<ol>
  <li>Великі блоки сторінки: <code>&lt;header&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;footer&gt;</code>.</li>
  <li>Розділи всередині блоків: <code>&lt;nav&gt;</code>, <code>&lt;section&gt;</code>, <code>&lt;article&gt;</code>, <code>&lt;aside&gt;</code>.</li>
  <li>Заголовок документа і заголовки розділів: <code>&lt;h1&gt;–&lt;h6&gt;</code>.</li>
  <li>Дрібні елементи розділів: списки, таблиці, форми, параграфи, цитати.</li>
  <li>Фразові елементи: посилання, кнопки, зображення, час, виділення тексту.</li>
</ol>

<p class="info info--orange">
  Ієрархія заголовків має бути послідовною (без перескоку <code>h2</code> → <code>h5</code>).
  «Outline-алгоритм» HTML5, що обіцяв перераховувати рівні <code>&lt;h1&gt;</code> за вкладеністю секцій,
  так і не був реалізований жодним браузером і видалений зі специфікації — рівні заголовків потрібно
  проставляти явно.
</p>

<h3>Історична довідка</h3>

<p>
  До HTML5 (2008+) каркас сторінок збирали з таблиць і <code>&lt;div id="nav"&gt;</code>-подібних конструкцій.
  Аналіз мільйонів сторінок (зокрема дослідження Google) показав найпопулярніші значення
  <code>id</code> і <code>class</code> — <code>header</code>, <code>footer</code>, <code>nav</code>,
  <code>content</code>. Саме вони і стали новими тегами стандарту: специфікація закріпила те,
  що розробники і так розмічали вручну.
</p>
