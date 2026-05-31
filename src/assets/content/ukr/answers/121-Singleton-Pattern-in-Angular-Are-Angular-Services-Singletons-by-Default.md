<h3>Вступ та базове визначення</h3>
<p><span class="accent">Патерн Singleton (Одинак)</span> — це породжувальний патерн проектування, який гарантує, що у класу є лише один екземпляр, і надає глобальну точку доступу до нього. У контексті Angular це означає, що сервіс ініціалізується рівно один раз, і всі компоненти або інші сервіси, які просять впровадити цю залежність (inject), отримують посилання на один і той же об'єкт у пам'яті.</p>

<h3>Чи є сервіси в Angular синглтонами за замовчуванням?</h3>
<p>Коротка відповідь: <span class="accent">Так, якщо вони згенеровані через Angular CLI</span> (використовують <code>providedIn: 'root'</code>). Однак технічно Angular-сервіси <strong>не є строгими абсолютними синглтонами за своєю природою</strong> — їх "синглтонність" залежить від того, де і як вони зареєстровані в дереві впровадження залежностей (DI Tree).</p>
<p>Якщо сервіс зареєстровано на рівні глобального інжектора (Root Injector), він буде синглтоном. Але якщо він зареєстрований на рівні компонентів (наприклад, через масив <code>providers</code> у декораторі <code>@Component</code>), то на кожен такий компонент Angular створить <strong>новий, окремий екземпляр</strong> сервісу.</p>

<h3>Приклади коду</h3>
<p>Розглянемо класичний приклад сервісу, який є синглтоном для всього додатка:</p>
<code class="code">
  import { Injectable, signal } from '@angular/core';

  @Injectable({
    providedIn: 'root' // Глобальний синглтон на все життя додатка
  })
  export class GlobalStateService {
    public counter = signal(0);

    public reset(): void {
      this.counter.set(0); // Той самий метод очищення стану, про який йшлося в рекомендаціях
    }
  }
</code>
<p>А ось приклад того, як легко "розбити" глобальний синглтон, прив'язавши життєвий цикл створення сервісу до компонента:</p>
<code class="code">
  import { Component, inject } from '@angular/core';
  import { GlobalStateService } from './global-state.service';

  @Component({
    selector: 'app-local-counter',
    standalone: true,
    template: `<button (click)="state.counter.update(v => v + 1)">+</button>`,
    // Перекриваємо root-інжектор: цей компонент та його діти отримають СВІЙ екземпляр
    providers: [GlobalStateService]
  })
  export class LocalCounterComponent {
    // Сучасний спосіб впровадження залежностей без роздування конструктора
    protected state = inject(GlobalStateService);
  }
</code>

<h3>Ключові особливості та використання</h3>
<ul>
  <li><span class="accent">Єдиний стан додатка:</span> Синглтон-сервіси ідеально підходять для зберігання спільних даних (state management), таких як поточний авторизований користувач, вміст кошика покупок або кешовані відповіді API.</li>
  <li><span class="accent">Механіка Dependency Injection:</span> Патерн Singleton в Angular реалізується не через класичний статичний метод (як <code>Service.getInstance()</code> в ООП), а непомітно керується самим фреймворком через ієрархію інжекторів.</li>
</ul>

<h3>Важливі нюанси та рекомендації</h3>
<p class="info info--orange">Будьте дуже обережні з даними (станом) всередині root-синглтонів. Оскільки екземпляр такого сервісу живе від старту додатка до закриття вкладки браузера, його властивості можуть накопичуватися або залишатися застарілими (stale data). Обов'язково реалізуйте методи очищення стейту — наприклад, очищайте дані користувача під час логауту!</p>
<p class="info info--blue">Завжди намагайтеся використовувати синтаксис <code>providedIn: 'root'</code> за замовчуванням. На відміну від застарілого підходу з додаванням сервісу в <code>providers</code> всередині <code>AppModule</code>, сучасний спосіб підтримує <span class="accent">Tree-shaking</span>. Якщо ваш сервіс ніде не використовується, бандлер Webpack з легкістю видалить код сервісу з підсумкового production-білда, зменшивши вагу бандла.</p>

<p class="deep-dive">Поглиблений конспект</p>
<h3>Ієрархічні інжектори (Environment vs Element)</h3>
<p>В Angular синглтон — це концепція <strong>в рамках конкретного інжектора</strong>. Під капотом система DI працює з двома паралельними деревами інжекторів:</p>
<ul>
  <li><span class="accent">EnvironmentInjector (раніше ModuleInjector):</span> Відповідає за глобально провайднуті залежності (через <code>providedIn: 'root'</code>, модулі або конфігурацію роутів).</li>
  <li><span class="accent">ElementInjector:</span> Неявно створюється на кожному DOM-вузлі, де є компонент або директива (через <code>providers</code> у <code>@Component</code>). Ієрархія цих інжекторів строго слідує за ієрархією DOM.</li>
</ul>
<p class="info info--blue">Під час пошуку залежності фреймворк спочатку йде вгору по дереву <strong>ElementInjector</strong> (від дитини до батька). Якщо сервіс не знайдено в дереві компонентів, пошук делегується в <strong>EnvironmentInjector</strong> (роути, модулі і, зрештою, <code>root</code>).</p>

<h3>Синглтони підгілки роутів у Standalone-компонентах</h3>
<p>Особливої уваги заслуговує ситуація з лінивим завантаженням (lazy loading) та Standalone API. Ви можете створити "локальний синглтон", який буде спільним для декількох компонентів, але при цьому житиме лише доки користувач перебуває в межах певного роута.</p>
<p>Для цього сервіс передається в масив <code>providers</code> конфігурації роута. Angular створить новий дочірній <strong>EnvironmentInjector</strong>:</p>
<code class="code">
  export const appRoutes: Routes = [
    {
      path: 'dashboard',
      component: DashboardComponent,
      // Сервіс буде "синглтоном" тільки в рамках /dashboard та його дітей
      providers: [DashboardStateService],
      children: [
        { path: 'stats', component: StatsComponent },
        { path: 'settings', component: SettingsComponent }
      ]
    }
  ];
</code>
<p>Цей патерн — чудова альтернатива глобальному <code>'root'</code> (який висить у пам'яті постійно). Екземпляр <code>DashboardStateService</code> буде спільним для <code>DashboardComponent</code>, <code>StatsComponent</code> та <code>SettingsComponent</code>, що дозволить їм легко спілкуватися між собою, але він безпечно видалиться з пам'яті збирачем сміття, щойно користувач залишить гілку <code>/dashboard</code>.</p>
