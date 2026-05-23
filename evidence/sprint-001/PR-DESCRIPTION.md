## Sprint 001: Additive Insure controlled demonstrator

**Branch:** `sprint/001-controlled-demonstrator` → `main`

---

### Summary

This PR delivers the first complete end-to-end scripted demonstrator for Additive Insure Version 1. It implements the primary hero journey:

> FMCG hero site → policy exposure → surveyed flood pathway → simulated readings → Watch/Action alert → action completion → avoided-loss estimate → Impact Ledger → Underwriter/Broker View

**Build mode:** Scripted demonstrator first. No live sensors, live flood models, claims workflows, pricing engines, or production permissions are included.

---

### How to run locally

```bash
cd app
npm install
npm run dev
# → http://localhost:5173
```

**Demo journey (no developer intervention required):**
1. Open `http://localhost:5173` — Site Event View, IDLE state
2. Click **Simulate Time +** → RISING (water rising at perimeter)
3. Click **Simulate Time +** → ALERT (Watch/Action Alert banner appears)
4. Click **Mark Action Complete** → RESOLVED (Event Resolved, green banner)
5. Navigate to **Evidence / Impact Ledger** → Impact Ledger populated
6. Navigate to **Underwriter / Broker View** → Probable Avoided Retained Loss: £3,000,000
7. Click **Reset Simulation** → replay from scratch

---

### Architecture

- **React + Vite** single-page application
- **Three primary screens:** Site Event View · Evidence / Impact Ledger · Underwriter / Broker View
- **SimulationContext** manages scripted state progression (IDLE → RISING → ALERT → ACTION_TAKEN → RESOLVED)
- **All business values loaded from `/fixtures`** — no commercial numbers hardcoded in React components
- **Cautious product language** throughout: "simulated", "survey-informed", "probable avoided retained loss", "subject to validation", "not operationally validated"

---

### Fixtures

All commercial values are driven by:
- `fixtures/site.json` — site name, property sum insured (£50m), BI sum insured (£75m), flood excess (£4m)
- `fixtures/event.json` — action, lead times (p10/p50/p90), loss estimates, coverage position, causality/confidence

---

### Known limitations (by design)

| Limitation | Note |
|---|---|
| Simulated event only | No live data |
| Survey-informed, not operationally validated | Modelled pathway only |
| No live sensors | Scripted timeline |
| No live flood model | No NWP or flood extent integration |
| No claims workflow | Out of scope Sprint 001 |
| No premium / pricing engine | Out of scope Sprint 001 |

---

### Acceptance criteria — Sprint 001

| # | Criterion | Status |
|---|---|---|
| AC-001 | Full hero journey without developer intervention | ✅ Pass |
| AC-002 | Values from `/fixtures`, not hardcoded | ✅ Pass |
| AC-003 | Three primary screens present | ✅ Pass |
| AC-004 | Cautious product language | ✅ Pass |
| AC-005 | Reset/replay control functional | ✅ Pass |
| AC-006 | Premium, calm, credible UI | ✅ Pass |
| AC-007 | Known limitations documented | ✅ Pass |
| AC-008 | `npm run build` produces no errors | ✅ Pass |

---

### Evidence pack

Full sprint evidence pack including walkthrough and screenshots is committed to `evidence/sprint-001/SPRINT-001-EVIDENCE-PACK.md`.

---

**Do not merge — open for review only.**
