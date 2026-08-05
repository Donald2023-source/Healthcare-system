"use client";

import { useRouter } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";

type Props = {
  receptionist: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    isActive: boolean;
  };
};

export default function ReceptionistRow({ receptionist }: Props) {
  const router = useRouter();

  async function toggleStatus() {
    try {
      const response = await fetch(
        `/api/admin/receptionists/${receptionist._id}/toggle`,
        {
          method: "PATCH",
        },
      );

      const result = await response.json();

      if (!response.ok) {
        toast.add({
          title: "Error",
          description: result.message,
          type: "error",
        });

        return;
      }

      toast.add({
        title: "Success",
        description: result.message,
        type: "success",
      });

      router.refresh();
    } catch {
      toast.add({
        title: "Error",
        description: "Something went wrong.",
        type: "error",
      });
    }
  }

  return (
    <tr className="border-b">
      <td className="px-4 py-3">
        {receptionist.firstName} {receptionist.lastName}
      </td>

      <td className="px-4 py-3">{receptionist.email}</td>

      <td className="px-4 py-3">{receptionist.phoneNumber}</td>

      <td className="px-4 py-3">
        <Badge variant={receptionist.isActive ? "default" : "secondary"}>
          {receptionist.isActive ? "Active" : "Inactive"}
        </Badge>
      </td>

      <td className="px-4 py-3">
        <Button size="sm" variant="outline" onClick={toggleStatus}>
          {receptionist.isActive ? "Deactivate" : "Activate"}
        </Button>
      </td>
    </tr>
  );
}
