// Ready-made workflow templates. These act as a lightweight "assistant" —
// picking one assembles pages, places Care components and wires the
// navigation so a full clickable flow exists in one step. Everything can be
// edited afterwards.

import type { PrototypeDoc, PrototypeElement } from "./types";
import { createSeedPrototype } from "./sample-data";

let seq = 0;
const el = (
  type: string,
  name: string,
  props: Record<string, unknown> = {},
  navTo?: string,
  toastMsg?: string
): PrototypeElement => {
  const actions: PrototypeElement["actions"] = [];
  if (toastMsg)
    actions.push({
      id: `a${seq++}`,
      trigger: "click",
      type: "showToast",
      value: toastMsg,
    });
  if (navTo)
    actions.push({
      id: `a${seq++}`,
      trigger: "click",
      type: "navigate",
      targetPageId: navTo,
      transition: "slide-left",
      duration: 250,
    });
  return { id: `e${seq++}`, type, name, props, actions };
};

function chain(
  name: string,
  variables: string[],
  pages: {
    id: string;
    name: string;
    group?: string;
    build: (next?: string) => PrototypeElement[];
  }[]
): PrototypeDoc {
  seq = 0;
  return {
    name,
    startPageId: pages[0].id,
    variables: variables.map((v) => ({ name: v, value: "" })),
    pages: pages.map((p, i) => ({
      id: p.id,
      name: p.name,
      group: p.group,
      flowX: 40 + i * 300,
      flowY: 160 + (i % 2) * 60,
      elements: p.build(pages[i + 1]?.id),
    })),
  };
}

export interface Template {
  id: string;
  name: string;
  description: string;
  build: () => PrototypeDoc;
}

