// Data extracted and structured from the provided Elyx chat log PDF.
// This file populates the entire React application with member-specific information.

export const member = {
  id: "rohan",
  name: "Rohan",
  residence: "Bay Area, CA", // Inferred from referrals to UCSF/Stanford & travel patterns
  chronic: "Autonomic dysfunction (POTS) / Long COVID", // Source: Initial complaint
};

export const kpis = [
  {
    key: "hrv",
    label: "HRV (7-day avg)",
    value: "46 ms", // Calculated from 42ms start + 10% trend
    delta: "+10% vs start",
    hint: "Improved autonomic resilience.", // Source: 7/31/25
  },
  {
    key: "rhr",
    label: "Resting HR",
    value: "59 bpm", // Representative value based on trend
    delta: "-5 bpm vs start",
    hint: "Cardiovascular system more efficient.", // Source: 8/29/25
  },
  {
    key: "sleep",
    label: "Deep Sleep (avg)",
    value: "1h 15m", // Representative value based on interventions
    delta: "+45m vs start",
    hint: "Mg Threonate & light hygiene are effective.", // Source: 3/18/25 & 6/22/25
  },
  {
    key: "apob",
    label: "ApoB (lipid marker)",
    value: "105 mg/dL",
    delta: "Q3 Goal: < 80",
    hint: "Primary long-term risk reduction focus.", // Source: 4/25/25
  },
];

// Mock data generated to reflect the qualitative trends described in the chat log.
export const trends = {
  hrv: Array.from({ length: 30 }, (_, i) => ({
    x: i,
    y: 42 + Math.sin(i / 3) * 3 + i * 0.15,
  })), // Starts at 42, trends up
  rhr: Array.from({ length: 30 }, (_, i) => ({
    x: i,
    y: 64 - Math.sin(i / 4) * 2 - i * 0.18,
  })), // Starts higher, trends down
};

// A curated list of key decisions and events from the member's journey.
export const events = [
  {
    id: "e-jan-records",
    date: "2025-01-16",
    type: "decision",
    title: "Consolidate All Medical Records",
    owner: "Dr. Warren",
    pillar: "Pillar 1",
    summary: "Initiated retrieval of all prior medical records from specialists in NY & Singapore.",
    rationale:
      "This is a non-negotiable first step to ensure clinical safety, establish a comprehensive baseline, and avoid redundant or contraindicated interventions.",
    links: [
      {
        id: "c-jan-records",
        role: "Dr. Warren",
        timestamp: "1/16/25 10:00 AM",
        text: "To proceed with a clinical-grade strategy, we must consolidate your complete medical records from all previous specialists. This is non-negotiable to ensure safety...",
      },
    ],
  },
  {
    id: "e-feb-whoop",
    date: "2025-02-28",
    type: "decision",
    title: "Upgrade Biotelemetry to Whoop",
    owner: "Dr. Warren",
    pillar: "Pillar 1 & 2",
    summary:
      "Ordered a Whoop 4.0 strap to replace Garmin for higher-fidelity data on autonomic nervous system and sleep.",
    rationale:
      "The Garmin provides a 'blurry photo' of the user's state. To properly manage POTS and sleep, a 'high-definition video' from a device like Whoop is essential for data-driven lifestyle modifications.",
    links: [
      {
        id: "c-feb-whoop",
        role: "Dr. Warren",
        timestamp: "2/28/25 3:05 PM",
        text: "The key missing element is granular, daily data on your autonomic nervous system. Your Garmin gives us a blurry photo; we need high-definition video.",
      },
    ],
  },
  {
    id: "e-mar-magnesium",
    date: "2025-03-18",
    type: "med",
    title: "Intervention: Magnesium Threonate",
    owner: "Carla",
    pillar: "Pillar 2",
    summary: "Client slept through the night for the first time in months after starting Mg Threonate.",
    rationale:
      "Whoop data confirmed the intervention's success, showing sleep latency dropped from 25 to 8 minutes and disturbances from 12 to 4. This validated the hypothesis.",
    links: [
      {
        id: "c-mar-magnesium",
        role: "Advik",
        timestamp: "3/18/25 8:40 AM",
        text: "Let me check your Whoop data... Your sleep latency (time to fall asleep) was 8 minutes, down from an average of 25. Your 'disturbances' were 4, down from an average of 12. This is a powerful signal.",
      },
    ],
  },
  {
    id: "e-apr-hydration",
    date: "2025-04-12",
    type: "therapy",
    title: "New Hydration Protocol for POTS",
    owner: "Advik",
    pillar: "Pillar 1",
    summary: "Identified and resolved exercise-induced dizziness with a targeted pre-hydration strategy.",
    rationale:
      "After a Zone 2 session was aborted due to dizziness (validated by an HR spike and HRV drop in the data), the team hypothesized a blood volume issue. A new protocol using high-sodium electrolytes pre-exercise proved successful in the next session.",
    links: [
      {
        id: "c-apr-hydration",
        role: "Advik",
        timestamp: "4/12/25 10:06 AM",
        text: "New plan for your Autonomic Health: Let's test a hypothesis. The issue may be blood volume, a classic POTS problem. For the next session, pre-hydrate with the prescribed high-sodium electrolyte mix.",
      },
    ],
  },
  {
    id: "e-may-sick",
    date: "2025-05-02",
    type: "note",
    title: "Executed Sick Day Protocol",
    owner: "Elyx Team",
    pillar: "All",
    summary: "Whoop data detected physiological signs of illness before member felt severe symptoms.",
    rationale:
      "Elevated RHR (+12bpm) and Respiratory Rate, paired with suppressed HRV (-45%), indicated a significant immune response. The team intervened, advising postponement of a board meeting and deploying at-home care (IV therapy, food) to prioritize recovery.",
    links: [
      {
        id: "c-may-sick",
        role: "Advik",
        timestamp: "5/2/25 8:35 AM",
        text: "Your Resting Heart Rate (RHR) is elevated by 12bpm compared to your baseline, your HRV is down 45%... Your body is clearly mounting a significant immune response. Absolutely no training.",
      },
    ],
  },
  {
    id: "e-jun-cgm",
    date: "2025-06-28",
    type: "test",
    title: "CGM Reveals Meal-Specific Responses",
    owner: "Carla",
    pillar: "Pillar 3",
    summary: "Continuous Glucose Monitor data showed a large glucose spike (160 mg/dL) after oatmeal.",
    rationale:
      "This experiment demonstrated that a seemingly 'healthy' food was metabolically disruptive for the member. A subsequent test with eggs and avocado showed a stable glucose curve, establishing a personalized nutrition 'rule' based on direct bio-feedback.",
    links: [
      {
        id: "c-jun-cgm",
        role: "Carla",
        timestamp: "6/28/25 12:10 PM",
        text: "A very common finding! Many 'healthy' foods can cause a significant glucose spike. Experiment #1: Tomorrow morning, let's try having three scrambled eggs with avocado and spinach instead. We will then compare the glucose curves.",
      },
    ],
  },
  {
    id: "e-jul-proactive-mri",
    date: "2025-07-29",
    type: "test",
    title: "Scheduled Full-Body MRI",
    owner: "Neel",
    pillar: "Longevity",
    summary: "Booked a proactive, radiation-free full-body MRI scan at a specialized clinic.",
    rationale:
      "As part of a comprehensive strategy for early cancer detection and longevity, a baseline MRI provides a screening tool for solid tumors, moving from reactive to proactive health management.",
    links: [
      {
        id: "c-jul-proactive-mri",
        role: "Neel",
        timestamp: "7/29/25 2:15 PM",
        text: "For clients focused on longevity, we often recommend a full-body MRI scan, like one from Prenuvo, as a radiation-free baseline screening tool for solid tumors.",
      },
    ],
  },
  {
    id: "e-aug-recovery-protocol",
    date: "2025-08-07",
    type: "decision",
    title: "Validated Post-Workout Recovery Protocol",
    owner: "Carla",
    pillar: "Pillar 4",
    summary:
      "Post-strength session protein/creatine shake resulted in 50% less soreness and a 17-point higher Whoop recovery score.",
    rationale:
      "The experiment proved that rapid nutrient timing is a critical lever for this member's recovery. This data-backed insight led to the protocol becoming a permanent part of the member's plan, optimizing adaptation from training.",
    links: [
      {
        id: "c-aug-recovery-protocol",
        role: "Rohan",
        timestamp: "8/7/25 8:31 AM",
        text: "Noticeably less sore. Maybe 50% better. The protocol works.",
      },
    ],
  },
];

