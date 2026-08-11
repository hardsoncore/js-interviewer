<h3>Вступ</h3>
<p><span class="accent">Реактивне програмування</span> — парадигма, у якій дані представляються як асинхронні потоки (streams), а код декларативно описує реакції на нові значення. <span class="accent">RxJS</span> (Reactive Extensions for JavaScript) — головна реалізація цієї парадигми в JS: бібліотека на основі патерна Observer.</p>

<p class="info"><strong>Головна думка:</strong> усе, що відбувається в часі — кліки, введення, HTTP-відповіді, вебсокети — можна описати одним інтерфейсом «потік значень» і обробляти однаково: підписався, перетворив операторами, відписався.</p>

<h3>Потік і push vs pull</h3>
<p><span class="accent">Потік</span> — послідовність подій, упорядкована в часі. Він може видати значення, помилку або сигнал завершення.</p>
<p>Ключ до розуміння — хто вирішує, коли прийдуть дані. Виклик функції чи ітератора — це <strong>pull</strong>: споживач сам «витягує» значення. Promise і Observable — це <strong>push</strong>: постачальник сам «штовхає» дані підписнику. Відмінність Observable від Promise: значень може бути скільки завгодно, він лінивий (не запускається до підписки), і підписку можна скасувати.</p>

<h3>Які проблеми вирішує RxJS</h3>
<ul>
  <li><strong>Множинні значення:</strong> Promise віддає результат один раз, Observable — безперервно (координати миші, повідомлення чату).</li>
  <li><strong>Скасування:</strong> <code>unsubscribe()</code> перериває роботу — наприклад, HTTP-запит, що завис.</li>
  <li><strong>Композиція:</strong> десятки готових операторів для фільтрації, трансформації та об'єднання потоків.</li>
  <li><strong>Стан:</strong> <code>BehaviorSubject</code> зберігає поточне значення і реактивно роздає його підписникам.</li>
</ul>

<h3>Базові сутності</h3>
<ul>
  <li><code>Observable</code> — сам потік даних; нічого не робить, доки на нього не підпишуться.</li>
  <li><code>Observer</code> — споживач: об'єкт із методами <code>next</code>, <code>error</code>, <code>complete</code>.</li>
  <li><code>Subscription</code> — результат <code>subscribe()</code>; через нього відписуються.</li>
  <li><code>Subject</code> — Observable і Observer одночасно: транслює багатьом підписникам (multicast).</li>
</ul>

<h3>Оператори та pipe()</h3>
<p><span class="accent">Оператори</span> — чисті функції для маніпуляції потоком, об'єднуються в ланцюжок методом <code>pipe()</code>. Класичний приклад — пошук з автодоповненням:</p>
<code class="code">
  fromEvent(input, 'input').pipe(
    map(e =&gt; e.target.value),
    filter(text =&gt; text.length &gt; 2),
    switchMap(text =&gt; this.http.get(`/api?q=${text}`)) // скасовує попередній запит
  ).subscribe(showResults);
</code>
<p>Основні сім'ї: створення (<code>of</code>, <code>from</code>, <code>fromEvent</code>), трансформація (<code>map</code>), фільтрація (<code>filter</code>, <code>takeUntil</code>), вищого порядку (<code>switchMap</code>, <code>mergeMap</code>), комбінування (<code>combineLatest</code>, <code>forkJoin</code>).</p>

<p class="info info--orange">Часта помилка: підписка без відписки — витік пам'яті. В Angular віддавай перевагу <code>async</code> pipe у шаблоні або <code>takeUntil</code> / <code>takeUntilDestroyed</code> замість ручного <code>unsubscribe()</code>.</p>

<p class="deep-dive">Поглиблений конспект</p>

<h3>Матриця pull/push</h3>
<ul>
  <li><strong>Функція</strong> — pull, одне значення: викликав — отримав.</li>
  <li><strong>Ітератор / генератор</strong> — pull, багато значень: споживач тягне по одному через <code>next()</code>.</li>
  <li><strong>Promise</strong> — push, одне значення: постачальник сам викличе колбек, але рівно раз.</li>
  <li><strong>Observable</strong> — push, багато значень: заповнює порожню комірку матриці, заради цього RxJS і існує.</li>
</ul>

<h3>Лінивість і unicast</h3>
<p>Звичайний Observable «холодний»: продюсер даних створюється заново при кожній підписці, кожен підписник отримує свій незалежний потік. Subject — «гарячий»: транслює незалежно від підписок, усі слухають одне джерело. Це окрема велика тема (Observable vs Subject).</p>

<h3>Чому декларативний код надійніший</h3>
<p>В імперативному варіанті автодоповнення вимагає ручних прапорців: «чи йде зараз запит», «чи не застаріла відповідь», «скільки минуло з останнього введення». У реактивному — весь проміжний стан живе всередині потоку, а код описує лише взаємозв'язок подій бізнес-логіки. Коду менше, і в ньому ніде забути скинути прапорець.</p>

<h3>RxJS в Angular</h3>
<ul>
  <li><code>HttpClient</code> повертає холодний Observable: запит іде лише після підписки.</li>
  <li><code>Router.events</code>, <code>ActivatedRoute.params</code>, <code>valueChanges</code> реактивних форм — усе потоки.</li>
  <li><code>async</code> pipe підписується, відписується при знищенні компонента і тригерить change detection.</li>
</ul>

<h3>Scheduler та історична довідка</h3>
<p><code>Scheduler</code> керує тим, коли і в якому контексті виконається підписка (синхронно, мікрозадача, макрозадача, кадр анімації) — використовується рідко, але корисний у тестах (marble testing з віртуальним часом).</p>
<p>RxJS — порт ReactiveX: концепція народилася в Rx.NET (Ерік Мейєр, Microsoft), потім поширилася як RxJava, RxSwift тощо. Тому API впізнаваний на різних платформах.</p>
