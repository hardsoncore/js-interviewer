<h3>Что такое паттерны проектирования</h3>
<p><span class="accent">Паттерн проектирования</span> — типовое, проверенное решение часто встречающейся задачи проектирования кода. Это не готовый код и не библиотека, а схема-идея, которую адаптируют под конкретную задачу.</p>

<p class="info"><strong>Главная мысль:</strong> паттерны дают две вещи — проверенные решения и общий язык команды: слово «Observer» заменяет абзац объяснений. Классификация GoF делит их на три группы: порождающие — создание объектов, структурные — композиция, поведенческие — взаимодействие.</p>

<h3>Три категории (GoF)</h3>
<ul>
  <li><strong>Порождающие</strong> — гибкое создание объектов: <span class="accent">Singleton</span>, <span class="accent">Factory Method</span>, Builder.</li>
  <li><strong>Структурные</strong> — сборка объектов в более крупные конструкции: <span class="accent">Adapter</span>, <span class="accent">Decorator</span>, <span class="accent">Facade</span>, Proxy.</li>
  <li><strong>Поведенческие</strong> — общение объектов и распределение ответственности: <span class="accent">Observer</span>, <span class="accent">Strategy</span>, Command, Iterator.</li>
</ul>

<h3>Паттерны вокруг нас во фронтенде</h3>
<p>Сильный ход на собеседовании — показать, что паттерны уже живут в твоём стеке:</p>
<ul>
  <li><strong>Singleton</strong> — Angular-сервис с <code>providedIn: 'root'</code>, стор Redux/Pinia: один экземпляр на всё приложение.</li>
  <li><strong>Observer</strong> — <code>addEventListener</code>, RxJS <code>Observable</code>, <code>EventEmitter</code>: подписчики реагируют на события источника.</li>
  <li><strong>Decorator</strong> — <code>@Component</code> в Angular, HOC в React: добавляем поведение, не переписывая исходный код.</li>
  <li><strong>Facade</strong> — сервис, прячущий за парой простых методов HTTP, кеширование и ретраи.</li>
  <li><strong>Strategy</strong> — <code>sort(comparator)</code>, валидаторы форм: взаимозаменяемые алгоритмы за общим интерфейсом.</li>
  <li><strong>Proxy</strong> — реактивность Vue 3: перехват чтения и записи свойств объекта.</li>
</ul>

<p>Классический Observer в несколько строк:</p>
<code class="code">
  class EventBus {
    handlers = {};
    on(event, fn) { (this.handlers[event] ??= []).push(fn); }
    emit(event, data) { this.handlers[event]?.forEach(fn =&gt; fn(data)); }
  }

  const bus = new EventBus();
  bus.on('login', user =&gt; console.log('Привет,', user));
  bus.emit('login', 'Аня'); // источник не знает своих подписчиков
</code>

<p class="info info--orange">Главная ловушка — overengineering: паттерн ради паттерна. Паттерн применяют, когда узнали в задаче знакомую проблему, а не ищут, «куда бы вставить Builder». Простой код без паттерна лучше сложного кода с ним.</p>

<p class="deep-dive">Углубленный конспект</p>

<h3>Откуда взялись паттерны</h3>
<p>Термин закрепила книга «Design Patterns» (1994) «банды четырёх» (Gang of Four, GoF): 23 паттерна, выведенные из практики C++ и Smalltalk. В JavaScript часть из них растворилась в самом языке: Iterator встроен через <code>Symbol.iterator</code> и <code>for..of</code>, Strategy и Command часто сводятся к передаче функций первого класса, а Module из IIFE-трюка стал синтаксисом ES modules.</p>

<h3>Singleton: почему его и любят, и критикуют</h3>
<p>ES-модуль — естественный синглтон: код модуля выполняется один раз, и все импорты получают один и тот же экземпляр.</p>
<code class="code">
  // api.js
  class ApiClient { /* ... */ }
  export const api = new ApiClient(); // единственный экземпляр на приложение

  // в любом месте: import { api } from './api.js';
</code>
<p>Критика: синглтон — это глобальное состояние со скрытыми зависимостями. Код, дёргающий <code>api</code> напрямую, тяжело тестировать — экземпляр не подменишь на мок. Поэтому фреймворки предпочитают <span class="accent">Dependency Injection</span>: Angular-сервис остаётся единственным экземпляром в рамках инжектора, но зависимость объявлена явно и легко подменяется в тестах.</p>

<h3>Factory Method и Builder</h3>
<code class="code">
  // Фабрика: одна точка, решающая, какой объект создать
  function createNotification(type, text) {
    switch (type) {
      case 'toast': return new Toast(text);
      case 'modal': return new Modal(text);
      default: throw new Error('Неизвестный тип');
    }
  }
</code>
<p>Фабрика изолирует логику выбора класса: вызывающий код не знает о конкретных классах и не меняется при добавлении нового типа. Builder собирает сложный объект по шагам (<code>new QueryBuilder().where(...).limit(10).build()</code>) — во фронтенде встречается в конфигураторах запросов и тестовых фикстурах.</p>

<h3>Adapter и Proxy</h3>
<p>Adapter приводит чужой интерфейс к ожидаемому: например, обёртка над сторонней библиотекой аналитики, чтобы приложение зависело от своего интерфейса, а не от вендора — замена библиотеки сводится к переписыванию одного адаптера. Proxy перехватывает доступ к объекту, не меняя его интерфейс: <code>new Proxy(target, { get, set })</code> — на этом построена реактивность Vue 3 и MobX.</p>

<h3>Архитектурные паттерны — другой уровень</h3>
<p>MVC, MVVM, Flux/Redux — паттерны архитектуры приложения, а не GoF-паттерны уровня классов. Но собраны они из тех же кирпичей: Redux — это Observer (подписки на стор) + Command (экшены как объекты-команды) + единственный стор-синглтон с чистыми редьюсерами.</p>

<h3>Антипаттерны</h3>
<ul>
  <li><strong>God Object</strong> — компонент или сервис на тысячи строк, который знает и умеет всё.</li>
  <li><strong>Spaghetti code</strong> — логика без структуры, всё зависит от всего.</li>
  <li><strong>Golden Hammer</strong> — один знакомый инструмент для любых задач («везде Redux»).</li>
</ul>

<p class="info info--blue">Знание паттернов ценно не перечислением названий: интервьюер хочет услышать, что ты узнаёшь паттерн в живом коде (RxJS — это Observer, DI — управляемый Singleton) и понимаешь цену абстракции — каждый добавленный слой должен окупаться.</p>
