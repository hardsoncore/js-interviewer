<h3>Суть F.prototype</h3>
<p><span class="accent">F.prototype</span> — это обычное свойство функции-конструктора, в котором лежит объект-шаблон. Оператор <code>new</code> берёт этот объект и записывает его в скрытый слот <code>[[Prototype]]</code> нового экземпляра — так экземпляр получает общие методы.</p>

<p class="info"><strong>Главная мысль:</strong> <code>F.prototype</code> — не прототип самой функции <code>F</code>, а заготовка прототипа для её будущих экземпляров. Это свойство читает только оператор <code>new</code> и только в момент вызова.</p>

<h3>Что делает new: четыре шага</h3>
<ol>
  <li>Создаёт новый пустой объект.</li>
  <li>Записывает в его <code>[[Prototype]]</code> текущее значение <code>F.prototype</code>.</li>
  <li>Вызывает <code>F</code> с <code>this</code>, привязанным к этому объекту: тело конструктора наполняет его собственными свойствами.</li>
  <li>Возвращает <code>this</code>. Исключение: если конструктор явно вернул объект — вернётся он, а примитивный <code>return</code> игнорируется.</li>
</ol>

<code class="code">
  function Person(name) {
    this.name = name;                 // шаг 3: собственное свойство экземпляра
  }

  Person.prototype.hi = function () { // общий метод для всех экземпляров
    return 'Привет, ' + this.name;
  };

  const alice = new Person('Alice');

  alice.hi();                                        // 'Привет, Alice' — метод найден в прототипе
  Object.getPrototypeOf(alice) === Person.prototype; // true
</code>

<h3>Свойство constructor</h3>
<p>По умолчанию <code>F.prototype</code> — это объект с единственным свойством <code>constructor</code>, ссылающимся обратно на саму <code>F</code>. Экземпляры видят его по цепочке: <code>alice.constructor === Person</code>.</p>

<h3>Три классические ловушки</h3>
<ul>
  <li><strong>Связь фиксируется в момент вызова.</strong> Если после <code>new F()</code> целиком перезаписать <code>F.prototype = { ... }</code>, уже созданные объекты продолжат ссылаться на старый прототип, а новый достанется только следующим экземплярам.</li>
  <li><strong>Мутация — другое дело.</strong> <code>F.prototype.sayHi = ...</code> меняет тот же самый объект в памяти, поэтому метод мгновенно появится и у ранее созданных экземпляров.</li>
  <li><strong>Потеря constructor.</strong> Полная перезапись <code>F.prototype</code> затирает дефолтный <code>constructor</code>. Либо дописывай методы точечно, либо восстанавливай ссылку вручную: <code>F.prototype = { constructor: F, method() {} }</code>.</li>
</ul>

<p class="info info--orange">Свойство <code>prototype</code> есть только у функций, которые умеют быть конструктором. У стрелочных функций и у методов, записанных сокращённым синтаксисом, его нет — <code>new</code> с ними бросит <code>TypeError</code>.</p>

<p class="deep-dive">Углубленный конспект</p>

<h3>Как выглядит new «изнутри»</h3>
<p>За <code>new</code> стоит внутренний метод <code>[[Construct]]</code>, который есть не у каждой функции. Приблизительная эмуляция на обычном JS:</p>
<code class="code">
  function myNew(F, ...args) {
    const obj = Object.create(F.prototype);  // шаги 1-2
    const result = F.apply(obj, args);       // шаг 3

    return (typeof result === 'object' &amp;&amp; result !== null) || typeof result === 'function'
      ? result
      : obj;                                 // шаг 4
  }
</code>
<p>Ещё один нюанс шага 2: если в <code>F.prototype</code> лежит не объект (например, кто-то присвоил туда число), движок не падает — экземпляр молча получает <code>Object.prototype</code>.</p>

<h3>Кто умеет быть конструктором</h3>
<ul>
  <li><code>[[Construct]]</code> есть у function declaration / function expression и у классов.</li>
  <li>Нет — у стрелочных функций, у методов сокращённого синтаксиса (<code>{ foo() {} }</code>), у генераторов и async-функций.</li>
  <li>У связанной функции (<code>F.bind(...)</code>) <code>[[Construct]]</code> сохраняется, но при вызове через <code>new</code> привязанный <code>this</code> игнорируется — <code>this</code> всё равно станет новым объектом.</li>
</ul>

<h3>new.target</h3>
<p>Внутри функции <code>new.target</code> равен самой функции при вызове через <code>new</code> и <code>undefined</code> при обычном вызове. Это способ защититься от вызова конструктора без <code>new</code> — иначе <code>this</code> окажется <code>undefined</code> в strict mode (или глобальным объектом вне его), и свойства утекут не туда.</p>
<code class="code">
  function Person(name) {
    if (!new.target) return new Person(name); // подстраховка

    this.name = name;
  }
</code>
<p>Классы решают ту же проблему жёстче: вызов класса без <code>new</code> всегда бросает <code>TypeError</code>.</p>

<h3>Зачем вообще класть методы в прототип</h3>
<p>Метод, объявленный внутри конструктора (<code>this.hi = function () {}</code>), создаётся заново для каждого экземпляра: тысяча объектов — тысяча одинаковых функций в памяти. Метод в <code>F.prototype</code> существует в единственном экземпляре, и все объекты обращаются к нему по цепочке. Именно поэтому в прототип уходит поведение, а в <code>this</code> — состояние.</p>

<h3>Отличия prototype у классов</h3>
<ul>
  <li>Свойство <code>prototype</code> у класса неперечислимо и <strong>недоступно для записи</strong> — перезаписать <code>Class.prototype = {}</code> нельзя, только мутировать.</li>
  <li>Методы класса тоже неперечислимы: они не попадают в <code>for..in</code>, в отличие от методов, дописанных вручную в <code>F.prototype</code>.</li>
</ul>

<h3>instanceof опирается на prototype, а не на constructor</h3>
<p><code>obj instanceof F</code> идёт по цепочке <code>[[Prototype]]</code> объекта и ищет там текущий <code>F.prototype</code>. Отсюда неприятное следствие перезаписи прототипа: старые экземпляры перестают быть <code>instanceof F</code>, хотя создавала их именно эта функция.</p>
<code class="code">
  function F() {}
  const old = new F();

  F.prototype = { hello() {} }; // прототип заменён целиком

  old instanceof F;             // false — цепочка ведёт на прежний объект
  new F() instanceof F;         // true
</code>
<p>Само поведение <code>instanceof</code> при этом переопределяемо через <code>Symbol.hasInstance</code>.</p>

<p class="info info--blue">На <code>constructor</code> нельзя полагаться как на гарантию: это обычное записываемое свойство прототипа. Его легко затереть или подделать, а движок его происхождение не проверяет. Для определения «того ли типа объект» используют <code>instanceof</code> или duck typing.</p>
