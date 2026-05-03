
<h3>Структура sql-запросов</h3>

<p>Общая структура запроса выглядит следующим образом:</p>
<code class="code">
  SELECT ('столбцы или * для выбора всех столбцов; обязательно')
  FROM ('таблица; обязательно')
  WHERE ('условие/фильтрация, например, city = 'Kyiv'; необязательно')
  GROUP BY ('столбец, по которому хотим сгруппировать данные; необязательно')
  HAVING ('условие/фильтрация на уровне сгруппированных данных; необязательно')
  ORDER BY ('столбец, по которому хотим отсортировать вывод; необязательно')
</code>
</br>

<h3>Команды SQL, которые должен знать каждый программист:</h3>

<code>
  SELECT, FROM
</code>
<p>
  SELECT, FROM — обязательные элементы запроса, которые определяют выбранные столбцы, их порядок и источник данных.
</p>
<code class="code">
  SELECT &lt;col_name1>, &lt;col_name2>, …
    FROM &lt;table_name>;
</code>
<p>
  Выбрать все (обозначается как *) из таблицы Customers:
</p>
<code class="code">
  SELECT * FROM Customers
</code>
</br>

<code>
  SELECT DISTINCT
</code>
<p>
  В столбцах таблицы могут содержаться повторяющиеся данные. Используйте SELECT DISTINCT для получения только неповторяющихся данных.
</p>
<code class="code">
  SELECT DISTINCT &lt;col_name1>, &lt;col_name2>, …
    FROM &lt;table_name>;
</code>
</br>

<code>
  WHERE
</code>
<p>
  WHERE — необязательный элемент запроса, который используется, когда нужно отфильтровать данные по нужному условию.
  Очень часто внутри элемента where используются IN / NOT IN для фильтрации столбца по нескольким значениям,
  AND / OR для фильтрации таблицы по нескольким столбцам.
  </br>
  Можно использовать ключевое слово WHERE в SELECT для указания условий в запросе:
</p>
<code class="code">
  SELECT &lt;col_name1>, &lt;col_name2>, …
    FROM &lt;table_name>
    WHERE &lt;condition>;
</code>
<p>
  В запросе можно задавать следующие условия:
</p>
<ul>
  <li>сравнение текста;</li>
  <li>сравнение численных значений;</li>
  <li>логические операции AND (и), OR (или) и NOT (отрицание).</li>
</ul>

<p>
  Фильтрация по одному условию и одному значению:
</p>
<code class="code">
  SELECT * FROM Customers
    WHERE City = 'London'
</code>
<p>
  Фильтрация по одному условию и нескольким значениям с применением IN (включение) или NOT IN (исключение):
</p>
<code class="code">
  SELECT * FROM Customers
    WHERE City IN ('London', 'Berlin')
</code>
</br>
<code class="code">
  SELECT * FROM Customers
    WHERE City NOT IN ('Madrid', 'Berlin','Bern')
</code>

<p>
  Фильтрация по нескольким условиям с применением AND (выполняются все условия)
  или OR (выполняется хотя бы одно условие) и нескольким значениям:
</p>
<code class="code">
  SELECT * FROM Customers
    WHERE Country = 'Germany' AND City NOT IN ('Berlin', 'Aachen') AND CustomerID > 15
</code>
</br>
<code class="code">
  SELECT * FROM Customers
    WHERE City IN ('London', 'Berlin') OR CustomerID > 4
</code>
</br>

<code>
  GROUP BY
</code>
<p>
  GROUP BY — необязательный элемент запроса, с помощью которого можно задать агрегацию по нужному столбцу
  (например, если нужно узнать какое количество клиентов живет в каждом из городов).
</p>
<p>
  При использовании GROUP BY обязательно:
</p>

<ol>
  <li>
    перечень столбцов, по которым делается разрез, был одинаковым внутри SELECT и внутри GROUP BY;
  </li>
  <li>
    агрегатные функции (SUM, AVG, COUNT, MAX, MIN) должны быть также указаны внутри SELECT с указанием столбца,
    к которому такая функция применяется.
  </li>
