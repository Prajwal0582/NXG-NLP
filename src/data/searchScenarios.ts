/**
 * SignalFuse mock search scenarios — prototype data only.
 * totalMatches is the believable cohort size; leads[] is the paginated display set.
 */

export interface BarRow {
  label: string;
  value: number;
}

export interface DonutSeg {
  label: string;
  pct: number;
  color: string;
}

export interface ScenarioLead {
  name: string;
  nameMasked: string;
  location: string;
  phone: string;
  phoneMasked: string;
  industry: string;
  revenue: string;
  employees: string;
  contact: string;
  contactMasked: string;
  title: string;
  email: string;
  emailMasked: string;
  verified?: boolean;
}

export interface InsightBlock {
  label: string;
  text: string;
}

export interface RefinementConfig {
  id: string;
  match: (prompt: string) => boolean;
  chipLabel?: string;
  insight: string;
  subtext: string;
  newCount: number;
  title?: string;
  summaryIntro?: string;
  insights?: InsightBlock[];
  recommendation?: string;
  thoughtProcess?: string[];
  bizTypeBars?: BarRow[];
  geoBars?: BarRow[];
  donutSegments?: DonutSeg[];
  leads?: ScenarioLead[];
  followUpChips?: string[];
  chartType?: "biz" | "geo" | "donut";
}

export interface SearchScenario {
  id: string;
  prompt: string;
  match: (prompt: string) => boolean;
  title: string;
  totalMatches: number;
  pageSize: number;
  processingDescs: [string, string, string];
  thoughtProcess: string[];
  summaryIntro: string;
  insights: InsightBlock[];
  recommendation: string;
  sources: string[];
  bizTypeBars: BarRow[];
  geoBars: BarRow[];
  donutSegments: DonutSeg[];
  leads: ScenarioLead[];
  followUpChips: string[];
  refineGuidance: string;
  refinements: RefinementConfig[];
}

function L(
  name: string,
  location: string,
  phone: string,
  industry: string,
  revenue: string,
  employees: string,
  contact: string,
  title: string,
  email: string,
  verified = true,
): ScenarioLead {
  const maskName = (s: string) =>
    s
      .split(" ")
      .map((w) => (w.length <= 1 ? w : w[0] + "*".repeat(Math.min(w.length - 1, 8))))
      .join(" ");
  return {
    name,
    nameMasked: maskName(name),
    location,
    phone,
    phoneMasked: phone.replace(/(\(\d{3}\)\s*)\d{3}/, "$1***"),
    industry,
    revenue,
    employees,
    contact,
    contactMasked: maskName(contact),
    title,
    email,
    emailMasked: email.includes("@") ? "***** *****" : "get email address",
    verified,
  };
}

// ── Healthcare CA ────────────────────────────────────────────────────────────

const HC_LEADS: ScenarioLead[] = [
  L("Pathways Health", "Los Angeles, CA", "(310) 555-0182", "Physicians 8011-01", "$1-2.5 Million", "51-100", "Patricia Wong", "CEO", "patricia@pathwayshealth.com"),
  L("Xcell Medical", "San Diego, CA", "(619) 555-0234", "Medical Clinics 8011-03", "$2.5-5 Million", "101-250", "Xia Clark", "Medical Director", "xia.clark@xcellmedical.com"),
  L("Quantum PT", "Sacramento, CA", "(916) 555-0311", "Rehab Facilities 8049-01", "$500K-1 Million", "11-50", "Quinn Pi", "Owner", "q.pi@quantumpt.com", false),
  L("Alpha Care Group", "San Francisco, CA", "(415) 555-0418", "Group Practice 8011-02", "$5-10 Million", "101-250", "Alice Smith", "President", "a.smith@alphacare.com"),
  L("Bay Diagnostic Labs", "San Jose, CA", "(408) 555-0520", "Diagnostic Labs 8071-01", "$2.5-5 Million", "51-100", "Brian Ortega", "Lab Director", "b.ortega@baydiag.com"),
  L("Summit Urgent Care", "Long Beach, CA", "(562) 555-0633", "Urgent Care 8011-07", "$1-2.5 Million", "21-50", "Sara Nguyen", "Operations Manager", "s.nguyen@summituc.com"),
  L("Pacific Specialty Center", "Irvine, CA", "(949) 555-0744", "Specialty Centers 8011-04", "$5-10 Million", "101-250", "David Park", "CEO", "d.park@pacificspecialty.com"),
  L("Horizon Home Health", "Fresno, CA", "(559) 555-0855", "Home Health 8082-01", "$1-2.5 Million", "51-100", "Elena Ruiz", "Clinical Director", "e.ruiz@horizonhh.com"),
  L("Coastal Ambulatory Surg", "Anaheim, CA", "(714) 555-0966", "Ambulatory Surgical 8011-05", "$10-25 Million", "101-250", "Marcus Lee", "Administrator", "m.lee@coastalasc.com"),
  L("Valley Telehealth", "Riverside, CA", "(951) 555-1077", "Telehealth 8099-02", "$500K-1 Million", "11-50", "Nina Patel", "Founder", "n.patel@valleyth.com"),
  L("Oakland Rehab Partners", "Oakland, CA", "(510) 555-1188", "Rehab Facilities 8049-01", "$2.5-5 Million", "51-100", "James Torres", "Owner", "j.torres@oaklandrehab.com"),
  L("Metro Family Practice", "Santa Ana, CA", "(714) 555-1299", "Independent Practice 8011-01", "$1-2.5 Million", "21-50", "Karen Cho", "Physician Owner", "k.cho@metrofp.com"),
  L("Golden State Diagnostics", "Bakersfield, CA", "(661) 555-1301", "Diagnostic Labs 8071-01", "$5-10 Million", "101-250", "Robert Hale", "VP Operations", "r.hale@gsdiag.com"),
  L("Harbor Specialty Clinic", "Chula Vista, CA", "(619) 555-1412", "Specialty Centers 8011-04", "$2.5-5 Million", "51-100", "Michelle Grant", "Practice Manager", "m.grant@harborspec.com"),
  L("Sierra Primary Care", "Stockton, CA", "(209) 555-1523", "Independent Practice 8011-01", "$500K-1 Million", "11-50", "Tom Bradley", "Owner", "t.bradley@sierrapc.com", false),
  L("Pacific Coast Hospitals Aff", "Los Angeles, CA", "(213) 555-1634", "Hospital-affiliated 8062-01", "$25-50 Million", "250+", "Linda Chen", "Network Director", "l.chen@pchaff.com"),
  L("North Bay Group Practice", "San Francisco, CA", "(415) 555-1745", "Group Practice 8011-02", "$10-25 Million", "101-250", "Steve Morales", "CEO", "s.morales@northbaygp.com"),
  L("Inland Empire Urgent", "Riverside, CA", "(951) 555-1856", "Urgent Care 8011-07", "$1-2.5 Million", "21-50", "Amy Foster", "Owner", "a.foster@ieurge.com"),
  L("Central Valley Home Care", "Fresno, CA", "(559) 555-1967", "Home Health 8082-01", "$2.5-5 Million", "51-100", "Carlos Mendez", "Operations Director", "c.mendez@cvhomecare.com"),
  L("Tech Valley Telemed", "San Jose, CA", "(408) 555-2078", "Telehealth 8099-02", "$5-10 Million", "51-100", "Priya Shah", "CEO", "p.shah@tvtelemed.com"),
];

