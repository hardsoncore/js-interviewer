<h3>1. Что такое Functional Guards?</h3>
<p>
  <span class="accent">Functional Guards</span> — это обычные функции (как правило, стрелочные), которые выполняют ту же задачу, что и старые классовые гарды: решают, может ли пользователь перейти на определенный маршрут (или покинуть его). Они возвращают те же типы данных: <code>boolean</code>, <code>UrlTree</code>, <code>Promise</code> или <code>Observable</code>.
</p>

<p>
  Главная архитектурная особенность: они используют функцию <code>inject()</code> из <code>@angular/core</code> для получения нужных сервисов (например, <code>AuthService</code> или <code>Router</code>), поскольку у них больше нет конструктора, как у классов.
</p>

<h3>2. Почему классовые Guards были объявлены deprecated?</h3>
<p>
  Начиная с Angular 15.2, классы, имплементирующие интерфейсы <code>CanActivate</code>, <code>CanActivateChild</code>, <code>CanDeactivate</code> и <code>CanMatch</code>, получили статус <code>deprecated</code>. Этому есть несколько весомых причин:
</p>

<p>
  <strong>Избавление от бойлерплейта (лишнего кода)</strong>: Для создания классового гарда требовалось навесить декоратор <code>@Injectable({ providedIn: 'root' })</code>, объявить класс, имплементировать нужный интерфейс и прописать зависимости в конструкторе. Функциональный гард часто укладывается в 2-3 строки кода.
</p>

<p>
  <strong>Улучшенный Tree-shaking (оптимизация бандла)</strong>: Инструментам сборки гораздо проще анализировать и удалять неиспользуемые чистые функции из итогового бандла, чем классы с декораторами. Это напрямую влияет на скорость загрузки приложения.
</p>

<p>
  <strong>Гибкость и композиция</strong>: Функции невероятно легко комбинировать. Ты можешь создавать фабрики функций (например, <code>requireRole('ADMIN')</code>), которые будут возвращать нужный гард. С классами для этого приходилось писать сложные обертки или наследовать базовые классы.
</p>

<p>
  <strong>Локальность кода</strong>: Если гард простой, его теперь можно писать прямо в конфигурации роутера (routes.ts), не создавая под каждый чих отдельный файл *.guard.ts.
</p>

<h3>3. Наглядное сравнение (Было / Стало)</h3>
<p>Для конспекта полезно держать перед глазами разницу в коде.</p>

<p><strong>Как было (Классовый подход):</strong></p>

<code class="code">
  @Injectable({ providedIn: 'root' })
  export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(): boolean | UrlTree {
      if (this.authService.isLoggedIn()) {
        return true;
      }
      return this.router.parseUrl('/login');
    }
  }

  // В роутинге:
  // { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }
</code>

<p><strong>Как стало (Функциональный подход):</strong></p>

<code class="code">
  export const authGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    return authService.isLoggedIn() ? true : router.parseUrl('/login');
  };

  // В роутинге:
  // { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] }
</code>

<p>
  (А если гард используется только в одном месте, эту логику можно написать прямо внутри массива canActivate в конфиге маршрутов).
</p>

<h3>Резюме</h3>

<p>
  <span class="accent">Functional Guards</span> — это современный, лаконичный и более оптимальный способ управления доступом к маршрутам в Angular. Они избавляют от лишнего кода, улучшают производительность бандла и делают код более гибким и удобным для поддержки. Поэтому классовые Guards были объявлены deprecated, чтобы поощрить разработчиков переходить на новый, более эффективный подход.
</p>
