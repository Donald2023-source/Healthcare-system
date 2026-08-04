import Link from "next/link"; // or your router Link
import { cn } from "@/lib/utils";

interface QuickActionProps {
  href: string;
  title: string;
  description?: string;
  icon: React.ReactNode;
}

export default function QuickAction({
  href,
  title,
  description,
  icon,
}: QuickActionProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex flex-col gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm",
        "transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg",
        "dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-slate-700"
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition-colors group-hover:bg-primary/10 group-hover:text-primary dark:bg-slate-800 dark:text-slate-300 dark:group-hover:bg-primary/20">
        {icon}
      </div>

      <div>
        <h3 className="font-semibold text-slate-900 dark:text-white">
          {title}
        </h3>
        {description && (
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {description}
          </p>
        )}
      </div>

      {/* subtle arrow hint */}
      <span className="absolute right-4 top-5 text-slate-300 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100 dark:text-slate-600">
        →
      </span>
    </Link>
  );
}