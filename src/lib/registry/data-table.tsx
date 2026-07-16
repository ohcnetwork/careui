import React from "react";
import { type ComponentDoc } from "@/lib/types";
import {
  DataTable,
  DataTableColumnHeader,
  DataTableRowActions,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/data-table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  type ColumnDef,
  type Header,
  type PaginationState,
  type Row,
  type RowPinningState,
  type RowSelectionState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChevronDown,
  ChevronUp,
  Filter,
  GripVertical,
  HeartPulse,
  MapPin,
  MoreHorizontal,
  Pin,
  PinOff,
  Search,
  Settings2,
  Stethoscope,
  User,
  UserPlus,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// ─── Patient data ─────────────────────────────────────────────────────────────

type Patient = {
  id: string;
  name: string;
  age: number;
  gender: "M" | "F";
  ward: string;
  bed: string;
  diagnosis: string;
  status: "admitted" | "critical" | "stable" | "discharged";
};

const patients: Patient[] = [
  {
    id: "OHC-0041",
    name: "Ravi Kumar",
    age: 45,
    gender: "M",
    ward: "General",
    bed: "G-12",
    diagnosis: "Hypertension",
    status: "stable",
  },
  {
    id: "OHC-0042",
    name: "Priya Sharma",
    age: 32,
    gender: "F",
    ward: "Maternity",
    bed: "M-03",
    diagnosis: "Post-op recovery",
    status: "admitted",
  },
  {
    id: "OHC-0043",
    name: "Arjun Mehta",
    age: 67,
    gender: "M",
    ward: "ICU",
    bed: "I-01",
    diagnosis: "Cardiac arrest",
    status: "critical",
  },
  {
    id: "OHC-0044",
    name: "Sunita Rao",
    age: 28,
    gender: "F",
    ward: "Surgical",
    bed: "S-07",
    diagnosis: "Appendicitis",
    status: "admitted",
  },
  {
    id: "OHC-0045",
    name: "Mohammed Ali",
    age: 55,
    gender: "M",
    ward: "General",
    bed: "G-05",
    diagnosis: "Diabetes mellitus",
    status: "stable",
  },
  {
    id: "OHC-0046",
    name: "Lakshmi Nair",
    age: 73,
    gender: "F",
    ward: "Geriatric",
    bed: "GR-02",
    diagnosis: "COPD",
    status: "stable",
  },
  {
    id: "OHC-0047",
    name: "Vivek Patel",
    age: 41,
    gender: "M",
    ward: "Surgical",
    bed: "S-11",
    diagnosis: "Cholecystectomy",
    status: "admitted",
  },
  {
    id: "OHC-0048",
    name: "Ananya Singh",
    age: 19,
    gender: "F",
    ward: "General",
    bed: "G-18",
    diagnosis: "Typhoid fever",
    status: "admitted",
  },
  {
    id: "OHC-0049",
    name: "Deepak Verma",
    age: 60,
    gender: "M",
    ward: "ICU",
    bed: "I-03",
    diagnosis: "Stroke",
    status: "critical",
  },
  {
    id: "OHC-0050",
    name: "Meera Krishnan",
    age: 36,
    gender: "F",
    ward: "Maternity",
    bed: "M-07",
    diagnosis: "Normal delivery",
    status: "discharged",
  },
  {
    id: "OHC-0051",
    name: "Rajesh Nambiar",
    age: 50,
    gender: "M",
    ward: "Orthopedic",
    bed: "O-04",
    diagnosis: "Hip replacement",
    status: "admitted",
  },
  {
    id: "OHC-0052",
    name: "Fatima Begum",
    age: 48,
    gender: "F",
    ward: "General",
    bed: "G-22",
    diagnosis: "Urinary tract infection",
    status: "stable",
  },
];

const patientStatusVariant: Record<
  Patient["status"],
  "success" | "neutral" | "info" | "destructive"
> = {
  stable: "success",
  admitted: "info",
  critical: "destructive",
  discharged: "neutral",
};

// ─── Medication administration data ───────────────────────────────────────────

type MedLog = {
  id: string;
  patientId: string;
  patientName: string;
  medication: string;
  dose: string;
  route: string;
  scheduledAt: string;
  status: "given" | "pending" | "missed";
};

const medLogs: MedLog[] = [
  {
    id: "ML-01",
    patientId: "OHC-0043",
    patientName: "Arjun Mehta",
    medication: "Aspirin 75mg",
    dose: "1 tab",
    route: "Oral",
    scheduledAt: "06:00 AM",
    status: "given",
  },
  {
    id: "ML-02",
    patientId: "OHC-0041",
    patientName: "Ravi Kumar",
    medication: "Amlodipine 5mg",
    dose: "1 tab",
    route: "Oral",
    scheduledAt: "08:00 AM",
    status: "given",
  },
  {
    id: "ML-03",
    patientId: "OHC-0049",
    patientName: "Deepak Verma",
    medication: "Heparin 5000 IU",
    dose: "5000 IU",
    route: "IV",
    scheduledAt: "08:00 AM",
    status: "given",
  },
  {
    id: "ML-04",
    patientId: "OHC-0044",
    patientName: "Sunita Rao",
    medication: "Metronidazole 500mg",
    dose: "500 mg",
    route: "IV",
    scheduledAt: "10:00 AM",
    status: "pending",
  },
  {
    id: "ML-05",
    patientId: "OHC-0045",
    patientName: "Mohammed Ali",
    medication: "Metformin 500mg",
    dose: "1 tab",
    route: "Oral",
    scheduledAt: "02:00 PM",
    status: "pending",
  },
  {
    id: "ML-06",
    patientId: "OHC-0048",
    patientName: "Ananya Singh",
    medication: "Azithromycin 500mg",
    dose: "1 cap",
    route: "Oral",
    scheduledAt: "08:00 AM",
    status: "missed",
  },
  {
    id: "ML-07",
    patientId: "OHC-0046",
    patientName: "Lakshmi Nair",
    medication: "Salbutamol 2.5mg",
    dose: "2.5 mg",
    route: "Inhaled",
    scheduledAt: "12:00 PM",
    status: "pending",
  },
  {
    id: "ML-08",
    patientId: "OHC-0043",
    patientName: "Arjun Mehta",
    medication: "Atorvastatin 40mg",
    dose: "1 tab",
    route: "Oral",
    scheduledAt: "10:00 PM",
    status: "pending",
  },
  {
    id: "ML-09",
    patientId: "OHC-0051",
    patientName: "Rajesh Nambiar",
    medication: "Tramadol 50mg",
    dose: "50 mg",
    route: "IM",
    scheduledAt: "06:00 PM",
    status: "given",
  },
  {
    id: "ML-10",
    patientId: "OHC-0052",
    patientName: "Fatima Begum",
    medication: "Ciprofloxacin 500mg",
    dose: "1 tab",
    route: "Oral",
    scheduledAt: "08:00 AM",
    status: "given",
  },
];

const medStatusVariant: Record<
  MedLog["status"],
  "success" | "warning" | "destructive"
> = {
  given: "success",
  pending: "warning",
  missed: "destructive",
};

// ─── Invoice data ─────────────────────────────────────────────────────────────

type Invoice = {
  id: string;
  patientName: string;
  patientId: string;
  date: string;
  category: string;
  amount: number;
  status: "paid" | "pending" | "overdue";
};

const invoices: Invoice[] = [
  {
    id: "INV-2026-0041",
    patientName: "Ravi Kumar",
    patientId: "OHC-0041",
    date: "10 Apr 2026",
    category: "Consultation",
    amount: 500,
    status: "paid",
  },
  {
    id: "INV-2026-0042",
    patientName: "Priya Sharma",
    patientId: "OHC-0042",
    date: "12 Apr 2026",
    category: "Maternity",
    amount: 18500,
    status: "pending",
  },
  {
    id: "INV-2026-0043",
    patientName: "Arjun Mehta",
    patientId: "OHC-0043",
    date: "13 Apr 2026",
    category: "ICU",
    amount: 24000,
    status: "pending",
  },
  {
    id: "INV-2026-0044",
    patientName: "Sunita Rao",
    patientId: "OHC-0044",
    date: "14 Apr 2026",
    category: "Surgery",
    amount: 32000,
    status: "pending",
  },
  {
    id: "INV-2026-0045",
    patientName: "Mohammed Ali",
    patientId: "OHC-0045",
    date: "09 Apr 2026",
    category: "Consultation",
    amount: 750,
    status: "paid",
  },
  {
    id: "INV-2026-0046",
    patientName: "Lakshmi Nair",
    patientId: "OHC-0046",
    date: "08 Apr 2026",
    category: "Pharmacy",
    amount: 2340,
    status: "overdue",
  },
  {
    id: "INV-2026-0047",
    patientName: "Vivek Patel",
    patientId: "OHC-0047",
    date: "14 Apr 2026",
    category: "Surgery",
    amount: 28000,
    status: "pending",
  },
  {
    id: "INV-2026-0048",
    patientName: "Ananya Singh",
    patientId: "OHC-0048",
    date: "11 Apr 2026",
    category: "Laboratory",
    amount: 1200,
    status: "paid",
  },
  {
    id: "INV-2026-0049",
    patientName: "Deepak Verma",
    patientId: "OHC-0049",
    date: "13 Apr 2026",
    category: "ICU",
    amount: 18000,
    status: "pending",
  },
  {
    id: "INV-2026-0050",
    patientName: "Meera Krishnan",
    patientId: "OHC-0050",
    date: "10 Apr 2026",
    category: "Maternity",
    amount: 14500,
    status: "paid",
  },
];

const invoiceStatusVariant: Record<
  Invoice["status"],
  "success" | "warning" | "destructive"
> = {
  paid: "success",
  pending: "warning",
  overdue: "destructive",
};

// ─── Staff data ───────────────────────────────────────────────────────────────

type StaffMember = {
  id: string;
  name: string;
  email: string;
  department: string;
  designation: string;
  joined: string;
  experience: number;
  status: "active" | "inactive";
};

const staffMembers: StaffMember[] = [
  {
    id: "STAFF-001",
    name: "Dr. Kiran Reddy",
    email: "kiran.reddy@ohc.in",
    department: "Cardiology",
    designation: "Senior Consultant",
    joined: "Jan 2018",
    experience: 12,
    status: "active",
  },
  {
    id: "STAFF-002",
    name: "Dr. Anita Menon",
    email: "anita.menon@ohc.in",
    department: "Pediatrics",
    designation: "Consultant",
    joined: "Mar 2020",
    experience: 8,
    status: "active",
  },
  {
    id: "STAFF-003",
    name: "Dr. Suresh Pillai",
    email: "suresh.pillai@ohc.in",
    department: "Surgery",
    designation: "Head of Department",
    joined: "Jun 2015",
    experience: 15,
    status: "active",
  },
  {
    id: "STAFF-004",
    name: "Nurse Rekha Thomas",
    email: "rekha.thomas@ohc.in",
    department: "ICU",
    designation: "Senior Nurse",
    joined: "Sep 2019",
    experience: 6,
    status: "inactive",
  },
  {
    id: "STAFF-005",
    name: "Dr. Imran Sheikh",
    email: "imran.sheikh@ohc.in",
    department: "Orthopedics",
    designation: "Consultant",
    joined: "Nov 2017",
    experience: 10,
    status: "active",
  },
  {
    id: "STAFF-006",
    name: "Nurse Preethi Sajan",
    email: "preethi.sajan@ohc.in",
    department: "General Medicine",
    designation: "Staff Nurse",
    joined: "Feb 2022",
    experience: 3,
    status: "active",
  },
  {
    id: "STAFF-007",
    name: "Dr. Kavitha Nair",
    email: "kavitha.nair@ohc.in",
    department: "Neurology",
    designation: "Senior Consultant",
    joined: "Aug 2016",
    experience: 14,
    status: "active",
  },
  {
    id: "STAFF-008",
    name: "Dr. Rajiv Kapoor",
    email: "rajiv.kapoor@ohc.in",
    department: "Radiology",
    designation: "Consultant",
    joined: "Dec 2021",
    experience: 5,
    status: "inactive",
  },
  {
    id: "STAFF-009",
    name: "Nurse Sumathi Krishnan",
    email: "sumathi.k@ohc.in",
    department: "Maternity",
    designation: "Senior Nurse",
    joined: "Apr 2018",
    experience: 9,
    status: "active",
  },
  {
    id: "STAFF-010",
    name: "Dr. Farhan Hossain",
    email: "farhan.hossain@ohc.in",
    department: "Oncology",
    designation: "Consultant",
    joined: "Jul 2020",
    experience: 7,
    status: "active",
  },
  {
    id: "STAFF-011",
    name: "Dr. Pooja Iyer",
    email: "pooja.iyer@ohc.in",
    department: "Dermatology",
    designation: "Consultant",
    joined: "May 2023",
    experience: 4,
    status: "active",
  },
  {
    id: "STAFF-012",
    name: "Nurse Arun Mathew",
    email: "arun.mathew@ohc.in",
    department: "Emergency",
    designation: "Charge Nurse",
    joined: "Oct 2019",
    experience: 6,
    status: "inactive",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const getInitials = (name: string) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

const formatINR = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

const patientCell = (name: string, id: string) =>
  React.createElement(
    "div",
    { className: "flex items-center gap-3" },
    React.createElement(
      Avatar,
      { shape: "rounded" },
      React.createElement(
        AvatarFallback,
        { color: "primary" },
        getInitials(name)
      )
    ),
    React.createElement(
      "div",
      { className: "flex flex-col" },
      React.createElement("span", { className: "font-medium" }, name),
      React.createElement(
        "span",
        { className: "text-muted-foreground text-xs" },
        id
      )
    )
  );

// ─── Medication log columns ───────────────────────────────────────────────────

const medColumns: ColumnDef<MedLog>[] = [
  {
    id: "patient",
    accessorKey: "patientName",
    header: "Patient",
    cell: ({ row }) =>
      patientCell(row.original.patientName, row.original.patientId),
  },
  {
    id: "medication",
    accessorKey: "medication",
    header: "Medication",
    cell: ({ row }) =>
      React.createElement(
        "div",
        { className: "flex flex-col" },
        React.createElement(
          "span",
          { className: "font-medium text-sm" },
          row.original.medication
        ),
        React.createElement(
          "span",
          { className: "text-muted-foreground text-xs" },
          `${row.original.dose} · ${row.original.route}`
        )
      ),
  },
  {
    accessorKey: "scheduledAt",
    header: "Scheduled",
    cell: ({ row }) =>
      React.createElement(
        "span",
        { className: "font-medium tabular-nums text-sm" },
        row.getValue("scheduledAt")
      ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) =>
      React.createElement(
        Badge,
        {
          variant: medStatusVariant[row.getValue("status") as MedLog["status"]],
        },
        row.getValue("status")
      ),
  },
];

// ─── Invoice columns ──────────────────────────────────────────────────────────

const invoiceColumns: ColumnDef<Invoice>[] = [
  {
    accessorKey: "id",
    header: ({ column }) =>
      React.createElement(DataTableColumnHeader, {
        column: column as any,
        title: "Invoice #",
      }),
    cell: ({ row }) =>
      React.createElement(
        "span",
        { className: "font-mono text-sm font-medium" },
        row.getValue("id")
      ),
  },
  {
    id: "patient",
    accessorKey: "patientName",
    header: "Patient",
    cell: ({ row }) =>
      patientCell(row.original.patientName, row.original.patientId),
  },
  {
    accessorKey: "date",
    header: ({ column }) =>
      React.createElement(DataTableColumnHeader, {
        column: column as any,
        title: "Date",
      }),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) =>
      React.createElement(
        Badge,
        { variant: "neutral" },
        row.getValue("category")
      ),
  },
  {
    accessorKey: "amount",
    header: ({ column }) =>
      React.createElement(DataTableColumnHeader, {
        column: column as any,
        title: "Amount",
      }),
    meta: { className: "text-right" },
    cell: ({ row }) =>
      React.createElement(
        "div",
        { className: "font-medium tabular-nums" },
        formatINR(row.getValue("amount"))
      ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) =>
      React.createElement(
        Badge,
        {
          variant:
            invoiceStatusVariant[row.getValue("status") as Invoice["status"]],
        },
        row.getValue("status")
      ),
  },
  {
    id: "actions",
    enableHiding: false,
    meta: { className: "w-0" },
    cell: ({ row }) =>
      React.createElement(
        DataTableRowActions,
        {},
        React.createElement(
          DropdownMenuItem,
          { onClick: () => navigator.clipboard.writeText(row.original.id) },
          "Copy invoice ID"
        ),
        React.createElement(DropdownMenuSeparator, {}),
        React.createElement(DropdownMenuItem, {}, "View invoice"),
        React.createElement(DropdownMenuItem, {}, "Download PDF"),
        React.createElement(DropdownMenuSeparator, {}),
        React.createElement(DropdownMenuItem, {}, "Mark as paid"),
        React.createElement(
          DropdownMenuItem,
          { className: "text-destructive" },
          "Void invoice"
        )
      ),
  },
];

// ─── Sortable staff columns ──────────────────────────────────────────────────

const staffCell = (name: string, email: string) =>
  React.createElement(
    "div",
    { className: "flex items-center gap-3" },
    React.createElement(
      Avatar,
      { shape: "circle" },
      React.createElement(
        AvatarFallback,
        { color: "primary" },
        getInitials(name)
      )
    ),
    React.createElement(
      "div",
      { className: "flex flex-col" },
      React.createElement("span", { className: "font-medium" }, name),
      React.createElement(
        "span",
        { className: "text-muted-foreground text-xs" },
        email
      )
    )
  );

const sortableStaffColumns: ColumnDef<StaffMember>[] = [
  {
    id: "staff",
    accessorKey: "name",
    enableSorting: true,
    header: ({ column }) =>
      React.createElement(DataTableColumnHeader, {
        column: column as any,
        title: "Staff",
      }),
    cell: ({ row }) => staffCell(row.original.name, row.original.email),
  },
  {
    accessorKey: "department",
    enableSorting: true,
    header: ({ column }) =>
      React.createElement(DataTableColumnHeader, {
        column: column as any,
        title: "Department",
      }),
  },
  {
    accessorKey: "designation",
    enableSorting: true,
    header: ({ column }) =>
      React.createElement(DataTableColumnHeader, {
        column: column as any,
        title: "Designation",
      }),
  },
  {
    accessorKey: "experience",
    enableSorting: true,
    header: ({ column }) =>
      React.createElement(DataTableColumnHeader, {
        column: column as any,
        title: "Experience",
      }),
    cell: ({ row }) =>
      React.createElement(
        "span",
        { className: "tabular-nums" },
        `${row.getValue("experience")} yrs`
      ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) =>
      React.createElement(
        Badge,
        {
          variant: row.getValue("status") === "active" ? "success" : "neutral",
        },
        row.getValue("status")
      ),
  },
];

// ─── Selection members data ──────────────────────────────────────────────────

type SelectionMember = {
  id: string;
  name: string;
  availability: "online" | "away" | "busy" | "offline";
  avatar: string;
  flag: string;
  email: string;
  location: string;
  joined: string;
};

const selectionMembers: SelectionMember[] = [
  {
    id: "1",
    name: "Dr. Anika Sharma",
    availability: "online",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&h=96&dpr=2&q=80",
    flag: "in",
    email: "anika.sharma@ohc.in",
    location: "India",
    joined: "Mar, 2021",
  },
  {
    id: "2",
    name: "Dr. Sarah Mitchell",
    availability: "away",
    avatar:
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=96&h=96&dpr=2&q=80",
    flag: "gb",
    email: "sarah.mitchell@ohc.in",
    location: "United Kingdom",
    joined: "Jul, 2020",
  },
  {
    id: "3",
    name: "Dr. David Okafor",
    availability: "busy",
    avatar:
      "https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?w=96&h=96&dpr=2&q=80",
    flag: "ng",
    email: "david.okafor@ohc.in",
    location: "Nigeria",
    joined: "Mar, 2019",
  },
  {
    id: "4",
    name: "Nurse Elena Fischer",
    availability: "offline",
    avatar:
      "https://images.unsplash.com/photo-1485893086445-ed75865251e0?w=96&h=96&dpr=2&q=80",
    flag: "de",
    email: "elena.fischer@ohc.in",
    location: "Germany",
    joined: "Jan, 2022",
  },
  {
    id: "5",
    name: "Dr. Hiroshi Tanaka",
    availability: "online",
    avatar:
      "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=96&h=96&dpr=2&q=80",
    flag: "jp",
    email: "hiroshi.tanaka@ohc.in",
    location: "Japan",
    joined: "May, 2023",
  },
  {
    id: "6",
    name: "Dr. Ravi Menon",
    availability: "away",
    avatar:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=96&h=96&dpr=2&q=80",
    flag: "in",
    email: "ravi.menon@ohc.in",
    location: "India",
    joined: "Nov, 2018",
  },
  {
    id: "7",
    name: "Dr. Carlos Rivera",
    availability: "busy",
    avatar:
      "https://images.unsplash.com/photo-1543299750-19d1d6297053?w=96&h=96&dpr=2&q=80",
    flag: "es",
    email: "carlos.rivera@ohc.in",
    location: "Spain",
    joined: "Jun, 2021",
  },
  {
    id: "8",
    name: "Nurse Mei Lin Wong",
    availability: "offline",
    avatar:
      "https://images.unsplash.com/photo-1620075225255-8c2051b6c015?w=96&h=96&dpr=2&q=80",
    flag: "sg",
    email: "mei.wong@ohc.in",
    location: "Singapore",
    joined: "Oct, 2020",
  },
  {
    id: "9",
    name: "Dr. Siddharth Patel",
    availability: "online",
    avatar:
      "https://images.unsplash.com/photo-1485206412256-701ccc5b93ca?w=96&h=96&dpr=2&q=80",
    flag: "in",
    email: "siddharth.patel@ohc.in",
    location: "India",
    joined: "Sep, 2019",
  },
  {
    id: "10",
    name: "Dr. Amara Diallo",
    availability: "away",
    avatar:
      "https://images.unsplash.com/photo-1542595913-85d69b0edbaf?w=96&h=96&dpr=2&q=80",
    flag: "sn",
    email: "amara.diallo@ohc.in",
    location: "Senegal",
    joined: "Feb, 2023",
  },
  {
    id: "11",
    name: "Dr. Priya Krishnan",
    availability: "busy",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&h=96&dpr=2&q=80",
    flag: "in",
    email: "priya.krishnan@ohc.in",
    location: "India",
    joined: "Dec, 2022",
  },
  {
    id: "12",
    name: "Nurse Rekha Thomas",
    availability: "offline",
    avatar:
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=96&h=96&dpr=2&q=80",
    flag: "in",
    email: "rekha.thomas@ohc.in",
    location: "India",
    joined: "Mar, 2020",
  },
];

const availabilityColor: Record<SelectionMember["availability"], string> = {
  online: "bg-green-500",
  away: "bg-yellow-500",
  busy: "bg-orange-500",
  offline: "bg-gray-400",
};

const selectionColumns: ColumnDef<SelectionMember>[] = [
  {
    id: "select",
    header: ({ table }) =>
      React.createElement(Checkbox, {
        checked: table.getIsAllPageRowsSelected(),
        indeterminate:
          !table.getIsAllPageRowsSelected() &&
          table.getIsSomePageRowsSelected(),
        onCheckedChange: (value: boolean) =>
          table.toggleAllPageRowsSelected(!!value),
        "aria-label": "Select all",
      }),
    cell: ({ row }) =>
      React.createElement(Checkbox, {
        checked: row.getIsSelected(),
        onCheckedChange: (value: boolean) => row.toggleSelected(!!value),
        "aria-label": "Select row",
      }),
    enableSorting: false,
    enableHiding: false,
    size: 20,
  },
  {
    accessorKey: "name",
    id: "name",
    header: "Name",
    size: 200,
    enableSorting: true,
    enableHiding: false,
    cell: ({ row }) =>
      React.createElement(
        "div",
        { className: "flex items-center gap-3" },
        React.createElement(
          Avatar,
          { className: "size-8" },
          React.createElement(AvatarImage, {
            src: row.original.avatar,
            alt: row.original.name,
          }),
          React.createElement(
            AvatarFallback,
            null,
            row.original.name
              .split(" ")
              .map((n: string) => n[0])
              .join("")
          ),
          React.createElement(AvatarBadge, {
            className:
              "size-1.5! p-0 " +
              (availabilityColor[row.original.availability] ||
                availabilityColor.offline),
          })
        ),
        React.createElement(
          "div",
          { className: "space-y-px" },
          React.createElement(
            "div",
            { className: "text-foreground font-medium" },
            row.original.name
          ),
          React.createElement(
            "div",
            { className: "text-muted-foreground" },
            row.original.email
          )
        )
      ),
  },
  {
    accessorKey: "location",
    header: "Location",
    size: 180,
    cell: ({ row }) =>
      React.createElement(
        "div",
        { className: "flex items-center gap-1.5" },
        React.createElement("img", {
          src:
            "https://flagcdn.com/" + row.original.flag.toLowerCase() + ".svg",
          alt: row.original.flag,
          className: "size-4 rounded-full object-cover",
        }),
        React.createElement(
          "div",
          { className: "text-foreground font-medium" },
          row.original.location
        )
      ),
  },
  {
    accessorKey: "joined",
    header: "Joined",
    size: 120,
    cell: ({ row }) =>
      React.createElement(
        "span",
        { className: "font-medium" },
        row.original.joined
      ),
  },
];

// ─── Preview components ───────────────────────────────────────────────────────

const PatientTableDemo = () =>
  React.createElement(DataTable as any, {
    columns: selectionColumns,
    data: selectionMembers,
    filterColumn: "name",
    filterPlaceholder: "Search practitioners...",
  });

const MedLogDemo = () =>
  React.createElement(DataTable as any, {
    columns: medColumns,
    data: medLogs,
    filterColumn: "patientName",
    filterPlaceholder: "Search by patient...",
  });

const InvoiceDemo = () =>
  React.createElement(DataTable as any, {
    columns: invoiceColumns,
    data: invoices,
    filterColumn: "patientName",
    filterPlaceholder: "Search by patient...",
  });

const SortablePatientDemo = () =>
  React.createElement(DataTable as any, {
    columns: sortableStaffColumns,
    data: staffMembers,
    filterColumn: "name",
    filterPlaceholder: "Search staff...",
  });

const MovableColumnsDemo = () =>
  React.createElement(DataTable as any, {
    columns: sortableStaffColumns,
    data: staffMembers,
    filterColumn: "name",
    filterPlaceholder: "Search staff...",
    movableColumns: true,
  });

// ─── Draggable columns data & demo ───────────────────────────────────────────

type DndMember = {
  id: string;
  name: string;
  avatar: string;
  email: string;
  company: string;
  role: string;
  location: string;
  status: "active" | "inactive";
};

const dndMembers: DndMember[] = [
  {
    id: "1",
    name: "Dr. Kiran Reddy",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&h=96&dpr=2&q=80",
    email: "kiran.reddy@ohc.in",
    company: "Cardiology",
    role: "Senior Consultant",
    location: "Hyderabad",
    status: "active",
  },
  {
    id: "2",
    name: "Dr. Anita Menon",
    avatar:
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=96&h=96&dpr=2&q=80",
    email: "anita.menon@ohc.in",
    company: "Pediatrics",
    role: "Consultant",
    location: "Kochi",
    status: "inactive",
  },
  {
    id: "3",
    name: "Dr. Suresh Pillai",
    avatar:
      "https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?w=96&h=96&dpr=2&q=80",
    email: "suresh.pillai@ohc.in",
    company: "General Surgery",
    role: "Head of Department",
    location: "Trivandrum",
    status: "active",
  },
  {
    id: "4",
    name: "Nurse Rekha Thomas",
    avatar:
      "https://images.unsplash.com/photo-1485893086445-ed75865251e0?w=96&h=96&dpr=2&q=80",
    email: "rekha.thomas@ohc.in",
    company: "ICU",
    role: "Senior Nurse",
    location: "Bangalore",
    status: "inactive",
  },
  {
    id: "5",
    name: "Dr. Imran Sheikh",
    avatar:
      "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=96&h=96&dpr=2&q=80",
    email: "imran.sheikh@ohc.in",
    company: "Orthopedics",
    role: "Consultant",
    location: "Mumbai",
    status: "inactive",
  },
  {
    id: "6",
    name: "Dr. Kavitha Nair",
    avatar:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=96&h=96&dpr=2&q=80",
    email: "kavitha.nair@ohc.in",
    company: "Neurology",
    role: "Senior Consultant",
    location: "Chennai",
    status: "active",
  },
  {
    id: "7",
    name: "Dr. Rajiv Kapoor",
    avatar:
      "https://images.unsplash.com/photo-1543299750-19d1d6297053?w=96&h=96&dpr=2&q=80",
    email: "rajiv.kapoor@ohc.in",
    company: "Radiology",
    role: "Consultant",
    location: "Delhi",
    status: "inactive",
  },
  {
    id: "8",
    name: "Nurse Sumathi K.",
    avatar:
      "https://images.unsplash.com/photo-1620075225255-8c2051b6c015?w=96&h=96&dpr=2&q=80",
    email: "sumathi.k@ohc.in",
    company: "Maternity",
    role: "Senior Nurse",
    location: "Coimbatore",
    status: "inactive",
  },
  {
    id: "9",
    name: "Dr. Farhan Hossain",
    avatar:
      "https://images.unsplash.com/photo-1485206412256-701ccc5b93ca?w=96&h=96&dpr=2&q=80",
    email: "farhan.hossain@ohc.in",
    company: "Oncology",
    role: "Consultant",
    location: "Kolkata",
    status: "inactive",
  },
  {
    id: "10",
    name: "Dr. Pooja Iyer",
    avatar:
      "https://images.unsplash.com/photo-1542595913-85d69b0edbaf?w=96&h=96&dpr=2&q=80",
    email: "pooja.iyer@ohc.in",
    company: "Dermatology",
    role: "Consultant",
    location: "Pune",
    status: "inactive",
  },
  {
    id: "11",
    name: "Nurse Arun Mathew",
    avatar:
      "https://images.unsplash.com/photo-1619946794135-5bc917a27793?w=96&h=96&dpr=2&q=80",
    email: "arun.mathew@ohc.in",
    company: "Emergency",
    role: "Charge Nurse",
    location: "Mangalore",
    status: "active",
  },
];

function DndSortableHeader({
  header,
  transform,
  isDragging,
  noTransition,
  onRef,
}: {
  header: Header<DndMember, unknown>;
  transform: number;
  isDragging: boolean;
  noTransition: boolean;
  onRef: (el: HTMLElement | null) => void;
}) {
  const { attributes, listeners, setNodeRef } = useSortable({ id: header.id });

  return (
    <TableHead
      ref={(el) => {
        setNodeRef(el);
        onRef(el);
      }}
      colSpan={header.colSpan}
      style={{
        opacity: isDragging ? 0.4 : 1,
        transform: transform !== 0 ? `translateX(${transform}px)` : undefined,
        position: transform !== 0 || isDragging ? "relative" : undefined,
        zIndex: isDragging ? 10 : undefined,
        transition:
          isDragging || noTransition ? "none" : "transform 100ms ease",
      }}
    >
      <div className="flex items-center gap-1">
        <button
          {...attributes}
          {...listeners}
          className="text-muted-foreground/50 hover:text-muted-foreground cursor-grab touch-none active:cursor-grabbing"
          aria-label="Drag to reorder column"
        >
          <GripVertical className="size-3.5" />
        </button>
        {header.isPlaceholder
          ? null
          : flexRender(header.column.columnDef.header, header.getContext())}
      </div>
    </TableHead>
  );
}

const dndMemberColumns: ColumnDef<DndMember>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar shape="circle">
          <AvatarImage src={row.original.avatar} alt={row.original.name} />
          <AvatarFallback>{getInitials(row.original.name)}</AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium">{row.original.name}</span>
      </div>
    ),
  },
  {
    id: "email",
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <span className="text-muted-foreground text-sm">
        {row.original.email}
      </span>
    ),
  },
  {
    id: "company",
    accessorKey: "company",
    header: "Department",
    cell: ({ row }) => (
      <span className="text-sm font-medium">{row.original.company}</span>
    ),
  },
  {
    id: "role",
    accessorKey: "role",
    header: "Designation",
    cell: ({ row }) => <span className="text-sm">{row.original.role}</span>,
  },
  {
    id: "status",
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) =>
      row.original.status === "active"
        ? React.createElement(Badge, { variant: "success" }, "Approved")
        : React.createElement(Badge, { variant: "warning" }, "Pending"),
  },
];

function DraggableColumnsDemo() {
  const [columnOrder, setColumnOrder] = React.useState<string[]>(
    dndMemberColumns.map((c) => c.id as string)
  );
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const [overId, setOverId] = React.useState<string | null>(null);
  const [activeDelta, setActiveDelta] = React.useState(0);
  const [noTransition, setNoTransition] = React.useState(false);
  const headerRefs = React.useRef<Record<string, HTMLElement | null>>({});

  // Compute how far each non-dragged column should shift to make room
  const displacements = React.useMemo<Record<string, number>>(() => {
    if (!activeId || !overId) return {};
    const activeIdx = columnOrder.indexOf(activeId);
    const overIdx = columnOrder.indexOf(overId);
    if (activeIdx === overIdx) return {};
    const activeWidth = headerRefs.current[activeId]?.offsetWidth ?? 0;
    const result: Record<string, number> = {};
    for (const id of columnOrder) {
      if (id === activeId) continue;
      const idx = columnOrder.indexOf(id);
      if (activeIdx < overIdx && idx > activeIdx && idx <= overIdx)
        result[id] = -activeWidth;
      else if (activeIdx > overIdx && idx < activeIdx && idx >= overIdx)
        result[id] = activeWidth;
    }
    return result;
  }, [activeId, overId, columnOrder]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setNoTransition(true);
    if (active && over && active.id !== over.id) {
      setColumnOrder((order) => {
        const oldIdx = order.indexOf(active.id as string);
        const newIdx = order.indexOf(over.id as string);
        return arrayMove(order, oldIdx, newIdx);
      });
    }
    setActiveId(null);
    setOverId(null);
    setActiveDelta(0);
    requestAnimationFrame(() => setNoTransition(false));
  };

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: dndMembers,
    columns: dndMemberColumns,
    state: { columnOrder },
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={({ active }) => {
        setActiveId(active.id as string);
        setOverId(active.id as string);
        setActiveDelta(0);
      }}
      onDragMove={({ delta }) => setActiveDelta(delta.x)}
      onDragOver={({ over }) => setOverId((over?.id as string) ?? null)}
      onDragEnd={handleDragEnd}
      onDragCancel={() => {
        setNoTransition(true);
        setActiveId(null);
        setOverId(null);
        setActiveDelta(0);
        requestAnimationFrame(() => setNoTransition(false));
      }}
    >
      <div className="overflow-hidden rounded-md border [&_td:not(:last-child)]:border-r [&_th:first-child:not(:has([data-slot=checkbox])):is(:has([data-slot=button]),:has([data-slot=dropdown-menu-trigger]))_:is([data-slot=button],[data-slot=dropdown-menu-trigger])]:-ms-1 [&_th:not(:first-child):is(:has([data-slot=button]),:has([data-slot=dropdown-menu-trigger]))_:is([data-slot=button],[data-slot=dropdown-menu-trigger])]:-ms-3 [&_th:not(:last-child)]:border-r">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                <SortableContext
                  items={columnOrder}
                  strategy={horizontalListSortingStrategy}
                >
                  {headerGroup.headers.map((header) => (
                    <DndSortableHeader
                      key={header.id}
                      header={header}
                      transform={
                        activeId === header.id
                          ? activeDelta
                          : (displacements[header.id] ?? 0)
                      }
                      isDragging={activeId === header.id}
                      noTransition={noTransition}
                      onRef={(el) => {
                        headerRefs.current[header.id] = el;
                      }}
                    />
                  ))}
                </SortableContext>
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  const dragging = activeId === cell.column.id;
                  const tx = dragging
                    ? activeDelta
                    : (displacements[cell.column.id] ?? 0);
                  return (
                    <TableCell
                      key={cell.id}
                      style={
                        tx !== 0 || dragging
                          ? {
                              transform: `translateX(${tx}px)`,
                              position: "relative",
                              zIndex: dragging ? 10 : undefined,
                              opacity: dragging ? 0.6 : 1,
                              transition:
                                dragging || noTransition
                                  ? "none"
                                  : "transform 100ms ease",
                            }
                          : undefined
                      }
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </DndContext>
  );
}

// ─── Resizable columns demo ───────────────────────────────────────────────────

