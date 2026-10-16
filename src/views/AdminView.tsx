import { useMemo, useState, type ReactNode } from "react";

type AdminPage = "account-settings" | "credits";
type SettingsVariant = "v1" | "v2";
type CreditsVariant = "option1" | "option2";
type CreditsTab = "allocation" | "history" | "lead-price";

interface UserRow {
  id: number;
  username: string;
  isAdmin: boolean;
  available: number;
  scheduled: number;
  freePromptsLeft: number;
}

interface Grant {
  id: number;
  at: Date;
  appliedTo: string;
  amount: number;
  note: string;
}

const INITIAL_USERS: UserRow[] = [
  { id: 1, username: "franksmith@smartheart.com", isAdmin: true, available: 100, scheduled: 500, freePromptsLeft: 18 },
  { id: 2, username: "danebrown@smartheart.com", isAdmin: false, available: 200, scheduled: 500, freePromptsLeft: 20 },
  { id: 3, username: "nitishgaidhane@smartheart.com", isAdmin: true, available: 200, scheduled: 500, freePromptsLeft: 5 },
  { id: 4, username: "janetyler@smartheart.com", isAdmin: false, available: 100, scheduled: 500, freePromptsLeft: 0 },
  { id: 5, username: "joeytribbiani@smartheart.com", isAdmin: false, available: 300, scheduled: 500, freePromptsLeft: 20 },
];

const ACCOUNT_CREDITS = 900;

interface Props {
  onBack: () => void;
  onToast: (message: string) => void;
}

export default function AdminView({ onBack, onToast }: Props) {
  const [page, setPage] = useState<AdminPage>("account-settings");
  const [settingsVariant, setSettingsVariant] = useState<SettingsVariant>("v1");
  const [creditsVariant, setCreditsVariant] = useState<CreditsVariant>("option1");
  const [users, setUsers] = useState<UserRow[]>(INITIAL_USERS);
  const [grants, setGrants] = useState<Grant[]>([]);

  function grantPrompts(amounts: Record<number, number>, note: string, appliedTo: string) {
    const total = Object.values(amounts).reduce((s, n) => s + n, 0);
    if (total <= 0) return;
    setUsers((prev) => prev.map((u) => (amounts[u.id] ? { ...u, freePromptsLeft: u.freePromptsLeft + amounts[u.id] } : u)));
    setGrants((prev) => [{ id: prev.length + 1, at: new Date(), appliedTo, amount: total, note }, ...prev]);
    const count = Object.values(amounts).filter((n) => n > 0).length;
    onToast(`${total} free prompts added across ${count} user${count === 1 ? "" : "s"}.`);
  }

  return (
    <div className="relative h-full overflow-y-auto bg-g-white">
      <div className="flex min-h-full flex-col gap-10 p-10">
        <PageHeader title={page === "credits" ? "Credits" : "Account Settings"} onBack={onBack} />

        <div className="flex flex-1 items-stretch gap-10">
          <AdminSubNav active={page} onSelect={setPage} />
          <div className="min-w-0 flex-1">
            {page === "account-settings" ? (
              <AccountSettingsPage key={settingsVariant} variant={settingsVariant} onSaved={() => onToast("Account settings saved.")} />
            ) : (
              <CreditsPage variant={creditsVariant} users={users} grants={grants} onGrant={grantPrompts} />
            )}
          </div>
        </div>
      </div>

      <PrototypeSwitcher
        page={page}
        settingsVariant={settingsVariant}
        creditsVariant={creditsVariant}
        onSettingsVariant={setSettingsVariant}
        onCreditsVariant={setCreditsVariant}
      />
    </div>
  );
}

/* ── Page chrome ─────────────────────────────────────────────── */

function PageHeader({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <div className="flex w-full items-start border-b border-g-gray-200 pb-4">
      <div className="flex flex-1 items-start gap-2">
        <button type="button" onClick={onBack} aria-label="Back" className="mt-[5px] text-g-gray-600 hover:text-g-gray-800">
          <ArrowLeftIcon />
        </button>
        <div className="flex flex-col gap-2">
          <h1 className="text-[20px] font-medium leading-[30px] text-g-gray-800">{title}</h1>
          <p className="text-base leading-6 text-g-gray-500">Smart Health</p>
        </div>
      </div>
    </div>
  );
}

const SUB_NAV: { group: string; items: { label: string; page?: AdminPage }[] }[] = [
  { group: "Information", items: [{ label: "Accounts" }, { label: "Subscription" }, { label: "Notes" }] },
  {
    group: "Settings",
    items: [
      { label: "Account Settings", page: "account-settings" },
      { label: "Suppression" },
      { label: "Direct Mail" },
      { label: "Credits", page: "credits" },
    ],
  },
  { group: "Actions", items: [{ label: "Users" }, { label: "Disable Account" }] },
];

