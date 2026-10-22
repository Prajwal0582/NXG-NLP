import type { BillingPeriod } from "../../data/pricingPlans";
import { PLANS } from "../../data/pricingPlans";

/** Prototype pricing options shown side by side for review (Current = shipped layout). */
export type PricingOption = "current" | "a" | "b" | "c";

export const PRICING_OPTIONS: { id: PricingOption; label: string; description: string }[] = [
  { id: "current", label: "Current", description: "Shipped layout, unchanged." },
  { id: "a", label: "A · Light touch", description: "Credit value in the facts box, Talk to sales link on Team." },
  { id: "b", label: "B · Value-led", description: "Credit value strip under each price, sales link in Team's users fact." },
  { id: "c", label: "C · Guided comparison", description: "Basic vs Pro credit math and a seats banner above the cards." },
];

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
  const difference = proPrice - basicPrice;
  const paygCredits = Math.floor(difference / PAYG_CREDIT_RATE);
  const effectiveRate = difference / included;
  return {
    period: billing === "annual" ? "yr" : "mo",
    included,
    proPrice,
    difference,
    paygCredits,
    includedValue: included * PAYG_CREDIT_RATE,
    effectiveRate,
    savingsPct: Math.round((1 - effectiveRate / PAYG_CREDIT_RATE) * 100),
    extraPct: Math.round((included / paygCredits - 1) * 100),
  };
}

export const fmtNumber = (n: number) => n.toLocaleString("en-US");
export const fmtMoney = (n: number) => `$${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
export const fmtRate = (n: number) => `$${n.toFixed(2)}`;
