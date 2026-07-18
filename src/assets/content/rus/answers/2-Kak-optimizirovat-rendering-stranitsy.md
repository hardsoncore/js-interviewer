<h3>Critical Rendering Path</h3>
<p>Оптимизация рендеринга — это ускорение <span class="accent">Critical Rendering Path</span> (DOM → CSSOM → Render Tree → Layout → Paint → Composite): чем меньше работы и блокировок на пути, тем раньше пользователь видит контент.</p>

<p class="info"><strong>Главная мысль:</strong> меньше блокировок на критическом пути: лёгкий DOM, критический CSS инлайном, скрипты с <code>defer</code>, тяжёлые ресурсы — лениво, эффект меряем Core Web Vitals.</p>

<h3>Оптимизация DOM (HTML)</h3>
<ul>
  <li>Меньше узлов и вложенности: чем больше дерево, тем дороже каждый Layout (Lighthouse ругается от ~800 узлов).</li>
  <li>Длинные списки — виртуальный скролл; контент за экраном — <code>content-visibility: auto</code>.</li>
</ul>

<h3>Оптимизация CSSOM (CSS)</h3>
<ul>
  <li>CSS блокирует рендер: критические стили первого экрана инлайним в <code>&lt;head&gt;</code>, остальные — асинхронно.</li>
  <li>Анимируем только <code>transform</code> и <code>opacity</code> — они минуют Layout и Paint, работая на GPU (Composite).</li>
</ul>

<h3>Оптимизация JavaScript</h3>
<ul>
  <li>JS блокирует парсинг HTML — внешние скрипты с <code>defer</code>/<code>async</code>.</li>
  <li>Code Splitting + Lazy Loading: грузим код по маршрутам, а не весь бандл сразу.</li>
  <li>Тяжёлые вычисления — в Web Worker, не блокируя главный поток.</li>
</ul>

<h3>Медиа и шрифты</h3>
<ul>
  <li>Форматы WebP/AVIF и явные <code>width</code>/<code>height</code> — защита от скачков макета (CLS).</li>
  <li><code>loading="lazy"</code> для картинок и iframe ниже первого экрана.</li>
  <li>Шрифты: <code>font-display: swap</code> — текст сразу виден системным шрифтом (нет FOIT).</li>
</ul>

<h3>Сеть и доставка</h3>
<ul>
  <li>Resource Hints: <code>preconnect</code> к критичным доменам, <code>preload</code> для шрифтов и hero-картинки.</li>
  <li>Сжатие (Brotli), HTTP-кэширование, CDN, HTTP/2+.</li>
  <li>SSR/SSG — готовая разметка с сервера резко ускоряет FCP/LCP.</li>
</ul>

<h3>Профилирование и метрики</h3>
<p>Ориентир — <span class="accent">Core Web Vitals</span>: <strong>LCP</strong> (отрисовка основного контента), <strong>INP</strong> (отзывчивость, заменила FID), <strong>CLS</strong> (стабильность макета). Инструменты: Lighthouse и Performance в DevTools.</p>

<p class="info info--orange">Частая ошибка — оптимизировать «на глаз» на мощной дев-машине: профилируй с CPU/network throttling и чини самое дорогое, а не первое попавшееся.</p>

<p class="deep-dive">Углубленный конспект</p>

<h3>Как выглядит оптимизированная загрузка</h3>
<code class="code">
  &lt;head&gt;
    &lt;link rel="preconnect" href="https://cdn.example.com"&gt;
    &lt;style&gt;/* критический CSS первого экрана */&lt;/style&gt;
    &lt;link rel="stylesheet" href="rest.css" media="print" onload="this.media='all'"&gt;
    &lt;script src="app.js" defer&gt;&lt;/script&gt;
  &lt;/head&gt;

  &lt;!-- LCP-элемент: высокий приоритет, без lazy --&gt;
  &lt;img src="hero.avif" width="800" height="400" fetchpriority="high" alt="..."&gt;
  &lt;!-- ниже первого экрана --&gt;
  &lt;img src="feed.webp" width="400" height="300" loading="lazy" alt="..."&gt;
</code>
<p>Трюк с <code>media="print"</code> скачивает некритичные стили с низким приоритетом, не блокируя рендер, а <code>onload</code> включает их. <code>fetchpriority="high"</code> поднимает приоритет LCP-картинки в сетевой очереди.</p>

