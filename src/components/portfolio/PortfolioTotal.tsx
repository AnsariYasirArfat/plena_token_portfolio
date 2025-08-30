import React from 'react';
import { useAppSelector } from '@/store/hook';
import { formatCurrency } from '@/utils/helpers';

const PortfolioTotal: React.FC = () => {
  const { totalValue, lastUpdated } = useAppSelector(state => state.portfolio);

  return (
    <div className="bg-plena-component rounded-lg p-6 border border-border">
      <h2 className="text-sm font-medium text-muted-foreground mb-2">
        Portfolio Total
      </h2>
      
      <div className="mb-2">
        <span className="text-3xl font-bold text-white">
          {formatCurrency(totalValue)}
        </span>
      </div>
      
      <p className="text-xs text-muted-foreground">
        Last updated: {lastUpdated}
      </p>
    </div>
  );
};

export default PortfolioTotal;