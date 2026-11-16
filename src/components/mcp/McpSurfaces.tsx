import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faComment } from "@fortawesome/free-regular-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useMcpAwareness } from "../../data/mcpAwareness";
import { SparklesIcon } from "./McpIcons";

/* AI tokens (Ai Icon library "AI " collection) */
const AI_BLUE_50 = "#EFF1FE";
const AI_BLUE_100 = "#DCE1FC";

/**
 * C · Contextual banner. Lives on Saved lists (in production today, so engineering can ship it there first)
 * and on the NLP search home (prototype only until NLP ships; not in Figma yet).
 * Same per-user flag: dismissing either one retires both.
 */
const BANNER_COPY = {
  "saved-lists": {
    title: "Ask Claude or ChatGPT about your leads",
    body: "Connect the Salesgenie MCP connector and work with your saved lists in plain language — no exports needed.",
    source: "saved_lists_banner",
  },
  "search-home": {
    title: "Search for leads from Claude or ChatGPT",
    body: "Connect the Salesgenie MCP connector and run the same searches from your AI assistant — no switching tabs.",
    source: "search_home_banner",
  },
} as const;

export function McpSavedListsBanner({
  listName,
  placement = "saved-lists",
  className = "mb-4",
}: {
  listName?: string;
  placement?: keyof typeof BANNER_COPY;
  className?: string;
}) {
  const mcp = useMcpAwareness();
  if (!mcp.isLive("C")) return null;
  const copy = BANNER_COPY[placement];
  const prompt =
    placement === "saved-lists" ? `Which leads in ${listName ?? "my saved lists"} have 50+ employees?` : "Find dentists in Austin with 10+ employees";

  return (
    <div
      className={`${className} flex items-center gap-4 rounded-xl border px-5 py-4 animate-fade-in`}
      style={{ background: AI_BLUE_50, borderColor: AI_BLUE_100 }}
    >
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white">
        <SparklesIcon className="size-5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-base font-semibold text-[#1D2939]">{copy.title}</p>
        <p className="text-sm text-[#344054]">{copy.body}</p>
        <span className="mt-1.5 inline-flex items-center gap-1.5 rounded-full border border-[#E4E7EC] bg-white px-2.5 py-1 text-sm text-[#344054]">
          <FontAwesomeIcon icon={faComment} className="text-[11px] text-[#EE46BC]" />“{prompt}”
        </span>
      </div>
      <button type="button" onClick={() => mcp.dismiss(copy.source)} className="rounded-lg px-3 py-2 text-sm font-medium text-[#475467] hover:bg-white/60">
        Not now
      </button>
      <button
        type="button"
        onClick={() => {
          mcp.cta(copy.source);
          mcp.openSettings("mcp");
        }}
        className="rounded-lg bg-[#008DC3] px-3.5 py-2 text-sm font-medium text-white hover:bg-[#00729F]"
      >
        Set up connector
      </button>
      <button type="button" aria-label="Dismiss" onClick={() => mcp.dismiss(copy.source)} className="text-[#1D2939] hover:text-black">
        <FontAwesomeIcon icon={faXmark} />
      </button>
    </div>
  );
}

