import { useEffect } from "react";

interface ToastProps {
  message: string;
  type?: "success" | "info";
  onClose: () => void;
}

function LightningIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-4 shrink-0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.5 1.5L3 9h5l-0.5 5.5L13 7H8l0.5-5.5z" />
    </svg>
  );
}

export default function Toast({ message, onClose }: ToastProps) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-fade-in">
      <div className="flex items-center gap-3 bg-[#475467] text-white text-sm font-medium pl-4 pr-3 py-4 rounded-lg shadow-lg min-w-[400px]">
        <LightningIcon />
        <span className="flex-1">{message}</span>
        <button onClick={onClose} className="shrink-0 text-white/70 hover:text-white transition-colors ml-2">
          <svg viewBox="0 0 14 14" fill="none" className="size-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M1 1l12 12M13 1L1 13" />
          </svg>
        </button>
      </div>
    </div>
  );
}
