// Mock healthcare data used to make list/table components feel real inside
// prototypes. None of this is persisted — it is regenerated on every load.

export interface FakePatient {
  id: string;
  name: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  phone: string;
  status: "Waiting" | "In Consultation" | "Admitted" | "Discharged";
}

export const fakePatients: FakePatient[] = [
  {
    id: "P-10234",
    name: "Anita Sharma",
    age: 34,
    gender: "Female",
    phone: "98450 12345",
    status: "Waiting",
  },
  {
    id: "P-10235",
    name: "Rahul Verma",
    age: 52,
    gender: "Male",
    phone: "98860 55512",
    status: "In Consultation",
  },
  {
    id: "P-10236",
    name: "Priya Nair",
    age: 28,
    gender: "Female",
    phone: "90080 77234",
    status: "Waiting",
  },
  {
    id: "P-10237",
    name: "Mohammed Iqbal",
    age: 61,
    gender: "Male",
    phone: "99001 22110",
    status: "Admitted",
  },
  {
    id: "P-10238",
    name: "Sunita Reddy",
    age: 45,
    gender: "Female",
    phone: "97400 33445",
    status: "Discharged",
  },
  {
    id: "P-10239",
    name: "Vikram Singh",
    age: 39,
    gender: "Male",
    phone: "98111 90876",
    status: "Waiting",
  },
];

export interface FakeAppointment {
  time: string;
  patient: string;
  doctor: string;
  department: string;
  status: "Confirmed" | "Checked In" | "Cancelled";
}

export const fakeAppointments: FakeAppointment[] = [
  {
    time: "09:00",
    patient: "Anita Sharma",
    doctor: "Dr. Menon",
    department: "General Medicine",
    status: "Checked In",
  },
  {
    time: "09:30",
    patient: "Rahul Verma",
    doctor: "Dr. Menon",
    department: "General Medicine",
    status: "Confirmed",
  },
  {
    time: "10:00",
    patient: "Priya Nair",
    doctor: "Dr. Rao",
    department: "Pediatrics",
    status: "Confirmed",
  },
  {
    time: "10:30",
    patient: "Vikram Singh",
    doctor: "Dr. Rao",
    department: "Pediatrics",
    status: "Cancelled",
  },
];

export interface FakeMedication {
  drug: string;
  dose: string;
  frequency: string;
  duration: string;
}

export const fakeMedications: FakeMedication[] = [
  {
    drug: "Amoxicillin 500mg",
    dose: "1 tab",
    frequency: "TID",
    duration: "5 days",
  },
  {
    drug: "Paracetamol 650mg",
    dose: "1 tab",
    frequency: "SOS",
    duration: "3 days",
  },
  {
    drug: "Pantoprazole 40mg",
    dose: "1 tab",
    frequency: "OD",
    duration: "7 days",
  },
];

export interface FakeLabReport {
  test: string;
  value: string;
  range: string;
  flag: "Normal" | "High" | "Low";
}

export const fakeLabReports: FakeLabReport[] = [
  { test: "Hemoglobin", value: "13.2 g/dL", range: "12–16", flag: "Normal" },
  { test: "WBC Count", value: "11,800 /µL", range: "4k–11k", flag: "High" },
  { test: "Platelets", value: "1.4 L /µL", range: "1.5–4.1L", flag: "Low" },
  { test: "Random Glucose", value: "142 mg/dL", range: "70–140", flag: "High" },
];

export interface FakeQueueEntry {
  token: string;
  patient: string;
  waitMins: number;
}

export const fakeQueue: FakeQueueEntry[] = [
  { token: "A-12", patient: "Anita Sharma", waitMins: 4 },
  { token: "A-13", patient: "Rahul Verma", waitMins: 11 },
  { token: "A-14", patient: "Priya Nair", waitMins: 18 },
];

export const fakeVitals = [
  { label: "Heart Rate", value: "78", unit: "bpm" },
  { label: "Blood Pressure", value: "122/80", unit: "mmHg" },
  { label: "SpO₂", value: "98", unit: "%" },
  { label: "Temp", value: "98.6", unit: "°F" },
];

export const fakeNotifications = [
  {
    title: "New lab result available",
    detail: "CBC for Anita Sharma",
    time: "2m ago",
  },
  {
    title: "Appointment confirmed",
    detail: "Rahul Verma at 09:30",
    time: "12m ago",
  },
  { title: "Bed assigned", detail: "Ward B · Bed 14", time: "1h ago" },
];
