import { useState } from "react";
import PageBanner, { SupportContact } from "../components/PageBanner";

interface ExportConfigViewProps {
  listName: string;
  records: number;
  /** Freemium: export is locked behind the "Upgrade Your Account to Export Lists" banner. */
  isFreemium: boolean;
  /** Subscription order still being verified: status banner, no CTA. */
  subscriptionActivating: boolean;
  onBack: () => void;
  onUpgrade: () => void;
}

const FORMATS = ["Excel 2007/2010 (.xlsx)", "CSV (.csv)", "Text (.txt)"];
const LAYOUTS = ["Summary", "Summary (Emails where available)", "Detailed", "Custom"] as const;
const SUMMARY_FIELDS = [
  "Date List Produced",
  "Record Expiration Date",
  "Company Name",
  "Mailing Address",
  "Mailing City",
  "Mailing State",
  "Mailing ZIP",
  "Phone Number",
  "Executive Name",
  "Executive Title",
  "Primary SIC",
  "Location Employee Size",
];

function Radio({ checked, disabled, label, onSelect }: { checked: boolean; disabled?: boolean; label: string; onSelect?: () => void }) {
  return (
    <label className={`inline-flex items-center gap-2 text-sm ${disabled ? "text-[#98A2B3]" : "cursor-pointer text-[#344054]"}`}>
      <span
        className={`flex size-4 items-center justify-center rounded-full border ${
          checked ? "border-[#008DC3]" : disabled ? "border-[#EAECF0]" : "border-[#D0D5DD]"
        }`}
      >
        {checked ? <span className="size-2 rounded-full bg-[#008DC3]" /> : null}
      </span>
      <input type="radio" className="sr-only" checked={checked} disabled={disabled} onChange={() => onSelect?.()} />
      {label}
    </label>
  );
}

/** Export configuration (Figma "Export option in search") — reached from Search for leads and saved lists. */
export default function ExportConfigView({
  listName,
  records,
  isFreemium,
  subscriptionActivating,
  onBack,
  onUpgrade,
}: ExportConfigViewProps) {
  const [recordsMode, setRecordsMode] = useState<"all" | "remaining" | "sample">("all");
  const [layout, setLayout] = useState<(typeof LAYOUTS)[number]>("Summary");
  const count = records.toLocaleString();

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-white">
      <div className="flex-1 overflow-y-auto px-6 pb-8 pt-4">
        <div className="flex items-start gap-2 border-b border-[#EAECF0] pb-4">
          <button
            type="button"
            onClick={onBack}
            className="mt-0.5 rounded p-1 text-[#475467] hover:bg-[#F2F4F7] hover:text-[#1D2939]"
            aria-label="Back"
          >
            <svg viewBox="0 0 20 20" fill="none" className="size-5" stroke="currentColor" strokeWidth="1.5">
              <path d="M16 10H4m0 0l5-5m-5 5l5 5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div>
            <h1 className="text-lg font-semibold leading-7 text-[#1D2939]">{listName}</h1>
            <p className="text-sm leading-5 text-[#667085]">{count} records</p>
          </div>
        </div>

        <section className="mt-5">
          <h2 className="text-base font-semibold text-[#1D2939]">Choose export format</h2>
          <p className="text-sm text-[#667085]">Select your preferred option to export the records</p>
          <select className="mt-3 h-10 w-full max-w-[360px] rounded-lg border border-[#D0D5DD] bg-white px-3 text-sm text-[#344054] focus:border-[#008DC3] focus:outline-none">
            {FORMATS.map((f) => (
              <option key={f}>{f}</option>
            ))}
          </select>
        </section>

        <section className="mt-6 pl-1">
          <h2 className="text-base font-semibold text-[#1D2939]">Choose records to export</h2>
          <p className="text-sm text-[#667085]">
            Select the amount of records you need. You will only be charged for records and email that were not previously
            purchased.
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-6">
            <Radio checked={recordsMode === "all"} label={`All Records (${count})`} onSelect={() => setRecordsMode("all")} />
            <Radio
              checked={recordsMode === "remaining"}
              label={`Remaining for purchase (${count})`}
              onSelect={() => setRecordsMode("remaining")}
            />
            <Radio checked={recordsMode === "sample"} label="Random Sample" onSelect={() => setRecordsMode("sample")} />
            <input
              type="number"
              placeholder="Enter number"
              disabled={recordsMode !== "sample"}
              className="h-9 w-[180px] rounded-lg border border-[#D0D5DD] px-3 text-sm disabled:bg-[#F2F4F7]"
            />
          </div>
        </section>

        <section className="mt-6 pl-1">
          <h2 className="text-base font-semibold text-[#1D2939]">Select Layout</h2>
          <p className="text-sm text-[#667085]">
            Each layout will have a pre selected number of attributes, choose the layout that meets your requirements
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-6">
            {LAYOUTS.map((l) => (
              <Radio key={l} checked={layout === l} label={l} onSelect={() => setLayout(l)} />
            ))}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 lg:grid-cols-4">
            {SUMMARY_FIELDS.map((f) => (
              <div
                key={f}
                className="flex h-9 items-center justify-between rounded-md border border-[#EAECF0] bg-[#F9FAFB] px-3 text-xs text-[#344054]"
              >
                {f}
                <span className="flex size-4 items-center justify-center rounded border border-[#D0D5DD] bg-white text-[10px] text-[#98A2B3]">
                  ✓
                </span>
              </div>
            ))}
          </div>
        </section>

        {!isFreemium && (
          <div className="mt-8 flex justify-end">
            <button type="button" className="h-10 rounded-lg bg-[#008DC3] px-5 text-sm font-medium text-white hover:bg-[#00729F]">
              Review export
            </button>
          </div>
        )}
      </div>

      {isFreemium &&
        (subscriptionActivating ? (
          <PageBanner title="Your subscription is being activated. You'll have full access shortly." subtitle={<SupportContact />} />
        ) : (
          <PageBanner
            title="Upgrade Your Account to Export Lists"
            subtitle="Explore layout customization at any time. Upgrade now to export using your selected preferences."
            cta={{ label: "Upgrade account", onClick: onUpgrade }}
          />
        ))}
    </div>
  );
}
