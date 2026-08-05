export default function RecentActivity() {
  return (
    <div className="rounded-2xl border bg-card p-6">
      <h2 className="mb-4 text-lg font-semibold">
        Recent Activity
      </h2>

      <div className="space-y-3">
        <Activity text="Patient registration" />
        <Activity text="Doctor added" />
        <Activity text="Receptionist created" />
      </div>
    </div>
  );
}

function Activity({
  text,
}: {
  text: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-2 w-2 rounded-full bg-primary" />

      <span className="text-sm">
        {text}
      </span>
    </div>
  );
}