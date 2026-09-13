<h3>Вступ</h3>

<p>
  <span class="accent">Debounce</span> і <span class="accent">Throttle</span> — це дві функції-обгортки, які скорочують
  кількість викликів обробника, коли події сиплються надто часто: введення в поле, скрол, ресайз, рух миші. Обидві
  влаштовані однаково: приймають функцію і повертають нову, а службовий стан (таймер, час останнього виклику) зберігають
  у замиканні.
</p>

<p class="info">
  <strong>Головна думка:</strong> <strong>debounce чекає тиші</strong> — відкладає виклик і обнуляє відлік на кожній
  новій події, тому спрацьовує один раз, коли потік подій припинився. <strong>Throttle тримає ритм</strong> — пропускає
  виклик не частіше ніж раз на N мілісекунд, скільки б подій не надійшло.
</p>

<p>
  Побутова аналогія. Debounce — це ліфт: доки в нього заходять люди, двері не зачиняються і відлік починається наново;
  ліфт поїде лише тоді, коли потік припиниться. Throttle — турнікет: пропускає по одній людині раз на N секунд, скільки
  б народу не напирало.
</p>

<hr />

<h3>Реалізація</h3>

<code class="code">
  function debounce(fn, ms) {
    let timer;

    return function (...args) {
      clearTimeout(timer);   // нова подія скасовує запланований виклик
      timer = setTimeout(() => fn.apply(this, args), ms);
    };
  }

  // запит піде один раз — коли користувач перестав друкувати
  input.addEventListener('input', debounce(search, 300));
</code>

<code class="code">
  function throttle(fn, ms) {
    let isCooling = false;

    return function (...args) {
      if (isCooling) return;  // триває період охолодження — просто виходимо
      fn.apply(this, args);

      isCooling = true;
      setTimeout(() => (isCooling = false), ms);
    };
  }

  // не частіше ніж один перерахунок на 200 мс, доки сторінку крутять
  window.addEventListener('scroll', throttle(onScroll, 200));
</code>

<p>
  Обгортку оголошено через <code>function</code>, а не стрілку, і вона викликає вихідну функцію через
  <code>fn.apply(this, args)</code> — так огорнутий метод не втрачає свій <code>this</code> та аргументи події.
</p>

<hr />

<h3>Коли що застосовувати</h3>

<ul>
  <li>
    <strong>Debounce</strong> — коли важливий лише підсумок: пошук-автокомпліт, валідація поля на льоту, автозбереження
    чернетки, перерахунок верстки за <code>resize</code>.
  </li>
  <li>
    <strong>Throttle</strong> — коли важливий сам процес, але рідше: обробка <code>scroll</code> (нескінченна стрічка,
    підсвічування активного розділу), <code>mousemove</code> і перетягування, надсилання аналітики.
  </li>
</ul>

<p class="info info--blue">
  Правило вибору в одну фразу: <strong>потрібен лише фінальний результат — debounce; потрібні проміжні, але
  рідше — throttle.</strong>
</p>

<hr />

<h3>Головна пастка: обгортку створюють один раз</h3>

<p class="info info--orange">
  Стан живе в замиканні обгортки, тому її створюють <strong>один раз</strong> і перевикористовують. Якщо викликати
  <code>debounce()</code> просто всередині обробника або наново на кожному рендері компонента, на кожну подію
  народиться нова функція з порожнім замиканням: скасовувати буде нічого, і виклики пройдуть усі до одного.
</p>

<hr />

<p class="deep-dive">Поглиблений конспект</p>

<h4>Leading і trailing edge</h4>

<p>
  У серії подій є два краї, і виклик можна прив'язати до будь-якого. Класичний debounce працює за
  <strong>trailing edge</strong> — у кінці, після тиші. Але іноді потрібен <strong>leading edge</strong>: зреагувати
  миттєво на першу подію, а решту погасити — так захищають кнопку «Надіслати» від подвійного кліку.
</p>

<code class="code">
  function debounce(fn, ms, { leading = false, trailing = true } = {}) {
    let timer = null;

    return function (...args) {
      const callNow = leading && timer === null;  // це перша подія серії

      clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        // !callNow — щоб одиночна подія не викликала fn двічі
        if (trailing && !callNow) fn.apply(this, args);
      }, ms);

      if (callNow) fn.apply(this, args);
    };
  }
</code>

<h4>Throttle через прапорець і через мітку часу</h4>

