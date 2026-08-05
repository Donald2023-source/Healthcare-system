import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";

export default function ReceptionistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar role="receptionist" />

      <main className="flex-1 overflow-auto">
        <SidebarTrigger className="m-4" />
        {children}
      </main>
    </SidebarProvider>
  );
}