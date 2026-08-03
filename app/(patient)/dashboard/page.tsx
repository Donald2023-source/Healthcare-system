import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">
        Welcome {session.user.name}
      </h1>

      <p className="text-muted-foreground mt-2">
        Patient Dashboard
      </p>
    </div>
  );
}