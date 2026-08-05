"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Droplets,
  Heart,
  LogOut,
  Hash,
} from "lucide-react";

import { api } from "@/lib/api";
import { toast } from "@/components/ui/toast";

type PatientProfile = {
  hospitalNumber: string;
  gender: string;
  dateOfBirth: string;
  bloodGroup: string;
  genotype: string;
  maritalStatus: string;
  address: string;

  user: {
    firstName: string;
    middleName?: string;
    lastName: string;
    email: string;
    phoneNumber: string;
  };
};

export default function PatientProfilePage() {
  const router = useRouter();

  const [patient, setPatient] =
    useState<PatientProfile | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const response = await api<{
        data: PatientProfile;
      }>("/api/patient/profile");

      setPatient(response.data);
    } catch (error: any) {
      toast.add({
        title: "Error",
        description:
          error.message || "Failed to load profile",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    localStorage.removeItem("token");

    toast.add({
      title: "Logged out",
      description: "See you next time.",
      type: "success",
    });

    router.replace("/login");
  }

  if (loading) {
    return (
      <div className="p-6">
        Loading profile...
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="p-6">
        Profile not found.
      </div>
    );
  }

  return (
    <div className="space-y-6 p-5">
      <div className="flex flex-col items-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
          <User className="h-12 w-12 text-primary" />
        </div>

        <h1 className="mt-4 text-2xl font-bold text-center">
          {patient.user.firstName}{" "}
          {patient.user.middleName}{" "}
          {patient.user.lastName}
        </h1>

        <p className="text-muted-foreground">
          {patient.hospitalNumber}
        </p>
      </div>

      <div className="space-y-4 rounded-2xl border bg-card p-5">

        <ProfileItem
          icon={<Hash className="h-5 w-5" />}
          label="Hospital Number"
          value={patient.hospitalNumber}
        />

        <ProfileItem
          icon={<Mail className="h-5 w-5" />}
          label="Email"
          value={patient.user.email}
        />

        <ProfileItem
          icon={<Phone className="h-5 w-5" />}
          label="Phone"
          value={patient.user.phoneNumber}
        />

        <ProfileItem
          icon={<User className="h-5 w-5" />}
          label="Gender"
          value={patient.gender}
        />

        <ProfileItem
          icon={<Calendar className="h-5 w-5" />}
          label="Date of Birth"
          value={new Date(
            patient.dateOfBirth
          ).toLocaleDateString()}
        />

        <ProfileItem
          icon={<Droplets className="h-5 w-5" />}
          label="Blood Group"
          value={patient.bloodGroup}
        />

        <ProfileItem
          icon={<Heart className="h-5 w-5" />}
          label="Genotype"
          value={patient.genotype}
        />

        <ProfileItem
          icon={<MapPin className="h-5 w-5" />}
          label="Address"
          value={patient.address}
        />
      </div>

      <button
        onClick={logout}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3 font-medium text-white"
      >
        <LogOut className="h-5 w-5" />
        Logout
      </button>
    </div>
  );
}

function ProfileItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-4 border-b pb-4 last:border-none last:pb-0">
      <div className="mt-1 text-primary">
        {icon}
      </div>

      <div>
        <p className="text-sm text-muted-foreground">
          {label}
        </p>

        <p className="font-medium">
          {value || "-"}
        </p>
      </div>
    </div>
  );
}