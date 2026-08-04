interface Props {
  patient: any;
}

export default function MedicalCard({
  patient,
}: Props) {
  return (
    <div className="rounded-xl border p-6">
      <h2 className="mb-4 text-xl font-semibold">
        Medical Information
      </h2>

      <div className="space-y-2">
        <p>Blood Group: {patient.bloodGroup}</p>

        <p>Genotype: {patient.genotype}</p>

        <p>Allergies: {patient.allergies}</p>

        <p>Conditions: {patient.medicalConditions}</p>
      </div>
    </div>
  );
}