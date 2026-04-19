import { QuestionCategories, QuestionLevels } from 'src/app/enums/questions.enum';
import { Question } from 'src/app/models/question.model';

export const questions = [
  {
    id: 1,
    name: 'How does the browser parse a page?',
    answer: 'assets/content/eng/answers/1-How-does-the-browser-parse-a-page.md',
    tags: [
      'markup',
      'CSS',
      'browser'
    ],
    category: 'Markup',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Critical Rendering Path',
      },
      {
        name: 'How the browser builds the DOM, CSSOM, and Render Tree',
      },
      {
        name: 'How the browser executes JavaScript and how it affects rendering',
      },
      {
        name: 'What is Layout / Reflow',
      },
      {
        name: 'What is Repaint',
      },
      {
        name: 'Composite',
      },
      {
        name: 'Events DOMContentLoaded and Load - what is the difference?',
      }
    ]
  },
  {
    id: 2,
    name: 'How to optimize page rendering',
    answer: 'assets/content/eng/answers/2-How-to-optimize-page-rendering.md',
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
        name: 'Optimizing DOM (HTML)',
      },
      {
        name: 'Optimizing CSSOM (CSS)',
      },
      {
        name: 'Optimizing JavaScript',
      },
      {
        name: 'Optimizing media and fonts (Resources)',
      },
      {
        name: 'Network optimizations and content delivery',
      },
      {
        name: 'Profiling and metrics',
      }
    ]
  },
  {
    id: 3,
    name: 'What is <DOCTYPE>. Why is it needed?',
    answer: 'assets/content/eng/answers/3-What-is-DOCTYPE-Why-is-it-needed.md',
    tags: [
      'HTML',
      'markup'
    ],
    category: 'Markup',
    level: QuestionLevels.junior,
    structure: [
      {
        name: 'What is this DOCTYPE tag',
      },
      {
        name: 'Why is DOCTYPE needed',
      },
      {
        name: 'Explain that there are different types of DOCTYPE',
      },
      {
        name: 'Is it possible to do without DOCTYPE?',
      },
      {
        name: 'Nowadays, it is almost always recommended to use DOCTYPE HTML5',
      }
    ]
  },
  {
    id: 4,
    name: 'HTML5 Tags. Semantics. Accessibility.',
    answer: 'assets/content/eng/answers/4-HTML5-Tags-Semantics-Accessibility.md',
    tags: [
      'HTML',
      'markup'
    ],
    category: 'Markup',
    level: QuestionLevels.junior,
    structure: [
      {
        name: 'What is semantic markup and why is it needed',
      },
      {
        name: 'Main semantic HTML tags',
      },
      {
        name: 'How to markup a page from a semantic perspective',
      }
    ]
  },
  {
    id: 5,
    name: 'What are the ways to include CSS on a page?',
    answer: 'assets/content/eng/answers/5-What-are-the-ways-to-include-CSS-on-a-page.md',
    tags: [
      'HTML',
      'markup',
      'CSS'
    ],
    category: 'Markup',
    level: QuestionLevels.junior,
    structure: [
      {
        name: 'Including CSS through an external stylesheet using the link tag',
      },
      {
        name: 'Adding CSS using the style tag',
      },
      {
        name: 'Importing CSS using the @import rule',
      },
      {
        name: 'Inline CSS styles',
      },
      {
        name: 'CSS styles through JavaScript',
      }
    ]
  },
  {
    id: 6,
    name: 'How does the browser parse CSS and build styles under the hood? Tokenization, parsing (Right-to-Left)',
    answer: 'assets/content/eng/answers/6-How-does-the-browser-parse-CSS-and-build-styles-under-the-hood.md',
    tags: [
      'css',
      'markup',
      'browser'
    ],
    category: 'Markup',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'CSS Tokenization: how the browser breaks code into tokens',
      },
      {
        name: 'CSS Parsing Architecture in the Browser',
      },
      {
        name: 'Right-to-Left Parsing and Its Advantages',
      },
      {
        name: 'How CSS parsing affects page rendering',
      },
      {
        name: 'CSS errors and how the browser handles them',
      },
      {
        name: 'CSS parsing optimizations in modern browsers',
      },
      {
        name: 'Render blocking and the stages of Layout, Paint, Composite',
      }
    ]
  },
  {
    id: 7,
    name: 'CSS Specificity: How Cascade Works and How Selector "Weight" is Calculated',
    answer: 'assets/content/eng/answers/7-CSS-Specificity-How-Cascade-Works-and-How-Selector-Weight-is-Calculated.md',
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
        name: 'Cascade in CSS: how the browser determines which styles to apply',
      },
      {
        name: '!important',
      },
      {
        name: 'Inline styles',
      },
      {
        name: 'ID',
      },
      {
        name: 'Classes, Attributes, Pseudo-classes',
      },
      {
        name: 'Tags, Pseudo-elements',
      },
      {
        name: 'Zero weight',
      }
    ]
  },
  {
    id: 8,
    name: 'High specificity of a selector, are there any drawbacks? + !important',
    answer: 'assets/content/eng/answers/8-High-specificity-of-a-selector-are-there-any-drawbacks.md',
    tags: [
      'markup',
      'CSS'
    ],
    category: 'Markup',
    level: QuestionLevels.junior,
    structure: [
      {
        name: 'Drawbacks of high specificity',
      },
      {
        name: '!important - when to use it and what problems it can cause',
      },
      {
        name: 'Best practices for managing specificity and style priority',
      }
    ]
  },
  {
    id: 9,
    name: 'What is the difference between CSS combinators >, + and ~ ?',
    answer: 'assets/content/eng/answers/9-Selectors-+-~.md',
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
    name: 'Pseudo-classes of elements (state pseudo-classes, structural, and advanced selectors Modern CSS), Form pseudo-classes',
    answer: 'assets/content/eng/answers/10-Element-Pseudo-classes.md',
    tags: [
      'HTML',
      'markup',
      'CSS'
    ],
    category: 'Markup',
    level: QuestionLevels.junior,
    structure: [
      {
        name: 'State pseudo-classes (Interactive)',
      },
      {
        name: 'Structural pseudo-classes',
      },
      {
        name: 'Advanced selectors (Modern CSS)',
      },
      {
        name: 'Form pseudo-classes',
      }
    ]
  },
  {
    id: 11,
    name: 'Pseudo-elements (generated content, text, interface, advanced). How they work and what they are for?',
    answer: 'assets/content/eng/answers/11-Pseudo-elements.md',
    tags: [
      'HTML',
      'markup',
      'CSS'
    ],
    category: 'Markup',
    level: QuestionLevels.junior,
    structure: [
      {
        name: 'What are pseudo-elements?',
      },
      {
        name: 'Generated content (::before and ::after)',
      },
      {
        name: 'Text (::first-letter and ::first-line)',
      },
      {
        name: 'Interface (::placeholder, ::selection, ::marker)',
      },
      {
        name: 'Advanced (::backdrop, ::file-selector-button)',
      }
    ]
  },
  {
    id: 12,
    name: 'Resource Hints (preload, prefetch, preconnect): What is the difference between them at the browser network stack level?',
    answer: 'assets/content/eng/answers/12-Resource-Hints.md',
    tags: [
      'HTML',
      'markup',
      'browser',
    ],
    category: 'Markup',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'What are Resource Hints and why are they needed?',
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
        name: 'How does the browser handle these Resource Hints at the network stack level?',
      },
      {
        name: 'How incorrect use of preload can harm First Contentful Paint (FCP) and block the main thread?',
      }
    ]
  },
  {
    id: 13,
    name: 'Positioning elements (absolute, fixed, relative etc.)',
    answer: 'assets/content/eng/answers/13-Positioning-elements-absolute-fixed-relative.md',
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
    name: 'Types of elements (inline, block, etc.). Their differences',
    answer: 'assets/content/eng/answers/14-Types-of-elements-inline-block-etc-Their-differences.md',
    tags: [
      'HTML',
      'markup',
      'CSS'
    ],
    category: 'Markup',
    level: QuestionLevels.junior,
    structure: [
      {
        name: 'Block elements',
      },
      {
        name: 'Inline elements',
      },
    ]
  },
  {
    id: 15,
    name: 'Centering (horizontal, vertical)',
    answer: 'assets/content/eng/answers/15-Centering-horizontal-vertical.md',
    tags: [
      'HTML',
      'markup',
      'CSS'
    ],
    category: 'Markup',
    level: QuestionLevels.junior,
    structure: [
      {
        name: 'Horizontal centering',
      },
      {
        name: 'Vertical centering',
      }
    ]
  },
  {
    id: 16,
    name: 'Box Model and box-sizing',
    answer: 'assets/content/eng/answers/16-Box-Model-and-box-sizing.md',
    tags: [
      'HTML',
      'markup',
      'CSS'
    ],
    category: 'Markup',
    level: QuestionLevels.junior,
    structure: [
      {
        name: 'Box Model',
      },
      {
        name: 'box-sizing: content-box and box-sizing: border-box',
      }
    ]
  },
  {
    id: 17,
    name: 'Flexbox VS Grid',
    answer: 'assets/content/eng/answers/17-Flexbox-VS-Grid.md',
    tags: [
      'HTML',
      'markup',
      'CSS'
    ],
    category: 'Markup',
    level: QuestionLevels.junior,
    structure: [
      {
        name: 'What is Flexbox?',
      },
      {
        name: 'What is Grid?',
      },
      {
        name: 'Main differences between Flexbox and Grid',
      },
    ]
  },
  {
    id: 18,
    name: 'CSS animations',
    answer: 'assets/content/eng/answers/18-CSS-animations.md',
    tags: [
      'markup',
      'CSS',
      'animations'
    ],
    category: 'Markup',
    level: QuestionLevels.junior,
    structure: [
      {
        name: 'What are CSS animations?',
      },
      {
        name: 'Main properties for creating animations',
      },
      {
        name: 'Advantages and disadvantages of CSS animations',
      }
    ]
  },
  {
    id: 19,
    name: 'Relative units in CSS: managing context and accessibility (a11y)',
    answer: 'assets/content/eng/answers/19-Relative-units-in-CSS.md',
    tags: [
      'markup',
      'CSS',
      'a11y'
    ],
    category: 'Markup',
    level: QuestionLevels.junior,
    structure: [
      {
        name: 'Relative units (em, rem, %, vw, vh) and their advantages',
      },
      {
        name: 'How relative units help in responsive design',
      },
      {
        name: 'Impact of relative units on accessibility (a11y) and usability',
      },
      {
        name: 'Architecture of adaptive units: calculation context, inheritance, and scalability',
      }
    ]
  },
  {
    id: 20,
    name: 'Browser engines. What are the modern engines and their differences?',
    answer: 'assets/content/eng/answers/20-Browser-engines.md',
    tags: [
      'JavaScript',
      'JS mechanics',
      'browser'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'What is a browser engine and its role in web page rendering',
      },
      {
        name: 'Modern browser engines: V8 (Chrome, Edge), SpiderMonkey (Firefox), JavaScriptCore (Safari)',
      },
      {
        name: 'Main differences between engines and their optimizations',
      },
      {
        name: 'How the choice of engine affects the performance and compatibility of web applications',
      },
      {
        name: 'How to classify browsers by the type of engine usage (Engine creators, Custom UI, System wrappers)',
      }
    ]
  },
  {
    id: 21,
    name: 'Parsing and compiling JS: how the engine reads and optimizes code',
    answer: 'assets/content/eng/answers/21-Parsing-and-compiling-JS.md',
    tags: [
      'JavaScript',
      'JS mechanics',
      'browser'
    ],
    category: QuestionCategories.javascript,
    level: QuestionLevels.senior,
    structure: [
      {
        name: 'Modern JS engines use a hybrid approach: interpretation and JIT compilation',
      },
      {
        name: 'Parsing JavaScript and building the AST',
      },
      {
        name: 'Interpretation',
      },
      {
        name: 'JIT compilation',
      },
      {
        name: 'Optimization (Turbofan) and Deoptimization (Bailout)',
      },
      {
        name: 'How to write code that will be well optimized by the engine',
      }
    ]
  },
  {
    id: 22,
    name: 'Ways to include JS on a page. The role of resource loading order (in head and at the end of body).',
    answer: 'assets/content/eng/answers/22-Ways-to-include-JS-on-a-page.md',
    tags: [
      'HTML',
      'markup',
      'JavaScript'
    ],
    category: 'Markup',
    level: QuestionLevels.junior,
    structure: [
      {
        name: '3 ways to include JS on a page',
      }
    ]
  },
  {
    id: 23,
    name: 'What is the difference between the async and defer attributes on the <script> tag?',
    answer: 'assets/content/eng/answers/23-Defer-and-async-attributes-on-the-script-tag.md',
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
        name: 'No attributes',
      }
    ]
  },
  {
    id: 24,
    name: 'Working with SVG. What are the ways to animate SVG?',
    answer: 'assets/content/eng/answers/24-SVG-Animations.md',
    tags: [
      'SVG',
      'markup',
      'animations'
    ],
    category: 'Markup',
    level: QuestionLevels.junior,
    structure: [
      {
        name: 'What is SVG?',
      },
      {
        name: 'Key features of SVG',
      },
      {
        name: 'Ways to animate SVG: CSS animations, SMIL, JavaScript',
      }
    ]
  },
  {
    id: 25,
    name: 'What is HTML5 Canvas and what are its use cases?',
    answer: 'assets/content/eng/answers/25-Canvas-What-is-it-and-why-is-it-needed.md',
    tags: [
      'HTML',
      'markup',
      'CSS'
    ],
    category: 'Markup',
    level: QuestionLevels.junior,
    structure: [
      {
        name: 'Canvas - what is it?',
      },
      {
        name: 'Why is Canvas needed?',
      },
      {
        name: 'Main areas of application',
      },
      {
        name: 'Advantages and disadvantages of Canvas',
      },
      {
        name: 'In which cases is it better to choose Canvas for rendering, rather than DOM or SVG?',
      }
    ]
  },
  {
    id: 26,
    name: 'CSS Variables under the hood: inheritance, scope, and dynamic theming through CSS Custom Properties',
    answer: 'assets/content/eng/answers/26-Custom-properties.md',
    tags: [
      'markup',
      'CSS',
      'CSS Variables'
    ],
    category: 'Markup',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'CSS Custom Properties - what is it?',
      },
      {
        name: 'Browser support and when they appeared',
      },
      {
        name: 'Main differences from SASS/LESS variables',
      },
      {
        name: 'Inheritance and scope of CSS Custom Properties',
      },
      {
        name: 'Dynamic theming through CSS Custom Properties',
      }
    ]
  },
  {
    id: 27,
    name: 'Performance of animations and Critical Rendering Path',
    answer: 'assets/content/eng/answers/27-Performance-of-animations-and-Critical-Rendering-Path.md',
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
        name: 'Critical Rendering Path (CRP) and its impact on animation performance',
      },
      {
        name: 'Which CSS properties trigger Layout, Paint, and Composite',
      },
    ]
  },
  {
    id: 28,
    name: 'Pre- and post- CSS processors. Experience with them. Relevance',
    answer: 'assets/content/eng/answers/28-Pre--and-post--CSS-processors-Experience-with-them.md',
    tags: [
      'markup',
      'CSS'
    ],
    category: 'Markup',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Pre- and post- CSS processors - what is it?',
      },
      {
        name: 'Relevance in 2025-2026',
      }
    ]
  },
  {
    id: 29,
    name: 'BEM Methodology. Main positions, what problems does it solve?',
    answer: 'assets/content/eng/answers/29-BEM-Methodology-Main-positions-what-problems-does-it-solve.md',
    tags: [
      'HTML',
      'markup',
      'CSS'
    ],
    category: 'Markup',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'BEM Methodology - what is it?',
      },
      {
        name: 'Main positions of BEM methodology',
      },
      {
        name: 'What problems does BEM solve?',
      }
    ]
  },
  {
    id: 30,
    name: 'HTML template assets/content/engines/preprocessors (handlebars, mustache, pug etc)',
    answer: 'assets/content/eng/answers/30-HTML-template-assets/content/engines-preprocessors-handlebars-mustache-pug-etc.md',
    tags: [
      'HTML',
      'markup'
    ],
    category: 'Markup',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'HTML template assets/content/engines/preprocessors - what is it?',
      },
      {
        name: 'Examples of popular tools',
      },
      {
        name: 'What is the difference between a template assets/content/engine and a preprocessor?',
      },
      {
        name: 'Are they relevant today?',
      }
    ]
  },
  {
    id: 31,
    name: 'What types of nodes exist in the DOM, how do they differ, and what are they used for?',
    answer: 'assets/content/eng/answers/31-What-types-of-nodes-exist-in-the-DOM.md',
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
        name: 'What types of nodes exist in the DOM?',
      },
      {
        name: 'How do they differ?',
      },
      {
        name: 'What are the different types of nodes used for?',
      }
    ]
  },
  {
    id: 32,
    name: 'Data types in JavaScript. typeof and its features',
    answer: 'assets/content/eng/answers/32-Data-types-in-JavaScript-typeof-and-its-features.md',
    tags: [
      'JavaScript',
      'Data types'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: '7 primitive data types',
      },
      {
        name: '1 non-primitive data type',
      },
      {
        name: 'typeof and its features',
      }
    ]
  },
  {
    id: 33,
    name: 'Type conversion in JavaScript',
    answer: 'assets/content/eng/answers/33-Type-conversion-in-JavaScript.md',
    tags: [
      'JavaScript',
      'Data types'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Three main types of conversion',
      }
    ]
  },
  {
    id: 34,
    name: 'Let, const and var. Differences + Hoisting',
    answer: 'assets/content/eng/answers/34-Let-const-and-var-Differences-+-Hoisting.md',
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
        name: 'Let, const and var - differences',
      },
      {
        name: 'Hoisting and its features for let, const and var',
      },
      {
        name: 'How Hoisting works with var, let and const',
      },
      {
        name: 'Temporal Dead Zone (TDZ) for let and const',
      }
    ]
  },
  {
    id: 35,
    name: 'Functions: function declaration, function expression',
    answer: 'assets/content/eng/answers/35-Functions-function-declaration-function-expression.md',
    tags: [
      'JavaScript',
      'JS mechanics',
      'functions'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Function Declaration',
      },
      {
        name: 'Function Expression',
      },
      {
        name: 'Parsing mechanics at the engine level: how the engine handles these constructs',
      },
      {
        name: 'When to use Function Declaration and when to use Function Expression',
      }
    ]
  },
  {
    id: 36,
    name: 'Data structures (array, object, set, map)',
    answer: 'assets/content/eng/answers/36-Data-structures-array-object-set-map.md',
    tags: [
      'JavaScript',
      'Data types',
      'Structures'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Array',
      },
      {
        name: 'Object',
      },
      {
        name: 'Map',
      },
      {
        name: 'Set',
      },
      {
        name: 'WeakMap and WeakSet',
      }
    ]
  },
  {
    id: 37,
    name: 'Array methods you use',
    answer: 'assets/content/eng/answers/37-Array-methods-you-use.md',
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
        name: 'pop/push and shift/unshift, their differences',
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
        name: 'indexOf/lastIndexOf and includes, their differences',
      },
      {
        name: 'find and findIndex, their differences',
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
    name: 'Iterators and Generators',
    answer: 'assets/content/eng/answers/38-Iterators-and-Generators.md',
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
        name: 'Iterators: Mechanics under the hood',
      },
      {
        name: 'Generators',
      },
      {
        name: 'Why is this useful in practice?',
      }
    ]
  },
  {
    id: 39,
    name: 'Scope, Lexical Environment',
    answer: 'assets/content/eng/answers/39-Scope-Lexical-Environment.md',
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
        name: 'Types of scopes: global, function, block',
      },
      {
        name: 'Variable lifecycle',
      }
    ]
  },
  {
    id: 40,
    name: 'Closure',
    answer: 'assets/content/eng/answers/40-Closure.md',
    tags: [
      'JavaScript',
      'JS mechanics'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Closure - what it is and why it is needed',
      },
      {
        name: '[[Environment]]',
      },
      {
        name: 'Using closures to create private variables',
      }
    ]
  },
  {
    id: 41,
    name: 'Garbage Collector. What it is and why it is needed?',
    answer: 'assets/content/eng/answers/41-Garbage-Collector-What-it-is-and-why-it-is-needed.md',
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
    name: 'Recursion. What it is and why it is needed?',
    answer: 'assets/content/eng/answers/42-Recursion-What-it-is-and-why-it-is-needed.md',
    tags: [
      'JavaScript',
      'JS mechanics'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Recursion - what it is and why it is needed',
      },
      {
        name: 'Pros and cons of recursion',
      }
    ]
  },
  {
    id: 43,
    name: 'The "this" keyword. Context',
    answer: 'assets/content/eng/answers/43-The-this-keyword-Context.md',
    tags: [
      'JavaScript',
      'JS mechanics',
      'context'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Global context and regular function call',
      },
      {
        name: 'Calling as an object method',
      },
      {
        name: 'Arrow functions',
      }
    ]
  },
  {
    id: 44,
    name: 'Context binding (explicit, implicit). Bind, call, apply and their differences',
    answer: 'assets/content/eng/answers/44-Context-binding-explicit-implicit-Bind-call-apply-and-their-differences.md',
    tags: [
      'JavaScript',
      'JS mechanics',
      'context'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Implicit Binding',
      },
      {
        name: 'Explicit Binding',
      },
      {
        name: 'Methods call, apply and bind and their differences',
      }
    ]
  },
  {
    id: 45,
    name: 'Currying',
    answer: 'assets/content/eng/answers/45-Currying.md',
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
        name: 'Currying - what it is and why it is needed',
      },
      {
        name: 'Implementation of currying',
      },
      {
        name: 'Why is this useful in practice?',
      }
    ]
  },
  {
    id: 46,
    name: 'Partial Application',
    answer: 'assets/content/eng/answers/46-Partial-Application.md',
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
        name: 'Partial Application (based on currying)',
      },
      {
        name: 'Implementation of partial application',
      }
    ]
  },
  {
    id: 47,
    name: 'Arguments object (why is it called a pseudo-array?)',
    answer: 'assets/content/eng/answers/47-Arguments-object-why-is-it-called-a-pseudo-array.md',
    tags: [
      'JavaScript',
      'JS mechanics',
      'functions'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Arguments object',
      },
      {
        name: 'Why is it called a pseudo-array?',
      },
      {
        name: 'Arguments VS Arrow Functions',
      },
      {
        name: 'Modern alternatives',
      }
    ]
  },
  {
    id: 48,
    name: '"use strict" directive',
    answer: 'assets/content/eng/answers/48-Use-strict-directive.md',
    tags: [
      'JavaScript',
      'JS mechanics'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: '"use strict" directive - what it is and why it is needed',
      },
      {
        name: 'Main changes when strict mode is enabled',
      },
      {
        name: 'How to enable strict mode?',
      }
    ]
  },
  {
    id: 49,
    name: 'Object conversion: toString and valueOf',
    answer: 'assets/content/eng/answers/49-Object-conversion-toString-and-valueOf.md',
    tags: [
      'JavaScript',
      'JS mechanics'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Object conversion: toString and valueOf',
      },
      {
        name: 'How the assets/content/engine decides which method to call first',
      }
    ]
  },
  {
    id: 50,
    name: 'Event loop, microtasks, event queue',
    answer: 'assets/content/eng/answers/50-Event-loop-microtasks-event-queue.md',
    tags: [
      'JavaScript',
      'Browser mechanics'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Why do we need the Event Loop?',
      },
      {
        name: 'Main entities: Call Stack, Heap, Web APIs, Microtasks and Macrotasks',
      }
    ]
  },
  {
    id: 51,
    name: 'Inheritance in JavaScript',
    answer: 'assets/content/eng/answers/51-Inheritance-in-JavaScript.md',
    tags: [
      'JavaScript',
      'JS mechanics'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Inheritance in JavaScript',
      },
      {
        name: 'Prototype inheritance and prototype chain',
      }
    ]
  },
  {
    id: 52,
    name: 'Reference __proto__. What is it and how to use it?',
    answer: 'assets/content/eng/answers/52-Reference-__proto__-What-is-it-and-how-to-use-it.md',
    tags: [
      'JavaScript',
      'JS mechanics'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: '__proto__ - what is it?',
      }
    ]
  },
  {
    id: 53,
    name: 'F.prototype property and creating objects with new',
    answer: 'assets/content/eng/answers/53-Fprototype-property-and-creating-objects-with-new.md',
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
    name: 'Promises. Why are they needed? What problem did they solve?',
    answer: 'assets/content/eng/answers/54-Promises-Why-are-they-needed-What-problem-did-they-solve.md',
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
        name: 'What is a Promise, in which version of ES did it appear',
      },
      {
        name: 'What problem did Promises solve?',
      },
      {
        name: 'Immutability of the result after the Promise is settled',
      },
      {
        name: 'then, catch, finally',
      },
      {
        name: 'Evolution of Promises and async/await',
      }
    ]
  },
  {
    id: 55,
    name: 'Promise chaining. Can we call promise.then().finally().then() or promise.catch().then()? What will we get?',
    answer: 'assets/content/eng/answers/55-Promise-chaining.md',
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
        name: 'We can continue the chain after an error',
      },
      {
        name: 'We can also build such chains with finally',
      }
    ]
  },
  {
    id: 56,
    name: 'Try - Catch. What is it and why is it needed?',
    answer: 'assets/content/eng/answers/56-Try---Catch-What-is-it-and-why-is-it-needed.md',
    tags: [
      'JavaScript'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Try - Catch - what is it for?',
      }
    ]
  },
  {
    id: 57,
    name: 'What is new in the language in ES6?',
    answer: 'assets/content/eng/answers/57-What-is-new-in-the-language-in-ES6.md',
    tags: [
      'JavaScript',
      'ES6'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: '11 main features of ES6',
      }
    ]
  },
  {
    id: 58,
    name: 'What is new in the language after ES6?',
    answer: 'assets/content/eng/answers/58-What-is-new-in-the-language-after-ES6.md',
    tags: [
      'JavaScript',
      'ES6',
      'ES7'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'HTML tags',
      }
    ]
  },
  {
    id: 59,
    name: 'Async await. What problem do they solve?',
    answer: 'assets/content/eng/answers/59-Async-await-What-problem-do-they-solve.md',
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
        name: 'Evolution of asynchronous JS in ES8',
      },
      {
        name: 'Why do we need async/await? What problem does it solve?',
      },
      {
        name: 'try...catch...finally',
      },
      {
        name: 'node.js and support for async/await',
      }
    ]
  },
  {
    id: 60,
    name: 'Methods for managing a group of promises',
    answer: 'assets/content/eng/answers/60-Methods-for-managing-a-group-of-promises.md',
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
        name: 'What problem do they solve?',
      },
      {
        name: 'Promise.all() — «All or nothing»',
      },
      {
        name: 'Promise.allSettled() — «Wait for all, no matter what»',
      },
      {
        name: 'Promise.race() — «Who is faster»',
      },
      {
        name: 'Promise.any() — «At least one successful»',
      }
    ]
  },
  {
    id: 61,
    name: 'DOM - what is it and why? DOM events. Bubbling, capturing. Delegation',
    answer: 'assets/content/eng/answers/61-DOM---what-is-it-and-why-DOM-events-Bubbling-capturing-Delegation.md',
    tags: [
      'markup',
      'browser mechanics'
    ],
    category: 'Markup',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'HTML tags',
      }
    ]
  },
  {
    id: 62,
    name: 'LocalStorage VS SessionStorage. Differences, working principle',
    answer: 'assets/content/eng/answers/62-LocalStorage-VS-SessionStorage-Differences-working-principle.md',
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
    answer: 'assets/content/eng/answers/63-Code-style-Linters-Prettier.md',
    tags: [
      'programming',
      'codestyle',
      'best-practice'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Why do we need code style and tools to maintain it?',
      },
      {
        name: 'Prettier',
      },
      {
        name: 'ESLint, TSLint and CodeLint',
      },
      {
        name: '.editorconfig',
      }
    ]
  },
  {
    id: 64,
    name: 'Mutability/Immutability (when working with arrays etc)',
    answer: 'assets/content/eng/answers/64-Mutability-Immutability-when-working-with-arrays-etc.md',
    tags: [
      'programming',
      'immutable'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'HTML tags',
      }
    ]
  },
  {
    id: 65,
    name: 'Reactive programming. RxJs and main methods',
    answer: 'assets/content/eng/answers/65-Reactive-programming-RxJs-and-main-methods.md',
    tags: [
      'TypeScript',
      'RxJs'
    ],
    category: QuestionCategories.typescript,
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Reactive programming - what is it?',
      },
      {
        name: 'RxJs - what is it for?',
      },
    ]
  },
  {
    id: 66,
    name: 'What is an Observable object in RxJs?',
    answer: 'assets/content/eng/answers/66-What-is-an-Observable-object-in-RxJs.md',
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
        name: 'Observable - what is it?',
      }
    ]
  },
  {
    id: 67,
    name: 'What is a Subject? What types are there?',
    answer: 'assets/content/eng/answers/67-What-is-a-Subject-What-types-are-there.md',
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
        name: 'Subject - what is it?',
      },
      {
        name: 'Types of Subject: Subject, BehaviorSubject, ReplaySubject, AsyncSubject',
      }
    ]
  },
  {
    id: 68,
    name: 'Observables VS Subject - differences',
    answer: 'assets/content/eng/answers/68-Observables-VS-Subject---differences.md',
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
        name: 'Subject specifics',
      },
      {
        name: 'Behavior differences and types of Subject',
      },
      {
        name: 'Observable specifics',
      },
      {
        name: 'Observable - only for data retrieval, Subject - also for propagation',
      }
    ]
  },
  {
    id: 69,
    name: 'Zone.js. What is it and why is it needed?',
    answer: 'assets/content/eng/answers/69-Zonejs-What-is-it-and-why-is-it-needed.md',
    tags: [
      'Angular',
      'Change Detection',
      'Async'
    ],
    category: 'Angular',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Zone.js - what is it?',
      },
      {
        name: 'How Zone.js works under the hood',
      }
    ]
  },
  {
    id: 70,
    name: 'Which Utility Types do you use in practice?',
    answer: 'assets/content/eng/answers/70-Which-Utility-Types-do-you-use-in-practice.md',
    tags: [
      'TypeScript',
      'Typization'
    ],
    category: QuestionCategories.typescript,
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Partial&lt;Type>',
      },
      {
        name: 'Required&lt;Type>',
      },
      {
        name: 'Pick&lt;Type, Keys>',
      },
      {
        name: 'Omit&lt;Type, Keys>',
      },
      {
        name: 'Record&lt;Keys, Type>',
      }
    ]
  },
  {
    id: 71,
    name: 'What are Type Guards and Type Assertions?',
    answer: 'assets/content/eng/answers/71-What-are-Type-Guards-and-Type-Assertions.md',
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
    name: 'What are Enums? Their usage',
    answer: 'assets/content/eng/answers/72-What-are-Enums-Their-usage.md',
    tags: [
      'TypeScript',
      'Typization'
    ],
    category: QuestionCategories.typescript,
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Enums ',
      },
      {
        name: 'Advantages of Enums',
      },
      {
        name: 'Numeric Enums',
      },
      {
        name: 'String Enums',
      },
      {
        name: 'Heterogeneous Enums',
      },
      {
        name: 'Const Enums',
      },
      {
        name: 'Under the hood: how JavaScript handles Enums',
      }
    ]
  },
  {
    id: 73,
    name: 'Class, Interface, Type. Differences and usage',
    answer: 'assets/content/eng/answers/73-Class-Interface-Type-Differences-and-usage.md',
    tags: [
      'TypeScript',
      'Typization'
    ],
    category: QuestionCategories.typescript,
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Class (Implementation)',
      },
      {
        name: 'Interface (Contract)',
      },
      {
        name: 'Type (Alias)',
      }
    ]
  },
  {
    id: 74,
    name: 'What are Generics? Their usage',
    answer: 'assets/content/eng/answers/74-What-are-Generics-Their-usage.md',
    tags: [
      'TypeScript',
      'Typization'
    ],
    category: QuestionCategories.typescript,
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Generics - what problem do they solve?',
      },
      {
        name: 'Generics syntax',
      },
      {
        name: 'Usage of Generics in functions, interfaces, and classes',
      },
      {
        name: 'Constraints in Generics',
      },
      {
        name: 'Utility Types based on Generics',
      },
      {
        name: 'Multiple type parameters',
      },
      {
        name: 'How Generics work under the hood in JavaScript',
      }
    ]
  },
  {
    id: 75,
    name: 'Difference between any, unknown, and never',
    answer: 'assets/content/eng/answers/75-Difference-between-any-unknown-and-never.md',
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
    name: 'When to use .asObservable() in RxJs?',
    answer: 'assets/content/eng/answers/76-When-to-use-asObservable-in-RxJs.md',
    tags: [
      'TypeScript',
      'Angular',
      'RxJs'
    ],
    category: QuestionCategories.typescript,
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'asObservable() - what it is and why it is needed?',
      },
      {
        name: 'Correct way to use asObservable()',
      },
      {
        name: 'Anti-pattern of using asObservable()',
      }
    ]
  },
  {
    id: 77,
    name: 'Main principles of OOP. What is it and why is it needed?',
    answer: 'assets/content/eng/answers/77-Main-principles-of-OOP-What-is-it-and-why-is-it-needed.md',
    tags: [
      'programming',
      'OOP'
    ],
    category: 'programming',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Abstraction',
      },
      {
        name: 'Encapsulation',
      },
      {
        name: 'Inheritance',
      },
      {
        name: 'Polymorphism',
      }
    ]
  },
  {
    id: 78,
    name: 'Design Patterns',
    answer: 'assets/content/eng/answers/78-Design-Patterns.md',
    tags: [
      'Patterns',
      'best-practice'
    ],
    category: 'programming',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Design Patterns - what they are and why they are needed?',
      }
    ]
  },
  {
    id: 79,
    name: 'Function Decorators. What they are and why they are needed?',
    answer: 'assets/content/eng/answers/79-Function-Decorators-What-they-are-and-why-they-are-needed.md',
    tags: [
      'JavaScript',
      'Patterns',
      'best-practice'
    ],
    category: 'programming',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Decorator',
      }
    ]
  },
  {
    id: 80,
    name: 'SOLID Principles. What they are and why they are needed?',
    answer: 'assets/content/eng/answers/80-SOLID-Principles-What-they-are-and-why-they-are-needed.md',
    tags: [
      'programming',
      'best-practice',
      'OOP'
    ],
    category: 'programming',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'SOLID Principles - what they are and why they are needed',
      },
      {
        name: 'Single Responsibility Principle',
      },
      {
        name: 'Open-Closed Principle',
      },
      {
        name: 'Liskov Substitution Principle',
      },
      {
        name: 'Interface Segregation Principle',
      },
      {
        name: 'Dependency Inversion Principle',
      }
    ]
  },
  {
    id: 81,
    name: 'HTTP Protocol. What it is and what it is used for?',
    answer: 'assets/content/eng/answers/81-HTTP-Protocol-What-it-is-and-what-it-is-used-for.md',
    tags: [
      'protocol',
      'internet'
    ],
    category: 'Markup',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'HTML tags',
      }
    ]
  },
  {
    id: 82,
    name: 'Special Angular selectors. Pseudo-classes :host, :host-context and pseudo-element ::ng-deep',
    answer: 'assets/content/eng/answers/82-Special-Angular-selectors-Pseudo-classes-host-host-context-and-pseudo-element-ng-deep.md',
    tags: [
      'Angular',
      'html',
      'markup'
    ],
    category: 'Angular',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'HTML tags',
      }
    ]
  },
  {
    id: 83,
    name: 'SQL. Basic commands',
    answer: 'assets/content/eng/answers/83-SQL-Basic-commands.md',
    tags: [
      'DBMS (Database Management Systems)',
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
        name: 'JOIN and its variants',
      }
    ]
  },
  {
    id: 84,
    name: 'JSON Format, toJSON method',
    answer: 'assets/content/eng/answers/84-JSON-Format-toJSON-method.md',
    tags: [
      'JSON',
      'Data Structures'
    ],
    category: 'Databases',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'JSON - what it is and why it is needed',
      },
      {
        name: 'toJSON method',
      }
    ]
  },
  {
    id: 85,
    name: 'Authentication and Authorization. What is the difference?',
    answer: 'assets/content/eng/answers/85-Authentication-and-Authorization-What-is-the-difference.md',
    tags: [
      'security',
      'authentication',
      'authorization'
    ],
    category: 'General',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Authentication',
      },
      {
        name: 'Authorization',
      }
    ]
  },
  {
    id: 86,
    name: 'Sorting methods. What are their differences and which one is better to use in different cases?',
    answer: 'assets/content/eng/answers/86-Sorting-methods.md',
    tags: [
      'algorithm',
      'sorting',
      'Big O'
    ],
    category: 'Algorithms',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Bubble Sort',
      },
      {
        name: 'Insertion Sort',
      },
      {
        name: 'Selection Sort',
      },
      {
        name: 'Merge Sort',
      },
      {
        name: 'Quick Sort',
      }
    ]
  },
  {
    id: 87,
    name: 'Method for evaluating algorithm complexity. O(1), O(n), O(log n), etc. What it is and why it is needed',
    answer: 'assets/content/eng/answers/87-Method-for-evaluating-algorithm-complexity.md',
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
    name: 'Trees, Graphs, Inverted Trees',
    answer: 'assets/content/eng/answers/88-Trees-Graphs-Inverted-Trees.md',
    tags: [
      'data structures',
      'trees',
      'graphs'
    ],
    category: 'General',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Trees',
      },
      {
        name: 'Inverted Trees',
      },
      {
        name: 'Binary Trees',
      },
      {
        name: 'Graphs',
      }
    ]
  },
  {
    id: 89,
    name: 'Shadow DOM. Style encapsulation',
    answer: 'assets/content/eng/answers/89-Shadow-DOM-Style-Encapsulation.md',
    tags: [
      'web development',
      'shadow DOM'
    ],
    category: 'Markup',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Shadow DOM - what it is',
      },
      {
        name: 'The problem that Shadow DOM solves',
      },
      {
        name: 'Key features of Shadow DOM',
      }
    ]
  },
  {
    id: 90,
    name: 'Virtual DOM. Optimization at the framework level',
    answer: 'assets/content/eng/answers/90-Virtual-DOM-Optimization-at-the-framework-level.md',
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
        name: 'Virtual DOM - what it is',
      },
      {
        name: 'The problem that Virtual DOM solves',
      },
      {
        name: 'How Virtual DOM works',
      }
    ]
  },
  {
    id: 91,
    name: 'RxJS and Asynchronous Programming',
    answer: 'assets/content/eng/answers/91-RxJS-and-Asynchronous-Programming.md',
    tags: [
      'rxjs',
      'asynchronous',
      'reactive programming'
    ],
    category: 'Angular',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'What is RxJS',
      },
      {
        name: 'What is RxJS used for?',
      },
      {
        name: 'Basic entities of RxJS: Observable, Observer, Subscription, Subject',
      },
      {
        name: 'Popular operators',
      }
    ]
  },
  {
    id: 92,
    name: 'State management in Angular. NgRx',
    answer: 'assets/content/eng/answers/92-State-management-in-Angular-NgRx.md',
    tags: [
      'angular',
      'state management',
      'reactive programming'
    ],
    category: 'Angular',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'State management in Angular. NgRx, what it is',
      },
      {
        name: 'Store, Actions, Reducers, Selectors',
      },
      {
        name: 'Effects (Side effects and asynchronicity)',
      }
    ]
  },
  {
    id: 93,
    name: 'Signals in Angular. What is the fundamental difference between Signals and RxJS, and why did the Angular team decide to implement this pattern?',
    answer: 'assets/content/eng/answers/93-Signals-in-Angular-What-is-the-fundamental-difference-between-Signals-and-RxJS-and-why-did-the-Angular-team-decide-to-implement-this-pattern.md',
    tags: [
      'Angular',
      'Signals',
      'Reactive Programming'
    ],
    category: 'Angular',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Signals in Angular, what it is',
      },
      {
        name: 'The fundamental difference between Signals and RxJS',
      }
    ]
  },
  {
    id: 94,
    name: 'How do computed and effect work?',
    answer: 'assets/content/eng/answers/94-How-do-computed-and-effect-work.md',
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
        name: 'When to use Effect, and when it is an anti-pattern',
      }
    ]
  },
  {
    id: 95,
    name: 'Signal-based API: input(), output() and model()',
    answer: 'assets/content/eng/answers/95-Signal-based-API-input-output-and-model.md',
    tags: [
      'Angular',
      'Signals',
      'Reactive Programming'
    ],
    category: 'Angular',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'input(), output() and model() - what it is',
      }
    ]
  },
  {
    id: 96,
    name: 'Standalone Components: Why did they abandon NgModules?',
    answer: 'assets/content/eng/answers/96-Standalone-Components-Why-did-they-abandon-NgModules.md',
    tags: [
      'Angular',
      'Standalone',
      'Architecture'
    ],
    category: 'Angular',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Standalone Concept',
      },
      {
        name: 'Why did they abandon NgModules',
      }
    ]
  },
  {
    id: 97,
    name: 'inject() function vs Constructor DI',
    answer: 'assets/content/eng/answers/97-inject-function-vs-Constructor-DI.md',
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
        name: 'inject() function',
      },
      {
        name: 'Advantages of inject() compared to Constructor DI',
      },
      {
        name: 'Where you CAN use inject()',
      },
      {
        name: 'Where you CANNOT use inject()',
      }
    ]
  },
  {
    id: 98,
    name: 'New Control Flow (@if, @for) vs Structural Directives (*ngIf, *ngFor)',
    answer: 'assets/content/eng/answers/98-New-Control-Flow-if-for-vs-Structural-Directives-ngIf-ngFor.md',
    tags: [
      'Angular',
      'Syntax'
    ],
    category: 'Angular',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'New Control Flow',
      },
      {
        name: 'Advantages of the new Control Flow',
      }
    ]
  },
  {
    id: 99,
    name: 'Change Detection Strategies (Default vs OnPush vs Zoneless)',
    answer: 'assets/content/eng/answers/99-Change-Detection-Strategies-Default-vs-OnPush-vs-Zoneless.md',
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
        name: 'Zoneless (Modern Angular / Signals)',
      }
    ]
  },
  {
    id: 100,
    name: 'Deferrable Views (@defer): How does this mechanism work?',
    answer: 'assets/content/eng/answers/100-Deferrable-Views-defer.md',
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
    name: 'Functional Guards - what they are and why class-based Guards were deprecated?',
    answer: 'assets/content/eng/answers/101-Functional-Guards.md',
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
    name: 'Functional Interceptors: How to configure HTTP request interceptors (Interceptors) in a Standalone application without using modules and HTTP_INTERCEPTORS?',
    answer: 'assets/content/eng/answers/102-Functional-Interceptors.md',
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
    name: 'Lifecycle Angular. Modern Approach',
    answer: 'assets/content/eng/answers/103-Lifecycle-Angular-Lifecycle-Hooks-Modern-Approach.md',
    tags: [
      'Angular',
      'Lifecycle',
      'Hooks'
    ],
    category: 'Angular',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Lifecycle Hooks (Classic)',
      },
      {
        name: 'Modern Approach',
      }
    ]
  },
  {
    id: 104,
    name: 'Object.defineProperty - what it is and what it is for?',
    answer: 'assets/content/eng/answers/104-Object-defineProperty-what-it-is-and-what-it-is-for.md',
    tags: [
      'JavaScript',
      'Angular.js',
      'Vue 2'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Object.defineProperty - what it is and what it is for?',
      },
      {
        name: 'General property descriptors: configurable, enumerable',
      },
      {
        name: 'Data descriptors: writable, value',
      },
      {
        name: 'Accessor descriptors: get, set',
      },
      {
        name: 'Usage in Vue and other frameworks - (only Vue 2, in Vue 3 - already Proxy)',
      }
    ]
  },
  {
    id: 105,
    name: 'The essence of reactivity in Angular.js, Angular 2+, Vue 2, and Vue 3. What is the fundamental difference between approaches?',
    answer: 'assets/content/eng/answers/105-The-essence-of-reactivity-in-Angular-Vue.md',
    tags: [
      'Angular',
      'Vue',
      'Reactivity'
    ],
    category: '',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Reactivity in Vue 2',
      },
      {
        name: 'Reactivity in Vue 3',
      },
      {
        name: 'Reactivity in Angular.js',
      },
      {
        name: 'Reactivity in Angular 2+',
      }
    ]
  },

  {
    id: 106,
    name: 'Abstract Classes in TypeScript. When to use abstract classes instead of interfaces?',
    answer: 'assets/content/eng/answers/106-Abstract-Classes-v-TypeScript.md',
    tags: [
      'TypeScript',
      'OOP',
      'Abstract Classes'
    ],
    category: QuestionCategories.typescript,
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Abstract Classes - what they are and why they are needed?',
      },
      {
        name: 'When to use abstract classes instead of interfaces',
      },
      {
        name: 'Can abstract classes be used for multiple inheritance?',
      },
      {
        name: 'Can abstract classes be combined with interfaces?',
      }
    ]
  },
  {
    id: 107,
    name: 'Access Modifiers (Public, Private, Protected) + Static in TypeScript. When to use each of these access modifiers?',
    answer: 'assets/content/eng/answers/107-Protected-vs-Private-vs-Public-v-TypeScript.md',
    tags: [
      'TypeScript',
      'OOP',
      'Access Modifiers'
    ],
    category: QuestionCategories.typescript,
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Protected (Access Modifier)',
      },
      {
        name: 'Private (Access Modifier)',
      },
      {
        name: 'Public (Access Modifier)',
      },
      {
        name: 'When to use each of these access modifiers',
      },
      {
        name: 'Static properties and methods. What are their features and when to use them',
      }
    ]
  },
  {
    id: 108,
    name: 'Console API. What console methods do you use in your work and for what?',
    answer: 'assets/content/eng/answers/108-Console-API.md',
    tags: [
      'JavaScript',
      'Debugging',
      'Console'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Console API - what it is and why it is needed?',
      },
    ]
  },
  {
    id: 109,
    name: 'Pure Function and its advantages. Examples of pure and impure functions in JavaScript',
    answer: 'assets/content/eng/answers/109-Pure-Function.md',
    tags: [
      'JavaScript',
      'Functional Programming',
      'Pure Functions'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Pure Functions - what they are and their advantages',
      },
    ]
  },
  {
    id: 110,
    name: 'Higher-Order Function in JavaScript. Examples and usage',
    answer: 'assets/content/eng/answers/110-Higher-Order-Function.md',
    tags: [
      'JavaScript',
      'Functional Programming',
      'Higher-Order Functions'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Higher-Order Functions - what they are and their advantages',
      },
    ]
  },
  {
    id: 111,
    name: 'What is the difference between Higher-order operators in RxJS: mergeMap, switchMap, concatMap, and exhaustMap?',
    answer: 'assets/content/eng/answers/111-RxJS-Higher-order-Operators.md',
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
    name: 'What is the difference between combination operators in RxJS: combineLatest, forkJoin, withLatestFrom, concat, merge, zip, and race?',
    answer: 'assets/content/eng/answers/112-RxJS-Combination-Operators.md',
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
    name: 'What is the difference between creation operators in RxJS: of, from, fromEvent, interval, and timer?',
    answer: 'assets/content/eng/answers/113-RxJS-Creation-Operators.md',
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
    name: 'What is the difference between filtering operators in RxJS: filter, take, takeUntil, skip, and distinctUntilChanged?',
    answer: 'assets/content/eng/answers/114-RxJS-Filtering-Operators.md',
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
    name: 'What is the difference between utility operators in RxJS: tap, finalize, delay, timeout, and retry?',
    answer: 'assets/content/eng/answers/115-RxJS-Utility-Operators.md',
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
    name: 'What is the difference between transformation operators in RxJS: map, mapTo, pluck, and scan?',
    answer: 'assets/content/eng/answers/116-RxJS-Transformation-Operators.md',
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
    name: 'Element Injector (or NodeInjector) in Angular. What is it and what is it for? Token priority on a single element',
    answer: 'assets/content/eng/answers/117-Element-Injector-in-Angular-What-is-it-and-what-is-it-for.md',
    tags: [
      'Angular',
      'Dependency Injection'
    ],
    category: 'Angular',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Element Injector (or NodeInjector) - what is it',
      },
      {
        name: 'How Element Injector works in Angular',
      },
      {
        name: 'Why Element Injector is needed and what problems it solves',
      }
    ]
  },
  {
    id: 118,
    name: 'DI Hierarchy and Shadowing Pattern',
    answer: 'assets/content/eng/answers/118-DI-Hierarchy-and-Shadowing-Pattern.md',
    tags: [
      'Angular',
      'Dependency Injection'
    ],
    category: 'Angular',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'DI Hierarchy in Angular',
      },
      {
        name: 'Shadowing Pattern',
      }
    ]
  },
  {
    id: 119,
    name: 'Providers in Angular. Types of Providers and Their Usage',
    answer: 'assets/content/eng/answers/119-Providers-in-Angular-Types-of-Providers-and-Their-Usage.md',
    tags: [
      'Angular',
      'Dependency Injection'
    ],
    category: 'Angular',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Providers in Angular - what is it',
      },
      {
        name: 'Types of Providers in Angular (Class Provider, Factory Provider, Value Provider, Existing Provider)',
      },
      {
        name: 'When to use each type of provider',
      }
    ]
  },
  {
    id: 120,
    name: 'Services in Angular. What are they and what are they for? Lifecycle of services',
    answer: 'assets/content/eng/answers/120-Services-in-Angular-What-are-they-and-what-are-they-for.md',
    tags: [
      'Angular',
      'Services',
      'Dependency Injection'
    ],
    category: 'Angular',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Services in Angular - what is it',
      },
      {
        name: 'Why services are needed in Angular',
      },
      {
        name: 'Lifecycle of services in Angular',
      }
    ]
  },
  {
    id: 121,
    name: 'Singleton Pattern in Angular. Are Angular services singletons by default?',
    answer: 'assets/content/eng/answers/121-Singleton-Pattern-in-Angular-Are-Angular-Services-Singletons-by-Default.md',
    tags: [
      'Angular',
      'Singleton',
      'Dependency Injection'
    ],
    category: 'Angular',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Singleton Pattern - what is it',
      },
      {
        name: 'Are Angular services singletons by default?',
      }
    ]
  },
  {
    id: 122,
    name: 'Types of Directives: Structural vs Attribute. What is the difference between structural and attribute directives in Angular? Give examples.',
    answer: 'assets/content/eng/answers/122-Directives-in-Angular-Structural-vs-Attribute.md',
    tags: [
      'Angular',
      'Directives'
    ],
    category: 'Angular',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Structural directives in Angular',
      },
      {
        name: 'Attribute directives in Angular',
      }
    ]
  },
  {
    id: 123,
    name: 'Pipes: Pure vs Impure. What are pure and impure pipes? Why using functions in templates (e.g., {{ getLabel(item) }}) is a bad practice, and how pipes help solve this?',
    answer: 'assets/content/eng/answers/123-Pipes-Pure-vs-Impure.md',
    tags: [
      'Angular',
      'Pipes'
    ],
    category: 'Angular',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Pure pipes in Angular',
      },
      {
        name: 'Impure pipes in Angular',
      },
    ]
  },
  {
    id: 124,
    name: 'ViewChild / ContentChild. What is the difference between @ViewChild and @ContentChild? When to use each decorator?',
    answer: 'assets/content/eng/answers/124-ViewChild-ContentChild.md',
    tags: [
      'Angular',
      'ViewChild',
      'ContentChild'
    ],
    category: 'Angular',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'ViewChild in Angular',
      },
      {
        name: 'ContentChild in Angular',
      },
      {
        name: 'When to use @ViewChild and when to use @ContentChild',
      }
    ]
  },
  {
    id: 125,
    name: 'Proxy and Reflect. What is the difference between them? How do they work and why have modern frameworks (Vue 3, MobX) switched to them?',
    answer: 'assets/content/eng/answers/125-Proxy-Reflect.md',
    tags: [
      'JavaScript',
      'Proxy',
      'Reflect'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Proxy in JavaScript',
      },
      {
        name: 'Reflect in JavaScript',
      },
      {
        name: 'When to use Proxy and when to use Reflect',
      },
      {
        name: 'Usage in modern frameworks',
      }
    ]
  },
  {
    id: 126,
    name: 'Memory Leaks. What are common causes of memory leaks in JS and how to avoid them?',
    answer: 'assets/content/eng/answers/126-Memory-Leaks.md',
    tags: [
      'JavaScript',
      'Memory Leaks'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'What are memory leaks in the context of web applications and why it is important',
      },
      {
        name: 'Common causes of memory leaks in JavaScript',
      },
      {
        name: 'How to avoid memory leaks in JavaScript',
      },
      {
        name: 'Tools for detecting and fixing memory leaks',
      }
    ]
  },
  {
    id: 127,
    name: 'Web Workers / Service Workers. JS is single-threaded, but how can we perform heavy computations without blocking the UI?',
    answer: 'assets/content/eng/answers/127-Web-Workers-Service-Workers.md',
    tags: [
      'JavaScript',
      'Web Workers',
      'Service Workers'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'What are Web Workers and Service Workers in the context of web applications',
      },
      {
        name: 'When to use Web Workers and when to use Service Workers',
      },
      {
        name: 'Examples of using Web Workers and Service Workers',
      },
      {
        name: 'Tools for working with Web Workers and Service Workers',
      }
    ]
  },
  {
    id: 128,
    name: 'What are the key differences between Composition API and Options API, and what fundamental problems does it solve?',
    answer: 'assets/content/eng/answers/128-Composition-API-Options-API.md',
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
        name: 'What is Composition API and Options API in Vue.js',
      },
      {
        name: 'Key differences between Composition API and Options API',
      },
      {
        name: 'Fundamental problems solved by Composition API',
      }
    ]
  },
  {
    id: 129,
    name: 'What is setup()? Syntactic sugar <script setup>+ Macros: defineProps and defineEmits',
    answer: 'assets/content/eng/answers/129-Script-Setup.md',
    tags: [
      'Vue.js',
      'Vue 3',
      'Script Setup'
    ],
    category: 'Vue.js',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'What is setup() and why it is needed in Vue.js',
      },
      {
        name: 'What is <script setup> in Vue.js',
      },
      {
        name: 'Key differences between <script setup> and the standard setup() function',
      },
      {
        name: 'Benefits of using <script setup>',
      }
    ]
  },
  {
    id: 130,
    name: 'Two brothers of reactivity: ref vs reactive',
    answer: 'assets/content/eng/answers/130-Ref-vs-Reactive.md',
    tags: [
      'Vue.js',
      'Vue 3',
      'Reactivity'
    ],
    category: 'Vue.js',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'What is ref and reactive in Vue.js',
      },
      {
        name: 'Key differences between ref and reactive',
      }
    ]
  },
  {
    id: 131,
    name: 'toValue vs toRaw. What is the difference between these functions and when to use each?',
    answer: 'assets/content/eng/answers/131-ToValue-vs-ToRaw.md',
    tags: [
      'Vue.js',
      'Vue 3',
      'Reactivity'
    ],
    category: 'Vue.js',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'What is toValue and toRaw in Vue.js',
      },
      {
        name: 'Key differences between toValue and toRaw',
      }
    ]
  },
  {
    id: 132,
    name: 'Automatic tracking: watch vs watchEffect',
    answer: 'assets/content/eng/answers/132-Watch-vs-WatchEffect.md',
    tags: [
      'Vue.js',
      'Vue 3',
      'Reactivity'
    ],
    category: 'Vue.js',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'What is watch and watchEffect in Vue.js',
      },
      {
        name: 'Key differences between watch and watchEffect',
      }
    ]
  },
  {
    id: 133,
    name: 'Computed properties: computed',
    answer: 'assets/content/eng/answers/133-Computed.md',
    tags: [
      'Vue.js',
      'Vue 3',
      'Reactivity'
    ],
    category: 'Vue.js',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'What is computed in Vue.js',
      },
      {
        name: 'When to use computed and when it is an anti-pattern',
      }
    ]
  },
  {
    id: 134,
    name: 'Ways to transfer data between components in Vue? provide / inject, props / emit, and global state (e.g., Pinia)',
    answer: 'assets/content/eng/answers/147-DataTransfer.md',
    tags: [
      'Vue.js',
      'Vue 3',
      'Data Transfer'
    ],
    category: 'Vue.js',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'What are the ways to transfer data between components in Vue.js',
      },
      {
        name: 'When to use props / emit',
      },
      {
        name: 'When to use provide / inject and when it is an anti-pattern',
      },
      {
        name: 'When to use global state (e.g., Pinia) and when it is better to avoid it',
      }
    ]
  },
  {
    id: 135,
    name: 'Slots: Key differences between default slots, named slots, and dynamic slots',
    answer: 'assets/content/eng/answers/135-Slots.md',
    tags: [
      'Vue.js',
      'Vue 3',
      'Slots'
    ],
    category: 'Vue.js',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'What are slots in Vue.js',
      },
      {
        name: 'Key differences between default slots, named slots, and dynamic slots',
      }
    ]
  },
  {
    id: 136,
    name: 'Teleport: What is Teleport in Vue.js and why is it needed? What are the benefits of using Teleport?',
    answer: 'assets/content/eng/answers/136-Teleport.md',
    tags: [
      'Vue.js',
      'Vue 3',
      'Teleport'
    ],
    category: 'Vue.js',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'What is Teleport in Vue.js',
      },
      {
        name: 'When to use Teleport and when it is an anti-pattern',
      }
    ]
  },
  {
    id: 137,
    name: 'How has the reactivity system changed in Vue 3? What are the differences under the hood?',
    answer: 'assets/content/eng/answers/137-Reactivity.md',
    tags: [
      'Vue.js',
      'Vue 3',
      'Reactivity'
    ],
    category: 'Vue.js',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'How does reactivity work in Vue 3',
      },
      {
        name: 'What are the differences under the hood between reactivity in Vue 2 and Vue 3',
      },
      {
        name: 'Why is rendering significantly faster in Vue 3? Compiler optimizations (Patch Flags, Static Hoisting)',
      }
    ]
  },
  {
    id: 138,
    name: 'What are Fragments in Vue 3, and how do they affect template structure?',
    answer: 'assets/content/eng/answers/138-Fragments.md',
    tags: [
      'Vue.js',
      'Vue 3',
      'Fragments'
    ],
    category: 'Vue.js',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'What are Fragments in Vue 3',
      },
      {
        name: 'How do Fragments affect template structure',
      }
    ]
  },
  {
    id: 139,
    name: 'Custom Directives. How has the creation of custom directives changed?',
    answer: 'assets/content/eng/answers/139-CustomDirectives.md',
    tags: [
      'Vue.js',
      'Vue 3',
      'Custom Directives'
    ],
    category: 'Vue.js',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'What are custom directives (Custom Directives) in Vue 3',
      },
      {
        name: 'How do custom directives affect template structure',
      }
    ]
  },
  {
    id: 140,
    name: 'Pinia. Why did the ecosystem switch to Pinia? What are the advantages compared to Vuex and others?',
    answer: 'assets/content/eng/answers/140-Pinia.md',
    tags: [
      'Vue.js',
      'Vue 3',
      'Pinia'
    ],
    category: 'Vue.js',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'Why did the ecosystem switch to Pinia',
      },
      {
        name: 'What are the advantages of Pinia compared to Vuex and others',
      }
    ]
  },
  {
    id: 141,
    name: 'Lifecycle Hooks in Vue 3',
    answer: 'assets/content/eng/answers/141-LifecycleHooks.md',
    tags: [
      'Vue.js',
      'Vue 3',
      'Lifecycle Hooks'
    ],
    category: 'Vue.js',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'How have lifecycle hooks changed in Vue 3',
      },
      {
        name: 'Where did created and beforeCreate go',
      }
    ]
  },
  {
    id: 142,
    name: 'What is a Composable? What are they used for?',
    answer: 'assets/content/eng/answers/142-Composable.md',
    tags: [
      'Vue.js',
      'Vue 3',
      'Composable'
    ],
    category: 'Vue.js',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'What is a Composable in Vue.js',
      },
      {
        name: 'How does a Composable differ from regular service methods',
      },
      {
        name: 'What are the advantages of using Composables',
      },
      {
        name: 'Key differences between Composables and mixins or HOCs',
      },
    ]
  },
  {
    id: 143,
    name: 'Built-in <Suspense> component. How does it work and what problems does it solve?',
    answer: 'assets/content/eng/answers/143-Suspense.md',
    tags: [
      'Vue.js',
      'Vue 3',
      'Suspense'
    ],
    category: 'Vue.js',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'How does the built-in <Suspense> component work',
      },
      {
        name: 'What problems does <Suspense> solve',
      }
    ]
  },
  {
    id: 144,
    name: 'When and why should you use shallowRef and shallowReactive instead of the regular ones?',
    answer: 'assets/content/eng/answers/144-ShallowRef.md',
    tags: [
      'Vue.js',
      'Vue 3',
      'ShallowRef'
    ],
    category: 'Vue.js',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'When and why should you use shallowRef and shallowReactive',
      },
      {
        name: 'What are the advantages of using shallowRef and shallowReactive',
      }
    ]
  },
  {
    id: 145,
    name: 'What is defineModel and how does it simplify two-way data binding?',
    answer: 'assets/content/eng/answers/145-DefineModel.md',
    tags: [
      'Vue.js',
      'Vue 3',
      'DefineModel'
    ],
    category: 'Vue.js',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'What is defineModel and how does it simplify two-way data binding',
      },
      {
        name: 'What are the advantages of using defineModel',
      }
    ]
  },
  {
    id: 146,
    name: 'What is the difference between toRef and toRefs, and when should they be used?',
    answer: 'assets/content/eng/answers/146-ToRefToRefs.md',
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
        name: 'What is toRef and toRefs',
      },
      {
        name: 'What are the advantages of using toRef and toRefs',
      }
    ]
  },
  {
    id: 147,
    name: 'What is Vue Router? What important features does the router provide? What navigation hooks are available in vue-router?',
    answer: 'assets/content/eng/answers/147-VueRouter.md',
    tags: [
      'Vue.js',
      'Vue 3',
      'Vue Router'
    ],
    category: 'Vue.js',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'What is Vue Router',
      }
    ]
  },
  {
    id: 148,
    name: 'HTTP/HTTPS: methods, headers, caching, and security',
    answer: 'assets/content/eng/answers/148-HTTPHTTPS.md',
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
        name: 'HTTP/HTTPS: methods, headers, caching, and security',
      }
    ]
  },
  {
    id: 149,
    name: 'Same-Origin Policy and CORS. How do browsers ensure security when exchanging data between different origins?',
    answer: 'assets/content/eng/answers/149-SameOriginPolicyCORS.md',
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
        name: 'Same-Origin Policy and CORS',
      }
    ]
  },
  {
    id: 150,
    name: 'Cookies. What are cookies and what are they used for?',
    answer: 'assets/content/eng/answers/150-CookiesSecurity.md',
    tags: [
      'Web Security',
      'cookies',
    ],
    category: 'Web Security',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'What are cookies and what are they used for?',
      },
      {
        name: 'Which cookie attributes help ensure security (Secure, HttpOnly, SameSite)?',
      }
    ]
  },
  {
    id: 151,
    name: 'How do browsers ensure the security of cookies when exchanging data between different origins?',
    answer: 'assets/content/eng/answers/151-CookiesSecurity.md',
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
        name: 'How do browsers ensure the security of cookies when exchanging data between different origins?',
      },
      {
        name: 'Which cookie attributes help ensure security (Secure, HttpOnly, SameSite)?',
      }
    ]
  },
  {
    id: 152,
    name: 'XSS (Cross-Site Scripting). What are XSS attacks and how to protect against them?',
    answer: 'assets/content/eng/answers/152-XSS.md',
    tags: [
      'Web Security',
      'XSS',
      'cross-site'
    ],
    category: 'Web Security',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'What are XSS attacks and how do they work',
      },
      {
        name: 'How to protect against XSS attacks',
      }
    ]
  },
  {
    id: 153,
    name: 'CSRF (Cross-Site Request Forgery). What are CSRF attacks and how to protect against them?',
    answer: 'assets/content/eng/answers/153-CSRF.md',
    tags: [
      'Web Security',
      'CSRF',
      'cross-site'
    ],
    category: 'Web Security',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'What are CSRF attacks and how do they work',
      },
      {
        name: 'How to protect against CSRF attacks',
      }
    ]
  },
  {
    id: 154,
    name: 'SQL Injection. What are SQL injections and how to protect against them?',
    answer: 'assets/content/eng/answers/154-SQL-Injection.md',
    tags: [
      'Web Security',
      'SQL Injection'
    ],
    category: 'Web Security',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'What are SQL injections and how do they work?',
      }
    ]
  },
  {
    id: 155,
    name: 'SSL/TLS. What are SSL/TLS and how do they ensure data security during transmission?',
    answer: 'assets/content/eng/answers/155-SSLTLS.md',
    tags: [
      'Web Security',
      'SSL',
      'TLS'
    ],
    category: 'Web Security',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'What are SSL/TLS and how do they ensure data security during transmission?',
      }
    ]
  },
  {
    id: 156,
    name: 'OAuth 2.0. What is OAuth 2.0 and how does it ensure secure authorization in web applications?',
    answer: 'assets/content/eng/answers/156-OAuth2.md',
    tags: [
      'Web Security',
      'OAuth 2.0',
      'authorization'
    ],
    category: 'Web Security',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'What is OAuth 2.0',
      }
    ]
  },
  {
    id: 157,
    name: 'JWT (JSON Web Tokens). What is JWT and how is it used for authentication and information exchange between client and server?',
    answer: 'assets/content/eng/answers/157-JWT.md',
    tags: [
      'Web Security',
      'JWT',
      'authentication'
    ],
    category: 'Web Security',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'What is JWT and how is it used for authentication and information exchange between client and server?',
      }
    ]
  },
  {
    id: 158,
    name: 'Reflow и Repaint. Why is working with the DOM considered very resource-intensive?',
    answer: 'assets/content/eng/answers/158-Why-working-with-DOM-is-resource-intensive.md',
    tags: [
      'DOM',
      'performance',
      'web development'
    ],
    category: 'Markup',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'DOM - Web API, not part of JavaScript',
      },
      {
        name: 'DOM - a complex hierarchical data structure',
      },
      {
        name: 'Reflow and Repaint',
      }
    ]
  },
  {
    id: 159,
    name: 'Ecmascript language types VS Ecmascript specification types',
    answer: 'assets/content/eng/answers/159-EcmascriptTypes.md',
    tags: [
      'JavaScript',
      'Ecmascript',
      'types'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'What are Ecmascript language types?',
      },
      {
        name: 'What are Ecmascript specification types?',
      },
      {
        name: 'What is the difference between language types and specification types in Ecmascript?',
      }
    ]
  },
  {
    id: 160,
    name: 'IntersectionObserver API. Tracking element visibility on the page and performance optimization',
    answer: 'assets/content/eng/answers/160-IntersectionObserver.md',
    tags: [
      'JavaScript',
      'IntersectionObserver',
      'Web APIs'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'What is IntersectionObserver API and what is it used for?',
      },
      {
        name: 'How to use IntersectionObserver API to optimize web application performance?',
      },
      {
        name: 'Which outdated techniques has the IntersectionObserver API replaced?',
      }
    ]
  },
  {
    id: 161,
    name: 'MutationObserver API. What is it and what is it used for?',
    answer: 'assets/content/eng/answers/161-MutationObserver.md',
    tags: [
      'JavaScript',
      'MutationObserver',
      'Web APIs'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'What is MutationObserver API and what is it used for?',
      },
      {
        name: 'How to use MutationObserver API to track changes in the DOM?',
      },
      {
        name: 'Which outdated techniques has the MutationObserver API replaced?',
      }
    ]
  },
  {
    id: 162,
    name: 'ResizeObserver API. What is it and what is it used for?',
    answer: 'assets/content/eng/answers/162-ResizeObserver.md',
    tags: [
      'JavaScript',
      'ResizeObserver',
      'Web APIs'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'What is ResizeObserver API and what is it used for?',
      },
      {
        name: 'How to use ResizeObserver API to track changes in the size of elements in the DOM?',
      },
      {
        name: 'Which outdated techniques has the ResizeObserver API replaced?',
      }
    ]
  },
  {
    id: 163,
    name: 'Performance API. What is it and what is it used for?',
    answer: 'assets/content/eng/answers/163-PerformanceAPI.md',
    tags: [
      'JavaScript',
      'Performance API',
      'Web APIs'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'What is Performance API and what is it used for?',
      },
    ]
  },
  {
    id: 164,
    name: 'Web Animations API. What is it and what is it used for?',
    answer: 'assets/content/eng/answers/164-WebAnimationsAPI.md',
    tags: [
      'JavaScript',
      'Web Animations API',
      'Web APIs'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'What is Web Animations API and what is it used for?',
      },
      {
        name: 'How to use Web Animations API to create animations in web applications?',
      },
      {
        name: 'Which outdated techniques has the Web Animations API replaced?',
      }
    ]
  },
  {
    id: 165,
    name: 'Web Speech API. What is it and what is it used for?',
    answer: 'assets/content/eng/answers/165-WebSpeechAPI.md',
    tags: [
      'JavaScript',
      'Web Speech API',
      'Web APIs'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'What is Web Speech API and what is it used for?',
      },
      {
        name: 'How to use Web Speech API for speech recognition and synthesis in web applications?',
      },
      {
        name: 'Which similar APIs are available for working with voice?',
      }
    ]
  },
  {
    id: 166,
    name: 'Web Bluetooth API. What is it and what is it used for?',
    answer: 'assets/content/eng/answers/166-WebBluetoothAPI.md',
    tags: [
      'JavaScript',
      'Web Bluetooth API',
      'Web APIs'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'What is Web Bluetooth API and what is it used for?',
      },
      {
        name: 'How to use Web Bluetooth API to interact with Bluetooth devices in web applications?',
      }
    ]
  },
  {
    id: 167,
    name: 'requestAnimationFrame. What is it and what is it used for?',
    answer: 'assets/content/eng/answers/167-requestAnimationFrame.md',
    tags: [
      'JavaScript',
      'requestAnimationFrame',
      'Web APIs'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'What is requestAnimationFrame and what is it used for?',
      },
      {
        name: 'How to use requestAnimationFrame to optimize animations in web applications?',
      }
    ]
  },
  {
    id: 168,
    name: 'requestIdleCallback. What is it and what is it used for?',
    answer: 'assets/content/eng/answers/168-requestIdleCallback.md',
    tags: [
      'JavaScript',
      'requestIdleCallback',
      'Web APIs'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'What is requestIdleCallback and what is it used for?',
      },
      {
        name: 'How to use requestIdleCallback to optimize task execution in web applications?',
      }
    ]
  },
  {
    id: 169,
    name: 'queueMicrotask. What is it and how does it work?',
    answer: 'assets/content/eng/answers/169-queueMicrotask.md',
    tags: [
      'JavaScript',
      'queueMicrotask',
      'Web APIs'
    ],
    category: 'JavaScript',
    level: QuestionLevels.middle,
    structure: [
      {
        name: 'What is queueMicrotask and what is it used for?',
      },
    ]
  },
  {
    id: 170,
    name: 'Hidden Classes and Inline Caching. How do JavaScript engines optimize code execution?',
    answer: 'assets/content/eng/answers/170-HiddenClasses.md',
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
        name: 'What are Hidden Classes and how do they help optimize code execution in JavaScript?',
      },
      {
        name: 'What is Inline Caching and how does it improve JavaScript performance?',
      }
    ]
  },
  {
    id: 171,
    name: 'Composite Layers and GPU. How do browsers use GPU for rendering web pages?',
    answer: 'assets/content/eng/answers/171-CompositeLayers.md',
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
        name: 'What are Composite Layers and how do they help optimize web page rendering?',
      },
      {
        name: 'How do browsers use GPU for rendering web pages and what benefits does it provide?',
      }
    ]
  }
] as Question[];
