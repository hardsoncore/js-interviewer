<p>
  В TypeScript мы работаем с динамической природой JavaScript, пытаясь наложить на нее строгие типы.
  <br>
  <span class="accent">Сужение типов (Type Narrowing)</span> — это процесс, при котором TypeScript анализирует поток выполнения кода (control flow analysis) и автоматически уточняет тип переменной до более конкретного в определенном блоке (например, внутри <code>if</code>).
</p>

<p>Этот процесс опирается на два основных механизма: <span class="accent">Type Guards</span> (безопасные проверки в рантайме) и <span class="accent">Type Assertions</span> (указания компилятору в момент разработки).</p>

<h3>1. Type Guards (Защитники типов)</h3>

<p><span class="accent">Type Guards</span> — это выражения, которые выполняют реальную проверку во время выполнения кода (runtime). TypeScript понимает эти проверки и сужает тип внутри соответствующего блока условий.</p>

<h4>1.1 typeof</h4>

<p><code>typeof</code>: Используется для проверки встроенных типов (<code>string</code>, <code>number</code>, <code>boolean</code>, <code>symbol</code>, <code>bigint</code>, <code>function</code>, <code>object</code>).</p>

<code class="code">
  function process(value: string | number) {
    if (typeof value === "string") {
      value.toUpperCase(); // TS точно знает, что здесь string
    } else {
      value.toFixed(); // TS знает, что здесь number
    }
  }
</code>

<h4>1.2 instanceof</h4>

<p><code>instanceof</code>: Проверяет цепочку прототипов. Идеально для классов (например, встроенных ошибок или кастомных моделей).</p>

<code class="code">
  function handleDate(value: Date | string) {
    if (value instanceof Date) {
      value.getTime(); // TS: это объект Date
    }
  }
</code>

<h4>1.3 in</h4>

<p><code>in</code>: Проверяет наличие свойства в объекте. Отлично подходит для различения интерфейсов (discriminated unions) при работе с API.</p>

<code class="code">
  interface CorrectResponse {
    data: string;
  }

  interface ErrorResponse {
    error: string;
  }

   function handleApiResponse(response: CorrectResponse | ErrorResponse) {
    if ("data" in response) {
      console.log(response.data); // TS: это объект с данными
    } else {
      console.log(response.error); // TS: это объект с ошибкой
    }
  }
</code>

<h4>1.4 Equality Narrowing</h4>

<p><strong>Проверка на равенство (Equality Narrowing)</strong>: Использование <code>===</code>, <code>!==</code>, <code>==</code>, <code>!=</code> для отсечения <code>null</code> / <code>undefined</code> или литеральных типов.</p>

<code class="code">
  function check(val: string | null) {
    if (val !== null) {
      val.trim(); // TS: val это string
    }
  }
</code>

<h4>1.5 Custom Type Guards</h4>

<p><strong>Пользовательские (Custom Type Guards)</strong>: Когда базовых проверок не хватает, ты можешь написать свою функцию-предикат. Это функция, которая использует специальный синтаксис <code>is</code> и возвращает <code>boolean</code>, но ее возвращаемый тип записывается как <code>parameterName is Type</code>.</p>

<code class="code">
  interface Cat { meow(): void; }
  interface Dog { bark(): void; }

  // Возвращаемый тип `animal is Cat` — это и есть магия кастомного гарда
  function isCat(animal: Cat | Dog): animal is Cat {
    return (animal as Cat).meow !== undefined;
  }

  function makeSound(pet: Cat | Dog) {
    if (isCat(pet)) {
      pet.meow(); // TS знает, что это Cat
    } else {
      pet.bark(); // TS знает, что это Dog
    }
  }
</code>

<h3>2. Type Assertions (Утверждения типов)</h3>

<p><span class="accent">Type Assertions</span> - это способ сказать компилятору: "Я знаю об этом типе больше, чем ты, просто поверь мне".</p>
<p>Утверждения типов не выполняют никаких проверок во время выполнения. Они просто сообщают компилятору, что ты уверен в типе переменной. Это может быть полезно, когда ты знаешь, что API возвращает определенный тип, но TypeScript не может это вывести.</p>

<p class="info info--orange">Важно: Утверждения типов удаляются при компиляции и никак не влияют на код в рантайме. Если ты ошибешься, приложение упадет с ошибкой выполнения.</p>

<h4>2.1 Синтаксис as Type (Рекомендуемый)</h4>

<p>Позволяет жестко привести один тип к другому. Часто используется при парсинге <code>JSON</code> или работе с DOM-элементами.</p>

<code class="code">
  // TS видит возвращаемый тип как 'any'
  const data = JSON.parse('{"name": "John"}');

  // Утверждаем, что это конкретный интерфейс
  const user = data as User;
</code>

<h4>2.2 Синтаксис <code>&lt;Type&gt;</code> (Устаревший)</h4>

<p>Это альтернативный синтаксис для утверждений типов, но он может конфликтовать с JSX в React, поэтому рекомендуется использовать <code>as</code>.</p>

<code class="code">
  const user = &lt;User>data;
</code>

<h4>2.3 Non-null Assertion Operator (!)</h4>

<p>
  Если ты уверен, что переменная не будет <code>null</code> или <code>undefined</code>, ты можешь использовать оператор <code>!</code>. Это говорит компилятору, что он может безопасно удалить эти типы (<code>null</code> или <code>undefined</code>) из объединения.
  <br>
  Использовать нужно крайне осторожно, так как это частая причина падений в рантайме.
</p>

<code class="code">
  const element = document.getElementById('app'); // Тип: HTMLElement | null
  element!.innerHTML = 'Hello'; // Мы ручаемся, что элемент существует
</code>

<h4>2.4 Const Assertions (as const)</h4>

<p>
  Если ты хочешь, чтобы литеральные типы были максимально "узкими", ты можешь использовать <code>as const</code>. Это превращает <strong>все свойства объекта в <code>readonly</code></strong>. Свойства объектов становятся неизменяемыми на уровне системы типов.
  <br>
  <code>as const</code> делает что-то вроде <code>Object.freeze()</code> для типов, гарантируя, что ты не сможешь случайно изменить эти значения в коде. Разумеется, это не делает объект неизменяемым в рантайме, но на уровне типов это делает его чем-то вроде <code>Object.freeze()</code> (только <code>Object.freeze()</code> будет доступен и в runtime, а <code>as const</code> — только на уровне TypeScript и будет отброшен на этапе транспиляции).
  <br>
  Это полезно для создания константных конфигураций или для работы с API, которые требуют точных литеральных типов.
</p>

<code class="code">
  const config = {
    mode: "dark",
    version: 1,
  } as const;

  // Тип config теперь:
  // {
  //   readonly mode: "dark";
  //   readonly version: 1;
  // }

  // config.mode = "light"; // Ошибка компиляции: нельзя изменить readonly свойство
</code>
