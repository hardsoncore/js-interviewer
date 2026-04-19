import { QuestionCategories, QuestionLevels } from 'src/app/enums/questions.enum';
import { Question } from 'src/app/models/question.model';

export const questions = [
  {
    id: 1,
    name: 'Как браузер парсит страницу?',
    answer: 'assets/content/rus/answers/1-Kak-brauzer-parsit-stranitsu.md',
    tags: [
      'markup',
      'CSS',
      'browser'
    ],
    category: 'Markup',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Критический путь рендеринга',
      },
      {
        name: 'Как браузер строит DOM, CSSOM и Render Tree',
      },
      {
        name: 'Как браузер выполняет JavaScript и как это влияет на рендеринг',
      },
      {
        name: 'Что такое Layout / Reflow',
      },
      {
        name: 'Что такое Repaint',
      },
      {
        name: 'Composite (композитинг)',
      },
      {
        name: 'Ивенты DOMContentLoaded и Load - в чем разница?',
      }
    ]
  },
  {
    id: 2,
    name: 'Как оптимизировать рендеринг страницы',
    answer: 'assets/content/rus/answers/2-Kak-optimizirovat-rendering-stranitsy.md',
    tags: [
      'markup',
      'CSS',
      'browser'
    ],
    category: 'Markup',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Critical Rendering Path (CRP)',
      },
      {
        name: 'Оптимизация DOM (HTML)',
      },
      {
        name: 'Оптимизация CSSOM (CSS)',
      },
      {
        name: 'Оптимизация JavaScript',
      },
      {
        name: 'Оптимизация медиа и шрифтов (Ресурсы)',
      },
      {
        name: 'Сетевые оптимизации и доставка контента',
      },
      {
        name: 'Профилирование и метрики',
      }
    ]
  },
  {
    id: 3,
    name: 'Что такое <DOCTYPE>. Зачем он нужен?',
    answer: 'assets/content/rus/answers/3-Chto-takoe-DOCTYPE-Zachem-on-nuzhen.md',
    tags: [
      'HTML',
      'markup'
    ],
    category: 'Markup',
    level: QuestionLevels.junior,
    structure: [
      {
        name: 'Что такое этот тег DOCTYPE',
      },
      {
        name: 'Зачем нужен DOCTYPE',
      },
      {
        name: 'Рассказать, про то что есть разные виды DOCTYPE',
      },
      {
        name: 'Можно ли вообще обойтись без DOCTYPE?',
      },
      {
        name: 'Сейчас практически всегда стоит юзать DOCTYPE HTML5',
      }
    ]
  },
  {
    id: 4,
    name: 'Теги HTML5. Семантика. Доступность.',
    answer: 'assets/content/rus/answers/4-Tegi-HTML5-Semantika-Dostupnost.md',
    tags: [
      'HTML',
      'markup'
    ],
    category: 'Markup',
    level: QuestionLevels.junior,
    structure: [
      {
        name: 'Что такое семантическая вёрстка и зачем она нужна',
      },
      {
        name: 'Основные семантические теги HTML',
      },
      {
        name: 'Как разметить страницу с точки зрения семантики',
      }
    ]
  },
  {
    id: 5,
    name: 'Какие есть способы подключить CSS на страницу?',
    answer: 'assets/content/rus/answers/5-Kakie-est-sposoby-podklyuchit-CSS-na-stranitsu.md',
    tags: [
      'HTML',
      'markup',
      'CSS'
    ],
    category: 'Markup',
    level: QuestionLevels.junior,
    structure: [
      {
        name: 'Подключение CSS через внешний файл стилей тегом link',
      },
      {
        name: 'Добавление CSS с помощью тега style',
      },
      {
        name: 'Импорт CSS через команду @import',
      },
      {
        name: 'Inline-стили CSS',
      },
      {
        name: 'Стили CSS через JavaScript',
      }
    ]
  },
  {
    id: 6,
    name: 'Как браузер парсит CSS и строит стили под капотом? Токенизация, парсинг (Right-to-Left)',
    answer: 'assets/content/rus/answers/6-Kak-brayuzer-parsit-CSS.md',
    tags: [
      'css',
      'markup',
      'browser'
    ],
    category: 'Markup',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Токенизация CSS: как браузер разбивает код на токены',
      },
      {
        name: 'Архитектура парсинга CSS в браузере',
      },
      {
        name: 'Right-to-Left парсинг и его преимущества',
      },
      {
        name: 'Как парсинг CSS влияет на рендеринг страницы',
      },
      {
        name: 'Ошибки в CSS и как браузер их обрабатывает',
      },
      {
        name: 'Оптимизации парсинга CSS в современных браузерах',
      },
      {
        name: 'Блокировка рендера и этапы Layout, Paint, Composite',
      }
    ]
  },
  {
    id: 7,
    name: 'Приоритет стилей в CSS: как работает Каскадность и как считается "вес" селекторов.',
    answer: 'assets/content/rus/answers/7-Prioritet-stiley-v-CSS.md',
    tags: [
      'markup',
      'CSS',
      'browser',
      'Styles specificity'
    ],
    category: 'Markup',
    level: QuestionLevels.junior,
    structure: [
      {
        name: 'Каскадность в CSS: как браузер определяет, какие стили применять',
      },
      {
        name: '!important',
      },
      {
        name: 'Inline-стили',
      },
      {
        name: 'ID',
      },
      {
        name: 'Классы, Атрибуты, Псевдоклассы',
      },
      {
        name: 'Теги, Псевдоэлементы',
      },
      {
        name: 'Нулевой вес',
      }
    ]
  },
  {
    id: 8,
    name: 'Высокая специфичность селектора, есть ли у нее какие-то недостатки? + !important',
    answer: 'assets/content/rus/answers/8-Vysokaya-spetsifichnost-selektora-est-li-u-nee-kakie-to-nedostatki.md',
    tags: [
      'markup',
      'CSS'
    ],
    category: 'Markup',
    level: QuestionLevels.junior,
    structure: [
      {
        name: 'Недостатки высокой специфичности',
      },
      {
        name: '!important - когда стоит использовать и какие проблемы может вызвать',
      },
      {
        name: 'Best practices для управления специфичностью и приоритетом стилей',
      }
    ]
  },
  {
    id: 9,
    name: 'В чём разница между CSS-комбинаторами >, + и ~ ?',
    answer: 'assets/content/rus/answers/9-Selektory-+-~.md',
    tags: [
      'markup',
      'CSS'
    ],
    category: 'Markup',
    level: QuestionLevels.junior,
    structure: [
      {
        name: '>',
      },
      {
        name: '+',
      },
      {
        name: '~',
      }
    ]
  },
  {
    id: 10,
    name: 'Псевдоклассы элементов (псевдоклассы состояния, структурные псевдоклассы и продвинутые селекторы Modern CSS), Псевдоклассы форм',
    answer: 'assets/content/rus/answers/10-Psevdoklassy-elementov.md',
    tags: [
      'HTML',
      'markup',
      'CSS'
    ],
    category: 'Markup',
    level: QuestionLevels.junior,
    structure: [
      {
        name: 'Псевдоклассы состояния (Интерактив)',
      },
      {
        name: 'Структурные псевдоклассы',
      },
      {
        name: 'Продвинутые селекторы (Modern CSS)',
      },
      {
        name: 'Псевдоклассы форм',
      }
    ]
  },
  {
    id: 11,
    name: 'Псевдоэлементы (генерируемый контент, текстовые, интерфейсные, продвинутые). Как они работают и для чего нужны?',
    answer: 'assets/content/rus/answers/11-Psevdoelementy.md',
    tags: [
      'HTML',
      'markup',
      'CSS'
    ],
    category: 'Markup',
    level: QuestionLevels.junior,
    structure: [
      {
        name: 'Что такое псевдоэлементы?',
      },
      {
        name: 'Генерируемый контент (::before и ::after)',
      },
      {
        name: 'Текстовые (::first-letter и ::first-line)',
      },
      {
        name: 'Интерфейсные (::placeholder, ::selection, ::marker)',
      },
      {
        name: 'Продвинутые (::backdrop, ::file-selector-button)',
      }
    ]
  },
  {
    id: 12,
    name: 'Resource Hints (preload, prefetch, preconnect): В чем разница между ними на уровне сетевого стека браузера?',
    answer: 'assets/content/rus/answers/11-Resource-Hints.md',
    tags: [
      'HTML',
      'markup',
      'browser',
    ],
    category: 'Markup',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Что такое Resource Hints и зачем они нужны?',
      },
      {
        name: 'Preload',
      },
      {
        name: 'Prefetch',
      },
      {
        name: 'Preconnect',
      },
      {
        name: 'Как браузер обрабатывает эти Resource Hints на уровне сетевого стека',
      },
      {
        name: 'Как неправильное использование preload может навредить First Contentful Paint (FCP) и заблокировать основной поток?',
      }
    ]
  },
  {
    id: 13,
    name: 'Позиционирование элементов (absolute, fixed, relative etc.)',
    answer: 'assets/content/rus/answers/13-Pozitsionirovanie-elementov-absolute-fixed-relative.md',
    tags: [
      'HTML',
      'markup',
      'CSS'
    ],
    category: 'Markup',
    level: QuestionLevels.junior,
    structure: [
      {
        name: 'static',
      },
      {
        name: 'relative',
      },
      {
        name: 'absolute',
      },
      {
        name: 'fixed',
      },
      {
        name: 'sticky',
      }
    ]
  },
  {
    id: 14,
    name: 'Типы элементов (строчные, блочные и т.д.). Их различия',
    answer: 'assets/content/rus/answers/14-Tipy-elementov-strochnye-blochnye-i-td-Ih-razlichiya.md',
    tags: [
      'HTML',
      'markup',
      'CSS'
    ],
    category: 'Markup',
    level: QuestionLevels.junior,
    structure: [
      {
        name: 'Блочные элементы',
      },
      {
        name: 'Строчные элементы',
      },
    ]
  },
  {
    id: 15,
    name: 'Центрирование (горизонтальное, вертикальное)',
    answer: 'assets/content/rus/answers/15-Tsentrirovanie-gorizontalnoe-vertikalnoe.md',
    tags: [
      'HTML',
      'markup',
      'CSS'
    ],
    category: 'Markup',
    level: QuestionLevels.junior,
    structure: [
      {
        name: 'Горизонтальное центрирование',
      },
      {
        name: 'Вертикальное центрирование',
      }
    ]
  },
  {
    id: 16,
    name: 'Боксовая модель(Box Model) и box-sizing',
    answer: 'assets/content/rus/answers/16-Boksovaya-modelBox-Model-i-box-sizing.md',
    tags: [
      'HTML',
      'markup',
      'CSS'
    ],
    category: 'Markup',
    level: QuestionLevels.junior,
    structure: [
      {
        name: 'Боксовая модель (Box Model)',
      },
      {
        name: 'box-sizing: content-box и box-sizing: border-box',
      }
    ]
  },
  {
    id: 17,
    name: 'Flexbox VS Grid',
    answer: 'assets/content/rus/answers/17-Flexbox-VS-Grid.md',
    tags: [
      'HTML',
      'markup',
      'CSS'
    ],
    category: 'Markup',
    level: QuestionLevels.junior,
    structure: [
      {
        name: 'Что такое Flexbox',
      },
      {
        name: 'Что такое Grid',
      },
      {
        name: 'Основные отличия между Flexbox и Grid',
      },
    ]
  },
  {
    id: 18,
    name: 'CSS анимации',
    answer: 'assets/content/rus/answers/18-CSS-animatsii.md',
    tags: [
      'markup',
      'CSS',
      'animations'
    ],
    category: 'Markup',
    level: QuestionLevels.junior,
    structure: [
      {
        name: 'Что такое CSS анимации?',
      },
      {
        name: 'Основные свойства для создания анимаций',
      },
      {
        name: 'Преимущества и недостатки CSS анимаций',
      }
    ]
  },
  {
    id: 19,
    name: 'Относительная размерность в CSS: управление контекстом и вопросы доступности (a11y)',
    answer: 'assets/content/rus/answers/19-Otnositelnaya-razmernost-i-a11y.md',
    tags: [
      'markup',
      'CSS',
      'a11y'
    ],
    category: 'Markup',
    level: QuestionLevels.junior,
    structure: [
      {
        name: 'Относительные единицы измерения (em, rem, %, vw, vh) и их преимущества',
      },
      {
        name: 'Как относительные единицы помогают в адаптивной верстке',
      },
      {
        name: 'Влияние относительных единиц на доступность (a11y) и удобство использования',
      },
      {
        name: 'Архитектура адаптивных величин: контекст вычисления, наследование и масштабируемость',
      }
    ]
  },
  {
    id: 20,
    name: 'Движки браузера. Какие существуют современные движки и в чем их отличия?',
    answer: 'assets/content/rus/answers/20-Dvizhki-brauzera.md',
    tags: [
      'JavaScript',
      'JS mechanics',
      'browser'
    ],
    category: 'JavaScript',
    level: QuestionLevels.junior,
    structure: [
      {
        name: 'Что такое движок браузера и его роль в работе веб-страниц',
      },
      {
        name: 'Современные движки браузера: V8 (Chrome, Edge), SpiderMonkey (Firefox), JavaScriptCore (Safari)',
      },
      {
        name: 'Основные отличия между движками и их оптимизации',
      },
      {
        name: 'Как выбор движка влияет на производительность и совместимость веб-приложений',
      },
      {
        name: 'Как можно классифицировать браузеры по типу использования движка (Создатели движков, кастомный UI, Системные обертки)',
      }
    ]
  },
  {
    id: 21,
    name: 'Парсинг и компиляция JS: как движок читает и оптимизирует код',
    answer: 'assets/content/rus/answers/21-Kak-dvizhki-JS-parsyat-i-optimiziruyut-kod.md',
    tags: [
      'JavaScript',
      'JS mechanics',
      'browser'
    ],
    category: QuestionCategories.javascript,
    level: QuestionLevels.senior,
    structure: [
      {
        name: 'Современные JS-движки используют гибридный подход: интерпретация и JIT-компиляция',
      },
      {
        name: 'Парсинг JavaScript и построение AST',
      },
      {
        name: 'Интерпретация',
      },
      {
        name: 'JIT-компиляция',
      },
      {
        name: 'Оптимизация (Turbofan) и Деоптимизация (Bailout)',
      },
      {
        name: 'Как писать код, который будет хорошо оптимизироваться движком',
      }
    ]
  },
  {
    id: 22,
    name: 'Способы подключить JS на страницу. Какую роль играет порядок подключения ресурсов (в head и в конце body).',
    answer: 'assets/content/rus/answers/22-Sposoby-podklyuchit-JS-na-stranitsu.md',
    tags: [
      'HTML',
      'markup',
      'JavaScript'
    ],
    category: 'Markup',
    level: QuestionLevels.junior,
    structure: [
      {
        name: '3 способа подключения JS на страницу',
      }
    ]
  },
  {
    id: 23,
    name: 'В чём разница между атрибутами async и defer у тега <script>?',
    answer: 'assets/content/rus/answers/23-Atributy-defer-i-async-u-tega-script.md',
    tags: [
      'HTML',
      'markup',
      'JavaScript'
    ],
    category: 'Markup',
    level: QuestionLevels.junior,
    structure: [
      {
        name: 'Async',
      },
      {
        name: 'Defer',
      },
      {
        name: 'Без атрибутов',
      }
    ]
  },
  {
    id: 24,
    name: 'Работа с SVG. Какие существуют способы анимировать SVG?',
    answer: 'assets/content/rus/answers/24-SVG-Animatsii-svg.md',
    tags: [
      'SVG',
      'markup',
      'animations'
    ],
    category: 'Markup',
    level: QuestionLevels.junior,
    structure: [
      {
        name: 'Что такое SVG?',
      },
      {
        name: 'Ключевые особенности SVG',
      },
      {
        name: 'Способы анимации SVG: CSS анимации, SMIL, JavaScript',
      }
    ]
  },
  {
    id: 25,
    name: 'Что такое HTML5 Canvas и для каких задач он применяется?',
    answer: 'assets/content/rus/answers/25-Canvas-Chto-eto-i-zachem-nuzhen.md',
    tags: [
      'HTML',
      'markup',
      'CSS'
    ],
    category: 'Markup',
    level: QuestionLevels.junior,
    structure: [
      {
        name: 'Canvas - что это?',
      },
      {
        name: 'Зачем нужен Canvas?',
      },
      {
        name: 'Основные сферы применения',
      },
      {
        name: 'Преимущества и недостатки Canvas',
      },
      {
        name: 'В каких случаях для рендеринга лучше выбрать Canvas, а не DOM или SVG?',
      }
    ]
  },
  {
    id: 26,
    name: 'CSS Variables под капотом: наследование, область видимости и динамическая темизация через CSS Custom Properties',
    answer: 'assets/content/rus/answers/26-Custom-properties.md',
    tags: [
      'markup',
      'CSS',
      'CSS Variables'
    ],
    category: 'Markup',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'CSS Custom Properties - что это?',
      },
      {
        name: 'Поддержка в браузерах и когда появились',
      },
      {
        name: 'Главные отличия от переменных SASS/LESS',
      },
      {
        name: 'Наследование и область видимости CSS Custom Properties',
      },
      {
        name: 'Динамическая темизация через CSS Custom Properties',
      }
    ]
  },
  {
    id: 27,
    name: 'Производительность анимаций и Критический путь рендеринга',
    answer: 'assets/content/rus/answers/27-Proizvoditelnost-animatsiy-i-Kriticheskiy-put-renderinga.md',
    tags: [
      'CSS',
      'markup',
      'CSS performance',
      'CSS animations'
    ],
    category: 'Markup',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Критический путь рендеринга (Critical Rendering Path) и его влияние на производительность анимаций',
      },
      {
        name: 'Какие CSS-свойства вызывают Layout, Paint и Composite',
      },
    ]
  },
  {
    id: 28,
    name: 'Пре- и пост- процессоры CSS. Опыт работы с ними. Актуальность',
    answer: 'assets/content/rus/answers/28-Pre--i-post--protsessory-CSS-Opyt-raboty-s-nimi.md',
    tags: [
      'markup',
      'CSS'
    ],
    category: 'Markup',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Пре- и пост- процессоры CSS - что это?',
      },
      {
        name: 'Актуальность в 2025-2026 годах',
      }
    ]
  },
  {
    id: 29,
    name: 'Методология БЭМ. Основные позиции, какие проблемы решает?',
    answer: 'assets/content/rus/answers/29-Metodologiya-BEM-Osnovnye-pozitsii-kakie-problemy-reshaet.md',
    tags: [
      'HTML',
      'markup',
      'CSS'
    ],
    category: 'Markup',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Методология БЭМ - что это?',
      },
      {
        name: 'Основные позиции методологии БЭМ',
      },
      {
        name: 'Какие проблемы решает БЭМ',
      }
    ]
  },
  {
    id: 30,
    name: 'HTML-шаблонизаторы/препроцессоры (handlebars, mustache, pug etc)',
    answer: 'assets/content/rus/answers/30-HTML-shablonizatorypreprotsessory-handlebars-mustache-pug-etc.md',
    tags: [
      'HTML',
      'markup'
    ],
    category: 'Markup',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'HTML-шаблонизаторы/препроцессоры - что это?',
      },
      {
        name: 'Примеры популярных инструментов',
      },
      {
        name: 'В чем разница между шаблонизатором и препроцессором?',
      },
      {
        name: 'Актуальны ли они сегодня?',
      }
    ]
  },
  {
    id: 31,
    name: 'Какие типы узлов есть в DOM, чем они отличаются и для чего нужны?',
    answer: 'assets/content/rus/answers/31-Kakie-tipy-uzlov-est-v-DOM.md',
    tags: [
      'browser',
      'performance',
      'markup',
      'DOM'
    ],
    category: 'Markup',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Какие типы узлов есть в DOM?',
      },
      {
        name: 'Чем они отличаются?',
      },
      {
        name: 'Для чего нужны разные типы узлов?',
      }
    ]
  },
  {
    id: 32,
    name: 'Типы данных в JavaScript. typeof и его особенности',
    answer: 'assets/content/rus/answers/32-Tipy-dannyh-zadachi-stroka-+-chislo.md',
    tags: [
      'JavaScript',
      'Data types'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: '7 примитивных типов данных',
      },
      {
        name: '1 непримитивный тип данных',
      },
      {
        name: 'typeof и его особенности',
      }
    ]
  },
  {
    id: 33,
    name: 'Преобразование (приведение) типов в JavaScript',
    answer: 'assets/content/rus/answers/33-Preobrazovanie-privedenie-tipov-v-JavaScript.md',
    tags: [
      'JavaScript',
      'Data types'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Три основных типа преобразования',
      }
    ]
  },
  {
    id: 34,
    name: 'Let, const и var. Различия + Hoisting',
    answer: 'assets/content/rus/answers/34-Let-const-i-var-Razlichiya-+-Hoisting-.md',
    tags: [
      'JavaScript',
      'variables',
      'let', 'const', 'var',
      'JS mechanics'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Let, const и var - различия',
      },
      {
        name: 'Hoisting (всплытие или поднятие)',
      },
      {
        name: 'Как Hoisting работает с var, let и const',
      },
      {
        name: 'Temporal Dead Zone (TDZ) для let и const',
      }
    ]
  },
  {
    id: 35,
    name: 'Функции: function declaration, function expression',
    answer: 'assets/content/rus/answers/35-Funktsii-function-declaration-function-expression.md',
    tags: [
      'JavaScript',
      'JS mechanics',
      'functions'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Function Declaration (Объявление функции)',
      },
      {
        name: 'Function Expression (Функциональное выражение)',
      },
      {
        name: 'Механика парсинга на уровне движка: как движок обрабатывает эти конструкции',
      },
      {
        name: 'Когда стоит использовать Function Declaration, а когда Function Expression',
      }
    ]
  },
  {
    id: 36,
    name: 'Структуры данных (массив, объект, set, map)',
    answer: 'assets/content/rus/answers/36-Struktury-dannyh-massiv-obekt-set-map.md',
    tags: [
      'JavaScript',
      'Data types',
      'Structures'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Массив (Array)',
      },
      {
        name: 'Объект (Object)',
      },
      {
        name: 'Map (Карта)',
      },
      {
        name: 'Set (Множество)',
      },
      {
        name: 'WeakMap и WeakSet',
      }
    ]
  },
  {
    id: 37,
    name: 'Основные методы массивов, которые вы используете',
    answer: 'assets/content/rus/answers/37-Osnovnye-metody-massivov-kotorye-vy-ispolzuete.md',
    tags: [
      'JavaScript',
      'Data types',
      'Structures',
      'Iterable',
      'Array'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'pop/push и shift/unshift, их различия',
      },
      {
        name: 'splice',
      },
      {
        name: 'slice',
      },
      {
        name: 'concat',
      },
      {
        name: 'forEach',
      },
      {
        name: 'indexOf/lastIndexOf и includes, их различия',
      },
      {
        name: 'find и findIndex, их различия',
      },
      {
        name: 'filter',
      },
      {
        name: 'map',
      },
      {
        name: 'sort(fn)',
      },
      {
        name: 'reverse',
      },
      {
        name: 'split и join',
      },
      {
        name: 'reduce',
      },
      {
        name: 'Array.isArray',
      },
      {
        name: '«thisArg»',
      }
    ]
  },
  {
    id: 38,
    name: 'Итераторы и генераторы',
    answer: 'assets/content/rus/answers/38-Iteratory-i-generatory.md',
    tags: [
      'JavaScript',
      'Iterable',
      'JS mechanics',
      'Generators'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Итераторы: Механика под капотом',
      },
      {
        name: 'Генераторы',
      },
      {
        name: 'Зачем это нужно на практике?',
      }
    ]
  },
  {
    id: 39,
    name: 'Область видимости (Scope, Lexical Environment)',
    answer: 'assets/content/rus/answers/39-Oblast-vidimosti-Scope-Lexical-Environment.md',
    tags: [
      'JavaScript',
      'JS mechanics'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Lexical Environment',
      },
      {
        name: 'Виды областей видимости: глобальная, функциональная, блочная',
      },
      {
        name: 'Жизненный цикл переменной',
      }
    ]
  },
  {
    id: 40,
    name: 'Замыкание (Closure)',
    answer: 'assets/content/rus/answers/40-Zamykanie-Closure.md',
    tags: [
      'JavaScript',
      'JS mechanics'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Замыкание - что это и для чего нужно',
      },
      {
        name: '[[Environment]]',
      },
      {
        name: 'Использование замыканий для создания приватных переменных',
      }
    ]
  },
  {
    id: 41,
    name: 'Сборщик мусора (Garbage Collector). Что это такое и для чего нужно?',
    answer: 'assets/content/rus/answers/41-Sborshchik-musora-Garbage-Collector-Chto-eto-takoe-i-dlya-chego-nuzhno.md',
    tags: [
      'JavaScript',
      'JS mechanics'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Garbage Collector',
      }
    ]
  },
  {
    id: 42,
    name: 'Рекурсия. Что это такое и для чего нужно?',
    answer: 'assets/content/rus/answers/42-Rekursiya-Chto-eto-takoe-i-dlya-chego-nuzhno.md',
    tags: [
      'JavaScript',
      'JS mechanics'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Рекурсия - что это и для чего нужно',
      },
      {
        name: 'Плюсы и минусы рекурсии',
      }
    ]
  },
  {
    id: 43,
    name: 'Ключевое слово this. Контекст',
    answer: 'assets/content/rus/answers/43-Klyuchevoe-slovo-this-Kontekst.md',
    tags: [
      'JavaScript',
      'JS mechanics',
      'context'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Глобальный контекст и обычный вызов функции',
      },
      {
        name: 'Вызов в качестве метода объекта',
      },
      {
        name: 'Стрелочные функции (Arrow Functions)',
      }
    ]
  },
  {
    id: 44,
    name: 'Привязка контекста (явная, неявная). Bind, call, apply и их различия',
    answer: 'assets/content/rus/answers/44-Privyazka-konteksta-yavnaya-neyavnaya-Bind-call-apply-i-ih-razlichiya.md',
    tags: [
      'JavaScript',
      'JS mechanics',
      'context'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Неявная привязка (Implicit Binding)',
      },
      {
        name: 'Явная привязка (Explicit Binding)',
      },
      {
        name: 'Методы call, apply и bind и их различия',
      }
    ]
  },
  {
    id: 45,
    name: 'Каррирование (Currying)',
    answer: 'assets/content/rus/answers/45-Karrirovanie-Currying.md',
    tags: [
      'JavaScript',
      'JS mechanics',
      'functions',
      'closures'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Каррирование - что это и для чего нужно',
      },
      {
        name: 'Реализация каррирования',
      },
      {
        name: 'Зачем это нужно на практике?',
      }
    ]
  },
  {
    id: 46,
    name: 'Частичное применение (Partial Application)',
    answer: 'assets/content/rus/answers/46-Chastichnoe-primenenie-Partial-Application.md',
    tags: [
      'JavaScript',
      'JS mechanics',
      'functions',
      'closures'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Частичное применение (основано на каррировании)',
      },
      {
        name: 'Реализация частичного применения',
      }
    ]
  },
  {
    id: 47,
    name: 'Псевдомассив arguments (почему он псевдомассив?)',
    answer: 'assets/content/rus/answers/47-Psevdomassiv-arguments-pochemu-on-psevdomassiv.md',
    tags: [
      'JavaScript',
      'JS mechanics',
      'functions'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Псевдомассив arguments',
      },
      {
        name: 'Почему он псевдомассив?',
      },
      {
        name: 'Arguments VS Arrow Functions',
      },
      {
        name: 'Современные альтернативы',
      }
    ]
  },
  {
    id: 48,
    name: 'Директива "use strict"',
    answer: 'assets/content/rus/answers/48-Direktiva-use-strict.md',
    tags: [
      'JavaScript',
      'JS mechanics'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Директива "use strict" - что это и для чего нужно',
      },
      {
        name: 'Главные изменения при включении строгого режима',
      },
      {
        name: 'Как включить строгий режим?',
      }
    ]
  },
  {
    id: 49,
    name: 'Преобразование объектов: toString и valueOf',
    answer: 'assets/content/rus/answers/49-Preobrazovanie-obektov-toString-i-valueOf.md',
    tags: [
      'JavaScript',
      'JS mechanics'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Преобразование объектов: toString и valueOf',
      },
      {
        name: 'Как движок решает, какой метод вызвать первым',
      }
    ]
  },
  {
    id: 50,
    name: 'Цикл событий (Event loop), microtasks, event queue',
    answer: 'assets/content/rus/answers/50-Tsikl-sobytij-Event-loop-microtasks-event-queue.md',
    tags: [
      'JavaScript',
      'Browser mechanics'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Зачем нужен Event Loop',
      },
      {
        name: 'Основные сущности: Call Stack, Heap, Web APIs, Microtasks и Macrotasks',
      }
    ]
  },
  {
    id: 51,
    name: 'Наследование в JavaScript',
    answer: 'assets/content/rus/answers/51-Nasledovanie-v-JavaScript.md',
    tags: [
      'JavaScript',
      'JS mechanics'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Наследование в JavaScript',
      },
      {
        name: 'Прототипное наследование и цепочка прототипов',
      }
    ]
  },
  {
    id: 52,
    name: 'Ссылка __proto__. Что это и с чем его едят?',
    answer: 'assets/content/rus/answers/52-Ssylka-__proto__-Chto-eto-i-s-chem-ego-edyat.md',
    tags: [
      'JavaScript',
      'JS mechanics'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: '__proto__ - что это?',
      }
    ]
  },
  {
    id: 53,
    name: 'Свойство F.prototype и создание объектов через new',
    answer: 'assets/content/rus/answers/53-Svojstvo-Fprototype-i-sozdanie-obektov-cherez-new.md',
    tags: [
      'JavaScript',
      'JS mechanics'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'F.prototype',
      }
    ]
  },
  {
    id: 54,
    name: 'Promises. Зачем нужны? Какую проблему решали?',
    answer: 'assets/content/rus/answers/54-Promises-Zachem-nuzhny-Kakuyu-problemu-reshali.md',
    tags: [
      'JavaScript',
      'JS mechanics',
      'Promise',
      'Async'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Что такое Promise, в какой версии ES появился',
      },
      {
        name: 'Какую проблему решали промисы',
      },
      {
        name: 'Неизменность результата после завершения промиса',
      },
      {
        name: 'then, catch, finally',
      },
      {
        name: 'Эволюция промисов и async/await',
      }
    ]
  },
  {
    id: 55,
    name: 'Promise chaining. Можно ли вызывать promise.then().finally().then() или promise.catch().then()? Что получим?',
    answer: 'assets/content/rus/answers/55-Promise-chaining-Mozhno-li-vyzyvat-promisethenfinallythen-ili-promisecatchthen-Chto-poluchim.md',
    tags: [
      'JavaScript',
      'JS mechanics',
      'Promise',
      'Async'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Promise chaining',
      },
      {
        name: 'Можно продолжить цепочку вызовов после ошибки',
      },
      {
        name: 'Можно строить такие цепочки и с finally',
      }
    ]
  },
  {
    id: 56,
    name: 'Try - Catch. Что это и для чего нужно?',
    answer: 'assets/content/rus/answers/56-Try---Catch-Chto-eto-i-dlya-chego-nuzhno.md',
    tags: [
      'JavaScript'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Try - Catch - для чего нужно?',
      }
    ]
  },
  {
    id: 57,
    name: 'Что нового появилось в языке в ES6?',
    answer: 'assets/content/rus/answers/57-Chto-novogo-poyavilos-v-yazyke-v-ES6.md',
    tags: [
      'JavaScript',
      'ES6'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: '11 основных нововведений в ES6',
      }
    ]
  },
  {
    id: 58,
    name: 'Что нового появилось в языке ПОСЛЕ ES6?',
    answer: 'assets/content/rus/answers/58-Chto-novogo-poyavilos-v-yazyke-POSLE-ES6.md',
    tags: [
      'JavaScript',
      'ES6',
      'ES7'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Теги HTML',
      }
    ]
  },
  {
    id: 59,
    name: 'Async await. Какую проблему решают?',
    answer: 'assets/content/rus/answers/59-Async-await-Kakuyu-problemu-reshayut.md',
    tags: [
      'JavaScript',
      'ES6',
      'Promise',
      'Async'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Эволюция асинхронного JS в ES8',
      },
      {
        name: 'Зачем нужен async/await? Какую проблему решает?',
      },
      {
        name: 'try...catch...finally',
      },
      {
        name: 'node.js и поддержка async/await',
      }
    ]
  },
  {
    id: 60,
    name: 'Методы управления группой промисов',
    answer: 'assets/content/rus/answers/60-Metody-upravleniya-gruppoj-promisov.md',
    tags: [
      'JavaScript',
      'ES6',
      'Promise',
      'Async'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Какую проблему решают',
      },
      {
        name: 'Promise.all() — «Все или ничего»',
      },
      {
        name: 'Promise.allSettled() — «Дождаться всех, несмотря ни на что»',
      },
      {
        name: 'Promise.race() — «Кто быстрее»',
      },
      {
        name: 'Promise.any() — «Хоть кто-нибудь успешный»',
      }
    ]
  },
  {
    id: 61,
    name: 'DOM - что это и зачем? DOM события. Всплытие, погружение. Делегирование',
    answer: 'assets/content/rus/answers/61-DOM---chto-eto-i-zachem-DOM-sobytiya-Vsplytie-pogruzhenie-Delegirovanie.md',
    tags: [
      'markup',
      'browser mechanics',
    ],
    category: 'Markup',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Теги HTML',
      }
    ]
  },
  {
    id: 62,
    name: 'LocalStorage VS SessionStorage. Различия, принцип работы',
    answer: 'assets/content/rus/answers/62-LocalStorage-VS-SessionStorage-Razlichiya-printsip-raboty.md',
    tags: [
      'browser',
      'LocalStorage',
      'SessionStorage'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'LocalStorage',
      },
      {
        name: 'SessionStorage',
      },
    ]
  },
  {
    id: 63,
    name: 'Code style: linters, prettier etc.',
    answer: 'assets/content/rus/answers/63-Code-style-Linters-Prittier.md',
    tags: [
      'programming',
      'codestyle',
      'best-practice'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Зачем нужен code style и инструменты для его поддержания',
      },
      {
        name: 'Prettier',
      },
      {
        name: 'ESLint, TSLint и CodeLint',
      },
      {
        name: '.editorconfig',
      }
    ]
  },
  {
    id: 64,
    name: 'Мутабильность/иммутабильность (при работе с массивами etc)',
    answer: 'assets/content/rus/answers/64-Mutabilnostimmutabilnost-pri-rabot-s-massivami-etc.md',
    tags: [
      'programming',
      'immutable'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Теги HTML',
      }
    ]
  },
  {
    id: 65,
    name: 'Реактивное программирование. RxJs и основные методы',
    answer: 'assets/content/rus/answers/65-Reaktivnoe-programmirovanie-RxJs-i-osnovnye-metody.md',
    tags: [
      'TypeScript',
      'RxJs'
    ],
    category: QuestionCategories.typescript,
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Реактивное программирование - что это?',
      },
      {
        name: 'RxJs - для чего нужен?',
      },
    ]
  },
  {
    id: 66,
    name: 'Что такое объект Observable в RxJs?',
    answer: 'assets/content/rus/answers/66-Chto-takoe-obekt-Observable-v-RxJs.md',
    tags: [
      'TypeScript',
      'Observables',
      'Async',
      'RxJs'
    ],
    category: QuestionCategories.typescript,
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Observable - что это?',
      }
    ]
  },
  {
    id: 67,
    name: 'Что такое Subject? Какие бывают виды?',
    answer: 'assets/content/rus/answers/67-Chto-takoe-Subject-Kakie-byvayut-vidy.md',
    tags: [
      'TypeScript',
      'Observables',
      'Async',
      'RxJs'
    ],
    category: QuestionCategories.typescript,
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Subject - что это?',
      },
      {
        name: 'Виды Subject: Subject, BehaviorSubject, ReplaySubject, AsyncSubject',
      }
    ]
  },
  {
    id: 68,
    name: 'Observables VS Subject - различия',
    answer: 'assets/content/rus/answers/68-Observables-VS-Subject---razlichiya.md',
    tags: [
      'TypeScript',
      'Observables',
      'Async',
      'RxJs'
    ],
    category: QuestionCategories.typescript,
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Специфика Subject',
      },
      {
        name: 'Различия поведения и виды Subject',
      },
      {
        name: 'Специфика Observable',
      },
      {
        name: 'Observable - только на получение данных, Subject - ещё и для распространения',
      }
    ]
  },
  {
    id: 69,
    name: 'Zone.js. Что это и для чего нужно?',
    answer: 'assets/content/rus/answers/69-Zonejs-Chto-eto-i-dlya-chego-nuzhno.md',
    tags: [
      'Angular',
      'Change Detection',
      'Async'
    ],
    category: 'Angular',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Zone.js - что это?',
      },
      {
        name: 'Как работает Zone.js под капотом',
      }
    ]
  },
  {
    id: 70,
    name: 'Какие Utility Types (Утилиты типов) ты используешь на практике?',
    answer: 'assets/content/rus/answers/70-Kakie-Utility-Types-Utility-tipov-ty-ispolzuesh-na-praktike.md',
    tags: [
      'TypeScript',
      'Typization'
    ],
    category: QuestionCategories.typescript,
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Partial&lt;Type> (Частичный)',
      },
      {
        name: 'Required&lt;Type> (Обязательный)',
      },
      {
        name: 'Pick&lt;Type, Keys> (Выбрать)',
      },
      {
        name: 'Omit&lt;Type, Keys> (Исключить)',
      },
      {
        name: 'Record&lt;Keys, Type> (Запись / Словарь)',
      }
    ]
  },
  {
    id: 71,
    name: 'Что такое Type Guards и Type Assertions?',
    answer: 'assets/content/rus/answers/71-Chto-takoe-Type-Guards-i-Type-Assertions.md',
    tags: [
      'TypeScript',
      'TS mechanics',
      'Typization'
    ],
    category: QuestionCategories.typescript,
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Type Guards - typeof, in, instanceof, Custom Type Guards',
      },
      {
        name: 'Type Assertions - as, <Type>, !, as const',
      }
    ]
  },
  {
    id: 72,
    name: 'Что такое Enums? Их применение',
    answer: 'assets/content/rus/answers/72-Chto-takoe-Enums-Ih-primenenie.md',
    tags: [
      'TypeScript',
      'Typization'
    ],
    category: QuestionCategories.typescript,
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Enums (Перечисления)',
      },
      {
        name: 'Плюсы Enums',
      },
      {
        name: 'Numeric Enums (Числовые перечисления)',
      },
      {
        name: 'String Enums (Строковые перечисления)',
      },
      {
        name: 'Heterogeneous Enums (Гетерогенные перечисления)',
      },
      {
        name: 'Const Enums (Константные перечисления)',
      },
      {
        name: 'Под капотом: как JavaScript обрабатывает Enums',
      }
    ]
  },
  {
    id: 73,
    name: 'Class, Interface, Type. Различия и применение',
    answer: 'assets/content/rus/answers/73-Class-Interface-Type-Razlichiya-i-primenenie.md',
    tags: [
      'TypeScript',
      'Typization'
    ],
    category: QuestionCategories.typescript,
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Class (Реализация)',
      },
      {
        name: 'Interface (Контракт)',
      },
      {
        name: 'Type (Псевдоним)',
      }
    ]
  },
  {
    id: 74,
    name: 'Что такое Generics? Их применение',
    answer: 'assets/content/rus/answers/74-Chto-takoe-Generics-Ih-primenenie.md',
    tags: [
      'TypeScript',
      'Typization'
    ],
    category: QuestionCategories.typescript,
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Generics (Обобщения) - какую проблему решают?',
      },
      {
        name: 'Синтаксис Generics',
      },
      {
        name: 'Применение Generics в функциях, интерфейсах и классах',
      },
      {
        name: 'Ограничения (Constraints) в Generics',
      },
      {
        name: 'Утилиты типов на основе Generics',
      },
      {
        name: 'Множественные параметры типов',
      },
      {
        name: 'Как Generics работают под капотом в JavaScript',
      }
    ]
  },
  {
    id: 75,
    name: 'Разница между any, unknown и never',
    answer: 'assets/content/rus/answers/75-Raznitsa-mezhdu-any-unknown-i-never.md',
    tags: [
      'TypeScript',
      'Typization'
    ],
    category: QuestionCategories.typescript,
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'any',
      },
      {
        name: 'unknown',
      },
      {
        name: 'never',
      }
    ]
  },
  {
    id: 76,
    name: 'Когда использовать .asObservable() в RxJs?',
    answer: 'assets/content/rus/answers/76-Kogda-ispolzovat-asObservable-v-RxJs.md',
    tags: [
      'TypeScript',
      'Angular',
      'RxJs'
    ],
    category: QuestionCategories.typescript,
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'asObservable() - что это и для чего нужно?',
      },
      {
        name: 'Правильный способ использования asObservable()',
      },
      {
        name: 'Антипаттерн использования asObservable()',
      }
    ]
  },
  {
    id: 77,
    name: 'Основные принципы ООП',
    answer: 'assets/content/rus/answers/77-Osnovnye-printsipy-OOP.md',
    tags: [
      'programming',
      'ООП'
    ],
    category: 'programming',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Abstraction (Абстракция)',
      },
      {
        name: 'Encapsulation (Инкапсуляция)',
      },
      {
        name: 'Inheritance (Наследование)',
      },
      {
        name: 'Polymorphism (Полиморфизм)',
      }
    ]
  },
  {
    id: 78,
    name: 'Паттерны проектирования',
    answer: 'assets/content/rus/answers/78-Patterny-proektirovaniya.md',
    tags: [
      'Patterns',
      'best-practice'
    ],
    category: 'programming',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Паттерны проектирования - что это и для чего нужны?',
      }
    ]
  },
  {
    id: 79,
    name: 'Декораторы функций. Что это такое и для чего?',
    answer: 'assets/content/rus/answers/79-Dekoratory-funktsij-Chto-eto-takoe-i-dlya-chego.md',
    tags: [
      'JavaScript',
      'Patterns',
      'best-practice'
    ],
    category: 'programming',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Декоратор',
      }
    ]
  },
  {
    id: 80,
    name: 'Принципы SOLID. Что это такое и зачем?',
    answer: 'assets/content/rus/answers/80-Printsipy-SOLID-Chto-eto-takoe-i-zachem.md',
    tags: [
      'programming',
      'best-practice',
      'ООП'
    ],
    category: 'programming',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Принципы SOLID - это',
      },
      {
        name: 'Single Responsibility Principle (Принцип единой ответственности)',
      },
      {
        name: 'Open-Closed Principle (Принцип открытости/закрытости)',
      },
      {
        name: 'Liskov Substitution Principle (Принцип подстановки Барбары Лисков)',
      },
      {
        name: 'Interface Segregation Principle (Принцип разделения интерфейса)',
      },
      {
        name: 'Dependency Inversion Principle (Принцип инверсии зависимостей)',
      }
    ]
  },
  {
    id: 81,
    name: 'Протокол HTTP. Что это такое и с чем его едят?',
    answer: 'assets/content/rus/answers/81-Protokol-HTTP-Chto-eto-takoe-i-s-chem-ego-edyat.md',
    tags: [
      'protocol',
      'internet'
    ],
    category: 'Markup',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Теги HTML',
      }
    ]
  },
  {
    id: 82,
    name: 'Специальные селекторы Angular. Псевдоклассы :host, :host-context и псевдоэлемент ::ng-deep',
    answer: 'assets/content/rus/answers/82-Spetsialnye-selektory-Angular-Psevdoklassy-host-host-context-i-psevdoelement-ng-deep.md',
    tags: [
      'Angular',
      'html',
      'markup'
    ],
    category: 'Angular',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Теги HTML',
      }
    ]
  },
  {
    id: 83,
    name: 'SQL. Основные команды',
    answer: 'assets/content/rus/answers/83-SQL-Osnovnye-komandy.md',
    tags: [
      'СУБД (системы управления базами данных)',
      'databases',
      'SQL'
    ],
    category: 'Databases',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'SELECT, FROM',
      },
      {
        name: 'SELECT DISTINCT',
      },
      {
        name: 'WHERE',
      },
      {
        name: 'GROUP BY',
      },
      {
        name: 'HAVING',
      },
      {
        name: 'ORDER BY',
      },
      {
        name: 'JOIN и его варианты',
      }
    ]
  },
  {
    id: 84,
    name: 'Формат JSON, метод toJSON',
    answer: 'assets/content/rus/answers/84-Format-JSON-metod-toJSON.md',
    tags: [
      'JSON',
      'Data Structures'
    ],
    category: 'Databases',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'JSON - что это и для чего нужно',
      },
      {
        name: 'Метод toJSON',
      }
    ]
  },
  {
    id: 85,
    name: 'Аутентификация и авторизация. В чем разница?',
    answer: 'assets/content/rus/answers/85-Autentifikatsiya-i-avtorizatsiya-V-chem-raznitsa.md',
    tags: [
      'security',
      'authentication',
      'authorization'
    ],
    category: 'General',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Аутентификация',
      },
      {
        name: 'Авторизация',
      }
    ]
  },
  {
    id: 86,
    name: 'Основные методы сортировки. В чем их различия и какой лучше использовать в разных случаях?',
    answer: 'assets/content/rus/answers/86-Metody-sortirovki.md',
    tags: [
      'algorithm',
      'sorting',
      'Big O'
    ],
    category: 'Algorithms',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Пузырьковая сортировка (Bubble Sort)',
      },
      {
        name: 'Сортировка вставками (Insertion Sort)',
      },
      {
        name: 'Сортировка выбором (Selection Sort)',
      },
      {
        name: 'Сортировка слиянием (Merge Sort)',
      },
      {
        name: 'Быстрая сортировка (Quick Sort)',
      }
    ]
  },
  {
    id: 87,
    name: 'Метод оценки сложности алгоритма. O(1), O(n), O(log n) и т.д. Что это и зачем нужно',
    answer: 'assets/content/rus/answers/87-Metod-otsenki-slozhnosti-algoritma.md',
    tags: [
      'algorithm',
      'complexity',
      'Big O'
    ],
    category: 'Algorithms',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'O(1)',
      },
      {
        name: 'O(n)',
      },
      {
        name: 'O(log n)',
      }
    ]
  },
  {
    id: 88,
    name: 'Деревья, графы, перевернутые деревья',
    answer: 'assets/content/rus/answers/88-Derevya-grafy-perevernutye-derevya.md',
    tags: [
      'data structures',
      'trees',
      'graphs'
    ],
    category: 'General',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Деревья',
      },
      {
        name: 'Перевернутые деревья',
      },
      {
        name: 'Бинарные деревья',
      },
      {
        name: 'Графы',
      }
    ]
  },
  {
    id: 89,
    name: 'Shadow DOM. Инкапсуляция стилей',
    answer: 'assets/content/rus/answers/89-Shadow-DOM-Inkapsulyatsiya-stilej.md',
    tags: [
      'web development',
      'shadow DOM'
    ],
    category: 'Markup',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Shadow DOM - что это такое',
      },
      {
        name: 'Проблема, которую решает Shadow DOM',
      },
      {
        name: 'Ключевые особенности Shadow DOM',
      }
    ]
  },
  {
    id: 90,
    name: 'Virtual DOM. Оптимизация на уровне фреймворка',
    answer: 'assets/content/rus/answers/90-Virtual-DOM-Optimizatsiya-na-urovne-frejmvorka.md',
    tags: [
      'web development',
      'virtual DOM',
      'Vue',
      'React'
    ],
    category: 'Markup',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Virtual DOM - что это такое',
      },
      {
        name: 'Проблема, которую решает Virtual DOM',
      },
      {
        name: 'Как работает Virtual DOM',
      }
    ]
  },
  {
    id: 91,
    name: 'RxJS и асинхронность',
    answer: 'assets/content/rus/answers/91-RxJS-i-asinhronnost.md',
    tags: [
      'rxjs',
      'asynchronous',
      'reactive programming'
    ],
    category: 'Angular',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Что такое RxJS',
      },
      {
        name: 'Для чего нужен RxJS?',
      },
      {
        name: 'Базовые сущности RxJS: Observable, Observer, Subscription, Subject',
      },
      {
        name: 'Популярные операторы',
      }
    ]
  },
  {
    id: 92,
    name: 'State management в Angular. NgRx',
    answer: 'assets/content/rus/answers/92-State-management-v-Angular-NgRx.md',
    tags: [
      'angular',
      'state management',
      'reactive programming'
    ],
    category: 'Angular',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'State management в Angular. NgRx, что это такое',
      },
      {
        name: 'Store, Actions, Reducers, Selectors',
      },
      {
        name: 'Effects (Побочные эффекты и асинхронность)',
      }
    ]
  },
  {
    id: 93,
    name: 'Signals in Angular. В чем фундаментальная разница между Signals и RxJS, и почему команда Angular решила внедрить этот паттерн?',
    answer: 'assets/content/rus/answers/93-Signals-in-Angular-V-chem-fundamentalnaya-raznitsa-mezhdu-Signals-i-RxJS-i-pochemu-komanda-Angular-reshila-vnedrit-etot-pattern.md',
    tags: [
      'Angular',
      'Signals',
      'Reactive Programming'
    ],
    category: 'Angular',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Signals в Angular, что это такое',
      },
      {
        name: 'Фундаментальная разница между Signals и RxJS',
      }
    ]
  },
  {
    id: 94,
    name: 'Как работают computed и effect?',
    answer: 'assets/content/rus/answers/94-Kak-rabotayut-computed-i-effect.md',
    tags: [
      'Angular',
      'Signals',
      'Reactive Programming'
    ],
    category: 'Angular',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Computed',
      },
      {
        name: 'Effect',
      },
      {
        name: 'Когда использовать Effect, а когда это антипаттерн',
      }
    ]
  },
  {
    id: 95,
    name: 'Signal-based API: input(), output() и model()',
    answer: 'assets/content/rus/answers/95-Signal-based-API-input-output-i-model.md',
    tags: [
      'Angular',
      'Signals',
      'Reactive Programming'
    ],
    category: 'Angular',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'input(), output() и model() - что это',
      }
    ]
  },
  {
    id: 96,
    name: 'Standalone Components: Почему отказались от NgModules?',
    answer: 'assets/content/rus/answers/96-Standalone-Components-Pochemu-otkazalis-ot-NgModules.md',
    tags: [
      'Angular',
      'Standalone',
      'Architecture'
    ],
    category: 'Angular',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Концепция Standalone',
      },
      {
        name: 'Почему отказались от NgModules',
      }
    ]
  },
  {
    id: 97,
    name: 'Функция inject() против Constructor DI',
    answer: 'assets/content/rus/answers/97-Funktsiya-inject-protiv-Constructor-DI.md',
    tags: [
      'Angular',
      'Standalone',
      'Architecture',
      'Dependency Injection'
    ],
    category: 'Angular',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Функция inject()',
      },
      {
        name: 'Преимущества inject() по сравнению с Constructor DI',
      },
      {
        name: 'Где МОЖНО использовать inject()',
      },
      {
        name: 'Где НЕЛЬЗЯ использовать inject()',
      }
    ]
  },
  {
    id: 98,
    name: 'Новый Control Flow (@if, @for) против Structural Directives (*ngIf, *ngFor)',
    answer: 'assets/content/rus/answers/98-Novyj-Control-Flow-if-for-protiv-Structural-Directives-ngIf-ngFor.md',
    tags: [
      'Angular',
      'Syntax'
    ],
    category: 'Angular',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Новый Control Flow',
      },
      {
        name: 'Преимущества нового Control Flow',
      }
    ]
  },
  {
    id: 99,
    name: 'Стратегии Change Detection (Default vs OnPush vs Zoneless)',
    answer: 'assets/content/rus/answers/99-Strategii-Change-Detection-Default-vs-OnPush-vs-Zoneless.md',
    tags: [
      'Angular',
      'Change Detection'
    ],
    category: 'Angular',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'ChangeDetectionStrategy.Default',
      },
      {
        name: 'ChangeDetectionStrategy.OnPush',
      },
      {
        name: 'Zoneless (Современный Angular / Signals)',
      }
    ]
  },
  {
    id: 100,
    name: 'Deferrable Views (@defer): Как работает этот механизм? Какие встроенные триггеры (on viewport, on interaction, on idle) существуют для ленивой загрузки кусков шаблона?',
    answer: 'assets/content/rus/answers/100-Deferrable-Views-defer-Kak-rabotaet-etot-mehanizm-Kakie-vstroennye-triggery-on-viewport-on-interaction-on-idle-sushchestvuyut-dlya-lenivoj-zagruzki-kuskov-shablona.md',
    tags: [
      'Angular',
      'Performance'
    ],
    category: 'Angular',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Deferrable Views',
      }
    ]
  },
  {
    id: 101,
    name: 'Functional Guards - что это и почему классовые Guards были объявлены deprecated?',
    answer: 'assets/content/rus/answers/101-Functional-Guards---chto-eto-i-pochemu-klassovye-Guards-byli-obyavleny-deprecated.md',
    tags: [
      'angular',
      'routing',
      'guards'
    ],
    category: 'Angular',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Functional Guards',
      }
    ]
  },
  {
    id: 102,
    name: 'Functional Interceptors: Как настроить перехватчики HTTP-запросов (Interceptors) в Standalone-приложении без использования модулей и HTTP_INTERCEPTORS?',
    answer: 'assets/content/rus/answers/102-Functional-Interceptors-Kak-nastroit-perehvatchiki-HTTP-zaprosov-Interceptors-v-Standalone-prilozhenii-bez-ispolzovaniya-modulej-i-HTTP_INTERCEPTORS.md',
    tags: [
      'angular',
      'routing',
      'interceptors'
    ],
    category: 'Angular',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Functional Interceptors',
      }
    ]
  },
  {
    id: 103,
    name: 'Lifecycle Angular (Жизненный цикл компонента). Современный подход',
    answer: 'assets/content/rus/answers/103-Lifecycle-Angular-Zhiznennyj-tsikl-komponenta-Sovremennyj-podhod.md',
    tags: [
      'Angular',
      'Lifecycle',
      'Hooks'
    ],
    category: 'Angular',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Lifecycle Hooks (Классические)',
      },
      {
        name: 'Современный подход',
      }
    ]
  },
  {
    id: 104,
    name: 'Object.defineProperty - что это и для чего нужно? (+ применение в Angular.js и Vue 2)',
    answer: 'assets/content/rus/answers/104-Object-defineProperty-chto-eto-i-dlya-chego-nuzhno.md',
    tags: [
      'JavaScript',
      'Angular.js',
      'Vue 2'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Object.defineProperty - что это и для чего нужно?',
      },
      {
        name: 'Общие дескрипторы свойств: configurable, enumerable',
      },
      {
        name: 'Дескрипторы данных: writable, value',
      },
      {
        name: 'Дескрипторы доступа: get, set',
      },
      {
        name: 'Применения в Vue и других фреймворках - (только Vue 2, в Vue 3 уже Proxy)',
      }
    ]
  },
  {
    id: 105,
    name: 'Суть реактивности в Angular.js, Angular 2+, Vue 2 и Vue 3. В чем фундаментальная разница между подходами к реактивности?',
    answer: 'assets/content/rus/answers/105-Sut-reaktivnosti-v-Angular-Vue.md',
    tags: [
      'Angular',
      'Vue',
      'Reactivity'
    ],
    category: '',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Реактивность в Vue 2',
      },
      {
        name: 'Реактивность в Vue 3',
      },
      {
        name: 'Реактивность в Angular.js',
      },
      {
        name: 'Реактивность в Angular 2+',
      }
    ]
  },
  {
    id: 106,
    name: 'Abstract Classes (Абстрактные классы) в TypeScript. Когда использовать абстрактные классы вместо интерфейсов?',
    answer: 'assets/content/rus/answers/106-Abstract-Classes-v-TypeScript.md',
    tags: [
      'TypeScript',
      'OOP',
      'Abstract Classes'
    ],
    category: QuestionCategories.typescript,
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Abstract Classes (Абстрактные классы)',
      },
      {
        name: 'Когда использовать абстрактные классы вместо интерфейсов',
      },
      {
        name: 'Можно ли использовать абстрактные классы для реализации множественного наследования?',
      },
      {
        name: 'Можно ли комбинировать абстрактные классы и интерфейсы?',
      }
    ]
  },
  {
    id: 107,
    name: 'Access Modifiers (Public, Private, Protected) + Static в TypeScript. Когда использовать каждый из этих модификаторов доступа?',
    answer: 'assets/content/rus/answers/107-Protected-vs-Private-vs-Public-v-TypeScript.md',
    tags: [
      'TypeScript',
      'OOP',
      'Access Modifiers'
    ],
    category: QuestionCategories.typescript,
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Protected (Модификатор доступа)',
      },
      {
        name: 'Private (Модификатор доступа)',
      },
      {
        name: 'Public (Модификатор доступа)',
      },
      {
        name: 'Когда использовать каждый из этих модификаторов доступа',
      },
      {
        name: 'Static (Статические свойства и методы). В чем их особенности и когда использовать',
      }
    ]
  },
  {
    id: 108,
    name: 'Console API. Какие методы консоли ты используешь в своей работе и для чего?',
    answer: 'assets/content/rus/answers/108-Console-API.md',
    tags: [
      'JavaScript',
      'Debugging',
      'Console'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Console API (API консоли)',
      },
    ]
  },
  {
    id: 109,
    name: 'Чистая функция (Pure Function) и её преимущества. Примеры чистых и нечистых функций в JavaScript',
    answer: 'assets/content/rus/answers/109-Pure-Function.md',
    tags: [
      'JavaScript',
      'Functional Programming',
      'Pure Functions'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Pure Functions (Чистые функции) - что это и в чем их преимущества',
      },
    ]
  },
  {
    id: 110,
    name: 'Функция высшего порядка (Higher-Order Function) в JavaScript. Примеры и применение',
    answer: 'assets/content/rus/answers/110-Higher-Order-Function.md',
    tags: [
      'JavaScript',
      'Functional Programming',
      'Higher-Order Functions'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Higher-Order Functions (Функции высшего порядка) - что это и в чем их преимущества',
      },
    ]
  },
  {
    id: 111,
    name: 'В чем разница между Higher-order операторами в RxJS: mergeMap, switchMap, concatMap и exhaustMap?',
    answer: 'assets/content/rus/answers/111-RxJS-Higher-order-Operators.md',
    tags: [
      'Angular',
      'RxJS',
      'Operators'
    ],
    category: 'Angular',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'mergeMap',
      },
      {
        name: 'switchMap',
      },
      {
        name: 'concatMap',
      },
      {
        name: 'exhaustMap',
      }
    ]
  },
  {
    id: 112,
    name: 'В чем разница между комбинирующими операторами RxJS: combineLatest, forkJoin, withLatestFrom, concat, merge, zip и race?',
    answer: 'assets/content/rus/answers/112-RxJS-Combination-Operators.md',
    tags: [
      'Angular',
      'RxJS',
      'Operators'
    ],
    category: 'Angular',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'combineLatest',
      },
      {
        name: 'forkJoin',
      },
      {
        name: 'withLatestFrom',
      },
      {
        name: 'concat',
      },
      {
        name: 'merge',
      },
      {
        name: 'zip',
      },
      {
        name: 'race',
      }
    ]
  },
  {
    id: 113,
    name: 'В чем разница между операторами создания RxJS: of, from, fromEvent, interval и timer?',
    answer: 'assets/content/rus/answers/113-RxJS-Creation-Operators.md',
    tags: [
      'Angular',
      'RxJS',
      'Operators'
    ],
    category: 'Angular',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'of',
      },
      {
        name: 'from',
      },
      {
        name: 'fromEvent',
      },
      {
        name: 'interval',
      },
      {
        name: 'timer',
      }
    ]
  },
  {
    id: 114,
    name: 'В чем разница между операторами фильтрации RxJS: filter, take, takeUntil, skip и distinctUntilChanged?',
    answer: 'assets/content/rus/answers/114-RxJS-Filtering-Operators.md',
    tags: [
      'Angular',
      'RxJS',
      'Operators'
    ],
    category: 'Angular',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'filter',
      },
      {
        name: 'take',
      },
      {
        name: 'takeUntil',
      },
      {
        name: 'skip',
      },
      {
        name: 'distinctUntilChanged',
      }
    ]
  },
  {
    id: 115,
    name: 'В чем разница между операторами утилитами RxJS: tap, finalize, delay, timeout и retry?',
    answer: 'assets/content/rus/answers/115-RxJS-Utility-Operators.md',
    tags: [
      'Angular',
      'RxJS',
      'Operators'
    ],
    category: 'Angular',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'tap',

      },
      {
        name: 'finalize',
      },
      {
        name: 'delay',
      },
      {
        name: 'timeout',
      },
      {
        name: 'retry',
      }
    ]
  },
  {
    id: 116,
    name: 'В чем разница между операторами трансформации RxJS: map, mapTo, pluck и scan?',
    answer: 'assets/content/rus/answers/116-RxJS-Transformation-Operators.md',
    tags: [
      'Angular',
      'RxJS',
      'Operators'
    ],
    category: 'Angular',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'map',
      },
      {
        name: 'mapTo',
      },
      {
        name: 'pluck',
      },
      {
        name: 'scan',
      }
    ]
  },
  {
    id: 117,
    name: 'Element Injector (или NodeInjector) в Angular. Что это такое и для чего нужно? Приоритет токенов на одном элементе',
    answer: 'assets/content/rus/answers/117-Element-Injector-v-Angular-Chto-eto-takoe-i-dlya-chego-nuzhno.md',
    tags: [
      'Angular',
      'Dependency Injection'
    ],
    category: 'Angular',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Element Injector (или NodeInjector) - что это такое',
      },
      {
        name: 'Как работает Element Injector в Angular',
      },
      {
        name: 'Зачем нужен Element Injector и какие проблемы он решает',
      }
    ]
  },
  {
    id: 118,
    name: 'Иерархия DI и паттерн Shadowing (Затенение провайдеров)',
    answer: 'assets/content/rus/answers/118-DI-Hierarchy-and-Shadowing-Pattern.md',
    tags: [
      'Angular',
      'Dependency Injection'
    ],
    category: 'Angular',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Иерархия DI в Angular',
      },
      {
        name: 'Паттерн Shadowing (Затенение провайдеров)',
      }
    ]
  },
  {
    id: 119,
    name: 'Провайдеры в Angular. Типы провайдеров и их применение',
    answer: 'assets/content/rus/answers/119-Providers-in-Angular-Types-of-Providers-and-Their-Usage.md',
    tags: [
      'Angular',
      'Dependency Injection'
    ],
    category: 'Angular',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Провайдеры в Angular - что это такое',
      },
      {
        name: 'Типы провайдеров в Angular (Class Provider, Factory Provider, Value Provider, Existing Provider)',
      },
      {
        name: 'Когда использовать каждый тип провайдера',
      }
    ]
  },
  {
    id: 120,
    name: 'Сервисы в Angular. Что это такое и для чего нужны? Жизненный цикл сервисов',
    answer: 'assets/content/rus/answers/120-Services-in-Angular-What-are-they-and-what-are-they-for.md',
    tags: [
      'Angular',
      'Services',
      'Dependency Injection'
    ],
    category: 'Angular',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Сервисы в Angular - что это такое',
      },
      {
        name: 'Для чего нужны сервисы в Angular',
      },
      {
        name: 'Жизненный цикл сервисов в Angular',
      }
    ]
  },
  {
    id: 121,
    name: 'Паттерн Singleton (Одиночка) в Angular. Являются ли сервисы в Angular синглтонами по умолчанию?',
    answer: 'assets/content/rus/answers/121-Singleton-Pattern-in-Angular-Are-Angular-Services-Singletons-by-Default.md',
    tags: [
      'Angular',
      'Singleton',
      'Dependency Injection'
    ],
    category: 'Angular',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Паттерн Singleton (Одиночка) - что это такое',
      },
      {
        name: 'Являются ли сервисы в Angular синглтонами по умолчанию?',
      }
    ]
  },
  {
    id: 122,
    name: 'Виды директив: Structural vs Attribute. В чем разница между структурными и атрибутными директивами в Angular? Приведи примеры.',
    answer: 'assets/content/rus/answers/122-Directives-in-Angular-Structural-vs-Attribute.md',
    tags: [
      'Angular',
      'Directives'
    ],
    category: 'Angular',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Структурные директивы в Angular',
      },
      {
        name: 'Атрибутные директивы в Angular',
      }
    ]
  },
  {
    id: 123,
    name: 'Pipes: Pure vs Impure. Что такое чистые и нечистые пайпы? Почему использование функций в шаблоне(например {{ getLabel(item) }}) — это плохая практика, и как пайпы помогают это решить?',
    answer: 'assets/content/rus/answers/123-Pipes-Pure-vs-Impure.md',
    tags: [
      'Angular',
      'Pipes'
    ],
    category: 'Angular',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Чистые пайпы в Angular',
      },
      {
        name: 'Нечистые пайпы в Angular',
      },
    ]
  },
  {
    id: 124,
    name: 'ViewChild / ContentChild. В чем разница между @ViewChild и @ContentChild? Когда какой декоратор применять?',
    answer: 'assets/content/rus/answers/124-ViewChild-ContentChild.md',
    tags: [
      'Angular',
      'ViewChild',
      'ContentChild'
    ],
    category: 'Angular',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'ViewChild в Angular',
      },
      {
        name: 'ContentChild в Angular',
      },
      {
        name: 'Когда использовать @ViewChild, а когда @ContentChild',
      }
    ]
  },
  {
    id: 125,
    name: 'Proxy и Reflect. В чем разница между ними? Как они работают и почему современные фреймворки (Vue 3, MobX) перешли на них?',
    answer: 'assets/content/rus/answers/125-Proxy-Reflect.md',
    tags: [
      'JavaScript',
      'Proxy',
      'Reflect'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Proxy в JavaScript',
      },
      {
        name: 'Reflect в JavaScript',
      },
      {
        name: 'Когда использовать Proxy, а когда Reflect',
      },
      {
        name: 'Использование в современных фреймворках',
      }
    ]
  },
  {
    id: 126,
    name: 'Утечки памяти (Memory Leaks). Какие бывают частые причины утечек памяти в JS и как их избежать?',
    answer: 'assets/content/rus/answers/126-Memory-Leaks.md',
    tags: [
      'JavaScript',
      'Memory Leaks'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Что такое утечки памяти в контексте веб-приложений и почему это важно',
      },
      {
        name: 'Частые причины утечек памяти в JavaScript',
      },
      {
        name: 'Как избежать утечек памяти в JavaScript',
      },
      {
        name: 'Инструменты для обнаружения и устранения утечек памяти',
      }
    ]
  },
  {
    id: 127,
    name: 'Web Workers / Service Workers. JS однопоточный, но как тогда выполнять тяжелые вычисления не блокируя UI?',
    answer: 'assets/content/rus/answers/127-Web-Workers-Service-Workers.md',
    tags: [
      'JavaScript',
      'Web Workers',
      'Service Workers'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Что такое Web Workers и Service Workers в контексте веб-приложений',
      },
      {
        name: 'Когда использовать Web Workers, а когда Service Workers',
      },
      {
        name: 'Примеры использования Web Workers и Service Workers',
      },
      {
        name: 'Инструменты для работы с Web Workers и Service Workers',
      }
    ]
  },
  {
    id: 128,
    name: 'В чем ключевые отличия Composition API от Options API, и какие фундаментальные проблемы он решает?',
    answer: 'assets/content/rus/answers/128-Composition-API-Options-API.md',
    tags: [
      'Vue.js',
      'Vue 3',
      'Composition API',
      'Options API'
    ],
    category: 'Vue.js',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Что такое Composition API и Options API в Vue.js',
      },
      {
        name: 'Ключевые отличия Composition API от Options API',
      },
      {
        name: 'Какие фундаментальные проблемы решает Composition API',
      }
    ]
  },
  {
    id: 129,
    name: 'Что такое setup()? Синтаксический сахар <script setup>+ Макросы: defineProps и defineEmits',
    answer: 'assets/content/rus/answers/129-Script-Setup.md',
    tags: [
      'Vue.js',
      'Vue 3',
      'Script Setup'
    ],
    category: 'Vue.js',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Что такое setup() и для чего он нужен в Vue.js',
      },
      {
        name: 'Что такое <script setup> в Vue.js',
      },
      {
        name: 'Ключевые отличия <script setup> от стандартной функции setup()',
      },
      {
        name: 'Какие преимущества дает использование <script setup>',
      }
    ]
  },
  {
    id: 130,
    name: 'Два брата реактивности: ref vs reactive',
    answer: 'assets/content/rus/answers/130-Ref-vs-Reactive.md',
    tags: [
      'Vue.js',
      'Vue 3',
      'Reactivity'
    ],
    category: 'Vue.js',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Что такое ref и reactive в Vue.js',
      },
      {
        name: 'Ключевые отличия ref от reactive',
      }
    ]
  },
  {
    id: 131,
    name: 'toValue vs toRaw. В чем разница между этими функциями и когда какую использовать?',
    answer: 'assets/content/rus/answers/131-ToValue-vs-ToRaw.md',
    tags: [
      'Vue.js',
      'Vue 3',
      'Reactivity'
    ],
    category: 'Vue.js',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Что такое toValue и toRaw в Vue.js',
      },
      {
        name: 'Ключевые отличия toValue от toRaw',
      }
    ]
  },
  {
    id: 132,
    name: 'Автоматическая слежка: watch vs watchEffect',
    answer: 'assets/content/rus/answers/132-Watch-vs-WatchEffect.md',
    tags: [
      'Vue.js',
      'Vue 3',
      'Reactivity'
    ],
    category: 'Vue.js',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Что такое watch и watchEffect в Vue.js',
      },
      {
        name: 'Ключевые отличия watch от watchEffect',
      }
    ]
  },
  {
    id: 133,
    name: 'Вычисляемые свойства: computed',
    answer: 'assets/content/rus/answers/133-Computed.md',
    tags: [
      'Vue.js',
      'Vue 3',
      'Reactivity'
    ],
    category: 'Vue.js',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Что такое computed в Vue.js',
      },
      {
        name: 'Когда использовать computed, а когда это антипаттерн',
      }
    ]
  },
  {
    id: 134,
    name: 'Способы передачи данных между компонентами во Vue? provide / inject, props / emit и глобальное состояние (например, Pinia)',
    answer: 'assets/content/rus/answers/147-DataTransfer.md',
    tags: [
      'Vue.js',
      'Vue 3',
      'Data Transfer'
    ],
    category: 'Vue.js',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Какие способы передачи данных между компонентами во Vue.js существуют',
      },
      {
        name: 'Когда использовать props / emit',
      },
      {
        name: 'Когда использовать provide / inject, а когда это антипаттерн',
      },
      {
        name: 'Когда использовать глобальное состояние (например, Pinia), а когда лучше обойтись без него',
      }
    ]
  },
  {
    id: 135,
    name: 'Slots: Разница между обычными слотами, слотами с именами и динамическими слотами',
    answer: 'assets/content/rus/answers/135-Slots.md',
    tags: [
      'Vue.js',
      'Vue 3',
      'Slots'
    ],
    category: 'Vue.js',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Что такое слоты в Vue.js',
      },
      {
        name: 'Разница между обычными слотами, слотами с именами и динамическими слотами',
      }
    ]
  },
  {
    id: 136,
    name: 'Teleport: Что такое Teleport в Vue.js и для чего он нужен? В чем преимущества использования Teleport?',
    answer: 'assets/content/rus/answers/136-Teleport.md',
    tags: [
      'Vue.js',
      'Vue 3',
      'Teleport'
    ],
    category: 'Vue.js',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Что такое Teleport в Vue.js',
      },
      {
        name: 'Когда использовать Teleport, а когда это антипаттерн',
      }
    ]
  },
  {
    id: 137,
    name: 'Как изменилась система реактивности во Vue 3? В чем разница под капотом?',
    answer: 'assets/content/rus/answers/137-Reactivity.md',
    tags: [
      'Vue.js',
      'Vue 3',
      'Reactivity'
    ],
    category: 'Vue.js',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Как работает реактивность в Vue 3',
      },
      {
        name: 'В чем разница под капотом между реактивностью в Vue 2 и Vue 3',
      },
      {
        name: 'За счет чего рендеринг во Vue 3 стал значительно быстрее? Оптимизации компилятора (Patch Flags, Static Hoisting)',
      }
    ]
  },
  {
    id: 138,
    name: 'Что такое Фрагменты (Fragments) во Vue 3, и как они влияют на структуру шаблонов?',
    answer: 'assets/content/rus/answers/138-Fragments.md',
    tags: [
      'Vue.js',
      'Vue 3',
      'Fragments'
    ],
    category: 'Vue.js',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Что такое Фрагменты (Fragments) во Vue 3',
      },
      {
        name: 'Как Фрагменты влияют на структуру шаблонов',
      }
    ]
  },
  {
    id: 139,
    name: 'Custom Directives. Как изменилось создание кастомных директив?',
    answer: 'assets/content/rus/answers/139-CustomDirectives.md',
    tags: [
      'Vue.js',
      'Vue 3',
      'Custom Directives'
    ],
    category: 'Vue.js',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Что такое кастомные директивы (Custom Directives) во Vue 3',
      },
      {
        name: 'Как кастомные директивы влияют на структуру шаблонов',
      }
    ]
  },
  {
    id: 140,
    name: 'Pinia. Почему экосистема перешла на Pinia? В чем преимущества по сравнению с Vuex и другими?',
    answer: 'assets/content/rus/answers/140-Pinia.md',
    tags: [
      'Vue.js',
      'Vue 3',
      'Pinia'
    ],
    category: 'Vue.js',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Почему экосистема перешла на Pinia',
      },
      {
        name: 'В чем преимущества Pinia по сравнению с Vuex и другими',
      }
    ]
  },
  {
    id: 141,
    name: 'Хуки жизненного цикла в Vue 3',
    answer: 'assets/content/rus/answers/141-LifecycleHooks.md',
    tags: [
      'Vue.js',
      'Vue 3',
      'Lifecycle Hooks'
    ],
    category: 'Vue.js',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Как изменились хуки жизненного цикла в Vue 3',
      },
      {
        name: 'Куда пропали created и beforeCreate',
      }
    ]
  },
  {
    id: 142,
    name: 'Что такое Composable? Для чего они нужны?',
    answer: 'assets/content/rus/answers/142-Composable.md',
    tags: [
      'Vue.js',
      'Vue 3',
      'Composable'
    ],
    category: 'Vue.js',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Что такое Composable в Vue.js',
      },
      {
        name: 'Отличие Composable от обычных методов из сервиса',
      },
      {
        name: 'Какие преимущества дает использование Composable',
      },
      {
        name: 'Ключевые отличия Composable от mixins и HOCs',
      },
    ]
  },
  {
    id: 143,
    name: 'Встроенный компонент <Suspense>. Как работает и какие проблемы он решает?',
    answer: 'assets/content/rus/answers/143-Suspense.md',
    tags: [
      'Vue.js',
      'Vue 3',
      'Suspense'
    ],
    category: 'Vue.js',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Как работает встроенный компонент <Suspense>',
      },
      {
        name: 'Какие проблемы решает <Suspense>',
      }
    ]
  },
  {
    id: 144,
    name: 'Когда и зачем следует использовать shallowRef и shallowReactive вместо обычных?',
    answer: 'assets/content/rus/answers/144-ShallowRef.md',
    tags: [
      'Vue.js',
      'Vue 3',
      'ShallowRef'
    ],
    category: 'Vue.js',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Когда и зачем следует использовать shallowRef и shallowReactive',
      },
      {
        name: 'В чем преимущества использования shallowRef и shallowReactive',
      }
    ]
  },
  {
    id: 145,
    name: 'Что такое defineModel и как он упрощает двустороннюю привязку данных?',
    answer: 'assets/content/rus/answers/145-DefineModel.md',
    tags: [
      'Vue.js',
      'Vue 3',
      'DefineModel'
    ],
    category: 'Vue.js',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Что такое defineModel и как он упрощает двустороннюю привязку данных',
      },
      {
        name: 'В чем преимущества использования defineModel',
      }
    ]
  },
  {
    id: 146,
    name: 'В чем разница между toRef и toRefs, и в каких случаях их применяют?',
    answer: 'assets/content/rus/answers/146-ToRefToRefs.md',
    tags: [
      'Vue.js',
      'Vue 3',
      'ToRef',
      'ToRefs'
    ],
    category: 'Vue.js',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Что такое toRef и toRefs',
      },
      {
        name: 'В чем преимущества использования toRef и toRefs',
      }
    ]
  },
  {
    id: 147,
    name: 'Что такое Vue Router? Какие важные функции предоставляем маршрутизатор? Какие хуки навигации есть у vue-router?',
    answer: 'assets/content/rus/answers/147-VueRouter.md',
    tags: [
      'Vue.js',
      'Vue 3',
      'Vue Router'
    ],
    category: 'Vue.js',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Что такое Vue Router',
      }
    ]
  },
  {
    id: 148,
    name: 'HTTP/HTTPS: методы, заголовки, кеширование и безопасность',
    answer: 'assets/content/rus/answers/148-HTTPHTTPS.md',
    tags: [
      'Web Security',
      'HTTP',
      'HTTPS',
      'cross-site',
      'Same-Origin Policy'
    ],
    category: 'Web Security',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'HTTP/HTTPS: методы, заголовки, кеширование и безопасность',
      }
    ]
  },
  {
    id: 149,
    name: 'Same-Origin Policy и CORS. Как браузеры обеспечивают безопасность при обмене данными между разными источниками?',
    answer: 'assets/content/rus/answers/149-SameOriginPolicyCORS.md',
    tags: [
      'Web Security',
      'CORS',
      'cross-site',
      'Same-Origin Policy'
    ],
    category: 'Web Security',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Same-Origin Policy и CORS',
      }
    ]
  },
  {
    id: 150,
    name: 'Cookies. Что такое cookies и для чего они нужны?',
    answer: 'assets/content/rus/answers/150-CookiesSecurity.md',
    tags: [
      'Web Security',
      'cookies',
    ],
    category: 'Web Security',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Что такое cookies и для чего они нужны?',
      },
      {
        name: 'Какие атрибуты cookies помогают обеспечить безопасность (Secure, HttpOnly, SameSite)',
      }
    ]
  },
  {
    id: 151,
    name: 'Как браузеры обеспечивают безопасность cookies при обмене данными между разными источниками?',
    answer: 'assets/content/rus/answers/151-CookiesSecurity.md',
    tags: [
      'Web Security',
      'cookies',
      'cross-site',
      'Same-Origin Policy'
    ],
    category: 'Web Security',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Как браузеры обеспечивают безопасность cookies при обмене данными между разными источниками?',
      },
      {
        name: 'Какие атрибуты cookies помогают обеспечить безопасность (Secure, HttpOnly, SameSite)',
      }
    ]
  },
  {
    id: 152,
    name: 'XSS (Cross-Site Scripting). Что такое XSS-атаки и как защититься от них?',
    answer: 'assets/content/rus/answers/152-XSS.md',
    tags: [
      'Web Security',
      'XSS',
      'cross-site'
    ],
    category: 'Web Security',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Что такое XSS-атаки и как они работают',
      },
      {
        name: 'Как защититься от XSS-атак',
      }
    ]
  },
  {
    id: 153,
    name: 'CSRF (Cross-Site Request Forgery). Что такое CSRF-атаки и как защититься от них?',
    answer: 'assets/content/rus/answers/153-CSRF.md',
    tags: [
      'Web Security',
      'CSRF',
      'cross-site'
    ],
    category: 'Web Security',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Что такое CSRF-атаки и как они работают',
      },
      {
        name: 'Как защититься от CSRF-атак',
      }
    ]
  },
  {
    id: 154,
    name: 'SQL Injection. Что такое SQL-инъекции и как защититься от них?',
    answer: 'assets/content/rus/answers/154-SQL-Injection.md',
    tags: [
      'Web Security',
      'SQL Injection'
    ],
    category: 'Web Security',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Что такое SQL-инъекции и как защититься от них?',
      }
    ]
  },
  {
    id: 155,
    name: 'SSL/TLS. Что такое SSL/TLS и как они обеспечивают безопасность данных при передаче по сети?',
    answer: 'assets/content/rus/answers/155-SSLTLS.md',
    tags: [
      'Web Security',
      'SSL',
      'TLS'
    ],
    category: 'Web Security',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Что такое SSL/TLS и как они обеспечивают безопасность данных при передаче по сети?',
      }
    ]
  },
  {
    id: 156,
    name: 'OAuth 2.0. Что такое OAuth 2.0 и как он обеспечивает безопасную авторизацию в веб-приложениях?',
    answer: 'assets/content/rus/answers/156-OAuth2.md',
    tags: [
      'Web Security',
      'OAuth 2.0',
      'authorization'
    ],
    category: 'Web Security',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Что такое OAuth 2.0',
      }
    ]
  },
  {
    id: 157,
    name: 'JWT (JSON Web Tokens). Что такое JWT и как он используется для аутентификации и передачи информации между клиентом и сервером?',
    answer: 'assets/content/rus/answers/157-JWT.md',
    tags: [
      'Web Security',
      'JWT',
      'authentication'
    ],
    category: 'Web Security',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Что такое JWT и как он используется для аутентификации и передачи информации между клиентом и сервером?',
      }
    ]
  },
  {
    id: 158,
    name: 'Reflow и Repaint. Почему работа с DOM считается очень ресурсоемкой?',
    answer: 'assets/content/rus/answers/158-Pochemu-rabota-s-DOM-schitaetsya-ochen-resursoemkoj.md',
    tags: [
      'DOM',
      'performance',
      'web development'
    ],
    category: 'Markup',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'DOM — это Web API, а не часть JavaScript',
      },
      {
        name: 'DOM — это сложная иерархическая структура данных',
      },
      {
        name: 'Reflow и Repaint',
      }
    ]
  },
  {
    id: 159,
    name: 'Ecmascript language types VS Ecmascript specification types',
    answer: 'assets/content/rus/answers/159-EcmascriptTypes.md',
    tags: [
      'JavaScript',
      'Ecmascript',
      'types'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Что такое типы языка Ecmascript?',
      },
      {
        name: 'Что такое типы спецификации Ecmascript?',
      },
      {
        name: 'В чем разница между типами языка и типами спецификации Ecmascript?',
      }
    ]
  },
  {
    id: 160,
    name: 'IntersectionObserver API. Отслеживание видимости элементов на странице и оптимизация производительности',
    answer: 'assets/content/rus/answers/160-IntersectionObserver.md',
    tags: [
      'JavaScript',
      'IntersectionObserver',
      'Web APIs'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Что такое IntersectionObserver API и для чего он нужен?',
      },
      {
        name: 'Как использовать IntersectionObserver API для оптимизации производительности веб-приложений?',
      },
      {
        name: 'На смену каким устаревшим техникам пришел IntersectionObserver API?',
      }
    ]
  },
  {
    id: 161,
    name: 'MutationObserver API. Что это такое и для чего нужно?',
    answer: 'assets/content/rus/answers/161-MutationObserver.md',
    tags: [
      'JavaScript',
      'MutationObserver',
      'Web APIs'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Что такое MutationObserver API и для чего он нужен?',
      },
      {
        name: 'Как использовать MutationObserver API для отслеживания изменений в DOM?',
      },
      {
        name: 'На смену каким устаревшим техникам пришел MutationObserver API?',
      }
    ]
  },
  {
    id: 162,
    name: 'ResizeObserver API. Что это такое и для чего нужно?',
    answer: 'assets/content/rus/answers/162-ResizeObserver.md',
    tags: [
      'JavaScript',
      'ResizeObserver',
      'Web APIs'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Что такое ResizeObserver API и для чего он нужен?',
      },
      {
        name: 'Как использовать ResizeObserver API для отслеживания изменений размера элементов в DOM?',
      },
      {
        name: 'На смену каким устаревшим техникам пришел ResizeObserver API?',
      }
    ]
  },
  {
    id: 163,
    name: 'Performance API. Что это такое и для чего нужно?',
    answer: 'assets/content/rus/answers/163-PerformanceAPI.md',
    tags: [
      'JavaScript',
      'Performance API',
      'Web APIs'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Что такое Performance API и для чего он нужен?',
      },
    ]
  },
  {
    id: 164,
    name: 'Web Animations API. Что это такое и для чего нужно?',
    answer: 'assets/content/rus/answers/164-WebAnimationsAPI.md',
    tags: [
      'JavaScript',
      'Web Animations API',
      'Web APIs'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Что такое Web Animations API и для чего он нужен?',
      },
      {
        name: 'Как использовать Web Animations API для создания анимаций в веб-приложениях?',
      },
      {
        name: 'На смену каким устаревшим техникам пришел Web Animations API?',
      }
    ]
  },
  {
    id: 165,
    name: 'Web Speech API. Что это такое и для чего нужно?',
    answer: 'assets/content/rus/answers/165-WebSpeechAPI.md',
    tags: [
      'JavaScript',
      'Web Speech API',
      'Web APIs'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Что такое Web Speech API и для чего он нужен?',
      },
      {
        name: 'Как использовать Web Speech API для распознавания речи и синтеза речи в веб-приложениях?',
      },
      {
        name: 'Какие есть аналогичные API для работы с голосом',
      }
    ]
  },
  {
    id: 166,
    name: 'Web Bluetooth API. Что это такое и для чего нужно?',
    answer: 'assets/content/rus/answers/166-WebBluetoothAPI.md',
    tags: [
      'JavaScript',
      'Web Bluetooth API',
      'Web APIs'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Что такое Web Bluetooth API и для чего он нужен?',
      },
      {
        name: 'Как использовать Web Bluetooth API для взаимодействия с Bluetooth-устройствами в веб-приложениях?',
      }
    ]
  },
  {
    id: 167,
    name: 'requestAnimationFrame. Что это такое и для чего нужно?',
    answer: 'assets/content/rus/answers/167-requestAnimationFrame.md',
    tags: [
      'JavaScript',
      'requestAnimationFrame',
      'Web APIs'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Что такое requestAnimationFrame и для чего он нужен?',
      },
      {
        name: 'Как использовать requestAnimationFrame для оптимизации анимаций в веб-приложениях?',
      }
    ]
  },
  {
    id: 168,
    name: 'requestIdleCallback. Что это такое и для чего нужно?',
    answer: 'assets/content/rus/answers/168-requestIdleCallback.md',
    tags: [
      'JavaScript',
      'requestIdleCallback',
      'Web APIs'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Что такое requestIdleCallback и для чего он нужен?',
      },
      {
        name: 'Как использовать requestIdleCallback для оптимизации выполнения задач в веб-приложениях?',
      }
    ]
  },
  {
    id: 169,
    name: 'queueMicrotask. Для чего нужен и как работает?',
    answer: 'assets/content/rus/answers/169-queueMicrotask.md',
    tags: [
      'JavaScript',
      'queueMicrotask',
      'Web APIs'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Что такое queueMicrotask и для чего он нужен?',
      },
    ]
  },
  {
    id: 170,
    name: 'Скрытые классы (Hidden Classes) и Inline Caching. Как движки JavaScript оптимизируют выполнение кода?',
    answer: 'assets/content/rus/answers/170-HiddenClasses.md',
    tags: [
      'JavaScript',
      'Hidden Classes',
      'Inline Caching',
      'Performance',
      'V8',
      'Optimization'
    ],
    category: 'JavaScript',
    level: QuestionLevels.senior,
    structure: [
      {
        name: 'Что такое скрытые классы (Hidden Classes) и как они помогают оптимизировать выполнение кода в JavaScript?',
      },
      {
        name: 'Что такое Inline Caching и как оно улучшает производительность JavaScript?',
      }
    ]
  },
  {
    id: 171,
    name: 'Композитные слои (Composite Layers) и GPU. Как браузеры используют GPU для рендеринга веб-страниц?',
    answer: 'assets/content/rus/answers/171-CompositeLayers.md',
    tags: [
      'JavaScript',
      'Composite Layers',
      'GPU',
      'Performance',
      'Rendering'
    ],
    category: 'JavaScript',
    level: QuestionLevels.senior,
    structure: [
      {
        name: 'Что такое композитные слои (Composite Layers) и как они помогают оптимизировать рендеринг веб-страниц?',
      },
      {
        name: 'Как браузеры используют GPU для рендеринга веб-страниц и какие преимущества это дает?',
      }
    ]
  }
] as Question[];
