// A seeded starter prototype — a realistic OP (out-patient) journey — so the
// builder opens with something demonstrable rather than a blank canvas.

import type { PrototypeDoc, PrototypeElement } from "./types";

let seq = 0;
const el = (
  type: string,
  name: string,
  props: Record<string, unknown> = {},
  actions: PrototypeElement["actions"] = [],
  extra: Partial<PrototypeElement> = {}
): PrototypeElement => ({
  id: `seed-${seq++}`,
  type,
  name,
  props,
  actions,
  ...extra,
});

const nav = (
  targetPageId: string,
  transition: "slide-left" | "fade" | "slide-up" = "slide-left"
): PrototypeElement["actions"][number] => ({
  id: `act-${seq++}`,
  trigger: "click",
  type: "navigate",
  targetPageId,
  transition,
  duration: 250,
});

const toast = (message: string): PrototypeElement["actions"][number] => ({
  id: `act-${seq++}`,
  trigger: "click",
  type: "showToast",
  value: message,
});

export function createSeedPrototype(): PrototypeDoc {
  seq = 0;
  return {
    name: "OP Patient Journey",
    startPageId: "page-login",
    variables: [
      { name: "Patient Name", value: "" },
      { name: "Visit Type", value: "" },
      { name: "Search", value: "" },
    ],
    pages: [
      {
        id: "page-login",
        name: "Login",
        group: "Access",
        flowX: 40,
        flowY: 200,
        elements: [
          el("login-block", "Sign in", { title: "Sign in to Care HMIS" }, [
            nav("page-dashboard", "fade"),
          ]),
        ],
      },
      {
        id: "page-dashboard",
        name: "Dashboard",
        group: "Access",
        flowX: 340,
        flowY: 200,
        elements: [
          el("app-header", "Header", {
            title: "Care HMIS",
            subtitle: "General Hospital",
          }),
          el("heading", "Greeting", {
            text: "Good morning, Dr. Menon",
            size: "lg",
          }),
          el("stat", "KPI · Patients", {
            label: "Patients today",
            value: "128",
            delta: "+12%",
          }),
          el("stat", "KPI · Queue", {
            label: "In queue",
            value: "9",
            delta: "",
          }),
          el(
            "button",
            "Register patient",
            { label: "＋ Register new patient", variant: "default" },
            [nav("page-registration")]
          ),
          el("heading", "Appointments", {
            text: "Today's appointments",
            size: "sm",
          }),
          el(
            "appointment-card",
            "Appointment",
            {
              patient: "Anita Sharma",
              when: "Today · 09:30",
              doctor: "Dr. Menon",
            },
            [nav("page-overview")]
          ),
        ],
      },
      {
        id: "page-registration",
        name: "Patient Registration",
        group: "Registration",
        flowX: 640,
        flowY: 40,
        elements: [
          el("heading", "Title", { text: "Register Patient", size: "lg" }),
          el("registration-form", "Registration form", {}),
          el(
            "button",
            "Submit",
            { label: "Register & search", variant: "default" },
            [toast("Patient registered ✓"), nav("page-search")]
          ),
        ],
      },
      {
        id: "page-search",
        name: "Patient Search",
        group: "Registration",
        flowX: 940,
        flowY: 40,
        elements: [
          el("heading", "Title", { text: "Find a patient", size: "lg" }),
          el("search", "Search", {
            placeholder: "Search patients…",
            bindVariable: "Search",
          }),
          el(
            "data-table",
            "Results",
            { dataset: "patients", filterVariable: "Search" },
            [nav("page-overview")]
          ),
        ],
      },
      {
        id: "page-overview",
        name: "Patient Overview",
        group: "Encounter",
        flowX: 1240,
        flowY: 200,
        elements: [
          el("patient-card", "Patient", {
            name: "Anita Sharma",
            meta: "34 F · P-10234",
            status: "Waiting",
          }),
          el("allergy-badge", "Allergy", {
            label: "Penicillin",
            severity: "High",
          }),
          el("tabs", "Tabs", {
            tabs: "Overview, Vitals, Notes, Billing",
            active: "Overview",
          }),
          el("vitals-widget", "Vitals", {}),
          el(
            "encounter-card",
            "Encounter",
            {
              title: "OP Consultation",
              meta: "Dr. Menon · General Medicine",
              date: "Today · 09:30",
            },
            [nav("page-consultation")]
          ),
          el(
            "button",
            "Start consultation",
            { label: "Start consultation", variant: "default" },
            [nav("page-consultation")]
          ),
        ],
      },
      {
        id: "page-consultation",
        name: "Consultation",
        group: "Encounter",
        flowX: 1540,
        flowY: 200,
        elements: [
          el("heading", "Title", {
            text: "Consultation — Anita Sharma",
            size: "md",
          }),
          el("textarea", "Clinical notes", {
            label: "Clinical notes",
            placeholder: "History, examination, diagnosis…",
            bindVariable: "Notes",
          }),
          el("prescription-editor", "Prescription", {}),
          el(
            "button",
            "Save & bill",
            { label: "Save & proceed to billing", variant: "default" },
            [toast("Encounter saved ✓"), nav("page-billing")]
          ),
        ],
      },
      {
        id: "page-billing",
        name: "Billing",
        group: "Checkout",
        flowX: 1840,
        flowY: 200,
        elements: [
          el("heading", "Title", { text: "Billing", size: "lg" }),
          el("billing-summary", "Summary", { total: "₹ 1,240" }),
          el(
            "button",
            "Collect payment",
            { label: "Collect payment", variant: "default" },
            [toast("Payment collected · Receipt printed ✓")]
          ),
        ],
      },
    ],
  };
}
