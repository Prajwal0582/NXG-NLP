import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { faCircleExclamation, faCircleInfo, faEllipsis, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useMcpAwareness } from "../../data/mcpAwareness";
import { NewChip, SparklesIcon } from "./McpIcons";

interface Props {
  /** No spotlight over modals, sheets, checkout or while another overlay is open. */
  suppressSpotlight: boolean;
}

interface Notice {
  id: string;
  group: "Today" | "Yesterday" | "Earlier";
  title: string;
  lines: string[];
  action: string;
  time: string;
  kind: "ok" | "error";
}

/** Existing export notifications (Figma Notification Center). */
const NOTICES: Notice[] = [
  { id: "n1", group: "Today", title: "Export ready", lines: ["Toronto leads · CSV · 1,101,779 records"], action: "Download now", time: "2m", kind: "ok" },
  {
    id: "n2",
    group: "Yesterday",
    title: "Export failed",
    lines: ["Toronto leads · XLSX · 1,101,779 records", "Timed out while generating the file"],
    action: "Retry export",
    time: "1d",
    kind: "error",
  },
  { id: "n3", group: "Earlier", title: "Export ready", lines: ["Intent data signals · CSV · 12,450 records"], action: "Download now", time: "14d", kind: "ok" },
];

export default function NotificationBell({ suppressSpotlight }: Props) {
  const mcp = useMcpAwareness();
  const [open, setOpen] = useState(false);
  const [spotlight, setSpotlight] = useState(false);
  const [readIds, setReadIds] = useState<string[]>(["n2", "n3"]);
  const ref = useRef<HTMLDivElement>(null);

  const showItem = mcp.isLive("A");
  const spotlightEligible = mcp.canShowOnce("B") && !suppressSpotlight;

  // B — first session: wait a beat after the page settles, then point at the bell.
  useEffect(() => {
    if (!spotlightEligible) {
      setSpotlight(false);
      return;
    }
    const t = window.setTimeout(() => setSpotlight(true), 1200);
    return () => window.clearTimeout(t);
  }, [spotlightEligible]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const t = window.setTimeout(() => document.addEventListener("mousedown", handler), 30);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("mousedown", handler);
    };
  }, [open]);

  const unread = NOTICES.filter((n) => !readIds.includes(n.id)).length + (showItem && !mcp.itemRead ? 1 : 0);

  function closeSpotlight(goToSettings: boolean) {
    setSpotlight(false);
    mcp.markSeen("B", "bell_spotlight");
    if (goToSettings) {
      mcp.cta("bell_spotlight");
      mcp.openSettings("mcp");
    }
  }

  function toggle() {
    if (spotlight) closeSpotlight(false);
    setOpen((o) => !o);
  }

  return (
    <div ref={ref} className="relative mr-3">
      <button
        type="button"
        onClick={toggle}
        aria-label={`Notifications${unread ? `, ${unread} unread` : ""}`}
        className={`relative flex size-10 items-center justify-center rounded-lg border text-[#475467] transition-colors ${
          open ? "border-[#D0D5DD] bg-[#F2F4F7]" : "border-[#EAECF0] bg-white hover:bg-[#F9FAFB]"
        } ${spotlight ? "ring-4 ring-[#B2DDFF]" : ""}`}
      >
        <FontAwesomeIcon icon={faBell} className="text-[16px]" />
        {unread > 0 && (
          <span className="absolute -right-1.5 -top-1.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#1D2939] px-1 text-[11px] font-semibold text-white">
            {unread}
          </span>
        )}
      </button>

      {/* ── B · Spotlight callout ─────────────────────────────── */}
      {spotlight && !open && (
        <div role="dialog" aria-label="New: Salesgenie in your AI assistant" className="absolute right-0 top-full z-50 mt-3 w-[340px] animate-fade-in">
          <span className="absolute -top-1.5 right-4 size-3 rotate-45 bg-[#1D2939]" />
          <div className="relative rounded-xl bg-[#1D2939] p-4 text-white shadow-xl">
            <div className="flex items-start gap-3">
              <p className="flex-1 text-base font-semibold leading-6">New: Salesgenie in your AI assistant</p>
              <button type="button" onClick={() => closeSpotlight(false)} aria-label="Close" className="text-white/80 hover:text-white">
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
            <p className="mt-2 text-sm leading-5 text-white/85">
              Ask Claude or ChatGPT for leads in plain language — Salesgenie does the search. Your setup link is in Settings ›
              Connections.
            </p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-white/60">~2 min setup</span>
              <button
                type="button"
                onClick={() => closeSpotlight(true)}
                className="rounded-lg bg-white px-3 py-1.5 text-sm font-medium text-[#1D2939] hover:bg-[#F2F4F7]"
              >
                Show me how
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Notification center ─────────────────────────────── */}
      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-[456px] overflow-hidden rounded-xl border border-[#EAECF0] bg-white shadow-xl animate-fade-in">
          <div className="flex items-center gap-2 border-b border-[#EAECF0] px-4 py-4">
            <p className="text-base text-[#1D2939]">Notifications</p>
            <FontAwesomeIcon icon={faCircleInfo} className="text-[13px] text-[#667085]" />
            {unread > 0 && (
              <span className="flex size-5 items-center justify-center rounded-full bg-[#1D2939] text-[11px] font-semibold text-white">{unread}</span>
            )}
          </div>

          <div className="max-h-[560px] overflow-y-auto">
            {/* A · pinned announcement */}
            {showItem && (
              <>
                <p className="border-b border-[#EAECF0] bg-[#F9FAFB] px-4 py-2 text-xs text-[#475467]">New in Salesgenie</p>
                <div className={`border-b border-[#EAECF0] px-4 py-4 ${mcp.itemRead ? "bg-white" : "bg-[#F5F8FF]"}`}>
                  <div className="flex gap-3">
                    <span className="relative mt-0.5 flex size-5 items-center justify-center">
                      <SparklesIcon className="size-4" />
                      {!mcp.itemRead && <span className="absolute -right-0.5 -top-0.5 size-1.5 rounded-full bg-[#016DEE]" />}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="flex-1 text-sm font-semibold text-[#1D2939]">Use Salesgenie inside Claude &amp; ChatGPT</p>
                        <NewChip />
                        <FontAwesomeIcon icon={faEllipsis} className="ml-2 text-[#475467]" />
                      </div>
                      <p className="mt-1 text-sm leading-5 text-[#344054]">
                        Search businesses, build lists and enrich records by just asking your AI assistant. Setup takes about 2
                        minutes.
                      </p>
                      <div className="mt-3 flex items-center gap-4">
                        <button
                          type="button"
                          onClick={() => {
                            mcp.markItemRead();
                            mcp.cta("notification_center");
                            setOpen(false);
                            mcp.openSettings("mcp");
                          }}
                          className="text-sm font-medium text-[#0086C9] hover:underline"
                        >
                          Set up connector
                        </button>
                        <button
                          type="button"
                          onClick={() => mcp.dismiss("notification_center")}
                          className="text-sm text-[#344054] hover:underline"
                        >
                          Dismiss
                        </button>
                        <span className="ml-auto text-xs text-[#667085]">Now</span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {(["Today", "Yesterday", "Earlier"] as const).map((group) => (
              <div key={group}>
                <div className="flex items-center border-b border-[#EAECF0] bg-[#F9FAFB] px-4 py-2">
                  <p className="flex-1 text-xs text-[#475467]">{group}</p>
                  {group === "Today" && (
                    <button
                      type="button"
                      onClick={() => {
                        setReadIds(NOTICES.map((n) => n.id));
                        if (showItem) mcp.markItemRead();
                      }}
                      className="text-xs font-medium text-[#0086C9] hover:underline"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>
                {NOTICES.filter((n) => n.group === group).map((n) => (
                  <div key={n.id} className={`flex gap-3 border-b border-[#EAECF0] px-4 py-4 ${readIds.includes(n.id) ? "" : "bg-[#F5F8FF]"}`}>
                    <FontAwesomeIcon
                      icon={n.kind === "ok" ? faCircleCheck : faCircleExclamation}
                      className={`mt-1 text-[13px] ${n.kind === "ok" ? "text-[#475467]" : "text-[#667085]"}`}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center">
                        <p className="flex-1 text-sm font-medium text-[#1D2939]">{n.title}</p>
                        <FontAwesomeIcon icon={faEllipsis} className="text-[#475467]" />
                      </div>
                      {n.lines.map((l) => (
                        <p key={l} className="text-sm leading-5 text-[#344054]">
                          {l}
                        </p>
                      ))}
                      <div className="mt-3 flex items-center">
                        <button
                          type="button"
                          onClick={() => setReadIds((ids) => [...new Set([...ids, n.id])])}
                          className="text-sm font-medium text-[#0086C9] hover:underline"
                        >
                          {n.action}
                        </button>
                        <span className="ml-auto text-xs text-[#667085]">{n.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="flex items-center px-4 py-3 text-xs">
            <p className="flex-1 text-[#667085]">Notifications are kept for 30 days</p>
            <button type="button" className="font-medium text-[#0086C9] hover:underline">
              View all exports
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
