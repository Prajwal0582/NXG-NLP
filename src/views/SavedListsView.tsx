import { useState, useEffect } from "react";
import type { UserScenario } from "../types";

interface SavedListsViewProps {
  scenario: UserScenario;
  onStartAISearch: () => void;
  justSavedListName?: string | null;
  onSaveComplete?: () => void;
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

const KEBAB_MENU_ITEMS = [
  "Manage Leads",
  "Create Email campaign",
  "Group by",
  "View report",
  "Rename list",
  "Delete list",
];

function SavingAudienceCard({ name, progress }: { name: string; progress: number }) {
  return (
    <div className="bg-white border border-[#d0d5dd] rounded-lg shadow-[0px_0px_0px_rgba(71,84,103,0.04),0px_0px_1px_rgba(71,84,103,0.04),0px_1px_1px_rgba(71,84,103,0.03),0px_3px_2px_rgba(71,84,103,0.02),0px_5px_2px_rgba(71,84,103,0.01),0px_8px_2px_rgba(71,84,103,0)] flex flex-col gap-4 px-[18px] py-4 min-h-[169px] animate-fade-in">
      {/* Progress bar at top */}
      <div className="flex items-center h-8">
        <div className="relative w-full h-1.5 rounded bg-[#f2f4f7]">
          <div
            className="absolute top-0 left-0 h-1.5 rounded bg-[#008dc3] transition-all duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Title + subtitle */}
      <div className="flex flex-col gap-0.5">
        <h3 className="text-[18px] font-semibold text-[#1d2939] leading-7">{name}</h3>
        <p className="text-xs text-[#667085] leading-[18px]">Saving list</p>
      </div>
    </div>
  );
}

function AudienceCard({ card, onClick }: { card: SavedListCard; onClick?: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div onClick={onClick} className="bg-white border border-[#d0d5dd] rounded-lg shadow-sm flex flex-col gap-4 pt-4 pb-6 px-[18px] min-h-[169px] cursor-pointer hover:border-[#93c5fd] hover:shadow-md transition-all">
      {/* Header row */}
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {card.source === "smart" ? <SmartRecIcon /> : <DatabaseIcon />}
            <span className="text-xs font-medium text-[#667085]">{card.sourceLabel}</span>
          </div>
          <div className="relative">
            <button
              onClick={(e) => { e.stopPropagation(); setMenuOpen((o) => !o); }}
              className="size-8 flex items-center justify-center rounded-md hover:bg-[#f2f4f7] transition-colors"
            >
              <EllipsisVIcon />
            </button>
            {menuOpen && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg border border-[#eaecf0] shadow-lg z-20 py-1 animate-fade-in">
                {KEBAB_MENU_ITEMS.map((item) => (
                  <button
                    key={item}
                    onClick={(e) => { e.stopPropagation(); setMenuOpen(false); }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-[#f9fafb] transition-colors ${
                      item === "Delete list" ? "text-[#d92d20]" : "text-[#344054]"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
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

// ─── Insights charts (consistent with NLP chatbot) ──────────────────────────

const INSIGHTS_BIZ_TYPES = [
  { label: "Full-service restaurants", value: 2840 },
  { label: "Fast-casual dining", value: 1920 },
  { label: "Cafés & coffee shops", value: 1380 },
  { label: "Food trucks", value: 680 },
  { label: "Bakeries", value: 420 },
];

const INSIGHTS_GEO = [
  { label: "Houston", value: 1840 },
  { label: "Dallas", value: 1520 },
  { label: "Austin", value: 1280 },
  { label: "San Antonio", value: 980 },
  { label: "Fort Worth", value: 620 },
];

const INSIGHTS_DONUT = [
  { label: "1–10", pct: 42, color: "#0d7867" },
  { label: "11–50", pct: 31, color: "#008dc3" },
  { label: "51–200", pct: 18, color: "#f79009" },
  { label: "200+", pct: 9, color: "#e11d48" },
];

function SimpleBarChart({ title, rows, yLabel, xLabel }: { title: string; rows: { label: string; value: number }[]; yLabel: string; xLabel: string }) {
  const max = Math.max(...rows.map((r) => r.value));
  return (
    <div className="bg-white border border-[#eaecf0] rounded-xl p-5 shadow-sm">
      <h4 className="text-sm font-semibold text-[#1d2939] mb-4">{title}</h4>
      <div className="flex">
        <div className="flex items-center justify-center shrink-0 pr-1.5">
          <span className="text-[11px] font-semibold text-[#667085] [writing-mode:vertical-rl] rotate-180">{yLabel}</span>
        </div>
        <div className="flex-1 min-w-0 space-y-1.5">
          {rows.map((r, i) => (
            <div key={r.label} className="flex items-center gap-3">
              <span className="text-[13px] text-[#344054] w-[148px] truncate shrink-0">{r.label}</span>
              <div className="flex-1 h-[18px] relative">
                <div
                  className="absolute top-0 left-0 h-full rounded-[3px]"
                  style={{
                    width: `${(r.value / max) * 100}%`,
                    minWidth: 6,
                    background: i < 3 ? "linear-gradient(90deg, #0d7867 0%, #008dc3 50%, #38bdf8 100%)" : "#eef0f3",
                  }}
                />
              </div>
              <span className="text-[13px] text-[#475467] text-right tabular-nums w-12 shrink-0">{r.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
      <p className="text-center text-[11px] font-semibold text-[#667085] mt-3">{xLabel}</p>
    </div>
  );
}

function SimpleDonutChart({ title, segments, centerLabel }: { title: string; segments: { label: string; pct: number; color: string }[]; centerLabel: string }) {
  let pos = 0;
  const conic = segments.map((s) => { const start = pos; pos += s.pct; return `${s.color} ${start}% ${pos}%`; }).join(", ");
  return (
    <div className="bg-white border border-[#eaecf0] rounded-xl p-5 shadow-sm">
      <p className="text-xs font-semibold text-[#475467] uppercase tracking-wide mb-4">{title}</p>
      <div className="flex items-center gap-8">
        <div className="relative size-24 shrink-0">
          <div className="size-24 rounded-full" style={{ background: `conic-gradient(${conic})` }} />
          <div className="absolute inset-[18px] rounded-full bg-white flex items-center justify-center">
            <span className="text-[10px] font-semibold text-[#344054] text-center leading-tight px-1">{centerLabel}</span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {segments.map((s) => (
            <div key={s.label} className="flex items-center gap-2">
              <div className="size-2.5 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
              <span className="text-xs text-[#475467]">{s.label}</span>
              <span className="text-xs font-medium text-[#344054] ml-auto pl-4">{s.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Detail-view icons (16×16, #98a2b3 per Figma) ──────────────────────────

function LocationDotIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-4 shrink-0" stroke="#98a2b3" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 8.5C9.38 8.5 10.5 7.38 10.5 6S9.38 3.5 8 3.5 5.5 4.62 5.5 6 6.62 8.5 8 8.5z" />
      <path d="M8 14C8 14 13 9.58 13 6A5 5 0 003 6c0 3.58 5 8 5 8z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-4 shrink-0" stroke="#98a2b3" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6.27 7.73a8.56 8.56 0 002 2l.89-.89a.94.94 0 01.95-.23c.62.2 1.29.31 1.98.31a.94.94 0 01.94.94v1.95a.94.94 0 01-.94.94A10.31 10.31 0 013.25 3.94.94.94 0 014.19 3H6.14a.94.94 0 01.94.94c0 .7.1 1.36.31 1.98a.94.94 0 01-.23.95l-.89.86z" />
    </svg>
  );
}

function DollarCircleIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-4 shrink-0" stroke="#98a2b3" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="8" r="6" />
      <path d="M8 4.5v7M9.75 6.25c0-.83-.78-1.5-1.75-1.5s-1.75.67-1.75 1.5.78 1.5 1.75 1.5 1.75.67 1.75 1.5-.78 1.5-1.75 1.5-1.75-.67-1.75-1.5" />
    </svg>
  );
}

function HomeValueIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-4 shrink-0" stroke="#98a2b3" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.5 6.5L8 3l4.5 3.5V12a1 1 0 01-1 1h-8a1 1 0 01-1-1V6.5z" />
      <path d="M6.5 13V9h3v4" />
    </svg>
  );
}

function PersonIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-4 shrink-0" stroke="#98a2b3" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="5.5" r="2.5" />
      <path d="M3 13.5c0-2.49 2.24-4.5 5-4.5s5 2.01 5 4.5" />
    </svg>
  );
}

function LockAccessIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-4 shrink-0" stroke="#008dc3" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="8" r="6" />
      <path d="M6 8h4M8 6v4" />
    </svg>
  );
}

function MegaphoneIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-4 shrink-0" stroke="#475467" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 3v8M13 7c0 0-2 1.5-5 1.5H5a2 2 0 01-2-2v-1a2 2 0 012-2h3c3 0 5 1.5 5 1.5z" />
      <path d="M5 8.5v3a1 1 0 001 1h1a1 1 0 001-1v-3" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-4 shrink-0" stroke="#475467" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 10.5v2a1.5 1.5 0 001.5 1.5h8a1.5 1.5 0 001.5-1.5v-2M8 2v8.5M5 8l3 3 3-3" />
    </svg>
  );
}

function FloppyIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-4 shrink-0" stroke="#475467" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 2h7l3 3v7a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2z" />
      <path d="M6 2v3h4V2" />
      <rect x="5" y="9" width="6" height="4" rx="0.5" />
    </svg>
  );
}

function FilterLinesIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-4 shrink-0" stroke="#475467" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 4h12M4 8h8M6 12h4" />
    </svg>
  );
}

function SortArrowIcon() {
  return (
    <svg viewBox="0 0 10 10" fill="none" className="size-2.5" stroke="#98a2b3" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 4l3 3 3-3" />
    </svg>
  );
}

function SettingsGearIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-4" stroke="#98a2b3" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="8" r="2" />
      <path d="M13.6 10a1.2 1.2 0 00.24 1.32l.04.04a1.46 1.46 0 11-2.06 2.06l-.04-.04a1.2 1.2 0 00-1.32-.24 1.2 1.2 0 00-.73 1.1v.12a1.46 1.46 0 11-2.92 0v-.06a1.2 1.2 0 00-.78-1.1 1.2 1.2 0 00-1.32.24l-.04.04A1.46 1.46 0 112.52 11.4l.04-.04a1.2 1.2 0 00.24-1.32 1.2 1.2 0 00-1.1-.73h-.12a1.46 1.46 0 110-2.92h.06a1.2 1.2 0 001.1-.78 1.2 1.2 0 00-.24-1.32l-.04-.04A1.46 1.46 0 114.52 2.18l.04.04a1.2 1.2 0 001.32.24h.06a1.2 1.2 0 00.73-1.1v-.12a1.46 1.46 0 012.92 0v.06a1.2 1.2 0 00.73 1.1 1.2 1.2 0 001.32-.24l.04-.04a1.46 1.46 0 012.06 2.06l-.04.04a1.2 1.2 0 00-.24 1.32v.06a1.2 1.2 0 001.1.73h.12a1.46 1.46 0 010 2.92h-.06a1.2 1.2 0 00-1.1.73z" />
    </svg>
  );
}

function CalendarSmIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-4" stroke="#98a2b3" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="12" height="11" rx="1.5" />
      <path d="M5 1.5v3M11 1.5v3M2 7h12" />
    </svg>
  );
}

function TagSmIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-4" stroke="#98a2b3" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 8.5V3a1 1 0 011-1h5.5L14 7.5 8.5 13 2 8.5z" />
      <circle cx="5.5" cy="5.5" r="1" fill="#98a2b3" />
    </svg>
  );
}

function UsersSmIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-4" stroke="#98a2b3" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="5" r="2" />
      <path d="M2 13c0-2.21 1.79-4 4-4s4 1.79 4 4" />
      <circle cx="11" cy="5.5" r="1.5" />
      <path d="M14 13c0-1.66-1.12-3-2.5-3-.52 0-1 .15-1.41.42" />
    </svg>
  );
}

// ─── Detail-view dropdown icons (20×20, #475467 per Figma) ──────────────────

function DropdownIcon({ type }: { type: string }) {
  const cls = "size-5 shrink-0";
  switch (type) {
    case "group":
      return <svg viewBox="0 0 20 20" fill="none" className={cls} stroke="#475467" strokeWidth="1.3" strokeLinecap="round"><path d="M3 5h14M3 10h14M3 15h14" /><circle cx="6" cy="5" r="1.2" fill="#475467" stroke="none" /><circle cx="10" cy="10" r="1.2" fill="#475467" stroke="none" /><circle cx="14" cy="15" r="1.2" fill="#475467" stroke="none" /></svg>;
    case "message":
      return <svg viewBox="0 0 20 20" fill="none" className={cls} stroke="#475467" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><path d="M3 4h14v9H6l-3 2.5V4z" /><path d="M7 8h6M7 11h4" /></svg>;
    case "report":
      return <svg viewBox="0 0 20 20" fill="none" className={cls} stroke="#475467" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2.5" width="12" height="15" rx="1.5" /><path d="M7.5 6.5h5M7.5 10h5M7.5 13.5h3" /></svg>;
    case "clone":
      return <svg viewBox="0 0 20 20" fill="none" className={cls} stroke="#475467" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="6" width="10" height="10" rx="1.5" /><path d="M4 14V4.5A.5.5 0 014.5 4H14" /></svg>;
    case "campaign":
      return <svg viewBox="0 0 20 20" fill="none" className={cls} stroke="#475467" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><rect x="2.5" y="4" width="15" height="12" rx="1.5" /><path d="M2.5 4l7.5 6 7.5-6" /></svg>;
    default:
      return null;
  }
}

