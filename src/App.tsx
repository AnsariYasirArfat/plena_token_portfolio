import React, { useEffect } from "react";
import Header from "./components/layout/Header";
import PortfolioSummary from "./components/portfolio/PortfolioSummary";
import WatchlistTable from "./components/watchlist/WatchlistTable";
import { useAppDispatch, useAppSelector } from "./store/hook";
import { updatePortfolio } from "./store/slices/portfolioSlice";
import { useWalletSync } from "./hooks/useWalletSync";



const App: React.FC = () => {
  useWalletSync()

  const dispatch = useAppDispatch();
  const { tokens } = useAppSelector((state) => state.watchlist);

  useEffect(() => {
    dispatch(updatePortfolio(tokens));
  }, [dispatch, tokens]);

  return (
    <div className="min-h-screen bg-plena-base text-white">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Portfolio Summary */}
        <PortfolioSummary />
        
        {/* Watchlist */}
        <WatchlistTable />
      </main>
    </div>
  );
};

export default App;
