<h3>Суть: делегування, а не копіювання</h3>
<p><span class="accent">Наслідування в JavaScript</span> — прототипне: у кожного об'єкта є приховане посилання <code>[[Prototype]]</code> на інший об'єкт — його прототип. Коли властивості немає в самому об'єкті, рушій шукає її в прототипі, потім у прототипі прототипа — і так по всьому ланцюжку.</p>

<p class="info"><strong>Головна думка:</strong> наслідування в JS — це делегування: властивість не копіюється в нащадка, а знаходиться у прототипа в момент звернення. Синтаксис <code>class</code> — цукор над цим же механізмом.</p>

<h3>Ланцюжок прототипів (Prototype Chain)</h3>
<code class="code">
  const animal = { eats: true };
  const rabbit = Object.create(animal); // rabbit.[[Prototype]] === animal

  rabbit.jumps = true;
  console.log(rabbit.jumps); // true — власна властивість
  console.log(rabbit.eats);  // true — знайдено в прототипі
</code>
<p>Пошук іде знизу вгору до першого збігу. Вершина майже будь-якого ланцюжка — <code>Object.prototype</code> (звідси у всіх об'єктів «безкоштовні» <code>toString</code> і <code>hasOwnProperty</code>), його прототип — <code>null</code>, кінець пошуку.</p>

<h3>Три способи задати наслідування</h3>
<ul>
  <li><code>class ... extends</code> — сучасний стандарт: конструктори, <code>super</code>, читабельні ієрархії.</li>
  <li><code>Object.create(proto)</code> — створити об'єкт з потрібним прототипом напряму, без конструкторів.</li>
  <li>Функція-конструктор + <code>F.prototype</code> + <code>new</code> — «докласова» класика, на якій усе трималося до ES6.</li>
</ul>
<code class="code">
  class Animal {
    constructor(name) { this.name = name; }
    eat() { return this.name + ' їсть'; }
  }

  class Rabbit extends Animal {
    jump() { return this.name + ' стрибає'; }
  }

  new Rabbit('Кролик').eat(); // метод знайдено в Animal.prototype
</code>

<h3>Читання — ланцюжком, запис — у сам об'єкт</h3>
<p>Ланцюжок працює лише на <strong>читання</strong>. Запис <code>rabbit.eats = false</code> створює власну властивість прямо в об'єкті й «затіняє» успадковану (shadowing) — сам прототип не змінюється. Тому методи спільні для всіх екземплярів (лежать в одному прототипі й не дублюються в пам'яті), а стан у кожного свій.</p>

<p class="info info--orange">Часта плутанина: <code>class</code> не перетворює JS на Java. Класичного наслідування «копіюванням» тут немає — є живий ланцюжок об'єктів: додайте метод у прототип під час роботи програми, і він миттєво стане доступним усім нащадкам.</p>

<p class="deep-dive">Поглиблений конспект</p>

<h3>Що насправді робить extends</h3>
<p><code>class Rabbit extends Animal</code> вибудовує одразу <strong>два</strong> ланцюжки: <code>Rabbit.prototype.[[Prototype]] = Animal.prototype</code> — для методів екземплярів, і <code>Rabbit.[[Prototype]] = Animal</code> — тому успадковується навіть статика (<code>Rabbit.create()</code> знайде <code>static create()</code> з <code>Animal</code>). Є й відмінності класу від «ручного» конструктора: методи класу неперелічувані (не потрапляють у <code>for..in</code>), тіло класу завжди виконується в strict mode, а виклик без <code>new</code> кидає <code>TypeError</code>.</p>

<h3>super і [[HomeObject]]</h3>
<p><code>super.method()</code> працює не через <code>this</code>: у метода, оголошеного скороченим синтаксисом, є прихована властивість <code>[[HomeObject]]</code> — посилання на об'єкт, у якому метод створено. <code>super</code> шукає властивість у прототипі <code>[[HomeObject]]</code>, тому коректно працює в глибоких ієрархіях, де трюк <code>this.__proto__.method.call(this)</code> зациклюється. Зворотний бік: метод із <code>super</code> «прив'язаний» до місця оголошення, і його не можна безпечно копіювати в інший об'єкт, а у звичайного function expression <code>[[HomeObject]]</code> немає взагалі.</p>

<h3>Виняток із правила запису: сетери</h3>
<p>Якщо вище по ланцюжку є аксесор із сетером, запис не створює власну властивість, а викликає цей сетер. Так властивості, визначені через <code>get</code>/<code>set</code> у класі, контролюють стан екземплярів прямо з прототипа.</p>

<h3>instanceof і перебір властивостей</h3>
<ul>
  <li><code>obj instanceof F</code> іде ланцюжком <code>[[Prototype]]</code> об'єкта й перевіряє, чи зустрінеться там <code>F.prototype</code>.</li>
  <li><code>for..in</code> перелічує й успадковані enumerable-властивості; <code>Object.keys</code> — лише власні.</li>
  <li>Перевірити «своя чи успадкована» — <code>Object.hasOwn(obj, key)</code>, сучасна заміна <code>obj.hasOwnProperty(key)</code>.</li>
</ul>

<h3>Object.create(null) — об'єкт без прототипа</h3>
<p>Створює «чистий словник»: у нього немає <code>Object.prototype</code>, а отже немає ні <code>toString</code>, ні колізій із ключем <code>__proto__</code>. Такі об'єкти підходять для зберігання пар ключ-значення з користувацького вводу — заразом це захист від prototype pollution.</p>

<h3>Обмеження і практика</h3>
<ul>
  <li>Ланцюжок один — множинного наслідування немає. Обхід — міксини: <code>Object.assign(Rabbit.prototype, mixin)</code>.</li>
  <li>Змінювати <code>[[Prototype]]</code> «на льоту» (<code>Object.setPrototypeOf</code>, запис у <code>__proto__</code>) — удар по оптимізаціях рушія: hidden classes скидаються. Прототип задається один раз при створенні об'єкта.</li>
</ul>

<p class="info info--blue">Правило гарного тону: глибокі ієрархії наслідування в JS майже завжди програють композиції. Наслідування — для відношення «є» (Rabbit є Animal), композиція та міксини — для «вміє».</p>
