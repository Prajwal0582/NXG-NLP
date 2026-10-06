interface HistoryItem {
  title: string;
  date: string;
  time: string;
  creator: string;
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
        date: "Apr 18, 2023",
        time: "10:00 AM",
        creator: "Frank S",
        prompt: "Find businesses in Dallas with more than 20 employees",
      },
      {
        title: "New York trails",
        date: "Apr 19, 2023",
        time: "11:30 AM",
        creator: "Sarah J",
        prompt: "Show New York businesses with verified contacts",
      },
      {
        title: "Los Angeles holds steady",
        date: "Apr 20, 2023",
        time: "1:15 PM",
        creator: "Alex R",
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
        date: "Apr 18, 2023",
        time: "10:00 AM",
        creator: "Frank S",
        prompt: "Find businesses in Dallas with more than 20 employees",
      },
    ],
  },
];

/** Genie Inline Alert Color=Blue uses Font Awesome “sparkles” at 14px / Blue 700. */
function AlertSparklesIcon() {
  return (
    <svg viewBox="0 0 14 14" fill="currentColor" className="size-3.5 shrink-0 text-g-blue-700 mt-0.5">
      <path d="M5.25 1.2c0 0 .9 2.6 2.1 3.45C8.55 5.5 9 5.7 9 5.7s-.45.2-1.65 1.05C6.15 8.6 5.25 11.2 5.25 11.2s-.9-2.6-2.1-3.45C1.95 6.9 1.5 6.7 1.5 6.7s.45-.2 1.65-1.05C4.35 4.8 5.25 1.2 5.25 1.2Z" />
      <path d="M10.5 7.2c0 0 .5 1.45 1.15 1.95.65.5.95.65.95.65s-.3.15-.95.65c-.65.5-1.15 1.95-1.15 1.95s-.5-1.45-1.15-1.95c-.65-.5-.95-.65-.95-.65s.3-.15.95-.65c.65-.5 1.15-1.95 1.15-1.95Z" />
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
        className="relative bg-g-gray-100 w-[38%] min-w-[420px] max-w-[560px] h-full flex flex-col shadow-2xl animate-slide-in-right"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-5 shrink-0 bg-g-white border-b border-g-gray-200">
          <h2 className="text-xl font-semibold text-g-gray-800">Search history</h2>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-sm font-medium text-g-gray-700 border border-g-gray-300 rounded-lg bg-g-white hover:bg-g-gray-50 transition-colors"
          >
            Close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pt-5 pb-6 flex flex-col gap-5">
          {HISTORY_GROUPS.map((group) => (
            <div key={group.label}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm font-medium text-g-gray-500">{group.label}</span>
                <span className="flex items-center justify-center size-5 rounded bg-g-gray-200 text-[11px] font-semibold text-g-gray-600">
                  {group.count}
                </span>
              </div>

              <div className="h-px bg-g-gray-200 mb-3" />

              <div className="flex flex-col gap-2">
                {group.items.map((item) => (
                  <button
                    key={`${group.label}-${item.title}-${item.time}`}
                    onClick={() => {
                      onClose();
                      onSelectHistory?.(item.prompt);
                    }}
                    className="w-full text-left bg-g-white border border-g-gray-200 rounded-lg px-4 py-3 hover:border-g-blue-200 hover:bg-g-blue-50/40 transition-colors"
                  >
                    <p className="text-[14px] font-semibold leading-5 text-g-gray-800">
                      {item.title}
                    </p>
                    <p className="mt-0.5 text-[12px] font-normal leading-[18px] text-g-gray-600">
                      {item.date} · {item.time} · {item.creator}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Genie Inline Alert — Color=Blue, Close Icon=No */}
        <div className="shrink-0 px-6 pb-6">
          <div className="flex items-start gap-2 rounded-lg border border-g-blue-200 bg-g-blue-50 px-4 py-4">
            <AlertSparklesIcon />
            <p className="text-[12px] font-medium leading-[18px] text-g-blue-700">
              {isFreemium
                ? "Freemium chat history is available for 7 days."
                : "Your chat history is available for 12 months."}
              {isFreemium && (
                <>
                  {" "}
                  <button className="underline font-medium text-g-blue-600 hover:text-g-blue-700">
                    Upgrade for 12 months of history.
                  </button>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