</ol>

<p>
  Группировка количества клиентов по городу:
</p>
<code class="code">
  SELECT City, COUNT(CustomerID) FROM Customers
    GROUP BY City
</code>

<p>
  Группировка количества клиентов по стране и городу:
</p>
<code class="code">
  SELECT Country, City, COUNT(CustomerID) FROM Customers
    GROUP BY Country, City
</code>

<p>
  Группировка продаж по ID товара с разными агрегатными функциями:
  количество заказов с данным товаром и количество проданных штук товара:
</p>
<code class="code">
  SELECT ProductID, COUNT(OrderID), SUM(Quantity) FROM OrderDetails
    GROUP BY ProductID
</code>

<p>
  Группировка продаж с фильтрацией исходной таблицы.
  В данном случае на выходе будет таблица с количеством клиентов по городам Германии:
</p>
<code class="code">
  SELECT City, COUNT(CustomerID) FROM Customers
    WHERE Country = 'Germany'
    GROUP BY City
</code>

<p>
  Переименование столбца с агрегацией с помощью оператора AS.
  По умолчанию название столбца с агрегацией равно примененной агрегатной функции,
  что далее может быть не очень удобно для восприятия.
</p>
<code class="code">
  SELECT City, COUNT(CustomerID) AS Number_of_clients FROM Customers
    GROUP BY City
</code>
</br>

<code>
  HAVING
</code>
<p>
  HAVING — необязательный элемент запроса, который отвечает за фильтрацию на уровне сгруппированных данных
  (по сути, WHERE, но только на уровень выше).
</p>
<p>
  Ключевое слово HAVING было добавлено в SQL по той причине, что WHERE не может использоваться для работы с агрегатными функциями.
</p>

<p>
  Фильтрация агрегированной таблицы с количеством клиентов по городам,
  в данном случае оставляем в выгрузке только те города, в которых не менее 5 клиентов:
</p>
<code class="code">
  SELECT City, COUNT(CustomerID) FROM Customers
    GROUP BY City
    HAVING COUNT(CustomerID) >= 5
</code>

<p>
  В случае с переименованным столбцом внутри HAVING можно указать как и саму агрегирующую конструкцию
  count(CustomerID), так и новое название столбца number_of_clients:
</p>
<code class="code">
  SELECT City, COUNT(CustomerID) AS number_of_clients FROM Customers
    GROUP BY City
    HAVING number_of_clients >= 5
</code>

<p>
  Пример запроса, содержащего WHERE и HAVING.
  В данном запросе сначала фильтруется исходная таблица по пользователям,
  рассчитывается количество клиентов по городам и остаются только те города, где количество клиентов не менее 5:
</p>
<code class="code">
  SELECT City, COUNT(CustomerID) AS number_of_clients FROM Customers
    WHERE CustomerName NOT IN ('Around the Horn','Drachenblut Delikatessend')
    GROUP BY City
    HAVING number_of_clients >= 5
</code>
</br>

<code>
  ORDER BY
</code>
<p>
  ORDER BY используется для сортировки результатов запроса по убыванию или возрастанию.
  ORDER BY отсортирует по возрастанию, если не будет указан способ сортировки ASC или DESC.
</p>
<code class="code">
  SELECT &lt;col_name1>, &lt;col_name2>, …
    FROM &lt;table_name>
    ORDER BY &lt;col_name1>, &lt;col_name2>, … ASC|DESC;
</code>

<p>
  Простой пример сортировки по одному столбцу. В данном запросе осуществляется сортировка по городу, который указал клиент:
</p>
<code class="code">
  SELECT * FROM Customers
    ORDER BY City
</code>

<p>
  Осуществлять сортировку можно и по нескольким столбцам, в этом случае сортировка происходит по порядку указанных столбцов:
</p>
<code class="code">
  SELECT * FROM Customers
    ORDER BY Country, City
</code>

