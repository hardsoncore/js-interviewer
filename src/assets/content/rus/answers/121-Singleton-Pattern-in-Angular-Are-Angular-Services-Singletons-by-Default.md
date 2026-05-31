<h3>Введение и Базовое определение</h3>
<p><span class="accent">Паттерн Singleton (Одиночка)</span> — это порождающий паттерн проектирования, который гарантирует, что у класса есть только один экземпляр, и предоставляет глобальную точку доступа к нему. В контексте Angular это означает, что сервис инициализируется ровно один раз, и все компоненты или другие сервисы, которые просят внедрить эту зависимость (inject), получают ссылку на один и тот же объект в памяти.</p>

<h3>Являются ли сервисы в Angular синглтонами по умолчанию?</h3>
<p>Короткий ответ: <span class="accent">Да, если они сгенерированы через Angular CLI</span> (используют <code>providedIn: 'root'</code>). Однако технически Angular-сервисы <strong>не являются строгими абсолютными синглтонами по своей природе</strong> — их "синглтонность" зависит от того, где и как они зарегистрированы в дереве внедрения зависимостей (DI Tree).</p>
<p>Если сервис зарегистрирован на уровне глобального инжектора (Root Injector), он будет синглтоном. Но если он зарегистрирован на уровне компонентов (например, через массив <code>providers</code> в декораторе <code>@Component</code>), то на каждый такой компонент Angular создаст <strong>новый, отдельный экземпляр</strong> сервиса.</p>

<h3>Примеры кода</h3>
<p>Рассмотрим классический пример сервиса, который является синглтоном для всего приложения:</p>
<code class="code">
  import { Injectable, signal } from '@angular/core';

  @Injectable({
    providedIn: 'root' // Глобальный синглтон на всю жизнь приложения
  })
  export class GlobalStateService {
    public counter = signal(0);

    public reset(): void {
      this.counter.set(0); // Тот самый метод очистки состояния, о котором говорилось в рекомендациях
    }
  }
</code>
<p>А вот пример того, как легко "разбить" глобальный синглтон, привязав жизненный цикл создания сервиса к компоненту:</p>
<code class="code">
  import { Component, inject } from '@angular/core';
  import { GlobalStateService } from './global-state.service';

  @Component({
    selector: 'app-local-counter',
    standalone: true,
    template: `<button (click)="state.counter.update(v => v + 1)">+</button>`,
    // Перекрываем root-инжектор: этот компонент и его дети получат СВОЙ инстанс
    providers: [GlobalStateService]
  })
  export class LocalCounterComponent {
    // Современный способ внедрения зависимостей без раздувания конструктора
    protected state = inject(GlobalStateService);
  }
</code>

<h3>Ключевые особенности и применение</h3>
<ul>
  <li><span class="accent">Единое состояние приложения:</span> Синглтон-сервисы идеально подходят для хранения общих данных (state management), таких как текущий авторизованный пользователь, содержимое корзины покупок или кэшированные ответы API.</li>
  <li><span class="accent">Механика Dependency Injection:</span> Паттерн Singleton в Angular реализуется не через классический статический метод (как <code>Service.getInstance()</code> в ООП), а невидимо управляется самим фреймворком через иерархию инжекторов.</li>
</ul>

<h3>Важные нюансы и рекомендации</h3>
<p class="info info--orange">Будьте очень осторожны с данными (состоянием) внутри root-синглтонов. Так как инстанс такого сервиса живет от старта приложения до закрытия вкладки браузера, его свойства могут накапливаться или оставаться устаревшими (stale data). Обязательно реализуйте методы очистки стейта — например, очищайте данные пользователя при логауте!</p>
<p class="info info--blue">Всегда старайтесь использовать синтаксис <code>providedIn: 'root'</code> по умолчанию. В отличие от устаревшего подхода с добавлением сервиса в <code>providers</code> внутри <code>AppModule</code>, современный способ поддерживает <span class="accent">Tree-shaking</span>. Если ваш сервис нигде не используется, бандлер Webpack с легкостью удалит код сервиса из итогового production-билда, уменьшив вес бандла.</p>

<p class="deep-dive">Углубленный конспект</p>
<h3>Иерархические инжекторы (Environment vs Element)</h3>
<p>В Angular синглтон — это концепция <strong>в рамках конкретного инжектора</strong>. Под капотом система DI работает с двумя параллельными деревьями инжекторов:</p>
<ul>
  <li><span class="accent">EnvironmentInjector (ранее ModuleInjector):</span> Отвечает за глобально провайднутые зависимости (через <code>providedIn: 'root'</code>, модули или конфигурацию роутов).</li>
  <li><span class="accent">ElementInjector:</span> Неявно создается на каждом DOM-узле, где есть компонент или директива (через <code>providers</code> в <code>@Component</code>). Иерархия этих инжекторов строго следует за иерархией DOM.</li>
</ul>
<p class="info info--blue">При поиске зависимости фреймворк сначала идет вверх по дереву <strong>ElementInjector</strong> (от ребенка к родителю). Если сервис не найден в дереве компонентов, поиск делегируется в <strong>EnvironmentInjector</strong> (роуты, модули и, в конечном итоге, <code>root</code>).</p>

<h3>Синглтоны подветви роутов в Standalone-компонентах</h3>
<p>Особого внимания заслуживает ситуация с ленивой загрузкой (lazy loading) и Standalone API. Вы можете создать "локальный синглтон", который будет общим для нескольких компонентов, но при этом будет жить только пока пользователь находится в пределах определенного роута.</p>
<p>Для этого сервис передается в массив <code>providers</code> конфигурации роута. Angular создаст новый дочерний <strong>EnvironmentInjector</strong>:</p>
<code class="code">
  export const appRoutes: Routes = [
    {
      path: 'dashboard',
      component: DashboardComponent,
      // Сервис будет "синглтоном" только в рамках /dashboard и его детей
      providers: [DashboardStateService],
      children: [
        { path: 'stats', component: StatsComponent },
        { path: 'settings', component: SettingsComponent }
      ]
    }
  ];
</code>
<p>Данный паттерн — отличная альтернатива глобальному <code>'root'</code> (который висит в памяти постоянно). Инстанс <code>DashboardStateService</code> будет общим для <code>DashboardComponent</code>, <code>StatsComponent</code> и <code>SettingsComponent</code>, что позволит им легко общаться между собой, но безопасно удалится из памяти сборщиком мусора, как только пользователь покинет ветку <code>/dashboard</code>.</p>
