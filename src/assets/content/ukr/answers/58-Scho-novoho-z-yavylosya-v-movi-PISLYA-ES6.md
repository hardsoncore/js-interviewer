<h3>Чому після ES6 не було другої революції</h3>
<p>Після ES6 комітет TC39 перейшов на <span class="accent">щорічний реліз-цикл</span>: раз на рік виходить нова версія стандарту з тим, що встигло дозріти. Тому мова росте маленькими кроками — в ES2016 було лише дві фічі.</p>

<p class="info"><strong>Головна думка:</strong> ES6 закривав дірки мови, усе після — шліфування щоденного коду. На співбесіді чекають не список за роками, а розуміння, який біль прибрала кожна фіча.</p>

<h3>Асинхронність довели до ладу</h3>
<p><code>async/await</code> (ES2017) — код виглядає синхронним, але працює поверх промісів. Далі додали <code>Promise.finally</code> і <code>for await...of</code> (ES2018), <code>Promise.allSettled</code> (ES2020), <code>Promise.any</code> (ES2021) та <code>await</code> на верхньому рівні модуля (ES2022).</p>

<h3>Безпечний доступ до даних</h3>
<code class="code">
  const city = user?.address?.city ?? 'не вказано';  // ?. і ?? (ES2020)
  settings.theme ??= 'dark';                         // логічне присвоєння (ES2021)
</code>
<p>Оператор <code>?.</code> обриває ланцюжок на <code>null</code> або <code>undefined</code> і повертає <code>undefined</code> замість помилки. А <code>??</code> підставляє запасне значення лише для <code>null</code> та <code>undefined</code> — на відміну від <code>||</code>, який з'їдає валідні <code>0</code> і порожній рядок.</p>

