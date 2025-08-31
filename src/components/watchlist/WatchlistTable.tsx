import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hook";
import {
  updateHoldings,
  removeToken,
  setPagination,
  updateTokenPrices,
} from "@/store/slices/watchlistSlice";
import { useGetMarketDataQuery } from "@/store/slices/apiSlice";
import WatchlistRow from "./WatchlistRow";
import Pagination from "./Pagination";
import AddTokenModal from "@/components/modals/AddTokenModal";
import { Button } from "@/components/ui/button";
import { RefreshCw, Star } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const WatchlistTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const { tokens, pagination } = useAppSelector((state) => state.watchlist);

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

  const handleUpdateHoldings = (tokenId: string, holdings: number) => {
    dispatch(updateHoldings({ tokenId, holdings }));
  };

  const handleRemoveToken = (tokenId: string) => {
    dispatch(removeToken(tokenId));
  };

  const handlePageChange = (page: number) => {
    dispatch(setPagination({ ...pagination, page }));
  };

  const handleRefreshPrices = async () => {
    if (tokens.length === 0) return;

    try {
      setRefreshTrigger((prev) => prev + 1);

      await refetch();
    } catch (error) {
      console.error("Error refreshing prices:", error);
    }
  };

  const startIndex = (pagination.page - 1) * pagination.perPage;
  const endIndex = startIndex + pagination.perPage;
  const paginatedTokens = tokens.slice(startIndex, endIndex);

  return (
    <div className="bg-plena-component rounded-lg border border-border">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap   p-6 border-b border-border">
        <div className="flex items-center space-x-2">
          <Star className="h-5 w-5 text-plena-lime" />
          <h2 className="text-lg font-semibold text-white">Watchlist</h2>
        </div>

        <div className="flex items-center  flex-wrap space-x-3">
          <Button
            variant="outline"
            onClick={handleRefreshPrices}
            disabled={isRefreshing || tokens.length === 0}
            className="border-border text-muted-foreground hover:bg-plena-base"
          >
            <RefreshCw
              className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
            />
            {isRefreshing ? "Refreshing..." : "Refresh Prices"}
          </Button>

          <AddTokenModal />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-border hover:bg-transparent">
              <TableHead className="text-left py-4 px-4 font-medium text-muted-foreground">
                Token
              </TableHead>
              <TableHead className="text-right py-4 px-4 font-medium text-muted-foreground">
                Price
              </TableHead>
              <TableHead className="text-right py-4 px-4 font-medium text-muted-foreground">
                24h %
              </TableHead>
              <TableHead className="text-center py-4 px-4 font-medium text-muted-foreground">
                Sparkline (7d)
              </TableHead>
              <TableHead className="text-right py-4 px-4 font-medium text-muted-foreground">
                Holdings
              </TableHead>
              <TableHead className="text-right py-4 px-4 font-medium text-muted-foreground">
                Value
              </TableHead>
              <TableHead className="text-center py-4 px-4 font-medium text-muted-foreground">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedTokens.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-8 text-muted-foreground"
                >
                  No tokens in watchlist. Add some tokens to get started!
                </TableCell>
              </TableRow>
            ) : (
              paginatedTokens.map((token) => (
                <WatchlistRow
                  key={token.id}
                  token={token}
                  onUpdateHoldings={handleUpdateHoldings}
                  onRemoveToken={handleRemoveToken}
                />
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {tokens.length > 0 && (
        <Pagination pagination={pagination} onPageChange={handlePageChange} />
      )}
    </div>
  );
};

export default WatchlistTable;