// ─── Detail-view table data ─────────────────────────────────────────────────

const DETAIL_LEADS = [
  { name: "C******", address: "*** **** **, *** Chicago IL 60606", phone: "not available", income: "$100,000 - $250,000", homeValue: "$500,000 - $1 Million", contact: "J******** S***", gender: "Female", unlocked: false },
  { name: "J*******", address: "*** **** **, *** Chicago IL 60606", phone: "not available", income: "$100,000 - $250,000", homeValue: "$500,000 - $1 Million", contact: "J*** P*****", gender: "Male", unlocked: false },
  { name: "W** **********", address: "*** **** **, *** Chicago IL 60606", phone: "(999) ***-****", income: "$100,000 - $250,000", homeValue: "$500,000 - $1 Million", contact: "J****** K*****", gender: "Male", unlocked: true },
  { name: "B**** ***", address: "*** **** **, *** Chicago IL 60606", phone: "not available", income: "$100,000 - $250,000", homeValue: "$500,000 - $1 Million", contact: "J** Q*****", gender: "Female", unlocked: false },
  { name: "U* **", address: "*** **** **, ******", phone: "not available", income: "$100,000 - $250,000", homeValue: "$500,000 - $1 Million", contact: "J** T**", gender: "Male", unlocked: true },
  { name: "U* **", address: "*** **** **, *** *****", phone: "not available", income: "Restaurants 8021-01", homeValue: "Less than $500,000", contact: "J** T**", gender: "CEO", unlocked: true },
];

