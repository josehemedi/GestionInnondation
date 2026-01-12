import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  status?: "normal" | "warning" | "danger" | "safe";
  className?: string;
}

const statusStyles = {
  normal: "border-border",
  warning: "border-warning/50 glow-danger",
  danger: "border-destructive/50 glow-danger animate-pulse",
  safe: "border-success/50 glow-safe",
};

const statusBadge = {
  normal: { text: "Normal", bg: "bg-muted text-muted-foreground" },
  warning: { text: "Attention", bg: "bg-warning/20 text-warning" },
  danger: { text: "Danger", bg: "bg-destructive/20 text-destructive" },
  safe: { text: "Sécurisé", bg: "bg-success/20 text-success" },
};

const StatCard = ({
  title,
  value,
  unit,
  icon: Icon,
  trend,
  status = "normal",
  className,
}: StatCardProps) => {
  return (
    <div
      className={cn(
        "glass-card p-6 transition-all duration-300 hover:scale-[1.02]",
        statusStyles[status],
        className
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 rounded-xl bg-primary/10">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <span className={cn("px-2 py-1 rounded-full text-xs font-medium", statusBadge[status].bg)}>
          {statusBadge[status].text}
        </span>
      </div>

      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">{title}</p>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold">{value}</span>
          {unit && <span className="text-muted-foreground">{unit}</span>}
        </div>
      </div>

      {trend && (
        <div className="mt-4 flex items-center gap-1">
          <span
            className={cn(
              "text-xs font-medium",
              trend.isPositive ? "text-success" : "text-destructive"
            )}
          >
            {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
          </span>
          <span className="text-xs text-muted-foreground">depuis 1h</span>
        </div>
      )}
    </div>
  );
};

export default StatCard;