const HC_LEADS_100PLUS = HC_LEADS.filter((l) =>
  ["101-250", "250+"].includes(l.employees),
).concat([
  L("Statewide Health Network", "Los Angeles, CA", "(213) 555-3001", "Hospital-affiliated 8062-01", "$50-100 Million", "250+", "Helen Brooks", "COO", "h.brooks@shn.com"),
  L("Pacific Multi-Specialty", "San Diego, CA", "(619) 555-3002", "Group Practice 8011-02", "$25-50 Million", "250+", "Greg Alvarez", "CEO", "g.alvarez@pmspec.com"),
  L("Bay Area Surgical Group", "San Francisco, CA", "(415) 555-3003", "Ambulatory Surgical 8011-05", "$10-25 Million", "101-250", "Diana Wu", "Administrator", "d.wu@basg.com"),
  L("Capitol Region Clinics", "Sacramento, CA", "(916) 555-3004", "Group Practice 8011-02", "$10-25 Million", "101-250", "Frank Ito", "Medical Director", "f.ito@crclinics.com"),
]);

const HC_LEADS_LA_SD = HC_LEADS.filter(
  (l) =>
    l.location.includes("Los Angeles") ||
    l.location.includes("San Diego") ||
    l.location.includes("Long Beach") ||
    l.location.includes("Chula Vista"),
);

export const HEALTHCARE_SCENARIO: SearchScenario = {
  id: "healthcareCalifornia",
  prompt: "Show healthcare businesses in California with verified contacts",
  match: (p) => {
    const x = p.toLowerCase();
    return x.includes("healthcare") || (x.includes("california") && x.includes("verified"));
  },
  title: "Healthcare Businesses in California — 12,486 Qualified Matches Found",
  totalMatches: 12486,
  pageSize: 10,
  processingDescs: [
    "Scanning 7M+ healthcare business records across California",
    "Applying verified-contact, location, and business-type filters",
    "Ranking leads by match score and contact quality",
  ],
  thoughtProcess: [
    "Applied filters: California · Healthcare · Verified contacts",
    "Ranked by: verified contact availability, revenue, employee count",
    "Data source: Data Axle Business Database (prototype mock — July 2026)",
  ],
  summaryIntro:
    "I found <strong>12,486 healthcare businesses in California</strong> with verified contacts matching your criteria. Here is a breakdown of the results:",
  insights: [
    {
      label: "Business type",
      text: "Independent practices lead at 35% (4,402), followed by group practices (26%) and hospital-affiliated organizations (15%). Independent operators typically move faster through vendor evaluation.",
    },
    {
      label: "Geographic concentration",
      text: "Los Angeles (1,847) and San Diego (1,124) account for the highest match density. San Francisco and Sacramento follow, making them strong secondary targets.",
    },
    {
      label: "Employee size",
      text: "38% of matched businesses have 51–100 employees, indicating mid-size operations likely to have dedicated procurement staff. Contact readiness is highest in this band.",
    },
    {
      label: "Contact readiness",
      text: "All 12,486 matches include at least one verified contact. Decision-maker titles (Owner, CEO, Medical Director) appear on 61% of records.",
    },
  ],
  recommendation:
    "Prioritise independent practices in Los Angeles and San Diego with verified executive contacts. This cohort has the fastest response time and the highest proportion of decision-maker titles on file.",
  sources: [
    "1. US Business Database — Healthcare (prototype mock)",
    "2. Verified Contacts Data Axle File — California region (prototype mock)",
  ],
  bizTypeBars: [
    { label: "Independent practices", value: 4402 },
    { label: "Group practices", value: 3187 },
    { label: "Hospital-affiliated", value: 1846 },
    { label: "Urgent care clinics", value: 1523 },
    { label: "Specialty centers", value: 1298 },
    { label: "Ambulatory surgical", value: 1074 },
    { label: "Diagnostic labs", value: 921 },
    { label: "Rehab facilities", value: 743 },
    { label: "Home health agencies", value: 612 },
    { label: "Telehealth providers", value: 498 },
    { label: "Corporate chains", value: 382 },
  ],
  geoBars: [
    { label: "Los Angeles", value: 1847 },
    { label: "San Diego", value: 1124 },
    { label: "San Francisco", value: 892 },
    { label: "Sacramento", value: 681 },
    { label: "San Jose", value: 574 },
    { label: "Fresno", value: 398 },
    { label: "Long Beach", value: 341 },
    { label: "Oakland", value: 318 },
    { label: "Bakersfield", value: 287 },
    { label: "Anaheim", value: 264 },
    { label: "Riverside", value: 241 },
    { label: "Santa Ana", value: 223 },
    { label: "Irvine", value: 208 },
    { label: "Stockton", value: 187 },
    { label: "Chula Vista", value: 165 },
  ],
  donutSegments: [
    { label: "1–10 employees", pct: 12, color: "#fca5a5" },
    { label: "11–50 employees", pct: 35, color: "#86efac" },
    { label: "51–100 employees", pct: 38, color: "#5eead4" },
    { label: "101–250 employees", pct: 12, color: "#c4b5fd" },
    { label: "250+ employees", pct: 3, color: "#93c5fd" },
  ],
  leads: HC_LEADS,
  followUpChips: [
    "Only show businesses with 100+ employees",
    "Focus on Los Angeles and San Diego",
    "Show businesses with verified executive contacts",
    "Exclude hospital-affiliated organizations",
  ],
  refineGuidance: "Want to narrow these results? Add another requirement below and I'll refine this list.",
  refinements: [
    {
      id: "hc-100plus",
      match: (p) => {
        const x = p.toLowerCase();
        return x.includes("100+") || (x.includes("100") && x.includes("employee")) || x.includes("more than 100");
      },
      insight: "I narrowed the previous results to businesses with 100+ employees.",
      subtext: "Qualified matches reduced from 12,486 to 3,214 — larger practices with dedicated procurement staff.",
      newCount: 3214,
      title: "Healthcare Businesses in California (100+ employees) — 3,214 Matches",
      summaryIntro:
        "I refined your California healthcare list to <strong>3,214 businesses with 100+ employees</strong> and verified contacts.",
      chartType: "donut",
      donutSegments: [
        { label: "101–250 employees", pct: 72, color: "#c4b5fd" },
        { label: "250+ employees", pct: 28, color: "#93c5fd" },
      ],
      bizTypeBars: [
        { label: "Group practices", value: 982 },
        { label: "Hospital-affiliated", value: 864 },
        { label: "Specialty centers", value: 512 },
        { label: "Ambulatory surgical", value: 398 },
        { label: "Independent practices", value: 286 },
        { label: "Diagnostic labs", value: 172 },
      ],
      leads: HC_LEADS_100PLUS,
      followUpChips: [
        "Focus on Los Angeles and San Diego",
        "Show only group practices",
        "Exclude hospital-affiliated organizations",
      ],
    },
    {
      id: "hc-la-sd",
      match: (p) => {
        const x = p.toLowerCase();
        return x.includes("los angeles") || x.includes("san diego");
      },
      insight: "I narrowed the previous results to Los Angeles and San Diego metro areas.",
      subtext: "Qualified matches reduced to 5,860. These two markets remain the densest healthcare clusters.",
      newCount: 5860,
      title: "Healthcare Businesses — Los Angeles & San Diego — 5,860 Matches",
      summaryIntro:
        "I refined your list to <strong>5,860 healthcare businesses in Los Angeles and San Diego</strong> with verified contacts.",
      chartType: "geo",
      geoBars: [
        { label: "Los Angeles", value: 3210 },
        { label: "San Diego", value: 1980 },
        { label: "Long Beach", value: 410 },
        { label: "Chula Vista", value: 260 },
      ],
      leads: HC_LEADS_LA_SD.length >= 8 ? HC_LEADS_LA_SD : HC_LEADS.slice(0, 12),
      followUpChips: [
        "Only show businesses with 100+ employees",
        "Show only independent practices",
        "Show businesses with verified executive contacts",
      ],
    },
    {
      id: "hc-exec",
      match: (p) => {
        const x = p.toLowerCase();
        return x.includes("executive") || (x.includes("verified") && x.includes("contact") && !x.includes("healthcare"));
      },
      insight: "I narrowed results to businesses with verified executive contacts.",
      subtext: "Qualified matches reduced to 7,612 records with Owner, CEO, or Medical Director titles verified.",
      newCount: 7612,
      chartType: "biz",
      leads: HC_LEADS.filter((l) =>
        ["CEO", "Owner", "President", "Medical Director", "Physician Owner"].includes(l.title),
      ),
    },
    {
      id: "hc-excl-hosp",
      match: (p) => {
        const x = p.toLowerCase();
        return x.includes("exclude hospital") || x.includes("hospital-affiliated");
      },
      insight: "I excluded hospital-affiliated organizations from your list.",
      subtext: "Qualified matches reduced from 12,486 to 10,640 — focusing on independent and group practices.",
      newCount: 10640,
      chartType: "biz",
      bizTypeBars: [
        { label: "Independent practices", value: 4402 },
        { label: "Group practices", value: 3187 },
        { label: "Urgent care clinics", value: 1523 },
        { label: "Specialty centers", value: 1298 },
        { label: "Ambulatory surgical", value: 1074 },
      ],
      leads: HC_LEADS.filter((l) => !l.industry.toLowerCase().includes("hospital")),
    },
  ],
};

