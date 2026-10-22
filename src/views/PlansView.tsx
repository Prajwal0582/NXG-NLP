import { useEffect, useState } from "react";
import type { BillingPeriod, GoalId, PlanId } from "../data/pricingPlans";
import { GOAL_CHIPS } from "../data/pricingPlans";
import type { ListPurchaseContext } from "../types";
import { PackageFirstLayout } from "./pricing/PackageFirstLayout";
import TalkToSalesModal from "./pricing/TalkToSalesModal";
import type { PricingOption } from "./pricing/creditValue";
import { PRICING_OPTIONS } from "./pricing/creditValue";

interface PlansViewProps {
  onBack: () => void;
  onSelectPlan: (planId: Exclude<PlanId, "buy-list">, billing: BillingPeriod) => void;
  onSearchLeads: () => void;
  /** When set, Pricing opens in purchase-list mode (Buy List recommended). */
  purchaseContext?: ListPurchaseContext | null;
  onBuyListCheckout?: () => void;
}

function readOptionParam(): PricingOption {
  const value = new URLSearchParams(window.location.search).get("option");
  return PRICING_OPTIONS.some((o) => o.id === value) ? (value as PricingOption) : "current";
}

/** Prototype-only switcher for presenting pricing options side by side. */
function OptionSwitcher({ option, onChange }: { option: PricingOption; onChange: (o: PricingOption) => void }) {
  const active = PRICING_OPTIONS.find((o) => o.id === option)!;
  return (
    <div
      data-option-switcher
      className="fixed bottom-4 left-1/2 z-40 flex w-max max-w-[calc(100%-32px)] -translate-x-1/2 flex-col items-center gap-1.5 rounded-xl bg-[#1D2939] p-2 text-white shadow-lg"
    >
      <div className="flex max-w-full items-center gap-1 overflow-x-auto" role="group" aria-label="Pricing option">
        <span className="shrink-0 px-2 text-[11px] font-semibold uppercase tracking-wide text-[#98A2B3]">Option</span>
        {PRICING_OPTIONS.map((o) => (
          <button
            key={o.id}
            type="button"
            aria-pressed={o.id === option}
            onClick={() => onChange(o.id)}
            className={`h-8 shrink-0 whitespace-nowrap rounded-lg px-3 text-xs font-medium transition-colors ${
              o.id === option ? "bg-white text-[#1D2939]" : "text-[#D0D5DD] hover:bg-white/10"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
      <p className="hidden px-2 text-center text-[11px] leading-4 text-[#98A2B3] sm:block">{active.description}</p>
    </div>
  );
}

const GOAL_TO_PLAN: Record<GoalId, PlanId> = {
  view: "basic",
  export: "pro",
  team: "team",
  list: "buy-list",
};

export default function PlansView({
  onBack,
  onSelectPlan,
  onSearchLeads,
  purchaseContext = null,
  onBuyListCheckout,
}: PlansViewProps) {
  const isPurchaseMode = Boolean(purchaseContext);
  const contextDefaultPlan: PlanId = isPurchaseMode ? "buy-list" : "pro";
  const contextDefaultGoal: GoalId | null = isPurchaseMode ? "list" : null;

  const [billing, setBilling] = useState<BillingPeriod>("annual");
  const [goal, setGoal] = useState<GoalId | null>(contextDefaultGoal);
  const [selectedPlan, setSelectedPlan] = useState<PlanId>(contextDefaultPlan);
  const [option, setOption] = useState<PricingOption>(readOptionParam);
  const [salesOpen, setSalesOpen] = useState(false);

  function changeOption(next: PricingOption) {
    setOption(next);
    const url = new URL(window.location.href);
    if (next === "current") url.searchParams.delete("option");
    else url.searchParams.set("option", next);
    window.history.replaceState(window.history.state, "", url);
  }

  // Re-init when entering/leaving purchase-list context (same component instance).
  useEffect(() => {
    setGoal(contextDefaultGoal);
    setSelectedPlan(contextDefaultPlan);
  }, [purchaseContext?.query, purchaseContext?.estimatedPrice, isPurchaseMode]);

  function clearRecommendation() {
    setGoal(contextDefaultGoal);
    setSelectedPlan(contextDefaultPlan);
  }

  function selectGoal(id: GoalId) {
    if (goal === id) {
      clearRecommendation();
      return;
    }
    setGoal(id);
    setSelectedPlan(GOAL_TO_PLAN[id]);
  }

  function selectCard(planId: PlanId) {
    setSelectedPlan(planId);
    const matching = GOAL_CHIPS.find((g) => g.recommends === planId);
    setGoal(matching ? matching.id : null);
  }

  function handleCta(planId: PlanId) {
    if (planId === "buy-list") {
      if (isPurchaseMode && onBuyListCheckout) {
        onBuyListCheckout();
        return;
      }
      onSearchLeads();
      return;
    }
    onSelectPlan(planId, billing);
  }

  // Click outside goal chips / pricing cards / header → restore context default
  useEffect(() => {
    function onPointerDown(e: MouseEvent) {
      const el = e.target as HTMLElement | null;
      if (!el) return;
      if (
        el.closest("[data-goal-chip]") ||
        el.closest("[data-plan-card]") ||
        el.closest("[data-pricing-header]") ||
        el.closest("[data-keep-selection]") ||
        el.closest("[data-option-switcher]") ||
        el.closest("[data-sales-modal]")
      )
        return;
      const isDefault = goal === contextDefaultGoal && selectedPlan === contextDefaultPlan;
      if (!isDefault) clearRecommendation();
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [goal, selectedPlan, contextDefaultGoal, contextDefaultPlan]);

  // One badge — MOST POPULAR on Pro by default; RECOMMENDED on the goal / purchase-context plan.
  const badgePlanId: PlanId = goal !== null ? GOAL_TO_PLAN[goal] : isPurchaseMode ? "buy-list" : "pro";
  const activeBadgeLabel: "MOST POPULAR" | "RECOMMENDED" =
    goal !== null || isPurchaseMode ? "RECOMMENDED" : "MOST POPULAR";

  const buyListPriceDisplay = purchaseContext ? purchaseContext.estimatedPrice.toLocaleString("en-US") : "Custom price";
  const buyListSupportLines = purchaseContext
    ? [`${purchaseContext.resultCount.toLocaleString()} qualified leads`, "One-time purchase"]
    : ["Price will be calculated based on selected records."];
  const buyListCta = isPurchaseMode ? "Proceed to checkout →" : "Search for leads →";

  return (
    <div className="h-screen w-full overflow-y-auto overflow-x-hidden bg-[#F2F4F7]">
      <PackageFirstLayout
        billing={billing}
        goal={goal}
        selectedPlan={selectedPlan}
        badgePlanId={badgePlanId}
        activeBadgeLabel={activeBadgeLabel}
        purchaseContext={purchaseContext}
        isPurchaseMode={isPurchaseMode}
        buyListPriceDisplay={buyListPriceDisplay}
        buyListSupportLines={buyListSupportLines}
        buyListCta={buyListCta}
        onSelectGoal={selectGoal}
        onSelectCard={selectCard}
        onCta={handleCta}
        onSelectPlan={onSelectPlan}
        onBack={onBack}
        onBillingChange={setBilling}
        option={option}
        onTalkToSales={() => setSalesOpen(true)}
      />
      {/* Room for the floating option switcher */}
      <div aria-hidden className="h-24" />
      {!salesOpen && <OptionSwitcher option={option} onChange={changeOption} />}
      {salesOpen && <TalkToSalesModal onClose={() => setSalesOpen(false)} />}
    </div>
  );
}
