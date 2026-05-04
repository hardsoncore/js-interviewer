<h3>Структура sql-запитів</h3>

<p>Загальна структура запиту виглядає наступним чином:</p>
<code class="code">
  SELECT ('стовпці або * для вибору всіх стовпців; обов'язково')
  FROM ('таблиця; обов'язково')
  WHERE ('умова/фільтрація, наприклад, city = 'Kyiv'; необов'язково')
  GROUP BY ('стовпець, за яким хочемо згрупувати дані; необов'язково')
  HAVING ('умова/фільтрація на рівні згрупованих даних; необов'язково')
  ORDER BY ('стовпець, за яким хочемо відсортувати вивід; необов'язково')
</code>
<br/>

<h3>Команди SQL, які повинен знати кожен програміст:</h3>

<code>
  SELECT, FROM
</code>
<p>
  SELECT, FROM — обов'язкові елементи запиту, які визначають обрані стовпці, їхній порядок та джерело даних.
</p>
<code class="code">
  SELECT &lt;col_name1>, &lt;col_name2>, …
    FROM &lt;table_name>;
</code>
<p>
  Вибрати все (позначається як *) з таблиці Customers:
</p>
<code class="code">
  SELECT * FROM Customers
</code>
<br/>

<code>
  SELECT DISTINCT
</code>
<p>
  У стовпцях таблиці можуть міститися повторювані дані. Використовуйте SELECT DISTINCT для отримання лише унікальних (неповторюваних) даних.
</p>
<code class="code">
  SELECT DISTINCT &lt;col_name1>, &lt;col_name2>, …
    FROM &lt;table_name>;
</code>
<br/>

<code>
  WHERE
</code>
<p>
  WHERE — необов'язковий елемент запиту, який використовується, коли потрібно відфільтрувати дані за певною умовою.
  Дуже часто всередині елемента WHERE використовуються IN / NOT IN для фільтрації стовпця за кількома значеннями,
  AND / OR для фільтрації таблиці за кількома стовпцями.
  <br/>
  Можна використовувати ключове слово WHERE в SELECT для вказівки умов у запиті:
</p>
<code class="code">
  SELECT &lt;col_name1>, &lt;col_name2>, …
    FROM &lt;table_name>
    WHERE &lt;condition>;
</code>
<p>
  У запиті можна задавати такі умови:
</p>
<ul>
  <li>порівняння тексту;</li>
  <li>порівняння числових значень;</li>
  <li>логічні операції AND (та), OR (або) і NOT (заперечення).</li>
</ul>

<p>
  Фільтрація за однією умовою та одним значенням:
</p>
<code class="code">
  SELECT * FROM Customers
    WHERE City = 'London'
</code>
<p>
  Фільтрація за однією умовою та кількома значеннями із застосуванням IN (включення) або NOT IN (виключення):
</p>
<code class="code">
  SELECT * FROM Customers
    WHERE City IN ('London', 'Berlin')
</code>
<br/>
<code class="code">
  SELECT * FROM Customers
    WHERE City NOT IN ('Madrid', 'Berlin', 'Bern')
</code>

<p>
  Фільтрація за кількома умовами із застосуванням AND (виконуються всі умови)
  або OR (виконується хоча б одна умова) і кількома значеннями:
</p>
<code class="code">
  SELECT * FROM Customers
    WHERE Country = 'Germany' AND City NOT IN ('Berlin', 'Aachen') AND CustomerID > 15
</code>
<br/>
<code class="code">
  SELECT * FROM Customers
    WHERE City IN ('London', 'Berlin') OR CustomerID > 4
</code>
<br/>

<code>
  GROUP BY
</code>
<p>
  GROUP BY — необов'язковий елемент запиту, за допомогою якого можна задати агрегацію за потрібним стовпцем
  (наприклад, якщо потрібно дізнатися, яка кількість клієнтів живе в кожному з міст).
</p>
<p>
  При використанні GROUP BY обов'язково:
</p>

<ol>
  <li>
    щоб перелік стовпців, за якими робиться розріз, був однаковим усередині SELECT і всередині GROUP BY;
  </li>
  <li>
    агрегатні функції (SUM, AVG, COUNT, MAX, MIN) повинні бути також вказані всередині SELECT із зазначенням стовпця,
    до якого ця функція застосовується.
  </li>
</ol>

<p>
  Групування кількості клієнтів за містом:
</p>
<code class="code">
  SELECT City, COUNT(CustomerID) FROM Customers
    GROUP BY City
</code>

<p>
  Групування кількості клієнтів за країною та містом:
</p>
<code class="code">
  SELECT Country, City, COUNT(CustomerID) FROM Customers
    GROUP BY Country, City
</code>

<p>
  Групування продажів за ID товару з різними агрегатними функціями:
  кількість замовлень з даним товаром та кількість проданих одиниць товару:
</p>
<code class="code">
  SELECT ProductID, COUNT(OrderID), SUM(Quantity) FROM OrderDetails
    GROUP BY ProductID
</code>

<p>
  Групування продажів з фільтрацією вихідної таблиці.
  У цьому випадку на виході буде таблиця з кількістю клієнтів у містах Німеччини:
</p>
<code class="code">
  SELECT City, COUNT(CustomerID) FROM Customers
    WHERE Country = 'Germany'
    GROUP BY City
</code>

<p>
  Перейменування стовпця з агрегацією за допомогою оператора AS.
  За замовчуванням назва стовпця з агрегацією дорівнює застосованій агрегатній функції,
  що надалі може бути не дуже зручно для сприйняття.
</p>
<code class="code">
  SELECT City, COUNT(CustomerID) AS Number_of_clients FROM Customers
    GROUP BY City
</code>
<br/>

<code>
  HAVING
</code>
<p>
  HAVING — необов'язковий елемент запиту, який відповідає за фільтрацію на рівні згрупованих даних
  (по суті, WHERE, але на рівень вище).
</p>
<p>
  Ключове слово HAVING було додано в SQL з тієї причини, що WHERE не може використовуватися для роботи з агрегатними функціями.
</p>

<p>
  Фільтрація агрегованої таблиці з кількістю клієнтів за містами,
  у цьому випадку залишаємо у вивантаженні лише ті міста, в яких не менше 5 клієнтів:
</p>
<code class="code">
  SELECT City, COUNT(CustomerID) FROM Customers
    GROUP BY City
    HAVING COUNT(CustomerID) >= 5
</code>

<p>
  У випадку з перейменованим стовпцем усередині HAVING можна вказати як саму агрегуючу конструкцію
  count(CustomerID), так і нову назву стовпця number_of_clients:
</p>
<code class="code">
  SELECT City, COUNT(CustomerID) AS number_of_clients FROM Customers
    GROUP BY City
    HAVING number_of_clients >= 5
</code>

<p>
  Приклад запиту, що містить WHERE і HAVING.
  У цьому запиті спочатку фільтрується вихідна таблиця за користувачами,
  розраховується кількість клієнтів за містами і залишаються тільки ті міста, де кількість клієнтів не менше 5:
</p>
<code class="code">
  SELECT City, COUNT(CustomerID) AS number_of_clients FROM Customers
    WHERE CustomerName NOT IN ('Around the Horn', 'Drachenblut Delikatessend')
    GROUP BY City
    HAVING number_of_clients >= 5
</code>
<br/>

<code>
  ORDER BY
</code>
<p>
  ORDER BY використовується для сортування результатів запиту за спаданням або зростанням.
  ORDER BY відсортує за зростанням, якщо не буде вказано спосіб сортування ASC або DESC.
</p>
<code class="code">
  SELECT &lt;col_name1>, &lt;col_name2>, …
    FROM &lt;table_name>
    ORDER BY &lt;col_name1>, &lt;col_name2>, … ASC|DESC;
</code>

<p>
  Простий приклад сортування за одним стовпцем. У даному запиті здійснюється сортування за містом, яке вказав клієнт:
</p>
<code class="code">
  SELECT * FROM Customers
    ORDER BY City
</code>

<p>
  Здійснювати сортування можна і за кількома стовпцями, у цьому випадку сортування відбувається за порядком вказаних стовпців:
</p>
<code class="code">
  SELECT * FROM Customers
    ORDER BY Country, City
</code>

<p>
  За замовчуванням сортування відбувається за зростанням для чисел і в алфавітному порядку для текстових значень.
  Якщо потрібне зворотне сортування, то в конструкції ORDER BY після назви стовпця треба додати DESC:
</p>
<code class="code">
  SELECT * FROM Customers
    ORDER BY CustomerID DESC
</code>

<p>
  Зворотне сортування за одним стовпцем і сортування за замовчуванням за другим:
</p>
<code class="code">
  SELECT * FROM Customers
    ORDER BY Country DESC, City
</code>
<br/>

<code>
  BETWEEN
</code>
<p>
  BETWEEN використовується для вибору значень даних з певного проміжку.
  Можуть бути використані числові та текстові значення, а також дати.
</p>
<code class="code">
  SELECT &lt;col_name1>, &lt;col_name2>, …
    FROM &lt;table_name>
    WHERE &lt;col_namex> BETWEEN &lt;value1> AND &lt;value2>;
</code>
<br/>

<code>
  LIKE
</code>
<p>
  Оператор LIKE використовується в WHERE, щоб задати шаблон пошуку схожого значення.
</p>
<p>
  Є два символи підстановки, які використовуються в LIKE:
</p>

<ul>
  <li>% (жодного, один або кілька символів);</li>
  <li>_ (один символ).</li>
</ul>

<code class="code">
  SELECT &lt;col_name1>, &lt;col_name2>, …
    FROM &lt;table_name>
    WHERE &lt;col_namex> LIKE &lt;pattern>;
</code>
<br/>

<code>
  IN
</code>
<p>
  За допомогою IN можна вказати кілька значень для оператора WHERE:
</p>
<code class="code">
  SELECT &lt;col_name1>, &lt;col_name2>, …
    FROM &lt;table_name>
    WHERE &lt;col_namen> IN (&lt;value1>, &lt;value2>, …);
</code>
<br/>

<code>
  JOIN
</code>
<p>
  JOIN — необов'язковий елемент, використовується для об'єднання таблиць (двох і більше) за ключем, який присутній в обох таблицях.
  Перед ключем ставиться оператор ON.
</p>

<p>
  Запит, у якому з'єднуємо таблиці Orders і Customers за ключем CustomerID,
  при цьому перед назвою стовпця ключа додається назва таблиці через крапку:
</p>
<code class="code">
  SELECT * FROM Orders
    JOIN Customers ON Orders.CustomerID = Customers.CustomerID
</code>

<p>
  Нерідко може виникати ситуація, коли треба змапити (співставити) одну таблицю зі значеннями з іншої.
  Залежно від завдання, можуть використовуватися різні типи об'єднань.
  INNER JOIN — перетин, RIGHT/LEFT JOIN для мапінгу однієї таблиці значеннями з іншої.
</p>

<p>
  Усередині всього запиту JOIN вбудовується після елемента FROM до елемента WHERE, приклад запиту:
</p>
<code class="code">
  SELECT * FROM Orders
    JOIN Customers ON Orders.CustomerID = Customers.CustomerID
    WHERE Customers.CustomerID > 10
</code>

<p>
  Інші типи JOIN'ів можна побачити на чудовій картинці нижче:
</p>
<img src="assets/img/join.png">

<p>
  Детальніше про JOIN можна прочитати у прикріпленому матеріалі (див. Джерело 2).
</p>

<code>
  VIEW
</code>
<p>
  VIEW — це віртуальна таблиця SQL, створена в результаті виконання виразу.
  Вона містить рядки та стовпці і дуже схожа на звичайну SQL-таблицю. VIEW завжди показує найсвіжішу інформацію з бази даних.
</p>

<h3>
  Джерела:
</h3>

<ul>
  <li>
    <a href="https://habr.com/ru/post/480838/">Джерело 1 (основне)</a>
  </li>
  <li>
    <a href="https://function-x.ru/sql_join.html">Джерело 2 (про JOIN та його різновиди)</a>
  </li>
  <li>
    <a href="https://tproger.ru/translations/sql-recap/">Джерело 3 (дуже короткий конспект із переліком функцій)</a>
  </li>
</ul>
