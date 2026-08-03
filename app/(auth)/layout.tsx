import type { ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="min-h-screen bg-muted/30 flex items-center justify-center px-4">
      <section className="w-full max-w-md">{children}</section>
    </main>
  );
}
