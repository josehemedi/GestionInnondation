import { Cpu, Wifi, Battery, Thermometer } from "lucide-react";
import { cn } from "@/lib/utils";

interface SystemMetric {
  label: string;
  value: string;
  icon: typeof Cpu;
  status: "online" | "warning" | "offline";
}

const metrics: SystemMetric[] = [
  { label: "ESP32", value: "En ligne", icon: Cpu, status: "online" },
  { label: "Wi-Fi", value: "Connecté", icon: Wifi, status: "online" },
  { label: "Batterie", value: "85%", icon: Battery, status: "online" },
  { label: "Température", value: "28°C", icon: Thermometer, status: "warning" },
];

const statusColors = {
  online: "text-success",
  warning: "text-warning",
  offline: "text-destructive",
};

const SystemStatus = () => {
  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold mb-4">État du système</h3>
      
      <div className="space-y-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div
              key={metric.label}
              className="flex items-center justify-between py-2 border-b border-border last:border-0"
            >
              <div className="flex items-center gap-3">
                <Icon className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">{metric.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={cn("text-sm font-medium", statusColors[metric.status])}>
                  {metric.value}
                </span>
                <span
                  className={cn(
                    "w-2 h-2 rounded-full",
                    metric.status === "online" && "bg-success",
                    metric.status === "warning" && "bg-warning animate-pulse",
                    metric.status === "offline" && "bg-destructive"
                  )}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Dernière mise à jour</span>
          <span className="font-mono text-primary">12:45:32</span>
        </div>
      </div>
    </div>
  );
};

export default SystemStatus;
