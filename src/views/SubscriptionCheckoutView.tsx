import { useState } from "react";
import type { BillingPeriod, PlanId } from "../data/pricingPlans";
import { PLANS } from "../data/pricingPlans";

interface SubscriptionCheckoutViewProps {
  planId: Exclude<PlanId, "buy-list">;
  billing: BillingPeriod;
  onBack: () => void;
  onComplete: () => void;
}

const PLAN_META = {
  basic: { seats: 1, credits: 0, monthly: 99, annualList: 1188, annualPay: 990 },
  pro: { seats: 1, credits: 500, monthly: 149, annualList: 1788, annualPay: 1490 },
  team: { seats: 5, credits: 500, monthly: 299, annualList: 3588, annualPay: 2990 },
} as const;

export default function SubscriptionCheckoutView({
  planId,
  billing: initialBilling,
  onBack,
  onComplete,
}: SubscriptionCheckoutViewProps) {
  const plan = PLANS.find((p) => p.id === planId)!;
  const meta = PLAN_META[planId];
  const [billing, setBilling] = useState<BillingPeriod>(initialBilling);
  const [credits, setCredits] = useState<number>(meta.credits);
  const [buyerIntent, setBuyerIntent] = useState(false);
  const [purchaseSignals, setPurchaseSignals] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(true);
  const [billingMatch, setBillingMatch] = useState(true);

  const baseMonthly = meta.monthly;
  const annualList = meta.annualList;
  const annualPay = meta.annualPay;
  const addonMonthly = (buyerIntent ? 50 : 0) + (purchaseSignals ? 50 : 0);
  const addonAnnual = addonMonthly * 10;

  const planLine =
    billing === "monthly"
      ? baseMonthly + addonMonthly
      : annualPay + addonAnnual;
  const savings = billing === "annual" ? annualList - annualPay : 0;

  const payableDisplay =
    billing === "monthly"
      ? `$${(baseMonthly + addonMonthly).toLocaleString()}.00/mo`
      : `$${planLine.toLocaleString()}.00`;

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-[#F2F4F7]">
      <div className="flex items-center gap-3 px-6 py-4 shrink-0 bg-white border-b border-[#EAECF0]">
        <button
          onClick={onBack}
          className="text-[#475467] hover:text-[#1D2939] p-1 rounded hover:bg-[#F2F4F7] transition-colors"
        >
          <svg viewBox="0 0 20 20" fill="none" className="size-5" stroke="currentColor" strokeWidth="2">
            <path d="M12 5L7 10l5 5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <h1 className="text-xl font-semibold text-[#1D2939]">Checkout</h1>
      </div>

      <div className="flex-1 px-6 py-8">
        <div className="max-w-[1100px] mx-auto flex flex-col lg:flex-row gap-8 items-start">
          <div className="flex-1 flex flex-col gap-6">
            {/* Credits */}
            <div className="bg-white border border-[#EAECF0] rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-[#1D2939]">Configure your credits</h3>
                <div className="border border-[#D0D5DD] rounded-lg px-3 py-1.5 text-sm font-medium text-[#1D2939] tabular-nums min-w-[64px] text-center">
                  {credits}
                </div>
              </div>
              <input
                type="range"
                min={0}
                max={5000}
                step={50}
                value={credits}
                onChange={(e) => setCredits(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer accent-[#008DC3]"
                style={{
                  background: `linear-gradient(to right, #008DC3 ${(credits / 5000) * 100}%, #E4E7EC ${(credits / 5000) * 100}%)`,
                }}
              />
              <p className="text-sm text-[#667085] mt-3">
                {meta.credits === 0
                  ? "Your selected plan does not include any shared credits. Add credits anytime before checkout"
                  : `Your ${plan.name} plan includes ${meta.credits} credits/month. Adjust if you need more.`}
              </p>
            </div>

            {/* Payment plan */}
            <div className="bg-white border border-[#EAECF0] rounded-xl p-6">
              <h3 className="text-base font-semibold text-[#1D2939] mb-4">Payment plan</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => setBilling("monthly")}
                  className={`text-left rounded-xl border p-4 transition-colors ${
                    billing === "monthly" ? "border-[#008DC3] bg-[#F1F9FD]" : "border-[#D0D5DD] bg-white"
                  }`}
                >
                  <p className="text-xl font-semibold text-[#1D2939]">${baseMonthly.toFixed(2)}/mo</p>
                  <p className="text-sm text-[#667085] mt-1">Pay monthly • Annual contract</p>
                </button>
                <button
                  onClick={() => setBilling("annual")}
                  className={`text-left rounded-xl border p-4 transition-colors ${
                    billing === "annual" ? "border-[#008DC3] bg-[#F1F9FD]" : "border-[#D0D5DD] bg-white"
                  }`}
                >
                  <p className="text-xl font-semibold text-[#1D2939]">
                    <span className="line-through text-[#98A2B3] text-base mr-2">${annualList}</span>
                    ${annualPay.toLocaleString()}.00
                  </p>
                  <p className="text-sm text-[#0D7867] mt-1">
                    Upfront payment for 10 months + get 1000 bonus credits
                  </p>
                </button>
              </div>
              <p className="text-sm text-[#667085] mt-3">
                Membership renews <strong className="text-[#1D2939]">Feb 01, 2027</strong>
              </p>
            </div>

            {/* Add-ons */}
            <div className="bg-white border border-[#EAECF0] rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-base font-semibold text-[#1D2939]">Additional features</h3>
                <span className="inline-flex h-6 items-center rounded px-2 text-xs font-medium text-[#F6F8FC] bg-[#764FD9]">
                  Add-on
                </span>
              </div>
              <div className="flex flex-col gap-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={buyerIntent}
                    onChange={(e) => setBuyerIntent(e.target.checked)}
                    className="mt-1 size-4 accent-[#008DC3]"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between gap-4">
                      <span className="text-sm font-semibold text-[#1D2939]">Buyer Intent</span>
                      <span className="text-sm font-medium text-[#1D2939]">$50/mo</span>
                    </div>
                    <p className="text-sm text-[#667085] mt-0.5">
                      Discover businesses actively researching solutions like yours.
                    </p>
                  </div>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={purchaseSignals}
                    onChange={(e) => setPurchaseSignals(e.target.checked)}
                    className="mt-1 size-4 accent-[#008DC3]"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between gap-4">
                      <span className="text-sm font-semibold text-[#1D2939]">Purchase Signals</span>
                      <span className="text-sm font-medium text-[#1D2939]">$50/mo</span>
                    </div>
                    <p className="text-sm text-[#667085] mt-0.5">
                      Identify households showing purchase propensity for your offers.
                    </p>
                  </div>
                </label>
                <div className="pl-7">
                  <p className="text-sm font-semibold text-[#1D2939]">Consumer Cell phone</p>
                  <p className="text-sm text-[#667085] mt-0.5">
                    Contact us at 877.708.3844 or genie@data-axle.com for pricing.
                  </p>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="bg-white border border-[#EAECF0] rounded-xl p-6">
              <h3 className="text-base font-semibold text-[#1D2939] mb-1">Location address</h3>
              <p className="text-sm text-[#667085] mb-5">Please provide us details of your location address.</p>
              <div className="flex flex-col gap-5">
                <div className="relative">
                  <label className="absolute -top-2.5 left-3 bg-white px-1 text-[11px] text-[#667085]">Contact name</label>
                  <input
                    type="text"
                    defaultValue="Frank Smith"
                    className="w-full border border-[#D0D5DD] rounded-lg px-4 py-3 text-sm text-[#1D2939] focus:outline-none focus:border-[#008DC3]"
                  />
                </div>
                <div className="relative">
                  <label className="absolute -top-2.5 left-3 bg-white px-1 text-[11px] text-[#667085]">Billing Address</label>
                  <input
                    type="text"
                    defaultValue="1800 Owens St"
                    className="w-full border border-[#D0D5DD] rounded-lg px-4 py-3 text-sm text-[#1D2939] focus:outline-none focus:border-[#008DC3]"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {(["City", "State", "ZIP"] as const).map((label, i) => (
                    <div key={label} className="relative">
                      <label className="absolute -top-2.5 left-3 bg-white px-1 text-[11px] text-[#667085]">{label}</label>
                      <input
                        type="text"
                        defaultValue={i === 0 ? "San Francisco" : i === 1 ? "CA" : "94158"}
                        className="w-full border border-[#D0D5DD] rounded-lg px-4 py-3 text-sm text-[#1D2939] focus:outline-none focus:border-[#008DC3]"
                      />
                    </div>
                  ))}
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={billingMatch}
                    onChange={(e) => setBillingMatch(e.target.checked)}
                    className="size-4 accent-[#008DC3]"
                  />
                  <span className="text-sm text-[#344054]">Billing address same as Location address</span>
                </label>
              </div>
            </div>
          </div>

          {/* Order summary */}
          <div className="w-full lg:w-[320px] shrink-0">
            <div className="bg-white border border-[#EAECF0] rounded-xl p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-[#1D2939]">Order Summary</h3>
              <p className="text-sm text-[#667085] mt-1 mb-5">
                {billing === "annual"
                  ? "Annual contract with upfront payment"
                  : "Annual contract with monthly payment deductions"}
              </p>

              <div className="flex flex-col gap-3 text-sm">
                <div className="flex justify-between gap-3">
                  <span className="text-[#475467]">
                    {plan.name} Plan ({credits} credits • {meta.seats} seat{meta.seats > 1 ? "s" : ""})
                  </span>
                  <span className="font-medium text-[#1D2939] whitespace-nowrap">
                    ${billing === "annual" ? annualList.toLocaleString() : baseMonthly.toLocaleString()}.00
                  </span>
                </div>
                {buyerIntent && (
                  <div className="flex justify-between gap-3">
                    <span className="text-[#475467]">Buyer Intent Add-on</span>
                    <span className="font-medium text-[#1D2939]">
                      ${billing === "annual" ? "500.00" : "50.00"}
                    </span>
                  </div>
                )}
                {purchaseSignals && (
                  <div className="flex justify-between gap-3">
                    <span className="text-[#475467]">Purchase Signals Add-on</span>
                    <span className="font-medium text-[#1D2939]">
                      ${billing === "annual" ? "500.00" : "50.00"}
                    </span>
                  </div>
                )}
                {billing === "annual" && (
                  <>
                    <div className="flex justify-between gap-3">
                      <span className="text-[#0D7867]">Annual savings (pay for only 10 months)</span>
                      <span className="font-medium text-[#0D7867]">-${savings}</span>
                    </div>
                    <div className="flex justify-between gap-3">
                      <span className="text-[#0D7867]">Bonus credits</span>
                      <span className="font-medium text-[#0D7867]">+1,000</span>
                    </div>
                  </>
                )}
                <div className="flex justify-between gap-3">
                  <span className="text-[#475467]">Estimated tax</span>
                  <span className="font-medium text-[#1D2939]">$0.00</span>
                </div>
                <div className="border-t border-[#EAECF0] pt-3 mt-1 flex justify-between items-start">
                  <span className="text-base font-semibold text-[#1D2939]">Payable amount</span>
                  <span className="text-xl font-semibold text-[#1D2939]">{payableDisplay}</span>
                </div>
              </div>

              <label className="flex items-start gap-2 mt-5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={termsAgreed}
                  onChange={(e) => setTermsAgreed(e.target.checked)}
                  className="mt-0.5 size-4 accent-[#008DC3]"
                />
                <span className="text-xs text-[#475467]">
                  I agree to <span className="text-[#008DC3] font-medium">Terms and Conditions</span> and authorize recurring charges.
                </span>
              </label>

              {billing === "annual" && (
                <div className="mt-4 bg-[#F1F9FD] rounded-lg px-3 py-3 text-xs text-[#00729F]">
                  <p className="font-semibold">Annual billing</p>
                  <p className="mt-1 text-[#475467]">
                    One upfront payment • 12 months access • Only 10 months billed. Auto-renews yearly.
                  </p>
                </div>
              )}

              <button
                onClick={onComplete}
                disabled={!termsAgreed}
                className="w-full mt-4 bg-[#008DC3] border border-[#008DC3] text-white text-sm font-semibold py-3 rounded-lg hover:bg-[#00729F] transition-colors disabled:opacity-50"
              >
                Start subscription
              </button>
              <p className="text-center text-xs text-[#98A2B3] mt-3">Secure payment powered by Stripe</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
