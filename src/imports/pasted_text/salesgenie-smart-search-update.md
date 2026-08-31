Update the existing SalesGenie Smart Search prototype. Use the uploaded screenshots as the exact reference for the chat-processing, text-result, visualisation, qualified-lead, limited-prompt, and exhausted-prompt states.

Do not redesign the SalesGenie shell. Preserve the current sidebar, 64 px top app bar, single prompt allowance pill in the app bar, compact Smart Search header, History button, and fixed bottom composer.

## Required flow

### 1. Suggested prompt → processing state

When the user clicks a suggested prompt on the landing page:

* Move that exact prompt into a compact, right-aligned user chat bubble.
* Show the user avatar “SM” beside the bubble.
* On the left, show the multicolour sparkle icon and the label **“SignalFuse”** as the assistant/model identity. This is a display label only—do not create any model-selection dropdown.
* Show a lightweight stepper below it, matching the uploaded reference:

  * “Reviewing available data”
  * “Identifying qualified matches”
  * “Building insights”
* Use small circular status dots and a thin vertical blue connector.
* Add a compact outlined status row: code icon + “Executing Query”.
* Prototype interaction: after approximately 4–5 seconds, transition automatically to the completed text-result state.
* Keep all stepper and system text at **14 px**, regular weight. No oversized cards or bold alerts.

### 2. Completed text insight state

After processing, show the completed assistant response in the exact hierarchy from the reference:

* SignalFuse label with sparkle icon.
* Short system explanation:

  * “Good, now I can see the data format. The SIC codes are 6-digit codes, and manufacturing SIC codes range from 20–39 (first 2 digits).”
* Compact “Thought process” disclosure row.
* Result title:

  * “Texas Restaurants with More Than 20 Employees”
* Result text:

  * “I found 11,029 restaurants in Texas with more than 20 employees.”
* Largest employers list.
* Brief explanatory paragraph.
* Expandable “Sources (2)” section.
* “Is this useful?” with thumbs-up, thumbs-down, and feedback icons.

Use 14 px text throughout. Use only restrained semibold emphasis for the title and company names. Keep the content left aligned in the available workspace; do not centre it in a narrow column.

### 3. Visualisation state — sequential, not tabs

Below the text insight, show visualisations as consecutive assistant outputs in the conversation flow.

* Do not create “Audience Insights” tabs.
* Do not create Geographic / Business type / Employee size / Contact readiness navigation.
* Start with:

  * SignalFuse + sparkle icon
  * Heading: “Business type breakdown”
* Show one chart card below:

  * “Top restaurant types among qualified matches”
  * horizontal bar chart, matching the uploaded reference
  * Restaurants: 41
  * Pizza establishments: 11
  * Coffee shops: 10
  * remaining categories in light gray
* A later assistant response may show another different chart below it, such as location distribution or employee range, but each chart must be a separate vertical conversation block—not a tab.

### 4. Qualified lead list state

Below the insight/chart sequence, show one section only:

* Heading: “Top Qualified Leads”
* Helper text: “Ranked by revenue and employee count with verified contact information.”
* Show one notification/action banner only:

  * Left: “Save Lead List”
  * Supporting text: “71 qualified leads ready to export or launch a campaign”
  * Right actions: save icon button, download/export icon button, and primary “Unlock List” button
* Do not repeat “Top Qualified Leads.”
* Do not add a second Save List, Purchase List, Unlock Details, or bottom CTA row.
* Use the three-column obfuscated lead table from the reference:

  * Business Information
  * Business Details
  * Contacts
* Show four masked lead rows and pagination.
* This is the only place where save, export, and unlock actions appear.

### 5. Fixed composer and alignment

* Keep the bottom composer fixed, with a total footer height of approximately **105 px**.
* Composer must align with the conversation/list content area: equal left and right margins.
* Do not let it stick to the right viewport edge.
* Placeholder: “Ask me to refine, expand or narrow your lead list…”
* Keep microphone and send buttons inside the composer.
* Below it, centre the disclaimer:

  * “SalesGenie AI may make mistakes. Review criteria before opening your list.”
* Do not show suggested prompt chips in this footer.

### 6. Prompt-limit states

Create these as separate profile-driven prototype states.

In the profile dropdown, add a small internal prototype-only section called “Account scenario”:

* Freemium — 24 prompts left
* Freemium — 1 prompt left
* Freemium — prompts exhausted
* Subscriber — free prompts remaining
* Subscriber — credit usage

Do not make this scenario selector prominent in the production UI.

#### Freemium: 1 prompt left

* App-bar pill: “1 of 25 free prompts left”
* Show a slim light-blue banner immediately above the composer:

  * “1 free prompt remaining. Upgrade anytime for unlimited access.”
* Include dismiss icon.
* Do not show other upgrade banners.

#### Freemium: prompts exhausted

* App-bar pill: “0 of 25 free prompts left”
* Replace the composer with one compact gradient-outline upgrade panel:

  * Title: “You’ve used all your free prompts”
  * Copy: “Upgrade to keep searching with NLP. Subscription prompts carry forward, and you can top up with credits at 2 credits per prompt.”
  * Buttons: “View plans” and “Buy credits”
* Keep the disclaimer below.
* Do not show a prompt input in this state.

#### Subscriber states

* Show a subscriber allowance or credit balance only in the global app bar.
* Do not duplicate it in the page header or content area.
* After free prompts are used, a refinement costs 2 credits; show this as a compact confirmation state, not a large banner.

## Strict exclusions

* No Audience Insights tab bar.
* No duplicate “Top Qualified Leads” heading.
* No duplicated Save / Unlock / Purchase CTAs.
* No duplicate prompt meter.
* No large coloured warning cards in completed-result states.
* No large empty whitespace between the compact page header and the conversation.
* No stretched footer composer touching the right edge.
* Do not alter the SalesGenie navigation or create unrelated dashboard components.