// ── Texas restaurants ────────────────────────────────────────────────────────

const TX_LEADS: ScenarioLead[] = [
  L("Lone Star Grill", "Houston, TX", "(713) 555-2101", "Full-service restaurants 5812-01", "$2.5-5 Million", "21-50", "Jake Morales", "Owner", "jake@lonestargrill.com"),
  L("Hill Country BBQ Co", "Austin, TX", "(512) 555-2202", "Bar & grill 5813-02", "$5-10 Million", "51-100", "Maria Santos", "General Manager", "m.santos@hcbbq.com"),
  L("Metro Fast Casual", "Dallas, TX", "(214) 555-2303", "Fast casual 5812-08", "$10-25 Million", "101-250", "Chris Nguyen", "Regional Director", "c.nguyen@metrofc.com"),
  L("Alamo Pizza Kitchen", "San Antonio, TX", "(210) 555-2404", "Pizza restaurants 5812-05", "$1-2.5 Million", "21-50", "Rosa Delgado", "Owner", "rosa@alamopizza.com"),
  L("Cowboys Steakhouse", "Fort Worth, TX", "(817) 555-2505", "Steak houses 5812-03", "$5-10 Million", "51-100", "Bill Harper", "Owner", "bill@cowboyssteak.com"),
  L("Gulf Coast Seafood", "Corpus Christi, TX", "(361) 555-2606", "Seafood restaurants 5812-04", "$2.5-5 Million", "21-50", "Elena Cruz", "Manager", "e.cruz@gcseafood.com"),
  L("Plano Asian Kitchen", "Plano, TX", "(972) 555-2707", "Asian restaurants 5812-07", "$1-2.5 Million", "21-50", "Wei Chen", "Owner", "wei@planoasian.com"),
  L("Arlington QSR Group", "Arlington, TX", "(817) 555-2808", "Quick-service restaurants 5812-09", "$10-25 Million", "101-250", "Dana Brooks", "VP Operations", "d.brooks@aqsr.com"),
  L("Desert Rose Mexican", "El Paso, TX", "(915) 555-2909", "Mexican restaurants 5812-06", "$2.5-5 Million", "51-100", "Luis Vargas", "Owner", "luis@desertrose.mx"),
  L("Lubbock American Diner", "Lubbock, TX", "(806) 555-3010", "American restaurants 5812-02", "$1-2.5 Million", "21-50", "Amy Cole", "Owner", "amy@lubbockdiner.com", false),
  L("Houston Hot Pot House", "Houston, TX", "(713) 555-3111", "Asian restaurants 5812-07", "$5-10 Million", "51-100", "Kevin Park", "CEO", "k.park@hothouse.com"),
  L("Dallas Bakery Cafe", "Dallas, TX", "(214) 555-3212", "Cafes/bakeries 5812-10", "$1-2.5 Million", "21-50", "Sophie Lane", "Founder", "sophie@dallasbakery.com"),
  L("Austin Taco Collective", "Austin, TX", "(512) 555-3313", "Mexican restaurants 5812-06", "$2.5-5 Million", "21-50", "Rico Alvarez", "Owner", "rico@austintaco.com"),
  L("SA Bar & Grill Co", "San Antonio, TX", "(210) 555-3414", "Bar & grill 5813-02", "$5-10 Million", "51-100", "Tina Brooks", "General Manager", "t.brooks@sabg.com"),
  L("North Texas Steak Co", "Dallas, TX", "(972) 555-3515", "Steak houses 5812-03", "$10-25 Million", "101-250", "Mike Reynolds", "President", "m.reynolds@ntsteak.com"),
  L("Bayou Full Service", "Houston, TX", "(281) 555-3616", "Full-service restaurants 5812-01", "$5-10 Million", "51-100", "Carla Mendez", "Owner", "carla@bayoufs.com"),
  L("Fort Worth Fast Plate", "Fort Worth, TX", "(817) 555-3717", "Fast casual 5812-08", "$2.5-5 Million", "21-50", "Jon Pierce", "Owner", "jon@fwfast.com"),
  L("Plano Pizza Works", "Plano, TX", "(469) 555-3818", "Pizza restaurants 5812-05", "$1-2.5 Million", "21-50", "Nina Ortiz", "Manager", "nina@planopizza.com"),
  L("Corpus Quick Bites", "Corpus Christi, TX", "(361) 555-3919", "Quick-service restaurants 5812-09", "$2.5-5 Million", "51-100", "Sam Torres", "Owner", "sam@cqbites.com"),
  L("El Paso Grill House", "El Paso, TX", "(915) 555-4020", "Full-service restaurants 5812-01", "$5-10 Million", "51-100", "Ana Ruiz", "CEO", "ana@epgrill.com"),
];

