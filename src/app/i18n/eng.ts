export const eng = {
  COMMON: {
    BACK: 'Back',
  },
  TABS: {
    QUIZ: 'Quiz',
    THEORY: 'Theory',
    PROFILE: 'Profile',
  },
  PROFILE: {
    TITLE: 'Profile',
    AVATAR_ALT: 'Profile avatar',
    PROGRESS: 'Progress',
    DAYS_STREAK: 'Days streak',
    SETTINGS: 'Settings',
    THEME: 'Theme',
    THEME_LIGHT: 'Light',
    THEME_DARK: 'Dark',
    LANGUAGE: 'Language',
    APP_VERSION: 'App version',
    ABOUT: 'About',
    HOW_TO_LEARN: 'How to learn',
    STAR_ON_GITHUB: 'Star on GitHub',
    CLEAR_RESULTS: 'Clear Results',
    CLEAR_ALERT: {
      HEADER: 'All your progress will be lost',
      MESSAGE: 'Are you sure you want to clear your progress and start over again?',
      CANCEL: 'Cancel',
      CONFIRM: 'Clear',
    },
  },
  QUESTIONS: {
    TITLE: 'Theory Questions',
    SEARCH_PLACEHOLDER: 'Search by topic, keyword or ID',
  },
  QUESTION_INFO: {
    TITLE: 'Question №{{id}}',
    UPDATED: 'Updated {{date}}',
    MARK_COMPLETE: 'Mark question as complete',
    PREV: 'Prev',
    NEXT: 'Next',
    LOAD_ERROR: {
      TITLE: '404 - Answer Text Not Found',
      TEXT: 'Help us fill the gap — we\'d love your contribution via a',
      LINK: 'Pull Request on GitHub',
    },
  },
  QUIZ: {
    RANDOMIZE: 'Randomize Questions',
    NUMBER: '№{{id}}',
    TAP_TO_READ: 'Tap to read theory',
    PROGRESS: 'Progress',
    SKIP: 'Skip',
    CHECK_ANSWER: 'Check your answer',
  },
  ANSWER_STRUCTURE: {
    TITLE: 'Answer structure for question №{{id}}',
    HINT: 'Select the points you covered in your answer - this helps indicate how complete your response was.',
    SAVE: 'Save your answer progress',
  },
  HOW_TO_LEARN: {
    TITLE: 'How to learn',
    HERO: 'Interview-ready in three passes',
    INTRO: 'An interview is an oral exam: you get 60–90 seconds to give a clear, confident answer before the follow-ups begin. Good news — about 20% of the material delivers 80% of the result, and this app is built around exactly that 20%. Here is the whole plan:',
    OUTRO: 'That\'s it — no walls of text, no cramming marathons. Just a simple loop that fits into your day. Good luck out there! 🚀',
    STEPS: {
      S1: {
        TITLE: 'Pass 1 — read the Cores',
        TEXT: 'Every answer starts with a Core: the 1–2 minute spoken version — definition, key idea, a minimal example, classic pitfalls. That is exactly what interviewers expect to hear first, so simply read the Cores topic by topic.',
      },
      S2: {
        TITLE: 'Rehearse out loud in the Quiz',
        TEXT: 'Answer every question aloud, as if the interviewer were already in the room. Then open the answer structure and honestly tick only the points you actually said — anything below 100% will keep coming back until you own it.',
      },
      S3: {
        TITLE: 'Pass 2 — unfold the Deep Dives',
        TEXT: 'Once the Cores feel easy, open the Deep Dives: under-the-hood mechanics, edge cases and senior-level details for when the interviewer starts digging.',
      },
      S4: {
        TITLE: '15 minutes a day is enough',
        TEXT: 'Cores are phone-sized on purpose — perfect for a commute or a coffee queue. A short daily session beats any cramming marathon and keeps your streak alive.',
      },
      S5: {
        TITLE: 'Pass 3 — the night before',
        TEXT: 'Skim the Cores one last time and run the Quiz in random order as a final dress rehearsal. Then walk in and nail the first 90 seconds of every answer.',
      },
    },
  },
};

export type Translations = typeof eng;
