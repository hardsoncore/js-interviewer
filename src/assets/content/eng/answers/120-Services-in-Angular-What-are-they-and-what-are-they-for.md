<h3>Introduction and Basic Definition</h3>
<p>An Angular <span class="accent">Service</span> is a broad category that covers any value, function, or feature your application needs to execute business logic. The main idea of using services is to move logic, data handling, and other computing tasks out of our frontend components.</p>
<p>Physically, a service is a TypeScript class with a very specific task (for example, logging, API network requests, or state management), which is injected into any component or another service using the <span class="accent">Dependency Injection (DI)</span> pattern.</p>

<h3>What are services used for in Angular?</h3>
<p>The main purpose of a component is to provide data to the template (HTML) and react to user actions (clicks, text inputs). Components shouldn't fetch data from the server directly, do complex validations of user input, or manage caching.</p>
<p>By delegating these tasks to services, we get several powerful architectural benefits:</p>
<ul>
  <li><span class="accent">Reusability:</span> The same service (for example, an auth service) can be easily used in many different components without duplicating code.</li>
  <li><span class="accent">Separation of Concerns:</span> Components become simple and "dumb", handling only Presentation logic. Business logic lives entirely inside services.</li>
  <li><span class="accent">Testability:</span> Code that is moved to an isolated class is much easier to cover with Unit tests. When testing components, we can simply mock the service to test UI reactions without sending real API requests.</li>
</ul>

<h3>Example of a basic service</h3>
<p>Let's look at a simple example of creating and injecting a user service.</p>
<code class="code">
  import { Injectable } from '@angular/core';

  @Injectable({
    providedIn: 'root'
  })
  export class UserService {
    private users = ['Alex', 'John', 'Alice'];

    constructor() {}

    getUsers(): string[] {
      return this.users;
    }
  }
</code>
<p>And here is the pattern for using (injecting) this service in a component:</p>
<code class="code">
  import { Component } from '@angular/core';
  // We import the specific service type, without initializing it manually!
  import { UserService } from './user.service';

  @Component({
    selector: 'app-users',
    template: '...',
  })
  export class UsersComponent {
    users: string[];

    // Dependency injection happens via the constructor
    constructor(private userService: UserService) {
      this.users = this.userService.getUsers();
    }
  }
</code>

<h3>Service Lifecycle in Angular</h3>
<p>Services don't have a rich lifecycle like directives or components (there are no events like <strong>ngOnInit</strong> or <strong>ngAfterViewInit</strong>). The service lifecycle is limited to the moment of its creation (calling the <strong>constructor</strong>) and destruction — via the <strong>ngOnDestroy</strong> hook.</p>
<p>How long a service lives depends on where it was "provided" (connected to the DI tree):</p>
<ul>
  <li><span class="accent">Singleton (providedIn: 'root'):</span> The service is created once, the first time it's accessed. It lives for the entire lifetime of the application. Its <strong>ngOnDestroy</strong> method is practically never called until the tab is closed.</li>
  <li><span class="accent">Component-level (Component Providers):</span> If the service is listed in the <strong>providers: [UserService]</strong> array of a @Component decorator, a new isolated instance of the service will be created with <strong>each</strong> new instance of that component. When the component gets destroyed, its service instance gets destroyed as well.</li>
  <li><span class="accent">Lazy-loaded Module:</span> When navigating to a Lazy-loaded Module, it creates its own Injector. As a result, a fresh service instance will be created, specific only to this module and its components.</li>
</ul>

<h3>Important details and recommendations</h3>
<p class="info info--orange">Avoid manipulating the DOM tree directly (via <code>document.getElementById</code>, <code>ElementRef</code>, etc.) inside your services! Services are designed to work with abstract data. If you need to manipulate the DOM, move that logic to Directives or Components themselves.</p>
<p class="info info--blue">Never create instances of services manually via <code>new UserService()</code>. This breaks the Inversion of Control concept and makes your code untestable because the service stops being tracked by the Angular DI tree.</p>

<p class="deep-dive">Deep Dive</p>
<h3>DI Trees and Memory Leaks</h3>
<p>A very common and dangerous mistake is related to unsubscribing from <strong>RxJS Observables</strong> inside component-level services. If the service is a <code>'root'</code> singleton, long-living subscriptions created inside it do no harm.</p>
<p>However, if you provide a service <span class="accent">at the component level</span>, and this component is frequently created/destroyed during routing (for example, a modal window), and this local service listens to global events (like Router events, state from an NgRx store, or WebSockets), then missing the unsubscribe (destroy) step will cause a massive memory leak.</p>

<h4>How to correctly unsubscribe inside services:</h4>
<code class="code">
  import { Injectable, OnDestroy } from '@angular/core';
  import { Subject } from 'rxjs';
  import { takeUntil } from 'rxjs/operators';

  @Injectable() // Provided in the providers:[] array of a specific component
  export class ScopedDataService implements OnDestroy {
    private destroy$ = new Subject&lt;void&gt;();

    constructor(private globalStore: Store) {
      this.globalStore.select('user')
        .pipe(takeUntil(this.destroy$)) // automatic unsubscription on trigger
        .subscribe(user => console.log(user));
    }

    ngOnDestroy(): void {
      // Angular DI will destroy the service instance along with the component
      // and call this method to free up memory
      this.destroy$.next();
      this.destroy$.complete();
    }
  }
</code>
<p>This pattern of implementing <strong>OnDestroy</strong> in a service allows you to safely use isolated DI contexts and elegantly manage memory in combination with RxJS.</p>
