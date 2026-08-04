interface Props {
  patient: any;
}

export default function PatientHeader({
  patient,
}: Props) {
  return (
    <div className="rounded-xl border bg-card p-6">
      <h1 className="text-3xl font-bold">
        {patient.user.firstName}{" "}
        {patient.user.lastName}
      </h1>

      <p className="text-muted-foreground">
        Hospital Number:
        {" "}
        {patient.hospitalNumber}
      </p>
    </div>
  );
}