import ReceptionistRow from "./ReceptionistFlow";
import EmptyReceptionists from "./EmptyReceptionist";

type Props = {
  receptionists: any[];
};

export default function ReceptionistTable({
  receptionists,
}: Props) {
  if (!receptionists.length) {
    return <EmptyReceptionists />;
  }

  return (
    <div className="overflow-hidden rounded-xl border">
      <table className="w-full">
        <thead className="bg-muted">
          <tr>
            <th className="px-4 py-3 text-left">
              Name
            </th>

            <th className="px-4 py-3 text-left">
              Email
            </th>

            <th className="px-4 py-3 text-left">
              Phone
            </th>

            <th className="px-4 py-3 text-left">
              Status
            </th>

            <th className="px-4 py-3 text-left">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {receptionists.map((receptionist) => (
            <ReceptionistRow
              key={receptionist._id}
              receptionist={receptionist}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}