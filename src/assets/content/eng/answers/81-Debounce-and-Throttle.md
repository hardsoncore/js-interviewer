<h3>Introduction</h3>

<p>
  <span class="accent">Debounce</span> and <span class="accent">Throttle</span> are two wrapper functions that reduce the
  number of handler calls when events come in too fast: typing in a field, scrolling, resizing, moving the mouse. Both
  are built the same way: they take a function and return a new one, keeping their internal state (a timer, the time of
  the last call) in a closure.
</p>

<p class="info">
  <strong>Key idea:</strong> <strong>debounce waits for silence</strong> — it postpones the call and resets the countdown
  on every new event, so it fires once, after the stream of events has stopped. <strong>Throttle keeps a rhythm</strong>
  — it lets a call through no more than once every N milliseconds, no matter how many events arrive.
</p>

<p>
  An everyday analogy. Debounce is an elevator: while people keep stepping in, the doors do not close and the countdown
  starts over; it departs only once the flow has stopped. Throttle is a turnstile: it lets one person through every N
  seconds, no matter how big the crowd pushing behind.
</p>

<hr />

<h3>Implementation</h3>

<code class="code">
  function debounce(fn, ms) {
    let timer;

    return function (...args) {
      clearTimeout(timer);   // a new event cancels the scheduled call
      timer = setTimeout(() => fn.apply(this, args), ms);
    };
  }

  // the request fires once — when the user has stopped typing
  input.addEventListener('input', debounce(search, 300));
</code>

<code class="code">
  function throttle(fn, ms) {
    let isCooling = false;

    return function (...args) {
      if (isCooling) return;  // the cooldown is running — just exit
      fn.apply(this, args);

      isCooling = true;
      setTimeout(() => (isCooling = false), ms);
    };
  }

  // no more than one recalculation per 200 ms while the page is scrolled
  window.addEventListener('scroll', throttle(onScroll, 200));
</code>

<p>
  The wrapper is declared with <code>function</code> rather than an arrow, and it calls the original function through
  <code>fn.apply(this, args)</code> — this way the wrapped method keeps its <code>this</code> and the event arguments.
</p>

<hr />

<h3>When to use which</h3>

<ul>
  <li>
    <strong>Debounce</strong> — when only the final result matters: search autocomplete, live field validation, draft
    autosave, recalculating layout on <code>resize</code>.
  </li>
  <li>
    <strong>Throttle</strong> — when the process itself matters, only less often: handling <code>scroll</code> (infinite
    feed, highlighting the active section), <code>mousemove</code> and dragging, sending analytics.
  </li>
</ul>

<p class="info info--blue">
  The choice in one sentence: <strong>you need only the final result — debounce; you need the intermediate ones, but
  less often — throttle.</strong>
</p>

<hr />

<h3>The main pitfall: create the wrapper only once</h3>

<p class="info info--orange">
  The state lives in the wrapper's closure, so the wrapper is created <strong>once</strong> and reused. If you call
  <code>debounce()</code> inside the handler itself, or anew on every component render, each event will produce a brand
  new function with an empty closure: there will be nothing to cancel, and every single call will go through.
</p>

<hr />

<p class="deep-dive">Deep Dive</p>

<h4>Leading and trailing edge</h4>

<p>
  A series of events has two edges, and the call can be attached to either one. Classic debounce works on the
  <strong>trailing edge</strong> — at the end, after the silence. But sometimes you need the <strong>leading
  edge</strong>: react instantly to the first event and suppress the rest — that is how a "Submit" button is protected
  from a double click.
</p>

<code class="code">
  function debounce(fn, ms, { leading = false, trailing = true } = {}) {
    let timer = null;

    return function (...args) {
      const callNow = leading && timer === null;  // this is the first event of the series

      clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        // !callNow — so a single event does not call fn twice
        if (trailing && !callNow) fn.apply(this, args);
      }, ms);

      if (callNow) fn.apply(this, args);
    };
  }
</code>

<h4>Throttle with a flag and with a timestamp</h4>

<p>
  The simple implementation from the core section has a flaw: <strong>the last event of the series is lost</strong>. If
  the user jerks the scroll and stops 50 ms before the cooldown ends, the final position will never be processed. The
  timestamp version supports a "trailing tail": it either calls the function immediately, or schedules the call exactly
  for the moment the period expires.