const resizableColumns: ColumnDef<DndMember>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: "Staff",
    size: 280,
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar shape="circle">
          <AvatarImage src={row.original.avatar} alt={row.original.name} />
          <AvatarFallback>{getInitials(row.original.name)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-medium">{row.original.name}</span>
          <span className="text-muted-foreground text-xs">
            {row.original.email}
          </span>
        </div>
      </div>
    ),
  },
  {
    id: "company",
    accessorKey: "company",
    header: "Company",
    size: 160,
    cell: ({ row }) => (
      <span className="text-sm font-medium">{row.original.company}</span>
    ),
  },
  {
    id: "role",
    accessorKey: "role",
    header: "Occupation",
    size: 160,
    cell: ({ row }) => <span className="text-sm">{row.original.role}</span>,
  },
  {
    id: "status",
    accessorKey: "status",
    header: "Status",
    size: 120,
    enableResizing: false,
    cell: ({ row }) =>
      row.original.status === "active" ? (
        <Badge variant="success">Approved</Badge>
      ) : (
        <Badge variant="warning">Pending</Badge>
      ),
  },
];

function ResizableColumnsDemo() {
  const table = useReactTable({
    data: dndMembers,
    columns: resizableColumns,
    columnResizeMode: "onChange",
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-hidden overflow-x-auto rounded-md border [&_td:not(:last-child)]:border-r [&_th:first-child:not(:has([data-slot=checkbox])):is(:has([data-slot=button]),:has([data-slot=dropdown-menu-trigger]))_:is([data-slot=button],[data-slot=dropdown-menu-trigger])]:-ms-1 [&_th:not(:first-child):is(:has([data-slot=button]),:has([data-slot=dropdown-menu-trigger]))_:is([data-slot=button],[data-slot=dropdown-menu-trigger])]:-ms-3 [&_th:not(:last-child)]:border-r">
      <Table style={{ width: table.getTotalSize() }}>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  style={{ width: header.getSize() }}
                  className="relative overflow-hidden"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  {header.column.getCanResize() && (
                    <div
                      onMouseDown={header.getResizeHandler()}
                      onTouchStart={header.getResizeHandler()}
                      className={`absolute top-0 right-0 h-full w-1 cursor-col-resize touch-none transition-colors select-none ${
                        header.column.getIsResizing()
                          ? "bg-primary"
                          : "hover:bg-border bg-transparent"
                      }`}
                    />
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  style={{ width: cell.column.getSize() }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

// ─── Pinnable columns demo ───────────────────────────────────────────────────

type PinnableMember = {
  id: string;
  name: string;
  availability: "online" | "away" | "busy" | "offline";
  avatar: string;
  status: "active" | "inactive";
  flag: string;
  email: string;
  company: string;
  role: string;
  joined: string;
  location: string;
};

const pinnableMembers: PinnableMember[] = [
  {
    id: "1",
    name: "Dr. Kiran Reddy",
    availability: "online",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&h=96&dpr=2&q=80",
    status: "active",
    flag: "in",
    email: "kiran.reddy@ohc.in",
    company: "Cardiology",
    role: "Senior Consultant",
    joined: "Jan, 2018",
    location: "India",
  },
  {
    id: "2",
    name: "Dr. Anita Menon",
    availability: "away",
    avatar:
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=96&h=96&dpr=2&q=80",
    status: "inactive",
    flag: "in",
    email: "anita.menon@ohc.in",
    company: "Pediatrics",
    role: "Consultant",
    joined: "Mar, 2020",
    location: "India",
  },
  {
    id: "3",
    name: "Dr. Suresh Pillai",
    availability: "busy",
    avatar:
      "https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?w=96&h=96&dpr=2&q=80",
    status: "active",
    flag: "in",
    email: "suresh.pillai@ohc.in",
    company: "General Surgery",
    role: "Head of Department",
    joined: "Jun, 2015",
    location: "India",
  },
  {
    id: "4",
    name: "Nurse Rekha Thomas",
    availability: "offline",
    avatar:
      "https://images.unsplash.com/photo-1485893086445-ed75865251e0?w=96&h=96&dpr=2&q=80",
    status: "inactive",
    flag: "in",
    email: "rekha.thomas@ohc.in",
    company: "ICU",
    role: "Senior Nurse",
    joined: "Sep, 2019",
    location: "India",
  },
  {
    id: "5",
    name: "Dr. Imran Sheikh",
    availability: "online",
    avatar:
      "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=96&h=96&dpr=2&q=80",
    status: "active",
    flag: "in",
    email: "imran.sheikh@ohc.in",
    company: "Orthopedics",
    role: "Consultant",
    joined: "Nov, 2017",
    location: "India",
  },
  {
    id: "6",
    name: "Dr. Kavitha Nair",
    availability: "away",
    avatar:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=96&h=96&dpr=2&q=80",
    status: "active",
    flag: "in",
    email: "kavitha.nair@ohc.in",
    company: "Neurology",
    role: "Senior Consultant",
    joined: "Aug, 2016",
    location: "India",
  },
  {
    id: "7",
    name: "Dr. Rajiv Kapoor",
    availability: "busy",
    avatar:
      "https://images.unsplash.com/photo-1543299750-19d1d6297053?w=96&h=96&dpr=2&q=80",
    status: "inactive",
    flag: "in",
    email: "rajiv.kapoor@ohc.in",
    company: "Radiology",
    role: "Consultant",
    joined: "Dec, 2021",
    location: "India",
  },
  {
    id: "8",
    name: "Nurse Sumathi K.",
    availability: "offline",
    avatar:
      "https://images.unsplash.com/photo-1620075225255-8c2051b6c015?w=96&h=96&dpr=2&q=80",
    status: "active",
    flag: "in",
    email: "sumathi.k@ohc.in",
    company: "Maternity",
    role: "Senior Nurse",
    joined: "Apr, 2018",
    location: "India",
  },
  {
    id: "9",
    name: "Dr. Farhan Hossain",
    availability: "online",
    avatar:
      "https://images.unsplash.com/photo-1485206412256-701ccc5b93ca?w=96&h=96&dpr=2&q=80",
    status: "inactive",
    flag: "in",
    email: "farhan.hossain@ohc.in",
    company: "Oncology",
    role: "Consultant",
    joined: "Jul, 2020",
    location: "India",
  },
  {
    id: "10",
    name: "Dr. Pooja Iyer",
    availability: "away",
    avatar:
      "https://images.unsplash.com/photo-1542595913-85d69b0edbaf?w=96&h=96&dpr=2&q=80",
    status: "inactive",
    flag: "in",
    email: "pooja.iyer@ohc.in",
    company: "Dermatology",
    role: "Consultant",
    joined: "May, 2023",
    location: "India",
  },
  {
    id: "11",
    name: "Nurse Arun Mathew",
    availability: "busy",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&h=96&dpr=2&q=80",
    status: "active",
    flag: "in",
    email: "arun.mathew@ohc.in",
    company: "Emergency",
    role: "Charge Nurse",
    joined: "Oct, 2019",
    location: "India",
  },
  {
    id: "12",
    name: "Dr. Preethi Sajan",
    availability: "offline",
    avatar:
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=96&h=96&dpr=2&q=80",
    status: "active",
    flag: "in",
    email: "preethi.sajan@ohc.in",
    company: "General Medicine",
    role: "Staff Physician",
    joined: "Feb, 2022",
    location: "India",
  },
];

const pinnableColumns: ColumnDef<PinnableMember>[] = [
  {
    id: "name",
    accessorKey: "name",
    size: 220,
    enableSorting: true,
    enableHiding: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column as any} title="Name" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Avatar className="size-6" shape="circle">
          <AvatarImage src={row.original.avatar} alt={row.original.name} />
          <AvatarFallback>{getInitials(row.original.name)}</AvatarFallback>
        </Avatar>
        <span className="text-foreground font-medium whitespace-nowrap">
          {row.original.name}
        </span>
      </div>
    ),
  },
  {
    id: "email",
    accessorKey: "email",
    size: 220,
    enableSorting: true,
    header: ({ column }) => (
      <DataTableColumnHeader column={column as any} title="Email" />
    ),
    cell: ({ row }) => (
      <span className="text-muted-foreground text-sm whitespace-nowrap">
        {row.original.email}
      </span>
    ),
  },
  {
    id: "location",
    accessorKey: "location",
    size: 180,
    enableSorting: true,
    header: ({ column }) => (
      <DataTableColumnHeader column={column as any} title="Location" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-1.5">
        <img
          src={`https://flagcdn.com/${row.original.flag.toLowerCase()}.svg`}
          alt={row.original.flag}
          className="size-4 rounded-full object-cover"
        />
        <span className="text-foreground font-medium whitespace-nowrap">
          {row.original.location}
        </span>
      </div>
    ),
  },
  {
    id: "company",
    accessorKey: "company",
    size: 160,
    enableSorting: true,
    header: ({ column }) => (
      <DataTableColumnHeader column={column as any} title="Department" />
    ),
    cell: ({ row }) => (
      <span className="text-sm font-medium whitespace-nowrap">
        {row.original.company}
      </span>
    ),
  },
  {
    id: "role",
    accessorKey: "role",
    size: 180,
    enableSorting: true,
    header: ({ column }) => (
      <DataTableColumnHeader column={column as any} title="Designation" />
    ),
    cell: ({ row }) => (
      <span className="text-sm whitespace-nowrap">{row.original.role}</span>
    ),
  },
  {
    id: "joined",
    accessorKey: "joined",
    size: 120,
    enableSorting: true,
    header: ({ column }) => (
      <DataTableColumnHeader column={column as any} title="Joined" />
    ),
    cell: ({ row }) => (
      <span className="text-sm font-medium whitespace-nowrap">
        {row.original.joined}
      </span>
    ),
  },
  {
    id: "status",
    accessorKey: "status",
    size: 140,
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column as any} title="Status" />
    ),
    cell: ({ row }) =>
      row.original.status === "active" ? (
        <Badge variant="success">Approved</Badge>
      ) : (
        <Badge variant="warning">Pending</Badge>
      ),
  },
];

const PinnableColumnsDemo = () =>
  React.createElement(DataTable as any, {
    columns: pinnableColumns,
    data: pinnableMembers,
    filterColumn: "name",
    filterPlaceholder: "Search practitioners...",
    pinnable: true,
    initialPinning: { left: ["name"] },
  });

// ─── Cell-border columns ──────────────────────────────────────────────────────

const cellBorderColumns: ColumnDef<Patient>[] = [
  {
    id: "patient",
    accessorKey: "name",
    header: ({ column }) =>
      React.createElement(DataTableColumnHeader, {
        column: column as any,
        title: "Name",
      }),
    cell: ({ row }) => patientCell(row.original.name, row.original.id),
  },
  {
    accessorKey: "ward",
    header: "Ward",
    cell: ({ row }) =>
      React.createElement(
        "div",
        { className: "flex flex-col" },
        React.createElement(
          "span",
          { className: "font-medium text-sm" },
          row.original.ward
        ),
        React.createElement(
          "span",
          { className: "text-muted-foreground text-xs" },
          row.original.bed
        )
      ),
  },
  {
    accessorKey: "diagnosis",
    header: "Diagnosis",
  },
  {
    accessorKey: "salary",
    header: "Salary",
    meta: { className: "text-right" },
    cell: ({ row }) =>
      React.createElement(
        "span",
        { className: "font-semibold tabular-nums" },
        formatINR(
          invoices.find((i) => i.patientId === row.original.id)?.amount ?? 0
        )
      ),
  },
];

const CellBorderDemo = () =>
  React.createElement(DataTable as any, {
    columns: cellBorderColumns,
    data: patients,
    filterColumn: "name",
    filterPlaceholder: "Search patients...",
    cellBorder: true,
  });

// ─── Dense columns ────────────────────────────────────────────────────────────

const denseColumns: ColumnDef<Patient>[] = [
  {
    id: "patient",
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => patientCell(row.original.name, row.original.id),
  },
  {
    accessorKey: "ward",
    header: "Ward",
    cell: ({ row }) =>
      React.createElement(
        "div",
        { className: "flex flex-col" },
        React.createElement(
          "span",
          { className: "font-medium text-sm" },
          row.original.ward
        ),
        React.createElement(
          "span",
          { className: "text-muted-foreground text-xs" },
          row.original.bed
        )
      ),
  },
  {
    accessorKey: "diagnosis",
    header: "Diagnosis",
  },
  {
    accessorKey: "age",
    header: "Age",
    cell: ({ row }) =>
      React.createElement(
        "span",
        { className: "tabular-nums text-sm" },
        `${row.original.age}y ${row.original.gender}`
      ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) =>
      React.createElement(
        Badge,
        {
          variant:
            patientStatusVariant[row.getValue("status") as Patient["status"]],
        },
        row.getValue("status")
      ),
  },
];

const DenseDemo = () =>
  React.createElement(DataTable as any, {
    columns: denseColumns,
    data: patients,
    filterColumn: "name",
    filterPlaceholder: "Search patients...",
    dense: true,
  });

// ─── Auto-width columns ───────────────────────────────────────────────────────

interface AutoWidthRow {
  id: string;
  name: string;
  avatar: string;
  flag: string;
  email: string;
  location: string;
  joined: string;
}

const autoWidthData: AutoWidthRow[] = [
  {
    id: "1",
    name: "Dr. Anika Sharma",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&h=96&dpr=2&q=80",
    flag: "in",
    email: "anika.sharma@ohc.in",
    location: "India",
    joined: "Mar, 2021",
  },
  {
    id: "2",
    name: "Dr. Sarah Mitchell",
    avatar:
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=96&h=96&dpr=2&q=80",
    flag: "gb",
    email: "sarah.mitchell@ohc.in",
    location: "United Kingdom",
    joined: "Jul, 2020",
  },
  {
    id: "3",
    name: "Dr. David Okafor",
    avatar:
      "https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?w=96&h=96&dpr=2&q=80",
    flag: "ng",
    email: "david.okafor@ohc.in",
    location: "Nigeria",
    joined: "Mar, 2019",
  },
  {
    id: "4",
    name: "Nurse Elena Fischer",
    avatar:
      "https://images.unsplash.com/photo-1485893086445-ed75865251e0?w=96&h=96&dpr=2&q=80",
    flag: "de",
    email: "elena.fischer@ohc.in",
    location: "Germany",
    joined: "Jan, 2022",
  },
  {
    id: "5",
    name: "Dr. Hiroshi Tanaka",
    avatar:
      "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=96&h=96&dpr=2&q=80",
    flag: "jp",
    email: "hiroshi.tanaka@ohc.in",
    location: "Japan",
    joined: "May, 2023",
  },
  {
    id: "6",
    name: "Dr. Ravi Menon",
    avatar:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=96&h=96&dpr=2&q=80",
    flag: "in",
    email: "ravi.menon@ohc.in",
    location: "India",
    joined: "Nov, 2018",
  },
  {
    id: "7",
    name: "Dr. Carlos Rivera",
    avatar:
      "https://images.unsplash.com/photo-1543299750-19d1d6297053?w=96&h=96&dpr=2&q=80",
    flag: "es",
    email: "carlos.rivera@ohc.in",
    location: "Spain",
    joined: "Jun, 2021",
  },
  {
    id: "8",
    name: "Nurse Mei Lin Wong",
    avatar:
      "https://images.unsplash.com/photo-1620075225255-8c2051b6c015?w=96&h=96&dpr=2&q=80",
    flag: "sg",
    email: "mei.wong@ohc.in",
    location: "Singapore",
    joined: "Oct, 2020",
  },
  {
    id: "9",
    name: "Dr. Siddharth Patel",
    avatar:
      "https://images.unsplash.com/photo-1485206412256-701ccc5b93ca?w=96&h=96&dpr=2&q=80",
    flag: "in",
    email: "siddharth.patel@ohc.in",
    location: "India",
    joined: "Sep, 2019",
  },
  {
    id: "10",
    name: "Dr. Amara Diallo",
    avatar:
      "https://images.unsplash.com/photo-1542595913-85d69b0edbaf?w=96&h=96&dpr=2&q=80",
    flag: "sn",
    email: "amara.diallo@ohc.in",
    location: "Senegal",
    joined: "Feb, 2023",
  },
  {
    id: "11",
    name: "Dr. Priya Krishnan",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&h=96&dpr=2&q=80",
    flag: "in",
    email: "priya.krishnan@ohc.in",
    location: "India",
    joined: "Dec, 2022",
  },
  {
    id: "12",
    name: "Nurse Rekha Thomas",
    avatar:
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=96&h=96&dpr=2&q=80",
    flag: "in",
    email: "rekha.thomas@ohc.in",
    location: "India",
    joined: "Mar, 2020",
  },
];

const autoWidthColumns: ColumnDef<AutoWidthRow>[] = [
  {
    accessorKey: "name",
    header: "Name",
    size: 225,
    cell: ({ row }) =>
      React.createElement(
        "div",
        { className: "flex items-center gap-2" },
        React.createElement(
          Avatar,
          { className: "size-6" },
          React.createElement(AvatarImage, {
            src: row.original.avatar,
            alt: row.original.name,
          }),
          React.createElement(
            AvatarFallback,
            null,
            row.original.name
              .split(" ")
              .map((n: string) => n[0])
              .join("")
          )
        ),
        React.createElement(
          "a",
          {
            href: "#",
            className:
              "text-foreground hover:text-primary font-medium whitespace-nowrap",
          },
          row.original.name
        )
      ),
  },
  {
    accessorKey: "email",
    header: "Email",
    size: 200,
    cell: ({ row }) =>
      React.createElement(
        "a",
        {
          href: "mailto:" + row.original.email,
          className: "hover:text-primary hover:underline whitespace-nowrap",
        },
        row.original.email
      ),
  },
  {
    accessorKey: "location",
    header: "Location",
    size: 175,
    cell: ({ row }) =>
      React.createElement(
        "div",
        { className: "flex items-center gap-1.5" },
        React.createElement("img", {
          src:
            "https://flagcdn.com/" + row.original.flag.toLowerCase() + ".svg",
          alt: row.original.flag,
          className: "size-4 rounded-full object-cover",
        }),
        React.createElement(
          "span",
          { className: "text-foreground font-medium whitespace-nowrap" },
          row.original.location
        )
      ),
  },
  {
    accessorKey: "joined",
    header: "Joined",
    size: 120,
    cell: ({ row }) =>
      React.createElement(
        "span",
        { className: "font-medium whitespace-nowrap" },
        row.original.joined
      ),
  },
];

function AutoWidthDemo() {
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: "name", desc: true },
  ]);

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    columns: autoWidthColumns,
    data: autoWidthData,
    state: { pagination, sorting },
    columnResizeMode: "onChange",
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const total = table.getFilteredRowModel().rows.length;
  const start =
    total === 0 ? 0 : pagination.pageIndex * pagination.pageSize + 1;
  const end = Math.min((pagination.pageIndex + 1) * pagination.pageSize, total);

  return React.createElement(
    "div",
    { className: "w-full space-y-2.5" },
    React.createElement(
      "div",
      {
        className:
          "w-fit overflow-x-auto rounded-md border [&_th:first-child:not(:has([data-slot=checkbox])):is(:has([data-slot=button]),:has([data-slot=dropdown-menu-trigger]))_:is([data-slot=button],[data-slot=dropdown-menu-trigger])]:-ms-1 [&_th:not(:first-child):is(:has([data-slot=button]),:has([data-slot=dropdown-menu-trigger]))_:is([data-slot=button],[data-slot=dropdown-menu-trigger])]:-ms-3",
      },
      React.createElement(
        Table,
        { className: "w-auto" },
        React.createElement(
          TableHeader,
          null,
          table.getHeaderGroups().map((hg) =>
            React.createElement(
              TableRow,
              { key: hg.id },
              hg.headers.map((h) =>
                React.createElement(
                  TableHead,
                  { key: h.id, style: { width: h.getSize() } },
                  h.isPlaceholder
                    ? null
                    : flexRender(h.column.columnDef.header, h.getContext())
                )
              )
            )
          )
        ),
        React.createElement(
          TableBody,
          null,
          table.getRowModel().rows.map((row) =>
            React.createElement(
              TableRow,
              { key: row.id },
              row
                .getVisibleCells()
                .map((cell) =>
                  React.createElement(
                    TableCell,
                    { key: cell.id, style: { width: cell.column.getSize() } },
                    flexRender(cell.column.columnDef.cell, cell.getContext())
                  )
                )
            )
          )
        )
      )
    ),
    React.createElement(
      "div",
      { className: "flex items-center justify-between" },
      React.createElement(
        "p",
        { className: "text-sm text-muted-foreground" },
        `${start} - ${end} of ${total}`
      ),
      React.createElement(
        Pagination,
        { className: "w-auto mx-0" },
        React.createElement(
          PaginationContent,
          null,
          React.createElement(
            PaginationItem,
            null,
            React.createElement(PaginationPrevious, {
              onClick: (e: React.MouseEvent) => {
                e.preventDefault();
                table.previousPage();
              },
              "aria-disabled": !table.getCanPreviousPage(),
              className: !table.getCanPreviousPage()
                ? "pointer-events-none opacity-50"
                : undefined,
            })
          ),
          Array.from({ length: table.getPageCount() }, (_, i) =>
            React.createElement(
              PaginationItem,
              { key: i },
              React.createElement(
                PaginationLink,
                {
                  isActive: i === table.getState().pagination.pageIndex,
                  onClick: (e: React.MouseEvent) => {
                    e.preventDefault();
                    table.setPageIndex(i);
                  },
                },
                i + 1
              )
            )
          ),
          React.createElement(
            PaginationItem,
            null,
            React.createElement(PaginationNext, {
              onClick: (e: React.MouseEvent) => {
                e.preventDefault();
                table.nextPage();
              },
              "aria-disabled": !table.getCanNextPage(),
              className: !table.getCanNextPage()
                ? "pointer-events-none opacity-50"
                : undefined,
            })
          )
        )
      )
    )
  );
}

// ─── Row selection demo ───────────────────────────────────────────────────────

function RowSelectionDemo() {
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: "name", desc: true },
  ]);
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

  const columns: ColumnDef<SelectionMember>[] = [
    {
      id: "select",
      header: ({ table }) =>
        React.createElement(Checkbox, {
          checked: table.getIsAllPageRowsSelected(),
          indeterminate:
            !table.getIsAllPageRowsSelected() &&
            table.getIsSomePageRowsSelected(),
          onCheckedChange: (value: boolean) =>
            table.toggleAllPageRowsSelected(!!value),
          "aria-label": "Select all",
        }),
      cell: ({ row }) =>
        React.createElement(Checkbox, {
          checked: row.getIsSelected(),
          onCheckedChange: (value: boolean) => row.toggleSelected(!!value),
          "aria-label": "Select row",
        }),
      enableSorting: false,
      size: 20,
    },
    {
      accessorKey: "name",
      id: "name",
      header: "Name",
      size: 200,
      enableSorting: true,
      cell: ({ row }) =>
        React.createElement(
          "div",
          { className: "flex items-center gap-3" },
          React.createElement(
            Avatar,
            { className: "size-8" },
            React.createElement(AvatarImage, {
              src: row.original.avatar,
              alt: row.original.name,
            }),
            React.createElement(
              AvatarFallback,
              null,
              row.original.name
                .split(" ")
                .map((n: string) => n[0])
                .join("")
            ),
            React.createElement(AvatarBadge, {
              className:
                "size-1.5! p-0 " +
                (availabilityColor[row.original.availability] ||
                  availabilityColor.offline),
            })
          ),
          React.createElement(
            "div",
            { className: "space-y-px" },
            React.createElement(
              "div",
              { className: "text-foreground font-medium" },
              row.original.name
            ),
            React.createElement(
              "div",
              { className: "text-muted-foreground" },
              row.original.email
            )
          )
        ),
    },
    {
      accessorKey: "location",
      header: "Location",
      size: 180,
      cell: ({ row }) =>
        React.createElement(
          "div",
          { className: "flex items-center gap-1.5" },
          React.createElement("img", {
            src:
              "https://flagcdn.com/" + row.original.flag.toLowerCase() + ".svg",
            alt: row.original.flag,
            className: "size-4 rounded-full object-cover",
          }),
          React.createElement(
            "div",
            { className: "text-foreground font-medium" },
            row.original.location
          )
        ),
    },
    {
      accessorKey: "joined",
      header: "Joined",
      size: 120,
      cell: ({ row }) =>
        React.createElement(
          "span",
          { className: "font-medium" },
          row.original.joined
        ),
    },
  ];

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    columns,
    data: selectionMembers,
    getRowId: (row: SelectionMember) => row.id,
    state: { pagination, sorting, rowSelection },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const total = table.getFilteredRowModel().rows.length;
  const start =
    total === 0 ? 0 : pagination.pageIndex * pagination.pageSize + 1;
  const end = Math.min((pagination.pageIndex + 1) * pagination.pageSize, total);

  return React.createElement(
    "div",
    { className: "w-full space-y-2.5" },
    React.createElement(
      "div",
      {
        className:
          "overflow-hidden rounded-md border [&_th:first-child:not(:has([data-slot=checkbox])):is(:has([data-slot=button]),:has([data-slot=dropdown-menu-trigger]))_:is([data-slot=button],[data-slot=dropdown-menu-trigger])]:-ms-1 [&_th:not(:first-child):is(:has([data-slot=button]),:has([data-slot=dropdown-menu-trigger]))_:is([data-slot=button],[data-slot=dropdown-menu-trigger])]:-ms-3",
      },
      React.createElement(
        Table,
        null,
        React.createElement(
          TableHeader,
          null,
          table.getHeaderGroups().map((hg) =>
            React.createElement(
              TableRow,
              { key: hg.id },
              hg.headers.map((h) =>
                React.createElement(
                  TableHead,
                  { key: h.id, style: { width: h.getSize() } },
                  h.isPlaceholder
                    ? null
                    : flexRender(h.column.columnDef.header, h.getContext())
                )
              )
            )
          )
        ),
        React.createElement(
          TableBody,
          null,
          table.getRowModel().rows.map((row) =>
            React.createElement(
              TableRow,
              {
                key: row.id,
                "data-state": row.getIsSelected() ? "selected" : undefined,
              } as any,
              row
                .getVisibleCells()
                .map((cell) =>
                  React.createElement(
                    TableCell,
                    { key: cell.id, style: { width: cell.column.getSize() } },
                    flexRender(cell.column.columnDef.cell, cell.getContext())
                  )
                )
            )
          )
        )
      )
    ),
    React.createElement(
      "div",
      { className: "flex items-center justify-between" },
      React.createElement(
        "p",
        { className: "text-sm text-muted-foreground" },
        `${start} - ${end} of ${total}`
      ),
      React.createElement(
        Pagination,
        { className: "w-auto mx-0" },
        React.createElement(
          PaginationContent,
          null,
          React.createElement(
            PaginationItem,
            null,
            React.createElement(PaginationPrevious, {
              onClick: (e: React.MouseEvent) => {
                e.preventDefault();
                table.previousPage();
              },
              "aria-disabled": !table.getCanPreviousPage(),
              className: !table.getCanPreviousPage()
                ? "pointer-events-none opacity-50"
                : undefined,
            })
          ),
          Array.from({ length: table.getPageCount() }, (_, i) =>
            React.createElement(
              PaginationItem,
              { key: i },
              React.createElement(
                PaginationLink,
                {
                  isActive: i === table.getState().pagination.pageIndex,
                  onClick: (e: React.MouseEvent) => {
                    e.preventDefault();
                    table.setPageIndex(i);
                  },
                },
                i + 1
              )
            )
          ),
          React.createElement(
            PaginationItem,
            null,
            React.createElement(PaginationNext, {
              onClick: (e: React.MouseEvent) => {
                e.preventDefault();
                table.nextPage();
              },
              "aria-disabled": !table.getCanNextPage(),
              className: !table.getCanNextPage()
                ? "pointer-events-none opacity-50"
                : undefined,
            })
          )
        )
      )
    )
  );
}

// ─── Expandable row data & columns ───────────────────────────────────────────

type ExpandablePatient = Patient & { notes: string };

const expandablePatients: ExpandablePatient[] = [
  {
    ...patients[0],
    notes:
      "BP well-controlled on current regime. Review amlodipine dose at next visit. Low-sodium diet advised.",
  },
  {
    ...patients[1],
    notes:
      "Post-caesarean recovery progressing normally. Wound site clean. Mobilising with support. Breastfeeding established.",
  },
  {
    ...patients[2],
    notes:
      "Cardiac monitoring in progress. Troponin trending down. Echocardiogram scheduled for tomorrow. Family counselled.",
  },
  {
    ...patients[3],
    notes:
      "Post-appendicectomy Day 2. Bowel sounds present. IV antibiotics continuing. Drain output minimal.",
  },
  {
    ...patients[4],
    notes:
      "HbA1c 8.4% on admission. Metformin dose adjusted. Dietician referral placed. Foot exam normal.",
  },
  {
    ...patients[5],
    notes:
      "COPD exacerbation responding to nebulisation. Sputum sent for culture. SpO₂ stable at 94% on 2L O₂.",
  },
  {
    ...patients[6],
    notes:
      "Laparoscopic cholecystectomy completed without complications. Tolerating clear fluids. Discharge planned for Day 3.",
  },
  {
    ...patients[7],
    notes:
      "Typhoid confirmed on Widal test. Ceftriaxone IV initiated. Fever settling. Oral intake improving gradually.",
  },
  {
    ...patients[8],
    notes:
      "Large ischaemic stroke confirmed on MRI. Thrombolysis given within window. Physio and SALT assessment ongoing.",
  },
  {
    ...patients[9],
    notes:
      "Normal vaginal delivery at 39 weeks. Mother and baby well. Discharged on day 2 post-partum.",
  },
  {
    ...patients[10],
    notes:
      "Total hip replacement Day 3. Physio commenced. DVT prophylaxis in place. Wound dry and intact.",
  },
  {
    ...patients[11],
    notes:
      "UTI responding to oral ciprofloxacin. Urine culture sensitivity confirmed. Symptoms improving.",
  },
];

const expandableColumns: ColumnDef<ExpandablePatient>[] = [
  {
    id: "expand",
    enableHiding: false,
    meta: { className: "w-0" },
    header: () => null,
    cell: ({ row }) =>
      React.createElement(
        Button,
        {
          variant: "ghost",
          size: "icon",
          className: "size-7 text-muted-foreground",
          onClick: row.getToggleExpandedHandler(),
          "aria-label": row.getIsExpanded() ? "Collapse row" : "Expand row",
        } as any,
        row.getIsExpanded()
          ? React.createElement(ChevronUp, { className: "size-4" })
          : React.createElement(ChevronDown, { className: "size-4" })
      ),
  },
  {
    id: "patient",
    accessorKey: "name",
    header: "Patient",
    cell: ({ row }) => patientCell(row.original.name, row.original.id),
  },
  {
    id: "location",
    header: "Ward / Bed",
    cell: ({ row }) =>
      React.createElement(
        "div",
        { className: "flex flex-col" },
        React.createElement(
          "span",
          { className: "font-medium text-sm" },
          row.original.ward
        ),
        React.createElement(
          "span",
          { className: "text-muted-foreground text-xs" },
          row.original.bed
        )
      ),
  },
  {
    accessorKey: "diagnosis",
    header: "Diagnosis",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) =>
      React.createElement(
        Badge,
        {
          variant:
            patientStatusVariant[row.getValue("status") as Patient["status"]],
        },
        row.getValue("status")
      ),
  },
];

const renderExpandedPatientRow = (row: Row<ExpandablePatient>) =>
  React.createElement(
    "div",
    { className: "flex items-start gap-2 border-t bg-muted/30 px-4 py-3" },
    React.createElement(
      "span",
      {
        className:
          "mt-0.5 shrink-0 text-xs font-medium text-muted-foreground uppercase tracking-wide",
      },
      "Clinical Notes:"
    ),
    React.createElement(
      "p",
      { className: "text-sm text-foreground" },
      row.original.notes
    )
  );

const ExpandableRowDemo = () =>
  React.createElement(DataTable as any, {
    columns: expandableColumns,
    data: expandablePatients,
    filterColumn: "name",
    filterPlaceholder: "Search patients...",
    renderExpandedRow: renderExpandedPatientRow,
  });

// ─── Sub Data Grid — types & data ─────────────────────────────────────────────

type Investigation = {
  id: string;
  test: string;
  category: "Haematology" | "Biochemistry" | "Microbiology" | "Imaging";
  result: string;
  referenceRange: string;
  status: "normal" | "abnormal" | "critical";
};

type PatientEncounter = {
  id: string;
  patientId: string;
  patientName: string;
  ward: string;
  diagnosis: string;
  admittedOn: string;
  encounterStatus: "admitted" | "critical" | "stable" | "discharged";
  investigations: Investigation[];
};

const investigationStatusVariant: Record<
  Investigation["status"],
  "success" | "warning" | "destructive"
> = {
  normal: "success",
  abnormal: "warning",
  critical: "destructive",
};

const patientEncounters: PatientEncounter[] = [
  {
    id: "ENC-001",
    patientId: "OHC-0041",
    patientName: "Ravi Kumar",
    ward: "General",
    diagnosis: "Hypertension",
    admittedOn: "10 Apr 2026",
    encounterStatus: "stable",
    investigations: [
      {
        id: "E1-I1",
        test: "Complete Blood Count",
        category: "Haematology",
        result: "Normal",
        referenceRange: "Varies",
        status: "normal",
      },
      {
        id: "E1-I2",
        test: "Serum Creatinine",
        category: "Biochemistry",
        result: "98 µmol/L",
        referenceRange: "62–115 µmol/L",
        status: "normal",
      },
      {
        id: "E1-I3",
        test: "Fasting Blood Glucose",
        category: "Biochemistry",
        result: "6.2 mmol/L",
        referenceRange: "3.9–6.1 mmol/L",
        status: "abnormal",
      },
    ],
  },
  {
    id: "ENC-002",
    patientId: "OHC-0043",
    patientName: "Arjun Mehta",
    ward: "ICU",
    diagnosis: "Cardiac arrest",
    admittedOn: "13 Apr 2026",
    encounterStatus: "critical",
    investigations: [
      {
        id: "E2-I1",
        test: "Troponin I",
        category: "Biochemistry",
        result: "4.8 µg/L",
        referenceRange: "< 0.04 µg/L",
        status: "critical",
      },
      {
        id: "E2-I2",
        test: "ECG",
        category: "Imaging",
        result: "ST elevation V1–V4",
        referenceRange: "Normal sinus rhythm",
        status: "critical",
      },
      {
        id: "E2-I3",
        test: "CK-MB",
        category: "Biochemistry",
        result: "62 U/L",
        referenceRange: "< 25 U/L",
        status: "critical",
      },
      {
        id: "E2-I4",
        test: "INR",
        category: "Haematology",
        result: "1.1",
        referenceRange: "0.8–1.2",
        status: "normal",
      },
      {
        id: "E2-I5",
        test: "Echocardiogram",
        category: "Imaging",
        result: "EF 35%",
        referenceRange: "EF ≥ 55%",
        status: "abnormal",
      },
    ],
  },
  {
    id: "ENC-003",
    patientId: "OHC-0044",
    patientName: "Sunita Rao",
    ward: "Surgical",
    diagnosis: "Appendicitis",
    admittedOn: "14 Apr 2026",
    encounterStatus: "admitted",
    investigations: [
      {
        id: "E3-I1",
        test: "WBC Count",
        category: "Haematology",
        result: "14.2 × 10⁹/L",
        referenceRange: "4–11 × 10⁹/L",
        status: "abnormal",
      },
      {
        id: "E3-I2",
        test: "C-Reactive Protein",
        category: "Biochemistry",
        result: "88 mg/L",
        referenceRange: "< 10 mg/L",
        status: "critical",
      },
      {
        id: "E3-I3",
        test: "Ultrasound Abdomen",
        category: "Imaging",
        result: "Appendix 9mm",
        referenceRange: "< 6 mm",
        status: "abnormal",
      },
      {
        id: "E3-I4",
        test: "Urine Culture",
        category: "Microbiology",
        result: "No growth",
        referenceRange: "No growth",
        status: "normal",
      },
    ],
  },
  {
    id: "ENC-004",
    patientId: "OHC-0045",
    patientName: "Mohammed Ali",
    ward: "General",
    diagnosis: "Diabetes mellitus",
    admittedOn: "09 Apr 2026",
    encounterStatus: "stable",
    investigations: [
      {
        id: "E4-I1",
        test: "HbA1c",
        category: "Biochemistry",
        result: "8.4%",
        referenceRange: "< 6.5%",
        status: "abnormal",
      },
      {
        id: "E4-I2",
        test: "Fasting Blood Glucose",
        category: "Biochemistry",
        result: "9.8 mmol/L",
        referenceRange: "3.9–6.1 mmol/L",
        status: "critical",
      },
      {
        id: "E4-I3",
        test: "Urine Microalbumin",
        category: "Biochemistry",
        result: "28 mg/L",
        referenceRange: "< 20 mg/L",
        status: "abnormal",
      },
    ],
  },
  {
    id: "ENC-005",
    patientId: "OHC-0049",
    patientName: "Deepak Verma",
    ward: "ICU",
    diagnosis: "Stroke",
    admittedOn: "13 Apr 2026",
    encounterStatus: "critical",
    investigations: [
      {
        id: "E5-I1",
        test: "CT Brain (plain)",
        category: "Imaging",
        result: "Ischaemic L MCA",
        referenceRange: "Normal",
        status: "critical",
      },
      {
        id: "E5-I2",
        test: "INR",
        category: "Haematology",
        result: "1.0",
        referenceRange: "0.8–1.2",
        status: "normal",
      },
      {
        id: "E5-I3",
        test: "Serum Glucose",
        category: "Biochemistry",
        result: "7.2 mmol/L",
        referenceRange: "3.9–7.8 mmol/L",
        status: "normal",
      },
      {
        id: "E5-I4",
        test: "Blood Culture",
        category: "Microbiology",
        result: "No growth",
        referenceRange: "No growth",
        status: "normal",
      },
    ],
  },
  {
    id: "ENC-006",
    patientId: "OHC-0051",
    patientName: "Rajesh Nambiar",
    ward: "Orthopedic",
    diagnosis: "Hip replacement",
    admittedOn: "14 Apr 2026",
    encounterStatus: "admitted",
    investigations: [
      {
        id: "E6-I1",
        test: "X-Ray Hip (AP)",
        category: "Imaging",
        result: "Prosthesis in situ",
        referenceRange: "Post-op normal",
        status: "normal",
      },
      {
        id: "E6-I2",
        test: "Haemoglobin",
        category: "Haematology",
        result: "10.2 g/dL",
        referenceRange: "13–17 g/dL",
        status: "abnormal",
      },
      {
        id: "E6-I3",
        test: "D-Dimer",
        category: "Haematology",
        result: "0.6 mg/L FEU",
        referenceRange: "< 0.5 mg/L FEU",
        status: "abnormal",
      },
    ],
  },
];