// The chat snippets linked in the `events` array above.
export const chats = [
  {
    id: "c-jan-records",
    date: "2025-01-16",
    role: "Dr. Warren",
    text: "To proceed with a clinical-grade strategy, we must consolidate your complete medical records from all previous specialists. This is non-negotiable to ensure safety...",
  },
  {
    id: "c-feb-whoop",
    date: "2025-02-28",
    role: "Dr. Warren",
    text: "The key missing element is granular, daily data on your autonomic nervous system. Your Garmin gives us a blurry photo; we need high-definition video.",
  },
  {
    id: "c-mar-magnesium",
    date: "2025-03-18",
    role: "Advik",
    text: "Let me check your Whoop data... Your sleep latency (time to fall asleep) was 8 minutes, down from an average of 25. Your 'disturbances' were 4, down from an average of 12. This is a powerful signal.",
  },
  {
    id: "c-apr-hydration",
    date: "2025-04-12",
    role: "Advik",
    text: "New plan for your Autonomic Health: Let's test a hypothesis. The issue may be blood volume, a classic POTS problem. For the next session, pre-hydrate with the prescribed high-sodium electrolyte mix.",
  },
  {
    id: "c-may-sick",
    date: "2025-05-02",
    role: "Advik",
    text: "Your Resting Heart Rate (RHR) is elevated by 12bpm compared to your baseline, your HRV is down 45%... Your body is clearly mounting a significant immune response. Absolutely no training.",
  },
  {
    id: "c-jun-cgm",
    date: "2025-06-28",
    role: "Carla",
    text: "A very common finding! Many 'healthy' foods can cause a significant glucose spike. Experiment #1: Tomorrow morning, let's try having three scrambled eggs with avocado and spinach instead. We will then compare the glucose curves.",
  },
  {
    id: "c-jul-proactive-mri",
    date: "2025-07-29",
    role: "Neel",
    text: "For clients focused on longevity, we often recommend a full-body MRI scan, like one from Prenuvo, as a radiation-free baseline screening tool for solid tumors.",
  },
  {
    id: "c-aug-recovery-protocol",
    date: "2025-08-07",
    role: "Rohan",
    text: "Noticeably less sore. Maybe 50% better. The protocol works.",
  },
];