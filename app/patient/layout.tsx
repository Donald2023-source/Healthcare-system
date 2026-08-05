import Link from "next/link";

import { Home, Stethoscope, FileText, User, Bell } from "lucide-react";

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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

  return (
    <div
      className="
min-h-screen
bg-muted/20
"
    >
      {/* Top Header */}

      <header
        className="
sticky
top-0
z-10
bg-primary
text-primary-foreground
rounded-b-3xl
"
      >
        <div
          className="
mx-auto
max-w-5xl
p-6
"
        >
          <div
            className="
flex
items-center
justify-between
"
          >
            <div>
              <p className="text-sm opacity-80">Good Morning 👋</p>

              <h1
                className="
text-2xl
font-bold
"
              >
                Donald Yusuf
              </h1>
            </div>

            <button>
              <Bell className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Page Content */}

      <main
        className="
mx-auto
max-w-5xl
pb-24
"
      >
        {children}
      </main>

      {/* Bottom Navigation */}

      <nav
        className="
fixed
bottom-0
left-0
right-0
border-t
bg-background
"
      >
        <div
          className="
mx-auto
max-w-5xl
flex
justify-around
p-3
"
        >
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                href={item.href}
                key={item.href}
                className="
flex
flex-col
items-center
gap-1
text-xs
text-muted-foreground
hover:text-primary
"
              >
                <Icon className="h-5 w-5" />

                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
