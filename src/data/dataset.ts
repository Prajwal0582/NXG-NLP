import type { ActiveTab } from "../types";

const CONSUMER_HINT =
  /\b(consumer|consumers|household|households|homeowner|homeowners|resident|residents|people|persons|individuals|demographics|homeowners?)\b/i;

/** Dataset of the NLP search itself — independent of the sidebar toggle. */
export function inferSearchDataset(prompt: string): ActiveTab {
  return CONSUMER_HINT.test(prompt) ? "consumer" : "business";
}

export function datasetLabel(dataset: ActiveTab): "Business" | "Consumer" {
  return dataset === "consumer" ? "Consumer" : "Business";
}

export const SAVED_LIST_EDUCATION_KEY = "nxg-nlp-has-completed-saved-list-education";
const LEGACY_FIRST_SAVE_KEY = "nxg-nlp-first-save-education-completed";

export function hasCompletedSavedListEducation(): boolean {
  try {
    return localStorage.getItem(SAVED_LIST_EDUCATION_KEY) === "1";
  } catch {
    return false;
  }
}

export function markSavedListEducationComplete(): void {
  try {
    localStorage.setItem(SAVED_LIST_EDUCATION_KEY, "1");
    localStorage.removeItem(LEGACY_FIRST_SAVE_KEY);
  } catch {
    /* ignore quota / private mode */
  }
}

/** Prototype logout / scenario relaunch should replay first-time save education. */
export function clearSavedListEducation(): void {
  try {
    localStorage.removeItem(SAVED_LIST_EDUCATION_KEY);
    localStorage.removeItem(LEGACY_FIRST_SAVE_KEY);
  } catch {
    /* ignore */
  }
}
