<h3>Суть: делегирование, а не копирование</h3>
<p><span class="accent">Наследование в JavaScript</span> — прототипное: у каждого объекта есть скрытая ссылка <code>[[Prototype]]</code> на другой объект — его прототип. Когда свойства нет в самом объекте, движок ищет его в прототипе, затем в прототипе прототипа — и так по всей цепочке.</p>

<p class="info"><strong>Главная мысль:</strong> наследование в JS — это делегирование: свойство не копируется в наследника, а находится у прототипа в момент обращения. Синтаксис <code>class</code> — сахар над этим же механизмом.</p>

<h3>Цепочка прототипов (Prototype Chain)</h3>
<code class="code">
  const animal = { eats: true };
  const rabbit = Object.create(animal); // rabbit.[[Prototype]] === animal

  rabbit.jumps = true;
  console.log(rabbit.jumps); // true — своё свойство
  console.log(rabbit.eats);  // true — найдено в прототипе
</code>
<p>Поиск идёт снизу вверх до первого совпадения. Вершина почти любой цепочки — <code>Object.prototype</code> (отсюда у всех объектов «бесплатные» <code>toString</code> и <code>hasOwnProperty</code>), его прототип — <code>null</code>, конец поиска.</p>

<h3>Три способа задать наследование</h3>
<ul>
  <li><code>class ... extends</code> — современный стандарт: конструкторы, <code>super</code>, читаемые иерархии.</li>
  <li><code>Object.create(proto)</code> — создать объект с нужным прототипом напрямую, без конструкторов.</li>
  <li>Функция-конструктор + <code>F.prototype</code> + <code>new</code> — «доклассовая» классика, на которой всё держалось до ES6.</li>
</ul>
<code class="code">
  class Animal {
    constructor(name) { this.name = name; }
    eat() { return this.name + ' ест'; }
  }

  class Rabbit extends Animal {
    jump() { return this.name + ' прыгает'; }
  }

  new Rabbit('Кролик').eat(); // метод найден в Animal.prototype
</code>

<h3>Чтение — по цепочке, запись — в сам объект</h3>
<p>Цепочка работает только на <strong>чтение</strong>. Запись <code>rabbit.eats = false</code> создаёт собственное свойство прямо в объекте и «затеняет» унаследованное (shadowing) — сам прототип не меняется. Поэтому методы общие для всех экземпляров (лежат в одном прототипе и не дублируются в памяти), а состояние у каждого своё.</p>

<p class="info info--orange">Частая путаница: <code>class</code> не превращает JS в Java. Классического наследования «копированием» здесь нет — есть живая цепочка объектов: добавьте метод в прототип во время работы программы, и он мгновенно станет доступен всем наследникам.</p>

<p class="deep-dive">Углубленный конспект</p>

<h3>Что на самом деле делает extends</h3>
<p><code>class Rabbit extends Animal</code> выстраивает сразу <strong>две</strong> цепочки: <code>Rabbit.prototype.[[Prototype]] = Animal.prototype</code> — для методов экземпляров, и <code>Rabbit.[[Prototype]] = Animal</code> — поэтому наследуется даже статика (<code>Rabbit.create()</code> найдёт <code>static create()</code> из <code>Animal</code>). Есть и отличия класса от «ручного» конструктора: методы класса неперечислимы (не попадают в <code>for..in</code>), тело класса всегда выполняется в strict mode, а вызов без <code>new</code> бросает <code>TypeError</code>.</p>

<h3>super и [[HomeObject]]</h3>
<p><code>super.method()</code> работает не через <code>this</code>: у метода, объявленного сокращённым синтаксисом, есть скрытое свойство <code>[[HomeObject]]</code> — ссылка на объект, в котором метод создан. <code>super</code> ищет свойство в прототипе <code>[[HomeObject]]</code>, поэтому корректно работает в глубоких иерархиях, где трюк <code>this.__proto__.method.call(this)</code> зацикливается. Обратная сторона: метод с <code>super</code> «привязан» к месту объявления, и его нельзя безопасно копировать в другой объект, а у обычного function expression <code>[[HomeObject]]</code> нет вовсе.</p>

<h3>Исключение из правила записи: сеттеры</h3>
<p>Если выше по цепочке есть аксессор с сеттером, запись не создаёт собственное свойство, а вызывает этот сеттер. Так свойства, определённые через <code>get</code>/<code>set</code> в классе, контролируют состояние экземпляров прямо из прототипа.</p>

<h3>instanceof и перебор свойств</h3>
<ul>
  <li><code>obj instanceof F</code> идёт по цепочке <code>[[Prototype]]</code> объекта и проверяет, встретится ли там <code>F.prototype</code>.</li>
  <li><code>for..in</code> перечисляет и унаследованные enumerable-свойства; <code>Object.keys</code> — только собственные.</li>
  <li>Проверить «своё или унаследованное» — <code>Object.hasOwn(obj, key)</code>, современная замена <code>obj.hasOwnProperty(key)</code>.</li>
</ul>

<h3>Object.create(null) — объект без прототипа</h3>
<p>Создаёт «чистый словарь»: у него нет <code>Object.prototype</code>, а значит нет ни <code>toString</code>, ни коллизий с ключом <code>__proto__</code>. Такие объекты подходят для хранения пар ключ-значение из пользовательского ввода — заодно это защита от prototype pollution.</p>

<h3>Ограничения и практика</h3>
<ul>
  <li>Цепочка одна — множественного наследования нет. Обход — миксины: <code>Object.assign(Rabbit.prototype, mixin)</code>.</li>
  <li>Менять <code>[[Prototype]]</code> «на лету» (<code>Object.setPrototypeOf</code>, запись в <code>__proto__</code>) — удар по оптимизациям движка: hidden classes сбрасываются. Прототип задаётся один раз при создании объекта.</li>
</ul>

<p class="info info--blue">Правило хорошего тона: глубокие иерархии наследования в JS почти всегда проигрывают композиции. Наследование — для отношения «является» (Rabbit является Animal), композиция и миксины — для «умеет».</p>
