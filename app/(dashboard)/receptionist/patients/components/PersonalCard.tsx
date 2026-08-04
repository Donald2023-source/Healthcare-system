interface Props {
  patient: any;
}

export default function PersonalCard({
  patient,
}: Props) {
  return (
    <div className="rounded-xl border p-6">
      <h2 className="mb-4 text-xl font-semibold">
        Personal Information
      </h2>

      <div className="space-y-2">
        <p>Email: {patient.user.email}</p>

        <p>Phone: {patient.user.phoneNumber}</p>

        <p>Gender: {patient.gender}</p>

        <p>Address: {patient.address}</p>
      </div>
    </div>
  );
}