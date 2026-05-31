<h3>Introduction and Basic Definition</h3>
<p>The <span class="accent">Singleton Pattern</span> is a creational design pattern that guarantees a class has only one instance, providing a global point of access to it. In the context of Angular, it means that a service is initialized exactly once, and all components or other services that ask to inject this dependency receive a reference to the same object in memory.</p>

<h3>Are Angular services Singletons by default?</h3>
<p>Short answer: <span class="accent">Yes, if they are generated via the Angular CLI</span> (using <code>providedIn: 'root'</code>). However, technically, Angular services <strong>are not strict, absolute singletons by their nature</strong> — their "singleton-ness" depends on where and how they are registered in the Dependency Injection (DI) Tree.</p>
<p>If a service is registered at the global injector level (Root Injector), it will be a singleton. But if it is registered at the component level (for example, through the <code>providers</code> array in the <code>@Component</code> decorator), Angular will create a <strong>new, separate instance</strong> of the service for each specific component.</p>

<h3>Code Examples</h3>
<p>Let's look at a classic example of a service that is a singleton for the entire application:</p>
<code class="code">
  import { Injectable, signal } from '@angular/core';

  @Injectable({
    providedIn: 'root' // Global singleton for the entire lifetime of the app
  })
  export class GlobalStateService {
    public counter = signal(0);

    public reset(): void {
      this.counter.set(0); // The state cleanup method mentioned in the recommendations
    }
  }
</code>
<p>And here is an example of how easy it is to "break" a global singleton by tying the service creation lifecycle to a component:</p>
<code class="code">
  import { Component, inject } from '@angular/core';
  import { GlobalStateService } from './global-state.service';

  @Component({
    selector: 'app-local-counter',
    standalone: true,
    template: `<button (click)="state.counter.update(v => v + 1)">+</button>`,
    // Overriding the root injector: this component and its children will get THEIR OWN instance
    providers: [GlobalStateService]
  })
  export class LocalCounterComponent {
    // A modern way of injecting dependencies without bloating the constructor
    protected state = inject(GlobalStateService);
  }
</code>

<h3>Key Features and Use Cases</h3>
<ul>
  <li><span class="accent">Single application state:</span> Singleton services are perfectly suited for shared data storage (state management), such as the currently authorized user, shopping cart contents, or cached API responses.</li>
  <li><span class="accent">Dependency Injection mechanics:</span> The Singleton pattern in Angular is not implemented through a classic static method (like <code>Service.getInstance()</code> in OOP), but is invisibly managed by the framework itself through the hierarchy of injectors.</li>
</ul>

<h3>Important Details and Recommendations</h3>
<p class="info info--orange">Be very careful with data (state) inside root singletons. Since an instance of such a service lives from the app startup until the browser tab is closed, its properties can accumulate or remain stale. Always implement state cleanup methods — for example, clear user data on logout!</p>
<p class="info info--blue">Always try to use the <code>providedIn: 'root'</code> syntax by default. Unlike the outdated approach of adding a service to the <code>providers</code> array inside <code>AppModule</code>, the modern way supports <span class="accent">Tree-shaking</span>. If your service is not used anywhere, the bundler (like Webpack) will easily remove the service code from the final production build, reducing the bundle size.</p>

<p class="deep-dive">Deep Dive</p>
<h3>Hierarchical Injectors (Environment vs Element)</h3>
<p>In Angular, a singleton is a concept <strong>within the scope of a specific injector</strong>. Under the hood, the DI system works with two parallel injector trees:</p>
<ul>
  <li><span class="accent">EnvironmentInjector (formerly ModuleInjector):</span> Responsible for globally provided dependencies (via <code>providedIn: 'root'</code>, modules, or route configurations).</li>
  <li><span class="accent">ElementInjector:</span> Implicitly created on every DOM node that has a component or directive (via <code>providers</code> in <code>@Component</code>). The hierarchy of these injectors strictly follows the DOM hierarchy.</li>
</ul>
<p class="info info--blue">When looking for a dependency, the framework first goes up the <strong>ElementInjector</strong> tree (from child to parent). If the service is not found in the component tree, the search is delegated to the <strong>EnvironmentInjector</strong> (routes, modules, and ultimately, <code>root</code>).</p>

<h3>Route sub-branch singletons in Standalone components</h3>
<p>Special attention should be paid to the situation with lazy loading and the Standalone API. You can create a "local singleton" that will be shared among several components, but it will live only as long as the user stays within a specific route.</p>
<p>To do this, the service is provided in the <code>providers</code> array of the route configuration. Angular will create a new child <strong>EnvironmentInjector</strong>:</p>
<code class="code">
  export const appRoutes: Routes = [
    {
      path: 'dashboard',
      component: DashboardComponent,
      // The service will be a "singleton" only within /dashboard and its children
      providers: [DashboardStateService],
      children: [
        { path: 'stats', component: StatsComponent },
        { path: 'settings', component: SettingsComponent }
      ]
    }
  ];
</code>
<p>This pattern is a great alternative to the global <code>'root'</code> (which stays in memory permanently). The <code>DashboardStateService</code> instance will be shared among <code>DashboardComponent</code>, <code>StatsComponent</code>, and <code>SettingsComponent</code>, allowing them to easily communicate with each other. It will also be safely removed from memory by the garbage collector as soon as the user leaves the <code>/dashboard</code> branch.</p>
