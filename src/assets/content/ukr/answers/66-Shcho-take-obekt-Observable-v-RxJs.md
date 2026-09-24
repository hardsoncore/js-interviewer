
<code><em>Observable</em></code> — це послідовність подій у часі.

<p>
  У RxJS глядач підписується на <code>Observable</code> (видовище).
  Підписаний глядач реагує на кожну подію, яка відбувається під час видовища.
</p>
<p>
  Об'єкти RxJS <code>Observable</code> створюються або за допомогою операторів створення
  (<code>of</code>, <code>from</code>, <code>fromEvent</code>), або через <code>new Observable</code>.
</p>
<p>
  Приклад з оператором <code>of()</code>:
</p>
<code class="code">
  of('Hello').subscribe((vl) => console.log(vl));
</code>

<p>
  Приклад з <code>new Observable</code>:
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
  Кожен <code>Observable</code> може надсилати своїм "глядачам" сповіщення викликом одного з трьох методів:
</p>
<ul>
  <li> <code>next()</code> - надсилання даних, кількість викликів не обмежена;</li>
  <li>
    <code>error()</code> - генерація помилки, параметром вказуються дані будь-якого формату
    (рядок, об'єкт, виняток) про причину її виникнення;
  </li>
  <li>
    <code>complete()</code> - завершення виконання <code>Observable</code>, не приймає
    жодних параметрів і не передає жодного значення.
  </li>
</ul>

<p>
  Але виконання RxJS <code>Observable</code> розпочнеться лише після виклику в нього методу <code>subscribe()</code>,
  який приймає функцію з переданими даними як аргумент.
  Другим і третім необов'язковими параметрами методу <code>subscribe()</code> можна передати функції,
  які буде викликано в разі помилки або (і) завершення <code>Observable</code>.
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
  Виклик <code>error()</code> або <code>complete()</code> автоматично завершує виконання <code>Observable</code>.
</p>
<p>
  Кількість викликів виконання такого об'єкта не обмежена, а сам він навіть не знає, скільки "глядачів" отримує від нього дані.
</p>
<p>
  Метод <code>subscribe()</code> повертає об'єкт типу <code>Subscription</code>, який зберігає поточне виконання
  конкретного RxJS <code>Observable</code> і має єдиний метод <code>unsubscribe()</code>
  для скасування його виконання.
</p>
<code class="code">
  const sub = obs.subscribe();
  sub.unsubscribe();
</code>
<p>
  Виклик <code>unsubscribe()</code> потрібен лише для нескінченно виконуваних
  <code>Observable</code>, інакше зайняті ними ресурси буде звільнено лише із завершенням
  роботи всього застосунку. А отже, у процесі роботи програми може статися витік пам'яті
  або можуть бути створені непотрібні дублюючі "глядачі".
</p>
<p>
  Наприклад, останнє може статися, коли користувач зайшов на сторінку, яка ініціює виконання
  RxJS <code>Observable</code>, потім перейшов на інший URL і повернувся назад.
</p>
<p>
  Нескінченно виконуваними <code>Observable</code> вважаються ті з них, які ніколи не викликають метод
  <code>complete()</code>, навіть якщо в них передбачено сценарій, за якого відбудеться звернення до
  <code>error()</code>, що також завершить виконання.
</p>
<p class="info info--blue">
  У застосунку на Angular <code>unsubscribe()</code> зазвичай викликається на
  стадії життєвого циклу <code>OnDestroy()</code> того компонента, в якому використовується <code>Observable</code>.
</p>
