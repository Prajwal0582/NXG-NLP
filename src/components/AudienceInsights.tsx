import { useState } from "react";

const CITY_DATA = [
  { city: "Houston", count: 2890, pct: 26 },
  { city: "Dallas", count: 2430, pct: 22 },
  { city: "Austin", count: 1987, pct: 18 },
  { city: "San Antonio", count: 1324, pct: 12 },
  { city: "Fort Worth", count: 1100, pct: 10 },
  { city: "Other TX", count: 1298, pct: 12 },
];

const BTYPE_DATA = [
  { label: "Independent", pct: 45, color: "#016dee" },
  { label: "Franchise", pct: 25, color: "#2dfbf9" },
  { label: "Coffee shops", pct: 15, color: "#f599ed" },
  { label: "Pizza", pct: 10, color: "#6366f1" },
  { label: "Other", pct: 5, color: "#d0d5dd" },
];

const EMP_DATA = [
  { range: "20–49", pct: 35 },
  { range: "50–99", pct: 30 },
  { range: "100–249", pct: 20 },
  { range: "250–499", pct: 10 },
  { range: "500+", pct: 5 },
];

const CONTACT_DATA = [
  { label: "Verified contacts", pct: 68, color: "#016dee" },
  { label: "Phone available", pct: 82, color: "#2dfbf9" },
  { label: "Email available", pct: 54, color: "#f599ed" },
  { label: "Limited data", pct: 18, color: "#d0d5dd" },
];

type Tab = "geo" | "btype" | "emp" | "contact";

