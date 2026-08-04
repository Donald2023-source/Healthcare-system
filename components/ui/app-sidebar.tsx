"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  UserPlus,
  Search,
  ClipboardList,
  Users,
  LayoutDashboard,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const navigation = [
  {
    title: "Dashboard",
    href: "/receptionist",
    icon: LayoutDashboard,
  },
  {
    title: "Register Patient",
    href: "/receptionist/patients/new",
    icon: UserPlus,
  },
  {
    title: "Search Patients",
    href: "/receptionist/patients",
    icon: Search,
  },
  {
    title: "Check-In Patient",
    href: "/receptionist/queue/check-in",
    icon: ClipboardList,
  },
  {
    title: "View Queue",
    href: "/receptionist/queue",
    icon: Users,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-slate-200/80 bg-white/80 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/80"
    >
      {/* Header */}
      <SidebarHeader className="border-b border-slate-200/60 px-4 py-5 dark:border-slate-800/60">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-primary/20 to-primary/5 text-primary shadow-sm ring-1 ring-primary/10">
            <Users className="h-5 w-5" />
          </div>
          <div className="flex min-w-0 flex-col group-data-[collapsible=icon]:hidden">
            <span className="truncate text-sm font-semibold tracking-tight text-slate-900 dark:text-white">
              Reception
            </span>
            <span className="truncate text-xs text-slate-500 dark:text-slate-400">
              Patient Management
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 text-[11px] font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {navigation.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/receptionist" &&
                    pathname.startsWith(item.href));

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.title}
                      className={cn(
                        "h-10 rounded-xl transition-all duration-200",
                        "hover:bg-slate-100 dark:hover:bg-slate-800/70",
                        isActive &&
                          "bg-primary/10 text-primary shadow-sm hover:bg-primary/15 dark:bg-primary/15 dark:text-primary dark:hover:bg-primary/20",
                      )}
                    >
                      <Link
                        href={item.href}
                        className="flex items-center gap-3"
                      >
                        <item.icon
                          className={cn(
                            "h-4 w-4 shrink-0 transition-colors",
                            isActive
                              ? "text-primary"
                              : "text-slate-500 dark:text-slate-400",
                          )}
                        />
                        <span className="font-medium">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

    
      <SidebarFooter className="border-t border-slate-200/60 p-4 dark:border-slate-800/60">
        <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
          <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
          <span className="text-xs font-medium text-slate-500 group-data-[collapsible=icon]:hidden dark:text-slate-400">
            Reception Desk · Online
          </span>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
