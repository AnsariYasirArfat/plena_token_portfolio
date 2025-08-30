import React from "react";
import { useAppSelector } from "@/store/hook";
import { calculateTokenDistribution } from "@/utils/helpers";
import { formatPercentage } from "@/utils/formatters";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const DonutChart: React.FC = () => {
  const { tokens } = useAppSelector((state) => state.portfolio);
  const distribution = calculateTokenDistribution(tokens);

  const chartData = distribution.map((token) => ({
    name: `${token.name} (${token.symbol})`,
    value: token.percentage,
    color: token.color,
  }));

  return (
    <div className="bg-plena-component rounded-lg p-6 border border-border">
      <h2 className="text-sm font-medium text-muted-foreground mb-4">
        Portfolio Total
      </h2>

      <div className="flex items-center space-x-6">
        {/* Donut Chart */}
        <div className="w-40 h-40">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={60}
                paddingAngle={2}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-2">
          {distribution.map((token, index) => (
            <div
              key={token.tokenId + index}
              className="flex items-center justify-between"
            >
              <div className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: token.color }}
                />
                <span className="text-sm text-white">
                  {token.name} ({token.symbol})
                </span>
              </div>
              <span className="text-sm text-muted-foreground">
                {formatPercentage(token.percentage)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DonutChart;
