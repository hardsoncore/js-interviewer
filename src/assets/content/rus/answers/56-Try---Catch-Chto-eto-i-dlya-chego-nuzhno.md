
<h3>Что это и зачем</h3>
<p><span class="accent">try...catch</span> — конструкция для перехвата ошибок времени выполнения. Опасный код кладём в <code>try</code>; если внутри выброшено исключение, выполнение блока обрывается, управление уходит в <code>catch</code>, и скрипт продолжает работать дальше вместо «белого экрана».</p>

<p class="info"><strong>Главная мысль:</strong> <code>catch</code> ловит только то, что брошено <strong>синхронно</strong>, пока его блок находится на стеке вызовов. Из этого одного правила выводятся все остальные особенности.</p>

<h3>Механика: throw и раскрутка стека</h3>
<p>Ошибка — не особое состояние движка, а обычный объект, который кто-то бросил через <code>throw</code>. Дальше движок останавливает текущую работу и раскручивает стек вызовов вверх, ища ближайший <code>catch</code>. Нашёл — передал ему объект ошибки. Не нашёл — ошибка доходит до верха и скрипт падает.</p>
<p>Поэтому <code>catch</code> перехватывает и то, что упало на несколько вызовов глубже. Ловить ошибку нужно там, где знаешь, что с ней делать, а не там, где она случилась.</p>

<h3>Синтаксис и объект ошибки</h3>
<code class="code">
  try {
    const data = JSON.parse(response); // бросит SyntaxError
    render(data);
  } catch (error) {
    console.error(error.name, error.message);
    showNotification('Данные повреждены');
  } finally {
    hideSpinner(); // выполнится в любом случае
  }
</code>
<p>В <code>catch</code> приходит объект ошибки: <code>name</code> — класс ошибки, <code>message</code> — текст, <code>stack</code> — стек вызовов на момент создания. Если объект не нужен, скобки опускаются: <code>catch { ... }</code>. Свои ошибки бросают так же — <code>throw new Error('Нет доступа')</code>, обязательно объектом <code>Error</code>, а не строкой, иначе не будет ни стека, ни привычных полей.</p>

<h3>Блок finally</h3>
<p>Выполняется всегда: после успеха, после ошибки и даже если из <code>try</code> сделали <code>return</code>. Это место для уборки — спрятать спиннер, закрыть соединение, разблокировать кнопку.</p>

<h3>Ловушка: асинхронные ошибки</h3>
<p>Колбэк <code>setTimeout</code> или обработчик события выполняется позже, отдельной задачей, когда блок <code>try</code> давно ушёл со стека. Ловить там уже нечего.</p>
<code class="code">
  try {
    setTimeout(() =&gt; { throw new Error('мимо'); }, 0);
  } catch (e) {
    // сюда не попадём: ошибка улетит в глобальный обработчик
  }
</code>
<p class="info info--blue">С <code>async/await</code> ловушки нет: <code>await</code> превращает отклонение промиса в обычное исключение в текущей функции, поэтому <code>try/catch</code> вокруг <code>await</code> работает ровно как в синхронном коде.</p>

<p class="info info--orange">Не «глотай» ошибки: пустой <code>catch (e) {}</code> превращает отладку в ад. И не оборачивай одним гигантским <code>try</code> весь модуль — обрамляй участки, где падение реально возможно и есть внятный план Б.</p>

<p class="deep-dive">Углубленный конспект</p>

<h3>Что try...catch не поймает в принципе</h3>
<p>Помимо асинхронных колбэков есть ещё два случая:</p>
<ul>
  <li><strong>Ошибки парсинга.</strong> Если синтаксис сломан в самом коде, скрипт не доходит до выполнения — движок падает на этапе разбора, и <code>try</code> никто не запускает.</li>
  <li><strong>Ошибка внутри самого <code>catch</code> или <code>finally</code>.</strong> Их ловит только внешний <code>try...catch</code> уровнем выше.</li>