<p>
  По умолчанию сортировка происходит по возрастанию для чисел и в алфавитном порядке для текстовых значений.
  Если нужна обратная сортировка, то в конструкции ORDER BY после названия столбца надо добавить DESC:
</p>
<code class="code">
  SELECT * FROM Customers
    ORDER BY CustomerID DESC
</code>

<p>
  Обратная сортировка по одному столбцу и сортировка по умолчанию по второму:
</p>
<code class="code">
  SELECT * FROM Customers
    ORDER BY Country DESC, City
</code>
</br>

<code>
  BETWEEN
</code>
<p>
  BETWEEN используется для выбора значений данных из определённого промежутка.
  Могут быть использованы числовые и текстовые значения, а также даты.
</p>
<code class="code">
  SELECT &lt;col_name1>, &lt;col_name2>, …
    FROM &lt;table_name>
    WHERE &lt;col_namex> BETWEEN &lt;value1> AND &lt;value2>;
</code>
</br>

<code>
  LIKE
</code>
<p>
  Оператор LIKE используется в WHERE, чтобы задать шаблон поиска похожего значения.
</p>
<p>
  Есть два свободных оператора, которые используются в LIKE:
</p>

<ul>
  <li>% (ни одного, один или несколько символов);</li>
  <li>_ (один символ).</li>
</ul>

<code class="code">
  SELECT &lt;col_name1>, &lt;col_name2>, …
    FROM &lt;table_name>
    WHERE &lt;col_namex> LIKE &lt;pattern>;
</code>
</br>

<code>
  IN
</code>
<p>
  С помощью IN можно указать несколько значений для оператора WHERE:
</p>
<code class="code">
  SELECT &lt;col_name1>, &lt;col_name2>, …
    FROM &lt;table_name>
    WHERE &lt;col_namen> IN (&lt;value1>, &lt;value2>, …);
</code>
</br>

<code>
  JOIN
</code>
<p>
  JOIN — необязательный элемент, используется для объединения таблиц (двух и более) по ключу, который присутствует в обеих таблицах.
  Перед ключом ставится оператор ON.
</p>

<p>
  Запрос, в котором соединяем таблицы Order и Customer по ключу CustomerID,
  при этом перед названиям столбца ключа добавляется название таблицы через точку:
</p>
<code class="code">
  SELECT * FROM Orders
    JOIN Customers ON Orders.CustomerID = Customers.CustomerID
</code>

<p>
  Нередко может возникать ситуация, когда надо промэппить одну таблицу значениями из другой.
  В зависимости от задачи, могут использоваться разные типы присоединений.
  INNER JOIN — пересечение, RIGHT/LEFT JOIN для мэппинга одной таблицы знаениями из другой.
</p>

<p>
  Внутри всего запроса JOIN встраивается после элемента FROM до элемента WHERE, пример запроса:
</p>
<code class="code">
  SELECT * FROM Orders
    JOIN Customers ON Orders.CustomerID = Customers.CustomerID
    WHERE Customers.CustomerID >10
</code>

<p>
  Другие типы JOIN'ов можно увидеть на замечательной картинке ниже:
</p>
<img src="assets/img/join.png">

<p>
  Более подробно про JOIN можно прочитать в прикрепленном материале (см. Источник 2).
</p>

<code>
  VIEW
</code>
<p>
  VIEW — это виртуальная таблица SQL, созданная в результате выполнения выражения.
  Она содержит строки и столбцы и очень похожа на обычную SQL-таблицу. VIEW всегда показывает самую свежую информацию из базы данных.
</p>

<h3>
  Источники:
</h3>

<ul>
  <li>
    <a href="https://habr.com/ru/post/480838/">Источник 1 (основоной)</a>
  </li>
  <li>
    <a href="https://function-x.ru/sql_join.html">Источник 2 (про JOIN и его разновидности)</a>
  </li>
  <li>
    <a href="https://tproger.ru/translations/sql-recap/">Источник 3 (очень краткий конспект с перечнем функций)</a>
  </li>
</ul>
