
import React from 'react';
import PortfolioTotal from './PortfolioTotal';
import DonutChart from './DonutChart';

const PortfolioSummary: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8  bg-plena-component sm:rounded-lg p-6 sm:mx-6">
      <PortfolioTotal />
      <DonutChart />
    </div>
  );
};

export default PortfolioSummary;