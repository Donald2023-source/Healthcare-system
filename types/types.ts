import { LucideIcon } from "lucide-react";

export type SidebarItem = {
  title: string;
  href: string;
  icon: LucideIcon;
};

export type AppSidebarProps = {
  title: string;
  subtitle?: string;
  logoIcon?: LucideIcon;
  navigation: SidebarItem[];
  status?: string;
};