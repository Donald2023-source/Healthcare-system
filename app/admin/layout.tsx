import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { adminSidebar } from "@/constants/sidebar";
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar role="admin" />
      <main className="flex-1 overflow-auto">
        <SidebarTrigger className="m-4" />
        {children}
      </main>
    </SidebarProvider>
  );
}
