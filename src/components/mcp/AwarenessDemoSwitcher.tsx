import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp, faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { PRESETS, useMcpAwareness } from "../../data/mcpAwareness";
import { SparklesIcon } from "./McpIcons";

const STATUS_STYLE = {
  active: "bg-[#EFF8FF] text-[#175CD3] border-[#B2DDFF]",
  dismissed: "bg-[#FEF3F2] text-[#B42318] border-[#FECDCA]",
  engaged: "bg-[#ECFDF3] text-[#067647] border-[#ABEFC6]",
};

/** Prototype-only control (not product UI): pick an awareness concept and reset the per-user flag. */
export default function AwarenessDemoSwitcher() {
  const mcp = useMcpAwareness();
  const [open, setOpen] = useState(true);
  const preset = PRESETS.find((p) => p.id === mcp.preset)!;

  return (
    <div className="fixed bottom-4 left-4 z-[70] w-[300px] rounded-xl border border-[#D0D5DD] bg-white text-[#1D2939] shadow-2xl">
      <button type="button" onClick={() => setOpen((o) => !o)} className="flex w-full items-center gap-2 px-3 py-2.5 text-left">
        <SparklesIcon className="size-4" />
        <span className="flex-1 text-xs font-semibold">MCP awareness · prototype</span>
        <span className={`rounded-full border px-2 py-px text-[11px] font-medium ${STATUS_STYLE[mcp.status]}`}>{mcp.status}</span>
        <FontAwesomeIcon icon={open ? faChevronDown : faChevronUp} className="text-[11px] text-[#667085]" />
      </button>

      {open && (
        <div className="border-t border-[#EAECF0] px-3 pb-3 pt-2">
          <label className="text-[11px] font-medium text-[#667085]" htmlFor="mcp-preset">
            Concept
          </label>
          <select
            id="mcp-preset"
            value={mcp.preset}
            onChange={(e) => mcp.setPreset(e.target.value as typeof mcp.preset)}
            className="mt-1 h-8 w-full rounded-md border border-[#D0D5DD] bg-white px-2 text-xs focus:border-[#008DC3] focus:outline-none"
          >
            {PRESETS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))}
          </select>
          <p className="mt-1.5 text-[11px] leading-4 text-[#475467]">{preset.hint}</p>

          <div className="mt-2 rounded-md bg-[#F9FAFB] px-2 py-1.5 text-[11px] leading-4 text-[#475467]">
            Dismiss on any surface → <b>dismissed</b>. Opening the MCP connector page → <b>engaged</b>. Either retires every surface.
          </div>

          {mcp.events.length > 0 && (
            <ul className="mt-2 space-y-0.5 font-mono text-[10px] text-[#667085]">
              {mcp.events.slice(0, 4).map((e, i) => (
                <li key={`${e.at}-${e.name}-${i}`} className="truncate">
                  {e.name}
                  {e.source ? ` · source=${e.source}` : ""}
                </li>
              ))}
            </ul>
          )}

          <button
            type="button"
            onClick={mcp.reset}
            className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-md border border-[#D0D5DD] py-1.5 text-xs font-medium text-[#344054] hover:bg-[#F9FAFB]"
          >
            <FontAwesomeIcon icon={faRotateLeft} className="text-[11px]" /> Reset user (show again)
          </button>
        </div>
      )}
    </div>
  );
}
