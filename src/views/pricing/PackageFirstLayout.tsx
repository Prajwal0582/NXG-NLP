import { Fragment, useState, type ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCartShopping,
  faCircleInfo,
  faCoins,
  faTag,
  faUser,
  faUserPlus,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck, faEye } from "@fortawesome/free-regular-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import type { FeatureItem, GoalId, PlanId } from "../../data/pricingPlans";
import {
  BUY_LIST_PLAN,
  GOAL_CHIPS,
  PACKAGE_SUMMARIES,
  PLANS,
  SUBSCRIPTION_PLANS,
  resolveTooltip,
} from "../../data/pricingPlans";
import type { PricingLayoutProps } from "./pricingTypes";
import { CARD_SHADOW } from "./pricingTypes";
import SubscriptionComparison from "./SubscriptionComparison";
import type { PricingOption } from "./creditValue";
import { PAYG_CREDIT_RATE, creditValue, groupsPlans, hidesGoalPicker, isValueLed, fmtMoney, fmtNumber, fmtRate } from "./creditValue";

export interface PackageFirstLayoutProps extends PricingLayoutProps {
  goal: GoalId | null;
  onSelectGoal: (id: GoalId) => void;
  onBack: () => void;
  onBillingChange: (billing: PricingLayoutProps["billing"]) => void;
  /** Prototype option being reviewed — "current" renders the shipped layout. */
  option: PricingOption;
  onTalkToSales: () => void;
}

/** Shared light gray header surface — same shade on every package card. */
const HEADER_SURFACE: Record<PlanId, string> = {
  basic: "bg-[#F9FAFB]",
  pro: "bg-[#F9FAFB]",
  team: "bg-[#F9FAFB]",
  "buy-list": "bg-[#F9FAFB]",
};

