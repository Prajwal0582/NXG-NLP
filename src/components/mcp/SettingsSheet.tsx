import { useEffect, useState, type ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faCircleUser, faCopy, faCreditCard, faFileLines, faCalendar, faLightbulb } from "@fortawesome/free-regular-svg-icons";
import { faBan, faCheck, faCircleInfo, faCode, faCoins, faFire, faLink, faPhone, faTags, faUsers, faXmark } from "@fortawesome/free-solid-svg-icons";
import { MCP_SAMPLE_PROMPT, MCP_URL_PLACEHOLDER, useMcpAwareness } from "../../data/mcpAwareness";
import { NewChip, SparklesIcon } from "./McpIcons";

interface NavItem {
  id: string;
  label: string;
  icon: IconDefinition | "sparkles";
}

const ACCOUNT: NavItem[] = [
  { id: "general", label: "General", icon: faCircleUser },
  { id: "users", label: "Users", icon: faUsers },
  { id: "credits", label: "Credits", icon: faCoins },
  { id: "subscription", label: "Subscription", icon: faCreditCard },
  { id: "lead-status", label: "Lead status", icon: faFire },
  { id: "tags", label: "Tags manager", icon: faTags },
  { id: "reports", label: "Reports", icon: faFileLines },
  { id: "scheduled", label: "Scheduled exports", icon: faCalendar },
  { id: "suppressed", label: "Suppressed list", icon: faBan },
  { id: "phones", label: "Consumer phones", icon: faPhone },
];
const CONNECTIONS: NavItem[] = [
  { id: "crm", label: "CRM integrations", icon: faLink },
  { id: "mcp", label: "MCP connector", icon: "sparkles" },
  { id: "webhooks", label: "API webhooks", icon: faCode },
];

const STEPS: Record<"claude" | "chatgpt", ReactNode[]> = {
  claude: [
    <>In Claude, click your name (bottom left), then <b className="font-medium">Settings</b>.</>,
    <>Click <b className="font-medium">Connectors</b> in the left menu.</>,
    <>Click <b className="font-medium">Add</b>, then <b className="font-medium">Add custom connector</b>.</>,
    <>Name it <b className="font-medium">Salesgenie</b> and paste your Salesgenie MCP URL. Click <b className="font-medium">Continue</b>.</>,
    <>Leave the sign-in settings as they are and click <b className="font-medium">Add</b>.</>,
    <>Click <b className="font-medium">Connect</b>, then sign in with your Salesgenie username and password.</>,
    <>Open a new chat and try the sample prompt below.</>,
  ],
  chatgpt: [
    <>In ChatGPT, open <b className="font-medium">Settings</b> › <b className="font-medium">Apps &amp; Connectors</b>.</>,
    <>Turn on <b className="font-medium">Developer mode</b> under Advanced settings.</>,
    <>Click <b className="font-medium">Create</b> and name the connector <b className="font-medium">Salesgenie</b>.</>,
    <>Paste your Salesgenie MCP URL and choose <b className="font-medium">OAuth</b> for authentication.</>,
    <>Click <b className="font-medium">Create</b>, then sign in with your Salesgenie username and password.</>,
    <>In a new chat, add Salesgenie from the <b className="font-medium">+</b> menu and try the sample prompt below.</>,
  ],
};

