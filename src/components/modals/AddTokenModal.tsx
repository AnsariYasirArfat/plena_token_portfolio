import React, { useState } from "react";
import { useAppDispatch } from "@/store/hook";
import { addTokens } from "@/store/slices/watchlistSlice";
import {
  useGetTrendingTokensQuery,
  useSearchTokensQuery,
  useGetMarketDataQuery,
} from "@/store/slices/apiSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Star, Check, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDebounce } from "@/hooks/useDebounce";

const normalizeToken = (token: TrendingToken | SearchToken): DisplayToken => {
  if ("item" in token) {
    // TrendingToken
    return {
      id: token.item.id,
      name: token.item.name,
      symbol: token.item.symbol,
      image: token.item.large,
      market_cap_rank: token.item.market_cap_rank,
    };
  } else {
    // SearchToken
    return {
      id: token.id,
      name: token.name,
      symbol: token.symbol,
      image: token.large,
      market_cap_rank: token.market_cap_rank,
    };
  }
};

const AddTokenModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTokenIds, setSelectedTokenIds] = useState<string[]>([]);

  const debouncedSearch = useDebounce(searchQuery, 500);

  // Get trending tokens
  const { data: trendingData, isLoading: trendingLoading } =
    useGetTrendingTokensQuery();

  // Search tokens
  const { data: searchData, isLoading: searchLoading } = useSearchTokensQuery(
    { query: debouncedSearch },
    { skip: !debouncedSearch || debouncedSearch.length < 2 }
  );

  // Get full token data for selected tokens
  const { data: selectedTokensData, isLoading: selectedTokensLoading } =
    useGetMarketDataQuery(
      { ids: selectedTokenIds, sparkline: true },
      { skip: selectedTokenIds.length === 0 }
    );

  const handleTokenSelect = (tokenId: string) => {
    setSelectedTokenIds((prev) =>
      prev.includes(tokenId)
        ? prev.filter((id) => id !== tokenId)
        : [...prev, tokenId]
    );
  };

  const handleAddToWatchlist = () => {
    if (selectedTokensData && selectedTokensData.length > 0) {
      const tokensWithHoldings = selectedTokensData.map((token: Token) => ({
        ...token,
        holdings: 0,
        value: 0,
        percentage: 0,
      }));

      dispatch(addTokens(tokensWithHoldings));

      setIsOpen(false);
      setSelectedTokenIds([]);
      setSearchQuery("");
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedTokenIds([]);
    setSearchQuery("");
  };

  const getDisplayTokens = (): DisplayToken[] => {
    if (debouncedSearch && searchData?.coins) {
      return searchData.coins.map(normalizeToken);
    } else if (trendingData?.coins) {
      return trendingData.coins.map(normalizeToken);
    }
    return [];
  };

  const displayTokens = getDisplayTokens();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={"plena"}>
          <Plus className="h-4 w-4" />
          Add Token
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-plena-component border-border max-w-2xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-plena-text">Add Token</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-plena-muted" />
            <Input
              placeholder="Search tokens (e.g., ETH, SOL)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-background border-border text-plena-text placeholder:text-plena-muted"
            />
          </div>

          {/* Token List */}
          <div className="max-h-96 overflow-y-auto space-y-2">
            {debouncedSearch && searchLoading ? (
              <div className="text-center py-8 text-plena-muted">
                Searching...
              </div>
            ) : trendingLoading ? (
              <div className="text-center py-8 text-plena-muted">
                Loading trending tokens...
              </div>
            ) : displayTokens.length === 0 ? (
              <div className="text-center py-8 text-plena-muted">
                {debouncedSearch
                  ? "No tokens found"
                  : "No trending tokens available"}
              </div>
            ) : (
              <>
                {!debouncedSearch && (
                  <div className="text-sm font-medium text-plena-muted mb-3">
                    Trending
                  </div>
                )}

                {displayTokens.map((token) => (
                  <div
                    key={token.id}
                    className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedTokenIds.includes(token.id)
                        ? "bg-plena-lime/10 border-plena-lime"
                        : "bg-background border-border hover:bg-plena-base"
                    }`}
                    onClick={() => handleTokenSelect(token.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={token.image}
                        alt={token.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <div className="font-medium text-plena-text">
                          {token.name}
                        </div>
                        <div className="text-sm text-plena-muted">
                          {token.symbol.toUpperCase()}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      {selectedTokenIds.includes(token.id) && (
                        <>
                          <Star className="h-4 w-4 text-yellow-500" />
                          <Check className="h-4 w-4 text-plena-lime" />
                        </>
                      )}
                      <div
                        className={`w-4 h-4 rounded-full border-2 ${
                          selectedTokenIds.includes(token.id)
                            ? "bg-plena-lime border-plena-lime"
                            : "border-border"
                        }`}
                      >
                        {selectedTokenIds.includes(token.id) && (
                          <div className="w-full h-full bg-plena-lime rounded-full" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-border">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              onClick={handleAddToWatchlist}
              disabled={selectedTokenIds.length === 0 || selectedTokensLoading}
              className="bg-plena-lime text-plena-base hover:bg-plena-lime/90"
            >
              {selectedTokensLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-plena-base border-t-transparent rounded-full animate-spin mr-2" />
                  Adding...
                </>
              ) : (
                `Add to Watchlist (${selectedTokenIds.length})`
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddTokenModal;
