<h3>Почему после ES6 не было второй революции</h3>
<p>После ES6 комитет TC39 перешёл на <span class="accent">ежегодный релизный цикл</span>: раз в год выходит новая версия стандарта с тем, что успело дозреть. Поэтому язык растёт маленькими шагами — в ES2016 было всего две фичи.</p>

<p class="info"><strong>Главная мысль:</strong> ES6 закрывал дыры языка, всё после — шлифовка ежедневного кода. На собеседовании ждут не список по годам, а понимание, какую боль каждая фича убрала.</p>

<h3>Асинхронность довели до ума</h3>
<p><code>async/await</code> (ES2017) — код выглядит синхронным, но работает поверх промисов. Дальше добавили <code>Promise.finally</code> и <code>for await...of</code> (ES2018), <code>Promise.allSettled</code> (ES2020), <code>Promise.any</code> (ES2021) и <code>await</code> на верхнем уровне модуля (ES2022).</p>

<h3>Безопасный доступ к данным</h3>
<code class="code">
  const city = user?.address?.city ?? 'не указан';  // ?. и ?? (ES2020)
  settings.theme ??= 'dark';                        // логическое присваивание (ES2021)
</code>
<p>Оператор <code>?.</code> обрывает цепочку на <code>null</code> или <code>undefined</code> и возвращает <code>undefined</code> вместо ошибки. А <code>??</code> подставляет запасное значение только для <code>null</code> и <code>undefined</code> — в отличие от <code>||</code>, который съедает валидные <code>0</code> и пустую строку.</p>

