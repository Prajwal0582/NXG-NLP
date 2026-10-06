import { useState } from "react";

interface SaveListGuidanceProps {
  activeTab: "business" | "consumer";
  onComplete: () => void;
  onDismiss: () => void;
}

const STEPS = [
  {
    step: "1 of 3",
    title: "Datasets- Business & Consumer",
    body: "Customize your experience. Choose the dataset that aligns with your interests, needs and goals!",
  },
  {
    step: "2 of 3",
    title: "Your list saves here",
    body: "", // dynamically set based on activeTab
  },
  {
    step: "3 of 3",
    title: "Find your saved lists",
    body: "All your saved lists live under the Saved lists tab. Switch here anytime to view, manage, or re-open a list you've created.",
  },
];

function SidebarIllustration({ activeTab, highlight }: { activeTab: "business" | "consumer"; highlight: "toggle" | "database" | "saved-lists" }) {
  const isBusiness = activeTab === "business";
  return (
    <div className="bg-[#1D2939] rounded-lg p-4 flex flex-col gap-3 w-full">
      {/* Business / Consumer toggle */}
      <div className={`flex items-center gap-1 rounded-full bg-[#344054] p-1 ${highlight === "toggle" ? "ring-2 ring-[#008dc3] ring-offset-2 ring-offset-[#1D2939]" : ""}`}>
        <div className={`flex-1 text-center text-xs py-1.5 rounded-full transition-colors ${isBusiness ? "bg-white text-[#1D2939] font-medium" : "text-white"}`}>
          Business
        </div>
        <div className={`flex-1 text-center text-xs py-1.5 rounded-full transition-colors ${!isBusiness ? "bg-white text-[#1D2939] font-medium" : "text-white"}`}>
          Consumer
        </div>
      </div>

      {/* Nav items */}
      <div className="flex flex-col gap-1">
        <div className={`flex items-center gap-2 px-3 py-2 rounded text-white text-xs ${highlight === "database" ? "bg-[#344054]" : ""}`}>
          <svg viewBox="0 0 16 16" fill="none" className="size-4 shrink-0" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
            <circle cx="8" cy="8" r="5.5" />
            <path d="m13 13-2.5-2.5" />
          </svg>
          <span>Search</span>
          {highlight === "database" && (
            <span className="ml-auto text-[10px] text-[#008dc3] font-medium bg-[#0c4a6e]/30 px-1.5 py-0.5 rounded">
              {isBusiness ? "Business DB" : "Consumer DB"}
            </span>
          )}
        </div>
        <div className={`flex items-center gap-2 px-3 py-2 rounded text-white text-xs ${highlight === "saved-lists" ? "bg-[#344054] ring-2 ring-[#008dc3] ring-offset-1 ring-offset-[#1D2939]" : ""}`}>
          <svg viewBox="0 0 16 16" fill="none" className="size-4 shrink-0" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2.5" y="2.5" width="11" height="11" rx="1.5" />
            <path d="M5.5 5.5h5M5.5 8h5M5.5 10.5h3" />
          </svg>
          <span>Saved lists</span>
          {highlight === "saved-lists" && (
            <span className="ml-auto">
              <svg viewBox="0 0 16 16" fill="none" className="size-3.5 text-[#008dc3]" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M3 8l4 4 6-7" />
              </svg>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SaveListGuidance({ activeTab, onComplete, onDismiss }: SaveListGuidanceProps) {
  const [step, setStep] = useState(0);

  const isBusiness = activeTab === "business";
  const dbLabel = isBusiness ? "Businesses" : "Consumer";

  const steps = STEPS.map((s, i) => {
    if (i === 1) {
      return {
        ...s,
        body: `Your current search is using the ${dbLabel} dataset. When you save this list, it will be stored under ${dbLabel} → Saved lists.`,
      };
    }
    return s;
  });

  const current = steps[step];
  const highlights: ("toggle" | "database" | "saved-lists")[] = ["toggle", "database", "saved-lists"];

  function handleNext() {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 animate-fade-in">
      <div className="relative w-[420px] bg-white rounded-2xl shadow-[0px_20px_24px_-4px_rgba(16,24,40,0.08),0px_8px_8px_-4px_rgba(16,24,40,0.03)] overflow-hidden">
        {/* Illustration area */}
        <div className="bg-[#f0f9ff] px-8 pt-6 pb-4 relative">
          {/* Close button */}
          <button
            onClick={onDismiss}
            className="absolute top-4 right-4 p-1 text-[#98a2b3] hover:text-[#475467] transition-colors z-10"
          >
            <svg viewBox="0 0 16 16" fill="none" className="size-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M4 4l8 8M12 4l-8 8" />
            </svg>
          </button>

          <div className="max-w-[290px] mx-auto">
            <SidebarIllustration activeTab={activeTab} highlight={highlights[step]} />
          </div>
        </div>

        {/* Content */}
        <div className="px-8 pt-5 pb-6">
          <p className="text-xs font-medium text-[#008dc3] mb-2">{current.step}</p>
          <h3 className="text-lg font-semibold text-[#101828] mb-2">{current.title}</h3>
          <p className="text-sm text-[#475467] leading-relaxed mb-6">{current.body}</p>

          {/* Actions */}
          <div className="flex justify-end">
            <button
              onClick={handleNext}
              className="px-6 py-2.5 bg-[#008dc3] text-white text-sm font-semibold rounded-lg hover:bg-[#007aab] transition-colors"
            >
              {step < steps.length - 1 ? "Next" : "Got it"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
