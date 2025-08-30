import React from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

interface SparklineChartProps {
  token: TokenWithHoldings;
  width?: number;
  height?: number;
}

const SparklineChart: React.FC<SparklineChartProps> = ({ 
  token, 
  width = 80, 
  height = 30 
}) => {
  const chartData = token.sparkline_in_7d.price.map((price, index) => ({
    price,
    day: index,
  }));

  const isPositive = token.price_change_percentage_24h >= 0;
  const lineColor = isPositive ? "#10b981" : "#ef4444"; 

  return (
    <div style={{ width, height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 2, right: 2, bottom: 2, left: 2 }}>
          <Line
            type="monotone"
            dataKey="price"
            stroke={lineColor}
            strokeWidth={1.5}
            dot={false}
            activeDot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SparklineChart;