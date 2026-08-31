interface CreditMilestoneModalProps {
  freePromptsTotal: number;
  onContinue: () => void;
  onViewBalance: () => void;
}

export default function CreditMilestoneModal({ freePromptsTotal, onContinue, onViewBalance }: CreditMilestoneModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-2xl w-[420px] animate-fade-in px-8 py-8 text-center">
        {/* Milestone badge */}
        <span className="inline-block text-xs font-semibold text-[#0d7867] bg-[#f2f9f7] border border-[#b8e8d8] rounded-full px-4 py-1 mb-5">
          Milestone
        </span>

        {/* Title */}
        <h2 className="text-xl font-bold text-[#1d2939] mb-2">
          All {freePromptsTotal} free prompts used
        </h2>

        {/* Subtitle */}
        <p className="text-sm text-[#667085] mb-8 leading-relaxed">
          Great exploring! From here, each prompt used 2 credits from your balance
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onContinue}
            className="flex-1 py-3 text-sm font-semibold text-white bg-[#008dc3] hover:bg-[#007aab] rounded-lg transition-colors"
          >
            Continue
          </button>
          <button
            onClick={onViewBalance}
            className="flex-1 py-3 text-sm font-semibold text-[#344054] bg-white border border-[#d0d5dd] rounded-lg hover:bg-[#f9fafb] transition-colors"
          >
            View balance
          </button>
        </div>
      </div>
    </div>
  );
}
