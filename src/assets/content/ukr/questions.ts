import { QuestionCategories, QuestionLevels } from 'src/app/enums/questions.enum';
import { Question } from 'src/app/models/question.model';

export const questions = [
  {
    id: 1,
    name: 'Як браузер парсить сторінку?',
    answer: 'assets/content/ukr/answers/1-Jak-brauzer-parsit-storinku.md',
    tags: [
      'markup',
      'CSS',
      'browser'
    ],
    category: 'Markup',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Критичний шлях рендерингу',
      },
      {
        name: 'Як браузер будує DOM, CSSOM та Render Tree',
      },
      {
        name: 'Як браузер виконує JavaScript і як це впливає на рендеринг',
      },
      {
        name: 'Що таке Layout / Reflow',
      },
      {
        name: 'Що таке Repaint',
      },
      {
        name: 'Composite (композитинг)',
      },
      {
        name: 'Події DOMContentLoaded та Load - у чому різниця?',
      }
    ]
  },
  {
    id: 2,
    name: 'Як оптимізувати рендеринг сторінки',
    answer: 'assets/content/ukr/answers/2-Jak-optimizuvaty-rendering-storinky.md',
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
        name: 'Оптимізація DOM (HTML)',
      },
      {
        name: 'Оптимізація CSSOM (CSS)',
      },
      {
        name: 'Оптимізація JavaScript',
      },
      {
        name: 'Оптимізація медіа та шрифтів (Ресурси)',
      },
      {
        name: 'Мережеві оптимізації та доставка контенту',
      },
      {
        name: 'Профілювання та метрики',
      }
    ]
  },
  {
    id: 3,
    name: 'Що таке <DOCTYPE>. Навіщо він потрібен?',
    answer: 'assets/content/ukr/answers/3-Sho-take-DOCTYPE-Navishcho-vin-potriben.md',
    tags: [
      'HTML',
      'markup'
    ],
    category: 'Markup',
    level: QuestionLevels.junior,
    structure: [
      {
        name: 'Що таке цей тег DOCTYPE',
      },
      {
        name: 'Навіщо потрібен DOCTYPE',
      },
      {
        name: 'Розповісти про те, що є різні види DOCTYPE',
      },
      {
        name: 'Чи можна взагалі обійтися без DOCTYPE?',
      },
      {
        name: 'Зараз практично завжди варто використовувати DOCTYPE HTML5',
      }
    ]
  },
  {
    id: 4,
    name: 'Теги HTML5. Семантика. Доступність.',
    answer: 'assets/content/ukr/answers/4-Tegi-HTML5-Semantika-Dostupnost.md',
    tags: [
      'HTML',
      'markup'
    ],
    category: 'Markup',
    level: QuestionLevels.junior,
    structure: [
      {
        name: 'Що таке семантична верстка і навіщо вона потрібна',
      },
      {
        name: 'Основні семантичні теги HTML',
      },
      {
        name: 'Як розмітити сторінку з точки зору семантики',
      }
    ]
  },
  {
    id: 5,
    name: 'Які є способи підключити CSS на сторінку?',
    answer: 'assets/content/ukr/answers/5-Jaki-ye-sposoby-pidklyuchyty-CSS-na-storinku.md',
    tags: [
      'HTML',
      'markup',
      'CSS'
    ],
    category: 'Markup',
    level: QuestionLevels.junior,
    structure: [
      {
        name: 'Підключення CSS через зовнішній файл стилів тегом link',
      },
      {
        name: 'Додавання CSS за допомогою тега style',
      },
      {
        name: 'Імпорт CSS через команду @import',
      },
      {
        name: 'Inline-стилі CSS',
      },
      {
        name: 'Стилі CSS через JavaScript',
      }
    ]
  },
  {
    id: 6,
    name: 'Як браузер парсить CSS і будує стилі під капотом? Токенізація, парсинг (Right-to-Left)',
    answer: 'assets/content/ukr/answers/6-Jak-brauzer-parsyt-CSS.md',
    tags: [
      'css',
      'markup',
      'browser'
    ],
    category: 'Markup',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Токенізація CSS: як браузер розбиває код на токени',
      },
      {
        name: 'Архітектура парсингу CSS у браузері',
      },
      {
        name: 'Right-to-Left парсинг і його переваги',
      },
      {
        name: 'Як парсинг CSS впливає на рендеринг сторінки',
      },
      {
        name: 'Помилки в CSS і як браузер їх обробляє',
      },
      {
        name: 'Оптимізація парсингу CSS в сучасних браузерах',
      },
      {
        name: 'Блокування рендеру та етапи Layout, Paint, Composite',
      }
    ]
  },
  {
    id: 7,
    name: 'Пріоритет стилів у CSS: як працює Каскадність і як рахується "вага" селекторів.',
    answer: 'assets/content/ukr/answers/7-Prioritet-stiley-v-CSS.md',
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
        name: 'Каскадність у CSS: як браузер визначає, які стилі застосовувати',
      },
      {
        name: '!important',
      },
      {
        name: 'Inline-стилі',
      },
      {
        name: 'ID',
      },
      {
        name: 'Класи, Атрибути, Псевдокласи',
      },
      {
        name: 'Теги, Псевдоелементи',
      },
      {
        name: 'Нульова вага',
      }
    ]
  },
  {
    id: 8,
    name: 'Висока специфічність селектора, чи є у неї якісь недоліки? + !important',
    answer: 'assets/content/ukr/answers/8-Vysoka-spetsifichnist-selektora-chi-ye-u-ne-ya-kaki-nedoliky.md',
    tags: [
      'markup',
      'CSS'
    ],
    category: 'Markup',
    level: QuestionLevels.junior,
    structure: [
      {
        name: 'Недоліки високої специфічності',
      },
      {
        name: '!important - коли варто використовувати і які проблеми може викликати',
      },
      {
        name: 'Best practices для управління специфічністю і пріоритетом стилів',
      }
    ]
  },
  {
    id: 9,
    name: 'У чому різниця між CSS-комбінаторами >, + і ~ ?',
    answer: 'assets/content/ukr/answers/9-Selektory-+-~.md',
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
    name: 'Псевдокласи елементів (псевдокласи стану, структурні псевдокласи та просунуті селектори Modern CSS), Псевдокласи форм',
    answer: 'assets/content/ukr/answers/10-Psevdoklasy-elementiv.md',
    tags: [
      'HTML',
      'markup',
      'CSS'
    ],
    category: 'Markup',
    level: QuestionLevels.junior,
    structure: [
      {
        name: 'Псевдокласи стану (Інтерактив)',

      },
      {
        name: 'Структурні псевдокласи',
      },
      {
        name: 'Просунуті селектори (Modern CSS)',
      },
      {
        name: 'Псевдокласи форм',
      }
    ]
  },
  {
    id: 11,
    name: 'Псевдоелементи (генерований контент, текстові, інтерфейсні, просунуті). Як вони працюють і для чого потрібні?',
    answer: 'assets/content/ukr/answers/11-Psevdoelementy.md',
    tags: [
      'HTML',
      'markup',
      'CSS'
    ],
    category: 'Markup',
    level: QuestionLevels.junior,
    structure: [
      {
        name: 'Що таке псевдоелементи?',
      },
      {
        name: 'Генерований контент (::before і ::after)',
      },
      {
        name: 'Текстові (::first-letter і ::first-line)',
      },
      {
        name: 'Інтерфейсні (::placeholder, ::selection, ::marker)',
      },
      {
        name: 'Просунуті (::backdrop, ::file-selector-button)',
      }
    ]
  },
  {
    id: 12,
    name: 'Resource Hints (preload, prefetch, preconnect): У чому різниця між ними на рівні мережевого стеку браузера?',
    answer: 'assets/content/ukr/answers/12-Resource-Hints.md',
    tags: [
      'HTML',
      'markup',
      'browser',
    ],
    category: 'Markup',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Що таке Resource Hints і навіщо вони потрібні?',
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
        name: 'Як браузер обробляє ці Resource Hints на рівні мережевого стеку',
      },
      {
        name: 'Як неправильне використання preload може зашкодити First Contentful Paint (FCP) і заблокувати основний потік?',
      }
    ]
  },
  {
    id: 13,
    name: 'Позиціонування елементів (absolute, fixed, relative etc.)',
    answer: 'assets/content/ukr/answers/13-Pozitsionuvannya-elementiv-absolute-fixed-relative.md',
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
    name: 'Типи елементів (рядкові, блочні і т.д.). Їх відмінності',
    answer: 'assets/content/ukr/answers/14-Typy-elementiv-riadkovi-blochnyi-i-td-Ih-vidminnosti.md',
    tags: [
      'HTML',
      'markup',
      'CSS'
    ],
    category: 'Markup',
    level: QuestionLevels.junior,
    structure: [
      {
        name: 'Блочні елементи',
      },
      {
        name: 'Рядкові елементи',
      },
    ]
  },
  {
    id: 15,
    name: 'Центрування (горизонтальне, вертикальне)',
    answer: 'assets/content/ukr/answers/15-Tsentruvannya-gorizontalne-vertikalne.md',
    tags: [
      'HTML',
      'markup',
      'CSS'
    ],
    category: 'Markup',
    level: QuestionLevels.junior,
    structure: [
      {
        name: 'Горизонтальне центрування',
      },
      {
        name: 'Вертикальне центрування',
      }
    ]
  },
  {
    id: 16,
    name: 'Бокcова модель (Box Model) і box-sizing',
    answer: 'assets/content/ukr/answers/16-Boksova-modelBox-Model-i-box-sizing.md',
    tags: [
      'HTML',
      'markup',
      'CSS'
    ],
    category: 'Markup',
    level: QuestionLevels.junior,
    structure: [
      {
        name: 'Бокcова модель (Box Model)',
      },
      {
        name: 'box-sizing: content-box і box-sizing: border-box',
      }
    ]
  },
  {
    id: 17,
    name: 'Flexbox VS Grid',
    answer: 'assets/content/ukr/answers/17-Flexbox-VS-Grid.md',
    tags: [
      'HTML',
      'markup',
      'CSS'
    ],
    category: 'Markup',
    level: QuestionLevels.junior,
    structure: [
      {
        name: 'Що таке Flexbox',
      },
      {
        name: 'Що таке Grid',
      },
      {
        name: 'Основні відмінності між Flexbox і Grid',
      },
    ]
  },
  {
    id: 18,
    name: 'CSS анімації',
    answer: 'assets/content/ukr/answers/18-CSS-animatsii.md',
    tags: [
      'markup',
      'CSS',
      'animations'
    ],
    category: 'Markup',
    level: QuestionLevels.junior,
    structure: [
      {
        name: 'Що таке CSS анімації?',
      },
      {
        name: 'Основні властивості для створення анімацій',
      },
      {
        name: 'Переваги та недоліки CSS анімацій',
      }
    ]
  },
  {
    id: 19,
    name: 'Відносна розмірність у CSS: управління контекстом та питання доступності (a11y)',
    answer: 'assets/content/ukr/answers/19-Vidnosna-rozmirnist-u-CSS-i-a11y.md',
    tags: [
      'markup',
      'CSS',
      'a11y'
    ],
    category: 'Markup',
    level: QuestionLevels.junior,
    structure: [
      {
        name: 'Відносні одиниці вимірювання (em, rem, %, vw, vh) та їх переваги',
      },
      {
        name: 'Як відносні одиниці допомагають в адаптивній верстці',
      },
      {
        name: 'Вплив відносних одиниць на доступність (a11y) та зручність використання',
      },
      {
        name: 'Архітектура адаптивних величин: контекст обчислення, наслідування та масштабованість',
      }
    ]
  },
  {
    id: 20,
    name: 'Движки браузера. Які існують сучасні движки і в чому їх відмінності?',
    answer: 'assets/content/ukr/answers/20-Dvizhki-brauzera.md',
    tags: [
      'JavaScript',
      'JS mechanics',
      'browser'
    ],
    category: 'JavaScript',
    level: QuestionLevels.junior,
    structure: [
      {
        name: 'Що таке движок браузера і його роль у роботі веб-сторінок',
      },
      {
        name: 'Сучасні движки браузера: V8 (Chrome, Edge), SpiderMonkey (Firefox), JavaScriptCore (Safari)',
      },
      {
        name: 'Основні відмінності між движками та їх оптимізації',
      },
      {
        name: 'Як вибір движка впливає на продуктивність і сумісність веб-додатків',
      },
      {
        name: 'Як можна класифікувати браузери за типом використання движка/рушія (Створювачі движків, кастомний UI, Системні обгортки)',
      }
    ]
  },
  {
    id: 21,
    name: 'Парсинг і компіляція JS: як движок читає та оптимізує код',
    answer: 'assets/content/ukr/answers/21-Kak-dvizhki-JS-parsyat-i-optimiziruyut-kod.md',
    tags: [
      'JavaScript',
      'JS mechanics',
      'browser'
    ],
    category: QuestionCategories.javascript,
    level: QuestionLevels.senior,
    structure: [
      {
        name: 'Сучасні JS-движки використовують гібридний підхід: інтерпретація і JIT-компіляція',
      },
      {
        name: 'Парсинг JavaScript і побудова AST',
      },
      {
        name: 'Інтерпретація',
      },
      {
        name: 'JIT-компіляція',
      },
      {
        name: 'Оптимізація (Turbofan) і Деоптимізація (Bailout)',
      },
      {
        name: 'Як писати код, який буде добре оптимізуватися движком',
      }
    ]
  },
  {
    id: 22,
    name: 'Способи підключення JS на сторінку. Яку роль відіграє порядок підключення ресурсів (у head і в кінці body).',
    answer: 'assets/content/ukr/answers/22-Sposoby-pidklyuchennya-JS-na-storinku.md',
    tags: [
      'HTML',
      'markup',
      'JavaScript'
    ],
    category: 'Markup',
    level: QuestionLevels.junior,
    structure: [
      {
        name: '3 способи підключення JS на сторінку',
      }
    ]
  },
  {
    id: 23,
    name: 'У чому різниця між атрибутами async і defer у тега <script>?',
    answer: 'assets/content/ukr/answers/23-Atributy-defer-i-async-u-tega-script.md',
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
        name: 'Без атрибутів',
      }
    ]
  },
  {
    id: 24,
    name: 'Робота з SVG. Які існують способи анімації SVG?',
    answer: 'assets/content/ukr/answers/24-SVG-Animatsii-svg.md',
    tags: [
      'SVG',
      'markup',
      'animations'
    ],
    category: 'Markup',
    level: QuestionLevels.junior,
    structure: [
      {
        name: 'Що таке SVG?',
      },
      {
        name: 'Ключові особливості SVG',
      },
      {
        name: 'Способи анімації SVG: CSS анімації, SMIL, JavaScript',
      }
    ]
  },
  {
    id: 25,
    name: 'Що таке HTML5 Canvas і для яких задач він застосовується?',
    answer: 'assets/content/ukr/answers/25-Canvas-Chto-eto-i-zachem-nuzhen.md',
    tags: [
      'HTML',
      'markup',
      'CSS'
    ],
    category: 'Markup',
    level: QuestionLevels.junior,
    structure: [
      {
        name: 'Canvas - що це?',
      },
      {
        name: 'Навіщо потрібен Canvas?',
      },
      {
        name: 'Основні сфери застосування',
      },
      {
        name: 'Переваги і недоліки Canvas',
      },
      {
        name: 'У яких випадках для рендерингу краще обрати Canvas, а не DOM або SVG?',
      }
    ]
  },
  {
    id: 26,
    name: 'CSS Variables під капотом: наслідування, область видимості і динамічна темізація через CSS Custom Properties',
    answer: 'assets/content/ukr/answers/26-Custom-properties.md',
    tags: [
      'markup',
      'CSS',
      'CSS Variables'
    ],
    category: 'Markup',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'CSS Custom Properties - що це?',
      },
      {
        name: 'Підтримка в браузерах і коли з\'явилися',
      },
      {
        name: 'Головні відмінності від змінних SASS/LESS',
      },
      {
        name: 'Наслідування і область видимості CSS Custom Properties',
      },
      {
        name: 'Динамічна темізація через CSS Custom Properties',
      }
    ]
  },
  {
    id: 27,
    name: 'Продуктивність анімацій і Критичний шлях рендерингу',
    answer: 'assets/content/ukr/answers/27-Prodyktivnist-animatsiy-i-Krytychniy-shlyah-renderynhu.md',
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
        name: 'Критичний шлях рендерингу (Critical Rendering Path) і його вплив на продуктивність анімацій',
      },
      {
        name: 'Які CSS-властивості викликають Layout, Paint і Composite',
      },
    ]
  },
  {
    id: 28,
    name: 'Пре- и пост- процесори CSS. Досвід роботи з ними. Актуальність',
    answer: 'assets/content/ukr/answers/28-Pre--i-post--protsesory-CSS--dosvid-roboty-z-nymy.md',
    tags: [
      'markup',
      'CSS'
    ],
    category: 'Markup',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Пре- и пост- процесори CSS - що це?',
      },
      {
        name: 'Актуальність у 2025-2026 роках',
      }
    ]
  },
  {
    id: 29,
    name: 'Методологія БЕМ. Основні позиції, які проблеми вирішує?',
    answer: 'assets/content/ukr/answers/29-Metodologiya-BEM-Osnovni-pozitsii-yaki-problemy-virishuye.md',
    tags: [
      'HTML',
      'markup',
      'CSS'
    ],
    category: 'Markup',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Методологія БЕМ - що це?',
      },
      {
        name: 'Основні позиції методології БЕМ',
      },
      {
        name: 'Які проблеми вирішує БЕМ',
      }
    ]
  },
  {
    id: 30,
    name: 'HTML-шаблонизатори/препроцесори (handlebars, mustache, pug etc)',
    answer: 'assets/content/ukr/answers/30-HTML-shablonizatorypreprotsesory-handlebars-mustache-pug-etc.md',
    tags: [
      'HTML',
      'markup'
    ],
    category: 'Markup',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'HTML-шаблонизатори/препроцесори - що це?',
      },
      {
        name: 'Приклади популярних інструментів',
      },
      {
        name: 'У чому різниця між шаблонізатором і препроцесором?',
      },
      {
        name: 'Актуальні вони сьогодні?',
      }
    ]
  },
  {
    id: 31,
    name: 'Які типи вузлів є в DOM, чим вони відрізняються і для чого потрібні?',
    answer: 'assets/content/ukr/answers/31-Yaki-typy-vuzliv-ye-v-DOM.md',
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
        name: 'Які типи вузлів є в DOM?',
      },
      {
        name: 'Чим вони відрізняються?',
      },
      {
        name: 'Для чого потрібні різні типи вузлів?',
      }
    ]
  },
  {
    id: 32,
    name: 'Типи даних в JavaScript. typeof і його особливості',
    answer: 'assets/content/ukr/answers/32-Typy-danyh-zadachi-stroka-+-chislo.md',
    tags: [
      'JavaScript',
      'Data types'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: '7 примітивних типів даних',
      },
      {
        name: '1 непримітивний тип даних',
      },
      {
        name: 'typeof і його особливості',
      }
    ]
  },
  {
    id: 33,
    name: 'Преобразування (приведення) типів в JavaScript',
    answer: 'assets/content/ukr/answers/33-Preobrazuvannya-privedennya-tipiv-v-JavaScript.md',
    tags: [
      'JavaScript',
      'Data types'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Три основних типи перетворення',
      }
    ]
  },
  {
    id: 34,
    name: 'Let, const і var. Різниці + Hoisting',
    answer: 'assets/content/ukr/answers/34-Let-const-i-var-Riznytsi-+-Hoisting-.md',
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
        name: 'Let, const і var - різниці',
      },
      {
        name: 'Hoisting (вспливання або підняття)',
      },
      {
        name: 'Як Hoisting працює з var, let і const',
      },
      {
        name: 'Temporal Dead Zone (TDZ) для let і const',
      }
    ]
  },
  {
    id: 35,
    name: 'Функції: function declaration, function expression',
    answer: 'assets/content/ukr/answers/35-Funktsii-function-declaration-function-expression.md',
    tags: [
      'JavaScript',
      'JS mechanics',
      'functions'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Function Declaration (Оголошення функції)',
      },
      {
        name: 'Function Expression (Функціональний вираз)',
      },
      {
        name: 'Механіка парсингу на рівні движка: як движок обробляє ці конструкції',
      },
      {
        name: 'Коли варто використовувати Function Declaration, а коли Function Expression',
      }
    ]
  },
  {
    id: 36,
    name: 'Структури даних (масив, об\'єкт, set, map)',
    answer: 'assets/content/ukr/answers/36-Struktury-danyh-masyv-obekt-set-map.md',
    tags: [
      'JavaScript',
      'Data types',
      'Structures'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Масив (Array)',
      },
      {
        name: 'Об\'єкт (Object)',
      },
      {
        name: 'Map (Карта)',
      },
      {
        name: 'Set (Множина)',
      },
      {
        name: 'WeakMap і WeakSet',
      }
    ]
  },
  {
    id: 37,
    name: 'Основні методи масивів, які ви використовуєте',
    answer: 'assets/content/ukr/answers/37-Osnovni-metody-masyviv-yaki-vy-vykorystovujete.md',
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
        name: 'pop/push і shift/unshift, їх різниці',
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
        name: 'indexOf/lastIndexOf і includes, їх різниці',
      },
      {
        name: 'find і findIndex, їх різниці',
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
        name: 'split і join',
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
    name: 'Ітератори та генератори',
    answer: 'assets/content/ukr/answers/38-Iteratory-ta-generatory.md',
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
        name: 'Ітератори: Механіка під капотом',
      },
      {
        name: 'Генератори',
      },
      {
        name: 'Навіщо це потрібно на практиці?',
      }
    ]
  },
  {
    id: 39,
    name: 'Область видимості (Scope, Lexical Environment)',
    answer: 'assets/content/ukr/answers/39-Oblast-vydymosti-Scope-Lexical-Environment.md',
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
        name: 'Види областей видимості: глобальна, функціональна, блочна',
      },
      {
        name: 'Життєвий цикл змінної',
      }
    ]
  },
  {
    id: 40,
    name: 'Замикання (Closure)',
    answer: 'assets/content/ukr/answers/40-Closure.md',
    tags: [
      'JavaScript',
      'JS mechanics'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Замикання - що це і для чого потрібно',
      },
      {
        name: '[[Environment]]',
      },
      {
        name: 'Використання замикань для створення приватних змінних',
      }
    ]
  },
  {
    id: 41,
    name: 'Збірка сміття (Garbage Collector). Що це таке і для чого потрібно?',
    answer: 'assets/content/ukr/answers/41-Zbirka-smittya-Garbage-Collector-Sho-tse-take-i-dlya-chogo-potribno.md',
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
    name: 'Рекурсія. Що це таке і для чого потрібно?',
    answer: 'assets/content/ukr/answers/42-Rekursiya-Sho-tse-take-i-dlya-chogo-potribno.md',
    tags: [
      'JavaScript',
      'JS mechanics'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Рекурсія - що це і для чого потрібно',
      },
      {
        name: 'Плюси і мінуси рекурсії',
      }
    ]
  },
  {
    id: 43,
    name: 'Ключове слово this. Контекст',
    answer: 'assets/content/ukr/answers/43-Klyuchove-slovo-this-Kontekst.md',
    tags: [
      'JavaScript',
      'JS mechanics',
      'context'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Глобальний контекст і звичайний виклик функції',
      },
      {
        name: 'Виклик як метод об\'єкта',
      },
      {
        name: 'Стрілочні функції (Arrow Functions)',
      }
    ]
  },
  {
    id: 44,
    name: 'Прив\'язка контекста (явна, неявна). Bind, call, apply і їх різниці',
    answer: 'assets/content/ukr/answers/44-Privyazka-konteksta-yavna-neyavna-Bind-call-apply-i-ih-riznitsi.md',
    tags: [
      'JavaScript',
      'JS mechanics',
      'context'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Неявна прив\'язка (Implicit Binding)',
      },
      {
        name: 'Явна прив\'язка (Explicit Binding)',
      },
      {
        name: 'Методи call, apply і bind і їх різниця',
      }
    ]
  },
  {
    id: 45,
    name: 'Каррування (Currying)',
    answer: 'assets/content/ukr/answers/45-Karruvannya-Currying.md',
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
        name: 'Каррування - що це і для чого потрібно',
      },
      {
        name: 'Реалізація каррування',
      },
      {
        name: 'Навіщо це потрібно на практиці?',
      }
    ]
  },
  {
    id: 46,
    name: 'Часткове застосування (Partial Application)',
    answer: 'assets/content/ukr/answers/46-Chastkove-zastosuvannya-Partial-Application.md',
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
        name: 'Часткове застосування (основано на карруванні)',
      },
      {
        name: 'Реалізація часткового застосування',
      }
    ]
  },
  {
    id: 47,
    name: 'Псевдомасив arguments (чому він псевдомасив?)',
    answer: 'assets/content/ukr/answers/47-Psevdomasiv-arguments-chomu-vin-psevdomasiv.md',
    tags: [
      'JavaScript',
      'JS mechanics',
      'functions'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Псевдомасив arguments',
      },
      {
        name: 'Чому він псевдомасив?',
      },
      {
        name: 'Arguments VS Arrow Functions',
      },
      {
        name: 'Сучасні альтернативи',
      }
    ]
  },
  {
    id: 48,
    name: 'Директива "use strict"',
    answer: 'assets/content/ukr/answers/48-Direktiva-use-strict.md',
    tags: [
      'JavaScript',
      'JS mechanics'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Директива "use strict" - що це і для чого потрібно',
      },
      {
        name: 'Головні зміни при включенні строгого режиму',
      },
      {
        name: 'Як включити строгий режим?',
      }
    ]
  },
  {
    id: 49,
    name: 'Перетворення об\'єктів: toString і valueOf',
    answer: 'assets/content/ukr/answers/49-Peretvorennya-obektiv-toString-i-valueOf.md',
    tags: [
      'JavaScript',
      'JS mechanics'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Перетворення об\'єктів: toString і valueOf',
      },
      {
        name: 'Як движок вирішує, який метод викликати першим',
      }
    ]
  },
  {
    id: 50,
    name: 'Цикл подій (Event loop), microtasks, event queue',
    answer: 'assets/content/ukr/answers/50-Tsikl-podiy-Event-loop-microtasks-event-queue.md',
    tags: [
      'JavaScript',
      'Browser mechanics'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Навіщо потрібен Event Loop',
      },
      {
        name: 'Основні сутності: Call Stack, Heap, Web APIs, Microtasks і Macrotasks',
      }
    ]
  },
  {
    id: 51,
    name: 'Наслідування в JavaScript',
    answer: 'assets/content/ukr/answers/51-Nasliduvannya-v-JavaScript.md',
    tags: [
      'JavaScript',
      'JS mechanics'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Наслідування в JavaScript',
      },
      {
        name: 'Прототипне наслідування та ланцюжок прототипів',
      }
    ]
  },
  {
    id: 52,
    name: 'Посилання __proto__. Що це і з чим його їдять?',
    answer: 'assets/content/ukr/answers/52-Ssylka-__proto__-shcho-tse-i-z-chym-yoho-yidyat.md',
    tags: [
      'JavaScript',
      'JS mechanics'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: '__proto__ - що це?',
      }
    ]
  },
  {
    id: 53,
    name: 'Властивість F.prototype і створення об\'єктів через new',
    answer: 'assets/content/ukr/answers/53-Vlastyvist-Fprototype-i-stvorennya-obektiv-cherez-new.md',
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
    name: 'Promises. Навіщо потрібні? Яку проблему вирішували?',
    answer: 'assets/content/ukr/answers/54-Promises-Navishcho-potribni-Yaku-problemu-vyrishuvaly.md',
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
        name: 'Що таке Promise, в якій версії ES з\'явився',
      },
      {
        name: 'Яку проблему вирішували проміси',
      },
      {
        name: 'Незмінність результату після завершення проміса',
      },
      {
        name: 'then, catch, finally',
      },
      {
        name: 'Еволюція промісів та async/await',
      }
    ]
  },
  {
    id: 55,
    name: 'Promise chaining. Можна ли викликати promise.then().finally().then() або promise.catch().then()? Що отримаємо?',
    answer: 'assets/content/ukr/answers/55-Promise-chaining.md',
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
        name: 'Можна продовжити ланцюжок викликів після помилки',
      },
      {
        name: 'Можна будувати такі ланцюжки і з finally',
      }
    ]
  },
  {
    id: 56,
    name: 'Try - Catch. Що це і для чого потрібно?',
    answer: 'assets/content/ukr/answers/56-Try---Catch-shcho-tse-i-dlya-chogo-potribno.md',
    tags: [
      'JavaScript'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Try - Catch - для чого потрібно?',
      }
    ]
  },
  {
    id: 57,
    name: 'Що нового з\'явилося в мові в ES6?',
    answer: 'assets/content/ukr/answers/57-Scho-novoho-z-yavylosya-v-movi-v-ES6.md',
    tags: [
      'JavaScript',
      'ES6'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: '11 основних нововведень в ES6',
      }
    ]
  },
  {
    id: 58,
    name: 'Що нового з\'явилося в мові ПІСЛЯ ES6?',
    answer: 'assets/content/ukr/answers/58-Scho-novoho-z-yavylosya-v-movi-PISLYA-ES6.md',
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
    name: 'Async await. Яку проблему вирішують?',
    answer: 'assets/content/ukr/answers/59-Async-await-Yaku-problemu-vyrishuyut.md',
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
        name: 'Еволюція асинхронного JS в ES8',
      },
      {
        name: 'Навіщо потрібен async/await? Яку проблему вирішує?',
      },
      {
        name: 'try...catch...finally',
      },
      {
        name: 'node.js і підтримка async/await',
      }
    ]
  },
  {
    id: 60,
    name: 'Методи управління групою промісів',
    answer: 'assets/content/ukr/answers/60-Metody-upravlinnya-gruppoju-promisiv.md',
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
        name: 'Яку проблему вирішують',
      },
      {
        name: 'Promise.all() — «Все або нічого»',
      },
      {
        name: 'Promise.allSettled() — «Дочекатися всіх, незважаючи ні на що»',
      },
      {
        name: 'Promise.race() — «Хто швидше»',
      },
      {
        name: 'Promise.any() — «Хоч хтось успішний»',
      }
    ]
  },
  {
    id: 61,
    name: 'DOM - що це і навіщо? DOM події. Спливання, занурення. Делегування',
    answer: 'assets/content/ukr/answers/61-DOM---shcho-tse-i-navishcho-DOM-podiyi-Splivannya-zanurennya-Deleguvannya.md',
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
    name: 'LocalStorage VS SessionStorage. Різниця, принцип роботи',
    answer: 'assets/content/ukr/answers/62-LocalStorage-VS-SessionStorage-Riznitsya-printsip-roboty.md',
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
    answer: 'assets/content/ukr/answers/63-Code-style-Linters-Prettier.md',
    tags: [
      'programming',
      'codestyle',
      'best-practice'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Навіщо потрібні інструменти для підтримки code style?',
      },
      {
        name: 'Prettier',
      },
      {
        name: 'ESLint, TSLint і CodeLint',
      },
      {
        name: '.editorconfig',
      }
    ]
  },
  {
    id: 64,
    name: 'Мутабильність/іммутабельність (при роботі з масивами etc)',
    answer: 'assets/content/ukr/answers/64-Mutabilnist-immutabilnist-pri-roboti-z-masivami-etc.md',
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
    name: 'Реактивне програмування. RxJs і основні методи',
    answer: 'assets/content/ukr/answers/65-Reaktyvne-programuvannya-RxJs-i-osnovni-metody.md',
    tags: [
      'TypeScript',
      'RxJs'
    ],
    category: QuestionCategories.typescript,
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Реактивне програмування - що це?',
      },
      {
        name: 'RxJs - для чого потрібен?',
      },
    ]
  },
  {
    id: 66,
    name: 'Що таке об\'єкт Observable в RxJs?',
    answer: 'assets/content/ukr/answers/66-Shcho-take-obekt-Observable-v-RxJs.md',
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
        name: 'Observable - що це?',
      }
    ]
  },
  {
    id: 67,
    name: 'Що таке Subject? Які бувають види?',
    answer: 'assets/content/ukr/answers/67-Shcho-take-Subject-Yaki-buvayut-vidy.md',
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
        name: 'Subject - що це?',
      }
    ]
  },
  {
    id: 68,
    name: 'Observables VS Subject - різниця',
    answer: 'assets/content/ukr/answers/68-Observables-VS-Subject---riznitsya.md',
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
        name: 'Специфіка Subject',
      },
      {
        name: 'Відмінності поведінки та види Subject',
      },
      {
        name: 'Специфіка Observable',
      },
      {
        name: 'Observable - тільки для отримання даних, Subject - ще й для розповсюдження',
      }
    ]
  },
  {
    id: 69,
    name: 'Zone.js. Що це і для чого потрібно?',
    answer: 'assets/content/ukr/answers/69-Zonejs-Shcho-tse-i-dlya-chogo-potribno.md',
    tags: [
      'Angular',
      'Change Detection',
      'Async'
    ],
    category: 'Angular',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Zone.js - що це?',
      },
      {
        name: 'Як працює Zone.js під капотом',
      }
    ]
  },
  {
    id: 70,
    name: 'Які Utility Types (Утиліти типів) ти використовуєш на практиці?',
    answer: 'assets/content/ukr/answers/70-Yaki-Utility-Types-Utility-tipiv-ty-vykorystovuesh-na-praktytsi.md',
    tags: [
      'TypeScript',
      'Typization'
    ],
    category: QuestionCategories.typescript,
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Partial&lt;Type> (Частковий)',
      },
      {
        name: 'Required&lt;Type> (Обов\'язковий)',
      },
      {
        name: 'Pick&lt;Type, Keys> (Вибрати)',
      },
      {
        name: 'Omit&lt;Type, Keys> (Виключити)',
      },
      {
        name: 'Record&lt;Keys, Type> (Запис / Словник)',
      }
    ]
  },
  {
    id: 71,
    name: 'Що таке Type Guards і Type Assertions?',
    answer: 'assets/content/ukr/answers/71-Shcho-take-Type-Guards-i-Type-Assertions.md',
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
    name: 'Що таке Enums? Їх застосування',
    answer: 'assets/content/ukr/answers/72-Shcho-take-Enums-Ih-zastosuvannya.md',
    tags: [
      'TypeScript',
      'Typization'
    ],
    category: QuestionCategories.typescript,
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Enums (Перерахування)',
      },
      {
        name: 'Плюси Enums',
      },
      {
        name: 'Numeric Enums (Числові перерахування)',
      },
      {
        name: 'String Enums (Строкові перерахування)',
      },
      {
        name: 'Heterogeneous Enums (Гетерогенні перерахування)',
      },
      {
        name: 'Const Enums (Константні перерахування)',
      },
      {
        name: 'Під капотом: як JavaScript обробляє Enums',
      }
    ]
  },
  {
    id: 73,
    name: 'Class, Interface, Type. Різниця та застосування',
    answer: 'assets/content/ukr/answers/73-Class-Interface-Type-Riznitsya-ta-zastosuvannya.md',
    tags: [
      'TypeScript',
      'Typization'
    ],
    category: QuestionCategories.typescript,
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Class (Реалізація)',
      },
      {
        name: 'Interface (Контракт)',
      },
      {
        name: 'Type (Псевдонім)',
      }
    ]
  },
  {
    id: 74,
    name: 'Що таке Generics? Їх застосування',
    answer: 'assets/content/ukr/answers/74-Shcho-take-Generics-Ih-zastosuvannya.md',
    tags: [
      'TypeScript',
      'Typization'
    ],
    category: QuestionCategories.typescript,
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Generics (Узагальнення) - яку проблему вирішують?',
      },
      {
        name: 'Синтаксис Generics',
      },
      {
        name: 'Застосування Generics у функціях, інтерфейсах та класах',
      },
      {
        name: 'Обмеження (Constraints) у Generics',
      },
      {
        name: 'Утиліти типів на основі Generics',
      },
      {
        name: 'Множинні параметри типів',
      },
      {
        name: 'Як Generics працюють під капотом у JavaScript',
      }
    ]
  },
  {
    id: 75,
    name: 'Різниця між any, unknown і never',
    answer: 'assets/content/ukr/answers/75-Riznitsya-mizh-any-unknown-i-never.md',
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
    name: 'Коли використовувати .asObservable() в RxJs?',
    answer: 'assets/content/ukr/answers/76-Koly-vykorystovuvaty-asObservable-v-RxJs.md',
    tags: [
      'TypeScript',
      'Angular',
      'RxJs'
    ],
    category: QuestionCategories.typescript,
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'asObservable() - що це і для чого потрібно?',
      },
      {
        name: 'Правильний спосіб використання asObservable()',
      },
      {
        name: 'Антипаттерн використання asObservable()',
      }
    ]
  },
  {
    id: 77,
    name: 'Основні принципи ООП',
    answer: 'assets/content/ukr/answers/77-Osnovni-printsypy-OOP.md',
    tags: [
      'programming',
      'ООП'
    ],
    category: 'programming',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Abstraction (Абстракція)',
      },
      {
        name: 'Encapsulation (Інкапсуляція)',
      },
      {
        name: 'Inheritance (Успадкування)',
      },
      {
        name: 'Polymorphism (Поліморфізм)',
      }
    ]
  },
  {
    id: 78,
    name: 'Паттерни проектування',
    answer: 'assets/content/ukr/answers/78-Patterny-proektirovannya.md',
    tags: [
      'Patterns',
      'best-practice'
    ],
    category: 'programming',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Паттерни проектування - що це і для чого потрібні?',
      }
    ]
  },
  {
    id: 79,
    name: 'Декоратори функцій. Що це таке і для чого?',
    answer: 'assets/content/ukr/answers/79-Dekoratory-funktsij-Shcho-tse-take-i-dlya-chego.md',
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
    name: 'Принципи SOLID. Що це таке і навіщо?',
    answer: 'assets/content/ukr/answers/80-Printsypy-SOLID-Shcho-tse-take-i-navishcho.md',
    tags: [
      'programming',
      'best-practice',
      'ООП'
    ],
    category: 'programming',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Принципи SOLID - це',
      },
      {
        name: 'Single Responsibility Principle (Принцип єдиної відповідальності)',
      },
      {
        name: 'Open-Closed Principle (Принцип відкритості/закритості)',
      },
      {
        name: 'Liskov Substitution Principle (Принцип підстановки Барбари Лісков)',
      },
      {
        name: 'Interface Segregation Principle (Принцип розділення інтерфейсу)',
      },
      {
        name: 'Dependency Inversion Principle (Принцип інверсії залежностей)',
      }
    ]
  },
  {
    id: 81,
    name: 'Протокол HTTP. Що це таке і з чим його їдять?',
    answer: 'assets/content/ukr/answers/81-Protokol-HTTP-Shcho-tse-take-i-z-chym-yoho-idyat.md',
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
    name: 'Спеціальні селектори Angular. Псевдокласи :host, :host-context і псевдоелемент ::ng-deep',
    answer: 'assets/content/ukr/answers/82-Spetsialni-selektory-Angular-Psevdoklasy-host-host-context-i-psevdoelement-ng-deep.md',
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
    name: 'SQL. Основні команди',
    answer: 'assets/content/ukr/answers/83-SQL-Osnovni-komandy.md',
    tags: [
      'СУБД (системи управління базами даних)',
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
        name: 'JOIN і його варіанти',
      }
    ]
  },
  {
    id: 84,
    name: 'Формат JSON, метод toJSON',
    answer: 'assets/content/ukr/answers/84-Format-JSON-metod-toJSON.md',
    tags: [
      'JSON',
      'Data Structures'
    ],
    category: 'Databases',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'JSON - що це і для чого потрібно',
      },
      {
        name: 'Метод toJSON',
      }
    ]
  },
  {
    id: 85,
    name: 'Аутентифікація і авторизація. У чому різниця?',
    answer: 'assets/content/ukr/answers/85-Autentifikatsiya-i-avtorizatsiya-V-chem-raznitsa.md',
    tags: [
      'security',
      'authentication',
      'authorization'
    ],
    category: 'General',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Аутентифікація',
      },
      {
        name: 'Авторизація',
      }
    ]
  },
  {
    id: 86,
    name: 'Основні методи сортування. В чому їх різниця і який краще використовувати в різних випадках?',
    answer: 'assets/content/ukr/answers/86-Metody-sortuvannya.md',
    tags: [
      'algorithm',
      'sorting',
      'Big O'
    ],
    category: 'Algorithms',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Сортування бульбашкою (Bubble Sort)',
      },
      {
        name: 'Сортування вставками (Insertion Sort)',
      },
      {
        name: 'Сортування вибором (Selection Sort)',
      },
      {
        name: 'Сортування злиттям (Merge Sort)',
      },
      {
        name: 'Швидке сортування (Quick Sort)',
      }
    ]
  },
  {
    id: 87,
    name: 'Метод оцінки складності алгоритму. O(1), O(n), O(log n) і т.д. Що це і навіщо потрібно',
    answer: 'assets/content/ukr/answers/87-Metod-otsinky-skladnosti-algoritmu.md',
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
    name: 'Дерева, графи, перевернуті дерева',
    answer: 'assets/content/ukr/answers/88-Dereva-grafy-perevernutye-dereva.md',
    tags: [
      'data structures',
      'trees',
      'graphs'
    ],
    category: 'General',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Дерева',
      },
      {
        name: 'Перевернуті дерева',
      },
      {
        name: 'Бінарні дерева',
      },
      {
        name: 'Графи',
      }
    ]
  },
  {
    id: 89,
    name: 'Shadow DOM. Інкапсуляція стилів',
    answer: 'assets/content/ukr/answers/89-Shadow-DOM-Inkapsulyatsiya-stiliv.md',
    tags: [
      'web development',
      'shadow DOM'
    ],
    category: 'Markup',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Shadow DOM - що це таке',
      },
      {
        name: 'Проблема, яку вирішує Shadow DOM',
      },
      {
        name: 'Ключові особливості Shadow DOM',
      }
    ]
  },
  {
    id: 90,
    name: 'Virtual DOM. Оптимізація на рівні фреймворка',
    answer: 'assets/content/ukr/answers/90-Virtual-DOM-Optimizatsiya-na-rivni-frejmvorka.md',
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
        name: 'Virtual DOM - що це таке',
      },
      {
        name: 'Проблема, яку вирішує Virtual DOM',
      },
      {
        name: 'Як працює Virtual DOM',
      }
    ]
  },
  {
    id: 91,
    name: 'RxJS і асинхронність',
    answer: 'assets/content/ukr/answers/91-RxJS-i-asinhronnist.md',
    tags: [
      'rxjs',
      'asynchronous',
      'reactive programming'
    ],
    category: 'Angular',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Що таке RxJS',
      },
      {
        name: 'Для чого потрібен RxJS?',
      },
      {
        name: 'Базові сутності RxJS: Observable, Observer, Subscription, Subject',
      },
      {
        name: 'Популярні оператори',
      }
    ]
  },
  {
    id: 92,
    name: 'State management в Angular. NgRx',
    answer: 'assets/content/ukr/answers/92-State-management-v-Angular-NgRx.md',
    tags: [
      'angular',
      'state management',
      'reactive programming'
    ],
    category: 'Angular',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'State management в Angular. NgRx, що це таке',
      },
      {
        name: 'Store, Actions, Reducers, Selectors',
      },
      {
        name: 'Effects (Побічні ефекти та асинхронність)',
      }
    ]
  },
  {
    id: 93,
    name: 'Signals in Angular. В чому фундаментальна різниця між Signals і RxJS, і чому команда Angular вирішила впровадити цей паттерн?',
    answer: 'assets/content/ukr/answers/93-Signals-in-Angular-V-chomu-fundamentalna-riznitsya-mizhdu-Signals-i-RxJS-i-chomu-komanda-Angular-virishila-vprovaditi-tsey-pattern.md',
    tags: [
      'Angular',
      'Signals',
      'Reactive Programming'
    ],
    category: 'Angular',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Signals в Angular, що це таке',
      },
      {
        name: 'Фундаментальна різниця між Signals і RxJS',
      }
    ]
  },
  {
    id: 94,
    name: 'Як працюють computed і effect?',
    answer: 'assets/content/ukr/answers/94-Yak-pratsyuyut-computed-i-effect.md',
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
        name: 'Коли використовувати Effect, а коли це антипатерн',
      }
    ]
  },
  {
    id: 95,
    name: 'Signal-based API: input(), output() і model()',
    answer: 'assets/content/ukr/answers/95-Signal-based-API-input-output-i-model.md',
    tags: [
      'Angular',
      'Signals',
      'Reactive Programming'
    ],
    category: 'Angular',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'input(), output() і model() - що це',
      }
    ]
  },
  {
    id: 96,
    name: 'Standalone Components: Чому відмовилися від NgModules?',
    answer: 'assets/content/ukr/answers/96-Standalone-Components-Chomu-vidmovylysya-vid-NgModules.md',
    tags: [
      'Angular',
      'Standalone',
      'Architecture'
    ],
    category: 'Angular',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Концепція Standalone',
      },
      {
        name: 'Чому відмовилися від NgModules',
      }
    ]
  },
  {
    id: 97,
    name: 'Функція inject() проти Constructor DI',
    answer: 'assets/content/ukr/answers/97-Funktsiya-inject-protiv-Constructor-DI.md',
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
        name: 'Функція inject()',
      },
      {
        name: 'Переваги inject() порівняно з Constructor DI',
      },
      {
        name: 'Де МОЖНА використовувати inject()',
      },
      {
        name: 'Де НЕ МОЖНА використовувати inject()',
      }
    ]
  },
  {
    id: 98,
    name: 'Новий Control Flow (@if, @for) проти Structural Directives (*ngIf, *ngFor)',
    answer: 'assets/content/ukr/answers/98-Novyj-Control-Flow-if-for-protiv-Structural-Directives-ngIf-ngFor.md',
    tags: [
      'Angular',
      'Syntax'
    ],
    category: 'Angular',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Новий Control Flow',
      },
      {
        name: 'Переваги нового Control Flow',
      }
    ]
  },
  {
    id: 99,
    name: 'Стратегії Change Detection (Default vs OnPush vs Zoneless)',
    answer: 'assets/content/ukr/answers/99-Strategii-Change-Detection-Default-vs-OnPush-vs-Zoneless.md',
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
    name: 'Deferrable Views (@defer): Як працює цей механізм? Які вбудовані тригери (on viewport, on interaction, on idle) існують для лінивої завантаження шматків шаблону?',
    answer: 'assets/content/ukr/answers/100-Deferrable-Views-defer.md',
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
    name: 'Functional Guards - що це і чому класові Guards були оголошені deprecated?',
    answer: 'assets/content/ukr/answers/101-Functional-Guards---scho-tse-i-chomu-klasovi-Guards-buly-ogolosheni-deprecated.md',
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
    name: 'Functional Interceptors: Як налаштувати перехоплювачі HTTP-запитів (Interceptors) у Standalone-додатку без використання модулів і HTTP_INTERCEPTORS?',
    answer: 'assets/content/ukr/answers/102-Functional-Interceptors-Yak-nalashtuvaty-perekhoplyuvachi-HTTP-zapytiv-Interceptors-u-Standalone-dodatku-bez-vykorystannya-moduliv-i-HTTP_INTERCEPTORS.md',
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
    name: 'Lifecycle Angular (Життєвий цикл компонента). Сучасний підхід',
    answer: 'assets/content/ukr/answers/103-Lifecycle-Angular-Zhyttievyj-tsikl-komponenta-Suchasnyj-pidhid.md',
    tags: [
      'Angular',
      'Lifecycle',
      'Hooks'
    ],
    category: 'Angular',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Lifecycle Hooks (Класичні)',
      },
      {
        name: 'Сучасний підхід',
      }
    ]
  },
  {
    id: 104,
    name: 'Object.defineProperty - що це і для чого потрібно? (+ застосування в Angular.js і Vue 2)',
    answer: 'assets/content/ukr/answers/104-Object-defineProperty-scho-tse-i-dlya-chogo-potribno.md',
    tags: [
      'JavaScript',
      'Angular.js',
      'Vue 2'
    ],
    ategory: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Object.defineProperty - що це і для чого потрібно?',
      },
      {
        name: 'Загальні дескриптори властивостей: configurable, enumerable',
      },
      {
        name: 'Дескриптори даних: writable, value',
      },
      {
        name: 'Дескриптори доступу: get, set',
      },
      {
        name: 'Використання в Vue та інших фреймворках - (тільки Vue 2, у Vue 3 вже Proxy)',
      }
    ]
  },
  {
    id: 105,
    name: 'Суть реактивності в Angular.js, Angular 2+, Vue 2 і Vue 3. В чому фундаментальна різниця між підходами до реактивності?',
    answer: 'assets/content/ukr/answers/105-Sut-reaktivnosti-v-Angular-Vue.md',
    tags: [
      'Angular',
      'Vue',
      'Reactivity'
    ],
    category: '',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Реактивність в Vue 2',
      },
      {
        name: 'Реактивність в Vue 3',
      },
      {
        name: 'Реактивність в Angular.js',
      },
      {
        name: 'Реактивність в Angular 2+',
      }
    ]
  },
  {
    id: 106,
    name: 'Abstract Classes (Абстрактні класи) в TypeScript. Коли використовувати абстрактні класи замість інтерфейсів?',
    answer: 'assets/content/ukr/answers/106-Abstract-Classes-v-TypeScript.md',
    tags: [
      'TypeScript',
      'OOP',
      'Abstract Classes'
    ],
    category: QuestionCategories.typescript,
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Abstract Classes (Абстрактні класи)',
      },
      {
        name: 'Коли використовувати абстрактні класи замість інтерфейсів',
      },
      {
        name: 'Чи можна використовувати абстрактні класи для реалізації множинного наслідування?',
      },
      {
        name: 'Чи можна комбінувати абстрактні класи та інтерфейси?',
      }
    ]
  },
  {
    id: 107,
    name: 'Access Modifiers (Public, Private, Protected) + Static в TypeScript. Коли використовувати кожен з цих модифікаторів доступу?',
    answer: 'assets/content/ukr/answers/107-Protected-vs-Private-vs-Public-v-TypeScript.md',
    tags: [
      'TypeScript',
      'OOP',
      'Access Modifiers'
    ],
    category: QuestionCategories.typescript,
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Protected (Модифікатор доступу)',
      },
      {
        name: 'Private (Модифікатор доступу)',
      },
      {
        name: 'Public (Модифікатор доступу)',
      },
      {
        name: 'Коли використовувати кожен з цих модифікаторів доступу',
      },
      {
        name: 'Static (Статичні властивості та методи). В чому їх особливості і коли використовувати',
      }
    ]
  },
  {
    id: 108,
    name: 'Console API. Які методи консолі ти використовуєш у своїй роботі і для чого?',
    answer: 'assets/content/ukr/answers/108-Console-API.md',
    tags: [
      'JavaScript',
      'Debugging',
      'Console'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Console API (API консолі)',
      },
    ]
  },
  {
    id: 109,
    name: 'Чиста функція (Pure Function) і її переваги. Приклади чистих і нечистих функцій у JavaScript',
    answer: 'assets/content/ukr/answers/109-Pure-Function.md',
    tags: [
      'JavaScript',
      'Functional Programming',
      'Pure Functions'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Pure Functions (Чисті функції) - що це і в чому їх переваги',
      },
    ]
  },
  {
    id: 110,
    name: 'Функція вищого порядку (Higher-Order Function) в JavaScript. Приклади та застосування',
    answer: 'assets/content/ukr/answers/110-Higher-Order-Function.md',
    tags: [
      'JavaScript',
      'Functional Programming',
      'Higher-Order Functions'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Higher-Order Functions (Функції вищого порядку) - що це і в чому їх переваги',
      },
    ]
  },
  {
    id: 111,
    name: 'У чому різниця між Higher-order операторами в RxJS: mergeMap, switchMap, concatMap і exhaustMap?',
    answer: 'assets/content/ukr/answers/111-RxJS-Higher-order-Operators.md',
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
    name: 'У чому різниця між комбінуючими операторами RxJS: combineLatest, forkJoin, withLatestFrom, concat, merge, zip і race?',
    answer: 'assets/content/ukr/answers/112-RxJS-Combination-Operators.md',
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
    name: 'У чому різниця між операторами створення RxJS: of, from, fromEvent, interval і timer?',
    answer: 'assets/content/ukr/answers/113-RxJS-Creation-Operators.md',
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
    name: 'У чому різниця між операторами фільтрації RxJS: filter, take, takeUntil, skip і distinctUntilChanged?',
    answer: 'assets/content/ukr/answers/114-RxJS-Filtering-Operators.md',
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
    name: 'У чому різниця між операторами утилітами RxJS: tap, finalize, delay, timeout і retry?',
    answer: 'assets/content/ukr/answers/115-RxJS-Utility-Operators.md',
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
    name: 'У чому різниця між операторами трансформації RxJS: map, mapTo, pluck і scan?',
    answer: 'assets/content/ukr/answers/116-RxJS-Transformation-Operators.md',
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
    name: 'Element Injector (або NodeInjector) в Angular. Що це таке і для чого потрібно? Пріоритет токенів на одному елементі',
    answer: 'assets/content/ukr/answers/117-Element-Injector-v-Angular-Shto-tse-take-i-dlya-chogo-potribno.md',
    tags: [
      'Angular',
      'Dependency Injection'
    ],
    category: 'Angular',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Element Injector (або NodeInjector) - що це таке',
      },
      {
        name: 'Як працює Element Injector в Angular',
      },
      {
        name: 'Навіщо потрібен Element Injector і які проблеми він вирішує',
      }
    ]
  },
  {
    id: 118,
    name: 'Ієрархія DI та патерн Shadowing (Затемнення провайдерів)',
    answer: 'assets/content/ukr/answers/118-DI-Hierarchy-and-Shadowing-Pattern.md',
    tags: [
      'Angular',
      'Dependency Injection'
    ],
    category: 'Angular',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Ієрархія DI в Angular',
      },
      {
        name: 'Патерн Shadowing (Затемнення провайдерів)',
      }
    ]
  },
  {
    id: 119,
    name: 'Провайдери в Angular. Типи провайдерів та їх застосування',
    answer: 'assets/content/ukr/answers/119-Providers-in-Angular-Types-of-Providers-and-Their-Usage.md',
    tags: [
      'Angular',
      'Dependency Injection'
    ],
    category: 'Angular',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Провайдери в Angular - що це таке',
      },
      {
        name: 'Типи провайдерів в Angular (Class Provider, Factory Provider, Value Provider, Existing Provider)',
      },
      {
        name: 'Коли використовувати кожен тип провайдера',
      }
    ]
  },
  {
    id: 120,
    name: 'Сервіси в Angular. Що це таке і для чого потрібні? Життєвий цикл сервісів',
    answer: 'assets/content/ukr/answers/120-Services-in-Angular-What-are-they-and-what-are-they-for.md',
    tags: [
      'Angular',
      'Services',
      'Dependency Injection'
    ],
    category: 'Angular',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Сервіси в Angular - що це таке',
      },
      {
        name: 'Для чого потрібні сервіси в Angular',
      },
      {
        name: 'Життєвий цикл сервісів в Angular',
      }
    ]
  },
  {
    id: 121,
    name: 'Паттерн Singleton (Одиночка) в Angular. Чи є сервіси в Angular синглтонами за замовчуванням?',
    answer: 'assets/content/ukr/answers/121-Singleton-Pattern-in-Angular-Are-Angular-Services-Singletons-by-Default.md',
    tags: [
      'Angular',
      'Singleton',
      'Dependency Injection'
    ],
    category: 'Angular',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Паттерн Singleton (Одиночка) - що це таке',
      },
      {
        name: 'Чи є сервіси в Angular синглтонами за замовчуванням?',
      }
    ]
  },
  {
    id: 122,
    name: 'Види директив: Structural vs Attribute. У чому різниця між структурними та атрибутними директивами в Angular? Наведи приклади.',
    answer: 'assets/content/ukr/answers/122-Directives-in-Angular-Structural-vs-Attribute.md',
    tags: [
      'Angular',
      'Directives'
    ],
    category: 'Angular',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Структурні директиви в Angular',
      },
      {
        name: 'Атрибутні директиви в Angular',
      }
    ]
  },
  {
    id: 123,
    name: 'Pipes: Pure vs Impure. Що таке чисті та нечисті пайпи? Чому використання функцій у шаблоні (наприклад {{ getLabel(item) }}) — це погана практика, і як пайпи допомагають це вирішити?',
    answer: 'assets/content/ukr/answers/123-Pipes-Pure-vs-Impure.md',
    tags: [
      'Angular',
      'Pipes'
    ],
    category: 'Angular',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Чисті пайпи в Angular',
      },
      {
        name: 'Нечисті пайпи в Angular',
      },
    ]
  },
  {
    id: 124,
    name: 'ViewChild / ContentChild. У чому різниця між @ViewChild та @ContentChild? Коли який декоратор застосовувати?',
    answer: 'assets/content/ukr/answers/124-ViewChild-ContentChild.md',
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
        name: 'Коли використовувати @ViewChild, а коли @ContentChild',
      }
    ]
  },
  {
    id: 125,
    name: 'Proxy і Reflect. У чому різниця між ними? Як вони працюють і чому сучасні фреймворки (Vue 3, MobX) перейшли на них?',
    answer: 'assets/content/ukr/answers/125-Proxy-Reflect.md',
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
        name: 'Коли використовувати Proxy, а коли Reflect',
      },
      {
        name: 'Використання в сучасних фреймворках',
      }
    ]
  },
  {
    id: 126,
    name: 'Витоки пам\'яті (Memory Leaks). Які бувають часті причини витоків пам\'яті в JS і як їх уникнути?',
    answer: 'assets/content/ukr/answers/126-Memory-Leaks.md',
    tags: [
      'JavaScript',
      'Memory Leaks'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Що таке витоки пам\'яті в контексті веб-додатків і чому це важливо',
      },
      {
        name: 'Часті причини витоків пам\'яті в JavaScript',
      },
      {
        name: 'Як уникнути витоків пам\'яті в JavaScript',
      },
      {
        name: 'Інструменти для виявлення та усунення витоків пам\'яті',
      }
    ]
  },
  {
    id: 127,
    name: 'Web Workers / Service Workers. JS однопоточный, але як тоді виконувати важкі обчислення, не блокуючи UI?',
    answer: 'assets/content/ukr/answers/127-Web-Workers-Service-Workers.md',
    tags: [
      'JavaScript',
      'Web Workers',
      'Service Workers'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Що таке Web Workers і Service Workers в контексті веб-додатків',
      },
      {
        name: 'Коли використовувати Web Workers, а коли Service Workers',
      },
      {
        name: 'Приклади використання Web Workers і Service Workers',
      },
      {
        name: 'Інструменти для роботи з Web Workers і Service Workers',
      }
    ]
  },
  {
    id: 128,
    name: 'У чому ключові відмінності Composition API від Options API, і які фундаментальні проблеми він вирішує?',
    answer: 'assets/content/ukr/answers/128-Composition-API-Options-API.md',
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
        name: 'Що таке Composition API і Options API в Vue.js',
      },
      {
        name: 'Ключові відмінності Composition API від Options API',
      },
      {
        name: 'Які фундаментальні проблеми вирішує Composition API',
      }
    ]
  },
  {
    name: 'Що таке setup()? Синтаксичний цукор <script setup>+ Макроси: defineProps і defineEmits',
    answer: 'assets/content/ukr/answers/129-Script-Setup.md',
    tags: [
      'Vue.js',
      'Vue 3',
      'Script Setup'
    ],
    category: 'Vue.js',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Що таке setup() і для чого він потрібен у Vue.js',
      },
      {
        name: 'Що таке <script setup> у Vue.js',
      },
      {
        name: 'Ключові відмінності <script setup> від стандартної функції setup()',
      },
      {
        name: 'Які переваги дає використання <script setup>',
      }
    ]
  },
  {
    id: 130,
    name: 'Два брати реактивності: ref vs reactive',
    answer: 'assets/content/ukr/answers/130-Ref-vs-Reactive.md',
    tags: [
      'Vue.js',
      'Vue 3',
      'Reactivity'
    ],
    category: 'Vue.js',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Що таке ref і reactive у Vue.js',
      },
      {
        name: 'Ключові відмінності ref від reactive',
      }
    ]
  },
  {
    id: 131,
    name: 'toValue vs toRaw. У чому різниця між цими функціями і коли яку використовувати?',
    answer: 'assets/content/ukr/answers/131-ToValue-vs-ToRaw.md',
    tags: [
      'Vue.js',
      'Vue 3',
      'Reactivity'
    ],
    category: 'Vue.js',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Що таке toValue і toRaw у Vue.js',
      },
      {
        name: 'Ключові відмінності toValue від toRaw',
      }
    ]
  },
  {
    id: 132,
    name: 'Автоматичне спостереження: watch vs watchEffect',
    answer: 'assets/content/ukr/answers/132-Watch-vs-WatchEffect.md',
    tags: [
      'Vue.js',
      'Vue 3',
      'Reactivity'
    ],
    category: 'Vue.js',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Що таке watch і watchEffect у Vue.js',
      },
      {
        name: 'Ключові відмінності watch від watchEffect',
      }
    ]
  },
  {
    id: 133,
    name: 'Обчислювані властивості: computed',
    answer: 'assets/content/ukr/answers/133-Computed.md',
    tags: [
      'Vue.js',
      'Vue 3',
      'Reactivity'
    ],
    category: 'Vue.js',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Що таке computed у Vue.js',
      },
      {
        name: 'Коли використовувати computed, а коли це антипатерн',
      }
    ]
  },
  {
    id: 134,
    name: 'Способи передачі даних між компонентами у Vue? provide / inject, props / emit та глобальний стан (наприклад, Pinia)',
    answer: 'assets/content/ukr/answers/147-DataTransfer.md',
    tags: [
      'Vue.js',
      'Vue 3',
      'Data Transfer'
    ],
    category: 'Vue.js',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Які способи передачі даних між компонентами у Vue.js існують',
      },
      {
        name: 'Коли використовувати props / emit',
      },
      {
        name: 'Коли використовувати provide / inject, а коли це антипатерн',
      },
      {
        name: 'Коли використовувати глобальний стан (наприклад, Pinia), а коли краще обійтися без нього',
      }
    ]
  },
  {
    id: 135,
    name: 'Слоти: Різниця між звичайними слотами, слотами з іменами та динамічними слотами',
    answer: 'assets/content/ukr/answers/135-Slots.md',
    tags: [
      'Vue.js',
      'Vue 3',
      'Slots'
    ],
    category: 'Vue.js',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Що таке слоти у Vue.js',
      },
      {
        name: 'Різниця між звичайними слотами, слотами з іменами та динамічними слотами',
      }
    ]
  },
  {
    id: 136,
    name: 'Teleport: Що таке Teleport у Vue.js і для чого він потрібен? В чому переваги використання Teleport?',
    answer: 'assets/content/ukr/answers/136-Teleport.md',
    tags: [
      'Vue.js',
      'Vue 3',
      'Teleport'
    ],
    category: 'Vue.js',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Що таке Teleport у Vue.js',
      },
      {
        name: 'Коли використовувати Teleport, а коли це антипатерн',
      }
    ]
  },
  {
    id: 137,
    name: 'Як змінилася система реактивності у Vue 3? У чому різниця під капотом?',
    answer: 'assets/content/ukr/answers/137-Reactivity.md',
    tags: [
      'Vue.js',
      'Vue 3',
      'Reactivity'
    ],
    category: 'Vue.js',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Як працює реактивність у Vue 3',
      },
      {
        name: 'У чому різниця під капотом між реактивністю у Vue 2 та Vue 3',
      },
      {
        name: 'За рахунок чого рендеринг у Vue 3 став значно швидшим? Оптимізації компілятора (Patch Flags, Static Hoisting)',
      }
    ]
  },
  {
    id: 138,
    name: 'Що таке Фрагменти (Fragments) у Vue 3 і як вони впливають на структуру шаблонів?',
    answer: 'assets/content/ukr/answers/138-Fragments.md',
    tags: [
      'Vue.js',
      'Vue 3',
      'Fragments'
    ],
    category: 'Vue.js',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Що таке Фрагменти (Fragments) у Vue 3',
      },
      {
        name: 'Як Фрагменти впливають на структуру шаблонів',
      }
    ]
  },
  {
    id: 139,
    name: 'Користувацькі директиви. Як змінилося створення кастомних директив?',
    answer: 'assets/content/ukr/answers/139-CustomDirectives.md',
    tags: [
      'Vue.js',
      'Vue 3',
      'Custom Directives'
    ],
    category: 'Vue.js',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Що таке кастомні директиви (Custom Directives) у Vue 3',
      },
      {
        name: 'Як кастомні директиви впливають на структуру шаблонів',
      }
    ]
  },
  {
    id: 140,
    name: 'Pinia. Чому екосистема перейшла на Pinia? У чому переваги порівняно з Vuex та іншими?',
    answer: 'assets/content/ukr/answers/140-Pinia.md',
    tags: [
      'Vue.js',
      'Vue 3',
      'Pinia'
    ],
    category: 'Vue.js',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Чому екосистема перейшла на Pinia',
      },
      {
        name: 'У чому переваги Pinia порівняно з Vuex та іншими',
      }
    ]
  },
  {
    id: 141,
    name: 'Хуки життєвого циклу у Vue 3',
    answer: 'assets/content/ukr/answers/141-LifecycleHooks.md',
    tags: [
      'Vue.js',
      'Vue 3',
      'Lifecycle Hooks'
    ],
    category: 'Vue.js',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Як змінилися хуки життєвого циклу у Vue 3',
      },
      {
        name: 'Куди зникли created та beforeCreate',
      }
    ]
  },
  {
    id: 142,
    name: 'Що таке Composable? Для чого вони потрібні?',
    answer: 'assets/content/ukr/answers/142-Composable.md',
    tags: [
      'Vue.js',
      'Vue 3',
      'Composable'
    ],
    category: 'Vue.js',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Що таке Composable у Vue.js',
      },
      {
        name: 'Відмінності Composable від звичайних методів із сервісу',
      },
      {
        name: 'Які переваги дає використання Composable',
      },
      {
        name: 'Ключові відмінності Composable від mixins та HOCs',
      },
    ]
  },
  {
    id: 143,
    name: 'Вбудований компонент <Suspense>. Як він працює і які проблеми вирішує?',
    answer: 'assets/content/ukr/answers/143-Suspense.md',
    tags: [
      'Vue.js',
      'Vue 3',
      'Suspense'
    ],
    category: 'Vue.js',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Як працює вбудований компонент <Suspense>',
      },
      {
        name: 'Які проблеми вирішує <Suspense>',
      }
    ]
  },
  {
    id: 144,
    name: 'Коли і навіщо слід використовувати shallowRef і shallowReactive замість звичайних?',
    answer: 'assets/content/ukr/answers/144-ShallowRef.md',
    tags: [
      'Vue.js',
      'Vue 3',
      'ShallowRef'
    ],
    category: 'Vue.js',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Коли і навіщо слід використовувати shallowRef і shallowReactive',
      },
      {
        name: 'Які переваги дає використання shallowRef і shallowReactive',
      }
    ]
  },
  {
    id: 145,
    name: 'Що таке defineModel і як він спрощує двостороннє зв\'язування даних?',
    answer: 'assets/content/ukr/answers/145-DefineModel.md',
    tags: [
      'Vue.js',
      'Vue 3',
      'DefineModel'
    ],
    category: 'Vue.js',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Що таке defineModel і як він спрощує двостороннє зв\'язування даних',
      },
      {
        name: 'Які переваги дає використання defineModel',
      }
    ]
  },
  {
    id: 146,
    name: 'В чому різниця між toRef і toRefs, і в яких випадках їх застосовують?',
    answer: 'assets/content/ukr/answers/146-ToRefToRefs.md',
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
        name: 'Що таке toRef і toRefs',
      },
      {
        name: 'Які переваги дає використання toRef і toRefs',
      }
    ]
  },
  {
    id: 147,
    name: 'Що таке Vue Router? Які важливі функції надає маршрутизатор? Які хуки навігації є у vue-router?',
    answer: 'assets/content/ukr/answers/147-VueRouter.md',
    tags: [
      'Vue.js',
      'Vue 3',
      'Vue Router'
    ],
    category: 'Vue.js',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Що таке Vue Router',
      }
    ]
  },
  {
    id: 148,
    name: 'HTTP/HTTPS: методи, заголовки, кешування та безпека',
    answer: 'assets/content/ukr/answers/148-HTTPHTTPS.md',
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
        name: 'HTTP/HTTPS: методи, заголовки, кешування та безпека',
      }
    ]
  },
  {
    id: 149,
    name: 'Same-Origin Policy та CORS. Як браузери забезпечують безпеку при обміні даними між різними джерелами?',
    answer: 'assets/content/ukr/answers/149-SameOriginPolicyCORS.md',
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
        name: 'Same-Origin Policy та CORS',
      }
    ]
  },
  {
    id: 150,
    name: 'Cookies. Що таке cookies і для чого вони потрібні?',
    answer: 'assets/content/ukr/answers/150-CookiesSecurity.md',
    tags: [
      'Web Security',
      'cookies',
    ],
    category: 'Web Security',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Що таке cookies і для чого вони потрібні?',
      },
      {
        name: 'Які атрибути cookies допомагають забезпечити безпеку (Secure, HttpOnly, SameSite)',
      }
    ]
  },
  {
    id: 151,
    name: 'Як браузери забезпечують безпеку cookies при обміні даними між різними джерелами?',
    answer: 'assets/content/ukr/answers/151-CookiesSecurity.md',
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
        name: 'Як браузери забезпечують безпеку cookies при обміні даними між різними джерелами?',
      },
      {
        name: 'Які атрибути cookies допомагають забезпечити безпеку (Secure, HttpOnly, SameSite)',
      }
    ]
  },
  {
    id: 152,
    name: 'XSS (Cross-Site Scripting). Що таке XSS-атаки і як захиститися від них?',
    answer: 'assets/content/ukr/answers/152-XSS.md',
    tags: [
      'Web Security',
      'XSS',
      'cross-site'
    ],
    category: 'Web Security',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Що таке XSS-атаки і як вони працюють',
      },
      {
        name: 'Як захиститися від XSS-атак',
      }
    ]
  },
  {
    id: 153,
    name: 'CSRF (Cross-Site Request Forgery). Що таке CSRF-атаки і як захиститися від них?',
    answer: 'assets/content/ukr/answers/153-CSRF.md',
    tags: [
      'Web Security',
      'CSRF',
      'cross-site'
    ],
    category: 'Web Security',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Що таке CSRF-атаки і як вони працюють',
      },
      {
        name: 'Як захиститися від CSRF-атак',
      }
    ]
  },
  {
    id: 154,
    name: 'SQL Injection. Що таке SQL-ін\'єкції і як захиститися від них?',
    answer: 'assets/content/ukr/answers/154-SQL-Injection.md',
    tags: [
      'Web Security',
      'SQL Injection'
    ],
    category: 'Web Security',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Що таке SQL-ін\'єкції і як захиститися від них?',
      }
    ]
  },
  {
    id: 155,
    name: 'SSL/TLS. Що таке SSL/TLS і як вони забезпечують безпеку даних при передачі по мережі?',
    answer: 'assets/content/ukr/answers/155-SSLTLS.md',
    tags: [
      'Web Security',
      'SSL',
      'TLS'
    ],
    category: 'Web Security',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Що таке SSL/TLS і як вони забезпечують безпеку даних при передачі по мережі?',
      }
    ]
  },
  {
    id: 156,
    name: 'OAuth 2.0. Що таке OAuth 2.0 і як він забезпечує безпечну авторизацію у веб-додатках?',
    answer: 'assets/content/ukr/answers/156-OAuth2.md',
    tags: [
      'Web Security',
      'OAuth 2.0',
      'authorization'
    ],
    category: 'Web Security',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Що таке OAuth 2.0',
      }
    ]
  },
  {
    id: 157,
    name: 'JWT (JSON Web Tokens). Що таке JWT і як він використовується для аутентифікації та передачі інформації між клієнтом і сервером?',
    answer: 'assets/content/ukr/answers/157-JWT.md',
    tags: [
      'Web Security',
      'JWT',
      'authentication'
    ],
    category: 'Web Security',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Що таке JWT і як він використовується для аутентифікації та передачі інформації між клієнтом і сервером?',
      }
    ]
  },
  {
    id: 158,
    name: 'Reflow и Repaint. Чому робота з DOM вважається дуже ресурсоємною?',
    answer: 'assets/content/ukr/answers/158-Pochemu-rabota-s-DOM-schitaetsya-ochen-resursoemkoj.md',
    tags: [
      'DOM',
      'performance',
      'web development'
    ],
    category: 'Markup',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'DOM — це Web API, а не частина JavaScript',
      },
      {
        name: 'DOM — це складна ієрархічна структура даних',
      },
      {
        name: 'Reflow і Repaint',
      }
    ]
  },
  {
    id: 159,
    name: 'Ecmascript language types VS Ecmascript specification types',
    answer: 'assets/content/ukr/answers/159-EcmascriptTypes.md',
    tags: [
      'JavaScript',
      'Ecmascript',
      'types'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Що таке типи мови Ecmascript?',
      },
      {
        name: 'Що таке типи специфікації Ecmascript?',
      },
      {
        name: 'У чому різниця між типами мови та типами специфікації Ecmascript?',
      }
    ]
  },
  {
    id: 160,
    name: 'IntersectionObserver API. Відстеження видимості елементів на сторінці та оптимізація продуктивності',
    answer: 'assets/content/ukr/answers/160-IntersectionObserver.md',
    tags: [
      'JavaScript',
      'IntersectionObserver',
      'Web APIs'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Що таке IntersectionObserver API і для чого він потрібен?',
      },
      {
        name: 'Як використовувати IntersectionObserver API для оптимізації продуктивності веб-додатків?',
      },
      {
        name: 'На зміну яким застарілим технікам прийшов IntersectionObserver API?',
      }
    ]
  },
  {
    id: 161,
    name: 'MutationObserver API. Що це таке і для чого потрібно?',
    answer: 'assets/content/ukr/answers/161-MutationObserver.md',
    tags: [
      'JavaScript',
      'MutationObserver',
      'Web APIs'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Що таке MutationObserver API і для чого він потрібен?',
      },
      {
        name: 'Як використовувати MutationObserver API для відстеження змін у DOM?',
      },
      {
        name: 'На зміну яким застарілим технікам прийшов MutationObserver API?',
      }
    ]
  },
  {
    id: 162,
    name: 'ResizeObserver API. Що це таке і для чого потрібно?',
    answer: 'assets/content/ukr/answers/162-ResizeObserver.md',
    tags: [
      'JavaScript',
      'ResizeObserver',
      'Web APIs'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Що таке ResizeObserver API і для чого він потрібен?',
      },
      {
        name: 'Як використовувати ResizeObserver API для відстеження змін розміру елементів у DOM?',
      },
      {
        name: 'На зміну яким застарілим технікам прийшов ResizeObserver API?',
      }
    ]
  },
  {
    id: 163,
    name: 'Performance API. Що це таке і для чого потрібно?',
    answer: 'assets/content/ukr/answers/163-PerformanceAPI.md',
    tags: [
      'JavaScript',
      'Performance API',
      'Web APIs'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Що таке Performance API і для чого він потрібен?',
      },
    ]
  },
  {
    id: 164,
    name: 'Web Animations API. Що це таке і для чого потрібно?',
    answer: 'assets/content/ukr/answers/164-WebAnimationsAPI.md',
    tags: [
      'JavaScript',
      'Web Animations API',
      'Web APIs'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Що таке Web Animations API і для чого він потрібен?',
      },
      {
        name: 'Як використовувати Web Animations API для створення анімацій у веб-додатках?',
      },
      {
        name: 'На зміну яким застарілим технікам прийшов Web Animations API?',
      }
    ]
  },
  {
    id: 165,
    name: 'Web Speech API. Що це таке і для чого потрібно?',
    answer: 'assets/content/ukr/answers/165-WebSpeechAPI.md',
    tags: [
      'JavaScript',
      'Web Speech API',
      'Web APIs'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Що таке Web Speech API і для чого він потрібен?',
      },
      {
        name: 'Як використовувати Web Speech API для розпізнавання мови та синтезу мови у веб-додатках?',
      },
      {
        name: 'Які є аналогічні API для роботи з голосом',
      }
    ]
  },
  {
    id: 166,
    name: 'Web Bluetooth API. Що це таке і для чого потрібно?',
    answer: 'assets/content/ukr/answers/166-WebBluetoothAPI.md',
    tags: [
      'JavaScript',
      'Web Bluetooth API',
      'Web APIs'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Що таке Web Bluetooth API і для чого він потрібен?',
      },
      {
        name: 'Як використовувати Web Bluetooth API для взаємодії з Bluetooth-пристроями у веб-додатках?',
      }
    ]
  },
  {
    id: 167,
    name: 'requestAnimationFrame. Що це таке і для чого потрібно?',
    answer: 'assets/content/ukr/answers/167-requestAnimationFrame.md',
    tags: [
      'JavaScript',
      'requestAnimationFrame',
      'Web APIs'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Що таке requestAnimationFrame і для чого він потрібен?',
      },
      {
        name: 'Як використовувати requestAnimationFrame для оптимізації анімацій у веб-додатках?',
      }
    ]
  },
  {
    id: 168,
    name: 'requestIdleCallback. Що це таке і для чого потрібно?',
    answer: 'assets/content/ukr/answers/168-requestIdleCallback.md',
    tags: [
      'JavaScript',
      'requestIdleCallback',
      'Web APIs'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Що таке requestIdleCallback і для чого він потрібен?',
      },
      {
        name: 'Як використовувати requestIdleCallback для оптимізації виконання задач у веб-додатках?',
      }
    ]
  },
  {
    id: 169,
    name: 'queueMicrotask. Що це таке і для чого потрібно?',
    answer: 'assets/content/ukr/answers/169-queueMicrotask.md',
    tags: [
      'JavaScript',
      'queueMicrotask',
      'Web APIs'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Що таке queueMicrotask і для чого він потрібен?',
      },
    ]
  },
  {
    id: 170,
    name: 'Приховані класи (Hidden Classes) і Inline Caching. Як движки JavaScript оптимізують виконання коду?',
    answer: 'assets/content/ukr/answers/170-HiddenClasses.md',
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
        name: 'Що таке приховані класи (Hidden Classes) і як вони допомагають оптимізувати виконання коду в JavaScript?',
      },
      {
        name: 'Що таке Inline Caching і як воно покращує продуктивність JavaScript?',
      }
    ]
  },
  {
    id: 171,
    name: 'Композитні шари (Composite Layers) і GPU. Як браузери використовують GPU для рендерингу веб-сторінок?',
    answer: 'assets/content/ukr/answers/171-CompositeLayers.md',
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
        name: 'Що таке композитні шари (Composite Layers) і як вони допомагають оптимізувати рендеринг веб-сторінок?',
      },
      {
        name: 'Як браузери використовують GPU для рендерингу веб-сторінок і які переваги це дає?',
      }
    ]
  }
] as Question[];
