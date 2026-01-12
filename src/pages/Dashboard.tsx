import { useState, useEffect } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatCard from "@/components/dashboard/StatCard";
import WaterLevelGauge from "@/components/dashboard/WaterLevelGauge";
import RainIntensityChart from "@/components/dashboard/RainIntensityChart";
import AlertsPanel from "@/components/dashboard/AlertsPanel";
import SystemStatus from "@/components/dashboard/SystemStatus";
import { Droplets, CloudRain, Gauge, Waves, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

// Generate mock rain data
const generateRainData = () => {
  const hours = ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "24:00"];
  return hours.map((time) => ({
    time,
    intensity: Math.random() * 15 + (time === "16:00" ? 10 : 0),
  }));
};

const Dashboard = () => {
  const [waterLevel, setWaterLevel] = useState(45);
  const [rainIntensity, setRainIntensity] = useState(2.5);
  const [rainData, setRainData] = useState(generateRainData());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setWaterLevel((prev) => {
        const change = (Math.random() - 0.5) * 5;
        return Math.max(10, Math.min(95, prev + change));
      });
      setRainIntensity((prev) => {
        const change = (Math.random() - 0.5) * 2;
        return Math.max(0, Math.min(20, prev + change));
      });
      setLastUpdate(new Date());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setRainData(generateRainData());
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const getWaterStatus = () => {
    if (waterLevel >= 80) return "danger";
    if (waterLevel >= 60) return "warning";
    return "safe";
  };

  const getRainStatus = () => {
    if (rainIntensity >= 10) return "danger";
    if (rainIntensity >= 5) return "warning";
    return "normal";
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Tableau de bord</h1>
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
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
              Actualiser
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Niveau d'eau"
            value={Math.round(waterLevel)}
            unit="cm"
            icon={Droplets}
            status={getWaterStatus()}
            trend={{ value: 2.3, isPositive: false }}
          />
          <StatCard
            title="Intensité pluie"
            value={rainIntensity.toFixed(1)}
            unit="mm/h"
            icon={CloudRain}
            status={getRainStatus()}
            trend={{ value: 5.1, isPositive: true }}
          />
          <StatCard
            title="Pression capteur"
            value="1013"
            unit="hPa"
            icon={Gauge}
            status="normal"
          />
          <StatCard
            title="Débit d'eau"
            value="12.4"
            unit="L/min"
            icon={Waves}
            status="safe"
            trend={{ value: 1.2, isPositive: false }}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Charts */}
          <div className="lg:col-span-2 space-y-6">
            <WaterLevelGauge
              level={Math.round(waterLevel)}
              dangerThreshold={80}
              warningThreshold={60}
            />
            <RainIntensityChart data={rainData} />
          </div>

          {/* Right Column - Alerts & Status */}
          <div className="space-y-6">
            <SystemStatus />
            <AlertsPanel />
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>
            Système IoT FloodGuard • ESP32 + Capteurs JSN-SR04T & IP68 • UPC/L4 FASI 2025-2026
          </p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
