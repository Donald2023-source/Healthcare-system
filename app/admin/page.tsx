import adminService from "@/services/admin.service";
import DashboardCard from "./components/DashboardCard";
import QuickAction from "./components/QuickAction";
import RecentActivity from "./components/RecentActivity";

import { UserPlus, Stethoscope } from "lucide-react";

export default async function AdminDashboard() {
  const stats = await adminService.getDashboardStats();

  return (
    <div className="space-y-8 p-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>

        <p className="text-muted-foreground">Hospital overview</p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <DashboardCard title="Patients" value={stats.patients} />
       ` <DashboardCard title="Doctors" value={stats.doctors} />`
        <DashboardCard title="Receptionists" value={stats.receptionists} />
        </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Quick Actions</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <QuickAction
            title="Add Doctor"
            href="/admin/doctors/new"
            icon={Stethoscope}
          />

          <QuickAction
            title="Add Receptionist"
            href="/admin/receptionists/new"
            icon={UserPlus}
          />
        </div>
      </div>

      <RecentActivity />
    </div>
  );
}
