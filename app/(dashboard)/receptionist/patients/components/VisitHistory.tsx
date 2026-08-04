interface Props {
  patientId: string;
}

export default function VisitHistory({
  patientId,
}: Props) {
  return (
    <div className="rounded-xl border p-6">
      <h2 className="mb-4 text-xl font-semibold">
        Visit History
      </h2>

      <p className="text-muted-foreground">
        No visits recorded yet.
      </p>
    </div>
  );
}