<h3>Классы дозрели</h3>
<p>ES2022 добавила то, чего в ES6 у классов не было: поля прямо в теле класса, настоящую приватность через <code>#</code> и статические блоки инициализации.</p>
<code class="code">
  class Counter {
    #count = 0;              // приватное поле, снаружи не достать
    inc() { this.#count++; }
  }
</code>

<h3>Новые методы объектов и массивов</h3>
<ul>
  <li><code>Object.values</code> и <code>Object.entries</code> (ES2017), обратный им <code>Object.fromEntries</code> (ES2019).</li>
  <li>Spread и rest для объектов <code>{ ...obj }</code> (ES2018) — то, что часто ошибочно приписывают ES6.</li>
  <li><code>flat</code>, <code>flatMap</code>, <code>trimStart</code>, <code>trimEnd</code> (ES2019), <code>replaceAll</code> (ES2021).</li>
  <li><code>at(-1)</code> — доступ с конца (ES2022), <code>findLast</code> (ES2023).</li>
  <li><code>toSorted</code>, <code>toReversed</code>, <code>with</code> (ES2023) — возвращают копию вместо мутации массива.</li>
</ul>

<p class="info info--blue">Если год вылетел из головы, отвечай по проблемам, а не по датам: асинхронность (<code>async/await</code>, <code>allSettled</code>), безопасный доступ (<code>?.</code>, <code>??</code>), приватность в классах (<code>#</code>), иммутабельные методы (<code>toSorted</code>). Проверяют владение языком, а не календарь.</p>

<p class="info info--orange">Частая путаница: <code>??</code> нельзя писать рядом с <code>||</code> или <code>&amp;&amp;</code> без скобок — это SyntaxError. И <code>?.</code> не спасает от опечатки в имени свойства: <code>user?.adress?.city</code> молча вернёт <code>undefined</code>, а не ошибку.</p>

<p class="deep-dive">Углубленный конспект</p>

<h3>Как фича попадает в язык: процесс TC39</h3>
<p>Любое предложение проходит пять стадий: <strong>Stage 0</strong> — идея, <strong>Stage 1</strong> — принята к рассмотрению, <strong>Stage 2</strong> — черновик спецификации, <strong>Stage 3</strong> — кандидат, движки начинают реализацию, <strong>Stage 4</strong> — принято и войдёт в ближайший релиз. Спецификация замораживается в марте каждого года, релиз выходит в июне.</p>
<p>Практический вывод: браузеры и TypeScript обычно поддерживают фичу уже на Stage 3, задолго до официального года. Отсюда путаница с датами — разработчики запоминают год, когда начали пользоваться, а не год стандарта.</p>

<h3>Шпаргалка по годам</h3>
<ul>
  <li><strong>ES2016</strong>: оператор возведения в степень <code>**</code>, <code>Array.prototype.includes</code>.</li>
  <li><strong>ES2017</strong>: <code>async/await</code>, <code>Object.values</code>, <code>Object.entries</code>, <code>padStart</code>, <code>padEnd</code>, <code>Object.getOwnPropertyDescriptors</code>, <code>SharedArrayBuffer</code>, <code>Atomics</code>.</li>
  <li><strong>ES2018</strong>: rest и spread для объектов, <code>for await...of</code> и асинхронные итераторы, <code>Promise.finally</code>, именованные группы и lookbehind в регулярных выражениях.</li>
  <li><strong>ES2019</strong>: <code>flat</code>, <code>flatMap</code>, <code>Object.fromEntries</code>, <code>trimStart</code>, <code>trimEnd</code>, необязательный параметр в <code>catch</code>, стабильная сортировка <code>Array.prototype.sort</code>.</li>
  <li><strong>ES2020</strong>: <code>?.</code>, <code>??</code>, <code>BigInt</code>, <code>Promise.allSettled</code>, динамический <code>import()</code>, <code>globalThis</code>, <code>String.matchAll</code>.</li>
  <li><strong>ES2021</strong>: <code>replaceAll</code>, <code>Promise.any</code>, логические присваивания <code>??=</code>, <code>||=</code>, <code>&amp;&amp;=</code>, числовые разделители <code>1_000_000</code>, <code>WeakRef</code>.</li>
  <li><strong>ES2022</strong>: поля класса и приватные <code>#</code>-члены, статические блоки, top-level await, <code>at()</code>, <code>Object.hasOwn</code>, <code>error.cause</code>.</li>
  <li><strong>ES2023</strong>: <code>findLast</code>, <code>findLastIndex</code>, <code>toSorted</code>, <code>toReversed</code>, <code>toSpliced</code>, <code>with</code>, hashbang.</li>
  <li><strong>ES2024</strong>: <code>Object.groupBy</code>, <code>Map.groupBy</code>, <code>Promise.withResolvers</code>, <code>Array.fromAsync</code>, <code>String.isWellFormed</code>.</li>
  <li><strong>ES2025</strong>: методы множеств (<code>union</code>, <code>intersection</code>, <code>difference</code>), хелперы итераторов (<code>map</code>, <code>filter</code>, <code>take</code> для любого итератора), <code>RegExp.escape</code>, <code>Promise.try</code>, импорт JSON-модулей.</li>
</ul>

<h3>Опциональная цепочка: тонкости</h3>
<p>У <code>?.</code> три формы: <code>obj?.prop</code>, <code>obj?.[key]</code> для динамического ключа и <code>fn?.()</code> для вызова функции, которой может не быть. Работает <span class="accent">короткое замыкание</span>: если левая часть равна <code>null</code> или <code>undefined</code>, весь остаток цепочки просто не вычисляется — включая аргументы вызова.</p>
<p>Слева от присваивания <code>?.</code> писать нельзя: <code>obj?.a = 1</code> — синтаксическая ошибка. И само по себе это не замена проверок: если переменная вообще не объявлена, будет <code>ReferenceError</code>, оператор защищает только от «пустого» значения, а не от отсутствующей переменной.</p>

<h3>Приватные поля: почему это не соглашение</h3>
<p>Подчёркивание <code>_private</code> было договорённостью между людьми, а <code>#count</code> — механизм движка. Приватное поле не видно ни в <code>Object.keys</code>, ни в <code>JSON.stringify</code>, ни через <code>Proxy</code>, ни через <code>Reflect.ownKeys</code>. Обращение к нему извне класса — синтаксическая ошибка ещё на этапе парсинга, а не ошибка времени выполнения.</p>
<p>Отсюда идиома brand check: выражение <code>#count in obj</code> отвечает, создан ли объект этим классом. Раньше для такой проверки приходилось держать отдельный <code>WeakMap</code>.</p>

<h3>Top-level await и порядок загрузки модулей</h3>
<p><code>await</code> на верхнем уровне работает только в ES-модулях, потому что модуль умеет вести себя как асинхронная функция. Цена — блокировка: пока модуль ждёт, все импортирующие его модули тоже ждут. Поэтому долгий сетевой запрос на верхнем уровне легко превращается в задержку старта всего приложения.</p>

<h3>Иммутабельные методы массивов</h3>
<p>Пары <code>sort</code>/<code>toSorted</code>, <code>reverse</code>/<code>toReversed</code>, <code>splice</code>/<code>toSpliced</code> различаются одним: старые мутируют исходный массив и возвращают ссылку на него, новые возвращают новую копию. Это прямой ответ на боль фреймворков с иммутабельным состоянием, где <code>state.items.sort()</code> тихо ломал сравнение по ссылке и отслеживание изменений.</p>
<code class="code">
  const sorted = items.toSorted((a, b) =&gt; a.age - b.age); // items не тронут
  const patched = items.with(0, newItem);                  // копия с заменой по индексу
</code>

<h3>Что ещё стоит знать</h3>
<ul>
  <li><code>BigInt</code> — целые числа произвольной длины, литерал <code>10n</code>. Смешивать с обычными числами в арифметике нельзя, будет <code>TypeError</code>.</li>
  <li><code>globalThis</code> — единая ссылка на глобальный объект в браузере, Node.js и воркерах вместо <code>window</code>/<code>global</code>/<code>self</code>.</li>
  <li>Динамический <code>import()</code> возвращает промис и работает в любом месте кода — на нём держится ленивая загрузка чанков и роутов.</li>
  <li><code>Promise.withResolvers</code> отдаёт промис вместе с его <code>resolve</code> и <code>reject</code> — уходит паттерн с присваиванием функций во внешние переменные.</li>
  <li><code>Object.groupBy(items, fn)</code> возвращает объект без прототипа, где ключи — результат функции. Аналог <code>groupBy</code> из lodash, только встроенный.</li>
</ul>

<h3>Нужен ли ещё Babel</h3>
<p>Для современных браузеров транспиляция синтаксиса почти не нужна — все актуальные движки понимают стандарт свежих лет. Осталось две реальные задачи: поддержка старых окружений через <code>browserslist</code> и предложения на Stage 2–3, которых в стандарте ещё нет (например, декораторы). Отдельно живут полифилы: новые методы вроде <code>toSorted</code> или <code>Object.groupBy</code> добавляются в рантайм через core-js, тогда как новый синтаксис полифилом не добавляется в принципе.</p>
