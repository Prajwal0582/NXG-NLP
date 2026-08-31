import { useState } from "react";

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
}

const FREEMIUM_LEADS: Lead[] = [
  {
    name: "P*******",
    location: "Santa Clara, CA",
    phone: "(310) ***-****",
    industry: "Physicians 8011-01",
    revenue: "Less than $500,000",
    employees: "51-100",
    contact: "P*******",
    title: "CEO",
    email: "***** *****",
  },
  {
    name: "X********",
    location: "Corona, CA",
    phone: "(510) ***-****",
    industry: "Physicians 8011-01",
    revenue: "Less than $500,000",
    employees: "51-100",
    contact: "X** C****",
    title: "CEO",
    email: "get email address",
  },
  {
    name: "Q******",
    location: "Corona, CA",
    phone: "(310) ***-****",
    industry: "Physicians 8011-01",
    revenue: "Less than $500,000",
    employees: "51-100",
    contact: "Q**** P*",
    title: "CEO",
    email: "get email address",
  },
  {
    name: "A**** ****",
    location: "Santa Clara, CA",
    phone: "(510) ***-****",
    industry: "Physicians 8011-01",
    revenue: "Less than $500,000",
    employees: "51-100",
    contact: "A**** S****",
    title: "CEO",
    email: "get email address",
  },
];

const SUBSCRIPTION_LEADS: Lead[] = [
  {
    name: "Pathways Health",
    location: "Santa Clara, CA",
    phone: "(310) 555-0182",
    industry: "Physicians 8011-01",
    revenue: "Less than $500,000",
    employees: "51-100",
    contact: "Patricia Wong",
    title: "CEO",
    email: "patricia@pathwayshealth.com",
    verified: true,
  },
  {
    name: "Xcell Medical",
    location: "Corona, CA",
    phone: "(510) 555-0234",
    industry: "Physicians 8011-01",
    revenue: "Less than $500,000",
    employees: "51-100",
    contact: "Xia Clark",
    title: "CEO",
    email: "xia.clark@xcellmedical.com",
    verified: true,
  },
  {
    name: "Quantum PT",
    location: "Corona, CA",
    phone: "(310) 555-0311",
    industry: "Physicians 8011-01",
    revenue: "Less than $500,000",
    employees: "51-100",
    contact: "Quinn Pi",
    title: "CEO",
    email: "q.pi@quantumpt.com",
    verified: false,
  },
  {
    name: "Alpha Care",
    location: "Santa Clara, CA",
    phone: "(510) 555-0418",
    industry: "Physicians 8011-01",
    revenue: "Less than $500,000",
    employees: "51-100",
    contact: "Alice Smith",
    title: "CEO",
    email: "a.smith@alphacare.com",
    verified: true,
  },
];

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

export default function LeadTable({ isFreemium, onPurchase, onSave, empFilter, hideDuplicateHeader, totalLeads = 71, totalPages = 4 }: LeadTableProps) {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const leads = isFreemium ? FREEMIUM_LEADS : SUBSCRIPTION_LEADS;
  const filtered = empFilter ? leads.filter((_, i) => i % 2 === 0) : leads;
  const rows = filtered.slice(0, 4);

  return (
    <div>
      {!hideDuplicateHeader && (
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-semibold text-[#1d2939]">Top Qualified Leads</h3>
            <p className="text-xs text-[#475467] mt-0.5">
              Ranked by revenue and employee count with verified contact information.
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
        {/* Header */}
        <div className="grid grid-cols-3 bg-[#f9fafb] border-b border-[#eaecf0]">
          {["Business Information", "Business Details", "Contacts"].map((h) => (
            <div key={h} className="flex items-center gap-1.5 px-4 py-2.5">
              <span className="text-xs font-medium text-[#475467]">{h}</span>
              <SortIcon />
            </div>
          ))}
        </div>

        {/* Rows */}
        {rows.map((lead, i) => (
          <div key={i}>
            <div
              className="grid grid-cols-3 border-b border-[#eaecf0] last:border-b-0 hover:bg-[#f9fafb] cursor-pointer transition-colors"
              onClick={() => setExpandedRow(expandedRow === i ? null : i)}
            >
              {/* Business Info */}
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

              {/* Business Details */}
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

              {/* Contacts */}
              <div className="px-4 py-3.5">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-[#1d2939]">{lead.contact}</span>
                  <div className="flex items-center gap-1.5">
                    {lead.verified && <VerifiedBadge />}
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
                      <p>Founded: 2014</p>
                      <p>Business type: Independent</p>
                      <p>Ownership: Privately held</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-[#475467] mb-2">Location</p>
                    <div className="space-y-1 text-xs text-[#344054]">
                      <p>4120 State St</p>
                      <p>{lead.location}</p>
                      <p>USA</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-[#475467] mb-2">Contact quality</p>
                    <VerifiedBadge />
                    <p className="text-xs text-[#475467] mt-1.5">Contact verified within 90 days</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Pagination */}
        <div className="flex items-center justify-center gap-1.5 px-4 py-3 border-t border-[#eaecf0] bg-white">
          <button className="size-6 flex items-center justify-center border border-[#eaecf0] rounded bg-white hover:bg-[#f9fafb] text-[#d0d5dd] cursor-not-allowed">
            <svg viewBox="0 0 16 16" fill="none" className="size-3" stroke="currentColor" strokeWidth="1.5">
              <path d="M11 4L7 8l4 4M7 4L3 8l4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button className="size-6 flex items-center justify-center border border-[#eaecf0] rounded bg-white hover:bg-[#f9fafb] text-[#d0d5dd] cursor-not-allowed">
            <svg viewBox="0 0 16 16" fill="none" className="size-3" stroke="currentColor" strokeWidth="1.5">
              <path d="M10 4L6 8l4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <span className="px-3 py-1 text-xs font-semibold text-[#016dee] bg-[#eff8ff] border border-[#b2ddff] rounded">1</span>
          <span className="text-xs text-[#475467]">of {totalPages} pages</span>
          <button className="size-6 flex items-center justify-center border border-[#eaecf0] rounded bg-white hover:bg-[#f9fafb] text-[#344054]">
            <svg viewBox="0 0 16 16" fill="none" className="size-3" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button className="size-6 flex items-center justify-center border border-[#eaecf0] rounded bg-white hover:bg-[#f9fafb] text-[#344054]">
            <svg viewBox="0 0 16 16" fill="none" className="size-3" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 4l4 4-4 4M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
