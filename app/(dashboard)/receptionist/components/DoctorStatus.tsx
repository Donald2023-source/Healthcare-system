import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const doctors = [
  {
    name: "Dr. Sarah",
    status: "Available",
  },
  {
    name: "Dr. James",
    status: "Busy",
  },
  {
    name: "Dr. Daniel",
    status: "Available",
  },
];

export default function DoctorStatus() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Doctors</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {doctors.map((doctor) => (
          <div
            key={doctor.name}
            className="flex items-center justify-between"
          >
            <span>{doctor.name}</span>

            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                doctor.status === "Available"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {doctor.status}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}