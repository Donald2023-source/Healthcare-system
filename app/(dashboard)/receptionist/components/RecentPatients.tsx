import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const patients = [
  {
    name: "Donald Yusuf",
    ticket: "GOPD-021",
    time: "9:15 AM",
  },
  {
    name: "Mary James",
    ticket: "PED-010",
    time: "9:21 AM",
  },
  {
    name: "David Musa",
    ticket: "EYE-005",
    time: "9:28 AM",
  },
];

export default function RecentPatients() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Check-ins</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {patients.map((patient) => (
          <div
            key={patient.ticket}
            className="flex justify-between border-b pb-3 last:border-none"
          >
            <div>
              <p className="font-medium">{patient.name}</p>

              <p className="text-sm text-muted-foreground">
                {patient.ticket}
              </p>
            </div>

            <span className="text-sm text-muted-foreground">
              {patient.time}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}