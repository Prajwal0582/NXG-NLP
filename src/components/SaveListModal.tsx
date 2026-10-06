import { useState, useEffect, useRef } from "react";
import type { ActiveTab } from "../types";
import { datasetLabel } from "../data/dataset";

interface SaveListModalProps {
  searchDataset: ActiveTab;
  navDataset: ActiveTab;
  isFirstSave: boolean;
  onConfirm: (name: string) => void;
  onCancel: () => void;
}

function AlertSparklesIcon() {
  return (
    <svg viewBox="0 0 14 14" fill="currentColor" className="size-3.5 shrink-0 text-g-blue-700 mt-0.5">
      <path d="M5.25 1.2c0 0 .9 2.6 2.1 3.45C8.55 5.5 9 5.7 9 5.7s-.45.2-1.65 1.05C6.15 8.6 5.25 11.2 5.25 11.2s-.9-2.6-2.1-3.45C1.95 6.9 1.5 6.7 1.5 6.7s.45-.2 1.65-1.05C4.35 4.8 5.25 1.2 5.25 1.2Z" />
      <path d="M10.5 7.2c0 0 .5 1.45 1.15 1.95.65.5.95.65.95.65s-.3.15-.95.65c-.65.5-1.15 1.95-1.15 1.95s-.5-1.45-1.15-1.95c-.65-.5-.95-.65-.95-.65s.3-.15.95-.65c.65-.5 1.15-1.95 1.15-1.95Z" />
    </svg>
  );
}

export default function SaveListModal({
  searchDataset,
  navDataset,
  isFirstSave,
  onConfirm,
  onCancel,
}: SaveListModalProps) {
  const [name, setName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const label = datasetLabel(searchDataset);
  const navLabel = datasetLabel(navDataset);
  const isMismatch = searchDataset !== navDataset;

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleConfirm() {
    if (name.trim()) onConfirm(name.trim());
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={onCancel} />
      <div className="relative bg-g-white rounded-xl shadow-[0px_20px_24px_-4px_rgba(16,24,40,0.08),0px_8px_8px_-4px_rgba(16,24,40,0.03)] w-[480px] p-8 flex flex-col gap-5">
        <div className="flex justify-center">
          <div className="size-12 rounded-full bg-g-blue-100 flex items-center justify-center">
            <svg viewBox="0 0 20 20" fill="none" className="size-5" stroke="#008dc3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 3h8l4 4v8a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" />
              <path d="M7 3v4h5V3" />
              <rect x="6" y="11" width="8" height="5" rx="0.5" />
            </svg>
          </div>
        </div>

        <h2 className="text-[20px] font-semibold leading-[30px] text-g-gray-800 text-center">
          Save as new list
        </h2>

        <div className="rounded-lg border border-g-blue-200 bg-g-blue-50 px-4 py-3">
          <p className="text-[12px] font-semibold leading-[18px] text-g-blue-700 uppercase tracking-wide">
            Saving to
          </p>
          <p className="mt-0.5 text-[14px] font-medium leading-5 text-g-gray-800">
            {label} → Saved lists
          </p>
        </div>

        {isMismatch ? (
          <div className="flex items-start gap-2 rounded-lg border border-g-blue-200 bg-g-blue-50 px-4 py-3">
            <AlertSparklesIcon />
            <p className="text-[12px] font-medium leading-[18px] text-g-blue-700">
              This search uses {label} data. We&apos;ll save the list under {label} even though you&apos;re currently viewing {navLabel}.
            </p>
          </div>
        ) : isFirstSave ? (
          <p className="text-[14px] font-normal leading-5 text-g-gray-600">
            This search uses the {label} dataset, so your list will be saved under {label} → Saved lists.
          </p>
        ) : null}

        <input
          ref={inputRef}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") handleConfirm(); }}
          placeholder="List name"
          className="w-full border border-g-gray-300 rounded-lg px-4 py-3 text-[14px] leading-5 text-g-gray-800 placeholder:text-g-gray-400 focus:outline-none focus:border-g-blue-600 focus:ring-1 focus:ring-g-blue-600"
        />

        <div className="flex gap-3">
          <button
            onClick={handleConfirm}
            disabled={!name.trim()}
            className="flex-1 bg-g-blue-600 text-g-white text-[16px] font-semibold leading-6 py-2.5 rounded-lg hover:bg-g-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save list
          </button>
          <button
            onClick={onCancel}
            className="flex-1 bg-g-white border border-g-gray-300 text-g-gray-700 text-[16px] font-semibold leading-6 py-2.5 rounded-lg hover:bg-g-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