<p>
  У простої реалізації з ядра є вада: <strong>остання подія серії втрачається</strong>. Якщо користувач смикнув скрол і
  завмер за 50 мс до кінця періоду охолодження, фінальна позиція оброблена не буде. Варіант із міткою часу вміє
  «хвіст»: він або кличе функцію одразу, або планує виклик рівно на момент, коли період спливе.
</p>

<code class="code">
  function throttle(fn, ms) {
    let lastCall = 0;
    let timer = null;

    return function (...args) {
      const rest = ms - (Date.now() - lastCall);

      if (rest <= 0) {              // період вийшов — кличемо негайно
        clearTimeout(timer);
        timer = null;
        lastCall = Date.now();
        fn.apply(this, args);
      } else if (timer === null) {  // інакше плануємо «хвіст» на кінець періоду
        timer = setTimeout(() => {
          lastCall = Date.now();
          timer = null;
          fn.apply(this, args);
        }, rest);
      }
    };
  }
</code>

<h4>Чому function, а не стрілка</h4>

<p>
  Стрілкова функція не має власного <code>this</code> — вона взяла б його з місця, де оголошено <code>debounce</code>.
  Тоді конструкція <code>obj.method = debounce(obj.method, 300)</code> зламалася б: усередині <code>fn</code> замість
  об'єкта опинився б <code>undefined</code>. Тому обгортка — звичайна функція.
</p>

<p>
  А ось колбек усередині <code>setTimeout</code> — навпаки, обов'язково стрілка: вона успадковує <code>this</code>
  обгортки і доносить його до <code>apply</code>. Заміните її на <code>function</code> — і <code>this</code>
  загубиться.
</p>

<p class="info info--orange">
  Наслідок, про який часто забувають: <strong>debounce не може повернути результат</strong> <code>fn</code> — обгортка
  повертає керування задовго до реального виклику. Огорнута функція має працювати через побічний ефект. Якщо результат
  потрібен, обгортка має віддавати Promise і резолвити його в момент виклику.
</p>

<h4>cancel і flush</h4>

<p>
  Таймер, що висить, переживає компонент. Користувач пішов зі сторінки, компонент знищено, а через 300 мс таймер смикає
  колбек, який лізе у вже неіснуючий стан — звідси помилки в консолі та витоки пам'яті. Тому в обгортки роблять метод
  скасування.
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
  <code>cancel()</code> викликають у хуку знищення: <code>ngOnDestroy</code> в Angular, <code>onUnmounted</code> у Vue,
  функція очищення в <code>useEffect</code> у React. Парний метод <code>flush()</code> робить зворотне — виконує
  відкладений виклик негайно. Він потрібен, наприклад, під час надсилання форми, щоб не втратити останнє введення.
</p>

<h4>Тротлінг за кадрами: requestAnimationFrame</h4>

<p>
  Якщо результат обробника впливає на картинку (скрол, перетягування), прив'язувати його до довільних мілісекунд
  безглуздо: браузер усе одно перемалює екран лише в найближчому кадрі. Правильна одиниця вимірювання тут — кадр, а не
  мілісекунда.
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
  Бонус порівняно з <code>setTimeout</code>: у фоновій вкладці браузер сам перестає видавати кадри, і зайві виклики
  припиняються без жодного рядка коду з вашого боку.
</p>

<h4>Готові реалізації</h4>

<ul>
  <li>
    <strong>lodash</strong> — <code>_.debounce</code> і <code>_.throttle</code> з опціями <code>leading</code>,
    <code>trailing</code>, <code>maxWait</code> та методами <code>cancel</code> / <code>flush</code>.
    <code>maxWait</code> закриває вічне відкладання: якщо події йдуть безперервно, звичайний debounce не спрацює
    ніколи, а з <code>maxWait</code> функція все ж викличеться не рідше за вказаний інтервал.
  </li>
  <li>
    <strong>RxJS</strong> — ті самі ідеї як оператори потоку: <code>debounceTime</code>, <code>throttleTime</code>,
    <code>auditTime</code>, <code>sampleTime</code>. Різниця в тому, що огортається не функція, а потік значень, і
    відписка автоматично знімає всі таймери, що висять.
  </li>
</ul>

<h4>Тестування</h4>

<p>
  Тести на реальних таймерах повільні та нестабільні. Фейкові таймери (<code>jest.useFakeTimers()</code> або
  <code>vi.useFakeTimers()</code>) дозволяють перемотати час вручну через
  <code>advanceTimersByTime(300)</code> і перевірити, що після серії з десяти подій вихідна функція була викликана рівно
  один раз.
</p>
