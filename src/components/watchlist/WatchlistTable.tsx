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
    <div className="flex flex-col gap-4  mb-4 sm:mb-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4 mx-4 sm:mx-6">
        <div className="flex items-center space-x-2">
          <Star
            className="h-5 w-5 text-plena-lime"
            fill="var(--color-plena-lime)"
          />
          <h2 className="text-lg font-medium text-plena-text">Watchlist</h2>
        </div>

        <div className="flex items-center flex-wrap gap-3 ml-auto">
          <Button
            variant="ghost"
            onClick={handleRefreshPrices}
            disabled={isRefreshing || tokens.length === 0}
            className="text-plena-text hover:text-plena-text bg-plena-component hover:bg-white/5"
          >
            <RefreshCw
              className={`h-4 w-4  text-plena-muted ${
                isRefreshing ? "animate-spin" : ""
              }`}
            />
            <span className="hidden sm:block">
              {isRefreshing ? "Refreshing..." : "Refresh Prices"}
            </span>
          </Button>

          <AddTokenModal />
        </div>
      </div>

      <div className="border border-white/8 rounded-lg overflow-x-auto  mx-4 sm:mx-6">
        {/* Table */}
          <Table>
            <TableHeader className="bg-plena-component border-b !border-white/8">
              <TableRow className="hover:bg-plena-component">
                <TableHead className="text-left py-4 px-4 font-medium text-plena-muted">
                  Token
                </TableHead>
                <TableHead className="py-4 px-4 font-medium text-plena-muted">
                  Price
                </TableHead>
                <TableHead className="py-4 px-4 font-medium text-plena-muted">
                  24h %
                </TableHead>
                <TableHead className=" py-4 px-4 font-medium text-plena-muted">
                  Sparkline (7d)
                </TableHead>
                <TableHead className="py-4 px-4 font-medium text-plena-muted">
                  Holdings
                </TableHead>
                <TableHead className="py-4 px-4 font-medium text-plena-muted">
                  Value
                </TableHead>
                <TableHead>{/* Actions */}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedTokens.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-8 text-plena-muted"
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
            {/* Pagination */}
            {tokens.length > 0 && (
              <Pagination
                pagination={pagination}
                onPageChange={handlePageChange}
              />
            )}
          </Table>
      </div>
    </div>
  );
};

export default WatchlistTable;
