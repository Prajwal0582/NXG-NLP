import { useState } from "react";
import type { ScenarioLead } from "../data/searchScenarios";

interface Lead {
  name: string;
  location: string;
  phone: string;
  industry: string;
  revenue: string;
  employees: string;
  contact: string;
  title: string;
  email: string;
  verified?: boolean;
}

interface LeadTableProps {
  isFreemium: boolean;
  onPurchase: () => void;
  onSave: () => void;
  empFilter?: string | null;
  hideDuplicateHeader?: boolean;
  totalLeads?: number;
  totalPages?: number;
  /** Scenario-driven display leads (paginated subset). */
  scenarioLeads?: ScenarioLead[];
  pageSize?: number;
}

function toDisplayLead(s: ScenarioLead, isFreemium: boolean): Lead {
  if (isFreemium) {
    return {
      name: s.nameMasked,
      location: s.location,
      phone: s.phoneMasked,
      industry: s.industry,
      revenue: s.revenue,
      employees: s.employees,
      contact: s.contactMasked,
      title: s.title,
      email: s.emailMasked === "***** *****" ? "get email address" : s.emailMasked,
      verified: false,
    };
  }
  return {
    name: s.name,
    location: s.location,
    phone: s.phone,
    industry: s.industry,
    revenue: s.revenue,
    employees: s.employees,
    contact: s.contact,
    title: s.title,
    email: s.email,
    verified: s.verified,
  };
}

function LockIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-3.5 text-[#667085] shrink-0" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="7" width="10" height="7" rx="1" />
      <path d="M5 7V5a3 3 0 016 0v2" />
    </svg>
  );
}

function VerifiedBadge() {
  return (
    <span className="inline-flex items-center gap-1 bg-[#f6fef9] border border-[#abefc6] rounded px-1.5 py-0.5 text-[10px] font-medium text-[#067647]">
      <svg viewBox="0 0 10 10" fill="none" className="size-2.5" stroke="#067647" strokeWidth="1.5">
        <path d="M8 3L4.5 7.5L2 5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Verified
    </span>
  );
}

function SortIcon() {
  return (
    <svg viewBox="0 0 10 10" fill="none" className="size-3 text-[#98a2b3]" stroke="currentColor" strokeWidth="1.5">
      <path d="M5 1v8M2 4l3-3 3 3M2 6l3 3 3-3" strokeLinecap="round" />
    </svg>
  );
}

