<h3>Why do we need Try...Catch?</h3>

<p><span class="accent">Try...Catch</span> is a JavaScript construct that allows you to handle errors that occur during code execution. It consists of two main blocks: <code>try</code> and <code>catch</code>.</p>

<p>Error-free code is the ideal we strive for. However, in real life, there is always a chance of errors. For example, a server might crash, a user might enter incorrect data, or an API might return broken JSON. If you don't handle these situations, the script execution simply stops, and the user sees a "white screen."</p>



<h3>Preventing Crashes (Graceful Failure)</h3>
<p>The main goal is to keep the application from "dying." When an error occurs inside the <code>try</code> block, the execution of that block stops, but control is passed to the <code>catch</code> block. The rest of the script continues to function.</p>

<p>Real-life example: Data parsing. If the data arrives in the wrong format, <code>JSON.parse</code> will throw an exception. Without <code>try...catch</code>, this would "freeze" the frontend.</p>

<code class="code">
  try {
    const data = JSON.parse(responseFromServer); // If there is an error here...
    process(data);
  } catch (error) {
    console.error("Error processing data:", error.message);
    showNotification("Sorry, the data is corrupted."); // The app stays alive
  }
</code>

<h3>Try and Catch Blocks: The Basics</h3>
<p>The <code>try</code> block contains code that might cause an error, while the <code>catch</code> block is executed if an error occurs within the <code>try</code> block. Inside <code>catch</code>, we can access the error object to find out exactly what went wrong.</p>

<h3>The Finally Block: Cleaning Up After the Storm</h3>
<p>Some tasks must be performed regardless of whether an error happened or not. This is what <code>finally</code> is for.</p>

<p>Common use cases:</p>
<ul>
  <li>Closing connections.</li>
  <li>Turning off a loading indicator (spinner). You need to remove the "spinner" from the screen in either case—whether the data loaded successfully or failed with an error.</li>
</ul>

<code class="code">
  try {
    showSpinner();
    const data = await fetchData();
    process(data);
  } catch (error) {
    console.error("Error loading data:", error.message);
    showNotification("Failed to load data.");
  } finally {
    hideSpinner(); // We remove the spinner no matter what
  }
</code>

<h3>Usage Tips:</h3>
<p><strong>Don’t "swallow" errors:</strong> Never leave <code>catch (e) {}</code> empty. If you don't know how to handle the error yet, at least log it to the console. Otherwise, debugging will become a nightmare.</p>

<p><strong>Be specific:</strong> Don't wrap your entire code in one giant <code>try...catch</code>. Only wrap the parts where an error is likely to occur (network requests, DOM operations, complex calculations).</p>

<p><strong>Throw your own errors:</strong> You can manually generate exceptions using <code>throw new Error('Something went wrong')</code>. This is a great way to send a signal about a problem from the deep business logic up to the UI component.</p>
