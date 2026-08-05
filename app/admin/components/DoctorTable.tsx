import DoctorRow from "./DoctorRow";
import EmptyDoctors from "./EmptyDoctors";

type Props = {
  doctors: any[];
};

export default function DoctorTable({
  doctors,
}: Props) {
  if (!doctors.length) {
    return <EmptyDoctors />;
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
              Department
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
          {doctors.map((doctor) => (
            <DoctorRow
              key={doctor._id}
              doctor={doctor}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}