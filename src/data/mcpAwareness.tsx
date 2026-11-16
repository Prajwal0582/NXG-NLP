import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

/**
 * MCP connector in-app awareness (Figma "MCP connector – In-app awareness concepts").
 *
 * One per-user flag decides everything, the way the PRD asks:
 *   active    → eligible user, hasn't acted yet; surfaces may show
 *   dismissed → user said no on any surface; every surface retires for good
 *   engaged   → user opened Settings › Connections › MCP connector; every surface retires
 *
 * In the product this flag lives on the server (works across devices). The prototype keeps it in
 * localStorage so it survives reloads, and the demo switcher can reset it.
 */

export type McpConcept = "A" | "B" | "C" | "D" | "E" | "F";
export type McpPreset = "launch" | McpConcept;
export type McpStatus = "active" | "dismissed" | "engaged";
/** Where a CTA / dismiss came from (the PRD's source parameter for metrics). */
export type McpSource = "notification_center" | "bell_spotlight" | "saved_lists_banner" | "search_home_banner" | "export_toast" | "whats_new" | "settings_nav";

export const PRESETS: { id: McpPreset; label: string; hint: string }[] = [
  { id: "launch", label: "Launch set · A + B", hint: "Recommended. Bell spotlight once, pinned item stays in the bell." },
  { id: "A", label: "A · Notification center", hint: "Pinned “New in Salesgenie” item. Open the bell." },
  { id: "B", label: "B · Bell spotlight", hint: "One-time callout on the bell (leaves A behind)." },
  { id: "C", label: "C · Contextual banner", hint: "Saved lists (ships first) + NLP search home. Dismiss one → both retire." },
  { id: "D", label: "D · Export toast tip", hint: "Subscriber: open a saved list › Export › Review export." },
  { id: "E", label: "E · What’s new slide-in", hint: "Bottom-right coach mark after a moment on Search or Saved lists." },
  { id: "F", label: "F · Landing + New chip", hint: "Settings › Connections › MCP connector." },
];

/** Concepts that are live for each preset. F (the landing page + New chip) is always on. */
const PRESET_CONCEPTS: Record<McpPreset, McpConcept[]> = {
  launch: ["A", "B", "F"],
  A: ["A", "F"],
  B: ["A", "B", "F"],
  C: ["C", "F"],
  D: ["D", "F"],
  E: ["E", "F"],
  F: ["F"],
};

interface Persisted {
  preset: McpPreset;
  status: McpStatus;
  /** One-time surfaces that have been seen (B spotlight, D toast tip, E slide-in). */
  seen: McpConcept[];
  /** Notification item read (bell badge clears). */
  itemRead: boolean;
}

const KEY = "sg-mcp-awareness-v1";
const DEFAULT: Persisted = { preset: "launch", status: "active", seen: [], itemRead: false };

function load(): Persisted {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...DEFAULT, ...JSON.parse(raw) };
  } catch {
    /* storage blocked → defaults */
  }
  return DEFAULT;
}

export interface McpEvent {
  at: number;
  name: string;
  source?: McpSource;
}

interface McpAwareness {
  preset: McpPreset;
  status: McpStatus;
  itemRead: boolean;
  events: McpEvent[];
  /** Is this concept part of the preset and still allowed to show? */
  isLive: (c: McpConcept) => boolean;
  /** Live and the one-time surface hasn't been seen yet. */
  canShowOnce: (c: McpConcept) => boolean;
  markSeen: (c: McpConcept, source?: McpSource) => void;
  markItemRead: () => void;
  dismiss: (source: McpSource) => void;
  /** CTA → opens Settings › MCP connector (caller opens the sheet). */
  cta: (source: McpSource) => void;
  engage: () => void;
  setPreset: (p: McpPreset) => void;
  reset: () => void;
  /** Settings sheet (opened on the MCP connector page or another section). */
  settingsOpen: boolean;
  settingsSection: string;
  openSettings: (section?: string) => void;
  closeSettings: () => void;
}

const Ctx = createContext<McpAwareness | null>(null);

export function McpAwarenessProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Persisted>(load);
  const [events, setEvents] = useState<McpEvent[]>([]);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settingsSection, setSettingsSection] = useState("mcp");

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state]);

  const log = useCallback((name: string, source?: McpSource) => {
    setEvents((e) => [{ at: Date.now(), name, source }, ...e].slice(0, 6));
  }, []);

  const isLive = useCallback(
    (c: McpConcept) => state.status === "active" && PRESET_CONCEPTS[state.preset].includes(c),
    [state.preset, state.status],
  );

  const engage = useCallback(() => {
    setState((s) => (s.status === "engaged" ? s : { ...s, status: "engaged" }));
  }, []);

  const value = useMemo<McpAwareness>(
    () => ({
      preset: state.preset,
      status: state.status,
      itemRead: state.itemRead,
      events,
      isLive,
      canShowOnce: (c) => isLive(c) && !state.seen.includes(c),
      markSeen: (c, source) => {
        setState((s) => (s.seen.includes(c) ? s : { ...s, seen: [...s.seen, c] }));
        log(`seen_${c}`, source);
      },
      markItemRead: () => setState((s) => ({ ...s, itemRead: true })),
      dismiss: (source) => {
        setState((s) => ({ ...s, status: "dismissed" }));
        log("mcp_awareness_dismissed", source);
      },
      cta: (source) => {
        log("mcp_awareness_cta", source);
      },
      engage,
      setPreset: (p) => {
        setState({ ...DEFAULT, preset: p });
        setEvents([]);
      },
      reset: () => {
        setState((s) => ({ ...DEFAULT, preset: s.preset }));
        setEvents([]);
      },
      settingsOpen,
      settingsSection,
      openSettings: (section = "mcp") => {
        setSettingsSection(section);
        setSettingsOpen(true);
      },
      closeSettings: () => setSettingsOpen(false),
    }),
    [state, events, isLive, log, engage, settingsOpen, settingsSection],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useMcpAwareness() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useMcpAwareness needs McpAwarenessProvider");
  return v;
}

/** Sample prompt shown in the PRD guidance page. */
export const MCP_SAMPLE_PROMPT = "Use Salesgenie to provide a count of businesses in Seattle 98109 with fewer than 10 employees.";
export const MCP_URL_PLACEHOLDER = "[Salesgenie MCP Server URL]";