function AdminSubNav({ active, onSelect }: { active: AdminPage; onSelect: (p: AdminPage) => void }) {
  return (
    <nav className="flex shrink-0 flex-col items-center border-r border-g-gray-200 px-2 pb-4">
      <div className="flex flex-col gap-4">
        {SUB_NAV.map(({ group, items }) => {
          const groupActive = items.some((i) => i.page === active);
          return (
            <div key={group} className="flex flex-col gap-1">
              <p
                className={`w-[194px] py-2 pl-2 pr-4 text-sm leading-5 tracking-[0.14px] ${
                  groupActive ? "font-semibold text-[#0a111a]" : "font-medium text-g-gray-600"
                }`}
              >
                {group}
              </p>
              {items.map((item) => {
                const isActive = item.page === active;
                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => item.page && onSelect(item.page)}
                    aria-current={isActive ? "page" : undefined}
                    className={`w-[194px] rounded-lg px-4 py-2 text-left text-sm leading-5 tracking-[0.14px] transition-colors ${
                      isActive
                        ? "bg-g-gray-100 font-medium text-g-gray-800"
                        : `font-normal text-g-gray-600 ${item.page ? "hover:bg-g-gray-50" : "cursor-default"}`
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>
    </nav>
  );
}

function PrototypeSwitcher({
  page,
  settingsVariant,
  creditsVariant,
  onSettingsVariant,
  onCreditsVariant,
}: {
  page: AdminPage;
  settingsVariant: SettingsVariant;
  creditsVariant: CreditsVariant;
  onSettingsVariant: (v: SettingsVariant) => void;
  onCreditsVariant: (v: CreditsVariant) => void;
}) {
  const options =
    page === "account-settings"
      ? [
          { id: "v1", label: "v1 · Figma design" },
          { id: "v2", label: "v2 · Yellowstone format" },
        ]
      : [
          { id: "option1", label: "Option 1 · Dialog" },
          { id: "option2", label: "Option 2 · Inline edit" },
        ];
  const current = page === "account-settings" ? settingsVariant : creditsVariant;

  return (
    <div className="fixed bottom-4 right-4 z-40 rounded-lg border border-g-gray-200 bg-g-white p-3 shadow-[0px_4px_8px_-2px_rgba(16,24,40,0.1),0px_2px_4px_-2px_rgba(16,24,40,0.06)]">
      <p className="mb-2 text-xs font-medium leading-[18px] text-g-gray-500">Prototype option</p>
      <div className="flex gap-1 rounded-lg bg-g-gray-100 p-0.5">
        {options.map((o) => (
          <button
            key={o.id}
            type="button"
            onClick={() =>
              page === "account-settings" ? onSettingsVariant(o.id as SettingsVariant) : onCreditsVariant(o.id as CreditsVariant)
            }
            className={`rounded-md px-3 py-1.5 text-xs font-medium leading-[18px] transition-colors ${
              current === o.id ? "bg-g-white text-g-gray-800 shadow-sm" : "text-g-gray-600 hover:text-g-gray-800"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Account Settings ────────────────────────────────────────── */

type SettingItem =
  | { kind: "checkbox"; id: string; label: string; children?: SettingItem[] }
  | { kind: "checkbox-row"; items: { id: string; label: string }[] }
  | { kind: "radio"; id: string; size: "sm" | "md"; options: { value: string; label: string }[] }
  | { kind: "number"; id: string; label: string; suffix?: string; hint?: string }
  | { kind: "subheading"; label: string };

interface SettingSection {
  title: string;
  description?: string;
  items: SettingItem[];
}

type Values = Record<string, boolean | string>;

const V1_SECTIONS: SettingSection[] = [
  {
    title: "Database access",
    description: "Choose which databases are accessible for the account",
    items: [
      {
        kind: "radio",
        id: "v1_db",
        size: "md",
        options: [
          { value: "both", label: "Both databases" },
          { value: "business", label: "Business only" },
          { value: "consumer", label: "Consumer only" },
        ],
      },
    ],
  },
  {
    title: "Consumer phone",
    items: [
      {
        kind: "checkbox",
        id: "v1_san",
        label: "SAN entry",
        children: [
          {
            kind: "radio",
            id: "v1_san_mode",
            size: "sm",
            options: [
              { value: "account", label: "Account applied" },
              { value: "user", label: "User applied" },
            ],
          },
        ],
      },
      { kind: "checkbox", id: "v1_dnc", label: "DNC waiver disabled" },
    ],
  },
  {
    title: "Purchasing/ Credits",
    items: [
      { kind: "number", id: "v1_expiry", label: "Bought records expiration terms", suffix: "days", hint: "(valid input 1 - 365)" },
      { kind: "checkbox", id: "v1_one_time", label: "Additional credits as one-time purchase" },
      { kind: "checkbox", id: "v1_rollover", label: "Stop credits roll over each month" },
    ],
  },
  {
    title: "Campaign",
    items: [
      { kind: "checkbox", id: "v1_email", label: "Email campaign access" },
      { kind: "number", id: "v1_email_limit", label: "Email campaign sending limit" },
    ],
  },
  {
    title: "AI features access",
    description: "Choose which AI features are available for the account",
    items: [{ kind: "checkbox", id: "nlp", label: "NLP chat (smart search)" }],
  },
  { title: "Sharing mode", items: [{ kind: "checkbox", id: "v1_share_none", label: "Share none mode" }] },
  {
    title: "Miscellaneous",
    items: [
      { kind: "checkbox", id: "v1_buyer_intent", label: "Buyer intent subscription trial" },
      { kind: "checkbox", id: "v1_username_edit", label: "User name is editable" },
    ],
  },
];

const V2_SECTIONS: SettingSection[] = [
  {
    title: "Database Access",
    items: [
      {
        kind: "checkbox-row",
        items: [
          { id: "v2_db_business", label: "Business" },
          { id: "v2_db_consumer", label: "Consumer" },
        ],
      },
    ],
  },
  { title: "Sign-in Configuration", items: [{ kind: "checkbox", id: "v2_sso", label: "Enforce SSO" }] },
  {
    title: "Campaign",
    items: [
      { kind: "checkbox", id: "v2_email", label: "Users can start email campaign" },
      { kind: "number", id: "v2_email_limit", label: "Email campaign sending limit" },
      { kind: "checkbox", id: "v2_hide_templates", label: "Hide Stock Templates" },
    ],
  },
  {
    title: "Feature access",
    items: [
      {
        kind: "checkbox",
        id: "v2_direct_mail",
        label: "Direct mail campaign access",
        children: [
          { kind: "checkbox", id: "v2_dm_business", label: "US Business" },
          { kind: "checkbox", id: "v2_dm_consumer", label: "US Consumer" },
          { kind: "checkbox", id: "v2_dm_movers", label: "US New movers" },
        ],
      },
      { kind: "subheading", label: "AI features access" },
      { kind: "checkbox", id: "v2_smart_outreach", label: "Smart outreach" },
      { kind: "checkbox", id: "v2_smart_audiences", label: "Smart audiences" },
      { kind: "checkbox", id: "nlp", label: "NLP chat (smart search)" },
      { kind: "checkbox", id: "v2_saved_filters", label: "Saved filters access" },
      { kind: "checkbox", id: "v2_hide_emails", label: "Hide Individual Email Addresses" },
    ],
  },
  {
    title: "Lead ownership",
    items: [
      { kind: "checkbox", id: "v2_auto_assign", label: "Automatically assign acquired leads" },
      { kind: "checkbox", id: "v2_lock_assigned", label: "Lock assigned leads" },
      { kind: "checkbox", id: "v2_retain_assigned", label: "Retain assigned leads after deactivation" },
      { kind: "checkbox", id: "v2_restrict_visibility", label: "Restrict assigned leads visibility" },
    ],
  },
  {
    title: "Consumer Phone",
    items: [
      { kind: "checkbox", id: "v2_san_users", label: "SAN entered individually by users" },
      { kind: "checkbox", id: "v2_dnc_removed", label: "DNC waiver is removed" },
    ],
  },
  {
    title: "Purchasing",
    items: [
      { kind: "number", id: "v2_expiry", label: "Bought records expiration terms", suffix: "days", hint: "(valid input 1 - 365)" },
      { kind: "checkbox", id: "v2_one_time", label: "Additional credits as one-time purchase" },
      { kind: "checkbox", id: "v2_rollover", label: "Stop credits roll over each month" },
      { kind: "checkbox", id: "v2_purchase_sub", label: "Users can purchase subscription" },
      { kind: "checkbox", id: "v2_individual_view", label: "Individual view" },
      { kind: "checkbox", id: "v2_username_edit", label: "Username is editable" },
      {
        kind: "checkbox",
        id: "v2_max_business",
        label: "Customize max quantity for Business list purchase",
        children: [{ kind: "number", id: "v2_max_business_n", label: "Max number of records" }],
      },
      {
        kind: "checkbox",
        id: "v2_max_consumer",
        label: "Customize max quantity for Consumer list purchase",
        children: [{ kind: "number", id: "v2_max_consumer_n", label: "Max number of records" }],
      },
    ],
  },
  { title: "Saved Lists", items: [{ kind: "checkbox", id: "v2_freemium_import", label: "Enable import for freemium users." }] },
  { title: "Multi Login", items: [{ kind: "checkbox", id: "v2_concurrent", label: "Enable concurrent logins" }] },
];

const INITIAL_VALUES: Values = {
  nlp: true,
  v1_db: "both",
  v1_san: true,
  v1_san_mode: "account",
  v1_expiry: "365",
  v1_email: true,
  v1_email_limit: "365",
  v2_db_business: true,
  v2_db_consumer: true,
  v2_email: true,
  v2_email_limit: "5000",
  v2_direct_mail: true,
  v2_dm_movers: true,
  v2_smart_outreach: true,
  v2_expiry: "365",
  v2_max_business_n: "10000",
  v2_max_consumer_n: "10000",
};

let savedValues: Values = INITIAL_VALUES;

function itemLabels(item: SettingItem): string[] {
  switch (item.kind) {
    case "checkbox":
      return [item.label, ...(item.children ?? []).flatMap(itemLabels)];
    case "checkbox-row":
      return item.items.map((i) => i.label);
    case "radio":
      return item.options.map((o) => o.label);
    case "number":
    case "subheading":
      return [item.label];
  }
}

function AccountSettingsPage({ variant, onSaved }: { variant: SettingsVariant; onSaved: () => void }) {
  const [values, setValues] = useState<Values>(savedValues);
  const [query, setQuery] = useState("");
  const sections = variant === "v1" ? V1_SECTIONS : V2_SECTIONS;

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sections;
    return sections.filter(
      (s) => s.title.toLowerCase().includes(q) || s.items.flatMap(itemLabels).some((l) => l.toLowerCase().includes(q)),
    );
  }, [sections, query]);

  const set = (id: string, v: boolean | string) => setValues((prev) => ({ ...prev, [id]: v }));

  return (
    <div className="flex flex-col gap-6">
      <SearchField value={query} onChange={setQuery} placeholder="Search" className="h-10 w-[377px]" />

      <div className="flex flex-col">
        {visible.map((section) => (
          <section key={section.title} className="flex flex-col gap-2 border-b border-g-gray-200 py-4">
            <div className="flex flex-col gap-0.5">
              <h3 className="text-base font-medium leading-6 text-g-gray-800">{section.title}</h3>
              {section.description && <p className="text-xs leading-[18px] text-g-gray-500">{section.description}</p>}
            </div>
            <div className="flex flex-col">
              {section.items.map((item, i) => (
                <SettingRow key={i} item={item} values={values} set={set} />
              ))}
            </div>
          </section>
        ))}
        {visible.length === 0 && <p className="py-6 text-sm text-g-gray-500">No settings match “{query}”.</p>}
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => {
            savedValues = values;
            onSaved();
          }}
          className="rounded-lg border border-g-blue-600 bg-g-blue-600 px-4 py-2.5 text-sm font-medium leading-5 text-g-white transition-colors hover:bg-g-blue-700"
        >
          Save
        </button>
        <button
          type="button"
          onClick={() => setValues(savedValues)}
          className="rounded-lg border border-g-gray-200 bg-g-white px-4 py-2.5 text-sm font-medium leading-5 text-g-gray-600 transition-colors hover:bg-g-gray-50"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

function SettingRow({ item, values, set }: { item: SettingItem; values: Values; set: (id: string, v: boolean | string) => void }) {
  switch (item.kind) {
    case "subheading":
      return <p className="py-2 text-sm font-medium leading-5 text-g-gray-800">{item.label}</p>;

    case "checkbox-row":
      return (
        <div className="flex gap-8 py-2">
          {item.items.map((c) => (
            <CheckboxLabel key={c.id} label={c.label} checked={!!values[c.id]} onChange={(v) => set(c.id, v)} />
          ))}
        </div>
      );

    case "checkbox":
      return (
        <>
          <div className="py-2">
            <CheckboxLabel label={item.label} checked={!!values[item.id]} onChange={(v) => set(item.id, v)} />
          </div>
          {item.children && (
            <div className="flex flex-col pl-8">
              {item.children.map((child, i) => (
                <SettingRow key={i} item={child} values={values} set={set} />
              ))}
            </div>
          )}
        </>
      );

    case "radio":
      return (
        <div className={`flex flex-col ${item.size === "md" ? "gap-4 py-2" : "gap-2 pb-2"}`}>
          {item.options.map((o) => (
            <label key={o.value} className={`flex cursor-pointer items-center ${item.size === "md" ? "gap-4" : "gap-2"}`}>
              <input
                type="radio"
                className="sr-only"
                name={item.id}
                checked={values[item.id] === o.value}
                onChange={() => set(item.id, o.value)}
              />
              <Radio selected={values[item.id] === o.value} size={item.size} />
              <span className="text-sm leading-5 text-g-gray-800">{o.label}</span>
            </label>
          ))}
        </div>
      );

    case "number":
      return (
        <div className="flex items-center gap-4 py-2">
          <span className="text-sm leading-5 text-g-gray-800">{item.label}</span>
          <input
            type="number"
            value={String(values[item.id] ?? "")}
            onChange={(e) => set(item.id, e.target.value)}
            className="h-10 w-[90px] rounded-lg border border-g-gray-300 bg-g-white px-3.5 text-sm leading-5 text-g-gray-600 outline-none focus:border-g-blue-600"
          />
          {item.suffix && <span className="text-sm leading-5 text-g-gray-800">{item.suffix}</span>}
          {item.hint && <span className="text-xs leading-[18px] text-g-gray-500">{item.hint}</span>}
        </div>
      );
  }
}

/* ── Credits ─────────────────────────────────────────────────── */

function CreditsPage({
  variant,
  users,
  grants,
  onGrant,
}: {
  variant: CreditsVariant;
  users: UserRow[];
  grants: Grant[];
  onGrant: (amounts: Record<number, number>, note: string, appliedTo: string) => void;
}) {
  const [tab, setTab] = useState<CreditsTab>("allocation");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [inlineEdit, setInlineEdit] = useState(false);
  const [inlineAmounts, setInlineAmounts] = useState<Record<number, string>>({});
  const [query, setQuery] = useState("");
  const [role, setRole] = useState<"all" | "admin" | "user">("all");

  const totalFree = users.reduce((s, u) => s + u.freePromptsLeft, 0);
  const filtered = users.filter(
    (u) =>
      u.username.toLowerCase().includes(query.trim().toLowerCase()) &&
      (role === "all" || (role === "admin" ? u.isAdmin : !u.isAdmin)),
  );

  function submitInline() {
    const amounts: Record<number, number> = {};
    for (const [id, v] of Object.entries(inlineAmounts)) {
      const n = parseInt(v, 10);
      if (n > 0) amounts[Number(id)] = n;
    }
    const count = Object.keys(amounts).length;
    onGrant(amounts, "", `${count} selected user${count === 1 ? "" : "s"}`);
    setInlineAmounts({});
    setInlineEdit(false);
  }

  const inlineHasValues = Object.values(inlineAmounts).some((v) => parseInt(v, 10) > 0);

  return (
    <div className="flex flex-col gap-6">
      <Tabs active={tab} onChange={setTab} />

      {tab === "allocation" && (
        <>
          <div className="flex gap-4">
            <MetricCard icon={<BoltIcon />} label="Account credits" value={ACCOUNT_CREDITS} className={variant === "option1" ? "w-[223px]" : "flex-1"} />
            <MetricCard icon={<UsersIcon />} label="Active users" value={users.length} className={variant === "option1" ? "w-[223px]" : "flex-1"} />
            <MetricCard
              icon={<CommentDotsIcon />}
              label="Free prompts left"
              value={totalFree}
              className="flex-1"
              action={
                variant === "option1" ? (
                  <SecondaryButton icon={<PlusIcon />} onClick={() => setDialogOpen(true)}>
                    Add prompts
                  </SecondaryButton>
                ) : undefined
              }
            />
          </div>

          {variant === "option2" && (
            <div className="flex items-center gap-2">
              <RoleSelect value={role} onChange={setRole} />
              <SearchField value={query} onChange={setQuery} placeholder="Search by username" className="h-8 w-[317px]" />
            </div>
          )}

          <div className="rounded-lg border border-g-gray-200">
            <div className="flex items-center gap-4 rounded-t-lg bg-g-white p-4">
              <div className="flex items-center gap-2">
                <span className="text-base font-medium leading-6 text-g-gray-800">Users</span>
                <span className="flex h-[22px] items-center rounded-2xl bg-g-gray-100 px-2 text-xs font-medium leading-[18px] text-g-gray-600">
                  {filtered.length}
                </span>
              </div>
              <div className="flex flex-1 items-center gap-2">
                {variant === "option1" && (
                  <>
                    <SearchField value={query} onChange={setQuery} placeholder="Search by username" className="h-8 w-[317px]" />
                    <RoleSelect value={role} onChange={setRole} />
                  </>
                )}
                <div className="flex flex-1 items-center justify-end gap-2">
                  {inlineEdit ? (
                    <>
                      <span className="text-sm font-medium leading-5 text-g-gray-800">Adding free prompts</span>
                      <PrimaryButton small disabled={!inlineHasValues} onClick={submitInline}>
                        Add
                      </PrimaryButton>
                      <SecondaryButton
                        onClick={() => {
                          setInlineAmounts({});
                          setInlineEdit(false);
                        }}
                      >
                        Cancel
                      </SecondaryButton>
                    </>
                  ) : (
                    <>
                      <SecondaryButton icon={<PlusIcon />}>Add</SecondaryButton>
                      <SecondaryButton icon={<MinusIcon />}>Remove</SecondaryButton>
                      {variant === "option2" && (
                        <SecondaryButton icon={<CommentDotsIcon />} onClick={() => setInlineEdit(true)}>
                          Add free prompts
                        </SecondaryButton>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>

            <table className="w-full table-fixed border-collapse text-left">
              <colgroup>
                <col className={inlineEdit ? "w-[316px]" : "w-[300px]"} />
                <col className={inlineEdit ? "w-[104px]" : "w-[170px]"} />
                <col className={inlineEdit ? "w-[104px]" : "w-[170px]"} />
                <col className={inlineEdit ? "w-[146px]" : ""} />
                {inlineEdit && <col />}
              </colgroup>
              <thead>
                <tr className="h-10 border-y border-g-gray-200 bg-g-gray-100">
                  <Th sortable>Username</Th>
                  <Th sortable>Available</Th>
                  <Th>Scheduled</Th>
                  <Th>Free prompts left</Th>
                  {inlineEdit && <Th>Add free prompts</Th>}
                </tr>
              </thead>
              <tbody>
                {filtered.map((u) => (
                  <tr key={u.id} className="border-b border-g-gray-200 hover:bg-g-gray-50">
                    <td className="h-[57px] px-4 text-sm leading-5 text-g-gray-800">
                      <span className="flex items-center gap-2 whitespace-nowrap">
                        {u.username}
                        {u.isAdmin && (
                          <span className="flex h-6 items-center rounded bg-g-gray-100 px-2 text-xs font-medium leading-[18px] text-g-gray-600">
                            Admin
                          </span>
                        )}
                      </span>
                    </td>
                    <td className="px-4 text-sm leading-5 text-g-gray-800">{u.available}</td>
                    <td className="px-4 text-sm leading-5 text-g-gray-800">{u.scheduled}</td>
                    <td className="px-4 text-sm leading-5 text-g-gray-800">{u.freePromptsLeft}</td>
                    {inlineEdit && (
                      <td className="px-4 py-2">
                        <input
                          type="number"
                          min={0}
                          value={inlineAmounts[u.id] ?? ""}
                          onChange={(e) => setInlineAmounts((prev) => ({ ...prev, [u.id]: e.target.value }))}
                          placeholder="Add prompts"
                          className="h-10 w-full rounded-lg border border-g-gray-300 bg-g-white px-3.5 text-sm leading-5 text-g-gray-800 outline-none placeholder:text-g-gray-500 focus:border-g-blue-600"
                        />
                      </td>
                    )}
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={inlineEdit ? 5 : 4} className="px-4 py-8 text-center text-sm text-g-gray-500">
                      No users match your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <Pagination count={filtered.length} />
          </div>
        </>
      )}

      {tab === "history" && <GrantHistory grants={grants} />}

      {tab === "lead-price" && <p className="py-6 text-sm text-g-gray-500">No lead price overrides for this account.</p>}

      {dialogOpen && (
        <AddFreePromptsDialog
          users={users}
          totalFree={totalFree}
          onClose={() => setDialogOpen(false)}
          onSubmit={(amounts, note, appliedTo) => {
            onGrant(amounts, note, appliedTo);
            setDialogOpen(false);
          }}
        />
      )}
    </div>
  );
}

function Tabs({ active, onChange }: { active: CreditsTab; onChange: (t: CreditsTab) => void }) {
  const tabs: { id: CreditsTab; label: string }[] = [
    { id: "allocation", label: "Allocation" },
    { id: "history", label: "History" },
    { id: "lead-price", label: "Lead Price" },
  ];
  return (
    <div className="flex items-center gap-4">
      {tabs.map((t) => {
        const isActive = t.id === active;
        return (
          <button key={t.id} type="button" onClick={() => onChange(t.id)} className="flex flex-col items-start gap-1">
            <span className={`text-base font-medium leading-6 ${isActive ? "text-[#05587c]" : "text-g-gray-400 hover:text-g-gray-600"}`}>
              {t.label}
            </span>
            <span
              className={`h-0.5 w-8 rounded-sm bg-[#05587c] shadow-[0px_3px_8px_0px_rgba(5,88,124,0.3)] ${isActive ? "" : "opacity-0"}`}
            />
          </button>
        );
      })}
    </div>
  );
}

function MetricCard({
  icon,
  label,
  value,
  action,
  className = "",
}: {
  icon: ReactNode;
  label: string;
  value: number;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex h-20 items-start gap-4 rounded-lg border border-g-gray-200 bg-g-white p-4 shadow-[0px_1px_2px_0px_rgba(43,49,59,0.05)] ${className}`}>
      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-g-gray-100 text-g-gray-600">{icon}</span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-base leading-6 text-g-gray-600">{label}</p>
        <p className="text-[20px] font-medium leading-[30px] text-g-gray-800">{value}</p>
      </div>
      {action}
    </div>
  );
}

function Th({ children, sortable = false }: { children: ReactNode; sortable?: boolean }) {
  return (
    <th className="px-4 text-sm font-medium leading-5 text-g-gray-600">
      <span className="flex items-center gap-2 whitespace-nowrap">
        {children}
        {sortable && <SortIcon />}
      </span>
    </th>
  );
}

function Pagination({ count }: { count: number }) {
  return (
    <div className="flex items-center justify-between rounded-b-lg bg-g-gray-50 p-4">
      <div className="flex items-center gap-2 text-sm leading-5 text-g-gray-600">
        <span>Rows per page</span>
        <span className="flex h-10 items-center gap-2 rounded-lg border border-g-gray-300 bg-g-white px-4">
          30 rows
          <CaretDownIcon />
        </span>
        <span>{count === 0 ? "0 of 0" : `1 - ${count} of ${count}`}</span>
      </div>
      <div className="flex items-center gap-2 text-sm leading-5 text-g-gray-600">
        <span className="text-g-gray-400"><AnglesIcon dir="left" /></span>
        <span className="text-g-gray-400"><AngleIcon dir="left" /></span>
        <span className="flex h-10 items-center rounded-lg border border-g-gray-300 bg-g-white px-4 text-g-gray-800">1</span>
        <span>of 1 page(s)</span>
        <span className="text-g-gray-400"><AngleIcon dir="right" /></span>
        <span className="text-g-gray-400"><AnglesIcon dir="right" /></span>
      </div>
    </div>
  );
}

function GrantHistory({ grants }: { grants: Grant[] }) {
  if (grants.length === 0) {
    return <p className="py-6 text-sm text-g-gray-500">No free prompt grants yet. Grants added from Allocation appear here.</p>;
  }
  return (
    <div className="overflow-hidden rounded-lg border border-g-gray-200">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="h-10 border-b border-g-gray-200 bg-g-gray-100">
            <Th>Date</Th>
            <Th>Applied to</Th>
            <Th>Free prompts</Th>
            <Th>Note</Th>
          </tr>
        </thead>
        <tbody>
          {grants.map((g) => (
            <tr key={g.id} className="border-b border-g-gray-200 last:border-b-0">
              <td className="h-[57px] px-4 text-sm leading-5 text-g-gray-800">
                {g.at.toLocaleString(undefined, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}
              </td>
              <td className="px-4 text-sm leading-5 text-g-gray-800">{g.appliedTo}</td>
              <td className="px-4 text-sm leading-5 text-g-gray-800">+{g.amount}</td>
              <td className="px-4 text-sm leading-5 text-g-gray-600">{g.note || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AddFreePromptsDialog({
  users,
  totalFree,
  onClose,
  onSubmit,
}: {
  users: UserRow[];
  totalFree: number;
  onClose: () => void;
  onSubmit: (amounts: Record<number, number>, note: string, appliedTo: string) => void;
}) {
  const [applyTo, setApplyTo] = useState<"all" | "selected">("all");
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [amount, setAmount] = useState("20");
  const [note, setNote] = useState("");

  const n = parseInt(amount, 10);
  const targets = applyTo === "all" ? users.map((u) => u.id) : [...selected];
  const valid = n > 0 && targets.length > 0;

  function submit() {
    if (!valid) return;
    const amounts = Object.fromEntries(targets.map((id) => [id, n]));
    const appliedTo =
      applyTo === "all" ? `Entire account (${users.length} users)` : `${targets.length} selected user${targets.length === 1 ? "" : "s"}`;
    onSubmit(amounts, note.trim(), appliedTo);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div
        role="dialog"
        aria-labelledby="add-free-prompts-title"
        className="flex max-h-[90vh] w-[560px] flex-col gap-6 overflow-y-auto rounded-xl bg-g-white p-8 shadow-[0px_20px_40px_0px_rgba(10,17,26,0.18)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 id="add-free-prompts-title" className="text-[20px] font-medium leading-[30px] text-g-gray-800">
            Add free prompts
          </h2>
          <button type="button" onClick={onClose} aria-label="Close" className="rounded-md p-2 text-g-gray-600 hover:bg-g-gray-100">
            <XmarkIcon />
          </button>
        </div>

        <p className="text-sm leading-5 text-g-gray-500">Free prompts are added to the current balance and are used before credits.</p>

        <div className="flex flex-col gap-3">
          <p className="text-sm font-medium leading-5 text-g-gray-800">Apply to</p>
          {(
            [
              { value: "all", label: "Entire account (all users)" },
              { value: "selected", label: "Selected users" },
            ] as const
          ).map((o) => (
            <label key={o.value} className="flex cursor-pointer items-center gap-4">
              <input type="radio" className="sr-only" name="apply-to" checked={applyTo === o.value} onChange={() => setApplyTo(o.value)} />
              <Radio selected={applyTo === o.value} size="md" />
              <span className="text-sm leading-5 text-g-gray-800">{o.label}</span>
            </label>
          ))}
          {applyTo === "selected" && (
            <div className="flex flex-col gap-2 pl-9">
              {users.map((u) => (
                <CheckboxLabel
                  key={u.id}
                  label={u.username}
                  checked={selected.has(u.id)}
                  onChange={(v) =>
                    setSelected((prev) => {
                      const next = new Set(prev);
                      if (v) next.add(u.id);
                      else next.delete(u.id);
                      return next;
                    })
                  }
                />
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="free-prompts-amount" className="text-sm font-medium leading-5 text-g-gray-800">
            Number of free prompts
          </label>
          <input
            id="free-prompts-amount"
            type="number"
            min={1}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="h-10 w-full rounded-lg border border-g-gray-300 bg-g-white px-3.5 text-sm leading-5 text-g-gray-800 outline-none focus:border-g-blue-600"
          />
          <p className="text-xs leading-[18px] text-g-gray-500">Current balance: {totalFree} free prompts</p>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="free-prompts-note" className="text-sm font-medium leading-5 text-g-gray-800">
            Note (optional)
          </label>
          <input
            id="free-prompts-note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Reason for this grant"
            className="h-10 w-full rounded-lg border border-g-gray-300 bg-g-white px-3.5 text-sm leading-5 text-g-gray-800 outline-none placeholder:text-g-gray-500 focus:border-g-blue-600"
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-g-gray-300 bg-g-white px-4 py-2.5 text-sm font-medium leading-5 text-g-gray-600 hover:bg-g-gray-50"
          >
            Cancel
          </button>
          <PrimaryButton disabled={!valid} onClick={submit}>
            Add prompts
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

/* ── Form primitives ─────────────────────────────────────────── */

function CheckboxLabel({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex cursor-pointer items-center gap-4">
      <input type="checkbox" className="sr-only" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span
        className={`flex size-4 shrink-0 items-center justify-center rounded border ${
          checked ? "border-g-blue-600 bg-g-blue-100 text-g-blue-600" : "border-g-gray-300 bg-g-white"
        }`}
      >
        {checked && (
          <svg viewBox="0 0 10 10" fill="none" className="size-2.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 5.2l2 2 4-4.4" />
          </svg>
        )}
      </span>
      <span className="text-sm leading-5 text-g-gray-800">{label}</span>
    </label>
  );
}

function Radio({ selected, size }: { selected: boolean; size: "sm" | "md" }) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full border ${size === "md" ? "size-5" : "size-4"} ${
        selected ? "border-g-blue-600 bg-g-blue-100" : "border-g-gray-300 bg-g-white"
      }`}
    >
      {selected && <span className={`rounded-full bg-g-blue-600 ${size === "md" ? "size-2" : "size-1.5"}`} />}
    </span>
  );
}

function SearchField({
  value,
  onChange,
  placeholder,
  className = "",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  className?: string;
}) {
  return (
    <label className={`flex items-center gap-2 rounded-lg border border-g-gray-300 bg-g-white px-4 focus-within:border-g-blue-600 ${className}`}>
      <span className="text-g-gray-400"><SearchIcon /></span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent text-sm leading-5 text-g-gray-800 outline-none placeholder:text-g-gray-400"
      />
    </label>
  );
}

function RoleSelect({ value, onChange }: { value: "all" | "admin" | "user"; onChange: (v: "all" | "admin" | "user") => void }) {
  return (
    <label className="relative flex items-center rounded-md border border-g-gray-300 bg-g-white">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as "all" | "admin" | "user")}
        className="cursor-pointer appearance-none bg-transparent py-1.5 pl-3 pr-8 text-sm leading-5 text-g-gray-600 outline-none"
      >
        <option value="all">All Roles</option>
        <option value="admin">Admin</option>
        <option value="user">User</option>
      </select>
      <span className="pointer-events-none absolute right-2.5"><CaretDownIcon /></span>
    </label>
  );
}

function SecondaryButton({ children, icon, onClick }: { children: ReactNode; icon?: ReactNode; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex shrink-0 items-center gap-2 rounded-md border border-g-gray-300 bg-g-white px-3 py-1.5 text-sm font-medium leading-5 text-g-gray-600 transition-colors hover:bg-g-gray-50"
    >
      {icon}
      {children}
    </button>
  );
}

function PrimaryButton({
  children,
  onClick,
  disabled = false,
  small = false,
}: {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  small?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`shrink-0 border border-g-blue-600 bg-g-blue-600 text-sm font-medium leading-5 text-g-white transition-colors hover:bg-g-blue-700 disabled:cursor-not-allowed disabled:opacity-50 ${
        small ? "rounded-md px-3 py-1.5" : "rounded-lg px-4 py-2.5"
      }`}
    >
      {children}
    </button>
  );
}

/* ── Icons ───────────────────────────────────────────────────── */

const iconProps = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" } as const;

function ArrowLeftIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-5" {...iconProps}>
      <path d="M16.5 10h-13M8.5 5l-5 5 5 5" />
    </svg>
  );
}
function SearchIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" {...iconProps}>
      <circle cx="7" cy="7" r="4.75" />
      <path d="M13.5 13.5l-3-3" />
    </svg>
  );
}
function BoltIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" {...iconProps}>
      <path d="M9 1.5L3.5 9H8l-1 5.5L12.5 7H8l1-5.5z" />
    </svg>
  );
}
function UsersIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" {...iconProps}>
      <circle cx="8" cy="5.5" r="2.25" />
      <path d="M4 13.5a4 4 0 018 0" />
      <circle cx="3.25" cy="6.5" r="1.5" />
      <circle cx="12.75" cy="6.5" r="1.5" />
      <path d="M1 12.5a2.5 2.5 0 013-2.4M15 12.5a2.5 2.5 0 00-3-2.4" />
    </svg>
  );
}
function CommentDotsIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" {...iconProps}>
      <path d="M8 2.5c3.3 0 6 2.1 6 4.75S11.3 12 8 12c-.7 0-1.4-.1-2-.3L3 13l.8-2.3C2.7 9.8 2 8.6 2 7.25 2 4.6 4.7 2.5 8 2.5z" />
      <path d="M5.5 7.25h.01M8 7.25h.01M10.5 7.25h.01" strokeWidth={2} />
    </svg>
  );
}
function PlusIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" {...iconProps}>
      <path d="M8 3v10M3 8h10" />
    </svg>
  );
}
function MinusIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" {...iconProps}>
      <path d="M3 8h10" />
    </svg>
  );
}
function XmarkIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" {...iconProps}>
      <path d="M4 4l8 8M12 4l-8 8" />
    </svg>
  );
}
function SortIcon() {
  return (
    <svg viewBox="0 0 10 14" className="h-3.5 w-2.5 text-g-gray-400" fill="currentColor">
      <path d="M5 1l4 4.5H1L5 1zM5 13L1 8.5h8L5 13z" />
    </svg>
  );
}
function CaretDownIcon() {
  return (
    <svg viewBox="0 0 10 6" className="h-1.5 w-2.5 text-g-gray-400" fill="currentColor">
      <path d="M0 0h10L5 6z" />
    </svg>
  );
}
function AngleIcon({ dir }: { dir: "left" | "right" }) {
  return (
    <svg viewBox="0 0 20 20" className="size-5" {...iconProps}>
      <path d={dir === "left" ? "M12 5l-5 5 5 5" : "M8 5l5 5-5 5"} />
    </svg>
  );
}
function AnglesIcon({ dir }: { dir: "left" | "right" }) {
  return (
    <svg viewBox="0 0 20 20" className="size-5" {...iconProps}>
      <path d={dir === "left" ? "M10 5l-5 5 5 5M15 5l-5 5 5 5" : "M5 5l5 5-5 5M10 5l5 5-5 5"} />
    </svg>
  );
}
