<h3>General working principle (Web Storage API)</h3>

<p>Both <strong>localStorage</strong> and <strong>sessionStorage</strong> are part of the Web Storage API. They have an identical interface and the same "under the hood" mechanics:</p>

<p>
  1. <strong>Data format:</strong> They store data exclusively in a key-value format.
</p>
<p>
  2. <strong>Typing:</strong> Both keys and values are always converted to strings. If you need to save an object or an array, it must be serialized (<code>JSON.stringify()</code>), and parsed when reading (<code>JSON.parse()</code>).
</p>
<p>
  3. <strong>Synchronicity:</strong> Both APIs work synchronously. This means that writing a large amount of data can block the browser's Main Thread.
</p>
<p>
  4. <strong>Origin binding:</strong> Data is strictly bound to the origin using the formula:
  <br>
  <code>Origin = protocol + domain + port</code>
  <br>
  <br>
  Thus, the site <code>https://example.com</code> cannot read the storage of <code>http://example.com</code> or <code>https://api.example.com</code>.
</p>
<p>
  5. <strong>Limits:</strong> In most modern browsers, the quota is about 5 MB per Origin.
</p>

<h3>Main differences and recommendations for use</h3>

<p>
  1. <strong>Data lifespan:</strong>
  <ul>
    <li><strong>localStorage:</strong> Data is stored indefinitely until the user manually deletes it or clears the browser cache.</li>
    <li><strong>sessionStorage:</strong> Data is saved only for one session. It is deleted when the tab or browser window is closed.</li>
  </ul>
</p>
<p>
  2. <strong>Availability between tabs:</strong>
  <ul>
    <li><strong>localStorage:</strong> Available in all tabs and windows opened on the same Origin. Changes in localStorage in one tab can be detected in other tabs through the <code>storage</code> event.</li>
    <li><strong>sessionStorage:</strong> Available only in the tab where it was created. Other tabs do not see sessionStorage data.</li>
  </ul>
</p>
<p>
  3. <strong>Usage:</strong>
  <ul>
    <li><strong>localStorage:</strong> Ideal for storing data that should be kept between sessions, such as user settings, UI themes, and authentication tokens (although it's better to use HttpOnly cookies for tokens).</li>
    <li><strong>sessionStorage:</strong> Suitable for temporary data needed only for one session, for example, form data that should not be saved after closing the tab.</li>
  </ul>
</p>

<h3>Methods cheat sheet (API)</h3>
<p>Since they share a common interface (Storage), the methods are absolutely the same. Here is the basic CRUD:</p>

<code class="code">
  // 1. Write (Create / Update)
  localStorage.setItem('theme', 'dark');

  // 2. Read
  const theme = localStorage.getItem('theme'); // 'dark'

  // 3. Delete one item
  localStorage.removeItem('theme');

  // 4. Clear storage completely
  sessionStorage.clear();
</code>

<br>
<p class="deep-dive">For Senior/Middle+</p>

<h3>Important security and architecture nuances</h3>

<p>
  <strong>Vulnerability to XSS (Cross-Site Scripting):</strong><br>
  Any JS code running on the page has access to Web Storage. Never store sensitive data there: passwords, credit card numbers, or personal data.
  (Debates about storing JWT tokens in localStorage are ongoing. It's convenient but less secure than storing them in httpOnly cookies, as the token can be stolen through an XSS vulnerability).
</p>
<p>
  <strong>Synchronous blocking:</strong><br>
  Do not write or read huge arrays of data (megabytes) from storage in a loop. This will freeze the UI (especially critical for rendering in Vue/Angular). If there is a lot of data, it is better to look into IndexedDB.
</p>