export const templates: Template[] = [
  {
    id: "op-journey",
    name: "OP Patient Journey",
    description: "Login → registration → consultation → billing",
    build: createSeedPrototype,
  },
  {
    id: "appointment",
    name: "Appointment Booking",
    description: "Search slots, pick a doctor, confirm",
    build: () =>
      chain(
        "Appointment Booking",
        ["Doctor", "Slot"],
        [
          {
            id: "ab-1",
            name: "Find Doctor",
            group: "Booking",
            build: (next) => [
              el("app-header", "Header", {
                title: "Book Appointment",
                subtitle: "Outpatient",
              }),
              el("heading", "Title", { text: "Find a doctor", size: "lg" }),
              el("search", "Search", {
                placeholder: "Search doctors or departments…",
                bindVariable: "Search",
              }),
              el(
                "appointment-card",
                "Dr. Menon",
                {
                  patient: "Dr. Menon",
                  when: "General Medicine",
                  doctor: "Next: 09:30",
                },
                next
              ),
              el(
                "appointment-card",
                "Dr. Rao",
                {
                  patient: "Dr. Rao",
                  when: "Pediatrics",
                  doctor: "Next: 10:00",
                },
                next
              ),
            ],
          },
          {
            id: "ab-2",
            name: "Select Slot",
            group: "Booking",
            build: (next) => [
              el("heading", "Title", { text: "Available slots", size: "lg" }),
              el("select", "Slot", {
                label: "Choose a time",
                options: "09:30, 10:00, 10:30, 11:00",
                bindVariable: "Slot",
              }),
              el("card", "Summary", {
                title: "Dr. Menon",
                description: "General Medicine",
                body: "Consultation · ₹ 500",
              }),
              el(
                "button",
                "Confirm",
                { label: "Confirm booking", variant: "default" },
                next,
                "Slot selected"
              ),
            ],
          },
          {
            id: "ab-3",
            name: "Confirmed",
            group: "Booking",
            build: () => [
              el("heading", "Title", { text: "You're all set 🎉", size: "lg" }),
              el("card", "Confirmation", {
                title: "Appointment confirmed",
                description: "A confirmation SMS has been sent",
                body: "Dr. Menon · {{Slot}} · Token A-14",
              }),
              el(
                "button",
                "Done",
                { label: "Back to home", variant: "outline" },
                "ab-1"
              ),
            ],
          },
        ]
      ),
  },
  {
    id: "pharmacy",
    name: "Pharmacy Dispensing",
    description: "Scan prescription, verify, dispense",
    build: () =>
      chain(
        "Pharmacy Dispensing",
        ["Search"],
        [
          {
            id: "ph-1",
            name: "Prescription Queue",
            group: "Pharmacy",
            build: (next) => [
              el("app-header", "Header", {
                title: "Pharmacy",
                subtitle: "Dispensing counter",
              }),
              el("queue-card", "Queue", { title: "Prescriptions to dispense" }),
              el(
                "patient-card",
                "Next patient",
                {
                  name: "Anita Sharma",
                  meta: "34 F · P-10234",
                  status: "Waiting",
                },
                next
              ),
            ],
          },
          {
            id: "ph-2",
            name: "Verify & Dispense",
            group: "Pharmacy",
            build: (next) => [
              el("heading", "Title", {
                text: "Verify prescription",
                size: "lg",
              }),
              el("patient-card", "Patient", {
                name: "Anita Sharma",
                meta: "34 F · P-10234",
                status: "In Consultation",
              }),
              el("allergy-badge", "Allergy", {
                label: "Penicillin",
                severity: "High",
              }),
              el("medication-table", "Medications", {}),
              el("checkbox", "Counselled", {
                label: "Patient counselled on dosage",
                bindVariable: "Counselled",
              }),
              el(
                "button",
                "Dispense",
                { label: "Dispense & print label", variant: "default" },
                next,
                "Medicines dispensed ✓"
              ),
            ],
          },
          {
            id: "ph-3",
            name: "Done",
            group: "Pharmacy",
            build: () => [
              el("heading", "Title", { text: "Dispensed", size: "lg" }),
              el("card", "Receipt", {
                title: "3 items dispensed",
                description: "Label printed",
                body: "Total ₹ 300 · Paid",
              }),
              el(
                "button",
                "Next",
                { label: "Next patient", variant: "outline" },
                "ph-1"
              ),
            ],
          },
        ]
      ),
  },
  {
    id: "lab",
    name: "Lab Sample Collection",
    description: "Collect sample, label, track result",
    build: () =>
      chain(
        "Lab Sample Collection",
        ["Search"],
        [
          {
            id: "lab-1",
            name: "Collection Queue",
            group: "Laboratory",
            build: (next) => [
              el("app-header", "Header", {
                title: "Laboratory",
                subtitle: "Sample collection",
              }),
              el("search", "Search", {
                placeholder: "Search patients…",
                bindVariable: "Search",
              }),
              el(
                "data-table",
                "Patients",
                { dataset: "patients", filterVariable: "Search" },
                next
              ),
            ],
          },
          {
            id: "lab-2",
            name: "Collect Sample",
            group: "Laboratory",
            build: (next) => [
              el("patient-card", "Patient", {
                name: "Rahul Verma",
                meta: "52 M · P-10235",
                status: "Waiting",
              }),
              el("card", "Order", {
                title: "Test ordered",
                description: "Complete Blood Count (CBC)",
                body: "Fasting: No · Priority: Routine",
              }),
              el("select", "Sample type", {
                label: "Sample type",
                options: "Blood, Urine, Swab",
                bindVariable: "SampleType",
              }),
              el(
                "button",
                "Label",
                { label: "Print label & collect", variant: "default" },
                next,
                "Sample collected & labelled ✓"
              ),
            ],
          },
          {
            id: "lab-3",
            name: "Results",
            group: "Laboratory",
            build: () => [
              el("heading", "Title", { text: "Results", size: "lg" }),
              el("lab-report", "Report", {}),
              el(
                "button",
                "Publish",
                { label: "Publish to patient record", variant: "default" },
                "lab-1",
                "Results published ✓"
              ),
            ],
          },
        ]
      ),
  },
];
