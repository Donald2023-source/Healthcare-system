export default function LabRequestCard() {
  const tests = [
    "Full Blood Count",
    "Malaria Parasite",
    "Urinalysis",
    "Blood Sugar",
  ];

  return (
    <div className="rounded-xl border bg-card p-6">
      <h2 className="mb-4 text-xl font-semibold">
        Laboratory Requests
      </h2>

      <div className="space-y-3">
        {tests.map((test) => (
          <label
            key={test}
            className="flex items-center gap-3"
          >
            <input type="checkbox" />

            {test}
          </label>
        ))}
      </div>
    </div>
  );
}