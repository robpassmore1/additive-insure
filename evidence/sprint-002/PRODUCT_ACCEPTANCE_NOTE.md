# Product Acceptance Note
## Additive Insure — Version 1.1 Controlled Demonstrator

**Date:** 2026-05-24  
**Status:** Accepted  
**Reference:** Version 1.1 Demo-Readiness Baseline  

---

## 1. Acceptance Statement
Version 1.1 is accepted as the demo-readiness baseline for the Additive Insure controlled demonstrator. This version represents the completed Sprint 002 deliverables, refining the working prototype into a meeting-ready product demonstration.

---

## 2. Approved Use
The approved use of Version 1.1 is strictly limited to controlled stakeholder demonstrations. This includes presenting the product narrative and conceptual walkthroughs to:
* Insurers
* Brokers
* Hydrologists
* Risk engineers
* Investors
* Strategic partners

---

## 3. Not Approved For
Version 1.1 is not approved for any live operational, underwriting, or production activities. Specifically, it is **not approved for**:
* **Operational flood forecasting:** Cannot be used to predict or monitor actual weather or flood events.
* **Live sensor use:** No real-time data streams or hardware integrations are supported.
* **Claims defensibility:** The ledger and evidence export are illustrative and cannot be used to settle, defend, or validate insurance claims.
* **Pricing or premium decisions:** Commercial metrics are simulated and must not inform actuarial models or rate-making.
* **Production deployment:** The system lacks authentication, access controls, and production infrastructure.
* **Formal underwriting acceptance:** Cannot be used to bind, evaluate, or underwrite real risk policies.

---

## 4. Accepted Product Capabilities
The following functional capabilities are accepted in the Version 1.1 baseline:
* **Hero FMCG journey:** End-to-end user flow showing the exposure profile of a mock FMCG production facility.
* **Simulated event timeline:** Interactive step-by-step simulation of a rising water level event.
* **Watch / Action / resolved flow:** Progressive alert system transitions (Idle -> Rising -> Watch/Action alert -> Event Resolved).
* **Action completion:** User interface interaction allowing the site manager to register action completion under alert conditions.
* **Impact Ledger:** Causal evidence logging that displays physical parameters, lead times, and financial thresholds during the event.
* **Underwriter / Broker View:** Refined commercial dashboard highlighting the £3,000,000 probable avoided retained loss "meeting moment" with supporting metrics, evidence confidence status, and evidence gaps.
* **Contrast scenario:** Interactive comparison view depicting the £3.5m unmitigated exposure state if no mitigations were completed.
* **Portfolio teaser:** 4-row site register showing varying status levels and evidence categories (FMCG hero site, Logistics site, and two stub entries).
* **Evidence summary/export:** Print-optimised HTML report summarizing policy variables, ledger outcomes, and disclaimers, with a one-click print function.
* **Presenter Demo Guide:** Built-in sidebar drawer offering step-by-step guidance, presentation talk tracks, and context-aware state indicators for the presenter.

---

## 5. Known Limitations
The Version 1.1 baseline includes the following technical and physical limitations:
* **Simulated readings:** Water levels, alarm trigger thresholds, and event timing are entirely scripted and mock-data driven.
* **Survey-informed assumptions:** Simulated flood pathway, action effectiveness, and cost parameters are based on initial mock site surveys, not live engineering assessments.
* **No live hydrological validation:** The alert system does not connect to real-world catchments or hydraulic forecasting models.
* **No real sensor integration:** The UI replicates sensor readings through static fixtures and has no real-time telemetry connection.
* **Avoided loss is evidence-qualified, not proven:** Financial avoidance is calculated as a "probable avoided retained loss" subject to confidence levels, not a mathematically or operationally proven certainty.

---

## 6. Next Workstream
Following the acceptance of Version 1.1, the immediate next workstream will focus on preparation for stakeholder engagements:
* **Demo rehearsal:** Internal walk-throughs to verify narrative timing and presenter flow.
* **Stakeholder-specific talk tracks:** Customizing narrative focus for brokers vs. insurers vs. risk engineers.
* **Screenshot pack:** Archiving static assets for offline presentations and decks.
* **Narrative hardening:** Refining explanations of evidence confidence ratings and hydrological causality metrics.
* **Version 1.2 development:** Development of Version 1.2 will begin only after gathering and evaluating structured feedback from initial stakeholder demonstrations.

---

*Product Acceptance Note generated for Additive Insure — 2026-05-24*
