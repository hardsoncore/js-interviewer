<h3>Введение</h3>
<p>Объект не участвует в арифметике или конкатенации «как есть»: перед операцией движок запускает внутренний алгоритм <span class="accent">ToPrimitive</span>, приводящий объект к примитиву. Управляет им <strong>hint</strong> — подсказка о том, значение какого типа ожидает операция.</p>

<p class="info"><strong>Главная мысль:</strong> hint не выбирает результат — он выбирает только <strong>порядок</strong> вызова <code>valueOf</code> и <code>toString</code>. Движок берёт первый вернувшийся примитив, а если метод вернул объект — пробует второй.</p>

<h3>Три хинта и порядок вызова</h3>
<ul>
  <li><code>"string"</code> — <code>String(obj)</code> и шаблонная строка: сначала <code>toString()</code>, потом <code>valueOf()</code>.</li>
  <li><code>"number"</code> — математика (<code>obj * 2</code>, <code>obj &lt; other</code>) и <code>Number(obj)</code>: сначала <code>valueOf()</code>, потом <code>toString()</code>.</li>
  <li><code>"default"</code> — бинарный <code>+</code> и <code>==</code>: операция не знает, чего ждёт, и ведёт себя как <code>"number"</code> (кроме <code>Date</code>).</li>
</ul>

<h3>Поведение по умолчанию</h3>
<p>У обычного объекта <code>valueOf()</code> возвращает <strong>сам объект</strong> — это не примитив, поэтому результат отбрасывается и движок откатывается к <code>toString()</code> с его <code>"[object Object]"</code>. Отсюда <code>obj1 + obj2</code> даёт <code>"[object Object][object Object]"</code>, а <code>obj * 2</code> — <code>NaN</code>. У массивов же <code>toString()</code> — это <code>join(',')</code>, поэтому <code>[1, 2] + ''</code> даёт <code>"1,2"</code>.</p>

<h3>Кастомизация</h3>
<code class="code">
  const money = {
    amount: 100,
    valueOf() { return this.amount; },        // хинты "number" и "default"
    toString() { return `$${this.amount}`; }  // хинт "string"
  };

  money * 2;          // 200
  money + 5;          // 105 — "default" идёт по числовому пути
  `Цена: ${money}`;   // "Цена: $100"
</code>
<p>С ES6 есть приоритетный способ — метод <code>[Symbol.toPrimitive](hint)</code>: если он объявлен, движок вызовет только его, передав хинт явно.</p>

<p class="info info--orange">Ловушка: переопределив один <code>toString()</code>, вы покрываете <strong>оба</strong> контекста — в числовом <code>valueOf()</code> вернёт объект, и движок всё равно придёт к нему. Обратное неверно: с одним <code>valueOf()</code> строковый контекст даст <code>"[object Object]"</code> — дефолтный <code>toString()</code> отработает первым и вернёт валидный примитив.</p>

<p class="deep-dive">Углубленный конспект</p>

<h3>Алгоритм ToPrimitive по спецификации</h3>
<ol>
  <li>Если у объекта есть <code>[Symbol.toPrimitive]</code> — вызвать его с хинтом. Вернул объект → <code>TypeError</code>, дальше ничего не пробуется.</li>
  <li>Иначе запускается <code>OrdinaryToPrimitive</code> со списком методов: <code>["valueOf", "toString"]</code> для хинтов <code>"number"</code>/<code>"default"</code> и <code>["toString", "valueOf"]</code> для <code>"string"</code>.</li>
  <li>Каждый метод из списка: если он вызываемый и вернул <strong>не объект</strong> — это результат. Иначе переходим к следующему.</li>
  <li>Оба не дали примитив → <code>TypeError: Cannot convert object to primitive value</code>.</li>
</ol>

<code class="code">
  const bare = Object.create(null); // нет прототипа → нет toString и valueOf
  `${bare}`;                        // TypeError: Cannot convert object to primitive value

  const weird = { [Symbol.toPrimitive]() { return {}; } };
  weird + 1;                        // TypeError — вернули объект из toPrimitive
</code>

<h3>Date — единственное исключение для хинта "default"</h3>
<p>Исторически <code>Date</code> трактует <code>"default"</code> как <code>"string"</code>: до ES6 сложение дат считали конкатенацией, и это поведение зафиксировали в стандарте. Практическое следствие — асимметрия операторов:</p>
<code class="code">
  const a = new Date(2026, 0, 1);
  const b = new Date(2026, 0, 2);

  b - a;   // 86400000 — минус даёт хинт "number" → valueOf() → timestamp
  a + b;   // "Thu Jan 01 2026...Fri Jan 02 2026..." — плюс даёт "default" → toString()
</code>
<p class="info info--blue">Отсюда идиома <code>+new Date()</code> и <code>date * 1</code>: унарный плюс и умножение принудительно задают числовой хинт, минуя строковое поведение <code>Date</code>.</p>

<h3>Где ToPrimitive не участвует</h3>
<ul>
  <li><strong>Приведение к boolean.</strong> Оно не зовёт ни <code>valueOf</code>, ни <code>toString</code>: любой объект — всегда <code>true</code>. Поэтому <code>if (new Boolean(false))</code> входит в ветку, а <code>if ([])</code> истинно, хотя <code>[] == false</code> даёт <code>true</code> (там уже работает ToPrimitive и числовое сравнение).</li>
  <li><strong><code>JSON.stringify</code>.</strong> Использует свой хук <code>toJSON()</code>, а не ToPrimitive. Переопределённый <code>toString()</code> на сериализацию не влияет.</li>
  <li><strong><code>Object.prototype.toString.call(x)</code>.</strong> Читает <code>Symbol.toStringTag</code> и служит для определения внутреннего типа (<code>"[object Array]"</code>, <code>"[object Date]"</code>). Собственный <code>toString()</code> объекта на него не влияет.</li>
</ul>

<h3>Edge cases и трюки с собеседований</h3>
<ul>
  <li><code>[] + {}</code> → <code>"[object Object]"</code>: пустой массив даёт <code>""</code>. А <code>{} + []</code> в консоли вернёт <code>0</code> — фигурные скобки парсятся как блок кода, и остаётся унарный плюс от массива.</li>
  <li>Если <code>ToPrimitive</code> вернул <code>Symbol</code>, то строковый контекст упадёт с <code>TypeError</code>: символы не конвертируются в строку неявно.</li>
  <li><code>==</code> между объектом и примитивом сначала приводит объект через хинт <code>"default"</code>, поэтому <code>[1] == 1</code> — это <code>true</code>.</li>
  <li>Результат <code>ToPrimitive</code> не обязан соответствовать хинту: можно вернуть строку при хинте <code>"number"</code>, движок примет её и продолжит операцию с ней.</li>
</ul>

<p class="info info--blue">Практика: для value-объектов (деньги, температура, диапазон дат) объявляйте <code>Symbol.toPrimitive</code> — он явно разводит форматирование (<code>"string"</code>) и вычисления (<code>"number"</code>), тогда как пара <code>valueOf</code>/<code>toString</code> оставляет поведение при <code>+</code> неочевидным для читателя.</p>
