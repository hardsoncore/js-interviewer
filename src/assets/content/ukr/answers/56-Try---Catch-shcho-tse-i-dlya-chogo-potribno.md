
<h3>Що це і навіщо</h3>
<p><span class="accent">try...catch</span> — конструкція для перехоплення помилок часу виконання. Небезпечний код кладемо в <code>try</code>; якщо всередині кинуто виняток, виконання блоку обривається, керування переходить у <code>catch</code>, і скрипт продовжує працювати далі замість «білого екрана».</p>

<p class="info"><strong>Головна думка:</strong> <code>catch</code> ловить лише те, що кинуто <strong>синхронно</strong>, поки його блок перебуває у стеку викликів. З цього одного правила виводяться всі інші особливості.</p>

<h3>Механіка: throw і розкручування стека</h3>
<p>Помилка — не особливий стан рушія, а звичайний об'єкт, який хтось кинув через <code>throw</code>. Далі рушій зупиняє поточну роботу і розкручує стек викликів угору, шукаючи найближчий <code>catch</code>. Знайшов — передав йому об'єкт помилки. Не знайшов — помилка доходить до самого верху і скрипт падає.</p>
<p>Тому <code>catch</code> перехоплює й те, що впало на кілька викликів глибше. Ловити помилку потрібно там, де знаєш, що з нею робити, а не там, де вона сталася.</p>

<h3>Синтаксис і об'єкт помилки</h3>
<code class="code">
  try {
    const data = JSON.parse(response); // кине SyntaxError
    render(data);
  } catch (error) {
    console.error(error.name, error.message);
    showNotification('Дані пошкоджені');
  } finally {
    hideSpinner(); // виконається у будь-якому разі
  }
</code>
<p>У <code>catch</code> приходить об'єкт помилки: <code>name</code> — клас помилки, <code>message</code> — текст, <code>stack</code> — стек викликів на момент створення. Якщо об'єкт не потрібен, дужки опускаються: <code>catch { ... }</code>. Власні помилки кидають так само — <code>throw new Error('Немає доступу')</code>, обов'язково об'єктом <code>Error</code>, а не рядком, інакше не буде ні стека, ні звичних полів.</p>

<h3>Блок finally</h3>
<p>Виконується завжди: після успіху, після помилки і навіть якщо з <code>try</code> зробили <code>return</code>. Це місце для прибирання — сховати спінер, закрити з'єднання, розблокувати кнопку.</p>

<h3>Пастка: асинхронні помилки</h3>
<p>Колбек <code>setTimeout</code> або обробник події виконується пізніше, окремим завданням, коли блок <code>try</code> давно пішов зі стека. Ловити там уже нічого.</p>
<code class="code">
  try {
    setTimeout(() =&gt; { throw new Error('мимо'); }, 0);
  } catch (e) {
    // сюди не потрапимо: помилка полетить у глобальний обробник
  }
</code>
<p class="info info--blue">З <code>async/await</code> пастки немає: <code>await</code> перетворює відхилення промісу на звичайний виняток у поточній функції, тому <code>try/catch</code> навколо <code>await</code> працює точно як у синхронному коді.</p>

<p class="info info--orange">Не «ковтай» помилки: порожній <code>catch (e) {}</code> перетворює налагодження на пекло. І не обгортай одним гігантським <code>try</code> увесь модуль — обрамляй ділянки, де падіння реально можливе і є зрозумілий план Б.</p>

<p class="deep-dive">Поглиблений конспект</p>

<h3>Що try...catch не спіймає в принципі</h3>
<p>Окрім асинхронних колбеків є ще два випадки:</p>
<ul>
  <li><strong>Помилки парсингу.</strong> Якщо синтаксис зламано в самому коді, скрипт не доходить до виконання — рушій падає на етапі розбору, і <code>try</code> ніхто не запускає.</li>
  <li><strong>Помилка всередині самого <code>catch</code> або <code>finally</code>.</strong> Їх ловить лише зовнішній <code>try...catch</code> рівнем вище.</li>
