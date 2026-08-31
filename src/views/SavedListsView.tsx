import { useState } from "react";
import type { UserScenario } from "../types";

interface SavedListsViewProps {
  scenario: UserScenario;
  onStartAISearch: () => void;
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function SearchIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-4" stroke="#98a2b3" strokeWidth="1.5">
      <circle cx="7" cy="7" r="5" />
      <path d="M11 11l3.5 3.5" strokeLinecap="round" />
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

function GemIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="size-5" stroke="#475467" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 7.5L10 17l6-9.5" />
      <path d="M2.5 7.5h15" />
      <path d="M5 3h10l2.5 4.5h-15L5 3z" />
      <path d="M7.5 3L6 7.5 10 17l4-9.5L12.5 3" />
    </svg>
  );
}

function EllipsisVIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-4">
      <circle cx="8" cy="3.5" r="1.2" fill="#475467" />
      <circle cx="8" cy="8" r="1.2" fill="#475467" />
      <circle cx="8" cy="12.5" r="1.2" fill="#475467" />
    </svg>
  );
}

function SmartRecIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-4">
      <defs>
        <linearGradient id="sr-grad" x1="8" y1="0" x2="8" y2="16" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F599ED" />
          <stop offset="0.5" stopColor="#016DEE" />
          <stop offset="1" stopColor="#2DFBF9" />
        </linearGradient>
      </defs>
      <path d="M8 1L9.5 6.5L15 8L9.5 9.5L8 15L6.5 9.5L1 8L6.5 6.5L8 1Z" fill="url(#sr-grad)" />
    </svg>
  );
}

function DatabaseIcon() {
  return (
    <svg viewBox="0 0 14 14" fill="none" className="size-3.5" stroke="#667085" strokeWidth="1.2">
      <ellipse cx="7" cy="3.5" rx="5" ry="2" />
      <path d="M2 3.5v7c0 1.1 2.24 2 5 2s5-.9 5-2v-7" />
      <path d="M2 7c0 1.1 2.24 2 5 2s5-.9 5-2" />
    </svg>
  );
}

function SparklesChipIcon() {
  return (
    <svg viewBox="0 0 14 14" fill="none" className="size-3.5">
      <path d="M7 1C7 1 8 4 9.5 5.5C11 7 14 7 14 7C14 7 11 7 9.5 8.5C8 10 7 13 7 13C7 13 6 10 4.5 8.5C3 7 0 7 0 7C0 7 3 7 4.5 5.5C6 4 7 1 7 1Z" fill="#475467" />
    </svg>
  );
}

// ─── Types & Data ─────────────────────────────────────────────────────────────

type ChipVariant = "prospect" | "customer" | "record" | "smart";

interface CardChip {
  label: string;
  variant: ChipVariant;
}

interface SavedListCard {
  name: string;
  date: string;
  source: "smart" | "database";
  sourceLabel: string;
  chips: CardChip[];
}

const CARDS: SavedListCard[] = [
  {
    name: "Bakeries Test",
    date: "created on Jan 05, 2024 10:00AM by Frank S",
    source: "smart",
    sourceLabel: "US Businesses: Smart recommendation",
    chips: [{ label: "Prospects 10k", variant: "prospect" }],
  },
  {
    name: "Bakeries Test 2",
    date: "created on Jan 05, 2024 10:00AM by Frank S",
    source: "smart",
    sourceLabel: "US Businesses: Smart recommendation",
    chips: [{ label: "Prospects 10k", variant: "prospect" }],
  },
  {
    name: "Restaurants",
    date: "created on Feb 15, 2024 10:00AM by Frank S",
    source: "database",
    sourceLabel: "US Businesses",
    chips: [{ label: "Records 10k", variant: "record" }],
  },
];

