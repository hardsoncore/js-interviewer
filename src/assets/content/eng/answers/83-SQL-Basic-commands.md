<h3>Structure of SQL Queries</h3>

<p>The general structure of a query looks like this:</p>
<code class="code">
  SELECT ('columns or * to select all columns; required')
  FROM ('table; required')
  WHERE ('condition/filtering, e.g., city = 'Kyiv'; optional')
  GROUP BY ('column by which we want to group the data; optional')
  HAVING ('condition/filtering at the grouped data level; optional')
  ORDER BY ('column by which we want to sort the output; optional')
</code>
<br/>

<h3>SQL Commands Every Programmer Should Know:</h3>

<code>
  SELECT, FROM
</code>
<p>
  SELECT and FROM are required query elements that define the selected columns, their order, and the data source.
</p>
<code class="code">
  SELECT &lt;col_name1>, &lt;col_name2>, …
    FROM &lt;table_name>;
</code>
<p>
  Select all (denoted as *) from the Customers table:
</p>
<code class="code">
  SELECT * FROM Customers
</code>
<br/>

<code>
  SELECT DISTINCT
</code>
<p>
  Table columns may contain duplicate data. Use SELECT DISTINCT to retrieve only unique (non-repeating) data.
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
  WHERE is an optional query element used when you need to filter data by a specific condition.
  Very often, inside the WHERE element, IN / NOT IN are used to filter a column by multiple values,
  and AND / OR are used to filter a table by multiple columns.
  <br/>
  You can use the WHERE keyword in SELECT to specify conditions in a query:
</p>
<code class="code">
  SELECT &lt;col_name1>, &lt;col_name2>, …
    FROM &lt;table_name>
    WHERE &lt;condition>;
</code>
<p>
  You can set the following conditions in a query:
</p>
<ul>
  <li>text comparison;</li>
  <li>numerical value comparison;</li>
  <li>logical operations AND, OR, and NOT (negation).</li>
</ul>

<p>
  Filtering by one condition and one value:
</p>
<code class="code">
  SELECT * FROM Customers
    WHERE City = 'London'
</code>
<p>
  Filtering by one condition and multiple values using IN (inclusion) or NOT IN (exclusion):
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
  Filtering by multiple conditions using AND (all conditions are met)
  or OR (at least one condition is met) and multiple values:
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
  GROUP BY is an optional query element that allows you to aggregate data by a specific column
  (for example, if you need to find out how many customers live in each city).
</p>
<p>
  When using GROUP BY, it is required that:
</p>

<ol>
  <li>
    the list of columns used for slicing is the same inside SELECT and inside GROUP BY;
  </li>
  <li>
    aggregate functions (SUM, AVG, COUNT, MAX, MIN) must also be specified inside SELECT, indicating the column
    to which this function is applied.
  </li>
</ol>

<p>
  Grouping the number of customers by city:
</p>
<code class="code">
  SELECT City, COUNT(CustomerID) FROM Customers
    GROUP BY City
</code>

<p>
  Grouping the number of customers by country and city:
</p>
<code class="code">
  SELECT Country, City, COUNT(CustomerID) FROM Customers
    GROUP BY Country, City
</code>

<p>
  Grouping sales by product ID with different aggregate functions:
  the number of orders with this product and the number of items sold:
</p>
<code class="code">
  SELECT ProductID, COUNT(OrderID), SUM(Quantity) FROM OrderDetails
    GROUP BY ProductID
</code>

<p>
  Grouping sales with filtering of the original table.
  In this case, the output will be a table with the number of customers by cities in Germany:
</p>
<code class="code">
  SELECT City, COUNT(CustomerID) FROM Customers
    WHERE Country = 'Germany'
    GROUP BY City
</code>

<p>
  Renaming a column with aggregation using the AS operator.
  By default, the name of the aggregated column is equal to the applied aggregate function,
  which might not be very convenient to read later.
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
  HAVING is an optional query element responsible for filtering at the level of grouped data
  (essentially, it is WHERE, but one level higher).
</p>
<p>
  The HAVING keyword was added to SQL because WHERE cannot be used to work with aggregate functions.
</p>

