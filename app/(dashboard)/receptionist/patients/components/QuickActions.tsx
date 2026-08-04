import Link from "next/link";

interface Props {
  patientId: string;
}

export default function QuickActions({
  patientId,
}: Props) {
  return (
    <div className="flex flex-wrap gap-3">
      <Link
        href={`/receptionist/queue/check-in/${patientId}`}
        className="rounded-lg bg-primary px-5 py-2 text-white"
      >
        Check In
      </Link>

      <Link
        href={`/receptionist/patients/${patientId}/edit`}
        className="rounded-lg border px-5 py-2"
      >
        Edit
      </Link>

      <Link
        href={`/receptionist/patients`}
        className="rounded-lg border px-5 py-2"
      >
        Back
      </Link>
    </div>
  );
}   