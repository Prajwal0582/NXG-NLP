import type { ActiveTab, View } from "../types";

interface SidebarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  currentView: View;
  onNavigate: (view: View) => void;
  isSubscriber: boolean;
  onPlans: () => void;
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function SavedListsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

function EmailCampaignIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M16 12v1.5a2.5 2.5 0 005 0V12a9 9 0 10-5.26 8.18" />
    </svg>
  );
}

function DirectMailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
      <path d="M3 7l9 6 9-6" />
      <path d="M15 19l4-4M9 19l-4-4" />
    </svg>
  );
}

function TasksIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M8 2v4M16 2v4" />
      <path d="M3 10h18" />
    </svg>
  );
}

function GearIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  );
}

function SupportIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 18v-6a9 9 0 0118 0v6" />
      <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z" />
    </svg>
  );
}

function InfoBadge() {
  return (
    <span className="ml-auto flex items-center justify-center size-5 rounded-full border border-white/30 text-white/50">
      <svg viewBox="0 0 14 14" fill="none" className="size-3" stroke="currentColor" strokeWidth="1.5">
        <circle cx="7" cy="7" r="5.5" />
        <path d="M7 6.5v3.5M7 4.5h.01" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function DiamondBadge() {
  return (
    <span className="ml-auto flex items-center justify-center size-5 text-white/50">
      <svg viewBox="0 0 14 14" fill="none" className="size-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 1L13 7L7 13L1 7L7 1Z" />
      </svg>
    </span>
  );
}

interface NavItem {
  id: string;
  label: string;
  icon: () => JSX.Element;
  view: View | null;
  badge?: "info" | "diamond";
}

const navItems: NavItem[] = [
  { id: "search",      label: "Search",          icon: SearchIcon,        view: "landing" as View },
  { id: "saved-lists", label: "Saved lists",      icon: SavedListsIcon,   view: "saved-lists" as View },
  { id: "email",       label: "Email campaigns",  icon: EmailCampaignIcon, view: null, badge: "info" },
  { id: "direct-mail", label: "Direct mail",      icon: DirectMailIcon,    view: null, badge: "info" },
  { id: "tasks",       label: "Tasks",            icon: TasksIcon,         view: null, badge: "diamond" },
  { id: "settings",    label: "Settings",         icon: GearIcon,          view: null },
  { id: "support",     label: "Support",          icon: SupportIcon,       view: null },
];

export default function Sidebar({ activeTab, onTabChange, currentView, onNavigate, isSubscriber, onPlans }: SidebarProps) {
  const isSearchActive = currentView === "landing" || currentView === "processing" || currentView === "results" || currentView === "manual-search" || currentView === "plans";
  const isListActive = currentView === "saved-lists";

  return (
    <div className="bg-[#1d2939] flex flex-col h-full w-[256px] shrink-0">

      {/* Logo — data axle badge + salesgenie wordmark */}
      <div className="flex items-center gap-2 px-4 h-[64px]">
        <div className="bg-[#344054] rounded-md px-2 py-1 flex items-center">
          <span className="text-white text-[11px] font-semibold tracking-wide leading-none">data<br/>axle</span>
        </div>
        <span className="text-white text-[18px] font-bold tracking-tight leading-none">salesgenie<sup className="text-white/70 text-[10px] font-normal relative -top-1.5">°</sup></span>
      </div>

      {/* Business / Consumer toggle */}
      <div className="px-4 py-3">
        <div className="bg-[#344054] flex items-center gap-0.5 p-0.5 rounded-full w-full">
          <button
            onClick={() => onTabChange("business")}
            className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-colors ${
              activeTab === "business" ? "bg-white text-[#1d2939]" : "text-white hover:bg-white/10"
            }`}
          >
            Business
          </button>
          <button
            onClick={() => onTabChange("consumer")}
            className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-colors ${
              activeTab === "consumer" ? "bg-white text-[#1d2939]" : "text-white hover:bg-white/10"
            }`}
          >
            Consumer
          </button>
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-4 py-2 flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive =
            (item.id === "search" && isSearchActive) ||
            (item.id === "saved-lists" && isListActive);
          return (
            <button
              key={item.id}
              onClick={() => item.view && onNavigate(item.view)}
              className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-left transition-colors ${
                isActive
                  ? "bg-[#344054] text-white"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              }`}
            >
              <item.icon />
              <span className="text-[15px]">{item.label}</span>
              {item.badge === "info" && <InfoBadge />}
              {item.badge === "diamond" && <DiamondBadge />}
            </button>
          );
        })}
      </nav>

      {/* Freemium promo panel — hidden for subscribers */}
      {!isSubscriber && (
        <div className="px-4 pb-3">
          <div className="bg-[#475467] rounded-lg border border-[#98a2b3] p-4">
            <p className="text-white text-sm font-semibold mb-1">Get started today!</p>
            <p className="text-white text-xs leading-relaxed mb-3">
              {"Whether you're all in or just need a list, we've got flexible options to help you start faster."}
            </p>
            <button onClick={onPlans} className="w-full bg-[#008dc3] text-white text-sm font-medium py-1.5 rounded border border-[#008dc3] hover:bg-[#007aab] transition-colors">
              See pricing
            </button>
          </div>
        </div>
      )}

      {/* Support contact */}
      <div className="px-4 pb-3 text-center">
        <p className="text-white/70 text-xs leading-relaxed">
          Contact us at{" "}
          <span className="font-semibold text-white">877.708.3844</span>
          {" "}or{" "}
          <span className="font-semibold text-white">genie@data-axle.com</span>
        </p>
      </div>

      {/* Copyright */}
      <div className="px-4 pb-4 text-center">
        <p className="text-[#98a2b3] text-xs">© 2026 Data Axle, All Rights Reserved</p>
      </div>

    </div>
  );
}
