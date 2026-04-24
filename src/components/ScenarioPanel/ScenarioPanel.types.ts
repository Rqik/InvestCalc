import type { Scenario } from '@/types/finance';

export type ScenarioPanelProps = {
  scenarioName: string;
  scenarios: Scenario[];
  selectedScenarioId: string | null;
  storageError?: string | null;
  onScenarioNameChange: (value: string) => void;
  onSave: () => void;
  onSelect: (scenarioId: string) => void;
  onLoad: (scenario: Scenario) => void;
  onDelete: (scenarioId: string) => void;
};
