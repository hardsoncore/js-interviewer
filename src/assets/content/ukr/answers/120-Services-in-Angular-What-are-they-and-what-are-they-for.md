<h3>Вступ та базове визначення</h3>
<p><span class="accent">Сервіс (Service)</span> в Angular — це широка категорія сутностей, що охоплює будь-які значення, функції або особливості, які потрібні вашому додатку для виконання бізнес-логіки. Головна ідея використання сервісів — винесення логіки, роботи з даними та інших обчислювальних завдань за межі компонентів фронтенду.</p>
<p>Фізично, сервіс являє собою TypeScript клас з вузькоспеціалізованим завданням (наприклад, логування, мережеві запити API або зберігання стану), який впроваджується в будь-які компоненти або інші сервіси через патерн <span class="accent">Dependency Injection (DI)</span>.</p>

<h3>Для чого потрібні сервіси в Angular</h3>
<p>Основне призначення компонентів — надавати дані для шаблону (HTML) і реагувати на дії користувача (кліки, введення тексту). Вони не повинні самостійно отримувати дані з сервера, складним чином валідувати введення користувача або займатися кешуванням.</p>
<p>Делегуючи такі завдання сервісам, ми отримуємо ряд потужних архітектурних переваг:</p>
<ul>
  <li><span class="accent">Перевикористання (Reusability):</span> Один і той же сервіс (наприклад, сервіс авторизації) може бути легко використаний у безлічі різних компонентів без дублювання коду.</li>
  <li><span class="accent">Розділення відповідальності (Separation of Concerns):</span> Компоненти стають простими і "дурними", займаючись тільки Presentation-логікою. Бізнес-логіка живе виключно в сервісах.</li>
  <li><span class="accent">Тестованість (Testability):</span> Винесений в ізольований клас код набагато легше покривати Unit-тестами, а при тестуванні компонентів ми можемо просто замокати (Mock) сам сервіс, щоб протестувати реакцію UI без реальних запитів до API.</li>
</ul>

<h3>Приклади базового сервісу</h3>
<p>Давайте подивимося на простий приклад створення та впровадження сервісу для роботи з користувачами.</p>
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
<p>А ось патерн використання (впровадження) цього сервісу в компоненті:</p>
<code class="code">
  import { Component } from '@angular/core';
  // Імпортуємо саме тип сервісу, не ініціалізуючи його власноруч!
  import { UserService } from './user.service';

  @Component({
    selector: 'app-users',
    template: '...',
  })
  export class UsersComponent {
    users: string[];

    // Впровадження залежності відбувається через constructor
    constructor(private userService: UserService) {
      this.users = this.userService.getUsers();
    }
  }
</code>

<h3>Життєвий цикл сервісів в Angular</h3>
<p>Сервіси не мають такого багатого життєвого циклу, як директиви або компоненти (немає подій на зразок <strong>ngOnInit</strong> або <strong>ngAfterViewInit</strong>). Життєвий цикл сервісу обмежується лише моментом його створення (виклик <strong>constructor</strong>) і знищення — хуком <strong>ngOnDestroy</strong>.</p>
<p>Те, як довго сервіс живе, залежить від того, де він був "провайднутий" (підключений у дерево DI):</p>
<ul>
  <li><span class="accent">Синглтон (providedIn: 'root')</span> — сервіс створюється один раз при першому зверненні до нього. Він живе весь час роботи додатка. Метод <strong>ngOnDestroy</strong> для нього практично ніколи не викликається до закриття вкладки.</li>
  <li><span class="accent">На рівні компонента (Component Providers)</span> — якщо сервіс вказаний у масиві <strong>providers: [UserService]</strong> декоратора @Component, новий ізольований екземпляр сервісу буде створюватися разом з <strong>кожним</strong> новим екземпляром цього компонента. І знищуватися такий екземпляр сервісу буде теж разом з компонентом.</li>
  <li><span class="accent">У лінивому модулі (Lazy-loaded Module)</span> — при переході на Lazy-модуль створюється його власний Injector, і, як наслідок, буде створений свіжий екземпляр сервісу, специфічний тільки для цього модуля і його компонентів.</li>
</ul>

<h3>Важливі нюанси та рекомендації</h3>
<p class="info info--orange">Уникайте прямого маніпулювання DOM-деревом (через <code>document.getElementById</code>, <code>ElementRef</code> тощо) всередині сервісів! Сервіси призначені для роботи з абстрактними даними. Якщо вам потрібно маніпулювати DOM, виносьте це в Директиви (Directives) або самі Компоненти.</p>
<p class="info info--blue">Не створюйте екземпляри сервісів власноруч через <code>new UserService()</code>. Це порушує концепцію Inversion of Control і робить код нетестованим, оскільки сервіс перестає відстежуватися Angular DI-деревом.</p>

<p class="deep-dive">Поглиблений конспект</p>
<h3>DI-дерева та витоки пам'яті (Memory Leaks)</h3>
<p>Дуже часта і небезпечна помилка пов'язана з відписками (Unsubscribe) від <strong>RxJS Observables</strong> всередині компонентних сервісів. Якщо сервіс є <code>'root'</code> синглтоном, створені ним довгоживучі підписки нічим не шкодять.</p>
<p>Але якщо ви провайдите сервіс <span class="accent">на рівні компонента</span>, і цей компонент часто створюється/знищується під час роутингу (наприклад, модальне вікно), і при цьому цей локальний сервіс слухає глобальні події (наприклад, Router events, state з NgRx store або WebSocket), то відсутність відписки (destroy) спровокує величезний витік пам'яті.</p>

<h4>Як правильно робити відписки всередині сервісів:</h4>
<code class="code">
  import { Injectable, OnDestroy } from '@angular/core';
  import { Subject } from 'rxjs';
  import { takeUntil } from 'rxjs/operators';

  @Injectable() // Провайдиться в providers:[] певного компонента
  export class ScopedDataService implements OnDestroy {
    private destroy$ = new Subject<void>();

    constructor(private globalStore: Store) {
      this.globalStore.select('user')
        .pipe(takeUntil(this.destroy$)) // автоматична відписка за тригером
        .subscribe(user => console.log(user));
    }

    ngOnDestroy(): void {
      // DI Angular'а знищить екземпляр сервісу разом із компонентом
      // і смикне цей метод для вивільнення пам'яті
      this.destroy$.next();
      this.destroy$.complete();
    }
  }
</code>
<p>Подібний патерн із реалізацією <strong>OnDestroy</strong> у сервісі дозволяє безпечно користуватися ізольованими контекстами DI, елегантно керуючи пам'яттю у зв'язці з RxJS.</p>
