import { useEffect, useState, type ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

/** Pricing slides up over the app like the Settings panel (B3 sheet). */
const SHEET_BOX = "inset-x-3 top-3 bottom-0 rounded-t-2xl sm:inset-x-6";

interface PricingSheetProps {
  /** Called after the close animation finishes. */
  onClosed: () => void;
  children: (close: () => void) => ReactNode;
}

export default function PricingSheet({ onClosed, children }: PricingSheetProps) {
  const [state, setState] = useState<"open" | "closing">("open");

  function close() {
    if (state === "closing") return;
    setState("closing");
    window.setTimeout(onClosed, 280);
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !document.querySelector("[role=dialog]")) close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  });

  return (
    <div className="fixed inset-0 z-[80]">
      <div
        aria-hidden
        onClick={close}
        className={`absolute inset-0 bg-[#101828]/50 ${state === "closing" ? "drawer-backdrop-out" : "drawer-backdrop-in"}`}
      />
      <div
        role="region"
        aria-label="Plans and pricing"
        className={`absolute overflow-hidden bg-white shadow-2xl ${SHEET_BOX} ${
          state === "closing" ? "drawer-sheet-out" : "drawer-sheet-in"
        }`}
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-4 top-4 z-20 flex size-9 items-center justify-center rounded-lg text-[#475467] hover:bg-[#F2F4F7] hover:text-[#1D2939]"
        >
          <FontAwesomeIcon icon={faXmark} className="text-[18px]" />
        </button>
        {children(close)}
      </div>
    </div>
  );
}
