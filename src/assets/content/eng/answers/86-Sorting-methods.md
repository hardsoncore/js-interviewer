<h3>Main Evaluation Criterion: Big O Notation</h3>

<p>In interviews, algorithms are evaluated based on two main parameters:</p>

<p><strong>Time Complexity:</strong> How quickly the execution time grows as the amount of data increases.</p>
<p><strong>Space Complexity:</strong> How much extra memory the algorithm requires.</p>

<h3>1. Bubble Sort</h3>

<p>
  The most intuitive, but least efficient algorithm. It sequentially compares adjacent elements and swaps them if the previous one is greater than the next. This way, the largest elements gradually "bubble up" to the end of the array.
</p>
<p>
  <strong>Time Complexity:</strong> <code>O(n^2)</code> (even if the array is already sorted, the algorithm still performs all comparisons).
</p>
<p>
  <strong>Memory:</strong> <code>O(1)</code> (sorting happens "in-place").
</p>
<p>
  <strong>Advantages:</strong> Extremely simple to implement. Does not require extra memory.
</p>
<p>
  <strong>When to use:</strong> Exclusively for educational purposes. You should not use this algorithm in real production code due to catastrophic performance loss on large arrays.
</p>

<h3>2. Insertion Sort</h3>

<p>
  The algorithm mentally divides the array into two parts: already sorted (at the beginning) and unsorted. At each step, it takes the first element from the unsorted part and sequentially compares it with the sorted elements to find its correct place and "insert" it there, shifting the other elements. The process repeats until all elements are in the sorted part.
</p>
<p>
  <strong>Time Complexity:</strong> <code>O(n^2)</code> in the average and worst cases. In the best case (the array is almost sorted) — <code>O(n)</code>.
</p>
<p>
  <strong>Memory:</strong> <code>O(1)</code>.
</p>
<p>
  <strong>Advantages:</strong> Works very efficiently on small arrays (up to 10-20 elements) and on arrays that are already partially sorted.
</p>
<p>
  <strong>When to use:</strong> As a helper algorithm inside more complex hybrid sorts (for example, the V8 engine uses a variation of <em>Insertion Sort</em> for small subarrays inside <em>TimSort</em>).
</p>

<h3>3. Quick Sort</h3>

<p>
  The algorithm works on the "divide and conquer" principle. It chooses one element from the array as a "pivot" and redistributes the rest: everything smaller than the pivot moves to its left, and everything larger moves to its right. Then, this same process is recursively applied to the resulting left and right parts until all elements line up into the final sorted array.
</p>

<p>
  <strong>Pivot Selection:</strong> A key moment. In practice, a median or random element is often used to avoid the worst-case scenario.
  <br>
  After partitioning, the pivot ends up in its final place, and the algorithm continues sorting the remaining parts.
</p>

<p>
  <strong>Time Complexity:</strong> <code>O(n log n)</code> in the average and best cases. In the worst case (when the minimum or maximum value becomes the pivot every time) — <code>O(n^2)</code>.
</p>
<p>
  <strong>Memory:</strong> <code>O(log n)</code> for the recursion call stack.
</p>
<p>
  <strong>Advantages:</strong> In practice, this is one of the fastest sorting algorithms. Works efficiently with the CPU cache.
</p>
<p>
  <strong>When to use:</strong> A great default option for most general-purpose tasks, as long as sorting stability (preserving the order of equal elements) is not critical.
</p>

<p>
  <strong>Stability:</strong> No. Equal elements can lose their original order. This is the main difference from Merge Sort in the context of sorting complex objects.
</p>

<h3>4. Merge Sort</h3>

<p>
  The algorithm also works on the "divide and conquer" principle. It recursively divides the original array in half until only "indivisible particles" remain — arrays of a single element. Then the reverse process begins: these tiny elements are merged in pairs into new arrays, and at each merge stage, the elements are arranged in order, until the original, but fully sorted, array is finally assembled.
</p>
<p>
  <strong>Time Complexity:</strong> <code>O(n log n)</code> absolutely always (in the best, average, and worst cases).
</p>
<p>
  <strong>Memory:</strong> <code>O(n)</code>, since additional arrays are required for merging.
</p>
<p>
  <strong>Advantages:</strong> Guaranteed high speed regardless of the input data. It is a stable sort (equal elements remain in the same order).
</p>
<p>
  <strong>When to use:</strong> When predictable <code>O(n log n)</code> speed is critical or stability is required when sorting complex objects (for example, sorting objects first by date, then alphabetically). The downside is that it requires more memory.
</p>

