<h3>Partial Application</h3>

<p>
  <span class="accent">Partial application</span> is the process of creating a new function by
  fixing (pre-setting) one or more arguments of an existing function.
</p>
<p>
  In simple terms: we have a function that takes several arguments. We "freeze"
  some of them and get a new function that only accepts the remaining arguments.
</p>

<p class="info info--blue">
  Partial application is based on currying, but does not require providing all arguments at once.
</p>

<code class="code">
  function curry(f) { // curry(f) performs currying
    return function(a) {
      return function(b) {
        return f(a, b);
      };
    };
  }

  function sum(a, b) {
    return a + b;
  }

  const curriedSum = curry(sum);
  const plusTwo = curriedSum(2); // returns a function waiting for the second argument

  alert( plusTwo(3) ); // 5
</code>

<h4>Practical Applications of Partial Application:</h4>

<ul>
  <li><strong>Simplifying code reuse:</strong> Partial application allows creating specialized functions based on more general ones, making code easier to reuse.</li>
  <li><strong>Improving readability:</strong> Functions with fixed arguments can be clearer and easier to read, especially when used in multiple places.</li>
  <li><strong>Creating new functions from existing ones:</strong> Partial application allows you to easily create new functions without modifying the original one, promoting a more flexible code design.</li>
</ul>

<h3>Function Composition</h3>

<p>
  <span class="accent">Function composition</span> is the process of combining two or more functions to create a new function.
  <br>
  The result of composition is a function that executes all functions in order, passing the result
  of one function to the next.
</p>

<p>
  Imagine we have two simple tasks: add 10 to a number and turn the result into a currency string.
</p>

<code class="code">
  const addTen = (n: number): number => n + 10;
  const formatPrice = (n: number): string => `$${n}`;

  // Standard call (nesting)
  const result = formatPrice(addTen(5)); // "$15"
</code>

<p>
  This is composition in its most basic form. But when you have 5 or 10 functions, the code turns into a "nesting doll" of parentheses: <code>f(g(h(z(x))))</code>, which is very hard to read.
</p>

<h3>Compose vs Pipe</h3>
In programming (especially in the functional approach), helper functions are used to turn this nesting into a chain.

<h4>1. Compose (Right to Left)</h4>

<p>Executes functions in reverse order of how they are written (as in mathematics).</p>

<code class="code">
  const compose = &lt;T>(f: (arg: T) => T, g: (arg: T) => T) => (x: T) => f(g(x));

  const complexAction = compose(formatPrice, addTen);
  console.log(complexAction(5)); // "$15"
</code>

<h4>2. Pipe (Left to Right)</h4>
<p>A more intuitive option for developers: data flows from top to bottom or left to right. You might have seen this in RxJS (which is extensively used in Angular).</p>

<code class="code">
  const result = pipe(
    5,
    addTen,      // 15
    formatPrice  // "$15"
  );
</code>
