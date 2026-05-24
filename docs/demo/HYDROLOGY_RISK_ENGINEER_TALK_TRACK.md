# Hydrology & Risk Engineer Talk Track
## Additive Insure — Version 1.1 Controlled Demonstrator

This document outlines the specific narrative and discussion points when presenting the Additive Insure Version 1.1 Controlled Demonstrator to **Hydrologists and Risk Engineers**. It focuses on physical pathway modelling, sensor placement logic, and hydrological uncertainty.

---

## Hydrologist & Risk Engineer Presentation Focus

Technical specialists care about **physical credibility, model accuracy, and uncertainty handling**. Your presentation should emphasize how Additive Insure bridges the gap between physical hydraulic events and commercial underwriting logic without glossing over technical limitations.

---

## Talking Points by Journey Stage

### 1. Physical Site Pathway (Site Event View - IDLE)
* **Goal:** Explain the translation of site topography into a digital pathway model.
* **Key Points:**
  * Highlight the **survey-informed assumptions** behind the model. The flood pathway is not a dynamic hydrodynamic grid in this version; it represents a conceptual flow pathway mapped during the initial site engineering survey.
  * Point out the **Sensor Placements** (e.g., *Site Perimeter Sensor #1*). Explain that sensor location is optimized to detect water entering the specific path leading to critical assets (the production floor), providing maximum lead time.

---

### 2. Time Windows & Uncertainty (ALERT State)
* **Goal:** Address lead time calculations and warning thresholds.
* **Key Points:**
  * Explain the **P50 Lead Time (240 mins)** and **P10 Lead Time (120 mins)**.
  * Discuss how lead times are calculated. In a production version, these will be driven by upstream sensor telemetry and catchment rainfall models. In this controlled demonstrator (v1.1), these values are fixture-driven to represent typical catchment behavior.
  * Emphasize the **minimum required action time (120 mins)**. This is the physical time required for the onsite crew to deploy barriers. Showing both P10 and P50 values demonstrates how we communicate time uncertainty to the site manager.

---

### 3. Verification & The Evidence Log (Impact Ledger)
* **Screen:** Evidence / Impact Ledger
* **Goal:** Explain the physical audit trail.
* **Key Points:**
  * Walk through the logs: **Sensor Reading (Perimeter #1 = 180mm)**, **Action State (Alert Triggered)**, and **Mitigation Verified**.
  * Explain that the ledger establishes a chronological correlation between the physical hazard level and the human mitigation response.
  * Emphasize that the ledger records *physical states* (sensor heights and verified actions) rather than financial assumptions.

---

### 4. Hydrological Causality & Evidence Gaps (Underwriter View)
* **Screen:** Underwriter / Broker View
* **Goal:** Address causality confidence and engineering gaps.
* **Key Points:**
  * **Hydrological Causality: Probable:** Discuss why this is qualified as "Probable". Explain that because the event is simulated and the pathway is survey-informed (rather than calibrated with historical event data), we maintain a conservative causality rating.
  * **Evidence Gaps:** Point out gaps such as *"No secondary backup sensor"* and *"Unvalidated mobile pump status"*. Explain that we actively flag these gaps to encourage clients to improve their physical monitoring infrastructure.

---

## Critical Governance Cautions for Technical Specialists

When discussing this with hydrologists and risk engineers, you must reinforce the following constraints:
1. **No Live Model Connection:** Version 1.1 does not connect to the Environment Agency, Met Office, or live hydraulic models. All telemetry is scripted.
2. **Pathways are Static:** The flood pathway is based on static survey assumptions, not dynamic 2D flood modeling (e.g., LISFLOOD or TUFLOW).
3. **Avoided Loss is Qualified:** The financial avoidance calculation is based on simplified damage curves associated with the survey pathway, not detailed structural engineering finite element analysis.

---

*Hydrology & Risk Engineer Talk Track Version 1.1 — Additive Insure*
