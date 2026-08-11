<h3>Введение</h3>
<p><span class="accent">Реактивное программирование</span> — парадигма, в которой данные представляются как асинхронные потоки (streams), а код декларативно описывает реакции на новые значения. <span class="accent">RxJS</span> (Reactive Extensions for JavaScript) — главная реализация этой парадигмы в JS: библиотека на основе паттерна Observer.</p>

<p class="info"><strong>Главная мысль:</strong> всё, что происходит во времени — клики, ввод, HTTP-ответы, веб-сокеты — можно описать одним интерфейсом «поток значений» и обрабатывать единообразно: подписался, преобразовал операторами, отписался.</p>

<h3>Поток и push vs pull</h3>
<p><span class="accent">Поток</span> — последовательность событий, упорядоченная во времени. Он может выдать значение, ошибку или сигнал завершения.</p>
<p>Ключ к пониманию — кто решает, когда придут данные. Вызов функции или итератора — это <strong>pull</strong>: потребитель сам «вытягивает» значение. Promise и Observable — это <strong>push</strong>: поставщик сам «толкает» данные подписчику. Отличие Observable от Promise: значений может быть сколько угодно, он ленив (не запускается до подписки), и подписку можно отменить.</p>

<h3>Какие проблемы решает RxJS</h3>
<ul>
  <li><strong>Множественные значения:</strong> Promise отдаёт результат один раз, Observable — непрерывно (координаты мыши, сообщения чата).</li>
  <li><strong>Отмена:</strong> <code>unsubscribe()</code> прерывает работу — например, висящий HTTP-запрос.</li>
  <li><strong>Композиция:</strong> десятки готовых операторов для фильтрации, трансформации и объединения потоков.</li>
  <li><strong>Состояние:</strong> <code>BehaviorSubject</code> хранит текущее значение и реактивно раздаёт его подписчикам.</li>
</ul>

<h3>Базовые сущности</h3>
<ul>
  <li><code>Observable</code> — сам поток данных; ничего не делает, пока на него не подпишутся.</li>
  <li><code>Observer</code> — потребитель: объект с методами <code>next</code>, <code>error</code>, <code>complete</code>.</li>
  <li><code>Subscription</code> — результат <code>subscribe()</code>; через него отписываются.</li>
  <li><code>Subject</code> — Observable и Observer одновременно: вещает многим подписчикам (multicast).</li>
</ul>

<h3>Операторы и pipe()</h3>
<p><span class="accent">Операторы</span> — чистые функции для манипуляции потоком, объединяются в цепочку методом <code>pipe()</code>. Классический пример — поиск с автодополнением:</p>
<code class="code">
  fromEvent(input, 'input').pipe(
    map(e =&gt; e.target.value),
    filter(text =&gt; text.length &gt; 2),
    switchMap(text =&gt; this.http.get(`/api?q=${text}`)) // отменяет предыдущий запрос
  ).subscribe(showResults);
</code>
<p>Основные семьи: создание (<code>of</code>, <code>from</code>, <code>fromEvent</code>), трансформация (<code>map</code>), фильтрация (<code>filter</code>, <code>takeUntil</code>), высшего порядка (<code>switchMap</code>, <code>mergeMap</code>), комбинирование (<code>combineLatest</code>, <code>forkJoin</code>).</p>

<p class="info info--orange">Частая ошибка: подписка без отписки — утечка памяти. В Angular предпочитай <code>async</code> pipe в шаблоне или <code>takeUntil</code> / <code>takeUntilDestroyed</code> вместо ручного <code>unsubscribe()</code>.</p>

<p class="deep-dive">Углубленный конспект</p>

<h3>Матрица pull/push</h3>
<ul>
  <li><strong>Функция</strong> — pull, одно значение: вызвал — получил.</li>
  <li><strong>Итератор / генератор</strong> — pull, много значений: потребитель тянет по одному через <code>next()</code>.</li>
  <li><strong>Promise</strong> — push, одно значение: поставщик сам вызовет колбэк, но ровно раз.</li>
  <li><strong>Observable</strong> — push, много значений: заполняет пустовавшую ячейку матрицы, ради этого RxJS и существует.</li>
</ul>

<h3>Ленивость и unicast</h3>
<p>Обычный Observable «холодный»: продюсер данных создаётся заново при каждой подписке, каждый подписчик получает свой независимый поток. Subject — «горячий»: вещает независимо от подписок, все слушают один источник. Это отдельная большая тема (Observable vs Subject).</p>

<h3>Почему декларативный код надёжнее</h3>
<p>В императивном варианте автодополнение требует ручных флагов: «идёт ли сейчас запрос», «не устарел ли ответ», «сколько прошло с последнего ввода». В реактивном — всё промежуточное состояние живёт внутри потока, а код описывает только взаимосвязь событий бизнес-логики. Кода меньше, и в нём негде забыть сбросить флаг.</p>

<h3>RxJS в Angular</h3>
<ul>
  <li><code>HttpClient</code> возвращает холодный Observable: запрос уходит только после подписки.</li>
  <li><code>Router.events</code>, <code>ActivatedRoute.params</code>, <code>valueChanges</code> реактивных форм — всё потоки.</li>
  <li><code>async</code> pipe подписывается, отписывается при уничтожении компонента и триггерит change detection.</li>
</ul>

<h3>Scheduler и историческая справка</h3>
<p><code>Scheduler</code> управляет тем, когда и в каком контексте выполнится подписка (синхронно, микрозадача, макрозадача, кадр анимации) — используется редко, но полезен в тестах (marble testing с виртуальным временем).</p>
<p>RxJS — порт ReactiveX: концепция родилась в Rx.NET (Эрик Мейер, Microsoft), затем распространилась как RxJava, RxSwift и т.д. Поэтому API узнаваем на разных платформах.</p>
