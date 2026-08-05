import Link from "next/link";
import { Plus } from "lucide-react";

import { connectDB } from "@/lib/mongodb";
import adminService from "@/services/admin.service";

import DoctorTable from "../components/DoctorTable";
import { Button } from "@/components/ui/button";

export default async function DoctorsPage() {
  await connectDB();

  const doctors = await adminService.getDoctors();

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Doctors</h1>
          <p className="text-muted-foreground">Manage doctors</p>
        </div>

        <Button >
          <Link className="flex items-center p-2" href="/admin/doctors/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Doctor
          </Link>
        </Button>
      </div>

      <DoctorTable doctors={doctors} />
    </div>
  );
}
