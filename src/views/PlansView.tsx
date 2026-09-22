import { useState } from "react";
import type { BillingPeriod, GoalId, PlanId, CellVal } from "../data/pricingPlans";
import {
  ADDON_ROWS,
  COMPARE_SECTIONS,
  GOAL_CHIPS,
  PLANS,
  planPriceLabel,
} from "../data/pricingPlans";

interface PlansViewProps {
  onBack: () => void;
  onSelectPlan: (planId: Exclude<PlanId, "buy-list">, billing: BillingPeriod) => void;
  onSearchLeads: () => void;
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
      <circle cx="7" cy="7" r="7" fill="#D92D20" />
      <path d="M4.5 4.5l5 5M9.5 4.5l-5 5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
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
  return (
    <svg viewBox="0 0 20 20" fill="none" className="size-5 text-[#764FD9]" aria-hidden>
      <path d="M10 3.5L16.5 10 10 16.5 3.5 10 10 3.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

function AddonChip() {
  return (
    <span className="inline-flex h-6 items-center rounded px-2 text-xs font-medium leading-[18px] text-[#F6F8FC] bg-[#764FD9]">
      Add-on
    </span>
  );
}

function CellValue({ val }: { val: CellVal }) {
  if (val === true) return <div className="flex justify-center"><CheckIcon /></div>;
  if (val === false) return <div className="flex justify-center"><XIcon /></div>;
  return (
    <span className="text-sm leading-5 text-[#475467] text-center inline-flex items-center gap-1 justify-center">
      {val}
      {(val === "uses credits" || val === "unlock with credit purchase" || val === "Includes 5" || val === "includes 5") && (
        <InfoIcon />
      )}
    </span>
  );
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

export default function PlansView({ onBack, onSelectPlan, onSearchLeads }: PlansViewProps) {
  const [billing, setBilling] = useState<BillingPeriod>("monthly");
  const [goal, setGoal] = useState<GoalId | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<PlanId>("pro");

  function selectGoal(id: GoalId) {
    const chip = GOAL_CHIPS.find((g) => g.id === id)!;
    setGoal(id);
    setSelectedPlan(chip.recommends);
  }

  function selectCard(planId: PlanId) {
    setSelectedPlan(planId);
    const matching = GOAL_CHIPS.find((g) => g.recommends === planId);
    setGoal(matching ? matching.id : null);
  }

  function handleCta(planId: PlanId) {
    if (planId === "buy-list") {
      onSearchLeads();
      return;
    }
    onSelectPlan(planId, billing);
  }

  return (
    <div className="min-h-screen w-full overflow-y-auto bg-[#F2F4F7]">
      {/* Back — Figma Header area ~70px, content inset ~24px */}
      <div className="mx-auto w-full max-w-[1440px] px-6 pt-5 pb-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm font-medium leading-5 text-[#475467] hover:text-[#1D2939] transition-colors"
        >
          <svg viewBox="0 0 20 20" fill="none" className="size-5" stroke="currentColor" strokeWidth="1.8" aria-hidden>
            <path d="M12.5 5L7.5 10l5 5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </button>
      </div>

      {/* Header package — 1200 wide, left blue accent */}
      <div className="mx-auto w-full max-w-[1440px] px-6 pb-8">
        <div className="mx-auto w-full max-w-[1200px] bg-white border border-[#D0D5DD] border-l-8 border-l-[#79C1E9] rounded-lg overflow-visible">
          <div className="flex flex-col gap-8 px-10 py-8">
            {/* Title row */}
            <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5 pb-0">
              <h1 className="text-2xl font-semibold leading-8 text-[#1D2939] whitespace-nowrap">
                Choose the <span className="text-[#008DC3]">right plan</span> for your business
              </h1>

              <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5 shrink-0">
                {/* Billing toggle + Best Value attached to Annual */}
                <div className="relative pb-5">
                  <div className="inline-flex h-10 items-stretch">
                    <button
                      type="button"
                      onClick={() => setBilling("monthly")}
                      className={`h-10 px-4 text-sm leading-5 border border-[#D0D5DD] rounded-l-lg transition-colors ${
                        billing === "monthly"
                          ? "bg-[#008DC3] text-[#F9FAFB] font-medium border-[#008DC3]"
                          : "bg-white text-[#475467] font-normal hover:bg-[#F9FAFB]"
                      }`}
                    >
                      Monthly Billing
                    </button>
                    <button
                      type="button"
                      onClick={() => setBilling("annual")}
                      className={`h-10 px-4 text-sm leading-5 border border-l-0 border-[#D0D5DD] rounded-r-lg transition-colors ${
                        billing === "annual"
                          ? "bg-[#008DC3] text-[#F9FAFB] font-medium border-[#008DC3]"
                          : "bg-white text-[#475467] font-normal hover:bg-[#F9FAFB]"
                      }`}
                    >
                      Annual Billing
                    </button>
                  </div>
                  {/* Best Value — physically under Annual segment (Figma: mt 32px under 40px group ≈ overlapping) */}
                  <span
                    className={`absolute right-0 top-[32px] inline-flex h-6 items-center rounded px-2 text-xs font-medium leading-[18px] z-10 ${
                      billing === "annual"
                        ? "bg-[#EEF0F9] text-[#6572B4]"
                        : "bg-[#E5F3FC] text-[#008DC3]"
                    }`}
                  >
                    Best Value
                  </span>
                </div>

                {billing === "annual" && (
                  <div className="bg-[#F2F9F7] border border-[#CDE9E0] rounded-lg px-4 py-2 flex flex-col gap-1 max-w-[270px]">
                    <div className="flex items-start gap-2">
                      <span className="pt-0.5"><CheckCircleOutline /></span>
                      <p className="text-xs font-medium leading-[18px] text-[#026B5C]">Save with annual:</p>
                    </div>
                    <p className="text-xs font-normal leading-[18px] text-[#0D7867] pl-[22px]">
                      Pay for only 10 months and receive:
                      <br />
                      12 months of access · 1,000 bonus credits
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="h-px w-full bg-[#EAECF0]" />

            {/* Goals */}
            <div className="flex flex-col items-center gap-4">
              <p className="text-base font-medium leading-6 text-[#475467] text-center">
                Tell us your goal, we&apos;ll recommend the best fit
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {GOAL_CHIPS.map((chip) => {
                  const selected = goal === chip.id;
                  return (
                    <button
                      key={chip.id}
                      type="button"
                      onClick={() => selectGoal(chip.id)}
                      className={`h-8 px-3 rounded-md text-sm font-medium leading-5 border transition-colors ${
                        selected
                          ? "border-[#008DC3] bg-[#F1F9FD] text-[#00729F] ring-1 ring-[#008DC3]"
                          : "border-[#D0D5DD] bg-white text-[#475467] hover:bg-[#F9FAFB]"
                      }`}
                    >
                      {chip.label}
                    </button>
                  );
                })}
              </div>
              <p className="text-base leading-6 text-center text-[#475467]">
                Unsure of which plan to choose? Contact us at{" "}
                <a href="tel:8777083844" className="font-semibold text-[#008DC3]">877.708.3844</a>
                {" "}or{" "}
                <a href="mailto:genie@data-axle.com" className="font-semibold text-[#008DC3]">genie@data-axle.com</a>.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing cards — 1392 / 4×330 with gaps */}
      <div className="mx-auto w-full max-w-[1440px] px-6 pb-10">
        <div className="mx-auto w-full max-w-[1392px] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch pt-2">
          {PLANS.map((plan) => {
            const pricing = billing === "monthly" ? plan.monthly : plan.annual;
            const isSelected = selectedPlan === plan.id;
            const isBuy = plan.id === "buy-list";
            const ctaPrimary = isSelected;

            return (
              <div
                key={plan.id}
                role="button"
                tabIndex={0}
                onClick={() => selectCard(plan.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    selectCard(plan.id);
                  }
                }}
                className={`relative bg-white rounded-xl flex flex-col cursor-pointer transition-[box-shadow,border-color] overflow-visible ${
                  isSelected
                    ? "border-2 border-[#008DC3]"
                    : "border border-[#D0D5DD] hover:border-[#98A2B3]"
                }`}
                style={{ boxShadow: CARD_SHADOW }}
              >
                {plan.popular && (
                  <>
                    <div className="absolute top-0 left-0 right-0 h-2 bg-[#008DC3] rounded-t-[10px]" />
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
                      <span className="inline-flex h-6 items-center rounded px-2.5 text-[11px] font-semibold tracking-wide uppercase bg-[#008DC3] text-white whitespace-nowrap">
                        Most Popular
                      </span>
                    </div>
                  </>
                )}

                <div className="px-6 pt-8 pb-6 flex flex-col gap-6 flex-1">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium leading-5 text-[#475467]">{plan.category}</p>
                      <h2 className="text-2xl font-semibold leading-8 text-[#008DC3]">{plan.name}</h2>
                      <p className="text-sm font-normal leading-5 text-[#475467] min-h-[40px]">{plan.description}</p>
                    </div>

                    <div className="flex flex-col gap-4">
                      {isBuy ? (
                        <p className="font-semibold text-[#1D2939] tracking-[-0.72px] text-[36px] leading-[44px]">
                          $-.--
                        </p>
                      ) : (
                        <div className="flex items-start">
                          <span className="text-sm font-normal leading-5 text-[#475467] pt-1 w-[59px]">Starting</span>
                          <p className="font-semibold text-[#1D2939] tracking-[-0.72px]">
                            <span className="text-[23px] leading-[44px]">$</span>
                            <span className="text-[36px] leading-[44px]">{pricing.display}</span>
                            <span className="text-base leading-6 font-semibold">{pricing.suffix}</span>
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
                        {billing === "annual" && pricing.strikePrice ? (
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
                      ctaPrimary
                        ? "bg-[#008DC3] border border-[#008DC3] text-white hover:bg-[#00729F]"
                        : "bg-white border border-[#D0D5DD] text-[#475467] hover:bg-[#F9FAFB]"
                    }`}
                  >
                    {plan.cta}
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
                      {plan.includedItems.map((item) => (
                        <div key={item.label} className="flex items-start gap-2">
                          <div className="pt-0.5"><CheckIcon /></div>
                          <span className={`text-sm leading-5 text-[#475467] flex-1 ${item.bold ? "font-semibold" : "font-normal"}`}>
                            {item.label}
                          </span>
                          {item.info && <InfoIcon />}
                          {item.chevron && (
                            <svg viewBox="0 0 14 14" className="size-3.5 text-[#475467]" fill="none" aria-hidden>
                              <path d="M3.5 5.5L7 9l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                          )}
                        </div>
                      ))}
                    </div>

                    {plan.notIncludedItems && (
                      <div className="flex flex-col gap-4">
                        <p className="text-sm font-semibold leading-5 text-[#667085]">{plan.notIncludedTitle}</p>
                        {plan.notIncludedItems.map((item) => (
                          <div key={item.label} className={`flex items-center gap-2 ${item.nested ? "pl-4" : ""}`}>
                            <XIcon />
                            <span className="text-sm font-normal leading-5 text-[#475467] flex-1">{item.label}</span>
                            {item.info && <InfoIcon />}
                          </div>
                        ))}
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
                            <InfoIcon />
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

      {/* Comparison — sticky header stops before Additional Features */}
      <div className="mx-auto w-full max-w-[1440px] px-6 pb-6">
        <div className="mx-auto w-full max-w-[1392px] bg-white border border-[#D0D5DD] rounded-xl overflow-hidden">
          {/* Sticky boundary: only Sales / Engagement / Customer success */}
          <div>
            <div
              className="sticky top-0 z-20 grid grid-cols-4 bg-white border-b border-[#EAECF0] shadow-[0_1px_0_rgba(71,84,103,0.06)]"
              style={{ gridTemplateColumns: "minmax(280px,1.05fr) repeat(3, minmax(0,1fr))" }}
            >
              <div className="px-6 py-5">
                <h2 className="text-lg font-semibold leading-7 text-[#008DC3]">Compare subscription plans</h2>
                <p className="text-sm font-normal leading-5 text-[#667085] mt-2 max-w-[262px]">
                  Dig into the details when you need validation — pricing cards remain the primary path to choose.
                </p>
              </div>
              {(["basic", "pro", "team"] as const).map((id) => {
                const plan = PLANS.find((p) => p.id === id)!;
                return (
                  <div key={id} className="px-4 py-4 flex flex-col items-center justify-center gap-2 border-l border-[#EAECF0] bg-white">
                    <p className="text-lg font-semibold leading-7 text-[#008DC3]">{plan.name}</p>
                    <p className="text-[28px] font-semibold leading-10 tracking-tight text-[#1D2939]">
                      {planPriceLabel(id, "monthly")}
                    </p>
                    <button
                      type="button"
                      onClick={() => onSelectPlan(id, billing)}
                      className="w-full max-w-[248px] h-8 rounded-lg text-sm font-medium leading-5 bg-white text-[#475467] border border-[#D0D5DD] shadow-sm hover:bg-[#F9FAFB]"
                    >
                      {plan.cta}
                    </button>
                  </div>
                );
              })}
            </div>

            {COMPARE_SECTIONS.map((section) => (
              <div key={section.title}>
                <div
                  className="grid bg-[#F9FAFB] border-b border-[#EAECF0]"
                  style={{ gridTemplateColumns: "minmax(280px,1.05fr) repeat(3, minmax(0,1fr))" }}
                >
                  <div className="px-6 py-2 flex items-center gap-2">
                    {sectionIcon(section.title)}
                    <span className="text-sm font-semibold leading-5 text-[#1D2939]">{section.title}</span>
                  </div>
                  <div className="border-l border-[#EAECF0]" />
                  <div className="border-l border-[#EAECF0]" />
                  <div className="border-l border-[#EAECF0]" />
                </div>
                {section.rows.map((row, idx) => (
                  <div
                    key={row.label}
                    className={`grid border-b border-[#EAECF0] min-h-9 ${idx % 2 === 1 ? "bg-[#F9FAFB]/40" : "bg-white"}`}
                    style={{ gridTemplateColumns: "minmax(280px,1.05fr) repeat(3, minmax(0,1fr))" }}
                  >
                    <div className="px-6 py-2 flex items-center gap-1 text-sm leading-5 text-[#475467]">
                      {row.label}
                      {row.info && <InfoIcon />}
                    </div>
                    <div className="border-l border-[#EAECF0] px-3 py-2 flex items-center justify-center">
                      <CellValue val={row.basic} />
                    </div>
                    <div className="border-l border-[#EAECF0] px-3 py-2 flex items-center justify-center">
                      <CellValue val={row.pro} />
                    </div>
                    <div className="border-l border-[#EAECF0] px-3 py-2 flex items-center justify-center">
                      <CellValue val={row.team} />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Additional Features — outside sticky parent so sticky ends */}
          <div className="bg-[#F8F7FF]">
            <div className="px-6 py-2.5 flex items-center gap-2 border-y border-[#C9BFFD] bg-[#F2EFFF]">
              <DiamondIcon />
              <span className="text-sm font-semibold leading-5 text-[#1D2939]">Additional Features</span>
              <AddonChip />
            </div>
            {ADDON_ROWS.map((row) => (
              <div
                key={row.title}
                className="grid border-b border-[#C9BFFD] last:border-b-0"
                style={{ gridTemplateColumns: "minmax(280px,1.05fr) minmax(0,3fr)" }}
              >
                <div className="px-6 py-4">
                  <p className="text-sm font-semibold leading-5 text-[#1D2939]">{row.title}</p>
                  <p className="text-sm font-normal leading-5 text-[#667085] mt-1">{row.description}</p>
                </div>
                <div className="border-l border-[#C9BFFD] px-6 py-4 flex items-center bg-[#F8F7FF]">
                  <p className="text-sm font-normal leading-5 text-[#475467]">{row.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom solutions */}
      <div className="mx-auto w-full max-w-[1440px] px-6 pb-12">
        <div className="mx-auto w-full max-w-[1392px] border border-[#D0D5DD] rounded-xl bg-[#F1F9FD] px-6 py-4 text-center text-sm leading-5 text-[#475467]">
          <strong className="text-[#1D2939]">Looking for custom solutions?</strong>{" "}
          Contact us at{" "}
          <a href="tel:8777083844" className="font-semibold text-[#008DC3]">877.708.3844</a>
          {" "}or{" "}
          <a href="mailto:genie@data-axle.com" className="font-semibold text-[#008DC3]">genie@data-axle.com</a>.
        </div>
      </div>
    </div>
  );
}
