interface Props {
  patient: any;
}

export default function EmergencyCard({
  patient,
}: Props) {
  return (
    <div className="rounded-xl border p-6">
      <h2 className="mb-4 text-xl font-semibold">
        Emergency Contact
      </h2>

      <div className="space-y-2">
        <p>Name: {patient.emergencyContactName}</p>

        <p>Relationship: {patient.emergencyRelationship}</p>

        <p>Phone: {patient.emergencyContactPhone}</p>

        <p>Address: {patient.emergencyContactAddress}</p>
      </div>
    </div>
  );
}