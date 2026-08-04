import { Patient } from "@/types/patient";

interface Props {
  patients: Patient[];
}

export default function PatientTable({ patients }: Props) {
  return (
    <div className="overflow-hidden rounded-lg border">
      <table className="w-full">
        <thead>
          <tr className="bg-muted">
            <th className="p-4 text-left">Hospital No</th>

            <th className="p-4 text-left">Patient</th>

            <th className="p-4 text-left">Phone</th>

            <th className="p-4 text-left">Gender</th>

            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {patients.map((patient) => (
            <tr key={patient._id} className="border-t">
              <td className="p-4">{patient.hospitalNumber}</td>

              <td className="p-4">
                {patient.user.firstName} {patient.user.lastName}
              </td>

              <td className="p-4">{patient.user.phoneNumber}</td>

              <td className="p-4">{patient.gender}</td>

              <td className="p-4">
                <button className="rounded bg-primary px-3 py-1 text-sm text-white">
                  View
                </button>
              </td>
            </tr>
          ))}

          {patients.length === 0 && (
            <tr>
              <td colSpan={5} className="p-6 text-center text-muted-foreground">
                No patients found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
