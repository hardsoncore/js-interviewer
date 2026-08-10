<h3>Какую проблему решают</h3>
<p><span class="accent">Комбинаторы промисов</span> — четыре статических метода (<code>Promise.all</code>, <code>allSettled</code>, <code>race</code>, <code>any</code>), которые принимают итерируемый набор промисов и возвращают один объединяющий промис. Они нужны, когда несколько независимых асинхронных задач выгоднее выполнять параллельно, а не последовательными <code>await</code>.</p>

<p class="info"><strong>Главная мысль:</strong> комбинаторы ничего не запускают — промис выполняется с момента создания. Методы лишь подписываются на группу и различаются политикой агрегирования: чего ждать (всех или первого) и что считать ошибкой.</p>

<h3>Четыре метода</h3>
<ul>
  <li><code>Promise.all</code> — «все или ничего»: ждёт успеха всех и отдаёт массив результатов в порядке входного массива. Первая же ошибка мгновенно роняет весь метод с этим же reason. Используем, когда без любого из результатов продолжать бессмысленно.</li>
  <li><code>Promise.allSettled</code> (ES2020) — «дождаться всех»: никогда не реджектится, отдаёт массив объектов <code>{ status: 'fulfilled', value }</code> или <code>{ status: 'rejected', reason }</code>. Для независимых задач, где частичный успех — норма.</li>
  <li><code>Promise.race</code> — «кто быстрее»: повторяет исход первого завершившегося промиса — и успех, и ошибку. Классика — таймаут: гонка запроса с таймером, который реджектится.</li>
  <li><code>Promise.any</code> (ES2021) — «первый успешный»: ошибки игнорирует и ждёт первый fulfilled. Если упали все — реджектится с <code>AggregateError</code>, где все причины лежат в свойстве <code>errors</code>.</li>
</ul>

<h3>Пример</h3>
<code class="code">
  // оба запроса идут параллельно, результаты — в порядке массива
  const [user, posts] = await Promise.all([
    fetchUser(id),
    fetchPosts(id),
  ]);

  const results = await Promise.allSettled([a, b, c]);
  const ok = results.filter(r => r.status === 'fulfilled');
</code>

<p class="info info--blue">Шпаргалка выбора: нужны все результаты и любой сбой критичен — <code>all</code>; нужны все исходы, включая ошибки — <code>allSettled</code>; нужен первый исход (таймаут) — <code>race</code>; нужен первый успех (запасные источники) — <code>any</code>.</p>

<p class="info info--orange">Ловушка: ошибка в <code>Promise.all</code> <strong>не отменяет</strong> остальные промисы — они продолжают выполняться, просто их результаты игнорируются. Механизма отмены у промисов нет вообще; для реальной отмены нужен <code>AbortController</code>.</p>

<p class="deep-dive">Углубленный конспект</p>

<h3>Как написать Promise.all вручную</h3>
<p>Классическое практическое задание после этого вопроса. Ключевые детали: результат кладём по индексу (а не <code>push</code>), чтобы сохранить порядок; не-промисы оборачиваем в <code>Promise.resolve</code>; первый reject пробрасываем сразу.</p>
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
          results[i] = value; // по индексу — порядок входа, а не завершения
          if (--pending === 0) resolve(results);
        }, reject);
      }

      if (index === 0) resolve([]); // пустой итерируемый объект
    });
  }
</code>

<h3>Поведение на пустом массиве</h3>
<ul>
  <li><code>Promise.all([])</code> — сразу fulfilled с <code>[]</code>.</li>
  <li><code>Promise.allSettled([])</code> — сразу fulfilled с <code>[]</code>.</li>
  <li><code>Promise.any([])</code> — сразу rejected с <code>AggregateError</code>.</li>
  <li><code>Promise.race([])</code> — <strong>вечный pending</strong>: гонка без участников не закончится никогда. Источник редких зависаний, когда массив промисов формируется динамически и оказывается пустым.</li>
</ul>

<h3>Не-промисы и порядок результатов</h3>
<p>Элементы набора, не являющиеся промисами (числа, строки, обычные объекты), оборачиваются в <code>Promise.resolve()</code> и считаются мгновенно успешными. Порядок в массиве результатов <code>all</code> и <code>allSettled</code> всегда повторяет порядок входа, а не время завершения — поэтому результат безопасно деструктурировать. У <code>AggregateError.errors</code> в <code>any</code> порядок тоже соответствует входному массиву.</p>

<h3>Таймаут через race и настоящая отмена</h3>
<code class="code">
  const timeout = ms => new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Timeout')), ms));

  const data = await Promise.race([fetch(url), timeout(5000)]);
</code>
<p>Гонка с таймером решает только половину задачи: проигравший запрос продолжает висеть в сети и тратить ресурсы. Для настоящей отмены сигнал <code>AbortController</code> передаётся в <code>fetch</code>, а современный шорткат <code>AbortSignal.timeout(5000)</code> заменяет самодельный таймер и реально обрывает запрос.</p>

<h3>Параллелизм и его ограничение</h3>
<p>Комбинаторы не управляют степенью параллелизма: к моменту вызова все промисы уже запущены. Если задач сотни (например, загрузка файлов), такая «параллельность» упрётся в лимит браузера на одновременные соединения. Для ограничения нужен пул: библиотека вроде p-limit или самописный конвейер, который держит не больше N активных задач одновременно.</p>

<p class="info info--blue">История: <code>all</code> и <code>race</code> — из ES6 (2015), <code>allSettled</code> — ES2020, <code>any</code> — ES2021. Последние два появились как ответ на реальные боли: «all падает целиком из-за одной ошибки» и «race ловит первую ошибку вместо первого успеха».</p>
