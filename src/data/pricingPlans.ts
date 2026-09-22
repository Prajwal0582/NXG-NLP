export type BillingPeriod = "monthly" | "annual";
export type PlanId = "basic" | "pro" | "team" | "buy-list";
export type GoalId = "view" | "export" | "team" | "list";

export const GOAL_CHIPS: { id: GoalId; label: string; recommends: PlanId }[] = [
  { id: "view", label: "I only need to view data", recommends: "basic" },
  { id: "export", label: "I send emails to prospects and export data", recommends: "pro" },
  { id: "team", label: "I have a team that manages prospecting", recommends: "team" },
  { id: "list", label: "I need a one-time list", recommends: "buy-list" },
];

export interface PlanPricing {
  display: string;
  suffix: string;
  supportLines: string[];
  benefit: string;
  strikePrice?: string;
}

export interface PlanDefinition {
  id: PlanId;
  category: string;
  name: string;
  description: string;
  popular?: boolean;
  cta: string;
  ctaPrimary?: boolean;
  monthly: PlanPricing;
  annual: PlanPricing;
  accessTitle: string;
  accessItems: string[];
  includedTitle: string;
  includedItems: { label: string; bold?: boolean; info?: boolean; chevron?: boolean }[];
  notIncludedTitle?: string;
  notIncludedItems?: { label: string; info?: boolean; nested?: boolean }[];
  subscriptionFeaturesExpandable?: boolean;
  addons?: { label: string }[];
}

export const PLANS: PlanDefinition[] = [
  {
    id: "basic",
    category: "LEAD EXPLORATION",
    name: "Basic",
    description: "Discover, research, and organize your ideal customers.",
    cta: "Continue with Basic →",
    monthly: {
      display: "99",
      suffix: "/mo",
      supportLines: ["Per seat per month billed monthly", "Annual contract"],
      benefit: "Unlimited view only access",
    },
    annual: {
      display: "990",
      suffix: "/y",
      supportLines: ["$1,188/yr - Billed annually", "Only 10 months’ cost when paid upfront"],
      benefit: "Unlimited view only access",
      strikePrice: "1,188",
    },
    accessTitle: "View only access to:",
    accessItems: [
      "US Business & Consumer Data",
      "US New Business & New Movers",
      "Canadian Business & Consumer Data",
    ],
    includedTitle: "Included Features",
    includedItems: [
      { label: "Weekly data refresh" },
      { label: "Customer profile analysis" },
      { label: "Dedicated advisor & expert guidance" },
      { label: "Direct mail campaigns", info: true },
    ],
    notIncludedTitle: "Not Included",
    notIncludedItems: [
      { label: "Credits (requires additional purchase)" },
      { label: "Export leads (Credits required)" },
      { label: "Email unlocks (Credits required)" },
      { label: "Email Campaigns (Credits required)" },
      { label: "CRM integration", info: true },
    ],
    addons: [
      { label: "Consumer cellphone" },
      { label: "Buyer Intent" },
      { label: "Purchase Signals" },
    ],
  },
  {
    id: "pro",
    category: "PROSPECT & EXPORT",
    name: "Pro",
    description: "Connect with prospects, run campaigns, and accelerate your growth",
    popular: true,
    cta: "Choose Pro →",
    ctaPrimary: true,
    monthly: {
      display: "149",
      suffix: "/mo",
      supportLines: ["Per seat per month billed monthly", "Annual contract"],
      benefit: "500 credits/month",
    },
    annual: {
      display: "1,490",
      suffix: "/y",
      supportLines: ["$1,788/yr - Billed annually", "Only 10 months’ cost when paid upfront"],
      benefit: "6000 credits/yr (provided upfront)",
      strikePrice: "1,788",
    },
    accessTitle: "View + Export access to:",
    accessItems: [
      "US Business & Consumer Data",
      "US New Mover & New Businesses",
      "Canadian Business & Consumer Data",
    ],
    includedTitle: "Included Features",
    includedItems: [
      { label: "Everything in Basic", bold: true, chevron: true },
      { label: "Credits (500/month)" },
      { label: "Export leads (uses credits)" },
      { label: "Email unlocks (uses credits)" },
      { label: "Email Campaigns (uses credits)" },
      { label: "CRM integration", info: true },
      { label: "Direct mail campaigns", info: true },
    ],
    notIncludedTitle: "Not Included",
    notIncludedItems: [
      { label: "Admin control" },
      { label: "Lead assignment & team reporting" },
      { label: "Additional user license" },
    ],
    addons: [
      { label: "Consumer cellphone" },
      { label: "Buyer Intent" },
      { label: "Purchase Signals" },
    ],
  },
  {
    id: "team",
    category: "SALES COLLABORATION",
    name: "Team",
    description: "Pro plus collaboration, reporting, and multi-user management.",
    cta: "Choose Team →",
    monthly: {
      display: "299",
      suffix: "/mo",
      supportLines: ["5 seats per month billed monthly", "Annual contract"],
      benefit: "500 shared credits/month",
    },
    annual: {
      display: "2,990",
      suffix: "/y",
      supportLines: ["$3,588/yr - Billed annually", "Only 10 months’ cost when paid upfront"],
      benefit: "6000 credits/yr (provided upfront)",
      strikePrice: "3,588",
    },
    accessTitle: "Unlimited access to:",
    accessItems: [
      "US Business & Consumer Data",
      "US New Mover & New Businesses",
      "Canadian Business & Consumer Data",
    ],
    includedTitle: "Included Features",
    includedItems: [
      { label: "Everything in Pro", bold: true, chevron: true },
      { label: "5 user licenses included" },
      { label: "Assign leads to team members" },
      { label: "Track team activities" },
      { label: "Team performance reporting" },
      { label: "Admin oversight" },
      { label: "Centralized lead management" },
      { label: "Priority account support" },
      { label: "On-demand additional licenses" },
      { label: "Team collaboration" },
      { label: "Dedicated onboarding support" },
      { label: "CRM integration", info: true },
      { label: "Direct mail campaigns", info: true },
    ],
    addons: [
      { label: "Consumer cellphone" },
      { label: "Buyer Intent" },
      { label: "Purchase Signals" },
    ],
  },
  {
    id: "buy-list",
    category: "ONE-TIME PURCHASE",
    name: "Buy list",
    description: "Perfect for one-time outreach campaigns. No subscription required.",
    cta: "Search for leads →",
    monthly: {
      display: "-.--",
      suffix: "",
      supportLines: ["Price will be calculated based on selected records."],
      benefit: "12 month free list access on export",
    },
    annual: {
      display: "-.--",
      suffix: "",
      supportLines: ["Price will be calculated based on selected records."],
      benefit: "12 month free list access on export",
    },
    accessTitle: "",
    accessItems: [],
    includedTitle: "Included Features",
    includedItems: [
      { label: "Export available immediately" },
      { label: "30 Days full access to list prospecting functionalities." },
      { label: "12 Months access to re-export" },
      { label: "No recurring subscription" },
      { label: "One-time payment" },
    ],
    notIncludedTitle: "Not Included",
    notIncludedItems: [
      { label: "Subscription features" },
      { label: "Weekly data refresh", nested: true },
      { label: "Email and direct mail campaign", nested: true },
      { label: "CRM integration", nested: true },
      { label: "Buyer intent", nested: true },
      { label: "Consumer cellphone", nested: true },
      { label: "Team collaboration", nested: true },
    ],
    subscriptionFeaturesExpandable: true,
  },
];

