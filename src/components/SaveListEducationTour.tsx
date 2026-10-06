import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

const PAD = 6;
const CARD_WIDTH = 360;
const CARD_GAP = 16;

function readRect(selector: string): Rect | null {
  const el = document.querySelector(selector);
  if (!el) return null;
  const r = el.getBoundingClientRect();
  if (r.width === 0 || r.height === 0) return null;
  return { top: r.top, left: r.left, width: r.width, height: r.height };
}

function inflate(rect: Rect): Rect {
  return {
    top: rect.top - PAD,
    left: rect.left - PAD,
    width: rect.width + PAD * 2,
    height: rect.height + PAD * 2,
  };
}

function roundedRectPath(x: number, y: number, w: number, h: number, r: number): string {
  const radius = Math.min(r, w / 2, h / 2);
  return [
    `M${x + radius},${y}`,
    `H${x + w - radius}`,
    `A${radius},${radius} 0 0 1 ${x + w},${y + radius}`,
    `V${y + h - radius}`,
    `A${radius},${radius} 0 0 1 ${x + w - radius},${y + h}`,
    `H${x + radius}`,
    `A${radius},${radius} 0 0 1 ${x},${y + h - radius}`,
    `V${y + radius}`,
    `A${radius},${radius} 0 0 1 ${x + radius},${y}`,
    "Z",
  ].join(" ");
}

const STEPS = [
  {
    selector: '[data-coach="dataset-toggle"]',
    radius: 999,
    stepLabel: "1 of 2",
    title: "Lists stay with their dataset",
    body: "Saved lists can belong to either Business or Consumer, depending on the search you created them from. Switch datasets here anytime to view the right set of lists.",
    cta: "Next",
  },
  {
    selector: '[data-coach="nav-saved-lists"]',
    radius: 8,
    stepLabel: "2 of 2",
    title: "Find your saved lists here",
    body: "Open Saved lists anytime to view, manage, or reopen the lists you've created.",
    cta: "Got it",
  },
] as const;

interface SaveListEducationTourProps {
  onComplete: () => void;
}

export default function SaveListEducationTour({ onComplete }: SaveListEducationTourProps) {
  const [step, setStep] = useState(0);
  const [hole, setHole] = useState<Rect | null>(null);

  const current = STEPS[step];

  useEffect(() => {
    let frame = 0;
    function measure() {
      const rect = readRect(current.selector);
      setHole(rect ? inflate(rect) : null);
    }
    measure();
    frame = requestAnimationFrame(measure);
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, true);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure, true);
    };
  }, [current.selector]);

  function handleNext() {
    if (step === 0) setStep(1);
    else onComplete();
  }

  const vw = typeof window === "undefined" ? 1280 : window.innerWidth;
  const vh = typeof window === "undefined" ? 800 : window.innerHeight;
  const cardHeightEstimate = 220;
  let cardLeft = hole ? hole.left + hole.width + CARD_GAP : 272;
  let cardTop = hole ? hole.top : 80;
  if (cardLeft + CARD_WIDTH > vw - 16) {
    cardLeft = Math.max(16, vw - CARD_WIDTH - 16);
  }
  if (cardTop + cardHeightEstimate > vh - 16) {
    cardTop = Math.max(16, vh - cardHeightEstimate - 16);
  }
  if (hole && cardLeft < hole.left + hole.width && cardTop < hole.top + hole.height) {
    cardLeft = Math.min(vw - CARD_WIDTH - 16, hole.left + hole.width + CARD_GAP);
  }

  const arrowTop = hole
    ? Math.min(Math.max(hole.top + hole.height / 2 - cardTop - 8, 28), 160)
    : 40;

  const tour = (
    <div className="pointer-events-none fixed inset-0 z-[80]" aria-live="polite">
      <svg className="pointer-events-auto absolute inset-0 size-full" width="100%" height="100%">
        <defs>
          <mask id="save-list-tour-mask">
            <rect width="100%" height="100%" fill="white" />
            {hole && (
              <path
                d={roundedRectPath(hole.left, hole.top, hole.width, hole.height, current.radius)}
                fill="black"
              />
            )}
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="rgba(16,24,40,0.45)"
          mask="url(#save-list-tour-mask)"
        />
      </svg>

      {hole && (
        <div
          className="pointer-events-none absolute box-border border-2 border-g-blue-600"
          style={{
            top: hole.top,
            left: hole.left,
            width: hole.width,
            height: hole.height,
            borderRadius: current.radius === 999 ? 9999 : current.radius,
          }}
        />
      )}

      <div
        className="pointer-events-auto absolute"
        style={{ top: cardTop, left: cardLeft, width: CARD_WIDTH }}
        role="dialog"
        aria-labelledby="save-list-tour-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="absolute -left-2 size-4 rotate-45 bg-g-white"
          style={{ top: arrowTop }}
          aria-hidden
        />
        <div className="relative rounded-lg bg-g-white p-6 shadow-[0px_1px_2px_rgba(16,24,40,0.06),0px_1px_3px_rgba(16,24,40,0.1)]">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <p className="text-[12px] font-medium leading-[18px] text-g-gray-400">
                {current.stepLabel}
              </p>
              <h3
                id="save-list-tour-title"
                className="text-[20px] font-semibold leading-[30px] text-g-gray-700"
              >
                {current.title}
              </h3>
              <p className="text-[16px] font-normal leading-6 text-g-gray-600">
                {current.body}
              </p>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleNext}
                className="rounded-lg bg-g-blue-600 px-4 py-2.5 text-[14px] font-semibold leading-5 text-g-white hover:bg-g-blue-700 transition-colors"
              >
                {current.cta}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(tour, document.body);
}
