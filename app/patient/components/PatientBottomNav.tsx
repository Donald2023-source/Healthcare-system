"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Home, Stethoscope, FileText, User } from "lucide-react";

const navigation = [
  {
    name: "Home",
    href: "/patient",
    icon: Home,
  },
  {
    name: "Consult",
    href: "/patient/consultations",
    icon: Stethoscope,
  },
  {
    name: "Records",
    href: "/patient/records",
    icon: FileText,
  },
  {
    name: "Profile",
    href: "/patient/profile",
    icon: User,
  },
];

export default function PatientBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t bg-background">
      <div className="mx-auto flex max-w-5xl justify-around p-3">
        {navigation.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href || pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 text-xs transition ${
                active
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              <Icon className="h-5 w-5" />

              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
