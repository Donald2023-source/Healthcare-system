"use client";

import {
  Clock,
  Hospital,
  Users,
  CheckCircle2,
  Circle,
  Phone,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export default function QueuePage() {
  const queue = {
    queueNumber: 12,
    department: "General OPD",
    estimatedWait: 15,
    peopleAhead: 8,
    currentNumber: 4,
    status: "WAITING",
    doctor: null,
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-5">

      <div>
        <h1 className="text-3xl font-bold">
          Queue Status
        </h1>

        <p className="text-muted-foreground mt-2">
          Follow your consultation progress in real time.
        </p>
      </div>

      <div className="rounded-3xl bg-primary p-6 text-center text-primary-foreground">

        <p className="text-sm opacity-80">
          Queue Number
        </p>

        <h2 className="mt-2 text-6xl font-bold">
          #{queue.queueNumber}
        </h2>

        <p className="mt-4 text-lg">
          {queue.department}
        </p>

      </div>

      <div className="grid grid-cols-2 gap-4">

        <StatCard
          icon={<Clock />}
          title="Estimated Wait"
          value={`${queue.estimatedWait} mins`}
        />

        <StatCard
          icon={<Users />}
          title="People Ahead"
          value={queue.peopleAhead}
        />

        <StatCard
          icon={<Hospital />}
          title="Current Number"
          value={`#${queue.currentNumber}`}
        />

        <StatCard
          icon={<Users />}
          title="Doctor"
          value={queue.doctor ?? "Pending"}
        />

      </div>

      <div className="rounded-2xl border bg-card p-6">

        <h2 className="mb-6 text-lg font-semibold">
          Consultation Progress
        </h2>

        <TimelineItem
          completed
          title="Consultation Requested"
        />

        <TimelineItem
          active
          title="Waiting in Queue"
        />

        <TimelineItem
          title="Doctor Assigned"
        />

        <TimelineItem
          title="Consultation In Progress"
        />

        <TimelineItem
          title="Completed"
        />

      </div>

      <Button
        variant="outline"
        className="w-full"
      >
        <Phone className="mr-2 h-4 w-4" />

        Contact Reception
      </Button>

    </div>
  );
}

function StatCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border bg-card p-5">

      <div className="mb-4 text-primary">
        {icon}
      </div>

      <p className="text-sm text-muted-foreground">
        {title}
      </p>

      <p className="mt-1 text-xl font-bold">
        {value}
      </p>

    </div>
  );
}

function TimelineItem({
  title,
  completed,
  active,
}: {
  title: string;
  completed?: boolean;
  active?: boolean;
}) {
  return (
    <div className="mb-5 flex items-center gap-3">

      {completed ? (
        <CheckCircle2 className="text-green-600" />
      ) : active ? (
        <Clock className="text-primary" />
      ) : (
        <Circle className="text-muted-foreground" />
      )}

      <span
        className={
          active
            ? "font-semibold"
            : "text-muted-foreground"
        }
      >
        {title}
      </span>

    </div>
  );
}