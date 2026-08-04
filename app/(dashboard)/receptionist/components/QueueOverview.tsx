import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const departments = [
  {
    name: "General OPD",
    waiting: 12,
    serving: "GOPD-014",
  },
  {
    name: "Pediatrics",
    waiting: 5,
    serving: "PED-008",
  },
  {
    name: "Dental",
    waiting: 3,
    serving: "DEN-003",
  },
  {
    name: "Eye Clinic",
    waiting: 8,
    serving: "EYE-011",
  },
];

export default function QueueOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Department Queues</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {departments.map((dept) => (
          <div
            key={dept.name}
            className="flex items-center justify-between rounded-lg border p-3"
          >
            <div>
              <h3 className="font-medium">{dept.name}</h3>

              <p className="text-sm text-muted-foreground">
                Serving {dept.serving}
              </p>
            </div>

            <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold">
              {dept.waiting} Waiting
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}