import React from "react";
import { useAppSelector } from "@/store/hook";
import { formatCurrency } from "@/utils/helpers";

const PortfolioTotal: React.FC = () => {
  const { totalValue, lastUpdated } = useAppSelector(
    (state) => state.portfolio
  );

  return (
    <div className="flex flex-col justify-between gap-4">
      <div className="flex flex-col gap-4">
        <p className="text-sm font-medium text-muted-foreground ">
          Portfolio Total
        </p>
        <p className="text-5xl sm:text-6xl font-medium text-white">
          {formatCurrency(totalValue)}
        </p>
      </div>

      <p className="text-sm text-muted-foreground">
        Last updated: {lastUpdated}
      </p>
    </div>
  );
};

export default PortfolioTotal;
