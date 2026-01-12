import { useEffect, useState } from "react";

interface WaterLevelGaugeProps {
  level: number; // 0-100
  maxLevel?: number;
  dangerThreshold?: number;
  warningThreshold?: number;
}

const WaterLevelGauge = ({
  level,
  maxLevel = 100,
  dangerThreshold = 80,
  warningThreshold = 60,
}: WaterLevelGaugeProps) => {
  const [animatedLevel, setAnimatedLevel] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedLevel(level), 100);
    return () => clearTimeout(timer);
  }, [level]);

  const percentage = (animatedLevel / maxLevel) * 100;
  
  const getColor = () => {
    if (percentage >= dangerThreshold) return "from-destructive to-destructive";
    if (percentage >= warningThreshold) return "from-warning to-orange-400";
    return "from-water to-primary";
  };

  const getStatus = () => {
    if (percentage >= dangerThreshold) return { text: "DANGER", color: "text-destructive" };
    if (percentage >= warningThreshold) return { text: "ATTENTION", color: "text-warning" };
    return { text: "NORMAL", color: "text-success" };
  };

  const status = getStatus();

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold mb-4">Niveau d'eau en temps réel</h3>
      
      <div className="flex items-end gap-6">
        {/* Gauge Container */}
        <div className="relative w-24 h-48 bg-secondary/50 rounded-xl overflow-hidden border border-border">
          {/* Water Level */}
          <div
            className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t ${getColor()} transition-all duration-1000 ease-out`}
            style={{ height: `${percentage}%` }}
          >
            {/* Wave Animation */}
            <div className="absolute top-0 left-0 right-0 h-4 overflow-hidden">
              <div className="animate-wave w-full h-full bg-white/20 rounded-t-full" />
            </div>
          </div>

          {/* Threshold Lines */}
          <div
            className="absolute left-0 right-0 border-t-2 border-dashed border-destructive/50"
            style={{ bottom: `${dangerThreshold}%` }}
          >
            <span className="absolute -right-2 -top-3 text-[10px] text-destructive">
              {dangerThreshold}%
            </span>
          </div>
          <div
            className="absolute left-0 right-0 border-t-2 border-dashed border-warning/50"
            style={{ bottom: `${warningThreshold}%` }}
          >
            <span className="absolute -right-2 -top-3 text-[10px] text-warning">
              {warningThreshold}%
            </span>
          </div>

          {/* Measurement Lines */}
          {[25, 50, 75].map((mark) => (
            <div
              key={mark}
              className="absolute left-0 w-2 border-t border-border"
              style={{ bottom: `${mark}%` }}
            />
          ))}
        </div>

        {/* Stats */}
        <div className="flex-1 space-y-4">
          <div>
            <p className="text-muted-foreground text-sm">Niveau actuel</p>
            <p className="text-4xl font-bold">{animatedLevel}<span className="text-lg text-muted-foreground">cm</span></p>
          </div>
          
          <div>
            <p className="text-muted-foreground text-sm">État</p>
            <p className={`text-lg font-semibold ${status.color}`}>{status.text}</p>
          </div>

          <div>
            <p className="text-muted-foreground text-sm">Capteur</p>
            <p className="text-sm font-mono">JSN-SR04T</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaterLevelGauge;
