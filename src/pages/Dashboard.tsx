import { useState, useEffect } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatCard from "@/components/dashboard/StatCard";
import WaterLevelGauge from "@/components/dashboard/WaterLevelGauge";
import RainIntensityChart from "@/components/dashboard/RainIntensityChart";
import AlertsPanel from "@/components/dashboard/AlertsPanel";
import SystemStatus from "@/components/dashboard/SystemStatus";
import { Droplets, CloudRain, Gauge, Waves, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import supabase from "../supabaseClient";

const Dashboard = () => {
  const [waterLevel, setWaterLevel] = useState(0);
  const [distance, setDistance] = useState(0);
  const [flowRate, setFlowRate] = useState(0);
  const [totalLiters, setTotalLiters] = useState(0);
  // array of timestamp/intensity points for the chart
  const [rainData, setRainData] = useState<{ time: number; intensity: number }[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // 🔹 Récupérer la dernière donnée
  const fetchLatestData = async () => {
    const { data, error } = await supabase
      .from("water_levels")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1);

    if (!error && data.length > 0) {
      setWaterLevel(Number(data[0].level_cm));
      setDistance(Number(data[0].distance_cm ?? 0));
      setFlowRate(Number(data[0].flow_rate_l_min ?? 0));
      setTotalLiters(Number(data[0].total_liters ?? 0));
      setLastUpdate(new Date(data[0].created_at));
    }
  };

  // 🔹 Récupérer l'historique pour le graphique
  const fetchHistory = async () => {
    const { data, error } = await supabase
      .from("water_levels")
      .select("created_at, level_cm, distance_cm, flow_rate_l_min, total_liters")
      .order("created_at", { ascending: true })
      .limit(20);

    if (!error && data) {
      const formatted = data.map((item) => ({
        // store as numeric timestamp to allow time scaling
        time: new Date(item.created_at).getTime(),
        intensity: Number(item.distance_cm ?? item.level_cm),
      }));

      setRainData(formatted);
    }
  };

  // 🔹 Initialisation + Realtime
  useEffect(() => {
    fetchLatestData();
    fetchHistory();

    const channel = supabase
      .channel("realtime-water")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "water_levels",
        },
        (payload) => {
          const newData = payload.new;

          setWaterLevel(Number(newData.level_cm));
          setDistance(Number(newData.distance_cm ?? 0));
          setFlowRate(Number(newData.flow_rate_l_min ?? 0));
          setTotalLiters(Number(newData.total_liters ?? 0));
          setLastUpdate(new Date(newData.created_at));

          setRainData((prev) => [
            ...prev.slice(-19),
            {
              time: new Date(newData.created_at).getTime(),
              intensity: Number(newData.distance_cm ?? newData.level_cm),
            },
          ]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchLatestData();
    await fetchHistory();
    setTimeout(() => setIsRefreshing(false), 800);
  };

  const getWaterStatus = () => {
    if (waterLevel >= 80) return "danger";
    if (waterLevel >= 60) return "warning";
    return "safe";
  };

  const getRainStatus = () => {
    if (distance >= 100) return "danger";
    if (distance >= 50) return "warning";
    return "normal";
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              Tableau de bord
            </h1>
            <p className="text-muted-foreground">
              Surveillance en temps réel du système anti-inondation
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">
              Mis à jour: {lastUpdate.toLocaleTimeString()}
            </span>

            <Button
              variant="glass"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw
                className={`h-4 w-4 ${
                  isRefreshing ? "animate-spin" : ""
                }`}
              />
              Actualiser
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Niveau d'eau"
            value={Math.round(waterLevel)}
            unit="cm"
            icon={Droplets}
            status={getWaterStatus()}
          />

          <StatCard
            title="Distance"
            value={distance.toFixed(1)}
            unit="cm"
            icon={CloudRain}
            status={getRainStatus()}
          />

          <StatCard
            title="Volume total"
            value={totalLiters.toFixed(1)}
            unit="L"
            icon={Waves}
            status="normal"
          />

          <StatCard
            title="Débit d'eau"
            value={flowRate.toFixed(1)}
            unit="L/min"
            icon={Gauge}
            status="safe"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <WaterLevelGauge
              level={Math.round(waterLevel)}
              dangerThreshold={80}
              warningThreshold={60}
            />
            <RainIntensityChart data={rainData} />
          </div>

          <div className="space-y-6">
            <SystemStatus />
            <AlertsPanel />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>
            Système IoT FloodGuard • ESP32 + Capteurs JSN-SR04T & IP68 •
            UPC/L4 FASI 2025-2026
          </p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;