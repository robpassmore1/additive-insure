# Stakeholder Demo Script
## Additive Insure — Version 1.1 Controlled Demonstrator

This document provides a step-by-step walkthrough script for demonstrating the Additive Insure Version 1.1 Controlled Demonstrator. It is structured to help the presenter transition seamlessly between screens while maintaining a consistent and cautious narrative.

---

## Demo Overview & Setup

### Presenter Preparation
* **Local environment:** Run `npm run dev` in `app/` and open `http://localhost:5173`.
* **State Check:** Ensure the simulation is in the **IDLE** state. If not, go to the Underwriter View and click **Reset Simulation**.
* **Presenter Panel:** Open the **Demo Guide** drawer in the bottom left of the application. Keep this open as an internal reference (it is styled with presenter notes and step status, and is not intended for active client screen-sharing).

---

## Step-by-Step Scripted Journey

### Step 1: Context & Exposure Profile (IDLE State)
* **Screen:** Site Event View (Simulation: **IDLE**)
* **Action:** Direct the audience's attention to the site card and policy exposure fields on the left.
* **Talk Track:**
  > "We are starting here at our hero FMCG production site. What you see is the baseline exposure profile. This facility carries a total Sum Insured of £50 million for property and £75 million for business interruption. Under the policy terms, they hold a £4 million flood excess, with daily downtime costs estimated at £350,000. 
  > 
  > At this stage, sensors are reading normal perimeter dry levels, and our action status is 'Idle'. We have mapped this site's physical characteristics through a detailed survey, allowing us to establish the precise flood pathway that water would take if a perimeter breach occurs."

---

### Step 2: The Onset (RISING State)
* **Screen:** Site Event View
* **Action:** Click **Simulate Time +** once. Water level indicator goes to **Rising**.
* **Talk Track:**
  > "We will now simulate the onset of a physical event. Perimeter sensors register water levels rising. On the timeline, you will see the active state transition to 'Rising'. 
  > 
  > At this point, the system is monitoring the event, but we have not crossed the critical alert threshold. The site manager has visibility but is not yet instructed to deploy flood barriers. This represents the early warning window."

---

### Step 3: The Watch & Action Alert (ALERT State)
* **Screen:** Site Event View
* **Action:** Click **Simulate Time +** once more. State transitions to **ALERT**.
* **Talk Track:**
  > "We have now reached the critical action threshold. The active status shifts to 'ALERT', and a high-priority action banner appears at the top. The system instructs the site manager to deploy the physical flood barriers.
  > 
  > Notice the operational variables here: the minimum required deployment time is 120 minutes, while our current forecast gives us a P50 lead time window of 240 minutes. This gives the site team a high probability of successfully completing the deployment before flood waters reach the critical vulnerability point."

---

### Step 4: Mitigating Action Recorded (RESOLVED State)
* **Screen:** Site Event View
* **Action:** Click the **Mark Action Complete** button. The state transitions to **RESOLVED** (Event Resolved).
* **Talk Track:**
  > "The site manager successfully deploys the barriers and logs completion in the app. The simulation status shifts to 'Resolved'. By completing this action within the forecast window, the physical pathway is closed. 
  > 
  > Now, let’s explore how this physical action translates into verifiable underwriting evidence."

---

### Step 5: The Physical Evidence Log
* **Screen:** Click **Evidence / Impact Ledger** in the sidebar.
* **Talk Track:**
  > "Here we look at the Impact Ledger. This is a chronological record of the physical event. It logs the exact trigger times, the sensor readings at the perimeter, the corresponding action completion timestamp, and the final resolved status. 
  > 
  > Crucially, this ledger provides the auditable thread showing that a physical mitigation took place in response to a specific forecast window. It is this ledger that supports our avoided loss calculations."

---

### Step 6: The "Meeting Moment"
* **Screen:** Click **Underwriter / Broker View** in the sidebar.
* **Talk Track:**
  > "This brings us to the core of the Additive Insure value proposition: the Underwriter/Broker 'meeting moment'. 
  > 
  > On this dashboard, you see a dominant hero metric: **£3,000,000 probable avoided retained loss**. This represents the financial loss that would have fell within the policyholder's £4 million excess but was successfully avoided due to the barrier deployment. 
  > 
  > We present 8 distinct commercial metrics, including the £25,000 cost to deploy, the coverage position, and the unmitigated exposure. Below this, we highlight our confidence indicators: causality is rated 'Probable' based on the survey-informed pathway, but we explicitly list remaining evidence gaps to maintain complete transparency with our risk engineers."

---

### Step 7: The Contrast Scenario
* **Screen:** Click **Reset Simulation** (either on this screen or in the sidebar). This reverts the state to **IDLE**, but on this view, it triggers the contrast display.
* **Talk Track:**
  > "To build trust, we must show what happens when no action is recorded. In this contrast view, the dashboard shifts. The hero card turns amber, displaying **£3,500,000 unmitigated probable retained exposure**. 
  > 
  > Because no action completion was logged during the event window, our evidence confidence drops to 'No action recorded' and causality to 'No event recorded'. This contrast establishes a credible baseline showing that without verified mitigation, the full loss exposure remains."

---

### Step 8: Portfolio Register Teaser
* **Screen:** Click **Portfolio Teaser** in the sidebar.
* **Talk Track:**
  > "As we scale, underwriters will manage multiple risks. This portfolio view teaser shows how sites are aggregated. 
  > 
  > Our FMCG hero site shows 'Live' status with £3 million avoided loss. Other sites, like the Logistics facility, show 'Partial' status and lower-confidence outcomes, while stub entries represent sites awaiting sensor deployment. This demonstrates how a broker or risk manager gets a portfolio-wide view of mitigated risks."

---

### Step 9: Governance & Export
* **Screen:** Click **Evidence Summary** in the sidebar.
* **Talk Track:**
  > "Finally, we have the Evidence Summary screen. This is a print-optimised report that details the site parameters, the event timeline, and the verified outcomes. 
  > 
  > It is built to serve as a physical or PDF export that brokers and risk managers can bring directly into annual renewal negotiations. By clicking 'Print / Export', we generate a clean, un-styled document that archives the evidence pack alongside a list of known limitations and disclaimers. This establishes the governance thread for the entire Version 1.1 system."

---

*Stakeholder Demo Script Version 1.1 — Additive Insure*
