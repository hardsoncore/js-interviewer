<h3>Загальний принцип: Web Storage API</h3>
<p><span class="accent">localStorage</span> і <span class="accent">sessionStorage</span> — два сховища з Web Storage API з повністю однаковим інтерфейсом: синхронне сховище рядків «ключ–значення», прив'язане до origin.</p>

<p class="info"><strong>Головна думка:</strong> API в них ідентичний, відмінність рівно одна — життєвий цикл. <strong>localStorage</strong> живе безстроково і спільний для всіх вкладок одного origin; <strong>sessionStorage</strong> живе в межах однієї вкладки і помирає при її закритті.</p>

<p>Спільна механіка:</p>
<ul>
  <li>Зберігають лише рядки: об'єкт перед записом серіалізуємо через <code>JSON.stringify()</code>, при читанні — <code>JSON.parse()</code>.</li>
  <li>API синхронний: запис великих обсягів блокує головний потік.</li>
  <li>Дані прив'язані до origin (протокол + домен + порт): <code>https://example.com</code> не бачить сторадж <code>http://example.com</code> або піддомену.</li>
  <li>Ліміт — близько 5 МБ на origin.</li>
</ul>

<h3>API: однаковий CRUD</h3>
<code class="code">
  localStorage.setItem('theme', 'dark');   // запис
  localStorage.getItem('theme');           // читання → 'dark' (немає ключа → null)
  localStorage.removeItem('theme');        // видалення
  sessionStorage.clear();                  // повне очищення
</code>

<h3>Відмінності: час життя та область видимості</h3>
<ul>
  <li><strong>localStorage</strong> переживає закриття браузера, видаляється лише вручну, кодом або при очищенні даних сайту. Видимий усім вкладкам origin; зміна в одній вкладці ловиться в інших через подію <code>storage</code>.</li>
  <li><strong>sessionStorage</strong> живе, поки відкрита вкладка: переживає перезавантаження сторінки (F5), але не закриття вкладки. Кожна вкладка — своє ізольоване сховище.</li>
</ul>

<h3>Коли використовувати</h3>
<ul>
  <li><strong>localStorage</strong> — те, що має пережити сесію: тема оформлення, мова, користувацькі налаштування, кеш некритичних даних.</li>
  <li><strong>sessionStorage</strong> — стан однієї вкладки: чернетка форми, поточний крок майстра, фільтри — щоб дві відкриті вкладки не заважали одна одній.</li>
</ul>

<h3>Безпека</h3>
<p class="info info--orange">Web Storage повністю доступний будь-якому JS на сторінці — при XSS-вразливості дані витечуть. Не зберігай там паролі та чутливі дані; токени автентифікації безпечніше тримати в HttpOnly cookies, які скрипту взагалі недоступні.</p>

<h3>Альтернативи</h3>
<ul>
  <li><strong>Cookies</strong> — близько 4 КБ, автоматично відправляються на сервер з кожним HTTP-запитом; обираємо їх, коли дані має бачити сервер.</li>
  <li><strong>IndexedDB</strong> — асинхронна база даних у браузері для великих обсягів і складних структур; не блокує потік і доступна у Web Workers.</li>
</ul>

<p class="deep-dive">Поглиблений конспект</p>

<h3>Подія storage: синхронізація вкладок</h3>
<p>Коли одна вкладка змінює localStorage, у всіх <strong>інших</strong> вкладках того ж origin спрацьовує подія <code>storage</code> (у самій вкладці, що пише, — ні). В об'єкті події є <code>key</code>, <code>oldValue</code>, <code>newValue</code> і <code>url</code>. Класичне застосування — logout одразу в усіх вкладках:</p>
<code class="code">
  window.addEventListener('storage', (e) => {
    if (e.key === 'authToken' &amp;&amp; e.newValue === null) {
      redirectToLogin(); // токен видалили в іншій вкладці
    }
  });
</code>

<h3>Тонкощі життя sessionStorage</h3>
<ul>
  <li>Переживає не лише F5, а й відновлення вкладки після падіння браузера (session restore).</li>
  <li>«Дублювати вкладку» копіює снапшот sessionStorage у нову вкладку — далі сховища живуть незалежно.</li>
  <li>Відкриття посилання в новій вкладці (<code>target="_blank"</code>, <code>window.open</code>) створює нову сесію з порожнім sessionStorage.</li>
</ul>

<h3>Під капотом: де лежать дані</h3>
<p>localStorage браузер пише на диск (у Chromium — база LevelDB у профілі користувача), тому дані й переживають перезапуск. sessionStorage тримається в пам'яті й лише за потреби скидається на диск заради session restore. Синхронний API можливий без постійного дискового I/O тому, що браузер тримає копію стораджу в пам'яті рендерера: перше звернення підвантажує дані origin цілком, а запис на диск іде асинхронно у фоні.</p>

<h3>Обмеження та пастки</h3>
<ul>
  <li>При переповненні квоти <code>setItem</code> кидає <code>QuotaExceededError</code> — запис варто обгортати в <code>try/catch</code>. Історичний приклад: Safari в приватному режимі давав квоту 0 і кидав помилку на будь-якому записі.</li>
  <li>Web Storage <strong>недоступний у Web Workers і Service Workers</strong> — там лише IndexedDB і Cache API.</li>
  <li><code>getItem</code> неіснуючого ключа повертає <code>null</code>; а от якщо у сховище потрапив рядок <code>"undefined"</code> — <code>JSON.parse</code> впаде на ньому з помилкою.</li>
  <li>Доступ як до властивості (<code>localStorage.theme = 'dark'</code>) працює, але небезпечний: ключ може затінити методи інтерфейсу (наприклад, <code>length</code> або <code>setItem</code>). Використовуй методи.</li>
  <li>У режимі інкогніто обидва сховища працюють, але дані живуть лише до закриття приватного вікна.</li>
</ul>

<h3>Порівняння з cookies та IndexedDB детальніше</h3>
<ul>
  <li><strong>Cookies</strong> — єдине сховище, яке сервер може створити сам (заголовок <code>Set-Cookie</code>) і яке автоматично їздить у кожному HTTP-запиті; звідси й жорсткий ліміт ~4 КБ. З прапорцем <code>HttpOnly</code> cookie недоступна JS — тому вона безпечніша для сесійних токенів.</li>
  <li><strong>IndexedDB</strong> — транзакційна об'єктна БД з індексами: зберігає не лише рядки, а й об'єкти, Blob, File; квота — сотні мегабайт і більше (частка вільного диска, перевіряється через <code>navigator.storage.estimate()</code>). Ціна — багатослівний асинхронний API, тому на практиці її беруть через обгортки на кшталт idb або Dexie.</li>
</ul>
