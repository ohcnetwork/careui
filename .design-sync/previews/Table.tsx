import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "careui";

export function Default() {
  return (
    <div className="w-full">
      <Table>
        <TableCaption>Patient roster — Ward A</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Ward</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>John Smith</TableCell>
            <TableCell>Active</TableCell>
            <TableCell>Cardiology</TableCell>
            <TableCell>2024-01-15</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Jane Doe</TableCell>
            <TableCell>Pending</TableCell>
            <TableCell>Neurology</TableCell>
            <TableCell>2024-01-16</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Robert Chen</TableCell>
            <TableCell>Discharged</TableCell>
            <TableCell>Oncology</TableCell>
            <TableCell>2024-01-17</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Maria Garcia</TableCell>
            <TableCell>Active</TableCell>
            <TableCell>Pediatrics</TableCell>
            <TableCell>2024-01-18</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>James Wilson</TableCell>
            <TableCell>Pending</TableCell>
            <TableCell>Emergency</TableCell>
            <TableCell>2024-01-19</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total Patients</TableCell>
            <TableCell>5</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}

export function WithoutCaption() {
  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>MRN</TableHead>
            <TableHead>Patient Name</TableHead>
            <TableHead>Date of Birth</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>MRN-001</TableCell>
            <TableCell>Alice Johnson</TableCell>
            <TableCell>1980-04-12</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>MRN-002</TableCell>
            <TableCell>Bob Martinez</TableCell>
            <TableCell>1975-09-30</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>MRN-003</TableCell>
            <TableCell>Carol White</TableCell>
            <TableCell>1992-01-07</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
