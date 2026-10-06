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

function LightningIcon({ className = "size-3", fill = "#008dc3" }: { className?: string; fill?: string }) {
  return (
    <svg viewBox="0 0 12 14" fill="none" className={`shrink-0 ${className}`}>
      <path d="M7 1L1 8h5l-1 5 6-7H6L7 1Z" fill={fill} />
    </svg>
  );
}

function SparklePair() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="size-5 shrink-0 text-g-blue-600">
      <path
        d="M7.5 2.5c0 0 1.05 3.4 2.7 4.55C11.85 8.2 12.5 8.5 12.5 8.5s-.65.3-2.3 1.45C8.55 11.1 7.5 14.5 7.5 14.5s-1.05-3.4-2.7-4.55C3.15 8.8 2.5 8.5 2.5 8.5s.65-.3 2.3-1.45C6.45 5.9 7.5 2.5 7.5 2.5Z"
        fill="currentColor"
      />
      <path
        d="M14.5 9.5c0 0 .6 1.95 1.55 2.6.95.65 1.45.9 1.45.9s-.5.25-1.45.9c-.95.65-1.55 2.6-1.55 2.6s-.6-1.95-1.55-2.6c-.95-.65-1.45-.9-1.45-.9s.5-.25 1.45-.9c.95-.65 1.55-2.6 1.55-2.6Z"
        fill="currentColor"
      />
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
  const showPromptAllowance = promptsRemaining > 0;
  const promptPct = Math.max(0, (promptsRemaining / freePromptsTotal) * 100);
  const isLow = isFreemium && promptsRemaining <= 5;

  useEffect(() => {
    if (!showPromptAllowance) setPillOpen(false);
  }, [showPromptAllowance]);

  return (
    <header className="bg-g-white h-14 flex items-center px-6 shrink-0 border-b border-g-gray-200 relative z-30">
      <div className="flex-1" />

      {/* Free-prompt allowance only. Hidden after prompts are used (incl. credit users). */}
      {showPromptAllowance && (
      <div ref={pillRef} className="relative mr-3">
        <button
          onClick={() => { setPillOpen((o) => !o); setAvatarOpen(false); }}
          className={`flex items-center gap-2.5 px-3 py-1.5 rounded-full text-[12px] font-normal leading-[18px] border transition-colors ${
            isLow
              ? "bg-g-orange-50 border-g-orange-200 text-g-orange-600 hover:bg-g-orange-50"
              : "bg-g-blue-50 border-g-blue-200 text-g-gray-700 hover:bg-g-blue-100"
          }`}
        >
          <span>Free prompts: {promptsRemaining} of {freePromptsTotal}</span>
          <div className="w-16 h-1.5 bg-g-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${isLow ? "bg-g-orange-600" : "bg-g-blue-600"}`}
              style={{ width: `${promptPct}%` }}
            />
          </div>
        </button>

        {pillOpen && (
          <div className="absolute right-0 top-full mt-2 w-[360px] bg-g-white rounded-xl border border-g-gray-200 shadow-[0px_4px_8px_-2px_rgba(16,24,40,0.1),0px_2px_4px_-2px_rgba(16,24,40,0.06)] z-50 p-5 animate-fade-in">
            <div className="flex items-center justify-between gap-3 mb-4">
              <p className="text-[16px] font-semibold leading-6 text-g-gray-800">
                AI Prompt Allowance
              </p>
              <span className="shrink-0 rounded-full bg-g-blue-50 px-2.5 py-0.5 text-[12px] font-medium leading-[18px] text-g-blue-700">
                {isFreemium ? "Free account" : "Subscriber"}
              </span>
            </div>

            {isFreemium ? (
              <>
                <p className="text-[20px] font-semibold leading-[30px] text-g-gray-800">
                  {promptsRemaining} of {freePromptsTotal} free prompts remaining
                </p>
                <p className="mt-1 text-[14px] font-normal leading-5 text-g-gray-600">
                  Use your free prompts to explore and find leads with AI.
                </p>
                <div className="mt-4 flex items-center gap-2.5 rounded-lg bg-g-blue-50 px-3.5 py-3">
                  <SparklePair />
                  <p className="text-[14px] font-normal leading-5 text-g-gray-800">
                    Upgrade for unlimited AI prompts and full access.
                  </p>
                </div>
                <button
                  onClick={() => { setPillOpen(false); onPlans(); }}
                  className="mt-4 w-full rounded-lg bg-g-blue-600 py-2.5 text-[16px] font-semibold leading-6 text-g-white hover:bg-g-blue-700 transition-colors"
                >
                  Upgrade account
                </button>
              </>
            ) : (
              <>
                <p className="text-[20px] font-semibold leading-[30px] text-g-gray-800">
                  {promptsRemaining} of {freePromptsTotal} free prompts remaining
                </p>
                <p className="mt-1 text-[14px] font-normal leading-5 text-g-gray-600">
                  Use your free prompts to explore and find leads with AI.
                </p>
                <div className="mt-4 flex items-center gap-2.5 rounded-lg bg-g-blue-50 px-3.5 py-3">
                  <SparklePair />
                  <p className="text-[14px] font-normal leading-5 text-g-gray-800">
                    After this allowance, each AI search costs 2 credits.
                  </p>
                </div>
              </>
            )}
          </div>
        )}
      </div>
      )}

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
          <div className="absolute right-0 top-10 w-[271px] bg-white rounded-[10px] shadow-[0px_0px_0px_rgba(71,84,103,0.04),0px_1px_3px_rgba(71,84,103,0.04),0px_5px_5px_rgba(71,84,103,0.03),0px_11px_7px_rgba(71,84,103,0.02),0px_19px_8px_rgba(71,84,103,0.01),0px_30px_8px_rgba(71,84,103,0)] border border-[#eaecf0] z-50 animate-fade-in overflow-hidden">
            {/* Account identity */}
            <div className="flex items-center gap-3 px-4 h-[61px] border-b border-[#eaecf0]">
              <div className="bg-[#d0d5dd] flex items-center justify-center p-2 rounded-full shrink-0">
                <span className="text-[14px] font-normal leading-[21px] text-black">SM</span>
              </div>
              <div className="flex-1 min-w-0 overflow-hidden">
                <p className="text-[14px] font-medium leading-[20px] text-[#1d2939] truncate">Sarah Mitchell</p>
                <p className="text-[12px] font-normal leading-[18px] text-[#667085] truncate">sarah@company.com</p>
              </div>
            </div>

            {/* Subscription summary */}
            <div className="flex flex-col gap-1 px-4 pt-[9px] pb-2 border-b border-[#eaecf0]">
              <p className="text-[12px] font-normal leading-[18px] text-[#1d2939]">{accountLabel(scenario)}</p>
              {isCredit || (!isFreemium && promptsRemaining <= 0 && creditsRemaining > 0) ? (
                <>
                  <div className="flex items-center gap-1">
                    <LightningIcon className="size-3.5" fill="#475467" />
                    <span className="text-[14px] font-medium leading-[20px] text-[#1d2939]">{creditsRemaining} credits available</span>
                  </div>
                  <p className="text-[12px] font-normal leading-[18px] text-[#667085]">AI prompts cost 2 credits each</p>
                </>
              ) : (
                <div className="flex items-center gap-1">
                  <LightningIcon className="size-3.5" fill="#475467" />
                  <span className="text-[14px] font-medium leading-[20px] text-[#1d2939]">
                    {promptsRemaining} of {freePromptsTotal} free prompts left
                  </span>
                </div>
              )}
            </div>

            {/* Log out */}
            <button
              onClick={() => { setAvatarOpen(false); onLogout(); }}
              className="w-full flex items-center gap-2 px-4 h-12 text-[14px] font-normal leading-[20px] text-[#1d2939] hover:bg-[#f9fafb] transition-colors"
            >
              <svg viewBox="0 0 16 16" fill="none" className="size-4 shrink-0" stroke="#667085" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 14H3a1 1 0 01-1-1V3a1 1 0 011-1h3M10 11l3-3-3-3M13 8H6" />
              </svg>
              Log out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
