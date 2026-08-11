<h3>Введение</h3>
<p><span class="accent">Модуль</span> — это файл с собственной областью видимости, который явно объявляет, что он экспортирует и что импортирует. В JavaScript две основные системы модулей: <span class="accent">CommonJS</span> (<code>require</code>, вырос в Node.js) и стандарт языка <span class="accent">ES Modules</span> (<code>import/export</code>, ES6).</p>

<p class="info"><strong>Главная мысль:</strong> CommonJS разрешает зависимости во время выполнения, а ESM — статически, ещё до выполнения кода. Из этой разницы выводится всё остальное: tree shaking, live bindings, асинхронная загрузка.</p>

<h3>CommonJS</h3>
<p><code>require()</code> — обычная функция: выполняется в рантайме, синхронно читает модуль с диска. <code>module.exports</code> — обычный объект. Поэтому импортировать можно условно, в середине файла, с вычисляемым путём.</p>
<code class="code">
  // math.js
  module.exports = { sum: (a, b) =&gt; a + b };

  // app.js
  const { sum } = require('./math');
</code>

<h3>ES Modules</h3>
<p><code>import/export</code> — синтаксис языка, а не функция. Парсер собирает весь граф зависимостей до выполнения кода, поэтому импорты разрешены только на верхнем уровне и «поднимаются» (hoisting). Модуль всегда работает в strict mode, а в браузере подключается через <code>&lt;script type="module"&gt;</code> и загружается асинхронно, не блокируя парсинг (поведение defer по умолчанию).</p>
<code class="code">
  // math.js
  export const sum = (a, b) =&gt; a + b;

  // app.js
  import { sum } from './math.js';
</code>

<h3>Ключевые различия</h3>
<ul>
  <li><strong>Момент разрешения:</strong> CJS — в рантайме, ESM — на этапе парсинга.</li>
  <li><strong>Что получает импортёр:</strong> CJS — копию значения на момент <code>require</code>, ESM — <strong>live binding</strong>, живую ссылку на переменную: изменилась в модуле — увидят все.</li>
  <li><strong>Загрузка:</strong> CJS — синхронная (годится для диска сервера), ESM — асинхронная (создана для сети и браузера).</li>
  <li><strong>Только в ESM:</strong> top-level <code>await</code>; строгий режим по умолчанию; <code>this</code> на верхнем уровне — <code>undefined</code>.</li>
</ul>

<h3>Tree shaking</h3>
<p>Граф ESM известен до выполнения, поэтому бандлер видит, какие экспорты никто не использует, и выбрасывает их из бандла. С CommonJS это невозможно надёжно: что и куда экспортируется, выясняется только в рантайме.</p>

<h3>Dynamic import()</h3>
<p><code>import('./module.js')</code> — динамический импорт внутри ESM: работает как функция, возвращает <code>Promise</code> с модулем. Это основа code splitting и ленивой загрузки роутов во фреймворках.</p>

<p class="info info--blue">Запомни: оба стандарта кешируют модуль — сколько бы раз его ни импортировали, код выполнится один раз, все получат один экземпляр (поэтому модуль — простейший синглтон).</p>

<p class="deep-dive">Углубленный конспект</p>

<h3>Три фазы загрузки ESM</h3>
<ol>
  <li><strong>Construction</strong> — файлы скачиваются и парсятся в Module Records, строится граф зависимостей.</li>
  <li><strong>Instantiation</strong> — под все экспорты выделяется память, импорты и экспорты линкуются на одни и те же ячейки (так возникают live bindings). Код ещё не выполнялся.</li>
  <li><strong>Evaluation</strong> — код выполняется, ячейки заполняются значениями.</li>
</ol>
<p>Разнесение линковки и выполнения — причина, по которой ESM устойчивее к циклическим зависимостям.</p>

<h3>Live bindings наглядно</h3>
<code class="code">
  // counter.js
  export let count = 0;
  export const inc = () =&gt; count++;

  // app.js (ESM)
  import { count, inc } from './counter.js';
  inc();
  console.log(count); // 1 — живая ссылка

  // app.js (CJS-аналог)
  let { count, inc } = require('./counter');
  inc();
  console.log(count); // 0 — копия на момент require
</code>
<p>При этом live binding доступен только на чтение: присвоить <code>count = 5</code> из импортёра нельзя — будет ошибка.</p>

<h3>Циклические зависимости</h3>
<p>В CJS при цикле <code>A → B → A</code> модуль B получит <strong>частично заполненный</strong> <code>module.exports</code> модуля A — те поля, что успели присвоиться до <code>require(B)</code>. Это источник трудноуловимых <code>undefined</code>. В ESM ссылки слинкованы заранее: если значение уже вычислено к моменту использования — всё работает; если нет — упадёт явная ошибка ReferenceError (аналог TDZ), а не тихий <code>undefined</code>.</p>

<h3>Interop в Node.js</h3>
<ul>
  <li>Режим файла выбирают расширения <code>.mjs</code> / <code>.cjs</code> или поле <code>"type": "module"</code> в package.json.</li>
  <li>Из ESM можно импортировать CJS: <code>module.exports</code> становится default-экспортом.</li>
  <li><code>require()</code> ESM-модулей долго был запрещён (ESM асинхронен); начиная с Node 22 <code>require(esm)</code> разрешён для модулей без top-level await.</li>
  <li>Поле <code>"exports"</code> в package.json задаёт entry points и позволяет публиковать dual package (CJS + ESM).</li>
  <li>В ESM нет <code>__dirname</code> и <code>__filename</code> — вместо них <code>import.meta.url</code>.</li>
</ul>

<h3>Историческая справка</h3>
<p>До стандарта модули эмулировали: IIFE и «модуль-паттерн» на замыканиях → AMD/RequireJS (асинхронный, для браузера) → UMD (обёртка «и так, и так») → CommonJS (Node) → ES Modules (ES6, 2015). Сегодня ESM — единственный стандарт, работающий и в браузере, и в Node, и новые библиотеки публикуются ESM-first.</p>