<h3>Класи дозріли</h3>
<p>ES2022 додала те, чого в ES6 у класів не було: поля прямо в тілі класу, справжню приватність через <code>#</code> та статичні блоки ініціалізації.</p>
<code class="code">
  class Counter {
    #count = 0;              // приватне поле, ззовні не дістати
    inc() { this.#count++; }
  }
</code>

<h3>Нові методи об'єктів і масивів</h3>
<ul>
  <li><code>Object.values</code> та <code>Object.entries</code> (ES2017), зворотний до них <code>Object.fromEntries</code> (ES2019).</li>
  <li>Spread і rest для об'єктів <code>{ ...obj }</code> (ES2018) — те, що часто помилково приписують ES6.</li>
  <li><code>flat</code>, <code>flatMap</code>, <code>trimStart</code>, <code>trimEnd</code> (ES2019), <code>replaceAll</code> (ES2021).</li>
  <li><code>at(-1)</code> — доступ з кінця (ES2022), <code>findLast</code> (ES2023).</li>
  <li><code>toSorted</code>, <code>toReversed</code>, <code>with</code> (ES2023) — повертають копію замість мутації масиву.</li>
</ul>

<p class="info info--blue">Якщо рік вилетів з голови, відповідай за проблемами, а не за датами: асинхронність (<code>async/await</code>, <code>allSettled</code>), безпечний доступ (<code>?.</code>, <code>??</code>), приватність у класах (<code>#</code>), імутабельні методи (<code>toSorted</code>). Перевіряють володіння мовою, а не календар.</p>

<p class="info info--orange">Часта плутанина: <code>??</code> не можна писати поруч з <code>||</code> або <code>&amp;&amp;</code> без дужок — це SyntaxError. І <code>?.</code> не рятує від одруківки в імені властивості: <code>user?.adress?.city</code> мовчки поверне <code>undefined</code>, а не помилку.</p>

<p class="deep-dive">Поглиблений конспект</p>

<h3>Як фіча потрапляє в мову: процес TC39</h3>
<p>Будь-яка пропозиція проходить п'ять стадій: <strong>Stage 0</strong> — ідея, <strong>Stage 1</strong> — прийнята до розгляду, <strong>Stage 2</strong> — чернетка специфікації, <strong>Stage 3</strong> — кандидат, рушії починають реалізацію, <strong>Stage 4</strong> — прийнято і ввійде в найближчий реліз. Специфікація заморожується в березні кожного року, реліз виходить у червні.</p>
<p>Практичний висновок: браузери й TypeScript зазвичай підтримують фічу вже на Stage 3, задовго до офіційного року. Звідси плутанина з датами — розробники запам'ятовують рік, коли почали користуватися, а не рік стандарту.</p>

<h3>Шпаргалка за роками</h3>
<ul>
  <li><strong>ES2016</strong>: оператор піднесення до степеня <code>**</code>, <code>Array.prototype.includes</code>.</li>
  <li><strong>ES2017</strong>: <code>async/await</code>, <code>Object.values</code>, <code>Object.entries</code>, <code>padStart</code>, <code>padEnd</code>, <code>Object.getOwnPropertyDescriptors</code>, <code>SharedArrayBuffer</code>, <code>Atomics</code>.</li>
  <li><strong>ES2018</strong>: rest і spread для об'єктів, <code>for await...of</code> та асинхронні ітератори, <code>Promise.finally</code>, іменовані групи і lookbehind у регулярних виразах.</li>
  <li><strong>ES2019</strong>: <code>flat</code>, <code>flatMap</code>, <code>Object.fromEntries</code>, <code>trimStart</code>, <code>trimEnd</code>, необов'язковий параметр у <code>catch</code>, стабільне сортування <code>Array.prototype.sort</code>.</li>
  <li><strong>ES2020</strong>: <code>?.</code>, <code>??</code>, <code>BigInt</code>, <code>Promise.allSettled</code>, динамічний <code>import()</code>, <code>globalThis</code>, <code>String.matchAll</code>.</li>
  <li><strong>ES2021</strong>: <code>replaceAll</code>, <code>Promise.any</code>, логічні присвоєння <code>??=</code>, <code>||=</code>, <code>&amp;&amp;=</code>, числові роздільники <code>1_000_000</code>, <code>WeakRef</code>.</li>
  <li><strong>ES2022</strong>: поля класу і приватні <code>#</code>-члени, статичні блоки, top-level await, <code>at()</code>, <code>Object.hasOwn</code>, <code>error.cause</code>.</li>
  <li><strong>ES2023</strong>: <code>findLast</code>, <code>findLastIndex</code>, <code>toSorted</code>, <code>toReversed</code>, <code>toSpliced</code>, <code>with</code>, hashbang.</li>
  <li><strong>ES2024</strong>: <code>Object.groupBy</code>, <code>Map.groupBy</code>, <code>Promise.withResolvers</code>, <code>Array.fromAsync</code>, <code>String.isWellFormed</code>.</li>
  <li><strong>ES2025</strong>: методи множин (<code>union</code>, <code>intersection</code>, <code>difference</code>), хелпери ітераторів (<code>map</code>, <code>filter</code>, <code>take</code> для будь-якого ітератора), <code>RegExp.escape</code>, <code>Promise.try</code>, імпорт JSON-модулів.</li>
</ul>

<h3>Опціональний ланцюжок: тонкощі</h3>
<p>У <code>?.</code> три форми: <code>obj?.prop</code>, <code>obj?.[key]</code> для динамічного ключа і <code>fn?.()</code> для виклику функції, якої може не бути. Працює <span class="accent">коротке замикання</span>: якщо ліва частина дорівнює <code>null</code> або <code>undefined</code>, увесь залишок ланцюжка просто не обчислюється — включно з аргументами виклику.</p>
<p>Ліворуч від присвоєння <code>?.</code> писати не можна: <code>obj?.a = 1</code> — синтаксична помилка. І само по собі це не заміна перевірок: якщо змінна взагалі не оголошена, буде <code>ReferenceError</code>, оператор захищає лише від «порожнього» значення, а не від відсутньої змінної.</p>

<h3>Приватні поля: чому це не домовленість</h3>
<p>Підкреслення <code>_private</code> було домовленістю між людьми, а <code>#count</code> — механізм рушія. Приватне поле не видно ні в <code>Object.keys</code>, ні в <code>JSON.stringify</code>, ні через <code>Proxy</code>, ні через <code>Reflect.ownKeys</code>. Звернення до нього ззовні класу — синтаксична помилка ще на етапі парсингу, а не помилка часу виконання.</p>
<p>Звідси ідіома brand check: вираз <code>#count in obj</code> відповідає, чи створений об'єкт цим класом. Раніше для такої перевірки доводилося тримати окремий <code>WeakMap</code>.</p>

<h3>Top-level await і порядок завантаження модулів</h3>
<p><code>await</code> на верхньому рівні працює лише в ES-модулях, бо модуль вміє поводитися як асинхронна функція. Ціна — блокування: поки модуль чекає, усі модулі, що його імпортують, теж чекають. Тому довгий мережевий запит на верхньому рівні легко перетворюється на затримку старту всього застосунку.</p>

<h3>Імутабельні методи масивів</h3>
<p>Пари <code>sort</code>/<code>toSorted</code>, <code>reverse</code>/<code>toReversed</code>, <code>splice</code>/<code>toSpliced</code> різняться одним: старі мутують вихідний масив і повертають посилання на нього, нові повертають нову копію. Це пряма відповідь на біль фреймворків з імутабельним станом, де <code>state.items.sort()</code> тихо ламав порівняння за посиланням і відстеження змін.</p>
<code class="code">
  const sorted = items.toSorted((a, b) =&gt; a.age - b.age); // items не зачеплено
  const patched = items.with(0, newItem);                  // копія із заміною за індексом
</code>

<h3>Що ще варто знати</h3>
<ul>
  <li><code>BigInt</code> — цілі числа довільної довжини, літерал <code>10n</code>. Змішувати зі звичайними числами в арифметиці не можна, буде <code>TypeError</code>.</li>
  <li><code>globalThis</code> — єдине посилання на глобальний об'єкт у браузері, Node.js та воркерах замість <code>window</code>/<code>global</code>/<code>self</code>.</li>
  <li>Динамічний <code>import()</code> повертає проміс і працює в будь-якому місці коду — на ньому тримається ліниве завантаження чанків і роутів.</li>
  <li><code>Promise.withResolvers</code> віддає проміс разом із його <code>resolve</code> і <code>reject</code> — зникає патерн з присвоєнням функцій у зовнішні змінні.</li>
  <li><code>Object.groupBy(items, fn)</code> повертає об'єкт без прототипу, де ключі — результат функції. Аналог <code>groupBy</code> з lodash, тільки вбудований.</li>
</ul>

<h3>Чи потрібен ще Babel</h3>
<p>Для сучасних браузерів транспіляція синтаксису майже не потрібна — усі актуальні рушії розуміють стандарт свіжих років. Лишилося дві реальні задачі: підтримка старих оточень через <code>browserslist</code> і пропозиції на Stage 2–3, яких у стандарті ще немає (наприклад, декоратори). Окремо живуть поліфіли: нові методи на кшталт <code>toSorted</code> чи <code>Object.groupBy</code> додаються в рантайм через core-js, тоді як новий синтаксис поліфілом не додається в принципі.</p>