export const RESTAURANTS_SCENARIO: SearchScenario = {
  id: "restaurantsTexas",
  prompt: "Find restaurants in Texas with more than 20 employees",
  match: (p) => {
    const x = p.toLowerCase();
    return x.includes("restaurant") || (x.includes("texas") && x.includes("employee"));
  },
  title: "Texas Restaurants (20+ Employees) — 11,840 Qualified Matches Found",
  totalMatches: 11840,
  pageSize: 10,
  processingDescs: [
    "Scanning restaurant and food-service records across Texas",
    "Applying employee-count (>20) and location filters",
    "Ranking leads by size, revenue, and contact quality",
  ],
  thoughtProcess: [
    "Applied filters: Texas · Restaurants · Employees > 20",
    "Ranked by: employee count, estimated revenue, verified contacts",
    "Data source: Data Axle Business Database (prototype mock — July 2026)",
  ],
  summaryIntro:
    "I found <strong>11,840 restaurants in Texas with more than 20 employees</strong> matching your criteria. Here is a breakdown of the results:",
  insights: [
    {
      label: "Restaurant type",
      text: "Full-service restaurants lead at 28% (3,320), followed by fast casual (18%) and quick-service (14%). Mexican and American concepts are especially strong across major metros.",
    },
    {
      label: "Geographic concentration",
      text: "Houston (2,140) and Dallas (1,980) dominate match density, with Austin and San Antonio as high-growth secondary markets.",
    },
    {
      label: "Employee size",
      text: "All matches exceed 20 employees. The 21–50 band holds 46% of results — multi-unit operators and high-volume independents with dedicated managers.",
    },
    {
      label: "Growth opportunity",
      text: "Mid-size full-service and fast-casual concepts in Houston and Dallas show the strongest combination of headcount and estimated revenue for outbound prospecting.",
    },
  ],
  recommendation:
    "Prioritise full-service and fast-casual restaurants in Houston and Dallas with 51–100 employees — this cohort balances decision-maker access with budget capacity.",
  sources: [
    "1. US Business Database — Restaurants & Food Service (prototype mock)",
    "2. Texas metro business file — employee and revenue attributes (prototype mock)",
  ],
  bizTypeBars: [
    { label: "Full-service restaurants", value: 3320 },
    { label: "Fast casual", value: 2140 },
    { label: "Quick-service restaurants", value: 1680 },
    { label: "Mexican restaurants", value: 1240 },
    { label: "American restaurants", value: 980 },
    { label: "Pizza restaurants", value: 720 },
    { label: "Bar & grill", value: 640 },
    { label: "Asian restaurants", value: 520 },
    { label: "Cafes/bakeries", value: 380 },
    { label: "Seafood restaurants", value: 220 },
  ],
  geoBars: [
    { label: "Houston", value: 2140 },
    { label: "Dallas", value: 1980 },
    { label: "Austin", value: 1520 },
    { label: "San Antonio", value: 1380 },
    { label: "Fort Worth", value: 920 },
    { label: "El Paso", value: 640 },
    { label: "Arlington", value: 480 },
    { label: "Plano", value: 420 },
    { label: "Corpus Christi", value: 310 },
    { label: "Lubbock", value: 250 },
  ],
  donutSegments: [
    { label: "21–50 employees", pct: 46, color: "#86efac" },
    { label: "51–100 employees", pct: 32, color: "#5eead4" },
    { label: "101–250 employees", pct: 15, color: "#c4b5fd" },
    { label: "251–500 employees", pct: 5, color: "#93c5fd" },
    { label: "500+ employees", pct: 2, color: "#fca5a5" },
  ],
  leads: TX_LEADS,
  followUpChips: [
    "Only show businesses with 50+ employees",
    "Focus on Dallas and Houston",
    "Show businesses with estimated revenue above $10M",
    "Exclude franchise locations",
  ],
  refineGuidance: "Want to narrow these results? Add another requirement below and I'll refine this list.",
  refinements: [
    {
      id: "tx-50plus",
      match: (p) => {
        const x = p.toLowerCase();
        return x.includes("50+") || (x.includes("50") && x.includes("employee")) || x.includes("more than 50");
      },
      insight: "I narrowed the previous results to restaurants with 50+ employees.",
      subtext: "Qualified matches reduced from 11,840 to 4,820 — larger multi-unit and high-volume concepts.",
      newCount: 4820,
      title: "Texas Restaurants (50+ Employees) — 4,820 Matches",
      chartType: "donut",
      donutSegments: [
        { label: "51–100 employees", pct: 58, color: "#5eead4" },
        { label: "101–250 employees", pct: 28, color: "#c4b5fd" },
        { label: "251–500 employees", pct: 10, color: "#93c5fd" },
        { label: "500+ employees", pct: 4, color: "#fca5a5" },
      ],
      leads: TX_LEADS.filter((l) => !l.employees.startsWith("21")),
      followUpChips: ["Focus on Dallas and Houston", "Show businesses with estimated revenue above $10M"],
    },
    {
      id: "tx-dallas-houston",
      match: (p) => {
        const x = p.toLowerCase();
        return x.includes("dallas") || x.includes("houston");
      },
      insight: "I narrowed results to Dallas and Houston metro restaurants.",
      subtext: "Qualified matches reduced to 4,120 across the two largest Texas restaurant markets.",
      newCount: 4120,
      chartType: "geo",
      geoBars: [
        { label: "Houston", value: 2140 },
        { label: "Dallas", value: 1980 },
      ],
      leads: TX_LEADS.filter((l) => l.location.includes("Houston") || l.location.includes("Dallas")),
    },
    {
      id: "tx-10m",
      match: (p) => {
        const x = p.toLowerCase();
        return x.includes("10m") || x.includes("$10") || x.includes("above $10");
      },
      insight: "I narrowed results to restaurants with estimated revenue above $10M.",
      subtext: "Qualified matches reduced to 2,150 high-revenue Texas restaurant operators.",
      newCount: 2150,
      chartType: "biz",
      leads: TX_LEADS.filter((l) => l.revenue.includes("10-25") || l.revenue.includes("25")),
    },
  ],
};

