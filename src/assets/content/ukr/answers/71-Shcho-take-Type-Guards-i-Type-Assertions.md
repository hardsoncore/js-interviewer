<p>
  У TypeScript ми працюємо з динамічною природою JavaScript, намагаючись накласти на неї суворі типи.
  <br>
  <span class="accent">Звуження типів (Type Narrowing)</span> — це процес, під час якого TypeScript аналізує потік виконання коду (control flow analysis) і автоматично уточнює тип змінної до більш конкретного в певному блоці (наприклад, усередині <code>if</code>).
</p>

<p>Цей процес спирається на два основні механізми: <span class="accent">Type Guards</span> (безпечні перевірки в рантаймі) та <span class="accent">Type Assertions</span> (вказівки компілятору на етапі розробки).</p>

<h3>1. Type Guards (Захисники типів)</h3>

<p><span class="accent">Type Guards</span> — це вирази, які виконують реальну перевірку під час виконання коду (runtime). TypeScript розуміє ці перевірки та звужує тип усередині відповідного блоку умов.</p>

<h4>1.1 typeof</h4>

<p><code>typeof</code>: Використовується для перевірки вбудованих типів (<code>string</code>, <code>number</code>, <code>boolean</code>, <code>symbol</code>, <code>bigint</code>, <code>function</code>, <code>object</code>).</p>

<code class="code">
  function process(value: string | number) {
    if (typeof value === "string") {
      value.toUpperCase(); // TS точно знає, що тут string
    } else {
      value.toFixed(); // TS знає, що тут number
    }
  }
</code>

<h4>1.2 instanceof</h4>

<p><code>instanceof</code>: Перевіряє ланцюжок прототипів. Ідеально для класів (наприклад, вбудованих помилок або кастомних моделей).</p>

<code class="code">
  function handleDate(value: Date | string) {
    if (value instanceof Date) {
      value.getTime(); // TS: це об'єкт Date
    }
  }
</code>

<h4>1.3 in</h4>

<p><code>in</code>: Перевіряє наявність властивості в об'єкті. Відмінно підходить для розрізнення інтерфейсів (discriminated unions) під час роботи з API.</p>

<code class="code">
  interface CorrectResponse {
    data: string;
  }

  interface ErrorResponse {
    error: string;
  }

   function handleApiResponse(response: CorrectResponse | ErrorResponse) {
    if ("data" in response) {
      console.log(response.data); // TS: це об'єкт із даними
    } else {
      console.log(response.error); // TS: це об'єкт з помилкою
    }
  }
</code>

<h4>1.4 Equality Narrowing</h4>

<p><strong>Перевірка на рівність (Equality Narrowing)</strong>: Використання <code>===</code>, <code>!==</code>, <code>==</code>, <code>!=</code> для відсікання <code>null</code> / <code>undefined</code> або літеральних типів.</p>

<code class="code">
  function check(val: string | null) {
    if (val !== null) {
      val.trim(); // TS: val це string
    }
  }
</code>

<h4>1.5 Custom Type Guards</h4>

<p><strong>Користувацькі (Custom Type Guards)</strong>: Коли базових перевірок не вистачає, ти можеш написати свою функцію-предикат. Це функція, яка використовує спеціальний синтаксис <code>is</code> і повертає <code>boolean</code>, але її тип повернення записується як <code>parameterName is Type</code>.</p>

<code class="code">
  interface Cat { meow(): void; }
  interface Dog { bark(): void; }

  // Тип повернення `animal is Cat` — це і є магія кастомного гарда
  function isCat(animal: Cat | Dog): animal is Cat {
    return (animal as Cat).meow !== undefined;
  }

  function makeSound(pet: Cat | Dog) {
    if (isCat(pet)) {
      pet.meow(); // TS знає, що це Cat
    } else {
      pet.bark(); // TS знає, що це Dog
    }
  }
</code>

<h3>2. Type Assertions (Ствердження типів)</h3>

<p><span class="accent">Type Assertions</span> - це спосіб сказати компілятору: "Я знаю про цей тип більше, ніж ти, просто повір мені".</p>
<p>Ствердження типів не виконують жодних перевірок під час виконання. Вони просто повідомляють компілятору, що ти впевнений у типі змінної. Це може бути корисно, коли ти знаєш, що API повертає певний тип, але TypeScript не може це вивести.</p>

<p class="info info--orange">Важливо: Ствердження типів видаляються під час компіляції і ніяк не впливають на код у рантаймі. Якщо ти помилишся, застосунок впаде з помилкою виконання.</p>

<h4>2.1 Синтаксис as Type (Рекомендований)</h4>

<p>Дозволяє жорстко привести один тип до іншого. Часто використовується під час парсингу <code>JSON</code> або роботи з DOM-елементами.</p>

<code class="code">
  // TS бачить тип повернення як 'any'
  const data = JSON.parse('{"name": "John"}');

  // Стверджуємо, що це конкретний інтерфейс
  const user = data as User;
</code>

<h4>2.2 Синтаксис <code>&lt;Type&gt;</code> (Застарілий)</h4>

<p>Це альтернативний синтаксис для стверджень типів, але він може конфліктувати з JSX у React, тому рекомендується використовувати <code>as</code>.</p>

<code class="code">
  const user = &lt;User>data;
</code>

<h4>2.3 Non-null Assertion Operator (!)</h4>

<p>
  Якщо ти впевнений, що змінна не буде <code>null</code> або <code>undefined</code>, ти можеш використовувати оператор <code>!</code>. Це говорить компілятору, що він може безпечно видалити ці типи (<code>null</code> або <code>undefined</code>) з об'єднання.
  <br>
  Використовувати потрібно вкрай обережно, оскільки це часта причина падінь у рантаймі.
</p>

<code class="code">
  const element = document.getElementById('app'); // Тип: HTMLElement | null
  element!.innerHTML = 'Hello'; // Ми ручаємося, що елемент існує
</code>

<h4>2.4 Const Assertions (as const)</h4>

<p>
  Якщо ти хочеш, щоб літеральні типи були максимально "вузькими", ти можеш використовувати <code>as const</code>. Це перетворює <strong>всі властивості об'єкта на <code>readonly</code></strong>. Властивості об'єктів стають незмінними на рівні системи типів.
  <br>
  <code>as const</code> робить щось на кшталт <code>Object.freeze()</code> для типів, гарантуючи, що ти не зможеш випадково змінити ці значення в коді. Звичайно, це не робить об'єкт незмінним у рантаймі, але на рівні типів це робить його чимось подібним до <code>Object.freeze()</code> (тільки <code>Object.freeze()</code> буде доступний і в runtime, а <code>as const</code> — тільки на рівні TypeScript і буде відкинутий на етапі транспіляції).
  <br>
  Це корисно для створення константних конфігурацій або для роботи з API, які вимагають точних літеральних типів.
</p>

<code class="code">
  const config = {
    mode: "dark",
    version: 1,
  } as const;

  // Тип config тепер:
  // {
  //   readonly mode: "dark";
  //   readonly version: 1;
  // }

  // config.mode = "light"; // Помилка компіляції: не можна змінити властивість readonly
</code>
