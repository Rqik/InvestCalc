import type React from 'react';
import type { FinanceSnapshot, Inputs } from '@/types/finance';

export type HelpPanelsSectionRefs = {
  methodology: React.RefObject<HTMLElement>;
  examples: React.RefObject<HTMLElement>;
  faq: React.RefObject<HTMLElement>;
};

export type HelpPanelsProps = {
  inputs: Inputs;
  snapshot: FinanceSnapshot;
  onApplyExample: (inputs: Inputs) => void;
  sectionRefs: HelpPanelsSectionRefs;
};
