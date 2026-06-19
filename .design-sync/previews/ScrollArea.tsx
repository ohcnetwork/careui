import { ScrollArea, ScrollBar } from "careui";

const patients = [
  "Ramesh Kumar",
  "Priya Sharma",
  "Arun Das",
  "Sunita Verma",
  "Kiran Mehta",
  "Deepa Nair",
  "Vijay Singh",
  "Ananya Krishnan",
  "Rajesh Patel",
  "Meera Pillai",
  "Sanjay Gupta",
  "Lakshmi Rao",
];

export function VerticalList() {
  return (
    <ScrollArea className="h-48 w-64 rounded-md border p-3">
      <div className="space-y-1">
        {patients.map((name) => (
          <div
            key={name}
            className="rounded-sm px-2 py-1.5 text-sm hover:bg-muted cursor-pointer"
          >
            {name}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}

export function HorizontalScroll() {
  return (
    <ScrollArea className="w-72 rounded-md border p-3">
      <div className="flex gap-3" style={{ width: "max-content" }}>
        {[
          "General Medicine",
          "Cardiology",
          "Neurology",
          "Orthopedics",
          "Pediatrics",
          "Ophthalmology",
          "ENT",
          "Dermatology",
        ].map((dept) => (
          <div
            key={dept}
            className="rounded-md border px-3 py-2 text-sm font-medium whitespace-nowrap"
          >
            {dept}
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

export function ContentScroll() {
  return (
    <ScrollArea className="h-48 w-80 rounded-md border">
      <div className="p-4 space-y-3">
        <p className="text-sm font-semibold">Encounter Notes</p>
        <p className="text-sm">
          Patient presented with acute onset fever (38.9°C) and productive
          cough for 3 days. No known drug allergies. Previous history of
          hypertension managed with Amlodipine 5mg OD.
        </p>
        <p className="text-sm">
          Examination: Chest auscultation revealed bilateral coarse crackles.
          SpO2 96% on room air. Heart rate 88 bpm, BP 132/84 mmHg.
        </p>
        <p className="text-sm">
          Assessment: Community-acquired pneumonia. Investigations ordered:
          CBC, CRP, Chest X-ray, Blood cultures x2.
        </p>
        <p className="text-sm">
          Plan: Admit for IV antibiotics. Start Amoxicillin-Clavulanate 1.2g
          IV Q8H. Monitor SpO2 and fever chart. Review in 24 hours.
        </p>
      </div>
    </ScrollArea>
  );
}
