interface CreditConfirmModalProps {
  credits: number;
  onConfirm: () => void;
  onCancel: () => void;
}

function SparkleIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-4">
      <defs>
        <linearGradient id="sparkle-cred" x1="8" y1="0" x2="8" y2="16" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F599ED" />
          <stop offset="0.5" stopColor="#016DEE" />
          <stop offset="1" stopColor="#2DFBF9" />
        </linearGradient>
      </defs>
      <path
        d="M8 1L9.2 6.2L14.5 8L9.2 9.8L8 15L6.8 9.8L1.5 8L6.8 6.2L8 1Z"
        fill="url(#sparkle-cred)"
      />
    </svg>
  );
}

export default function CreditConfirmModal({ credits, onConfirm, onCancel }: CreditConfirmModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-2xl w-[400px] animate-fade-in">
        <div className="px-6 py-6 text-center">
          <div className="size-12 bg-[#f0f9ff] rounded-full flex items-center justify-center mx-auto mb-4">
            <SparkleIcon />
          </div>
          <h2 className="text-base font-semibold text-[#1d2939] mb-1">Use 2 credits for this prompt?</h2>
          <p className="text-sm text-[#475467]">
            You have <strong>{credits} credits</strong> remaining. Each AI prompt costs 2 credits.
          </p>
        </div>
        <div className="flex items-center gap-3 px-6 pb-6">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 text-sm font-medium text-[#475467] border border-[#d0d5dd] rounded-lg hover:bg-[#f2f4f7] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 text-sm font-medium text-white bg-[#016dee] rounded-lg hover:bg-[#0156c4] transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
