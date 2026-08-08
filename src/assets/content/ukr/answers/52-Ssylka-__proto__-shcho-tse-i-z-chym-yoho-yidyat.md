<h3>Що таке __proto__</h3>
<p><span class="accent">__proto__</span> — це історичний геттер/сеттер, через який можна прочитати або змінити приховану властивість об'єкта <code>[[Prototype]]</code> — посилання на прототип, у якого рушій шукає відсутні властивості.</p>

<p class="info"><strong>Головна думка:</strong> <code>__proto__</code> — це не сам прототип, а застарілі «дверцята» до нього. Прототип живе у внутрішньому слоті <code>[[Prototype]]</code>, а стандартний доступ сьогодні — <code>Object.getPrototypeOf / setPrototypeOf</code>.</p>

<h3>__proto__ vs [[Prototype]] vs F.prototype</h3>
<p>Три поняття, які постійно плутають:</p>
<ul>
  <li><code>[[Prototype]]</code> — внутрішній прихований слот кожного об'єкта: посилання на прототип або <code>null</code>. З коду напряму недоступний.</li>
  <li><code>__proto__</code> — аксесор для читання і запису цього слота у вже створеного об'єкта.</li>
  <li><code>F.prototype</code> — звичайна властивість функції-конструктора: об'єкт, який стане <code>[[Prototype]]</code> екземплярів, створених через <code>new F()</code>. На прототип самої функції <code>F</code> вона не впливає.</li>
</ul>

<code class="code">
  function Person(name) {
    this.name = name;
  }

  const alice = new Person('Alice');

  // new записав Person.prototype у слот [[Prototype]] екземпляра
  console.log(alice.__proto__ === Person.prototype);              // true
  console.log(Object.getPrototypeOf(alice) === Person.prototype); // true
</code>

<h3>Сучасні альтернативи</h3>
<ul>
  <li>Читання: <code>Object.getPrototypeOf(obj)</code>.</li>
  <li>Запис: <code>Object.setPrototypeOf(obj, proto)</code>.</li>
  <li>Створення з потрібним прототипом одразу: <code>Object.create(proto)</code> — найкращий варіант, об'єкт народжується з правильним ланцюжком.</li>
</ul>
<p>Сам <code>__proto__</code> стандартизований у ES6 лише заради зворотної сумісності зі старим кодом — у новому коді йому не місце.</p>

<p class="info info--blue">Правило: <code>__proto__</code> — лише підглянути в консолі під час налагодження. У коді — <code>Object.getPrototypeOf / create</code>, а змінювати прототип живого об'єкта — не робити взагалі.</p>

<h3>Продуктивність: чому не можна змінювати прототип на льоту</h3>
<p>Зміна <code>[[Prototype]]</code> у живого об'єкта — одна з найповільніших операцій у JS, яким би способом її не робити. Рушії оптимізують доступ до властивостей через hidden classes та інлайн-кеші, які спираються на стабільність форми об'єкта та його ланцюжка. Підміна прототипу ламає ці кеші й деоптимізує весь код, що працює з об'єктом. Тому прототип задається один раз — під час створення.</p>

<p class="info info--orange">Пастка: у стрілочної функції немає властивості <code>prototype</code>, але <code>__proto__</code> у неї є — як у будь-якого об'єкта. <code>prototype</code> є лише у функцій, здатних працювати конструктором.</p>

<p class="deep-dive">Поглиблений конспект</p>

<h3>Чому __proto__ взагалі працює: аксесор на Object.prototype</h3>
<p><code>__proto__</code> — не власна властивість кожного об'єкта, а геттер/сеттер, оголошений один раз на <code>Object.prototype</code>. Звернення <code>obj.__proto__</code> знаходить цей аксесор по ланцюжку прототипів і викликає його з <code>this = obj</code>. Звідси наслідок: якщо <code>Object.prototype</code> у ланцюжку немає — «дверцята» зникають:</p>
<code class="code">
  const dict = Object.create(null); // об'єкт без прототипу

  dict.__proto__ = { hacked: true };
  console.log(dict.hacked);    // undefined — прототип НЕ підмінився
  console.log(dict.__proto__); // { hacked: true } — звичайна властивість-дані
</code>
<p>Аксесор не знайдено, тому присвоєння просто створило власну властивість з іменем <code>__proto__</code>. Саме тому <code>Object.create(null)</code> — безпечний словник для користувацьких ключів.</p>

<h3>Prototype Pollution — атака через __proto__</h3>
<p>Класична вразливість: код рекурсивно мержить в об'єкт зовнішні дані (deep merge налаштувань, query-параметрів, JSON з бекенда). Зловмисник передає ключ <code>"__proto__"</code>, присвоєння <code>obj[key] = value</code> викликає сеттер — і властивості записуються прямо в <code>Object.prototype</code>, «з'являючись» у всіх об'єктів застосунку. Так підміняють прапорці на кшталт <code>isAdmin</code> або ламають логіку цілком.</p>
<p>Нюанс: сам <code>JSON.parse('{"__proto__": {...}}')</code> безпечний — парсер створює звичайну властивість-дані, оминаючи сеттер. Небезпечний саме подальший наївний merge по ключах. Захист: <code>Object.create(null)</code> або <code>Map</code> для словників, фільтрація ключів <code>__proto__</code>, <code>constructor</code>, <code>prototype</code>.</p>

<h3>Edge cases сеттера</h3>
<ul>
  <li>Сеттер приймає лише об'єкт або <code>null</code>: присвоєння примітива (<code>obj.__proto__ = 42</code>) мовчки ігнорується.</li>
  <li>Спроба замкнути ланцюжок у цикл (<code>a.__proto__ = b; b.__proto__ = a</code>) кидає <code>TypeError: Cyclic __proto__ value</code>.</li>
  <li>У нерозширюваного об'єкта (<code>Object.preventExtensions</code>) зміна прототипу кидає <code>TypeError</code>.</li>
</ul>

<h3>Історія: Annex B</h3>
<p><code>__proto__</code> з'явився в 1990-х як нестандартне розширення рушія SpiderMonkey (Netscape), розповзся по інших рушіях, і веб почав на нього покладатися. У ES6 (2015) його довелося узаконити — але не в основній специфікації, а в Annex B, розділі legacy-функцій для сумісності з вебом. Офіційні заміни: <code>Object.getPrototypeOf</code> — ще ES5, <code>Object.setPrototypeOf</code> — ES6.</p>

<h3>Що саме ламається в рушії при зміні прототипу</h3>
<p>V8 описує структуру кожного об'єкта прихованим класом (hidden class / shape): які властивості, за якими зсувами, який прототип. Оптимізований машинний код та інлайн-кеші прив'язуються до конкретного прихованого класу: «в об'єктів цієї форми метод лежить там-то». Зміна прототипу переводить об'єкт на новий прихований клас — усі ділянки коду, що бачили об'єкт, стають поліморфними або мегаморфними, і рушій скидає оптимізації (deoptimization). Повільним стає не сама операція <code>setPrototypeOf</code>, а весь подальший доступ до властивостей цього об'єкта.</p>
