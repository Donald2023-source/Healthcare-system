"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Home,
  FileText,
  User,
} from "lucide-react";

import { cn } from "@/lib/utils";

const links = [
  {
    href: "/patient",
    label: "Home",
    icon: Home,
  },
  {
    href: "/patient/history",
    label: "History",
    icon: FileText,
  },
  {
    href: "/patient/profile",
    label: "Profile",
    icon: User,
  },
];

export default function PatientBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-1/2 z-50 w-full max-w-md -translate-x-1/2 border-t bg-background">
      <div className="flex h-16 items-center justify-around">
        {links.map((link) => {
          const Icon = link.icon;

          const active =
            pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex flex-col items-center gap-1 text-xs transition-colors",
                active
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              <Icon className="h-5 w-5" />

              <span>{link.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}