import {connectDB} from "@/lib/mongodb";

import Patient from "@/models/Patients";

import PatientHeader from "../components/PatientHeader";
import PersonalCard from "../components/PersonalCard";
import MedicalCard from "../components/MedicalCard";
import EmergencyCard from "../components/EmergencyCard";
import VisitHistory from "../components/VisitHistory";
import QuickActions from "../components/QuickActions";

export default async function PatientProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await connectDB();

  const { id } = await params;

  const patient = await Patient.findById(id)
    .populate("user")
    .lean();

  if (!patient) {
    return (
      <div className="p-8">
        Patient not found.
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <PatientHeader patient={patient} />

      <QuickActions patientId={id} />

      <div className="grid gap-6 lg:grid-cols-2">
        <PersonalCard patient={patient} />

        <MedicalCard patient={patient} />
      </div>

      <EmergencyCard patient={patient} />

      <VisitHistory patientId={id} />
    </div>
  );
}