// ── Manufacturers >$5M ───────────────────────────────────────────────────────

const MFG_LEADS: ScenarioLead[] = [
  L("Precision Metal Works", "Cleveland, OH", "(216) 555-4101", "Fabricated metals 3441", "$10-25 Million", "100-249", "Tom Bradley", "Plant Manager", "t.bradley@pmw.com"),
  L("Midwest Machinery Co", "Chicago, IL", "(312) 555-4202", "Industrial machinery 3541", "$25-50 Million", "250-499", "Sara Kim", "VP Operations", "s.kim@mwmach.com"),
  L("Gulf Plastics Extrusion", "Houston, TX", "(713) 555-4303", "Plastics 3089", "$5-10 Million", "50-99", "Carlos Rivera", "Owner", "c.rivera@gpe.com"),
  L("Atlantic Electronics Mfg", "Boston, MA", "(617) 555-4404", "Electronics 3672", "$50-100 Million", "500+", "Diana Cho", "CEO", "d.cho@aemfg.com"),
  L("Heartland Food Processors", "Omaha, NE", "(402) 555-4505", "Food manufacturing 2011", "$25-50 Million", "250-499", "Mike Olsen", "President", "m.olsen@hfp.com"),
  L("Summit Chemical Solutions", "Pittsburgh, PA", "(412) 555-4606", "Chemicals 2819", "$10-25 Million", "100-249", "Laura Hess", "Procurement Director", "l.hess@scs.com"),
  L("Pacific Packaging Systems", "Portland, OR", "(503) 555-4707", "Packaging 2653", "$5-10 Million", "50-99", "Ryan Fox", "Operations Director", "r.fox@pps.com"),
  L("Great Lakes Transport Eq", "Detroit, MI", "(313) 555-4808", "Transportation equipment 3714", "$100M+", "500+", "Angela Brooks", "COO", "a.brooks@glte.com"),
  L("MedTech Components Inc", "Minneapolis, MN", "(612) 555-4909", "Medical equipment 3841", "$25-50 Million", "100-249", "Priya Nair", "CEO", "p.nair@medtechc.com"),
  L("Southern Building Mats", "Atlanta, GA", "(404) 555-5010", "Building materials 3272", "$10-25 Million", "100-249", "James Cole", "Owner", "j.cole@sbm.com"),
  L("Northland Furniture Mfg", "Grand Rapids, MI", "(616) 555-5111", "Furniture 2511", "$5-10 Million", "50-99", "Ellen Park", "Plant Manager", "e.park@nfm.com", false),
  L("Tri-State Textiles", "Charlotte, NC", "(704) 555-5212", "Textiles 2211", "$10-25 Million", "100-249", "Omar Hassan", "VP Operations", "o.hassan@tstex.com"),
  L("Cascade Electronics", "Seattle, WA", "(206) 555-5313", "Electronics 3672", "$25-50 Million", "250-499", "Nina Wells", "CEO", "n.wells@cascadeelec.com"),
  L("Prairie Ag Equipment", "Des Moines, IA", "(515) 555-5414", "Industrial machinery 3523", "$50-100 Million", "250-499", "Ben Carter", "President", "b.carter@pae.com"),
  L("Riverbend Metal Fab", "St. Louis, MO", "(314) 555-5515", "Fabricated metals 3441", "$5-10 Million", "50-99", "Chris Dunn", "Owner", "c.dunn@rbmf.com"),
  L("Sunbelt Plastics Group", "Dallas, TX", "(214) 555-5616", "Plastics 3089", "$25-50 Million", "100-249", "Maria Lopez", "COO", "m.lopez@spg.com"),
  L("Appalachian Chemicals", "Knoxville, TN", "(865) 555-5717", "Chemicals 2819", "$10-25 Million", "100-249", "Greg Hale", "Plant Manager", "g.hale@appchem.com"),
  L("Coastal Food Canners", "Sacramento, CA", "(916) 555-5818", "Food manufacturing 2033", "$50-100 Million", "500+", "Helen Cho", "CEO", "h.cho@cfcanners.com"),
  L("Frontier Packaging", "Denver, CO", "(303) 555-5919", "Packaging 2653", "$10-25 Million", "100-249", "Steve Ortiz", "Operations Director", "s.ortiz@frontierpkg.com"),
  L("Lakeside Medical Devices", "Milwaukee, WI", "(414) 555-6020", "Medical equipment 3841", "$25-50 Million", "100-249", "Amy Fischer", "VP Operations", "a.fischer@lmd.com"),
];

