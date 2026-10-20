interface CreditMilestoneModalProps {
  freePromptsTotal: number;
  onContinue: () => void;
  onViewBalance: () => void;
}

export default function CreditMilestoneModal({ freePromptsTotal, onContinue }: CreditMilestoneModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-2xl w-[520px] animate-fade-in overflow-hidden">
        <div className="h-1.5 bg-gradient-to-r from-[#8b5cf6] via-[#3b82f6] to-[#06b6d4]" />

        <div className="px-10 pt-9 pb-8 text-center">
          <div className="flex justify-center mb-5">
            <div className="size-11 rounded-full bg-[#e0f2fe] flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="size-5 text-[#008dc3]" stroke="currentColor" strokeWidth="2.5">
                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          <h2 className="text-[20px] font-semibold leading-[30px] text-[#1d2939] mb-4">
            You’ve used your {freePromptsTotal} free prompts.
          </h2>

          <p className="text-[16px] font-normal leading-[24px] text-[#475467] mb-6">
            Keep exploring with Smart search across all datasets with natural-language prompts
          </p>

          <div className="flex items-center justify-between rounded-lg bg-[#f0f7fc] border border-[#e0eef7] px-4 py-4 mb-8">
            <span className="text-[12px] font-medium uppercase tracking-wide text-[#008dc3]">From here on charged by:</span>
            <span className="text-[16px] font-normal text-[#1d2939]">2 credits/prompt.</span>
          </div>

          <button
            onClick={onContinue}
            className="w-full py-3.5 text-[18px] font-medium leading-[28px] text-white bg-[#008dc3] hover:bg-[#007aab] rounded-lg transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
