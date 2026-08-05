import {
  LayoutDashboard,
  Calendar,
  History,
  Stethoscope,
  UserPlus,
  Search,
  UserCog,
  ClipboardList,
  Users,
} from "lucide-react";



export const adminSidebar = {
  title: "Admin",
  subtitle: "Hospital Management",
  logoIcon: UserCog,
  status: "Online",

  navigation: [
    {
      title: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      title: "Doctors",
      href: "/admin/doctors",
      icon: Stethoscope,
    },
    {
      title: "Receptionists",
      href: "/admin/receptionists",
      icon: Users,
    },
  ],
};

export const doctorSidebar = {
  title: "Doctor",
  subtitle: "Consultation",
  logoIcon: Stethoscope,
  status: "Online",

  navigation: [
    {
      title: "Dashboard",
      href: "/doctor/dashboard",
      icon: LayoutDashboard,
    },

    {
      title: "Queue",
      href: "/doctor/queue",
      icon: Users,
    },
    {
      title: "History",
      href: "/doctor/history",
      icon: History,
    },
  ],
};

export const receptionistSidebar = {
  title: "Reception",
  subtitle: "Patient Management",
  logoIcon: Users,
  status: "Online",

  navigation: [
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
  ],
};
