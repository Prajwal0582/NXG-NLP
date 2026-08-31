Create an interactive, high-fidelity SalesGenie NLP lead-search prototype using the attached PRD and reference screens as the primary source of truth.
Critical visual direction
Replicate the existing SalesGenie application shell exactly from the uploaded screenshots. Do not redesign or replace it.
Preserve the dark navy left navigation, Data Axle Salesgenie logo, Business/Consumer toggle, active Search state, navigation icons, upgrade card, support details, white top header, SM profile control, spacing, typography, borders, rounded corners, shadows, and overall desktop proportions.
Use the same visual language: clean enterprise SaaS, white content canvas, navy/slate text, thin light-gray dividers, blue/teal/purple gradient only as a subtle AI accent.
Reuse the attached landing page and results-page structure. Do not invent a new dashboard, a new navigation system, or a radically different chat UI.
This feature uses one NLP model only. Do not add a model-picker, model switcher, or “SignalFuse” dropdown inside the input field. The assistant identity may be displayed simply as “SalesGenie AI” with a small sparkle icon.
Keep the primary desktop frame close to the supplied 1440–1920 px widescreen reference layout.
Prototype structure
Create four clearly named prototype flows/pages, each using the same existing SalesGenie shell:
New Freemium User
Existing Freemium User
New Subscription User
Existing Subscription User
Make all key CTAs clickable and connect the frames so this can be presented as a realistic end-to-end prototype. Use realistic sample data, not lorem ipsum.
Global NLP search experience
Landing screen
Use the uploaded landing screen as the exact visual baseline.
Heading: “Hi Jason,” followed by “What are we prospecting today?”
Supporting copy: “Explore, analyze, and uncover insights through natural-language queries”
Large natural-language input with placeholder: “Describe the leads you want to find in natural language”
Keep microphone and send icons.
Keep the inline link: “Prefer manual search for prospecting?”
Suggested prompt chips:
“Find US businesses in California with fewer than 500 employees where I can sell ergonomic chairs”
“Show US consumers in Texas aged 40+ who may need wheelchairs”
“Find restaurants in Texas with more than 20 employees”
“Find manufacturers with annual revenue above $5M”
Clicking any suggested prompt should submit it and open the chat/search-processing state.
Clicking “Prefer manual search for prospecting?” should open a manual-search screen that still uses the exact same SalesGenie shell and visual language. Keep this page simple: heading “Manual Search,” standard search criteria fields for Industry, Location, Employee size, Revenue, and a primary “Search leads” CTA. This is only an alternate entry point; do not create a new product experience.
Processing / thinking state
After a user submits a prompt, transform the landing screen into the existing chat-result layout shown in the reference.
Header example: back arrow, “Texas Restaurants,” and “Smart Search.”
Show the user prompt as a right-aligned message bubble.
Show “SalesGenie AI” on the left with a sparkle icon.
Use an elegant vertical progress/timeline treatment:
Understanding your audience
Searching US Business data
Identifying qualified matches
Building insights and lead list
Include an “Executing query” card with animated/progress-like styling.
After processing, transition to the completed insight and list view.
Maintain a fixed follow-up prompt input at the bottom: “Ask me to refine, expand or narrow your lead list…”
Follow-up examples should work as clickable suggestion chips or typed-message examples:
“Only show independent restaurants”
“Focus on Houston, Dallas and Austin”
“Show businesses with verified contacts”
“Narrow this to companies with 50–250 employees”
Insight and results experience
Use a polished conversation-led layout, but make the insight area more interactive and varied than a single bar chart.
For the example query “Find restaurants in Texas with more than 20 employees,” show:
Result statement: “I found 11,029 restaurants in Texas with more than 20 employees.”
A clear range recommendation banner because the result count exceeds 10,000:
“This audience is broad. Narrow your criteria for a more focused outreach list.”
Include actions: “Refine search” and a secondary “Continue anyway.”
Short reasoning/insight summary:
Independent focus — independent operators typically evaluate vendors faster than franchise networks.
Verified contacts — prioritise verified contacts to improve first-outreach connection rates.
Texas focus — Houston, Dallas, and Austin have the highest match density.
An expandable “How this list was built” / reasoning row. Do not expose technical chain-of-thought; show only a short, user-friendly explanation of applied criteria and matched data sources.
Include useful source links in an expandable “Sources (2)” area.
Interactive visualization area
Create an “Audience Insights” section with 3–4 compact cards or tabs. Use varied visualizations, not repeated bar charts:
Geographic concentration
Simplified Texas map or geographic density visualization.
Highlight Houston, Dallas, Austin, and San Antonio.
Hover interaction/tooltip example: “Houston — 2,890 qualified leads | 26% of matches.”
Business type mix
Donut chart with categories such as Independent restaurants, Franchise locations, Coffee shops, Pizza establishments, and Other.
Hover tooltips show count and percentage.
Employee-size distribution
Horizontal histogram or segmented distribution showing 20–49, 50–99, 100–249, 250–499, and 500+ employees.
Clicking a segment should visually apply that refinement to the list.
Contact readiness
Small scorecard or stacked bar showing Verified contacts, Phone available, Email available, and Limited contact data.
Use subtle hover tooltips and selected states to make the visualizations feel interactive. Keep visuals data-focused, readable, and consistent with SalesGenie—not decorative.
Lead list
Below the insights, show “Top Qualified Leads” and a three-column table that visually follows the existing reference:
Business Information
Business Details
Contacts
For freemium states, show 4–5 obfuscated lead rows:
Business names partially masked, such as “P********”
Contacts masked, such as “P***** P*”
Phone/email partially hidden
Small lock icons
Visible non-sensitive metadata such as city, industry/SIC group, revenue range, employee range, and job title
Include a clear but non-intrusive upgrade/purchase cue: “Unlock full lead and contact details.”
For subscription states, show the same list with visible company names, contact names, business phone numbers, verified-contact badges, and email availability.
Add list-level actions:
Save list
Purchase list / Unlock details
Continue refining
Clicking a lead row can expand a lightweight details panel/row, but do not build an entirely new record-detail product.
Prompt, credit, and history rules
New Freemium User flow
Starts on the NLP landing screen with “25 free prompts available.”
Display the remaining prompt meter at the top right after the first submitted prompt, e.g. “24 of 25 free prompts left.”
The meter should use the same compact pill/progress-bar treatment as the reference.
User can generate insights, refine the list, save the list, or enter purchase flow.
Save list behavior:
For a Business query, clicking Save list takes the user to Business Saved Lists.
Show a success toast: “List saved to Business Saved Lists.”
After saving, show that the NLP-generated list is locked from further NLP refinement, with the option “Refine using filters.”
Purchase behavior:
Clicking Purchase list opens a Purchase Summary page using the existing SalesGenie style.
Show list name, record count, price summary, selected database, and a primary “Complete purchase” CTA.
After success, show the unmasked records and confirmation that the list was saved in the correct database.
Include “Back to refine list” from Purchase Summary, before purchase completion.
Once the 25 free prompts are exhausted, disable the NLP send action and show an upgrade state: “You’ve used all 25 free prompts. Upgrade to continue using AI lead search.”
Freemium history:
Keep the History button in the upper-right.
On click, open a right-side drawer.
Drawer title: “Search history”
Show a prominent informational banner: “Freemium chat history is available for 7 days.”
Include 3 realistic historical searches with timestamps and expiry labels such as “Expires in 2 days.”
Include a clear upgrade link: “Upgrade for 12 months of history.”
Existing Freemium User flow
Create two entry states:
A. No saved list:
The user lands directly on the same NLP landing page as New Freemium User.
Preserve their remaining free prompt count as a visible state.
B. Has saved lists:
User lands on the existing Business Saved Lists page.
Add a prominent but tasteful AI entry panel above the saved-list content:
Heading: “Find your next audience with AI”
Copy: “Describe the leads you need and get insights before you build your list.”
NLP prompt field and “Try AI search” CTA.
Clicking it opens the NLP landing/search flow.
On low balance, show the same amber warning treatment from the reference:
Top meter: “1 of 25 free prompts left”
Bottom warning above input: “1 free prompt remaining. Upgrade anytime for unlimited access.”
On exhaustion, show an upgrade CTA instead of allowing another prompt.
New Subscription User flow
Start from a user who has upgraded after using freemium prompts.
Show carry-forward logic with a realistic example:
“20 free prompts remaining” because 5 of the original 25 were already used.
After free prompts are used, each submitted prompt costs 2 credits.
Top-right usage pill should change to a credit treatment, for example: “86 credits available” and helper text “2 credits per AI prompt.”
When a prompt is submitted after free prompts are exhausted, show a lightweight confirmation overlay: “This refinement will use 2 credits” with “Continue” and “Cancel.”
After continuing, update the balance, e.g. from 86 to 84 credits.
Basic-plan variation: if credits are unavailable, show a compact “Purchase credits to continue” state rather than allowing the prompt to send.
History drawer should state: “Your chat history is available for 12 months.”
Existing Subscription User flow
Create two entry states:
A. No saved list:
NLP landing experience with “10 free prompts available.”
After the free prompts are consumed, each prompt costs 2 credits.
B. Has saved lists:
Existing Saved Lists page with the same AI entry panel described for Existing Freemium User.
When clicked, it takes the user into Smart Search.
Show a subscriber usage treatment: either remaining free prompts or credits, depending on the selected state.
For Teams-plan visual coverage, include a small note within the usage popover or profile menu: “Prompt allowance applies per license.” Use 25 free prompts per license for new Teams users and 10 per license for existing Teams users. Do not create a separate fifth flow.
Feedback and edge cases
Add thumbs-up and thumbs-down feedback below completed AI responses.
Clicking thumbs-down opens a small modal: “What could be improved?” with a multiline comment field and “Send feedback” CTA.
For a query outside supported scope, show this exact response:
“I can currently help only with finding leads for you.”
For result count below 1,000, show an encouraging insight banner:
“This audience is small. Try broadening one or more criteria to find more leads.”
For 1,000–10,000 results, show a neutral “This is an ideal audience size” state.
Do not show unsupported subject-matter answers or capabilities beyond lead finding across US Business, US Consumer, Buyer Intent, and Purchase Signal data.
Interaction and prototype behavior
Use click interactions between all main frames and overlays.
Suggested prompt → processing → results and insights.
Insight chart hover → contextual tooltip.
Click employee-size segment → refined list visual state.
History → right-side drawer.
Save list → success toast and saved-list destination.
Purchase list → purchase summary → purchase success/unmasked list.
Follow-up prompt → short processing state → refined result state.
Thumbs-down → written-feedback modal.
Profile control can contain a small “Prototype scenario” menu solely for presentation testing, with the four user states. Keep this visually unobtrusive and do not treat it as a production feature.
Final constraints
Keep all reference screenshots visually recognisable as the same SalesGenie product.
Do not introduce a model selector or any “SignalFuse” dropdown in the input field.
Do not make the chat area look like a generic consumer chatbot.
Prioritise a realistic, polished enterprise prototype with credible data, practical CTAs, strong empty/processing/results states, and meaningful interaction.