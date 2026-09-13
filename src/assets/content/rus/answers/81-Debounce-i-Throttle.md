<h3>Введение</h3>

<p>
  <span class="accent">Debounce</span> и <span class="accent">Throttle</span> — это две функции-обёртки, которые сокращают
  число вызовов обработчика, когда события сыплются слишком часто: ввод в поле, скролл, ресайз, движение мыши. Обе
  устроены одинаково: принимают функцию и возвращают новую, а служебное состояние (таймер, время последнего вызова)
  хранят в замыкании.
</p>

<p class="info">
  <strong>Главная мысль:</strong> <strong>debounce ждёт тишины</strong> — откладывает вызов и обнуляет отсчёт на каждом
  новом событии, поэтому срабатывает один раз, когда поток событий прекратился. <strong>Throttle держит ритм</strong> —
  пропускает вызов не чаще одного раза в N миллисекунд, сколько бы событий ни пришло.
</p>

<p>
  Бытовая аналогия. Debounce — это лифт: пока в него заходят люди, двери не закрываются и отсчёт начинается заново; лифт
  поедет только тогда, когда поток прекратится. Throttle — турникет: пропускает по одному человеку раз в N секунд,
  сколько бы народу ни напирало.
</p>

<hr />

<h3>Реализация</h3>

<code class="code">
  function debounce(fn, ms) {
    let timer;

    return function (...args) {
      clearTimeout(timer);   // новое событие отменяет запланированный вызов
      timer = setTimeout(() => fn.apply(this, args), ms);
    };
  }

  // запрос уйдёт один раз — когда пользователь перестал печатать
  input.addEventListener('input', debounce(search, 300));
</code>

<code class="code">
  function throttle(fn, ms) {
    let isCooling = false;

    return function (...args) {
      if (isCooling) return;  // идёт период охлаждения — просто выходим
      fn.apply(this, args);

      isCooling = true;
      setTimeout(() => (isCooling = false), ms);
    };
  }

  // не чаще одного пересчёта в 200 мс, пока страницу крутят
  window.addEventListener('scroll', throttle(onScroll, 200));
</code>

<p>
  Обёртка объявлена через <code>function</code>, а не стрелку, и вызывает исходную функцию через
  <code>fn.apply(this, args)</code> — так обёрнутый метод не теряет свой <code>this</code> и аргументы события.
</p>

<hr />

<h3>Когда что применять</h3>

<ul>
  <li>
    <strong>Debounce</strong> — когда важен только итог: поиск-автокомплит, валидация поля на лету, автосохранение
    черновика, пересчёт вёрстки по <code>resize</code>.
  </li>
  <li>
    <strong>Throttle</strong> — когда важен сам процесс, но пореже: обработка <code>scroll</code> (бесконечная лента,
    подсветка активного раздела), <code>mousemove</code> и перетаскивание, отправка аналитики.
  </li>
</ul>

<p class="info info--blue">
  Правило выбора в одну фразу: <strong>нужен только финальный результат — debounce; нужны промежуточные, но
  реже — throttle.</strong>
</p>

<hr />

<h3>Главная ловушка: обёртку создают один раз</h3>

<p class="info info--orange">
  Состояние живёт в замыкании обёртки, поэтому её создают <strong>один раз</strong> и переиспользуют. Если вызвать
  <code>debounce()</code> прямо внутри обработчика или заново на каждом рендере компонента, на каждое событие родится
  новая функция с пустым замыканием: отменять будет нечего, и вызовы пройдут все до единого.
</p>

<hr />

<p class="deep-dive">Углубленный конспект</p>

<h4>Leading и trailing edge</h4>

<p>
  У серии событий есть два края, и вызов можно привязать к любому. Классический debounce работает по
  <strong>trailing edge</strong> — в конце, после тишины. Но иногда нужен <strong>leading edge</strong>: среагировать
  мгновенно на первое событие, а остальные погасить — так защищают кнопку «Отправить» от двойного клика.
</p>

<code class="code">
  function debounce(fn, ms, { leading = false, trailing = true } = {}) {
    let timer = null;

    return function (...args) {
      const callNow = leading && timer === null;  // это первое событие серии

      clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        // !callNow — чтобы одиночное событие не вызвало fn дважды
        if (trailing && !callNow) fn.apply(this, args);
      }, ms);

      if (callNow) fn.apply(this, args);
    };
  }
</code>

<h4>Throttle через флаг и через метку времени</h4>

<p>
  У простой реализации из ядра есть изъян: <strong>последнее событие серии теряется</strong>. Если пользователь дёрнул
  скролл и замер за 50 мс до конца периода охлаждения, финальная позиция обработана не будет. Вариант с меткой времени
  умеет «хвост»: он либо зовёт функцию сразу, либо планирует вызов ровно на момент, когда период истечёт.
