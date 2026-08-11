<h3>Введение</h3>
<p><span class="accent">Мутабельность</span> — возможность изменить объект «на месте», в той же ячейке памяти. <span class="accent">Иммутабельность</span> — противоположный подход: данные после создания не меняются, вместо изменения создаётся новая копия. В JavaScript примитивы (строки, числа, boolean) иммутабельны, а объекты и массивы — мутабельны.</p>

<p class="info"><strong>Главная мысль:</strong> переменная хранит не сам объект, а <strong>ссылку</strong> на него. Мутация видна всем, кто держит эту ссылку, — отсюда неожиданные побочные эффекты. Иммутабельность превращает вопрос «изменились ли данные?» в дешёвое сравнение ссылок: новая ссылка = новые данные.</p>

<h3>Ссылка vs значение</h3>
<code class="code">
  const a = [1, 2, 3];
  const b = a;        // скопировалась ссылка, а не массив
  b.push(4);
  console.log(a);     // [1, 2, 3, 4] — «пострадал» и a

  const c = [...a];   // новая копия
  c.push(5);
  console.log(a);     // [1, 2, 3, 4] — a не тронут
</code>

<h3>Методы массивов: мутирующие и нет</h3>
<ul>
  <li><strong>Мутируют</strong> исходный массив: <code>push</code>, <code>pop</code>, <code>shift</code>, <code>unshift</code>, <code>splice</code>, <code>sort</code>, <code>reverse</code>, <code>fill</code>.</li>
  <li><strong>Возвращают новый</strong>: <code>map</code>, <code>filter</code>, <code>slice</code>, <code>concat</code>, <code>flat</code>, spread <code>[...arr]</code>.</li>
  <li><strong>ES2023</strong> добавил иммутабельные пары к мутирующим: <code>toSorted</code>, <code>toReversed</code>, <code>toSpliced</code> и <code>with</code> (замена элемента по индексу).</li>
</ul>

<p class="info info--orange">Классическая ловушка: <code>sort()</code> и <code>reverse()</code> не только возвращают результат, но и меняют исходный массив. Безопасно: <code>arr.toSorted()</code> или <code>[...arr].sort()</code>.</p>

<h3>Иммутабельное обновление</h3>
<code class="code">
  const added = [...arr, newItem];              // добавить
  const removed = arr.filter(i =&gt; i.id !== id); // удалить
  const updated = arr.map(i =&gt;                  // изменить
    i.id === id ? { ...i, done: true } : i
  );
</code>

<h3>Зачем это нужно</h3>
<ul>
  <li><strong>Предсказуемость:</strong> функция, не мутирующая свои аргументы, не даёт скрытых побочных эффектов.</li>
  <li><strong>Дешёвое отслеживание изменений:</strong> React, Angular OnPush и Redux/NgRx сравнивают состояния по ссылке за O(1) вместо глубокого обхода. Если состояние мутировать, ссылка не меняется — фреймворк не заметит изменение, и UI не обновится.</li>
  <li><strong>История состояний:</strong> undo/redo и time-travel debugging возможны, потому что старые версии никем не перезаписаны.</li>
</ul>

<p class="info info--blue"><code>const</code> не делает объект иммутабельным: он запрещает лишь перезапись самой ссылки, содержимое менять можно. Реальную (но поверхностную) заморозку даёт <code>Object.freeze()</code>.</p>

<p class="deep-dive">Углубленный конспект</p>

<h3>Почему примитивы иммутабельны</h3>
<p>Все строковые методы (<code>toUpperCase</code>, <code>slice</code>, <code>replace</code>) возвращают новую строку — исходную изменить нельзя в принципе. Запись <code>str[0] = 'A'</code> молча игнорируется, а в strict mode бросает <code>TypeError</code>. Это даёт движку свободу оптимизаций: строки можно безопасно кешировать и переиспользовать, ведь никто их не изменит.</p>

<h3>Поверхностное vs глубокое копирование</h3>
<p>Spread, <code>slice</code> и <code>Object.assign</code> копируют только первый уровень: вложенные объекты остаются общими ссылками между «копией» и оригиналом.</p>
<code class="code">
  const orig = { user: { name: 'Ann' } };
  const copy = { ...orig };
  copy.user.name = 'Bob';
  console.log(orig.user.name); // 'Bob' — вложенный объект общий
</code>
<p>Для глубокого клонирования есть нативный <code>structuredClone()</code>. Старый хак <code>JSON.parse(JSON.stringify(obj))</code> считается legacy: он теряет <code>undefined</code>, функции и <code>Symbol</code>, превращает <code>Date</code> в строку и падает на циклических ссылках.</p>

<h3>Object.freeze и его пределы</h3>
<p><code>Object.freeze(obj)</code> запрещает добавлять, удалять и перезаписывать свойства, но заморозка <strong>поверхностная</strong> — вложенные объекты остаются мутабельными, для полной защиты нужна рекурсивная (deep freeze). Есть и более мягкие градации: <code>Object.preventExtensions</code> (нельзя добавлять) и <code>Object.seal</code> (нельзя добавлять и удалять, но можно менять значения).</p>
<p class="info info--orange">Нарушение заморозки в обычном режиме игнорируется <strong>молча</strong>, и только в strict mode бросает <code>TypeError</code> — это частый источник «мистических» багов.</p>

<h3>Цена иммутабельности и structural sharing</h3>
<p>Копирование — это O(n) по времени и памяти, плюс лишняя работа для сборщика мусора. Для частых обновлений больших структур придуманы персистентные структуры данных (Immutable.js): новая версия <strong>переиспользует</strong> неизменённые ветки старой (structural sharing), поэтому «копия» стоит O(log n), а не O(n).</p>
<p>Библиотека Immer решает ту же проблему эргономикой: вы пишете привычный «мутирующий» код над черновиком-<code>Proxy</code>, а на выходе получаете новый иммутабельный объект. Именно так работает <code>createReducer</code> в Redux Toolkit и NgRx.</p>

<h3>Связь с change detection</h3>
<p>Angular с <code>OnPush</code> перерисовывает компонент, когда у <code>@Input</code> сменилась ссылка; React сравнивает состояние через <code>Object.is</code>, а <code>React.memo</code> и <code>useMemo</code> — пропсы и зависимости по ссылке. Мутация массива в обоих случаях невидима: ссылка та же — перерисовки нет. Поэтому иммутабельность в современных фреймворках не «стиль», а условие корректной работы.</p>