<h3>The main takeaway to tell the interviewer:</h3>
<p>
  There is no single "perfect" algorithm. The choice always depends on the context. If memory is limited, we take <em>Quick Sort</em>. If predictability and stability are needed, we take <em>Merge Sort</em>. If the array is tiny or nearly sorted, <em>Insertion Sort</em> will do a great job. Modern JavaScript engines use hybrid algorithms under the hood (for example, <em>TimSort</em>), which combine the best features of <em>Merge Sort</em> and <em>Insertion Sort</em> to achieve maximum efficiency in real-world conditions.
</p>

<p class="deep-dive">Deep Dive Notes</p>

<h3>Real Sorting Algorithms in JavaScript</h3>
<p>
  The V8 engine (Chrome, Node.js) switched to using Timsort (it previously used Quick Sort for large arrays). Meanwhile, SpiderMonkey (Firefox), for example, has historically used Merge Sort.
</p>

<p class="info info--blue">
  It is important to mention that starting with ECMAScript 2019 (ES10), the specification strictly requires the <code>Array.prototype.sort()</code> method to be stable. That is why engines abandoned the unstable Quick Sort in favor of Timsort or Merge Sort.
</p>

<h3>How Timsort Works: Step by Step</h3>

<p>
  <span class="accent">Timsort</span> is a hybrid algorithm that takes the best of Merge Sort (predictability on large data) and Insertion Sort (huge speed on tiny arrays). It is used in the V8 engine (the JavaScript engine in Chrome) and Python.
</p>
<p>
  It is a stable hybrid algorithm with a complexity of <code>O(n log n)</code>. It exploits the fact that real-world data often has partially sorted sections. The algorithm breaks the array into segments (runs), sorting small chunks as needed with the fast Insertion Sort, and then efficiently merges them using a smart Merge Sort, applying optimizations like galloping mode to minimize unnecessary comparisons.
</p>

<h3>1. Finding "Runs"</h3>

<p>The algorithm starts scanning the array from left to right looking for already sorted sequences. Such sequences are called runs.</p>

<p>
  If Timsort finds a strictly descending sequence, it simply reverses it (in-place), turning it into an ascending one in <code>O(n)</code> time.
</p>
<p>
  Thus, the array is split into a series of sorted subarrays (runs).
</p>

<h3>2. Padding to Minrun (Using Insertion Sort)</h3>
<p>
  Working with a bunch of microscopic runs of 2-3 elements is inefficient. Therefore, Timsort introduces the concept of minrun — the minimum allowed run length (usually a number between 32 and 64, which is calculated dynamically depending on the size of the original array).
</p>
<p>
  If the found run is shorter than minrun, Timsort takes the next elements from the array and artificially extends this run to the size of minrun using Insertion Sort.
</p>

<p>
  Why Insertion Sort specifically? Because on arrays of up to 64 elements, this algorithm works lightning-fast, outperforming any other methods.
</p>

<h3>3. Merging</h3>
<p>
  As runs are formed, the algorithm puts information about them (their length and starting index) into a special stack. To prevent the stack from growing too large and to keep the merging balanced (it is much more profitable to merge arrays of roughly the same size), Timsort constantly checks two strict rules (invariants) for the top three elements of the stack (let's call them <code>A</code>, <code>B</code>, and <code>C</code>):
</p>
<p>
  <code>A > B + C</code> and <code>B > C</code>.
</p>

<p>
  If at least one rule is violated, the algorithm merges <code>B</code> with the smaller of arrays <code>A</code> or <code>C</code>, using the classic merge from Merge Sort. This ensures that the lengths of the runs grow as Fibonacci numbers, which provides a perfect performance balance.
</p>

<h3>4. Galloping Mode — Timsort's Superpower</h3>
<p>
  When merging two subarrays (<code>A</code> and <code>B</code>), the algorithm compares the elements one by one. But if it turns out that elements from array <code>A</code> "win" (turn out to be smaller) against elements from array <code>B</code> several times in a row (usually 7 times), Timsort realizes: "It looks like a whole chunk of array <code>A</code> is smaller than the current element of array <code>B</code>."
  <br>
  Then it turns on galloping mode. Instead of comparing the next element of <code>B</code> with <code>A[1]</code>, <code>A[2]</code>, <code>A[3]</code>, it starts jumping exponentially: comparing with <code>A[1]</code>, <code>A[3]</code>, <code>A[7]</code>, <code>A[15]</code>, and so on. As soon as it jumps past the target value, it uses binary search in the last interval to pinpoint the insertion spot. This saves a colossal amount of time on highly structured data.
</p>
