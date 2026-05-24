## Antigravity — Pre-merge review response

This comment responds to the four pre-merge confirmation questions raised in the product review.

---

### Pre-merge fix applied

During self-review against the product checklist, I identified three gaps in the original `UnderwriterView` that would have failed the meeting-moment requirement:

- **Action cost (£25,000)** was only visible on the Evidence / Impact Ledger screen, not the Underwriter view.
- **Hydrological causality** and **Evidence confidence** were only visible on the Evidence / Impact Ledger, not the Underwriter view.
- **Contrast scenario** showed a blank placeholder rather than a meaningful no-action exposure.

These have been fixed in commit `ff6cf82`. The Underwriter / Broker View now contains all the required meeting-moment fields in a single screen. The build remains clean (`npm run build` ✓).

---

### Question 1 — The meeting moment is clearly visible in the Underwriter / Broker View

Confirmed. After the fix, the Underwriter / Broker View displays the following on a single screen:

| Field | Value | Source |
|---|---|---|
| Flood Excess | £4,000,000 | `fixtures/site.json → policy.floodExcess` |
| Coverage Position | Inside flood excess | `fixtures/event.json → event.coveragePosition` |
| Action Cost | £25,000 | `fixtures/event.json → event.actionCost` |
| Predicted Loss (No Action) | £3,500,000 | `fixtures/event.json → event.predictedLossWithoutAction` |
| Predicted Loss (With Action) | £500,000 | `fixtures/event.json → event.predictedLossWithAction` |
| **Probable Avoided Retained Loss** | **£3,000,000** | `fixtures/event.json → event.retainedLossAvoided` |
| Hydrological Causality | Probable | `fixtures/event.json → event.hydrologicalCausality` |
| Evidence Confidence | Probable avoided loss | `fixtures/event.json → event.evidenceConfidence` |
| Validation Status | Not operationally validated | Static label |
| Hydrological Uncertainty | Applies | Static label |

Evidence gaps (5 items) are listed in a dedicated panel below the meeting-moment card:
- Simulated event only — no live sensor data
- Survey-informed pathway — not field-validated sensor placement
- No live flood model or NWP forecast integration
- Lead time distributions illustrative — not calibrated
- No claims workflow or premium/pricing engine connected

---

### Question 2 — The UI avoids all restricted language

Confirmed by code scan across all React components. Grep result for all restricted terms:

```
proven | guaranteed | validated prediction | loss prevented | savings achieved | premium reduction | claims avoided
→ 0 matches across app/src/
```

Language in use instead: "simulated", "survey-informed", "probable avoided retained loss", "not operationally validated", "subject to validation", "hydrological uncertainty applies", "probable impact".

---

### Question 3 — The contrast scenario is visibly lower confidence, not another success case

Confirmed. The contrast (IDLE/pre-event) state of the Underwriter / Broker View now shows:

- **No Resilience Action on Record** heading (not a success card)
- **Probable Retained Loss: £3,500,000** in amber (warning colour) — the unmitigated exposure
- **Evidence Confidence field:** "No action recorded" — explicitly absent
- **Probable Avoided Retained Loss field:** "Awaiting event outcome" — inconclusive, not zero
- Card uses a dashed border and muted background, visually distinct from the resolved (blue-bordered) state

The insurer can see the exposure without an action, and the value that becomes available once one is recorded and evidenced.

---

### Question 4 — Screenshots are committed to Git, not just referenced in Antigravity

Confirmed. Screenshots are committed as binary files in commit `6f12f3c` under `evidence/sprint-001/screenshots/` — 7 PNG files covering every state of the journey.

---

### Acceptance criteria — updated after fix

| # | Criterion | Status |
|---|---|---|
| AC-001 | Full hero journey without developer intervention | Pass |
| AC-002 | Values from /fixtures, not hardcoded | Pass |
| AC-003 | Three primary screens present | Pass |
| AC-004 | Cautious product language (no restricted terms) | Pass |
| AC-005 | Reset/replay control functional | Pass |
| AC-006 | Premium, calm, credible UI | Pass |
| AC-007 | Known limitations documented | Pass |
| AC-008 | npm run build produces no errors | Pass |
| AC-009 | All meeting-moment values visible on Underwriter view | Pass (fixed in ff6cf82) |
| AC-010 | Contrast scenario shows inconclusive/exposure state | Pass (fixed in ff6cf82) |

**Ready for human product review and merge decision.**

The demo journey is: Site → Event → Alert → Action → Evidence → Insurance Value

All checklist items now pass. Merge authority rests with the product reviewer.
