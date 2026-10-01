import { useEffect, useState } from "react";
import type { BillingPeriod, GoalId, PlanId, CellVal, FeatureItem } from "../data/pricingPlans";
import {
  ADDON_ROWS,
  COMPARE_SECTIONS,
  GOAL_CHIPS,
  PLANS,
  resolveTooltip,
} from "../data/pricingPlans";
import type { ListPurchaseContext } from "../types";

interface PlansViewProps {
  onBack: () => void;
  onSelectPlan: (planId: Exclude<PlanId, "buy-list">, billing: BillingPeriod) => void;
  onSearchLeads: () => void;
  /** When set, Pricing opens in purchase-list mode (Buy List recommended). */
  purchaseContext?: ListPurchaseContext | null;
  onBuyListCheckout?: () => void;
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 14 14" fill="none" className="size-3.5 shrink-0" aria-hidden>
      <circle cx="7" cy="7" r="7" fill="#0BA38C" />
      <path d="M4 7l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 14 14" fill="none" className="size-3.5 shrink-0" aria-hidden>
      <circle cx="7" cy="7" r="5.5" stroke="#C55418" strokeWidth="1.3" />
      <path d="M4.75 4.75l4.5 4.5M9.25 4.75l-4.5 4.5" stroke="#C55418" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function ChevronIcon({ expanded }: { expanded: boolean }) {
  return (
    <svg
      viewBox="0 0 14 14"
      className={`size-3.5 shrink-0 text-[#475467] transition-transform ${expanded ? "rotate-180" : ""}`}
      fill="none"
      aria-hidden
    >
      <path d="M3.5 5.5L7 9l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg viewBox="0 0 14 14" fill="none" className="size-3.5 shrink-0 text-[#98A2B3]" aria-hidden>
      <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M7 6.5v3M7 4.5h.01" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

/** Dark navy tooltip above an info icon (hover / focus). */
function InfoTip({ text }: { text: string }) {
  return (
    <span className="relative inline-flex shrink-0 group/tip">
      <button
        type="button"
        className="inline-flex rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#008DC3]/40"
        aria-label="More information"
      >
        <InfoIcon />
      </button>
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-[calc(100%+6px)] left-1/2 z-[60] w-max max-w-[260px] -translate-x-1/2 rounded-md bg-[#1D2939] px-3 py-2 text-center text-xs font-normal leading-[18px] text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover/tip:opacity-100 group-focus-within/tip:opacity-100"
      >
        {text}
        <span
          className="absolute left-1/2 top-full -translate-x-1/2 border-[5px] border-transparent border-t-[#1D2939]"
          aria-hidden
        />
      </span>
    </span>
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 14 14" fill="none" className="size-3.5 shrink-0 text-[#0BA38C]" aria-hidden>
      <path d="M7 2.5v9M2.5 7h9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function CheckCircleOutline() {
  return (
    <svg viewBox="0 0 14 14" fill="none" className="size-3.5 shrink-0 text-[#026B5C]" aria-hidden>
      <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M4.5 7.2l1.7 1.7 3.4-3.6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg viewBox="0 0 14 14" fill="none" className="size-3.5 shrink-0 text-[#475467]" aria-hidden>
      <path d="M1.5 7s2.2-3.5 5.5-3.5S12.5 7 12.5 7s-2.2 3.5-5.5 3.5S1.5 7 1.5 7z" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="7" cy="7" r="1.6" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function WalletIcon() {
  return (
    <svg viewBox="0 0 14 14" fill="none" className="size-3.5 shrink-0 text-[#475467]" aria-hidden>
      <rect x="1.5" y="3.5" width="11" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M1.5 6h11" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="10" cy="8.5" r="0.9" fill="currentColor" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg viewBox="0 0 14 14" fill="none" className="size-3.5 shrink-0 text-[#475467]" aria-hidden>
      <circle cx="5" cy="5" r="2" stroke="currentColor" strokeWidth="1.2" />
      <path d="M1.5 11.5c0-1.8 1.6-3 3.5-3s3.5 1.2 3.5 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="10" cy="5.5" r="1.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M12.5 11.5c0-1.3-1-2.3-2.5-2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function MedalIcon() {
  return (
    <svg viewBox="0 0 14 14" fill="none" className="size-3.5 shrink-0 text-[#475467]" aria-hidden>
      <circle cx="7" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.2" />
      <path d="M5 1.5l2 2.5 2-2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SalesToolsIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="size-5 text-[#475467]" aria-hidden>
      <rect x="3" y="4" width="6" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" />
      <rect x="11" y="4" width="6" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" />
      <rect x="3" y="11" width="6" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" />
      <rect x="11" y="11" width="6" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

function EngagementIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="size-5 text-[#475467]" aria-hidden>
      <path d="M4 5.5A2.5 2.5 0 016.5 3h7A2.5 2.5 0 0116 5.5v5A2.5 2.5 0 0113.5 13H9l-3.5 3v-3H6.5A2.5 2.5 0 014 10.5v-5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}

function CustomerSuccessIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="size-5 text-[#475467]" aria-hidden>
      <path d="M4 12v-2a6 6 0 0112 0v2" stroke="currentColor" strokeWidth="1.3" />
      <path d="M16 13a1.5 1.5 0 01-1.5 1.5h-.5V11h2A1.5 1.5 0 0116 12.5V13zM4 13a1.5 1.5 0 001.5 1.5H6V11H4A1.5 1.5 0 004 12.5V13z" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

function DiamondIcon() {
  /* Font Awesome–style gem for Additional Features */
  return (
    <svg viewBox="0 0 20 20" fill="none" className="size-5 shrink-0 text-[#1D2939]" aria-hidden>
      <path
        d="M5.75 3.25h8.5L17.25 7.5 10 17.25 2.75 7.5 5.75 3.25z"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinejoin="round"
      />
      <path d="M2.75 7.5h14.5" stroke="currentColor" strokeWidth="1.35" />
      <path d="M7 3.25L5.5 7.5 10 17.25M13 3.25l1.5 4.25L10 17.25" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}

function CompareXIcon() {
  return (
    <svg viewBox="0 0 14 14" fill="none" className="size-3.5 shrink-0" aria-hidden>
      <circle cx="7" cy="7" r="7" fill="#D92D20" />
      <path d="M4.5 4.5l5 5M9.5 4.5l-5 5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function AddonChip() {
  return (
    <span className="inline-flex h-6 items-center rounded px-2 text-xs font-medium leading-[18px] text-[#F8F7FF] bg-[#764FD9]">
      Add-on
    </span>
  );
}

function CellValue({ val, rowLabel }: { val: CellVal; rowLabel: string }) {
  if (val === true) return <div className="flex justify-center"><CheckIcon /></div>;
  if (val === false) return <div className="flex justify-center"><CompareXIcon /></div>;
  const tip = resolveTooltip(val, rowLabel);
  return (
    <span className="text-sm font-medium leading-5 text-[#475467] text-center inline-flex items-center gap-1 justify-center">
      {val}
      {tip ? <InfoTip text={tip} /> : null}
    </span>
  );
}

function sectionAccent(title: string) {
  if (title === "Sales tools") return "border-[#D0D5DD]";
  if (title === "Engagement tools") return "border-[#9CD1C2]";
  return "border-[#BEC6E2]";
}

function MailIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-4 shrink-0 text-[#475467]" aria-hidden>
      <rect x="2" y="3.5" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M2.5 4.5L8 8.5l5.5-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DollarCircleIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-4 shrink-0 text-[#475467]" aria-hidden>
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.3" />
      <text
        x="8"
        y="11"
        textAnchor="middle"
        fill="currentColor"
        fontSize="8"
        fontWeight="600"
        fontFamily="Inter, sans-serif"
      >
        $
      </text>
    </svg>
  );
}

function goalChipIcon(id: GoalId) {
  if (id === "view") return <EyeIcon />;
  if (id === "export") return <MailIcon />;
  if (id === "team") return <UsersIcon />;
  return <DollarCircleIcon />;
}

function BenefitIcon({ planId }: { planId: PlanId }) {
  if (planId === "basic") return <EyeIcon />;
  if (planId === "pro") return <WalletIcon />;
  if (planId === "team") return <UsersIcon />;
  return <MedalIcon />;
}

function sectionIcon(title: string) {
  if (title === "Sales tools") return <SalesToolsIcon />;
  if (title === "Engagement tools") return <EngagementIcon />;
  return <CustomerSuccessIcon />;
}

const CARD_SHADOW =
  "0px 1px 3px rgba(71,84,103,0.04), 0px 5px 5px rgba(71,84,103,0.03), 0px 11px 7px rgba(71,84,103,0.02), 0px 19px 8px rgba(71,84,103,0.01)";

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
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    for (const plan of PLANS) {
      for (const item of plan.includedItems) {
        if (item.expandable) init[`${plan.id}:inc:${item.label}`] = Boolean(item.defaultExpanded);
      }
      for (const item of plan.notIncludedItems ?? []) {
        if (item.expandable) init[`${plan.id}:exc:${item.label}`] = Boolean(item.defaultExpanded);
      }
    }
    return init;
  });

  // Re-init when entering/leaving purchase-list context (same component instance).
  useEffect(() => {
    setGoal(contextDefaultGoal);
    setSelectedPlan(contextDefaultPlan);
  }, [purchaseContext?.query, purchaseContext?.estimatedPrice, isPurchaseMode]);

  function toggleExpand(key: string) {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function renderFeatureRows(
    planId: PlanId,
    section: "inc" | "exc",
    items: FeatureItem[],
    Icon: typeof CheckIcon,
  ) {
    return items.map((item) => {
      const key = `${planId}:${section}:${item.label}`;
      const isOpen = Boolean(expanded[key]);
      const isExpandable = Boolean(item.expandable && item.children?.length);

      return (
        <div key={item.label} className="flex flex-col gap-4">
          {isExpandable ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleExpand(key);
              }}
              className="flex w-full items-start gap-2 text-left cursor-pointer"
              aria-expanded={isOpen}
            >
              <div className="pt-0.5"><Icon /></div>
              <span className={`text-sm leading-5 text-[#475467] flex-1 ${item.bold ? "font-semibold" : "font-normal"}`}>
                {item.label}
              </span>
              {item.info && resolveTooltip(item.label) ? (
                <InfoTip text={resolveTooltip(item.label)!} />
              ) : item.info ? (
                <InfoIcon />
              ) : null}
              <ChevronIcon expanded={isOpen} />
            </button>
          ) : (
            <div className="flex items-start gap-2">
              <div className="pt-0.5"><Icon /></div>
              <span className={`text-sm leading-5 text-[#475467] flex-1 ${item.bold ? "font-semibold" : "font-normal"}`}>
                {item.label}
              </span>
              {item.info && resolveTooltip(item.label) ? (
                <InfoTip text={resolveTooltip(item.label)!} />
              ) : item.info ? (
                <InfoIcon />
              ) : null}
            </div>
          )}

          {isExpandable && isOpen && item.children?.map((child) => (
            <div key={child.label} className="flex items-start gap-2 pl-6">
              <div className="pt-0.5"><Icon /></div>
              <span className="text-sm font-normal leading-5 text-[#475467] flex-1">{child.label}</span>
              {child.info && resolveTooltip(child.label) ? (
                <InfoTip text={resolveTooltip(child.label)!} />
              ) : child.info ? (
                <InfoIcon />
              ) : null}
            </div>
          ))}
        </div>
      );
    });
  }

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

  // Click outside goal chips / pricing cards → restore context default
  useEffect(() => {
    function onPointerDown(e: MouseEvent) {
      const el = e.target as HTMLElement | null;
      if (!el) return;
      if (el.closest("[data-goal-chip]")) return;
      if (el.closest("[data-plan-card]")) return;
      // Keep billing / header interactions from wiping the recommendation mid-toggle
      if (el.closest("[data-pricing-header]")) return;

      const isDefault =
        goal === contextDefaultGoal && selectedPlan === contextDefaultPlan;
      if (!isDefault) clearRecommendation();
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [goal, selectedPlan, contextDefaultGoal, contextDefaultPlan]);

  // One recommendation badge: MOST POPULAR only in standard Pro default;
  // purchase-list mode uses RECOMMENDED (goal = list) — never both.
  const activeBadgeLabel =
    isPurchaseMode
      ? selectedPlan === "buy-list" || goal !== null
        ? "RECOMMENDED"
        : null
      : goal === null
        ? selectedPlan === "pro"
          ? "MOST POPULAR"
          : null
        : "RECOMMENDED";

  const buyListPriceDisplay = purchaseContext
    ? purchaseContext.estimatedPrice.toLocaleString("en-US")
    : "-.--";
  const buyListSupportLines = purchaseContext
    ? [
        `${purchaseContext.resultCount.toLocaleString()} qualified leads`,
        "One-time purchase",
      ]
    : ["Price will be calculated based on selected records."];
  const buyListCta = isPurchaseMode ? "Proceed to checkout →" : "Search for leads →";

  return (
    <div className="h-screen w-full overflow-y-auto bg-[#F2F4F7]">
      {/* Upper header card — compact ~110px */}
      <div data-pricing-header className="w-full px-28 pt-6 pb-0">
        <div className="relative w-full h-[110px] bg-white border border-[#D0D5DD] border-l-8 border-l-[#79C1E9] rounded-lg overflow-visible">
          <div className="flex h-full items-center justify-between gap-8 px-8 py-3">
            <div className="flex items-start gap-3 min-w-0">
              <button
                type="button"
                onClick={onBack}
                className="mt-1 inline-flex items-center text-[#475467] hover:text-[#1D2939] transition-colors shrink-0"
                aria-label="Back"
              >
                <svg viewBox="0 0 16 16" fill="none" className="size-4" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                  <path d="M10 3.5L5.5 8 10 12.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div className="flex flex-col gap-1 min-w-0">
                <h1 className="text-2xl font-semibold leading-8 text-[#1D2939]">
                  Choose the <span className="text-[#008DC3]">right plan</span> for your business
                </h1>
                <p className="text-sm font-normal leading-5 text-[#667085]">
                  Get the features and credits that match your goals.
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-5">
              <div className="relative">
                <div className="flex h-10 items-stretch" role="group" aria-label="Billing period">
                  <button
                    type="button"
                    onClick={() => setBilling("monthly")}
                    className={`flex h-10 items-center justify-center whitespace-nowrap px-4 text-sm leading-5 border border-[#D0D5DD] rounded-l-lg transition-colors ${
                      billing === "monthly"
                        ? "bg-[#008DC3] text-[#F9FAFB] font-medium border-[#008DC3] z-[1]"
                        : "bg-white text-[#475467] font-normal hover:bg-[#F9FAFB]"
                    }`}
                  >
                    Monthly Billing
                  </button>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setBilling("annual")}
                      className={`flex h-10 items-center justify-center whitespace-nowrap px-4 text-sm leading-5 border border-l-0 border-[#D0D5DD] rounded-r-lg transition-colors ${
                        billing === "annual"
                          ? "bg-[#008DC3] text-[#F9FAFB] font-medium border-[#008DC3] z-[1]"
                          : "bg-white text-[#475467] font-normal hover:bg-[#F9FAFB]"
                      }`}
                    >
                      Annual Billing
                    </button>
                    <span className="pointer-events-none absolute left-1/2 top-[32px] z-10 -translate-x-1/2 inline-flex h-6 items-center justify-center rounded px-2 text-xs font-medium leading-[18px] bg-[#EEF0F9] text-[#6572B4] whitespace-nowrap">
                      Best Value
                    </span>
                  </div>
                </div>
              </div>

              <div
                className={`w-[300px] shrink-0 transition-opacity duration-0 ${
                  billing === "annual" ? "opacity-100" : "opacity-0"
                }`}
                aria-hidden={billing !== "annual"}
              >
                <div className="flex w-full items-start gap-2 rounded-lg border border-[#CDE9E0] bg-[#F2F9F7] px-3 py-2">
                  <span className="pt-0.5 shrink-0">
                    <CheckCircleOutline />
                  </span>
                  <p className="text-xs font-medium leading-[18px] text-[#026B5C]">
                    Save with annual:{" "}
                    <span className="font-normal text-[#0D7867]">
                      Pay only for 10 months and receive 12 months of access and 1,000 bonus credits.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Goal recommendation — 24px below card; lines match chip-row width */}
      <div className="w-full px-28 pt-6 pb-6 flex flex-col items-center gap-5">
        <div className="w-fit max-w-full mx-auto flex flex-col items-stretch gap-5">
          <div className="flex items-center gap-4">
            <div className="h-px min-w-[48px] flex-1 bg-[#98A2B3]/60" />
            <p className="shrink-0 text-center text-base font-medium leading-6 text-[#475467] whitespace-nowrap">
              Tell us your goal, we&apos;ll recommend the{" "}
              <span className="font-semibold text-[#008DC3]">&lsquo;Best fit&rsquo;</span>
            </p>
            <div className="h-px min-w-[48px] flex-1 bg-[#98A2B3]/60" />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {GOAL_CHIPS.map((chip) => {
              const selected = goal === chip.id;
              return (
                <button
                  key={chip.id}
                  type="button"
                  data-goal-chip
                  aria-pressed={selected}
                  onClick={() => selectGoal(chip.id)}
                  className={`inline-flex h-10 items-center gap-2 px-4 rounded-lg text-sm font-medium leading-5 border transition-colors whitespace-nowrap bg-white cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#008DC3] ${
                    selected
                      ? "border-[#008DC3] text-[#00729F] shadow-sm"
                      : "border-[#D0D5DD] text-[#475467] hover:bg-[#F9FAFB]"
                  }`}
                >
                  {goalChipIcon(chip.id)}
                  {chip.label}
                </button>
              );
            })}
          </div>
        </div>

        <p className="text-sm leading-5 text-[#667085] text-center pt-1">
          Unsure of which plan to choose? Contact us at{" "}
          <a href="tel:8777083844" className="font-semibold text-[#008DC3]">877.708.3844</a>
          {" "}or{" "}
          <a href="mailto:genie@data-axle.com" className="font-semibold text-[#008DC3]">genie@data-axle.com</a>.
        </p>
      </div>

      {/* Pricing cards — top-accent selection only; stable geometry */}
      <div className="w-full px-28 pb-10">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
          {PLANS.map((plan) => {
            const pricing = billing === "monthly" ? plan.monthly : plan.annual;
            const isSelected = selectedPlan === plan.id;
            const isBuy = plan.id === "buy-list";
            const showBadge = isSelected && activeBadgeLabel !== null;

            return (
              <div
                key={plan.id}
                data-plan-card
                role="button"
                tabIndex={0}
                onClick={() => selectCard(plan.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    selectCard(plan.id);
                  }
                }}
                className="relative bg-white rounded-xl flex flex-col cursor-pointer border border-[#D0D5DD] hover:border-[#98A2B3] transition-[border-color] overflow-visible"
                style={{ boxShadow: CARD_SHADOW }}
              >
                {/* Top accent — absolute so it never changes card box size (Figma border-t-8) */}
                {isSelected && (
                  <div
                    aria-hidden
                    className="pointer-events-none absolute left-0 right-0 top-0 z-[1] h-2 rounded-t-[12px] bg-[#008DC3]"
                  />
                )}

                {/* Badge — left-aligned with content (px-6); does not push layout */}
                {showBadge && (
                  <span className="pointer-events-none absolute left-6 top-0 z-[2] -translate-y-1/2 inline-flex h-6 items-center rounded px-2 text-xs font-medium leading-[18px] uppercase tracking-wide bg-[#00729F] text-white whitespace-nowrap">
                    {activeBadgeLabel}
                  </span>
                )}

                <div className="px-6 pt-8 pb-6 flex flex-col gap-6 flex-1">
                  <div className="flex flex-col gap-4">
                    {/* Figma Title: category → 16px → name+desc (4px between name/desc) */}
                    <div className="flex flex-col gap-4">
                      <p className="text-sm font-medium leading-5 text-[#475467]">{plan.category}</p>
                      <div className="flex flex-col gap-1">
                        <h2 className="text-2xl font-semibold leading-8 text-[#008DC3]">{plan.name}</h2>
                        <p className="text-sm font-normal leading-5 text-[#475467] min-h-[40px]">{plan.description}</p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4">
                      {isBuy ? (
                        <p className="inline-flex items-start font-semibold text-[#1D2939] tracking-[-0.72px]">
                          <span className="text-[23px] leading-[28px] mt-[3px]">$</span>
                          <span className="text-[36px] leading-[44px]">{buyListPriceDisplay}</span>
                        </p>
                      ) : (
                        <div className="flex items-start">
                          <span className="text-sm font-normal leading-5 text-[#475467] pt-1 w-[59px]">Starting</span>
                          <p className="inline-flex items-start font-semibold text-[#1D2939] tracking-[-0.72px]">
                            <span className="text-[23px] leading-[28px] mt-[3px]">$</span>
                            <span className="text-[36px] leading-[44px]">{pricing.display}</span>
                            <span className="text-base leading-6 mt-2 font-semibold">{pricing.suffix}</span>
                          </p>
                        </div>
                      )}

                      <div
                        className={`text-sm leading-5 ${
                          billing === "annual" && !isBuy
                            ? "text-[#0D7867]"
                            : isBuy
                              ? "text-[#0D7867]"
                              : "text-[#475467]"
                        }`}
                      >
                        {isBuy ? (
                          buyListSupportLines.map((line) => <p key={line}>{line}</p>)
                        ) : billing === "annual" && pricing.strikePrice ? (
                          <>
                            <span className="font-semibold line-through">${pricing.strikePrice}</span>
                            <span className="font-semibold">/yr</span>
                            <span> - Billed annually</span>
                            <br />
                            Only 10 months&apos; cost when paid upfront
                          </>
                        ) : (
                          pricing.supportLines.map((line) => <p key={line}>{line}</p>)
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <BenefitIcon planId={plan.id} />
                        <span className="text-sm font-medium leading-5 text-[#475467]">{pricing.benefit}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCta(plan.id);
                    }}
                    className={`w-full h-10 rounded-lg text-sm font-medium leading-5 transition-colors ${
                      isSelected
                        ? "bg-[#008DC3] border border-[#008DC3] text-white hover:bg-[#00729F]"
                        : "bg-white border border-[#D0D5DD] text-[#475467] hover:bg-[#F9FAFB]"
                    }`}
                  >
                    {isBuy ? buyListCta : plan.cta}
                  </button>

                  <div className="flex flex-col gap-8 pt-1 flex-1">
                    {plan.accessItems.length > 0 && (
                      <div className="flex flex-col gap-4">
                        <p className="text-sm font-semibold leading-5 text-[#667085]">{plan.accessTitle}</p>
                        {plan.accessItems.map((item) => (
                          <div key={item} className="flex items-center gap-2">
                            <CheckIcon />
                            <span className="text-sm font-normal leading-5 text-[#475467]">{item}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex flex-col gap-4">
                      <p className="text-sm font-semibold leading-5 text-[#667085]">{plan.includedTitle}</p>
                      {renderFeatureRows(plan.id, "inc", plan.includedItems, CheckIcon)}
                    </div>

                    {plan.notIncludedItems && plan.notIncludedItems.length > 0 && (
                      <div className="flex flex-col gap-4">
                        <p className="text-sm font-semibold leading-5 text-[#667085]">{plan.notIncludedTitle}</p>
                        {renderFeatureRows(plan.id, "exc", plan.notIncludedItems, XIcon)}
                      </div>
                    )}

                    {plan.addons && (
                      <div className="flex flex-col gap-4 mt-auto">
                        <p className="text-sm font-semibold leading-5 text-[#667085]">Additional features</p>
                        {plan.addons.map((addon) => (
                          <div key={addon.label} className="flex items-center gap-2">
                            <PlusIcon />
                            <span className="text-sm font-normal leading-5 text-[#475467]">{addon.label}</span>
                            <AddonChip />
                            {addon.info && resolveTooltip(addon.label) ? (
                              <InfoTip text={resolveTooltip(addon.label)!} />
                            ) : null}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Compare subscription plans — Figma 27469:39363 */}
      <div className="w-full px-28 pb-12">
        <div className="w-full bg-white rounded-2xl px-10 py-2.5 flex flex-col gap-2.5">
          {/*
            Sticky scope: header sticks while Sales / Engagement / Customer success scroll.
            Additional Features sits outside this wrapper so the header unsticks and scrolls away.
          */}
          <div className="relative">
            <div
              className="sticky top-0 z-30 grid h-[156px] box-border bg-white border-b border-[#EAECF0]"
              style={{
                gridTemplateColumns: "minmax(320px,1fr) repeat(3, minmax(240px,1fr))",
              }}
            >
              <div className="px-6 py-4 flex flex-col justify-center gap-2 self-stretch max-h-[156px]">
                <h2 className="text-lg font-semibold leading-7 text-[#008DC3]">
                  Compare subscription plans
                </h2>
                <p className="text-xs font-normal leading-[18px] text-[#1D2939] max-w-[280px]">
                  Dig into the details when you need validation
                  <br />
                  pricing cards remain the primary path to choose.
                </p>
              </div>
              {(["basic", "pro", "team"] as const).map((id) => {
                const plan = PLANS.find((p) => p.id === id)!;
                const pricing = billing === "monthly" ? plan.monthly : plan.annual;
                return (
                  <div
                    key={id}
                    className="px-6 py-4 flex flex-col items-center justify-center gap-2 bg-white self-stretch max-h-[156px]"
                  >
                    <div className="flex w-full flex-col items-center">
                      <p className="h-7 w-full text-center text-lg font-medium leading-7 text-[#008DC3]">
                        {plan.name}
                      </p>
                      <p className="flex h-11 items-start justify-center tracking-tight text-[#1D2939]">
                        <span className="text-[10px] font-semibold leading-[44px]">$</span>
                        <span className="self-center text-sm font-medium leading-5">
                          {pricing.display}{pricing.suffix}
                        </span>
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onSelectPlan(id, billing)}
                      className="w-full max-w-[248px] rounded-md text-sm font-medium leading-5 bg-white text-[#475467] border border-[#D0D5DD] px-3 py-1.5 whitespace-nowrap hover:bg-[#F9FAFB]"
                    >
                      {plan.cta}
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col gap-2 pt-2">
              {COMPARE_SECTIONS.map((section) => (
                <div
                  key={section.title}
                  className={`border-l-4 ${sectionAccent(section.title)} flex flex-col`}
                >
                  <div
                    className="grid h-10 pl-2 border-b border-[#D0D5DD]"
                    style={{ gridTemplateColumns: "minmax(320px,1fr) repeat(3, minmax(240px,1fr))" }}
                  >
                    <div className="flex h-10 items-center gap-2">
                      {sectionIcon(section.title)}
                      <span className="text-sm font-semibold leading-5 text-[#1D2939]">{section.title}</span>
                    </div>
                    <div className="bg-[#F9FAFB] h-10 border-l border-[#EAECF0]" />
                    <div className="bg-[#F9FAFB] h-10 border-l border-[#EAECF0]" />
                    <div className="bg-[#F9FAFB] h-10 border-l border-[#EAECF0]" />
                  </div>
                  {section.rows.map((row) => {
                    const labelTip = row.info ? resolveTooltip(row.label) : undefined;
                    return (
                      <div
                        key={row.label}
                        className="grid h-10 pl-2 border-b border-[#D0D5DD]"
                        style={{ gridTemplateColumns: "minmax(320px,1fr) repeat(3, minmax(240px,1fr))" }}
                      >
                        <div className="pl-7 pr-2 h-10 flex items-center gap-1 text-sm font-normal leading-5 text-[#475467]">
                          {row.label}
                          {labelTip ? <InfoTip text={labelTip} /> : null}
                        </div>
                        <div className="bg-[#F9FAFB] h-10 px-6 flex items-center justify-center overflow-visible border-l border-[#EAECF0]">
                          <CellValue val={row.basic} rowLabel={row.label} />
                        </div>
                        <div className="bg-[#F9FAFB] h-10 px-6 flex items-center justify-center overflow-visible border-l border-[#EAECF0]">
                          <CellValue val={row.pro} rowLabel={row.label} />
                        </div>
                        <div className="bg-[#F9FAFB] h-10 px-6 flex items-center justify-center overflow-visible border-l border-[#EAECF0]">
                          <CellValue val={row.team} rowLabel={row.label} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Additional Features — outside sticky parent so header releases */}
          <div className="bg-[#F8F7FF] border-l-4 border-[#C9BFFD]">
            <div
              className="grid pl-2"
              style={{ gridTemplateColumns: "minmax(320px,1fr) minmax(0,3fr)" }}
            >
              <div className="py-2 flex items-center gap-2">
                <DiamondIcon />
                <span className="text-sm font-semibold leading-5 text-[#1D2939]">Additional Features</span>
                <AddonChip />
              </div>
              <div className="bg-[#F2EFFF]" />
            </div>
            {ADDON_ROWS.map((row) => (
              <div
                key={row.title}
                className="grid pl-2 border-t border-[#C9BFFD]/60"
                style={{ gridTemplateColumns: "minmax(320px,1fr) minmax(0,3fr)" }}
              >
                <div className="pl-7 pr-2 py-2 flex flex-col gap-2 justify-center min-h-[49px]">
                  <p className="text-sm font-medium leading-5 text-[#475467]">{row.title}</p>
                  {row.description ? (
                    <p className="text-xs font-normal leading-[18px] text-[#475467]">{row.description}</p>
                  ) : null}
                </div>
                <div className="bg-[#F2EFFF] p-2 flex items-center justify-center">
                  <p className="text-sm font-medium leading-5 text-[#475467] text-center">{row.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#F9FAFB] border border-[#D0D5DD] rounded-lg px-6 py-4 shadow-[0_1px_1px_rgba(71,84,103,0.03)]">
            <p className="text-base leading-6 text-[#1D2939] text-center">
              <span className="font-semibold">Looking for custom solutions? </span>
              <span className="font-normal">Contact us at </span>
              <a href="tel:8777083844" className="font-semibold text-[#008DC3]">877.708.3844</a>
              <span className="font-normal"> or </span>
              <a href="mailto:genie@data-axle.com" className="font-semibold text-[#008DC3]">genie@data-axle.com</a>
              <span className="font-normal">.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
