/**
 * Demo data for the Dental Chart template page and docs examples.
 * Fictional patients. Not for use outside the CareUI docs.
 */
import type { DentalFinding, Dentition, PatientAlert, SlotState, Surface, FindingStatus } from "./dental-chart-model";

export const DEMO_TODAY = "12 Oct 2026";
export const DEMO_CLINICIAN = "Dr. Anjali Menon";
const PREVIOUS_CLINICIAN = "Dr. Rahul Iyer";

export interface DemoPatient {
  id: string;
  label: string;
  name: string;
  meta: string;
  dentition: Dentition;
  hideThirdMolars: boolean;
  mixedSlots: Record<string, SlotState>;
  alerts: PatientAlert[];
  previousVisit: string;
  previous: DentalFinding[];
  today: DentalFinding[];
}

function f(
  id: string, tooth: string, key: string, status: FindingStatus, surfaces: Surface[],
  extra: Partial<DentalFinding>, visit: string, by: string,
): DentalFinding {
  return { id, tooth, key, status, surfaces, material: null, grade: null, note: "", visit, by, ...extra };
}

const R = "14 Mar 2026";
const M = "02 Jun 2026";

export const DEMO_PATIENTS: DemoPatient[] = [
  {
    id: "ravi",
    label: "Adult, 34",
    name: "Ravi Kumar",
    meta: "34 y · Male · CARE-10482",
    dentition: "permanent",
    hideThirdMolars: false,
    mixedSlots: {},
    alerts: [
      { label: "Warfarin 5 mg daily", kind: "anticoagulant" },
      { label: "Type 2 diabetes", kind: "diabetes" },
    ],
    previousVisit: R,
    previous: [
      f("a1", "18", "missing", "condition", [], {}, R, PREVIOUS_CLINICIAN),
      f("a2", "28", "missing", "condition", [], {}, R, PREVIOUS_CLINICIAN),
      f("a3", "11", "crown", "existing", [], { material: "PFM" }, R, PREVIOUS_CLINICIAN),
      f("a4", "46", "filling", "existing", ["O", "D"], { material: "Composite" }, R, PREVIOUS_CLINICIAN),
      f("a5", "37", "rct", "existing", [], {}, R, PREVIOUS_CLINICIAN),
      f("a6", "36", "caries", "condition", ["O"], {}, R, PREVIOUS_CLINICIAN),
      f("a7", "47", "filling", "existing", ["O"], { material: "Amalgam" }, R, PREVIOUS_CLINICIAN),
    ],
    today: [
      f("a1", "18", "missing", "condition", [], {}, R, PREVIOUS_CLINICIAN),
      f("a2", "28", "missing", "condition", [], {}, R, PREVIOUS_CLINICIAN),
      f("a3", "11", "crown", "existing", [], { material: "PFM" }, R, PREVIOUS_CLINICIAN),
      f("a4", "46", "filling", "existing", ["O", "D"], { material: "Composite" }, R, PREVIOUS_CLINICIAN),
      f("a5", "37", "rct", "existing", [], {}, R, PREVIOUS_CLINICIAN),
      f("a6", "36", "caries", "condition", ["M", "O"], {}, DEMO_TODAY, DEMO_CLINICIAN),
      f("a7", "47", "filling", "existing", ["O"], { material: "Amalgam" }, R, PREVIOUS_CLINICIAN),
      f("a8", "37", "crown", "planned", [], { material: "Zirconia" }, DEMO_TODAY, DEMO_CLINICIAN),
      f("a9", "26", "caries", "condition", ["O", "B"], {}, DEMO_TODAY, DEMO_CLINICIAN),
      f("a10", "31", "mobility", "condition", [], { grade: "I" }, DEMO_TODAY, DEMO_CLINICIAN),
    ],
  },
  {
    id: "meera",
    label: "Child, 9",
    name: "Meera Nair",
    meta: "9 y · Female · CARE-20917",
    dentition: "mixed",
    hideThirdMolars: true,
    mixedSlots: {
      "11": "perm", "12": "prim", "13": "prim", "14": "prim", "15": "prim", "16": "perm", "17": "none", "18": "none",
      "21": "perm", "22": "prim", "23": "prim", "24": "prim", "25": "prim", "26": "perm", "27": "none", "28": "none",
      "31": "perm", "32": "perm", "33": "prim", "34": "prim", "35": "prim", "36": "perm", "37": "none", "38": "none",
      "41": "perm", "42": "perm", "43": "prim", "44": "prim", "45": "prim", "46": "perm", "47": "none", "48": "none",
    },
    alerts: [{ label: "Penicillin allergy", kind: "allergy" }],
    previousVisit: M,
    previous: [
      f("b1", "84", "filling", "existing", ["O"], { material: "GIC" }, M, PREVIOUS_CLINICIAN),
      f("b2", "75", "caries", "condition", ["O"], {}, M, PREVIOUS_CLINICIAN),
    ],
    today: [
      f("b1", "84", "filling", "existing", ["O"], { material: "GIC" }, M, PREVIOUS_CLINICIAN),
      f("b2", "75", "caries", "condition", ["O", "D"], {}, DEMO_TODAY, DEMO_CLINICIAN),
      f("b3", "85", "mobility", "condition", [], { grade: "II" }, DEMO_TODAY, DEMO_CLINICIAN),
      f("b4", "85", "extraction", "planned", [], {}, DEMO_TODAY, DEMO_CLINICIAN),
      f("b5", "36", "caries", "condition", ["O"], {}, DEMO_TODAY, DEMO_CLINICIAN),
    ],
  },
];