// ─── Sub Data Grid — columns & components ─────────────────────────────────────

const investigationColumns: ColumnDef<Investigation>[] = [
  {
    accessorKey: "test",
    header: "Test",
    cell: ({ row }) =>
      React.createElement(
        "span",
        { className: "font-medium text-sm" },
        row.getValue("test")
      ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) =>
      React.createElement(
        Badge,
        { variant: "neutral" },
        row.getValue("category")
      ),
  },
  {
    accessorKey: "result",
    header: "Result",
    cell: ({ row }) =>
      React.createElement(
        "span",
        { className: "tabular-nums text-sm font-medium" },
        row.getValue("result")
      ),
  },
  {
    accessorKey: "referenceRange",
    header: "Reference Range",
    cell: ({ row }) =>
      React.createElement(
        "span",
        { className: "text-muted-foreground text-sm" },
        row.getValue("referenceRange")
      ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) =>
      React.createElement(
        Badge,
        {
          variant:
            investigationStatusVariant[
              row.getValue("status") as Investigation["status"]
            ],
        },
        row.getValue("status")
      ),
  },
];

const InvestigationSubTable = ({
  investigations,
}: {
  investigations: Investigation[];
}) =>
  React.createElement(DataTable as any, {
    columns: investigationColumns,
    data: investigations,
    hideToolbar: true,
  });

const encounterColumns: ColumnDef<PatientEncounter>[] = [
  {
    id: "expand",
    enableHiding: false,
    meta: { className: "w-0" },
    header: () => null,
    cell: ({ row }) =>
      React.createElement(
        Button,
        {
          variant: "ghost",
          size: "icon",
          className: "size-7 text-muted-foreground",
          onClick: row.getToggleExpandedHandler(),
          "aria-label": row.getIsExpanded() ? "Collapse" : "Expand",
        } as any,
        row.getIsExpanded()
          ? React.createElement(ChevronUp, { className: "size-4" })
          : React.createElement(ChevronDown, { className: "size-4" })
      ),
  },
  {
    id: "patient",
    accessorKey: "patientName",
    header: "Patient",
    cell: ({ row }) =>
      patientCell(row.original.patientName, row.original.patientId),
  },
  { accessorKey: "ward", header: "Ward" },
  { accessorKey: "diagnosis", header: "Diagnosis" },
  {
    accessorKey: "admittedOn",
    header: "Admitted",
    cell: ({ row }) =>
      React.createElement(
        "span",
        { className: "tabular-nums text-sm" },
        row.getValue("admittedOn")
      ),
  },
  {
    id: "investigations",
    header: "Tests",
    cell: ({ row }) =>
      React.createElement(
        Badge,
        { variant: "neutral" },
        `${row.original.investigations.length} tests`
      ),
  },
  {
    accessorKey: "encounterStatus",
    header: "Status",
    cell: ({ row }) =>
      React.createElement(
        Badge,
        {
          variant:
            patientStatusVariant[
              row.getValue("encounterStatus") as Patient["status"]
            ],
        },
        row.getValue("encounterStatus")
      ),
  },
];

const renderInvestigationSubTable = (row: Row<PatientEncounter>) =>
  React.createElement(
    "div",
    { className: "border-t bg-muted/20 px-4 py-4" },
    React.createElement(
      "p",
      {
        className:
          "mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground",
      },
      `Investigations — ${row.original.patientName}`
    ),
    React.createElement(InvestigationSubTable, {
      investigations: row.original.investigations,
    })
  );

const SubDataGridDemo = () =>
  React.createElement(DataTable as any, {
    columns: encounterColumns,
    data: patientEncounters,
    filterColumn: "patientName",
    filterPlaceholder: "Search patients...",
    renderExpandedRow: renderInvestigationSubTable,
  });

// ─── Footer rows data & columns ───────────────────────────────────────────────

const footerInvoiceColumns: ColumnDef<Invoice>[] = [
  {
    id: "patient",
    accessorKey: "patientName",
    header: "Patient",
    footer: () =>
      React.createElement("span", { className: "font-semibold" }, "Total"),
    cell: ({ row }) =>
      patientCell(row.original.patientName, row.original.patientId),
  },
  {
    accessorKey: "date",
    header: "Date",
    footer: () => null,
  },
  {
    accessorKey: "category",
    header: "Category",
    footer: () => null,
    cell: ({ row }) =>
      React.createElement(
        Badge,
        { variant: "neutral" },
        row.getValue("category")
      ),
  },
  {
    accessorKey: "amount",
    header: ({ column }) =>
      React.createElement(DataTableColumnHeader, {
        column: column as any,
        title: "Amount",
      }),
    footer: ({ table }) => {
      const total = table
        .getFilteredRowModel()
        .rows.reduce((sum, row) => sum + (row.getValue("amount") as number), 0);
      return React.createElement(
        "span",
        { className: "font-semibold tabular-nums" },
        formatINR(total)
      );
    },
    meta: { className: "text-right" },
    cell: ({ row }) =>
      React.createElement(
        "div",
        { className: "font-medium tabular-nums" },
        formatINR(row.getValue("amount"))
      ),
  },
  {
    accessorKey: "status",
    header: "Status",
    footer: () => null,
    cell: ({ row }) =>
      React.createElement(
        Badge,
        {
          variant:
            invoiceStatusVariant[row.getValue("status") as Invoice["status"]],
        },
        row.getValue("status")
      ),
  },
];

const FooterRowsDemo = () =>
  React.createElement(DataTable as any, {
    columns: footerInvoiceColumns,
    data: invoices,
    filterColumn: "patientName",
    filterPlaceholder: "Search by patient...",
  });

// ─── Column Icons columns ────────────────────────────────────────────────────────

const columnIconColumns: ColumnDef<Patient>[] = [
  {
    id: "patient",
    accessorKey: "name",
    header: ({ column }) =>
      React.createElement(DataTableColumnHeader, {
        column: column as any,
        title: "Patient",
        icon: React.createElement(User),
      }),
    cell: ({ row }) => patientCell(row.original.name, row.original.id),
  },
  {
    accessorKey: "ward",
    header: ({ column }) =>
      React.createElement(DataTableColumnHeader, {
        column: column as any,
        title: "Ward / Bed",
        icon: React.createElement(MapPin),
      }),
    cell: ({ row }) =>
      React.createElement(
        "div",
        { className: "flex flex-col" },
        React.createElement(
          "span",
          { className: "font-medium text-sm" },
          row.original.ward
        ),
        React.createElement(
          "span",
          { className: "text-muted-foreground text-xs" },
          row.original.bed
        )
      ),
  },
  {
    accessorKey: "diagnosis",
    header: ({ column }) =>
      React.createElement(DataTableColumnHeader, {
        column: column as any,
        title: "Diagnosis",
        icon: React.createElement(Stethoscope),
      }),
  },
  {
    accessorKey: "status",
    header: ({ column }) =>
      React.createElement(DataTableColumnHeader, {
        column: column as any,
        title: "Status",
        icon: React.createElement(HeartPulse),
      }),
    cell: ({ row }) =>
      React.createElement(
        Badge,
        {
          variant:
            patientStatusVariant[row.getValue("status") as Patient["status"]],
        },
        row.getValue("status")
      ),
  },
];

const ColumnIconsDemo = () =>
  React.createElement(DataTable as any, {
    columns: columnIconColumns,
    data: patients,
    filterColumn: "name",
    filterPlaceholder: "Search patients...",
  });

// ─── Row Pinning demo ─────────────────────────────────────────────────────────

const rowPinColumns: ColumnDef<Patient>[] = [
  {
    id: "pin",
    enableHiding: false,
    meta: { className: "w-0" },
    header: () => null,
    cell: ({ row }) => {
      const isPinned = row.getIsPinned() === "top";
      return React.createElement(
        Button,
        {
          variant: "ghost",
          size: "icon",
          className: `size-7 ${isPinned ? "text-primary" : "text-muted-foreground"}`,
          onClick: () => row.pin(isPinned ? false : "top"),
          "aria-label": isPinned ? "Unpin row" : "Pin row to top",
        } as any,
        isPinned
          ? React.createElement(PinOff, { className: "size-4" })
          : React.createElement(Pin, { className: "size-4" })
      );
    },
  },
  {
    id: "patient",
    accessorKey: "name",
    header: "Patient",
    cell: ({ row }) => patientCell(row.original.name, row.original.id),
  },
  { accessorKey: "ward", header: "Ward" },
  { accessorKey: "diagnosis", header: "Diagnosis" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) =>
      React.createElement(
        Badge,
        {
          variant:
            patientStatusVariant[row.getValue("status") as Patient["status"]],
        },
        row.getValue("status")
      ),
  },
];

function RowPinningDemo() {
  const [rowPinning, setRowPinning] = React.useState<RowPinningState>({
    top: [],
    bottom: [],
  });
  const [globalFilter, setGlobalFilter] = React.useState("");

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: patients,
    columns: rowPinColumns,
    state: { rowPinning, globalFilter },
    onRowPinningChange: setRowPinning,
    onGlobalFilterChange: setGlobalFilter,
    enableRowPinning: true,
    keepPinnedRows: true,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const pinnedRows = table.getTopRows();
  const unpinnedRows = table.getCenterRows();

  return React.createElement(
    "div",
    { className: "w-full space-y-0" },
    React.createElement(
      "div",
      { className: "flex items-center gap-2 py-4" },
      React.createElement("input", {
        placeholder: "Search patients...",
        value: globalFilter,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
          setGlobalFilter(e.target.value),
        className:
          "max-w-sm h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
      })
    ),
    React.createElement(
      "div",
      {
        className:
          "overflow-hidden rounded-md border [&_th:first-child:not(:has([data-slot=checkbox])):is(:has([data-slot=button]),:has([data-slot=dropdown-menu-trigger]))_:is([data-slot=button],[data-slot=dropdown-menu-trigger])]:-ms-1 [&_th:not(:first-child):is(:has([data-slot=button]),:has([data-slot=dropdown-menu-trigger]))_:is([data-slot=button],[data-slot=dropdown-menu-trigger])]:-ms-3",
      },
      React.createElement(
        Table,
        null,
        React.createElement(
          TableHeader,
          null,
          table.getHeaderGroups().map((hg) =>
            React.createElement(
              TableRow,
              { key: hg.id },
              hg.headers.map((header) =>
                React.createElement(
                  TableHead,
                  {
                    key: header.id,
                    className: header.column.columnDef.meta?.className,
                  },
                  header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )
                )
              )
            )
          )
        ),
        React.createElement(
          TableBody,
          null,
          pinnedRows.length > 0 &&
            pinnedRows.map((row) =>
              React.createElement(
                TableRow,
                {
                  key: row.id,
                  className: "bg-primary/5 font-medium sticky top-0 z-10",
                },
                row.getVisibleCells().map((cell) =>
                  React.createElement(
                    TableCell,
                    {
                      key: cell.id,
                      className: cell.column.columnDef.meta?.className,
                    },
                    flexRender(cell.column.columnDef.cell, cell.getContext())
                  )
                )
              )
            ),
          unpinnedRows.length > 0
            ? unpinnedRows.map((row) =>
                React.createElement(
                  TableRow,
                  { key: row.id },
                  row.getVisibleCells().map((cell) =>
                    React.createElement(
                      TableCell,
                      {
                        key: cell.id,
                        className: cell.column.columnDef.meta?.className,
                      },
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    )
                  )
                )
              )
            : React.createElement(
                TableRow,
                null,
                React.createElement(
                  TableCell,
                  {
                    colSpan: rowPinColumns.length,
                    className: "h-24 text-center",
                  },
                  "No results."
                )
              )
        )
      )
    )
  );
}

// ─── Light table demo ───────────────────────────────────────────────────────────

interface LightTableRow {
  id: string;
  name: string;
  availability: "online" | "away" | "busy" | "offline";
  avatar: string;
  status: "active" | "inactive";
  flag: string;
  email: string;
  location: string;
}

const lightTableData: LightTableRow[] = [
  {
    id: "1",
    name: "Dr. Anika Sharma",
    availability: "online",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&h=96&dpr=2&q=80",
    status: "active",
    flag: "in",
    email: "anika.sharma@ohc.in",
    location: "India",
  },
  {
    id: "2",
    name: "Dr. Sarah Mitchell",
    availability: "away",
    avatar:
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=96&h=96&dpr=2&q=80",
    status: "inactive",
    flag: "gb",
    email: "sarah.mitchell@ohc.in",
    location: "United Kingdom",
  },
  {
    id: "3",
    name: "Dr. David Okafor",
    availability: "busy",
    avatar:
      "https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?w=96&h=96&dpr=2&q=80",
    status: "active",
    flag: "ng",
    email: "david.okafor@ohc.in",
    location: "Nigeria",
  },
  {
    id: "4",
    name: "Nurse Elena Fischer",
    availability: "offline",
    avatar:
      "https://images.unsplash.com/photo-1485893086445-ed75865251e0?w=96&h=96&dpr=2&q=80",
    status: "inactive",
    flag: "de",
    email: "elena.fischer@ohc.in",
    location: "Germany",
  },
  {
    id: "5",
    name: "Dr. Hiroshi Tanaka",
    availability: "online",
    avatar:
      "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=96&h=96&dpr=2&q=80",
    status: "active",
    flag: "jp",
    email: "hiroshi.tanaka@ohc.in",
    location: "Japan",
  },
  {
    id: "6",
    name: "Dr. Ravi Menon",
    availability: "away",
    avatar:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=96&h=96&dpr=2&q=80",
    status: "active",
    flag: "in",
    email: "ravi.menon@ohc.in",
    location: "India",
  },
  {
    id: "7",
    name: "Dr. Carlos Rivera",
    availability: "busy",
    avatar:
      "https://images.unsplash.com/photo-1543299750-19d1d6297053?w=96&h=96&dpr=2&q=80",
    status: "inactive",
    flag: "es",
    email: "carlos.rivera@ohc.in",
    location: "Spain",
  },
  {
    id: "8",
    name: "Nurse Mei Lin Wong",
    availability: "offline",
    avatar:
      "https://images.unsplash.com/photo-1620075225255-8c2051b6c015?w=96&h=96&dpr=2&q=80",
    status: "active",
    flag: "sg",
    email: "mei.wong@ohc.in",
    location: "Singapore",
  },
  {
    id: "9",
    name: "Dr. Siddharth Patel",
    availability: "online",
    avatar:
      "https://images.unsplash.com/photo-1485206412256-701ccc5b93ca?w=96&h=96&dpr=2&q=80",
    status: "active",
    flag: "in",
    email: "siddharth.patel@ohc.in",
    location: "India",
  },
  {
    id: "10",
    name: "Dr. Amara Diallo",
    availability: "away",
    avatar:
      "https://images.unsplash.com/photo-1542595913-85d69b0edbaf?w=96&h=96&dpr=2&q=80",
    status: "inactive",
    flag: "sn",
    email: "amara.diallo@ohc.in",
    location: "Senegal",
  },
  {
    id: "11",
    name: "Dr. Priya Krishnan",
    availability: "busy",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&h=96&dpr=2&q=80",
    status: "active",
    flag: "in",
    email: "priya.krishnan@ohc.in",
    location: "India",
  },
  {
    id: "12",
    name: "Nurse Rekha Thomas",
    availability: "offline",
    avatar:
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=96&h=96&dpr=2&q=80",
    status: "active",
    flag: "in",
    email: "rekha.thomas@ohc.in",
    location: "India",
  },
];

const availabilityColors: Record<string, string> = {
  online: "bg-green-500",
  away: "bg-yellow-500",
  busy: "bg-orange-500",
  offline: "bg-gray-400",
};

const lightTableColumns: ColumnDef<LightTableRow>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) =>
      React.createElement(
        "div",
        { className: "flex items-center gap-3" },
        React.createElement(
          Avatar,
          { className: "size-8" },
          React.createElement(AvatarImage, {
            src: row.original.avatar,
            alt: row.original.name,
          }),
          React.createElement(
            AvatarFallback,
            null,
            row.original.name
              .split(" ")
              .map((n: string) => n[0])
              .join("")
          ),
          React.createElement(AvatarBadge, {
            className: `size-1.5! p-0 ${availabilityColors[row.original.availability] || "bg-gray-400"}`,
          })
        ),
        React.createElement(
          "div",
          { className: "space-y-px" },
          React.createElement(
            "div",
            { className: "text-foreground font-medium" },
            row.original.name
          ),
          React.createElement(
            "div",
            { className: "text-muted-foreground text-xs" },
            row.original.email
          )
        )
      ),
    size: 225,
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) =>
      React.createElement(
        "div",
        { className: "flex items-center gap-1.5" },
        React.createElement("img", {
          src:
            "https://flagcdn.com/" + row.original.flag.toLowerCase() + ".svg",
          alt: row.original.flag,
          className: "size-4 rounded-full object-cover",
        }),
        React.createElement(
          "span",
          { className: "text-foreground font-medium" },
          row.original.location
        )
      ),
    size: 160,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) =>
      row.original.status === "active"
        ? React.createElement(Badge, { variant: "success" }, "Active")
        : React.createElement(Badge, { variant: "warning" }, "Pending"),
    size: 100,
  },
];

function LightTableDemo() {
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: "name", desc: true },
  ]);

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    columns: lightTableColumns,
    data: lightTableData,
    state: { pagination, sorting },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const total = table.getFilteredRowModel().rows.length;
  const start =
    total === 0 ? 0 : pagination.pageIndex * pagination.pageSize + 1;
  const end = Math.min((pagination.pageIndex + 1) * pagination.pageSize, total);

  return React.createElement(
    "div",
    { className: "w-full space-y-2.5" },
    React.createElement(
      "div",
      {
        className:
          "overflow-hidden rounded-md border [&_th:first-child:not(:has([data-slot=checkbox])):is(:has([data-slot=button]),:has([data-slot=dropdown-menu-trigger]))_:is([data-slot=button],[data-slot=dropdown-menu-trigger])]:-ms-1 [&_th:not(:first-child):is(:has([data-slot=button]),:has([data-slot=dropdown-menu-trigger]))_:is([data-slot=button],[data-slot=dropdown-menu-trigger])]:-ms-3",
      },
      React.createElement(
        Table,
        null,
        React.createElement(
          TableHeader,
          null,
          table.getHeaderGroups().map((hg) =>
            React.createElement(
              TableRow,
              { key: hg.id, className: "border-none hover:bg-transparent" },
              hg.headers.map((h) =>
                React.createElement(
                  TableHead,
                  { key: h.id },
                  h.isPlaceholder
                    ? null
                    : flexRender(h.column.columnDef.header, h.getContext())
                )
              )
            )
          )
        ),
        React.createElement(
          TableBody,
          null,
          table.getRowModel().rows.map((row) =>
            React.createElement(
              TableRow,
              { key: row.id, className: "border-none" },
              row
                .getVisibleCells()
                .map((cell) =>
                  React.createElement(
                    TableCell,
                    { key: cell.id },
                    flexRender(cell.column.columnDef.cell, cell.getContext())
                  )
                )
            )
          )
        )
      )
    ),
    React.createElement(
      "div",
      { className: "flex items-center justify-between" },
      React.createElement(
        "p",
        { className: "text-sm text-muted-foreground" },
        `${start} - ${end} of ${total}`
      ),
      React.createElement(
        Pagination,
        { className: "w-auto mx-0" },
        React.createElement(
          PaginationContent,
          null,
          React.createElement(
            PaginationItem,
            null,
            React.createElement(PaginationPrevious, {
              onClick: (e: React.MouseEvent) => {
                e.preventDefault();
                table.previousPage();
              },
              "aria-disabled": !table.getCanPreviousPage(),
              className: !table.getCanPreviousPage()
                ? "pointer-events-none opacity-50"
                : undefined,
            })
          ),
          Array.from({ length: table.getPageCount() }, (_, i) =>
            React.createElement(
              PaginationItem,
              { key: i },
              React.createElement(
                PaginationLink,
                {
                  isActive: i === table.getState().pagination.pageIndex,
                  onClick: (e: React.MouseEvent) => {
                    e.preventDefault();
                    table.setPageIndex(i);
                  },
                },
                i + 1
              )
            )
          ),
          React.createElement(
            PaginationItem,
            null,
            React.createElement(PaginationNext, {
              onClick: (e: React.MouseEvent) => {
                e.preventDefault();
                table.nextPage();
              },
              "aria-disabled": !table.getCanNextPage(),
              className: !table.getCanNextPage()
                ? "pointer-events-none opacity-50"
                : undefined,
            })
          )
        )
      )
    )
  );
}

// ─── Striped table demo ─────────────────────────────────────────────────────────

interface StripedTableRow {
  id: string;
  name: string;
  avatar: string;
  flag: string;
  email: string;
  location: string;
  balance: number;
}

const stripedTableData: StripedTableRow[] = [
  {
    id: "1",
    name: "Dr. Anika Sharma",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&h=96&dpr=2&q=80",
    flag: "in",
    email: "anika.sharma@ohc.in",
    location: "India",
    balance: 5143.03,
  },
  {
    id: "2",
    name: "Dr. Sarah Mitchell",
    avatar:
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=96&h=96&dpr=2&q=80",
    flag: "gb",
    email: "sarah.mitchell@ohc.in",
    location: "United Kingdom",
    balance: 4321.87,
  },
  {
    id: "3",
    name: "Dr. David Okafor",
    avatar:
      "https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?w=96&h=96&dpr=2&q=80",
    flag: "ng",
    email: "david.okafor@ohc.in",
    location: "Nigeria",
    balance: 7654.98,
  },
  {
    id: "4",
    name: "Nurse Elena Fischer",
    avatar:
      "https://images.unsplash.com/photo-1485893086445-ed75865251e0?w=96&h=96&dpr=2&q=80",
    flag: "de",
    email: "elena.fischer@ohc.in",
    location: "Germany",
    balance: 3456.45,
  },
  {
    id: "5",
    name: "Dr. Hiroshi Tanaka",
    avatar:
      "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=96&h=96&dpr=2&q=80",
    flag: "jp",
    email: "hiroshi.tanaka@ohc.in",
    location: "Japan",
    balance: 9876.54,
  },
  {
    id: "6",
    name: "Dr. Ravi Menon",
    avatar:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=96&h=96&dpr=2&q=80",
    flag: "in",
    email: "ravi.menon@ohc.in",
    location: "India",
    balance: 6214.22,
  },
  {
    id: "7",
    name: "Dr. Carlos Rivera",
    avatar:
      "https://images.unsplash.com/photo-1543299750-19d1d6297053?w=96&h=96&dpr=2&q=80",
    flag: "es",
    email: "carlos.rivera@ohc.in",
    location: "Spain",
    balance: 5321.77,
  },
  {
    id: "8",
    name: "Nurse Mei Lin Wong",
    avatar:
      "https://images.unsplash.com/photo-1620075225255-8c2051b6c015?w=96&h=96&dpr=2&q=80",
    flag: "sg",
    email: "mei.wong@ohc.in",
    location: "Singapore",
    balance: 8452.39,
  },
  {
    id: "9",
    name: "Dr. Siddharth Patel",
    avatar:
      "https://images.unsplash.com/photo-1485206412256-701ccc5b93ca?w=96&h=96&dpr=2&q=80",
    flag: "in",
    email: "siddharth.patel@ohc.in",
    location: "India",
    balance: 7345.1,
  },
  {
    id: "10",
    name: "Dr. Amara Diallo",
    avatar:
      "https://images.unsplash.com/photo-1542595913-85d69b0edbaf?w=96&h=96&dpr=2&q=80",
    flag: "sn",
    email: "amara.diallo@ohc.in",
    location: "Senegal",
    balance: 5214.88,
  },
  {
    id: "11",
    name: "Dr. Priya Krishnan",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&h=96&dpr=2&q=80",
    flag: "in",
    email: "priya.krishnan@ohc.in",
    location: "India",
    balance: 9421.5,
  },
  {
    id: "12",
    name: "Nurse Rekha Thomas",
    avatar:
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=96&h=96&dpr=2&q=80",
    flag: "in",
    email: "rekha.thomas@ohc.in",
    location: "India",
    balance: 4521.67,
  },
];

const stripedTableColumns: ColumnDef<StripedTableRow>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) =>
      React.createElement(
        "div",
        { className: "flex items-center gap-2" },
        React.createElement(
          Avatar,
          { className: "size-6" },
          React.createElement(AvatarImage, {
            src: row.original.avatar,
            alt: row.original.name,
          }),
          React.createElement(
            AvatarFallback,
            null,
            row.original.name
              .split(" ")
              .map((n: string) => n[0])
              .join("")
          )
        ),
        React.createElement(
          "span",
          { className: "text-foreground font-medium" },
          row.original.name
        )
      ),
    size: 175,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) =>
      React.createElement(
        "a",
        {
          href: "mailto:" + row.original.email,
          className: "hover:text-primary hover:underline",
        },
        row.original.email
      ),
    size: 180,
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) =>
      React.createElement(
        "div",
        { className: "flex items-center gap-1.5" },
        React.createElement("img", {
          src:
            "https://flagcdn.com/" + row.original.flag.toLowerCase() + ".svg",
          alt: row.original.flag,
          className: "size-4 rounded-full object-cover",
        }),
        React.createElement(
          "span",
          { className: "text-foreground font-medium" },
          row.original.location
        )
      ),
    size: 170,
  },
  {
    accessorKey: "balance",
    header: () =>
      React.createElement("div", { className: "text-right" }, "Balance ($)"),
    cell: ({ row }) =>
      React.createElement(
        "span",
        { className: "font-semibold" },
        "$" + row.original.balance.toFixed(2)
      ),
    meta: { className: "text-right" },
    size: 120,
  },
];

function StripedTableDemo() {
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: "name", desc: true },
  ]);

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    columns: stripedTableColumns,
    data: stripedTableData,
    state: { pagination, sorting },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const total = table.getFilteredRowModel().rows.length;
  const start =
    total === 0 ? 0 : pagination.pageIndex * pagination.pageSize + 1;
  const end = Math.min((pagination.pageIndex + 1) * pagination.pageSize, total);

  return React.createElement(
    "div",
    { className: "w-full space-y-2.5" },
    React.createElement(
      "div",
      {
        className:
          "overflow-hidden rounded-md border [&_th:first-child:not(:has([data-slot=checkbox])):is(:has([data-slot=button]),:has([data-slot=dropdown-menu-trigger]))_:is([data-slot=button],[data-slot=dropdown-menu-trigger])]:-ms-1 [&_th:not(:first-child):is(:has([data-slot=button]),:has([data-slot=dropdown-menu-trigger]))_:is([data-slot=button],[data-slot=dropdown-menu-trigger])]:-ms-3",
      },
      React.createElement(
        Table,
        null,
        React.createElement(
          TableHeader,
          null,
          table.getHeaderGroups().map((hg) =>
            React.createElement(
              TableRow,
              { key: hg.id },
              hg.headers.map((h) =>
                React.createElement(
                  TableHead,
                  { key: h.id, className: h.column.columnDef.meta?.className },
                  h.isPlaceholder
                    ? null
                    : flexRender(h.column.columnDef.header, h.getContext())
                )
              )
            )
          )
        ),
        React.createElement(
          TableBody,
          null,
          table.getRowModel().rows.map((row) =>
            React.createElement(
              TableRow,
              {
                key: row.id,
                className: "even:bg-muted/50",
              },
              row.getVisibleCells().map((cell) =>
                React.createElement(
                  TableCell,
                  {
                    key: cell.id,
                    className: cell.column.columnDef.meta?.className,
                  },
                  flexRender(cell.column.columnDef.cell, cell.getContext())
                )
              )
            )
          )
        )
      )
    ),
    React.createElement(
      "div",
      { className: "flex items-center justify-between" },
      React.createElement(
        "p",
        { className: "text-sm text-muted-foreground" },
        `${start} - ${end} of ${total}`
      ),
      React.createElement(
        Pagination,
        { className: "w-auto mx-0" },
        React.createElement(
          PaginationContent,
          null,
          React.createElement(
            PaginationItem,
            null,
            React.createElement(PaginationPrevious, {
              onClick: (e: React.MouseEvent) => {
                e.preventDefault();
                table.previousPage();
              },
              "aria-disabled": !table.getCanPreviousPage(),
              className: !table.getCanPreviousPage()
                ? "pointer-events-none opacity-50"
                : undefined,
            })
          ),
          Array.from({ length: table.getPageCount() }, (_, i) =>
            React.createElement(
              PaginationItem,
              { key: i },
              React.createElement(
                PaginationLink,
                {
                  isActive: i === table.getState().pagination.pageIndex,
                  onClick: (e: React.MouseEvent) => {
                    e.preventDefault();
                    table.setPageIndex(i);
                  },
                },
                i + 1
              )
            )
          ),
          React.createElement(
            PaginationItem,
            null,
            React.createElement(PaginationNext, {
              onClick: (e: React.MouseEvent) => {
                e.preventDefault();
                table.nextPage();
              },
              "aria-disabled": !table.getCanNextPage(),
              className: !table.getCanNextPage()
                ? "pointer-events-none opacity-50"
                : undefined,
            })
          )
        )
      )
    )
  );
}

// ─── Sticky header demo ─────────────────────────────────────────────────────────

const stickyHeaderColumns: ColumnDef<Patient>[] = [
  {
    id: "patient",
    accessorKey: "name",
    enableSorting: true,
    header: ({ column }) =>
      React.createElement(DataTableColumnHeader, {
        column: column as any,
        title: "Patient",
      }),
    cell: ({ row }) => patientCell(row.original.name, row.original.id),
  },
  {
    id: "location",
    header: "Ward / Bed",
    cell: ({ row }) =>
      React.createElement(
        "div",
        { className: "flex flex-col" },
        React.createElement(
          "span",
          { className: "font-medium text-sm" },
          row.original.ward
        ),
        React.createElement(
          "span",
          { className: "text-muted-foreground text-xs" },
          row.original.bed
        )
      ),
  },
  { accessorKey: "diagnosis", header: "Diagnosis" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) =>
      React.createElement(
        Badge,
        {
          variant:
            patientStatusVariant[row.getValue("status") as Patient["status"]],
        },
        row.getValue("status")
      ),
  },
];

function StickyHeaderDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data: patients,
    columns: stickyHeaderColumns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return React.createElement(
    ScrollArea,
    {
      className:
        "h-80 overflow-hidden rounded-md border [&_th:first-child:not(:has([data-slot=checkbox])):is(:has([data-slot=button]),:has([data-slot=dropdown-menu-trigger]))_:is([data-slot=button],[data-slot=dropdown-menu-trigger])]:-ms-1 [&_th:not(:first-child):is(:has([data-slot=button]),:has([data-slot=dropdown-menu-trigger]))_:is([data-slot=button],[data-slot=dropdown-menu-trigger])]:-ms-3",
    },
    React.createElement(
      "table",
      { className: "w-full caption-bottom text-sm" },
      React.createElement(
        TableHeader,
        {
          className:
            "sticky top-0 z-10 bg-soft-background shadow-[0_0.5px_0_0_var(--border)]",
        },
        table.getHeaderGroups().map((hg) =>
          React.createElement(
            TableRow,
            { key: hg.id, className: "border-b-0" },
            hg.headers.map((header) =>
              React.createElement(
                TableHead,
                { key: header.id },
                header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )
              )
            )
          )
        )
      ),
      React.createElement(
        TableBody,
        null,
        table.getRowModel().rows.map((row) =>
          React.createElement(
            TableRow,
            { key: row.id },
            row
              .getVisibleCells()
              .map((cell) =>
                React.createElement(
                  TableCell,
                  { key: cell.id },
                  flexRender(cell.column.columnDef.cell, cell.getContext())
                )
              )
          )
        )
      )
    )
  );
}

// ─── Card container demo ──────────────────────────────────────────────────────

const cardColumns: ColumnDef<SelectionMember>[] = [
  {
    accessorKey: "name",
    id: "name",
    header: ({ column }) =>
      React.createElement(DataTableColumnHeader, {
        column: column as any,
        title: "Practitioner",
      }),
    size: 480,
    enableSorting: true,
    enableHiding: false,
    cell: ({ row }) =>
      React.createElement(
        "div",
        { className: "flex items-center gap-3" },
        React.createElement(
          Avatar,
          { className: "size-8" },
          React.createElement(AvatarImage, {
            src: row.original.avatar,
            alt: row.original.name,
          }),
          React.createElement(
            AvatarFallback,
            null,
            row.original.name
              .split(" ")
              .map((n: string) => n[0])
              .join("")
          )
        ),
        React.createElement(
          "div",
          { className: "space-y-px" },
          React.createElement(
            "div",
            { className: "text-foreground font-medium" },
            row.original.name
          ),
          React.createElement(
            "div",
            { className: "text-muted-foreground" },
            row.original.email
          )
        )
      ),
  },
  {
    accessorKey: "location",
    id: "location",
    header: ({ column }) =>
      React.createElement(DataTableColumnHeader, {
        column: column as any,
        title: "Location",
      }),
    size: 360,
    enableSorting: true,
    cell: ({ row }) =>
      React.createElement(
        "div",
        { className: "flex items-center gap-1.5" },
        React.createElement("img", {
          src:
            "https://flagcdn.com/" + row.original.flag.toLowerCase() + ".svg",
          alt: row.original.flag,
          className: "size-4 rounded-full object-cover",
        }),
        React.createElement(
          "div",
          { className: "text-foreground font-medium" },
          row.original.location
        )
      ),
  },
  {
    accessorKey: "joined",
    id: "joined",
    header: ({ column }) =>
      React.createElement(DataTableColumnHeader, {
        column: column as any,
        title: "Joined",
      }),
    size: 200,
    enableSorting: true,
    cell: ({ row }) =>
      React.createElement(
        "span",
        { className: "font-medium" },
        row.original.joined
      ),
  },
];