export default function LeadTable({
  isFreemium,
  onPurchase,
  onSave,
  empFilter,
  hideDuplicateHeader,
  totalLeads = 0,
  totalPages = 1,
  scenarioLeads,
  pageSize = 10,
}: LeadTableProps) {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [page, setPage] = useState(1);

  const source = scenarioLeads ?? [];
  const displayAll = source.map((s) => toDisplayLead(s, isFreemium));
  const filtered = empFilter ? displayAll.filter((_, i) => i % 2 === 0) : displayAll;

  const pagesFromData = Math.max(1, Math.ceil(filtered.length / pageSize));
  // Believable page count from totalMatches; clamp navigation to available mock rows.
  const pages = Math.max(totalPages, pagesFromData);
  const safePage = Math.min(page, pagesFromData);
  const start = (safePage - 1) * pageSize;
  const rows = filtered.slice(start, start + pageSize);

  function go(next: number) {
    setExpandedRow(null);
    setPage(Math.max(1, Math.min(next, pagesFromData)));
  }

  return (
    <div>
      {!hideDuplicateHeader && (
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-semibold text-[#1d2939]">Top Qualified Leads</h3>
            <p className="text-xs text-[#475467] mt-0.5">
              Ranked by revenue and employee count with verified contact information.
              {totalLeads > 0 && (
                <span className="text-[#667085]"> Showing {rows.length} of {totalLeads.toLocaleString()} matches.</span>
              )}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={onSave} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#344054] border border-[#d0d5dd] rounded-lg bg-white hover:bg-[#f2f4f7] transition-colors">
              Save list
            </button>
            <button onClick={onPurchase} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-[#016dee] rounded-lg hover:bg-[#0156c4] transition-colors">
              {isFreemium ? "Unlock details" : "Export list"}
            </button>
          </div>
        </div>
      )}

      <div className="border border-[#eaecf0] rounded-xl overflow-hidden">
        <div className="grid grid-cols-3 bg-[#f9fafb] border-b border-[#eaecf0]">
          {["Business Information", "Business Details", "Contacts"].map((h) => (
            <div key={h} className="flex items-center gap-1.5 px-4 py-2.5">
              <span className="text-xs font-medium text-[#475467]">{h}</span>
              <SortIcon />
            </div>
          ))}
        </div>

        {rows.map((lead, i) => (
          <div key={`${lead.name}-${start + i}`}>
            <div
              className="grid grid-cols-3 border-b border-[#eaecf0] last:border-b-0 hover:bg-[#f9fafb] cursor-pointer transition-colors"
              onClick={() => setExpandedRow(expandedRow === i ? null : i)}
            >
              <div className="px-4 py-3.5">
                <div className="flex items-center gap-1.5 mb-1.5">
                  {isFreemium && <LockIcon />}
                  <span className="text-sm font-medium text-[#1d2939]">{lead.name}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#475467] mb-1">
                  <svg viewBox="0 0 12 12" fill="none" className="size-3 text-[#98a2b3] shrink-0" stroke="currentColor" strokeWidth="1.2">
                    <path d="M6 1C4.067 1 2.5 2.567 2.5 4.5c0 3 3.5 6.5 3.5 6.5S9.5 7.5 9.5 4.5C9.5 2.567 7.933 1 6 1z" />
                    <circle cx="6" cy="4.5" r="1.2" />
                  </svg>
                  {lead.location}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#475467]">
                  <svg viewBox="0 0 12 12" fill="none" className="size-3 text-[#98a2b3] shrink-0" stroke="currentColor" strokeWidth="1.2">
                    <path d="M2 2h2v2H2zM2 5h2v2H2zM2 8h2v2H2zM5 2h5M5 5h5M5 8h5" strokeLinecap="round" />
                  </svg>
                  {lead.phone}
                </div>
              </div>

              <div className="px-4 py-3.5 border-x border-[#eaecf0]">
                <div className="text-xs text-[#475467] space-y-1.5">
                  <div className="flex items-start gap-1.5">
                    <svg viewBox="0 0 12 12" fill="none" className="size-3 text-[#98a2b3] mt-0.5 shrink-0" stroke="currentColor" strokeWidth="1.2">
                      <rect x="1" y="2" width="10" height="8" rx="1" />
                      <path d="M4 5h4M4 7h2" strokeLinecap="round" />
                    </svg>
                    {lead.industry}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <svg viewBox="0 0 12 12" fill="none" className="size-3 text-[#98a2b3] shrink-0" stroke="currentColor" strokeWidth="1.2">
                      <path d="M1 9h10M6 4v5M3 6v3M9 7v2" strokeLinecap="round" />
                    </svg>
                    {lead.revenue}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <svg viewBox="0 0 12 12" fill="none" className="size-3 text-[#98a2b3] shrink-0" stroke="currentColor" strokeWidth="1.2">
                      <circle cx="4" cy="4" r="2" />
                      <circle cx="8" cy="4" r="2" />
                      <path d="M1 10c0-2 6-2 6 0M7 10c0-2 5-2 5 0" strokeLinecap="round" />
                    </svg>
                    {lead.employees}
                  </div>
                </div>
              </div>

              <div className="px-4 py-3.5">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-[#1d2939]">{lead.contact}</span>
                  <div className="flex items-center gap-1.5">
                    {lead.verified && !isFreemium && <VerifiedBadge />}
                    <svg viewBox="0 0 12 12" fill="none" className={`size-3 text-[#98a2b3] transition-transform ${expandedRow === i ? "rotate-180" : ""}`} stroke="currentColor" strokeWidth="1.5">
                      <path d="M2 4l4 4 4-4" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
                <div className="text-xs text-[#475467] space-y-1">
                  <div className="flex items-center gap-1.5">
                    <svg viewBox="0 0 12 12" fill="none" className="size-3 text-[#98a2b3] shrink-0" stroke="currentColor" strokeWidth="1.2">
                      <circle cx="6" cy="4" r="2.5" />
                      <path d="M1 11c0-2.5 10-2.5 10 0" strokeLinecap="round" />
                    </svg>
                    {lead.title}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <svg viewBox="0 0 12 12" fill="none" className="size-3 text-[#98a2b3] shrink-0" stroke="currentColor" strokeWidth="1.2">
                      <path d="M2 3h8v7H2z" />
                      <path d="M2 3l4 4 4-4" />
                    </svg>
                    {isFreemium ? (
                      <span className={lead.email === "get email address" ? "text-[#016dee]" : "text-[#98a2b3]"}>
                        {lead.email}
                      </span>
                    ) : (
                      <span>{lead.email}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {expandedRow === i && !isFreemium && (
              <div className="px-6 py-4 bg-[#f9fafb] border-b border-[#eaecf0] animate-fade-in">
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <p className="text-xs font-medium text-[#475467] mb-2">Company details</p>
                    <div className="space-y-1 text-xs text-[#344054]">
                      <p>Industry: {lead.industry}</p>
                      <p>Employees: {lead.employees}</p>
                      <p>Revenue: {lead.revenue}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-[#475467] mb-2">Location</p>
                    <div className="space-y-1 text-xs text-[#344054]">
                      <p>{lead.location}</p>
                      <p>USA</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-[#475467] mb-2">Contact quality</p>
                    {lead.verified && <VerifiedBadge />}
                    <p className="text-xs text-[#475467] mt-1.5">Contact verified within 90 days</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        <div className="flex items-center justify-center gap-1.5 px-4 py-3 border-t border-[#eaecf0] bg-white">
          <button
            type="button"
            onClick={() => go(1)}
            disabled={safePage <= 1}
            className="size-6 flex items-center justify-center border border-[#eaecf0] rounded bg-white hover:bg-[#f9fafb] text-[#344054] disabled:text-[#d0d5dd] disabled:cursor-not-allowed"
          >
            <svg viewBox="0 0 16 16" fill="none" className="size-3" stroke="currentColor" strokeWidth="1.5">
              <path d="M11 4L7 8l4 4M7 4L3 8l4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => go(safePage - 1)}
            disabled={safePage <= 1}
            className="size-6 flex items-center justify-center border border-[#eaecf0] rounded bg-white hover:bg-[#f9fafb] text-[#344054] disabled:text-[#d0d5dd] disabled:cursor-not-allowed"
          >
            <svg viewBox="0 0 16 16" fill="none" className="size-3" stroke="currentColor" strokeWidth="1.5">
              <path d="M10 4L6 8l4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <span className="px-3 py-1 text-xs font-semibold text-[#016dee] bg-[#eff8ff] border border-[#b2ddff] rounded">{safePage}</span>
          <span className="text-xs text-[#475467]">of {pages} pages</span>
          <button
            type="button"
            onClick={() => go(safePage + 1)}
            disabled={safePage >= pagesFromData}
            className="size-6 flex items-center justify-center border border-[#eaecf0] rounded bg-white hover:bg-[#f9fafb] text-[#344054] disabled:text-[#d0d5dd] disabled:cursor-not-allowed"
          >
            <svg viewBox="0 0 16 16" fill="none" className="size-3" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => go(pagesFromData)}
            disabled={safePage >= pagesFromData}
            className="size-6 flex items-center justify-center border border-[#eaecf0] rounded bg-white hover:bg-[#f9fafb] text-[#344054] disabled:text-[#d0d5dd] disabled:cursor-not-allowed"
          >
            <svg viewBox="0 0 16 16" fill="none" className="size-3" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 4l4 4-4 4M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
