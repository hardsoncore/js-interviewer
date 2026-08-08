<h3>Суть F.prototype</h3>
<p><span class="accent">F.prototype</span> — це звичайна властивість функції-конструктора, у якій лежить об'єкт-шаблон. Оператор <code>new</code> бере цей об'єкт і записує його у прихований слот <code>[[Prototype]]</code> нового екземпляра — так екземпляр отримує спільні методи.</p>

<p class="info"><strong>Головна думка:</strong> <code>F.prototype</code> — не прототип самої функції <code>F</code>, а заготовка прототипу для її майбутніх екземплярів. Цю властивість читає лише оператор <code>new</code> і лише в момент виклику.</p>

<h3>Що робить new: чотири кроки</h3>
<ol>
  <li>Створює новий порожній об'єкт.</li>
  <li>Записує в його <code>[[Prototype]]</code> поточне значення <code>F.prototype</code>.</li>
  <li>Викликає <code>F</code> з <code>this</code>, прив'язаним до цього об'єкта: тіло конструктора наповнює його власними властивостями.</li>
  <li>Повертає <code>this</code>. Виняток: якщо конструктор явно повернув об'єкт — повернеться він, а примітивний <code>return</code> ігнорується.</li>
</ol>

<code class="code">
  function Person(name) {
    this.name = name;                 // крок 3: власна властивість екземпляра
  }

  Person.prototype.hi = function () { // спільний метод для всіх екземплярів
    return 'Привіт, ' + this.name;
  };

  const alice = new Person('Alice');

  alice.hi();                                        // 'Привіт, Alice' — метод знайдено в прототипі
  Object.getPrototypeOf(alice) === Person.prototype; // true
</code>

<h3>Властивість constructor</h3>
<p>За замовчуванням <code>F.prototype</code> — це об'єкт з єдиною властивістю <code>constructor</code>, яка посилається назад на саму <code>F</code>. Екземпляри бачать її ланцюжком: <code>alice.constructor === Person</code>.</p>

<h3>Три класичні пастки</h3>
<ul>
  <li><strong>Зв'язок фіксується в момент виклику.</strong> Якщо після <code>new F()</code> цілком перезаписати <code>F.prototype = { ... }</code>, вже створені об'єкти й далі посилатимуться на старий прототип, а новий дістанеться лише наступним екземплярам.</li>
  <li><strong>Мутація — інша річ.</strong> <code>F.prototype.sayHi = ...</code> змінює той самий об'єкт у пам'яті, тому метод миттєво з'явиться і в раніше створених екземплярів.</li>
  <li><strong>Втрата constructor.</strong> Повна перезапис <code>F.prototype</code> затирає дефолтний <code>constructor</code>. Або дописуй методи точково, або відновлюй посилання вручну: <code>F.prototype = { constructor: F, method() {} }</code>.</li>
</ul>

<p class="info info--orange">Властивість <code>prototype</code> є лише у функцій, які вміють бути конструктором. У стрілкових функцій і в методів, записаних скороченим синтаксисом, її немає — <code>new</code> з ними кине <code>TypeError</code>.</p>

<p class="deep-dive">Поглиблений конспект</p>

<h3>Як виглядає new «зсередини»</h3>
<p>За <code>new</code> стоїть внутрішній метод <code>[[Construct]]</code>, який є не в кожної функції. Приблизна емуляція звичайним JS:</p>
<code class="code">
  function myNew(F, ...args) {
    const obj = Object.create(F.prototype);  // кроки 1-2
    const result = F.apply(obj, args);       // крок 3

    return (typeof result === 'object' &amp;&amp; result !== null) || typeof result === 'function'
      ? result
      : obj;                                 // крок 4
  }
</code>
<p>Ще один нюанс кроку 2: якщо у <code>F.prototype</code> лежить не об'єкт (наприклад, хтось присвоїв туди число), рушій не падає — екземпляр мовчки отримує <code>Object.prototype</code>.</p>

<h3>Хто вміє бути конструктором</h3>
<ul>
  <li><code>[[Construct]]</code> є у function declaration / function expression і в класів.</li>
  <li>Немає — у стрілкових функцій, у методів скороченого синтаксису (<code>{ foo() {} }</code>), у генераторів та async-функцій.</li>
  <li>У зв'язаної функції (<code>F.bind(...)</code>) <code>[[Construct]]</code> зберігається, але під час виклику через <code>new</code> прив'язаний <code>this</code> ігнорується — <code>this</code> усе одно стане новим об'єктом.</li>
</ul>

<h3>new.target</h3>
<p>Усередині функції <code>new.target</code> дорівнює самій функції при виклику через <code>new</code> і <code>undefined</code> при звичайному виклику. Це спосіб захиститися від виклику конструктора без <code>new</code> — інакше <code>this</code> виявиться <code>undefined</code> у strict mode (або глобальним об'єктом поза ним), і властивості потечуть не туди.</p>
<code class="code">
  function Person(name) {
    if (!new.target) return new Person(name); // підстраховка

    this.name = name;
  }
</code>
<p>Класи розв'язують ту саму проблему жорсткіше: виклик класу без <code>new</code> завжди кидає <code>TypeError</code>.</p>

<h3>Навіщо взагалі класти методи в прототип</h3>
<p>Метод, оголошений усередині конструктора (<code>this.hi = function () {}</code>), створюється заново для кожного екземпляра: тисяча об'єктів — тисяча однакових функцій у пам'яті. Метод у <code>F.prototype</code> існує в єдиному екземплярі, і всі об'єкти звертаються до нього ланцюжком. Саме тому в прототип іде поведінка, а в <code>this</code> — стан.</p>

<h3>Відмінності prototype у класів</h3>
<ul>
  <li>Властивість <code>prototype</code> у класу неперелічувана і <strong>недоступна для запису</strong> — перезаписати <code>Class.prototype = {}</code> не можна, лише мутувати.</li>
  <li>Методи класу теж неперелічувані: вони не потрапляють у <code>for..in</code>, на відміну від методів, дописаних вручну в <code>F.prototype</code>.</li>
</ul>

<h3>instanceof спирається на prototype, а не на constructor</h3>
<p><code>obj instanceof F</code> іде ланцюжком <code>[[Prototype]]</code> об'єкта і шукає там поточний <code>F.prototype</code>. Звідси неприємний наслідок перезапису прототипу: старі екземпляри перестають бути <code>instanceof F</code>, хоча створювала їх саме ця функція.</p>
<code class="code">
  function F() {}
  const old = new F();

  F.prototype = { hello() {} }; // прототип замінено цілком

  old instanceof F;             // false — ланцюжок веде на попередній об'єкт
  new F() instanceof F;         // true
</code>
<p>Саму поведінку <code>instanceof</code> при цьому можна перевизначити через <code>Symbol.hasInstance</code>.</p>

<p class="info info--blue">На <code>constructor</code> не можна покладатися як на гарантію: це звичайна записувана властивість прототипу. Її легко затерти або підробити, а рушій її походження не перевіряє. Щоб визначити «чи того типу об'єкт», використовують <code>instanceof</code> або duck typing.</p>
