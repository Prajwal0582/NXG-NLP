interface HistoryItem {
  title: string;
  meta: string;
  records: string;
  days: string;
  prompt: string;
}

interface HistoryGroup {
  label: string;
  count: number;
  items: HistoryItem[];
}

const HISTORY_GROUPS: HistoryGroup[] = [
  {
    label: "Today",
    count: 3,
    items: [
      {
        title: "Dallas leads",
        meta: "created on Apr 18, 2023 at 10:00AM by Frank S",
        records: "12k",
        days: "7 days",
        prompt: "Find businesses in Dallas with more than 20 employees",
      },
      {
        title: "New York trails",
        meta: "created on Apr 19, 2023 at 11:30AM by Sarah J",
        records: "10k",
        days: "5 days",
        prompt: "Show New York businesses with verified contacts",
      },
      {
        title: "Los Angeles holds steady",
        meta: "created on Apr 20, 2023 at 1:15PM by Alex R",
        records: "8k",
        days: "3 days",
        prompt: "Find restaurants in Los Angeles with more than 50 employees",
      },
    ],
  },
  {
    label: "Yesterday",
    count: 1,
    items: [
      {
        title: "Dallas leads",
        meta: "created on Apr 18, 2023 at 10:00AM by Frank S",
        records: "12k",
        days: "7 days",
        prompt: "Find businesses in Dallas with more than 20 employees",
      },
    ],
  },
];

function HourglassIcon() {
  return (
    <svg viewBox="0 0 14 16" fill="none" className="size-3.5 shrink-0" stroke="#ea580c" strokeWidth="1.4">
      <path d="M2 1h10M2 15h10" strokeLinecap="round" />
      <path d="M3 1v3l4 4-4 4v3M11 1v3L7 8l4 4v3" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-4 shrink-0 text-[#475467]" stroke="currentColor" strokeWidth="1.5">
      <circle cx="8" cy="8" r="6.5" />
      <path d="M8 7.5v4" strokeLinecap="round" />
      <circle cx="8" cy="5" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

interface HistoryDrawerProps {
  isFreemium: boolean;
  onClose: () => void;
  onSelectHistory?: (prompt: string) => void;
}

export default function HistoryDrawer({ isFreemium, onClose, onSelectHistory }: HistoryDrawerProps) {
  return (
    <div className="fixed inset-0 z-50 flex">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      <div className="flex-1 relative" />

      <div
        className="relative bg-[#f2f4f7] w-[38%] min-w-[420px] max-w-[560px] h-full flex flex-col shadow-2xl animate-slide-in-right"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 shrink-0 bg-white border-b border-[#eaecf0]">
          <h2 className="text-xl font-semibold text-[#1d2939]">Search history</h2>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-sm font-medium text-[#344054] border border-[#d0d5dd] rounded-lg bg-white hover:bg-[#f9fafb] transition-colors"
          >
            Close
          </button>
        </div>

        {/* History cards grouped by date */}
        <div className="flex-1 overflow-y-auto px-6 pt-5 pb-6 flex flex-col gap-5">
          {HISTORY_GROUPS.map((group) => (
            <div key={group.label}>
              {/* Date label + count */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm font-medium text-[#667085]">{group.label}</span>
                <span className="flex items-center justify-center size-5 rounded bg-[#eaecf0] text-[11px] font-semibold text-[#475467]">
                  {group.count}
                </span>
              </div>

              {/* Divider */}
              <div className="h-px bg-[#eaecf0] mb-3" />

              {/* Cards */}
              <div className="flex flex-col gap-3">
                {group.items.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      onClose();
                      onSelectHistory?.(item.prompt);
                    }}
                    className="w-full text-left bg-white border border-[#eaecf0] rounded-xl px-5 py-4 hover:border-[#93c5fd] hover:shadow-sm transition-all shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-[#1d2939] mb-0.5 leading-snug">{item.title}</p>
                        <p className="text-xs text-[#667085]">{item.meta}</p>
                      </div>

                      <div className="flex flex-col items-end gap-1.5 shrink-0">
                        <span className="text-xs font-semibold text-[#344054] bg-[#f2f4f7] rounded px-2 py-0.5">
                          Records {item.records}
                        </span>
                        {isFreemium && (
                          <span className="flex items-center gap-1 text-xs font-semibold text-[#ea580c]">
                            <HourglassIcon />
                            {item.days}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom info banner */}
        <div className="shrink-0 px-6 pb-6">
          <div className="flex items-start gap-2.5 bg-white border border-[#eaecf0] rounded-xl px-4 py-3">
            <InfoIcon />
            <div className="text-sm text-[#475467] leading-relaxed">
              {isFreemium
                ? "Freemium chat history is available for 7 days."
                : "Your chat history is available for 12 months."}
              {isFreemium && (
                <>
                  {" "}
                  <button className="underline text-[#475467] hover:text-[#1d2939] font-medium">
                    Upgrade for 12 months of history.
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
