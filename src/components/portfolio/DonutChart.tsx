import React from "react";
import { useAppSelector } from "@/store/hook";
import { calculateTokenDistribution } from "@/utils/helpers";
import { formatPercentage, formatTokenName } from "@/utils/formatters";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const DonutChart: React.FC = () => {
  const { tokens } = useAppSelector((state) => state.portfolio);
  const distribution = calculateTokenDistribution(tokens);

  const chartData = distribution.map((token) => ({
    name: token.name,
    value: token.percentage,
    color: token.color,
  }));

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-sm font-medium text-plena-muted">
        Portfolio Total
      </h2>

      <div className="flex flex-col sm:flex-row flex-wrap  gap-5">
        {/* Donut Chart */}
        <div className="w-40 h-40 mx-auto">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
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
        <div className="flex-1 flex flex-col gap-4">
          {distribution.map((token, index) => (
            <div
              key={token.tokenId + index}
              className="flex items-center justify-between"
            >
              <span className="text-sm font-medium " style={{ color: token.color }}>
                {formatTokenName(token.name, token.symbol)}
              </span>
              <span className="text-sm font-medium text-plena-muted">
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
