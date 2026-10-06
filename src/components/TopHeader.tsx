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
            className={`flex items-center gap-2.5 px-3 py-1.5 rounded-full text-[12px] font-normal leading-[18px] border transition-colors ${
              isLow
                ? "bg-[#fffaeb] border-[#fedf89] text-[#b54708] hover:bg-[#fef3c7]"
                : "bg-[#f1f9fd] border-[#cae6f9] text-[#344054] hover:bg-[#e0f2fe]"
            }`}
          >
            <span>Free prompts: {promptsRemaining} of {freePromptsTotal}</span>
            <div className="w-16 h-1.5 bg-[#e4e7ec] rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${isLow ? "bg-[#f79009]" : "bg-[#008dc3]"}`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </button>

          {pillOpen && (
            <div className="absolute right-0 top-full mt-2 w-[358px] bg-white rounded-xl border border-[#eaecf0] shadow-[0px_0px_0px_rgba(71,84,103,0.04),0px_3px_7px_rgba(71,84,103,0.04),0px_12px_12px_rgba(71,84,103,0.03),0px_27px_16px_rgba(71,84,103,0.02),0px_49px_19px_rgba(71,84,103,0.01),0px_76px_21px_rgba(71,84,103,0)] z-50 p-4 animate-fade-in">
              {/* Header row */}
              <div className="flex items-center justify-between pb-2 border-b border-[#f1f5f9]">
                <p className="text-xs font-medium leading-[18px] text-[#0f172b]">AI Prompt Allowance</p>
                <p className="text-xs font-normal leading-[18px] text-[#62748e]">{isFreemium ? "Freemium" : "Subscribed"}</p>
              </div>

              {/* Body */}
              <div className="pt-3">
                {isFreemium ? (
                  <>
                    <p className="text-xs font-medium leading-[18px] text-[#45556c]">
                      You have{" "}
                      <span className="font-semibold text-[#0f172b]">{freePromptsTotal} free prompts</span>
                      {" "}to explore lead generation.
                    </p>

                    <div className="mt-2 bg-[#f9fafb] border border-[#eaecf0] rounded-lg p-4">
                      <p className="text-xs font-normal leading-[18px] text-[#475467]">
                        Upgrade to get more prompts and unlock full access.
                      </p>
                    </div>

                    <button
                      onClick={() => { setPillOpen(false); onPlans(); }}
                      className="w-full mt-2 bg-[#008dc3] border border-[#008dc3] text-white text-[14px] font-medium leading-[20px] py-1.5 px-3 rounded-md hover:bg-[#007aab] transition-colors"
                    >
                      Upgrade account
                    </button>
                  </>
                ) : (
                  <>
                    <p className="text-xs font-medium leading-[18px] text-[#45556c]">
                      Your account will receive{" "}
                      <span className="font-semibold text-[#0f172b]">{freePromptsTotal} initial free prompts</span>
                      {" "}to explore lead generation.
                    </p>

                    <div className="mt-2 bg-[#f9fafb] border border-[#eaecf0] rounded-lg p-4">
                      <p className="text-xs font-normal leading-[18px] text-[#475467]">
                        You are provided with free prompts once this are utilized your account credits will start to consume
                      </p>
                    </div>
                  </>
                )}
              </div>
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
