import { notFound } from "next/navigation";
import {
  User,
  Phone,
  Mail,
  MapPin,
  HeartPulse,
  Droplets,
  ShieldPlus,
  Calendar,
} from "lucide-react";

import patientService from "@/services/patient.service";
import { connectDB } from "@/lib/mongodb";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function PatientDetailsPage({ params }: Props) {
  await connectDB();

  const { id } = await params;

  const patient = await patientService.findById(id);

  if (!patient) {
    notFound();
  }

  const initials = `${patient.user.firstName[0]}${patient.user.lastName[0]}`;

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      {/* Header */}

      <Card className="shadow-sm">
        <CardContent className="flex flex-col gap-6 p-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:text-left">
            <Avatar className="h-20 w-20 text-xl">
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>

            <div>
              <h1 className="text-3xl font-bold">
                {patient.user.firstName} {patient.user.lastName}
              </h1>

              <p className="mt-1 text-muted-foreground">
                Hospital Number:{" "}
                <span className="font-medium text-foreground">
                  {patient.hospitalNumber}
                </span>
              </p>

              <div className="mt-4 flex flex-wrap justify-center gap-2 sm:justify-start">
                <Badge>{patient.gender}</Badge>

                <Badge variant="secondary">Patient</Badge>

                <Badge
                  variant={patient.user.isActive ? "default" : "destructive"}
                >
                  {patient.user.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
            <Button className="w-full sm:w-auto">
              Edit Profile
            </Button>

            <Button
              variant="outline"
              className="w-full sm:w-auto"
            >
              <Link
                href={`/receptionist/patients/${patient._id}`}
                className="flex items-center gap-2"
              >
                Edit Profile
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Information */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* Personal */}

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <InfoRow
              icon={<User size={18} />}
              label="Full Name"
              value={`${patient.user.firstName} ${patient.user.lastName}`}
            />

            <InfoRow
              icon={<Phone size={18} />}
              label="Phone Number"
              value={patient.user.phoneNumber}
            />

            <InfoRow
              icon={<Mail size={18} />}
              label="Email"
              value={patient.user.email}
            />

            <InfoRow
              icon={<Calendar size={18} />}
              label="Date of Birth"
              value={
                patient.dateOfBirth
                  ? new Date(patient.dateOfBirth).toLocaleDateString()
                  : "-"
              }
            />

            <InfoRow
              icon={<MapPin size={18} />}
              label="Address"
              value={patient.address || "-"}
            />
          </CardContent>
        </Card>

        {/* Medical */}

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Medical Information</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <InfoRow
              icon={<Droplets size={18} />}
              label="Blood Group"
              value={patient.bloodGroup || "-"}
            />

            <InfoRow
              icon={<HeartPulse size={18} />}
              label="Genotype"
              value={patient.genotype || "-"}
            />

            <InfoRow
              icon={<ShieldPlus size={18} />}
              label="Emergency Contact"
              value={patient.emergencyContactName || "-"}
            />

            <InfoRow
              icon={<Phone size={18} />}
              label="Emergency Phone"
              value={patient.emergencyContactPhone || "-"}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-4 rounded-xl border bg-card p-4 transition-colors hover:bg-muted/40">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm text-muted-foreground">
          {label}
        </p>

        <p className="break-words font-medium">
          {value}
        </p>
      </div>
    </div>
  );
}