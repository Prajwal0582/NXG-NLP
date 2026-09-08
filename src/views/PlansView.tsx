interface PlansViewProps {
  onBack: () => void;
}

function CheckCircle() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="size-5 shrink-0">
      <circle cx="10" cy="10" r="9" fill="#008dc3" />
      <path d="M6.5 10l2.5 2.5 4.5-4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function XCircle() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="size-5 shrink-0">
      <circle cx="10" cy="10" r="9" fill="#f04438" />
      <path d="M7 7l6 6M13 7l-6 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function InfoTip() {
  return (
    <svg viewBox="0 0 14 14" fill="none" className="size-3.5 text-[#98a2b3] inline-block ml-0.5" stroke="currentColor" strokeWidth="1.3">
      <circle cx="7" cy="7" r="5.5" />
      <path d="M7 6.5v3M7 4.5h.01" strokeLinecap="round" />
    </svg>
  );
}

const PLANS = [
  {
    name: "Basic",
    icon: "📋",
    price: 99,
    desc: "Ideal for day-to-day prospecting and market exploration.",
    credits: null,
    highlighted: false,
  },
  {
    name: "Pro",
    icon: "⚡",
    price: 149,
    desc: "Perfect for developing targeted sales and marketing campaigns to grow your business.",
    credits: 500,
    highlighted: true,
  },
  {
    name: "Team",
    icon: "👥",
    price: 249,
    desc: "Tailored for collaborative teams needing advanced lead and outreach management tools.",
    credits: 500,
    highlighted: true,
  },
];

interface FeatureRow {
  label: string;
  basic: string | boolean;
  pro: string | boolean;
  team: string | boolean;
}

const SALES_TOOLS: FeatureRow[] = [
  { label: "User licenses", basic: "1", pro: "1", team: "includes 5" },
  { label: "Contact information", basic: true, pro: true, team: true },
  { label: "Performance tracking", basic: true, pro: true, team: true },
  { label: "Mobile app", basic: true, pro: true, team: true },
  { label: "Lead management", basic: true, pro: true, team: true },
  { label: "Territory management", basic: false, pro: false, team: true },
  { label: "Exports", basic: false, pro: "uses credits", team: "uses credits" },
];

const ENGAGEMENT: FeatureRow[] = [
  { label: "Customer profile analysis", basic: true, pro: true, team: true },
  { label: "Email addresses", basic: false, pro: "uses credits", team: "uses credits" },
  { label: "Email marketing", basic: false, pro: true, team: true },
  { label: "Direct mail marketing", basic: false, pro: true, team: true },
];

const CUSTOMER_SUCCESS: FeatureRow[] = [
  { label: "Training & support", basic: true, pro: true, team: true },
  { label: "Dedicated advisor", basic: true, pro: true, team: true },
];

function CellValue({ val }: { val: string | boolean }) {
  if (val === true) return <CheckCircle />;
  if (val === false) return <XCircle />;
  if (val === "uses credits") return <span className="text-sm text-[#475467]">uses credits <InfoTip /></span>;
  return <span className="text-sm text-[#1d2939]">{val} {val === "includes 5" && <InfoTip />}</span>;
}

