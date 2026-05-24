## Sprint 002: Additive Insure Version 1.1 — Demo Readiness

**Branch:** `sprint/002-version-1-1-demo-readiness` → `main`

---

### Objective

Take the Sprint 001 controlled demonstrator from working prototype to meeting-ready product demo. Focus on polish, narrative, evidence presentation and demo readiness. No platform expansion.

---

### How to run

```bash
cd app
npm install
npm run dev
# → http://localhost:5173
```

**Demo journey:**
1. Open app → Site Event View (IDLE) — review FMCG hero site and policy exposure
2. Open **Demo Guide** (sidebar) — presenter notes for each step
3. **Simulate Time +** × 2 → ALERT — Watch/Action alert with £25k action, p50 240 min window
4. **Mark Action Complete** → RESOLVED
5. Navigate to **Evidence / Impact Ledger** — probable avoided retained loss £3m callout
6. Navigate to **Underwriter / Broker View** — meeting moment: £3m dominant hero figure
7. **Reset Simulation** → contrast: amber £3.5m unmitigated exposure, no evidence confidence
8. Navigate to **Portfolio Teaser** — 4 site rows: live / partial / stub / stub
9. Navigate to **Evidence Summary** — print evidence document

---

### What's new in Version 1.1

| Feature | Detail |
|---|---|
| **Demo Guide** | 8-step presenter panel, context-aware active step, cautious language reminder |
| **Underwriter view — meeting moment** | £3m hero number dominant; all 8 required fields on one screen; evidence quality strip; evidence gaps panel |
| **Contrast scenario** | Amber hero card: £3.5m unmitigated exposure; "No action recorded" evidence confidence; narrative context card |
| **Portfolio Teaser** | 4-row fixture-driven register with status badges (live/partial/stub) and per-site evidence confidence |
| **Evidence Summary** | Print-optimised HTML document; all fixture values; probable avoided retained loss callout; Print/Export button |
| **Design system** | Inter font; refined token system; semantic colour classes; print CSS |
| **Language audit** | 0 restricted terms across all components |

---

### Fixtures

All values from `/fixtures` — no hardcoded commercial data in components:
- `fixtures/site.json` — site, property SI £50m, BI SI £75m, flood excess £4m
- `fixtures/event.json` — action, lead times, loss estimates, causality/confidence
- `fixtures/portfolio.json` — 4 portfolio rows (new in v1.1)

---

### Language audit

```
proven | guaranteed | validated prediction | loss prevented | savings achieved | premium reduction | claims avoided
→ 0 matches across app/src/
```

---

### Known limitations

| Limitation | Note |
|---|---|
| Simulated event only | No live data |
| Survey-informed, not operationally validated | Modelled pathway |
| No live sensors or flood model | Out of scope |
| No claims workflow or pricing engine | Out of scope |
| PDF export | HTML print only |
| Portfolio rows 2–4 | Demonstrator only |

---

### Out-of-scope confirmation

Real sensor integration / live flood model / EA or Met Office APIs / authentication / claims workflow / pricing engine / full portfolio analytics / generic admin configuration — **none built**.

---

### Acceptance criteria

| # | Criterion | Status |
|---|---|---|
| AC-001 | Demo Guide with full journey steps | Pass |
| AC-002 | Underwriter view: meeting moment visually dominant | Pass |
| AC-003 | All 8 meeting-moment fields on Underwriter view | Pass |
| AC-004 | Contrast scenario: lower-confidence, not blank | Pass |
| AC-005 | Portfolio teaser: 4 rows, fixture-driven | Pass |
| AC-006 | Evidence summary: print-optimised, export button | Pass |
| AC-007 | Language audit: 0 restricted terms | Pass |
| AC-008 | All values from /fixtures | Pass |
| AC-009 | npm run build clean | Pass |
| AC-010 | No out-of-scope features | Pass |
| AC-011 | Reset/replay functional | Pass |
| AC-012 | Evidence pack in evidence/sprint-002/ | Pass |

---

### Evidence pack

`evidence/sprint-002/SPRINT-002-EVIDENCE-PACK.md` — includes walkthrough, 7 screenshots, AC table, known limitations, out-of-scope confirmation.

---

**Do not merge — open for review only.**