</p>

<code class="code">
  function throttle(fn, ms) {
    let lastCall = 0;
    let timer = null;

    return function (...args) {
      const rest = ms - (Date.now() - lastCall);

      if (rest <= 0) {              // the period is over — call immediately
        clearTimeout(timer);
        timer = null;
        lastCall = Date.now();
        fn.apply(this, args);
      } else if (timer === null) {  // otherwise schedule the tail at the end of the period
        timer = setTimeout(() => {
          lastCall = Date.now();
          timer = null;
          fn.apply(this, args);
        }, rest);
      }
    };
  }
</code>

<h4>Why function and not an arrow</h4>

<p>
  An arrow function has no <code>this</code> of its own — it would take it from the place where <code>debounce</code> is
  declared. Then the pattern <code>obj.method = debounce(obj.method, 300)</code> would break: inside <code>fn</code> you
  would get <code>undefined</code> instead of the object. That is why the wrapper is a regular function.
</p>

<p>
  The callback inside <code>setTimeout</code>, on the contrary, must be an arrow: it inherits the wrapper's
  <code>this</code> and carries it to <code>apply</code>. Replace it with <code>function</code> and <code>this</code> is
  lost.
</p>

<p class="info info--orange">
  A consequence people often forget: <strong>debounce cannot return the result</strong> of <code>fn</code> — the wrapper
  returns control long before the actual call happens. The wrapped function has to work through a side effect. If you do
  need the result, the wrapper must return a Promise and resolve it at the moment of the call.
</p>

<h4>cancel and flush</h4>

<p>
  A pending timer outlives the component. The user leaves the page, the component is destroyed, and 300 ms later the
  timer fires a callback that reaches into state that no longer exists — hence console errors and memory leaks. That is
  why the wrapper is given a cancel method.
</p>

<code class="code">
  function debounce(fn, ms) {
    let timer;

    function wrapper(...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), ms);
    }

    wrapper.cancel = () => clearTimeout(timer);

    return wrapper;
  }
</code>

<p>
  <code>cancel()</code> is called in the destruction hook: <code>ngOnDestroy</code> in Angular,
  <code>onUnmounted</code> in Vue, the cleanup function in <code>useEffect</code> in React. Its counterpart
  <code>flush()</code> does the opposite — it runs the pending call immediately. That is useful on form submit, for
  example, so the last input is not lost.
</p>

<h4>Throttling by frames: requestAnimationFrame</h4>

<p>
  If the handler's result affects the picture (scrolling, dragging), tying it to arbitrary milliseconds makes no sense:
  the browser will repaint the screen only on the next frame anyway. The right unit of measurement here is a frame, not
  a millisecond.
</p>

<code class="code">
  function rafThrottle(fn) {
    let scheduled = false;

    return function (...args) {
      if (scheduled) return;
      scheduled = true;

      requestAnimationFrame(() => {
        scheduled = false;
        fn.apply(this, args);
      });
    };
  }
</code>

<p class="info info--blue">
  A bonus compared to <code>setTimeout</code>: in a background tab the browser stops producing frames on its own, so the
  extra calls stop without a single line of code on your side.
</p>

<h4>Ready-made implementations</h4>

<ul>
  <li>
    <strong>lodash</strong> — <code>_.debounce</code> and <code>_.throttle</code> with the <code>leading</code>,
    <code>trailing</code> and <code>maxWait</code> options and the <code>cancel</code> / <code>flush</code> methods.
    <code>maxWait</code> solves indefinite postponing: if events keep coming without a pause, a plain debounce never
    fires at all, while with <code>maxWait</code> the function still runs at least once per the given interval.
  </li>
  <li>
    <strong>RxJS</strong> — the same ideas as stream operators: <code>debounceTime</code>, <code>throttleTime</code>,
    <code>auditTime</code>, <code>sampleTime</code>. The difference is that what gets wrapped is not a function but a
    stream of values, and unsubscribing clears all pending timers automatically.
  </li>
</ul>

<h4>Testing</h4>

<p>
  Tests on real timers are slow and flaky. Fake timers (<code>jest.useFakeTimers()</code> or
  <code>vi.useFakeTimers()</code>) let you move time forward manually with <code>advanceTimersByTime(300)</code> and
  assert that after a series of ten events the original function was called exactly once.
</p>
