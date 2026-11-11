import type { ListPurchaseContext, ListSource } from "../types";

export interface SavedList {
  id: string;
  name: string;
  date: string;
  source: "smart" | "database";
  sourceLabel: string;
  records: number;
  /** Bought as a one-time list: no "Tap into…" banner on its detail. */
  purchased?: boolean;
}

export const INITIAL_SAVED_LISTS: SavedList[] = [
  {
    id: "bakeries-test",
    name: "Bakeries Test",
    date: "created on Jan 05, 2024 10:00AM by Frank S",
    source: "smart",
    sourceLabel: "US Businesses: Smart recommendation",
    records: 10_240,
  },
  {
    id: "bakeries-test-2",
    name: "Bakeries Test 2",
    date: "created on Jan 05, 2024 10:00AM by Frank S",
    source: "smart",
    sourceLabel: "US Businesses: Smart recommendation",
    records: 9_870,
  },
  {
    id: "restaurants",
    name: "Restaurants",
    date: "created on Feb 15, 2024 10:00AM by Frank S",
    source: "database",
    sourceLabel: "US Businesses",
    records: 10_412,
  },
];

/** Same rate as the list checkout without a fixed price (27,468 records = $3,000). */
export function estimateListPrice(records: number) {
  return Math.max(50, Math.round((records * 3000) / 27468));
}

export function compactCount(n: number) {
  return n >= 1000 ? `${Math.round(n / 1000)}k` : String(n);
}

export function listContext(
  source: ListSource,
  name: string,
  records: number,
  recommendBuyList: boolean,
): ListPurchaseContext {
  return {
    pricingMode: "purchase-list",
    source,
    query: name,
    scenarioId: source,
    listName: name,
    resultCount: records,
    estimatedPrice: estimateListPrice(records),
    recommendBuyList,
  };
}

export function savedListDate(now = new Date()) {
  const date = now.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
  const time = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }).replace(" ", "");
  return `created on ${date} ${time} by Jason`;
}
