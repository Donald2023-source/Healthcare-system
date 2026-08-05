import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import ReceptionistForm from "../../components/ReceptionistForm";
import { Button } from "@/components/ui/button";

export default function NewReceptionistPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 p-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon">
          <Link href="/admin/receptionists">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>

        <div>
          <h1 className="text-3xl font-bold">
            Add Receptionist
          </h1>

          <p className="text-muted-foreground">
            Create a new receptionist account.
          </p>
        </div>
      </div>

      <ReceptionistForm />
    </div>
  );
}