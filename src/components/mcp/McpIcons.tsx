/** AI sparkle (stands in for Font Awesome Pro "sparkles"; AI gradient from the Ai Icon library). */
export function SparklesIcon({ className = "size-4", gradient = true }: { className?: string; gradient?: boolean }) {
  const fill = gradient ? "url(#mcp-ai-grad)" : "currentColor";
  return (
    <svg viewBox="0 0 20 20" fill="none" className={`shrink-0 ${className}`} aria-hidden>
      {gradient && (
        <defs>
          <linearGradient id="mcp-ai-grad" x1="2" y1="1" x2="18" y2="19" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F599ED" />
            <stop offset="0.5" stopColor="#016DEE" />
            <stop offset="1" stopColor="#2DD4D9" />
          </linearGradient>
        </defs>
      )}
      <path d="M8 3l1.6 4.4L14 9l-4.4 1.6L8 15l-1.6-4.4L2 9l4.4-1.6L8 3z" fill={fill} />
      <path d="M15 1.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7.7-1.8zM15.5 13l.6 1.4 1.4.6-1.4.6-.6 1.4-.6-1.4-1.4-.6 1.4-.6.6-1.4z" fill={fill} />
    </svg>
  );
}

export function NewChip({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full bg-[#ECFDF3] px-1.5 py-px text-[11px] font-medium leading-4 text-[#067647] ${className}`}
    >
      New
    </span>
  );
}
