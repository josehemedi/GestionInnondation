import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface RainData {
  // timestamp in milliseconds, not a formatted string
  time: number;
  intensity: number;
}

interface RainIntensityChartProps {
  data: RainData[];
}

const RainIntensityChart = ({ data }: RainIntensityChartProps) => {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">Distance</h3>
          <p className="text-sm text-muted-foreground">Dernières valeurs</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rain" />
          <span className="text-sm text-muted-foreground">cm</span>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="rainGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0.4} />
                <stop offset="95%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(216, 28%, 20%)" />
            <XAxis
              dataKey="time"
              type="number"
              domain={["dataMin", "dataMax"]}
              scale="time"
              stroke="hsl(215, 20%, 65%)"
              fontSize={12}
              tickLine={false}
              tickFormatter={(ts) => new Date(ts).toLocaleTimeString()}
            />
            <YAxis
              stroke="hsl(215, 20%, 65%)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(216, 28%, 10%)",
                border: "1px solid hsl(216, 28%, 25%)",
                borderRadius: "8px",
                color: "hsl(210, 40%, 98%)",
              }}
              labelStyle={{ color: "hsl(215, 20%, 65%)" }}
              labelFormatter={(ts) => new Date(ts).toLocaleTimeString()}
            />
            <Area
              type="monotone"
              dataKey="intensity"
              stroke="hsl(217, 91%, 60%)"
              strokeWidth={2}
              fill="url(#rainGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RainIntensityChart;