</p>

<code class="code">
  function throttle(fn, ms) {
    let lastCall = 0;
    let timer = null;

    return function (...args) {
      const rest = ms - (Date.now() - lastCall);

      if (rest <= 0) {              // период вышел — зовём немедленно
        clearTimeout(timer);
        timer = null;
        lastCall = Date.now();
        fn.apply(this, args);
      } else if (timer === null) {  // иначе планируем «хвост» на конец периода
        timer = setTimeout(() => {
          lastCall = Date.now();
          timer = null;
          fn.apply(this, args);
        }, rest);
      }
    };
  }
</code>

<h4>Почему function, а не стрелка</h4>

<p>
  Стрелочная функция не имеет собственного <code>this</code> — она взяла бы его из места, где объявлен
  <code>debounce</code>. Тогда конструкция <code>obj.method = debounce(obj.method, 300)</code> сломалась бы: внутри
  <code>fn</code> вместо объекта оказался бы <code>undefined</code>. Поэтому обёртка — обычная функция.
</p>

<p>
  А вот колбэк внутри <code>setTimeout</code> — наоборот, обязательно стрелка: она наследует <code>this</code> обёртки и
  доносит его до <code>apply</code>. Замените её на <code>function</code> — и <code>this</code> потеряется.
</p>

<p class="info info--orange">
  Следствие, о котором часто забывают: <strong>debounce не может вернуть результат</strong> <code>fn</code> — обёртка
  возвращает управление задолго до реального вызова. Обёрнутая функция должна работать через побочный эффект. Если
  результат нужен, обёртка должна отдавать Promise и резолвить его в момент вызова.
</p>

<h4>cancel и flush</h4>

<p>
  Висящий таймер переживает компонент. Пользователь ушёл со страницы, компонент уничтожен, а через 300 мс таймер дёргает
  колбэк, который лезет в уже несуществующее состояние — отсюда ошибки в консоли и утечки памяти. Поэтому у обёртки
  делают метод отмены.
</p>

<code class="code">
  function debounce(fn, ms) {
    let timer;

    function wrapper(...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), ms);
    }

    wrapper.cancel = () => clearTimeout(timer);

    return wrapper;
  }
</code>

<p>
  <code>cancel()</code> вызывают в хуке уничтожения: <code>ngOnDestroy</code> в Angular, <code>onUnmounted</code> во Vue,
  функция очистки в <code>useEffect</code> в React. Парный метод <code>flush()</code> делает обратное — выполняет
  отложенный вызов немедленно. Он нужен, например, при отправке формы, чтобы не потерять последний ввод.
</p>

<h4>Троттлинг по кадрам: requestAnimationFrame</h4>

<p>
  Если результат обработчика влияет на картинку (скролл, перетаскивание), привязывать его к произвольным миллисекундам
  бессмысленно: браузер всё равно перерисует экран только в ближайшем кадре. Правильная единица измерения здесь — кадр,
  а не миллисекунда.
</p>

<code class="code">
  function rafThrottle(fn) {
    let scheduled = false;

    return function (...args) {
      if (scheduled) return;
      scheduled = true;

      requestAnimationFrame(() => {
        scheduled = false;
        fn.apply(this, args);
      });
    };
  }
</code>

<p class="info info--blue">
  Бонус в сравнении с <code>setTimeout</code>: в фоновой вкладке браузер сам перестаёт выдавать кадры, и лишние вызовы
  прекращаются без единой строки кода с вашей стороны.
</p>

<h4>Готовые реализации</h4>

<ul>
  <li>
    <strong>lodash</strong> — <code>_.debounce</code> и <code>_.throttle</code> с опциями <code>leading</code>,
    <code>trailing</code>, <code>maxWait</code> и методами <code>cancel</code> / <code>flush</code>.
    <code>maxWait</code> закрывает вечное откладывание: если события идут непрерывно, обычный debounce не сработает
    никогда, а с <code>maxWait</code> функция всё же вызовется не реже указанного интервала.
  </li>
  <li>
    <strong>RxJS</strong> — те же идеи как операторы потока: <code>debounceTime</code>, <code>throttleTime</code>,
    <code>auditTime</code>, <code>sampleTime</code>. Разница в том, что обёртывается не функция, а поток значений, и
    отписка автоматически снимает все висящие таймеры.
  </li>
</ul>

<h4>Тестирование</h4>

<p>
  Тесты на реальных таймерах медленные и нестабильные. Фейковые таймеры (<code>jest.useFakeTimers()</code> или
  <code>vi.useFakeTimers()</code>) позволяют перемотать время вручную через
  <code>advanceTimersByTime(300)</code> и проверить, что после серии из десяти событий исходная функция была вызвана
  ровно один раз.
</p>