</ul>
<p>Окремо стоїть неспіймане відхилення промісу: воно не роняє сторінку, а спливає подією <code>unhandledrejection</code>. У Node.js за замовчуванням це завершує процес.</p>

<h3>Ієрархія вбудованих помилок</h3>
<p>Усі вбудовані класи успадковуються від <code>Error</code>: <code>SyntaxError</code> (побитий JSON), <code>TypeError</code> (виклик не-функції, читання властивості в <code>undefined</code>), <code>ReferenceError</code> (неіснуюча змінна, звернення у TDZ), <code>RangeError</code> (переповнення стека, хибна довжина масиву), <code>URIError</code>, <code>AggregateError</code> (у <code>Promise.any</code>).</p>
<p>Типізованого <code>catch</code>, як у Java, у JS немає — фільтруємо вручну через <code>instanceof</code>, а чуже прокидаємо далі:</p>
<code class="code">
  try {
    doWork();
  } catch (e) {
    if (e instanceof ValidationError) {
      showFieldError(e.field);
    } else {
      throw e; // не наша помилка — хай летить вище
    }
  }
</code>

<h3>Власні класи помилок і Error.cause</h3>
<p>Успадкування від <code>Error</code> дає осмислений <code>name</code> і можливість розрізняти помилки за типом, а не за текстом повідомлення.</p>
<code class="code">
  class ValidationError extends Error {
    constructor(message, field) {
      super(message);
      this.name = 'ValidationError';
      this.field = field;
    }
  }
</code>
<p>Коли низькорівневу помилку загортають у доменну, вихідну не можна втрачати — для цього є другий аргумент конструктора: <code>throw new ApiError('Профіль не завантажено', { cause: err })</code>. Оригінал лишається доступним у <code>err.cause</code>, і ланцюжок причин видно в логах.</p>

<h3>Підступності finally</h3>
<p><code>finally</code> виконується між обчисленням <code>return</code> у <code>try</code> і фактичним виходом із функції. Значення вже обчислено, тому зміна змінної у <code>finally</code> на результат не впливає. А ось власний <code>return</code> чи <code>throw</code> всередині <code>finally</code> перебиває все, що відбувалося у <code>try</code> і <code>catch</code>, — включно з помилкою, яка вже летить.</p>
<code class="code">
  function f() {
    try {
      throw new Error('загубилася');
    } finally {
      return 'ok'; // помилку безслідно проковтнуто
    }
  }
</code>
<p class="info info--orange">Звідси правило: у <code>finally</code> лише прибирання. Жодних <code>return</code> — лінтери (<code>no-unsafe-finally</code>) сварять за це недарма.</p>

<h3>Ціна винятків і продуктивність</h3>
<p>Раніше блок <code>try...catch</code> забороняв рушію оптимізувати функцію цілком, і його виносили в окрему обгортку. З TurboFan це неактуально: сам собою <code>try</code> практично безкоштовний, поки помилки немає.</p>
<p>Дорогий саме <code>throw</code>: створення об'єкта <code>Error</code> захоплює stack trace, а розкручування стека ламає передбачення переходів. Тому винятки — для виняткових ситуацій, а не для керування потоком виконання. Очікуваний результат (валідація не пройшла, елемента немає) правильніше повернути значенням.</p>

<h3>Останній рубіж: глобальні обробники</h3>
<p>Те, що не спіймали локально, варто перехопити хоча б глобально — для логування в систему моніторингу:</p>
<code class="code">
  window.addEventListener('error', (e) =&gt; report(e.error));
  window.addEventListener('unhandledrejection', (e) =&gt; report(e.reason));
</code>
<p>У фреймворках для цього є свої точки входу: <code>ErrorHandler</code> в Angular, <code>app.config.errorHandler</code> у Vue, Error Boundaries у React. Глобальний обробник — не заміна локальним <code>catch</code>: він уміє лише повідомити про проблему, але не відновити сценарій користувача.</p>
