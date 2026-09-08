import { useState, useRef, useEffect } from "react";
import type { UserScenario } from "../types";

interface TopHeaderProps {
  scenario: UserScenario;
  onScenarioChange: (s: UserScenario) => void;
  promptsRemaining: number;
  freePromptsTotal: number;
  isFreemium: boolean;
  creditsRemaining: number;
  reservedCredits: number;
  onLogout: () => void;
  onPlans: () => void;
}

function LightningIcon({ className = "size-3", fill = "#016dee" }: { className?: string; fill?: string }) {
  return (
    <svg viewBox="0 0 12 14" fill="none" className={`shrink-0 ${className}`}>
      <path d="M7 1L1 8h5l-1 5 6-7H6L7 1Z" fill={fill} />
    </svg>
  );
}

function useClickOutside(ref: React.RefObject<HTMLElement | null>, onClose: () => void) {
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    const t = setTimeout(() => document.addEventListener("mousedown", handler), 50);
    return () => { clearTimeout(t); document.removeEventListener("mousedown", handler); };
  }, [ref, onClose]);
}

function accountLabel(scenario: UserScenario) {
  return scenario.startsWith("freemium-") ? "Freemium account" : "Subscriber account";
}

export default function TopHeader({
  scenario,
  promptsRemaining,
  freePromptsTotal,
  isFreemium,
  creditsRemaining,
  onLogout,
  onPlans,
}: TopHeaderProps) {
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [pillOpen, setPillOpen] = useState(false);
  const pillRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);

  useClickOutside(pillRef, () => setPillOpen(false));
  useClickOutside(avatarRef, () => setAvatarOpen(false));

  const isCredit = scenario === "subscriber-credit" || scenario === "subscriber-credit-0";
  const pct = Math.max(0, (promptsRemaining / freePromptsTotal) * 100);
  // "5 and less prompts left" is the low-balance warning state (amber).
  const isLow = !isCredit && promptsRemaining <= 5 && isFreemium;

  return (
    <header className="bg-white h-14 flex items-center px-6 shrink-0 border-b border-[#eaecf0] relative z-30">
      <div className="flex-1" />

      {/* ── Prompt/credit pill ───────────────────────────────────────── */}
      {isCredit ? (
        <div className="mr-3" />
      ) : promptsRemaining > 0 || isFreemium ? (
        /* Prompt allowance pill for freemium / subscriber-free with prompts */
        <div ref={pillRef} className="relative mr-3">
          <button
            onClick={() => { setPillOpen((o) => !o); setAvatarOpen(false); }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              isLow
                ? "bg-[#fffaeb] border-[#fedf89] text-[#b54708] hover:bg-[#fef3c7]"
                : "bg-[#f0f9ff] border-[#bae6fd] text-[#344054] hover:bg-[#e0f2fe]"
            }`}
          >
            <LightningIcon fill={isLow ? "#f79009" : "#016dee"} />
            <span>{promptsRemaining} of {freePromptsTotal} free prompts left</span>
            <div className="w-14 h-1.5 bg-[#e4e7ec] rounded-full overflow-hidden ml-1">
              <div
                className={`h-full rounded-full transition-all ${isLow ? "bg-[#f79009]" : "bg-[#38bdf8]"}`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </button>

          {pillOpen && (
            <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl border border-[#e4e7ec] shadow-lg z-50 p-4 animate-fade-in">
              <p className="text-sm font-semibold text-[#1d2939] mb-1">Your Free AI Prompts</p>
              <p className="text-sm text-[#475467] mb-1">
                <span className="font-semibold text-[#1d2939]">{promptsRemaining}</span> of {freePromptsTotal} free prompts remaining.
              </p>
              <p className="text-xs text-[#667085] mb-3">Your {freePromptsTotal} free prompts reset automatically each month.</p>
              <button
                onClick={() => { setPillOpen(false); onPlans(); }}
                className="w-full bg-[#016dee] hover:bg-[#0052cc] text-white text-xs font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                Upgrade account
              </button>
              <p className="text-center text-xs text-[#667085] mt-2">Upgrade for unlimited AI search access.</p>
            </div>
          )}
        </div>
      ) : null}

      {/* ── Profile avatar + dropdown ─────────────────────────────────── */}
      <div ref={avatarRef} className="relative">
        <button
          onClick={() => { setAvatarOpen((o) => !o); setPillOpen(false); }}
          className="flex items-center gap-1.5"
        >
          <div className="bg-[#d0d5dd] flex items-center justify-center size-8 rounded-full text-xs font-semibold text-[#1d2939] hover:bg-[#b8bec8] transition-colors">
            SM
          </div>
          <svg viewBox="0 0 10 6" fill="none" className="size-2.5 text-[#475467]">
            <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {avatarOpen && (
          <div className="absolute right-0 top-10 w-64 bg-white rounded-xl shadow-xl border border-[#eaecf0] z-50 animate-fade-in overflow-hidden">
            {/* Profile identity */}
            <div className="px-4 py-3 flex items-center gap-3">
              <div className="size-9 rounded-full bg-[#d0d5dd] flex items-center justify-center text-sm font-semibold text-[#1d2939] shrink-0">
                SM
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[#1d2939] truncate">Sarah Mitchell</p>
                <p className="text-xs text-[#667085] truncate">sarah@company.com</p>
              </div>
            </div>

            {/* Account type + balance */}
            <div className="px-4 py-2.5 bg-[#f9fafb] border-y border-[#eaecf0]">
              <p className="text-xs text-[#475467] mb-1">{accountLabel(scenario)}</p>
              {isCredit || (!isFreemium && promptsRemaining <= 0 && creditsRemaining > 0) ? (
                <>
                  <div className="flex items-center gap-1.5">
                    <LightningIcon />
                    <span className="text-xs font-semibold text-[#1d2939]">{creditsRemaining} credits available</span>
                  </div>
                  <p className="text-[11px] text-[#667085] mt-0.5">AI prompts cost 2 credits each.</p>
                </>
              ) : (
                <div className="flex items-center gap-1.5">
                  <LightningIcon />
                  <span className="text-xs font-semibold text-[#1d2939]">
                    {promptsRemaining} of {freePromptsTotal} free prompts left
                  </span>
                </div>
              )}
            </div>

            {/* Log out */}
            <div className="py-1">
              <button
                onClick={() => { setAvatarOpen(false); onLogout(); }}
                className="w-full text-left px-4 py-2.5 text-sm text-[#344054] hover:bg-[#f9fafb] transition-colors flex items-center gap-2"
              >
                <svg viewBox="0 0 16 16" fill="none" className="size-4 text-[#667085]" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 14H3a1 1 0 01-1-1V3a1 1 0 011-1h3M10 11l3-3-3-3M13 8H6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Log out
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
