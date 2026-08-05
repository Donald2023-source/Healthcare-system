interface Props {
  patient: any;
}

export default function PatientSummary({
  patient,
}: Props) {
  return (
    <div className="rounded-xl border bg-card p-6">
      <h1 className="text-2xl font-bold">
        {patient.firstName} {patient.lastName}
      </h1>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div>
          <p className="text-sm text-muted-foreground">
            Hospital Number
          </p>

          <p>{patient.hospitalNumber}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Age
          </p>

          <p>{patient.age}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Gender
          </p>

          <p>{patient.gender}</p>
        </div>
      </div>
    </div>
  );
}