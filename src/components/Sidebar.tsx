import type { ReactElement } from "react";
import type { ActiveTab, View } from "../types";
import dataAxleLogo from "../assets/data-axle-logo.svg";
import salesgenieWordmark from "../assets/salesgenie-wordmark.svg";

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
    <svg viewBox="0 0 24 24" fill="none" className="size-6 shrink-0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

/** Font Awesome square-list */
function SavedListsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-6 shrink-0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3.5" y="3.5" width="17" height="17" rx="2" />
      <path d="M8 8h8M8 12h8M8 16h5" />
    </svg>
  );
}

/** Font Awesome calendar */
function TasksIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-6 shrink-0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
      <path d="M8 3v4M16 3v4M3.5 10h17" />
    </svg>
  );
}

/** Font Awesome at */
function EmailCampaignIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-6 shrink-0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="3.25" />
      <path d="M15.25 12v1.1a2.15 2.15 0 004.3 0V12" />
    </svg>
  );
}

/** Font Awesome envelopes-bulk */
function DirectMailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-6 shrink-0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 10.5h11.5a1.5 1.5 0 011.5 1.5v6a1.5 1.5 0 01-1.5 1.5H5A1.5 1.5 0 013.5 18v-6a1.5 1.5 0 011.5-1.5z" />
      <path d="M5 10.5l5.75 4.25L16.5 10.5" />
      <path d="M7 8h12.5a1.5 1.5 0 011.5 1.5V16" />
      <path d="M9 5.5h12.5A1.5 1.5 0 0123 7v8" />
    </svg>
  );
}

/** Font Awesome gear */
function GearIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-6 shrink-0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
  );
}

/** Font Awesome headset */
function SupportIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-6 shrink-0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 14v-2a8 8 0 0116 0v2" />
      <path d="M18 15.5a1.5 1.5 0 011.5 1.5v1a1.5 1.5 0 01-1.5 1.5h-1v-4h1zM6 15.5a1.5 1.5 0 00-1.5 1.5v1A1.5 1.5 0 006 19.5h1v-4H6z" />
      <path d="M18 19.5h-2a2 2 0 01-2 2h-1" />
    </svg>
  );
}

/** Font Awesome gem — premium indicator */
function GemBadge() {
  return (
    <span className="ml-auto flex size-5 shrink-0 items-center justify-center text-white" aria-hidden>
      <svg viewBox="0 0 20 20" fill="none" className="size-4">
        <path
          d="M5.75 3.25h8.5L17.25 7.5 10 17.25 2.75 7.5 5.75 3.25z"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinejoin="round"
        />
        <path d="M2.75 7.5h14.5" stroke="currentColor" strokeWidth="1.35" />
        <path
          d="M7 3.25L5.5 7.5 10 17.25M13 3.25l1.5 4.25L10 17.25"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

interface NavItem {
  id: string;
  label: string;
  icon: () => ReactElement;
  view: View | null;
  badge?: "gem";
}

/** Search kept first (current product behavior); remaining order matches Figma. */
const navItems: NavItem[] = [
  { id: "search", label: "Search", icon: SearchIcon, view: "landing" },
  { id: "saved-lists", label: "Saved lists", icon: SavedListsIcon, view: "saved-lists" },
  { id: "tasks", label: "Tasks", icon: TasksIcon, view: null },
  { id: "email", label: "Email campaigns", icon: EmailCampaignIcon, view: null, badge: "gem" },
  { id: "direct-mail", label: "Direct mail", icon: DirectMailIcon, view: null, badge: "gem" },
  { id: "settings", label: "Settings", icon: GearIcon, view: null },
  { id: "support", label: "Support", icon: SupportIcon, view: null },
];

export default function Sidebar({
  activeTab,
  onTabChange,
  currentView,
  onNavigate,
  isSubscriber,
  onPlans,
}: SidebarProps) {
  const isSearchActive =
    currentView === "landing" ||
    currentView === "processing" ||
    currentView === "results" ||
    currentView === "manual-search" ||
    currentView === "plans" ||
    currentView === "subscription-checkout";
  const isListActive = currentView === "saved-lists";

  return (
    <div className="flex h-full w-[256px] shrink-0 flex-col bg-[#1D2939] pb-2">
      {/* Brand — Figma logo + wordmark */}
      <div className="flex h-16 w-full items-center justify-center p-2">
        <div className="flex h-10 items-center gap-2">
          <img src={dataAxleLogo} alt="Data Axle" className="size-10 shrink-0" width={40} height={40} />
          <img
            src={salesgenieWordmark}
            alt="salesgenie"
            className="h-6 w-auto shrink-0"
            width={129}
            height={24}
          />
        </div>
      </div>

      {/* Business / Consumer toggle */}
      <div className="flex h-[60px] w-full items-center justify-center p-2">
        <div className="flex w-[199px] items-center gap-0.5 rounded-full bg-[#344054] p-0.5">
          <button
            type="button"
            onClick={() => onTabChange("business")}
            className={`rounded-full px-4 py-2 text-sm whitespace-nowrap transition-colors ${
              activeTab === "business"
                ? "bg-white font-medium leading-[21px] text-[#1D2939]"
                : "font-normal leading-5 text-white hover:bg-white/10"
            }`}
          >
            Business
          </button>
          <button
            type="button"
            onClick={() => onTabChange("consumer")}
            className={`rounded-full px-4 py-2 text-sm whitespace-nowrap transition-colors ${
              activeTab === "consumer"
                ? "bg-white font-medium leading-[21px] text-[#1D2939]"
                : "font-normal leading-5 text-white hover:bg-white/10"
            }`}
          >
            Consumer
          </button>
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex flex-1 flex-col gap-2 overflow-y-auto p-4">
        {navItems.map((item) => {
          const isActive =
            (item.id === "search" && isSearchActive) || (item.id === "saved-lists" && isListActive);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => item.view && onNavigate(item.view)}
              className={`flex w-full items-center gap-2 rounded p-2 text-left transition-colors ${
                isActive ? "bg-[#344054] text-white" : "text-white hover:bg-white/10"
              }`}
            >
              <span className="flex items-start p-2">
                <item.icon />
              </span>
              <span className="flex-1 text-base font-normal leading-[26px]">{item.label}</span>
              {item.badge === "gem" ? <GemBadge /> : null}
            </button>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="mt-auto flex w-full flex-col gap-3">
        {!isSubscriber && (
          <div className="px-4">
            <div className="flex w-full flex-col rounded-lg border border-[#98A2B3] bg-[#475467] p-4">
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-semibold leading-5 text-white">Get started today!</p>
                  <p className="text-xs font-normal leading-[18px] text-white">
                    Whether you&apos;re all in or just need a list, we&apos;ve got flexible options to help
                    you start faster.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onPlans}
                  className="w-full rounded-md border border-[#008DC3] bg-[#008DC3] px-3 py-1.5 text-sm font-medium leading-5 text-white transition-colors hover:bg-[#00729F]"
                >
                  Access pricing
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="w-full px-2 text-center text-sm leading-5 text-white">
          <p className="font-normal">
            Contact your dedicated advisor:
            <br />
            <br />
          </p>
          <p className="font-semibold">
            Jeannie House
            <br />
            866.872.6917
            <br />
            hiral.saini@data-axle.com
          </p>
        </div>

        <div className="flex items-start justify-center p-2">
          <p className="text-xs font-normal leading-[18px] whitespace-nowrap text-[#98A2B3]">
            © 2024 Data Axle, All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
}