/** D · Export started toast. With D live and unseen it carries the one-time MCP tip. */
export function ExportStartedToast({ listName, records, onClose }: { listName: string; records: number; onClose: () => void }) {
  const mcp = useMcpAwareness();
  const [withTip] = useState(() => mcp.canShowOnce("D"));
  const logged = useRef(false);

  useEffect(() => {
    if (withTip && !logged.current) {
      logged.current = true;
      mcp.markSeen("D", "export_toast");
    }
    const t = window.setTimeout(onClose, withTip ? 9000 : 4000);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fixed bottom-6 left-1/2 z-[60] w-[620px] max-w-[calc(100vw-32px)] -translate-x-1/2 animate-fade-in">
      <div className="flex items-start gap-3 rounded-lg border border-[#ABEFC6] bg-[#ECFDF3] px-4 py-3 text-[#085D3A] shadow-lg">
        <FontAwesomeIcon icon={faCircleCheck} className="mt-1 text-[15px]" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold">
            Export started · {listName} · CSV · {records.toLocaleString()} records
          </p>
          {withTip && (
            <p className="text-sm">
              Tip: skip the file next time — ask Claude or ChatGPT to work with this list directly.{" "}
              <button
                type="button"
                onClick={() => {
                  mcp.cta("export_toast");
                  onClose();
                  mcp.openSettings("mcp");
                }}
                className="font-semibold underline-offset-2 hover:underline"
              >
                Learn how →
              </button>
            </p>
          )}
        </div>
        <button type="button" aria-label="Close" onClick={onClose} className="text-[#067647] hover:text-[#054F31]">
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
    </div>
  );
}

/** E · What's-new slide-in, bottom right, with a tiny chat preview of what the connector does. */
export function McpWhatsNewCard({ suppressed }: { suppressed: boolean }) {
  const mcp = useMcpAwareness();
  const [show, setShow] = useState(false);
  const eligible = mcp.isLive("E") && !suppressed;

  useEffect(() => {
    if (!eligible) {
      setShow(false);
      return;
    }
    const t = window.setTimeout(() => setShow(true), 1500);
    return () => window.clearTimeout(t);
  }, [eligible]);

  if (!show || !eligible) return null;

  return (
    <div
      role="dialog"
      aria-label="Salesgenie now works inside your AI assistant"
      className="fixed bottom-6 right-6 z-[60] w-[472px] max-w-[calc(100vw-48px)] slide-in-up"
    >
      {/* Figma "Coachmark – MCP connector": Coachmark component, no arrow / step count, shadow xl */}
      <div className="flex flex-col gap-6 rounded-lg border border-[#D0D5DD] bg-white p-6 shadow-[0_0_0_0_rgba(0,0,0,0.04),0_7px_15px_0_rgba(0,0,0,0.04),0_27px_27px_0_rgba(0,0,0,0.03),0_62px_37px_0_rgba(0,0,0,0.02),0_110px_44px_0_rgba(0,0,0,0.01)]">
        <div className="relative flex flex-col gap-4 overflow-hidden rounded-lg p-4">
          <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-[#00A0DC] to-[#4855B6] opacity-15" />
          <div className="relative flex justify-end">
            <button type="button" aria-label="Close" onClick={() => mcp.dismiss("whats_new")} className="text-[#475467] hover:text-[#1D2939]">
              <FontAwesomeIcon icon={faXmark} className="text-[20px]" />
            </button>
          </div>
          <div className="relative flex flex-col gap-2">
            <div className="flex justify-end">
              <p className="w-[250px] rounded-xl bg-[#016DEE] px-3 py-2 text-xs font-medium leading-[18px] text-white">
                Find 50 HVAC companies in Denver with 20+ employees
              </p>
            </div>
            <div className="w-[290px] rounded-xl border border-[#DAE1FF] bg-white px-3 py-2 text-xs leading-[18px] text-[#001A43]">
              <p className="mb-1 flex items-center gap-1.5 text-[11px] font-semibold text-[#F599ED]">
                <SparklesIcon className="size-3.5 text-[#475467]" gradient={false} /> Used Salesgenie
              </p>
              Found 1,284 matches. Here are the top 50 by employee count — want me to save them as a list?
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-xs leading-[18px] text-[#008DC3]">NEW · MCP CONNECTOR</p>
            <p className="text-xl font-semibold leading-[30px] text-[#344054]">Salesgenie now works inside your AI assistant</p>
            <p className="text-base leading-6 text-[#475467]">Connect Claude or ChatGPT once, then search, build lists and enrich records just by asking.</p>
          </div>
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => mcp.dismiss("whats_new")}
              className="rounded-lg px-4 py-2.5 text-sm font-medium leading-5 text-[#475467] hover:bg-[#F2F4F7]"
            >
              Dismiss
            </button>
            <button
              type="button"
              onClick={() => {
                mcp.cta("whats_new");
                mcp.openSettings("mcp");
              }}
              className="rounded-lg border border-[#008DC3] bg-[#008DC3] px-4 py-2.5 text-sm font-medium leading-5 text-white hover:bg-[#00729F]"
            >
              Set up connector
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
