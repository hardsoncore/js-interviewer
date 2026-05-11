<h3>What is Big O Notation?</h3>

<p>
  <span class="accent">Big O Notation</span> is a mathematical notation used to describe the asymptotic complexity of algorithms. It allows you to estimate how the execution time or memory usage of an algorithm changes depending on the size of the input data.
  <br>
  <strong>Big O Notation</strong> describes the upper bound (the worst-case or average-case scenario) of how quickly an algorithm's requirements for time (<strong>Time Complexity</strong>) or memory (<strong>Space Complexity</strong>) grow as the input size <strong>(n)</strong> increases.
  <br>
  <strong>Big O Notation</strong> focuses on the most significant factors, ignoring constants and less significant terms, to provide a general idea of an algorithm's performance.
</p>

<p class="info">
  We drop constants. If an algorithm performs <code>2n + 5</code> operations, we say its complexity is <code>O(n)</code>. We are only interested in the growth trend.
</p>

<h3>How to Estimate Time Complexity?</h3>

<p>
  When reading or writing sorting code, pay attention to loops and recursion. These are the main markers of complexity.
</p>

<h4>1. Quadratic Time: <code>O(n^2)</code></h4>

<p>
  If an algorithm contains nested loops, and each loop iterates through all elements of the input data, then its time complexity will be <code>O(n^2)</code>.
</p>

<p>
  <strong>Sorting Example:</strong> Bubble Sort, Selection Sort, Insertion Sort.
</p>

<p>
  Verdict: A disaster for large arrays. Acceptable only for tiny datasets.
</p>

<h4>2. Logarithmic Time: <code>O(log n)</code></h4>

<p>
  The algorithm discards half of the elements at each step or divides the task in half (the "divide and conquer" paradigm).
</p>
<p>
  <strong>Sorting Example:</strong> This is not the time of the sorting itself, but the recursion depth when dividing an array in <strong>Quick Sort</strong> or <strong>Merge Sort</strong>. If we have 8 elements, we only need 3 division steps <code>(2^3 = 8)</code> to reach individual elements.
</p>

<h4>3. Linear-Logarithmic Time: <code>O(n log n)</code></h4>

<p>
  The algorithm performs a linear number of operations at each level of recursion or task division. It is a combination of a linear pass through the array and logarithmic division.
</p>
<p>
  <strong>Sorting Example:</strong> Quick Sort, Merge Sort.
</p>

<p>
  The array is divided in half <code>log n</code> times (this is the logarithmic part). At each level of division, the algorithm needs to perform comparison and merging operations that involve all <code>n</code> elements in total (this is the linear part). Result: <code>n</code> operations multiplied by <code>log n</code> levels.
</p>

<p>
  Verdict: This is the gold standard for efficient sorting algorithms. Suitable for large arrays.
</p>

<h4>4. Linear Time: <code>O(n)</code></h4>

<p>
  The algorithm performs a number of operations proportional to the size of the input data. Usually, this means a single pass through the array.
</p>

<p>
  <strong>Sorting Example:</strong> This is the best-case scenario for optimized Bubble Sort or Insertion Sort when the input is an already sorted array. The algorithm simply makes one pass, confirms everything is in place, and finishes.
</p>

<h3>How to Estimate Space Complexity?</h3>

<p>
  Space complexity estimates how much additional memory (besides the input data) an algorithm requires to do its work.
</p>

<p>
  <strong>O(1) (Constant Memory):</strong> The algorithm sorts elements directly in the original array (in-place) by swapping them using a temporary variable. The size of the array does not matter; the algorithm always needs just a few extra bytes. Examples: Bubble Sort, Insertion Sort.
</p>
<p>
  <strong>O(log n) (Logarithmic Memory):</strong> Usually, this refers to the memory cost of the call stack during recursion. The array itself is sorted in-place, but recursive functions accumulate in memory. Example: Quick Sort.
</p>
<p>
  <strong>O(n) (Linear Memory):</strong> The algorithm needs to create new arrays with a size proportional to the original. If we sort 1 GB of data, the algorithm will "eat" another 1 GB of RAM for copies. Example: Merge Sort.
</p>

<h2>Addition and Multiplication Rules (for interviews)</h2>

<p>
  If an interviewer asks you to estimate the complexity of an algorithm consisting of several steps, remember two rules:
</p>
<p>
  <strong>Sequential steps are added:</strong> If we do one <code>O(n)</code> loop and then another <code>O(n)</code> loop, the total complexity is <code>O(n + n) = O(2n)</code>, which simplifies to <code>O(n)</code>.
</p>
<p>
  <strong>The dominant term wins:</strong> If we have a nested loop <code>O(n^2)</code> followed by a simple loop <code>O(n)</code>, the total complexity will be <code>O(n^2 + n)</code>. However, as <code>n -> infinity</code>, the linear part is ignored. Result: <code>O(n^2)</code>.
</p>
