import {
  Users,
  ClipboardList,
  Activity,
  FlaskConical,
} from "lucide-react";

import DashboardCard from "../../../app/(dashboard)/receptionist/components/DashboardCard";
import QueueTable from "../components/QueueTable";

export default function DoctorDashboard() {
  return (
    <div className="space-y-8 p-6">
      <div>
        <h1 className="text-3xl font-bold">
          Doctor Dashboard
        </h1>

        <p className="text-muted-foreground">
          Manage consultations and patient queues.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <DashboardCard
          title="Waiting Patients"
          value={18}
          icon={<Users className="h-5 w-5" />}
          
        />

        <DashboardCard
          title="Seen Today"
          value={24}
          icon={<ClipboardList className="h-5 w-5" />}
        />

        <DashboardCard
          title="Active Consultation"
          value={1}
          icon={<Activity className="h-5 w-5" />}
        />

        <DashboardCard
          title="Pending Lab Results"
          value={6}
          icon={<FlaskConical className="h-5 w-5" />}
        />
      </div>

      <QueueTable />
    </div>
  );
}