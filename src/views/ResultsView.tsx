import { useState, useEffect, useRef, useCallback } from "react";
import LeadTable from "../components/LeadTable";
import type { UserScenario } from "../types";

// ─── Types ───────────────────────────────────────────────────────────────────

type StepStatus = "waiting" | "active" | "done";

interface Turn {
  id: number;
  prompt: string;
  stepStatuses: StepStatus[];
  isComplete: boolean;
  // Out of prompts: the processing block is shown greyed and stuck — no data is
  // ever generated (it never completes).
  frozen: boolean;
}

interface ResultsViewProps {
  scenario: UserScenario;
  prompt: string;
  promptsRemaining: number;
  freePromptsTotal: number;
  creditsRemaining: number;
  reservedCredits: number;
  showCreditCoach: boolean;
  onDismissCreditCoach: () => void;
  onBack: () => void;
  onHistory: () => void;
  onPurchase: () => void;
  onSave: () => void;
  onFeedback: (positive: boolean) => void;
  onFollowUp: (p: string) => void;
}

// ─── Processing steps ────────────────────────────────────────────────────────

const PROCESSING_STEPS = [
  { label: "Reviewing available data",       desc: "Scanning 7M+ healthcare business records across California" },
  { label: "Identifying qualified matches",  desc: "Applying revenue, employee count, and location filters" },
  { label: "Building insights",             desc: "Ranking leads by match score and contact quality" },
];

// ─── Follow-up content generator ─────────────────────────────────────────────

interface FollowUpData {
  insight: string;
  subtext: string;
  newCount: number;
  totalPages: number;
  chartType: "biz" | "geo" | "donut";
}

function resolveFollowUp(prompt: string): FollowUpData {
  const p = prompt.toLowerCase();
  if (p.includes("independent")) return {
    insight: "Your list is now limited to independent operators.",
    subtext: "Qualified matches reduced from 71 to 43 — independent practices account for 62% of your original pool.",
    newCount: 43, totalPages: 3, chartType: "biz",
  };
  if (p.includes("los angeles") || p.includes("san diego") || p.includes("focus on")) return {
    insight: "Filtered to Los Angeles and San Diego metro areas.",
    subtext: "Qualified matches reduced from 71 to 38. These two markets together account for 54% of matched records.",
    newCount: 38, totalPages: 2, chartType: "geo",
  };
  if (p.includes("verified")) return {
    insight: "Your list now shows only businesses with verified contacts.",
    subtext: "52 of 71 original matches have at least one verified contact on file — a strong starting point for outreach.",
    newCount: 52, totalPages: 3, chartType: "donut",
  };
  if (p.includes("50") || p.includes("250") || p.includes("employee")) return {
    insight: "Filtered to companies with 50–250 employees.",
    subtext: "Qualified matches reduced from 71 to 29. This segment has the highest verified-contact density.",
    newCount: 29, totalPages: 2, chartType: "donut",
  };
  return {
    insight: "Your search criteria have been refined.",
    subtext: "Qualified matches updated based on your refinement. Results ranked by revenue and contact quality.",
    newCount: 45, totalPages: 3, chartType: "biz",
  };
}

// ─── Suggested follow-up chips ────────────────────────────────────────────────

const FOLLOW_UP_CHIPS = [
  "Only show independent operators",
  "Focus on Los Angeles and San Diego",
  "Show businesses with verified contacts",
  "Narrow this to companies with 50–250 employees",
];

// ─── Icon components ──────────────────────────────────────────────────────────

function SparkleIcon({ size = "size-4" }: { size?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={`shrink-0 ${size}`}>
      <path d="M8 1.5C8 1.5 9.2 5.2 11.5 6.5C13.8 7.8 14.5 8 14.5 8C14.5 8 13.8 8.2 11.5 9.5C9.2 10.8 8 14.5 8 14.5C8 14.5 6.8 10.8 4.5 9.5C2.2 8.2 1.5 8 1.5 8C1.5 8 2.2 7.8 4.5 6.5C6.8 5.2 8 1.5 8 1.5Z" fill="url(#sg-sparkle)" />
      <defs>
        <linearGradient id="sg-sparkle" x1="1.5" y1="1.5" x2="14.5" y2="14.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8b5cf6" />
          <stop offset="0.5" stopColor="#3b82f6" />
          <stop offset="1" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function MicIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-4" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="22" />
    </svg>
  );
}

function LightningIcon({ className = "size-3" }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 14" fill="none" className={`shrink-0 ${className}`}>
      <path d="M7 1L1 8h5l-1 5 6-7H6L7 1Z" fill="#016dee" />
    </svg>
  );
}

function SendIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-4" stroke={active ? "#016dee" : "#9ca3af"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

// ─── Chart components ─────────────────────────────────────────────────────────

// ── Horizontal bar chart (light theme, gradient + hover tooltip) ─────────────

interface BarRow { label: string; value: number }

// Deep-navy → teal → emerald gradient reserved for the top-ranked bars.
const BAR_GRADIENT = "linear-gradient(90deg, #0a3355 0%, #0d6a72 55%, #14b88a 100%)";

// Nice, rounded x-axis scale + evenly spaced ticks.
function niceAxis(max: number) {
  const target = 6;
  const raw = max / target;
  const pow = Math.pow(10, Math.floor(Math.log10(raw)));
  const n = raw / pow;
  const step = (n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10) * pow;
  const axisMax = Math.ceil(max / step) * step;
  const ticks: number[] = [];
  for (let v = 0; v <= axisMax + 1e-6; v += step) ticks.push(v);
  return { axisMax, ticks };
}

function fmtTick(v: number) {
  if (v >= 1000) return `${(v / 1000).toFixed(1)}k`;
  return String(v);
}

const VALUE_W = 52;   // fixed right-hand value column
const GAP_X = 12;     // grid column gap (matches gap-x-3)

