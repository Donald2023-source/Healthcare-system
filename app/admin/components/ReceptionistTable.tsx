import ReceptionistRow from "../components/ReceptionistRow";

type Receptionist = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  isActive: boolean;
};

type ReceptionistTableProps = {
  receptionists: Receptionist[];
};

export default function ReceptionistTable({
  receptionists,
}: ReceptionistTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <table className="w-full">
        <thead className="border-b bg-muted/50">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-medium">
              Name
            </th>

            <th className="px-4 py-3 text-left text-sm font-medium">
              Email
            </th>

            <th className="px-4 py-3 text-left text-sm font-medium">
              Phone
            </th>

            <th className="px-4 py-3 text-left text-sm font-medium">
              Status
            </th>

            <th className="px-4 py-3 text-left text-sm font-medium">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {receptionists.length === 0 ? (
            <tr>
              <td
                colSpan={5}
                className="py-10 text-center text-muted-foreground"
              >
                No receptionists found.
              </td>
            </tr>
          ) : (
            receptionists.map((receptionist) => (
              <ReceptionistRow
                key={receptionist._id}
                receptionist={receptionist}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}