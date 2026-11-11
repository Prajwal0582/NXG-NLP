import type { ReactNode } from "react";

interface PageBannerProps {
  title: string;
  subtitle?: ReactNode;
  /** Omit for status-only banners (e.g. "Your subscription is being activated…"). */
  cta?: { label: string; onClick: () => void };
}

/** Dark bottom banner on Search for leads, saved lists and Export configuration (Figma "Footer"). */
export default function PageBanner({ title, subtitle, cta }: PageBannerProps) {
  return (
    <div className="relative z-20 shrink-0 overflow-hidden bg-[#344054] px-6 py-5">
      {/* Diamond lattice pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(45deg, rgba(255,255,255,0.07) 25%, transparent 25%),
            linear-gradient(-45deg, rgba(255,255,255,0.07) 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, rgba(255,255,255,0.07) 75%),
            linear-gradient(-45deg, transparent 75%, rgba(255,255,255,0.07) 75%)
          `,
          backgroundSize: "24px 24px",
          backgroundPosition: "0 0, 0 12px, 12px -12px, -12px 0",
        }}
      />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#1D2939]/80 to-transparent" />
      <div className="pointer-events-none absolute -left-6 top-1/2 size-28 -translate-y-1/2 rounded-full bg-[#F79009]/30 blur-3xl" />
      <div className="pointer-events-none absolute right-[28%] top-0 size-24 rounded-full bg-[#008DC3]/25 blur-3xl" />

      <div className="relative flex w-full flex-col items-center justify-center gap-4 text-center sm:flex-row sm:text-left">
        <div className={`min-w-0 max-w-[720px] ${cta ? "" : "sm:text-center"}`}>
          <p className="text-lg font-semibold leading-7 text-white">{title}</p>
          {subtitle ? <p className="mt-1 text-sm font-normal leading-5 text-white/75">{subtitle}</p> : null}
        </div>
        {cta ? (
          <button
            type="button"
            onClick={cta.onClick}
            className="shrink-0 rounded-lg bg-[#F2F4F7] px-4 py-2.5 text-sm font-medium leading-5 text-[#1D2939] hover:bg-white"
          >
            {cta.label}
          </button>
        ) : null}
      </div>
    </div>
  );
}

/** Support line used by the "being activated / processed" banners. */
export function SupportContact() {
  return (
    <>
      For support, contact us at{" "}
      <a href="tel:8668726917" className="text-[#7CD4FD] hover:underline">
        866.872.6917
      </a>{" "}
      or{" "}
      <a href="mailto:jeannie.house@data-axle.com" className="text-[#7CD4FD] hover:underline">
        jeannie.house@data-axle.com
      </a>
    </>
  );
}