function CopyButton({ text, primary }: { text: string; primary?: boolean }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard?.writeText(text).catch(() => undefined);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1600);
      }}
      className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
        primary ? "bg-[#008DC3] text-white hover:bg-[#00729F]" : "border border-[#D0D5DD] bg-white text-[#344054] hover:bg-[#F9FAFB]"
      }`}
    >
      <FontAwesomeIcon icon={copied ? faCheck : faCopy} className="text-[12px]" />
      {copied ? "Copied" : primary ? "Copy URL" : "Copy prompt"}
    </button>
  );
}

function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-xl border border-[#EAECF0] bg-white">
      <h3 className="border-b border-[#EAECF0] px-5 py-4 text-base font-medium text-[#1D2939]">{title}</h3>
      <div className="px-5 py-5">{children}</div>
    </section>
  );
}

/** F · Settings › Connections › MCP connector — the PRD guidance page every CTA lands on. */
function McpConnectorPage() {
  const [tab, setTab] = useState<"claude" | "chatgpt">("claude");
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-[#1D2939]">Connect Salesgenie to your AI tools</h2>
        <p className="mt-1 text-base text-[#475467]">Use Salesgenie in your AI assistant to search, refine, purchase, and enrich business and consumer data.</p>
      </div>

      <Card title="Your Salesgenie MCP URL">
        <div className="flex items-center gap-3 rounded-lg border border-[#D0D5DD] bg-[#F9FAFB] py-2.5 pl-4 pr-2.5">
          <code className="flex-1 font-mono text-sm text-[#344054]">{MCP_URL_PLACEHOLDER}</code>
          <CopyButton text={MCP_URL_PLACEHOLDER} primary />
        </div>
        <p className="mt-3 text-xs text-[#475467]">You’ll paste this into your AI tool. Steps for each tool are below.</p>
      </Card>

      <section className="rounded-xl border border-[#EAECF0] bg-white">
        <h3 className="border-b border-[#EAECF0] px-5 py-4 text-base font-medium text-[#1D2939]">Set up your AI tool</h3>
        <div className="flex gap-4 border-b border-[#EAECF0] px-5">
          {(["claude", "chatgpt"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`-mb-px border-b-2 py-3 text-base ${tab === t ? "border-[#05587C] text-[#05587C]" : "border-transparent text-[#98A2B3] hover:text-[#667085]"}`}
            >
              {t === "claude" ? "Claude" : "ChatGPT"}
            </button>
          ))}
        </div>
        <div className="px-5 py-5">
          <ol className="space-y-3">
            {STEPS[tab].map((s, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-[#344054]">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#F2F4F7] text-xs text-[#475467]">{i + 1}</span>
                <span className="pt-0.5">{s}</span>
              </li>
            ))}
          </ol>
          {tab === "claude" && (
            <div className="mt-4 rounded-lg border border-[#B9E6FE] bg-[#F0F9FF] px-4 py-3 text-xs text-[#026AA2]">
              <p className="flex items-center gap-1.5 font-medium">
                <FontAwesomeIcon icon={faLightbulb} /> Tip
              </p>
              <p className="mt-1">Under Tool permissions, set search tools to “Always allow” so Claude doesn’t ask before every search.</p>
            </div>
          )}
          <p className="mt-4 text-xs text-[#475467]">{tab === "claude" ? "Works on free and paid Claude plans." : "Needs a ChatGPT plan that supports custom connectors."}</p>
          <div className="mt-4 rounded-lg border border-[#D1E0FF] bg-[#F5F8FF] px-4 py-3 text-xs text-[#004EEB]">
            <p className="flex items-center gap-1.5 font-medium">
              <FontAwesomeIcon icon={faCircleInfo} /> Data Axle sign-in
            </p>
            <p className="mt-1">You’ll see a Data Axle sign-in page. Use the same username and password you use for Salesgenie.</p>
          </div>
        </div>
      </section>

      <Card title="How it works">
        <ul className="list-disc space-y-2 pl-5 text-sm text-[#344054]">
          <li>Connecting is free.</li>
          <li>Exporting search results uses credits from your Salesgenie subscription.</li>
          <li>Enriching your own records uses credits directly from your AI tool chat.</li>
        </ul>
      </Card>

      <Card title="Try this first">
        <div className="flex items-center gap-3 rounded-lg border border-[#D0D5DD] bg-[#F9FAFB] py-2.5 pl-4 pr-2.5">
          <p className="flex-1 text-sm text-[#1D2939]">{MCP_SAMPLE_PROMPT}</p>
          <CopyButton text={MCP_SAMPLE_PROMPT} />
        </div>
        <p className="mt-3 text-xs text-[#475467]">Results can take up to a minute.</p>
      </Card>

      <p className="pb-6 text-sm text-[#344054]">
        Trouble connecting? Contact us at{" "}
        <a href="mailto:genie@data-axle.com" className="text-[#0086C9] hover:underline">
          genie@data-axle.com
        </a>{" "}
        or call{" "}
        <a href="tel:8668726917" className="text-[#0086C9] hover:underline">
          866.872.6917
        </a>
        .
      </p>
    </div>
  );
}

/** Settings slides up over the app (same sheet as Pricing). Only MCP connector is built out here. */
export default function SettingsSheet() {
  const mcp = useMcpAwareness();
  const [closing, setClosing] = useState(false);
  const [section, setSection] = useState(mcp.settingsSection);
  // "New" chip stays for the visit that retires it; gone the next time Settings opens.
  const [chipLive] = useState(() => mcp.isLive("F"));

  // Opening the MCP connector page = engaged → every awareness surface retires (PRD: never show again).
  useEffect(() => {
    if (section === "mcp") mcp.engage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section]);

  function close() {
    if (closing) return;
    setClosing(true);
    window.setTimeout(() => {
      setClosing(false);
      mcp.closeSettings();
    }, 280);
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  });

  const all = [...ACCOUNT, ...CONNECTIONS];
  const current = all.find((n) => n.id === section) ?? CONNECTIONS[1];

  function NavGroup({ title, items }: { title: string; items: NavItem[] }) {
    return (
      <div>
        <p className="mb-2 px-0 text-xs font-medium text-[#1D2939]">{title}</p>
        <div className="space-y-0.5">
          {items.map((n) => (
            <button
              key={n.id}
              type="button"
              onClick={() => setSection(n.id)}
              className={`flex w-full items-center gap-2.5 rounded-lg px-4 py-2.5 text-left text-sm ${
                section === n.id ? "bg-[#F2F4F7] font-medium text-[#1D2939]" : "text-[#344054] hover:bg-[#F9FAFB]"
              }`}
            >
              {n.icon === "sparkles" ? (
                <SparklesIcon className="size-4 text-[#475467]" gradient={false} />
              ) : (
                <FontAwesomeIcon icon={n.icon} className="w-4 text-[14px] text-[#475467]" />
              )}
              <span className="flex-1">{n.label}</span>
              {n.id === "mcp" && chipLive && <NewChip />}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[85]">
      <div aria-hidden onClick={close} className={`absolute inset-0 bg-[#101828]/50 ${closing ? "drawer-backdrop-out" : "drawer-backdrop-in"}`} />
      <div
        role="dialog"
        aria-label="Settings"
        className={`absolute inset-x-3 bottom-0 top-3 flex flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:inset-x-6 ${
          closing ? "drawer-sheet-out" : "drawer-sheet-in"
        }`}
      >
        <div className="mx-8 flex items-center border-b border-[#EAECF0] py-6">
          <h1 className="flex-1 text-xl text-[#1D2939]">Settings</h1>
          <button type="button" onClick={close} aria-label="Close" className="flex size-9 items-center justify-center rounded-lg text-[#475467] hover:bg-[#F2F4F7]">
            <FontAwesomeIcon icon={faXmark} className="text-[18px]" />
          </button>
        </div>
        <div className="flex min-h-0 flex-1">
          <nav className="w-[232px] shrink-0 space-y-6 overflow-y-auto border-r border-[#EAECF0] py-6 pl-8 pr-4">
            <NavGroup title="Account" items={ACCOUNT} />
            <NavGroup title="Connections" items={CONNECTIONS} />
          </nav>
          <div className="min-w-0 flex-1 overflow-y-auto px-10 py-6">
            {section === "mcp" ? (
              <div className="max-w-[1080px]">
                <McpConnectorPage />
              </div>
            ) : (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <p className="text-lg font-medium text-[#1D2939]">{current.label}</p>
                <p className="mt-1 text-sm text-[#667085]">Not part of this prototype. Open Connections › MCP connector.</p>
                <button type="button" onClick={() => setSection("mcp")} className="mt-4 text-sm font-medium text-[#0086C9] hover:underline">
                  Go to MCP connector
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
