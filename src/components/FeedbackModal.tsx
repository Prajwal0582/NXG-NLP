import { useState } from "react";

interface FeedbackModalProps {
  onClose: () => void;
  onSubmit: () => void;
}

const REASONS = [
  "Results are not relevant to my business",
  "The recommendations are too broad",
  "The recommendations are too narrow",
  "Other",
];

export default function FeedbackModal({ onClose, onSubmit }: FeedbackModalProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function toggle(reason: string) {
    setSelected((prev) =>
      prev.includes(reason) ? prev.filter((r) => r !== reason) : [...prev, reason]
    );
  }

  function handleSubmit() {
    setSubmitted(true);
    setTimeout(() => onSubmit(), 1200);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-[0px_0px_0px_rgba(71,84,103,0.04),0px_1px_3px_rgba(71,84,103,0.04),0px_5px_5px_rgba(71,84,103,0.03),0px_11px_7px_rgba(71,84,103,0.02),0px_19px_8px_rgba(71,84,103,0.01),0px_30px_8px_rgba(71,84,103,0)] w-[480px] animate-fade-in">

        {submitted ? (
          <div className="px-10 py-12 text-center">
            <div className="size-12 bg-[#f6fef9] rounded-full flex items-center justify-center mx-auto mb-3">
              <svg viewBox="0 0 24 24" fill="none" className="size-6 text-[#067647]" stroke="currentColor" strokeWidth="2">
                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="text-sm font-medium text-[#1d2939]">Thank you for your feedback!</p>
            <p className="text-sm text-[#475467] mt-1">{"We'll use this to improve SalesGenie AI."}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-8 p-10">
            {/* Header: back placeholder + frown icon + close */}
            <div className="flex flex-col gap-4 items-center w-full">
              <div className="flex items-start justify-between w-full">
                <div className="size-5" />
                <div className="size-12 rounded-full bg-[#fff6f2] flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" className="size-6 text-[#c55418]" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="9" cy="10" r="1" fill="#c55418" stroke="none" />
                    <circle cx="15" cy="10" r="1" fill="#c55418" stroke="none" />
                    <path d="M8 16c1.5-1.5 6.5-1.5 8 0" />
                  </svg>
                </div>
                <button onClick={onClose} className="text-[#475467] hover:text-[#1d2939] transition-colors size-5 flex items-center justify-center">
                  <svg viewBox="0 0 20 20" fill="none" className="size-5" stroke="currentColor" strokeWidth="2">
                    <path d="M15 5L5 15M5 5l10 10" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              {/* Title — 20px medium */}
              <p className="text-[20px] font-medium leading-[30px] text-[#1d2939] text-center w-full">
                Help us Improve your Experience
              </p>

            </div>

            {/* Checkbox items — 16px regular, gap 32 between groups */}
            {REASONS.map((reason) => (
              <div key={reason} className="flex items-center w-full">
                <label className="flex items-center gap-2 cursor-pointer">
                  <button
                    type="button"
                    onClick={() => toggle(reason)}
                    className={`size-5 shrink-0 rounded border flex items-center justify-center transition-colors ${
                      selected.includes(reason)
                        ? "bg-[#008dc3] border-[#008dc3]"
                        : "bg-white border-[#d0d5dd]"
                    }`}
                  >
                    {selected.includes(reason) && (
                      <svg viewBox="0 0 12 12" fill="none" className="size-3" stroke="white" strokeWidth="2">
                        <path d="M2 6l3 3 5-5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>
                  <span className="text-[16px] font-normal leading-[21px] tracking-[0.16px] text-[#475467]">
                    {reason}
                  </span>
                </label>
              </div>
            ))}

            {/* Textarea — bg gray-100, border gray-200 */}
            <div className="w-full">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Tell us more"
                className="w-full h-[120px] bg-[#f2f4f7] border border-[#eaecf0] rounded-lg px-4 py-4 text-[14px] font-normal leading-[20px] text-[#1d2939] placeholder:text-[#98a2b3] focus:outline-none focus:border-[#008dc3] focus:ring-1 focus:ring-[#008dc3] resize-none"
              />
            </div>

            {/* Buttons — equal width, 18px medium, gap 32 */}
            <div className="w-full">
              <button
                onClick={handleSubmit}
                className="w-full bg-[#008dc3] border border-[#008dc3] text-white text-[18px] font-medium leading-[28px] py-3.5 rounded-lg hover:bg-[#007aab] transition-colors"
              >
                Submit
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
