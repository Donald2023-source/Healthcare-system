import Link from "next/link";
import { LucideIcon } from "lucide-react";

type QuickActionProps = {
  title: string;
  href: string;
  icon: LucideIcon;
};

export default function QuickAction({
  title,
  href,
  icon: Icon,
}: QuickActionProps) {
  return (
    <Link
      href={href}
      className="flex items-center gap-4 rounded-xl border bg-card p-5 transition hover:border-primary hover:bg-primary/5"
    >
      <div className="rounded-lg bg-primary/10 p-3">
        <Icon className="h-5 w-5 text-primary" />
      </div>

      <span className="font-medium">{title}</span>
    </Link>
  );
}