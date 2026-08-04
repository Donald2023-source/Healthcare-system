import { cn } from "@/lib/utils"; // or your cn helper

interface DashboardCardProps {
  title: string;
  value: number | string;
  subtitle: string;
  icon: React.ReactNode;
  accent?: string;
}

export default function DashboardCard({
  title,
  value,
  subtitle,
  icon,
  accent = "from-slate-500/10 to-slate-500/5 text-slate-600 dark:text-slate-300",
}: DashboardCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/70">
      <div className="flex items-start justify-between">
        <div className="space-y-3">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {title}
          </p>
          <p className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            {value}
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            {subtitle}
          </p>
        </div>

        <div
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br",
            accent,
          )}
        >
          {icon}
        </div>
      </div>

      {/* subtle bottom accent line on hover */}
      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-transparent via-current to-transparent opacity-0 transition-all duration-500 group-hover:w-full group-hover:opacity-100" />
    </div>
  );
}
