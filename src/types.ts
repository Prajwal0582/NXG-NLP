export type View =
  | 'scenario-launch'
  | 'landing'
  | 'processing'
  | 'results'
  | 'manual-search'
  | 'saved-lists'
  | 'purchase'
  | 'purchase-success'
  | 'plans';

export type UserScenario =
  | 'freemium-24'
  | 'freemium-5'
  | 'freemium-0'
  | 'subscriber-free'
  | 'subscriber-credit'
  | 'subscriber-credit-0';

export type ActiveTab = 'business' | 'consumer';

export interface AppState {
  view: View;
  scenario: UserScenario;
  activeTab: ActiveTab;
  promptsRemaining: number;
  creditsRemaining: number;
  freePromptsTotal: number;
  submittedPrompt: string;
  listName: string;
  listSaved: boolean;
  purchaseComplete: boolean;
}
