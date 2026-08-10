<h3>Що таке паттерни проектування</h3>
<p><span class="accent">Паттерн проектування</span> — типове, перевірене рішення задачі проектування коду, що часто зустрічається. Це не готовий код і не бібліотека, а схема-ідея, яку адаптують під конкретну задачу.</p>

<p class="info"><strong>Головна думка:</strong> паттерни дають дві речі — перевірені рішення та спільну мову команди: слово «Observer» замінює абзац пояснень. Класифікація GoF ділить їх на три групи: породжувальні — створення об'єктів, структурні — композиція, поведінкові — взаємодія.</p>

<h3>Три категорії (GoF)</h3>
<ul>
  <li><strong>Породжувальні</strong> — гнучке створення об'єктів: <span class="accent">Singleton</span>, <span class="accent">Factory Method</span>, Builder.</li>
  <li><strong>Структурні</strong> — збирання об'єктів у більші конструкції: <span class="accent">Adapter</span>, <span class="accent">Decorator</span>, <span class="accent">Facade</span>, Proxy.</li>
  <li><strong>Поведінкові</strong> — спілкування об'єктів і розподіл відповідальності: <span class="accent">Observer</span>, <span class="accent">Strategy</span>, Command, Iterator.</li>
</ul>

<h3>Паттерни навколо нас у фронтенді</h3>
<p>Сильний хід на співбесіді — показати, що паттерни вже живуть у твоєму стеку:</p>
<ul>
  <li><strong>Singleton</strong> — Angular-сервіс із <code>providedIn: 'root'</code>, стор Redux/Pinia: один екземпляр на весь застосунок.</li>
  <li><strong>Observer</strong> — <code>addEventListener</code>, RxJS <code>Observable</code>, <code>EventEmitter</code>: підписники реагують на події джерела.</li>
  <li><strong>Decorator</strong> — <code>@Component</code> в Angular, HOC у React: додаємо поведінку, не переписуючи вихідний код.</li>
  <li><strong>Facade</strong> — сервіс, що ховає за парою простих методів HTTP, кешування та ретраї.</li>
  <li><strong>Strategy</strong> — <code>sort(comparator)</code>, валідатори форм: взаємозамінні алгоритми за спільним інтерфейсом.</li>
  <li><strong>Proxy</strong> — реактивність Vue 3: перехоплення читання та запису властивостей об'єкта.</li>
</ul>

<p>Класичний Observer у кілька рядків:</p>
<code class="code">
  class EventBus {
    handlers = {};
    on(event, fn) { (this.handlers[event] ??= []).push(fn); }
    emit(event, data) { this.handlers[event]?.forEach(fn =&gt; fn(data)); }
  }

  const bus = new EventBus();
  bus.on('login', user =&gt; console.log('Привіт,', user));
  bus.emit('login', 'Аня'); // джерело не знає своїх підписників
</code>

<p class="info info--orange">Головна пастка — overengineering: паттерн заради паттерну. Паттерн застосовують, коли впізнали в задачі знайому проблему, а не шукають, «куди б вставити Builder». Простий код без паттерну кращий за складний код із ним.</p>

<p class="deep-dive">Поглиблений конспект</p>

<h3>Звідки взялися паттерни</h3>
<p>Термін закріпила книга «Design Patterns» (1994) «банди чотирьох» (Gang of Four, GoF): 23 паттерни, виведені з практики C++ і Smalltalk. У JavaScript частина з них розчинилася в самій мові: Iterator вбудований через <code>Symbol.iterator</code> і <code>for..of</code>, Strategy і Command часто зводяться до передачі функцій першого класу, а Module з IIFE-трюку став синтаксисом ES modules.</p>

<h3>Singleton: чому його і люблять, і критикують</h3>
<p>ES-модуль — природний синглтон: код модуля виконується один раз, і всі імпорти отримують один і той самий екземпляр.</p>
<code class="code">
  // api.js
  class ApiClient { /* ... */ }
  export const api = new ApiClient(); // єдиний екземпляр на застосунок

  // у будь-якому місці: import { api } from './api.js';
</code>
<p>Критика: синглтон — це глобальний стан із прихованими залежностями. Код, що смикає <code>api</code> напряму, важко тестувати — екземпляр не підміниш на мок. Тому фреймворки віддають перевагу <span class="accent">Dependency Injection</span>: Angular-сервіс залишається єдиним екземпляром у межах інжектора, але залежність оголошена явно і легко підміняється в тестах.</p>

<h3>Factory Method і Builder</h3>
<code class="code">
  // Фабрика: одна точка, що вирішує, який об'єкт створити
  function createNotification(type, text) {
    switch (type) {
      case 'toast': return new Toast(text);
      case 'modal': return new Modal(text);
      default: throw new Error('Невідомий тип');
    }
  }
</code>
<p>Фабрика ізолює логіку вибору класу: код, що викликає, не знає про конкретні класи й не змінюється при додаванні нового типу. Builder збирає складний об'єкт покроково (<code>new QueryBuilder().where(...).limit(10).build()</code>) — у фронтенді зустрічається в конфігураторах запитів і тестових фікстурах.</p>

<h3>Adapter і Proxy</h3>
<p>Adapter приводить чужий інтерфейс до очікуваного: наприклад, обгортка над сторонньою бібліотекою аналітики, щоб застосунок залежав від свого інтерфейсу, а не від вендора — заміна бібліотеки зводиться до переписування одного адаптера. Proxy перехоплює доступ до об'єкта, не змінюючи його інтерфейс: <code>new Proxy(target, { get, set })</code> — на цьому побудована реактивність Vue 3 і MobX.</p>

<h3>Архітектурні паттерни — інший рівень</h3>
<p>MVC, MVVM, Flux/Redux — паттерни архітектури застосунку, а не GoF-паттерни рівня класів. Але зібрані вони з тих самих цеглинок: Redux — це Observer (підписки на стор) + Command (екшени як об'єкти-команди) + єдиний стор-синглтон із чистими редьюсерами.</p>

<h3>Антипаттерни</h3>
<ul>
  <li><strong>God Object</strong> — компонент або сервіс на тисячі рядків, який знає і вміє все.</li>
  <li><strong>Spaghetti code</strong> — логіка без структури, все залежить від усього.</li>
  <li><strong>Golden Hammer</strong> — один знайомий інструмент для будь-яких задач («скрізь Redux»).</li>
</ul>

<p class="info info--blue">Знання паттернів цінне не перелічуванням назв: інтерв'юер хоче почути, що ти впізнаєш паттерн у живому коді (RxJS — це Observer, DI — керований Singleton) і розумієш ціну абстракції — кожен доданий шар має окупатися.</p>
