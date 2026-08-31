import { useEffect, useState } from "react";

interface ProcessingViewProps {
  prompt: string;
  onComplete: () => void;
  onHistory: () => void;
  promptsRemaining: number;
  freePromptsTotal: number;
}

const STEPS = [
  {
    label: "Reviewing available data",
    desc: "Scanning 7M+ healthcare business records across California",
    duration: 1200,
  },
  {
    label: "Identifying qualified matches",
    desc: "Applying revenue, employee count, and location filters",
    duration: 1100,
  },
  {
    label: "Building insights",
    desc: "Ranking leads by match score and contact quality",
    duration: 900,
  },
];

function SparkleIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-4 shrink-0">
      <path
        d="M8 1.5C8 1.5 9.2 5.2 11.5 6.5C13.8 7.8 14.5 8 14.5 8C14.5 8 13.8 8.2 11.5 9.5C9.2 10.8 8 14.5 8 14.5C8 14.5 6.8 10.8 4.5 9.5C2.2 8.2 1.5 8 1.5 8C1.5 8 2.2 7.8 4.5 6.5C6.8 5.2 8 1.5 8 1.5Z"
        fill="url(#sparkle-proc)"
      />
      <defs>
        <linearGradient id="sparkle-proc" x1="1.5" y1="1.5" x2="14.5" y2="14.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8b5cf6" />
          <stop offset="0.5" stopColor="#3b82f6" />
          <stop offset="1" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
    </svg>
  );
}

type StepStatus = "waiting" | "active" | "done";

export default function ProcessingView({
  prompt,
  onComplete,
  onHistory,
}: ProcessingViewProps) {
  const [stepStatuses, setStepStatuses] = useState<StepStatus[]>(
    STEPS.map(() => "waiting")
  );

  useEffect(() => {
    let delay = 0;
    STEPS.forEach((step, i) => {
      setTimeout(() => {
        setStepStatuses((prev) => {
          const next = [...prev];
          next[i] = "active";
          return next;
        });
      }, delay);
      delay += step.duration;
      setTimeout(() => {
        setStepStatuses((prev) => {
          const next = [...prev];
          next[i] = "done";
          return next;
        });
      }, delay);
    });
    setTimeout(() => {
      onComplete();
    }, delay + 300);
  }, []);

  const activeIndex = stepStatuses.lastIndexOf("active");

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Full-width page header */}
      <div className="px-6 py-3 border-b border-[#eaecf0] shrink-0 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="text-[#475467] hover:text-[#1d2939] p-1 rounded hover:bg-[#f2f4f7] transition-colors">
              <svg viewBox="0 0 20 20" fill="none" className="size-5" stroke="currentColor" strokeWidth="2">
                <path d="M12 5L7 10l5 5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div>
              <h1 className="text-base font-semibold text-[#1d2939] leading-tight">Smart Search</h1>
              {prompt && (
                <p className="text-xs text-[#667085] mt-0.5 leading-tight">
                  {prompt.length > 60 ? prompt.slice(0, 60) + "…" : prompt}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={onHistory}
            className="flex items-center gap-2 px-3.5 py-1.5 text-sm font-medium text-[#344054] border border-[#d0d5dd] rounded-lg bg-white hover:bg-[#f9fafb] transition-colors"
          >
            <svg viewBox="0 0 16 16" fill="none" className="size-4 text-[#475467]" stroke="currentColor" strokeWidth="1.5">
              <circle cx="8" cy="8" r="6.5" />
              <path d="M8 5v3.5l2 2" strokeLinecap="round" />
            </svg>
            History
          </button>
        </div>
      </div>

      {/* Scrollable content — centered 1000 px */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1150px] mx-auto px-4 py-8 animate-fade-in">
          {/* SignalFuse label */}
          <div className="flex items-center gap-2 mb-5">
            <SparkleIcon />
            <span className="text-sm font-semibold text-[#1d2939]">SignalFuse</span>
          </div>

          {/* Vertical stepper */}
          <div className="flex flex-col">
            {STEPS.map((step, i) => {
              const status = stepStatuses[i];
              const isLast = i === STEPS.length - 1;
              return (
                <div key={i} className="flex gap-4">
                  {/* Dot + connector */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`size-2.5 rounded-full mt-1 shrink-0 transition-colors duration-400 ${
                        status === "done"
                          ? "bg-[#12b76a]"
                          : status === "active"
                          ? "bg-[#016dee] ring-3 ring-[#016dee]/20"
                          : "bg-[#d0d5dd]"
                      }`}
                    />
                    {!isLast && (
                      <div
                        className={`w-px flex-1 my-1 min-h-[32px] transition-colors duration-400 ${
                          status === "done" ? "bg-[#12b76a]" : "bg-[#e4e7ec]"
                        }`}
                      />
                    )}
                  </div>

                  {/* Step text */}
                  <div className={`pb-5 ${isLast ? "pb-0" : ""}`}>
                    <p
                      className={`text-sm font-medium leading-snug transition-colors duration-300 ${
                        status === "done"
                          ? "text-[#101828]"
                          : status === "active"
                          ? "text-[#016dee]"
                          : "text-[#98a2b3]"
                      }`}
                    >
                      {step.label}
                    </p>
                    <p
                      className={`text-[13px] leading-snug mt-0.5 transition-colors duration-300 ${
                        status === "waiting" ? "text-[#c0c7d0]" : "text-[#667085]"
                      }`}
                    >
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Executing Query row — shown while any step is active */}
          {activeIndex >= 0 && stepStatuses[STEPS.length - 1] !== "done" && (
            <div className="mt-5 ml-[22px] flex items-center gap-2 border border-[#e4e7ec] rounded-lg px-3 py-2 w-fit bg-[#f9fafb]">
              <svg viewBox="0 0 16 16" fill="none" className="size-4 text-[#667085]" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 5h8M4 8h8M4 11h5" strokeLinecap="round" />
              </svg>
              <span className="text-sm text-[#475467]">Executing Query</span>
              <span className="flex gap-0.5 ml-1">
                {[0, 1, 2].map((j) => (
                  <span
                    key={j}
                    className="size-1 rounded-full bg-[#667085] opacity-70 animate-bounce"
                    style={{ animationDelay: `${j * 150}ms`, animationDuration: "0.8s" }}
                  />
                ))}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Fixed footer */}
      <div className="shrink-0 border-t border-[#eaecf0] bg-white shadow-[0_-4px_16px_rgba(0,0,0,0.05)]">
        <div className="max-w-[1150px] mx-auto px-4 py-4">
          <div className="rounded-xl p-px bg-gradient-to-r from-[#c084fc] via-[#60a5fa] to-[#22d3ee] opacity-50">
            <div className="bg-white rounded-[11px] flex items-center px-4 py-2.5 gap-3">
              <input
                disabled
                placeholder="Ask me to refine, expand or narrow your lead list…"
                className="flex-1 text-sm text-[#98a2b3] bg-transparent border-none outline-none cursor-not-allowed placeholder:text-[#c0c7d0]"
              />
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
