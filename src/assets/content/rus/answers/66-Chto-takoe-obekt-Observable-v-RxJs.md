
<code><em>Observable</em></code> — это последовательность событий во времени.

<p>
  В RxJS зритель подписывается на <code>Observable</code> (зрелище).
  Подписавшийся зритель реагирует на каждое событие, которое происходит во время зрелища.
</p>
<p>
  Объекты RxJS <code>Observable</code> создаются либо с использованием операторов создания
  (<code>of</code>, <code>from</code>, <code>fromEvent</code>), либо через <code>new Observable</code>.
</p>
<p>
  Пример с оператором <code>of()</code>:
</p>
<code class="code">
  of('Hello').subscribe((vl) => console.log(vl));
</code>

<p>
  Пример с <code>new Observable</code>:
</p>
<code class="code">
  const obs = new Observable((sub) => {
    sub.next(1);

    setTimeout(() => {
      sub.next(3);
      sub.complete();
    }, 500);
  });

  obs.subscribe((vl) => console.log(vl));
</code>
<p>
  Каждый <code>Observable</code> может отправлять своим "зрителям" уведомления вызовом одного из трех методов:
</p>
<ul>
  <li> <code>next()</code> - отправка данных, количество вызовов не ограничено;</li>
  <li>
    <code>error()</code> - генерация ошибки, параметром указываются данные любого формата
    (строка, объект, исключение) о причине ее возникновения;
  </li>
  <li>
    <code>complete()</code> - завершение исполнения <code>Observable</code>, не принимает
    никаких параметров и не передает никакого значения.
  </li>
</ul>

<p>
  Но исполнение RxJS <code>Observable</code> начнется только после вызова у него метода <code>subscribe()</code>,
  который принимает функцию с передаваемыми данными в качестве аргумента.
  Вторым и третьим необязательными параметрами методу <code>subscribe()</code> можно передать функции,
  которые будут вызваны в случае ошибки или (и) завершения <code>Observable</code>.
</p>
<code class="code">
  const obs = new Observable((sub) => {
    sub.next(1);

    setTimeout(() => {
      sub.error(3);
    }, 500);
  });

  obs.subscribe(
    (vl) => console.log(vl),
    (err) => console.log('Error: ', err),
    () => console.log('Completed')
  );
</code>
<p class="info info--blue">
  Вызов <code>error()</code> или <code>complete()</code> автоматически завершает исполнение <code>Observable</code>.
</p>
<p>
  Количество вызовов исполнения такого объекта не ограничено, а сам он даже не знает, сколько "зрителей" получает от него данные.
</p>
<p>
  Метод <code>subscribe()</code> возвращает объект типа <code>Subscription</code>, который хранит текущее исполнение
  конкретного RxJS <code>Observable</code> и имеет единственный метод <code>unsubscribe()</code>
  для отмены его исполнения.
</p>
<code class="code">
  const sub = obs.subscribe();
  sub.unsubscribe();
</code>
<p>
  Вызов <code>unsubscribe()</code> нужен только для бесконечно исполняемых
  <code>Observable</code>, иначе занимаемые ими ресурсы будут освобождены только с окончанием
  работы всего приложения. А значит в процессе работы программы может произойти утечка памяти
  или могут быть созданы ненужные дублирующиеся "зрители".
</p>
<p>
  Например, последнее может произойти, когда пользователь зашел на страницу, инициирующую исполнение
  RxJS <code>Observable</code>, затем перешел на другой URL и вернулся обратно.
</p>
<p>
  Бесконечно исполняемыми <code>Observable</code> считаются те из них, которые никогда не вызывают метод
  <code>complete()</code>, даже если у них предусмотрен сценарий, при котором произойдет обращение к
  <code>error()</code>, что также завершит исполнение.
</p>
<p class="info info--blue">
  В Angular приложении <code>unsubscribe()</code> обычно вызывается на
  стадии жизненного цикла <code>OnDestroy()</code> того компонента, в котором используется <code>Observable</code>.
</p>
    