function CardContainerDemo() {
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: "name", desc: true },
  ]);

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    columns: cardColumns,
    data: selectionMembers,
    state: { pagination, sorting },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const total = table.getFilteredRowModel().rows.length;
  const start =
    total === 0 ? 0 : pagination.pageIndex * pagination.pageSize + 1;
  const end = Math.min((pagination.pageIndex + 1) * pagination.pageSize, total);

  return React.createElement(
    Card,
    { className: "w-full gap-3 py-3.5" },
    React.createElement(
      CardHeader,
      { className: "flex items-center justify-between px-3.5" },
      React.createElement(CardTitle, null, "Users"),
      React.createElement(
        CardAction,
        null,
        React.createElement(
          Button,
          { size: "sm" },
          React.createElement(UserPlus, { "aria-hidden": true }),
          "Add User"
        )
      )
    ),
    React.createElement(
      "div",
      {
        className:
          "overflow-hidden w-full border-y [&_th:first-child:not(:has([data-slot=checkbox])):is(:has([data-slot=button]),:has([data-slot=dropdown-menu-trigger]))_:is([data-slot=button],[data-slot=dropdown-menu-trigger])]:-ms-1 [&_th:not(:first-child):is(:has([data-slot=button]),:has([data-slot=dropdown-menu-trigger]))_:is([data-slot=button],[data-slot=dropdown-menu-trigger])]:-ms-3",
      },
      React.createElement(
        Table,
        null,
        React.createElement(
          TableHeader,
          null,
          table.getHeaderGroups().map((hg) =>
            React.createElement(
              TableRow,
              { key: hg.id },
              hg.headers.map((h) =>
                React.createElement(
                  TableHead,
                  { key: h.id, style: { width: h.getSize() } },
                  h.isPlaceholder
                    ? null
                    : flexRender(h.column.columnDef.header, h.getContext())
                )
              )
            )
          )
        ),
        React.createElement(
          TableBody,
          null,
          table.getRowModel().rows.map((row) =>
            React.createElement(
              TableRow,
              { key: row.id },
              row
                .getVisibleCells()
                .map((cell) =>
                  React.createElement(
                    TableCell,
                    { key: cell.id, style: { width: cell.column.getSize() } },
                    flexRender(cell.column.columnDef.cell, cell.getContext())
                  )
                )
            )
          )
        )
      )
    ),
    React.createElement(
      CardFooter,
      { className: "border-none bg-transparent! px-3.5 py-0" },
      React.createElement(
        "div",
        { className: "flex w-full items-center justify-between" },
        React.createElement(
          "p",
          { className: "text-sm text-muted-foreground" },
          `${start} - ${end} of ${total}`
        ),
        React.createElement(
          Pagination,
          { className: "w-auto mx-0" },
          React.createElement(
            PaginationContent,
            null,
            React.createElement(
              PaginationItem,
              null,
              React.createElement(PaginationPrevious, {
                onClick: (e: React.MouseEvent) => {
                  e.preventDefault();
                  table.previousPage();
                },
                "aria-disabled": !table.getCanPreviousPage(),
                className: !table.getCanPreviousPage()
                  ? "pointer-events-none opacity-50"
                  : undefined,
              })
            ),
            Array.from({ length: table.getPageCount() }, (_, i) =>
              React.createElement(
                PaginationItem,
                { key: i },
                React.createElement(
                  PaginationLink,
                  {
                    isActive: i === table.getState().pagination.pageIndex,
                    onClick: (e: React.MouseEvent) => {
                      e.preventDefault();
                      table.setPageIndex(i);
                    },
                  },
                  i + 1
                )
              )
            ),
            React.createElement(
              PaginationItem,
              null,
              React.createElement(PaginationNext, {
                onClick: (e: React.MouseEvent) => {
                  e.preventDefault();
                  table.nextPage();
                },
                "aria-disabled": !table.getCanNextPage(),
                className: !table.getCanNextPage()
                  ? "pointer-events-none opacity-50"
                  : undefined,
              })
            )
          )
        )
      )
    )
  );
}

// ─── Column visibility demo ──────────────────────────────────────────────────

const visibilityColumns: ColumnDef<SelectionMember>[] = [
  {
    accessorKey: "name",
    id: "name",
    header: ({ column }) =>
      React.createElement(DataTableColumnHeader, {
        column: column as any,
        title: "Practitioner",
      }),
    size: 200,
    enableSorting: true,
    enableHiding: false,
    cell: ({ row }) =>
      React.createElement(
        "div",
        { className: "flex items-center gap-3" },
        React.createElement(
          Avatar,
          { className: "size-8" },
          React.createElement(AvatarImage, {
            src: row.original.avatar,
            alt: row.original.name,
          }),
          React.createElement(
            AvatarFallback,
            null,
            row.original.name
              .split(" ")
              .map((n: string) => n[0])
              .join("")
          )
        ),
        React.createElement(
          "div",
          { className: "space-y-px" },
          React.createElement(
            "div",
            { className: "text-foreground font-medium" },
            row.original.name
          ),
          React.createElement(
            "div",
            { className: "text-muted-foreground" },
            row.original.email
          )
        )
      ),
  },
  {
    accessorKey: "location",
    id: "location",
    header: ({ column }) =>
      React.createElement(DataTableColumnHeader, {
        column: column as any,
        title: "Location",
      }),
    size: 160,
    enableSorting: true,
    enableHiding: true,
    cell: ({ row }) =>
      React.createElement(
        "div",
        { className: "flex items-center gap-1.5" },
        React.createElement("img", {
          src:
            "https://flagcdn.com/" + row.original.flag.toLowerCase() + ".svg",
          alt: row.original.flag,
          className: "size-4 rounded-full object-cover",
        }),
        React.createElement(
          "div",
          { className: "text-foreground font-medium" },
          row.original.location
        )
      ),
  },
  {
    accessorKey: "joined",
    id: "joined",
    header: ({ column }) =>
      React.createElement(DataTableColumnHeader, {
        column: column as any,
        title: "Joined",
      }),
    size: 120,
    enableSorting: true,
    enableHiding: true,
    cell: ({ row }) =>
      React.createElement(
        "span",
        { className: "font-medium" },
        row.original.joined
      ),
  },
  {
    accessorKey: "availability",
    id: "status",
    header: "Status",
    size: 100,
    enableSorting: true,
    enableHiding: true,
    cell: ({ row }) => {
      const status = row.original.availability;
      return status === "online" || status === "away"
        ? React.createElement(Badge, { variant: "success" }, "Approved")
        : React.createElement(Badge, { variant: "warning" }, "Pending");
    },
  },
];

function ColumnVisibilityDemo() {
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: "name", desc: true },
  ]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    columns: visibilityColumns,
    data: selectionMembers,
    getRowId: (row: SelectionMember) => row.id,
    state: { pagination, sorting, columnVisibility },
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const total = table.getFilteredRowModel().rows.length;
  const start =
    total === 0 ? 0 : pagination.pageIndex * pagination.pageSize + 1;
  const end = Math.min((pagination.pageIndex + 1) * pagination.pageSize, total);

  return React.createElement(
    Card,
    { className: "w-full gap-3 py-3.5" },
    React.createElement(
      CardHeader,
      { className: "flex items-center justify-between px-3.5" },
      React.createElement(CardTitle, null, "Users"),
      React.createElement(
        CardAction,
        null,
        React.createElement(
          DropdownMenu,
          { modal: false },
          React.createElement(
            DropdownMenuTrigger,
            { asChild: true },
            React.createElement(
              Button,
              { variant: "outline", size: "sm" },
              React.createElement(Settings2, { "aria-hidden": true }),
              "Columns"
            )
          ),
          React.createElement(
            DropdownMenuContent,
            { align: "end" },
            table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) =>
                React.createElement(
                  DropdownMenuCheckboxItem,
                  {
                    key: column.id,
                    className: "capitalize",
                    checked: column.getIsVisible(),
                    onCheckedChange: (value: boolean) =>
                      column.toggleVisibility(!!value),
                  },
                  column.id
                )
              )
          )
        )
      )
    ),
    React.createElement(
      "div",
      {
        className:
          "overflow-hidden w-full border-y [&_th:first-child:not(:has([data-slot=checkbox])):is(:has([data-slot=button]),:has([data-slot=dropdown-menu-trigger]))_:is([data-slot=button],[data-slot=dropdown-menu-trigger])]:-ms-1 [&_th:not(:first-child):is(:has([data-slot=button]),:has([data-slot=dropdown-menu-trigger]))_:is([data-slot=button],[data-slot=dropdown-menu-trigger])]:-ms-3",
      },
      React.createElement(
        Table,
        null,
        React.createElement(
          TableHeader,
          null,
          table.getHeaderGroups().map((hg) =>
            React.createElement(
              TableRow,
              { key: hg.id },
              hg.headers.map((h) =>
                React.createElement(
                  TableHead,
                  { key: h.id, style: { width: h.getSize() } },
                  h.isPlaceholder
                    ? null
                    : flexRender(h.column.columnDef.header, h.getContext())
                )
              )
            )
          )
        ),
        React.createElement(
          TableBody,
          null,
          table.getRowModel().rows.map((row) =>
            React.createElement(
              TableRow,
              { key: row.id },
              row
                .getVisibleCells()
                .map((cell) =>
                  React.createElement(
                    TableCell,
                    { key: cell.id, style: { width: cell.column.getSize() } },
                    flexRender(cell.column.columnDef.cell, cell.getContext())
                  )
                )
            )
          )
        )
      )
    ),
    React.createElement(
      CardFooter,
      { className: "border-none bg-transparent! px-3.5 py-0" },
      React.createElement(
        "div",
        { className: "flex w-full items-center justify-between" },
        React.createElement(
          "p",
          { className: "text-sm text-muted-foreground" },
          `${start} - ${end} of ${total}`
        ),
        React.createElement(
          Pagination,
          { className: "w-auto mx-0" },
          React.createElement(
            PaginationContent,
            null,
            React.createElement(
              PaginationItem,
              null,
              React.createElement(PaginationPrevious, {
                onClick: (e: React.MouseEvent) => {
                  e.preventDefault();
                  table.previousPage();
                },
                "aria-disabled": !table.getCanPreviousPage(),
                className: !table.getCanPreviousPage()
                  ? "pointer-events-none opacity-50"
                  : undefined,
              })
            ),
            Array.from({ length: table.getPageCount() }, (_, i) =>
              React.createElement(
                PaginationItem,
                { key: i },
                React.createElement(
                  PaginationLink,
                  {
                    isActive: i === table.getState().pagination.pageIndex,
                    onClick: (e: React.MouseEvent) => {
                      e.preventDefault();
                      table.setPageIndex(i);
                    },
                  },
                  i + 1
                )
              )
            ),
            React.createElement(
              PaginationItem,
              null,
              React.createElement(PaginationNext, {
                onClick: (e: React.MouseEvent) => {
                  e.preventDefault();
                  table.nextPage();
                },
                "aria-disabled": !table.getCanNextPage(),
                className: !table.getCanNextPage()
                  ? "pointer-events-none opacity-50"
                  : undefined,
              })
            )
          )
        )
      )
    )
  );
}

// ─── Loading skeleton demo ────────────────────────────────────────────────────

const skeletonColumns: ColumnDef<SelectionMember>[] = [
  {
    accessorKey: "name",
    id: "name",
    header: ({ column }) =>
      React.createElement(DataTableColumnHeader, {
        column: column as any,
        title: "Practitioner",
      }),
    size: 200,
    enableSorting: true,
    enableHiding: false,
    cell: ({ row }) =>
      React.createElement(
        "div",
        { className: "flex items-center gap-3" },
        React.createElement(
          Avatar,
          { className: "size-8" },
          React.createElement(AvatarImage, {
            src: row.original.avatar,
            alt: row.original.name,
          }),
          React.createElement(
            AvatarFallback,
            null,
            row.original.name
              .split(" ")
              .map((n: string) => n[0])
              .join("")
          )
        ),
        React.createElement(
          "div",
          { className: "space-y-px" },
          React.createElement(
            "div",
            { className: "text-foreground font-medium" },
            row.original.name
          ),
          React.createElement(
            "div",
            { className: "text-muted-foreground" },
            row.original.email
          )
        )
      ),
    meta: {
      skeleton: React.createElement(
        "div",
        { className: "flex items-center gap-3" },
        React.createElement(Skeleton, { className: "size-8 rounded-full" }),
        React.createElement(
          "div",
          { className: "space-y-1.5" },
          React.createElement(Skeleton, { className: "h-4 w-24" }),
          React.createElement(Skeleton, { className: "h-3.5 w-16" })
        )
      ),
    },
  },
  {
    accessorKey: "email",
    id: "email",
    header: ({ column }) =>
      React.createElement(DataTableColumnHeader, {
        column: column as any,
        title: "Email",
      }),
    size: 150,
    enableSorting: true,
    cell: ({ row }) =>
      React.createElement(
        "span",
        { className: "text-muted-foreground" },
        row.original.email
      ),
    meta: {
      skeleton: React.createElement(Skeleton, { className: "h-4 w-28" }),
    },
  },
  {
    accessorKey: "availability",
    id: "status",
    header: "Status",
    size: 100,
    enableSorting: true,
    cell: ({ row }) => {
      const status = row.original.availability;
      return status === "online" || status === "away"
        ? React.createElement(Badge, { variant: "success" }, "Approved")
        : React.createElement(Badge, { variant: "warning" }, "Pending");
    },
    meta: {
      skeleton: React.createElement(Skeleton, {
        className: "h-5 w-16 rounded-full",
      }),
    },
  },
];

function LoadingSkeletonDemo() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: "name", desc: true },
  ]);

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    columns: skeletonColumns,
    data: selectionMembers,
    getRowId: (row: SelectionMember) => row.id,
    state: { pagination, sorting },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const total = table.getFilteredRowModel().rows.length;
  const start =
    total === 0 ? 0 : pagination.pageIndex * pagination.pageSize + 1;
  const end = Math.min((pagination.pageIndex + 1) * pagination.pageSize, total);
  const skeletonRows = Array.from({ length: pagination.pageSize });

  return React.createElement(
    Card,
    { className: "w-full gap-3 py-3.5" },
    React.createElement(
      CardHeader,
      { className: "flex items-center justify-between px-3.5" },
      React.createElement(CardTitle, null, "Employees"),
      React.createElement(
        CardAction,
        null,
        React.createElement(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => setIsLoading((p) => !p),
          },
          isLoading ? "Disable Loading" : "Enable Loading"
        )
      )
    ),
    React.createElement(
      "div",
      {
        className:
          "overflow-hidden w-full border-y [&_th:first-child:not(:has([data-slot=checkbox])):is(:has([data-slot=button]),:has([data-slot=dropdown-menu-trigger]))_:is([data-slot=button],[data-slot=dropdown-menu-trigger])]:-ms-1 [&_th:not(:first-child):is(:has([data-slot=button]),:has([data-slot=dropdown-menu-trigger]))_:is([data-slot=button],[data-slot=dropdown-menu-trigger])]:-ms-3",
      },
      React.createElement(
        Table,
        null,
        React.createElement(
          TableHeader,
          null,
          table.getHeaderGroups().map((hg) =>
            React.createElement(
              TableRow,
              { key: hg.id },
              hg.headers.map((h) =>
                React.createElement(
                  TableHead,
                  { key: h.id, style: { width: h.getSize() } },
                  h.isPlaceholder
                    ? null
                    : flexRender(h.column.columnDef.header, h.getContext())
                )
              )
            )
          )
        ),
        React.createElement(
          TableBody,
          null,
          isLoading
            ? skeletonRows.map((_, i) =>
                React.createElement(
                  TableRow,
                  { key: `skeleton-${i}` },
                  table.getAllLeafColumns().map((col) =>
                    React.createElement(
                      TableCell,
                      { key: col.id, style: { width: col.getSize() } },
                      (col.columnDef.meta as any)?.skeleton ??
                        React.createElement(Skeleton, {
                          className: "h-4 w-full",
                        })
                    )
                  )
                )
              )
            : table.getRowModel().rows.map((row) =>
                React.createElement(
                  TableRow,
                  { key: row.id },
                  row.getVisibleCells().map((cell) =>
                    React.createElement(
                      TableCell,
                      {
                        key: cell.id,
                        style: { width: cell.column.getSize() },
                      },
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    )
                  )
                )
              )
        )
      )
    ),
    React.createElement(
      CardFooter,
      { className: "border-none bg-transparent! px-3.5 py-0" },
      React.createElement(
        "div",
        { className: "flex w-full items-center justify-between" },
        isLoading
          ? React.createElement(
              "div",
              { className: "flex w-full items-center justify-between" },
              React.createElement(Skeleton, { className: "h-4 w-32" }),
              React.createElement(
                "div",
                { className: "flex gap-1" },
                React.createElement(Skeleton, {
                  className: "size-8 rounded-md",
                }),
                React.createElement(Skeleton, {
                  className: "size-8 rounded-md",
                }),
                React.createElement(Skeleton, {
                  className: "size-8 rounded-md",
                }),
                React.createElement(Skeleton, {
                  className: "size-8 rounded-md",
                })
              )
            )
          : React.createElement(
              React.Fragment,
              null,
              React.createElement(
                "p",
                { className: "text-sm text-muted-foreground" },
                `${start} - ${end} of ${total}`
              ),
              React.createElement(
                Pagination,
                { className: "w-auto mx-0" },
                React.createElement(
                  PaginationContent,
                  null,
                  React.createElement(
                    PaginationItem,
                    null,
                    React.createElement(PaginationPrevious, {
                      onClick: (e: React.MouseEvent) => {
                        e.preventDefault();
                        table.previousPage();
                      },
                      "aria-disabled": !table.getCanPreviousPage(),
                      className: !table.getCanPreviousPage()
                        ? "pointer-events-none opacity-50"
                        : undefined,
                    })
                  ),
                  Array.from({ length: table.getPageCount() }, (_, i) =>
                    React.createElement(
                      PaginationItem,
                      { key: i },
                      React.createElement(
                        PaginationLink,
                        {
                          isActive: i === table.getState().pagination.pageIndex,
                          onClick: (e: React.MouseEvent) => {
                            e.preventDefault();
                            table.setPageIndex(i);
                          },
                        },
                        i + 1
                      )
                    )
                  ),
                  React.createElement(
                    PaginationItem,
                    null,
                    React.createElement(PaginationNext, {
                      onClick: (e: React.MouseEvent) => {
                        e.preventDefault();
                        table.nextPage();
                      },
                      "aria-disabled": !table.getCanNextPage(),
                      className: !table.getCanNextPage()
                        ? "pointer-events-none opacity-50"
                        : undefined,
                    })
                  )
                )
              )
            )
      )
    )
  );
}

// ─── CRUD data ────────────────────────────────────────────────────────────────

interface CrudMember {
  id: string;
  name: string;
  avatar: string;
  status: "Active" | "Inactive" | "Pending" | "Blocked";
  flag: string;
  email: string;
  role: string;
  joined: string;
  location: string;
}

const crudData: CrudMember[] = [
  {
    id: "1",
    name: "Dr. Kiran Reddy",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&h=96&dpr=2&q=80",
    status: "Active",
    flag: "in",
    email: "kiran.reddy@ohc.in",
    role: "Senior Consultant",
    joined: "Jan, 2018",
    location: "India",
  },
  {
    id: "2",
    name: "Dr. Anita Menon",
    avatar:
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=96&h=96&dpr=2&q=80",
    status: "Inactive",
    flag: "in",
    email: "anita.menon@ohc.in",
    role: "Consultant",
    joined: "Mar, 2020",
    location: "India",
  },
  {
    id: "3",
    name: "Dr. Suresh Pillai",
    avatar:
      "https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?w=96&h=96&dpr=2&q=80",
    status: "Blocked",
    flag: "in",
    email: "suresh.pillai@ohc.in",
    role: "Head of Department",
    joined: "Jun, 2015",
    location: "India",
  },
  {
    id: "4",
    name: "Nurse Rekha Thomas",
    avatar:
      "https://images.unsplash.com/photo-1485893086445-ed75865251e0?w=96&h=96&dpr=2&q=80",
    status: "Inactive",
    flag: "in",
    email: "rekha.thomas@ohc.in",
    role: "Senior Nurse",
    joined: "Sep, 2019",
    location: "India",
  },
  {
    id: "5",
    name: "Dr. Imran Sheikh",
    avatar:
      "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=96&h=96&dpr=2&q=80",
    status: "Active",
    flag: "in",
    email: "imran.sheikh@ohc.in",
    role: "Consultant",
    joined: "Nov, 2017",
    location: "India",
  },
  {
    id: "6",
    name: "Dr. Kavitha Nair",
    avatar:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=96&h=96&dpr=2&q=80",
    status: "Pending",
    flag: "in",
    email: "kavitha.nair@ohc.in",
    role: "Senior Consultant",
    joined: "Aug, 2016",
    location: "India",
  },
  {
    id: "7",
    name: "Dr. Rajiv Kapoor",
    avatar:
      "https://images.unsplash.com/photo-1543299750-19d1d6297053?w=96&h=96&dpr=2&q=80",
    status: "Inactive",
    flag: "in",
    email: "rajiv.kapoor@ohc.in",
    role: "Consultant",
    joined: "Dec, 2021",
    location: "India",
  },
  {
    id: "8",
    name: "Nurse Sumathi K.",
    avatar:
      "https://images.unsplash.com/photo-1620075225255-8c2051b6c015?w=96&h=96&dpr=2&q=80",
    status: "Blocked",
    flag: "in",
    email: "sumathi.k@ohc.in",
    role: "Senior Nurse",
    joined: "Apr, 2018",
    location: "India",
  },
  {
    id: "9",
    name: "Dr. Farhan Hossain",
    avatar:
      "https://images.unsplash.com/photo-1485206412256-701ccc5b93ca?w=96&h=96&dpr=2&q=80",
    status: "Pending",
    flag: "in",
    email: "farhan.hossain@ohc.in",
    role: "Consultant",
    joined: "Jul, 2020",
    location: "India",
  },
  {
    id: "10",
    name: "Dr. Pooja Iyer",
    avatar:
      "https://images.unsplash.com/photo-1542595913-85d69b0edbaf?w=96&h=96&dpr=2&q=80",
    status: "Inactive",
    flag: "in",
    email: "pooja.iyer@ohc.in",
    role: "Consultant",
    joined: "May, 2023",
    location: "India",
  },
  {
    id: "11",
    name: "Nurse Arun Mathew",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&h=96&dpr=2&q=80",
    status: "Blocked",
    flag: "in",
    email: "arun.mathew@ohc.in",
    role: "Charge Nurse",
    joined: "Oct, 2019",
    location: "India",
  },
  {
    id: "12",
    name: "Dr. Preethi Sajan",
    avatar:
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=96&h=96&dpr=2&q=80",
    status: "Active",
    flag: "in",
    email: "preethi.sajan@ohc.in",
    role: "Staff Physician",
    joined: "Feb, 2022",
    location: "India",
  },
];

function CrudActionsCell({ row }: { row: Row<CrudMember> }) {
  return React.createElement(
    DropdownMenu,
    { modal: false },
    React.createElement(
      "div",
      null,
      React.createElement(
        Button,
        { className: "size-7", size: "icon", variant: "ghost", asChild: true },
        React.createElement(
          DropdownMenuTrigger,
          null,
          React.createElement(MoreHorizontal)
        )
      )
    ),
    React.createElement(
      DropdownMenuContent,
      { side: "bottom", align: "start" },
      React.createElement(DropdownMenuItem, { onClick: () => {} }, "Edit"),
      React.createElement(
        DropdownMenuItem,
        {
          onClick: () => {
            navigator.clipboard.writeText(row.original.id);
            toast.success("Practitioner ID copied", {
              description: row.original.id,
            });
          },
        },
        "Copy ID"
      ),
      React.createElement(DropdownMenuSeparator),
      React.createElement(
        DropdownMenuItem,
        { variant: "destructive", onClick: () => {} },
        "Delete"
      )
    )
  );
}

function CrudDemo() {
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: "name", desc: true },
  ]);
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedStatuses, setSelectedStatuses] = React.useState<string[]>([]);

  const filteredData = React.useMemo(() => {
    return crudData.filter((item) => {
      const matchesStatus =
        !selectedStatuses.length || selectedStatuses.includes(item.status);
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        !searchQuery ||
        Object.values(item).join(" ").toLowerCase().includes(searchLower);
      return matchesStatus && matchesSearch;
    });
  }, [searchQuery, selectedStatuses]);

  const statusCounts = React.useMemo(() => {
    return crudData.reduce(
      (acc, item) => {
        acc[item.status] = (acc[item.status] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );
  }, []);

  const handleStatusChange = (checked: boolean, value: string) => {
    setSelectedStatuses((prev) =>
      checked ? [...prev, value] : prev.filter((v) => v !== value)
    );
  };

  const columns = React.useMemo<ColumnDef<CrudMember>[]>(
    () => [
      {
        accessorKey: "id",
        id: "id",
        header: ({ table: t }) =>
          React.createElement(Checkbox, {
            checked: t.getIsAllPageRowsSelected(),
            indeterminate:
              !t.getIsAllPageRowsSelected() && t.getIsSomePageRowsSelected(),
            onCheckedChange: (value: boolean) =>
              t.toggleAllPageRowsSelected(!!value),
            "aria-label": "Select all",
          }),
        cell: ({ row }) =>
          React.createElement(Checkbox, {
            checked: row.getIsSelected(),
            onCheckedChange: (value: boolean) => row.toggleSelected(!!value),
            "aria-label": "Select row",
          }),
        enableSorting: false,
        size: 35,
      },
      {
        accessorKey: "name",
        id: "name",
        header: ({ column }) =>
          React.createElement(DataTableColumnHeader, {
            column,
            title: "Practitioner",
          }),
        cell: ({ row }) =>
          React.createElement(
            "div",
            { className: "flex items-center gap-3" },
            React.createElement(
              Avatar,
              { className: "size-8" },
              React.createElement(AvatarImage, {
                src: row.original.avatar,
                alt: row.original.name,
              }),
              React.createElement(
                AvatarFallback,
                null,
                row.original.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")
              )
            ),
            React.createElement(
              "div",
              { className: "space-y-px" },
              React.createElement(
                "div",
                { className: "text-foreground font-medium" },
                row.original.name
              ),
              React.createElement(
                "div",
                { className: "text-muted-foreground" },
                row.original.email
              )
            )
          ),
        size: 200,
        enableSorting: true,
      },
      {
        accessorKey: "location",
        id: "location",
        header: ({ column }) =>
          React.createElement(DataTableColumnHeader, {
            column,
            title: "Location",
          }),
        cell: ({ row }) =>
          React.createElement(
            "div",
            { className: "flex items-center gap-1.5" },
            React.createElement("img", {
              src: `https://flagcdn.com/${row.original.flag.toLowerCase()}.svg`,
              alt: row.original.flag,
              className: "size-4 rounded-full object-cover",
            }),
            React.createElement(
              "div",
              { className: "text-foreground font-medium" },
              row.original.location
            )
          ),
        size: 150,
        enableSorting: true,
      },
      {
        accessorKey: "role",
        id: "role",
        header: ({ column }) =>
          React.createElement(DataTableColumnHeader, {
            column,
            title: "Designation",
          }),
        cell: ({ row }) =>
          React.createElement(
            "div",
            { className: "text-foreground font-medium" },
            row.original.role
          ),
        size: 150,
        enableSorting: true,
      },
      {
        accessorKey: "joined",
        id: "joined",
        header: ({ column }) =>
          React.createElement(DataTableColumnHeader, {
            column,
            title: "Joined",
          }),
        cell: ({ row }) =>
          React.createElement(
            "div",
            { className: "text-foreground font-medium" },
            row.original.joined
          ),
        size: 150,
        enableSorting: true,
      },
      {
        accessorKey: "status",
        id: "status",
        header: ({ column }) =>
          React.createElement(DataTableColumnHeader, {
            column,
            title: "Status",
          }),
        cell: ({ row }) => {
          const s = row.original.status;
          if (s === "Active")
            return React.createElement(
              Badge,
              { variant: "success" },
              "Approved"
            );
          if (s === "Blocked")
            return React.createElement(
              Badge,
              { variant: "destructive" },
              "Blocked"
            );
          if (s === "Inactive")
            return React.createElement(Badge, { variant: "info" }, "Inactive");
          return React.createElement(Badge, { variant: "warning" }, "Pending");
        },
        size: 100,
        enableSorting: true,
      },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => React.createElement(CrudActionsCell, { row }),
        size: 60,
        enableSorting: false,
      },
    ],
    []
  );

  const table = useReactTable({
    columns,
    data: filteredData,
    getRowId: (row) => row.id,
    state: { pagination, sorting, rowSelection },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const total = table.getFilteredRowModel().rows.length;
  const start =
    total === 0 ? 0 : pagination.pageIndex * pagination.pageSize + 1;
  const end = Math.min((pagination.pageIndex + 1) * pagination.pageSize, total);

  return React.createElement(
    Card,
    { className: "w-full gap-3 py-0" },
    React.createElement(
      CardHeader,
      { className: "flex items-center justify-between px-3 pt-3" },
      React.createElement(
        "div",
        { className: "flex items-center gap-2.5" },
        // Search input
        React.createElement(
          InputGroup,
          { className: "w-48" },
          React.createElement(
            InputGroupAddon,
            { align: "inline-start" },
            React.createElement(Search)
          ),
          React.createElement(InputGroupInput, {
            placeholder: "Search...",
            value: searchQuery,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchQuery(e.target.value),
          }),
          searchQuery.length > 0 &&
            React.createElement(
              InputGroupAddon,
              { align: "inline-end" },
              React.createElement(
                InputGroupButton,
                {
                  "aria-label": "Clear",
                  size: "icon-xs",
                  onClick: () => setSearchQuery(""),
                },
                React.createElement(X)
              )
            )
        ),
        // Status filter popover
        React.createElement(
          Popover,
          null,
          React.createElement(
            PopoverTrigger,
            { asChild: true },
            React.createElement(
              Button,
              { variant: "outline" },
              React.createElement(Filter),
              "Status",
              selectedStatuses.length > 0 &&
                React.createElement(
                  Badge,
                  { size: "sm", variant: "info" },
                  selectedStatuses.length
                )
            )
          ),
          React.createElement(
            PopoverContent,
            { className: "w-40", align: "start" },
            React.createElement(
              "div",
              { className: "space-y-3" },
              React.createElement(
                "div",
                { className: "text-muted-foreground text-xs font-medium" },
                "Filters"
              ),
              React.createElement(
                "div",
                { className: "space-y-3" },
                ...Object.keys(statusCounts).map((status) =>
                  React.createElement(
                    "div",
                    { key: status, className: "flex items-center gap-2.5" },
                    React.createElement(Checkbox, {
                      id: `crud-${status}`,
                      checked: selectedStatuses.includes(status),
                      onCheckedChange: (checked: boolean) =>
                        handleStatusChange(checked === true, status),
                    }),
                    React.createElement(
                      Label,
                      {
                        htmlFor: `crud-${status}`,
                        className:
                          "flex grow items-center justify-between gap-1.5 font-normal",
                      },
                      status,
                      React.createElement(
                        "span",
                        { className: "text-muted-foreground" },
                        statusCounts[status]
                      )
                    )
                  )
                )
              )
            )
          )
        )
      ),
      React.createElement(
        CardAction,
        null,
        React.createElement(
          Button,
          null,
          React.createElement(UserPlus),
          "Add new"
        )
      )
    ),
    React.createElement(
      CardContent,
      {
        className:
          "overflow-hidden border-y px-0 [&_th:first-child:not(:has([data-slot=checkbox])):is(:has([data-slot=button]),:has([data-slot=dropdown-menu-trigger]))_:is([data-slot=button],[data-slot=dropdown-menu-trigger])]:-ms-1 [&_th:not(:first-child):is(:has([data-slot=button]),:has([data-slot=dropdown-menu-trigger]))_:is([data-slot=button],[data-slot=dropdown-menu-trigger])]:-ms-3",
      },
      React.createElement(
        ScrollArea,
        null,
        React.createElement(
          Table,
          null,
          React.createElement(
            TableHeader,
            null,
            ...table
              .getHeaderGroups()
              .map((hg) =>
                React.createElement(
                  TableRow,
                  { key: hg.id },
                  ...hg.headers.map((h) =>
                    React.createElement(
                      TableHead,
                      { key: h.id, style: { width: h.getSize() } },
                      h.isPlaceholder
                        ? null
                        : flexRender(h.column.columnDef.header, h.getContext())
                    )
                  )
                )
              )
          ),
          React.createElement(
            TableBody,
            null,
            ...table.getRowModel().rows.map((row) =>
              React.createElement(
                TableRow,
                Object.assign(
                  { key: row.id },
                  row.getIsSelected() ? { "data-state": "selected" } : {}
                ),
                ...row.getVisibleCells().map((cell) =>
                  React.createElement(
                    TableCell,
                    {
                      key: cell.id,
                      style: { width: cell.column.getSize() },
                    },
                    flexRender(cell.column.columnDef.cell, cell.getContext())
                  )
                )
              )
            )
          )
        )
      )
    ),
    React.createElement(
      CardFooter,
      { className: "border-none bg-transparent! px-3.5 py-2" },
      React.createElement(
        "div",
        { className: "flex w-full items-center justify-between" },
        React.createElement(
          "p",
          { className: "text-sm text-muted-foreground" },
          `${start} - ${end} of ${total}`
        ),
        React.createElement(
          Pagination,
          { className: "w-auto mx-0" },
          React.createElement(
            PaginationContent,
            null,
            React.createElement(
              PaginationItem,
              null,
              React.createElement(PaginationPrevious, {
                onClick: (e: React.MouseEvent) => {
                  e.preventDefault();
                  table.previousPage();
                },
                "aria-disabled": !table.getCanPreviousPage(),
                className: !table.getCanPreviousPage()
                  ? "pointer-events-none opacity-50"
                  : undefined,
              })
            ),
            ...Array.from({ length: table.getPageCount() }, (_, i) =>
              React.createElement(
                PaginationItem,
                { key: i },
                React.createElement(
                  PaginationLink,
                  {
                    isActive: i === table.getState().pagination.pageIndex,
                    onClick: (e: React.MouseEvent) => {
                      e.preventDefault();
                      table.setPageIndex(i);
                    },
                  },
                  i + 1
                )
              )
            ),
            React.createElement(
              PaginationItem,
              null,
              React.createElement(PaginationNext, {
                onClick: (e: React.MouseEvent) => {
                  e.preventDefault();
                  table.nextPage();
                },
                "aria-disabled": !table.getCanNextPage(),
                className: !table.getCanNextPage()
                  ? "pointer-events-none opacity-50"
                  : undefined,
              })
            )
          )
        )
      )
    )
  );
}

// ─── Footer Totals data & columns ─────────────────────────────────────────────

type Employee = {
  id: string;
  name: string;
  avatar: string;
  role: string;
  status: "Active" | "Inactive" | "Pending" | "Blocked";
  balance: number;
};

const employees: Employee[] = [
  {
    id: "1",
    name: "Dr. Kiran Reddy",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&h=96&dpr=2&q=80",
    role: "Senior Consultant",
    status: "Active",
    balance: 5143.03,
  },
  {
    id: "2",
    name: "Dr. Anita Menon",
    avatar:
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=96&h=96&dpr=2&q=80",
    role: "Consultant",
    status: "Inactive",
    balance: 4321.87,
  },
  {
    id: "3",
    name: "Dr. Suresh Pillai",
    avatar:
      "https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?w=96&h=96&dpr=2&q=80",
    role: "Head of Department",
    status: "Blocked",
    balance: 7654.98,
  },
  {
    id: "4",
    name: "Nurse Rekha Thomas",
    avatar:
      "https://images.unsplash.com/photo-1485893086445-ed75865251e0?w=96&h=96&dpr=2&q=80",
    role: "Senior Nurse",
    status: "Inactive",
    balance: 3456.45,
  },
  {
    id: "5",
    name: "Dr. Imran Sheikh",
    avatar:
      "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=96&h=96&dpr=2&q=80",
    role: "Consultant",
    status: "Active",
    balance: 9876.54,
  },
  {
    id: "6",
    name: "Dr. Kavitha Nair",
    avatar:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=96&h=96&dpr=2&q=80",
    role: "Senior Consultant",
    status: "Pending",
    balance: 6214.22,
  },
  {
    id: "7",
    name: "Dr. Rajiv Kapoor",
    avatar:
      "https://images.unsplash.com/photo-1543299750-19d1d6297053?w=96&h=96&dpr=2&q=80",
    role: "Consultant",
    status: "Inactive",
    balance: 5321.77,
  },
  {
    id: "8",
    name: "Nurse Sumathi K.",
    avatar:
      "https://images.unsplash.com/photo-1620075225255-8c2051b6c015?w=96&h=96&dpr=2&q=80",
    role: "Senior Nurse",
    status: "Blocked",
    balance: 8452.39,
  },
  {
    id: "9",
    name: "Dr. Farhan Hossain",
    avatar:
      "https://images.unsplash.com/photo-1485206412256-701ccc5b93ca?w=96&h=96&dpr=2&q=80",
    role: "Consultant",
    status: "Pending",
    balance: 7345.1,
  },
  {
    id: "10",
    name: "Dr. Pooja Iyer",
    avatar:
      "https://images.unsplash.com/photo-1542595913-85d69b0edbaf?w=96&h=96&dpr=2&q=80",
    role: "Consultant",
    status: "Inactive",
    balance: 5214.88,
  },
];

const employeeStatusVariant: Record<
  Employee["status"],
  "success" | "destructive" | "info" | "warning"
> = {
  Active: "success",
  Blocked: "destructive",
  Inactive: "info",
  Pending: "warning",
};

const formatUSD = (amount: number) =>
  "$" + amount.toLocaleString("en-US", { minimumFractionDigits: 2 });

const footerTotalsColumns: ColumnDef<Employee>[] = [
  {
    id: "select",
    header: ({ table }) =>
      React.createElement(Checkbox, {
        checked: table.getIsAllPageRowsSelected(),
        indeterminate:
          !table.getIsAllPageRowsSelected() &&
          table.getIsSomePageRowsSelected(),
        onCheckedChange: (value: boolean) =>
          table.toggleAllPageRowsSelected(!!value),
        "aria-label": "Select all",
      }),
    cell: ({ row }) =>
      React.createElement(Checkbox, {
        checked: row.getIsSelected(),
        onCheckedChange: (value: boolean) => row.toggleSelected(!!value),
        "aria-label": "Select row",
      }),
    footer: () => null,
    enableSorting: false,
    enableHiding: false,
    size: 35,
  },
  {
    id: "name",
    accessorKey: "name",
    header: ({ column }) =>
      React.createElement(DataTableColumnHeader, {
        column: column as any,
        title: "Practitioner",
      }),
    footer: () =>
      React.createElement(
        "span",
        { className: "text-muted-foreground text-xs" },
        "Total balance"
      ),
    cell: ({ row }) =>
      React.createElement(
        "div",
        { className: "flex items-center gap-3" },
        React.createElement(
          Avatar,
          { className: "size-8" },
          React.createElement(AvatarImage, {
            src: row.original.avatar,
            alt: row.original.name,
          }),
          React.createElement(
            AvatarFallback,
            null,
            getInitials(row.original.name)
          )
        ),
        React.createElement(
          "span",
          { className: "text-foreground font-medium" },
          row.original.name
        )
      ),
    size: 200,
    enableSorting: true,
  },
  {
    id: "role",
    accessorKey: "role",
    header: ({ column }) =>
      React.createElement(DataTableColumnHeader, {
        column: column as any,
        title: "Designation",
      }),
    footer: () => null,
    cell: ({ row }) =>
      React.createElement(
        "span",
        { className: "text-foreground font-medium" },
        row.original.role
      ),
    size: 150,
    enableSorting: true,
  },
  {
    id: "status",
    accessorKey: "status",
    header: ({ column }) =>
      React.createElement(DataTableColumnHeader, {
        column: column as any,
        title: "Status",
      }),
    footer: () => null,
    cell: ({ row }) =>
      React.createElement(
        Badge,
        { variant: employeeStatusVariant[row.original.status] },
        row.original.status
      ),
    size: 110,
    enableSorting: true,
  },
  {
    id: "balance",
    accessorKey: "balance",
    header: ({ column }) =>
      React.createElement(DataTableColumnHeader, {
        column: column as any,
        title: "Balance",
      }),
    footer: ({ table }) => {
      const total = table
        .getFilteredRowModel()
        .rows.reduce(
          (sum, row) => sum + (row.getValue("balance") as number),
          0
        );
      return React.createElement(
        "span",
        { className: "font-bold tabular-nums" },
        formatUSD(total)
      );
    },
    cell: ({ row }) =>
      React.createElement(
        "span",
        { className: "text-foreground font-medium tabular-nums" },
        formatUSD(row.original.balance)
      ),
    size: 130,
    enableSorting: true,
  },
  {
    id: "actions",
    enableHiding: false,
    meta: { className: "w-0" },
    footer: () => null,
    cell: ({ row }) =>
      React.createElement(
        DataTableRowActions,
        {},
        React.createElement(
          DropdownMenuItem,
          { onClick: () => navigator.clipboard.writeText(row.original.id) },
          "Copy ID"
        ),
        React.createElement(DropdownMenuSeparator, {}),
        React.createElement(DropdownMenuItem, {}, "Edit"),
        React.createElement(
          DropdownMenuItem,
          { className: "text-destructive" },
          "Delete"
        )
      ),
  },
];

const FooterTotalsDemo = () =>
  React.createElement(DataTable as any, {
    columns: footerTotalsColumns,
    data: employees,
    filterColumn: "name",
    filterPlaceholder: "Search practitioners...",
  });

// ─── Footer Summary data & columns ───────────────────────────────────────────

type SummaryMember = {
  id: string;
  name: string;
  avatar: string;
  location: string;
  flag: string;
  status: "Active" | "Inactive" | "Pending" | "Blocked";
  balance: number;
};

const summaryMembers: SummaryMember[] = [
  {
    id: "1",
    name: "Dr. Kiran Reddy",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&h=96&dpr=2&q=80",
    location: "India",
    flag: "in",
    status: "Active",
    balance: 5143.03,
  },
  {
    id: "2",
    name: "Dr. Anita Menon",
    avatar:
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=96&h=96&dpr=2&q=80",
    location: "India",
    flag: "in",
    status: "Inactive",
    balance: 4321.87,
  },
  {
    id: "3",
    name: "Dr. Suresh Pillai",
    avatar:
      "https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?w=96&h=96&dpr=2&q=80",
    location: "India",
    flag: "in",
    status: "Blocked",
    balance: 7654.98,
  },
  {
    id: "4",
    name: "Nurse Rekha Thomas",
    avatar:
      "https://images.unsplash.com/photo-1485893086445-ed75865251e0?w=96&h=96&dpr=2&q=80",
    location: "India",
    flag: "in",
    status: "Inactive",
    balance: 3456.45,
  },
  {
    id: "5",
    name: "Dr. Imran Sheikh",
    avatar:
      "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=96&h=96&dpr=2&q=80",
    location: "United Kingdom",
    flag: "gb",
    status: "Active",
    balance: 9876.54,
  },
  {
    id: "6",
    name: "Dr. Kavitha Nair",
    avatar:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=96&h=96&dpr=2&q=80",
    location: "Singapore",
    flag: "sg",
    status: "Pending",
    balance: 6214.22,
  },
  {
    id: "7",
    name: "Dr. Rajiv Kapoor",
    avatar:
      "https://images.unsplash.com/photo-1543299750-19d1d6297053?w=96&h=96&dpr=2&q=80",
    location: "Canada",
    flag: "ca",
    status: "Inactive",
    balance: 5321.77,
  },
  {
    id: "8",
    name: "Nurse Sumathi K.",
    avatar:
      "https://images.unsplash.com/photo-1620075225255-8c2051b6c015?w=96&h=96&dpr=2&q=80",
    location: "India",
    flag: "in",
    status: "Blocked",
    balance: 8452.39,
  },
  {
    id: "9",
    name: "Dr. Farhan Hossain",
    avatar:
      "https://images.unsplash.com/photo-1485206412256-701ccc5b93ca?w=96&h=96&dpr=2&q=80",
    location: "India",
    flag: "in",
    status: "Pending",
    balance: 7345.1,
  },
  {
    id: "10",
    name: "Dr. Pooja Iyer",
    avatar:
      "https://images.unsplash.com/photo-1542595913-85d69b0edbaf?w=96&h=96&dpr=2&q=80",
    location: "India",
    flag: "in",
    status: "Inactive",
    balance: 5214.88,
  },
];

const summaryStatusVariant: Record<
  SummaryMember["status"],
  "success" | "destructive" | "info" | "warning"
> = {
  Active: "success",
  Blocked: "destructive",
  Inactive: "info",
  Pending: "warning",
};

const fmtUSD = (n: number) =>
  "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2 });

const footerSummaryColumns: ColumnDef<SummaryMember>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: ({ column }) =>
      React.createElement(DataTableColumnHeader, {
        column: column as any,
        title: "Practitioner",
      }),
    footer: ({ table }) => {
      const count = table.getFilteredRowModel().rows.length;
      return React.createElement(
        "div",
        { className: "flex flex-col gap-0.5" },
        React.createElement(
          "span",
          { className: "text-muted-foreground text-xs" },
          "Practitioners"
        ),
        React.createElement(
          "span",
          { className: "font-medium tabular-nums" },
          String(count)
        )
      );
    },
    cell: ({ row }) =>
      React.createElement(
        "div",
        { className: "flex items-center gap-3" },
        React.createElement(
          Avatar,
          { className: "size-8" },
          React.createElement(AvatarImage, {
            src: row.original.avatar,
            alt: row.original.name,
          }),
          React.createElement(
            AvatarFallback,
            null,
            getInitials(row.original.name)
          )
        ),
        React.createElement(
          "span",
          { className: "text-foreground font-medium" },
          row.original.name
        )
      ),
    size: 150,
    enableSorting: true,
  },
  {
    id: "location",
    accessorKey: "location",
    header: ({ column }) =>
      React.createElement(DataTableColumnHeader, {
        column: column as any,
        title: "Location",
      }),
    footer: ({ table }) => {
      const activeCount = table
        .getFilteredRowModel()
        .rows.filter(
          (r) => (r.getValue("status") as string) === "Active"
        ).length;
      return React.createElement(
        "div",
        { className: "flex items-center gap-1.5" },
        React.createElement(
          "span",
          { className: "text-muted-foreground text-xs" },
          "Active"
        ),
        React.createElement(Badge, { variant: "success" }, String(activeCount))
      );
    },
    cell: ({ row }) =>
      React.createElement(
        "div",
        { className: "flex items-center gap-1.5" },
        React.createElement("img", {
          src:
            "https://flagcdn.com/" + row.original.flag.toLowerCase() + ".svg",
          alt: row.original.flag,
          className: "size-4 rounded-full object-cover",
        }),
        React.createElement(
          "span",
          { className: "text-foreground font-medium" },
          row.original.location
        )
      ),
    size: 150,
    enableSorting: true,
  },
  {
    id: "status",
    accessorKey: "status",
    header: ({ column }) =>
      React.createElement(DataTableColumnHeader, {
        column: column as any,
        title: "Status",
      }),
    footer: ({ table }) => {
      const rows = table.getFilteredRowModel().rows;
      const avg = rows.length
        ? rows.reduce((sum, r) => sum + (r.getValue("balance") as number), 0) /
          rows.length
        : 0;
      return React.createElement(
        "div",
        { className: "flex flex-col gap-0.5" },
        React.createElement(
          "span",
          { className: "text-muted-foreground text-xs" },
          "Avg balance"
        ),
        React.createElement(
          "span",
          { className: "font-medium tabular-nums" },
          fmtUSD(avg)
        )
      );
    },
    cell: ({ row }) =>
      React.createElement(
        Badge,
        { variant: summaryStatusVariant[row.original.status] },
        row.original.status
      ),
    size: 110,
    enableSorting: true,
  },
  {
    id: "balance",
    accessorKey: "balance",
    header: ({ column }) =>
      React.createElement(DataTableColumnHeader, {
        column: column as any,
        title: "Balance",
      }),
    footer: ({ table }) => {
      const balances = table
        .getFilteredRowModel()
        .rows.map((r) => r.getValue("balance") as number);
      const min = balances.length ? Math.min(...balances) : 0;
      const max = balances.length ? Math.max(...balances) : 0;
      return React.createElement(
        "div",
        { className: "flex flex-col gap-0.5" },
        React.createElement(
          "span",
          { className: "text-muted-foreground text-xs" },
          "Min / Max"
        ),
        React.createElement(
          "span",
          { className: "font-medium tabular-nums" },
          fmtUSD(min) + " – " + fmtUSD(max)
        )
      );
    },
    cell: ({ row }) =>
      React.createElement(
        "span",
        { className: "text-foreground font-medium tabular-nums" },
        fmtUSD(row.original.balance)
      ),
    size: 130,
    enableSorting: true,
  },
];

