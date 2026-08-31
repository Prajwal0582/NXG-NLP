import { useState } from "react";
import type { UserScenario } from "../types";

interface LandingViewProps {
  scenario: UserScenario;
  promptsRemaining: number;
  freePromptsTotal: number;
  creditsRemaining: number;
  onSubmit: (prompt: string) => void;
  onManualSearch: () => void;
  onHistory: () => void;
}

function MicIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-3.5" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="22" />
    </svg>
  );
}

function SendIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-3.5" stroke={active ? "#016dee" : "#9ca3af"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

// Sliders / filter-controls icon — signals a manual, field-driven search
// (rather than the magnifying glass, which reads as "search" in general).
function SlidersIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-3.5" stroke="#016dee" strokeWidth="1.5" strokeLinecap="round">
      <path d="M2 4.5h5M11 4.5h3M2 11.5h3M9 11.5h5" />
      <circle cx="9" cy="4.5" r="1.6" />
      <circle cx="7" cy="11.5" r="1.6" />
    </svg>
  );
}

function SparkleChipIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-3 shrink-0">
      <path
        d="M8 1.5C8 1.5 9.2 5.2 11.5 6.5C13.8 7.8 14.5 8 14.5 8C14.5 8 13.8 8.2 11.5 9.5C9.2 10.8 8 14.5 8 14.5C8 14.5 6.8 10.8 4.5 9.5C2.2 8.2 1.5 8 1.5 8C1.5 8 2.2 7.8 4.5 6.5C6.8 5.2 8 1.5 8 1.5Z"
        fill="#3b82f6"
      />
    </svg>
  );
}

const CHIPS = [
  "Find restaurants in Texas with more than 20 employees",
  "Show healthcare businesses in California with verified contacts",
  "Find manufacturers with annual revenue above $5M",
  "Find cafes within 10 miles of downtown Seattle",
];

export default function LandingView({
  onSubmit,
  onManualSearch,
  onHistory,
}: LandingViewProps) {
  const [input, setInput] = useState("");
  // Even when the free allowance is used up, the composer and suggestion chips
  // stay live so a click/submit still routes to the chat, where the upgrade
  // nudge is shown.
  const canSend = input.trim().length > 0;

  function handleSend() {
    if (!canSend) return;
    onSubmit(input.trim());
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="flex flex-col h-full bg-white overflow-hidden">
      {/* History button row — upper-right of content area */}
      <div className="flex justify-end px-6 pt-5 pb-0 shrink-0">
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

      {/* Centered landing content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 pb-10">
        <div className="w-full max-w-[1061px]">

          {/* Heading */}
          <div className="text-center mb-6">
            <h1 className="text-[24px] font-semibold mb-1 bg-gradient-to-r from-[#a855f7] via-[#3b82f6] to-[#06b6d4] bg-clip-text text-transparent">
              Hey Jason,
            </h1>
            <h2 className="text-[32px] font-bold text-[#1d2939] tracking-tight leading-tight">
              What are we prospecting today?
            </h2>
          </div>

          {/* Search panel */}
          <div className="bg-white border border-[#eaecf0] rounded-[16px] shadow-sm px-[40px] pt-6 pb-6">

            {/* Top row: plain text + manual search hyperlink */}
            <div className="flex items-center justify-between mb-4 gap-4">
              <p className="text-[14px] text-[#475467] font-normal whitespace-nowrap">
                Explore, analyze, and uncover insights through natural-language queries
              </p>
              <button
                onClick={onManualSearch}
                className="flex items-center gap-1.5 text-[12px] text-[#016dee] hover:underline whitespace-nowrap shrink-0 font-medium"
              >
                <SlidersIcon />
                Switch to manual search
              </button>
            </div>

            {/* Input area with gradient border */}
            <div className="rounded-xl p-px mb-5 bg-gradient-to-r from-[#c084fc] via-[#60a5fa] to-[#22d3ee]">
              <div className="bg-white rounded-[11px] flex items-center px-4 py-2.5 gap-3 h-[72px] relative">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Describe the leads you want to find in natural language"
                  rows={2}
                  className="flex-1 text-[15px] text-[#1d2939] placeholder:text-[#9ca3af] bg-transparent border-none outline-none resize-none pt-1.5 leading-snug"
                />
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    className="size-7 flex items-center justify-center rounded-md border border-[#e4e7ec] bg-white hover:bg-[#f9fafb] transition-colors"
                    tabIndex={-1}
                  >
                    <MicIcon />
                  </button>
                  <button
                    onClick={handleSend}
                    disabled={!canSend}
                    className="size-7 flex items-center justify-center rounded-md border border-[#e4e7ec] bg-white hover:bg-[#f0f9ff] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <SendIcon active={canSend} />
                  </button>
                </div>
              </div>
            </div>

            {/* Suggested prompts — compact pill chips in 2 rows */}
            <div className="flex flex-col items-center gap-3">
              <div className="flex flex-wrap justify-center gap-3">
                {CHIPS.slice(0, 2).map((chip, i) => (
                  <button
                    key={i}
                    onClick={() => setInput(chip)}
                    className="h-[28px] flex items-center gap-1.5 text-[12px] font-normal text-[#475467] bg-[#f0f5ff] hover:bg-[#e6effe] rounded-full px-3 transition-colors whitespace-nowrap"
                  >
                    <SparkleChipIcon />
                    <span>{chip}</span>
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                {CHIPS.slice(2, 4).map((chip, i) => (
                  <button
                    key={i + 2}
                    onClick={() => setInput(chip)}
                    className="h-[28px] flex items-center gap-1.5 text-[12px] font-normal text-[#475467] bg-[#f0f5ff] hover:bg-[#e6effe] rounded-full px-3 transition-colors whitespace-nowrap"
                  >
                    <SparkleChipIcon />
                    <span>{chip}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
