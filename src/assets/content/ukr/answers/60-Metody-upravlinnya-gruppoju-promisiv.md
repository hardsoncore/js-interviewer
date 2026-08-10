<h3>Яку проблему вирішують</h3>
<p><span class="accent">Комбінатори промісів</span> — чотири статичні методи (<code>Promise.all</code>, <code>allSettled</code>, <code>race</code>, <code>any</code>), які приймають ітерований набір промісів і повертають один об'єднувальний проміс. Вони потрібні, коли кілька незалежних асинхронних задач вигідніше виконувати паралельно, а не послідовними <code>await</code>.</p>

<p class="info"><strong>Головна думка:</strong> комбінатори нічого не запускають — проміс виконується з моменту створення. Методи лише підписуються на групу й відрізняються політикою агрегування: чого чекати (всіх чи першого) і що вважати помилкою.</p>

<h3>Чотири методи</h3>
<ul>
  <li><code>Promise.all</code> — «все або нічого»: чекає на успіх усіх і віддає масив результатів у порядку вхідного масиву. Перша ж помилка миттєво валить весь метод із цим же reason. Використовуємо, коли без будь-якого з результатів продовжувати безглуздо.</li>
  <li><code>Promise.allSettled</code> (ES2020) — «дочекатися всіх»: ніколи не реджектиться, віддає масив об'єктів <code>{ status: 'fulfilled', value }</code> або <code>{ status: 'rejected', reason }</code>. Для незалежних задач, де частковий успіх — норма.</li>
  <li><code>Promise.race</code> — «хто швидше»: повторює результат першого завершеного проміса — і успіх, і помилку. Класика — таймаут: гонка запиту з таймером, який реджектиться.</li>
  <li><code>Promise.any</code> (ES2021) — «перший успішний»: помилки ігнорує й чекає на перший fulfilled. Якщо впали всі — реджектиться з <code>AggregateError</code>, де всі причини лежать у властивості <code>errors</code>.</li>
</ul>

<h3>Приклад</h3>
<code class="code">
  // обидва запити йдуть паралельно, результати — у порядку масиву
  const [user, posts] = await Promise.all([
    fetchUser(id),
    fetchPosts(id),
  ]);

  const results = await Promise.allSettled([a, b, c]);
  const ok = results.filter(r => r.status === 'fulfilled');
</code>

<p class="info info--blue">Шпаргалка вибору: потрібні всі результати й будь-який збій критичний — <code>all</code>; потрібні всі результати, включно з помилками — <code>allSettled</code>; потрібен перший результат (таймаут) — <code>race</code>; потрібен перший успіх (запасні джерела) — <code>any</code>.</p>

<p class="info info--orange">Пастка: помилка в <code>Promise.all</code> <strong>не скасовує</strong> решту промісів — вони продовжують виконуватися, просто їхні результати ігноруються. Механізму скасування у промісів немає взагалі; для реального скасування потрібен <code>AbortController</code>.</p>

<p class="deep-dive">Поглиблений конспект</p>

<h3>Як написати Promise.all вручну</h3>
<p>Класичне практичне завдання після цього питання. Ключові деталі: результат кладемо за індексом (а не <code>push</code>), щоб зберегти порядок; не-проміси обгортаємо в <code>Promise.resolve</code>; перший reject прокидаємо одразу.</p>
<code class="code">
  function promiseAll(iterable) {
    return new Promise((resolve, reject) => {
      const results = [];
      let pending = 0;
      let index = 0;

      for (const item of iterable) {
        const i = index++;
        pending++;
        Promise.resolve(item).then(value => {
          results[i] = value; // за індексом — порядок входу, а не завершення
          if (--pending === 0) resolve(results);
        }, reject);
      }

      if (index === 0) resolve([]); // порожній ітерований об'єкт
    });
  }
</code>

<h3>Поведінка на порожньому масиві</h3>
<ul>
  <li><code>Promise.all([])</code> — одразу fulfilled з <code>[]</code>.</li>
  <li><code>Promise.allSettled([])</code> — одразу fulfilled з <code>[]</code>.</li>
  <li><code>Promise.any([])</code> — одразу rejected з <code>AggregateError</code>.</li>
  <li><code>Promise.race([])</code> — <strong>вічний pending</strong>: гонка без учасників не закінчиться ніколи. Джерело рідкісних зависань, коли масив промісів формується динамічно і виявляється порожнім.</li>
</ul>

<h3>Не-проміси та порядок результатів</h3>
<p>Елементи набору, що не є промісами (числа, рядки, звичайні об'єкти), обгортаються в <code>Promise.resolve()</code> і вважаються миттєво успішними. Порядок у масиві результатів <code>all</code> та <code>allSettled</code> завжди повторює порядок входу, а не час завершення — тому результат безпечно деструктурувати. В <code>AggregateError.errors</code> у <code>any</code> порядок теж відповідає вхідному масиву.</p>

<h3>Таймаут через race і справжнє скасування</h3>
<code class="code">
  const timeout = ms => new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Timeout')), ms));

  const data = await Promise.race([fetch(url), timeout(5000)]);
</code>
<p>Гонка з таймером вирішує лише половину задачі: запит, що програв, продовжує висіти в мережі й витрачати ресурси. Для справжнього скасування сигнал <code>AbortController</code> передається у <code>fetch</code>, а сучасний шорткат <code>AbortSignal.timeout(5000)</code> замінює саморобний таймер і реально обриває запит.</p>

<h3>Паралелізм і його обмеження</h3>
<p>Комбінатори не керують ступенем паралелізму: на момент виклику всі проміси вже запущені. Якщо задач сотні (наприклад, завантаження файлів), така «паралельність» упреться в ліміт браузера на одночасні з'єднання. Для обмеження потрібен пул: бібліотека на кшталт p-limit або самописний конвеєр, який тримає не більше N активних задач одночасно.</p>

<p class="info info--blue">Історія: <code>all</code> і <code>race</code> — з ES6 (2015), <code>allSettled</code> — ES2020, <code>any</code> — ES2021. Останні два з'явилися як відповідь на реальні болі: «all падає цілком через одну помилку» та «race ловить першу помилку замість першого успіху».</p>