const FooterSummaryDemo = () =>
  React.createElement(DataTable as any, {
    columns: footerSummaryColumns,
    data: summaryMembers,
    filterColumn: "name",
    filterPlaceholder: "Search practitioners...",
  });

// ─── Footer Aggregates data & columns ─────────────────────────────────────────

type AggregateMember = {
  id: string;
  name: string;
  avatar: string;
  status: "Active" | "Inactive" | "Pending" | "Blocked";
  balance: number;
  transactions: number;
};

const aggregateMembers: AggregateMember[] = [
  {
    id: "1",
    name: "Dr. Kiran Reddy",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&h=96&dpr=2&q=80",
    status: "Active",
    balance: 5143.03,
    transactions: 48,
  },
  {
    id: "2",
    name: "Dr. Anita Menon",
    avatar:
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=96&h=96&dpr=2&q=80",
    status: "Inactive",
    balance: 4321.87,
    transactions: 31,
  },
  {
    id: "3",
    name: "Dr. Suresh Pillai",
    avatar:
      "https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?w=96&h=96&dpr=2&q=80",
    status: "Blocked",
    balance: 7654.98,
    transactions: 67,
  },
  {
    id: "4",
    name: "Nurse Rekha Thomas",
    avatar:
      "https://images.unsplash.com/photo-1485893086445-ed75865251e0?w=96&h=96&dpr=2&q=80",
    status: "Inactive",
    balance: 3456.45,
    transactions: 22,
  },
  {
    id: "5",
    name: "Dr. Imran Sheikh",
    avatar:
      "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=96&h=96&dpr=2&q=80",
    status: "Active",
    balance: 9876.54,
    transactions: 93,
  },
  {
    id: "6",
    name: "Dr. Kavitha Nair",
    avatar:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=96&h=96&dpr=2&q=80",
    status: "Pending",
    balance: 6214.22,
    transactions: 55,
  },
  {
    id: "7",
    name: "Dr. Rajiv Kapoor",
    avatar:
      "https://images.unsplash.com/photo-1543299750-19d1d6297053?w=96&h=96&dpr=2&q=80",
    status: "Inactive",
    balance: 5321.77,
    transactions: 40,
  },
  {
    id: "8",
    name: "Nurse Sumathi K.",
    avatar:
      "https://images.unsplash.com/photo-1620075225255-8c2051b6c015?w=96&h=96&dpr=2&q=80",
    status: "Blocked",
    balance: 8452.39,
    transactions: 74,
  },
  {
    id: "9",
    name: "Dr. Farhan Hossain",
    avatar:
      "https://images.unsplash.com/photo-1485206412256-701ccc5b93ca?w=96&h=96&dpr=2&q=80",
    status: "Pending",
    balance: 7345.1,
    transactions: 61,
  },
  {
    id: "10",
    name: "Dr. Pooja Iyer",
    avatar:
      "https://images.unsplash.com/photo-1542595913-85d69b0edbaf?w=96&h=96&dpr=2&q=80",
    status: "Inactive",
    balance: 5214.88,
    transactions: 37,
  },
];

const aggregateStatusVariant: Record<
  AggregateMember["status"],
  "success" | "destructive" | "info" | "warning"
> = {
  Active: "success",
  Blocked: "destructive",
  Inactive: "info",
  Pending: "warning",
};

const fmtAggUSD = (n: number) =>
  "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2 });

const footerAggregateColumns: ColumnDef<AggregateMember>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: ({ column }) =>
      React.createElement(DataTableColumnHeader, {
        column: column as any,
        title: "Practitioner",
      }),
    footer: ({ table }) => {
      const count = table.getFilteredRowModel().rows.length;
      return React.createElement(
        "div",
        { className: "flex flex-col gap-0.5" },
        React.createElement(
          "span",
          { className: "text-muted-foreground text-xs" },
          "Summary"
        ),
        React.createElement(
          "span",
          { className: "text-foreground font-medium" },
          "Across all practitioners"
        ),
        React.createElement(
          "span",
          { className: "text-muted-foreground text-xs tabular-nums" },
          count + " practitioners"
        )
      );
    },
    cell: ({ row }) =>
      React.createElement(
        "div",
        { className: "flex items-center gap-3" },
        React.createElement(
          Avatar,
          { className: "size-8" },
          React.createElement(AvatarImage, {
            src: row.original.avatar,
            alt: row.original.name,
          }),
          React.createElement(
            AvatarFallback,
            null,
            getInitials(row.original.name)
          )
        ),
        React.createElement(
          "span",
          { className: "text-foreground font-medium" },
          row.original.name
        )
      ),
    size: 200,
    enableSorting: true,
  },
  {
    id: "status",
    accessorKey: "status",
    header: ({ column }) =>
      React.createElement(DataTableColumnHeader, {
        column: column as any,
        title: "Status",
      }),
    footer: () => null,
    cell: ({ row }) =>
      React.createElement(
        Badge,
        { variant: aggregateStatusVariant[row.original.status] },
        row.original.status
      ),
    size: 110,
    enableSorting: true,
  },
  {
    id: "balance",
    accessorKey: "balance",
    header: ({ column }) =>
      React.createElement(DataTableColumnHeader, {
        column: column as any,
        title: "Balance",
      }),
    footer: ({ table }) => {
      const rows = table.getFilteredRowModel().rows;
      const balances = rows.map((r) => r.getValue("balance") as number);
      const avg = balances.length
        ? balances.reduce((a, b) => a + b, 0) / balances.length
        : 0;
      const min = balances.length ? Math.min(...balances) : 0;
      const max = balances.length ? Math.max(...balances) : 0;
      return React.createElement(
        "div",
        { className: "flex flex-col gap-0.5" },
        React.createElement(
          "span",
          { className: "text-muted-foreground text-xs" },
          "Avg"
        ),
        React.createElement(
          "span",
          { className: "tabular-nums" },
          fmtAggUSD(avg)
        ),
        React.createElement(
          "span",
          { className: "text-muted-foreground text-xs tabular-nums" },
          fmtAggUSD(min) + " – " + fmtAggUSD(max)
        )
      );
    },
    cell: ({ row }) =>
      React.createElement(
        "span",
        { className: "text-foreground font-medium tabular-nums" },
        fmtAggUSD(row.original.balance)
      ),
    size: 130,
    enableSorting: true,
  },
  {
    id: "transactions",
    accessorKey: "transactions",
    header: ({ column }) =>
      React.createElement(DataTableColumnHeader, {
        column: column as any,
        title: "Encounters",
      }),
    footer: ({ table }) => {
      const rows = table.getFilteredRowModel().rows;
      const txns = rows.map((r) => r.getValue("transactions") as number);
      const avg = txns.length
        ? Math.round(txns.reduce((a, b) => a + b, 0) / txns.length)
        : 0;
      const min = txns.length ? Math.min(...txns) : 0;
      const max = txns.length ? Math.max(...txns) : 0;
      return React.createElement(
        "div",
        { className: "flex flex-col gap-0.5" },
        React.createElement(
          "span",
          { className: "text-muted-foreground text-xs" },
          "Avg"
        ),
        React.createElement("span", { className: "tabular-nums" }, String(avg)),
        React.createElement(
          "span",
          { className: "text-muted-foreground text-xs tabular-nums" },
          min + " – " + max
        )
      );
    },
    cell: ({ row }) =>
      React.createElement(
        "span",
        { className: "text-foreground font-medium tabular-nums" },
        String(row.original.transactions)
      ),
    size: 120,
    enableSorting: true,
  },
];

const FooterAggregatesDemo = () =>
  React.createElement(DataTable as any, {
    columns: footerAggregateColumns,
    data: aggregateMembers,
    filterColumn: "name",
    filterPlaceholder: "Search practitioners...",
  });

// ─── ComponentDoc ─────────────────────────────────────────────────────────────

