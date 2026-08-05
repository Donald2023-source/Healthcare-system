import { Bell } from "lucide-react";
import { auth } from "@/auth";
import patientService from "@/services/patient.service";
import PatientBottomNav from "./components/PatientBottomNav";

export default async function PatientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  const patient = await patientService.getProfile(session.user.id);

  if (!patient) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Patient profile not found.</p>
      </div>
    );
  }

  const user = patient.user as any;

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 17
      ? "Good Afternoon"
      : "Good Evening";

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Header */}
      <header className="sticky top-0 z-20 rounded-b-3xl bg-primary text-primary-foreground shadow">
        <div className="mx-auto flex max-w-5xl items-center justify-between p-6">
          <div>
            <p className="text-sm opacity-80">
              {greeting} 👋
            </p>

            <h1 className="text-2xl font-bold">
              {user.firstName} {user.lastName}
            </h1>

            <p className="mt-1 text-sm opacity-80">
              {patient.hospitalNumber}
            </p>
          </div>

          <button className="rounded-full bg-white/10 p-3 transition hover:bg-white/20">
            <Bell className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Page */}
      <main className="mx-auto max-w-5xl pb-24">
        {children}
      </main>

      {/* Bottom Navigation */}
      <PatientBottomNav />
    </div>
  );
}