<h3>Reflow, Repaint и Layout Thrashing</h3>
<p>Изменение геометрии (<code>width</code>, <code>top</code>, добавление узлов) запускает Reflow, изменение внешности (<code>color</code>, <code>box-shadow</code>) — Repaint. Чтение layout-свойств (<code>offsetHeight</code>, <code>getBoundingClientRect()</code>) при «грязном» дереве заставляет браузер пересчитать Layout синхронно. Чередование чтения и записи в цикле — <span class="accent">layout thrashing</span>: N принудительных reflow вместо одного.</p>
<ul>
  <li>Группируй операции: сначала все чтения, потом все записи; визуальные изменения — через <code>requestAnimationFrame</code>.</li>
  <li>Меняй класс целиком вместо серии инлайн-стилей; массовые вставки — через <code>DocumentFragment</code>.</li>
</ul>

<h3>Композитные слои и GPU</h3>
<p><code>will-change: transform</code> (или <code>translateZ(0)</code>) выносит элемент на отдельный композитный слой: его движение обрабатывает компоситор на GPU, не трогая Layout/Paint остальной страницы.</p>
<p class="info info--blue">Каждый слой занимает память GPU. <code>will-change</code> — точечный инструмент для реально анимируемых элементов, а не глобальный «ускоритель»: развешанный повсюду, он вызывает layer explosion и замедляет страницу.</p>

<h3>content-visibility: auto</h3>
<p>Заставляет браузер пропускать Layout и Paint содержимого блока, пока тот не приблизится к вьюпорту; при скролле контент отрисовывается на лету. В отличие от виртуального скролла узлы остаются в DOM (их находит Ctrl+F, они доступны для скринридеров) — режется только стоимость рендеринга, а не сам DOM. Удобно для длинной страницы из тяжёлых разнородных секций (статья, лента карточек), тогда как виртуализация — для тысяч однотипных строк.</p>
<p><code>contain-intrinsic-size</code> задаёт блоку примерную высоту-заглушку, пока он не отрисован, — без неё скроллбар и раскладка будут прыгать (CLS) по мере рендеринга секций.</p>
<code class="code">
  .section {
    content-visibility: auto;
    contain-intrinsic-size: auto 500px; /* примерная высота до рендера */
  }
</code>
<p class="info info--blue">Оценка высоты в <code>contain-intrinsic-size</code> — компромисс: сильное расхождение с реальной высотой даёт скачки скролла. Значение <code>auto</code> просит браузер запомнить фактический размер после первого рендера и переиспользовать его.</p>

<h3>Оптимизации на уровне фреймворков</h3>
<ul>
  <li><strong>Angular:</strong> <code>ChangeDetectionStrategy.OnPush</code> и Signals — проверка изменений только там, где реально поменялись данные; <code>trackBy</code> в списках; <code>@defer</code> для отложенных блоков шаблона.</li>
  <li><strong>Vue:</strong> <code>v-once</code>/<code>v-memo</code> для статичных кусков шаблона, <code>shallowRef</code> для больших структур без глубокой реактивности.</li>
  <li>Общий принцип — сузить зону перерисовки: виртуализация списков, мемоизация вычислений, разбиение тяжёлых компонентов.</li>
</ul>

<h3>Шрифты подробнее</h3>
<ul>
  <li>Только WOFF2, сабсеттинг по <code>unicode-range</code> (не грузить кириллицу на англоязычной странице и наоборот).</li>
  <li><code>&lt;link rel="preload" as="font"&gt;</code> для шрифта первого экрана + self-hosting вместо сторонних CDN.</li>
  <li>Подгонка фолбэк-шрифта через <code>size-adjust</code>/<code>ascent-override</code> убирает CLS при подмене шрифта.</li>
</ul>

<h3>Доставка: детали</h3>
<ul>
  <li>HTTP/2 мультиплексирует запросы в одном соединении; HTTP/3 (QUIC) ускоряет хендшейк и живучесть на мобильных сетях.</li>
  <li>Brotli сжимает текст на ~15–20% лучше gzip.</li>
  <li>Кэширование: хэши в именах бандлов + долгий <code>Cache-Control: immutable</code>; Service Worker для мгновенных повторных визитов.</li>
  <li>103 Early Hints: сервер отдаёт preload/preconnect-подсказки ещё до того, как сгенерирован HTML.</li>
</ul>

<h3>Метрики: пороги и практика</h3>
<ul>
  <li>«Зелёные» пороги: LCP ≤ 2.5 с, INP ≤ 200 мс, CLS ≤ 0.1 — по 75-му перцентилю реальных пользователей.</li>
  <li>INP заменила FID (2024): FID мерил задержку только первого ввода, INP — худшее взаимодействие за весь визит.</li>
  <li>Lab-данные (Lighthouse, DevTools) — для отладки; полевые (RUM, CrUX) — источник истины о реальных пользователях.</li>
</ul>
