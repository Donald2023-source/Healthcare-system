import Link from "next/link";
import { Plus } from "lucide-react";

import { connectDB } from "@/lib/mongodb";
import adminService from "@/services/admin.service";

import ReceptionistTable from "../../../components/ReceptionistTable";
import { Button } from "@/components/ui/button";

export default async function ReceptionistsPage() {
  await connectDB();

  const rawReceptionists = await adminService.getReceptionists();
  
  const receptionists = rawReceptionists.map((r: any) => ({ ...r, _id: r._id?.toString?.() ?? r._id }));

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Receptionists</h1>

          <p className="text-muted-foreground">Manage receptionists</p>
        </div>

        <Button>
          <Link  className="flex items-center p-2" href="/admin/receptionists/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Receptionist
          </Link>
        </Button>
      </div>

      <ReceptionistTable receptionists={receptionists} />
    </div>
  );
}