<p>
  Filtering an aggregated table with the number of customers by city;
  in this case, we leave in the output only those cities that have at least 5 customers:
</p>
<code class="code">
  SELECT City, COUNT(CustomerID) FROM Customers
    GROUP BY City
    HAVING COUNT(CustomerID) >= 5
</code>

<p>
  In the case of a renamed column, inside HAVING you can specify either the aggregating construct itself,
  like count(CustomerID), or the new column name number_of_clients:
</p>
<code class="code">
  SELECT City, COUNT(CustomerID) AS number_of_clients FROM Customers
    GROUP BY City
    HAVING number_of_clients >= 5
</code>

<p>
  Example of a query containing WHERE and HAVING.
  In this query, the original table is first filtered by users,
  the number of customers by city is calculated, and only those cities where the number of customers is at least 5 remain:
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
  ORDER BY is used to sort query results in descending or ascending order.
  ORDER BY will sort in ascending order if the sorting method ASC or DESC is not specified.
</p>
<code class="code">
  SELECT &lt;col_name1>, &lt;col_name2>, …
    FROM &lt;table_name>
    ORDER BY &lt;col_name1>, &lt;col_name2>, … ASC|DESC;
</code>

<p>
  A simple example of sorting by one column. In this query, sorting is done by the city specified by the customer:
</p>
<code class="code">
  SELECT * FROM Customers
    ORDER BY City
</code>

<p>
  Sorting can also be done by multiple columns; in this case, sorting occurs in the order of the specified columns:
</p>
<code class="code">
  SELECT * FROM Customers
    ORDER BY Country, City
</code>

<p>
  By default, sorting is done in ascending order for numbers and in alphabetical order for text values.
  If you need reverse sorting, you should add DESC after the column name in the ORDER BY construct:
</p>
<code class="code">
  SELECT * FROM Customers
    ORDER BY CustomerID DESC
</code>

<p>
  Reverse sorting by one column and default sorting by the second:
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
  BETWEEN is used to select data values from a certain range.
  Numerical and text values, as well as dates, can be used.
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
  The LIKE operator is used in WHERE to set a search pattern for a similar value.
</p>
<p>
  There are two wildcard operators used in LIKE:
</p>

<ul>
  <li>% (zero, one, or multiple characters);</li>
  <li>_ (a single character).</li>
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
  Using IN, you can specify multiple values for the WHERE operator:
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
  JOIN is an optional element used to combine tables (two or more) based on a key that is present in both tables.
  The ON operator is placed before the key.
</p>

<p>
  A query in which we connect the Orders and Customers tables by the CustomerID key,
  while the table name is added before the key column name separated by a dot:
</p>
<code class="code">
  SELECT * FROM Orders
    JOIN Customers ON Orders.CustomerID = Customers.CustomerID
</code>

<p>
  Often a situation may arise when you need to map one table with values from another.
  Depending on the task, different types of joins can be used.
  INNER JOIN is for intersection, RIGHT/LEFT JOIN is for mapping one table with values from another.
</p>

<p>
  Inside the entire query, JOIN is inserted after the FROM element and before the WHERE element, example query:
</p>
<code class="code">
  SELECT * FROM Orders
    JOIN Customers ON Orders.CustomerID = Customers.CustomerID
    WHERE Customers.CustomerID > 10
</code>

<p>
  Other types of JOINs can be seen in the excellent picture below:
</p>
<img src="assets/img/join.png">

<p>
  You can read more about JOIN in the attached material (see Source 2).
</p>

<code>
  VIEW
</code>
<p>
  VIEW is a virtual SQL table created as a result of an expression execution.
  It contains rows and columns and is very similar to a regular SQL table. VIEW always shows the most up-to-date information from the database.
</p>

<h3>
  Sources:
</h3>

<ul>
  <li>
    <a href="https://habr.com/ru/post/480838/">Source 1 (main)</a>
  </li>
  <li>
    <a href="https://function-x.ru/sql_join.html">Source 2 (about JOIN and its types)</a>
  </li>
  <li>
    <a href="https://tproger.ru/translations/sql-recap/">Source 3 (a very brief summary with a list of functions)</a>
  </li>
</ul>
