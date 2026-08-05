import Link from "next/link";
import React from "react";
import {
  CalendarPlus,
  ChevronRight,
  Clock,
  CreditCard,
  FileText,
  HeartPulse,
  User,
} from "lucide-react";

interface Props {
  dashboard: any;
  consultation: any;
}

export default function PatientHomePage({ dashboard, consultation }: Props) {
  const patient = dashboard.patient;
  const queue = dashboard.currentQueue;
  // const consultation = dashboard.recentConsultation;
  const activeRequest = dashboard.activeConsultation;

  const user = patient.user as any;

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-5">
      <section className="rounded-2xl bg-primary p-6 text-primary-foreground shadow-lg">
        <p className="text-sm opacity-80">Hospital Number</p>

        <h2 className="mt-1 text-3xl font-bold">{patient.hospitalNumber}</h2>

        <div className="mt-5 flex flex-wrap gap-2">
          {queue ? (
            <>
              <span className="rounded-full bg-white/20 px-3 py-1 text-xs">
                Queue #{queue.queueNumber}
              </span>

              <span className="rounded-full bg-white/20 px-3 py-1 text-xs">
                {queue.department?.name}
              </span>
            </>
          ) : (
            <span className="rounded-full bg-white/20 px-3 py-1 text-xs">
              No Active Queue
            </span>
          )}
        </div>
      </section>

      {/* Quick Actions */}
      <section>
        <h2 className="mb-4 text-lg font-semibold">Quick Actions</h2>

        <div className="grid grid-cols-2 gap-4">
          <QuickAction
            href="/patient/consultations/new"
            title="Request Consultation"
            icon={<CalendarPlus size={22} />}
          />

          <QuickAction
            href="/patient/records"
            title="Medical Records"
            icon={<FileText size={22} />}
          />

          <QuickAction
            href="/patient/profile"
            title="Profile"
            icon={<User size={22} />}
          />

          <QuickAction
            href="/patient/payments"
            title="Payments"
            icon={<CreditCard size={22} />}
          />
        </div>
      </section>

      {/* Current Queue */}
      <section className="rounded-2xl border bg-card p-5 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-semibold">Current Consultation</h2>

          <HeartPulse className="text-primary" />
        </div>

        {queue ? (
          <>
            <p className="font-medium">{queue.status}</p>

            <p className="mt-1 text-muted-foreground">
              {queue.department?.name}
            </p>

            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">#{queue.queueNumber}</p>

                <p className="text-sm text-muted-foreground">Queue Number</p>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock size={16} />
                Waiting...
              </div>
            </div>

            <Link
              href="/patient/queue"
              className="mt-5 flex items-center gap-2 text-primary"
            >
              View Queue
              <ChevronRight size={18} />
            </Link>
          </>
        ) : (
          <p className="text-muted-foreground">
            You are not currently in a queue.
          </p>
        )}
      </section>

      <section className="rounded-2xl border bg-card p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold">Recent Consultation</h2>

          <FileText className="text-primary" />
        </div>

        {consultation ? (
          <>
            <p className="font-medium">
              {consultation.diagnosis || "No diagnosis"}
            </p>

            <p className="text-sm text-muted-foreground">
              Dr. {(consultation.doctor as any)?.firstName}{" "}
              {(consultation.doctor as any)?.lastName}
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              <p className="mt-1 text-sm text-muted-foreground">
                {consultation?.createdAt
                  ? new Date(consultation.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      },
                    )
                  : "No date scheduled"}
              </p>
            </p>

            <Link
              href={`/patient/records/${consultation._id}`}
              className="mt-5 flex items-center gap-2 text-primary"
            >
              View Details
              <ChevronRight size={18} />
            </Link>
          </>
        ) : (
          <p className="text-muted-foreground">No consultation history.</p>
        )}
      </section>

      {/* Health Summary */}
      <section className="rounded-2xl border bg-card p-5 shadow-sm">
        <h2 className="mb-4 font-semibold">Health Summary</h2>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <Info label="Blood Group" value={patient.bloodGroup ?? "--"} />

          <Info label="Genotype" value={patient.genotype ?? "--"} />

          <Info label="Marital Status" value={patient.maritalStatus ?? "--"} />

          <Info
            label="Status"
            value={activeRequest ? activeRequest.status : "Inactive"}
          />
        </div>
      </section>
    </div>
  );
}

function QuickAction({
  href,
  title,
  icon,
}: {
  href: string;
  title: string;
  icon: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="rounded-2xl border bg-card p-5 shadow-sm transition hover:border-primary hover:shadow-md"
    >
      <div className="mb-4 text-primary">{icon}</div>

      <p className="font-medium">{title}</p>
    </Link>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-muted p-3">
      <p className="text-muted-foreground">{label}</p>

      <p className="mt-1 font-semibold">{value}</p>
    </div>
  );
}
