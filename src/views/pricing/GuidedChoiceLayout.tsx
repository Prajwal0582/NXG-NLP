import { useState } from "react";
import type { FeatureItem, PlanId } from "../../data/pricingPlans";
import {
  BUY_LIST_PLAN,
  PACKAGE_SUMMARIES,
  PLANS,
  SUBSCRIPTION_PLANS,
  resolveTooltip,
} from "../../data/pricingPlans";
import type { PricingLayoutProps } from "./pricingTypes";
import SubscriptionComparison from "./SubscriptionComparison";

export interface GuidedChoiceProps extends PricingLayoutProps {
  onBack: () => void;
  onBillingChange: (billing: PricingLayoutProps["billing"]) => void;
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

function PlanBadge({ label }: { label: "MOST POPULAR" | "RECOMMENDED" }) {
  return (
    <span className="pointer-events-none absolute left-5 top-0 z-[2] -translate-y-1/2 inline-flex h-6 items-center rounded px-2.5 text-xs font-medium leading-[18px] uppercase tracking-wide bg-[#00729F] text-white whitespace-nowrap">
      {label}
    </span>
  );
}

/**
 * Differentiator band — contrast against column surface:
 * unselected (white column) → soft blue band; selected (blue column) → white band.
 */
function ValueLines({
  lines,
  selected,
}: {
  lines: { label: string; value: string }[];
  selected: boolean;
}) {
  return (
    <div
      className={`rounded-lg border px-3 py-3 min-h-[96px] ${
        selected
          ? "border-[#D0D5DD] bg-white"
          : "border-[#D6EAF5] bg-[#F5FAFD]"
      }`}
    >
      <div className="flex flex-col gap-2">
        {lines.map((line) => (
          <div key={line.label} className="flex items-baseline justify-between gap-2">
            <span className="text-[11px] font-medium uppercase tracking-wide text-[#475467] shrink-0">
              {line.label}
            </span>
            <span className="text-sm font-medium leading-5 text-[#1D2939] text-right">{line.value}</span>
          </div>
        ))}
      </div>
    </div>
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
        <div className="flex flex-col gap-3">
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
        <div className="flex flex-col gap-3">
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

/**
 * Direction 4 — At-a-Glance:
 * Apollo-inspired hierarchy (plan → price → value → CTA → features)
 * expressed in SalesGenie / Orbit language. No goal / Best Fit UI.
 */
export function GuidedChoiceLayout(props: GuidedChoiceProps) {
  const {
    billing,
    selectedPlan,
    isPurchaseMode,
    buyListPriceDisplay,
    buyListSupportLines,
    buyListCta,
    onSelectCard,
    onCta,
    onSelectPlan,
    onBack,
    onBillingChange,
  } = props;

  // Option 4 ignores goal chips — Pro MOST POPULAR; purchase context → Buy List RECOMMENDED.
  const badgePlanId: PlanId = isPurchaseMode ? "buy-list" : "pro";
  const activeBadgeLabel: "MOST POPULAR" | "RECOMMENDED" = isPurchaseMode
    ? "RECOMMENDED"
    : "MOST POPULAR";

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
    <>
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-28 pt-4 sm:pt-6 pb-16">
        {/* Open hero — compact spacing into plans */}
        <div data-pricing-header className="w-full pb-3">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
            <div className="flex items-start gap-3 min-w-0 lg:max-w-[58%]">
              <button
                type="button"
                onClick={onBack}
                className="mt-2 inline-flex items-center text-[#475467] hover:text-[#1D2939] transition-colors shrink-0"
                aria-label="Back"
              >
                <svg viewBox="0 0 16 16" fill="none" className="size-4" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                  <path d="M10 3.5L5.5 8 10 12.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div className="min-w-0">
                <h1 className="text-[32px] font-semibold leading-10 tracking-tight text-[#1D2939]">
                  Choose the <span className="text-[#008DC3]">right plan</span> for your business
                </h1>
                <p className="mt-2 text-base font-normal leading-6 text-[#667085]">
                  Get the features and credits that match your goals.
                </p>
              </div>
            </div>

            {/* Chip under Annual; note below with reserved space so they never overlap */}
            <div className="flex flex-col items-start lg:items-end shrink-0">
              <div className="relative flex h-10 items-stretch" role="group" aria-label="Billing period">
                <button
                  type="button"
                  onClick={() => onBillingChange("monthly")}
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
                    onClick={() => onBillingChange("annual")}
                    className={`flex h-10 items-center justify-center whitespace-nowrap px-4 text-sm leading-5 border border-l-0 border-[#D0D5DD] rounded-r-lg transition-colors ${
                      billing === "annual"
                        ? "bg-[#008DC3] text-[#F9FAFB] font-medium border-[#008DC3] z-[1]"
                        : "bg-white text-[#475467] font-normal hover:bg-[#F9FAFB]"
                    }`}
                  >
                    Annual Billing
                  </button>
                  <span className="pointer-events-none absolute left-1/2 top-[36px] z-10 -translate-x-1/2 inline-flex h-6 items-center justify-center rounded px-2.5 text-xs font-bold leading-[18px] bg-[#FEC84B] text-[#101828] border border-[#DC6803] whitespace-nowrap shadow-sm">
                    Save 17%
                  </span>
                </div>
              </div>
              <div className="h-7 shrink-0" aria-hidden />
              <p
                className={`text-xs leading-[18px] text-[#026B5C] lg:text-right whitespace-nowrap min-h-[18px] transition-opacity duration-0 ${
                  billing === "annual" ? "opacity-100" : "opacity-0"
                }`}
                aria-hidden={billing !== "annual"}
              >
                Pay for 10 months and get 12 months of access +{" "}
                <span className="font-medium">1,000 bonus credits</span>.
              </p>
            </div>
          </div>
        </div>

        {/* Single outer card — four columns inside; selection ≠ MOST POPULAR */}
        <div
          className="mt-3 rounded-2xl border border-[#D0D5DD] bg-white shadow-[0_1px_3px_rgba(16,24,40,0.08)] overflow-visible"
          role="radiogroup"
          aria-label="Choose a plan"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
          {SUBSCRIPTION_PLANS.map((plan, index) => {
            const planId = plan.id as Exclude<PlanId, "buy-list">;
            const pricing = billing === "monthly" ? plan.monthly : plan.annual;
            const isSelected = selectedPlan === plan.id;
            const showBadge = plan.id === badgePlanId;
            const summary = PACKAGE_SUMMARIES[planId];
            const fullPlan = PLANS.find((p) => p.id === plan.id)!;
            const primaryValue =
              planId === "basic"
                ? "Unlimited view-only access"
                : planId === "pro"
                  ? summary.creditsLabel(billing)
                  : summary.users;

            return (
              <div
                key={plan.id}
                data-plan-card
                role="radio"
                aria-checked={isSelected}
                tabIndex={0}
                onClick={() => onSelectCard(plan.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelectCard(plan.id);
                  }
                }}
                className={`relative flex flex-col min-h-0 cursor-pointer overflow-visible transition-colors ${
                  index > 0 ? "border-t sm:border-t-0 xl:border-l border-[#E4E7EC]" : ""
                } ${
                  isSelected
                    ? "bg-[#F5FAFD] ring-2 ring-inset ring-[#79C1E9] z-[1]"
                    : "bg-white hover:bg-[#F9FAFB]"
                }`}
              >
                {isSelected && (
                  <div
                    aria-hidden
                    className="pointer-events-none absolute left-0 right-0 top-0 z-[1] h-1.5 bg-[#008DC3]"
                  />
                )}
                {showBadge && <PlanBadge label={activeBadgeLabel} />}

                <div className="px-5 pt-9 pb-8 flex flex-col flex-1 gap-0">
                  <div className="flex flex-col gap-1 min-h-[108px]">
                    <p className="text-xs font-medium uppercase tracking-wide text-[#98A2B3]">
                      {plan.category}
                    </p>
                    <h3 className="text-xl font-semibold leading-7 text-[#1D2939]">{plan.name}</h3>
                    <p className="text-sm font-normal leading-5 text-[#667085]">{plan.description}</p>
                  </div>

                  <div className="mt-6 flex flex-col gap-1 min-h-[100px]">
                    <div className="flex items-start">
                      <span className="text-sm font-normal leading-5 text-[#667085] pt-1 w-[56px]">
                        Starting
                      </span>
                      <p className="inline-flex items-start font-semibold text-[#1D2939] tracking-[-0.72px]">
                        <span className="text-[22px] leading-[28px] mt-[3px]">$</span>
                        <span className="text-[40px] leading-[48px]">{pricing.display}</span>
                        <span className="text-base leading-6 mt-3 font-semibold text-[#475467]">
                          {pricing.suffix}
                        </span>
                      </p>
                    </div>
                    <div
                      className={`text-xs leading-4 pl-[56px] ${
                        billing === "annual" ? "text-[#0D7867]" : "text-[#667085]"
                      }`}
                    >
                      {billing === "annual" && pricing.strikePrice ? (
                        <>
                          <span className="font-semibold line-through">${pricing.strikePrice}</span>
                          <span className="font-semibold">/yr</span>
                          <span> — Billed annually</span>
                          <br />
                          Only 10 months&apos; cost when paid upfront
                        </>
                      ) : (
                        pricing.supportLines.map((line) => <p key={line}>{line}</p>)
                      )}
                    </div>
                  </div>

                  <p className="mt-5 text-sm font-semibold leading-5 text-[#1D2939] min-h-[40px]">
                    {primaryValue}
                  </p>

                  <div className="mt-4">
                    <ValueLines
                      selected={isSelected}
                      lines={[
                        { label: "Access", value: summary.access },
                        { label: "Credits", value: summary.creditsLabel(billing) },
                        { label: "Users", value: summary.users },
                      ]}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onCta(plan.id);
                    }}
                    className={`mt-6 w-full h-11 rounded-lg text-sm font-medium leading-5 transition-colors ${
                      isSelected
                        ? "bg-[#008DC3] border border-[#008DC3] text-white hover:bg-[#00729F]"
                        : "bg-white border border-[#D0D5DD] text-[#475467] hover:bg-[#F9FAFB]"
                    }`}
                  >
                    {plan.cta}
                  </button>

                  <div className="mt-8 pt-6 border-t border-[#EAECF0] flex-1">
                    <PlanFeatureChecklist
                      plan={fullPlan}
                      expanded={expanded}
                      onToggle={toggleExpand}
                    />
                  </div>
                </div>
              </div>
            );
          })}

