<h3>Введение и Базовое определение</h3>
<p>В Angular <span class="accent">директивы</span> — это классы с декоратором <code>@Directive()</code>, которые позволяют добавлять кастомное поведение элементам в DOM. Директивы делятся на три основных типа: компоненты (директивы со своим собственным шаблоном), структурные и атрибутные. На собеседованиях чаще всего просят сравнить и привести примеры именно последних двух видов.</p>

<h3>Структурные директивы в Angular</h3>
<p><span class="accent">Структурные директивы</span> изменяют саму структуру DOM-дерева. Они могут физически добавлять, удалять или заменять элементы. Визуально в шаблоне их легко узнать по обязательному префиксу-звёздочке <strong>*</strong> перед именем.</p>
<p>Ключевое применение: условный рендеринг и отрисовка коллекций (списков).</p>

<code class="code">
&lt;!-- Элемент не скроется через CSS, а полностью удалится из DOM --&gt;
&lt;div *ngIf="isVisible"&gt;
  Этот блок появится только если isVisible === true.
&lt;/div&gt;

&lt;!-- Для каждого элемента массива будет создана копия тега li --&gt;
&lt;ul&gt;
  &lt;li *ngFor="let item of items"&gt;{{ item.name }}&lt;/li&gt;
&lt;/ul&gt;
</code>

<h3>Атрибутные директивы в Angular</h3>
<p><span class="accent">Атрибутные директивы</span> изменяют внешний вид или поведение уже существующего DOM-элемента, компонента или другой директивы. Они применяются как обычные HTML-атрибуты через проперти биндинг, но не удаляют сам элемент из DOM.</p>

<code class="code">
&lt;!-- Класс 'active' добавится при isActive === true, элемент в DOM остается всегда --&gt;
&lt;div [ngClass]="{'active': isActive}"&gt;
  Стиль изменился.
&lt;/div&gt;

&lt;!-- Динамически добавляет inline-style --&gt;
&lt;input [ngStyle]="{'background-color': statusColor}" /&gt;
</code>

<h3>Ключевые особенности и сравнение</h3>
<p>- <strong>Сфера влияния:</strong> Структурные управляют наличием элементов внутри шаблона (меняют DOM-дерево), а атрибутные лишь влияют на свойства и внешний вид конкретного элемента (стили, классы, слушатели событий).</p>
<p>- <strong>Синтаксис:</strong> Структурные классически обозначаются через <code>*</code> (например, <code>*ngIf</code>), в то время как атрибутные записываются в квадратных скобках <code>[]</code> (как <code>[ngClass]</code>).</p>
<p>- <strong>Уничтожение:</strong> Структурная директива может уничтожить DOM-узел и все его дочерние узлы в памяти, что полезно для оптимизации производительности большого дерева.</p>

<p class="info info--orange">Нельзя применить больше одной структурной директивы на один DOM-элемент. Например, написать одновременно <code>*ngIf</code> и <code>*ngFor</code> на одном <code>&lt;div&gt;</code> приведет к ошибке компиляции в Angular. Для решения этой проблемы используют обертку из тега <code>&lt;ng-container&gt;</code>.</p>
<p class="info info--blue">Синтаксис со звёздочкой (<code>*ngIf</code>) — это просто синтаксический сахар над комбинацией тега <code>&lt;ng-template&gt;</code> и property binding <code>[ngIf]</code>. При сборке фреймворк разворачивает это в обычный биндинг.</p>

<p class="deep-dive">Углубленный конспект</p>
<p>Для создания кастомной <span class="accent">структурной директивы</span> мы инжектим в конструктор два важнейших сервиса:</p>
<p>1. <code>TemplateRef</code> — содержит встроенный шаблон, который нужно отрендерить.</p>
<p>2. <code>ViewContainerRef</code> — мощный сервис-контейнер, куда этот шаблон будет вставляться, и через который мы вручную создаем (<code>createEmbeddedView</code>) или удаляем (<code>clear</code>) DOM-узлы.</p>

<code class="code">
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({ selector: '[appCustomIf]' })
export class CustomIfDirective {
  constructor(
    private templateRef: TemplateRef&lt;any&gt;,
    private viewContainer: ViewContainerRef
  ) {}

  @Input() set appCustomIf(condition: boolean) {
    if (condition) {
      // Инициализируем шаблон в контейнере
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      // Полностью очищаем DOM от элемента
      this.viewContainer.clear();
    }
  }
}
</code>
<p>Для создания кастомной <span class="accent">атрибутной директивы</span> механика проще. Обычно инжектят <code>ElementRef</code> (ссылку на нативный элемент) и часто <code>Renderer2</code> (для безопасной манипуляции с DOM вне браузерного окружения, например при SSR).</p>
<code class="code">
import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({ selector: '[appHighlight]' })
export class HighlightDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', 'yellow');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.removeStyle(this.el.nativeElement, 'backgroundColor');
  }
}
</code>
