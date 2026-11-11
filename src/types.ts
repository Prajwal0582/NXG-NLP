export type View =
  | 'scenario-launch'
  | 'landing'
  | 'processing'
  | 'results'
  | 'manual-search'
  | 'saved-lists'
  | 'purchase'
  | 'purchase-success'
  | 'plans'
  | 'subscription-checkout'
  | 'export-config';

export type BillingPeriod = 'monthly' | 'annual';
export type SelectedPlanId = 'basic' | 'pro' | 'team';

/** Where a list came from when Pricing / checkout opens with it. */
export type ListSource = "signalfuse-results" | "manual-search" | "saved-list";

/** Contextual one-time list purchase (search or saved list → Pricing / checkout). */
export interface ListPurchaseContext {
  pricingMode: "purchase-list";
  source: ListSource;
  query: string;
  scenarioId: string;
  listName: string;
  resultCount: number;
  estimatedPrice: number;
  /**
   * Buy list is badged RECOMMENDED and selected (Build my list → search → See options, NLP "Purchase list").
   * Otherwise Pro stays MOST POPULAR and selected, and Buy list just shows the list's count and price.
   */
  recommendBuyList?: boolean;
}

export type UserScenario =
  | 'freemium-24'
  | 'freemium-5'
  | 'freemium-0'
  /** Freemium who bought a subscription that is still being verified (order processing). */
  | 'freemium-activating'
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
