<h3>Shared principle: Web Storage API</h3>
<p><span class="accent">localStorage</span> and <span class="accent">sessionStorage</span> are two stores from the Web Storage API with a fully identical interface: a synchronous key-value string storage bound to an origin.</p>

<p class="info"><strong>Key idea:</strong> their API is identical, and there is exactly one difference — the lifecycle. <strong>localStorage</strong> lives indefinitely and is shared by all tabs of the same origin; <strong>sessionStorage</strong> lives within a single tab and dies when that tab is closed.</p>

<p>Shared mechanics:</p>
<ul>
  <li>They store strings only: serialize an object with <code>JSON.stringify()</code> before writing and parse it with <code>JSON.parse()</code> when reading.</li>
  <li>The API is synchronous: writing large amounts of data blocks the main thread.</li>
  <li>Data is bound to the origin (protocol + domain + port): <code>https://example.com</code> cannot see the storage of <code>http://example.com</code> or of a subdomain.</li>
  <li>The limit is about 5 MB per origin.</li>
</ul>

<h3>API: the same CRUD</h3>
<code class="code">
  localStorage.setItem('theme', 'dark');   // write
  localStorage.getItem('theme');           // read → 'dark' (no key → null)
  localStorage.removeItem('theme');        // delete
  sessionStorage.clear();                  // clear everything
</code>

<h3>Differences: lifetime and visibility scope</h3>
<ul>
  <li><strong>localStorage</strong> survives closing the browser and is removed only manually, by code, or when site data is cleared. It is visible to all tabs of the origin; a change in one tab is caught in the others via the <code>storage</code> event.</li>
  <li><strong>sessionStorage</strong> lives while the tab is open: it survives a page reload (F5) but not closing the tab. Each tab has its own isolated storage.</li>
</ul>

<h3>When to use which</h3>
<ul>
  <li><strong>localStorage</strong> — anything that must outlive the session: UI theme, language, user settings, a cache of non-critical data.</li>
  <li><strong>sessionStorage</strong> — the state of a single tab: a form draft, the current wizard step, filters — so that two open tabs do not interfere with each other.</li>
</ul>

<h3>Security</h3>
<p class="info info--orange">Web Storage is fully accessible to any JS on the page — with an XSS vulnerability the data leaks. Never store passwords or sensitive data there; authentication tokens are safer in HttpOnly cookies, which scripts cannot access at all.</p>

<h3>Alternatives</h3>
<ul>
  <li><strong>Cookies</strong> — about 4 KB, automatically sent to the server with every HTTP request; choose them when the server must see the data.</li>
  <li><strong>IndexedDB</strong> — an asynchronous in-browser database for large volumes and complex structures; it does not block the thread and is available in Web Workers.</li>
</ul>

<p class="deep-dive">Deep Dive</p>

<h3>The storage event: syncing tabs</h3>
<p>When one tab changes localStorage, the <code>storage</code> event fires in all <strong>other</strong> tabs of the same origin (not in the tab that performed the write). The event object contains <code>key</code>, <code>oldValue</code>, <code>newValue</code> and <code>url</code>. The classic use case is logging out in all tabs at once:</p>
<code class="code">
  window.addEventListener('storage', (e) => {
    if (e.key === 'authToken' &amp;&amp; e.newValue === null) {
      redirectToLogin(); // the token was removed in another tab
    }
  });
</code>

<h3>Subtleties of sessionStorage lifetime</h3>
<ul>
  <li>It survives not only F5 but also tab restoration after a browser crash (session restore).</li>
  <li>"Duplicate tab" copies a snapshot of sessionStorage into the new tab — after that the two storages live independently.</li>
  <li>Opening a link in a new tab (<code>target="_blank"</code>, <code>window.open</code>) creates a new session with an empty sessionStorage.</li>
</ul>

<h3>Under the hood: where the data lives</h3>
<p>The browser writes localStorage to disk (in Chromium — a LevelDB database in the user profile), which is why the data survives a restart. sessionStorage is kept in memory and is flushed to disk only when needed for session restore. The synchronous API is possible without constant disk I/O because the browser keeps a copy of the storage in the renderer memory: the first access loads the origin data entirely, and disk writes happen asynchronously in the background.</p>

<h3>Limitations and pitfalls</h3>
<ul>
  <li>When the quota is exceeded, <code>setItem</code> throws a <code>QuotaExceededError</code> — writes are worth wrapping in <code>try/catch</code>. A historical example: Safari in private mode used to give a quota of 0 and threw an error on any write.</li>
  <li>Web Storage is <strong>unavailable in Web Workers and Service Workers</strong> — only IndexedDB and the Cache API exist there.</li>
  <li><code>getItem</code> for a missing key returns <code>null</code>; but if the string <code>"undefined"</code> ends up in the storage, <code>JSON.parse</code> will fail on it with an error.</li>
  <li>Property-style access (<code>localStorage.theme = 'dark'</code>) works but is dangerous: a key can shadow the interface methods (for example, <code>length</code> or <code>setItem</code>). Use the methods.</li>
  <li>In incognito mode both storages work, but the data lives only until the private window is closed.</li>
</ul>

<h3>Cookies and IndexedDB compared in more detail</h3>
<ul>
  <li><strong>Cookies</strong> — the only storage the server can create itself (the <code>Set-Cookie</code> header) and that automatically travels with every HTTP request; hence the hard ~4 KB limit. With the <code>HttpOnly</code> flag a cookie is inaccessible to JS — which is why it is safer for session tokens.</li>
  <li><strong>IndexedDB</strong> — a transactional object database with indexes: it stores not only strings but also objects, Blob, File; the quota is hundreds of megabytes and more (a share of free disk space, checked via <code>navigator.storage.estimate()</code>). The price is a verbose asynchronous API, so in practice it is used through wrappers like idb or Dexie.</li>
</ul>
