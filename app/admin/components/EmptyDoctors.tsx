import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function EmptyDoctors() {
  return (
    <div className="rounded-xl border border-dashed p-10 text-center">
      <h2 className="text-xl font-semibold">
        No doctors found
      </h2>

      <p className="mt-2 text-muted-foreground">
        Add your first doctor to begin.
      </p>

      <Button className="mt-6">
        <Link href="/admin/doctors/new">
          Add Doctor
        </Link>
      </Button>
    </div>
  );
}