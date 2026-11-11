import { useState } from "react";
import type { UserScenario } from "../types";
import type { SavedList } from "../data/savedLists";
import { compactCount } from "../data/savedLists";
import PageBanner from "../components/PageBanner";

interface SavedListsViewProps {
  scenario: UserScenario;
  lists: SavedList[];
  /** The open list detail (kept in App so Export configuration / checkout can come back to it). */
  openListId: string | null;
  onOpenList: (id: string | null) => void;
  onSearchLeads: () => void;
  /** Freemium banner "See options" → pricing (Pro selected, Buy list shows this list). */
  onSeeOptions: (list: SavedList) => void;
  /** Subscription activating: banner "Buy List" → list checkout directly. */
  onBuyList: (list: SavedList) => void;
  onExport: (list: SavedList) => void;
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

interface SavingCard {
  name: string;
  progress: number;
}

const SAVING_CARDS: SavingCard[] = [
  { name: "Healthcare business California", progress: 65 },
];

function listChips(list: SavedList): CardChip[] {
  return [
    list.source === "smart"
      ? { label: `Prospects ${compactCount(list.records)}`, variant: "prospect" }
      : { label: `Records ${compactCount(list.records)}`, variant: "record" },
  ];
}

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
  "View criteria",
  "Rename list",
  "Delete list",
];

