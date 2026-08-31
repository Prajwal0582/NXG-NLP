import type { UserScenario } from "../types";

interface ScenarioCard {
  id: UserScenario;
  promptsOverride?: number;
  title: string;
  badge: "freemium" | "subscriber";
  bullets: string[];
}

const CARDS: ScenarioCard[] = [
  {
    id: "freemium-24",
    promptsOverride: 25,
    title: "New Freemium User",
    badge: "freemium",
    bullets: [
      "25 free prompts available",
      "Obfuscated lead details",
    ],
  },
  {
    id: "freemium-5",
    title: "Freemium — 5 Prompts Left",
    badge: "freemium",
    bullets: [
      "5 free prompts remaining",
      "Obfuscated lead details",
      "Low-balance counter & upgrade nudge",
    ],
  },
  {
    id: "freemium-0",
    title: "Freemium — Prompts Exhausted",
    badge: "freemium",
    bullets: [
      "No free prompts remaining",
      "Obfuscated lead details",
      "Upgrade panel replaces composer",
    ],
  },
  {
    id: "subscriber-free",
    promptsOverride: 25,
    title: "New Subscriber",
    badge: "subscriber",
    bullets: [
      "25 free prompts available",
      "Full, unmasked lead details",
    ],
  },
  {
    id: "subscriber-free",
    promptsOverride: 10,
    title: "Existing Subscriber",
    badge: "subscriber",
    bullets: [
      "10 free prompts available",
      "Full, unmasked lead details",
    ],
  },
  {
    id: "subscriber-credit",
    title: "Subscriber Using Credits",
    badge: "subscriber",
    bullets: [
      "48 credits available",
      "2 credits per AI prompt",
      "Full, unmasked lead details",
    ],
  },
  {
    id: "subscriber-credit-0",
    title: "Subscriber — Credits Exhausted",
    badge: "subscriber",
    bullets: [
      "No credits remaining",
      "No free prompts remaining",
      "Top-up or wait for renewal",
    ],
  },
];

interface Props {
  onSelectScenario: (s: UserScenario, promptsOverride?: number) => void;
}

function FreemiumBadge() {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#fef3c7] text-[#92400e] border border-[#fde68a]">
      Freemium
    </span>
  );
}

function SubscriberBadge() {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#eff8ff] text-[#0369a1] border border-[#b2ddff]">
      Subscriber
    </span>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 12 12" fill="none" className="size-3 shrink-0 mt-0.5" stroke="currentColor" strokeWidth="1.8">
      <path d="M2 6l3 3 5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SalesGenieLogo() {
  return (
    <div className="flex items-center gap-2.5">
      {/* Data Axle wordmark simplified */}
      <div className="flex items-center gap-1">
        <div className="size-7 rounded bg-[#016dee] flex items-center justify-center">
          <svg viewBox="0 0 20 20" fill="white" className="size-4">
            <path d="M10 2L3 7v6l7 5 7-5V7L10 2zm0 2.5L15.5 8v4L10 15.5 4.5 12V8L10 4.5z" />
          </svg>
        </div>
        <span className="text-[15px] font-bold text-[#1d2939] tracking-tight">SalesGenie</span>
      </div>
      <span className="text-[#d0d5dd] text-lg font-light">|</span>
      <span className="text-[13px] text-[#667085] font-normal">by Data Axle</span>
    </div>
  );
}

export default function ScenarioLaunchView({ onSelectScenario }: Props) {
  const freemiumCards = CARDS.filter((c) => c.badge === "freemium");
  const subscriberCards = CARDS.filter((c) => c.badge === "subscriber");

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header bar */}
      <div className="border-b border-[#eaecf0] px-8 py-4">
        <SalesGenieLogo />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center px-8 py-12">
        <div className="w-full max-w-[960px]">

          {/* Page heading */}
          <div className="mb-10 text-center">
            <h1 className="text-2xl font-bold text-[#1d2939] mb-2">
              SalesGenie Smart Search
            </h1>
            <p className="text-[#667085] text-sm">
              Choose a scenario to explore the prototype
            </p>
            <div className="mt-3 inline-flex items-center gap-2 bg-[#f9fafb] border border-[#eaecf0] rounded-full px-4 py-1.5 text-xs text-[#667085]">
              <svg viewBox="0 0 14 14" fill="none" className="size-3.5 text-[#98a2b3]" stroke="currentColor" strokeWidth="1.5">
                <circle cx="7" cy="7" r="5.5" />
                <path d="M7 6v4M7 4.5h.01" strokeLinecap="round" />
              </svg>
              Prototype scenario launcher — not a production feature
            </div>
          </div>

          {/* Freemium section */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-xs font-semibold text-[#667085] uppercase tracking-widest">Freemium</h2>
              <div className="flex-1 h-px bg-[#eaecf0]" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {freemiumCards.map((card, i) => (
                <ScenarioCardItem
                  key={i}
                  card={card}
                  onSelect={() => onSelectScenario(card.id, card.promptsOverride)}
                />
              ))}
            </div>
          </div>

          {/* Subscriber section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-xs font-semibold text-[#667085] uppercase tracking-widest">Subscriber</h2>
              <div className="flex-1 h-px bg-[#eaecf0]" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {subscriberCards.map((card, i) => (
                <ScenarioCardItem
                  key={i}
                  card={card}
                  onSelect={() => onSelectScenario(card.id, card.promptsOverride)}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function ScenarioCardItem({
  card,
  onSelect,
}: {
  card: ScenarioCard;
  onSelect: () => void;
}) {
  const isSub = card.badge === "subscriber";

  return (
    <button
      onClick={onSelect}
      className={`group text-left w-full rounded-xl border p-5 transition-all hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#016dee]/30 ${
        isSub
          ? "border-[#b2ddff] bg-white hover:border-[#016dee] hover:bg-[#f8fbff]"
          : "border-[#e4e7ec] bg-white hover:border-[#d0d5dd] hover:bg-[#f9fafb]"
      }`}
    >
      {/* Badge */}
      <div className="mb-3">
        {isSub ? <SubscriberBadge /> : <FreemiumBadge />}
      </div>

      {/* Title */}
      <h3 className="text-sm font-semibold text-[#1d2939] mb-3 leading-snug">
        {card.title}
      </h3>

      {/* Bullets */}
      <ul className="space-y-1.5 mb-5">
        {card.bullets.map((b) => (
          <li key={b} className={`flex items-start gap-1.5 text-xs ${isSub ? "text-[#0369a1]" : "text-[#475467]"}`}>
            <CheckIcon />
            {b}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className={`text-xs font-semibold flex items-center gap-1 transition-colors ${
        isSub ? "text-[#016dee] group-hover:text-[#0052cc]" : "text-[#344054] group-hover:text-[#1d2939]"
      }`}>
        Enter scenario
        <svg viewBox="0 0 14 14" fill="none" className="size-3.5" stroke="currentColor" strokeWidth="1.8">
          <path d="M3 7h8M8 4l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </button>
  );
}
