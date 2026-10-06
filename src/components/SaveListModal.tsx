import { useState, useEffect, useRef } from "react";

interface SaveListModalProps {
  activeTab: "business" | "consumer";
  onConfirm: (name: string) => void;
  onCancel: () => void;
}

export default function SaveListModal({ activeTab, onConfirm, onCancel }: SaveListModalProps) {
  const [name, setName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const dbLabel = activeTab === "business" ? "Businesses" : "Consumer";

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleConfirm() {
    if (name.trim()) onConfirm(name.trim());
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={onCancel} />
      <div className="relative bg-white rounded-xl shadow-[0px_20px_24px_-4px_rgba(16,24,40,0.08),0px_8px_8px_-4px_rgba(16,24,40,0.03)] w-[480px] p-8 flex flex-col gap-5">
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
        <h2 className="text-lg font-semibold text-[#101828] text-center">
          Save as new list
        </h2>

        {/* Saving to banner */}
        <div className="bg-[#f0f9ff] border border-[#b2ddff] rounded-lg px-4 py-3">
          <p className="text-xs font-semibold text-[#008dc3] uppercase tracking-wide mb-1">Saving to</p>
          <p className="text-sm font-medium text-[#1d2939]">{dbLabel} database → Saved lists</p>
        </div>

        {/* Description */}
        <p className="text-sm text-[#475467] leading-relaxed">
          This list will be created in the {dbLabel} database under Saved lists. The name below will be used for the new list.
        </p>

        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") handleConfirm(); }}
          placeholder="My Customer list (Copy)"
          className="w-full border border-[#d0d5dd] rounded-lg px-4 py-3 text-sm text-[#1d2939] placeholder:text-[#98a2b3] focus:outline-none focus:border-[#008dc3] focus:ring-1 focus:ring-[#008dc3]"
        />

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleConfirm}
            disabled={!name.trim()}
            className="flex-1 bg-[#008dc3] border border-[#008dc3] text-white text-base font-semibold py-2.5 rounded-lg hover:bg-[#007aab] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save list
          </button>
          <button
            onClick={onCancel}
            className="flex-1 bg-white border border-[#d0d5dd] text-[#344054] text-base font-semibold py-2.5 rounded-lg hover:bg-[#f9fafb] transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
