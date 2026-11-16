import { useEffect, useState } from "react";
import type { View, UserScenario, ActiveTab, BillingPeriod, SelectedPlanId, ListPurchaseContext } from "./types";
import { buildListPurchaseContext } from "./data/searchScenarios";

import Sidebar from "./components/Sidebar";
import TopHeader from "./components/TopHeader";
import HistoryDrawer from "./components/HistoryDrawer";
import FeedbackModal from "./components/FeedbackModal";
import CreditConfirmModal from "./components/CreditConfirmModal";
import Toast from "./components/Toast";
import SaveListModal from "./components/SaveListModal";
import CreditMilestoneModal from "./components/CreditMilestoneModal";

import ScenarioLaunchView from "./views/ScenarioLaunchView";
import LandingView from "./views/LandingView";
import ResultsView from "./views/ResultsView";
import ManualSearchView, { type SearchSnapshot } from "./views/ManualSearchView";
import ExportConfigView from "./views/ExportConfigView";
import PricingSheet from "./components/PricingSheet";
import { INITIAL_SAVED_LISTS, listContext, savedListDate, type SavedList } from "./data/savedLists";
import SavedListsView from "./views/SavedListsView";
import PurchaseView from "./views/PurchaseView";
import PurchaseSuccessView from "./views/PurchaseSuccessView";
import PlansView from "./views/PlansView";
import SubscriptionCheckoutView from "./views/SubscriptionCheckoutView";
import { useMcpAwareness } from "./data/mcpAwareness";
import SettingsSheet from "./components/mcp/SettingsSheet";
import AwarenessDemoSwitcher from "./components/mcp/AwarenessDemoSwitcher";
import { ExportStartedToast, McpWhatsNewCard } from "./components/mcp/McpSurfaces";

function getInitialPrompts(scenario: UserScenario): number {
  switch (scenario) {
    case "freemium-24": return 24;
    case "freemium-5": return 5;
    case "freemium-0": return 0;
    case "freemium-activating": return 20;
    case "subscriber-free": return 10;
    case "subscriber-credit": return 0;
    case "subscriber-credit-0": return 0;
  }
}

// Credits shown/spent everywhere are AVAILABLE credits (total owned − reserved).
// subscriber-credit: 48 owned − 18 reserved (Q3 Dentists campaign) = 30 available.
function getInitialCredits(scenario: UserScenario): number {
  if (scenario === "subscriber-credit") return 30;
  if (scenario === "subscriber-credit-0") return 0;
  if (scenario === "subscriber-free") return 30;
  return 0;
}

function getReservedCredits(scenario: UserScenario): number {
  return (scenario === "subscriber-credit" || scenario === "subscriber-credit-0") ? 18 : 0;
}

function isFreemiumScenario(s: UserScenario) {
  return s.startsWith("freemium-");
}

