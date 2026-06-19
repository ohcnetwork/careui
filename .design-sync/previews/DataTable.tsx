import { DataTable } from "careui";
import type { ColumnDef } from "@tanstack/react-table";

type Patient = {
  id: string;
  name: string;
  dob: string;
  ward: string;
  status: "admitted" | "discharged" | "pending";
};

const patients: Patient[] = [
  { id: "MRN001", name: "Alice Johnson", dob: "1980-04-12", ward: "Cardiology", status: "admitted" },
  { id: "MRN002", name: "Bob Smith", dob: "1975-09-30", ward: "Neurology", status: "discharged" },
  { id: "MRN003", name: "Carol White", dob: "1992-01-07", ward: "Oncology", status: "pending" },
  { id: "MRN004", name: "David Lee", dob: "1968-11-22", ward: "Pediatrics", status: "admitted" },
];

const columns: ColumnDef<Patient>[] = [
  { accessorKey: "id", header: "MRN" },
  { accessorKey: "name", header: "Patient Name" },
  { accessorKey: "dob", header: "Date of Birth" },
  { accessorKey: "ward", header: "Ward" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const s = row.getValue("status") as string;
      const colors: Record<string, string> = {
        admitted: "text-green-700 bg-green-100",
        discharged: "text-gray-600 bg-gray-100",
        pending: "text-yellow-700 bg-yellow-100",
      };
      return (
        <span className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium capitalize ${colors[s] ?? ""}`}>
          {s}
        </span>
      );
    },
  },
];

export function Default() {
  return (
    <div className="w-full">
      <DataTable columns={columns} data={patients} filterColumn="name" filterPlaceholder="Search patients..." />
    </div>
  );
}

export function Dense() {
  return (
    <div className="w-full">
      <DataTable columns={columns} data={patients} dense hideToolbar />
    </div>
  );
}
