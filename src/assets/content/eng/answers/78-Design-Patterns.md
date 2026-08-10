<h3>What design patterns are</h3>
<p>A <span class="accent">design pattern</span> is a typical, proven solution to a commonly occurring code design problem. It is not ready-made code and not a library, but a scheme-idea that you adapt to your specific task.</p>

<p class="info"><strong>Key idea:</strong> patterns give you two things — proven solutions and a shared team vocabulary: the word "Observer" replaces a paragraph of explanations. The GoF classification splits them into three groups: creational — object creation, structural — composition, behavioral — interaction.</p>

<h3>Three categories (GoF)</h3>
<ul>
  <li><strong>Creational</strong> — flexible object creation: <span class="accent">Singleton</span>, <span class="accent">Factory Method</span>, Builder.</li>
  <li><strong>Structural</strong> — assembling objects into larger constructions: <span class="accent">Adapter</span>, <span class="accent">Decorator</span>, <span class="accent">Facade</span>, Proxy.</li>
  <li><strong>Behavioral</strong> — object communication and distribution of responsibility: <span class="accent">Observer</span>, <span class="accent">Strategy</span>, Command, Iterator.</li>
</ul>

<h3>Patterns all around us in frontend</h3>
<p>A strong move in an interview is to show that patterns already live in your stack:</p>
<ul>
  <li><strong>Singleton</strong> — an Angular service with <code>providedIn: 'root'</code>, a Redux/Pinia store: one instance for the whole application.</li>
  <li><strong>Observer</strong> — <code>addEventListener</code>, RxJS <code>Observable</code>, <code>EventEmitter</code>: subscribers react to the source's events.</li>
  <li><strong>Decorator</strong> — <code>@Component</code> in Angular, HOC in React: we add behavior without rewriting the original code.</li>
  <li><strong>Facade</strong> — a service hiding HTTP, caching and retries behind a couple of simple methods.</li>
  <li><strong>Strategy</strong> — <code>sort(comparator)</code>, form validators: interchangeable algorithms behind a common interface.</li>
  <li><strong>Proxy</strong> — Vue 3 reactivity: intercepting reads and writes of object properties.</li>
</ul>

<p>The classic Observer in a few lines:</p>
<code class="code">
  class EventBus {
    handlers = {};
    on(event, fn) { (this.handlers[event] ??= []).push(fn); }
    emit(event, data) { this.handlers[event]?.forEach(fn =&gt; fn(data)); }
  }

  const bus = new EventBus();
  bus.on('login', user =&gt; console.log('Hello,', user));
  bus.emit('login', 'Anna'); // the source doesn't know its subscribers
</code>

<p class="info info--orange">The main trap is overengineering: a pattern for the pattern's sake. You apply a pattern when you recognize a familiar problem in the task, not when you look for a place "to fit a Builder in". Simple code without a pattern is better than complex code with one.</p>

<p class="deep-dive">Deep Dive</p>

<h3>Where patterns came from</h3>
<p>The term was cemented by the book "Design Patterns" (1994) by the "Gang of Four" (GoF): 23 patterns derived from C++ and Smalltalk practice. In JavaScript some of them dissolved into the language itself: Iterator is built in via <code>Symbol.iterator</code> and <code>for..of</code>, Strategy and Command often boil down to passing first-class functions, and Module went from an IIFE trick to the ES modules syntax.</p>

<h3>Singleton: why it is both loved and criticized</h3>
<p>An ES module is a natural singleton: the module code runs once, and all imports receive the same instance.</p>
<code class="code">
  // api.js
  class ApiClient { /* ... */ }
  export const api = new ApiClient(); // the only instance per application

  // anywhere: import { api } from './api.js';
</code>
<p>The criticism: a singleton is global state with hidden dependencies. Code that pulls <code>api</code> directly is hard to test — you cannot swap the instance for a mock. That is why frameworks prefer <span class="accent">Dependency Injection</span>: an Angular service remains a single instance within its injector, but the dependency is declared explicitly and is easily replaced in tests.</p>

<h3>Factory Method and Builder</h3>
<code class="code">
  // Factory: a single point deciding which object to create
  function createNotification(type, text) {
    switch (type) {
      case 'toast': return new Toast(text);
      case 'modal': return new Modal(text);
      default: throw new Error('Unknown type');
    }
  }
</code>
<p>A factory isolates the class-selection logic: the calling code knows nothing about concrete classes and does not change when a new type is added. Builder assembles a complex object step by step (<code>new QueryBuilder().where(...).limit(10).build()</code>) — in frontend it shows up in query configurators and test fixtures.</p>

<h3>Adapter and Proxy</h3>
<p>Adapter converts a foreign interface into the expected one: for example, a wrapper around a third-party analytics library, so the application depends on its own interface rather than on the vendor — replacing the library boils down to rewriting a single adapter. Proxy intercepts access to an object without changing its interface: <code>new Proxy(target, { get, set })</code> — Vue 3 and MobX reactivity is built on this.</p>

<h3>Architectural patterns — a different level</h3>
<p>MVC, MVVM, Flux/Redux are application architecture patterns, not class-level GoF patterns. But they are assembled from the same bricks: Redux is Observer (store subscriptions) + Command (actions as command objects) + a single singleton store with pure reducers.</p>

<h3>Antipatterns</h3>
<ul>
  <li><strong>God Object</strong> — a component or service thousands of lines long that knows and does everything.</li>
  <li><strong>Spaghetti code</strong> — logic with no structure, everything depends on everything.</li>
  <li><strong>Golden Hammer</strong> — one familiar tool for every task ("Redux everywhere").</li>
</ul>

<p class="info info--blue">Knowing patterns is valuable not for listing names: the interviewer wants to hear that you recognize a pattern in living code (RxJS is Observer, DI is a managed Singleton) and understand the cost of abstraction — every added layer has to pay for itself.</p>
