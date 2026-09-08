interface CreditMilestoneModalProps {
  freePromptsTotal: number;
  onContinue: () => void;
  onViewBalance: () => void;
}

export default function CreditMilestoneModal({ freePromptsTotal, onContinue }: CreditMilestoneModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-2xl w-[480px] animate-fade-in px-10 py-10 text-center">
        {/* Check icon */}
        <div className="flex justify-center mb-5">
          <div className="size-12 rounded-full bg-[#e6f7f3] flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" className="size-6 text-[#0d9373]" stroke="currentColor" strokeWidth="2.5">
              <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-[20px] font-medium leading-[30px] text-[#1d2939] mb-3">
          You've used your {freePromptsTotal} free prompts.
        </h2>

        {/* Subtitle */}
        <p className="text-[16px] font-normal leading-[24px] text-[#475467] mb-8">
          Keep exploring with Smart search across all datasets with natural-language prompts by spending just 2 credits/prompt.
        </p>

        {/* Continue button */}
        <button
          onClick={onContinue}
          className="w-full py-3.5 text-[18px] font-medium leading-[28px] text-white bg-[#008dc3] border border-[#008dc3] hover:bg-[#007aab] rounded-lg transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
