import { useEffect, useRef, useState, type ReactElement } from "react";
import emptyIllustration from "../assets/manual-search-empty.png";

interface ManualSearchViewProps {
  onBack: () => void;
  onPlans: () => void;
}

type Phase = "idle" | "suggesting" | "loading" | "results";

interface FilterChip {
  id: string;
  label: string;
  removable?: boolean;
  gear?: boolean;
}

interface LeadRow {
  id: string;
  name: string;
  verified: boolean;
  city: string;
  phone: string;
  industry: string;
  revenue: string;
  employees: string;
  contact: string;
  title: string;
}

const INDUSTRY_SUGGESTIONS = [
  { name: "Restaurant Design & Planning Service", sic: "Keyword For SIC: 1542-02" },
  { name: "Restaurant Equipment & Supplies-mfrs", sic: "Keyword For SIC: 2599-03" },
  { name: "Restaurant-furniture (Whls)", sic: "Keyword For SIC: 2599-03" },
  { name: "Restaurant Equip-repair & Refinish", sic: "Keyword For SIC: 7699-10" },
  { name: "Restaurant Equip Repair & Service", sic: "Keyword For SIC: 7629-05" },
];

const BUSINESS_NAME_SUGGESTIONS = [
  "Restaurant",
  "Restaurant Depot",
  "Restaurant Associates",
  "Restaurant Brands Intl",
  "Restaurants",
];

const FILTER_CATEGORIES = [
  { id: "outreach", label: "Outreach Type", badge: "new" as const, count: 1 },
  { id: "popular", label: "Popular", count: 1 },
  { id: "geography", label: "Geography" },
  { id: "business-type", label: "Business Type" },
  { id: "buyer-intent", label: "Buyer Intent", addon: true },
  { id: "business-size", label: "Business Size" },
  { id: "business-details", label: "Business Details", count: 1 },
  { id: "executives", label: "Executives" },
  { id: "activity", label: "Activity" },
  { id: "records", label: "Records" },
  { id: "contact-info", label: "Contact Info" },
  { id: "health", label: "Health & Welfare" },
  { id: "exclusions", label: "Exclusions" },
];

const MOCK_LEADS: LeadRow[] = [
  {
    id: "1",
    name: "A** ***********",
    verified: true,
    city: "Fairbanks, AK",
    phone: "(907) 456-****",
    industry: "Restaurants 5812-08",
    revenue: "$1-2.5 Million",
    employees: "20-49",
    contact: "J*** S****",
    title: "Owner",
  },
  {
    id: "2",
    name: "B***** *******",
    verified: true,
    city: "Anchorage, AK",
    phone: "(907) 222-****",
    industry: "Restaurants 5812-08",
    revenue: "$500K-1 Million",
    employees: "10-19",
    contact: "M*** L**",
    title: "General Manager",
  },
  {
    id: "3",
    name: "C**** ****",
    verified: true,
    city: "Juneau, AK",
    phone: "(907) 789-****",
    industry: "Restaurants 5812-03",
    revenue: "$2.5-5 Million",
    employees: "50-99",
    contact: "A*** P******",
    title: "Owner",
  },
  {
    id: "4",
    name: "D****** *******",
    verified: true,
    city: "Sitka, AK",
    phone: "(907) 555-****",
    industry: "Restaurants 5812-08",
    revenue: "$1-2.5 Million",
    employees: "20-49",
    contact: "R*** K***",
    title: "Manager",
  },
  {
    id: "5",
    name: "E**** *****",
    verified: true,
    city: "Ketchikan, AK",
    phone: "(907) 321-****",
    industry: "Restaurants 5812-01",
    revenue: "$250-500K",
    employees: "5-9",
    contact: "S*** T*****",
    title: "Owner",
  },
];

const RESULT_STATS = {
  businesses: "37,610",
  contacts: "54,637",
  emails: "30.4K",
};

const IDLE_STATS = {
  businesses: "18,456,211",
  contacts: "34,259,293",
  emails: "18,330,585",
};

// ── Icons ────────────────────────────────────────────────────────────────────

