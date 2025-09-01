import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { useGetMarketDataQuery } from "@/store/slices/apiSlice";
import { updateTokenPrices } from "@/store/slices/watchlistSlice";

interface RefreshButtonProps {
  className?: string;
}

const RefreshButton: React.FC<RefreshButtonProps> = ({ className = "" }) => {
  const dispatch = useAppDispatch();
  const { tokens } = useAppSelector((state) => state.watchlist);

  const [refreshTrigger, setRefreshTrigger] = React.useState(0);
  const {
    data: refreshedTokens,
    isLoading: isRefreshing,
    refetch,
  } = useGetMarketDataQuery(
    {
      ids: tokens.map((token) => token.id),
      sparkline: true,
    },
    {
      skip: tokens.length === 0 || refreshTrigger === 0,
    }
  );

  useEffect(() => {
    if (refreshedTokens && refreshedTokens.length > 0) {
      dispatch(updateTokenPrices(refreshedTokens));
    }
  }, [refreshedTokens, dispatch]);

  const handleRefreshPrices = async () => {
    if (tokens.length === 0) return;

    try {
      setRefreshTrigger((prev) => prev + 1);
      await refetch();
    } catch (error) {
      console.error("Error refreshing prices:", error);
    }
  };
  return (
    <Button
      variant="ghost"
      onClick={handleRefreshPrices}     
      disabled={isRefreshing || tokens.length === 0}
      className={`text-plena-text hover:text-plena-text bg-plena-component hover:bg-white/5 ${className}`}
    >
      <RefreshCw
        className={`h-4 w-4 text-plena-muted ${
          isRefreshing ? "animate-spin" : ""
        }`}
      />
      <span className="hidden sm:block">
        {isRefreshing ? "Refreshing..." : "Refresh Prices"}
      </span>
    </Button>
  );
};

export default RefreshButton;