function SavingAudienceCard({ card }: { card: SavingCard }) {
  return (
    <div className="bg-white border border-[#d0d5dd] rounded-lg shadow-sm flex flex-col gap-4 pt-4 pb-6 px-[18px] min-h-[169px] relative overflow-hidden">
      <div className="flex items-center gap-2">
        <SmartRecIcon />
        <span className="text-xs font-medium text-[#667085]">US Businesses: Smart recommendation</span>
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold text-[#1d2939] leading-7">{card.name}</h3>
        <p className="text-xs text-[#667085]">Saving list…</p>
      </div>
      <div className="mt-auto">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-[#475467]">Saving in progress</span>
          <span className="text-xs font-medium text-[#344054]">{card.progress}%</span>
        </div>
        <div className="w-full h-1.5 bg-[#e4e7ec] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#008dc3] rounded-full transition-all"
            style={{ width: `${card.progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function AudienceCard({ card, onClick }: { card: SavedList; onClick?: () => void }) {
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
        {listChips(card).map((chip, i) => (
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

const MASKED_ROWS = [
  { name: "A******** ****** ***", city: "Austin, TX", phone: "(512) ***-****", industry: "Restaurants 5812-08", revenue: "Less Than $500,000", size: "1-4", contact: "B******* A********", title: "Owner" },
  { name: "D*** ********** ***", city: "Dallas, TX", phone: "(214) ***-****", industry: "Restaurants 5812-08", revenue: "$1-2.5 Million", size: "20-49", contact: "L*** D***", title: "Owner" },
  { name: "C****** ********* *****", city: "Houston, TX", phone: "(713) ***-****", industry: "Restaurants 5812-03", revenue: "$500,000-1 Million", size: "5-9", contact: "M******** C*****", title: "General Manager" },
  { name: "G****** ******** ***", city: "San Antonio, TX", phone: "(210) ***-****", industry: "Restaurants 5812-01", revenue: "Less Than $500,000", size: "1-4", contact: "R***** G*****", title: "Manager" },
  { name: "T**** ******* *****", city: "Fort Worth, TX", phone: "(817) ***-****", industry: "Restaurants 5812-08", revenue: "$2.5-5 Million", size: "50-99", contact: "S**** T****", title: "Owner" },
];

function MaskedLeadsTable({ records, onExport }: { records: number; onExport: () => void }) {
  return (
    <div className="overflow-hidden rounded-lg border border-[#eaecf0]">
      <div className="flex items-center justify-between gap-3 border-b border-[#eaecf0] px-4 py-3">
        <p className="text-sm font-medium text-[#475467]">
          <span className="font-semibold text-[#1d2939]">{records.toLocaleString()}</span> businesses
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onExport}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-[#d0d5dd] px-3 text-sm font-medium text-[#344054] hover:bg-[#f9fafb]"
          >
            <svg viewBox="0 0 16 16" fill="none" className="size-4" stroke="currentColor" strokeWidth="1.5"><path d="M8 2v8m0 0l-3-3m3 3l3-3M2.5 11v1.5a1 1 0 001 1h9a1 1 0 001-1V11" strokeLinecap="round" strokeLinejoin="round" /></svg>
            Export
          </button>
          <button type="button" className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-[#d0d5dd] px-3 text-sm font-medium text-[#344054] hover:bg-[#f9fafb]">
            Filters
          </button>
        </div>
      </div>
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="bg-[#f9fafb] text-xs font-medium text-[#667085]">
            {["Business Information", "Business Details", "Contacts", "Actions", "Assignee"].map((h) => (
              <th key={h} className="border-b border-[#eaecf0] px-4 py-2.5 font-medium">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {MASKED_ROWS.map((row) => (
            <tr key={row.name} className="border-b border-[#eaecf0] last:border-b-0">
              <td className="px-4 py-3 align-top">
                <p className="font-medium text-[#1d2939]">{row.name}</p>
                <p className="mt-1 text-xs text-[#667085]">{row.city}</p>
                <p className="mt-0.5 text-xs text-[#667085]">{row.phone}</p>
              </td>
              <td className="px-4 py-3 align-top text-xs text-[#475467]">
                <p>{row.industry}</p>
                <p className="mt-1">{row.revenue}</p>
                <p className="mt-1">{row.size}</p>
              </td>
              <td className="px-4 py-3 align-top">
                <p className="font-medium text-[#1d2939]">{row.contact}</p>
                <p className="text-xs text-[#667085]">{row.title}</p>
              </td>
              <td className="px-4 py-3 text-[#98a2b3]">--</td>
              <td className="px-4 py-3 text-[#98a2b3]">--</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SavedListDetail({
  card,
  scenario,
  onBack,
  onSeeOptions,
  onBuyList,
  onExport,
}: {
  card: SavedList;
  scenario: UserScenario;
  onBack: () => void;
  onSeeOptions: () => void;
  onBuyList: () => void;
  onExport: () => void;
}) {
  const [detailTab, setDetailTab] = useState<"list" | "map" | "insights">("list");
  const isFreemium = scenario.startsWith("freemium-");
  const activating = scenario === "freemium-activating";

  const tabs = [
    { key: "list" as const, label: "List" },
    { key: "map" as const, label: "Map" },
    { key: "insights" as const, label: "Insights" },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="px-6 pt-5 pb-0 shrink-0">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={onBack} className="text-[#475467] hover:text-[#1d2939] transition-colors">
            <svg viewBox="0 0 20 20" fill="none" className="size-5" stroke="currentColor" strokeWidth="1.5"><path d="M13 4l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <div>
            <h2 className="flex items-center gap-2 text-xl font-semibold text-[#1d2939]">
              {card.name}
              {card.purchased && (
                <span className="rounded-full bg-[#F2F9F7] px-2 py-0.5 text-xs font-medium text-[#0D7867]">Purchased</span>
              )}
            </h2>
            <p className="text-xs text-[#667085]">{card.date}</p>
          </div>
          {card.source === "smart" && (
            <span className="flex items-center gap-1 text-xs font-medium text-[#667085] bg-[#f2f4f7] rounded-full px-2.5 py-0.5">
              <SmartRecIcon /> Smart recommendation
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 border-b border-[#eaecf0]">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setDetailTab(t.key)}
              className={`px-4 py-2.5 text-sm font-medium transition-colors relative ${
                detailTab === t.key
                  ? "text-[#05587c]"
                  : "text-[#667085] hover:text-[#344054]"
              }`}
            >
              {t.label}
              {detailTab === t.key && (
                <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#05587c] rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pt-6 pb-10">
        {detailTab === "list" && <MaskedLeadsTable records={card.records} onExport={onExport} />}

        {detailTab === "map" && (
          <div className="bg-[#f9fafb] border border-[#eaecf0] rounded-xl p-10 text-center text-sm text-[#667085]">
            <svg viewBox="0 0 24 24" fill="none" className="size-10 mx-auto mb-3 text-[#d0d5dd]" stroke="currentColor" strokeWidth="1.2"><circle cx="12" cy="10" r="3" /><path d="M12 2C7.58 2 4 5.58 4 10c0 5.25 8 12 8 12s8-6.75 8-12c0-4.42-3.58-8-8-8z" /></svg>
            Map view coming soon
          </div>
        )}

        {detailTab === "insights" && (
          <div className="space-y-4">
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

      {isFreemium && !card.purchased &&
        (activating ? (
          <PageBanner
            title={`Tap into ${card.records.toLocaleString()} records before your competitors do`}
            subtitle="Purchase this for export and receive 30 days online access for free."
            cta={{ label: "Buy List", onClick: onBuyList }}
          />
        ) : (
          <PageBanner
            title={`Tap into ${card.records.toLocaleString()} leads before your competitors do`}
            subtitle="Subscriptions offer full access to fresh data, and built-in outreach tools. Or, buy a list to view and export."
            cta={{ label: "See options", onClick: onSeeOptions }}
          />
        ))}
    </div>
  );
}

// ─── Main View ────────────────────────────────────────────────────────────────

export default function SavedListsView({
  scenario,
  lists,
  openListId,
  onOpenList,
  onSearchLeads,
  onSeeOptions,
  onBuyList,
  onExport,
}: SavedListsViewProps) {
  const [activeTab, setActiveTab] = useState<"saved" | "assigned">("saved");
  const selectedCard = lists.find((l) => l.id === openListId) ?? null;

  if (selectedCard) {
    return (
      <SavedListDetail
        card={selectedCard}
        scenario={scenario}
        onBack={() => onOpenList(null)}
        onSeeOptions={() => onSeeOptions(selectedCard)}
        onBuyList={() => onBuyList(selectedCard)}
        onExport={() => onExport(selectedCard)}
      />
    );
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
              type="button"
              onClick={onSearchLeads}
              className="bg-[#008dc3] border border-[#008dc3] text-white text-base font-medium px-5 py-3 rounded-lg hover:bg-[#007aab] transition-colors"
            >
              Search for leads
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
            {SAVING_CARDS.map((card, i) => (
              <SavingAudienceCard key={`saving-${i}`} card={card} />
            ))}
            {lists.map((card) => (
              <AudienceCard key={card.id} card={card} onClick={() => onOpenList(card.id)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
