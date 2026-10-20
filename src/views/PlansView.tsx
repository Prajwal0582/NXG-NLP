import { useEffect, useState } from "react";
import type { BillingPeriod, GoalId, PlanId } from "../data/pricingPlans";
import { GOAL_CHIPS } from "../data/pricingPlans";
import type { ListPurchaseContext } from "../types";
import { PackageFirstLayout } from "./pricing/PackageFirstLayout";

interface PlansViewProps {
  onBack: () => void;
  onSelectPlan: (planId: Exclude<PlanId, "buy-list">, billing: BillingPeriod) => void;
  onSearchLeads: () => void;
  /** When set, Pricing opens in purchase-list mode (Buy List recommended). */
  purchaseContext?: ListPurchaseContext | null;
  onBuyListCheckout?: () => void;
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
      if (el.closest("[data-goal-chip]") || el.closest("[data-plan-card]") || el.closest("[data-pricing-header]")) return;
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
      />
    </div>
  );
}
