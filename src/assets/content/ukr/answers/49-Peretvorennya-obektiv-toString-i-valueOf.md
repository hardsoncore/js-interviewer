<h3>Вступ</h3>
<p>Об'єкт не бере участі в арифметиці чи конкатенації «як є»: перед операцією движок запускає внутрішній алгоритм <span class="accent">ToPrimitive</span>, що зводить об'єкт до примітива. Керує ним <strong>hint</strong> — підказка про те, значення якого типу очікує операція.</p>

<p class="info"><strong>Головна думка:</strong> hint не обирає результат — він обирає лише <strong>порядок</strong> виклику <code>valueOf</code> і <code>toString</code>. Движок бере перший повернутий примітив, а якщо метод повернув об'єкт — пробує другий.</p>

<h3>Три хінти і порядок виклику</h3>
<ul>
  <li><code>"string"</code> — <code>String(obj)</code> і шаблонний рядок: спершу <code>toString()</code>, потім <code>valueOf()</code>.</li>
  <li><code>"number"</code> — математика (<code>obj * 2</code>, <code>obj &lt; other</code>) і <code>Number(obj)</code>: спершу <code>valueOf()</code>, потім <code>toString()</code>.</li>
  <li><code>"default"</code> — бінарний <code>+</code> і <code>==</code>: операція не знає, чого чекає, і поводиться як <code>"number"</code> (окрім <code>Date</code>).</li>
</ul>

<h3>Поведінка за замовчуванням</h3>
<p>У звичайного об'єкта <code>valueOf()</code> повертає <strong>сам об'єкт</strong> — це не примітив, тому результат відкидається і движок відкочується до <code>toString()</code> з його <code>"[object Object]"</code>. Звідси <code>obj1 + obj2</code> дає <code>"[object Object][object Object]"</code>, а <code>obj * 2</code> — <code>NaN</code>. У масивів же <code>toString()</code> — це <code>join(',')</code>, тому <code>[1, 2] + ''</code> дає <code>"1,2"</code>.</p>

<h3>Кастомізація</h3>
<code class="code">
  const money = {
    amount: 100,
    valueOf() { return this.amount; },        // хінти "number" і "default"
    toString() { return `$${this.amount}`; }  // хінт "string"
  };

  money * 2;          // 200
  money + 5;          // 105 — "default" іде числовим шляхом
  `Ціна: ${money}`;   // "Ціна: $100"
</code>
<p>З ES6 є пріоритетний спосіб — метод <code>[Symbol.toPrimitive](hint)</code>: якщо він оголошений, движок викличе тільки його, передавши хінт явно.</p>

<p class="info info--orange">Пастка: перевизначивши один <code>toString()</code>, ви покриваєте <strong>обидва</strong> контексти — у числовому <code>valueOf()</code> поверне об'єкт, і движок усе одно прийде до нього. Зворотне хибне: з одним <code>valueOf()</code> рядковий контекст дасть <code>"[object Object]"</code> — дефолтний <code>toString()</code> відпрацює першим і поверне валідний примітив.</p>

<p class="deep-dive">Поглиблений конспект</p>

<h3>Алгоритм ToPrimitive за специфікацією</h3>
<ol>
  <li>Якщо в об'єкта є <code>[Symbol.toPrimitive]</code> — викликати його з хінтом. Повернув об'єкт → <code>TypeError</code>, далі нічого не пробується.</li>
  <li>Інакше запускається <code>OrdinaryToPrimitive</code> зі списком методів: <code>["valueOf", "toString"]</code> для хінтів <code>"number"</code>/<code>"default"</code> і <code>["toString", "valueOf"]</code> для <code>"string"</code>.</li>
  <li>Кожен метод зі списку: якщо він викликаний і повернув <strong>не об'єкт</strong> — це результат. Інакше переходимо до наступного.</li>
  <li>Обидва не дали примітив → <code>TypeError: Cannot convert object to primitive value</code>.</li>
</ol>

<code class="code">
  const bare = Object.create(null); // немає прототипу → немає toString і valueOf
  `${bare}`;                        // TypeError: Cannot convert object to primitive value

  const weird = { [Symbol.toPrimitive]() { return {}; } };
  weird + 1;                        // TypeError — повернули об'єкт із toPrimitive
</code>

<h3>Date — єдиний виняток для хінта "default"</h3>
<p>Історично <code>Date</code> трактує <code>"default"</code> як <code>"string"</code>: до ES6 додавання дат вважали конкатенацією, і цю поведінку зафіксували в стандарті. Практичний наслідок — асиметрія операторів:</p>
<code class="code">
  const a = new Date(2026, 0, 1);
  const b = new Date(2026, 0, 2);

  b - a;   // 86400000 — мінус дає хінт "number" → valueOf() → timestamp
  a + b;   // "Thu Jan 01 2026...Fri Jan 02 2026..." — плюс дає "default" → toString()
</code>
<p class="info info--blue">Звідси ідіома <code>+new Date()</code> і <code>date * 1</code>: унарний плюс та множення примусово задають числовий хінт, оминаючи рядкову поведінку <code>Date</code>.</p>

<h3>Де ToPrimitive не бере участі</h3>
<ul>
  <li><strong>Зведення до boolean.</strong> Воно не кличе ні <code>valueOf</code>, ні <code>toString</code>: будь-який об'єкт — завжди <code>true</code>. Тому <code>if (new Boolean(false))</code> заходить у гілку, а <code>if ([])</code> істинне, хоча <code>[] == false</code> дає <code>true</code> (там уже працює ToPrimitive і числове порівняння).</li>
  <li><strong><code>JSON.stringify</code>.</strong> Використовує свій хук <code>toJSON()</code>, а не ToPrimitive. Перевизначений <code>toString()</code> на серіалізацію не впливає.</li>
  <li><strong><code>Object.prototype.toString.call(x)</code>.</strong> Читає <code>Symbol.toStringTag</code> і слугує для визначення внутрішнього типу (<code>"[object Array]"</code>, <code>"[object Date]"</code>). Власний <code>toString()</code> об'єкта на нього не впливає.</li>
</ul>

<h3>Edge cases і трюки зі співбесід</h3>
<ul>
  <li><code>[] + {}</code> → <code>"[object Object]"</code>: порожній масив дає <code>""</code>. А <code>{} + []</code> у консолі поверне <code>0</code> — фігурні дужки парсяться як блок коду, і лишається унарний плюс від масиву.</li>
  <li>Якщо <code>ToPrimitive</code> повернув <code>Symbol</code>, то рядковий контекст упаде з <code>TypeError</code>: символи не конвертуються в рядок неявно.</li>
  <li><code>==</code> між об'єктом і примітивом спершу зводить об'єкт через хінт <code>"default"</code>, тому <code>[1] == 1</code> — це <code>true</code>.</li>
  <li>Результат <code>ToPrimitive</code> не зобов'язаний відповідати хінту: можна повернути рядок при хінті <code>"number"</code>, движок прийме його і продовжить операцію з ним.</li>
</ul>

<p class="info info--blue">Практика: для value-об'єктів (гроші, температура, діапазон дат) оголошуйте <code>Symbol.toPrimitive</code> — він явно розводить форматування (<code>"string"</code>) і обчислення (<code>"number"</code>), тоді як пара <code>valueOf</code>/<code>toString</code> лишає поведінку при <code>+</code> неочевидною для читача.</p>
