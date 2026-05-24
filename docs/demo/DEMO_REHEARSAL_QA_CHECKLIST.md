# Demo Rehearsal QA Checklist
## Additive Insure — Version 1.1 Controlled Demonstrator

This document provides a pre-flight QA checklist for presenters to ensure the Version 1.1 Controlled Demonstrator is running correctly and that all governance disclaimers are respected prior to a live stakeholder presentation.

---

## 1. Pre-Flight Technical Verification

Perform these checks on your local machine before starting the presentation meeting.

| Step | Check Item | Verification Action | Status |
|---|---|---|---|
| 1 | **Environment Start** | Run `npm run dev` inside the `app/` folder. Ensure no compilation errors. | `[ ]` |
| 2 | **Browser Launch** | Open `http://localhost:5173` in Chrome or Edge. | `[ ]` |
| 3 | **State Reset** | Click `Underwriter / Broker View` and click **Reset Simulation**. Verify state is `IDLE`. | `[ ]` |
| 4 | **Fixtures Load** | Verify the FMCG Site Card displays: Property SI **£50M**, BI SI **£75M**, Excess **£4M**. | `[ ]` |
| 5 | **Font Rendering** | Ensure Inter font loads properly (no fallback serif fonts visible in UI). | `[ ]` |

---

## 2. Interactive Journey QA Checklist

Simulate the full demo journey once to ensure interactive states transition correctly.

| Journey Step | Expected UI State | Verification Action | Status |
|---|---|---|---|
| **Step 1: IDLE** | Site Event View active. Status: `IDLE`. Perimeter water level showing green dry state. | Ensure no warning banner is visible. | `[ ]` |
| **Step 2: RISING** | Click `Simulate Time +`. Water rises to perimeter warning height. | Timeline moves to step 2. Action remains inactive. | `[ ]` |
| **Step 3: ALERT** | Click `Simulate Time +`. Red/Amber Watch/Action Alert banner appears. | Check that the **Mark Action Complete** CTA is active. | `[ ]` |
| **Step 4: RESOLVED** | Click `Mark Action Complete`. Banner changes to green "Event Resolved". | Verify sensor readings and action completion logged. | `[ ]` |
| **Step 5: LEDGER** | Click `Evidence / Impact Ledger` in sidebar. | Confirm 3 entries are present (Rising, Alert, Resolved). | `[ ]` |
| **Step 6: UNDERWRITER**| Click `Underwriter / Broker View`. | Confirm **£3,000,000** hero number is displayed. | `[ ]` |
| **Step 7: CONTRAST** | Click `Reset Simulation` while on Underwriter View. | Hero card must change to amber **£3,500,000** exposure. | `[ ]` |
| **Step 8: PORTFOLIO** | Click `Portfolio Teaser`. | Verify 4 rows load correctly with status labels. | `[ ]` |
| **Step 9: SUMMARY** | Click `Evidence Summary` and click **Print / Export**. | Print preview should load clean, un-styled content. | `[ ]` |

---

## 3. Governance & Cautious Language Checklist

Ensure your verbal presentation matches the accepted product disclaimers.

* **No Restricted Terms:** Ensure you do **not** use the following terms:
  * `[ ]` *Proven* (use **Evidence-qualified** or **Verifiable**)
  * `[ ]` *Guaranteed* (use **Probable** or **Estimated**)
  * `[ ]` *Validated prediction* (use **Simulated reading** or **Assumed pathway**)
  * `[ ]` *Loss prevented / savings achieved* (use **Probable avoided retained loss**)
  * `[ ]` *Premium reduction* (use **Potential risk credit** or **Commercial visibility**)
  * `[ ]` *Claims avoided* (use **Avoided retained exposure**)
* **Gaps Acknowledgement:** When showing the Underwriter View, always point out at least one item from the **Evidence Gaps** panel to show balanced engineering transparency.
* **Limitations Reminder:** Remind stakeholders that the system is currently a *controlled demonstrator* running on simulated inputs, with live sensor telemetry scheduled for future roadmap phases.

---

*Demo Rehearsal QA Checklist Version 1.1 — Additive Insure*
