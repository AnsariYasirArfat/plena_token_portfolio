import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import WatchlistRow from "./WatchlistRow";
import Pagination from "./Pagination";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import {
  removeToken,
  setPagination,
  updateHoldings,
} from "@/store/slices/watchlistSlice";

const WatchlistTableContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const { tokens, pagination } = useAppSelector((state) => state.watchlist);

  const handleUpdateHoldings = (tokenId: string, holdings: number) => {
    dispatch(updateHoldings({ tokenId, holdings }));
  };

  const handleRemoveToken = (tokenId: string) => {
    dispatch(removeToken(tokenId));
  };

  const handlePageChange = (page: number) => {
    dispatch(setPagination({ ...pagination, page }));
  };

  const startIndex = (pagination.page - 1) * pagination.perPage;
  const endIndex = startIndex + pagination.perPage;
  const paginatedTokens = tokens.slice(startIndex, endIndex);

  return (
    <div className="border border-white/8 rounded-lg overflow-x-auto mx-4 sm:mx-6">
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
            <TableHead className="py-4 px-4 font-medium text-plena-muted">
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
                className="text-center py-16 bg-transparent hover:bg-plena-component text-plena-muted"
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
        {tokens.length > 0 && (
          <Pagination pagination={pagination} onPageChange={handlePageChange} />
        )}
      </Table>
    </div>
  );
};

export default WatchlistTableContent;
