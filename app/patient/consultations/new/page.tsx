"use client";

import { useEffect, useState } from "react";
import { Loader2, Send } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/toast";

interface Department {
  _id: string;
  name: string;
  consultationDuration: number;
}

export default function NewConsultationPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [departments, setDepartments] = useState<Department[]>([]);

  const [department, setDepartment] = useState("");
  const [reason, setReason] = useState("");
  const [priority, setPriority] = useState("NORMAL");

  useEffect(() => {
    async function loadDepartments() {
      try {
        const res = await fetch("/api/departments");

        const data = await res.json();
        console.log(data)

        if (res.ok) {
          setDepartments(data.data ?? []);
        }
      } catch (error) {
        console.error(error);

        toast.add({
          title: "Error",
          description: "Unable to load departments.",
        });
      } finally {
        setLoading(false);
      }
    }

    loadDepartments();
  }, []);

  async function handleSubmit() {
    if (!department) {
      toast.add({
        title: "Department Required",
        description: "Please select a department.",
      });

      return;
    }

    if (!reason.trim()) {
      toast.add({
        title: "Reason Required",
        description: "Please describe your symptoms.",
      });

      return;
    }

    try {
      setSubmitting(true);

      const res = await fetch("/api/consultation-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          department,
          reason,
          priority,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.add({
          title: "Error",
          description: data.message,
        });
console.log(data)
        return;
      }

      toast.add({
        title: "Success",
        description: "Consultation request submitted successfully.",
      });

      router.push("/patient/queue");
    } catch (error) {
      console.error(error);

      toast.add({
        title: "Error",
        description: "Something went wrong.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Request Consultation</h1>

        <p className="mt-2 text-muted-foreground">
          Fill in the details below to request a medical consultation.
        </p>
      </div>

      <div className="rounded-2xl border bg-card p-6 shadow-sm space-y-6">
        <div>
          <Label>Department</Label>

          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="mt-2 w-full rounded-md border bg-background p-3"
          >
            <option value="">Select Department</option>

            {departments.map((dept) => (
              <option key={dept._id} value={dept._id}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <Label>Reason for Visit</Label>

          <textarea
            rows={6}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Describe your symptoms or reason for visiting..."
            className="mt-2 w-full rounded-md border bg-background p-3 outline-none"
          />
        </div>

        <div>
          <Label>Priority</Label>

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="mt-2 w-full rounded-md border bg-background p-3"
          >
            <option value="NORMAL">Normal</option>
            <option value="URGENT">Urgent</option>
            <option value="EMERGENCY">Emergency</option>
          </select>
        </div>

        <Button className="w-full" onClick={handleSubmit} disabled={submitting}>
          {submitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Submit Consultation Request
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
