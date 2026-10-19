import { useState, type ReactNode } from "react";
import type { FeatureItem, PlanId } from "../../data/pricingPlans";
import {
  BUY_LIST_PLAN,
  PACKAGE_SUMMARIES,
  PLANS,
  SUBSCRIPTION_PLANS,
  planAllowance,
  resolveTooltip,
} from "../../data/pricingPlans";
import type { PricingLayoutProps } from "./pricingTypes";
import { CARD_SHADOW } from "./pricingTypes";
import SubscriptionComparison from "./SubscriptionComparison";

const COL_IDS = ["basic", "pro", "team"] as const;
type SubPlanId = (typeof COL_IDS)[number];
const PLAN_COLS = "grid grid-cols-1 md:grid-cols-3";

/** Shared light-blue band for the four at-a-glance attribute rows. */
const GLANCE_BAND = "bg-[#F0F9FF]";

/** Selected plan: blue stroke only — no fill. */
const SELECTED_STROKE = "border-2 border-[#008DC3]";
const IDLE_STROKE = "border border-[#D0D5DD]";

/** Inset blue stroke for a column segment inside the shared packages card. */
function selectedColStroke(pos: "top" | "mid" | "bottom", selected: boolean) {
  if (!selected) return "";
  if (pos === "top") {
    return "shadow-[inset_0_2px_0_0_#008DC3,inset_2px_0_0_0_#008DC3,inset_-2px_0_0_0_#008DC3]";
  }
  if (pos === "bottom") {
    return "shadow-[inset_0_-2px_0_0_#008DC3,inset_2px_0_0_0_#008DC3,inset_-2px_0_0_0_#008DC3]";
  }
  return "shadow-[inset_2px_0_0_0_#008DC3,inset_-2px_0_0_0_#008DC3]";
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

function PlusIcon() {
  return (
    <svg viewBox="0 0 14 14" fill="none" className="size-3.5 shrink-0 text-[#0BA38C]" aria-hidden>
      <path d="M7 2.5v9M2.5 7h9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
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
      <path d="M7 6.5v3M7 4.5h.01" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

function InfoTip({ text }: { text: string }) {
  return (
    <span className="relative inline-flex shrink-0 group/tip">
      <button
        type="button"
        className="inline-flex rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#008DC3]/40"
        aria-label="More information"
        onClick={(e) => e.stopPropagation()}
      >
        <InfoIcon />
      </button>
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-[calc(100%+6px)] left-1/2 z-[60] w-max max-w-[220px] -translate-x-1/2 rounded-md bg-[#1D2939] px-3 py-2 text-center text-xs font-normal leading-[18px] text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover/tip:opacity-100 group-focus-within/tip:opacity-100"
      >
        {text}
      </span>
    </span>
  );
}

function AddonChip() {
  return (
    <span className="inline-flex h-5 items-center rounded px-1.5 text-[10px] font-medium leading-4 text-[#F8F7FF] bg-[#764FD9]">
      Add-on
    </span>
  );
}

function MedalIcon() {
  return (
    <svg viewBox="0 0 14 14" fill="none" className="size-3.5 shrink-0 text-[#475467]" aria-hidden>
      <circle cx="7" cy="5.5" r="3" stroke="currentColor" strokeWidth="1.2" />
      <path d="M5 8.5L4 12.5l3-1.5 3 1.5-1-4" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}

/** Semantic access chips — color encodes capability level at a glance. */
function AccessPill({ label }: { label: string }) {
  const tone =
    label === "Unlimited"
      ? "bg-[#DCFAE6] border-[#6CE9A6] text-[#054F31]"
      : label === "View + Export"
        ? "bg-[#E0F2FE] border-[#7CD4FD] text-[#026AA2]"
        : "bg-white border-[#D0D5DD] text-[#475467]";
  return (
    <span
      className={`inline-flex max-w-full items-center rounded-md border px-2 py-0.5 text-[11px] font-semibold whitespace-nowrap ${tone}`}
    >
      {label}
    </span>
  );
}

function PlanBadge({ label }: { label: "MOST POPULAR" | "RECOMMENDED" }) {
  return (
    <span className="pointer-events-none absolute left-5 top-0 z-[2] -translate-y-1/2 inline-flex h-6 items-center rounded px-2 text-xs font-medium leading-[18px] uppercase tracking-wide bg-[#00729F] text-white whitespace-nowrap">
      {label}
    </span>
  );
}

function FeatureRows({
  planId,
  section,
  items,
  Icon,
  expanded,
  onToggle,
}: {
  planId: PlanId;
  section: "inc" | "exc";
  items: FeatureItem[];
  Icon: typeof CheckIcon;
  expanded: Record<string, boolean>;
  onToggle: (key: string) => void;
}) {
  return (
    <>
      {items.map((item) => {
        const key = `${planId}:${section}:${item.label}`;
        const isOpen = Boolean(expanded[key]);
        const isExpandable = Boolean(item.expandable && item.children?.length);
        const tip = item.info ? resolveTooltip(item.label) : undefined;
        return (
          <div key={item.label} className="flex flex-col gap-2">
            {isExpandable ? (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggle(key);
                }}
                className="flex w-full items-start gap-2 text-left cursor-pointer"
                aria-expanded={isOpen}
              >
                <div className="pt-0.5"><Icon /></div>
                <span className={`text-sm leading-5 text-[#475467] flex-1 ${item.bold ? "font-semibold" : "font-normal"}`}>
                  {item.label}
                </span>
                {tip ? <InfoTip text={tip} /> : item.info ? <InfoIcon /> : null}
                <ChevronIcon expanded={isOpen} />
              </button>
            ) : (
              <div className="flex items-start gap-2">
                <div className="pt-0.5"><Icon /></div>
                <span className={`text-sm leading-5 text-[#475467] flex-1 ${item.bold ? "font-semibold" : "font-normal"}`}>
                  {item.label}
                </span>
                {tip ? <InfoTip text={tip} /> : item.info ? <InfoIcon /> : null}
              </div>
            )}
            {isExpandable && isOpen && item.children?.map((child) => (
              <div key={child.label} className="flex items-start gap-2 pl-6">
                <div className="pt-0.5"><Icon /></div>
                <span className="text-sm font-normal leading-5 text-[#475467] flex-1">{child.label}</span>
                {child.info && resolveTooltip(child.label) ? (
                  <InfoTip text={resolveTooltip(child.label)!} />
                ) : null}
              </div>
            ))}
          </div>
        );
      })}
    </>
  );
}

function PlanFeatureChecklist({
  plan,
  expanded,
  onToggle,
}: {
  plan: (typeof PLANS)[number];
  expanded: Record<string, boolean>;
  onToggle: (key: string) => void;
}) {
  return (
    <div className="flex flex-col gap-6">
      {plan.accessItems.length > 0 && (
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold leading-5 text-[#667085]">{plan.accessTitle}</p>
          {plan.accessItems.map((item) => (
            <div key={item} className="flex items-start gap-2">
              <div className="pt-0.5"><CheckIcon /></div>
              <span className="text-sm font-normal leading-5 text-[#475467]">{item}</span>
            </div>
          ))}
        </div>
      )}
      <div className="flex flex-col gap-3">
        <p className="text-sm font-semibold leading-5 text-[#667085]">{plan.includedTitle}</p>
        <FeatureRows
          planId={plan.id}
          section="inc"
          items={plan.includedItems}
          Icon={CheckIcon}
          expanded={expanded}
          onToggle={onToggle}
        />
      </div>
      {plan.notIncludedItems && plan.notIncludedItems.length > 0 && (
        <div className="flex flex-col gap-3 border-t border-[#EAECF0] pt-6">
          <p className="text-sm font-semibold leading-5 text-[#667085]">{plan.notIncludedTitle}</p>
          <FeatureRows
            planId={plan.id}
            section="exc"
            items={plan.notIncludedItems}
            Icon={XIcon}
            expanded={expanded}
            onToggle={onToggle}
          />
        </div>
      )}
      {plan.addons && (
        <div className="flex flex-col gap-3 border-t border-[#EAECF0] pt-6">
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
  );
}

function glanceValueClass(emphasis?: "muted" | "default" | "strong") {
  if (emphasis === "muted") return "text-[#667085] font-medium";
  if (emphasis === "strong") return "text-[#1D2939] font-semibold";
  return "text-[#344054] font-semibold";
}

type GlanceCell = {
  value: ReactNode;
  emphasis?: "muted" | "default" | "strong";
};

/** One value row across Basic / Pro / Team — values only, light-blue band. */
function AttributeRow({
  cells,
  selectedPlan,
  last,
}: {
  cells: GlanceCell[];
  selectedPlan: PlanId;
  last?: boolean;
}) {
  return (
    <div className={`${PLAN_COLS} ${last ? "" : "border-b border-[#D6EAF5]"}`}>
      {cells.map((cell, i) => {
        const id = COL_IDS[i];
        const isSelected = selectedPlan === id;
        return (
          <div
            key={id}
            className={`px-5 py-2.5 flex items-center ${GLANCE_BAND} ${
              i > 0 ? "sm:border-l border-[#D6EAF5]" : ""
            } ${selectedColStroke("mid", isSelected)}`}
          >
            <div className={`text-sm leading-5 ${glanceValueClass(cell.emphasis)}`}>{cell.value}</div>
          </div>
        );
      })}
    </div>
  );
}

function CompareGlance({
  billing,
  selectedPlan,
}: {
  billing: PricingLayoutProps["billing"];
  selectedPlan: PlanId;
}) {
  const allowanceCells: GlanceCell[] = SUBSCRIPTION_PLANS.map((p) => {
    const id = p.id as SubPlanId;
    return {
      value: planAllowance(id, billing),
      emphasis: id === "basic" ? "muted" : "default",
    };
  });
  const accessCells: GlanceCell[] = SUBSCRIPTION_PLANS.map((p) => ({
    value: <AccessPill label={PACKAGE_SUMMARIES[p.id as SubPlanId].access} />,
  }));
  const creditCells: GlanceCell[] = SUBSCRIPTION_PLANS.map((p) => {
    const id = p.id as SubPlanId;
    return {
      value: PACKAGE_SUMMARIES[id].creditsLabel(billing),
      emphasis: id === "basic" ? "muted" : "strong",
    };
  });
  const userCells: GlanceCell[] = SUBSCRIPTION_PLANS.map((p) => {
    const id = p.id as SubPlanId;
    return {
      value: PACKAGE_SUMMARIES[id].users,
      emphasis: id === "team" ? "strong" : "muted",
    };
  });

  return (
    <div className="border-t border-[#D6EAF5]">
      <AttributeRow cells={allowanceCells} selectedPlan={selectedPlan} />
      <AttributeRow cells={accessCells} selectedPlan={selectedPlan} />
      <AttributeRow cells={creditCells} selectedPlan={selectedPlan} />
      <AttributeRow cells={userCells} selectedPlan={selectedPlan} last />
    </div>
  );
}

/** Direction 3 — one subscription section (3 plans) + separate Buy List card. */
export function ValueComparisonLayout(props: PricingLayoutProps) {
  const {
    billing,
    selectedPlan,
    badgePlanId,
    activeBadgeLabel,
    buyListPriceDisplay,
    buyListSupportLines,
    buyListCta,
    onSelectCard,
    onCta,
    onSelectPlan,
  } = props;

  const buyPlan = BUY_LIST_PLAN;
  const buySelected = selectedPlan === "buy-list";
  const buyBadge = badgePlanId === "buy-list";

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

  function toggleExpand(key: string) {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <div className="w-full">
      {/* pt reserves space for OR above Buy List so cards stay top-aligned */}
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-28 pb-10 pt-4 sm:pt-6">
        <div className="w-full grid grid-cols-1 xl:grid-cols-4 gap-4 sm:gap-6 xl:gap-8 items-start">
          {/* ONE packages section — Basic / Pro / Team */}
          <div
            className="xl:col-span-3 min-w-0 bg-white rounded-xl border border-[#D0D5DD] overflow-visible"
            style={{ boxShadow: CARD_SHADOW }}
          >
            <div className={`${PLAN_COLS} border-b border-[#EAECF0] rounded-t-xl overflow-visible`}>
              {SUBSCRIPTION_PLANS.map((plan, index) => {
                const pricing = billing === "monthly" ? plan.monthly : plan.annual;
                const isSelected = selectedPlan === plan.id;
                const showBadge = badgePlanId === plan.id;
                const isLast = index === SUBSCRIPTION_PLANS.length - 1;

                return (
                  <div
                    key={plan.id}
                    data-plan-card
                    role="button"
                    tabIndex={0}
                    onClick={() => onSelectCard(plan.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onSelectCard(plan.id);
                      }
                    }}
                    className={`relative px-5 pt-10 pb-5 flex flex-col gap-2 cursor-pointer min-h-[248px] overflow-visible bg-white ${
                      index > 0 ? "sm:border-l border-[#EAECF0]" : ""
                    } ${index === 0 ? "rounded-tl-xl" : ""} ${isLast ? "rounded-tr-xl" : ""} ${selectedColStroke(
                      "top",
                      isSelected,
                    )}`}
                  >
                    {showBadge && <PlanBadge label={activeBadgeLabel} />}

                    <p className="text-xs font-medium text-[#667085] uppercase tracking-wide">
                      {plan.category}
                    </p>
                    <h3 className="text-xl font-semibold text-[#008DC3] leading-7">{plan.name}</h3>
                    <div className="flex items-baseline gap-0.5 mt-0.5">
                      <span className="text-sm font-semibold text-[#1D2939]">$</span>
                      <span className="text-[32px] font-semibold tracking-tight leading-9 text-[#1D2939]">
                        {pricing.display}
                      </span>
                      <span className="text-sm font-semibold text-[#1D2939]">{pricing.suffix}</span>
                    </div>
                    {billing === "annual" && pricing.strikePrice ? (
                      <div className="text-xs text-[#0D7867] leading-4 min-h-[36px]">
                        <p>
                          <span className="line-through font-semibold">${pricing.strikePrice}/yr</span>
                          {" "}— Billed annually
                        </p>
                        <p>Only 10 months&apos; cost when paid upfront</p>
                      </div>
                    ) : (
                      <p className="text-xs text-[#667085] min-h-[36px] leading-4">
                        {pricing.supportLines[0]}
                      </p>
                    )}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onCta(plan.id);
                      }}
                      className={`mt-auto w-full h-9 rounded-lg text-sm font-medium transition-colors ${
                        isSelected
                          ? "bg-[#008DC3] text-white border border-[#008DC3] hover:bg-[#00729F]"
                          : "bg-white text-[#475467] border border-[#D0D5DD] hover:bg-[#F9FAFB]"
                      }`}
                    >
                      {plan.cta}
                    </button>
                  </div>
                );
              })}
            </div>

            <CompareGlance billing={billing} selectedPlan={selectedPlan} />

            <div className={`${PLAN_COLS} border-t border-[#D0D5DD] rounded-b-xl overflow-hidden`}>
              {SUBSCRIPTION_PLANS.map((plan, index) => {
                const fullPlan = PLANS.find((p) => p.id === plan.id)!;
                const isSelected = selectedPlan === plan.id;
                return (
                  <div
                    key={plan.id}
                    className={`px-5 py-6 bg-white ${
                      index > 0 ? "sm:border-l border-[#E4E7EC]" : ""
                    } ${selectedColStroke("bottom", isSelected)}`}
                  >
                    <PlanFeatureChecklist
                      plan={fullPlan}
                      expanded={expanded}
                      onToggle={toggleExpand}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Buy List — separate card; OR above; top-aligned */}
          <div className="relative w-full xl:col-span-1">
            <p className="absolute left-0 right-0 -top-5 text-center text-xs font-medium leading-[18px] text-[#98A2B3] tracking-wide pointer-events-none">
              OR
            </p>

            <div
              data-plan-card
              role="button"
              tabIndex={0}
              onClick={() => onSelectCard("buy-list")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelectCard("buy-list");
                }
              }}
              className={`relative w-full bg-white rounded-xl cursor-pointer overflow-visible ${
                buySelected ? SELECTED_STROKE : `${IDLE_STROKE} hover:border-[#98A2B3]`
              }`}
              style={{ boxShadow: CARD_SHADOW }}
            >
              {buyBadge && <PlanBadge label={activeBadgeLabel} />}

              <div className="px-5 pt-9 pb-5 flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <p className="text-xs font-medium text-[#667085] uppercase tracking-wide">
                    {buyPlan.category}
                  </p>
                  <h3 className="text-xl font-semibold text-[#008DC3] leading-7">{buyPlan.name}</h3>
                  <p className="text-sm text-[#475467] leading-5">{buyPlan.description}</p>
                </div>

                <div className="flex flex-col gap-1">
                  {buyListPriceDisplay === "Custom price" ? (
                    <p className="font-semibold text-[#1D2939] text-[24px] leading-8 tracking-tight">
                      Custom price
                    </p>
                  ) : (
                    <p className="inline-flex items-start font-semibold text-[#1D2939]">
                      <span className="text-[18px] leading-7 mt-0.5">$</span>
                      <span className="text-[28px] leading-9 tracking-tight">{buyListPriceDisplay}</span>
                    </p>
                  )}
                  <div className="text-sm text-[#0D7867] space-y-0.5">
                    {buyListSupportLines.map((l) => (
                      <p key={l}>{l}</p>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[#475467]">
                  <MedalIcon />
                  <span className="text-xs font-medium leading-4">{buyPlan.monthly.benefit}</span>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCta("buy-list");
                  }}
                  className={`w-full h-10 rounded-lg text-sm font-medium transition-colors ${
                    buySelected
                      ? "bg-[#008DC3] text-white border border-[#008DC3] hover:bg-[#00729F]"
                      : "bg-white text-[#475467] border border-[#D0D5DD] hover:bg-[#F9FAFB]"
                  }`}
                >
                  {buyListCta}
                </button>
              </div>

              <div className="px-5 pb-6 pt-5 border-t border-[#EAECF0]">
                <PlanFeatureChecklist
                  plan={buyPlan}
                  expanded={expanded}
                  onToggle={toggleExpand}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <SubscriptionComparison billing={billing} onSelectPlan={onSelectPlan} />
    </div>
  );
}
