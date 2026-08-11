<h3>Вступ</h3>
<p><span class="accent">Мутабельність</span> — можливість змінити об'єкт «на місці», у тій самій комірці пам'яті. <span class="accent">Іммутабельність</span> — протилежний підхід: дані після створення не змінюються, замість зміни створюється нова копія. У JavaScript примітиви (рядки, числа, boolean) іммутабельні, а об'єкти та масиви — мутабельні.</p>

<p class="info"><strong>Головна думка:</strong> змінна зберігає не сам об'єкт, а <strong>посилання</strong> на нього. Мутація видна всім, хто тримає це посилання, — звідси неочікувані побічні ефекти. Іммутабельність перетворює питання «чи змінилися дані?» на дешеве порівняння посилань: нове посилання = нові дані.</p>

<h3>Посилання vs значення</h3>
<code class="code">
  const a = [1, 2, 3];
  const b = a;        // скопіювалося посилання, а не масив
  b.push(4);
  console.log(a);     // [1, 2, 3, 4] — «постраждав» і a

  const c = [...a];   // нова копія
  c.push(5);
  console.log(a);     // [1, 2, 3, 4] — a не зачеплено
</code>

<h3>Методи масивів: мутуючі та ні</h3>
<ul>
  <li><strong>Мутують</strong> вихідний масив: <code>push</code>, <code>pop</code>, <code>shift</code>, <code>unshift</code>, <code>splice</code>, <code>sort</code>, <code>reverse</code>, <code>fill</code>.</li>
  <li><strong>Повертають новий</strong>: <code>map</code>, <code>filter</code>, <code>slice</code>, <code>concat</code>, <code>flat</code>, spread <code>[...arr]</code>.</li>
  <li><strong>ES2023</strong> додав іммутабельні пари до мутуючих: <code>toSorted</code>, <code>toReversed</code>, <code>toSpliced</code> і <code>with</code> (заміна елемента за індексом).</li>
</ul>

<p class="info info--orange">Класична пастка: <code>sort()</code> і <code>reverse()</code> не лише повертають результат, а й змінюють вихідний масив. Безпечно: <code>arr.toSorted()</code> або <code>[...arr].sort()</code>.</p>

<h3>Іммутабельне оновлення</h3>
<code class="code">
  const added = [...arr, newItem];              // додати
  const removed = arr.filter(i =&gt; i.id !== id); // видалити
  const updated = arr.map(i =&gt;                  // змінити
    i.id === id ? { ...i, done: true } : i
  );
</code>

<h3>Навіщо це потрібно</h3>
<ul>
  <li><strong>Передбачуваність:</strong> функція, що не мутує свої аргументи, не дає прихованих побічних ефектів.</li>
  <li><strong>Дешеве відстеження змін:</strong> React, Angular OnPush і Redux/NgRx порівнюють стани за посиланням за O(1) замість глибокого обходу. Якщо стан мутувати, посилання не змінюється — фреймворк не помітить зміну, і UI не оновиться.</li>
  <li><strong>Історія станів:</strong> undo/redo і time-travel debugging можливі, бо старі версії ніким не перезаписані.</li>
</ul>

<p class="info info--blue"><code>const</code> не робить об'єкт іммутабельним: він забороняє лише перезапис самого посилання, вміст змінювати можна. Реальну (але поверхневу) заморозку дає <code>Object.freeze()</code>.</p>

<p class="deep-dive">Поглиблений конспект</p>

<h3>Чому примітиви іммутабельні</h3>
<p>Усі рядкові методи (<code>toUpperCase</code>, <code>slice</code>, <code>replace</code>) повертають новий рядок — вихідний змінити неможливо в принципі. Запис <code>str[0] = 'A'</code> мовчки ігнорується, а в strict mode кидає <code>TypeError</code>. Це дає рушію свободу оптимізацій: рядки можна безпечно кешувати й перевикористовувати, адже ніхто їх не змінить.</p>

<h3>Поверхневе vs глибоке копіювання</h3>
<p>Spread, <code>slice</code> і <code>Object.assign</code> копіюють лише перший рівень: вкладені об'єкти залишаються спільними посиланнями між «копією» та оригіналом.</p>
<code class="code">
  const orig = { user: { name: 'Ann' } };
  const copy = { ...orig };
  copy.user.name = 'Bob';
  console.log(orig.user.name); // 'Bob' — вкладений об'єкт спільний
</code>
<p>Для глибокого клонування є нативний <code>structuredClone()</code>. Старий хак <code>JSON.parse(JSON.stringify(obj))</code> вважається legacy: він втрачає <code>undefined</code>, функції та <code>Symbol</code>, перетворює <code>Date</code> на рядок і падає на циклічних посиланнях.</p>

<h3>Object.freeze та його межі</h3>
<p><code>Object.freeze(obj)</code> забороняє додавати, видаляти та перезаписувати властивості, але заморозка <strong>поверхнева</strong> — вкладені об'єкти залишаються мутабельними, для повного захисту потрібна рекурсивна (deep freeze). Є й м'якші градації: <code>Object.preventExtensions</code> (не можна додавати) та <code>Object.seal</code> (не можна додавати й видаляти, але можна змінювати значення).</p>
<p class="info info--orange">Порушення заморозки у звичайному режимі ігнорується <strong>мовчки</strong>, і лише в strict mode кидає <code>TypeError</code> — це часте джерело «містичних» багів.</p>

<h3>Ціна іммутабельності та structural sharing</h3>
<p>Копіювання — це O(n) за часом і пам'яттю, плюс зайва робота для збирача сміття. Для частих оновлень великих структур придумані персистентні структури даних (Immutable.js): нова версія <strong>перевикористовує</strong> незмінені гілки старої (structural sharing), тому «копія» коштує O(log n), а не O(n).</p>
<p>Бібліотека Immer розв'язує ту саму проблему ергономікою: ви пишете звичний «мутуючий» код над чернеткою-<code>Proxy</code>, а на виході отримуєте новий іммутабельний об'єкт. Саме так працює <code>createReducer</code> у Redux Toolkit і NgRx.</p>

<h3>Зв'язок із change detection</h3>
<p>Angular з <code>OnPush</code> перемальовує компонент, коли в <code>@Input</code> змінилося посилання; React порівнює стан через <code>Object.is</code>, а <code>React.memo</code> і <code>useMemo</code> — пропси та залежності за посиланням. Мутація масиву в обох випадках невидима: посилання те саме — перемальовування немає. Тому іммутабельність у сучасних фреймворках не «стиль», а умова коректної роботи.</p>