const DETAIL_KEBAB_ITEMS = [
  { label: "Group by", icon: "group" },
  { label: "List message", icon: "message" },
  { label: "View report", icon: "report" },
  { label: "Create Email campaign", icon: "campaign" },
];

function SavedListDetail({ card, onBack }: { card: SavedListCard; onBack: () => void }) {
  const [detailTab, setDetailTab] = useState<"list" | "map" | "insights">("list");
  const [kebabOpen, setKebabOpen] = useState(false);
  const [checkedRows, setCheckedRows] = useState<Set<number>>(new Set());

  const allChecked = checkedRows.size === DETAIL_LEADS.length;

  function toggleAll() {
    if (allChecked) setCheckedRows(new Set());
    else setCheckedRows(new Set(DETAIL_LEADS.map((_, i) => i)));
  }

  function toggleRow(i: number) {
    setCheckedRows((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i); else next.add(i);
      return next;
    });
  }

  const tabs = [
    { key: "list" as const, label: "List" },
    { key: "map" as const, label: "Map" },
    { key: "insights" as const, label: "Insights" },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header: back arrow + title + date (per Figma 839:20612) */}
      <div className="px-7 pt-6 pb-0 shrink-0">
        <div className="flex items-start gap-2 mb-0">
          <button onClick={onBack} className="text-[#475467] hover:text-[#1d2939] transition-colors mt-1 shrink-0">
            <svg viewBox="0 0 28 28" fill="none" className="size-7">
              <path d="M18 6l-8 8 8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="flex flex-col gap-2">
            <h2 className="text-[20px] font-medium leading-[30px] tracking-[0.2px] text-[#1d2939]">{card.name}</h2>
            <p className="text-[14px] leading-[21px] tracking-[0.14px] text-[#475467]">{card.date}</p>
          </div>
        </div>

        {/* Tabs (Figma 839:20626 — Horizontal Tabs) */}
        <div className="flex items-center border-b border-[#eaecf0] mt-4">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setDetailTab(t.key)}
              className={`px-4 py-2.5 text-[14px] font-medium leading-[20px] transition-colors relative ${
                detailTab === t.key
                  ? "text-[#008dc3]"
                  : "text-[#667085] hover:text-[#344054]"
              }`}
            >
              {t.label}
              {detailTab === t.key && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#008dc3]" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-y-auto">
        {detailTab === "list" && (
          <div className="px-7">
            {/* Toolbar (Figma 839:20628): white bg, rounded-t, p-4, count + action buttons */}
            <div className="flex items-center justify-between bg-white rounded-t-lg p-4 mt-4">
              <p className="text-[16px] font-medium leading-[24px] text-[#1d2939]">12,931 businesses</p>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 border border-[#d0d5dd] rounded-md px-3 py-1.5 bg-white hover:bg-[#f9fafb] text-[14px] font-medium leading-[20px] text-[#475467] transition-colors">
                  <MegaphoneIcon />
                  Start a campaign
                </button>
                <button className="flex items-center gap-2 border border-[#d0d5dd] rounded-md px-3 py-1.5 bg-white hover:bg-[#f9fafb] text-[14px] font-medium leading-[20px] text-[#475467] transition-colors">
                  <DownloadIcon />
                  Export
                </button>
                <button className="flex items-center gap-2 border border-[#d0d5dd] rounded-md px-3 py-1.5 bg-white hover:bg-[#f9fafb] text-[14px] font-medium leading-[20px] text-[#475467] transition-colors">
                  <FloppyIcon />
                  Save
                </button>
                <button className="flex items-center gap-2 border border-[#d0d5dd] rounded-md px-3 py-1.5 bg-white hover:bg-[#f9fafb] text-[14px] font-medium leading-[20px] text-[#475467] transition-colors">
                  <FilterLinesIcon />
                  Filter
                </button>
                {/* Kebab (ellipsis-v) */}
                <div className="relative">
                  <button
                    onClick={() => setKebabOpen((o) => !o)}
                    className="flex items-center justify-center border border-[#d0d5dd] rounded-md p-2 bg-white hover:bg-[#f9fafb] transition-colors"
                  >
                    <EllipsisVIcon />
                  </button>
                  {kebabOpen && (
                    <div className="absolute right-0 top-full mt-1 w-[240px] bg-white rounded-lg border border-[#d0d5dd] shadow-[0px_0px_0px_rgba(71,84,103,0.04),0px_1px_3px_rgba(71,84,103,0.04),0px_5px_5px_rgba(71,84,103,0.03),0px_11px_7px_rgba(71,84,103,0.02),0px_19px_8px_rgba(71,84,103,0.01),0px_30px_8px_rgba(71,84,103,0)] z-20 overflow-hidden animate-fade-in">
                      {DETAIL_KEBAB_ITEMS.map((item) => (
                        <button
                          key={item.label}
                          onClick={() => setKebabOpen(false)}
                          className="w-full text-left px-4 py-2 h-12 text-[16px] font-normal leading-[24px] text-[#1d2939] hover:bg-[#f9fafb] transition-colors flex items-center gap-4"
                        >
                          <DropdownIcon type={item.icon} />
                          {item.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Data table (Figma 839:20638) */}
            <div className="border border-[#eaecf0] rounded-b-lg overflow-hidden mb-8">
              <table className="w-full">
                {/* Column header (Figma 839:20640 header row) */}
                <thead>
                  <tr className="bg-[#f9fafb] border-b border-[#eaecf0] h-9">
                    <th className="w-[68px] px-4 py-1.5 text-left">
                      <div className="flex items-center gap-1">
                        <input
                          type="checkbox"
                          checked={allChecked}
                          onChange={toggleAll}
                          className="size-4 rounded border-[#d0d5dd] text-[#008dc3] focus:ring-[#008dc3] cursor-pointer"
                        />
                        <SortArrowIcon />
                      </div>
                    </th>
                    <th className="px-4 py-1.5 text-left text-[14px] font-medium leading-[20px] text-[#475467]">Household Information</th>
                    <th className="px-4 py-1.5 text-left text-[14px] font-medium leading-[20px] text-[#475467]">Household Details</th>
                    <th className="px-4 py-1.5 text-left text-[14px] font-medium leading-[20px] text-[#475467]">Contacts</th>
                    <th className="w-[112px] px-4 py-1.5 text-left">
                      <div className="flex items-center gap-1 text-[14px] font-medium leading-[20px] text-[#475467]">
                        Assignee
                        <svg viewBox="0 0 12 12" fill="none" className="size-3" stroke="#98a2b3" strokeWidth="1.4" strokeLinecap="round"><path d="M6 2v8M3 7l3 3 3-3M3 5l3-3 3 3" /></svg>
                      </div>
                    </th>
                    <th className="w-14 px-3 py-1.5">
                      <SettingsGearIcon />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {DETAIL_LEADS.map((lead, i) => (
                    <tr key={i} className="border-b border-[#eaecf0] last:border-b-0 hover:bg-[#f9fafb] transition-colors">
                      {/* Checkbox cell — 68px, Figma 839:20643 */}
                      <td className="w-[68px] px-4 pt-3 pb-4 align-top">
                        <input
                          type="checkbox"
                          checked={checkedRows.has(i)}
                          onChange={() => toggleRow(i)}
                          className="size-4 rounded border-[#d0d5dd] text-[#008dc3] focus:ring-[#008dc3] cursor-pointer"
                        />
                      </td>
                      {/* Household Information — 316px, Figma 839:20651 */}
                      <td className="px-4 pt-3 pb-4 align-top">
                        <div className="flex flex-col gap-4">
                          <p className="text-[16px] font-medium leading-[24px] text-[#1d2939] truncate">{lead.name}</p>
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                              <LocationDotIcon />
                              <span className="text-[14px] leading-[21px] tracking-[0.14px] text-[#475467] truncate">{lead.address}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <PhoneIcon />
                              <span className="text-[14px] leading-[20px] text-[#475467]">{lead.phone}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      {/* Household Details — 316px, Figma 839:20675 */}
                      <td className="px-4 pt-3 pb-4 align-top">
                        <div className="flex flex-col gap-4">
                          <div className="h-6" />
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                              <DollarCircleIcon />
                              <span className="text-[14px] leading-[21px] tracking-[0.14px] text-[#475467]">{lead.income}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <HomeValueIcon />
                              <span className="text-[14px] leading-[20px] text-[#475467]">{lead.homeValue}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      {/* Contacts — 316px, Figma 839:20676 */}
                      <td className="px-4 pt-3 pb-4 align-top">
                        <div className="flex flex-col gap-4">
                          <div className="flex items-center gap-3">
                            <p className="text-[16px] font-medium leading-[24px] text-[#1d2939]">{lead.contact}</p>
                            <svg viewBox="0 0 10 6" fill="none" className="size-2.5 text-[#98a2b3] shrink-0">
                              <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className="flex items-center justify-center size-[30px] rounded-full bg-[#008dc3] text-white text-[11px] font-semibold shrink-0">CN</span>
                          </div>
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                              <PersonIcon />
                              <span className="text-[14px] leading-[20px] text-[#475467]">{lead.gender}</span>
                            </div>
                            {!lead.unlocked ? (
                              <div className="flex items-center gap-2">
                                <LockAccessIcon />
                                <span className="text-[14px] font-medium leading-[20px] text-[#008dc3]">Unlock with full access</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <LockAccessIcon />
                                <span className="text-[14px] leading-[20px] text-[#475467]">*********. **********</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      {/* Assignee — avatar placeholder, 112px, Figma 839:20678 */}
                      <td className="w-[112px] px-4 pt-3 pb-4 align-top">
                        <div className="size-[30px] rounded-full bg-[#e4e7ec]" />
                      </td>
                      {/* Actions — 3 icon buttons, 56px, Figma 839:20701 */}
                      <td className="w-14 px-3 pt-2 pb-4 align-top">
                        <div className="flex flex-col gap-2">
                          <button className="size-8 flex items-center justify-center rounded-md hover:bg-[#f2f4f7] transition-colors">
                            <CalendarSmIcon />
                          </button>
                          <button className="size-8 flex items-center justify-center rounded-md hover:bg-[#f2f4f7] transition-colors">
                            <TagSmIcon />
                          </button>
                          <button className="size-8 flex items-center justify-center rounded-md hover:bg-[#f2f4f7] transition-colors">
                            <UsersSmIcon />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination (Figma 839:20712) */}
              <div className="flex items-center justify-between px-4 py-4 border-t border-[#eaecf0] bg-white">
                <p className="text-[14px] text-[#475467]">Page 1 of 647</p>
                <div className="flex items-center gap-2">
                  <button className="border border-[#d0d5dd] rounded-md px-3.5 py-1.5 text-[14px] font-medium text-[#475467] bg-white hover:bg-[#f9fafb] transition-colors">Previous</button>
                  <button className="border border-[#d0d5dd] rounded-md px-3.5 py-1.5 text-[14px] font-medium text-[#475467] bg-white hover:bg-[#f9fafb] transition-colors">Next</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {detailTab === "map" && (
          <div className="px-7 pt-6 pb-10">
            <div className="bg-[#f9fafb] border border-[#eaecf0] rounded-xl p-10 text-center text-sm text-[#667085]">
              <svg viewBox="0 0 24 24" fill="none" className="size-10 mx-auto mb-3 text-[#d0d5dd]" stroke="currentColor" strokeWidth="1.2"><circle cx="12" cy="10" r="3" /><path d="M12 2C7.58 2 4 5.58 4 10c0 5.25 8 12 8 12s8-6.75 8-12c0-4.42-3.58-8-8-8z" /></svg>
              Map view coming soon
            </div>
          </div>
        )}

        {detailTab === "insights" && (
          <div className="px-7 pt-6 pb-10 space-y-4">
            <SimpleBarChart
              title="Top business types among qualified matches"
              rows={INSIGHTS_BIZ_TYPES}
              yLabel="Business type"
              xLabel="Number of Businesses"
            />
            <SimpleBarChart
              title="Top cities among qualified matches"
              rows={INSIGHTS_GEO}
              yLabel="City"
              xLabel="Number of Matches"
            />
            <SimpleDonutChart
              title="Employee-size mix"
              segments={INSIGHTS_DONUT}
              centerLabel="7.2k"
            />
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main View ────────────────────────────────────────────────────────────────

export default function SavedListsView({ onStartAISearch, justSavedListName, onSaveComplete }: SavedListsViewProps) {
  const [activeTab, setActiveTab] = useState<"saved" | "assigned">("saved");
  const [selectedCard, setSelectedCard] = useState<SavedListCard | null>(null);

  // Transient saving state: progress animates from 0→100, then card becomes a normal filled card
  const [savingName, setSavingName] = useState<string | null>(null);
  const [savingProgress, setSavingProgress] = useState(0);
  const [recentlySaved, setRecentlySaved] = useState<SavedListCard | null>(null);

  useEffect(() => {
    if (!justSavedListName) return;

    setSavingName(justSavedListName);
    setSavingProgress(0);
    setRecentlySaved(null);

    // Animate progress: 0 → 30 → 65 → 100 over ~3 seconds
    const t1 = setTimeout(() => setSavingProgress(30), 200);
    const t2 = setTimeout(() => setSavingProgress(65), 900);
    const t3 = setTimeout(() => setSavingProgress(100), 1800);

    // After progress completes, convert to a normal card
    const t4 = setTimeout(() => {
      setSavingName(null);
      setSavingProgress(0);
      setRecentlySaved({
        name: justSavedListName,
        date: `created on ${new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })} ${new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })} by Sarah M`,
        source: "smart",
        sourceLabel: "US Businesses: Smart recommendation",
        chips: [{ label: "Prospects 7.2k", variant: "prospect" as ChipVariant }],
      });
      onSaveComplete?.();
    }, 2800);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [justSavedListName, onSaveComplete]);

  if (selectedCard) {
    return <SavedListDetail card={selectedCard} onBack={() => setSelectedCard(null)} />;
  }

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
            {savingName && (
              <SavingAudienceCard name={savingName} progress={savingProgress} />
            )}
            {recentlySaved && (
              <AudienceCard card={recentlySaved} onClick={() => setSelectedCard(recentlySaved)} />
            )}
            {CARDS.map((card, i) => (
              <AudienceCard key={i} card={card} onClick={() => setSelectedCard(card)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
