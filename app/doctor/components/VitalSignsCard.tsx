export default function VitalSignsCard() {
  return (
    <div className="rounded-xl border bg-card p-6">
      <h2 className="mb-4 text-xl font-semibold">
        Vital Signs
      </h2>

      <div className="grid gap-4 md:grid-cols-3">
        <input
          placeholder="Temperature"
          className="rounded border p-2"
        />

        <input
          placeholder="Blood Pressure"
          className="rounded border p-2"
        />

        <input
          placeholder="Pulse"
          className="rounded border p-2"
        />

        <input
          placeholder="Weight"
          className="rounded border p-2"
        />

        <input
          placeholder="Height"
          className="rounded border p-2"
        />

        <input
          placeholder="SpO₂"
          className="rounded border p-2"
        />
      </div>
    </div>
  );
}