function DenseBarChart({
  title, rows, unit, xTitle, yTitle, source, labelWidth = 148, highlightCount = 3,
}: {
  title: string;
  rows: BarRow[];
  unit: string;         // e.g. "Businesses" → "Number of Businesses"
  xTitle: string;
  yTitle: string;
  source: string;
  labelWidth?: number;
  highlightCount?: number;
}) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [sortDesc, setSortDesc] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [flagged, setFlagged] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const flash = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 1800);
  };

  const displayRows = [...rows].sort((a, b) => (sortDesc ? b.value - a.value : a.value - b.value));
  const max = Math.max(...rows.map(r => r.value));
  const { axisMax, ticks } = niceAxis(max);
  const rowH = rows.length > 8 ? 22 : 26;

  const downloadCSV = () => {
    const csv = ["Label,Value", ...displayRows.map(r => `"${r.label}",${r.value}`)].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.replace(/\s+/g, "-").toLowerCase()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    flash("Chart data exported");
  };

  const toolCls = "size-7 flex items-center justify-center rounded-md text-[#8b98a9] hover:text-[#344054] hover:bg-[#f2f4f7] transition-colors";
  // Overlay/tick alignment insets (plot column between label and value columns).
  const insetStyle = { left: labelWidth + GAP_X, right: VALUE_W + GAP_X } as const;

  return (
    <div className="bg-white border border-[#eaecf0] rounded-xl p-5 shadow-sm">
      {/* Header with toolbar */}
      <div className="flex items-center justify-between mb-5">
        <h4 className="text-sm font-semibold text-[#1d2939]">{title}</h4>
        <div className="flex items-center gap-0.5 relative">
          <button onClick={() => { setFlagged(f => !f); flash(flagged ? "Feedback cleared" : "Thanks for your feedback"); }} className={`${toolCls} ${flagged ? "text-[#e11d48] bg-[#fef2f2]" : ""}`} title="Flag this chart">
            <svg viewBox="0 0 18 18" fill={flagged ? "currentColor" : "none"} className="size-4" stroke="currentColor" strokeWidth="1.4"><path d="M13 9V3h2v6h-2zm-1 1l-3 6H8.5A1.5 1.5 0 017 14.5v-2.5H3A1.5 1.5 0 011.5 10.5L2 5A1.5 1.5 0 013.5 3.5H12V10z" strokeLinejoin="round" /></svg>
          </button>
          <button onClick={downloadCSV} className={toolCls} title="Download CSV">
            <svg viewBox="0 0 16 16" fill="none" className="size-4" stroke="currentColor" strokeWidth="1.4"><path d="M8 10V3m-3 4l3 3 3-3" strokeLinecap="round" strokeLinejoin="round" /><path d="M3 13h10" strokeLinecap="round" /></svg>
          </button>
          <button onClick={() => { setShowGrid(g => !g); flash(showGrid ? "Gridlines hidden" : "Gridlines shown"); }} className={`${toolCls} ${showGrid ? "text-[#016dee]" : ""}`} title="Toggle gridlines">
            <svg viewBox="0 0 16 16" fill="none" className="size-4" stroke="currentColor" strokeWidth="1.4"><rect x="2" y="2" width="12" height="12" rx="1.5" /><path d="M2 6h12M6 6v8" /></svg>
          </button>
          <button onClick={() => { setSortDesc(s => !s); flash(sortDesc ? "Sorted ascending" : "Sorted descending"); }} className={toolCls} title="Toggle sort order">
            <svg viewBox="0 0 16 16" fill="none" className="size-4" stroke="currentColor" strokeWidth="1.4"><path d="M11 2l3 3-8 8-3.5.5.5-3.5 8-8z" strokeLinejoin="round" /></svg>
          </button>
          <button onClick={() => flash("Regenerating insights…")} className={toolCls} title="Regenerate with AI">
            <SparkleIcon size="size-4" />
          </button>

          {toast && (
            <div className="absolute top-full right-0 mt-1.5 z-30 bg-[#1d2939] text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap animate-fade-in pointer-events-none">
              {toast}
            </div>
          )}
        </div>
      </div>

      {/* Plot area with rotated y-axis title */}
      <div className="flex">
        <div className="flex items-center justify-center shrink-0 pr-1.5">
          <span className="text-[11px] font-semibold text-[#667085] [writing-mode:vertical-rl] rotate-180">{yTitle}</span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="relative grid items-center gap-x-3" style={{ gridTemplateColumns: `${labelWidth}px 1fr ${VALUE_W}px` }}>
            {/* Vertical gridlines over the plot column */}
            {showGrid && (
              <div className="pointer-events-none absolute inset-y-0" style={insetStyle}>
                {ticks.map(t => (
                  <div key={t} className="absolute top-0 bottom-0 w-px bg-[#eef0f3]" style={{ left: `${(t / axisMax) * 100}%` }} />
                ))}
              </div>
            )}

            {displayRows.map((r, i) => {
              const highlighted = i < highlightCount;
              const widthPct = (r.value / axisMax) * 100;
              const isHover = hovered === i;
              return (
                <div key={r.label} className="contents">
                  {/* Category label */}
                  <div className="relative z-10 text-[13px] text-[#344054] truncate" style={{ lineHeight: `${rowH}px` }}>
                    {r.label}
                  </div>

                  {/* Bar track */}
                  <div
                    className="relative z-10 cursor-pointer"
                    style={{ height: rowH }}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <div
                      className={`absolute top-1/2 -translate-y-1/2 left-0 rounded-[3px] transition-all duration-150 ${isHover ? "ring-2 ring-[#0d6a72]/40 brightness-110" : ""}`}
                      style={{
                        width: `${widthPct}%`,
                        minWidth: 6,
                        height: rowH - 8,
                        ...(highlighted
                          ? { backgroundImage: BAR_GRADIENT, backgroundSize: `${(axisMax / r.value) * 100}% 100%`, backgroundRepeat: "no-repeat" }
                          : { backgroundColor: isHover ? "#e2e8f0" : "#eef0f3" }),
                      }}
                    />

                    {/* Hover tooltip */}
                    {isHover && (
                      <div className="absolute left-2 -top-1 -translate-y-full z-20 pointer-events-none animate-fade-in">
                        <div className="bg-[#1d2939] rounded-lg shadow-xl px-3.5 py-2.5 whitespace-nowrap">
                          <p className="text-[13px] font-semibold text-white mb-0.5">{r.label}</p>
                          <div className="flex items-center gap-6">
                            <span className="text-xs text-[#98a2b3]">Number of {unit}:</span>
                            <span className="text-xs font-semibold text-white ml-auto">{r.value.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Value */}
                  <div className="relative z-10 text-[13px] text-[#475467] text-right tabular-nums" style={{ lineHeight: `${rowH}px` }}>
                    {r.value.toLocaleString()}
                  </div>
                </div>
              );
            })}
          </div>

          {/* X-axis tick numbers */}
          <div className="relative h-4 mt-1.5" style={insetStyle}>
            {ticks.map(t => (
              <span key={t} className="absolute top-0 -translate-x-1/2 text-[10px] text-[#98a2b3] whitespace-nowrap" style={{ left: `${(t / axisMax) * 100}%` }}>
                {fmtTick(t)}
              </span>
            ))}
          </div>

          {/* X-axis title */}
          <div className="relative mt-1.5" style={insetStyle}>
            <p className="text-center text-[11px] font-semibold text-[#667085]">{xTitle}</p>
          </div>
        </div>
      </div>

      {/* Source footer */}
      <div className="flex justify-end mt-3 pt-3 border-t border-[#f2f4f7]">
        <p className="text-xs text-[#98a2b3] flex items-center gap-1.5">
          Source:
          <span className="inline-flex items-center gap-1 text-[#475467]">
            <svg viewBox="0 0 12 12" fill="none" className="size-3" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="2" width="10" height="8" rx="1" /><path d="M3 5h6M3 7h4" strokeLinecap="round" /></svg>
            {source}
          </span>
        </p>
      </div>
    </div>
  );
}

const BIZ_TYPE_BARS: BarRow[] = [
  { label: "Independent practices", value: 4402 },
  { label: "Group practices",       value: 3187 },
  { label: "Franchise networks",    value: 2201 },
  { label: "Hospital-affiliated",   value: 1846 },
  { label: "Urgent care clinics",   value: 1523 },
  { label: "Specialty centers",     value: 1298 },
  { label: "Ambulatory surgical",   value: 1074 },
  { label: "Diagnostic labs",       value: 921  },
  { label: "Rehab facilities",      value: 743  },
  { label: "Home health agencies",  value: 612  },
  { label: "Telehealth providers",  value: 498  },
  { label: "Corporate chains",      value: 497  },
];

function BizTypeChart({ compact = false }: { compact?: boolean }) {
  const rows = compact ? BIZ_TYPE_BARS.slice(0, 6) : BIZ_TYPE_BARS;
  return (
    <DenseBarChart
      title="Top business types among qualified matches"
      rows={rows}
      unit="Businesses"
      xTitle="Number of Businesses"
      yTitle="Business type"
      source="Top business types among qualified matches"
      labelWidth={148}
    />
  );
}

const GEO_BARS: BarRow[] = [
  { label: "Los Angeles",   value: 1847 },
  { label: "San Diego",     value: 1124 },
  { label: "San Francisco", value: 892  },
  { label: "Sacramento",    value: 681  },
  { label: "San Jose",      value: 574  },
  { label: "Fresno",        value: 398  },
  { label: "Long Beach",    value: 341  },
  { label: "Oakland",       value: 318  },
  { label: "Bakersfield",   value: 287  },
  { label: "Anaheim",       value: 264  },
  { label: "Riverside",     value: 241  },
  { label: "Santa Ana",     value: 223  },
  { label: "Irvine",        value: 208  },
  { label: "Stockton",      value: 187  },
  { label: "Chula Vista",   value: 165  },
];

function GeoChart({ compact = false }: { compact?: boolean }) {
  const rows = compact ? GEO_BARS.slice(0, 6) : GEO_BARS;
  return (
    <DenseBarChart
      title="Top cities among qualified matches"
      rows={rows}
      unit="Matches"
      xTitle="Number of Matches"
      yTitle="City"
      source="Top cities among qualified matches"
      labelWidth={112}
    />
  );
}

const DONUT_SEGMENTS = [
  { label: "1–10 employees",    pct: 12, color: "#fca5a5" },
  { label: "11–50 employees",   pct: 35, color: "#86efac" },
  { label: "51–100 employees",  pct: 38, color: "#5eead4" },
  { label: "101–250 employees", pct: 15, color: "#c4b5fd" },
];

function buildConic(segs: typeof DONUT_SEGMENTS) {
  let pos = 0;
  return segs.map(s => { const start = pos; pos += s.pct; return `${s.color} ${start}% ${pos}%`; }).join(", ");
}

function DonutChart() {
  return (
    <div className="bg-white border border-[#eaecf0] rounded-xl p-5 shadow-sm">
      <p className="text-xs font-semibold text-[#475467] uppercase tracking-wide mb-4">Employee-size mix</p>
      <div className="flex items-center gap-8">
        <div className="relative size-24 shrink-0">
          <div className="size-24 rounded-full" style={{ background: `conic-gradient(${buildConic(DONUT_SEGMENTS)})` }} />
          <div className="absolute inset-[18px] rounded-full bg-white flex items-center justify-center">
            <span className="text-[11px] font-semibold text-[#344054]">71</span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {DONUT_SEGMENTS.map(s => (
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

function ChartForType({ type, compact = false }: { type: "biz" | "geo" | "donut"; compact?: boolean }) {
  if (type === "biz")   return <BizTypeChart compact={compact} />;
  if (type === "geo")   return <GeoChart compact={compact} />;
  return <DonutChart />;
}

// ─── User bubble ──────────────────────────────────────────────────────────────

function UserBubble({ prompt }: { prompt: string }) {
  return (
    <div className="flex justify-end mb-5">
      <div className="flex items-start gap-2.5">
        <div className="bg-[#f2f4f7] px-4 py-2.5 rounded-2xl rounded-tr-sm max-w-lg">
          <p className="text-sm text-[#344054] leading-relaxed">{prompt}</p>
        </div>
        <div className="bg-[#d0d5dd] size-8 rounded-full flex items-center justify-center text-xs font-semibold text-[#1d2939] shrink-0 mt-0.5">
          SM
        </div>
      </div>
    </div>
  );
}

// ─── Inline processing block ──────────────────────────────────────────────────

function InlineProcessingBlock({ stepStatuses, frozen = false }: { stepStatuses: StepStatus[]; frozen?: boolean }) {
  const executing = !frozen && stepStatuses.some(s => s === "active");
  return (
    <div className="mb-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <span className={frozen ? "opacity-40 grayscale" : ""}><SparkleIcon /></span>
        <span className={`text-sm font-semibold ${frozen ? "text-[#98a2b3]" : "text-[#1d2939]"}`}>SignalFuse</span>
      </div>
      <div className="flex flex-col">
        {PROCESSING_STEPS.map((step, i) => {
          const status = stepStatuses[i];
          const isLast = i === PROCESSING_STEPS.length - 1;
          return (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={`size-2.5 rounded-full mt-1 shrink-0 transition-colors duration-300 ${
                  status === "done" ? "bg-[#12b76a]" : status === "active" ? "bg-[#016dee]" : "bg-[#d0d5dd]"
                }`} />
                {!isLast && (
                  <div className={`w-px flex-1 my-1 min-h-[28px] transition-colors duration-300 ${
                    status === "done" ? "bg-[#12b76a]" : "bg-[#e4e7ec]"
                  }`} />
                )}
              </div>
              <div className={`${isLast ? "" : "pb-4"}`}>
                <p className={`text-sm font-medium transition-colors duration-300 ${
                  status === "done" ? "text-[#101828]" : status === "active" ? "text-[#016dee]" : "text-[#98a2b3]"
                }`}>{step.label}</p>
                <p className={`text-[13px] mt-0.5 transition-colors duration-300 ${status === "waiting" ? "text-[#c0c7d0]" : "text-[#667085]"}`}>
                  {step.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      {executing && (
        <div className="mt-4 ml-[22px] flex items-center gap-2 border border-[#e4e7ec] rounded-lg px-3 py-2 w-fit bg-[#f9fafb]">
          <svg viewBox="0 0 16 16" fill="none" className="size-4 text-[#667085]" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 5h8M4 8h8M4 11h5" strokeLinecap="round" />
          </svg>
          <span className="text-sm text-[#475467]">Executing Query</span>
          <span className="flex gap-0.5 ml-1">
            {[0, 1, 2].map(j => (
              <span key={j} className="size-1 rounded-full bg-[#667085] animate-bounce" style={{ animationDelay: `${j * 150}ms`, animationDuration: "0.8s" }} />
            ))}
          </span>
        </div>
      )}
    </div>
  );
}

// ─── Action banner ─────────────────────────────────────────────────────────────

function ActionBanner({ isFreemium, totalLeads, onSave, onPurchase }: {
  isFreemium: boolean;
  totalLeads: number;
  onSave: () => void;
  onPurchase: () => void;
}) {
  return (
    <div className="flex items-center justify-between bg-[#f8f9fb] border border-[#e4e7ec] rounded-xl px-4 py-3.5 mb-4">
      <div>
        <h4 className="text-sm font-semibold text-[#1d2939]">Save Lead List</h4>
        <p className="text-xs text-[#667085] mt-0.5">{totalLeads} qualified leads ready to export or launch a campaign</p>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={onSave} className="size-8 flex items-center justify-center bg-white border border-[#d0d5dd] rounded-lg hover:bg-[#f2f4f7] transition-colors text-[#475467]" title="Save">
          <svg viewBox="0 0 16 16" fill="none" className="size-4" stroke="currentColor" strokeWidth="1.5">
            <path d="M13 13H3V3h7l3 3v7z" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M5 13V9h6v4M5 3h5v3H5z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button className="size-8 flex items-center justify-center bg-white border border-[#d0d5dd] rounded-lg hover:bg-[#f2f4f7] transition-colors text-[#475467]" title="Download">
          <svg viewBox="0 0 16 16" fill="none" className="size-4" stroke="currentColor" strokeWidth="1.5">
            <path d="M8 11V3m-3 5l3 3 3-3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3 14h10" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        {isFreemium ? (
          <button onClick={onPurchase} className="flex items-center gap-1.5 px-4 py-1.5 bg-[#016dee] text-white text-xs font-semibold rounded-lg hover:bg-[#0052cc] transition-colors">
            <svg viewBox="0 0 14 14" fill="none" className="size-3.5" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="6" width="10" height="7" rx="1" /><path d="M4.5 6V4.5a2.5 2.5 0 015 0V6" /></svg>
            Unlock List
          </button>
        ) : (
          <button onClick={onSave} className="flex items-center gap-1.5 px-4 py-1.5 bg-[#016dee] text-white text-xs font-semibold rounded-lg hover:bg-[#0052cc] transition-colors">
            Export List
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Feedback row ─────────────────────────────────────────────────────────────

function FeedbackRow({ onFeedback }: { onFeedback: (positive: boolean) => void }) {
  const [thumbsUp, setThumbsUp] = useState<boolean | null>(null);
  return (
    <div className="flex items-center gap-3 py-4 border-t border-[#f2f4f7] mt-4">
      <span className="text-sm text-[#475467]">Is this useful?</span>
      <button onClick={() => { setThumbsUp(true); onFeedback(true); }} className={`p-1 rounded hover:bg-[#f2f4f7] transition-colors ${thumbsUp === true ? "text-[#016dee]" : "text-[#98a2b3]"}`}>
        <svg viewBox="0 0 18 18" fill={thumbsUp === true ? "#016dee" : "none"} className="size-4" stroke="currentColor" strokeWidth="1.5"><path d="M5 9V15H3V9h2zm1-1l3-6h.5a1.5 1.5 0 011.5 1.5v2.5h4a1.5 1.5 0 011.5 1.5L16 13a1.5 1.5 0 01-1.5 1.5H6V8z" strokeLinejoin="round" /></svg>
      </button>
      <button onClick={() => { setThumbsUp(false); onFeedback(false); }} className={`p-1 rounded hover:bg-[#f2f4f7] transition-colors ${thumbsUp === false ? "text-[#e11d48]" : "text-[#98a2b3]"}`}>
        <svg viewBox="0 0 18 18" fill={thumbsUp === false ? "#e11d48" : "none"} className="size-4" stroke="currentColor" strokeWidth="1.5"><path d="M13 9V3h2v6h-2zm-1 1l-3 6H8.5A1.5 1.5 0 017 14.5v-2.5H3A1.5 1.5 0 011.5 10.5L2 5A1.5 1.5 0 013.5 3.5H12V10z" strokeLinejoin="round" /></svg>
      </button>
      <button className="p-1 rounded hover:bg-[#f2f4f7] transition-colors text-[#98a2b3]">
        <svg viewBox="0 0 18 18" fill="none" className="size-4" stroke="currentColor" strokeWidth="1.5"><circle cx="9" cy="9" r="7" /><path d="M9 8v5M9 6h.01" strokeLinecap="round" /></svg>
      </button>
    </div>
  );
}

// ─── First-turn result content ─────────────────────────────────────────────────

function FirstTurnResult({ isFreemium, showChips, onPurchase, onSave, onFeedback, onChipClick }: {
  isFreemium: boolean;
  showChips: boolean;
  onPurchase: () => void;
  onSave: () => void;
  onFeedback: (positive: boolean) => void;
  onChipClick: (chip: string) => void;
}) {
  const [sourcesOpen, setSourcesOpen] = useState(false);
  const [thoughtOpen, setThoughtOpen] = useState(false);

  return (
    <div className="animate-fade-in">
      {/* SignalFuse header */}
      <div className="flex items-center gap-2 mb-3">
        <SparkleIcon />
        <span className="text-sm font-semibold text-[#1d2939]">SignalFuse</span>
      </div>

      {/* Thought process disclosure */}
      <button
        onClick={() => setThoughtOpen(o => !o)}
        className="flex items-center gap-1.5 text-xs text-[#667085] hover:text-[#344054] mb-4 border border-[#eaecf0] rounded-md px-2.5 py-1 transition-colors"
      >
        <svg viewBox="0 0 16 16" fill="none" className="size-3.5" stroke="currentColor" strokeWidth="1.5"><circle cx="8" cy="8" r="6.5" /><circle cx="8" cy="8" r="2.5" /></svg>
        Thought process
        <svg viewBox="0 0 12 12" fill="none" className={`size-3 ml-0.5 transition-transform ${thoughtOpen ? "rotate-180" : ""}`} stroke="currentColor" strokeWidth="1.5"><path d="M2 4l4 4 4-4" strokeLinecap="round" /></svg>
      </button>
      {thoughtOpen && (
        <div className="mb-4 bg-[#f9fafb] border border-[#eaecf0] rounded-lg px-4 py-3 text-xs text-[#667085] space-y-1 animate-fade-in">
          <p>Applied filters: California · Healthcare (SIC 8011) · 50+ employees · Revenue ≥ $500K</p>
          <p>Ranked by: verified contact availability, revenue, employee count</p>
          <p>Data source: Data Axle Business Database (July 2026 update)</p>
        </div>
      )}

      {/* Result title */}
      <h2 className="text-[15px] font-semibold text-[#1d2939] mb-2">
        Healthcare Businesses in California — 71 Qualified Matches Found
      </h2>

      {/* Count */}
      <p className="text-sm text-[#475467] mb-4 leading-relaxed">
        I found <strong className="font-semibold text-[#1d2939]">71 healthcare businesses in California</strong> matching your criteria. Here is a breakdown of the results:
      </p>

      {/* Business-type insight */}
      <p className="text-sm text-[#475467] mb-3 leading-relaxed">
        <span className="font-medium text-[#344054]">Business type</span> — The majority (62%) are independent practices, followed by franchise networks (31%) and corporate chains (7%). Independent operators typically move faster through vendor evaluation.
      </p>

      {/* Geographic insight */}
      <p className="text-sm text-[#475467] mb-3 leading-relaxed">
        <span className="font-medium text-[#344054]">Geographic concentration</span> — Los Angeles (1,847) and San Diego (1,124) account for the highest match density. San Francisco and Sacramento follow, making them strong secondary targets.
      </p>

      {/* Employee-size insight */}
      <p className="text-sm text-[#475467] mb-3 leading-relaxed">
        <span className="font-medium text-[#344054]">Employee size</span> — 38% of matched businesses have 51–100 employees, indicating mid-size operations likely to have dedicated procurement staff. Contact readiness is highest in this band.
      </p>

      {/* Outreach recommendation */}
      <p className="text-sm text-[#475467] mb-4 leading-relaxed">
        <span className="font-medium text-[#344054]">Recommendation</span> — Prioritise independent practices in Los Angeles and San Diego with verified contacts. This cohort has the fastest response time and the highest proportion of decision-maker titles on file.
      </p>

      {/* Sources + feedback */}
      <div className="flex items-center justify-between mb-2">
        <button
          onClick={() => setSourcesOpen(o => !o)}
          className="flex items-center gap-1.5 text-xs text-[#475467] hover:text-[#1d2939] transition-colors"
        >
          <svg viewBox="0 0 12 12" fill="none" className="size-3" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="2" width="10" height="8" rx="1" /><path d="M3 5h6M3 7h4" strokeLinecap="round" /></svg>
          Sources (2)
          <svg viewBox="0 0 12 12" fill="none" className={`size-3 transition-transform ${sourcesOpen ? "rotate-180" : ""}`} stroke="currentColor" strokeWidth="1.5"><path d="M2 4l4 4 4-4" strokeLinecap="round" /></svg>
        </button>
      </div>
      {sourcesOpen && (
        <div className="mb-4 bg-[#f9fafb] border border-[#eaecf0] rounded-lg p-3 space-y-1.5 animate-fade-in">
          <p className="text-xs text-[#016dee] hover:underline cursor-pointer">1. US Business Database — Healthcare Physicians (SIC 8011)</p>
          <p className="text-xs text-[#016dee] hover:underline cursor-pointer">2. Verified Contacts Data Axle File — California region</p>
        </div>
      )}

      {/* Charts */}
      <div className="space-y-4 mt-6 mb-8">
        <BizTypeChart />
        <GeoChart />
        <DonutChart />
      </div>

      {/* Qualified leads */}
      <LeadsSection
        isFreemium={isFreemium}
        totalLeads={71}
        totalPages={4}
        onSave={onSave}
        onPurchase={onPurchase}
      />

      {/* Follow-up chips */}
      {showChips && (
        <FollowUpChips onChipClick={onChipClick} />
      )}

      <FeedbackRow onFeedback={onFeedback} />
    </div>
  );
}

// ─── Follow-up turn result ────────────────────────────────────────────────────

function FollowUpTurnResult({ prompt, isFreemium, showChips, onPurchase, onSave, onFeedback, onChipClick }: {
  prompt: string;
  isFreemium: boolean;
  showChips: boolean;
  onPurchase: () => void;
  onSave: () => void;
  onFeedback: (positive: boolean) => void;
  onChipClick: (chip: string) => void;
}) {
  const data = resolveFollowUp(prompt);

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-2 mb-3">
        <SparkleIcon />
        <span className="text-sm font-semibold text-[#1d2939]">SignalFuse</span>
      </div>

      <p className="text-sm font-medium text-[#1d2939] mb-1">{data.insight}</p>
      <p className="text-sm text-[#475467] mb-4 leading-relaxed">{data.subtext}</p>

      <FeedbackRow onFeedback={onFeedback} />

      <div className="mt-6 mb-8">
        <ChartForType type={data.chartType} compact />
      </div>

      <LeadsSection
        isFreemium={isFreemium}
        totalLeads={data.newCount}
        totalPages={data.totalPages}
        onSave={onSave}
        onPurchase={onPurchase}
      />

      {showChips && (
        <FollowUpChips onChipClick={onChipClick} />
      )}
    </div>
  );
}

// ─── Leads section (banner + table) ──────────────────────────────────────────

function LeadsSection({ isFreemium, totalLeads, totalPages, onSave, onPurchase }: {
  isFreemium: boolean;
  totalLeads: number;
  totalPages: number;
  onSave: () => void;
  onPurchase: () => void;
}) {
  return (
    <div className="mb-6">
      <h3 className="text-base font-semibold text-[#1d2939] mb-0.5">Top Qualified Leads</h3>
      <p className="text-sm text-[#475467] mb-3">Ranked by revenue and employee count with verified contact information.</p>
      <ActionBanner isFreemium={isFreemium} totalLeads={totalLeads} onSave={onSave} onPurchase={onPurchase} />
      <LeadTable isFreemium={isFreemium} onPurchase={onPurchase} onSave={onSave} hideDuplicateHeader totalLeads={totalLeads} totalPages={totalPages} />
    </div>
  );
}

// ─── Follow-up chips ──────────────────────────────────────────────────────────

function FollowUpChips({ onChipClick }: { onChipClick: (c: string) => void }) {
  return (
    <div className="mt-6 mb-2">
      <div className="flex items-center gap-2 mb-3">
        <SparkleIcon size="size-3.5" />
        <span className="text-sm font-semibold text-[#1d2939]">Suggested follow-up questions</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {FOLLOW_UP_CHIPS.map(chip => (
          <button
            key={chip}
            onClick={() => onChipClick(chip)}
            className="px-3.5 py-1.5 text-sm text-[#016dee] border border-[#b2ddff] bg-[#f5f9ff] rounded-full hover:bg-[#eff8ff] hover:border-[#016dee] transition-colors"
          >
            {chip}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Main ResultsView component ───────────────────────────────────────────────

export default function ResultsView({
  scenario,
  prompt,
  promptsRemaining,
  freePromptsTotal,
  creditsRemaining,
  reservedCredits,
  showCreditCoach,
  onDismissCreditCoach,
  onBack,
  onHistory,
  onPurchase,
  onSave,
  onFeedback,
  onFollowUp,
}: ResultsViewProps) {
  const [turns, setTurns] = useState<Turn[]>([]);
  const [followUpInput, setFollowUpInput] = useState("");
  // Smart-friction confirm shown only when the credit balance is low.
  const [lowBalancePrompt, setLowBalancePrompt] = useState<string | null>(null);

  const nextId = useRef(0);
  const booted = useRef(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const free = scenario.startsWith("freemium-");
  const isCredit = scenario === "subscriber-credit" || scenario === "subscriber-credit-0";
  const isSubFreeTransitioned = scenario === "subscriber-free" && promptsRemaining <= 0 && creditsRemaining > 0;
  const isCreditMode = isCredit || isSubFreeTransitioned;
  const isCreditExhausted = isCreditMode && creditsRemaining <= 0 && promptsRemaining <= 0;
  const isExhausted = (free && promptsRemaining <= 0) || isCreditExhausted;
  // Low-balance warning — amber inline alert shown for the whole "5 and less"
  // range, decrementing with each prompt (5 → 4 → … → 1 → 0). At 0 the composer
  // send is locked but the field, alert and counter stay visible (exhausted state).
  const isLowPrompt = free && promptsRemaining <= 5;
  // Low = enough for ≤ 2 more prompts (each costs 2 credits).
  const isLowCredit = isCreditMode && creditsRemaining <= 4;

  // Add a turn and run its processing animation. When `frozen` (user is out of
  // prompts), the block is added greyed and stuck — no timers run, so it never
  // completes and no data is ever generated.
  const addTurn = useCallback((p: string, frozen = false) => {
    const id = nextId.current++;
    setTurns(prev => [...prev, { id, prompt: p, stepStatuses: ["waiting", "waiting", "waiting"], isComplete: false, frozen }]);
    if (frozen) return;

    const upd = (stepIdx: number, status: StepStatus) =>
      setTurns(prev => prev.map(t => t.id !== id ? t : { ...t, stepStatuses: t.stepStatuses.map((s, i) => i === stepIdx ? status : s) as StepStatus[] }));

    setTimeout(() => upd(0, "active"), 80);
    setTimeout(() => { upd(0, "done"); upd(1, "active"); }, 1200);
    setTimeout(() => { upd(1, "done"); upd(2, "active"); }, 2300);
    setTimeout(() => upd(2, "done"), 3200);
    setTimeout(() => setTurns(prev => prev.map(t => t.id !== id ? t : { ...t, isComplete: true })), 3500);
  }, []);

  // Boot first turn from the prompt prop — guard against Strict Mode double-invoke.
  // If the user is already out of prompts (freemium-0), the turn is frozen: the
  // system does not generate data because the prompt limit is finished.
  useEffect(() => {
    if (booted.current) return;
    booted.current = true;
    addTurn(prompt, isExhausted);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Scroll to bottom when a new turn is added or completes
  const completedCount = turns.filter(t => t.isComplete).length;
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [turns.length, completedCount]);

  // Silent send — deduct (via onFollowUp) + add the turn. Toast is handled in App.
  function sendPrompt(p: string) {
    onFollowUp(p);
    addTurn(p);
    setFollowUpInput("");
  }

  // Submit handler — ambient credit model: no per-prompt modal.
  function interceptSubmit(p: string) {
    if (!p.trim()) return;
    const trimmed = p.trim();
    if (isExhausted) return;
    if (isCreditMode) {
      if (isLowCredit) { setLowBalancePrompt(trimmed); return; }
      sendPrompt(trimmed);
      return;
    }
    sendPrompt(trimmed);
  }

  function handleLowBalanceContinue() {
    if (!lowBalancePrompt) return;
    sendPrompt(lowBalancePrompt);
    setLowBalancePrompt(null);
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey && followUpInput.trim()) {
      e.preventDefault();
      interceptSubmit(followUpInput.trim());
    }
  }

  const lastTurnId = turns[turns.length - 1]?.id;
  // Out of prompts → lock the send button (composer, alert and counter stay visible).
  const sendLocked = isExhausted || isCreditExhausted;
  const sendDisabled = !followUpInput.trim() || sendLocked;

  return (
    <div className="flex flex-col h-full bg-white">

      {/* ── Full-width page header ────────────────────────────────────────── */}
      <div className="px-6 py-3 border-b border-[#eaecf0] shrink-0 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="text-[#475467] hover:text-[#1d2939] p-1 rounded hover:bg-[#f2f4f7] transition-colors">
              <svg viewBox="0 0 20 20" fill="none" className="size-5" stroke="currentColor" strokeWidth="2"><path d="M12 5L7 10l5 5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <div>
              <h1 className="text-base font-semibold text-[#1d2939] leading-tight">Smart Search</h1>
              {prompt && <p className="text-xs text-[#667085] mt-0.5">{prompt.length > 70 ? prompt.slice(0, 70) + "…" : prompt}</p>}
            </div>
          </div>
          <button onClick={onHistory} className="flex items-center gap-2 px-3.5 py-1.5 text-sm font-medium text-[#344054] border border-[#d0d5dd] rounded-lg bg-white hover:bg-[#f9fafb] transition-colors">
            <svg viewBox="0 0 16 16" fill="none" className="size-4 text-[#475467]" stroke="currentColor" strokeWidth="1.5"><circle cx="8" cy="8" r="6.5" /><path d="M8 5v3.5l2 2" strokeLinecap="round" /></svg>
            History
          </button>
        </div>
      </div>

      {/* ── Scrollable conversation ───────────────────────────────────────── */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        <div className="max-w-[1150px] mx-auto px-4 py-8">

          {turns.map((turn, i) => {
            const isFirstTurn = i === 0;
            const isLastTurn = turn.id === lastTurnId;

            return (
              <div key={turn.id} className="mb-8">
                <UserBubble prompt={turn.prompt} />

                {!turn.isComplete ? (
                  <InlineProcessingBlock stepStatuses={turn.stepStatuses} frozen={turn.frozen} />
                ) : isFirstTurn ? (
                  <FirstTurnResult
                    isFreemium={free}
                    showChips={false}
                    onPurchase={onPurchase}
                    onSave={onSave}
                    onFeedback={onFeedback}
                    onChipClick={interceptSubmit}
                  />
                ) : (
                  <FollowUpTurnResult
                    prompt={turn.prompt}
                    isFreemium={free}
                    showChips={false}
                    onPurchase={onPurchase}
                    onSave={onSave}
                    onFeedback={onFeedback}
                    onChipClick={interceptSubmit}
                  />
                )}
              </div>
            );
          })}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* ── Sticky footer — composer always stays visible (send locks at 0) ─ */}
      <div className="shrink-0 bg-white border-t border-[#eaecf0] shadow-[0_-4px_20px_rgba(0,0,0,0.07)]">
        <div className="mx-auto py-4 relative max-w-[1150px] px-4">

          {/* Smart-friction: low-balance confirm (only when credits are low) */}
          {lowBalancePrompt && (
            <div className="absolute bottom-full left-0 right-0 mb-2 animate-fade-in">
              <div className="bg-[#f0f9ff] border border-[#bae6fd] rounded-xl shadow-lg px-4 py-3.5 flex items-center justify-between gap-4">
                <div className="flex items-start gap-2.5">
                  <span className="mt-0.5"><LightningIcon /></span>
                  <div>
                    <p className="text-sm font-semibold text-[#1d2939]">Low balance — {creditsRemaining} credits left</p>
                    <p className="text-xs text-[#475467] mt-0.5">This prompt uses 2 credits.</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => { setLowBalancePrompt(null); onPurchase(); }} className="px-3.5 py-1.5 text-xs font-medium text-[#344054] border border-[#d0d5dd] rounded-lg bg-white hover:bg-[#f9fafb] transition-colors">Top up</button>
                  <button onClick={handleLowBalanceContinue} className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#016dee] hover:bg-[#0052cc] rounded-lg transition-colors">Continue</button>
                </div>
              </div>
            </div>
          )}

          {/* First-prompt coach tip (once per session, subscriber-credit only) */}
          {isCredit && showCreditCoach && !lowBalancePrompt && (
            <div className="absolute bottom-full right-4 mb-2 w-72 animate-fade-in">
              <div className="bg-[#1d2939] text-white rounded-xl shadow-xl px-4 py-3">
                <div className="flex items-start gap-2.5">
                  <span className="mt-0.5"><LightningIcon /></span>
                  <div className="flex-1">
                    <p className="text-xs leading-relaxed text-[#e4e7ec]">Each AI prompt uses 2 credits from your balance.</p>
                    <button onClick={onDismissCreditCoach} className="mt-2 text-xs font-semibold text-[#7cc4ff] hover:text-white transition-colors">Got it</button>
                  </div>
                </div>
                <div className="absolute -bottom-1.5 right-8 size-3 bg-[#1d2939] rotate-45" />
              </div>
            </div>
          )}

          {/* Low-balance inline alert (amber) — decrements with each prompt, 0 when exhausted */}
          {isLowPrompt && (
            <div className="flex items-center gap-2 bg-[#fffaeb] border border-[#fedf89] rounded-lg px-3.5 py-2 mb-2">
              <svg viewBox="0 0 16 16" fill="none" className="size-4 shrink-0 text-[#dc6803]" stroke="currentColor" strokeWidth="1.5">
                <circle cx="8" cy="8" r="6.5" />
                <path d="M8 5h.01M8 7.5v3.5" strokeLinecap="round" />
              </svg>
              <p className="text-xs text-[#b54708]">
                {promptsRemaining} free prompt{promptsRemaining === 1 ? "" : "s"} remaining.{" "}
                <button onClick={onPurchase} className="underline font-medium hover:text-[#93370d] transition-colors">Upgrade anytime for unlimited access.</button>
              </p>
            </div>
          )}

          {/* Credits exhausted alert (subscriber-credit-0) */}
          {isCreditExhausted && (
            <div className="flex items-center justify-between gap-3 bg-[#fef6ee] border border-[#f9dbaf] rounded-lg px-4 py-3.5 mb-2">
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <svg viewBox="0 0 16 16" fill="none" className="size-4 shrink-0 text-[#dc6803]" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="8" cy="8" r="6.5" />
                    <path d="M8 5h.01M8 7.5v3.5" strokeLinecap="round" />
                  </svg>
                  <p className="text-sm font-semibold text-[#b54708]">No credits remaining.</p>
                </div>
                <p className="text-sm text-[#b54708] ml-6">Your credits will renew on your next billing cycle, or you can top up now.</p>
              </div>
              <button onClick={onPurchase} className="px-4 py-2 text-sm font-semibold text-[#344054] bg-white border border-[#d0d5dd] rounded-lg hover:bg-[#f9fafb] transition-colors whitespace-nowrap shrink-0">Buy credits</button>
            </div>
          )}

          {/* Composer — stays visible; send locks once the free prompt is spent */}
          <div className="rounded-xl p-px bg-gradient-to-r from-[#c084fc] via-[#60a5fa] to-[#22d3ee]">
            <div className="bg-white rounded-[11px] flex items-center px-4 py-2.5 gap-3">
              <input
                value={followUpInput}
                onChange={e => setFollowUpInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask me to refine, expand or narrow your lead list…"
                className="flex-1 text-sm text-[#1d2939] bg-transparent border-none outline-none placeholder:text-[#9ca3af]"
              />
              <div className="flex items-center gap-1.5 shrink-0">
                <button className="size-8 flex items-center justify-center rounded-lg border border-[#e4e7ec] bg-white hover:bg-[#f9fafb] transition-colors" tabIndex={-1}><MicIcon /></button>
                <button
                  onClick={() => followUpInput.trim() && interceptSubmit(followUpInput.trim())}
                  disabled={sendDisabled}
                  title={sendLocked ? "Upgrade to send more prompts" : undefined}
                  className="size-8 flex items-center justify-center rounded-lg border border-[#e4e7ec] bg-white hover:bg-[#f0f9ff] transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white"
                >
                  <SendIcon active={!!followUpInput.trim() && !sendLocked} />
                </button>
              </div>
            </div>
          </div>

          <p className="text-center text-xs text-[#98a2b3] mt-2">
            SalesGenie AI may make mistakes. Review criteria before opening your list.
          </p>
        </div>
      </div>

    </div>
  );
}
