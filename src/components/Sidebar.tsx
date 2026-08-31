import type { ActiveTab, View } from "../types";

interface SidebarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  currentView: View;
  onNavigate: (view: View) => void;
  isSubscriber: boolean;
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-5" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" strokeLinecap="round" />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-5" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="3" rx="1" />
      <rect x="3" y="10.5" width="18" height="3" rx="1" />
      <rect x="3" y="17" width="18" height="3" rx="1" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-5" stroke="currentColor" strokeWidth="2">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function MailBulkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-5" stroke="currentColor" strokeWidth="2">
      <path d="M3 7h18M3 7v11a1 1 0 001 1h16a1 1 0 001-1V7M3 7l9 6 9-6" strokeLinecap="round" />
      <path d="M1 5h2M1 9h2" strokeLinecap="round" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-5" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" strokeLinecap="round" />
      <line x1="8" y1="2" x2="8" y2="6" strokeLinecap="round" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function GearIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-5" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
  );
}

function HeadsetIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-5" stroke="currentColor" strokeWidth="2">
      <path d="M3 18v-6a9 9 0 0118 0v6" />
      <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z" />
    </svg>
  );
}

const navItems = [
  { id: "search",      label: "Search",          icon: SearchIcon,   view: "landing" as View },
  { id: "saved-lists", label: "Saved lists",      icon: ListIcon,     view: "saved-lists" as View },
  { id: "email",       label: "Email campaigns",  icon: EmailIcon,    view: null },
  { id: "direct-mail", label: "Direct mail",      icon: MailBulkIcon, view: null },
  { id: "tasks",       label: "Tasks",            icon: CalendarIcon, view: null },
  { id: "settings",    label: "Settings",         icon: GearIcon,     view: null },
  { id: "support",     label: "Support",          icon: HeadsetIcon,  view: null },
];

export default function Sidebar({ activeTab, onTabChange, currentView, onNavigate, isSubscriber }: SidebarProps) {
  const isSearchActive = currentView === "landing" || currentView === "processing" || currentView === "results" || currentView === "manual-search";
  const isListActive = currentView === "saved-lists";

  return (
    <div className="bg-[#1d2939] flex flex-col h-full w-[256px] shrink-0">

      {/* Logo — wordmark only, no icon */}
      <div className="flex items-center px-4 h-[64px]">
        <div className="flex flex-col leading-none">
          <span className="text-white/60 text-[10px] font-medium uppercase tracking-widest">Data Axle</span>
          <span className="text-white text-[17px] font-bold tracking-tight">salesgenie°</span>
        </div>
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
              className={`flex items-center gap-3 w-full px-3 py-2.5 rounded text-left transition-colors ${
                isActive
                  ? "bg-[#344054] text-white"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              }`}
            >
              <item.icon />
              <span className="text-base">{item.label}</span>
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
            <button className="w-full bg-[#008dc3] text-white text-sm font-medium py-1.5 rounded border border-[#008dc3] hover:bg-[#007aab] transition-colors">
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
