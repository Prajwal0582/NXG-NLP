Update the existing SalesGenie Smart Search prototype. Preserve the current SalesGenie shell, 1150 px centred content column, sticky composer, app bar, and profile-driven scenarios.

## 1. Continuous conversation — critical change

Do not refresh, replace, or return the chat to the initial thinking screen when a user submits a follow-up prompt.

The Smart Search experience must behave like one continuous conversation:

* Keep the original user prompt, completed text insight, charts, and qualified-lead table visible in the scrollable conversation.
* When the user submits a follow-up, append a new right-aligned user bubble below the existing result.
* Directly below that new bubble, append a compact SignalFuse processing response.
* After processing, append the refined output below it.
* Scroll the conversation to the newly added user message and response.
* Never remove previous generated results.

Example sequence:

1. User: “Find restaurants in Texas with more than 20 employees”
2. SignalFuse: text insight → charts → qualified-lead table
3. User: “Only show independent restaurants”
4. SignalFuse: short processing state → updated insight → refined chart → refined lead list

## 2. Follow-up processing state

For each follow-up prompt, show a compact inline processing block below the new user bubble:

* SignalFuse sparkle icon + “SignalFuse”
* “Thought process” expandable label
* Brief explanation of applied refinement, for example:

  * “I’m narrowing the audience to independent restaurants while retaining the existing Texas and employee-count criteria.”
* Lightweight stepper:

  * “Applying your refinement”
  * “Updating qualified matches”
  * “Refreshing insights”
* Compact outlined status row: “Executing query”
* Transition to the next result after 4–5 seconds.

Keep all previous messages visible above. Do not use a full-page loading state.

## 3. Existing subscriber prompt allowance

Correct the existing subscriber scenario:

* Existing Subscriber starts with **10 free prompts**, not 25.
* After one prompt, app-bar text must read:

  * **“9 of 10 free prompts left”**
* All existing-subscriber prompt states must use a total of 10.

## 4. Freemium user with exhausted prompts

Freemium users with 0 prompts must still be able to submit a prompt from the landing page.

Flow:

1. User enters or clicks a suggested prompt on the landing screen.
2. Navigate to the Smart Search chat screen.
3. Show the user’s prompt as a right-aligned chat bubble.
4. Do not show processing, insights, charts, or a lead list.
5. Show a friendly empty/limit state in the conversation area.

Empty state content:

* Add a simple, polished illustration: locked sparkle/search icon with a subtle gradient accent. It must feel helpful, not like a technical error.
* Heading: **“You’ve used all your free prompts”**
* Supporting copy:
  **“Upgrade your account to continue using Smart Search and refine your ideal lead list with AI.”**
* Primary CTA: **“View plans”**
* Secondary CTA: **“Buy credits”**
* Keep the state vertically balanced in the 1150 px content area.
* Do not use a 404 label, red error styling, technical language, or a generic system-error message.
* Keep the standard disclaimer at the bottom.

## 5. Rich first-result output

For a successful first freemium prompt, create a complete, credible response in this order:

1. User query bubble
2. SignalFuse processing state
3. Text insight block
4. Two to three visualisations, vertically stacked
5. Freemium obfuscated lead-list table
6. Suggested follow-up prompt chips
7. Sticky composer

### Text insight

Use richer natural-language content, not only three short lines:

* Result heading
* Total qualified lead count
* Key industry/business-type finding
* Geographic concentration finding
* Contact-readiness or employee-size finding
* Short practical recommendation for outreach
* Sources disclosure and feedback controls

Use compact 14 px text with normal line height and short paragraphs. Keep the tone business-focused and explanatory.

### Visualisations

Show 2–3 different chart types below the text, as sequential SignalFuse outputs:

* Horizontal bar chart: business/industry breakdown
* Ranked geographic chart or simplified location-density visual
* Donut chart or segmented distribution: employee-size or verified-contact availability

Use soft pastel blue, teal, lavender, and muted gray. Do not use tabs and do not repeat the same chart type.

### Lead list

For freemium:

* Keep company/contact details obfuscated with lock icons and asterisks.
* Keep non-sensitive business details visible.
* Include one Save Lead List / download / Unlock List banner only.
* Show four rows and correct pagination for 71 leads: “1 of 4 pages.”

For subscribers:

* Use the exact same table layout but reveal full company, contact, phone, email, and verification details.

## 6. Follow-up outputs

Each follow-up output should be smaller and clearly connected to the previous list:

* Show what changed, for example:

  * “Your list is now limited to independent restaurants.”
  * “Qualified matches reduced from 11,029 to 3,482.”
* Replace only the latest active chart/list below the follow-up response.
* Preserve the earlier conversation above it as historical context.
* Keep follow-up chips below the newest result only.

## Strict exclusions

* Do not reload the entire chat for a follow-up.
* Do not clear prior results.
* Do not use 25 as the total for Existing Subscriber prompts.
* Do not generate results for a freemium user with zero prompts.
* Do not create a technical 404 error state.
* Do not create a full-page loading screen for follow-up prompts.
