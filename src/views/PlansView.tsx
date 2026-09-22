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
    <svg viewBox="0 0 14 14" fill="none" className="size-3.5 shrink-0">
      <circle cx="7" cy="7" r="7" fill="#0BA38C" />
      <path d="M4 7l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 14 14" fill="none" className="size-3.5 shrink-0">
      <circle cx="7" cy="7" r="6.25" stroke="#C55418" strokeWidth="1.5" />
      <path d="M4.5 4.5l5 5M9.5 4.5l-5 5" stroke="#C55418" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg viewBox="0 0 14 14" fill="none" className="size-3.5 shrink-0 text-[#98A2B3]">
      <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M7 6.5v3M7 4.5h.01" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 14 14" fill="none" className="size-3.5 shrink-0 text-[#0BA38C]">
      <path d="M7 2.5v9M2.5 7h9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg viewBox="0 0 14 14" fill="none" className="size-3.5 shrink-0 text-[#475467]">
      <path d="M1.5 7s2.2-3.5 5.5-3.5S12.5 7 12.5 7s-2.2 3.5-5.5 3.5S1.5 7 1.5 7z" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="7" cy="7" r="1.6" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function WalletIcon() {
  return (
    <svg viewBox="0 0 14 14" fill="none" className="size-3.5 shrink-0 text-[#475467]">
      <rect x="1.5" y="3.5" width="11" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M1.5 6h11" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="10" cy="8.5" r="0.9" fill="currentColor" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg viewBox="0 0 14 14" fill="none" className="size-3.5 shrink-0 text-[#475467]">
      <circle cx="5" cy="5" r="2" stroke="currentColor" strokeWidth="1.2" />
      <path d="M1.5 11.5c0-1.8 1.6-3 3.5-3s3.5 1.2 3.5 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="10" cy="5.5" r="1.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M12.5 11.5c0-1.3-1-2.3-2.5-2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function MedalIcon() {
  return (
    <svg viewBox="0 0 14 14" fill="none" className="size-3.5 shrink-0 text-[#475467]">
      <circle cx="7" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.2" />
      <path d="M5 1.5l2 2.5 2-2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LeafIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-4 shrink-0 text-[#0D7867]">
      <path d="M13 3c-4 0-9 3-9 8 0 0 3.5-1 6.5-3.5S13 3 13 3z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M4 14c2-3 5-5 9-6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function AddonChip() {
  return (
    <span className="inline-flex h-6 items-center rounded px-2 text-xs font-medium text-[#F6F8FC] bg-[#764FD9]">
      Add-on
    </span>
  );
}

function CellValue({ val }: { val: CellVal }) {
  if (val === true) return <div className="flex justify-center"><CheckIcon /></div>;
  if (val === false) return <div className="flex justify-center"><XIcon /></div>;
  return (
    <span className="text-sm text-[#475467] text-center inline-flex items-center gap-1 justify-center">
      {val}
      {(val === "uses credits" || val === "unlock with credit purchase" || val === "Includes 5") && <InfoIcon />}
    </span>
  );
}

function BenefitIcon({ planId }: { planId: PlanId }) {
  if (planId === "basic") return <EyeIcon />;
  if (planId === "pro") return <WalletIcon />;
  if (planId === "team") return <UsersIcon />;
  return <MedalIcon />;
}

export default function PlansView({ onBack, onSelectPlan, onSearchLeads }: PlansViewProps) {
  const [billing, setBilling] = useState<BillingPeriod>("monthly");
  const [goal, setGoal] = useState<GoalId | null>(null);
  const recommended = goal ? GOAL_CHIPS.find((g) => g.id === goal)?.recommends : null;

  function handleCta(planId: PlanId) {
    if (planId === "buy-list") {
      onSearchLeads();
      return;
    }
    onSelectPlan(planId, billing);
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-[#F2F4F7]">
      <div className="px-6 pt-4 pb-2">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#475467] hover:text-[#1D2939] transition-colors"
        >
          <svg viewBox="0 0 20 20" fill="none" className="size-5" stroke="currentColor" strokeWidth="1.8">
            <path d="M12.5 5L7.5 10l5 5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </button>
      </div>

      {/* Header panel */}
      <div className="px-6 pb-6">
        <div className="max-w-[1200px] mx-auto bg-white border border-[#D0D5DD] rounded-xl px-10 py-8 shadow-[0_1px_3px_rgba(71,84,103,0.04)]">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 pb-6 border-b border-[#EAECF0]">
            <h1 className="text-2xl font-semibold text-[#1D2939] leading-8 tracking-tight pt-1">
              Choose the <span className="text-[#008DC3]">right plan</span> for your business
            </h1>

            <div className="flex flex-col sm:flex-row items-start gap-3">
              <div className="relative">
                <div className="inline-flex rounded-lg border border-[#D0D5DD] overflow-hidden bg-white">
                  <button
                    onClick={() => setBilling("monthly")}
                    className={`px-3.5 py-2.5 text-sm font-medium transition-colors ${
                      billing === "monthly"
                        ? "bg-[#008DC3] text-white"
                        : "bg-white text-[#475467] hover:bg-[#F9FAFB]"
                    }`}
                  >
                    Monthly Billing
                  </button>
                  <button
                    onClick={() => setBilling("annual")}
                    className={`px-3.5 py-2.5 text-sm font-medium transition-colors ${
                      billing === "annual"
                        ? "bg-[#008DC3] text-white"
                        : "bg-white text-[#475467] hover:bg-[#F9FAFB]"
                    }`}
                  >
                    Annual Billing
                  </button>
                </div>
                <span className="absolute left-1/2 -translate-x-[-8px] top-full mt-1 inline-flex h-6 items-center rounded px-2 text-xs font-medium bg-[#F1F9FD] text-[#00729F] border border-[#79C1E9]">
                  Best Value
                </span>
              </div>

              {billing === "annual" && (
                <div className="flex items-start gap-2 bg-[#F2F9F7] border border-[#CDE9E0] rounded-lg px-3 py-2 max-w-[270px]">
                  <LeafIcon />
                  <p className="text-xs leading-[18px] text-[#026B5C]">
                    <span className="font-semibold">Save with annual:</span> Pay for only 10 months and receive: 12 months of access + 1,000 bonus credits.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="pt-6 flex flex-col items-center gap-4">
            <p className="text-base font-medium text-[#475467] text-center">
              Tell us your goal, we&apos;ll recommend the best fit
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {GOAL_CHIPS.map((chip) => {
                const selected = goal === chip.id;
                return (
                  <button
                    key={chip.id}
                    onClick={() => setGoal(selected ? null : chip.id)}
                    className={`h-8 px-3 rounded-md text-sm font-medium border transition-colors ${
                      selected
                        ? "border-[#008DC3] bg-[#F1F9FD] text-[#00729F]"
                        : "border-[#D0D5DD] bg-white text-[#475467] hover:bg-[#F9FAFB]"
                    }`}
                  >
                    {chip.label}
                  </button>
                );
              })}
            </div>
            <p className="text-base text-center text-[#475467]">
              Unsure of which plan to choose? Contact us at{" "}
              <span className="font-semibold text-[#008DC3]">877.708.3844</span>
              {" "}or{" "}
              <span className="font-semibold text-[#008DC3]">genie@data-axle.com</span>.
            </p>
          </div>
        </div>
      </div>

      {/* Pricing cards */}
      <div className="px-6 pb-8">
        <div className="max-w-[1392px] mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 items-stretch">
          {PLANS.map((plan) => {
            const pricing = billing === "monthly" ? plan.monthly : plan.annual;
            const isRecommended = recommended === plan.id;
            const isBuy = plan.id === "buy-list";

            return (
              <div
                key={plan.id}
                className={`relative bg-white rounded-xl border border-[#D0D5DD] flex flex-col ${
                  plan.popular ? "border-t-8 border-t-[#008DC3]" : ""
                } ${isRecommended ? "ring-2 ring-[#008DC3] ring-offset-2" : ""}`}
                style={{
                  boxShadow:
                    "0px 1px 3px rgba(71,84,103,0.04), 0px 5px 5px rgba(71,84,103,0.03), 0px 11px 7px rgba(71,84,103,0.02)",
                }}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <span className="inline-flex h-6 items-center rounded px-2.5 text-[11px] font-semibold tracking-wide uppercase bg-[#008DC3] text-white whitespace-nowrap">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="px-6 pt-8 pb-6 flex flex-col gap-6 flex-1">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium text-[#475467] uppercase tracking-wide">{plan.category}</p>
                      <h2 className="text-2xl font-semibold text-[#008DC3] leading-8">{plan.name}</h2>
                      <p className="text-sm text-[#475467] leading-5 min-h-[40px]">{plan.description}</p>
                    </div>

                    <div className="flex flex-col gap-4">
                      {isBuy ? (
                        <p className="font-semibold text-[#1D2939] tracking-[-0.72px] text-[36px] leading-[44px]">
                          $-.--
                        </p>
                      ) : (
                        <div className="flex items-start">
                          <span className="text-sm text-[#475467] pt-1 w-[59px]">Starting</span>
                          <p className="font-semibold text-[#1D2939] tracking-[-0.72px]">
                            <span className="text-[23px] leading-[44px]">$</span>
                            <span className="text-[36px] leading-[44px]">{pricing.display}</span>
                            <span className="text-base leading-6 font-semibold">{pricing.suffix}</span>
                          </p>
                        </div>
                      )}

                      <div className={`text-sm leading-5 ${billing === "annual" && !isBuy ? "text-[#0D7867]" : isBuy ? "text-[#0D7867]" : "text-[#475467]"}`}>
                        {billing === "annual" && pricing.strikePrice ? (
                          <>
                            <span className="font-semibold line-through">${pricing.strikePrice}</span>
                            <span className="font-semibold">/yr</span>
                            <span> - Billed annually</span>
                            <br />
                            Only 10 months’ cost when paid upfront
                          </>
                        ) : (
                          pricing.supportLines.map((line) => (
                            <p key={line}>{line}</p>
                          ))
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <BenefitIcon planId={plan.id} />
                        <span className="text-sm font-medium text-[#475467]">{pricing.benefit}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCta(plan.id)}
                    className={`w-full h-10 rounded-lg text-sm font-medium transition-colors ${
                      plan.ctaPrimary
                        ? "bg-[#008DC3] border border-[#008DC3] text-white hover:bg-[#00729F]"
                        : "bg-white border border-[#D0D5DD] text-[#475467] hover:bg-[#F9FAFB]"
                    }`}
                  >
                    {plan.cta}
                  </button>

                  <div className="flex flex-col gap-8 pt-1">
                    {plan.accessItems.length > 0 && (
                      <div className="flex flex-col gap-4">
                        <p className="text-sm font-semibold text-[#667085]">{plan.accessTitle}</p>
                        {plan.accessItems.map((item) => (
                          <div key={item} className="flex items-center gap-2">
                            <CheckIcon />
                            <span className="text-sm text-[#475467]">{item}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex flex-col gap-4">
                      <p className="text-sm font-semibold text-[#667085]">{plan.includedTitle}</p>
                      {plan.includedItems.map((item) => (
                        <div key={item.label} className="flex items-start gap-2">
                          <div className="pt-0.5"><CheckIcon /></div>
                          <span className={`text-sm text-[#475467] flex-1 ${item.bold ? "font-semibold" : ""}`}>
                            {item.label}
                          </span>
                          {item.info && <InfoIcon />}
                          {item.chevron && (
                            <svg viewBox="0 0 14 14" className="size-3.5 text-[#475467]" fill="currentColor">
                              <path d="M3.5 5.5L7 9l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                          )}
                        </div>
                      ))}
                    </div>

                    {plan.notIncludedItems && (
                      <div className="flex flex-col gap-4">
                        <p className="text-sm font-semibold text-[#667085]">{plan.notIncludedTitle}</p>
                        {plan.notIncludedItems.map((item) => (
                          <div
                            key={item.label}
                            className={`flex items-center gap-2 ${item.nested ? "pl-4" : ""}`}
                          >
                            <XIcon />
                            <span className="text-sm text-[#475467] flex-1">{item.label}</span>
                            {item.info && <InfoIcon />}
                          </div>
                        ))}
                      </div>
                    )}

                    {plan.addons && (
                      <div className="flex flex-col gap-4">
                        <p className="text-sm font-semibold text-[#667085]">Additional features</p>
                        {plan.addons.map((addon) => (
                          <div key={addon.label} className="flex items-center gap-2">
                            <PlusIcon />
                            <span className="text-sm text-[#475467]">{addon.label}</span>
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

      {/* Comparison table */}
      <div className="px-6 pb-8">
        <div className="max-w-[1392px] mx-auto bg-white border border-[#D0D5DD] rounded-xl overflow-hidden">
          <div className="grid grid-cols-4 gap-0 border-b border-[#EAECF0]">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-[#1D2939] leading-7">Compare subscription plans</h2>
              <p className="text-sm text-[#667085] mt-2 leading-5">
                Dig into the details when you need validation — pricing cards remain the primary path to choose.
              </p>
            </div>
            {(["basic", "pro", "team"] as const).map((id) => {
              const plan = PLANS.find((p) => p.id === id)!;
              return (
                <div key={id} className="p-4 flex flex-col items-center justify-center gap-2 border-l border-[#EAECF0]">
                  <p className="text-lg font-semibold text-[#1D2939]">{plan.name}</p>
                  <p className="text-[28px] font-semibold text-[#1D2939] tracking-tight leading-10">
                    {planPriceLabel(id, "monthly")}
                  </p>
                  <button
                    onClick={() => onSelectPlan(id, billing)}
                    className={`w-full max-w-[248px] h-8 rounded-lg text-sm font-medium ${
                      plan.ctaPrimary
                        ? "bg-[#008DC3] text-white border border-[#008DC3]"
                        : "bg-white text-[#475467] border border-[#D0D5DD]"
                    }`}
                  >
                    {plan.cta.replace(" →", "")}
                  </button>
                </div>
              );
            })}
          </div>

          {COMPARE_SECTIONS.map((section) => (
            <div key={section.title}>
              <div className="grid grid-cols-4 bg-[#F9FAFB] border-b border-[#EAECF0]">
                <div className="px-6 py-2 flex items-center gap-2">
                  <span className="text-sm font-semibold text-[#1D2939]">{section.title}</span>
                </div>
                <div className="border-l border-[#EAECF0]" />
                <div className="border-l border-[#EAECF0]" />
                <div className="border-l border-[#EAECF0]" />
              </div>
              {section.rows.map((row) => (
                <div key={row.label} className="grid grid-cols-4 border-b border-[#EAECF0] min-h-9">
                  <div className="px-6 py-2 flex items-center gap-1 text-sm text-[#475467]">
                    {row.label}
                    {row.info && <InfoIcon />}
                  </div>
                  <div className="border-l border-[#EAECF0] px-4 py-2 flex items-center justify-center">
                    <CellValue val={row.basic} />
                  </div>
                  <div className="border-l border-[#EAECF0] px-4 py-2 flex items-center justify-center">
                    <CellValue val={row.pro} />
                  </div>
                  <div className="border-l border-[#EAECF0] px-4 py-2 flex items-center justify-center">
                    <CellValue val={row.team} />
                  </div>
                </div>
              ))}
            </div>
          ))}

          {/* Additional features */}
          <div className="bg-[#F8F7FF] border-t border-[#C9BFFD]">
            <div className="px-6 py-3 flex items-center gap-2 border-b border-[#C9BFFD]/bg-[#F2EFFF]">
              <span className="text-sm font-semibold text-[#1D2939]">Additional Features</span>
              <AddonChip />
            </div>
            {ADDON_ROWS.map((row) => (
              <div key={row.title} className="grid grid-cols-4 border-b border-[#C9BFFD] last:border-b-0">
                <div className="px-6 py-4">
                  <p className="text-sm font-semibold text-[#1D2939]">{row.title}</p>
                  <p className="text-sm text-[#667085] mt-1 leading-5">{row.description}</p>
                </div>
                <div className="col-span-3 border-l border-[#C9BFFD] px-6 py-4 flex items-center">
                  <p className="text-sm text-[#475467]">{row.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer contact */}
      <div className="px-6 pb-10">
        <div className="max-w-[1392px] mx-auto border border-[#D0D5DD] rounded-xl bg-white px-6 py-4 text-center text-sm text-[#475467]">
          <strong className="text-[#1D2939]">Looking for custom solutions?</strong>{" "}
          Contact us at <span className="font-semibold text-[#008DC3]">877.708.3844</span> or{" "}
          <span className="font-semibold text-[#008DC3]">genie@data-axle.com</span>.
        </div>
      </div>
    </div>
  );
}