export default function App() {
  const [scenario, setScenario] = useState<UserScenario>("freemium-24");
  const [view, setView] = useState<View>("scenario-launch");
  const [activeTab, setActiveTab] = useState<ActiveTab>("business");
  const [promptsRemaining, setPromptsRemaining] = useState(getInitialPrompts("freemium-24"));
  const [creditsRemaining, setCreditsRemaining] = useState(getInitialCredits("freemium-24"));
  const [submittedPrompt, setSubmittedPrompt] = useState("");
  const [listSaved, setListSaved] = useState(false);

  const [historyOpen, setHistoryOpen] = useState(false);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [creditConfirmOpen, setCreditConfirmOpen] = useState(false);
  const [pendingPrompt, setPendingPrompt] = useState("");
  const [toast, setToast] = useState<{ message: string; type?: "success" | "info" } | null>(null);
  // Credit-cost coach tip is shown once per session for subscriber-credit.
  const [creditCoachSeen, setCreditCoachSeen] = useState(false);
  const [saveListModalOpen, setSaveListModalOpen] = useState(false);
  const [milestoneModalOpen, setMilestoneModalOpen] = useState(false);

  const [freeTotal, setFreeTotal] = useState(25);
  const reservedCredits = getReservedCredits(scenario);
  const [selectedPlan, setSelectedPlan] = useState<SelectedPlanId>("pro");
  const [selectedBilling, setSelectedBilling] = useState<BillingPeriod>("monthly");
  /** The list Pricing / list checkout is about (search, saved list or NLP results). Null for plain "See options". */
  const [listPurchaseContext, setListPurchaseContext] = useState<ListPurchaseContext | null>(null);
  /** Pricing sheet open over the current view. */
  const [pricingOpen, setPricingOpen] = useState(false);
  /** Where checkout's back arrow goes, and whether it reopens the pricing sheet. */
  const [checkoutOrigin, setCheckoutOrigin] = useState<{ view: View; fromPricing: boolean }>({ view: "landing", fromPricing: false });
  /** "Build my list" on Buy list → Search for leads; See options then recommends Buy list. */
  const [buildListIntent, setBuildListIntent] = useState(false);
  const [manualSearchKey, setManualSearchKey] = useState(0);
  const [lastSearch, setLastSearch] = useState<SearchSnapshot | null>(null);
  const [savedLists, setSavedLists] = useState<SavedList[]>(INITIAL_SAVED_LISTS);
  const [openListId, setOpenListId] = useState<string | null>(null);
  const [exportTarget, setExportTarget] = useState<{ listName: string; records: number; returnTo: View }>({
    listName: "untitled list",
    records: 0,
    returnTo: "manual-search",
  });

  const activating = scenario === "freemium-activating";

  // ── MCP connector awareness (prototype) ──
  const mcp = useMcpAwareness();
  const [exportToast, setExportToast] = useState<{ listName: string; records: number } | null>(null);
  const anyOverlayOpen =
    pricingOpen || mcp.settingsOpen || historyOpen || feedbackModalOpen || creditConfirmOpen || saveListModalOpen || milestoneModalOpen;
  /** Interruptive surfaces (B spotlight, E slide-in) only on calm pages, never over flows or modals. */
  const awarenessCalm = !anyOverlayOpen && (view === "landing" || view === "saved-lists");

  /** Opens the B3 pricing sheet over the current view. */
  function openPricing(ctx: ListPurchaseContext | null = null) {
    setListPurchaseContext(ctx);
    setPricingOpen(true);
  }

  /** Subscription being verified: Buy List skips Pricing and goes straight to the list checkout. */
  function openListCheckout(ctx: ListPurchaseContext, from: View) {
    setListPurchaseContext(ctx);
    setCheckoutOrigin({ view: from, fromPricing: false });
    setView("purchase");
  }

  function backFromCheckout() {
    setView(checkoutOrigin.view);
    if (checkoutOrigin.fromPricing) setPricingOpen(true);
  }

  function openExport(listName: string, records: number, returnTo: View) {
    setExportTarget({ listName, records, returnTo });
    setView("export-config");
  }

  useEffect(() => {
    document.title =
      view === "plans" || view === "subscription-checkout"
        ? "SalesGenie — Pricing"
        : "SalesGenie";
  }, [view]);

  function applyScenario(s: UserScenario, promptsOverride?: number) {
    setScenario(s);
    const prompts = promptsOverride !== undefined ? promptsOverride : getInitialPrompts(s);
    setPromptsRemaining(prompts);
    setFreeTotal(promptsOverride !== undefined ? promptsOverride : 20);
    setCreditsRemaining(getInitialCredits(s));
    setListSaved(false);
    setListPurchaseContext(null);
    setPricingOpen(false);
    setBuildListIntent(false);
    setLastSearch(null);
    setOpenListId(null);
    setView("landing");
  }

  function handleScenarioChange(s: UserScenario) {
    applyScenario(s);
  }

  function handleNavigate(v: View) {
    setBuildListIntent(false);
    if (v === "saved-lists") setOpenListId(null);
    setView(v);
  }

  function handleLogout() {
    setView("scenario-launch");
  }

  // Landing-page submits. subscriber-credit spends silently (ambient model);
  // subscriber-free still confirms via modal once its free prompts run out.
  function submitPrompt(prompt: string) {
    const freeExhausted = promptsRemaining <= 0;
    if (scenario === "subscriber-free" && freeExhausted) {
      setPendingPrompt(prompt);
      setCreditConfirmOpen(true);
      return;
    }
    doSubmitPrompt(prompt);
  }

  function doSubmitPrompt(prompt: string) {
    setSubmittedPrompt(prompt);
    setListPurchaseContext(null);
    setView("results"); // conversation view — no separate processing screen

    if (prompt.trim() === "123") return;

    if (scenario === "subscriber-credit") {
      const after = Math.max(0, creditsRemaining - 2);
      setCreditsRemaining(after);
      return;
    }

    const isSub = !isFreemiumScenario(scenario);
    const freeExhausted = promptsRemaining <= 0;
    if (!freeExhausted) {
      const after = promptsRemaining - 1;
      setPromptsRemaining(Math.max(0, after));
      if (after <= 0 && scenario === "subscriber-free") {
        setMilestoneModalOpen(true);
      }
    } else if (isSub) {
      const after = Math.max(0, creditsRemaining - 2);
      setCreditsRemaining(after);
    }
  }

  function handleSaveList() {
    setSaveListModalOpen(true);
  }

  function confirmSaveList(_name: string) {
    setSaveListModalOpen(false);
    setListSaved(true);
    setToast({ message: "List saved to Business Saved Lists.", type: "success" });
  }

  function handleFeedback(_positive: boolean) {
    // Feedback is now handled inline in ResultsView — no modal needed
  }

  // ResultsView manages its own turns — this only deducts credits/prompts
  function handleFollowUp(prompt: string) {
    const freeExhausted = promptsRemaining <= 0;
    const isSub = !isFreemiumScenario(scenario);
    if (scenario === "subscriber-credit" || scenario === "subscriber-credit-0") {
      const after = Math.max(0, creditsRemaining - 2);
      setCreditsRemaining(after);
      return;
    }
    if (!freeExhausted) {
      const after = promptsRemaining - 1;
      setPromptsRemaining(Math.max(0, after));
      if (after <= 0 && scenario === "subscriber-free") {
        setMilestoneModalOpen(true);
      }
    } else if (isSub) {
      const after = Math.max(0, creditsRemaining - 2);
      setCreditsRemaining(after);
    }
  }

  const isFree = isFreemiumScenario(scenario);

  function renderContent() {
    switch (view) {
      case "scenario-launch":
        return (
          <ScenarioLaunchView onSelectScenario={applyScenario} />
        );

      case "landing":
        return (
          <LandingView
            scenario={scenario}
            promptsRemaining={promptsRemaining}
            freePromptsTotal={freeTotal}
            creditsRemaining={creditsRemaining}
            onSubmit={submitPrompt}
            onManualSearch={() => setView("manual-search")}
            onHistory={() => setHistoryOpen(true)}
          />
        );


      case "results":
        return (
          <ResultsView
            scenario={scenario}
            prompt={submittedPrompt}
            promptsRemaining={promptsRemaining}
            freePromptsTotal={freeTotal}
            creditsRemaining={creditsRemaining}
            reservedCredits={reservedCredits}
            showCreditCoach={false}
            onDismissCreditCoach={() => setCreditCoachSeen(true)}
            onBack={() => setView("landing")}
            onHistory={() => setHistoryOpen(true)}
            onPurchaseList={(resultCount) => {
              const ctx = buildListPurchaseContext(submittedPrompt, resultCount);
              if (activating) openListCheckout(ctx, "results");
              else openPricing({ ...ctx, recommendBuyList: true });
            }}
            onBuyCredits={() => {
              setListPurchaseContext(null);
              setCheckoutOrigin({ view: "results", fromPricing: false });
              setView("purchase");
            }}
            onPlans={() => openPricing()}
            onSave={handleSaveList}
            onFeedback={handleFeedback}
            onFollowUp={handleFollowUp}
          />
        );

      case "manual-search":
        return (
          <ManualSearchView
            key={manualSearchKey}
            onBack={() => setView("landing")}
            isFreemium={isFree}
            subscriptionActivating={activating}
            initialSearch={lastSearch}
            onSearch={setLastSearch}
            onSeeOptions={(term, records) => openPricing(listContext("manual-search", term, records, buildListIntent))}
            onBuyList={(term, records) => openListCheckout(listContext("manual-search", term, records, false), "manual-search")}
            onExport={(term, records) => openExport(term, records, "manual-search")}
            onSaveList={(name, records) => {
              const id = `${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`;
              setSavedLists((lists) => [
                { id, name, date: savedListDate(), source: "database", sourceLabel: "US Businesses", records },
                ...lists,
              ]);
              setToast({ message: "List saved to Business Saved Lists.", type: "success" });
              // "Save & Go to List" → the saved list (S2 / S3B start here).
              setOpenListId(id);
              setView("saved-lists");
            }}
          />
        );

      case "saved-lists":
        return (
          <SavedListsView
            scenario={scenario}
            lists={savedLists}
            openListId={openListId}
            onOpenList={setOpenListId}
            onSearchLeads={() => {
              setLastSearch(null);
              setView("manual-search");
            }}
            onSeeOptions={(list) => openPricing(listContext("saved-list", list.name, list.records, false))}
            onBuyList={(list) => openListCheckout(listContext("saved-list", list.name, list.records, false), "saved-lists")}
            onExport={(list) => openExport(list.name, list.records, "saved-lists")}
          />
        );

      case "export-config":
        return (
          <ExportConfigView
            listName={exportTarget.listName}
            records={exportTarget.records}
            isFreemium={isFree}
            subscriptionActivating={activating}
            onBack={() => setView(exportTarget.returnTo)}
            onExportStarted={() => {
              setExportToast({ listName: exportTarget.listName, records: exportTarget.records });
              setView(exportTarget.returnTo);
            }}
            onUpgrade={() =>
              openPricing(
                listContext(
                  exportTarget.returnTo === "saved-lists" ? "saved-list" : "manual-search",
                  exportTarget.listName,
                  exportTarget.records,
                  false,
                ),
              )
            }
          />
        );

      case "purchase":
        return (
          <PurchaseView
            listName={listPurchaseContext?.listName ?? submittedPrompt.slice(0, 30)}
            isFreemium={isFree}
            purchaseContext={listPurchaseContext}
            onBack={backFromCheckout}
            onComplete={() => setView("purchase-success")}
          />
        );

      case "purchase-success":
        return (
          <PurchaseSuccessView
            listName={listPurchaseContext?.listName}
            recordCount={listPurchaseContext?.resultCount}
            amountPaid={listPurchaseContext?.estimatedPrice}
            onViewList={() => {
              const ctx = listPurchaseContext;
              if (!ctx || ctx.source === "signalfuse-results") {
                setView("results");
                return;
              }
              const existing = savedLists.find((l) => l.name === ctx.listName);
              if (existing) {
                setSavedLists((lists) => lists.map((l) => (l.id === existing.id ? { ...l, purchased: true } : l)));
                setOpenListId(existing.id);
              } else {
                const id = `purchased-${Date.now()}`;
                setSavedLists((lists) => [
                  {
                    id,
                    name: ctx.listName,
                    date: savedListDate(),
                    source: "database",
                    sourceLabel: "US Businesses",
                    records: ctx.resultCount,
                    purchased: true,
                  },
                  ...lists,
                ]);
                setOpenListId(id);
              }
              setView("saved-lists");
            }}
            onNewSearch={() => {
              setLastSearch(null);
              setManualSearchKey((k) => k + 1);
              setView("manual-search");
            }}
          />
        );

      case "subscription-checkout":
        return (
          <SubscriptionCheckoutView
            planId={selectedPlan}
            billing={selectedBilling}
            onBack={backFromCheckout}
            onComplete={() => {
              setView(checkoutOrigin.view);
              if (isFree) {
                // Freemium → subscription order is verified before access (Figma "Pending order notifications").
                setScenario("freemium-activating");
                setToast({
                  message: "Thank you for your subscription! We're processing your order and activating your subscription.",
                  type: "success",
                });
                return;
              }
              setToast({ message: `${selectedPlan.charAt(0).toUpperCase()}${selectedPlan.slice(1)} ${selectedBilling} subscription started.`, type: "success" });
            }}
          />
        );

      default:
        return null;
    }
  }

  // Full-page experiences: no app sidebar / top header
  if (view === "scenario-launch" || view === "subscription-checkout") {
    return (
      <>
        {renderContent()}
        {toast && (
          <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
        )}
      </>
    );
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white">
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        currentView={view}
        onNavigate={handleNavigate}
        isSubscriber={!isFree}
        subscriptionActivating={activating}
        onPlans={() => openPricing()}
        onOpenSettings={() => mcp.openSettings(mcp.isLive("F") ? "mcp" : "general")}
        settingsNew={mcp.preset === "F" && mcp.isLive("F")}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopHeader
          scenario={scenario}
          onScenarioChange={handleScenarioChange}
          promptsRemaining={promptsRemaining}
          freePromptsTotal={freeTotal}
          isFreemium={isFree}
          creditsRemaining={creditsRemaining}
          reservedCredits={reservedCredits}
          onLogout={handleLogout}
          onPlans={() => openPricing()}
          suppressSpotlight={!awarenessCalm}
        />
        <div className="flex-1 overflow-hidden bg-white">
          {renderContent()}
        </div>
      </div>

      {historyOpen && (
        <HistoryDrawer
          isFreemium={isFree}
          onClose={() => setHistoryOpen(false)}
          onSelectHistory={(prompt) => {
            setHistoryOpen(false);
            setSubmittedPrompt(prompt);
            setView("results");
          }}
        />
      )}

      {feedbackModalOpen && (
        <FeedbackModal
          onClose={() => setFeedbackModalOpen(false)}
          onSubmit={() => setFeedbackModalOpen(false)}
        />
      )}

      {creditConfirmOpen && (
        <CreditConfirmModal
          credits={creditsRemaining}
          onConfirm={() => {
            setCreditConfirmOpen(false);
            doSubmitPrompt(pendingPrompt);
          }}
          onCancel={() => {
            setCreditConfirmOpen(false);
            setPendingPrompt("");
          }}
        />
      )}

      {saveListModalOpen && (
        <SaveListModal
          defaultName={submittedPrompt}
          onConfirm={confirmSaveList}
          onCancel={() => setSaveListModalOpen(false)}
        />
      )}

      {milestoneModalOpen && (
        <CreditMilestoneModal
          freePromptsTotal={freeTotal}
          onContinue={() => setMilestoneModalOpen(false)}
          onViewBalance={() => setMilestoneModalOpen(false)}
        />
      )}

      {pricingOpen && (
        <PricingSheet onClosed={() => setPricingOpen(false)}>
          {(close) => (
            <PlansView
              purchaseContext={listPurchaseContext}
              onBack={close}
              onSelectPlan={(planId, billing) => {
                setSelectedPlan(planId);
                setSelectedBilling(billing);
                setCheckoutOrigin({ view, fromPricing: true });
                setPricingOpen(false);
                setView("subscription-checkout");
              }}
              onSearchLeads={() => {
                // Build my list → Search for leads; See options there recommends Buy list.
                close();
                setListPurchaseContext(null);
                setLastSearch(null);
                setBuildListIntent(true);
                setManualSearchKey((k) => k + 1);
                setView("manual-search");
              }}
              onBuyListCheckout={() => {
                setCheckoutOrigin({ view, fromPricing: true });
                setPricingOpen(false);
                setView("purchase");
              }}
              hideOptionSwitcher
              salesConfirmInline
              scrollHint
              fixedOption="b3"
              fixedGroupStyle="sections"
            />
          )}
        </PricingSheet>
      )}

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}

      {/* ── MCP connector awareness ── */}
      {mcp.settingsOpen && <SettingsSheet />}
      {exportToast && <ExportStartedToast {...exportToast} onClose={() => setExportToast(null)} />}
      <McpWhatsNewCard suppressed={!awarenessCalm} />
      <AwarenessDemoSwitcher />
    </div>
  );
}
