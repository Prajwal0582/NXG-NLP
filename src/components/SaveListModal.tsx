import { useState, useEffect, useRef } from "react";

interface SaveListModalProps {
  defaultName: string;
  onConfirm: (name: string) => void;
  onCancel: () => void;
}

export default function SaveListModal({ defaultName, onConfirm, onCancel }: SaveListModalProps) {
  const [name, setName] = useState(defaultName);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
  }, []);

  function handleConfirm() {
    if (name.trim()) onConfirm(name.trim());
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={onCancel} />
      <div className="relative bg-white rounded-lg shadow-2xl w-[480px] px-10 py-10 flex flex-col gap-6">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="size-12 rounded-full bg-[#e5f3fc] flex items-center justify-center">
            <svg viewBox="0 0 20 20" fill="none" className="size-5" stroke="#008dc3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 3h8l4 4v8a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" />
              <path d="M7 3v4h5V3" />
              <rect x="6" y="11" width="8" height="5" rx="0.5" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-[20px] font-medium leading-[30px] text-[#1d2939] text-center">
          Save as new list
        </h2>

        {/* Saving to path */}
        <div className="flex items-center gap-1.5 text-[14px] text-[#475467]">
          <svg viewBox="0 0 16 16" fill="none" className="size-4 shrink-0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 4.5A1.5 1.5 0 013.5 3h3l1.5 2h4.5A1.5 1.5 0 0114 6.5v5a1.5 1.5 0 01-1.5 1.5h-9A1.5 1.5 0 012 11.5v-7z" />
          </svg>
          <span><strong className="font-semibold text-[#1d2939]">Saving to:</strong> Businesses → Saved lists</span>
        </div>

        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") handleConfirm(); }}
          placeholder="My Customer list (Copy)"
          className="w-full border border-[#d0d5dd] rounded-lg px-4 py-3 text-[16px] text-[#1d2939] placeholder:text-[#98a2b3] focus:outline-none focus:border-[#008dc3] focus:ring-1 focus:ring-[#008dc3]"
        />

        {/* Buttons */}
        <div className="flex items-start gap-8">
          <button
            onClick={handleConfirm}
            className="flex-1 bg-[#008dc3] border border-[#008dc3] text-white text-[18px] font-medium leading-[28px] py-3.5 rounded-lg hover:bg-[#007aab] transition-colors"
          >
            Confirm
          </button>
          <button
            onClick={onCancel}
            className="flex-1 bg-white border border-[#d0d5dd] text-[#475467] text-[18px] font-medium leading-[28px] py-3.5 rounded-lg hover:bg-[#f9fafb] transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