function FeatureTable({ title, icon, rows }: { title: string; icon: string; rows: FeatureRow[] }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-3 border-l-4 border-[#008dc3] pl-3">
        <span className="text-base">{icon}</span>
        <h3 className="text-sm font-semibold text-[#1d2939]">{title}</h3>
      </div>
      <div className="divide-y divide-[#eaecf0]">
        {rows.map((row) => (
          <div key={row.label} className="grid grid-cols-4 py-3 items-center">
            <span className="text-sm text-[#475467]">{row.label} {(row.label === "Email marketing" || row.label === "Direct mail marketing") && <InfoTip />}</span>
            <div className="flex justify-center"><CellValue val={row.basic} /></div>
            <div className="flex justify-center"><CellValue val={row.pro} /></div>
            <div className="flex justify-center"><CellValue val={row.team} /></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PlansView({ onBack }: PlansViewProps) {
  return (
    <div className="flex flex-col h-full overflow-y-auto bg-white">
      {/* Header */}
      <div className="px-6 py-4 shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="text-[#475467] hover:text-[#1d2939] p-1 rounded hover:bg-[#f2f4f7] transition-colors"
          >
            <svg viewBox="0 0 20 20" fill="none" className="size-5" stroke="currentColor" strokeWidth="2">
              <path d="M12 5L7 10l5 5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div>
            <h1 className="text-xl font-semibold text-[#1d2939]">Subscription options</h1>
            <p className="text-sm text-[#667085] mt-0.5">Choose a package best suited to your needs</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pb-10">
        <div className="max-w-[1050px] mx-auto">

          {/* Plan cards row */}
          <div className="grid grid-cols-4 gap-6 mb-10 items-start">
            {/* Hero text */}
            <div className="pt-6">
              <h2 className="text-3xl font-bold text-[#1d2939] leading-tight mb-6">Your lead<br />generation hub</h2>
              <ul className="space-y-2.5">
                <li className="flex items-center gap-2 text-sm text-[#475467]">
                  <svg viewBox="0 0 14 14" fill="none" className="size-3.5 text-[#1d2939]" stroke="currentColor" strokeWidth="2"><path d="M2 7l4 4 6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  Unlimited views
                </li>
                <li className="flex items-center gap-2 text-sm text-[#475467]">
                  <svg viewBox="0 0 14 14" fill="none" className="size-3.5 text-[#1d2939]" stroke="currentColor" strokeWidth="2"><path d="M2 7l4 4 6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  Fresh data at all times
                </li>
                <li className="flex items-center gap-2 text-sm text-[#475467]">
                  <svg viewBox="0 0 14 14" fill="none" className="size-3.5 text-[#1d2939]" stroke="currentColor" strokeWidth="2"><path d="M2 7l4 4 6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  Expert guidance
                </li>
              </ul>
            </div>

            {/* Plan cards */}
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-xl border p-5 ${
                  plan.highlighted
                    ? "border-[#008dc3] bg-gradient-to-b from-[#f0f9ff] to-white"
                    : "border-[#eaecf0] bg-white"
                }`}
              >
                <div className="flex items-center gap-1.5 mb-3">
                  <span className="text-sm">{plan.icon}</span>
                  <span className="text-sm font-semibold text-[#1d2939]">{plan.name}</span>
                </div>
                <div className="mb-3">
                  <span className="text-[13px] text-[#475467] align-top">$</span>
                  <span className="text-[36px] font-bold text-[#1d2939] leading-none">{plan.price}</span>
                  <span className="text-sm text-[#475467]">/mo</span>
                </div>
                <p className="text-xs text-[#667085] leading-relaxed mb-4 min-h-[48px]">{plan.desc}</p>

                {plan.credits && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs text-[#475467]">Credits <InfoTip /></span>
                      <span className="text-sm font-semibold text-[#1d2939]">{plan.credits}<span className="text-xs font-normal text-[#475467]">/mo</span></span>
                    </div>
                    <div className="h-1.5 bg-[#e4e7ec] rounded-full overflow-hidden">
                      <div className="h-full w-full bg-[#008dc3] rounded-full" />
                    </div>
                  </div>
                )}

                <button className="w-full bg-[#008dc3] text-white text-sm font-semibold py-2.5 rounded-lg hover:bg-[#007aab] transition-colors">
                  Choose plan
                </button>
              </div>
            ))}
          </div>

          {/* Feature comparison tables */}
          <FeatureTable title="Sales tools" icon="🔧" rows={SALES_TOOLS} />
          <FeatureTable title="Engagement tools" icon="💬" rows={ENGAGEMENT} />

          {/* Buyer Intent add-on */}
          <div className="mb-8 border-l-4 border-[#c084fc] pl-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-semibold text-[#1d2939]">(•) Buyer Intent</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#e6f7f3] text-[#0d7867] border border-[#b8e8d8]">
                <svg viewBox="0 0 10 10" fill="none" className="size-2.5" stroke="currentColor" strokeWidth="1.5"><path d="M2 5l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                Add-on
              </span>
            </div>
            <p className="text-xs text-[#667085] mb-2">Intent signals based on businesses actively seeking your solutions.</p>
            <div className="bg-[#f5f3ff] rounded-lg px-4 py-3">
              <p className="text-sm text-[#475467]">Add to your plan for an additional $39/mo. Covers up to 5 users on Team plan.</p>
            </div>
          </div>

          <FeatureTable title="Customer success" icon="🎧" rows={CUSTOMER_SUCCESS} />

          {/* Footer CTA */}
          <div className="border border-[#eaecf0] rounded-xl px-6 py-4 text-center text-sm text-[#475467]">
            <strong className="text-[#1d2939]">Looking for custom solutions?</strong>{" "}
            Contact us at <span className="text-[#008dc3] font-medium">877.708.3844</span> or{" "}
            <span className="text-[#008dc3] font-medium">genie@data-axle.com</span>.{" "}
            Alternatively, you may <span className="text-[#008dc3] font-medium">buy your list</span>.
          </div>
        </div>
      </div>
    </div>
  );
}
