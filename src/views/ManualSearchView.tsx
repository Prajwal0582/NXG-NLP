import type { ReactElement } from "react";
import emptyIllustration from "../assets/manual-search-empty.png";

interface ManualSearchViewProps {
  onBack: () => void;
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function BackArrow() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="size-5" stroke="currentColor" strokeWidth="2">
      <path d="M12 5L7 10l5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 18 18" fill="none" className="size-[18px]" stroke="currentColor" strokeWidth="1.6">
      <path d="M9 11.5V3m-3.5 5L9 11.5 12.5 8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.5 14.5h11" strokeLinecap="round" />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg viewBox="0 0 12 12" fill="none" className="size-3" stroke="currentColor" strokeWidth="1.6">
      <path d="M2.5 4.5L6 8l3.5-3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg viewBox="0 0 18 18" fill="none" className="size-4" stroke="currentColor" strokeWidth="1.6">
      <path d="M2.5 4.5h13M4.5 9h9M7 13.5h4" strokeLinecap="round" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-3.5" stroke="currentColor" strokeWidth="1.4">
      <circle cx="8" cy="8" r="6.5" />
      <path d="M8 7.5v3M8 5.5h.01" strokeLinecap="round" />
    </svg>
  );
}

function HouseholdsIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="size-5" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="7" width="14" height="10" rx="1.2" />
      <path d="M10 3l7 4M10 3L3 7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 17v-3.5h4V17" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IndividualsIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="size-5" stroke="currentColor" strokeWidth="1.5">
      <circle cx="10" cy="6.5" r="3" />
      <path d="M4 16.5a6 6 0 0112 0" strokeLinecap="round" />
    </svg>
  );
}

function EmailsIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="size-5" stroke="currentColor" strokeWidth="1.5">
      <path d="M17 3L9 11M17 3l-5 14-3-6-6-3 14-5z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Stat cards ───────────────────────────────────────────────────────────────

const STATS = [
  { label: "Households",  value: "124,440,115", Icon: HouseholdsIcon },
  { label: "Individuals", value: "318,554,426...", Icon: IndividualsIcon },
  { label: "Emails",      value: "187,585,349", Icon: EmailsIcon },
];

function StatCard({ label, value, Icon }: { label: string; value: string; Icon: () => ReactElement }) {
  return (
    <div className="relative bg-white border border-[#eaecf0] rounded-xl p-5 shadow-sm">
      <button className="absolute top-4 right-4 text-[#c0c7d0] hover:text-[#667085] transition-colors" title="What is this?">
        <InfoIcon />
      </button>
      <div className="flex items-center gap-3">
        <div className="size-10 rounded-lg bg-[#eff6ff] flex items-center justify-center text-[#016dee] shrink-0">
          <Icon />
        </div>
        <div className="min-w-0">
          <p className="text-sm text-[#667085]">{label}</p>
          <p className="text-[26px] font-semibold text-[#1d2939] tracking-tight tabular-nums leading-tight">{value}</p>
        </div>
      </div>
    </div>
  );
}

// ─── Main view ────────────────────────────────────────────────────────────────

export default function ManualSearchView({ onBack }: ManualSearchViewProps) {
  return (
    <div className="flex flex-col h-full bg-white overflow-hidden">

      {/* ── Sub-header ─────────────────────────────────────────────────────── */}
      <div className="px-6 py-4 shrink-0">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <button
              onClick={onBack}
              className="mt-0.5 text-[#475467] hover:text-[#1d2939] p-1 rounded hover:bg-[#f2f4f7] transition-colors"
            >
              <BackArrow />
            </button>
            <div>
              <h1 className="text-xl font-semibold text-[#1d2939] leading-tight">Search for leads</h1>
              <p className="text-sm text-[#667085] mt-1">Start your search with the search bar below</p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              className="size-9 flex items-center justify-center border border-[#d0d5dd] rounded-lg text-[#475467] hover:bg-[#f9fafb] transition-colors"
              title="Export"
            >
              <DownloadIcon />
            </button>
            <button
              className="px-4 py-2 text-sm font-medium rounded-lg bg-[#016dee] text-white hover:bg-[#0052cc] transition-colors"
            >
              Save list
            </button>
          </div>
        </div>
      </div>

      {/* ── Body ───────────────────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto px-6 pb-10">
        <div className="max-w-[1180px] mx-auto">

          {/* Search bar row */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative shrink-0">
              <select
                defaultValue="US Businesses"
                className="appearance-none border border-[#d0d5dd] rounded-lg pl-3.5 pr-9 py-2.5 text-sm font-medium text-[#344054] bg-white hover:bg-[#f9fafb] focus:outline-none focus:border-[#016dee] focus:ring-1 focus:ring-[#016dee] transition-colors cursor-pointer"
              >
                <option>US Businesses</option>
                <option>US Consumers</option>
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#667085] pointer-events-none">
                <ChevronDown />
              </span>
            </div>

            <input
              type="text"
              placeholder="Search by name"
              className="flex-1 min-w-0 border border-[#d0d5dd] rounded-lg px-3.5 py-2.5 text-sm text-[#344054] placeholder:text-[#98a2b3] focus:outline-none focus:border-[#016dee] focus:ring-1 focus:ring-[#016dee] transition-colors"
            />
            <input
              type="text"
              placeholder="Search by city, state or ZIP code"
              className="flex-1 min-w-0 border border-[#d0d5dd] rounded-lg px-3.5 py-2.5 text-sm text-[#344054] placeholder:text-[#98a2b3] focus:outline-none focus:border-[#016dee] focus:ring-1 focus:ring-[#016dee] transition-colors"
            />

            <button className="flex items-center gap-2 shrink-0 border border-[#d0d5dd] rounded-lg px-4 py-2.5 text-sm font-medium text-[#344054] hover:bg-[#f9fafb] transition-colors">
              <FilterIcon />
              Filters
            </button>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {STATS.map((s) => (
              <StatCard key={s.label} label={s.label} value={s.value} Icon={s.Icon} />
            ))}
          </div>

          {/* Empty state */}
          <div className="flex flex-col items-center text-center mt-20">
            <p className="text-base font-medium text-[#1d2939] mb-8">
              Build a targeted list using the search bar and filters above
            </p>
            <img
              src={emptyIllustration}
              alt="Illustration of a person searching a database"
              className="w-[420px] max-w-full select-none pointer-events-none"
            />
          </div>

        </div>
      </div>
    </div>
  );
}
