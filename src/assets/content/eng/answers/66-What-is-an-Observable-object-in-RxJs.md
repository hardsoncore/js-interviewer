
<code><em>Observable</em></code> — is a sequence of events over time.

<p>
  In RxJS a viewer subscribes to an <code>Observable</code> (a show).
  Once subscribed, the viewer reacts to every event that happens during the show.
</p>
<p>
  RxJS <code>Observable</code> objects are created either with the creation operators
  (<code>of</code>, <code>from</code>, <code>fromEvent</code>), or through <code>new Observable</code>.
</p>
<p>
  An example with the <code>of()</code> operator:
</p>
<code class="code">
  of('Hello').subscribe((vl) => console.log(vl));
</code>

<p>
  An example with <code>new Observable</code>:
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
  Every <code>Observable</code> can send notifications to its "viewers" by calling one of three methods:
</p>
<ul>
  <li> <code>next()</code> - sending data, the number of calls is not limited;</li>
  <li>
    <code>error()</code> - raising an error; its parameter carries data of any format
    (a string, an object, an exception) about the reason it occurred;
  </li>
  <li>
    <code>complete()</code> - finishing the execution of the <code>Observable</code>; it takes
    no parameters and passes no value.
  </li>
</ul>

<p>
  But the execution of an RxJS <code>Observable</code> starts only after its <code>subscribe()</code> method is called,
  which takes a function receiving the emitted data as an argument.
  As the optional second and third parameters, <code>subscribe()</code> can be given functions
  that will be called in case of an error and (or) the completion of the <code>Observable</code>.
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
  Calling <code>error()</code> or <code>complete()</code> automatically finishes the execution of the <code>Observable</code>.
</p>
<p>
  The number of executions of such an object is not limited, and the object itself does not even know how many "viewers" receive data from it.
</p>
<p>
  The <code>subscribe()</code> method returns an object of type <code>Subscription</code>, which holds the current execution
  of a particular RxJS <code>Observable</code> and has a single method, <code>unsubscribe()</code>,
  for cancelling that execution.
</p>
<code class="code">
  const sub = obs.subscribe();
  sub.unsubscribe();
</code>
<p>
  Calling <code>unsubscribe()</code> is needed only for infinitely executing
  <code>Observable</code> objects, otherwise the resources they occupy will be released only when
  the whole application shuts down. This means that a memory leak may happen while the program is running,
  or unnecessary duplicate "viewers" may be created.
</p>
<p>
  For example, the latter can happen when a user opens a page that starts the execution of an
  RxJS <code>Observable</code>, then navigates to another URL and comes back.
</p>
<p>
  Infinitely executing <code>Observable</code> objects are those that never call the
  <code>complete()</code> method, even if they have a scenario in which <code>error()</code> is invoked,
  which also ends the execution.
</p>
<p class="info info--blue">
  In an Angular application <code>unsubscribe()</code> is usually called at the
  <code>OnDestroy()</code> lifecycle stage of the component in which the <code>Observable</code> is used.
</p>
