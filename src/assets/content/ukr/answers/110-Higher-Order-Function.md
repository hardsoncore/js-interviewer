<h3>Вступ та Базове визначення</h3>

<p>
  <span class="accent">Функція вищого порядку (Higher-Order Function, HOF)</span> — це функція, яка приймає одну або кілька інших функцій як аргументи, або повертає іншу функцію як результат (або робить і те, і інше одночасно).
</p>

<p class="info info--blue">
  Такий підхід став можливим завдяки тому, що в JavaScript функції є "об'єктами першого класу" (First-Class Citizens). Це означає, що з ними можна працювати так само, як із звичайними змінними (числами, рядками, об'єктами). Концепція HOF лежить в самій основі функціонального програмування.
</p>

<hr />

<h3>Приклади коду</h3>

<h4>Приклад 1: Функція приймає іншу функцію як аргумент (Колбек)</h4>
<p>Найбазовіший і найчастіший приклад — вбудовані методи масивів або передача власної функції обчислення:</p>
<code class="code">
  function doOperation(a, b, operationCallback) {
    // operationCallback — і є передана функція
    return operationCallback(a, b);
  }

  const add = (x, y) => x + y;
  const multiply = (x, y) => x * y;

  console.log(doOperation(5, 3, add)); // 8
  console.log(doOperation(5, 3, multiply)); // 15
</code>

<h4>Приклад 2: Функція повертає іншу функцію</h4>
<p>Цей підхід часто використовується для замикань та фабрик функцій (наприклад, при каруванні):</p>
<code class="code">
  function multiplyBy(factor) {
    // Повертаємо нову анонімну функцію
    return function(number) {
      return number * factor;
    };
  }

  const double = multiplyBy(2);
  const triple = multiplyBy(3);

  console.log(double(5)); // 10
  console.log(triple(5)); // 15
</code>

<hr />

<h3>Ключові особливості та застосування</h3>

<ul>
  <li>
    <strong>Інкапсуляція та абстракція логіки:</strong> HOF дозволяють абстрагувати повторювану логіку. Наприклад, цикл обходу масиву зашитий "під капот" методу <code>Array.prototype.map</code>, і нам не потрібно щоразу писати рутинний <code>for</code>.
  </li>
  <li>
    <strong>Композиція та Декоратори:</strong> Можна створювати функції-"обгортки" навколо інших функцій, розширюючи їхні можливості (наприклад, додаючи логування, мемоїзацію кешу або debounce/throttle обгортку).
  </li>
  <li>
    <strong>Карування та часткове застосування:</strong> Трансформація функції з кількома аргументами у ланцюжок викликаних функцій з одним аргументом, що покращує перевикористання логіки.
  </li>
</ul>

<hr />

<h3>Важливі нюанси та рекомендації</h3>

<p class="info info--orange">
  Функції, передані як аргументи (callbacks), часто можуть втратити контекст виклику (<strong>this</strong>). При використанні HOF всередині методів класів, переконайтеся, що ви передаєте контекст, використовуєте стрілочні функції або прив'язуєте об'єкт через <code>bind</code>.
</p>

<p class="info info--blue">
  Найвідоміші класичні HOF в JS — це методи масивів (<code>map</code>, <code>filter</code>, <code>reduce</code>, <code>forEach</code>, <code>some</code>, <code>every</code>), механізми керування часом (<code>setTimeout</code>, <code>setInterval</code>), а також обробники подій DOM, такі як <code>addEventListener</code>.
</p>

<hr />

<p class="deep-dive">Поглиблений конспект</p>

<h4>Декоратори та Мемоїзація</h4>
<p>Просунутий, але вкрай практичний приклад створення HOF — це реалізація декоратора, наприклад, мемоїзації (наділення функції "пам'яттю" складних обчислень).</p>

<code class="code">
  function memoize(fn) {
    const cache = new Map();
    // Повертаємо нову функцію-обгортку, в якій "замкнутий" кеш (cache)
    return function(...args) {
      const key = JSON.stringify(args);
      if (cache.has(key)) {
        return cache.get(key); // Віддаємо з кешу, не викликаючи важку оригінальну функцію
      }
      const result = fn(...args);
      cache.set(key, result);
      return result;
    };
  }

  const expensiveCalc = memoize((num) => {
    console.log('Computing...');
    return num * 1000;
  });

  expensiveCalc(10); // Виведе 'Computing...', поверне 10000
  expensiveCalc(10); // Нічого не виведе, поверне 10000 відразу з кешу `Map`
</code>

<h4>Зв'язок з Execution Context та механізмом Замикань (Closures)</h4>
<p>Коли HOF викликає <code>return function() {...}</code>, повернута внутрішня функція "запам'ятовує" змінні зі свого батьківського оточення (Lexical Environment), в якому вона була створена. Це і є механізм <span class="accent">Замикання (Closure)</span>.</p>

<p>Навіть коли зовнішня (батьківська) функція вже відпрацювала, завершила свій цикл і її Execution Context (контекст виконання) видалений з Call Stack (стека викликів), повернута функція все ще матиме доступ до змінних HOF через приховану внутрішню властивість середовища <code>[[Environment]]</code>. Саме завдяки цьому працюють приватні лічильники та кеш (як у функції memoize вище) — цей кеш живе у пам'яті збирача сміття (Garbage Collector), і рятується від видалення активним замиканням.</p>
