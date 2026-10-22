import type { BillingPeriod } from "../../data/pricingPlans";
import { PLANS } from "../../data/pricingPlans";

/** Prototype pricing options shown side by side for review (Current = shipped layout). */
export type PricingOption = "current" | "b" | "b2" | "b3";

export const PRICING_OPTIONS: { id: PricingOption; label: string; description: string }[] = [
  { id: "current", label: "Current", description: "Shipped layout, unchanged." },
  { id: "b", label: "B · Value-led", description: "Credit chip under the price, 'you pay / you get' box on Pro, seats alert on Team." },
  { id: "b2", label: "B2 · Value band", description: "Credit band on every card, Basic vs Pro cost to get the credits, seats ask in Team's facts." },
  { id: "b3", label: "B3 · Value-led v2", description: "B without the goal picker; iterating from here." },
];

/** Options built on B's value-led cards. */
export const isValueLed = (o: PricingOption) => o === "b" || o === "b3";

/** Options without the "Tell us your goal" picker (no auto-recommended plan). */
export const hidesGoalPicker = (o: PricingOption) => o === "b3";

/** Ad hoc (pay-as-you-go) credit rate available to Basic users. */
export const PAYG_CREDIT_RATE = 0.15;

function planPrice(id: "basic" | "pro", billing: BillingPeriod) {
  const plan = PLANS.find((p) => p.id === id)!;
  return Number((billing === "monthly" ? plan.monthly : plan.annual).display.replace(/,/g, ""));
}

/** Basic vs Pro credit math, derived from plan prices so it follows billing period. */
export function creditValue(billing: BillingPeriod) {
  const included = billing === "annual" ? 6000 : 500;
  const basicPrice = planPrice("basic", billing);
  const proPrice = planPrice("pro", billing);
  return {
    included,
    basicPrice,
    proPrice,
    difference: proPrice - basicPrice,
    includedValue: included * PAYG_CREDIT_RATE,
  };
}

export const fmtNumber = (n: number) => n.toLocaleString("en-US");
export const fmtMoney = (n: number) => `$${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
export const fmtRate = (n: number) => `$${n.toFixed(2)}`;
