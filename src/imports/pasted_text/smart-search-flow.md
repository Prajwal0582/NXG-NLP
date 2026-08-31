Fix the Smart Search conversation flow across all account scenarios. The current prototype incorrectly refreshes/replaces the page after each prompt. Replace that behavior with one continuous, scrollable conversation.

Do not change the left navigation, app bar, profile scenarios, landing page, or visual styling. Update only the Smart Search results flow.

## Core interaction rule — must apply everywhere

After a user submits the first prompt or any follow-up prompt:

* Never refresh the page.
* Never clear the previous output.
* Never return to the initial full-page thinking screen.
* Keep all previous user messages, text insights, charts, and lead lists visible above.
* Append every new user prompt and its result below the existing conversation, like ChatGPT.
* Automatically scroll the content area to the latest user message and generated response.
* Keep the bottom composer sticky and usable throughout.

## First-prompt result flow

When a user selects a suggested prompt or enters a new query, append this sequence in the Smart Search conversation:

1. Right-aligned user message bubble with the selected prompt.
2. SignalFuse processing block:

   * sparkle icon + “SignalFuse”
   * compact “Thought process” disclosure
   * short explanation of applied criteria
   * lightweight stepper
   * “Executing query” outlined status row
3. Rich text insight response.
4. Two or three different visualisations, stacked vertically.
5. Top Qualified Leads section with a list/table.
6. Suggested follow-up chips.
7. Sticky bottom composer.

## Rich text insight

Do not generate only a few short lines. Use a credible, structured result:

* Result title
* Qualified lead count
* Business-type/industry insight
* Geographic insight
* Employee-size or contact-readiness insight
* Practical recommendation for outreach
* Sources disclosure
* Thumbs-up / thumbs-down feedback

Use compact 14 px text and short paragraphs. Keep it left aligned within the shared 1150 px content column.

## Visualisations — stacked, never tabs

Show two or three different visualisations as individual blocks below the text response:

* Business/industry breakdown: pastel horizontal bar chart
* Geographic concentration: ranked locations chart or simple map/density graphic
* Employee range or verified-contact availability: donut or segmented chart

Requirements:

* Use soft pastel teal, blue, lavender, and gray.
* Place each chart below the previous one in the conversation.
* Do not create Geographic / Business Type / Employee Size / Contact Readiness tabs.
* Do not repeat the same bar chart three times.

## Qualified-lead list

Below the visualisations, show only one “Top Qualified Leads” section.

* One title only: “Top Qualified Leads”
* One helper line only.
* One Save Lead List banner only, with save, download, and Unlock List actions.
* Do not duplicate Save List, Unlock Details, Purchase List, or footer CTAs.

### Freemium table

* Obfuscate business and contact details with lock icons and asterisks.
* Keep city, industry, revenue range, employee range, and job role visible.
* Show four rows and pagination: “1 of 4 pages” for 71 qualified leads.

### Subscriber table

* Use the exact same table layout.
* Reveal company name, contact name, phone number, email, and verified badges.
* Do not show locks or obfuscation.

## Follow-up prompt behavior

When a user enters a follow-up prompt, for example “Only show independent restaurants”:

1. Keep the original completed result visible.
2. Append the follow-up as a new right-aligned user message directly below the previous result.
3. Append a small SignalFuse processing block below it.
4. Append a refined text response below that, for example:

   * “Your list is now limited to independent restaurants.”
   * “Qualified matches reduced from 11,029 to 3,482.”
5. Append one refined visualisation and an updated qualified-lead list below the new response.
6. Show new suggested follow-up chips below the newest list only.

The conversation should visibly read as:

Original user query
→ first analysis
→ charts
→ first lead list
→ follow-up user query
→ refined analysis
→ refined chart
→ refined lead list

## Account-specific rules

* Freemium with prompts remaining: allow generation and show masked list data.
* Freemium with one prompt left: allow one final continuous result and show the low-prompt notice above the sticky composer.
* Freemium with zero prompts: append the user prompt, then show the friendly upgrade empty state instead of generating insights, charts, or leads.
* Subscribers: show complete lead data.
* Existing Subscriber: total must be **10 prompts**, for example “9 of 10 free prompts left.”
* Subscriber using credits: allow continuous results after prompt allowance is exhausted; deduct 2 credits per submitted prompt using the existing confirmation pattern.

## Final instruction

Treat this as a chat-history implementation correction. Build results vertically inside one persistent conversation, not as separate replacement pages or standalone result states.