function CheckIcon() {
  return (
    <svg viewBox="0 0 14 14" fill="none" className="size-3.5 shrink-0" aria-hidden>
      <circle cx="7" cy="7" r="7" fill="#0BA38C" />
      <path d="M4 7l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 14 14" fill="none" className="size-3.5 shrink-0" aria-hidden>
      <circle cx="7" cy="7" r="5.5" stroke="#C55418" strokeWidth="1.3" />
      <path d="M4.75 4.75l4.5 4.5M9.25 4.75l-4.5 4.5" stroke="#C55418" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 14 14" fill="none" className="size-3.5 shrink-0 text-[#0BA38C]" aria-hidden>
      <path d="M7 2.5v9M2.5 7h9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function ChevronIcon({ expanded }: { expanded: boolean }) {
  return (
    <svg
      viewBox="0 0 14 14"
      className={`size-3.5 shrink-0 text-[#475467] transition-transform ${expanded ? "rotate-180" : ""}`}
      fill="none"
      aria-hidden
    >
      <path d="M3.5 5.5L7 9l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg viewBox="0 0 14 14" fill="none" className="size-3.5 shrink-0 text-[#98A2B3]" aria-hidden>
      <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M7 6.5v3M7 4.5h.01" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

function InfoTip({ text }: { text: string }) {
  return (
    <span className="relative inline-flex shrink-0 group/tip">
      <button
        type="button"
        className="inline-flex rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#008DC3]/40"
        aria-label="More information"
        onClick={(e) => e.stopPropagation()}
      >
        <InfoIcon />
      </button>
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-[calc(100%+6px)] left-1/2 z-[60] w-max max-w-[220px] -translate-x-1/2 rounded-md bg-[#1D2939] px-3 py-2 text-center text-xs font-normal leading-[18px] text-white hidden shadow-lg group-hover/tip:block group-focus-within/tip:block"
      >
        {text}
      </span>
    </span>
  );
}

function AddonChip() {
  return (
    <span className="inline-flex h-6 shrink-0 items-center rounded px-2 text-xs font-medium leading-[18px] text-[#F6F8FC] bg-[#764FD9]">
      Add-on
    </span>
  );
}

/** Same expandable checklist rows as Option 1 / Direction 4. */
function FeatureRows({
  planId,
  section,
  items,
  Icon,
  expanded,
  onToggle,
}: {
  planId: PlanId;
  section: "inc" | "exc";
  items: FeatureItem[];
  Icon: typeof CheckIcon;
  expanded: Record<string, boolean>;
  onToggle: (key: string) => void;
}) {
  return (
    <>
      {items.map((item) => {
        const key = `${planId}:${section}:${item.label}`;
        const isOpen = Boolean(expanded[key]);
        const isExpandable = Boolean(item.expandable && item.children?.length);
        const tip = item.info ? resolveTooltip(item.label) : undefined;
        return (
          <div key={item.label} className="flex flex-col gap-2">
            {isExpandable ? (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggle(key);
                }}
                className="flex w-full items-start gap-2 text-left cursor-pointer"
                aria-expanded={isOpen}
              >
                <div className="pt-0.5"><Icon /></div>
                <span className={`text-sm leading-5 text-[#475467] flex-1 ${item.bold ? "font-semibold" : "font-normal"}`}>
                  {item.label}
                </span>
                {tip ? <InfoTip text={tip} /> : item.info ? <InfoIcon /> : null}
                <ChevronIcon expanded={isOpen} />
              </button>
            ) : (
              <div className="flex items-start gap-2">
                <div className="pt-0.5"><Icon /></div>
                <span className={`text-sm leading-5 text-[#475467] flex-1 ${item.bold ? "font-semibold" : "font-normal"}`}>
                  {item.label}
                </span>
                {tip ? <InfoTip text={tip} /> : item.info ? <InfoIcon /> : null}
              </div>
            )}
            {isExpandable && isOpen && item.children?.map((child) => (
              <div key={child.label} className="flex items-start gap-2 pl-6">
                <div className="pt-0.5"><Icon /></div>
                <span className="text-sm font-normal leading-5 text-[#475467] flex-1">{child.label}</span>
                {child.info && resolveTooltip(child.label) ? (
                  <InfoTip text={resolveTooltip(child.label)!} />
                ) : null}
              </div>
            ))}
          </div>
        );
      })}
    </>
  );
}

function PlanFeatureChecklist({
  plan,
  expanded,
  onToggle,
}: {
  plan: (typeof PLANS)[number];
  expanded: Record<string, boolean>;
  onToggle: (key: string) => void;
}) {
  return (
    <div className="flex h-full min-h-0 flex-col gap-6">
      {plan.accessItems.length > 0 && (
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold leading-5 text-[#667085]">{plan.accessTitle}</p>
          {plan.accessItems.map((item) => (
            <div key={item} className="flex items-start gap-2">
              <div className="pt-0.5"><CheckIcon /></div>
              <span className="text-sm font-normal leading-5 text-[#475467]">{item}</span>
            </div>
          ))}
        </div>
      )}
      <div className="flex flex-col gap-3">
        <p className="text-sm font-semibold leading-5 text-[#667085]">{plan.includedTitle}</p>
        <FeatureRows
          planId={plan.id}
          section="inc"
          items={plan.includedItems}
          Icon={CheckIcon}
          expanded={expanded}
          onToggle={onToggle}
        />
      </div>
      {plan.notIncludedItems && plan.notIncludedItems.length > 0 && (
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold leading-5 text-[#667085]">{plan.notIncludedTitle}</p>
          <FeatureRows
            planId={plan.id}
            section="exc"
            items={plan.notIncludedItems}
            Icon={XIcon}
            expanded={expanded}
            onToggle={onToggle}
          />
        </div>
      )}
      {plan.addons && (
        <div className="mt-auto flex flex-col gap-3 pt-2 border-t border-[#EAECF0]">
          <p className="text-sm font-semibold leading-5 text-[#667085]">Additional paid features</p>
          {plan.addons.map((addon) => (
            <div key={addon.label} className="flex items-center justify-between gap-2">
              <div className="flex min-w-0 items-center gap-2">
                <PlusIcon />
                <span className="text-sm font-normal leading-5 text-[#475467]">{addon.label}</span>
                {addon.info && resolveTooltip(addon.label) ? (
                  <InfoTip text={resolveTooltip(addon.label)!} />
                ) : null}
              </div>
              <AddonChip />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function PlanBadge({ label }: { label: "MOST POPULAR" | "RECOMMENDED" }) {
  return (
    <span className="pointer-events-none absolute left-6 top-0 z-[2] -translate-y-1/2 inline-flex h-6 items-center rounded px-2 text-xs font-medium leading-[18px] uppercase tracking-wide bg-[#00729F] text-white whitespace-nowrap">
      {label}
    </span>
  );
}

function GoalIcon({ id, selected }: { id: GoalId; selected: boolean }) {
  const stroke = selected ? "#008DC3" : "#667085";
  if (id === "view") {
    return (
      <svg viewBox="0 0 16 16" fill="none" className="size-3.5 shrink-0" aria-hidden>
        <path d="M1.5 8s2.5-4 6.5-4 6.5 4 6.5 4-2.5 4-6.5 4-6.5-4-6.5-4z" stroke={stroke} strokeWidth="1.3" />
        <circle cx="8" cy="8" r="1.8" stroke={stroke} strokeWidth="1.3" />
      </svg>
    );
  }
  if (id === "export") {
    return (
      <svg viewBox="0 0 16 16" fill="none" className="size-3.5 shrink-0" aria-hidden>
        <rect x="2" y="3.5" width="12" height="9" rx="1.5" stroke={stroke} strokeWidth="1.3" />
        <path d="M2.5 4.5L8 8.5l5.5-4" stroke={stroke} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (id === "team") {
    return (
      <svg viewBox="0 0 16 16" fill="none" className="size-3.5 shrink-0" aria-hidden>
        <circle cx="6" cy="5.5" r="2.2" stroke={stroke} strokeWidth="1.3" />
        <path d="M2 13c0-2 1.8-3.4 4-3.4s4 1.4 4 3.4" stroke={stroke} strokeWidth="1.3" strokeLinecap="round" />
        <circle cx="11.5" cy="6" r="1.7" stroke={stroke} strokeWidth="1.3" />
        <path d="M14 13c0-1.4-1.1-2.5-2.7-2.7" stroke={stroke} strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-3.5 shrink-0" aria-hidden>
      <circle cx="8" cy="8" r="5.5" stroke={stroke} strokeWidth="1.3" />
      <path d="M8 5v6M6.2 6.2h2.4a1.4 1.4 0 010 2.8H6.8a1.4 1.4 0 000 2.8H10" stroke={stroke} strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

const FACT_ICONS = { Access: faEye, Credits: faCoins, Users: faUsers, Purchase: faCartShopping, Price: faTag };

function FactIcon({ label }: { label: string }) {
  const icon = FACT_ICONS[label as keyof typeof FACT_ICONS] ?? faCircleCheck;
  return (
    <span className="flex h-3.5 w-[18px] shrink-0 items-center justify-center text-[#008DC3]" aria-hidden>
      <FontAwesomeIcon icon={icon} className="text-[14px]" />
    </span>
  );
}

/** Plan facts — height fits content (one- and two-line values keep the same 10px padding). */
function PlanFacts({
  items,
  footer,
}: {
  items: { label: string; value: ReactNode; emphasize?: boolean }[];
  footer?: ReactNode;
}) {
  return (
    <div className="box-border flex flex-col gap-2 rounded-lg bg-[#F0F9FF] border border-[#D6EAF5] px-3 py-2.5">
      {items.map((item) => (
        <div key={item.label} className="flex min-w-0 items-center gap-1.5">
          <FactIcon label={item.label} />
          <p className="min-w-0 flex-1 text-xs leading-[18px] break-words">
            <span className="font-semibold uppercase text-[#667085]">{item.label}:</span>{" "}
            <span className={item.emphasize ? "font-semibold text-[#1D2939]" : "font-medium text-[#344054]"}>
              {item.value}
            </span>
          </p>
        </div>
      ))}
      {footer}
    </div>
  );
}

/** Inline "Talk to sales" trigger inside a plan card — never selects the card. */
function TalkToSalesLink({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onKeyDown={(e) => e.stopPropagation()}
      className="inline-flex items-center gap-1.5 font-semibold text-[#008DC3] hover:text-[#00729F] hover:underline"
    >
      {label}
    </button>
  );
}

/** Option B — credit value chip under the price (same weight as the Save 17% chip). */
function CreditChip({ children }: { children: ReactNode }) {
  return (
    <span className="mt-2 inline-flex min-h-7 w-fit items-center gap-1.5 rounded bg-[#F2F9F7] px-2 py-1 text-sm font-medium leading-5 text-[#026B5C]">
      <FontAwesomeIcon icon={faCoins} className="text-[12px]" aria-hidden />
      <span>{children}</span>
    </span>
  );
}

/** Option B (Pro) — "pay $500 more, get $900 of credits" equation. */
function CreditEquation({ billing }: { billing: PricingLayoutProps["billing"] }) {
  const v = creditValue(billing);
  const per = billing === "annual" ? "" : "/mo";
  return (
    <div className="mt-4 flex items-center gap-3 rounded-lg border border-[#CDE9E0] bg-[#F2F9F7] px-3 py-2.5">
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium uppercase leading-[18px] text-[#667085]">You pay</p>
        <p className="text-xl font-semibold leading-[30px] text-[#1D2939]">
          +{fmtMoney(v.difference)}
          <span className="text-sm font-medium">{per}</span>
        </p>
        <p className="text-xs leading-[18px] text-[#475467]">more than Basic</p>
      </div>
      <span className="shrink-0 text-[#026B5C]" aria-hidden>
        <FontAwesomeIcon icon={faArrowRight} className="text-[14px]" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium uppercase leading-[18px] text-[#667085]">You get</p>
        <p className="text-xl font-semibold leading-[30px] text-[#026B5C]">
          {fmtMoney(v.includedValue)}
          <span className="text-sm font-medium">{per}</span>
        </p>
        <p className="text-xs leading-[18px] text-[#475467]">in credits ({fmtNumber(v.included)})</p>
      </div>
    </div>
  );
}

/** Option B (Basic) — what the same credits cost pay-as-you-go. */
function PaygCreditNote({ billing }: { billing: PricingLayoutProps["billing"] }) {
  const v = creditValue(billing);
  const per = billing === "annual" ? "" : "/mo";
  return (
    <div className="mt-4 rounded-lg border border-[#EAECF0] bg-[#F9FAFB] px-3 py-2.5">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-semibold leading-5 text-[#344054]">
          Need {fmtNumber(v.included)} credits{billing === "annual" ? "" : " a month"}?
        </p>
        <p className="shrink-0 text-sm font-semibold leading-5 text-[#1D2939]">
          +{fmtMoney(v.includedValue)}
          {per}
        </p>
      </div>
      <p className="mt-0.5 text-xs leading-[18px] text-[#475467]">
        Pay as you go at {fmtRate(PAYG_CREDIT_RATE)}/credit. Pro includes them for {fmtMoney(v.difference)}
        {per} more.
      </p>
    </div>
  );
}

/** Option B (Team) — inline alert routing extra seats to sales. */
function SeatsInlineAlert({ onTalkToSales }: { onTalkToSales: () => void }) {
  return (
    <div role="note" className="mt-4 flex items-start gap-2.5 rounded-lg border border-[#B9E6FE] bg-[#F0F9FF] px-3 py-2.5">
      <span className="shrink-0 pt-0.5 text-[#008DC3]" aria-hidden>
        <FontAwesomeIcon icon={faUserPlus} className="text-[14px]" />
      </span>
      <div className="min-w-0 text-xs leading-[18px]">
        <p className="text-sm font-semibold leading-5 text-[#1D2939]">Need more than 5 seats?</p>
        <p className="text-[#475467]">We&apos;ll set up custom seats for your team.</p>
        <p className="mt-1">
          <TalkToSalesLink label="Talk to sales →" onClick={onTalkToSales} />
        </p>
      </div>
    </div>
  );
}

/** Option B2 — full-bleed credit band at the top of the price section. */
function CreditBand({ tone, children }: { tone: "value" | "neutral"; children: ReactNode }) {
  return (
    <div
      className={`-mx-4 -mt-4 mb-4 flex items-center gap-2 border-b px-4 py-2 text-sm font-semibold leading-5 ${
        tone === "value"
          ? "border-[#CDE9E0] bg-[#F2F9F7] text-[#026B5C]"
          : "border-[#EAECF0] bg-[#F2F4F7] text-[#475467]"
      }`}
    >
      <FontAwesomeIcon icon={tone === "value" ? faCoins : faCircleInfo} className="text-[12px]" aria-hidden />
      <span>{children}</span>
    </div>
  );
}

/** Option B2 (Pro) — what it costs to get the same credits on Basic vs Pro. */
function CreditCostCompare({ billing }: { billing: PricingLayoutProps["billing"] }) {
  const v = creditValue(billing);
  const per = billing === "annual" ? "/yr" : "/mo";
  return (
    <div className="mt-4 overflow-hidden rounded-lg border border-[#EAECF0] text-sm leading-5">
      <p className="bg-[#F9FAFB] px-3 py-1.5 text-xs font-medium uppercase leading-[18px] text-[#667085]">
        To get {fmtNumber(v.included)} credits{billing === "annual" ? "" : " a month"}
      </p>
      <div className="flex items-baseline justify-between gap-3 border-t border-[#EAECF0] px-3 py-2 text-[#667085]">
        <span>On Basic</span>
        <span>
          {fmtMoney(v.basicPrice)} + {fmtMoney(v.includedValue)} ={" "}
          <span className="font-semibold text-[#475467]">
            {fmtMoney(v.basicPrice + v.includedValue)}
            {per}
          </span>
        </span>
      </div>
      <div className="flex items-baseline justify-between gap-3 border-t border-[#CDE9E0] bg-[#F2F9F7] px-3 py-2 font-semibold text-[#026B5C]">
        <span>On Pro</span>
        <span>
          {fmtMoney(v.proPrice)}
          {per}
        </span>
      </div>
    </div>
  );
}

/** Option B2 (Team) — seats ask attached to the facts box, right under "Users". */
function SeatsFactsFooter({ onTalkToSales }: { onTalkToSales: () => void }) {
  return (
    <div className="flex items-start gap-2 rounded-md border border-[#B9E6FE] bg-white px-2.5 py-2">
      <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center text-[#008DC3]" aria-hidden>
        <FontAwesomeIcon icon={faUserPlus} className="text-[13px]" />
      </span>
      <p className="min-w-0 text-xs leading-[18px] text-[#475467]">
        <span className="font-semibold text-[#1D2939]">Need more than 5 seats?</span> We&apos;ll set up custom
        seats. <TalkToSalesLink label="Talk to sales →" onClick={onTalkToSales} />
      </p>
    </div>
  );
}

/**
 * Option B3 — plan groups. At xl the grid gains a label row and spacer tracks
 * (cols 3 and 5) so each group can sit on its own panel; rows stay subgrid-aligned.
 */
const GROUPED_GRID_COLS =
  "xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_12px_minmax(0,1fr)_12px_minmax(0,1fr)]";

const GROUPED_CARD_PLACEMENT: Record<PlanId, string> = {
  basic: "xl:[grid-column:1] xl:[grid-row:2/span_4]",
  pro: "xl:[grid-column:2] xl:[grid-row:2/span_4]",
  team: "xl:[grid-column:4] xl:[grid-row:2/span_4]",
  "buy-list": "xl:[grid-column:6] xl:[grid-row:2/span_4]",
};

const PLAN_GROUPS = [
  {
    id: "individual",
    label: "Individual plans · 1 user",
    icon: faUser,
    first: "basic",
    column: "xl:[grid-column:1/span_2]",
    panel: "bg-[#E4E7EC] border-[#D0D5DD]",
    text: "text-[#475467]",
  },
  {
    id: "team",
    label: "Team plan · 5 users",
    icon: faUsers,
    first: "team",
    column: "xl:[grid-column:4/span_1]",
    panel: "bg-[#E4E7EC] border-[#D0D5DD]",
    text: "text-[#475467]",
  },
  {
    id: "one-time",
    label: "One-time purchase",
    icon: faCartShopping,
    first: "buy-list",
    column: "xl:[grid-column:6/span_1]",
    panel: "bg-[#E4E7EC] border-[#D0D5DD]",
    text: "text-[#475467]",
  },
] as const;

/** Decorative panel behind a group of cards (desktop only — stacked layouts use the label alone). */
function GroupPanel({ group }: { group: (typeof PLAN_GROUPS)[number] }) {
  return (
    <div
      aria-hidden
      className={`hidden xl:block -m-3 rounded-2xl border ${group.panel} ${group.column} xl:[grid-row:1/span_5]`}
    />
  );
}

function GroupLabel({ group }: { group: (typeof PLAN_GROUPS)[number] }) {
  return (
    <p
      className={`relative col-span-full flex items-center gap-2 text-sm font-semibold leading-5 ${group.text} ${group.column} xl:[grid-row:1]`}
    >
      <FontAwesomeIcon icon={group.icon} className="text-[13px]" aria-hidden />
      {group.label}
    </p>
  );
}

/** Option B3 — headline + indented pointers (credits/value summary under the price). */
function CreditSummary({
  icon,
  title,
  points,
}: {
  icon: IconDefinition;
  title: string;
  points: { mark: string; content: ReactNode }[];
}) {
  return (
    <div className="mt-4 rounded-lg border border-[#EAECF0] bg-[#F9FAFB] px-3 py-3">
      <p className="flex items-center gap-2 text-base font-semibold leading-6 text-[#1D2939]">
        <span className="flex size-5 shrink-0 items-center justify-center text-[#008DC3]" aria-hidden>
          <FontAwesomeIcon icon={icon} className="text-[15px]" />
        </span>
        {title}
      </p>
      <ul className="mt-1 flex flex-col gap-0.5 pl-7">
        {points.map((point, i) => (
          <li key={i} className="flex gap-1.5 text-sm leading-5 text-[#667085]">
            <span className="w-3 shrink-0 text-center" aria-hidden>
              {point.mark}
            </span>
            <span className="min-w-0">{point.content}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Option B3 — "$990/yr ~~$1,188~~", one-sentence billing note, credit summary. */
function PlanPriceV3({
  planId,
  pricing,
  billing,
  onTalkToSales,
}: {
  planId: Exclude<PlanId, "buy-list">;
  pricing: { display: string; strikePrice?: string };
  billing: PricingLayoutProps["billing"];
  onTalkToSales: () => void;
}) {
  const v = creditValue(billing);
  const annual = billing === "annual";
  const per = annual ? "/yr" : "/mo";
  const billingNote = annual
    ? "Billed annually, at only 10 months’ cost when paid upfront."
    : planId === "team"
      ? "5 seats, billed monthly on an annual contract."
      : "Per seat, billed monthly on an annual contract.";
  const credits = `${fmtNumber(v.included)} credits${annual ? "" : "/mo"}`;
  const worth = `${fmtMoney(v.includedValue)}${annual ? "" : "/mo"}`;

  const summary =
    planId === "basic"
      ? {
          icon: faCoins,
          title: "No credits included",
          points: [
            { mark: "+", content: `Buy credits as you go, at ${fmtRate(PAYG_CREDIT_RATE)} each` },
            { mark: "=", content: "Credits power Genie features like exports, email unlocks and campaigns" },
          ],
        }
      : planId === "pro"
        ? {
            icon: faCoins,
            title: annual ? `${fmtNumber(v.included)} credits included` : `${credits} included`,
            points: [
              { mark: "=", content: annual ? "Provided upfront for the year" : "Added every month" },
              {
                mark: "~",
                content: `Worth ${worth}, for only ${fmtMoney(v.difference)}${annual ? "" : "/mo"} more than Basic`,
              },
              {
                mark: "+",
                content: (
                  <span className="font-semibold text-[#0D7867]">
                    You save {fmtMoney(v.includedValue - v.difference)}
                    {annual ? "" : "/mo"}
                  </span>
                ),
              },
            ],
          }
        : {
            icon: faUsers,
            title: "Pro + 5 users",
            points: [
              { mark: "=", content: `${credits} shared, worth ${worth}` },
              {
                mark: "+",
                content: (
                  <>
                    Need more seats? <TalkToSalesLink label="Talk to sales →" onClick={onTalkToSales} />
                  </>
                ),
              },
            ],
          };

  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap items-end gap-x-2 font-semibold text-[#1D2939]">
        <p className="inline-flex items-start tracking-[-0.72px]">
          <span className="text-xl leading-[30px] mt-1">$</span>
          <span className="text-[36px] leading-[44px]">{pricing.display}</span>
          <span className="text-base leading-6 mt-3.5">{per}</span>
        </p>
        {annual && pricing.strikePrice && (
          <span className="mb-1.5 text-lg font-medium leading-7 text-[#98A2B3] line-through">
            ${pricing.strikePrice}
          </span>
        )}
      </div>
      <p className="mt-2 text-sm leading-5 text-[#475467]">{billingNote}</p>
      <CreditSummary {...summary} />
    </div>
  );
}

/**
 * Direction 2 — Package First:
 * Header panel (context + billing + annual offer) → Best Fit → four package cards.
 */
export function PackageFirstLayout(props: PackageFirstLayoutProps) {
  const {
    billing,
    goal,
    selectedPlan,
    badgePlanId,
    activeBadgeLabel,
    buyListPriceDisplay,
    buyListSupportLines,
    buyListCta,
    onSelectGoal,
    onSelectCard,
    onCta,
    onSelectPlan,
    onBack,
    onBillingChange,
    option,
    onTalkToSales,
  } = props;

  const value = creditValue(billing);
  const grouped = groupsPlans(option);

  const buyPlan = BUY_LIST_PLAN;
  const buySelected = selectedPlan === "buy-list";
  const buyBadge = badgePlanId === "buy-list";

  const [expanded, setExpanded] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    for (const plan of PLANS) {
      for (const item of plan.includedItems) {
        if (item.expandable) init[`${plan.id}:inc:${item.label}`] = Boolean(item.defaultExpanded);
      }
      for (const item of plan.notIncludedItems ?? []) {
        if (item.expandable) init[`${plan.id}:exc:${item.label}`] = Boolean(item.defaultExpanded);
      }
    }
    return init;
  });

  function toggleExpand(key: string) {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <>
      {/* Responsive inset: tight on phone, full desktop padding */}
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-28 pt-4 sm:pt-6 pb-16 sm:pb-20">
        {/* One panel: context + billing + annual offer (no floating billing row) */}
        <div data-pricing-header className="w-full">
          <div className="relative w-full bg-white border border-[#D0D5DD] border-l-8 border-l-[#79C1E9] rounded-lg overflow-visible">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-8 px-4 py-4 sm:px-6 md:px-8">
              <div className="flex items-center gap-3 min-w-0 lg:max-w-[55%]">
                <button
                  type="button"
                  onClick={onBack}
                  className="inline-flex items-center text-[#475467] hover:text-[#1D2939] transition-colors shrink-0"
                  aria-label="Back"
                >
                  <svg viewBox="0 0 16 16" fill="none" className="size-4" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                    <path d="M10 3.5L5.5 8 10 12.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <div className="min-w-0">
                  <h1 className="text-xl sm:text-2xl font-semibold leading-7 sm:leading-8 text-[#1D2939]">
                    Choose the <span className="text-[#008DC3]">right plan</span> for your business
                  </h1>
                  <p className="mt-1 text-sm font-normal leading-5 text-[#667085]">
                    Get the features and credits that match your goals.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-3 lg:max-w-[48%] w-full lg:w-auto shrink-0 pb-3 sm:pb-0 lg:pb-3">
                <div className="relative flex h-10 items-stretch shrink-0 w-full sm:w-auto" role="group" aria-label="Billing period">
                  <button
                    type="button"
                    onClick={() => onBillingChange("monthly")}
                    className={`flex h-10 flex-1 sm:flex-none items-center justify-center whitespace-nowrap px-3 sm:px-4 text-sm leading-5 border border-[#D0D5DD] rounded-l-lg transition-colors ${
                      billing === "monthly"
                        ? "bg-[#008DC3] text-[#F9FAFB] font-medium border-[#008DC3] z-[1]"
                        : "bg-white text-[#475467] font-normal hover:bg-[#F9FAFB]"
                    }`}
                  >
                    Monthly Billing
                  </button>
                  <div className="relative flex-1 sm:flex-none">
                    <button
                      type="button"
                      onClick={() => onBillingChange("annual")}
                      className={`flex h-10 w-full items-center justify-center whitespace-nowrap px-3 sm:px-4 text-sm leading-5 border border-l-0 border-[#D0D5DD] rounded-r-lg transition-colors ${
                        billing === "annual"
                          ? "bg-[#008DC3] text-[#F9FAFB] font-medium border-[#008DC3] z-[1]"
                          : "bg-white text-[#475467] font-normal hover:bg-[#F9FAFB]"
                      }`}
                    >
                      Annual Billing
                    </button>
                    {/* ~16.67% from 10 months paid / 12 months access → display Save 17% */}
                    <span className="pointer-events-none absolute left-1/2 top-[32px] z-10 -translate-x-1/2 inline-flex h-7 items-center justify-center rounded px-2 text-sm font-medium leading-5 bg-[#FFF6F2] text-[#C55418] whitespace-nowrap">
                      Save 17%
                    </span>
                  </div>
                </div>

                {/* Annual savings callout — positive green; reserved space (no flicker) */}
                <div
                  className={`flex w-full sm:max-w-[320px] items-start gap-2 rounded-lg border border-[#CDE9E0] bg-[#F2F9F7] p-4 transition-opacity duration-0 ${
                    billing === "annual" ? "opacity-100" : "opacity-0"
                  }`}
                  aria-hidden={billing !== "annual"}
                >
                  <span className="shrink-0 pt-0.5 text-[#026B5C]" aria-hidden>
                    <FontAwesomeIcon icon={faCircleCheck} className="text-[14px]" />
                  </span>
                  <p className="text-xs font-medium leading-[18px] text-[#026B5C]">
                    Pay only for 10 months and get 12 months access + 1,000 bonus credits.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Compact Best Fit — close under header */}
        {!hidesGoalPicker(option) && (
        <div className="pt-5 pb-2">
          <p className="text-center text-sm font-medium leading-5 text-[#475467]">
            Tell us your goal, we&apos;ll recommend the{" "}
            <span className="font-semibold text-[#008DC3]">&lsquo;Best fit&rsquo;</span>
          </p>
          <div
            className="mt-2.5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 xl:gap-5"
            role="group"
            aria-label="Goal selection"
          >
            {GOAL_CHIPS.map((chip) => {
              const selected = goal === chip.id;
              return (
                <button
                  key={chip.id}
                  type="button"
                  data-goal-chip
                  aria-pressed={selected}
                  onClick={() => onSelectGoal(chip.id)}
                  className={`flex h-10 items-center gap-2 px-3 rounded-lg border text-left text-sm leading-5 transition-colors cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#008DC3] ${
                    selected
                      ? "bg-[#F0F9FF] border-[#008DC3] text-[#00729F] font-medium"
                      : "bg-white border-[#D0D5DD] text-[#475467] font-normal hover:bg-[#F9FAFB]"
                  }`}
                >
                  <GoalIcon id={chip.id} selected={selected} />
                  <span className="min-w-0 truncate">{chip.label}</span>
                </button>
              );
            })}
          </div>
        </div>
        )}

        {/*
          Cards: 1-col phone → 2×2 tablet → 4-col desktop.
          Subgrid alignment only at xl so stacked rows stay compact on smaller screens.
        */}
        <div
          className={`${hidesGoalPicker(option) ? "pt-8" : "pt-3"} grid grid-cols-1 md:grid-cols-2 ${
            grouped ? GROUPED_GRID_COLS : "xl:grid-cols-4"
          } gap-4 xl:gap-5 items-stretch`}
          role="radiogroup"
          aria-label="Choose a plan"
        >
          {grouped && PLAN_GROUPS.map((group) => <GroupPanel key={group.id} group={group} />)}
          {SUBSCRIPTION_PLANS.map((plan) => {
            const planId = plan.id as Exclude<PlanId, "buy-list">;
            const pricing = billing === "monthly" ? plan.monthly : plan.annual;
            const isSelected = selectedPlan === plan.id;
            const showBadge = plan.id === badgePlanId;
            const summary = PACKAGE_SUMMARIES[planId];
            const fullPlan = PLANS.find((p) => p.id === plan.id)!;

            const group = grouped ? PLAN_GROUPS.find((g) => g.first === plan.id) : undefined;

            return (
              <Fragment key={plan.id}>
              {group && <GroupLabel group={group} />}
              <div
                data-plan-card
                role="radio"
                aria-checked={isSelected}
                tabIndex={0}
                onClick={() => onSelectCard(plan.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelectCard(plan.id);
                  }
                }}
                className={`relative box-border h-full flex flex-col min-w-0 ${
                  grouped ? GROUPED_CARD_PLACEMENT[plan.id] : "xl:row-span-4"
                } xl:grid xl:grid-cols-[minmax(0,1fr)] xl:grid-rows-subgrid xl:gap-y-0 rounded-xl bg-white border cursor-pointer overflow-visible transition-[border-color] ${
                  isSelected
                    ? "border-[#B9D9EC]"
                    : "border-[#D0D5DD] hover:border-[#98A2B3]"
                }`}
                style={{ boxShadow: CARD_SHADOW }}
              >
                {/* Row 1 — header (overlays live here so subgrid stays 5 children) */}
                <div className={`relative px-4 pt-6 pb-4 rounded-t-xl self-stretch ${HEADER_SURFACE[plan.id]}`}>
                  {isSelected && (
                    <div
                      aria-hidden
                      className="pointer-events-none absolute left-0 right-0 top-0 z-[1] h-2 rounded-t-[12px] bg-[#008DC3]"
                    />
                  )}
                  {showBadge && <PlanBadge label={activeBadgeLabel} />}
                  <div className="flex flex-col gap-2">
                    <p className="text-xs font-medium uppercase leading-[18px] text-[#667085]">
                      {plan.category}
                    </p>
                    <h3 className="text-2xl font-semibold leading-8 text-[#008DC3]">{plan.name}</h3>
                    {option !== "b3" && (
                      <p className="text-sm font-normal leading-5 text-[#475467]">{plan.description}</p>
                    )}
                  </div>
                </div>

                {/* Row 2 — price + discount (left-aligned; 20px gap under price) */}
                <div className="p-4 self-start w-full">
                  {option === "b2" &&
                    (planId === "basic" ? (
                      <CreditBand tone="neutral">
                        Credits at {fmtRate(PAYG_CREDIT_RATE)} each, as you go
                      </CreditBand>
                    ) : (
                      <CreditBand tone="value">
                        {fmtNumber(value.included)} credits included · worth {fmtMoney(value.includedValue)}
                      </CreditBand>
                    ))}
                  {option === "b3" ? (
                    <PlanPriceV3 planId={planId} pricing={pricing} billing={billing} onTalkToSales={onTalkToSales} />
                  ) : (
                  <div className="flex flex-col">
                    <div className="flex items-start gap-1.5">
                      <span className="text-sm font-normal leading-5 text-[#475467] pt-1.5 shrink-0">
                        Starting
                      </span>
                      <p className="inline-flex items-start font-semibold text-[#1D2939] tracking-[-0.72px]">
                        <span className="text-xl leading-[30px] mt-1">$</span>
                        <span className="text-[36px] leading-[44px]">{pricing.display}</span>
                        <span className="text-base leading-6 mt-3.5 font-semibold">{pricing.suffix}</span>
                      </p>
                    </div>
                    {isValueLed(option) && planId !== "basic" && (
                      <CreditChip>
                        Includes {fmtNumber(value.included)} credits · worth{" "}
                        {fmtMoney(value.includedValue)}
                      </CreditChip>
                    )}
                    <div
                      className={`mt-4 text-sm leading-5 ${
                        billing === "annual" ? "text-[#0D7867]" : "text-[#475467]"
                      }`}
                    >
                      {billing === "annual" && pricing.strikePrice ? (
                        <>
                          <p>
                            <span className="font-semibold line-through">${pricing.strikePrice}</span>
                            <span className="font-semibold">/yr</span>
                            <span> - Billed annually</span>
                          </p>
                          <p>Only 10 months&apos; cost when paid upfront</p>
                        </>
                      ) : (
                        pricing.supportLines.map((line) => <p key={line}>{line}</p>)
                      )}
                    </div>
                    {isValueLed(option) && planId === "basic" && <PaygCreditNote billing={billing} />}
                    {isValueLed(option) && planId === "pro" && <CreditEquation billing={billing} />}
                    {isValueLed(option) && planId === "team" && <SeatsInlineAlert onTalkToSales={onTalkToSales} />}
                    {option === "b2" && planId === "pro" && <CreditCostCompare billing={billing} />}
                  </div>
                  )}
                </div>

                {/* Row 3 — CTA */}
                <div className="p-4 self-stretch">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onCta(plan.id);
                    }}
                    className={`w-full h-10 box-border rounded-lg text-sm font-medium leading-5 transition-colors ${
                      isSelected
                        ? "bg-[#008DC3] border border-[#008DC3] text-white hover:bg-[#00729F]"
                        : "bg-white border border-[#008DC3] text-[#008DC3] hover:bg-[#F0F9FF]"
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>

                {/* Row 4 — plan facts (blue box below CTA) */}
                <div className="flex flex-col self-stretch h-full min-h-0">
                {option !== "b3" && (
                <div className="px-4">
                  <PlanFacts
                    items={[
                      { label: "Access", value: summary.access },
                      {
                        label: "Credits",
                        value:
                          option !== "current" && planId === "basic" ? (
                            `Pay as you go · ${fmtRate(PAYG_CREDIT_RATE)}/credit`
                          ) : (
                            summary.creditsLabel(billing)
                          ),
                        emphasize: planId === "pro" || planId === "team",
                      },
                      { label: "Users", value: summary.users, emphasize: planId === "team" },
                    ]}
                    footer={
                      option === "b2" && planId === "team" ? (
                        <SeatsFactsFooter onTalkToSales={onTalkToSales} />
                      ) : undefined
                    }
                  />
                </div>
                )}

                {/* Row 5 — feature checklists; addons bottom-aligned across cards */}
                <div className="px-4 py-6 flex-1 min-h-0">
                  <PlanFeatureChecklist
                    plan={fullPlan}
                    expanded={expanded}
                    onToggle={toggleExpand}
                  />
                </div>
                </div>
              </div>
              </Fragment>
            );
          })}

          {grouped && <GroupLabel group={PLAN_GROUPS[2]} />}

          {/* Buy List — same 5-row subgrid structure */}
          <div
            data-plan-card
            role="radio"
            aria-checked={buySelected}
            tabIndex={0}
            onClick={() => onSelectCard("buy-list")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelectCard("buy-list");
              }
            }}
            className={`relative box-border h-full flex flex-col min-w-0 ${
              grouped ? GROUPED_CARD_PLACEMENT["buy-list"] + " border-dashed" : "xl:row-span-4"
            } xl:grid xl:grid-cols-[minmax(0,1fr)] xl:grid-rows-subgrid xl:gap-y-0 rounded-xl bg-white border cursor-pointer overflow-visible transition-[border-color] ${
              buySelected
                ? "border-[#B9D9EC]"
                : "border-[#D0D5DD] hover:border-[#98A2B3]"
            }`}
            style={{ boxShadow: CARD_SHADOW }}
          >
            <div className={`relative px-4 pt-6 pb-4 rounded-t-xl self-stretch ${HEADER_SURFACE["buy-list"]}`}>
              {buySelected && (
                <div
                  aria-hidden
                  className="pointer-events-none absolute left-0 right-0 top-0 z-[1] h-2 rounded-t-[12px] bg-[#008DC3]"
                />
              )}
              {buyBadge && <PlanBadge label={activeBadgeLabel} />}
              <div className="flex flex-col gap-2">
                <p className="text-xs font-medium uppercase leading-[18px] text-[#667085]">
                  {buyPlan.category}
                </p>
                <h3 className="text-2xl font-semibold leading-8 text-[#008DC3]">{buyPlan.name}</h3>
                {option !== "b3" && (
                  <p className="text-sm font-normal leading-5 text-[#475467]">{buyPlan.description}</p>
                )}
              </div>
            </div>

            <div className="p-4 self-start w-full">
              {option === "b2" && <CreditBand tone="neutral">One-time purchase · no subscription</CreditBand>}
              <div className="flex flex-col">
                {buyListPriceDisplay === "Custom price" ? (
                  <p className="font-semibold text-[#1D2939] text-[36px] leading-[44px] tracking-[-0.72px]">
                    Custom price
                  </p>
                ) : (
                  <p className="inline-flex items-start font-semibold text-[#1D2939] tracking-[-0.72px]">
                    <span className="text-xl leading-[30px] mt-1">$</span>
                    <span className="text-[36px] leading-[44px]">{buyListPriceDisplay}</span>
                  </p>
                )}
                <div className="mt-4 text-sm leading-5 text-[#0D7867]">
                  {buyListSupportLines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
                {option === "b3" && (
                  <CreditSummary
                    icon={faCartShopping}
                    title="One-time purchase"
                    points={[
                      { mark: "=", content: "No subscription needed" },
                      { mark: "+", content: "12 months re-export access" },
                    ]}
                  />
                )}
              </div>
            </div>

            <div className="p-4 self-stretch">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onCta("buy-list");
                }}
                className={`w-full h-10 box-border rounded-lg text-sm font-medium leading-5 transition-colors ${
                  buySelected
                    ? "bg-[#008DC3] border border-[#008DC3] text-white hover:bg-[#00729F]"
                    : "bg-white border border-[#008DC3] text-[#008DC3] hover:bg-[#F0F9FF]"
                }`}
              >
                {buyListCta}
              </button>
            </div>

            <div className="flex flex-col self-stretch h-full min-h-0">
            {option !== "b3" && (
            <div className="px-4">
              <PlanFacts
                items={[
                  { label: "Purchase", value: "One-time" },
                  {
                    label: "Price",
                    value:
                      buyListPriceDisplay === "Custom price"
                        ? "Calculated from selected records"
                        : `$${buyListPriceDisplay}`,
                  },
                  { label: "Access", value: "12 month re-export", emphasize: true },
                ]}
              />
            </div>
            )}

            <div className="px-4 py-6 flex-1 min-h-0">
              <PlanFeatureChecklist
                plan={buyPlan}
                expanded={expanded}
                onToggle={toggleExpand}
              />
            </div>
            </div>
          </div>
        </div>

      </div>

      <SubscriptionComparison billing={billing} onSelectPlan={onSelectPlan} />
    </>
  );
}
