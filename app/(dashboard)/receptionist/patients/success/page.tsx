import Link from "next/link";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{
    hospitalNumber: string;
  }>;
}) {
  const { hospitalNumber } = await searchParams;

  return (
    <div className="mx-auto mt-20 max-w-xl rounded-xl border p-10 text-center">
      <div className="mb-6 text-6xl">✅</div>

      <h1 className="text-3xl font-bold">
        Patient Registered
      </h1>

      <p className="mt-6">
        Hospital Number
      </p>

      <h2 className="text-2xl font-semibold">
        {hospitalNumber}
      </h2>

      <div className="mt-10 flex justify-center gap-4">
        <Link
          href="/receptionist/patients/new"
          className="rounded-lg border px-5 py-2"
        >
          Register Another
        </Link>

        <Link
          href="/receptionist/queue/check-in"
          className="rounded-lg bg-primary px-5 py-2 text-white"
        >
          Check-In Patient
        </Link>
      </div>
    </div>
  );
}