</ul>
<p>Отдельно стоит непойманное отклонение промиса: оно не роняет страницу, а всплывает событием <code>unhandledrejection</code>. В Node.js по умолчанию это завершает процесс.</p>

<h3>Иерархия встроенных ошибок</h3>
<p>Все встроенные классы наследуются от <code>Error</code>: <code>SyntaxError</code> (битый JSON), <code>TypeError</code> (вызов не-функции, чтение свойства у <code>undefined</code>), <code>ReferenceError</code> (несуществующая переменная, обращение в TDZ), <code>RangeError</code> (переполнение стека, неверная длина массива), <code>URIError</code>, <code>AggregateError</code> (у <code>Promise.any</code>).</p>
<p>Типизированного <code>catch</code>, как в Java, в JS нет — фильтруем вручную через <code>instanceof</code>, а чужое пробрасываем дальше:</p>
<code class="code">
  try {
    doWork();
  } catch (e) {
    if (e instanceof ValidationError) {
      showFieldError(e.field);
    } else {
      throw e; // не наша ошибка — пусть летит выше
    }
  }
</code>

<h3>Свои классы ошибок и Error.cause</h3>
<p>Наследование от <code>Error</code> даёт осмысленный <code>name</code> и возможность различать ошибки по типу, а не по тексту сообщения.</p>
<code class="code">
  class ValidationError extends Error {
    constructor(message, field) {
      super(message);
      this.name = 'ValidationError';
      this.field = field;
    }
  }
</code>
<p>Когда низкоуровневую ошибку заворачивают в доменную, исходную нельзя терять — для этого есть второй аргумент конструктора: <code>throw new ApiError('Профиль не загружен', { cause: err })</code>. Оригинал остаётся доступен в <code>err.cause</code>, и цепочка причин видна в логах.</p>

<h3>Подвохи finally</h3>
<p><code>finally</code> исполняется между вычислением <code>return</code> в <code>try</code> и фактическим выходом из функции. Значение уже вычислено, поэтому изменение переменной в <code>finally</code> на результат не влияет. А вот собственный <code>return</code> или <code>throw</code> внутри <code>finally</code> перебивает всё, что происходило в <code>try</code> и <code>catch</code>, — включая уже летящую ошибку.</p>
<code class="code">
  function f() {
    try {
      throw new Error('потерялась');
    } finally {
      return 'ok'; // ошибка бесследно проглочена
    }
  }
</code>
<p class="info info--orange">Отсюда правило: в <code>finally</code> только уборка. Никаких <code>return</code> — линтеры (<code>no-unsafe-finally</code>) ругаются на это не зря.</p>

<h3>Цена исключений и производительность</h3>
<p>Раньше блок <code>try...catch</code> запрещал движку оптимизировать функцию целиком, и его выносили в отдельную обёртку. С TurboFan это неактуально: сам по себе <code>try</code> практически бесплатен, пока ошибки нет.</p>
<p>Дорог именно <code>throw</code>: создание объекта <code>Error</code> захватывает stack trace, а раскрутка стека ломает предсказание переходов. Поэтому исключения — для исключительных ситуаций, а не для управления потоком выполнения. Ожидаемый исход (валидация не прошла, элемента нет) правильнее вернуть значением.</p>

<h3>Последний рубеж: глобальные обработчики</h3>
<p>То, что не поймали локально, стоит перехватить хотя бы глобально — для логирования в систему мониторинга:</p>
<code class="code">
  window.addEventListener('error', (e) =&gt; report(e.error));
  window.addEventListener('unhandledrejection', (e) =&gt; report(e.reason));
</code>
<p>Во фреймворках для этого есть свои точки входа: <code>ErrorHandler</code> в Angular, <code>app.config.errorHandler</code> во Vue, Error Boundaries в React. Глобальный обработчик — не замена локальным <code>catch</code>: он умеет только сообщить о проблеме, но не восстановить сценарий пользователя.</p>
