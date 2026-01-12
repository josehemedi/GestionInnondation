import { AlertTriangle, Bell, CheckCircle, Info, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetClose } from "@/components/ui/sheet";

interface Alert {
  id: string;
  type: "danger" | "warning" | "info" | "success";
  title: string;
  message: string;
  time: string;
}

const mockAlerts: Alert[] = [
  {
    id: "1",
    type: "warning",
    title: "Niveau d'eau élevé",
    message: "Le niveau d'eau approche le seuil d'alerte (60cm)",
    time: "Il y a 5 min",
  },
  {
    id: "2",
    type: "info",
    title: "Pluie détectée",
    message: "Précipitations légères détectées (2.5mm/h)",
    time: "Il y a 15 min",
  },
  {
    id: "3",
    type: "success",
    title: "Système opérationnel",
    message: "Tous les capteurs fonctionnent normalement",
    time: "Il y a 1h",
  },
];

const alertStyles = {
  danger: {
    icon: AlertTriangle,
    bg: "bg-destructive/10",
    border: "border-destructive/30",
    iconColor: "text-destructive",
  },
  warning: {
    icon: Bell,
    bg: "bg-warning/10",
    border: "border-warning/30",
    iconColor: "text-warning",
  },
  info: {
    icon: Info,
    bg: "bg-info/10",
    border: "border-info/30",
    iconColor: "text-info",
  },
  success: {
    icon: CheckCircle,
    bg: "bg-success/10",
    border: "border-success/30",
    iconColor: "text-success",
  },
};

const AlertsPanel = () => {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [showAll, setShowAll] = useState(false);

  const dismissAlert = (id: string) => {
    setAlerts(alerts.filter((alert) => alert.id !== id));
  };

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">Alertes récentes</h3>
          <p className="text-sm text-muted-foreground">{alerts.length} alertes actives</p>
        </div>
        <button className="text-sm text-primary hover:underline" onClick={() => setShowAll(true)}>
          Voir tout
        </button>
      </div>

      <div className="space-y-3">
        {alerts.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <CheckCircle className="h-12 w-12 mx-auto mb-3 text-success" />
            <p>Aucune alerte active</p>
          </div>
        ) : (
          alerts.map((alert) => {
            const style = alertStyles[alert.type];
            const Icon = style.icon;

            return (
              <div
                key={alert.id}
                className={cn(
                  "flex items-start gap-3 p-4 rounded-lg border transition-all",
                  style.bg,
                  style.border
                )}
              >
                <Icon className={cn("h-5 w-5 mt-0.5 shrink-0", style.iconColor)} />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{alert.title}</p>
                  <p className="text-sm text-muted-foreground truncate">{alert.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                </div>
                <button
                  onClick={() => dismissAlert(alert.id)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* Sheet popup for full alerts list */}
      <Sheet open={showAll} onOpenChange={setShowAll}>
        <SheetContent side="right" className="max-w-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Toutes les alertes</h3>
            <SheetClose asChild>
              <button className="text-muted-foreground hover:text-foreground">
                <X className="h-4 w-4" />
              </button>
            </SheetClose>
          </div>

          <div className="space-y-3">
            {alerts.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">Aucune alerte</div>
            ) : (
              alerts.map((alert) => {
                const style = alertStyles[alert.type];
                const Icon = style.icon;

                return (
                  <div
                    key={alert.id}
                    className={cn(
                      "flex items-start gap-3 p-4 rounded-lg border transition-all",
                      style.bg,
                      style.border
                    )}
                  >
                    <Icon className={cn("h-5 w-5 mt-0.5 shrink-0", style.iconColor)} />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{alert.title}</p>
                      <p className="text-sm text-muted-foreground truncate">{alert.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                    </div>
                    <button
                      onClick={() => setAlerts((prev) => prev.filter((a) => a.id !== alert.id))}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AlertsPanel;