function BackArrow() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="size-5" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 5L7 10l5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 18 18" fill="none" className="size-4" stroke="currentColor" strokeWidth="1.5">
      <path d="M9 11V3.5m-3 4.5L9 11l3-3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.5 14h11" strokeLinecap="round" />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg viewBox="0 0 12 12" fill="none" className="size-3" stroke="currentColor" strokeWidth="1.5">
      <path d="M2.5 4.5L6 8l3.5-3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg viewBox="0 0 12 12" fill="none" className="size-3" stroke="currentColor" strokeWidth="1.5">
      <path d="M4.5 2.5L8 6l-3.5 3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-3.5" stroke="currentColor" strokeWidth="1.5">
      <path d="M2.5 3h11L10.5 8.5v3.5L5.5 14V8.5L2.5 3z" strokeLinejoin="round" />
    </svg>
  );
}

function SearchIcon({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={`shrink-0 ${className}`} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="7" cy="7" r="4.5" />
      <path d="m13 13-2.5-2.5" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 14 14" fill="none" className="size-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M3.5 3.5l7 7M10.5 3.5l-7 7" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg viewBox="0 0 14 14" fill="none" className="size-3.5" stroke="currentColor" strokeWidth="1.3">
      <circle cx="7" cy="7" r="5.5" />
      <path d="M7 6.5v3M7 4.5h.01" strokeLinecap="round" />
    </svg>
  );
}

function GearIcon() {
  return (
    <svg viewBox="0 0 14 14" fill="none" className="size-3.5" stroke="currentColor" strokeWidth="1.3">
      <circle cx="7" cy="7" r="2" />
      <path d="M7 1.5v1.5M7 11v1.5M1.5 7h1.5M11 7h1.5M3.1 3.1l1.1 1.1M9.8 9.8l1.1 1.1M3.1 10.9l1.1-1.1M9.8 4.2l1.1-1.1" strokeLinecap="round" />
    </svg>
  );
}

function BulbIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-4 text-[#008DC3]" stroke="currentColor" strokeWidth="1.3">
      <path d="M8 2.5a4 4 0 00-2.5 7.1V11h5V9.6A4 4 0 008 2.5z" strokeLinejoin="round" />
      <path d="M6.5 12.5h3M7 14h2" strokeLinecap="round" />
    </svg>
  );
}

function MapIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-3.5" stroke="currentColor" strokeWidth="1.4">
      <path d="M2 3.5l4 1.5 4-2 4 1.5v8l-4-1.5-4 2-4-1.5v-8z" strokeLinejoin="round" />
      <path d="M6 5v8M10 3v8" strokeLinecap="round" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 14 14" fill="none" className="size-3.5" stroke="currentColor" strokeWidth="1.4">
      <rect x="2.5" y="6" width="9" height="6.5" rx="1" />
      <path d="M4.5 6V4.5a2.5 2.5 0 015 0V6" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 14 14" fill="none" className="size-3.5 shrink-0" aria-hidden>
      <circle cx="7" cy="7" r="7" fill="#0BA38C" />
      <path d="M4 7l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function VerifiedIcon() {
  return (
    <svg viewBox="0 0 14 14" fill="none" className="size-3.5 text-[#12B76A]" aria-hidden>
      <circle cx="7" cy="7" r="6" fill="currentColor" />
      <path d="M4.2 7l1.8 1.8 3.8-3.8" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 12 12" fill="none" className="size-3 text-[#667085]" stroke="currentColor" strokeWidth="1.2">
      <path d="M6 10.5s3.5-3 3.5-5.5a3.5 3.5 0 10-7 0c0 2.5 3.5 5.5 3.5 5.5z" />
      <circle cx="6" cy="5" r="1.2" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 12 12" fill="none" className="size-3 text-[#667085]" stroke="currentColor" strokeWidth="1.2">
      <path d="M2.5 2.5h2l1 2.5-1.2 1.2a6 6 0 003.5 3.5l1.2-1.2 2.5 1v2A1 1 0 0010.5 10 7.5 7.5 0 012 2.5z" strokeLinejoin="round" />
    </svg>
  );
}

function BuildingMini() {
  return (
    <svg viewBox="0 0 12 12" fill="none" className="size-3 text-[#667085]" stroke="currentColor" strokeWidth="1.2">
      <path d="M2 10.5h8M3 10.5V4l3-2 3 2v6.5" strokeLinejoin="round" />
    </svg>
  );
}

function DollarMini() {
  return (
    <svg viewBox="0 0 12 12" fill="none" className="size-3 text-[#667085]" stroke="currentColor" strokeWidth="1.2">
      <circle cx="6" cy="6" r="4.5" />
      <path d="M6 3.5v5M4.5 4.75c.4-.5 1-.7 1.5-.7.9 0 1.5.5 1.5 1.2S6.9 6.5 6 6.5s-1.5.4-1.5 1.2c0 .7.6 1.2 1.5 1.2.5 0 1.1-.2 1.5-.7" strokeLinecap="round" />
    </svg>
  );
}

function PeopleMini() {
  return (
    <svg viewBox="0 0 12 12" fill="none" className="size-3 text-[#667085]" stroke="currentColor" strokeWidth="1.2">
      <circle cx="4.5" cy="4" r="1.5" />
      <circle cx="8" cy="4.5" r="1.2" />
      <path d="M1.5 9.5a3 3 0 016 0M7 9.5a2.5 2.5 0 013.5 0" strokeLinecap="round" />
    </svg>
  );
}

function BusinessesIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="size-4" stroke="currentColor" strokeWidth="1.4">
      <path d="M3.5 17.5h13" strokeLinecap="round" />
      <path d="M5 17.5V7.5l5-3.5 5 3.5v10" strokeLinejoin="round" />
      <path d="M8 17.5v-4h4v4M8 9.5h.01M12 9.5h.01M8 12.5h.01M12 12.5h.01" strokeLinecap="round" />
    </svg>
  );
}

function ContactsIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="size-4" stroke="currentColor" strokeWidth="1.4">
      <circle cx="10" cy="7" r="2.75" />
      <path d="M4.5 16.5a5.5 5.5 0 0111 0" strokeLinecap="round" />
    </svg>
  );
}

function EmailsIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="size-4" stroke="currentColor" strokeWidth="1.4">
      <path d="M16.5 3.5L8.5 11.5M16.5 3.5l-4.5 13-2.75-5.5L3.5 8.5l13-5z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DiamondMini() {
  return (
    <svg viewBox="0 0 12 12" fill="none" className="size-3" stroke="currentColor" strokeWidth="1.1">
      <path d="M3.5 2h5L9.5 4.5 6 10 2.5 4.5 3.5 2z" strokeLinejoin="round" />
      <path d="M2.5 4.5h7" />
    </svg>
  );
}

// ── Small UI pieces ──────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  Icon,
  detailLink,
}: {
  label: string;
  value: string;
  Icon: () => ReactElement;
  detailLink?: boolean;
}) {
  return (
    <div className="relative rounded-lg border border-[#EAECF0] bg-white px-4 py-3">
      <button type="button" className="absolute right-3 top-3 text-[#D0D5DD] hover:text-[#667085]" title="Info">
        <InfoIcon />
      </button>
      <div className="flex items-start gap-3 pr-5">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#EFF6FF] text-[#016DEE]">
          <Icon />
        </div>
        <div className="min-w-0 pt-0.5">
          <p className="text-xs font-normal leading-[18px] text-[#667085]">{label}</p>
          <p className="mt-0.5 text-xl font-semibold leading-7 tracking-tight text-[#1D2939] tabular-nums">
            {value}
          </p>
          {detailLink ? (
            <button type="button" className="mt-1 text-xs font-medium text-[#016DEE] hover:underline">
              View Details &gt;
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function SkeletonBar({ className = "" }: { className?: string }) {
  return <div className={`h-3 animate-pulse rounded bg-[#EAECF0] ${className}`} />;
}

// ── Main view ────────────────────────────────────────────────────────────────

export default function ManualSearchView({ onBack, onPlans }: ManualSearchViewProps) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [chips, setChips] = useState<FilterChip[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const suggestRef = useRef<HTMLDivElement>(null);
  const queryInputRef = useRef<HTMLInputElement>(null);

  const showSuggestions = phase === "suggesting" && query.trim().length > 0;
  const hasResults = phase === "results" || phase === "loading";
  const stats =
    phase === "loading"
      ? { businesses: "--", contacts: "--", emails: "--" }
      : phase === "results"
        ? RESULT_STATS
        : IDLE_STATS;

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (suggestRef.current && !suggestRef.current.contains(e.target as Node)) {
        if (phase === "suggesting") setPhase("idle");
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [phase]);

  function runSearch(term: string, kind: "industry" | "business" = "business") {
    const label = kind === "industry" ? `Industry: ${term}` : `Business Name: ${term}`;
    setQuery(term);
    setChips([
      { id: "outreach", label: "Outreach type: Basic", gear: true },
      { id: "biz", label, removable: true },
    ]);
    setPhase("loading");
    setFiltersOpen(false);
    window.setTimeout(() => setPhase("results"), 900);
  }

  function clearAll() {
    setChips([]);
    setQuery("");
    setPhase("idle");
  }

  function removeChip(id: string) {
    const next = chips.filter((c) => c.id !== id);
    setChips(next);
    if (next.length === 0) {
      setQuery("");
      setPhase("idle");
    }
  }

  const filterCount = chips.length;

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-white">
      {/* Header */}
      <div className="shrink-0 px-6 pt-4 pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-2">
            <button
              type="button"
              onClick={onBack}
              className="mt-0.5 rounded p-1 text-[#475467] hover:bg-[#F2F4F7] hover:text-[#1D2939]"
              aria-label="Back"
            >
              <BackArrow />
            </button>
            <div>
              <h1 className="text-lg font-semibold leading-7 text-[#1D2939]">Search for leads</h1>
              <p className="text-sm font-normal leading-5 text-[#667085]">
                Start your search with the search bar below
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              className="flex size-9 items-center justify-center rounded-lg border border-[#D0D5DD] text-[#475467] hover:bg-[#F9FAFB]"
              title="Export"
            >
              <DownloadIcon />
            </button>
            <button
              type="button"
              onClick={() => hasResults && setUpgradeOpen(true)}
              className={`h-9 rounded-lg px-4 text-sm font-medium leading-5 ${
                phase === "results"
                  ? "bg-[#016DEE] text-white hover:bg-[#0052CC]"
                  : "bg-[#B8C0CC] text-white"
              }`}
            >
              Save list
            </button>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="relative flex-1 overflow-y-auto px-6 pb-8">
        <div className="w-full" ref={suggestRef}>
          {/* Search row */}
          <div className="relative mb-2 flex items-center gap-2">
            <div className="relative shrink-0">
              <select
                defaultValue="US Businesses"
                className="h-10 appearance-none cursor-pointer rounded-lg border border-[#D0D5DD] bg-white py-0 pl-3 pr-8 text-sm font-medium text-[#344054] hover:bg-[#F9FAFB] focus:border-[#016DEE] focus:outline-none focus:ring-1 focus:ring-[#016DEE]"
              >
                <option>US Businesses</option>
                <option>US Consumers</option>
              </select>
              <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#667085]">
                <ChevronDown />
              </span>
            </div>

            <div
              className={`relative flex h-10 min-w-0 flex-1 items-center rounded-lg border bg-white transition-colors ${
                showSuggestions || (phase !== "idle" && query)
                  ? "border-[#016DEE] ring-1 ring-[#016DEE]"
                  : "border-[#D0D5DD] focus-within:border-[#016DEE] focus-within:ring-1 focus-within:ring-[#016DEE]"
              }`}
            >
              <span className="pointer-events-none absolute left-3 text-[#667085]">
                <SearchIcon />
              </span>
              <input
                ref={queryInputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  if (e.target.value.trim()) setPhase("suggesting");
                  else if (chips.length === 0) setPhase("idle");
                }}
                onFocus={() => {
                  if (query.trim()) setPhase("suggesting");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && query.trim()) runSearch(query.trim());
                }}
                placeholder="Enter Business Name, Industry or Job Title"
                className="h-full w-full bg-transparent py-0 pr-16 pl-9 text-sm text-[#344054] placeholder:text-[#98A2B3] focus:outline-none"
              />
              <div className="absolute right-2.5 flex items-center gap-1.5">
                {query ? (
                  <button
                    type="button"
                    onClick={() => {
                      setQuery("");
                      if (chips.length === 0) setPhase("idle");
                      queryInputRef.current?.focus();
                    }}
                    className="text-[#667085] hover:text-[#1D2939]"
                    aria-label="Clear"
                  >
                    <CloseIcon />
                  </button>
                ) : null}
                <button type="button" className="text-[#98A2B3] hover:text-[#667085]" title="Info">
                  <InfoIcon />
                </button>
              </div>
            </div>

            <div className="relative flex h-10 min-w-0 flex-1 items-center rounded-lg border border-[#D0D5DD] bg-white focus-within:border-[#016DEE] focus-within:ring-1 focus-within:ring-[#016DEE]">
              <span className="pointer-events-none absolute left-3 text-[#667085]">
                <SearchIcon />
              </span>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter State, City or ZIP Code"
                className="h-full w-full bg-transparent py-0 pr-9 pl-9 text-sm text-[#344054] placeholder:text-[#98A2B3] focus:outline-none"
              />
              <button type="button" className="absolute right-2.5 text-[#98A2B3] hover:text-[#667085]" title="Info">
                <InfoIcon />
              </button>
            </div>

            <button
              type="button"
              onClick={() => setFiltersOpen(true)}
              className="relative inline-flex h-10 shrink-0 items-center gap-1.5 rounded-lg border border-[#D0D5DD] bg-white px-3 text-sm font-medium text-[#344054] hover:bg-[#F9FAFB]"
            >
              <FilterIcon />
              Filters
              {filterCount > 0 ? (
                <span className="ml-0.5 flex size-5 items-center justify-center rounded-full bg-[#1D2939] text-[11px] font-semibold text-white">
                  {filterCount}
                </span>
              ) : null}
            </button>
          </div>

          {/* Autocomplete panel */}
          {showSuggestions ? (
            <div className="absolute left-6 right-6 z-20 mt-0 overflow-hidden rounded-lg border border-[#EAECF0] bg-white shadow-lg">
              <div className="border-b border-[#EAECF0] px-4 py-2.5">
                <p className="text-sm font-semibold text-[#1D2939]">Filters and Criteria</p>
              </div>
              <div className="max-h-[320px] overflow-y-auto px-4 py-2">
                <div className="mb-3">
                  <div className="grid grid-cols-[120px_1fr] gap-x-4">
                    <p className="py-2 text-sm text-[#667085]">Industry</p>
                    <div>
                      {INDUSTRY_SUGGESTIONS.map((item) => (
                        <button
                          key={item.name}
                          type="button"
                          onClick={() => runSearch(item.name, "industry")}
                          className="flex w-full items-center justify-between gap-4 rounded px-1 py-2 text-left hover:bg-[#F9FAFB]"
                        >
                          <span className="text-sm text-[#1D2939]">{item.name}</span>
                          <span className="shrink-0 text-xs text-[#667085]">{item.sic}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="grid grid-cols-[120px_1fr] gap-x-4">
                    <p className="py-2 text-sm text-[#667085]">Business Name</p>
                    <div>
                      {BUSINESS_NAME_SUGGESTIONS.filter((n) =>
                        n.toLowerCase().includes(query.toLowerCase()),
                      ).map((name) => (
                        <button
                          key={name}
                          type="button"
                          onClick={() => runSearch(name, "business")}
                          className="flex w-full items-center rounded px-1 py-2 text-left text-sm text-[#1D2939] hover:bg-[#F9FAFB]"
                        >
                          {name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 border-t border-[#CAE6F9] bg-[#F1F9FD] px-4 py-2.5">
                <BulbIcon />
                <p className="text-sm text-[#00729F]">Expand your results by using the Filters option.</p>
              </div>
            </div>
          ) : null}

          {/* Filter chips */}
          {chips.length > 0 ? (
            <div className="mb-3 flex flex-wrap items-center gap-2">
              {chips.map((chip) => (
                <span
                  key={chip.id}
                  className="inline-flex h-7 items-center gap-1.5 rounded-full border border-[#D0D5DD] bg-white px-2.5 text-xs font-medium text-[#344054]"
                >
                  {chip.gear ? <GearIcon /> : null}
                  {chip.label}
                  {chip.removable ? (
                    <button
                      type="button"
                      onClick={() => removeChip(chip.id)}
                      className="text-[#667085] hover:text-[#1D2939]"
                      aria-label={`Remove ${chip.label}`}
                    >
                      <CloseIcon />
                    </button>
                  ) : null}
                </span>
              ))}
              <button
                type="button"
                onClick={clearAll}
                className="ml-auto text-sm font-medium text-[#016DEE] hover:underline"
              >
                Clear all
              </button>
            </div>
          ) : null}

          {/* Stats */}
          <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <StatCard label="Businesses" value={stats.businesses} Icon={BusinessesIcon} />
            <StatCard label="Contacts" value={stats.contacts} Icon={ContactsIcon} />
            <StatCard
              label="Emails"
              value={stats.emails}
              Icon={EmailsIcon}
              detailLink={phase === "results"}
            />
          </div>

          {/* Idle empty state */}
          {phase === "idle" || phase === "suggesting" ? (
            <div className="mt-10 flex w-full flex-col items-center justify-center text-center">
              <p className="mb-6 text-sm font-medium leading-5 text-[#1D2939]">
                Build a targeted list using the search bar and filters above
              </p>
              <img
                src={emptyIllustration}
                alt=""
                className="mx-auto w-[220px] max-w-full select-none pointer-events-none"
              />
            </div>
          ) : null}

          {/* Results / loading table */}
          {hasResults ? (
            <div className="mt-2">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-sm font-medium text-[#475467]">
                  {phase === "loading" ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="rounded-full bg-[#F2F4F7] px-2 py-0.5 text-xs text-[#667085]">…</span>
                      businesses
                    </span>
                  ) : (
                    <>
                      <span className="font-semibold text-[#1D2939]">{RESULT_STATS.businesses}</span> businesses
                    </>
                  )}
                </p>
                <button
                  type="button"
                  className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-[#D0D5DD] px-3 text-sm font-medium text-[#98A2B3]"
                  disabled
                >
                  <MapIcon />
                  View on map
                </button>
              </div>

              <div className="overflow-hidden rounded-lg border border-[#EAECF0]">
                <table className="w-full min-w-[900px] border-collapse text-left text-sm">
                  <thead>
                    <tr className="bg-[#F9FAFB] text-xs font-medium text-[#667085]">
                      {["Business Information", "Business Details", "Contacts", "Actions", "Assignee"].map(
                        (h) => (
                          <th key={h} className="border-b border-[#EAECF0] px-4 py-2.5 font-medium">
                            <span className="inline-flex items-center gap-1">
                              {h}
                              <span className="text-[#D0D5DD]">↕</span>
                            </span>
                          </th>
                        ),
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {phase === "loading"
                      ? Array.from({ length: 6 }).map((_, i) => (
                          <tr key={i} className="border-b border-[#EAECF0] last:border-b-0">
                            {Array.from({ length: 5 }).map((__, j) => (
                              <td key={j} className="px-4 py-4">
                                <SkeletonBar className="mb-2 w-3/4" />
                                <SkeletonBar className="w-1/2" />
                              </td>
                            ))}
                          </tr>
                        ))
                      : MOCK_LEADS.map((row) => (
                          <tr
                            key={row.id}
                            className="border-b border-[#EAECF0] last:border-b-0 hover:bg-[#F9FAFB]"
                            onClick={() => setUpgradeOpen(true)}
                          >
                            <td className="cursor-pointer px-4 py-3 align-top">
                              <div className="flex items-center gap-1.5 font-medium text-[#1D2939]">
                                {row.name}
                                {row.verified ? <VerifiedIcon /> : null}
                              </div>
                              <div className="mt-1 flex items-center gap-1 text-xs text-[#667085]">
                                <PinIcon /> {row.city}
                              </div>
                              <div className="mt-0.5 flex items-center gap-1 text-xs text-[#667085]">
                                <PhoneIcon /> {row.phone}
                              </div>
                            </td>
                            <td className="cursor-pointer px-4 py-3 align-top text-xs text-[#475467]">
                              <div className="flex items-center gap-1.5">
                                <BuildingMini /> {row.industry}
                              </div>
                              <div className="mt-1 flex items-center gap-1.5">
                                <DollarMini /> {row.revenue}
                              </div>
                              <div className="mt-1 flex items-center gap-1.5">
                                <PeopleMini /> {row.employees}
                              </div>
                            </td>
                            <td className="cursor-pointer px-4 py-3 align-top">
                              <p className="font-medium text-[#1D2939]">{row.contact}</p>
                              <p className="text-xs text-[#667085]">{row.title}</p>
                              <p className="text-xs text-[#98A2B3]">@ --</p>
                            </td>
                            <td className="px-4 py-3 text-[#98A2B3]">--</td>
                            <td className="px-4 py-3 text-[#98A2B3]">--</td>
                          </tr>
                        ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* Bottom CTA banner — results only */}
      {phase === "results" && !upgradeOpen ? (
        <div className="relative z-20 shrink-0 overflow-hidden bg-[#344054] px-6 py-5">
          {/* Diamond lattice pattern */}
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage: `
                linear-gradient(45deg, rgba(255,255,255,0.07) 25%, transparent 25%),
                linear-gradient(-45deg, rgba(255,255,255,0.07) 25%, transparent 25%),
                linear-gradient(45deg, transparent 75%, rgba(255,255,255,0.07) 75%),
                linear-gradient(-45deg, transparent 75%, rgba(255,255,255,0.07) 75%)
              `,
              backgroundSize: "24px 24px",
              backgroundPosition: "0 0, 0 12px, 12px -12px, -12px 0",
            }}
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#1D2939]/80 to-transparent" />
          <div className="pointer-events-none absolute -left-6 top-1/2 size-28 -translate-y-1/2 rounded-full bg-[#F79009]/30 blur-3xl" />
          <div className="pointer-events-none absolute right-[28%] top-0 size-24 rounded-full bg-[#008DC3]/25 blur-3xl" />

          <div className="relative flex w-full flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="min-w-0 max-w-[720px]">
              <p className="text-lg font-semibold leading-7 text-white">
                Tap into {RESULT_STATS.businesses} leads before your competitors do
              </p>
              <p className="mt-1 text-sm font-normal leading-5 text-white/75">
                Subscriptions offer full access to fresh data, and built-in outreach tools. Or, buy a list to
                view and export.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setUpgradeOpen(true)}
              className="shrink-0 rounded-lg bg-[#F2F4F7] px-4 py-2.5 text-sm font-medium leading-5 text-[#1D2939] hover:bg-white"
            >
              See options
            </button>
          </div>
        </div>
      ) : null}

      {/* Filters drawer — fixed so it covers TopHeader / free-prompt bar too */}
      {filtersOpen ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-[60] bg-black/20"
            aria-label="Close filters overlay"
            onClick={() => setFiltersOpen(false)}
          />
          <aside className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-[400px] flex-col border-l border-[#EAECF0] bg-white shadow-xl">
            <div className="flex items-center justify-between gap-3 border-b border-[#EAECF0] px-4 py-3">
              <h2 className="text-lg font-semibold text-[#1D2939]">Filters</h2>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (query.trim()) runSearch(query.trim());
                    else setFiltersOpen(false);
                  }}
                  className="h-8 rounded-lg bg-[#016DEE] px-3 text-sm font-medium text-white hover:bg-[#0052CC]"
                >
                  Apply filters
                </button>
                <button
                  type="button"
                  onClick={() => setFiltersOpen(false)}
                  className="h-8 rounded-lg border border-[#D0D5DD] px-3 text-sm font-medium text-[#475467] hover:bg-[#F9FAFB]"
                >
                  Close
                </button>
              </div>
            </div>
            <div className="border-b border-[#EAECF0] px-4 py-3">
              <div className="relative flex h-9 items-center rounded-lg border border-[#D0D5DD]">
                <span className="absolute left-3 text-[#667085]">
                  <SearchIcon />
                </span>
                <input
                  type="text"
                  placeholder="Search filters"
                  className="h-full w-full bg-transparent py-0 pr-3 pl-9 text-sm focus:outline-none"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {FILTER_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className="flex w-full items-center gap-2 border-b border-[#F2F4F7] px-4 py-3 text-left hover:bg-[#F9FAFB]"
                >
                  <span className="text-[#667085]">
                    <ChevronRight />
                  </span>
                  <span className="flex-1 text-sm font-medium text-[#1D2939]">{cat.label}</span>
                  {"badge" in cat && cat.badge === "new" ? (
                    <span className="rounded bg-[#DCFAE6] px-1.5 py-0.5 text-[10px] font-semibold uppercase text-[#027A48]">
                      New
                    </span>
                  ) : null}
                  {"addon" in cat && cat.addon ? (
                    <span className="inline-flex items-center gap-1 rounded bg-[#764FD9] px-1.5 py-0.5 text-[10px] font-medium text-white">
                      <DiamondMini /> Add-on
                    </span>
                  ) : null}
                  {"addon" in cat && cat.addon ? (
                    <span className="text-[#98A2B3]">
                      <InfoIcon />
                    </span>
                  ) : null}
                  {"count" in cat && cat.count ? (
                    <span className="flex size-5 items-center justify-center rounded-full bg-[#1D2939] text-[11px] font-semibold text-white">
                      {cat.count}
                    </span>
                  ) : null}
                </button>
              ))}
            </div>
          </aside>
        </>
      ) : null}

      {/* Upgrade / Buy — single bottom drawer with both options */}
      {upgradeOpen ? (
        <div className="absolute inset-0 z-50 flex flex-col justify-end">
          <button
            type="button"
            className="absolute inset-0 bg-[#1D2939]/40 backdrop-blur-[2px]"
            aria-label="Dismiss"
            onClick={() => setUpgradeOpen(false)}
          />
          <div
            className="relative z-10 flex max-h-[85%] w-full flex-col overflow-hidden rounded-t-2xl bg-white shadow-[0_-8px_40px_rgba(16,24,40,0.18)] animate-[slideUp_220ms_ease-out]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="upgrade-drawer-title"
          >
            <div className="flex shrink-0 items-center justify-between bg-[#1D2939] px-5 py-2.5 text-white">
              <div className="flex items-center gap-2 text-sm font-medium">
                <LockIcon />
                Upgrade Account or Buy List for full access.
              </div>
              <button
                type="button"
                onClick={() => setUpgradeOpen(false)}
                className="rounded p-1 text-white/80 hover:bg-white/10 hover:text-white"
                aria-label="Close"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="overflow-y-auto px-6 pt-5 pb-8">
              <h3
                id="upgrade-drawer-title"
                className="mx-auto max-w-[560px] text-center text-xl font-semibold leading-7 text-[#1D2939]"
              >
                {RESULT_STATS.businesses} potential customers available. Choose an option to access them
                all.
              </h3>

              <div className="mx-auto mt-6 grid w-full max-w-[680px] grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="relative rounded-xl border border-[#79C1E9] bg-[#F1F9FD] p-5 pt-6">
                  <span className="absolute -top-2.5 left-4 rounded bg-[#016DEE] px-2 py-0.5 text-[10px] font-semibold tracking-wide text-white uppercase">
                    Best Value
                  </span>
                  <p className="text-lg font-semibold text-[#1D2939]">Upgrade Account</p>
                  <button
                    type="button"
                    onClick={() => {
                      setUpgradeOpen(false);
                      onPlans();
                    }}
                    className="mt-4 w-full rounded-lg bg-[#016DEE] py-2.5 text-sm font-medium text-white hover:bg-[#0052CC]"
                  >
                    View packages
                  </button>
                  <ul className="mt-4 flex flex-col gap-2.5">
                    {[
                      "Online access to all records",
                      "Export records at a discount",
                      "Weekly data refresh",
                      "Built-in outreach tools",
                      "Dedicated advisor support",
                    ].map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-[#475467]">
                        <CheckIcon /> {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl border border-[#D0D5DD] bg-white p-5 pt-6">
                  <p className="text-lg font-semibold text-[#1D2939]">Buy Now</p>
                  <button
                    type="button"
                    onClick={() => {
                      setUpgradeOpen(false);
                      onPlans();
                    }}
                    className="mt-4 w-full rounded-lg border border-[#D0D5DD] bg-white py-2.5 text-sm font-medium text-[#475467] hover:bg-[#F9FAFB]"
                  >
                    Purchase list
                  </button>
                  <ul className="mt-4 flex flex-col gap-2.5">
                    {[
                      "Online access to purchased records",
                      "Export purchased records",
                      "One-time purchase — no subscription",
                    ].map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-[#475467]">
                        <CheckIcon /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
