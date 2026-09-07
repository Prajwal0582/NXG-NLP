import { useState } from "react";
import type { View, UserScenario, ActiveTab } from "./types";

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
import ManualSearchView from "./views/ManualSearchView";
import SavedListsView from "./views/SavedListsView";
import PurchaseView from "./views/PurchaseView";
import PurchaseSuccessView from "./views/PurchaseSuccessView";

function getInitialPrompts(scenario: UserScenario): number {
  switch (scenario) {
    case "freemium-24": return 24;
    case "freemium-5": return 5;
    case "freemium-0": return 0;
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

  function applyScenario(s: UserScenario, promptsOverride?: number) {
    setScenario(s);
    const prompts = promptsOverride !== undefined ? promptsOverride : getInitialPrompts(s);
    setPromptsRemaining(prompts);
    setFreeTotal(promptsOverride !== undefined ? promptsOverride : 20);
    setCreditsRemaining(getInitialCredits(s));
    setListSaved(false);
    setView("landing");
  }

  function handleScenarioChange(s: UserScenario) {
    applyScenario(s);
  }

  function handleNavigate(v: View) {
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
    setView("results"); // conversation view — no separate processing screen

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

  function handleFeedback(positive: boolean) {
    if (!positive) setFeedbackModalOpen(true);
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
            onPurchase={() => setView("purchase")}
            onSave={handleSaveList}
            onFeedback={handleFeedback}
            onFollowUp={handleFollowUp}
          />
        );

      case "manual-search":
        return <ManualSearchView onBack={() => setView("landing")} />;

      case "saved-lists":
        return (
          <SavedListsView scenario={scenario} onStartAISearch={() => setView("landing")} />
        );

      case "purchase":
        return (
          <PurchaseView
            listName={submittedPrompt.slice(0, 30)}
            isFreemium={isFree}
            onBack={() => setView("results")}
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

      default:
        return null;
    }
  }

  // Hide sidebar and header on scenario-launch screen
  if (view === "scenario-launch") {
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

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </div>
  );
}
