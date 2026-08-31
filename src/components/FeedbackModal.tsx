import { useState } from "react";

interface FeedbackModalProps {
  onClose: () => void;
  onSubmit: () => void;
}

function XIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-4" stroke="currentColor" strokeWidth="2">
      <path d="M12 4L4 12M4 4l8 8" strokeLinecap="round" />
    </svg>
  );
}

export default function FeedbackModal({ onClose, onSubmit }: FeedbackModalProps) {
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit() {
    setSubmitted(true);
    setTimeout(() => {
      onSubmit();
    }, 1200);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-2xl w-[480px] animate-fade-in">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#eaecf0]">
          <h2 className="text-base font-semibold text-[#1d2939]">What could be improved?</h2>
          <button onClick={onClose} className="text-[#98a2b3] hover:text-[#475467]">
            <XIcon />
          </button>
        </div>

        {submitted ? (
          <div className="px-6 py-8 text-center">
            <div className="size-12 bg-[#f6fef9] rounded-full flex items-center justify-center mx-auto mb-3">
              <svg viewBox="0 0 24 24" fill="none" className="size-6 text-[#067647]" stroke="currentColor" strokeWidth="2">
                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="text-sm font-medium text-[#1d2939]">Thank you for your feedback!</p>
            <p className="text-sm text-[#475467] mt-1">{"We'll use this to improve SalesGenie AI."}</p>
          </div>
        ) : (
          <>
            <div className="px-6 py-4">
              <p className="text-sm text-[#475467] mb-3">
                Help us understand how we can improve this result. Your feedback is anonymous.
              </p>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Describe what could be better — e.g. wrong industry, too many results, missing criteria..."
                className="w-full border border-[#d0d5dd] rounded-lg px-3 py-2.5 text-sm text-[#1d2939] placeholder:text-[#98a2b3] focus:outline-none focus:border-[#016dee] focus:ring-1 focus:ring-[#016dee] resize-none"
                rows={4}
              />
            </div>
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#eaecf0]">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-[#475467] border border-[#d0d5dd] rounded-lg hover:bg-[#f2f4f7] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!comment.trim()}
                className="px-4 py-2 text-sm font-medium text-white bg-[#016dee] rounded-lg hover:bg-[#0156c4] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Send feedback
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