export const MANUFACTURERS_SCENARIO: SearchScenario = {
  id: "manufacturersRevenue",
  prompt: "Find manufacturers with annual revenue above $5M",
  match: (p) => {
    const x = p.toLowerCase();
    return x.includes("manufacturer") || (x.includes("revenue") && x.includes("5"));
  },
  title: "Manufacturers with Revenue Above $5M — 16,720 Qualified Matches Found",
  totalMatches: 16720,
  pageSize: 10,
  processingDescs: [
    "Scanning manufacturing business records nationwide",
    "Applying revenue (> $5M) and industry classification filters",
    "Ranking leads by revenue band, headcount, and contact quality",
  ],
  thoughtProcess: [
    "Applied filters: Manufacturing · Annual revenue > $5M",
    "Ranked by: revenue band, employee size, operations contacts",
    "Data source: Data Axle Business Database (prototype mock — July 2026)",
  ],
  summaryIntro:
    "I found <strong>16,720 manufacturers with annual revenue above $5M</strong> matching your criteria. Here is a breakdown of the results:",
  insights: [
    {
      label: "Industry concentration",
      text: "Fabricated metals (18%) and industrial machinery (15%) lead the cohort, followed by food manufacturing and plastics — strong fits for industrial sales motions.",
    },
    {
      label: "Revenue distribution",
      text: "All matches exceed $5M annual revenue. The $5–10M band holds 34% of results; $10–25M adds another 29% — a deep mid-market pool.",
    },
    {
      label: "Employee size",
      text: "Companies with 100–249 employees represent 31% of matches and typically have identifiable plant and procurement leadership.",
    },
    {
      label: "Geographic concentration",
      text: "Midwest and South Central manufacturing corridors dominate: Ohio, Illinois, Texas, Michigan, and Pennsylvania lead state density.",
    },
  ],
  recommendation:
    "Prioritise fabricated metals and industrial machinery companies in the $10–50M revenue band with Plant Manager or VP Operations contacts on file.",
  sources: [
    "1. US Business Database — Manufacturing industries (prototype mock)",
    "2. Revenue and employee attributes file (prototype mock)",
  ],
  bizTypeBars: [
    { label: "Fabricated metals", value: 3010 },
    { label: "Industrial machinery", value: 2510 },
    { label: "Food manufacturing", value: 2180 },
    { label: "Plastics", value: 1840 },
    { label: "Electronics", value: 1520 },
    { label: "Chemicals", value: 1340 },
    { label: "Transportation equipment", value: 1180 },
    { label: "Medical equipment", value: 980 },
    { label: "Packaging", value: 860 },
    { label: "Building materials", value: 720 },
    { label: "Furniture", value: 480 },
    { label: "Textiles", value: 300 },
  ],
  geoBars: [
    { label: "Ohio", value: 1680 },
    { label: "Illinois", value: 1520 },
    { label: "Texas", value: 1480 },
    { label: "Michigan", value: 1320 },
    { label: "Pennsylvania", value: 1180 },
    { label: "California", value: 1060 },
    { label: "Indiana", value: 920 },
    { label: "Wisconsin", value: 840 },
    { label: "North Carolina", value: 780 },
    { label: "Georgia", value: 720 },
  ],
  donutSegments: [
    { label: "$5M–$10M", pct: 34, color: "#86efac" },
    { label: "$10M–$25M", pct: 29, color: "#5eead4" },
    { label: "$25M–$50M", pct: 18, color: "#c4b5fd" },
    { label: "$50M–$100M", pct: 12, color: "#93c5fd" },
    { label: "$100M+", pct: 7, color: "#fca5a5" },
  ],
  leads: MFG_LEADS,
  followUpChips: [
    "Only show companies above $25M revenue",
    "Focus on manufacturers with 100+ employees",
    "Show businesses with operations contacts",
    "Focus on industrial machinery companies",
  ],
  refineGuidance: "Want to narrow these results? Add another requirement below and I'll refine this list.",
  refinements: [
    {
      id: "mfg-25m",
      match: (p) => {
        const x = p.toLowerCase();
        return x.includes("25m") || x.includes("$25") || x.includes("above $25");
      },
      insight: "I narrowed results to manufacturers with revenue above $25M.",
      subtext: "Qualified matches reduced from 16,720 to 5,840 — larger industrial operators.",
      newCount: 5840,
      chartType: "donut",
      donutSegments: [
        { label: "$25M–$50M", pct: 48, color: "#c4b5fd" },
        { label: "$50M–$100M", pct: 32, color: "#93c5fd" },
        { label: "$100M+", pct: 20, color: "#fca5a5" },
      ],
      leads: MFG_LEADS.filter(
        (l) =>
          l.revenue.includes("25-50") ||
          l.revenue.includes("50-100") ||
          l.revenue.includes("100M") ||
          l.revenue.includes("$100"),
      ),
    },
    {
      id: "mfg-100emp",
      match: (p) => {
        const x = p.toLowerCase();
        return (x.includes("100+") || x.includes("100")) && x.includes("employee");
      },
      insight: "I narrowed results to manufacturers with 100+ employees.",
      subtext: "Qualified matches reduced to 8,210 plants with identifiable operations leadership.",
      newCount: 8210,
      chartType: "biz",
      leads: MFG_LEADS.filter((l) => !l.employees.startsWith("50")),
    },
    {
      id: "mfg-ops",
      match: (p) => {
        const x = p.toLowerCase();
        return x.includes("operations") || x.includes("plant manager");
      },
      insight: "I focused on manufacturers with operations contacts on file.",
      subtext: "Qualified matches reduced to 6,480 with Plant Manager, VP Operations, or COO titles.",
      newCount: 6480,
      chartType: "biz",
      leads: MFG_LEADS.filter((l) => /plant|operations|coo|procurement/i.test(l.title)),
    },
    {
      id: "mfg-machinery",
      match: (p) => {
        const x = p.toLowerCase();
        return x.includes("machinery") || x.includes("industrial machinery");
      },
      insight: "I focused on industrial machinery manufacturers.",
      subtext: "Qualified matches reduced to 2,510 industrial machinery companies above $5M revenue.",
      newCount: 2510,
      chartType: "geo",
      leads: MFG_LEADS.filter((l) => l.industry.toLowerCase().includes("machinery")),
    },
  ],
};

// ── Seattle cafes ────────────────────────────────────────────────────────────