          {/* Buy List column */}
          <div
            data-plan-card
            role="radio"
            aria-checked={buySelected}
            tabIndex={0}
            onClick={() => onSelectCard("buy-list")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelectCard("buy-list");
              }
            }}
            className={`relative flex flex-col min-h-0 cursor-pointer overflow-visible transition-colors border-t sm:border-t-0 xl:border-l border-[#E4E7EC] ${
              buySelected
                ? "bg-[#F5FAFD] ring-2 ring-inset ring-[#79C1E9] z-[1]"
                : "bg-white hover:bg-[#F9FAFB]"
            }`}
          >
            {buySelected && (
              <div
                aria-hidden
                className="pointer-events-none absolute left-0 right-0 top-0 z-[1] h-1.5 bg-[#008DC3]"
              />
            )}
            {buyBadge && <PlanBadge label={activeBadgeLabel} />}

            <div className="px-5 pt-9 pb-8 flex flex-col flex-1">
              <div className="flex flex-col gap-1 min-h-[108px]">
                <p className="text-xs font-medium uppercase tracking-wide text-[#98A2B3]">
                  {buyPlan.category}
                </p>
                <h3 className="text-xl font-semibold leading-7 text-[#1D2939]">{buyPlan.name}</h3>
                <p className="text-sm font-normal leading-5 text-[#667085]">{buyPlan.description}</p>
              </div>

              <div className="mt-6 flex flex-col gap-1 min-h-[100px]">
                {buyListPriceDisplay === "Custom price" ? (
                  <p className="font-semibold text-[#1D2939] text-[32px] leading-10 tracking-tight">
                    Custom price
                  </p>
                ) : (
                  <p className="inline-flex items-start font-semibold text-[#1D2939] tracking-[-0.72px]">
                    <span className="text-[22px] leading-[28px] mt-[3px]">$</span>
                    <span className="text-[40px] leading-[48px]">{buyListPriceDisplay}</span>
                  </p>
                )}
                <div className="text-xs leading-4 text-[#0D7867]">
                  {buyListSupportLines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </div>

              <p className="mt-5 text-sm font-semibold leading-5 text-[#1D2939] min-h-[40px]">
                One-time purchase
              </p>

              <div className="mt-4">
                <ValueLines
                  selected={buySelected}
                  lines={[
                    { label: "Purchase", value: "One-time" },
                    {
                      label: "Price",
                      value:
                        buyListPriceDisplay === "Custom price"
                          ? "Calculated from selected records"
                          : `$${buyListPriceDisplay}`,
                    },
                    { label: "Access", value: "12-month re-export" },
                  ]}
                />
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onCta("buy-list");
                }}
                className={`mt-6 w-full h-11 rounded-lg text-sm font-medium leading-5 transition-colors ${
                  buySelected
                    ? "bg-[#008DC3] border border-[#008DC3] text-white hover:bg-[#00729F]"
                    : "bg-white border border-[#D0D5DD] text-[#475467] hover:bg-[#F9FAFB]"
                }`}
              >
                {buyListCta}
              </button>

              <div className="mt-8 pt-6 border-t border-[#EAECF0] flex-1">
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
      </div>

      <SubscriptionComparison billing={billing} onSelectPlan={onSelectPlan} />
    </>
  );
}
