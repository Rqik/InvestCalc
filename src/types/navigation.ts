import type React from 'react';

export type AppPage = 'calculator' | 'retirement';

export type WorkspaceSectionId =
  | 'results'
  | 'scenarios'
  | 'growth-chart'
  | 'yearly-plan'
  | 'methodology'
  | 'examples'
  | 'faq'
  | 'retirement-results'
  | 'retirement-timeline'
  | 'retirement-advice';

export type WorkspaceSectionRefs = Partial<
  Record<WorkspaceSectionId, React.RefObject<HTMLElement>>
>;
