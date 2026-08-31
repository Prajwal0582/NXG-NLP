import { useState, useEffect, useRef } from "react";

interface SaveListModalProps {
  defaultName: string;
  onConfirm: (name: string) => void;
  onCancel: () => void;
}

function SaveIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="size-5" stroke="#008dc3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 3h8l4 4v8a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" />
      <path d="M7 3v4h5V3" />
      <rect x="6" y="11" width="8" height="5" rx="0.5" />
    </svg>
  );
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
      <div className="relative bg-white rounded-lg shadow-xl p-10 w-[480px] flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col items-center gap-2">
          <div className="size-11 rounded-full bg-[#e5f3fc] flex items-center justify-center">
            <SaveIcon />
          </div>
          <h2 className="text-xl font-medium text-[#1d2939] text-center tracking-[0.2px]">
            Save as new list
          </h2>
          <p className="text-base text-[#475467] text-center">
            Please save this list to start a new campaign.
          </p>
        </div>

        {/* Text field */}
        <div className="flex flex-col items-start relative">
          <div className="flex flex-col items-center justify-center pl-4 mb-[-2px] relative z-10">
            <div className="bg-white px-1">
              <span className="text-[10px] text-[#008dc3]">List name</span>
            </div>
          </div>
          <input
            ref={inputRef}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") handleConfirm(); }}
            className="w-full h-14 border border-[#008dc3] rounded-lg px-4 text-base text-[#1d2939] outline-none"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-8">
          <button
            onClick={handleConfirm}
            className="flex-1 bg-[#008dc3] border border-[#008dc3] text-white text-lg font-medium py-3.5 rounded-lg hover:bg-[#007aab] transition-colors"
          >
            Confirm
          </button>
          <button
            onClick={onCancel}
            className="flex-1 bg-white border border-[#d0d5dd] text-[#475467] text-lg font-medium py-3.5 rounded-lg hover:bg-[#f9fafb] transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