const SEA_LEADS: ScenarioLead[] = [
  L("Pike Place Roasters", "Downtown, Seattle", "(206) 555-6101", "Specialty coffee · 0.4 mi", "$500K-1 Million", "5-9", "Jamie Cole", "Owner", "jamie@pproasters.com"),
  L("Capitol Hill Brew Bar", "Capitol Hill, Seattle", "(206) 555-6202", "Independent coffee shops · 1.8 mi", "$1-2.5 Million", "10-19", "Maya Singh", "Founder", "maya@chbrew.com"),
  L("Belltown Morning Cafe", "Belltown, Seattle", "(206) 555-6303", "Breakfast cafes · 0.9 mi", "$500K-1 Million", "5-9", "Owen Park", "Owner", "owen@belltownam.com"),
  L("SLU Espresso Lab", "South Lake Union, Seattle", "(206) 555-6404", "Specialty coffee · 1.2 mi", "$1-2.5 Million", "10-19", "Nina Cho", "General Manager", "nina@sluelab.com"),
  L("Queen Anne Tea & Coffee", "Queen Anne, Seattle", "(206) 555-6505", "Tea & coffee shops · 2.4 mi", "$250-500K", "1-4", "Laura Kim", "Owner", "laura@qatc.com", false),
  L("Fremont Bakery Cafe", "Fremont, Seattle", "(206) 555-6606", "Bakery cafes · 3.1 mi", "$1-2.5 Million", "10-19", "Chris Hale", "Owner", "chris@fremontbakery.com"),
  L("Ballard Bean Co", "Ballard, Seattle", "(206) 555-6707", "Independent coffee shops · 4.6 mi", "$500K-1 Million", "5-9", "Sara Lind", "Founder", "sara@ballardbean.com"),
  L("U-District Study Cafe", "University District, Seattle", "(206) 555-6808", "Independent coffee shops · 3.8 mi", "$500K-1 Million", "5-9", "Dev Patel", "Owner", "dev@udcafe.com"),
  L("Pioneer Square Pour", "Pioneer Square, Seattle", "(206) 555-6909", "Coffee chains · 0.6 mi", "$2.5-5 Million", "20-49", "Amy Brooks", "Operations Manager", "amy@pspour.com"),
  L("First Hill Pastry House", "First Hill, Seattle", "(206) 555-7010", "Bakery cafes · 1.1 mi", "$500K-1 Million", "5-9", "Tom Ruiz", "Owner", "tom@fhpastry.com"),
  L("Harbor Dessert Cafe", "Downtown, Seattle", "(206) 555-7111", "Dessert cafes · 0.8 mi", "$250-500K", "1-4", "Elena Cho", "Owner", "elena@harbordessert.com"),
  L("Cascade Roastery Cafe", "South Lake Union, Seattle", "(206) 555-7212", "Roasters · 1.5 mi", "$1-2.5 Million", "10-19", "Ben Walsh", "Founder", "ben@cascaderoast.com"),
  L("Hilltop Independent Coffee", "Capitol Hill, Seattle", "(206) 555-7313", "Independent coffee shops · 2.0 mi", "$500K-1 Million", "5-9", "Priya Nair", "Owner", "priya@hilltopcoffee.com"),
  L("Waterfront Chain Cafe", "Downtown, Seattle", "(206) 555-7414", "Coffee chains · 0.3 mi", "$5-10 Million", "20-49", "Mark Jensen", "District Manager", "mark@wfchain.com"),
  L("Green Lake Specialty", "Green Lake, Seattle", "(206) 555-7515", "Specialty coffee · 5.2 mi", "$500K-1 Million", "5-9", "Hannah Lee", "Owner", "hannah@glspec.com"),
  L("West Seattle Bakery", "West Seattle, Seattle", "(206) 555-7616", "Bakery cafes · 6.8 mi", "$1-2.5 Million", "10-19", "Joe Carter", "Owner", "joe@wsbakery.com"),
  L("Magnolia Morning", "Magnolia, Seattle", "(206) 555-7717", "Breakfast cafes · 4.2 mi", "$250-500K", "1-4", "Kate Morris", "Owner", "kate@magmorning.com", false),
  L("SoDo Industrial Coffee", "SoDo, Seattle", "(206) 555-7818", "Roasters · 2.9 mi", "$1-2.5 Million", "10-19", "Ryan Cole", "Operations Manager", "ryan@sodocoffee.com"),
  L("Madison Park Tea Room", "Madison Park, Seattle", "(206) 555-7919", "Tea & coffee shops · 3.6 mi", "$250-500K", "1-4", "Lisa Huang", "Owner", "lisa@mptearoom.com"),
  L("Rainier Dessert Bar", "Columbia City, Seattle", "(206) 555-8020", "Dessert cafes · 7.4 mi", "$500K-1 Million", "5-9", "Andre Wells", "Founder", "andre@rainierdessert.com"),
];

export const CAFES_SCENARIO: SearchScenario = {
  id: "cafesSeattle",
  prompt: "Find cafes within 10 miles of downtown Seattle",
  match: (p) => {
    const x = p.toLowerCase();
    return x.includes("cafe") || x.includes("seattle") || x.includes("coffee");
  },
  title: "Cafes within 10 Miles of Downtown Seattle — 842 Qualified Matches Found",
  totalMatches: 842,
  pageSize: 10,
  processingDescs: [
    "Scanning cafe and coffee-shop records near downtown Seattle",
    "Applying 10-mile radius and business-type filters",
    "Ranking leads by distance, size, and contact quality",
  ],
  thoughtProcess: [
    "Applied filters: Cafe / coffee · Within 10 miles of downtown Seattle",
    "Ranked by: distance from downtown, employee size, verified contacts",
    "Data source: Data Axle Business Database (prototype mock — July 2026)",
  ],
  summaryIntro:
    "I found <strong>842 cafes within 10 miles of downtown Seattle</strong> matching your criteria. Here is a breakdown of the results:",
  insights: [
    {
      label: "Cafe type",
      text: "Independent coffee shops lead at 34% (286), followed by specialty coffee (22%) and bakery cafes (16%). Chains concentrate closest to downtown tourist corridors.",
    },
    {
      label: "Distance concentration",
      text: "42% of matches sit within 0–2 miles of downtown. Density drops steadily outward; only 8% fall in the 8–10 mile band.",
    },
    {
      label: "Neighborhood concentration",
      text: "Downtown, Capitol Hill, and South Lake Union together hold nearly half of qualified cafes — strong for walkable and office-adjacent outreach.",
    },
    {
      label: "Business profile",
      text: "Most independents are 1–19 employees with Owner or Founder contacts — ideal for localized partnership and wholesale beverage pitches.",
    },
  ],
  recommendation:
    "Prioritise independent and specialty cafes within 2 miles of downtown, then expand to Capitol Hill and South Lake Union for denser Owner/Founder coverage.",
  sources: [
    "1. US Business Database — Cafes & coffee shops (prototype mock)",
    "2. Seattle metro geo file — distance to downtown (prototype mock)",
  ],
  bizTypeBars: [
    { label: "Independent coffee shops", value: 286 },
    { label: "Specialty coffee", value: 184 },
    { label: "Bakery cafes", value: 136 },
    { label: "Breakfast cafes", value: 92 },
    { label: "Tea & coffee shops", value: 68 },
    { label: "Coffee chains", value: 52 },
    { label: "Roasters", value: 24 },
  ],
  geoBars: [
    { label: "Downtown", value: 148 },
    { label: "Capitol Hill", value: 126 },
    { label: "South Lake Union", value: 98 },
    { label: "Belltown", value: 84 },
    { label: "Queen Anne", value: 72 },
    { label: "Fremont", value: 64 },
    { label: "Ballard", value: 58 },
    { label: "University District", value: 52 },
    { label: "Pioneer Square", value: 46 },
    { label: "First Hill", value: 40 },
  ],
  donutSegments: [
    { label: "0–2 miles", pct: 42, color: "#86efac" },
    { label: "2–4 miles", pct: 26, color: "#5eead4" },
    { label: "4–6 miles", pct: 16, color: "#c4b5fd" },
    { label: "6–8 miles", pct: 8, color: "#93c5fd" },
    { label: "8–10 miles", pct: 8, color: "#fca5a5" },
  ],
  leads: SEA_LEADS,
  followUpChips: [
    "Only show independent cafes",
    "Limit results to within 5 miles",
    "Show cafes with 10+ employees",
    "Focus on Capitol Hill and Downtown",
  ],
  refineGuidance: "Want to narrow these results? Add another requirement below and I'll refine this list.",
  refinements: [
    {
      id: "sea-indep",
      match: (p) => p.toLowerCase().includes("independent"),
      insight: "I narrowed results to independent cafes.",
      subtext: "Qualified matches reduced from 842 to 510 — Owner/Founder-led shops within 10 miles.",
      newCount: 510,
      chartType: "biz",
      bizTypeBars: [
        { label: "Independent coffee shops", value: 286 },
        { label: "Specialty coffee", value: 120 },
        { label: "Bakery cafes", value: 64 },
        { label: "Breakfast cafes", value: 40 },
      ],
      leads: SEA_LEADS.filter(
        (l) =>
          l.industry.toLowerCase().includes("independent") ||
          l.industry.toLowerCase().includes("specialty") ||
          l.title === "Owner" ||
          l.title === "Founder",
      ),
    },
    {
      id: "sea-5mi",
      match: (p) => {
        const x = p.toLowerCase();
        return x.includes("5 mile") || x.includes("within 5");
      },
      insight: "I limited results to cafes within 5 miles of downtown.",
      subtext: "Qualified matches reduced from 842 to 286 — denser downtown-adjacent cohort.",
      newCount: 286,
      chartType: "donut",
      donutSegments: [
        { label: "0–2 miles", pct: 62, color: "#86efac" },
        { label: "2–4 miles", pct: 28, color: "#5eead4" },
        { label: "4–5 miles", pct: 10, color: "#c4b5fd" },
      ],
      leads: SEA_LEADS.filter((l) => {
        const m = l.industry.match(/([\d.]+)\s*mi/);
        return m ? parseFloat(m[1]) <= 5 : true;
      }),
    },
    {
      id: "sea-10emp",
      match: (p) => {
        const x = p.toLowerCase();
        return (x.includes("10+") || x.includes("10")) && x.includes("employee");
      },
      insight: "I narrowed results to cafes with 10+ employees.",
      subtext: "Qualified matches reduced to 198 multi-staff cafes and small chains.",
      newCount: 198,
      chartType: "biz",
      leads: SEA_LEADS.filter((l) => !l.employees.startsWith("1-") && !l.employees.startsWith("5-")),
    },
    {
      id: "sea-cap-dt",
      match: (p) => {
        const x = p.toLowerCase();
        return x.includes("capitol") || (x.includes("downtown") && x.includes("focus"));
      },
      insight: "I focused on Capitol Hill and Downtown cafes.",
      subtext: "Qualified matches reduced to 274 shops in the two densest neighborhoods.",
      newCount: 274,
      chartType: "geo",
      geoBars: [
        { label: "Downtown", value: 148 },
        { label: "Capitol Hill", value: 126 },
      ],
      leads: SEA_LEADS.filter(
        (l) => l.location.includes("Downtown") || l.location.includes("Capitol Hill"),
      ),
    },
  ],
};

