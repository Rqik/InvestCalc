import type { AppPage } from '../types/navigation';

export const APP_ROUTES: Array<{ id: AppPage; hash: string; label: string }> = [
  { id: 'calculator', hash: '#calculator', label: 'Калькулятор' },
  { id: 'retirement', hash: '#retirement', label: 'Пенсия' },
];

const CALCULATOR_SECTION_HASHES = new Set(['#scenarios', '#methodology', '#examples', '#faq']);
const RETIREMENT_SECTION_HASHES = new Set([
  '#retirement-results',
  '#retirement-timeline',
  '#retirement-advice',
]);

export function getHashForPage(page: AppPage) {
  return APP_ROUTES.find((route) => route.id === page)?.hash ?? '#calculator';
}

export function getPageFromHash(hash: string): AppPage | null {
  const route = APP_ROUTES.find((item) => item.hash === hash);

  if (route) {
    return route.id;
  }

  if (RETIREMENT_SECTION_HASHES.has(hash)) {
    return 'retirement';
  }

  if (CALCULATOR_SECTION_HASHES.has(hash)) {
    return 'calculator';
  }

  return null;
}
