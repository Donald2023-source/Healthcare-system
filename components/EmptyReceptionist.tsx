import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function EmptyReceptionists() {
  return (
    <div className="rounded-xl border border-dashed p-10 text-center">
      <h2 className="text-xl font-semibold">
        No receptionists found
      </h2>

      <p className="mt-2 text-muted-foreground">
        Add your first receptionist.
      </p>

      <Button
        
        className="mt-6"
      >
        <Link href="/admin/receptionists/new">
          Add Receptionist
        </Link>
      </Button>
    </div>
  );
}   