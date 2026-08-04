import {
  Users,
  CalendarDays,
  UserPlus,
  ClipboardList,
  Search,
  Activity,
} from "lucide-react";

import DashboardCard from "./components/DashboardCard";
import QuickAction from "./components/QuickAction";
import QueueOverview from "./components/QueueOverview";
import DoctorStatus from "./components/DoctorStatus";
import RecentPatients from "./components/RecentPatients";

export default function ReceptionistDashboard() {
  return (
    <div className="min-h-screen border flex-1 bg-linear-to-br from-slate-50 via-white to-slate-100/80 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="mx-auto border space-y-10 p-6 md:p-8 lg:p-10">
        {/* Header */}
        <header className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-4xl">
            Receptionist Dashboard
          </h1>
          <p className="text-base text-slate-500 dark:text-slate-400">
            Manage patients, appointments and queues in real time.
          </p>
        </header>

        {/* Stats Grid */}
        <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <DashboardCard
            title="Patients Waiting"
            value={23}
            subtitle="Currently in queue"
            icon={<Users className="h-5 w-5" />}
            accent="from-blue-500/10 to-blue-500/5 text-blue-600 dark:text-blue-400"
          />

          <DashboardCard
            title="Checked-in Today"
            value={61}
            subtitle="Today's registrations"
            icon={<ClipboardList className="h-5 w-5" />}
            accent="from-emerald-500/10 to-emerald-500/5 text-emerald-600 dark:text-emerald-400"
          />

          <DashboardCard
            title="Appointments"
            value={18}
            subtitle="Scheduled today"
            icon={<CalendarDays className="h-5 w-5" />}
            accent="from-violet-500/10 to-violet-500/5 text-violet-600 dark:text-violet-400"
          />

          <DashboardCard
            title="Doctors Available"
            value={12}
            subtitle="Ready for consultation"
            icon={<Activity className="h-5 w-5" />}
            accent="from-amber-500/10 to-amber-500/5 text-amber-600 dark:text-amber-400"
          />
        </section>

        {/* Quick Actions */}
        <section>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
              Quick Actions
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <QuickAction
              href="/receptionist/patients/new"
              title="Register Patient"
              description="Add a new patient record"
              icon={<UserPlus className="h-6 w-6" />}
            />

            <QuickAction
              href="/receptionist/patients"
              title="Search Patient"
              description="Find existing records"
              icon={<Search className="h-6 w-6" />}
            />

            <QuickAction
              href="/receptionist/queue/check-in"
              title="Check-In Patient"
              description="Start the visit process"
              icon={<ClipboardList className="h-6 w-6" />}
            />

            <QuickAction
              href="/receptionist/queue"
              title="View Queue"
              description="See current waiting list"
              icon={<Users className="h-6 w-6" />}
            />
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <QueueOverview />
          </div>

          <DoctorStatus />
        </section>

        <section>
          <RecentPatients />
        </section>
      </div>
    </div>
  );
}