function DonutChart() {
  const [hovered, setHovered] = useState<number | null>(null);
  const cx = 60, cy = 60, r = 44, inner = 28;
  let angle = -Math.PI / 2;

  function polarToXY(a: number, radius: number) {
    return { x: cx + radius * Math.cos(a), y: cy + radius * Math.sin(a) };
  }

  const segments = BTYPE_DATA.map((d) => {
    const sweep = (d.pct / 100) * 2 * Math.PI;
    const start = angle;
    const end = start + sweep;
    angle = end;
    const outerStart = polarToXY(start, r);
    const outerEnd = polarToXY(end, r);
    const innerStart = polarToXY(start, inner);
    const innerEnd = polarToXY(end, inner);
    const large = sweep > Math.PI ? 1 : 0;
    const path = [
      `M ${outerStart.x} ${outerStart.y}`,
      `A ${r} ${r} 0 ${large} 1 ${outerEnd.x} ${outerEnd.y}`,
      `L ${innerEnd.x} ${innerEnd.y}`,
      `A ${inner} ${inner} 0 ${large} 0 ${innerStart.x} ${innerStart.y}`,
      "Z",
    ].join(" ");
    return { ...d, path, midAngle: (start + end) / 2 };
  });

  return (
    <div className="flex items-center gap-6">
      <svg viewBox="0 0 120 120" className="size-28 shrink-0">
        {segments.map((seg, i) => (
          <path
            key={i}
            d={seg.path}
            fill={seg.color}
            opacity={hovered === null || hovered === i ? 1 : 0.5}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className="cursor-pointer transition-opacity"
          />
        ))}
        {hovered !== null && (
          <text x={cx} y={cy - 4} textAnchor="middle" fontSize="10" fill="#1d2939" fontWeight="600">
            {BTYPE_DATA[hovered].pct}%
          </text>
        )}
        {hovered !== null && (
          <text x={cx} y={cy + 8} textAnchor="middle" fontSize="7" fill="#475467">
            {BTYPE_DATA[hovered].label}
          </text>
        )}
      </svg>
      <div className="flex flex-col gap-1.5">
        {BTYPE_DATA.map((d, i) => (
          <div
            key={i}
            className="flex items-center gap-2 cursor-pointer"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="size-2.5 rounded-full shrink-0" style={{ background: d.color }} />
            <span className="text-xs text-[#344054]">{d.label}</span>
            <span className="text-xs text-[#98a2b3] ml-auto pl-3">{d.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function GeoChart() {
  const [hovered, setHovered] = useState<number | null>(null);
  const max = Math.max(...CITY_DATA.map((d) => d.pct));

  return (
    <div className="flex flex-col gap-2 w-full">
      {CITY_DATA.map((d, i) => (
        <div
          key={i}
          className="relative group"
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
        >
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-xs text-[#475467] w-24 shrink-0">{d.city}</span>
            <div className="flex-1 h-5 bg-[#f2f4f7] rounded overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#016dee] to-[#2dfbf9] rounded transition-all"
                style={{ width: `${(d.pct / max) * 100}%` }}
              />
            </div>
            <span className="text-xs font-medium text-[#344054] w-8 text-right">{d.pct}%</span>
          </div>
          {hovered === i && (
            <div className="absolute left-24 -top-8 bg-[#1d2939] text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
              {d.city} — {d.count.toLocaleString()} qualified leads | {d.pct}% of matches
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function EmpChart({ onSegmentClick }: { onSegmentClick: (range: string) => void }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const max = Math.max(...EMP_DATA.map((d) => d.pct));

  function handleClick(i: number) {
    setSelected(selected === i ? null : i);
    onSegmentClick(EMP_DATA[i].range);
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      {EMP_DATA.map((d, i) => (
        <div
          key={i}
          className="flex items-center gap-2 cursor-pointer"
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
          onClick={() => handleClick(i)}
        >
          <span className="text-xs text-[#475467] w-16 shrink-0">{d.range}</span>
          <div className="flex-1 h-6 bg-[#f2f4f7] rounded overflow-hidden relative">
            <div
              className="h-full rounded transition-all"
              style={{
                width: `${(d.pct / max) * 100}%`,
                background: selected === i
                  ? "#016dee"
                  : hovered === i
                  ? "#4d9ff4"
                  : "#bae6fd",
              }}
            />
            {hovered === i && (
              <div className="absolute left-2 top-0.5 text-xs font-medium text-[#1d2939]">
                {d.pct}% of results
              </div>
            )}
          </div>
          <span className="text-xs font-medium text-[#344054] w-8 text-right">{d.pct}%</span>
          {selected === i && (
            <span className="text-xs text-[#016dee] shrink-0">✓ filtered</span>
          )}
        </div>
      ))}
      <p className="text-xs text-[#98a2b3] mt-1">Click a segment to filter the lead list</p>
    </div>
  );
}

function ContactChart() {
  return (
    <div className="flex flex-col gap-3 w-full">
      {CONTACT_DATA.map((d, i) => (
        <div key={i}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-[#475467]">{d.label}</span>
            <span className="text-xs font-medium text-[#344054]">{d.pct}%</span>
          </div>
          <div className="h-2 bg-[#f2f4f7] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${d.pct}%`, background: d.color }}
            />
          </div>
        </div>
      ))}
      <p className="text-xs text-[#98a2b3] mt-1">Based on verified data from US Business database</p>
    </div>
  );
}

interface AudienceInsightsProps {
  onEmpFilter?: (range: string) => void;
}

export default function AudienceInsights({ onEmpFilter }: AudienceInsightsProps) {
  const [tab, setTab] = useState<Tab>("geo");

  const tabs: { id: Tab; label: string }[] = [
    { id: "geo", label: "Geographic" },
    { id: "btype", label: "Business type" },
    { id: "emp", label: "Employee size" },
    { id: "contact", label: "Contact readiness" },
  ];

  return (
    <div className="bg-white border border-[#eaecf0] rounded-xl p-5">
      <h3 className="text-sm font-semibold text-[#1d2939] mb-4">Audience Insights</h3>
      <div className="flex gap-1 mb-5 p-1 bg-[#f2f4f7] rounded-lg">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 text-xs font-medium py-1.5 px-2 rounded transition-colors ${
              tab === t.id
                ? "bg-white text-[#1d2939] shadow-sm"
                : "text-[#475467] hover:text-[#1d2939]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="min-h-[160px] flex items-start">
        {tab === "geo" && <GeoChart />}
        {tab === "btype" && <DonutChart />}
        {tab === "emp" && <EmpChart onSegmentClick={onEmpFilter || (() => {})} />}
        {tab === "contact" && <ContactChart />}
      </div>
    </div>
  );
}
