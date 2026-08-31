Update the existing Smart Search chat/results screens using the uploaded reference screens as the exact layout source. This is a targeted correction only. Preserve the current SalesGenie sidebar, app bar, profile control, and overall desktop styling.

## 1. Remove duplicate prompt allowance

* Keep the AI prompt allowance pill only once: in the global top app bar, beside the profile avatar.
* Remove the duplicate “23 of 25 free prompts left” pill from the page/content header entirely.
* Keep the top app bar height at approximately **64 px**.

## 2. Compact page header

Replace the current two-line “Texas Restaurants / Smart Search” header with a compact single-line header:

* Left: back arrow + **“Smart Search”**
* Use regular/medium-weight dark text, not bold display text.
* Do not show “Texas Restaurants” as a large separate heading.
* Optional small contextual query may appear below only where needed, for example: “Healthcare businesses California,” in 14 px muted gray.
* Right: outlined History button with clock icon.
* Use a thin divider below the header.
* Keep the header compact so the conversation begins close to the top. Do not leave a large white gap.

## 3. Conversation layout

Use the uploaded references as the exact interaction pattern.

* Use the maximum available content width within the main panel; do not centre the conversation in a narrow column.
* Align assistant content to the left with a left content margin around 115–140 px from the main workspace edge.
* Align user messages to the right.
* User message bubble: light gray, compact, **14 px** text, no oversized padding.
* Assistant label: sparkle icon + “SalesGenie AI”. Do not use SignalFuse branding.
* Assistant/system text: **14 px**, regular weight, dark slate.
* Avoid bold headings, large text, coloured alerts, oversized cards, decorative gradients, or marketing-style callouts.
* Keep the interface calm, minimal, and data-focused.

### Processing state

Use a lightweight vertical step/progress pattern matching the reference:

* “Understanding your request”
* “Checking available data”
* “Identifying qualified matches”
* “Building insights”

Use small dot/status icons and a thin vertical connector. The active step may use blue; inactive steps use muted gray.

Example assistant message:

“Good, I can see the data format. I’m reviewing the available criteria and identifying qualified matches.”

Do not expose technical model logic or use heavy “Executing Query” cards.

## 4. Text result state

Use the reference text hierarchy with compact 14 px content:

* Assistant label: SalesGenie AI
* Result title, regular/semi-bold but not oversized:

  * “Texas Restaurants with More Than 20 Employees”
* Result statement:

  * “I found 11,029 restaurants in Texas with more than 20 employees.”
* Supporting text and bullet list:

  * “The largest employers include:”
  * Kades Corp (Pasadena) — 2,700 employees
  * Kemah Waterfront (Kemah) — 1,000 employees
  * Future Infrastructure (Mesquite) — 1,000 employees
  * McDonald’s Management Office (Longview) — 600 employees
  * Shellers (Cedar Park) — 600 employees
  * Brinker International, Inc (Coppell) — 600 employees
* Add compact “Sources (2)” disclosure and feedback icons below.
* Do not use orange warning cards or large CTA banners in the standard result state.

## 5. Insight visualizations

After the text result, show “Audience insights” using varied, compact visualizations—not repeated vertical bar charts.

Use separate result frames/states for:

* Geographic distribution: a small Texas density/map-style visualization.
* Business type breakdown: horizontal bars.
* Employee-size distribution: segmented horizontal distribution.
* Contact availability: donut or stacked indicator.

Use light borders and restrained card styling. Charts should be visible within the main content flow, not dominate the whole screen.

## 6. Top qualified leads

Below insights, show:

* Heading: “Top Qualified Leads”
* Short helper text: “Ranked by revenue and employee count with verified contact information.”
* Three-column lead table:

  * Business Information
  * Business Details
  * Contacts
* Preserve the freemium obfuscation pattern from the reference: masked company/contact names, lock icons, partially hidden phone/email details.
* Keep the table compact, with four visible rows and pagination.
* Add a subtle Save Lead List / Unlock List action bar above the table only where appropriate.

## 7. Bottom composer and footer

Create a fixed bottom area with a maximum total height of **105 px**.

* Remove the suggested-prompt chips from the fixed footer.
* Keep only the follow-up composer:

  * Placeholder: “Ask me to refine, expand or narrow your lead list…”
  * microphone and send icons on the right
  * compact single-line input with the existing purple → blue → cyan border
* Below the input, show only:

  * “SalesGenie AI may make mistakes. Review criteria before opening your list.”
* Keep this disclaimer small and centred.
* Do not add coloured notification banners in the default state.

### Low-prompt and exhausted states

Show these only as separate prototype states, not by default:

* **1 prompt left:** a slim, low-emphasis notice directly above the composer:

  * “1 free prompt remaining. Upgrade anytime for unlimited access.”
* **0 prompts left:** replace the composer with a compact upgrade panel:

  * Heading: “You’ve used all your free prompts”
  * Supporting text: “Upgrade your account to continue refining leads with AI.”
  * CTAs: “View plans” and “Buy credits”

## Strict exclusions

* No duplicate prompt meter.
* No SignalFuse label.
* No oversized bold typography.
* No coloured warning cards in standard results.
* No suggested prompts in the footer.
* No large empty area above the chat.
* Do not centre the chat in a narrow column.
* Do not redesign any existing SalesGenie navigation or application shell.
