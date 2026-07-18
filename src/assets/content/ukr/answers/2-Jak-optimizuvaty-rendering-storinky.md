<h3>Critical Rendering Path</h3>
<p>Оптимізація рендерингу — це прискорення <span class="accent">Critical Rendering Path</span> (DOM → CSSOM → Render Tree → Layout → Paint → Composite): що менше роботи й блокувань на шляху, то раніше користувач бачить контент.</p>

<p class="info"><strong>Головна думка:</strong> менше блокувань на критичному шляху: легкий DOM, критичний CSS інлайном, скрипти з <code>defer</code>, важкі ресурси — ліниво, ефект міряємо Core Web Vitals.</p>

<h3>Оптимізація DOM (HTML)</h3>
<ul>
  <li>Менше вузлів і вкладеності: що більше дерево, то дорожчий кожен Layout (Lighthouse свариться від ~800 вузлів).</li>
  <li>Довгі списки — віртуальний скрол; контент за екраном — <code>content-visibility: auto</code>.</li>
</ul>

<h3>Оптимізація CSSOM (CSS)</h3>
<ul>
  <li>CSS блокує рендер: критичні стилі першого екрана інлайнимо в <code>&lt;head&gt;</code>, решту — асинхронно.</li>
  <li>Анімуємо лише <code>transform</code> і <code>opacity</code> — вони оминають Layout і Paint, працюючи на GPU (Composite).</li>
</ul>

<h3>Оптимізація JavaScript</h3>
<ul>
  <li>JS блокує парсинг HTML — зовнішні скрипти з <code>defer</code>/<code>async</code>.</li>
  <li>Code Splitting + Lazy Loading: вантажимо код за маршрутами, а не весь бандл одразу.</li>
  <li>Важкі обчислення — у Web Worker, не блокуючи головний потік.</li>
</ul>

<h3>Медіа та шрифти</h3>
<ul>
  <li>Формати WebP/AVIF та явні <code>width</code>/<code>height</code> — захист від стрибків макета (CLS).</li>
  <li><code>loading="lazy"</code> для картинок та iframe нижче першого екрана.</li>
  <li>Шрифти: <code>font-display: swap</code> — текст одразу видно системним шрифтом (немає FOIT).</li>
</ul>

<h3>Мережа та доставка</h3>
<ul>
  <li>Resource Hints: <code>preconnect</code> до критичних доменів, <code>preload</code> для шрифтів і hero-картинки.</li>
  <li>Стиснення (Brotli), HTTP-кешування, CDN, HTTP/2+.</li>
  <li>SSR/SSG — готова розмітка з сервера різко прискорює FCP/LCP.</li>
</ul>

<h3>Профілювання та метрики</h3>
<p>Орієнтир — <span class="accent">Core Web Vitals</span>: <strong>LCP</strong> (відмальовування основного контенту), <strong>INP</strong> (відгук, замінила FID), <strong>CLS</strong> (стабільність макета). Інструменти: Lighthouse і Performance у DevTools.</p>

<p class="info info--orange">Часта помилка — оптимізувати «на око» на потужній дев-машині: профілюй із CPU/network throttling і виправляй найдорожче, а не перше-ліпше.</p>

<p class="deep-dive">Поглиблений конспект</p>

<h3>Як виглядає оптимізоване завантаження</h3>
<code class="code">
  &lt;head&gt;
    &lt;link rel="preconnect" href="https://cdn.example.com"&gt;
    &lt;style&gt;/* критичний CSS першого екрана */&lt;/style&gt;
    &lt;link rel="stylesheet" href="rest.css" media="print" onload="this.media='all'"&gt;
    &lt;script src="app.js" defer&gt;&lt;/script&gt;
  &lt;/head&gt;

  &lt;!-- LCP-елемент: високий пріоритет, без lazy --&gt;
  &lt;img src="hero.avif" width="800" height="400" fetchpriority="high" alt="..."&gt;
  &lt;!-- нижче першого екрана --&gt;
  &lt;img src="feed.webp" width="400" height="300" loading="lazy" alt="..."&gt;
</code>
<p>Трюк із <code>media="print"</code> завантажує некритичні стилі з низьким пріоритетом, не блокуючи рендер, а <code>onload</code> вмикає їх. <code>fetchpriority="high"</code> піднімає пріоритет LCP-картинки в мережевій черзі.</p>

