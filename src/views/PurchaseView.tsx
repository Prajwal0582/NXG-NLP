interface PurchaseViewProps {
  listName: string;
  isFreemium: boolean;
  onBack: () => void;
  onComplete: () => void;
}

export default function PurchaseView({ listName, isFreemium, onBack, onComplete }: PurchaseViewProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 px-6 py-4 border-b border-[#eaecf0] shrink-0 bg-white">
        <button
          onClick={onBack}
          className="text-[#475467] hover:text-[#1d2939] p-1 rounded hover:bg-[#f2f4f7] transition-colors"
        >
          <svg viewBox="0 0 20 20" fill="none" className="size-5" stroke="currentColor" strokeWidth="2">
            <path d="M12 5L7 10l5 5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <h1 className="text-lg font-semibold text-[#1d2939]">Purchase Summary</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="max-w-xl mx-auto">
          <div className="bg-white border border-[#eaecf0] rounded-xl overflow-hidden">
            {/* List info */}
            <div className="px-6 py-5 border-b border-[#eaecf0]">
              <h2 className="text-base font-semibold text-[#1d2939] mb-3">Order details</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-[#475467]">List name</span>
                  <span className="text-sm font-medium text-[#1d2939]">{listName || "Texas Restaurants"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-[#475467]">Record count</span>
                  <span className="text-sm font-medium text-[#1d2939]">11,029 records</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-[#475467]">Database</span>
                  <span className="text-sm font-medium text-[#1d2939]">US Business</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-[#475467]">Data type</span>
                  <span className="text-sm font-medium text-[#1d2939]">Full contact + business details</span>
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="px-6 py-5 border-b border-[#eaecf0]">
              <h2 className="text-base font-semibold text-[#1d2939] mb-3">Price summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#475467]">Base price (11,029 records × $0.05)</span>
                  <span className="text-[#344054]">$551.45</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#475467]">Platform fee</span>
                  <span className="text-[#344054]">$0.00</span>
                </div>
                {isFreemium && (
                  <div className="flex justify-between text-sm">
                    <span className="text-[#067647]">First-time buyer discount (10%)</span>
                    <span className="text-[#067647]">-$55.15</span>
                  </div>
                )}
                <div className="border-t border-[#eaecf0] pt-2 mt-2 flex justify-between">
                  <span className="text-sm font-semibold text-[#1d2939]">Total</span>
                  <span className="text-sm font-semibold text-[#1d2939]">{isFreemium ? "$496.31" : "$551.45"}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="px-6 py-5 space-y-3">
              <button
                onClick={onComplete}
                className="w-full bg-[#016dee] text-white text-sm font-medium py-2.5 rounded-lg hover:bg-[#0156c4] transition-colors"
              >
                Complete purchase
              </button>
              <button
                onClick={onBack}
                className="w-full border border-[#d0d5dd] text-sm font-medium text-[#344054] py-2.5 rounded-lg hover:bg-[#f2f4f7] transition-colors"
              >
                Back to refine list
              </button>
            </div>
          </div>

          <p className="text-xs text-[#98a2b3] text-center mt-4">
            By completing this purchase, you agree to the Data Axle Terms of Service.
          </p>
        </div>
      </div>
    </div>
  );
}
