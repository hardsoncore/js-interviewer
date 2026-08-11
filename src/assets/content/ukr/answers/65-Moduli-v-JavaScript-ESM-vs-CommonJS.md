<h3>Вступ</h3>
<p><span class="accent">Модуль</span> — це файл із власною областю видимості, який явно оголошує, що він експортує і що імпортує. У JavaScript дві основні системи модулів: <span class="accent">CommonJS</span> (<code>require</code>, виріс у Node.js) і стандарт мови <span class="accent">ES Modules</span> (<code>import/export</code>, ES6).</p>

<p class="info"><strong>Головна думка:</strong> CommonJS розв'язує залежності під час виконання, а ESM — статично, ще до виконання коду. З цієї різниці виводиться все інше: tree shaking, live bindings, асинхронне завантаження.</p>

<h3>CommonJS</h3>
<p><code>require()</code> — звичайна функція: виконується в рантаймі, синхронно читає модуль із диска. <code>module.exports</code> — звичайний об'єкт. Тому імпортувати можна умовно, посеред файлу, з обчислюваним шляхом.</p>
<code class="code">
  // math.js
  module.exports = { sum: (a, b) =&gt; a + b };

  // app.js
  const { sum } = require('./math');
</code>

<h3>ES Modules</h3>
<p><code>import/export</code> — синтаксис мови, а не функція. Парсер збирає весь граф залежностей до виконання коду, тому імпорти дозволені лише на верхньому рівні та «підіймаються» (hoisting). Модуль завжди працює у strict mode, а в браузері підключається через <code>&lt;script type="module"&gt;</code> і завантажується асинхронно, не блокуючи парсинг (поведінка defer за замовчуванням).</p>
<code class="code">
  // math.js
  export const sum = (a, b) =&gt; a + b;

  // app.js
  import { sum } from './math.js';
</code>

<h3>Ключові відмінності</h3>
<ul>
  <li><strong>Момент розв'язання:</strong> CJS — у рантаймі, ESM — на етапі парсингу.</li>
  <li><strong>Що отримує імпортер:</strong> CJS — копію значення на момент <code>require</code>, ESM — <strong>live binding</strong>, живе посилання на змінну: змінилася в модулі — побачать усі.</li>
  <li><strong>Завантаження:</strong> CJS — синхронне (годиться для диска сервера), ESM — асинхронне (створене для мережі та браузера).</li>
  <li><strong>Лише в ESM:</strong> top-level <code>await</code>; строгий режим за замовчуванням; <code>this</code> на верхньому рівні — <code>undefined</code>.</li>
</ul>

<h3>Tree shaking</h3>
<p>Граф ESM відомий до виконання, тому бандлер бачить, які експорти ніхто не використовує, і викидає їх із бандла. З CommonJS це неможливо надійно: що і куди експортується, з'ясовується лише в рантаймі.</p>

<h3>Dynamic import()</h3>
<p><code>import('./module.js')</code> — динамічний імпорт усередині ESM: працює як функція, повертає <code>Promise</code> з модулем. Це основа code splitting і лінивого завантаження роутів у фреймворках.</p>

<p class="info info--blue">Запам'ятай: обидва стандарти кешують модуль — скільки б разів його не імпортували, код виконається один раз, усі отримають один екземпляр (тому модуль — найпростіший синглтон).</p>

<p class="deep-dive">Поглиблений конспект</p>

<h3>Три фази завантаження ESM</h3>
<ol>
  <li><strong>Construction</strong> — файли завантажуються і парсяться в Module Records, будується граф залежностей.</li>
  <li><strong>Instantiation</strong> — під усі експорти виділяється пам'ять, імпорти та експорти лінкуються на ті самі комірки (так виникають live bindings). Код ще не виконувався.</li>
  <li><strong>Evaluation</strong> — код виконується, комірки заповнюються значеннями.</li>
</ol>
<p>Рознесення лінкування і виконання — причина, з якої ESM стійкіший до циклічних залежностей.</p>

<h3>Live bindings наочно</h3>
<code class="code">
  // counter.js
  export let count = 0;
  export const inc = () =&gt; count++;

  // app.js (ESM)
  import { count, inc } from './counter.js';
  inc();
  console.log(count); // 1 — живе посилання

  // app.js (CJS-аналог)
  let { count, inc } = require('./counter');
  inc();
  console.log(count); // 0 — копія на момент require
</code>
<p>При цьому live binding доступний лише на читання: присвоїти <code>count = 5</code> з імпортера не можна — буде помилка.</p>

<h3>Циклічні залежності</h3>
<p>У CJS при циклі <code>A → B → A</code> модуль B отримає <strong>частково заповнений</strong> <code>module.exports</code> модуля A — ті поля, що встигли присвоїтися до <code>require(B)</code>. Це джерело важковловимих <code>undefined</code>. В ESM посилання злінковані заздалегідь: якщо значення вже обчислене на момент використання — усе працює; якщо ні — впаде явна помилка ReferenceError (аналог TDZ), а не тихий <code>undefined</code>.</p>

<h3>Interop у Node.js</h3>
<ul>
  <li>Режим файлу обирають розширення <code>.mjs</code> / <code>.cjs</code> або поле <code>"type": "module"</code> у package.json.</li>
  <li>З ESM можна імпортувати CJS: <code>module.exports</code> стає default-експортом.</li>
  <li><code>require()</code> ESM-модулів довго був заборонений (ESM асинхронний); починаючи з Node 22 <code>require(esm)</code> дозволений для модулів без top-level await.</li>
  <li>Поле <code>"exports"</code> у package.json задає entry points і дозволяє публікувати dual package (CJS + ESM).</li>
  <li>В ESM немає <code>__dirname</code> і <code>__filename</code> — замість них <code>import.meta.url</code>.</li>
</ul>

<h3>Історична довідка</h3>
<p>До стандарту модулі емулювали: IIFE та «модуль-патерн» на замиканнях → AMD/RequireJS (асинхронний, для браузера) → UMD (обгортка «і так, і так») → CommonJS (Node) → ES Modules (ES6, 2015). Сьогодні ESM — єдиний стандарт, що працює і в браузері, і в Node, а нові бібліотеки публікуються ESM-first.</p>