<h3>Reflow, Repaint і Layout Thrashing</h3>
<p>Зміна геометрії (<code>width</code>, <code>top</code>, додавання вузлів) запускає Reflow, зміна зовнішності (<code>color</code>, <code>box-shadow</code>) — Repaint. Читання layout-властивостей (<code>offsetHeight</code>, <code>getBoundingClientRect()</code>) за «брудного» дерева змушує браузер перерахувати Layout синхронно. Чергування читання й запису в циклі — <span class="accent">layout thrashing</span>: N примусових reflow замість одного.</p>
<ul>
  <li>Групуй операції: спершу всі читання, потім усі записи; візуальні зміни — через <code>requestAnimationFrame</code>.</li>
  <li>Змінюй клас цілком замість серії інлайн-стилів; масові вставки — через <code>DocumentFragment</code>.</li>
</ul>

<h3>Композитні шари та GPU</h3>
<p><code>will-change: transform</code> (або <code>translateZ(0)</code>) виносить елемент на окремий композитний шар: його рух обробляє компоситор на GPU, не чіпаючи Layout/Paint решти сторінки.</p>
<p class="info info--blue">Кожен шар займає пам'ять GPU. <code>will-change</code> — точковий інструмент для реально анімованих елементів, а не глобальний «прискорювач»: розвішаний усюди, він спричиняє layer explosion і сповільнює сторінку.</p>

<h3>content-visibility: auto</h3>
<p>Змушує браузер пропускати Layout і Paint вмісту блока, поки той не наблизиться до вьюпорта; під час скролу контент промальовується на льоту. На відміну від віртуального скролу вузли лишаються в DOM (їх знаходить Ctrl+F, вони доступні для скрінрідерів) — ріжеться лише вартість рендерингу, а не сам DOM. Зручно для довгої сторінки з важких різнорідних секцій (стаття, стрічка карток), тоді як віртуалізація — для тисяч однотипних рядків.</p>
<p><code>contain-intrinsic-size</code> задає блоку приблизну висоту-заглушку, поки він не промальований, — без неї скролбар і розкладка стрибатимуть (CLS) у міру рендерингу секцій.</p>
<code class="code">
  .section {
    content-visibility: auto;
    contain-intrinsic-size: auto 500px; /* приблизна висота до рендера */
  }
</code>
<p class="info info--blue">Оцінка висоти в <code>contain-intrinsic-size</code> — компроміс: сильне розходження з реальною висотою дає стрибки скролу. Значення <code>auto</code> просить браузер запам'ятати фактичний розмір після першого рендера й перевикористати його.</p>

<h3>Оптимізації на рівні фреймворків</h3>
<ul>
  <li><strong>Angular:</strong> <code>ChangeDetectionStrategy.OnPush</code> і Signals — перевірка змін лише там, де реально змінилися дані; <code>trackBy</code> у списках; <code>@defer</code> для відкладених блоків шаблону.</li>
  <li><strong>Vue:</strong> <code>v-once</code>/<code>v-memo</code> для статичних шматків шаблону, <code>shallowRef</code> для великих структур без глибокої реактивності.</li>
  <li>Загальний принцип — звузити зону перемальовування: віртуалізація списків, мемоізація обчислень, розбиття важких компонентів.</li>
</ul>

<h3>Шрифти детальніше</h3>
<ul>
  <li>Лише WOFF2, сабсетинг за <code>unicode-range</code> (не вантажити кирилицю на англомовній сторінці й навпаки).</li>
  <li><code>&lt;link rel="preload" as="font"&gt;</code> для шрифту першого екрана + self-hosting замість сторонніх CDN.</li>
  <li>Підгонка фолбек-шрифту через <code>size-adjust</code>/<code>ascent-override</code> прибирає CLS під час підміни шрифту.</li>
</ul>

<h3>Доставка: деталі</h3>
<ul>
  <li>HTTP/2 мультиплексує запити в одному з'єднанні; HTTP/3 (QUIC) прискорює хендшейк і живучість у мобільних мережах.</li>
  <li>Brotli стискає текст на ~15–20% краще за gzip.</li>
  <li>Кешування: хеші в іменах бандлів + довгий <code>Cache-Control: immutable</code>; Service Worker для миттєвих повторних візитів.</li>
  <li>103 Early Hints: сервер віддає preload/preconnect-підказки ще до того, як згенеровано HTML.</li>
</ul>

<h3>Метрики: пороги та практика</h3>
<ul>
  <li>«Зелені» пороги: LCP ≤ 2.5 с, INP ≤ 200 мс, CLS ≤ 0.1 — за 75-м перцентилем реальних користувачів.</li>
  <li>INP замінила FID (2024): FID міряв затримку лише першого вводу, INP — найгіршу взаємодію за весь візит.</li>
  <li>Lab-дані (Lighthouse, DevTools) — для налагодження; польові (RUM, CrUX) — джерело істини про реальних користувачів.</li>
</ul>