export type CellVal = true | false | string;

export interface CompareRow {
  label: string;
  info?: boolean;
  basic: CellVal;
  pro: CellVal;
  team: CellVal;
}

export const COMPARE_SECTIONS: { title: string; rows: CompareRow[] }[] = [
  {
    title: "Sales tools",
    rows: [
      { label: "User licenses", basic: "1", pro: "1", team: "Includes 5" },
      { label: "Business & Consumer databases", basic: true, pro: true, team: true },
      { label: "Contact information", basic: true, pro: true, team: true },
      { label: "Weekly data refresh", basic: true, pro: true, team: true },
      { label: "Mobile app", basic: true, pro: true, team: true },
      { label: "Lead management", basic: true, pro: true, team: true },
      {
        label: "CRM Integration",
        info: true,
        basic: "unlock with credit purchase",
        pro: "uses credits",
        team: "uses credits",
      },
      { label: "Territory management", basic: false, pro: false, team: true },
      {
        label: "Exports",
        basic: "unlock with credit purchase",
        pro: "uses credits",
        team: "uses credits",
      },
      { label: "Performance tracking", basic: true, pro: true, team: true },
    ],
  },
  {
    title: "Engagement tools",
    rows: [
      { label: "Customer profile analysis", basic: true, pro: true, team: true },
      {
        label: "Email addresses",
        basic: "unlock with credit purchase",
        pro: "uses credits",
        team: "uses credits",
      },
      {
        label: "Email marketing",
        info: true,
        basic: "unlock with credit purchase",
        pro: true,
        team: true,
      },
      { label: "Direct mail marketing", info: true, basic: true, pro: true, team: true },
    ],
  },
  {
    title: "Customer success",
    rows: [
      { label: "Training & support", basic: true, pro: true, team: true },
      { label: "Dedicated advisor", basic: true, pro: true, team: true },
    ],
  },
];

export const ADDON_ROWS = [
  {
    title: "Buyer Intent",
    description: "Intent signals based on businesses actively seeking your solutions.",
    detail: "Add to your plan for an additional $50/month for each user.",
  },
  {
    title: "Purchase Signals",
    description: "Signals based on household purchase behavior and propensity.",
    detail: "Add to your plan for an additional $50/month for each user.",
  },
  {
    title: "Consumer cellphones",
    description: "Append consumer cellphone numbers where available.",
    detail: "Talk to a rep to get more details.",
  },
];

export function planPriceLabel(planId: Exclude<PlanId, "buy-list">, billing: BillingPeriod): string {
  const plan = PLANS.find((p) => p.id === planId)!;
  const pricing = billing === "monthly" ? plan.monthly : plan.annual;
  return `$${pricing.display}${pricing.suffix}`;
}
