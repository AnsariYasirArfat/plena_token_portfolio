import React from "react";
import { useAppSelector } from "@/store/hook";
import { calculateTokenDistribution } from "@/utils/helpers";
import { formatPercentage, formatTokenName } from "@/utils/formatters";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { PieChart as PieChartIcon } from "lucide-react";

const DonutChart: React.FC = () => {
  const { tokens } = useAppSelector((state) => state.portfolio);
  const distribution = calculateTokenDistribution(tokens);

  const chartData = distribution.map((token) => ({
    name: token.name,
    value: token.percentage,
    color: token.color,
  }));

  // Empty state when no tokens
  if (tokens.length === 0) {
    return (
      <div className="flex flex-col gap-5">
        <h2 className="text-sm font-medium text-plena-muted">
          Portfolio Distribution
        </h2>

        <div className="flex flex-col sm:flex-row flex-wrap gap-5">
          {/* Empty Chart Area */}
          <div className="w-40 h-40 mx-auto flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-plena-component flex items-center justify-center">
                <PieChartIcon className="w-24 h-24 text-plena-muted" />
              </div>
              <p className="text-xs text-plena-muted">
                No tokens yet
              </p>
            </div>
          </div>

          {/* Empty Legend */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="text-center sm:text-left">
              <p className="text-sm text-plena-muted mb-2">
                Add tokens to your watchlist to see your portfolio distribution here
              </p>
              <div className="flex flex-col gap-2 text-xs text-plena-muted">
                <div className="flex items-center justify-between">
                  <span>• Token allocation will be shown</span>
                  <span>0%</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span>• Top 5 tokens + Others</span>
                  <span>0%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-sm font-medium text-plena-muted">
        Portfolio Distribution
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