export const dataTableDoc: ComponentDoc = {
  id: "data-table",
  name: "Data Table",
  description:
    "Powerful table and datagrids built using TanStack Table. Supports sorting, filtering, pagination, column visibility, and row selection.",
  installation: {
    cli: "npx shadcn@latest add table",
    manual:
      "Install @tanstack/react-table, add the Table component, then copy the DataTable component into your project.",
  },
  usage: `import { DataTable } from "@/components/ui/data-table"
import { type ColumnDef } from "@tanstack/react-table"

type Patient = {
  id: string
  name: string
  age: number
  ward: string
  diagnosis: string
  status: "admitted" | "critical" | "stable" | "discharged"
}

const columns: ColumnDef<Patient>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "ward", header: "Ward" },
  { accessorKey: "diagnosis", header: "Diagnosis" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={statusVariantMap[row.getValue("status")]}>
        {row.getValue("status")}
      </Badge>
    ),
  },
]

export function PatientListPage() {
  return <DataTable columns={columns} data={patients} filterColumn="name" />
}`,
  preview: {
    code: `"use client"

import * as React from "react"
import { type ColumnDef } from "@tanstack/react-table"

import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTable } from "@/components/ui/data-table"

type Member = {
  id: string
  name: string
  availability: "online" | "away" | "busy" | "offline"
  avatar: string
  flag: string
  email: string
  location: string
  joined: string
}

const availabilityColor = {
  online: "bg-green-500",
  away: "bg-yellow-500",
  busy: "bg-orange-500",
  offline: "bg-gray-400",
} as const

const columns: ColumnDef<Member>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        indeterminate={
          !table.getIsAllPageRowsSelected() &&
          table.getIsSomePageRowsSelected()
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    size: 20,
  },
  {
    accessorKey: "name",
    id: "name",
    header: "Name",
    size: 200,
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar className="size-8">
          <AvatarImage src={row.original.avatar} alt={row.original.name} />
          <AvatarFallback>
            {row.original.name.split(" ").map((n) => n[0]).join("")}
          </AvatarFallback>
          <AvatarBadge
            className={\`size-1.5! p-0 \${availabilityColor[row.original.availability]}\`}
          />
        </Avatar>
        <div className="space-y-px">
          <div className="text-foreground font-medium">{row.original.name}</div>
          <div className="text-muted-foreground">{row.original.email}</div>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "location",
    header: "Location",
    size: 180,
    cell: ({ row }) => (
      <div className="flex items-center gap-1.5">
        <img
          src={\`https://flagcdn.com/\${row.original.flag.toLowerCase()}.svg\`}
          alt={row.original.flag}
          className="size-4 rounded-full object-cover"
        />
        <div className="text-foreground font-medium">{row.original.location}</div>
      </div>
    ),
  },
  {
    accessorKey: "joined",
    header: "Joined",
    size: 120,
    cell: ({ row }) => (
      <span className="font-medium">{row.original.joined}</span>
    ),
  },
]

export function MemberListDemo() {
  return (
    <DataTable
      columns={columns}
      data={members}
      filterColumn="name"
      filterPlaceholder="Search practitioners..."
    />
  )
}`,
    component: React.createElement(PatientTableDemo),
  },
  examples: [
    {
      name: "Medication Administration",
      description:
        "Medication Administration Record (MAR) showing scheduled drugs, dose, route, and administration status for inpatients.",
      code: `"use client"

import { Badge } from "@/components/ui/badge"
import { DataTable } from "@/components/ui/data-table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { type ColumnDef } from "@tanstack/react-table"

type MedLog = {
  id: string
  patientId: string
  patientName: string
  medication: string
  dose: string
  route: string
  scheduledAt: string
  status: "given" | "pending" | "missed"
}

const statusVariant = {
  given:   "success",
  pending: "warning",
  missed:  "destructive",
} as const

const getInitials = (name: string) =>
  name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase()

const columns: ColumnDef<MedLog>[] = [
  {
    id: "patient",
    accessorKey: "patientName",
    header: "Patient",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar shape="rounded">
          <AvatarFallback>{getInitials(row.original.patientName)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium">{row.original.patientName}</span>
          <span className="text-muted-foreground text-xs">{row.original.patientId}</span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "medication",
    header: "Medication",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium text-sm">{row.original.medication}</span>
        <span className="text-muted-foreground text-xs">
          {row.original.dose} · {row.original.route}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "scheduledAt",
    header: "Scheduled",
    cell: ({ row }) => (
      <span className="font-medium tabular-nums text-sm">{row.getValue("scheduledAt")}</span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={statusVariant[row.getValue("status") as MedLog["status"]]}>
        {row.getValue("status")}
      </Badge>
    ),
  },
]

export function MedicationAdministrationTable() {
  return (
    <DataTable
      columns={columns}
      data={medLogs}
      filterColumn="patientName"
      filterPlaceholder="Search by patient..."
    />
  )
}`,
      preview: React.createElement(MedLogDemo),
    },
    {
      name: "Invoices",
      description:
        "Billing and invoice management with sortable amounts, category badges, payment status, and row-level actions.",
      code: `"use client"

import { Badge } from "@/components/ui/badge"
import {
  DataTable,
  DataTableColumnHeader,
  DataTableRowActions,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/data-table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { type ColumnDef } from "@tanstack/react-table"

type Invoice = {
  id: string
  patientName: string
  patientId: string
  date: string
  category: string
  amount: number
  status: "paid" | "pending" | "overdue"
}

const statusVariant = {
  paid:    "success",
  pending: "warning",
  overdue: "destructive",
} as const

const getInitials = (name: string) =>
  name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase()

const formatINR = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount)

export const columns: ColumnDef<Invoice>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Invoice #" />,
    cell: ({ row }) => (
      <span className="font-mono text-sm font-medium">{row.getValue("id")}</span>
    ),
  },
  {
    id: "patient",
    accessorKey: "patientName",
    header: "Patient",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar shape="rounded">
          <AvatarFallback>{getInitials(row.original.patientName)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium">{row.original.patientName}</span>
          <span className="text-muted-foreground text-xs">{row.original.patientId}</span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "date",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Date" />,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <Badge variant="neutral">{row.getValue("category")}</Badge>,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Amount" />,
    meta: { className: "text-right" },
    cell: ({ row }) => (
      <div className="font-medium tabular-nums">{formatINR(row.getValue("amount"))}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={statusVariant[row.getValue("status") as Invoice["status"]]}>
        {row.getValue("status")}
      </Badge>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    meta: { className: "w-0" },
    cell: ({ row }) => (
      <DataTableRowActions>
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(row.original.id)}
        >
          Copy invoice ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>View invoice</DropdownMenuItem>
        <DropdownMenuItem>Download PDF</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Mark as paid</DropdownMenuItem>
        <DropdownMenuItem className="text-destructive">Void invoice</DropdownMenuItem>
      </DataTableRowActions>
    ),
  },
]

export function InvoiceTable() {
  return (
    <DataTable
      columns={columns}
      data={invoices}
      filterColumn="patientName"
      filterPlaceholder="Search by patient..."
    />
  )
}`,
      preview: React.createElement(InvoiceDemo),
    },
    {
      name: "Sortable Columns",
      description:
        "Staff directory with sortable name, department, designation, and experience columns. Click any column header to toggle ascending / descending order.",
      code: `"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DataTable, DataTableColumnHeader } from "@/components/ui/data-table"
import { type ColumnDef } from "@tanstack/react-table"

type StaffMember = {
  id: string
  name: string
  email: string
  department: string
  designation: string
  joined: string
  experience: number
  status: "active" | "inactive"
}

const staffMembers: StaffMember[] = [
  { id: "STAFF-001", name: "Dr. Kiran Reddy",       email: "kiran.reddy@ohc.in",    department: "Cardiology",       designation: "Senior Consultant",  joined: "Jan 2018", experience: 12, status: "active"   },
  { id: "STAFF-002", name: "Dr. Anita Menon",        email: "anita.menon@ohc.in",    department: "Pediatrics",       designation: "Consultant",          joined: "Mar 2020", experience:  8, status: "active"   },
  { id: "STAFF-003", name: "Dr. Suresh Pillai",      email: "suresh.pillai@ohc.in",  department: "Surgery",          designation: "Head of Department",  joined: "Jun 2015", experience: 15, status: "active"   },
  { id: "STAFF-004", name: "Nurse Rekha Thomas",     email: "rekha.thomas@ohc.in",   department: "ICU",              designation: "Senior Nurse",        joined: "Sep 2019", experience:  6, status: "inactive" },
  { id: "STAFF-005", name: "Dr. Imran Sheikh",       email: "imran.sheikh@ohc.in",   department: "Orthopedics",      designation: "Consultant",          joined: "Nov 2017", experience: 10, status: "active"   },
  { id: "STAFF-006", name: "Nurse Preethi Sajan",    email: "preethi.sajan@ohc.in",  department: "General Medicine", designation: "Staff Nurse",         joined: "Feb 2022", experience:  3, status: "active"   },
  { id: "STAFF-007", name: "Dr. Kavitha Nair",       email: "kavitha.nair@ohc.in",   department: "Neurology",        designation: "Senior Consultant",  joined: "Aug 2016", experience: 14, status: "active"   },
  { id: "STAFF-008", name: "Dr. Rajiv Kapoor",       email: "rajiv.kapoor@ohc.in",   department: "Radiology",        designation: "Consultant",          joined: "Dec 2021", experience:  5, status: "inactive" },
  { id: "STAFF-009", name: "Nurse Sumathi Krishnan", email: "sumathi.k@ohc.in",      department: "Maternity",        designation: "Senior Nurse",        joined: "Apr 2018", experience:  9, status: "active"   },
  { id: "STAFF-010", name: "Dr. Farhan Hossain",     email: "farhan.hossain@ohc.in", department: "Oncology",         designation: "Consultant",          joined: "Jul 2020", experience:  7, status: "active"   },
  { id: "STAFF-011", name: "Dr. Pooja Iyer",         email: "pooja.iyer@ohc.in",     department: "Dermatology",      designation: "Consultant",          joined: "May 2023", experience:  4, status: "active"   },
  { id: "STAFF-012", name: "Nurse Arun Mathew",      email: "arun.mathew@ohc.in",    department: "Emergency",        designation: "Charge Nurse",        joined: "Oct 2019", experience:  6, status: "inactive" },
]

const getInitials = (name: string) =>
  name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase()

const columns: ColumnDef<StaffMember>[] = [
  {
    id: "staff",
    accessorKey: "name",
    enableSorting: true,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Staff" />,
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar shape="circle">
          <AvatarFallback>{getInitials(row.original.name)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium">{row.original.name}</span>
          <span className="text-muted-foreground text-xs">{row.original.email}</span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "department",
    enableSorting: true,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Department" />,
  },
  {
    accessorKey: "designation",
    enableSorting: true,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Designation" />,
  },
  {
    accessorKey: "experience",
    enableSorting: true,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Experience" />,
    cell: ({ row }) => (
      <span className="tabular-nums">{row.getValue("experience")} yrs</span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={row.getValue("status") === "active" ? "success" : "neutral"}>
        {row.getValue("status")}
      </Badge>
    ),
  },
]

export function SortableStaffTable() {
  return (
    <DataTable
      columns={columns}
      data={staffMembers}
      filterColumn="name"
      filterPlaceholder="Search staff..."
    />
  )
}`,

      preview: React.createElement(SortablePatientDemo),
    },
    {
      name: "Movable Columns",
      description:
        "Click any column header to open a dropdown with sort options (Asc / Desc) and column reordering actions (Move to Left, Move to Right). Powered by TanStack Table's `columnOrder` state — no extra dependencies required.",
      code: `"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DataTable, DataTableColumnHeader } from "@/components/ui/data-table"
import { type ColumnDef } from "@tanstack/react-table"

type StaffMember = {
  id: string
  name: string
  email: string
  department: string
  designation: string
  joined: string
  experience: number
  status: "active" | "inactive"
}

const staffMembers: StaffMember[] = [
  { id: "STAFF-001", name: "Dr. Kiran Reddy",       email: "kiran.reddy@ohc.in",    department: "Cardiology",       designation: "Senior Consultant", joined: "Jan 2018", experience: 12, status: "active"   },
  { id: "STAFF-002", name: "Dr. Anita Menon",        email: "anita.menon@ohc.in",    department: "Pediatrics",       designation: "Consultant",         joined: "Mar 2020", experience:  8, status: "active"   },
  { id: "STAFF-003", name: "Dr. Suresh Pillai",      email: "suresh.pillai@ohc.in",  department: "Surgery",          designation: "Head of Department", joined: "Jun 2015", experience: 15, status: "active"   },
  { id: "STAFF-004", name: "Nurse Rekha Thomas",     email: "rekha.thomas@ohc.in",   department: "ICU",              designation: "Senior Nurse",       joined: "Sep 2019", experience:  6, status: "inactive" },
  { id: "STAFF-005", name: "Dr. Imran Sheikh",       email: "imran.sheikh@ohc.in",   department: "Orthopedics",      designation: "Consultant",         joined: "Nov 2017", experience: 10, status: "active"   },
  { id: "STAFF-006", name: "Nurse Preethi Sajan",    email: "preethi.sajan@ohc.in",  department: "General Medicine", designation: "Staff Nurse",        joined: "Feb 2022", experience:  3, status: "active"   },
  { id: "STAFF-007", name: "Dr. Kavitha Nair",       email: "kavitha.nair@ohc.in",   department: "Neurology",        designation: "Senior Consultant", joined: "Aug 2016", experience: 14, status: "active"   },
  { id: "STAFF-008", name: "Dr. Rajiv Kapoor",       email: "rajiv.kapoor@ohc.in",   department: "Radiology",        designation: "Consultant",         joined: "Dec 2021", experience:  5, status: "inactive" },
  { id: "STAFF-009", name: "Nurse Sumathi Krishnan", email: "sumathi.k@ohc.in",      department: "Maternity",        designation: "Senior Nurse",       joined: "Apr 2018", experience:  9, status: "active"   },
  { id: "STAFF-010", name: "Dr. Farhan Hossain",     email: "farhan.hossain@ohc.in", department: "Oncology",         designation: "Consultant",         joined: "Jul 2020", experience:  7, status: "active"   },
  { id: "STAFF-011", name: "Dr. Pooja Iyer",         email: "pooja.iyer@ohc.in",     department: "Dermatology",      designation: "Consultant",         joined: "May 2023", experience:  4, status: "active"   },
  { id: "STAFF-012", name: "Nurse Arun Mathew",      email: "arun.mathew@ohc.in",    department: "Emergency",        designation: "Charge Nurse",       joined: "Oct 2019", experience:  6, status: "inactive" },
]

const getInitials = (name: string) =>
  name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase()

const columns: ColumnDef<StaffMember>[] = [
  {
    id: "staff",
    accessorKey: "name",
    enableSorting: true,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Staff" />,
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar shape="circle">
          <AvatarFallback>{getInitials(row.original.name)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium">{row.original.name}</span>
          <span className="text-muted-foreground text-xs">{row.original.email}</span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "department",
    enableSorting: true,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Department" />,
  },
  {
    accessorKey: "designation",
    enableSorting: true,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Designation" />,
  },
  {
    accessorKey: "experience",
    enableSorting: true,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Experience" />,
    cell: ({ row }) => (
      <span className="tabular-nums">{row.getValue("experience")} yrs</span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={row.getValue("status") === "active" ? "success" : "neutral"}>
        {row.getValue("status")}
      </Badge>
    ),
  },
]

export function MovableStaffTable() {
  return (
    <DataTable
      columns={columns}
      data={staffMembers}
      filterColumn="name"
      filterPlaceholder="Search staff..."
      movableColumns
    />
  )
}`,
      preview: React.createElement(MovableColumnsDemo),
    },
    {
      name: "Draggable Columns",
      description:
        "Drag column headers to reorder them using @dnd-kit. Each header shows a grip handle that users can grab to move columns left or right.",
      code: `"use client"

import React, { useMemo, useRef, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable"
import {
  type ColumnDef,
  type Header,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { GripVertical } from "lucide-react"

type Member = {
  id: string
  name: string
  avatar: string
  email: string
  company: string
  role: string
  status: "active" | "inactive"
}

const members: Member[] = [
  { id: "1",  name: "Dr. Anika Sharma",     avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&h=96&dpr=2&q=80", email: "anika.sharma@ohc.in",     company: "Cardiology",       role: "Senior Consultant",    status: "active"   },
  { id: "2",  name: "Dr. Sarah Mitchell",   avatar: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=96&h=96&dpr=2&q=80", email: "sarah.mitchell@ohc.in",   company: "Pediatrics",       role: "Consultant",           status: "inactive" },
  { id: "3",  name: "Dr. David Okafor",     avatar: "https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?w=96&h=96&dpr=2&q=80", email: "david.okafor@ohc.in",     company: "General Surgery",  role: "Head of Department",   status: "active"   },
  { id: "4",  name: "Nurse Elena Fischer",  avatar: "https://images.unsplash.com/photo-1485893086445-ed75865251e0?w=96&h=96&dpr=2&q=80", email: "elena.fischer@ohc.in",    company: "ICU",              role: "Senior Nurse",         status: "inactive" },
  { id: "5",  name: "Dr. Hiroshi Tanaka",   avatar: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=96&h=96&dpr=2&q=80", email: "hiroshi.tanaka@ohc.in",   company: "Orthopedics",      role: "Consultant",           status: "inactive" },
  { id: "6",  name: "Dr. Ravi Menon",       avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=96&h=96&dpr=2&q=80", email: "ravi.menon@ohc.in",       company: "Neurology",        role: "Senior Consultant",    status: "active"   },
  { id: "7",  name: "Dr. Carlos Rivera",    avatar: "https://images.unsplash.com/photo-1543299750-19d1d6297053?w=96&h=96&dpr=2&q=80", email: "carlos.rivera@ohc.in",    company: "Radiology",        role: "Consultant",           status: "inactive" },
  { id: "8",  name: "Nurse Mei Lin Wong",   avatar: "https://images.unsplash.com/photo-1620075225255-8c2051b6c015?w=96&h=96&dpr=2&q=80", email: "mei.wong@ohc.in",         company: "Maternity",        role: "Senior Nurse",         status: "inactive" },
  { id: "9",  name: "Dr. Siddharth Patel",  avatar: "https://images.unsplash.com/photo-1485206412256-701ccc5b93ca?w=96&h=96&dpr=2&q=80", email: "siddharth.patel@ohc.in",  company: "Oncology",         role: "Consultant",           status: "inactive" },
  { id: "10", name: "Dr. Amara Diallo",     avatar: "https://images.unsplash.com/photo-1542595913-85d69b0edbaf?w=96&h=96&dpr=2&q=80", email: "amara.diallo@ohc.in",     company: "Dermatology",      role: "Consultant",           status: "inactive" },
  { id: "11", name: "Nurse Arun Mathew",    avatar: "https://images.unsplash.com/photo-1619946794135-5bc917a27793?w=96&h=96&dpr=2&q=80", email: "arun.mathew@ohc.in",      company: "General Medicine", role: "Staff Physician",      status: "active"   },
]

const columns: ColumnDef<Member>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar shape="circle">
          <AvatarImage src={row.original.avatar} alt={row.original.name} />
          <AvatarFallback>{getInitials(row.original.name)}</AvatarFallback>
        </Avatar>
        <span className="font-medium text-sm">{row.original.name}</span>
      </div>
    ),
  },
  { id: "email",   accessorKey: "email",   header: "Email",        cell: ({ row }) => <span className="text-muted-foreground text-sm">{row.original.email}</span> },
  { id: "company", accessorKey: "company", header: "Department",   cell: ({ row }) => <span className="font-medium text-sm">{row.original.company}</span> },
  { id: "role",    accessorKey: "role",    header: "Designation",  cell: ({ row }) => <span className="text-sm">{row.original.role}</span> },
  {
    id: "status",
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) =>
      row.original.status === "active"
        ? <Badge variant="success">Active</Badge>
        : <Badge variant="warning">On Leave</Badge>,
  },
]

function SortableColumnHeader({
  header,
  transform,
  isDragging,
  noTransition,
  onRef,
}: {
  header: Header<Member, unknown>
  transform: number
  isDragging: boolean
  noTransition: boolean
  onRef: (el: HTMLElement | null) => void
}) {
  const { attributes, listeners, setNodeRef } = useSortable({ id: header.id })
  return (
    <TableHead
      ref={(el) => { setNodeRef(el); onRef(el) }}
      colSpan={header.colSpan}
      style={{
        opacity: isDragging ? 0.4 : 1,
        transform: transform !== 0 ? \`translateX(\${transform}px)\` : undefined,
        position: transform !== 0 || isDragging ? "relative" : undefined,
        zIndex: isDragging ? 10 : undefined,
        transition: (isDragging || noTransition) ? "none" : "transform 100ms ease",
      }}
    >
      <div className="flex items-center gap-1">
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab touch-none text-muted-foreground/50 hover:text-muted-foreground active:cursor-grabbing"
          aria-label="Drag to reorder column"
        >
          <GripVertical className="size-3.5" />
        </button>
        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
      </div>
    </TableHead>
  )
}

export function DraggableColumnsTable() {
  const [columnOrder, setColumnOrder] = useState<string[]>(
    columns.map((c) => c.id as string)
  )
  const [activeId, setActiveId] = useState<string | null>(null)
  const [overId, setOverId] = useState<string | null>(null)
  const [activeDelta, setActiveDelta] = useState(0)
  const [noTransition, setNoTransition] = useState(false)
  const headerRefs = useRef<Record<string, HTMLElement | null>>({})

  const displacements = useMemo<Record<string, number>>(() => {
    if (!activeId || !overId) return {}
    const activeIdx = columnOrder.indexOf(activeId)
    const overIdx = columnOrder.indexOf(overId)
    if (activeIdx === overIdx) return {}
    const activeWidth = headerRefs.current[activeId]?.offsetWidth ?? 0
    const result: Record<string, number> = {}
    for (const id of columnOrder) {
      if (id === activeId) continue
      const idx = columnOrder.indexOf(id)
      if (activeIdx < overIdx && idx > activeIdx && idx <= overIdx)
        result[id] = -activeWidth
      else if (activeIdx > overIdx && idx < activeIdx && idx >= overIdx)
        result[id] = activeWidth
    }
    return result
  }, [activeId, overId, columnOrder])

  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor))

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setNoTransition(true)
    if (active && over && active.id !== over.id) {
      setColumnOrder((order) => {
        const oldIdx = order.indexOf(active.id as string)
        const newIdx = order.indexOf(over.id as string)
        return arrayMove(order, oldIdx, newIdx)
      })
    }
    setActiveId(null)
    setOverId(null)
    setActiveDelta(0)
    requestAnimationFrame(() => setNoTransition(false))
  }

  const table = useReactTable({
    data: members,
    columns,
    state: { columnOrder },
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={({ active }) => { setActiveId(active.id as string); setOverId(active.id as string); setActiveDelta(0) }}
      onDragMove={({ delta }) => setActiveDelta(delta.x)}
      onDragOver={({ over }) => setOverId(over?.id as string ?? null)}
      onDragEnd={handleDragEnd}
      onDragCancel={() => { setNoTransition(true); setActiveId(null); setOverId(null); setActiveDelta(0); requestAnimationFrame(() => setNoTransition(false)) }}
    >
      <div className="overflow-hidden rounded-md border [&_th:first-child:not(:has([data-slot=checkbox])):is(:has([data-slot=button]),:has([data-slot=dropdown-menu-trigger]))_:is([data-slot=button],[data-slot=dropdown-menu-trigger])]:-ms-1 [&_th:not(:first-child):is(:has([data-slot=button]),:has([data-slot=dropdown-menu-trigger]))_:is([data-slot=button],[data-slot=dropdown-menu-trigger])]:-ms-3 [&_td:not(:last-child)]:border-r [&_th:not(:last-child)]:border-r">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                <SortableContext items={columnOrder} strategy={horizontalListSortingStrategy}>
                  {headerGroup.headers.map((header) => (
                    <SortableColumnHeader
                      key={header.id}
                      header={header}
                      transform={activeId === header.id ? activeDelta : (displacements[header.id] ?? 0)}
                      isDragging={activeId === header.id}
                      noTransition={noTransition}
                      onRef={(el) => { headerRefs.current[header.id] = el }}
                    />
                  ))}
                </SortableContext>
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  const dragging = activeId === cell.column.id
                  const tx = dragging ? activeDelta : (displacements[cell.column.id] ?? 0)
                  return (
                    <TableCell
                      key={cell.id}
                      style={tx !== 0 || dragging ? {
                        transform: \`translateX(\${tx}px)\`,
                        position: "relative",
                        zIndex: dragging ? 10 : undefined,
                        opacity: dragging ? 0.6 : 1,
                        transition: (dragging || noTransition) ? "none" : "transform 100ms ease",
                      } : undefined}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  )
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </DndContext>
  )
}`,
      preview: React.createElement(DraggableColumnsDemo),
    },
    {
      name: "Resizable Columns",
      description:
        'Drag the edge of any column header to resize it. Set `enableResizing: false` on a column to lock its width. Uses TanStack Table\'s built-in `columnResizeMode: "onChange"` — no extra dependencies required.',
      code: `"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

type Member = {
  id: string
  name: string
  avatar: string
  email: string
  company: string
  role: string
  status: "active" | "inactive"
}

const members: Member[] = [
  { id: "1",  name: "Dr. Anika Sharma",     avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&h=96&dpr=2&q=80", email: "anika.sharma@ohc.in",     company: "Cardiology",       role: "Senior Consultant",    status: "active"   },
  { id: "2",  name: "Dr. Sarah Mitchell",   avatar: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=96&h=96&dpr=2&q=80", email: "sarah.mitchell@ohc.in",   company: "Pediatrics",       role: "Consultant",           status: "inactive" },
  { id: "3",  name: "Dr. David Okafor",     avatar: "https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?w=96&h=96&dpr=2&q=80", email: "david.okafor@ohc.in",     company: "General Surgery",  role: "Head of Department",   status: "active"   },
  { id: "4",  name: "Nurse Elena Fischer",  avatar: "https://images.unsplash.com/photo-1485893086445-ed75865251e0?w=96&h=96&dpr=2&q=80", email: "elena.fischer@ohc.in",    company: "ICU",              role: "Senior Nurse",         status: "inactive" },
  { id: "5",  name: "Dr. Hiroshi Tanaka",   avatar: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=96&h=96&dpr=2&q=80", email: "hiroshi.tanaka@ohc.in",   company: "Orthopedics",      role: "Consultant",           status: "inactive" },
  { id: "6",  name: "Dr. Ravi Menon",       avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=96&h=96&dpr=2&q=80", email: "ravi.menon@ohc.in",       company: "Neurology",        role: "Senior Consultant",    status: "active"   },
  { id: "7",  name: "Dr. Carlos Rivera",    avatar: "https://images.unsplash.com/photo-1543299750-19d1d6297053?w=96&h=96&dpr=2&q=80", email: "carlos.rivera@ohc.in",    company: "Radiology",        role: "Consultant",           status: "inactive" },
  { id: "8",  name: "Nurse Mei Lin Wong",   avatar: "https://images.unsplash.com/photo-1620075225255-8c2051b6c015?w=96&h=96&dpr=2&q=80", email: "mei.wong@ohc.in",         company: "Maternity",        role: "Senior Nurse",         status: "inactive" },
  { id: "9",  name: "Dr. Siddharth Patel",  avatar: "https://images.unsplash.com/photo-1485206412256-701ccc5b93ca?w=96&h=96&dpr=2&q=80", email: "siddharth.patel@ohc.in",  company: "Oncology",         role: "Consultant",           status: "inactive" },
  { id: "10", name: "Dr. Amara Diallo",     avatar: "https://images.unsplash.com/photo-1542595913-85d69b0edbaf?w=96&h=96&dpr=2&q=80", email: "amara.diallo@ohc.in",     company: "Dermatology",      role: "Consultant",           status: "inactive" },
  { id: "11", name: "Nurse Arun Mathew",    avatar: "https://images.unsplash.com/photo-1619946794135-5bc917a27793?w=96&h=96&dpr=2&q=80", email: "arun.mathew@ohc.in",      company: "General Medicine", role: "Staff Physician",      status: "active"   },
]

const getInitials = (name: string) =>
  name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase()

const columns: ColumnDef<Member>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: "Staff",
    size: 280,
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar shape="circle">
          <AvatarImage src={row.original.avatar} alt={row.original.name} />
          <AvatarFallback>{getInitials(row.original.name)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium text-sm">{row.original.name}</span>
          <span className="text-muted-foreground text-xs">{row.original.email}</span>
        </div>
      </div>
    ),
  },
  {
    id: "company",
    accessorKey: "company",
    header: "Department",
    size: 160,
    cell: ({ row }) => <span className="font-medium text-sm">{row.original.company}</span>,
  },
  {
    id: "role",
    accessorKey: "role",
    header: "Designation",
    size: 160,
    cell: ({ row }) => <span className="text-sm">{row.original.role}</span>,
  },
  {
    id: "status",
    accessorKey: "status",
    header: "Status",
    size: 120,
    enableResizing: false,
    cell: ({ row }) =>
      row.original.status === "active"
        ? <Badge variant="success">Active</Badge>
        : <Badge variant="warning">On Leave</Badge>,
  },
]

export function ResizableColumnsTable() {
  const table = useReactTable({
    data: members,
    columns,
    columnResizeMode: "onChange",
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="overflow-x-auto overflow-hidden rounded-md border [&_th:first-child:not(:has([data-slot=checkbox])):is(:has([data-slot=button]),:has([data-slot=dropdown-menu-trigger]))_:is([data-slot=button],[data-slot=dropdown-menu-trigger])]:-ms-1 [&_th:not(:first-child):is(:has([data-slot=button]),:has([data-slot=dropdown-menu-trigger]))_:is([data-slot=button],[data-slot=dropdown-menu-trigger])]:-ms-3 [&_td:not(:last-child)]:border-r [&_th:not(:last-child)]:border-r">
      <Table style={{ width: table.getTotalSize() }}>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  style={{ width: header.getSize() }}
                  className="relative overflow-hidden"
                >
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  {header.column.getCanResize() && (
                    <div
                      onMouseDown={header.getResizeHandler()}
                      onTouchStart={header.getResizeHandler()}
                      className={\`absolute top-0 right-0 h-full w-1 cursor-col-resize touch-none select-none transition-colors \${
                        header.column.getIsResizing() ? "bg-primary" : "bg-transparent hover:bg-border"
                      }\`}
                    />
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} style={{ width: cell.column.getSize() }}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}`,
      preview: React.createElement(ResizableColumnsDemo),
    },
    {
      name: "Pinnable Columns",
      description:
        "Click the pin icon in any column header to stick it to the left edge while the rest of the table scrolls. Click the filled pin to unpin. The Name column is pinned by default. Columns are sortable and the table is paginated.",
      code: `"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DataTable, DataTableColumnHeader } from "@/components/ui/data-table"
import { type ColumnDef } from "@tanstack/react-table"

type Member = {
  id: string
  name: string
  availability: "online" | "away" | "busy" | "offline"
  avatar: string
  status: "active" | "inactive"
  flag: string
  email: string
  company: string
  role: string
  joined: string
  location: string
}

const members: Member[] = [
  { id: "1",  name: "Dr. Anika Sharma",      availability: "online",  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&h=96&dpr=2&q=80", status: "active",   flag: "in", email: "anika.sharma@ohc.in",      company: "Cardiology",       role: "Senior Consultant",     joined: "Jan, 2024", location: "India"          },
  { id: "2",  name: "Dr. Sarah Mitchell",    availability: "away",    avatar: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=96&h=96&dpr=2&q=80", status: "inactive", flag: "gb", email: "sarah.mitchell@ohc.in",    company: "Pediatrics",       role: "Consultant",            joined: "Mar, 2023", location: "United Kingdom" },
  { id: "3",  name: "Dr. David Okafor",      availability: "busy",    avatar: "https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?w=96&h=96&dpr=2&q=80", status: "active",   flag: "ng", email: "david.okafor@ohc.in",      company: "General Surgery",  role: "Head of Department",    joined: "Jun, 2022", location: "Nigeria"        },
  { id: "4",  name: "Nurse Elena Fischer",   availability: "offline", avatar: "https://images.unsplash.com/photo-1485893086445-ed75865251e0?w=96&h=96&dpr=2&q=80", status: "inactive", flag: "de", email: "elena.fischer@ohc.in",     company: "ICU",              role: "Senior Nurse",          joined: "Sep, 2024", location: "Germany"        },
  { id: "5",  name: "Dr. Hiroshi Tanaka",    availability: "online",  avatar: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=96&h=96&dpr=2&q=80", status: "active",   flag: "jp", email: "hiroshi.tanaka@ohc.in",    company: "Orthopedics",      role: "Consultant",            joined: "Nov, 2023", location: "Japan"          },
  { id: "6",  name: "Dr. Ravi Menon",        availability: "away",    avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=96&h=96&dpr=2&q=80", status: "active",   flag: "in", email: "ravi.menon@ohc.in",        company: "Neurology",        role: "Senior Consultant",     joined: "Feb, 2022", location: "India"          },
  { id: "7",  name: "Dr. Carlos Rivera",     availability: "busy",    avatar: "https://images.unsplash.com/photo-1543299750-19d1d6297053?w=96&h=96&dpr=2&q=80", status: "inactive", flag: "es", email: "carlos.rivera@ohc.in",     company: "Radiology",        role: "Consultant",            joined: "Aug, 2024", location: "Spain"          },
  { id: "8",  name: "Nurse Mei Lin Wong",    availability: "offline", avatar: "https://images.unsplash.com/photo-1620075225255-8c2051b6c015?w=96&h=96&dpr=2&q=80", status: "active",   flag: "sg", email: "mei.wong@ohc.in",          company: "Maternity",        role: "Senior Nurse",          joined: "Dec, 2023", location: "Singapore"      },
  { id: "9",  name: "Dr. Siddharth Patel",   availability: "online",  avatar: "https://images.unsplash.com/photo-1485206412256-701ccc5b93ca?w=96&h=96&dpr=2&q=80", status: "inactive", flag: "in", email: "siddharth.patel@ohc.in",   company: "Oncology",         role: "Consultant",            joined: "Apr, 2022", location: "India"          },
  { id: "10", name: "Dr. Amara Diallo",      availability: "away",    avatar: "https://images.unsplash.com/photo-1542595913-85d69b0edbaf?w=96&h=96&dpr=2&q=80", status: "inactive", flag: "sn", email: "amara.diallo@ohc.in",      company: "Dermatology",      role: "Consultant",            joined: "Jul, 2024", location: "Senegal"        },
  { id: "11", name: "Dr. Priya Krishnan",    availability: "busy",    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&h=96&dpr=2&q=80", status: "active",   flag: "in", email: "priya.krishnan@ohc.in",    company: "General Medicine", role: "Staff Physician",       joined: "May, 2023", location: "India"          },
  { id: "12", name: "Nurse Rekha Thomas",    availability: "offline", avatar: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=96&h=96&dpr=2&q=80", status: "active",   flag: "in", email: "rekha.thomas@ohc.in",      company: "Emergency",        role: "Charge Nurse",          joined: "Oct, 2024", location: "India"          },
]

const columns: ColumnDef<Member>[] = [
  {
    id: "name",
    accessorKey: "name",
    size: 220,
    enableSorting: true,
    enableHiding: false,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Avatar className="size-6" shape="circle">
          <AvatarImage src={row.original.avatar} alt={row.original.name} />
          <AvatarFallback>
            {row.original.name.split(" ").map((n) => n[0]).join("")}
          </AvatarFallback>
        </Avatar>
        <span className="text-foreground font-medium whitespace-nowrap">{row.original.name}</span>
      </div>
    ),
  },
  {
    id: "email",
    accessorKey: "email",
    size: 220,
    enableSorting: true,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
    cell: ({ row }) => (
      <span className="text-muted-foreground text-sm whitespace-nowrap">{row.original.email}</span>
    ),
  },
  {
    id: "location",
    accessorKey: "location",
    size: 180,
    enableSorting: true,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Location" />,
    cell: ({ row }) => (
      <div className="flex items-center gap-1.5">
        <img
          src={\`https://flagcdn.com/\${row.original.flag.toLowerCase()}.svg\`}
          alt={row.original.flag}
          className="size-4 rounded-full object-cover"
        />
        <span className="text-foreground font-medium whitespace-nowrap">{row.original.location}</span>
      </div>
    ),
  },
  {
    id: "company",
    accessorKey: "company",
    size: 160,
    enableSorting: true,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Department" />,
    cell: ({ row }) => (
      <span className="font-medium text-sm whitespace-nowrap">{row.original.company}</span>
    ),
  },
  {
    id: "role",
    accessorKey: "role",
    size: 180,
    enableSorting: true,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Designation" />,
    cell: ({ row }) => (
      <span className="text-sm whitespace-nowrap">{row.original.role}</span>
    ),
  },
  {
    id: "joined",
    accessorKey: "joined",
    size: 120,
    enableSorting: true,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Joined" />,
    cell: ({ row }) => (
      <span className="font-medium text-sm whitespace-nowrap">{row.original.joined}</span>
    ),
  },
  {
    id: "status",
    accessorKey: "status",
    size: 140,
    enableSorting: false,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) =>
      row.original.status === "active"
        ? <Badge variant="success">Active</Badge>
        : <Badge variant="warning">On Leave</Badge>,
  },
]

export function PinnableColumnsTable() {
  return (
    <DataTable
      columns={columns}
      data={members}
      filterColumn="name"
      filterPlaceholder="Search practitioners..."
      pinnable
      initialPinning={{ left: ["name"] }}
    />
  )
}`,

      preview: React.createElement(PinnableColumnsDemo),
    },
    {
      name: "Cell Border",
      description:
        "Adds vertical borders between columns for a spreadsheet-like grid feel — useful for dense financial or clinical data tables.",
      code: `"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DataTable, DataTableColumnHeader } from "@/components/ui/data-table"
import { type ColumnDef } from "@tanstack/react-table"

const getInitials = (name: string) =>
  name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase()

const patientStatusVariant = {
  stable:     "success",
  admitted:   "info",
  critical:   "destructive",
  discharged: "neutral",
} as const

const columns: ColumnDef<Patient>[] = [
  {
    id: "patient",
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar shape="rounded">
          <AvatarFallback>{getInitials(row.original.name)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium">{row.original.name}</span>
          <span className="text-muted-foreground text-xs">{row.original.id}</span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "ward",
    header: "Ward",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium text-sm">{row.original.ward}</span>
        <span className="text-muted-foreground text-xs">{row.original.bed}</span>
      </div>
    ),
  },
  {
    accessorKey: "diagnosis",
    header: "Diagnosis",
  },
  {
    accessorKey: "amount",
    header: "Invoice",
    meta: { className: "text-right" },
    cell: ({ row }) => (
      <span className="font-semibold tabular-nums">
        {formatINR(row.original.amount)}
      </span>
    ),
  },
]

export function CellBorderTable() {
  return (
    <DataTable
      columns={columns}
      data={patients}
      filterColumn="name"
      filterPlaceholder="Search patients..."
      cellBorder
    />
  )
}`,
      preview: React.createElement(CellBorderDemo),
    },
    {
      name: "Dense Table",
      description:
        "Compact row padding for high-density clinical views like vitals logs, lab results, or medication schedules where many rows need to be visible at once.",
      code: `"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DataTable } from "@/components/ui/data-table"
import { type ColumnDef } from "@tanstack/react-table"

const getInitials = (name: string) =>
  name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase()

const patientStatusVariant = {
  stable:     "success",
  admitted:   "info",
  critical:   "destructive",
  discharged: "neutral",
} as const

const columns: ColumnDef<Patient>[] = [
  {
    id: "patient",
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar shape="rounded">
          <AvatarFallback>{getInitials(row.original.name)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium">{row.original.name}</span>
          <span className="text-muted-foreground text-xs">{row.original.id}</span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "ward",
    header: "Ward",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium text-sm">{row.original.ward}</span>
        <span className="text-muted-foreground text-xs">{row.original.bed}</span>
      </div>
    ),
  },
  { accessorKey: "diagnosis", header: "Diagnosis" },
  {
    accessorKey: "age",
    header: "Age",
    cell: ({ row }) => (
      <span className="tabular-nums text-sm">
        {row.original.age}y {row.original.gender}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={patientStatusVariant[row.getValue("status") as Patient["status"]]}>
        {row.getValue("status")}
      </Badge>
    ),
  },
]

export function DensePatientTable() {
  return (
    <DataTable
      columns={columns}
      data={patients}
      filterColumn="name"
      filterPlaceholder="Search patients..."
      dense
    />
  )
}`,
      preview: React.createElement(DenseDemo),
    },
    {
      name: "Auto Width",
      description:
        "Table columns size to their content instead of stretching to fill the container. Uses `w-auto` on the Table, avatar + name link, email, location with flag, and joined date columns with CareUI Pagination.",
      code: `"use client"

import { useState, useMemo } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  type ColumnDef,
  type PaginationState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

interface IData {
  id: string
  name: string
  avatar: string
  flag: string
  email: string
  location: string
  joined: string
}

const data: IData[] = [
  { id: "1", name: "Dr. Anika Sharma", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&h=96&dpr=2&q=80", flag: "in", email: "anika.sharma@ohc.in", location: "India", joined: "Jan, 2026" },
  { id: "2", name: "Dr. Sarah Mitchell", avatar: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=96&h=96&dpr=2&q=80", flag: "gb", email: "sarah.mitchell@ohc.in", location: "United Kingdom", joined: "Jul, 2025" },
  { id: "3", name: "Dr. David Okafor", avatar: "https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?w=96&h=96&dpr=2&q=80", flag: "ng", email: "david.okafor@ohc.in", location: "Nigeria", joined: "Mar, 2019" },
  { id: "4", name: "Nurse Elena Fischer", avatar: "https://images.unsplash.com/photo-1485893086445-ed75865251e0?w=96&h=96&dpr=2&q=80", flag: "de", email: "elena.fischer@ohc.in", location: "Germany", joined: "Jan, 2024" },
  { id: "5", name: "Dr. Hiroshi Tanaka", avatar: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=96&h=96&dpr=2&q=80", flag: "jp", email: "hiroshi.tanaka@ohc.in", location: "Japan", joined: "May, 2023" },
  { id: "6", name: "Dr. Ravi Menon", avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=96&h=96&dpr=2&q=80", flag: "in", email: "ravi.menon@ohc.in", location: "India", joined: "Nov, 2018" },
  { id: "7", name: "Dr. Carlos Rivera", avatar: "https://images.unsplash.com/photo-1543299750-19d1d6297053?w=96&h=96&dpr=2&q=80", flag: "es", email: "carlos.rivera@ohc.in", location: "Spain", joined: "Jun, 2021" },
  { id: "8", name: "Nurse Mei Lin Wong", avatar: "https://images.unsplash.com/photo-1620075225255-8c2051b6c015?w=96&h=96&dpr=2&q=80", flag: "sg", email: "mei.wong@ohc.in", location: "Singapore", joined: "Oct, 2020" },
  { id: "9", name: "Dr. Siddharth Patel", avatar: "https://images.unsplash.com/photo-1485206412256-701ccc5b93ca?w=96&h=96&dpr=2&q=80", flag: "in", email: "siddharth.patel@ohc.in", location: "India", joined: "Sep, 2019" },
  { id: "10", name: "Dr. Amara Diallo", avatar: "https://images.unsplash.com/photo-1542595913-85d69b0edbaf?w=96&h=96&dpr=2&q=80", flag: "sn", email: "amara.diallo@ohc.in", location: "Senegal", joined: "Feb, 2023" },
  { id: "11", name: "Dr. Priya Krishnan", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&h=96&dpr=2&q=80", flag: "in", email: "priya.krishnan@ohc.in", location: "India", joined: "Dec, 2022" },
  { id: "12", name: "Nurse Rekha Thomas", avatar: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=96&h=96&dpr=2&q=80", flag: "in", email: "rekha.thomas@ohc.in", location: "India", joined: "Mar, 2020" },
]

export function AutoWidthDemo() {
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 5 })
  const [sorting, setSorting] = useState<SortingState>([{ id: "name", desc: true }])

  const columns = useMemo<ColumnDef<IData>[]>(() => [
    {
      accessorKey: "name",
      header: "Name",
      size: 225,
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Avatar className="size-6">
            <AvatarImage src={row.original.avatar} alt={row.original.name} />
            <AvatarFallback>{row.original.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
          </Avatar>
          <a href="#" className="text-foreground hover:text-primary font-medium whitespace-nowrap">
            {row.original.name}
          </a>
        </div>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      size: 200,
      cell: ({ row }) => (
        <a href={"mailto:" + row.original.email} className="hover:text-primary hover:underline whitespace-nowrap">
          {row.original.email}
        </a>
      ),
    },
    {
      accessorKey: "location",
      header: "Location",
      size: 175,
      cell: ({ row }) => (
        <div className="flex items-center gap-1.5">
          <img
            src={"https://flagcdn.com/" + row.original.flag.toLowerCase() + ".svg"}
            alt={row.original.flag}
            className="size-4 rounded-full object-cover"
          />
          <span className="text-foreground font-medium whitespace-nowrap">{row.original.location}</span>
        </div>
      ),
    },
    {
      accessorKey: "joined",
      header: "Joined",
      size: 120,
      cell: ({ row }) => <span className="font-medium whitespace-nowrap">{row.original.joined}</span>,
    },
  ], [])

  const table = useReactTable({
    columns,
    data,
    state: { pagination, sorting },
    columnResizeMode: "onChange",
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  const total = table.getFilteredRowModel().rows.length
  const start = total === 0 ? 0 : pagination.pageIndex * pagination.pageSize + 1
  const end = Math.min((pagination.pageIndex + 1) * pagination.pageSize, total)

  return (
    <div className="w-full space-y-2.5">
      <div className="w-fit overflow-x-auto rounded-md border [&_th:first-child:not(:has([data-slot=checkbox])):is(:has([data-slot=button]),:has([data-slot=dropdown-menu-trigger]))_:is([data-slot=button],[data-slot=dropdown-menu-trigger])]:-ms-1 [&_th:not(:first-child):is(:has([data-slot=button]),:has([data-slot=dropdown-menu-trigger]))_:is([data-slot=button],[data-slot=dropdown-menu-trigger])]:-ms-3">
        <Table className="w-auto">
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((h) => (
                  <TableHead key={h.id} style={{ width: h.getSize() }}>{h.isPlaceholder ? null : flexRender(h.column.columnDef.header, h.getContext())}</TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} style={{ width: cell.column.getSize() }}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{start} - {end} of {total}</p>
        <Pagination className="w-auto mx-0">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={(e) => { e.preventDefault(); table.previousPage(); }}
                aria-disabled={!table.getCanPreviousPage()}
                className={!table.getCanPreviousPage() ? "pointer-events-none opacity-50" : undefined}
              />
            </PaginationItem>
            {Array.from({ length: table.getPageCount() }, (_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  isActive={i === table.getState().pagination.pageIndex}
                  onClick={(e) => { e.preventDefault(); table.setPageIndex(i); }}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={(e) => { e.preventDefault(); table.nextPage(); }}
                aria-disabled={!table.getCanNextPage()}
                className={!table.getCanNextPage() ? "pointer-events-none opacity-50" : undefined}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}`,
      preview: React.createElement(AutoWidthDemo),
    },
    {
      name: "Expandable Rows",
      description:
        "Rows expand inline to reveal additional detail — clinical notes, medications, or test results — without navigating away. Add a toggle column with row.getToggleExpandedHandler() and pass renderExpandedRow to DataTable.",
      code: `"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { type ColumnDef, type Row } from "@tanstack/react-table"
import { ChevronDown, ChevronUp } from "lucide-react"

type Patient = {
  id: string
  name: string
  age: number
  gender: "M" | "F"
  ward: string
  bed: string
  diagnosis: string
  status: "admitted" | "critical" | "stable" | "discharged"
  notes: string
}

const patientStatusVariant = {
  stable:     "success",
  admitted:   "info",
  critical:   "destructive",
  discharged: "neutral",
} as const

const getInitials = (name: string) =>
  name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase()

const columns: ColumnDef<Patient>[] = [
  {
    id: "expand",
    enableHiding: false,
    meta: { className: "w-0" },
    header: () => null,
    cell: ({ row }) => (
      <Button
        variant="ghost"
        size="icon"
        className="size-7 text-muted-foreground"
        onClick={row.getToggleExpandedHandler()}
        aria-label={row.getIsExpanded() ? "Collapse row" : "Expand row"}
      >
        {row.getIsExpanded()
          ? <ChevronUp className="size-4" />
          : <ChevronDown className="size-4" />}
      </Button>
    ),
  },
  {
    id: "patient",
    accessorKey: "name",
    header: "Patient",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar shape="rounded">
          <AvatarFallback>{getInitials(row.original.name)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium">{row.original.name}</span>
          <span className="text-muted-foreground text-xs">{row.original.id}</span>
        </div>
      </div>
    ),
  },
  {
    id: "location",
    header: "Ward / Bed",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium text-sm">{row.original.ward}</span>
        <span className="text-muted-foreground text-xs">{row.original.bed}</span>
      </div>
    ),
  },
  { accessorKey: "diagnosis", header: "Diagnosis" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={patientStatusVariant[row.getValue("status") as Patient["status"]]}>
        {row.getValue("status")}
      </Badge>
    ),
  },
]

function renderExpandedRow(row: Row<Patient>) {
  return (
    <div className="flex items-start gap-2 border-t bg-muted/30 px-4 py-3">
      <span className="mt-0.5 shrink-0 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        Clinical Notes:
      </span>
      <p className="text-sm text-foreground">{row.original.notes}</p>
    </div>
  )
}

export function ExpandablePatientTable() {
  return (
    <DataTable
      columns={columns}
      data={patients}
      filterColumn="name"
      filterPlaceholder="Search patients..."
      renderExpandedRow={renderExpandedRow}
    />
  )
}`,
      preview: React.createElement(ExpandableRowDemo),
    },
    {
      name: "Sub Data Grid",
      description:
        "Expandable rows that reveal a fully functional nested DataTable — useful for master/detail views like patient encounters with lab investigations, orders with line items, or wards with bed assignments.",
      code: `"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { type ColumnDef, type Row } from "@tanstack/react-table"
import { ChevronDown, ChevronUp } from "lucide-react"

type Investigation = {
  id: string
  test: string
  category: string
  result: string
  referenceRange: string
  status: "normal" | "abnormal" | "critical"
}

type PatientEncounter = {
  id: string
  patientId: string
  patientName: string
  ward: string
  diagnosis: string
  admittedOn: string
  encounterStatus: "admitted" | "critical" | "stable" | "discharged"
  investigations: Investigation[]
}

const investigationStatusVariant = {
  normal:   "success",
  abnormal: "warning",
  critical: "destructive",
} as const

const encounterStatusVariant = {
  stable:     "success",
  admitted:   "info",
  critical:   "destructive",
  discharged: "neutral",
} as const

const getInitials = (name: string) =>
  name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase()

const investigationColumns: ColumnDef<Investigation>[] = [
  {
    accessorKey: "test",
    header: "Test",
    cell: ({ row }) => <span className="font-medium text-sm">{row.getValue("test")}</span>,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <Badge variant="neutral">{row.getValue("category")}</Badge>,
  },
  {
    accessorKey: "result",
    header: "Result",
    cell: ({ row }) => <span className="tabular-nums text-sm font-medium">{row.getValue("result")}</span>,
  },
  {
    accessorKey: "referenceRange",
    header: "Reference Range",
    cell: ({ row }) => <span className="text-muted-foreground text-sm">{row.getValue("referenceRange")}</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={investigationStatusVariant[row.getValue("status") as Investigation["status"]]}>
        {row.getValue("status")}
      </Badge>
    ),
  },
]

function InvestigationSubTable({ investigations }: { investigations: Investigation[] }) {
  return (
    <DataTable
      columns={investigationColumns}
      data={investigations}
      hideToolbar
    />
  )
}

const encounterColumns: ColumnDef<PatientEncounter>[] = [
  {
    id: "expand",
    enableHiding: false,
    meta: { className: "w-0" },
    header: () => null,
    cell: ({ row }) => (
      <Button
        variant="ghost"
        size="icon"
        className="size-7 text-muted-foreground"
        onClick={row.getToggleExpandedHandler()}
        aria-label={row.getIsExpanded() ? "Collapse" : "Expand"}
      >
        {row.getIsExpanded()
          ? <ChevronUp className="size-4" />
          : <ChevronDown className="size-4" />}
      </Button>
    ),
  },
  {
    id: "patient",
    accessorKey: "patientName",
    header: "Patient",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar shape="rounded">
          <AvatarFallback>{getInitials(row.original.patientName)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium">{row.original.patientName}</span>
          <span className="text-muted-foreground text-xs">{row.original.patientId}</span>
        </div>
      </div>
    ),
  },
  { accessorKey: "ward", header: "Ward" },
  { accessorKey: "diagnosis", header: "Diagnosis" },
  {
    accessorKey: "admittedOn",
    header: "Admitted",
    cell: ({ row }) => <span className="tabular-nums text-sm">{row.getValue("admittedOn")}</span>,
  },
  {
    id: "investigations",
    header: "Tests",
    cell: ({ row }) => (
      <Badge variant="neutral">{row.original.investigations.length} tests</Badge>
    ),
  },
  {
    accessorKey: "encounterStatus",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={encounterStatusVariant[row.getValue("encounterStatus") as PatientEncounter["encounterStatus"]]}>
        {row.getValue("encounterStatus")}
      </Badge>
    ),
  },
]

function renderInvestigationSubTable(row: Row<PatientEncounter>) {
  return (
    <div className="border-t bg-muted/20 px-4 py-4">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Investigations \u2014 {row.original.patientName}
      </p>
      <InvestigationSubTable investigations={row.original.investigations} />
    </div>
  )
}

export function PatientEncounterTable() {
  return (
    <DataTable
      columns={encounterColumns}
      data={patientEncounters}
      filterColumn="patientName"
      filterPlaceholder="Search patients..."
      renderExpandedRow={renderInvestigationSubTable}
    />
  )
}`,
      preview: React.createElement(SubDataGridDemo),
    },
    {
      name: "Footer Rows",
      description:
        "Add summary or total rows to the bottom of the table using TanStack Table footer definitions. The footer re-computes automatically when filters change.",
      code: `"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DataTable, DataTableColumnHeader } from "@/components/ui/data-table"
import { type ColumnDef } from "@tanstack/react-table"

type Invoice = {
  id: string
  patientName: string
  patientId: string
  date: string
  category: string
  amount: number
  status: "paid" | "pending" | "overdue"
}

const statusVariant = {
  paid:    "success",
  pending: "warning",
  overdue: "destructive",
} as const

const formatINR = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount)

const getInitials = (name: string) =>
  name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase()

const columns: ColumnDef<Invoice>[] = [
  {
    id: "patient",
    accessorKey: "patientName",
    header: "Patient",
    footer: () => <span className="font-semibold">Total</span>,
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar shape="rounded">
          <AvatarFallback>{getInitials(row.original.patientName)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium">{row.original.patientName}</span>
          <span className="text-muted-foreground text-xs">{row.original.patientId}</span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "date",
    header: "Date",
    footer: () => null,
  },
  {
    accessorKey: "category",
    header: "Category",
    footer: () => null,
    cell: ({ row }) => <Badge variant="neutral">{row.getValue("category")}</Badge>,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Amount" />,
    footer: ({ table }) => {
      const total = table
        .getFilteredRowModel()
        .rows.reduce((sum, row) => sum + (row.getValue("amount") as number), 0)
      return <span className="font-semibold tabular-nums">{formatINR(total)}</span>
    },
    meta: { className: "text-right" },
    cell: ({ row }) => (
      <div className="font-medium tabular-nums">{formatINR(row.getValue("amount"))}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    footer: () => null,
    cell: ({ row }) => (
      <Badge variant={statusVariant[row.getValue("status") as Invoice["status"]]}>
        {row.getValue("status")}
      </Badge>
    ),
  },
]

export function InvoiceTableWithFooter() {
  return (
    <DataTable
      columns={columns}
      data={invoices}
      filterColumn="patientName"
      filterPlaceholder="Search by patient..."
    />
  )
}`,
      preview: React.createElement(FooterRowsDemo),
    },
    {
      name: "Column Icons",
      description:
        "Add a leading icon to column headers by passing an icon node to DataTableColumnHeader \u2014 useful for visually distinguishing clinical data fields at a glance.",
      code: `"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DataTable, DataTableColumnHeader } from "@/components/ui/data-table"
import { type ColumnDef } from "@tanstack/react-table"
import { HeartPulse, MapPin, Stethoscope, User } from "lucide-react"

const patientStatusVariant = {
  stable:     "success",
  admitted:   "info",
  critical:   "destructive",
  discharged: "neutral",
} as const

const getInitials = (name: string) =>
  name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase()

const columns: ColumnDef<Patient>[] = [
  {
    id: "patient",
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Patient" icon={<User />} />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar shape="rounded">
          <AvatarFallback>{getInitials(row.original.name)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium">{row.original.name}</span>
          <span className="text-muted-foreground text-xs">{row.original.id}</span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "ward",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ward / Bed" icon={<MapPin />} />
    ),
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium text-sm">{row.original.ward}</span>
        <span className="text-muted-foreground text-xs">{row.original.bed}</span>
      </div>
    ),
  },
  {
    accessorKey: "diagnosis",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Diagnosis" icon={<Stethoscope />} />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" icon={<HeartPulse />} />
    ),
    cell: ({ row }) => (
      <Badge variant={patientStatusVariant[row.getValue("status") as Patient["status"]]}>
        {row.getValue("status")}
      </Badge>
    ),
  },
]

export function ColumnIconPatientTable() {
  return (
    <DataTable
      columns={columns}
      data={patients}
      filterColumn="name"
      filterPlaceholder="Search patients..."
    />
  )
}`,
      preview: React.createElement(ColumnIconsDemo),
    },
    {
      name: "Row Pinning",
      description:
        "Pin important rows to the top of the table so they stay visible while scrolling through the rest of the data. Click the pin icon on any row to toggle it. Uses TanStack Table's built-in row pinning with keepPinnedRows.",
      code: `"use client"

import React, { useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  type ColumnDef,
  type RowPinningState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Pin, PinOff } from "lucide-react"

type Patient = {
  id: string
  name: string
  ward: string
  diagnosis: string
  status: "admitted" | "critical" | "stable" | "discharged"
}

const patientStatusVariant = {
  stable:     "success",
  admitted:   "info",
  critical:   "destructive",
  discharged: "neutral",
} as const

const getInitials = (name: string) =>
  name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase()

const columns: ColumnDef<Patient>[] = [
  {
    id: "pin",
    enableHiding: false,
    meta: { className: "w-0" },
    header: () => null,
    cell: ({ row }) => {
      const isPinned = row.getIsPinned() === "top"
      return (
        <Button
          variant="ghost"
          size="icon"
          className={\`size-7 \${isPinned ? "text-primary" : "text-muted-foreground"}\`}
          onClick={() => row.pin(isPinned ? false : "top")}
          aria-label={isPinned ? "Unpin row" : "Pin row to top"}
        >
          {isPinned ? <PinOff className="size-4" /> : <Pin className="size-4" />}
        </Button>
      )
    },
  },
  {
    id: "patient",
    accessorKey: "name",
    header: "Patient",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar shape="rounded">
          <AvatarFallback>{getInitials(row.original.name)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium">{row.original.name}</span>
          <span className="text-muted-foreground text-xs">{row.original.id}</span>
        </div>
      </div>
    ),
  },
  { accessorKey: "ward", header: "Ward" },
  { accessorKey: "diagnosis", header: "Diagnosis" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={patientStatusVariant[row.getValue("status") as Patient["status"]]}>
        {row.getValue("status")}
      </Badge>
    ),
  },
]

export function RowPinningTable() {
  const [rowPinning, setRowPinning] = useState<RowPinningState>({ top: [], bottom: [] })
  const [globalFilter, setGlobalFilter] = useState("")

  const table = useReactTable({
    data: patients,
    columns,
    state: { rowPinning, globalFilter },
    onRowPinningChange: setRowPinning,
    onGlobalFilterChange: setGlobalFilter,
    enableRowPinning: true,
    keepPinnedRows: true,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  const pinnedRows = table.getTopRows()
  const unpinnedRows = table.getCenterRows()

  return (
    <div className="w-full space-y-0">
      <div className="flex items-center gap-2 py-4">
        <input
          placeholder="Search patients..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="max-w-sm h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        />
      </div>
      <div className="overflow-hidden rounded-md border [&_th:first-child:not(:has([data-slot=checkbox])):is(:has([data-slot=button]),:has([data-slot=dropdown-menu-trigger]))_:is([data-slot=button],[data-slot=dropdown-menu-trigger])]:-ms-1 [&_th:not(:first-child):is(:has([data-slot=button]),:has([data-slot=dropdown-menu-trigger]))_:is([data-slot=button],[data-slot=dropdown-menu-trigger])]:-ms-3">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((header) => (
                  <TableHead key={header.id} className={header.column.columnDef.meta?.className}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {pinnedRows.length > 0 && pinnedRows.map((row) => (
              <TableRow key={row.id} className="bg-primary/5 font-medium sticky top-0 z-10">
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className={cell.column.columnDef.meta?.className}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            {unpinnedRows.length > 0 ? (
              unpinnedRows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className={cell.column.columnDef.meta?.className}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}`,
      preview: React.createElement(RowPinningDemo),
    },
    {
      name: "Sticky Header",
      description:
        "Place a raw `<table>` directly inside a single `overflow-auto` container — this div is both the scroll ancestor and the visual border. `sticky top-0` on `TableHeader` works because there is no intermediate `overflow` element between it and the scrolling container. Control the visible height by adding a `max-h-*` class to the container from wherever it is consumed.",
      code: `"use client"

import { useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DataTableColumnHeader } from "@/components/ui/data-table"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table"

type Patient = {
  id: string
  name: string
  ward: string
  bed: string
  diagnosis: string
  status: "admitted" | "critical" | "stable" | "discharged"
}

const patientStatusVariant = {
  stable:     "success",
  admitted:   "info",
  critical:   "destructive",
  discharged: "neutral",
} as const

const getInitials = (name: string) =>
  name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase()

const columns: ColumnDef<Patient>[] = [
  {
    id: "patient",
    accessorKey: "name",
    enableSorting: true,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Patient" />,
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar shape="rounded">
          <AvatarFallback>{getInitials(row.original.name)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium">{row.original.name}</span>
          <span className="text-muted-foreground text-xs">{row.original.id}</span>
        </div>
      </div>
    ),
  },
  {
    id: "location",
    header: "Ward / Bed",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium text-sm">{row.original.ward}</span>
        <span className="text-muted-foreground text-xs">{row.original.bed}</span>
      </div>
    ),
  },
  { accessorKey: "diagnosis", header: "Diagnosis" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={patientStatusVariant[row.getValue("status") as Patient["status"]]}>
        {row.getValue("status")}
      </Badge>
    ),
  },
]

export function StickyHeaderTable() {
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data: patients,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <ScrollArea className="h-80 overflow-hidden rounded-md border [&_th:first-child:not(:has([data-slot=checkbox])):is(:has([data-slot=button]),:has([data-slot=dropdown-menu-trigger]))_:is([data-slot=button],[data-slot=dropdown-menu-trigger])]:-ms-1 [&_th:not(:first-child):is(:has([data-slot=button]),:has([data-slot=dropdown-menu-trigger]))_:is([data-slot=button],[data-slot=dropdown-menu-trigger])]:-ms-3">
      <table className="w-full caption-bottom text-sm">
        <TableHeader className="sticky top-0 z-10 bg-background shadow-[0_1px_0_0_var(--border)]">
          {table.getHeaderGroups().map((hg) => (
            <TableRow key={hg.id} className="border-b-0">
              {hg.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </table>
    </ScrollArea>
  )
}`,
      preview: React.createElement(StickyHeaderDemo),
    },
    {
      name: "Light Table",
      description:
        "A minimal, borderless-row table with avatar + status badges, rounded hover rows, and CareUI Pagination. The entire table sits inside a bordered container for a clean card look.",
      code: `"use client"

import { useState, useMemo } from "react"
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  type ColumnDef,
  type PaginationState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { cn } from "@/lib/utils"

interface IData {
  id: string
  name: string
  availability: "online" | "away" | "busy" | "offline"
  avatar: string
  status: "active" | "inactive"
  flag: string
  email: string
  location: string
}

const data: IData[] = [
  { id: "1", name: "Dr. Anika Sharma", availability: "online", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&h=96&dpr=2&q=80", status: "active", flag: "in", email: "anika.sharma@ohc.in", location: "India" },
  { id: "2", name: "Dr. Sarah Mitchell", availability: "away", avatar: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=96&h=96&dpr=2&q=80", status: "inactive", flag: "gb", email: "sarah.mitchell@ohc.in", location: "United Kingdom" },
  { id: "3", name: "Dr. David Okafor", availability: "busy", avatar: "https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?w=96&h=96&dpr=2&q=80", status: "active", flag: "ng", email: "david.okafor@ohc.in", location: "Nigeria" },
  { id: "4", name: "Nurse Elena Fischer", availability: "offline", avatar: "https://images.unsplash.com/photo-1485893086445-ed75865251e0?w=96&h=96&dpr=2&q=80", status: "inactive", flag: "de", email: "elena.fischer@ohc.in", location: "Germany" },
  { id: "5", name: "Dr. Hiroshi Tanaka", availability: "online", avatar: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=96&h=96&dpr=2&q=80", status: "active", flag: "jp", email: "hiroshi.tanaka@ohc.in", location: "Japan" },
  { id: "6", name: "Dr. Ravi Menon", availability: "away", avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=96&h=96&dpr=2&q=80", status: "active", flag: "in", email: "ravi.menon@ohc.in", location: "India" },
  { id: "7", name: "Dr. Carlos Rivera", availability: "busy", avatar: "https://images.unsplash.com/photo-1543299750-19d1d6297053?w=96&h=96&dpr=2&q=80", status: "inactive", flag: "es", email: "carlos.rivera@ohc.in", location: "Spain" },
  { id: "8", name: "Nurse Mei Lin Wong", availability: "offline", avatar: "https://images.unsplash.com/photo-1620075225255-8c2051b6c015?w=96&h=96&dpr=2&q=80", status: "active", flag: "sg", email: "mei.wong@ohc.in", location: "Singapore" },
  { id: "9", name: "Dr. Siddharth Patel", availability: "online", avatar: "https://images.unsplash.com/photo-1485206412256-701ccc5b93ca?w=96&h=96&dpr=2&q=80", status: "active", flag: "in", email: "siddharth.patel@ohc.in", location: "India" },
  { id: "10", name: "Dr. Amara Diallo", availability: "away", avatar: "https://images.unsplash.com/photo-1542595913-85d69b0edbaf?w=96&h=96&dpr=2&q=80", status: "inactive", flag: "sn", email: "amara.diallo@ohc.in", location: "Senegal" },
  { id: "11", name: "Dr. Priya Krishnan", availability: "busy", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&h=96&dpr=2&q=80", status: "active", flag: "in", email: "priya.krishnan@ohc.in", location: "India" },
  { id: "12", name: "Nurse Rekha Thomas", availability: "offline", avatar: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=96&h=96&dpr=2&q=80", status: "active", flag: "in", email: "rekha.thomas@ohc.in", location: "India" },
]

const statusColors = { online: "bg-green-500", away: "bg-yellow-500", busy: "bg-orange-500", offline: "bg-gray-400" }

export function LightTableDemo() {
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 5 })
  const [sorting, setSorting] = useState<SortingState>([{ id: "name", desc: true }])

  const columns = useMemo<ColumnDef<IData>[]>(() => [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Avatar className="size-8">
            <AvatarImage src={row.original.avatar} alt={row.original.name} />
            <AvatarFallback>{row.original.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
            <AvatarBadge className={cn("size-1.5! p-0", statusColors[row.original.availability])} />
          </Avatar>
          <div className="space-y-px">
            <div className="text-foreground font-medium">{row.original.name}</div>
            <div className="text-muted-foreground text-xs">{row.original.email}</div>
          </div>
        </div>
      ),
      size: 225,
    },
    {
      accessorKey: "location",
      header: "Location",
      cell: ({ row }) => (
        <div className="flex items-center gap-1.5">
          <img src={"https://flagcdn.com/" + row.original.flag.toLowerCase() + ".svg"} alt={row.original.flag} className="size-4 rounded-full object-cover" />
          <span className="text-foreground font-medium">{row.original.location}</span>
        </div>
      ),
      size: 160,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) =>
        row.original.status === "active"
          ? <Badge variant="success">Active</Badge>
          : <Badge variant="warning">On Leave</Badge>,
      size: 100,
    },
  ], [])

  const table = useReactTable({
    columns,
    data,
    state: { pagination, sorting },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  const total = table.getFilteredRowModel().rows.length
  const start = total === 0 ? 0 : pagination.pageIndex * pagination.pageSize + 1
  const end = Math.min((pagination.pageIndex + 1) * pagination.pageSize, total)

  return (
    <div className="w-full space-y-2.5">
      <div className="overflow-hidden rounded-md border [&_th:first-child:not(:has([data-slot=checkbox])):is(:has([data-slot=button]),:has([data-slot=dropdown-menu-trigger]))_:is([data-slot=button],[data-slot=dropdown-menu-trigger])]:-ms-1 [&_th:not(:first-child):is(:has([data-slot=button]),:has([data-slot=dropdown-menu-trigger]))_:is([data-slot=button],[data-slot=dropdown-menu-trigger])]:-ms-3">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id} className="border-none hover:bg-transparent">
                {hg.headers.map((h) => (
                  <TableHead key={h.id}>{h.isPlaceholder ? null : flexRender(h.column.columnDef.header, h.getContext())}</TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} className="border-none">
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{start} - {end} of {total}</p>
        <Pagination className="w-auto mx-0">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={(e) => { e.preventDefault(); table.previousPage(); }}
                aria-disabled={!table.getCanPreviousPage()}
                className={!table.getCanPreviousPage() ? "pointer-events-none opacity-50" : undefined}
              />
            </PaginationItem>
            {Array.from({ length: table.getPageCount() }, (_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  isActive={i === table.getState().pagination.pageIndex}
                  onClick={(e) => { e.preventDefault(); table.setPageIndex(i); }}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={(e) => { e.preventDefault(); table.nextPage(); }}
                aria-disabled={!table.getCanNextPage()}
                className={!table.getCanNextPage() ? "pointer-events-none opacity-50" : undefined}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}`,
      preview: React.createElement(LightTableDemo),
    },
    {
      name: "Striped Table",
      description:
        "Alternating row backgrounds (`even:bg-muted/50`) for easier scanning of dense data. Includes avatar, email link, country flag, and right-aligned balance column with CareUI Pagination.",
      code: `"use client"

import { useState, useMemo } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  type ColumnDef,
  type PaginationState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

interface IData {
  id: string
  name: string
  avatar: string
  flag: string
  email: string
  location: string
  balance: number
}

const data: IData[] = [
  { id: "1", name: "Dr. Anika Sharma", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&h=96&dpr=2&q=80", flag: "in", email: "anika.sharma@ohc.in", location: "India", balance: 5143.03 },
  { id: "2", name: "Dr. Sarah Mitchell", avatar: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=96&h=96&dpr=2&q=80", flag: "gb", email: "sarah.mitchell@ohc.in", location: "United Kingdom", balance: 4321.87 },
  { id: "3", name: "Dr. David Okafor", avatar: "https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?w=96&h=96&dpr=2&q=80", flag: "ng", email: "david.okafor@ohc.in", location: "Nigeria", balance: 7654.98 },
  { id: "4", name: "Nurse Elena Fischer", avatar: "https://images.unsplash.com/photo-1485893086445-ed75865251e0?w=96&h=96&dpr=2&q=80", flag: "de", email: "elena.fischer@ohc.in", location: "Germany", balance: 3456.45 },
  { id: "5", name: "Dr. Hiroshi Tanaka", avatar: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=96&h=96&dpr=2&q=80", flag: "jp", email: "hiroshi.tanaka@ohc.in", location: "Japan", balance: 9876.54 },
  { id: "6", name: "Dr. Ravi Menon", avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=96&h=96&dpr=2&q=80", flag: "in", email: "ravi.menon@ohc.in", location: "India", balance: 6214.22 },
  { id: "7", name: "Dr. Carlos Rivera", avatar: "https://images.unsplash.com/photo-1543299750-19d1d6297053?w=96&h=96&dpr=2&q=80", flag: "es", email: "carlos.rivera@ohc.in", location: "Spain", balance: 5321.77 },
  { id: "8", name: "Nurse Mei Lin Wong", avatar: "https://images.unsplash.com/photo-1620075225255-8c2051b6c015?w=96&h=96&dpr=2&q=80", flag: "sg", email: "mei.wong@ohc.in", location: "Singapore", balance: 8452.39 },
  { id: "9", name: "Dr. Siddharth Patel", avatar: "https://images.unsplash.com/photo-1485206412256-701ccc5b93ca?w=96&h=96&dpr=2&q=80", flag: "in", email: "siddharth.patel@ohc.in", location: "India", balance: 7345.10 },
  { id: "10", name: "Dr. Amara Diallo", avatar: "https://images.unsplash.com/photo-1542595913-85d69b0edbaf?w=96&h=96&dpr=2&q=80", flag: "sn", email: "amara.diallo@ohc.in", location: "Senegal", balance: 5214.88 },
  { id: "11", name: "Dr. Priya Krishnan", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&h=96&dpr=2&q=80", flag: "in", email: "priya.krishnan@ohc.in", location: "India", balance: 9421.50 },
  { id: "12", name: "Nurse Rekha Thomas", avatar: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=96&h=96&dpr=2&q=80", flag: "in", email: "rekha.thomas@ohc.in", location: "India", balance: 4521.67 },
]

export function StripedTableDemo() {
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 5 })
  const [sorting, setSorting] = useState<SortingState>([{ id: "name", desc: true }])

  const columns = useMemo<ColumnDef<IData>[]>(() => [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Avatar className="size-6">
            <AvatarImage src={row.original.avatar} alt={row.original.name} />
            <AvatarFallback>{row.original.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
          </Avatar>
          <span className="text-foreground font-medium">{row.original.name}</span>
        </div>
      ),
      size: 175,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <a href={"mailto:" + row.original.email} className="hover:text-primary hover:underline">
          {row.original.email}
        </a>
      ),
      size: 180,
    },
    {
      accessorKey: "location",
      header: "Location",
      cell: ({ row }) => (
        <div className="flex items-center gap-1.5">
          <img
            src={"https://flagcdn.com/" + row.original.flag.toLowerCase() + ".svg"}
            alt={row.original.flag}
            className="size-4 rounded-full object-cover"
          />
          <span className="text-foreground font-medium">{row.original.location}</span>
        </div>
      ),
      size: 170,
    },
    {
      accessorKey: "balance",
      header: () => <div className="text-right">Balance ($)</div>,
      cell: ({ row }) => (
        <span className="font-semibold">{"$"}{(row.original.balance).toFixed(2)}</span>
      ),
      size: 120,
      meta: { className: "text-right" },
    },
  ], [])

  const table = useReactTable({
    columns,
    data,
    state: { pagination, sorting },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  const total = table.getFilteredRowModel().rows.length
  const start = total === 0 ? 0 : pagination.pageIndex * pagination.pageSize + 1
  const end = Math.min((pagination.pageIndex + 1) * pagination.pageSize, total)

  return (
    <div className="w-full space-y-2.5">
      <div className="overflow-hidden rounded-md border [&_th:first-child:not(:has([data-slot=checkbox])):is(:has([data-slot=button]),:has([data-slot=dropdown-menu-trigger]))_:is([data-slot=button],[data-slot=dropdown-menu-trigger])]:-ms-1 [&_th:not(:first-child):is(:has([data-slot=button]),:has([data-slot=dropdown-menu-trigger]))_:is([data-slot=button],[data-slot=dropdown-menu-trigger])]:-ms-3">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((h) => (
                  <TableHead key={h.id}>{h.isPlaceholder ? null : flexRender(h.column.columnDef.header, h.getContext())}</TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} className="even:bg-muted/50">
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{start} - {end} of {total}</p>
        <Pagination className="w-auto mx-0">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={(e) => { e.preventDefault(); table.previousPage(); }}
                aria-disabled={!table.getCanPreviousPage()}
                className={!table.getCanPreviousPage() ? "pointer-events-none opacity-50" : undefined}
              />
            </PaginationItem>
            {Array.from({ length: table.getPageCount() }, (_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  isActive={i === table.getState().pagination.pageIndex}
                  onClick={(e) => { e.preventDefault(); table.setPageIndex(i); }}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={(e) => { e.preventDefault(); table.nextPage(); }}
                aria-disabled={!table.getCanNextPage()}
                className={!table.getCanNextPage() ? "pointer-events-none opacity-50" : undefined}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}`,
      preview: React.createElement(StripedTableDemo),
    },
    {
      name: "Row Selection",
      description:
        "Enable row selection with checkboxes using TanStack Table's built-in selection API. Each row tracks its selected state via rowSelection, with a header checkbox for select-all and per-row checkboxes.",
      code: `"use client"

import { useEffect, useMemo, useState } from "react"
import {
  type ColumnDef,
  type PaginationState,
  type RowSelectionState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface IData {
  id: string
  name: string
  availability: "online" | "away" | "busy" | "offline"
  avatar: string
  flag: string
  email: string
  location: string
  joined: string
}

const availabilityColor: Record<string, string> = {
  online: "bg-green-500",
  away: "bg-yellow-500",
  busy: "bg-orange-500",
  offline: "bg-gray-400",
}

export function RowSelectionDemo() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  })
  const [sorting, setSorting] = useState<SortingState>([
    { id: "name", desc: true },
  ])
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

  const columns = useMemo<ColumnDef<IData>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            indeterminate={
              !table.getIsAllPageRowsSelected() &&
              table.getIsSomePageRowsSelected()
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        size: 20,
      },
      {
        accessorKey: "name",
        id: "name",
        header: "Name",
        size: 200,
        enableSorting: true,
        cell: ({ row }) => {
          const availability = row.original.availability

          return (
            <div className="flex items-center gap-3">
              <Avatar className="size-8">
                <AvatarImage src={row.original.avatar} alt={row.original.name} />
                <AvatarFallback>
                  {row.original.name.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
                <AvatarBadge
                  className={\`size-1.5! p-0 \${availabilityColor[availability] || availabilityColor.offline}\`}
                />
              </Avatar>
              <div className="space-y-px">
                <div className="text-foreground font-medium">{row.original.name}</div>
                <div className="text-muted-foreground">{row.original.email}</div>
              </div>
            </div>
          )
        },
      },
      {
        accessorKey: "location",
        header: "Location",
        size: 180,
        cell: ({ row }) => (
          <div className="flex items-center gap-1.5">
            <img
              src={\`https://flagcdn.com/\${row.original.flag.toLowerCase()}.svg\`}
              alt={row.original.flag}
              className="size-4 rounded-full object-cover"
            />
            <div className="text-foreground font-medium">{row.original.location}</div>
          </div>
        ),
      },
      {
        accessorKey: "joined",
        header: "Joined",
        size: 120,
        cell: (info) => <span className="font-medium">{info.getValue() as string}</span>,
      },
    ],
    []
  )

  const table = useReactTable({
    columns,
    data: demoData,
    getRowId: (row: IData) => row.id,
    state: { pagination, sorting, rowSelection },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  const total = table.getFilteredRowModel().rows.length
  const start = total === 0 ? 0 : pagination.pageIndex * pagination.pageSize + 1
  const end = Math.min((pagination.pageIndex + 1) * pagination.pageSize, total)

  return (
    <div className="w-full space-y-2.5">
      <div className="overflow-hidden rounded-md border [&_th:first-child:not(:has([data-slot=checkbox])):is(:has([data-slot=button]),:has([data-slot=dropdown-menu-trigger]))_:is([data-slot=button],[data-slot=dropdown-menu-trigger])]:-ms-1 [&_th:not(:first-child):is(:has([data-slot=button]),:has([data-slot=dropdown-menu-trigger]))_:is([data-slot=button],[data-slot=dropdown-menu-trigger])]:-ms-3">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((h) => (
                  <TableHead key={h.id} style={{ width: h.getSize() }}>
                    {h.isPlaceholder ? null : flexRender(h.column.columnDef.header, h.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() ? "selected" : undefined}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} style={{ width: cell.column.getSize() }}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{start} - {end} of {total}</p>
        <Pagination className="w-auto mx-0">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={(e) => { e.preventDefault(); table.previousPage() }}
                aria-disabled={!table.getCanPreviousPage()}
                className={!table.getCanPreviousPage() ? "pointer-events-none opacity-50" : undefined}
              />
            </PaginationItem>
            {Array.from({ length: table.getPageCount() }, (_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  isActive={i === table.getState().pagination.pageIndex}
                  onClick={(e) => { e.preventDefault(); table.setPageIndex(i) }}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={(e) => { e.preventDefault(); table.nextPage() }}
                aria-disabled={!table.getCanNextPage()}
                className={!table.getCanNextPage() ? "pointer-events-none opacity-50" : undefined}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}`,
      preview: React.createElement(RowSelectionDemo),
    },
    {
      name: "Card Container",
      description:
        "Wrap a data table inside a Card component with a header, action button, and footer pagination for a self-contained panel layout.",
      code: `"use client"

import { useMemo, useState } from "react"
import {
  type ColumnDef,
  type PaginationState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DataTableColumnHeader } from "@/components/ui/data-table"
import { UserPlus } from "lucide-react"

interface IData {
  id: string
  name: string
  avatar: string
  flag: string
  email: string
  location: string
  joined: string
}

export function CardContainerDemo() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  })
  const [sorting, setSorting] = useState<SortingState>([
    { id: "name", desc: true },
  ])

  const columns = useMemo<ColumnDef<IData>[]>(
    () => [
      {
        accessorKey: "name",
        id: "name",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Practitioner" />
        ),
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <Avatar className="size-8">
              <AvatarImage src={row.original.avatar} alt={row.original.name} />
              <AvatarFallback>
                {row.original.name.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-px">
              <div className="text-foreground font-medium">{row.original.name}</div>
              <div className="text-muted-foreground">{row.original.email}</div>
            </div>
          </div>
        ),
        size: 480,
        enableSorting: true,
        enableHiding: false,
      },
      {
        accessorKey: "location",
        id: "location",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Location" />
        ),
        cell: ({ row }) => (
          <div className="flex items-center gap-1.5">
            <img
              src={\`https://flagcdn.com/\${row.original.flag.toLowerCase()}.svg\`}
              alt={row.original.flag}
              className="size-4 rounded-full object-cover"
            />
            <div className="text-foreground font-medium">{row.original.location}</div>
          </div>
        ),
        size: 360,
        enableSorting: true,
      },
      {
        accessorKey: "joined",
        id: "joined",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Joined" />
        ),
        cell: ({ row }) => (
          <span className="font-medium">{row.original.joined}</span>
        ),
        size: 200,
        enableSorting: true,
      },
    ],
    []
  )

  const table = useReactTable({
    columns,
    data: demoData,
    state: { pagination, sorting },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  const total = table.getFilteredRowModel().rows.length
  const start = total === 0 ? 0 : pagination.pageIndex * pagination.pageSize + 1
  const end = Math.min((pagination.pageIndex + 1) * pagination.pageSize, total)

  return (
    <Card className="w-full gap-3 py-3.5">
      <CardHeader className="flex items-center justify-between px-3.5">
        <CardTitle>Users</CardTitle>
        <CardAction>
          <Button size="sm">
            <UserPlus aria-hidden="true" />
            Add User
          </Button>
        </CardAction>
      </CardHeader>
      <div className="overflow-hidden w-full border-y [&_th:first-child:not(:has([data-slot=checkbox])):is(:has([data-slot=button]),:has([data-slot=dropdown-menu-trigger]))_:is([data-slot=button],[data-slot=dropdown-menu-trigger])]:-ms-1 [&_th:not(:first-child):is(:has([data-slot=button]),:has([data-slot=dropdown-menu-trigger]))_:is([data-slot=button],[data-slot=dropdown-menu-trigger])]:-ms-3">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((h) => (
                  <TableHead key={h.id} style={{ width: h.getSize() }}>
                    {h.isPlaceholder ? null : flexRender(h.column.columnDef.header, h.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} style={{ width: cell.column.getSize() }}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <CardFooter className="border-none bg-transparent! px-3.5 py-0">
        <div className="flex w-full items-center justify-between">
          <p className="text-sm text-muted-foreground">{start} - {end} of {total}</p>
          <Pagination className="w-auto mx-0">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={(e) => { e.preventDefault(); table.previousPage() }}
                  aria-disabled={!table.getCanPreviousPage()}
                  className={!table.getCanPreviousPage() ? "pointer-events-none opacity-50" : undefined}
                />
              </PaginationItem>
              {Array.from({ length: table.getPageCount() }, (_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    isActive={i === table.getState().pagination.pageIndex}
                    onClick={(e) => { e.preventDefault(); table.setPageIndex(i) }}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  onClick={(e) => { e.preventDefault(); table.nextPage() }}
                  aria-disabled={!table.getCanNextPage()}
                  className={!table.getCanNextPage() ? "pointer-events-none opacity-50" : undefined}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </CardFooter>
    </Card>
  )
}`,
      preview: React.createElement(CardContainerDemo),
    },
    {
      name: "Column Visibility",
      description:
        "Toggle column visibility from a dropdown in the card header. The User column is always visible (enableHiding: false). Click the Columns button to show or hide Location, Joined, and Status columns.",
      code: `"use client"

import { useState, useMemo } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTableColumnHeader } from "@/components/ui/data-table"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  type ColumnDef,
  type PaginationState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Settings2 } from "lucide-react"

interface Member {
  id: string
  name: string
  avatar: string
  flag: string
  email: string
  location: string
  joined: string
  status: "active" | "inactive"
}

const members: Member[] = [
  { id: "1",  name: "Dr. Anika Sharma",      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&h=96&dpr=2&q=80", flag: "in", email: "anika.sharma@ohc.in",     location: "India",          joined: "Apr, 2021", status: "active"   },
  { id: "2",  name: "Dr. Sarah Mitchell",    avatar: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=96&h=96&dpr=2&q=80", flag: "gb", email: "sarah.mitchell@ohc.in",   location: "United Kingdom", joined: "Jul, 2020", status: "inactive" },
  { id: "3",  name: "Dr. David Okafor",      avatar: "https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?w=96&h=96&dpr=2&q=80", flag: "ng", email: "david.okafor@ohc.in",     location: "Nigeria",        joined: "Mar, 2019", status: "active"   },
  { id: "4",  name: "Nurse Elena Fischer",   avatar: "https://images.unsplash.com/photo-1485893086445-ed75865251e0?w=96&h=96&dpr=2&q=80", flag: "de", email: "elena.fischer@ohc.in",    location: "Germany",        joined: "Jan, 2022", status: "inactive" },
  { id: "5",  name: "Dr. Hiroshi Tanaka",    avatar: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=96&h=96&dpr=2&q=80", flag: "jp", email: "hiroshi.tanaka@ohc.in",   location: "Japan",          joined: "May, 2023", status: "active"   },
  { id: "6",  name: "Dr. Ravi Menon",        avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=96&h=96&dpr=2&q=80", flag: "in", email: "ravi.menon@ohc.in",       location: "India",          joined: "Nov, 2018", status: "active"   },
  { id: "7",  name: "Dr. Carlos Rivera",     avatar: "https://images.unsplash.com/photo-1543299750-19d1d6297053?w=96&h=96&dpr=2&q=80", flag: "es", email: "carlos.rivera@ohc.in",    location: "Spain",          joined: "Jun, 2021", status: "inactive" },
  { id: "8",  name: "Nurse Mei Lin Wong",    avatar: "https://images.unsplash.com/photo-1620075225255-8c2051b6c015?w=96&h=96&dpr=2&q=80", flag: "sg", email: "mei.wong@ohc.in",         location: "Singapore",      joined: "Oct, 2020", status: "active"   },
  { id: "9",  name: "Dr. Siddharth Patel",   avatar: "https://images.unsplash.com/photo-1485206412256-701ccc5b93ca?w=96&h=96&dpr=2&q=80", flag: "in", email: "siddharth.patel@ohc.in",  location: "India",          joined: "Sep, 2019", status: "active"   },
  { id: "10", name: "Dr. Amara Diallo",      avatar: "https://images.unsplash.com/photo-1542595913-85d69b0edbaf?w=96&h=96&dpr=2&q=80", flag: "sn", email: "amara.diallo@ohc.in",     location: "Senegal",        joined: "Feb, 2023", status: "inactive" },
  { id: "11", name: "Dr. Priya Krishnan",    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&h=96&dpr=2&q=80", flag: "in", email: "priya.krishnan@ohc.in",   location: "India",          joined: "Dec, 2022", status: "active"   },
  { id: "12", name: "Nurse Rekha Thomas",    avatar: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=96&h=96&dpr=2&q=80", flag: "in", email: "rekha.thomas@ohc.in",     location: "India",          joined: "Mar, 2020", status: "active"   },
]

export function ColumnVisibilityTable() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  })
  const [sorting, setSorting] = useState<SortingState>([
    { id: "name", desc: true },
  ])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})

  const columns = useMemo<ColumnDef<Member>[]>(
    () => [
      {
        accessorKey: "name",
        id: "name",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Practitioner" />
        ),
        size: 200,
        enableSorting: true,
        enableHiding: false,
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <Avatar className="size-8">
              <AvatarImage src={row.original.avatar} alt={row.original.name} />
              <AvatarFallback>
                {row.original.name.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-px">
              <div className="text-foreground font-medium">{row.original.name}</div>
              <div className="text-muted-foreground">{row.original.email}</div>
            </div>
          </div>
        ),
      },
      {
        accessorKey: "location",
        id: "location",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Location" />
        ),
        size: 160,
        enableSorting: true,
        enableHiding: true,
        cell: ({ row }) => (
          <div className="flex items-center gap-1.5">
            <img
              src={\`https://flagcdn.com/\${row.original.flag.toLowerCase()}.svg\`}
              alt={row.original.flag}
              className="size-4 rounded-full object-cover"
            />
            <div className="text-foreground font-medium">{row.original.location}</div>
          </div>
        ),
      },
      {
        accessorKey: "joined",
        id: "joined",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Joined" />
        ),
        size: 120,
        enableSorting: true,
        enableHiding: true,
        cell: ({ row }) => (
          <span className="font-medium">{row.original.joined}</span>
        ),
      },
      {
        accessorKey: "status",
        id: "status",
        header: "Status",
        size: 100,
        enableSorting: true,
        enableHiding: true,
        cell: ({ row }) =>
          row.original.status === "active"
            ? <Badge variant="success">Active</Badge>
            : <Badge variant="warning">On Leave</Badge>,
      },
    ],
    []
  )

  const table = useReactTable({
    columns,
    data: members,
    getRowId: (row) => row.id,
    state: { pagination, sorting, columnVisibility },
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  const total = table.getFilteredRowModel().rows.length
  const start = total === 0 ? 0 : pagination.pageIndex * pagination.pageSize + 1
  const end = Math.min((pagination.pageIndex + 1) * pagination.pageSize, total)

  return (
    <Card className="w-full gap-3 py-3.5">
      <CardHeader className="flex items-center justify-between px-3.5">
        <CardTitle>Users</CardTitle>
        <CardAction>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Settings2 aria-hidden />
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </CardAction>
      </CardHeader>
      <div className="overflow-hidden w-full border-y [&_th:first-child:not(:has([data-slot=checkbox])):is(:has([data-slot=button]),:has([data-slot=dropdown-menu-trigger]))_:is([data-slot=button],[data-slot=dropdown-menu-trigger])]:-ms-1 [&_th:not(:first-child):is(:has([data-slot=button]),:has([data-slot=dropdown-menu-trigger]))_:is([data-slot=button],[data-slot=dropdown-menu-trigger])]:-ms-3">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((h) => (
                  <TableHead key={h.id} style={{ width: h.getSize() }}>
                    {h.isPlaceholder
                      ? null
                      : flexRender(h.column.columnDef.header, h.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} style={{ width: cell.column.getSize() }}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <CardFooter className="border-none bg-transparent! px-3.5 py-0">
        <div className="flex w-full items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {\`\${start} - \${end} of \${total}\`}
          </p>
          <Pagination className="w-auto mx-0">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={(e) => { e.preventDefault(); table.previousPage() }}
                  aria-disabled={!table.getCanPreviousPage()}
                  className={
                    !table.getCanPreviousPage()
                      ? "pointer-events-none opacity-50"
                      : undefined
                  }
                />
              </PaginationItem>
              {Array.from({ length: table.getPageCount() }, (_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    isActive={i === table.getState().pagination.pageIndex}
                    onClick={(e) => { e.preventDefault(); table.setPageIndex(i) }}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  onClick={(e) => { e.preventDefault(); table.nextPage() }}
                  aria-disabled={!table.getCanNextPage()}
                  className={
                    !table.getCanNextPage()
                      ? "pointer-events-none opacity-50"
                      : undefined
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </CardFooter>
    </Card>
  )
}`,
      preview: React.createElement(ColumnVisibilityDemo),
    },
    {
      name: "Loading Skeleton",
      description:
        "Shows animated skeleton placeholders while data is loading. Each column defines its own skeleton shape via column meta. Click the toggle button to switch between loading and loaded states.",
      code: `"use client"

import { useState, useMemo } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTableColumnHeader } from "@/components/ui/data-table"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  type ColumnDef,
  type PaginationState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

interface Member {
  id: string
  name: string
  avatar: string
  email: string
  status: "active" | "inactive"
}

const members: Member[] = [
  { id: "1",  name: "Dr. Anika Sharma",      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&h=96&dpr=2&q=80", email: "anika.sharma@ohc.in",     status: "active"   },
  { id: "2",  name: "Dr. Sarah Mitchell",    avatar: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=96&h=96&dpr=2&q=80", email: "sarah.mitchell@ohc.in",   status: "inactive" },
  { id: "3",  name: "Dr. David Okafor",      avatar: "https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?w=96&h=96&dpr=2&q=80", email: "david.okafor@ohc.in",     status: "active"   },
  { id: "4",  name: "Nurse Elena Fischer",   avatar: "https://images.unsplash.com/photo-1485893086445-ed75865251e0?w=96&h=96&dpr=2&q=80", email: "elena.fischer@ohc.in",    status: "inactive" },
  { id: "5",  name: "Dr. Hiroshi Tanaka",    avatar: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=96&h=96&dpr=2&q=80", email: "hiroshi.tanaka@ohc.in",   status: "active"   },
  { id: "6",  name: "Dr. Ravi Menon",        avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=96&h=96&dpr=2&q=80", email: "ravi.menon@ohc.in",       status: "active"   },
  { id: "7",  name: "Dr. Carlos Rivera",     avatar: "https://images.unsplash.com/photo-1543299750-19d1d6297053?w=96&h=96&dpr=2&q=80", email: "carlos.rivera@ohc.in",    status: "inactive" },
  { id: "8",  name: "Nurse Mei Lin Wong",    avatar: "https://images.unsplash.com/photo-1620075225255-8c2051b6c015?w=96&h=96&dpr=2&q=80", email: "mei.wong@ohc.in",         status: "active"   },
  { id: "9",  name: "Dr. Siddharth Patel",   avatar: "https://images.unsplash.com/photo-1485206412256-701ccc5b93ca?w=96&h=96&dpr=2&q=80", email: "siddharth.patel@ohc.in",  status: "active"   },
  { id: "10", name: "Dr. Amara Diallo",      avatar: "https://images.unsplash.com/photo-1542595913-85d69b0edbaf?w=96&h=96&dpr=2&q=80", email: "amara.diallo@ohc.in",     status: "inactive" },
  { id: "11", name: "Dr. Priya Krishnan",    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&h=96&dpr=2&q=80", email: "priya.krishnan@ohc.in",   status: "active"   },
  { id: "12", name: "Nurse Rekha Thomas",    avatar: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=96&h=96&dpr=2&q=80", email: "rekha.thomas@ohc.in",     status: "active"   },
]

export function LoadingSkeletonTable() {
  const [isLoading, setIsLoading] = useState(true)
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  })
  const [sorting, setSorting] = useState<SortingState>([
    { id: "name", desc: true },
  ])

  const columns = useMemo<ColumnDef<Member>[]>(
    () => [
      {
        accessorKey: "name",
        id: "name",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Practitioner" />
        ),
        size: 200,
        enableSorting: true,
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <Avatar className="size-8">
              <AvatarImage src={row.original.avatar} alt={row.original.name} />
              <AvatarFallback>
                {row.original.name.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-px">
              <div className="text-foreground font-medium">{row.original.name}</div>
              <div className="text-muted-foreground">{row.original.email}</div>
            </div>
          </div>
        ),
        meta: {
          skeleton: (
            <div className="flex items-center gap-3">
              <Skeleton className="size-8 rounded-full" />
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3.5 w-16" />
              </div>
            </div>
          ),
        },
      },
      {
        accessorKey: "email",
        id: "email",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Email" />
        ),
        size: 150,
        enableSorting: true,
        cell: ({ row }) => (
          <span className="text-muted-foreground">{row.original.email}</span>
        ),
        meta: {
          skeleton: <Skeleton className="h-4 w-28" />,
        },
      },
      {
        accessorKey: "status",
        id: "status",
        header: "Status",
        size: 100,
        cell: ({ row }) =>
          row.original.status === "active"
            ? <Badge variant="success">Active</Badge>
            : <Badge variant="warning">On Leave</Badge>,
        meta: {
          skeleton: <Skeleton className="h-5 w-16 rounded-full" />,
        },
      },
    ],
    []
  )

  const table = useReactTable({
    columns,
    data: members,
    getRowId: (row) => row.id,
    state: { pagination, sorting },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  const total = table.getFilteredRowModel().rows.length
  const start = total === 0 ? 0 : pagination.pageIndex * pagination.pageSize + 1
  const end = Math.min((pagination.pageIndex + 1) * pagination.pageSize, total)
  const skeletonRows = Array.from({ length: pagination.pageSize })

  return (
    <Card className="w-full gap-3 py-3.5">
      <CardHeader className="flex items-center justify-between px-3.5">
        <CardTitle>Practitioners</CardTitle>
        <CardAction>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsLoading((p) => !p)}
          >
            {isLoading ? "Disable Loading" : "Enable Loading"}
          </Button>
        </CardAction>
      </CardHeader>
      <div className="overflow-hidden w-full border-y [&_th:first-child:not(:has([data-slot=checkbox])):is(:has([data-slot=button]),:has([data-slot=dropdown-menu-trigger]))_:is([data-slot=button],[data-slot=dropdown-menu-trigger])]:-ms-1 [&_th:not(:first-child):is(:has([data-slot=button]),:has([data-slot=dropdown-menu-trigger]))_:is([data-slot=button],[data-slot=dropdown-menu-trigger])]:-ms-3">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((h) => (
                  <TableHead key={h.id} style={{ width: h.getSize() }}>
                    {h.isPlaceholder
                      ? null
                      : flexRender(h.column.columnDef.header, h.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading
              ? skeletonRows.map((_, i) => (
                  <TableRow key={\`skeleton-\${i}\`}>
                    {table.getAllLeafColumns().map((col) => (
                      <TableCell key={col.id} style={{ width: col.getSize() }}>
                        {(col.columnDef.meta as any)?.skeleton ?? (
                          <Skeleton className="h-4 w-full" />
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        style={{ width: cell.column.getSize() }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>
      <CardFooter className="border-none bg-transparent! px-3.5 py-0">
        <div className="flex w-full items-center justify-between">
          {isLoading ? (
            <>
              <Skeleton className="h-4 w-32" />
              <div className="flex gap-1">
                <Skeleton className="size-8 rounded-md" />
                <Skeleton className="size-8 rounded-md" />
                <Skeleton className="size-8 rounded-md" />
                <Skeleton className="size-8 rounded-md" />
              </div>
            </>
          ) : (
            <>
              <p className="text-sm text-muted-foreground">
                {\`\${start} - \${end} of \${total}\`}
              </p>
              <Pagination className="w-auto mx-0">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={(e) => {
                        e.preventDefault()
                        table.previousPage()
                      }}
                      aria-disabled={!table.getCanPreviousPage()}
                      className={
                        !table.getCanPreviousPage()
                          ? "pointer-events-none opacity-50"
                          : undefined
                      }
                    />
                  </PaginationItem>
                  {Array.from({ length: table.getPageCount() }, (_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink
                        isActive={
                          i === table.getState().pagination.pageIndex
                        }
                        onClick={(e) => {
                          e.preventDefault()
                          table.setPageIndex(i)
                        }}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      onClick={(e) => {
                        e.preventDefault()
                        table.nextPage()
                      }}
                      aria-disabled={!table.getCanNextPage()}
                      className={
                        !table.getCanNextPage()
                          ? "pointer-events-none opacity-50"
                          : undefined
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}`,
      preview: React.createElement(LoadingSkeletonDemo),
    },
    {
      name: "CRUD Table",
      description:
        "Full-featured CRUD table with search, status filter popover, row selection, sortable columns, row actions dropdown (edit, copy ID, delete), and pagination. Demonstrates a real-world data management pattern.",
      code: `"use client"

import { useMemo, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "@/components/ui/data-table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  type ColumnDef,
  type PaginationState,
  type Row,
  type RowSelectionState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  Filter,
  MoreHorizontal,
  Search,
  UserPlus,
  X,
} from "lucide-react"
import { toast } from "sonner"

interface Member {
  id: string
  name: string
  avatar: string
  status: "Active" | "Inactive" | "Pending" | "Blocked"
  flag: string
  email: string
  role: string
  joined: string
  location: string
}

const data: Member[] = [
  { id: "1",  name: "Dr. Anika Sharma",      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&h=96&dpr=2&q=80", status: "Active",   flag: "in", email: "anika.sharma@ohc.in",     role: "Senior Consultant",     joined: "Jan, 2024", location: "India" },
  { id: "2",  name: "Dr. Sarah Mitchell",    avatar: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=96&h=96&dpr=2&q=80", status: "Inactive", flag: "gb", email: "sarah.mitchell@ohc.in",   role: "Consultant",            joined: "Mar, 2023", location: "United Kingdom" },
  { id: "3",  name: "Dr. David Okafor",      avatar: "https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?w=96&h=96&dpr=2&q=80", status: "Blocked",  flag: "ng", email: "david.okafor@ohc.in",     role: "Head of Department",    joined: "Jun, 2022", location: "Nigeria" },
  { id: "4",  name: "Nurse Elena Fischer",   avatar: "https://images.unsplash.com/photo-1485893086445-ed75865251e0?w=96&h=96&dpr=2&q=80", status: "Inactive", flag: "de", email: "elena.fischer@ohc.in",    role: "Senior Nurse",          joined: "Sep, 2024", location: "Germany" },
  { id: "5",  name: "Dr. Hiroshi Tanaka",    avatar: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=96&h=96&dpr=2&q=80", status: "Active",   flag: "jp", email: "hiroshi.tanaka@ohc.in",   role: "Consultant",            joined: "Nov, 2023", location: "Japan" },
  { id: "6",  name: "Dr. Ravi Menon",        avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=96&h=96&dpr=2&q=80", status: "Pending",  flag: "in", email: "ravi.menon@ohc.in",       role: "Senior Consultant",     joined: "Feb, 2022", location: "India" },
  { id: "7",  name: "Dr. Carlos Rivera",     avatar: "https://images.unsplash.com/photo-1543299750-19d1d6297053?w=96&h=96&dpr=2&q=80", status: "Inactive", flag: "es", email: "carlos.rivera@ohc.in",    role: "Consultant",            joined: "Aug, 2024", location: "Spain" },
  { id: "8",  name: "Nurse Mei Lin Wong",    avatar: "https://images.unsplash.com/photo-1620075225255-8c2051b6c015?w=96&h=96&dpr=2&q=80", status: "Blocked",  flag: "sg", email: "mei.wong@ohc.in",         role: "Senior Nurse",          joined: "Dec, 2023", location: "Singapore" },
  { id: "9",  name: "Dr. Siddharth Patel",   avatar: "https://images.unsplash.com/photo-1485206412256-701ccc5b93ca?w=96&h=96&dpr=2&q=80", status: "Pending",  flag: "in", email: "siddharth.patel@ohc.in",  role: "Consultant",            joined: "Apr, 2022", location: "India" },
  { id: "10", name: "Dr. Amara Diallo",      avatar: "https://images.unsplash.com/photo-1542595913-85d69b0edbaf?w=96&h=96&dpr=2&q=80", status: "Inactive", flag: "sn", email: "amara.diallo@ohc.in",     role: "Consultant",            joined: "Jul, 2024", location: "Senegal" },
  { id: "11", name: "Dr. Priya Krishnan",    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&h=96&dpr=2&q=80", status: "Blocked",  flag: "in", email: "priya.krishnan@ohc.in",   role: "Staff Physician",       joined: "May, 2023", location: "India" },
  { id: "12", name: "Nurse Rekha Thomas",    avatar: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=96&h=96&dpr=2&q=80", status: "Active",   flag: "in", email: "rekha.thomas@ohc.in",     role: "Charge Nurse",          joined: "Oct, 2024", location: "India" },
]

function ActionsCell({ row }: { row: Row<Member> }) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button className="size-7" size="icon" variant="ghost">
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="start">
        <DropdownMenuItem onClick={() => {}}>Edit</DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            navigator.clipboard.writeText(row.original.id)
            toast.success("Practitioner ID copied", {
              description: row.original.id,
            })
          }}
        >
          Copy ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={() => {}}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function CrudTable() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  })
  const [sorting, setSorting] = useState<SortingState>([
    { id: "name", desc: true },
  ])
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesStatus =
        !selectedStatuses.length || selectedStatuses.includes(item.status)
      const searchLower = searchQuery.toLowerCase()
      const matchesSearch =
        !searchQuery ||
        Object.values(item).join(" ").toLowerCase().includes(searchLower)
      return matchesStatus && matchesSearch
    })
  }, [searchQuery, selectedStatuses])

  const statusCounts = useMemo(() => {
    return data.reduce(
      (acc, item) => {
        acc[item.status] = (acc[item.status] || 0) + 1
        return acc
      },
      {} as Record<string, number>
    )
  }, [])

  const handleStatusChange = (checked: boolean, value: string) => {
    setSelectedStatuses((prev) =>
      checked ? [...prev, value] : prev.filter((v) => v !== value)
    )
  }

  const columns = useMemo<ColumnDef<Member>[]>(
    () => [
      {
        accessorKey: "id",
        id: "id",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            indeterminate={
              !table.getIsAllPageRowsSelected() &&
              table.getIsSomePageRowsSelected()
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        size: 35,
      },
      {
        accessorKey: "name",
        id: "name",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Practitioner" />
        ),
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <Avatar className="size-8">
              <AvatarImage
                src={row.original.avatar}
                alt={row.original.name}
              />
              <AvatarFallback>
                {row.original.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-px">
              <div className="text-foreground font-medium">
                {row.original.name}
              </div>
              <div className="text-muted-foreground">
                {row.original.email}
              </div>
            </div>
          </div>
        ),
        size: 200,
        enableSorting: true,
      },
      {
        accessorKey: "location",
        id: "location",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Location" />
        ),
        cell: ({ row }) => (
          <div className="flex items-center gap-1.5">
            <img
              src={\`https://flagcdn.com/\${row.original.flag.toLowerCase()}.svg\`}
              alt={row.original.flag}
              className="size-4 rounded-full object-cover"
            />
            <div className="text-foreground font-medium">
              {row.original.location}
            </div>
          </div>
        ),
        size: 150,
        enableSorting: true,
      },
      {
        accessorKey: "role",
        id: "role",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Designation" />
        ),
        cell: ({ row }) => (
          <div className="text-foreground font-medium">
            {row.original.role}
          </div>
        ),
        size: 150,
        enableSorting: true,
      },
      {
        accessorKey: "joined",
        id: "joined",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Joined" />
        ),
        cell: ({ row }) => (
          <div className="text-foreground font-medium">
            {row.original.joined}
          </div>
        ),
        size: 150,
        enableSorting: true,
      },
      {
        accessorKey: "status",
        id: "status",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => {
          const status = row.original.status
          if (status === "Active")
            return <Badge variant="success">Active</Badge>
          if (status === "Blocked")
            return <Badge variant="destructive">Blocked</Badge>
          if (status === "Inactive")
            return <Badge variant="info">Inactive</Badge>
          return <Badge variant="warning">On Leave</Badge>
        },
        size: 100,
        enableSorting: true,
      },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => <ActionsCell row={row} />,
        size: 60,
        enableSorting: false,
      },
    ],
    []
  )

  const table = useReactTable({
    columns,
    data: filteredData,
    getRowId: (row) => row.id,
    state: { pagination, sorting, rowSelection },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  const total = table.getFilteredRowModel().rows.length
  const start = total === 0 ? 0 : pagination.pageIndex * pagination.pageSize + 1
  const end = Math.min(
    (pagination.pageIndex + 1) * pagination.pageSize,
    total
  )

  return (
    <Card className="w-full gap-3 py-0">
      <CardHeader className="flex items-center justify-between px-3.5 py-2">
        <div className="flex items-center gap-2.5">
          <InputGroup className="w-48">
            <InputGroupAddon align="inline-start">
              <Search />
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery.length > 0 && (
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  aria-label="Clear"
                  size="icon-xs"
                  onClick={() => setSearchQuery("")}
                >
                  <X />
                </InputGroupButton>
              </InputGroupAddon>
            )}
          </InputGroup>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <Filter />
                Status
                {selectedStatuses.length > 0 && (
                  <Badge size="sm" variant="info">
                    {selectedStatuses.length}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-40" align="start">
              <div className="space-y-3">
                <div className="text-muted-foreground text-xs font-medium">
                  Filters
                </div>
                <div className="space-y-3">
                  {Object.keys(statusCounts).map((status) => (
                    <div
                      key={status}
                      className="flex items-center gap-2.5"
                    >
                      <Checkbox
                        id={status}
                        checked={selectedStatuses.includes(status)}
                        onCheckedChange={(checked) =>
                          handleStatusChange(checked === true, status)
                        }
                      />
                      <Label
                        htmlFor={status}
                        className="flex grow items-center justify-between gap-1.5 font-normal"
                      >
                        {status}
                        <span className="text-muted-foreground">
                          {statusCounts[status]}
                        </span>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <CardAction>
          <Button>
            <UserPlus />
            Add new
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="overflow-hidden border-y px-0 [&_th:first-child:not(:has([data-slot=checkbox])):is(:has([data-slot=button]),:has([data-slot=dropdown-menu-trigger]))_:is([data-slot=button],[data-slot=dropdown-menu-trigger])]:-ms-1 [&_th:not(:first-child):is(:has([data-slot=button]),:has([data-slot=dropdown-menu-trigger]))_:is([data-slot=button],[data-slot=dropdown-menu-trigger])]:-ms-3">
        <ScrollArea orientation="horizontal">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((hg) => (
                <TableRow key={hg.id}>
                  {hg.headers.map((h) => (
                    <TableHead key={h.id} style={{ width: h.getSize() }}>
                      {h.isPlaceholder
                        ? null
                        : flexRender(
                            h.column.columnDef.header,
                            h.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() ? "selected" : undefined}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      style={{ width: cell.column.getSize() }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
      <CardFooter className="border-none bg-transparent! px-3.5 py-2">
        <div className="flex w-full items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {\`\${start} - \${end} of \${total}\`}
          </p>
          <Pagination className="w-auto mx-0">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={(e) => {
                    e.preventDefault()
                    table.previousPage()
                  }}
                  aria-disabled={!table.getCanPreviousPage()}
                  className={
                    !table.getCanPreviousPage()
                      ? "pointer-events-none opacity-50"
                      : undefined
                  }
                />
              </PaginationItem>
              {Array.from({ length: table.getPageCount() }, (_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    isActive={
                      i === table.getState().pagination.pageIndex
                    }
                    onClick={(e) => {
                      e.preventDefault()
                      table.setPageIndex(i)
                    }}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  onClick={(e) => {
                    e.preventDefault()
                    table.nextPage()
                  }}
                  aria-disabled={!table.getCanNextPage()}
                  className={
                    !table.getCanNextPage()
                      ? "pointer-events-none opacity-50"
                      : undefined
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </CardFooter>
    </Card>
  )
}`,
      preview: React.createElement(CrudDemo),
    },
    {
      name: "Footer Totals",
      description:
        "Employee balance table with row selection, sortable columns, row actions, and a footer row that auto-computes the total of the balance column across filtered rows.",
      code: `"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DataTable,
  DataTableColumnHeader,
  DataTableRowActions,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/data-table"
import { type ColumnDef } from "@tanstack/react-table"

interface Employee {
  id: string
  name: string
  avatar: string
  role: string
  status: "Active" | "Inactive" | "Pending" | "Blocked"
  balance: number
}

const employees: Employee[] = [
  { id: "1",  name: "Dr. Anika Sharma",     avatar: "…", role: "Senior Consultant",   status: "Active",   balance: 5143.03 },
  { id: "2",  name: "Dr. Sarah Mitchell",   avatar: "…", role: "Consultant",          status: "Inactive", balance: 4321.87 },
  { id: "3",  name: "Dr. David Okafor",     avatar: "…", role: "Head of Department",  status: "Blocked",  balance: 7654.98 },
  { id: "4",  name: "Nurse Elena Fischer",  avatar: "…", role: "Senior Nurse",        status: "Inactive", balance: 3456.45 },
  { id: "5",  name: "Dr. Hiroshi Tanaka",   avatar: "…", role: "Consultant",          status: "Active",   balance: 9876.54 },
  // ...
]

const statusVariant = {
  Active:   "success",
  Blocked:  "destructive",
  Inactive: "info",
  Pending:  "warning",
} as const

const formatUSD = (n: number) =>
  "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2 })

const columns: ColumnDef<Employee>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        indeterminate={!table.getIsAllPageRowsSelected() && table.getIsSomePageRowsSelected()}
        onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(v) => row.toggleSelected(!!v)}
        aria-label="Select row"
      />
    ),
    footer: () => null,
    enableSorting: false,
    enableHiding: false,
    size: 35,
  },
  {
    id: "name",
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Practitioner" />,
    footer: () => <span className="text-muted-foreground text-xs">Total balance</span>,
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar className="size-8">
          <AvatarImage src={row.original.avatar} alt={row.original.name} />
          <AvatarFallback>{row.original.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
        </Avatar>
        <span className="text-foreground font-medium">{row.original.name}</span>
      </div>
    ),
    size: 200,
    enableSorting: true,
  },
  {
    id: "role",
    accessorKey: "role",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Designation" />,
    footer: () => null,
    cell: ({ row }) => <span className="text-foreground font-medium">{row.original.role}</span>,
    size: 150,
  },
  {
    id: "status",
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    footer: () => null,
    cell: ({ row }) => (
      <Badge variant={statusVariant[row.original.status]}>{row.original.status}</Badge>
    ),
    size: 110,
  },
  {
    id: "balance",
    accessorKey: "balance",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Balance" />,
    footer: ({ table }) => {
      const total = table.getFilteredRowModel().rows.reduce(
        (sum, row) => sum + (row.getValue("balance") as number), 0
      )
      return <span className="font-bold tabular-nums">{formatUSD(total)}</span>
    },
    cell: ({ row }) => (
      <span className="text-foreground font-medium tabular-nums">
        {formatUSD(row.original.balance)}
      </span>
    ),
    size: 130,
  },
  {
    id: "actions",
    enableHiding: false,
    footer: () => null,
    cell: ({ row }) => (
      <DataTableRowActions>
        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(row.original.id)}>
          Copy ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
      </DataTableRowActions>
    ),
  },
]

export function EmployeeBalancesTable() {
  return (
    <DataTable
      columns={columns}
      data={employees}
      filterColumn="name"
      filterPlaceholder="Search practitioners..."
    />
  )
}`,
      preview: React.createElement(FooterTotalsDemo),
    },
    {
      name: "Footer Summary",
      description:
        "Team summary table with a footer row that displays aggregate statistics across filtered rows: member count, active count, average balance, and min/max balance range — all recomputed live as filters change.",
      code: `"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DataTable,
  DataTableColumnHeader,
} from "@/components/ui/data-table"
import { type ColumnDef } from "@tanstack/react-table"

interface Member {
  id: string
  name: string
  avatar: string
  location: string
  flag: string
  status: "Active" | "Inactive" | "Pending" | "Blocked"
  balance: number
}

const members: Member[] = [
  { id: "1",  name: "Dr. Anika Sharma",     avatar: "…", location: "India",          flag: "in", status: "Active",   balance: 5143.03 },
  { id: "2",  name: "Dr. Sarah Mitchell",   avatar: "…", location: "United Kingdom", flag: "gb", status: "Inactive", balance: 4321.87 },
  { id: "3",  name: "Dr. David Okafor",     avatar: "…", location: "Nigeria",        flag: "ng", status: "Blocked",  balance: 7654.98 },
  // ...
]

const statusVariant = {
  Active: "success", Blocked: "destructive", Inactive: "info", Pending: "warning",
} as const

const fmt = (n: number) =>
  "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2 })

const columns: ColumnDef<Member>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Practitioner" />,
    footer: ({ table }) => {
      const count = table.getFilteredRowModel().rows.length
      return (
        <div className="flex flex-col gap-0.5">
          <span className="text-muted-foreground text-xs">Practitioners</span>
          <span className="font-medium tabular-nums">{count}</span>
        </div>
      )
    },
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar className="size-8">
          <AvatarImage src={row.original.avatar} alt={row.original.name} />
          <AvatarFallback>
            {row.original.name.split(" ").map((n) => n[0]).join("")}
          </AvatarFallback>
        </Avatar>
        <span className="text-foreground font-medium">{row.original.name}</span>
      </div>
    ),
    size: 150,
    enableSorting: true,
  },
  {
    id: "location",
    accessorKey: "location",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Location" />,
    footer: ({ table }) => {
      const activeCount = table.getFilteredRowModel().rows
        .filter((r) => r.getValue("status") === "Active").length
      return (
        <div className="flex items-center gap-1.5">
          <span className="text-muted-foreground text-xs">Active</span>
          <Badge variant="success">{activeCount}</Badge>
        </div>
      )
    },
    cell: ({ row }) => (
      <div className="flex items-center gap-1.5">
        <img
          src={\`https://flagcdn.com/\${row.original.flag}.svg\`}
          alt={row.original.flag}
          className="size-4 rounded-full object-cover"
        />
        <span className="text-foreground font-medium">{row.original.location}</span>
      </div>
    ),
    size: 150,
  },
  {
    id: "status",
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    footer: ({ table }) => {
      const rows = table.getFilteredRowModel().rows
      const avg = rows.length
        ? rows.reduce((sum, r) => sum + (r.getValue("balance") as number), 0) / rows.length
        : 0
      return (
        <div className="flex flex-col gap-0.5">
          <span className="text-muted-foreground text-xs">Avg balance</span>
          <span className="font-medium tabular-nums">{fmt(avg)}</span>
        </div>
      )
    },
    cell: ({ row }) => (
      <Badge variant={statusVariant[row.original.status]}>
        {row.original.status}
      </Badge>
    ),
    size: 110,
  },
  {
    id: "balance",
    accessorKey: "balance",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Balance" />,
    footer: ({ table }) => {
      const balances = table.getFilteredRowModel().rows.map(
        (r) => r.getValue("balance") as number
      )
      const min = balances.length ? Math.min(...balances) : 0
      const max = balances.length ? Math.max(...balances) : 0
      return (
        <div className="flex flex-col gap-0.5">
          <span className="text-muted-foreground text-xs">Min / Max</span>
          <span className="font-medium tabular-nums">
            {fmt(min)} – {fmt(max)}
          </span>
        </div>
      )
    },
    cell: ({ row }) => (
      <span className="text-foreground font-medium tabular-nums">
        {fmt(row.original.balance)}
      </span>
    ),
    size: 130,
  },
]

export function TeamSummaryTable() {
  return (
    <DataTable
      columns={columns}
      data={members}
      filterColumn="name"
      filterPlaceholder="Search practitioners..."
    />
  )
}`,
      preview: React.createElement(FooterSummaryDemo),
    },
    {
      name: "Footer Aggregates",
      description:
        "Column aggregate footer showing avg, min, and max for numeric columns (balance & transactions). All stats recompute live as filters change.",
      code: `"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DataTable,
  DataTableColumnHeader,
} from "@/components/ui/data-table"
import { type ColumnDef } from "@tanstack/react-table"

interface Member {
  id: string
  name: string
  avatar: string
  status: "Active" | "Inactive" | "Pending" | "Blocked"
  balance: number
  transactions: number
}

const members: Member[] = [
  { id: "1",  name: "Dr. Anika Sharma",     avatar: "…", status: "Active",   balance: 5143.03, transactions: 48 },
  { id: "2",  name: "Dr. Sarah Mitchell",   avatar: "…", status: "Inactive", balance: 4321.87, transactions: 31 },
  { id: "3",  name: "Dr. David Okafor",     avatar: "…", status: "Blocked",  balance: 7654.98, transactions: 67 },
  // ...
]

const statusVariant = {
  Active: "success", Blocked: "destructive", Inactive: "info", Pending: "warning",
} as const

const fmt = (n: number) =>
  "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2 })

const columns: ColumnDef<Member>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Practitioner" />,
    footer: ({ table }) => {
      const count = table.getFilteredRowModel().rows.length
      return (
        <div className="flex flex-col gap-0.5">
          <span className="text-muted-foreground text-xs">Summary</span>
          <span className="text-foreground font-medium">Across all practitioners</span>
          <span className="text-muted-foreground text-xs tabular-nums">{count} practitioners</span>
        </div>
      )
    },
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar className="size-8">
          <AvatarImage src={row.original.avatar} alt={row.original.name} />
          <AvatarFallback>
            {row.original.name.split(" ").map((n) => n[0]).join("")}
          </AvatarFallback>
        </Avatar>
        <span className="text-foreground font-medium">{row.original.name}</span>
      </div>
    ),
    size: 200,
  },
  {
    id: "status",
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    footer: () => null,
    cell: ({ row }) => (
      <Badge variant={statusVariant[row.original.status]}>{row.original.status}</Badge>
    ),
    size: 110,
  },
  {
    id: "balance",
    accessorKey: "balance",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Balance" />,
    footer: ({ table }) => {
      const balances = table.getFilteredRowModel().rows.map(
        (r) => r.getValue("balance") as number
      )
      const avg = balances.length ? balances.reduce((a, b) => a + b, 0) / balances.length : 0
      const min = balances.length ? Math.min(...balances) : 0
      const max = balances.length ? Math.max(...balances) : 0
      return (
        <div className="flex flex-col gap-0.5">
          <span className="text-muted-foreground text-xs">Avg</span>
          <span className="tabular-nums">{fmt(avg)}</span>
          <span className="text-muted-foreground text-xs tabular-nums">
            {fmt(min)} – {fmt(max)}
          </span>
        </div>
      )
    },
    cell: ({ row }) => (
      <span className="text-foreground font-medium tabular-nums">
        {fmt(row.original.balance)}
      </span>
    ),
    size: 130,
  },
  {
    id: "transactions",
    accessorKey: "transactions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Encounters" />
    ),
    footer: ({ table }) => {
      const txns = table.getFilteredRowModel().rows.map(
        (r) => r.getValue("transactions") as number
      )
      const avg = txns.length ? Math.round(txns.reduce((a, b) => a + b, 0) / txns.length) : 0
      const min = txns.length ? Math.min(...txns) : 0
      const max = txns.length ? Math.max(...txns) : 0
      return (
        <div className="flex flex-col gap-0.5">
          <span className="text-muted-foreground text-xs">Avg</span>
          <span className="tabular-nums">{avg}</span>
          <span className="text-muted-foreground text-xs tabular-nums">
            {min} – {max}
          </span>
        </div>
      )
    },
    cell: ({ row }) => (
      <span className="text-foreground font-medium tabular-nums">
        {row.original.transactions}
      </span>
    ),
    size: 120,
  },
]

export function AggregateTable() {
  return (
    <DataTable
      columns={columns}
      data={members}
      filterColumn="name"
      filterPlaceholder="Search practitioners..."
    />
  )
}`,
      preview: React.createElement(FooterAggregatesDemo),
    },
  ],
  props: [
    {
      name: "columns",
      type: "ColumnDef<TData, TValue>[]",
      description: "TanStack column definitions for the table.",
    },
    {
      name: "data",
      type: "TData[]",
      description: "The data array to display in the table.",
    },
    {
      name: "filterColumn",
      type: "string",
      description:
        "Key of the column to filter on. Defaults to the first filterable column.",
    },
    {
      name: "filterPlaceholder",
      type: "string",
      description: "Placeholder text for the filter input.",
      default: '"Filter..."',
    },
    {
      name: "cellBorder",
      type: "boolean",
      description:
        "Adds vertical borders between columns for a spreadsheet-like grid appearance.",
      default: "false",
    },
    {
      name: "dense",
      type: "boolean",
      description:
        "Reduces cell padding for a compact, high-density table layout.",
      default: "false",
    },
    {
      name: "autoWidth",
      type: "boolean",
      description:
        "Lets columns size to their content instead of stretching to fill the container width.",
      default: "false",
    },
    {
      name: "renderExpandedRow",
      type: "(row: Row<TData>) => React.ReactNode",
      description:
        "Renders expanded content below a row when it is toggled open. Pair with a column that calls row.getToggleExpandedHandler().",
    },
    {
      name: "hideToolbar",
      type: "boolean",
      description:
        "Hides the filter input and column visibility toolbar. Useful for nested sub-tables inside expanded rows.",
      default: "false",
    },
    {
      name: "movableColumns",
      type: "boolean",
      description:
        "Enables column reordering via a header dropdown menu. Each `DataTableColumnHeader` exposes Asc / Desc sort options and Move to Left / Move to Right actions.",
      default: "false",
    },
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes for the wrapper.",
    },
  ],
};
