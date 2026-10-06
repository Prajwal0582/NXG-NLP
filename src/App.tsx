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
import SaveListEducationTour from "./components/SaveListEducationTour";
import CreditMilestoneModal from "./components/CreditMilestoneModal";
import {
  inferSearchDataset,
  hasCompletedSavedListEducation,
  markSavedListEducationComplete,
  clearSavedListEducation,
} from "./data/dataset";
import WelcomeModal from "./components/WelcomeModal";

import ScenarioLaunchView from "./views/ScenarioLaunchView";
import LandingView from "./views/LandingView";
import ResultsView from "./views/ResultsView";
import ManualSearchView from "./views/ManualSearchView";
import SavedListsView from "./views/SavedListsView";
import PurchaseView from "./views/PurchaseView";
import PurchaseSuccessView from "./views/PurchaseSuccessView";
import PlansView from "./views/PlansView";
import SubscriptionCheckoutView from "./views/SubscriptionCheckoutView";

function getInitialPrompts(scenario: UserScenario): number {
  switch (scenario) {
    case "freemium-20": return 20;
    case "freemium-5": return 5;
    case "freemium-0": return 0;
    case "subscriber-free": return 20;
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
  const [scenario, setScenario] = useState<UserScenario>("freemium-20");
  const [view, setView] = useState<View>("scenario-launch");
  const [activeTab, setActiveTab] = useState<ActiveTab>("business");
  const [promptsRemaining, setPromptsRemaining] = useState(getInitialPrompts("freemium-20"));
  const [creditsRemaining, setCreditsRemaining] = useState(getInitialCredits("freemium-20"));
  const [submittedPrompt, setSubmittedPrompt] = useState("");
  const [skipAnimation, setSkipAnimation] = useState(false);
  const [listSaved, setListSaved] = useState(false);
  /** True when the most recent freemium submit consumed the final free prompt. */
  const [freePromptsJustExhausted, setFreePromptsJustExhausted] = useState(false);

  const [historyOpen, setHistoryOpen] = useState(false);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [creditConfirmOpen, setCreditConfirmOpen] = useState(false);
  const [pendingPrompt, setPendingPrompt] = useState("");
  const [toast, setToast] = useState<{ message: string; type?: "success" | "info" } | null>(null);
  // Credit-cost coach tip is shown once per session for subscriber-credit.
  const [creditCoachSeen, setCreditCoachSeen] = useState(false);
  const [saveListModalOpen, setSaveListModalOpen] = useState(false);
  const [saveCoachOpen, setSaveCoachOpen] = useState(false);
  const [searchDataset, setSearchDataset] = useState<ActiveTab>("business");
  const [milestoneModalOpen, setMilestoneModalOpen] = useState(false);
  const [welcomeModalOpen, setWelcomeModalOpen] = useState(false);

  const [freeTotal, setFreeTotal] = useState(20);
  const reservedCredits = getReservedCredits(scenario);
  const [selectedPlan, setSelectedPlan] = useState<SelectedPlanId>("pro");
  const [selectedBilling, setSelectedBilling] = useState<BillingPeriod>("monthly");
  const [plansReturnView, setPlansReturnView] = useState<View>("landing");
  /** Set only when entering Pricing from SignalFuse "Purchase list". Cleared for standard Access Pricing. */
  const [listPurchaseContext, setListPurchaseContext] = useState<ListPurchaseContext | null>(null);

  function openPlans(from: View = view === "scenario-launch" ? "landing" : view) {
    // Standard pricing discovery — never inherit a prior list purchase context.
    setListPurchaseContext(null);
    setPlansReturnView(from === "plans" || from === "subscription-checkout" ? "landing" : from);
    setView("plans");
  }

  function openPlansForListPurchase(resultCount: number) {
    const ctx = buildListPurchaseContext(submittedPrompt, resultCount);
    setListPurchaseContext(ctx);
    setPlansReturnView("results");
    setView("plans");
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
    setFreeTotal(20);
    setCreditsRemaining(getInitialCredits(s));
    setListSaved(false);
    setListPurchaseContext(null);
    setFreePromptsJustExhausted(false);
    const isNewUser = (s === "freemium-20" || s === "subscriber-free") && promptsOverride === 20;
    setWelcomeModalOpen(isNewUser);
    setView("landing");
  }

  function handleScenarioChange(s: UserScenario) {
    applyScenario(s);
  }

  const hasActiveChat = submittedPrompt.length > 0;

  function handleNavigate(v: View) {
    if (v === "landing" && hasActiveChat) {
      setView("results");
      return;
    }
    setView(v);
  }

  function handleNewChat() {
    setSkipAnimation(false);
    setSubmittedPrompt("");
    setListPurchaseContext(null);
    setFreePromptsJustExhausted(false);
    setView("landing");
  }

  function handleLogout() {
    clearSavedListEducation();
    setSaveCoachOpen(false);
    setSaveListModalOpen(false);
    setListSaved(false);
    setJustSavedListName(null);
    setSubmittedPrompt("");
    setSearchDataset("business");
    setActiveTab("business");
    setListPurchaseContext(null);
    setFreePromptsJustExhausted(false);
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
    setSkipAnimation(false);
    setSubmittedPrompt(prompt);
    setSearchDataset(inferSearchDataset(prompt));
    setListPurchaseContext(null);
    setView("results"); // conversation view — no separate processing screen

    if (prompt.trim() === "123") {
      setFreePromptsJustExhausted(false);
      return;
    }

    if (scenario === "subscriber-credit") {
      setFreePromptsJustExhausted(false);
      const after = Math.max(0, creditsRemaining - 2);
      setCreditsRemaining(after);
      return;
    }

    const isSub = !isFreemiumScenario(scenario);
    const freeExhausted = promptsRemaining <= 0;
    if (!freeExhausted) {
      const after = promptsRemaining - 1;
      setPromptsRemaining(Math.max(0, after));
      setFreePromptsJustExhausted(isFreemiumScenario(scenario) && after === 0);
      if (after <= 0 && scenario === "subscriber-free") {
        setMilestoneModalOpen(true);
      }
    } else if (isSub) {
      setFreePromptsJustExhausted(false);
      const after = Math.max(0, creditsRemaining - 2);
      setCreditsRemaining(after);
    } else {
      setFreePromptsJustExhausted(false);
    }
  }

  function handleSaveList() {
    setSaveListModalOpen(true);
  }

  const [justSavedListName, setJustSavedListName] = useState<string | null>(null);

  function confirmSaveList(name: string) {
    const showEducation = !hasCompletedSavedListEducation();
    setSaveListModalOpen(false);
    setListSaved(true);
    setJustSavedListName(name);
    // Navigate to the search dataset's Saved lists. Do not reassign the list itself.
    setActiveTab(searchDataset);
    setView("saved-lists");
    if (showEducation) {
      setSaveCoachOpen(true);
    }
  }

  function completeSavedListEducation() {
    markSavedListEducationComplete();
    setSaveCoachOpen(false);
  }

  function handleFeedback(_positive: boolean) {
    // Feedback is now handled inline in ResultsView — no modal needed
  }

  // ResultsView manages its own turns — this only deducts credits/prompts
  function handleFollowUp(prompt: string) {
    const freeExhausted = promptsRemaining <= 0;
    const isSub = !isFreemiumScenario(scenario);
    if (scenario === "subscriber-credit" || scenario === "subscriber-credit-0") {
      setFreePromptsJustExhausted(false);
      const after = Math.max(0, creditsRemaining - 2);
      setCreditsRemaining(after);
      return;
    }
    if (!freeExhausted) {
      const after = promptsRemaining - 1;
      setPromptsRemaining(Math.max(0, after));
      setFreePromptsJustExhausted(isFreemiumScenario(scenario) && after === 0);
      if (after <= 0 && scenario === "subscriber-free") {
        setMilestoneModalOpen(true);
      }
    } else if (isSub) {
      setFreePromptsJustExhausted(false);
      const after = Math.max(0, creditsRemaining - 2);
      setCreditsRemaining(after);
    } else {
      setFreePromptsJustExhausted(false);
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
        return null;

      case "manual-search":
        return <ManualSearchView onBack={() => setView("landing")} onPlans={() => openPlans("manual-search")} />;

      case "saved-lists":
        return (
          <SavedListsView
            scenario={scenario}
            onStartAISearch={() => setView("landing")}
            justSavedListName={justSavedListName}
            onSaveComplete={() => setJustSavedListName(null)}
          />
        );

      case "purchase":
        return (
          <PurchaseView
            listName={listPurchaseContext?.listName ?? submittedPrompt.slice(0, 30)}
            isFreemium={isFree}
            purchaseContext={listPurchaseContext}
            onBack={() => setView(listPurchaseContext ? "plans" : "results")}
            onComplete={() => setView("purchase-success")}
          />
        );

      case "purchase-success":
        return (
          <PurchaseSuccessView
            onViewList={() => setView("results")}
            onNewSearch={() => setView("landing")}
          />
        );

      case "plans":
        return (
          <PlansView
            purchaseContext={listPurchaseContext}
            onBack={() => setView(plansReturnView === "subscription-checkout" ? "landing" : plansReturnView)}
            onSelectPlan={(planId, billing) => {
              setSelectedPlan(planId);
              setSelectedBilling(billing);
              setView("subscription-checkout");
            }}
            onSearchLeads={() => {
              setListPurchaseContext(null);
              setView("landing");
            }}
            onBuyListCheckout={() => setView("purchase")}
          />
        );

      case "subscription-checkout":
        return (
          <SubscriptionCheckoutView
            planId={selectedPlan}
            billing={selectedBilling}
            onBack={() => setView("plans")}
            onComplete={() => {
              setToast({ message: `${selectedPlan.charAt(0).toUpperCase()}${selectedPlan.slice(1)} ${selectedBilling} subscription started.`, type: "success" });
              setView("landing");
            }}
          />
        );

      default:
        return null;
    }
  }

  // Full-page experiences: no app sidebar / top header
  if (view === "scenario-launch" || view === "plans" || view === "subscription-checkout") {
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
        onPlans={() => openPlans("landing")}
        hasActiveChat={hasActiveChat}
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
          onPlans={() => openPlans("landing")}
        />
        <div className="flex-1 overflow-hidden bg-white relative">
          {/* ResultsView stays mounted to preserve chat state across tab switches */}
          {hasActiveChat && (
            <div className={`absolute inset-0 ${view === "results" ? "" : "hidden"}`}>
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
                onNewChat={handleNewChat}
                onHistory={() => setHistoryOpen(true)}
                onPurchaseList={(resultCount) => openPlansForListPurchase(resultCount)}
                onBuyCredits={() => {
                  setListPurchaseContext(null);
                  setView("purchase");
                }}
                onPlans={() => openPlans("results")}
                onSave={handleSaveList}
                onFeedback={handleFeedback}
                onFollowUp={handleFollowUp}
                skipAnimation={skipAnimation}
                freePromptsJustExhausted={freePromptsJustExhausted}
              />
            </div>
          )}
          {view !== "results" && renderContent()}
        </div>
      </div>

      {historyOpen && (
        <HistoryDrawer
          isFreemium={isFree}
          onClose={() => setHistoryOpen(false)}
          onSelectHistory={(prompt) => {
            setHistoryOpen(false);
            setSkipAnimation(true);
            setSubmittedPrompt(prompt);
            setSearchDataset(inferSearchDataset(prompt));
            setFreePromptsJustExhausted(false);
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
          searchDataset={searchDataset}
          navDataset={activeTab}
          isFirstSave={!hasCompletedSavedListEducation()}
          onConfirm={confirmSaveList}
          onCancel={() => setSaveListModalOpen(false)}
        />
      )}

      {saveCoachOpen && (
        <SaveListEducationTour onComplete={completeSavedListEducation} />
      )}

      {milestoneModalOpen && (
        <CreditMilestoneModal
          freePromptsTotal={freeTotal}
          onContinue={() => setMilestoneModalOpen(false)}
          onViewBalance={() => setMilestoneModalOpen(false)}
        />
      )}

      {welcomeModalOpen && (
        <WelcomeModal
          isSubscriber={!isFree}
          onGetStarted={() => setWelcomeModalOpen(false)}
        />
      )}

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </div>
  );
}
