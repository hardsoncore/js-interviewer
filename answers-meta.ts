import * as meta from './answers-meta.json';

// map of answer file path (as stored in questions.ts `answer`) -> last commit date (YYYY-MM-DD)
export const answersMeta: Record<string, string> = (() => {
  try {
    return meta as unknown as Record<string, string>;
  } catch {
    // In dev the file might not exist yet:
    return {};
  }
})();
