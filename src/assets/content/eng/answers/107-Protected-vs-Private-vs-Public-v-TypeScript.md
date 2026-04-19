<h3>Main Rule (TL;DR)</h3>
<p>By default, always make everything <code>private</code>. Open up access (to <code>protected</code> or <code>public</code>) only when there is a real architectural need for it. This will save you from "spaghetti code", where components mess with each other's internal state.</p>



<h3>1. public</h3>
<p>Accessible everywhere. Inside the class, in child classes, and in class instances from the outside.</p>

<p class="info">In TypeScript, if you don't write a modifier, the property or method automatically becomes <code>public</code>.</p>

<p>When to use:</p>

<p> - For forming the public API of your class or service. These are the methods for which the class was created in the first place.</p>

<p> - For methods and properties called from HTML templates (especially relevant for Angular or Vue 2 components, where the template is essentially "outside" the component class).</p>

<code class="code">
  class UserService {
    // This method is needed by the outside world to get data
    public getUser(): User { ... }
  }
</code>

<h3>2. private</h3>

<p>Accessible only within the class where it is declared. Even child classes (via <code>extends</code>) will not see their parent's <code>private</code> methods.</p>

<p>When to use:</p>

<p> - For internal state, which no one should change directly bypassing your logic.</p>

<p> - For auxiliary helper methods that do the dirty work inside the class but are absolutely useless outside.</p>

<p> - For dependency injection (DI) in service constructors, if these dependencies are only needed by the service itself.</p>

<code class="code">
  class UserService {
    // Internal state, no one should touch it directly
    private users: User[] = [];

    // Helper method, useless from the outside
    private formatUserData(data: any): User { ... }

    // DI, if HttpClient is needed only by this service
    constructor(private http: HttpClient) { ... }
  }
</code>

<p class="info info--orange">
  Note: In modern JS/TS, there is also a hardcore private modifier <code>#</code> (e.g., <code>#balance</code>), which actually hides data at runtime, unlike the word <code>private</code>, which only works at the TypeScript compilation stage.
</p>

<h3>3. protected</h3>

<p>Accessible inside the class itself and in all its child classes. There is no access from the outside (on an instance).</p>

<p>When to use:</p>

<p> - When designing base/abstract classes.</p>

<p>
   - When you have shared logic for a group of components (for example, a base table component class with pagination), and child components need access to the parent's methods to override or use them, but this functionality shouldn't be exposed outside.
</p>

<p> - When you want subclasses to be able to extend the base class functionality, but you don't want to open these methods to the outside world.</p>

<code class="code">
  abstract class BaseTableComponent {
    // Accessible to subclasses, but closed from the outside world
    protected currentPage: number = 1;

    protected abstract loadData(): void;
  }

  class UsersTableComponent extends BaseTableComponent {
    public nextPage() {
      this.currentPage++; // We have access to the protected property
      this.loadData();
    }

    protected loadData(): void {
      // Loading implementation
    }
  }
</code>

<p class="info">
  Important: Do not abuse <code>protected</code>, turning it into "almost public". If it seems to you that many methods should be <code>protected</code>, it might be worth reconsidering the architecture and extracting these methods into a separate service or utility.
</p>

<h3>When to use each of these access modifiers?</h3>

<p>
  <code>protected</code> is needed only to delineate access. To give the ability to use methods in subclasses (since <code>private</code> is not accessible there) and close access to calling methods from the outside (like for <code>public</code>).
  <br />
  If you need a method to be accessible to both subclasses and the outside world, it should be <code>public</code>.
  <br />
  If it's needed only for subclasses, then <code>protected</code>.
  <br />
  If it's needed only inside the class, then <code>private</code>.
</p>


<h3>Additional: Static (Static Properties and Methods)</h3>

<p>
  <code>Public/Private/Protected</code> answer the question: "Who can see this?" (Visibility).
</p>

<p>
  <code>Static</code> answers the question: "Who owns this?" (Memory scope: class or instance).
</p>

<p>
  <span class="accent">Static method</span> — a method that belongs to the class itself, not its instances (objects). While regular methods are called on a specific object created with <code>new</code>, static methods are called directly on the class.
</p>

<h4>Main Features</h4>

<p>
  <strong>Call without creating an object:</strong> You don't need to write <code>const obj = new MyClass()</code> to use the method.
</p>

<p><strong>No access to <code>this</code> (instance):</strong> Inside a static method, you cannot use <code>this</code> to access regular class fields because the static method "doesn't know" which object called it (there might not be any object at all).</p>

<p><strong>Global access point:</strong> Static methods are often used to create utility functions that are logically related to the class's theme.</p>

<code class="code">
  class Calculator {
    // Static property
    static PI: number = 3.14159;

    // Static method
    static add(a: number, b: number): number {
      return a + b;
    }

    // Regular method (instance method)
    sayHello(): void {
      console.log("Hello from the calculator!");
    }
  }

  // 1. Call the static method directly on the class
  const sum = Calculator.add(5, 10);
  console.log(sum); // 15
  console.log(Calculator.PI); // 3.14159

  // 2. This won't work:
  const calc = new Calculator();
  calc.add(5, 10); // Error: Property 'add' does not exist on type 'Calculator'.

  // 3. To call sayHello, you need to create an object
  const myCalc = new Calculator();
  myCalc.sayHello(); // Works
</code>

<h4>When to use static methods?</h4>
<p>
  <strong>Utilities:</strong> When a method performs a pure action that does not depend on the state of a specific object (for example, <code>Math.round()</code> in JavaScript is a static method of the <code>Math</code> class).
</p>

<p>
  <strong>Factories:</strong> When you need to create an object in a special way.
</p>

<code class="code">
  class User {
    constructor(public name: string) {}

    static createAdmin(): User {
      return new User("Admin");
    }
  }
  const admin = User.createAdmin();
</code>

<p>
  <strong>Caching or shared settings:</strong> If you need to store data that is common to all objects of this type.
</p>

<h4>Summary of static methods</h4>
<p>
  If a method does not need data from <code>this</code> (properties of a specific object) to work, it can safely be made static. This saves memory and makes the code cleaner.
</p>