export const SEARCH_SCENARIOS: SearchScenario[] = [
  HEALTHCARE_SCENARIO,
  RESTAURANTS_SCENARIO,
  MANUFACTURERS_SCENARIO,
  CAFES_SCENARIO,
];

export const SUGGESTED_PROMPTS = SEARCH_SCENARIOS.map((s) => s.prompt);

export function resolveScenario(prompt: string): SearchScenario {
  const hit = SEARCH_SCENARIOS.find((s) => s.match(prompt));
  return hit ?? HEALTHCARE_SCENARIO;
}

/** Deterministic prototype one-time list prices — never random. */
const LIST_PURCHASE_PRICES: Record<string, number> = {
  restaurantsTexas: 1500,
  healthcareCalifornia: 1600,
  manufacturersRevenue: 1800,
  cafesSeattle: 600,
};

const LIST_DISPLAY_NAMES: Record<string, string> = {
  restaurantsTexas: "Texas Restaurants",
  healthcareCalifornia: "California Healthcare",
  manufacturersRevenue: "Manufacturers ($5M+)",
  cafesSeattle: "Seattle Cafes",
};

export function estimateListPurchasePrice(scenarioId: string): number {
  return LIST_PURCHASE_PRICES[scenarioId] ?? 1500;
}

export function listDisplayName(scenarioId: string, query: string): string {
  return LIST_DISPLAY_NAMES[scenarioId] ?? (query.length > 40 ? `${query.slice(0, 40)}…` : query);
}

export function buildListPurchaseContext(query: string, resultCount: number) {
  const sc = resolveScenario(query);
  return {
    pricingMode: "purchase-list" as const,
    source: "signalfuse-results" as const,
    query,
    scenarioId: sc.id,
    listName: listDisplayName(sc.id, query),
    resultCount,
    estimatedPrice: estimateListPurchasePrice(sc.id),
  };
}

export function resolveRefinement(scenario: SearchScenario, prompt: string): RefinementConfig | null {
  return scenario.refinements.find((r) => r.match(prompt)) ?? null;
}

export function pageCount(total: number, pageSize: number) {
  return Math.max(1, Math.ceil(total / pageSize));
}

/** Merge a refinement onto the base scenario for display. */
export function applyRefinement(
  base: SearchScenario,
  refinement: RefinementConfig | null,
  previousCount: number,
): {
  title: string;
  totalMatches: number;
  summaryIntro: string;
  insights: InsightBlock[];
  recommendation: string;
  thoughtProcess: string[];
  bizTypeBars: BarRow[];
  geoBars: BarRow[];
  donutSegments: DonutSeg[];
  leads: ScenarioLead[];
  followUpChips: string[];
  insightLine?: string;
  subtext?: string;
  isRefined: boolean;
} {
  if (!refinement) {
    return {
      title: base.title,
      totalMatches: previousCount || base.totalMatches,
      summaryIntro: base.summaryIntro,
      insights: base.insights,
      recommendation: base.recommendation,
      thoughtProcess: base.thoughtProcess,
      bizTypeBars: base.bizTypeBars,
      geoBars: base.geoBars,
      donutSegments: base.donutSegments,
      leads: base.leads,
      followUpChips: base.followUpChips,
      isRefined: false,
    };
  }

  const count = refinement.newCount;
  return {
    title: refinement.title ?? `Refined results — ${count.toLocaleString()} Qualified Matches`,
    totalMatches: count,
    summaryIntro:
      refinement.summaryIntro ??
      `I narrowed the previous results to <strong>${count.toLocaleString()} matches</strong> based on your additional criteria.`,
    insights: refinement.insights ?? base.insights,
    recommendation: refinement.recommendation ?? base.recommendation,
    thoughtProcess: refinement.thoughtProcess ?? [
      ...base.thoughtProcess.slice(0, 1),
      `Refinement applied: ${refinement.insight}`,
      base.thoughtProcess[2],
    ],
    bizTypeBars: refinement.bizTypeBars ?? base.bizTypeBars,
    geoBars: refinement.geoBars ?? base.geoBars,
    donutSegments: refinement.donutSegments ?? base.donutSegments,
    leads: refinement.leads ?? base.leads,
    followUpChips: refinement.followUpChips ?? base.followUpChips,
    insightLine: refinement.insight,
    subtext: refinement.subtext,
    isRefined: true,
  };
}
