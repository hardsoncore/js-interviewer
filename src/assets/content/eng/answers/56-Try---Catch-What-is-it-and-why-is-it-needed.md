
<h3>What it is and why</h3>
<p><span class="accent">try...catch</span> is a construct for intercepting runtime errors. Risky code goes into <code>try</code>; if an exception is thrown inside, execution of the block breaks off, control moves to <code>catch</code>, and the script keeps running instead of showing a "white screen".</p>

<p class="info"><strong>Key idea:</strong> <code>catch</code> only catches what is thrown <strong>synchronously</strong> while its block is on the call stack. Every other quirk follows from this single rule.</p>

<h3>Mechanics: throw and stack unwinding</h3>
<p>An error is not a special engine state but an ordinary object that someone threw via <code>throw</code>. The engine then stops the current work and unwinds the call stack upwards, looking for the nearest <code>catch</code>. Found one — it hands over the error object. Found none — the error reaches the very top and the script crashes.</p>
<p>That is why <code>catch</code> also intercepts what failed several calls deeper. Catch an error where you know what to do with it, not where it happened.</p>

<h3>Syntax and the error object</h3>
<code class="code">
  try {
    const data = JSON.parse(response); // throws SyntaxError
    render(data);
  } catch (error) {
    console.error(error.name, error.message);
    showNotification('The data is corrupted');
  } finally {
    hideSpinner(); // runs in any case
  }
</code>
<p><code>catch</code> receives the error object: <code>name</code> is the error class, <code>message</code> is the text, <code>stack</code> is the call stack at the moment of creation. If you do not need the object, the parentheses can be omitted: <code>catch { ... }</code>. Your own errors are thrown the same way — <code>throw new Error('Access denied')</code>, always as an <code>Error</code> object rather than a string, otherwise you get neither the stack nor the usual fields.</p>

<h3>The finally block</h3>
<p>It always runs: after success, after an error, and even if <code>try</code> did a <code>return</code>. This is the place for cleanup — hide the spinner, close the connection, unlock the button.</p>

<h3>The trap: asynchronous errors</h3>
<p>A <code>setTimeout</code> callback or an event handler runs later, as a separate task, when the <code>try</code> block has long left the stack. There is nothing left to catch there.</p>
<code class="code">
  try {
    setTimeout(() =&gt; { throw new Error('missed'); }, 0);
  } catch (e) {
    // never reached: the error flies to the global handler
  }
</code>
<p class="info info--blue">With <code>async/await</code> there is no trap: <code>await</code> turns a promise rejection into an ordinary exception in the current function, so <code>try/catch</code> around <code>await</code> works exactly as in synchronous code.</p>

<p class="info info--orange">Do not swallow errors: an empty <code>catch (e) {}</code> turns debugging into hell. And do not wrap a whole module in one giant <code>try</code> — frame the spots where failure is genuinely possible and you have a sensible plan B.</p>

<p class="deep-dive">Deep Dive</p>

<h3>What try...catch will never catch</h3>
<p>Besides asynchronous callbacks there are two more cases:</p>
<ul>
  <li><strong>Parsing errors.</strong> If the syntax is broken in the code itself, the script never reaches execution — the engine fails at the parsing stage, and nobody ever runs the <code>try</code>.</li>
  <li><strong>An error inside <code>catch</code> or <code>finally</code> itself.</strong> Only an outer <code>try...catch</code> one level up will catch those.</li>
</ul>
<p>An unhandled promise rejection is a separate case: it does not bring the page down but surfaces as an <code>unhandledrejection</code> event. In Node.js this terminates the process by default.</p>

<h3>The hierarchy of built-in errors</h3>
<p>All built-in classes inherit from <code>Error</code>: <code>SyntaxError</code> (malformed JSON), <code>TypeError</code> (calling a non-function, reading a property of <code>undefined</code>), <code>ReferenceError</code> (a non-existent variable, access inside the TDZ), <code>RangeError</code> (stack overflow, invalid array length), <code>URIError</code>, <code>AggregateError</code> (from <code>Promise.any</code>).</p>
<p>JS has no typed <code>catch</code> like Java does — you filter manually via <code>instanceof</code> and rethrow anything that is not yours:</p>
<code class="code">
  try {
    doWork();
  } catch (e) {
    if (e instanceof ValidationError) {
      showFieldError(e.field);
    } else {
      throw e; // not our error — let it fly higher
    }
  }
</code>

<h3>Custom error classes and Error.cause</h3>
<p>Inheriting from <code>Error</code> gives a meaningful <code>name</code> and lets you distinguish errors by type rather than by message text.</p>
<code class="code">
  class ValidationError extends Error {
    constructor(message, field) {
      super(message);
      this.name = 'ValidationError';
      this.field = field;
    }
  }
</code>
<p>When a low-level error is wrapped into a domain one, the original must not be lost — that is what the second constructor argument is for: <code>throw new ApiError('Profile failed to load', { cause: err })</code>. The original stays available in <code>err.cause</code>, and the chain of causes is visible in the logs.</p>

<h3>The catches of finally</h3>
<p><code>finally</code> runs between evaluating the <code>return</code> in <code>try</code> and actually leaving the function. The value is already computed, so changing a variable inside <code>finally</code> does not affect the result. But its own <code>return</code> or <code>throw</code> inside <code>finally</code> overrides everything that happened in <code>try</code> and <code>catch</code> — including an error that is already in flight.</p>
<code class="code">
  function f() {
    try {
      throw new Error('lost');
    } finally {
      return 'ok'; // the error is swallowed without a trace
    }
  }
</code>
<p class="info info--orange">Hence the rule: <code>finally</code> is for cleanup only. No <code>return</code> — linters (<code>no-unsafe-finally</code>) complain about it for good reason.</p>

<h3>The cost of exceptions and performance</h3>
<p>A <code>try...catch</code> block used to prevent the engine from optimising the whole function, so people moved it into a separate wrapper. With TurboFan this is no longer relevant: <code>try</code> by itself is practically free as long as there is no error.</p>
<p>It is <code>throw</code> that is expensive: creating an <code>Error</code> object captures the stack trace, and unwinding the stack breaks branch prediction. So exceptions are for exceptional situations, not for control flow. An expected outcome (validation failed, the item is missing) is better returned as a value.</p>

<h3>The last line of defence: global handlers</h3>
<p>Whatever was not caught locally is worth intercepting at least globally, for logging into a monitoring system:</p>
<code class="code">
  window.addEventListener('error', (e) =&gt; report(e.error));
  window.addEventListener('unhandledrejection', (e) =&gt; report(e.reason));
</code>
<p>Frameworks have their own entry points for this: <code>ErrorHandler</code> in Angular, <code>app.config.errorHandler</code> in Vue, Error Boundaries in React. A global handler is not a replacement for local <code>catch</code> blocks: it can only report the problem, not restore the user's scenario.</p>