const CHIP_STYLES: Record<ChipVariant, string> = {
  prospect: "bg-[#f1f9fd] text-[#008dc3]",
  customer: "bg-[#f2f9f7] text-[#0d7867]",
  record: "bg-[#f2f4f7] text-[#475467]",
  smart: "bg-[#f2f4f7] text-[#475467]",
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function Chip({ label, variant }: CardChip) {
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-medium rounded-full px-2 py-0.5 whitespace-nowrap ${CHIP_STYLES[variant]}`}>
      {variant === "smart" && <SparklesChipIcon />}
      {label}
    </span>
  );
}

function AudienceCard({ card }: { card: SavedListCard }) {
  return (
    <div className="bg-white border border-[#d0d5dd] rounded-lg shadow-sm flex flex-col gap-4 pt-4 pb-6 px-[18px] min-h-[169px]">
      {/* Header row */}
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {card.source === "smart" ? <SmartRecIcon /> : <DatabaseIcon />}
            <span className="text-xs font-medium text-[#667085]">{card.sourceLabel}</span>
          </div>
          <button className="size-8 flex items-center justify-center rounded-md hover:bg-[#f2f4f7] transition-colors">
            <EllipsisVIcon />
          </button>
        </div>
        {/* Content */}
        <div className="flex flex-col gap-0.5">
          <h3 className="text-lg font-semibold text-[#1d2939] leading-7">{card.name}</h3>
          <p className="text-xs text-[#667085]">{card.date}</p>
        </div>
      </div>
      {/* Chips */}
      <div className="flex gap-1 flex-wrap">
        {card.chips.map((chip, i) => (
          <Chip key={i} {...chip} />
        ))}
      </div>
    </div>
  );
}

// ─── Main View ────────────────────────────────────────────────────────────────

export default function SavedListsView({ onStartAISearch }: SavedListsViewProps) {
  const [activeTab, setActiveTab] = useState<"saved" | "assigned">("saved");

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Tab header row */}
      <div className="px-6 pt-5 pb-0 shrink-0">
        <div className="flex items-center justify-between">
          {/* Tabs */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setActiveTab("saved")}
              className="flex flex-col gap-1 items-start"
            >
              <span className={`text-lg font-medium tracking-[0.18px] ${activeTab === "saved" ? "text-[#05587c]" : "text-[#98a2b3]"}`}>
                Saved lists
              </span>
              {activeTab === "saved" && (
                <div className="h-0.5 w-8 bg-[#05587c] rounded-full shadow-[0px_3px_8px_0px_rgba(5,88,124,0.3)]" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("assigned")}
              className="flex flex-col gap-1 items-start"
            >
              <span className={`text-lg font-medium tracking-[0.18px] ${activeTab === "assigned" ? "text-[#05587c]" : "text-[#98a2b3]"}`}>
                Assigned leads
              </span>
              {activeTab === "assigned" && (
                <div className="h-0.5 w-8 bg-[#05587c] rounded-full shadow-[0px_3px_8px_0px_rgba(5,88,124,0.3)]" />
              )}
            </button>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 border border-[#d0d5dd] rounded-lg px-5 py-3 bg-white hover:bg-[#f9fafb] transition-colors">
              <GemIcon />
              <span className="text-base font-medium text-[#475467]">Import</span>
            </button>
            <button
              className="bg-[#008dc3] border border-[#008dc3] text-white text-base font-medium px-5 py-3 rounded-lg hover:bg-[#007aab] transition-colors"
            >
              Buy list(s)
            </button>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-6 pt-6 pb-10">
        <div className="max-w-full">
          {/* Search + filters */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1 max-w-[376px]">
              <div className="flex items-center gap-2 border border-[#d0d5dd] rounded-lg px-4 py-2 h-10 bg-white">
                <SearchIcon />
                <input
                  type="text"
                  placeholder="Find saved lists"
                  className="flex-1 text-sm text-[#344054] placeholder:text-[#667085] bg-transparent border-none outline-none"
                />
              </div>
            </div>
            <div className="flex-1" />
            <div className="flex items-center gap-2 shrink-0">
              <div className="relative w-[183px]">
                <select className="appearance-none w-full border border-[#d0d5dd] rounded-lg px-4 py-2 h-10 text-sm text-[#475467] bg-white pr-9 focus:outline-none focus:border-[#008dc3] focus:ring-1 focus:ring-[#008dc3] cursor-pointer">
                  <option>All Businesses</option>
                  <option>US Businesses</option>
                  <option>US Consumers</option>
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#98a2b3] pointer-events-none">
                  <ChevronDown />
                </span>
              </div>
              <div className="relative w-[183px]">
                <select className="appearance-none w-full border border-[#d0d5dd] rounded-lg px-4 py-2 h-10 text-sm text-[#475467] bg-white pr-9 focus:outline-none focus:border-[#008dc3] focus:ring-1 focus:ring-[#008dc3] cursor-pointer">
                  <option>Created by all</option>
                  <option>Created by me</option>
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#98a2b3] pointer-events-none">
                  <ChevronDown />
                </span>
              </div>
            </div>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-3 gap-4">
            {CARDS.map((card, i) => (
              <AudienceCard key={i} card={card} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
