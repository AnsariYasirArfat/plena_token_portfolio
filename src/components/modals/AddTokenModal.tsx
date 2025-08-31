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
import { Star, Plus, Check } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
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
        <Button variant="plena">
          <Plus className="h-4 w-4" />
          Add Token
        </Button>
      </DialogTrigger>

      <DialogContent
        className="bg-plena-base border border-white/8 rounded-lg w-full h-full max-w-xl max-h-[480px] p-0 overflow-hidden flex flex-col "
        showCloseButton={false}
      >
        {/* Search Input - No Header */}
        <div className="border-b border-white/8">
          <Input
            id="search-tokens"
            placeholder="Search tokens (e.g., ETH, SOL)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className=" text-plena-text placeholder:text-plena-muted h-12 text-base   focus-visible:ring-0 border-none focus-visible:border-none"
          />
        </div>

        {/* Token List - Scrollable Area */}
        <div className="flex-1 overflow-hidden px-2">
          {debouncedSearch && searchLoading ? (
            <div className="flex items-center justify-center h-full text-plena-muted">
              Searching...
            </div>
          ) : trendingLoading ? (
            <div className="flex items-center justify-center h-full text-plena-muted">
              Loading trending tokens...
            </div>
          ) : displayTokens.length === 0 ? (
            <div className="flex items-center justify-center h-full text-plena-muted">
              {debouncedSearch
                ? "No tokens found"
                : "No trending tokens available"}
            </div>
          ) : (
            <div className="h-full overflow-y-auto">
              {!debouncedSearch && (
                <div className="text-sm font-medium text-plena-muted mb-4 sticky top-0 p-2 bg-plena-base">
                  Trending
                </div>
              )}

              <div className="space-y-2 pb-4">
                {displayTokens.map((token) => {
                  const isSelected = selectedTokenIds.includes(token.id);
                  return (
                    <div
                      key={token.id}
                      className={`flex items-center justify-between p-2 rounded-md cursor-pointer transition-all duration-200 ${
                        isSelected
                          ? "bg-plena-lime/10 "
                          : "bg-transparent hover:bg-plena-base/50"
                      }`}
                      onClick={() => handleTokenSelect(token.id)}
                    >
                      <div className="w-full flex items-center space-x-3 ">
                        <img
                          src={token.image}
                          alt={token.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <p className="font-medium text-plena-text truncate">
                          {token.name}
                          <span className="ml-1 text-sm text-plena-muted">
                            {`(${token.symbol.toUpperCase()})`}
                          </span>
                        </p>
                      </div>

                      <div className="flex items-center space-x-2">
                        {isSelected && (
                          <Star
                            className="h-4 w-4 text-plena-lime"
                            fill="var(--color-plena-lime)"
                          />
                        )}
                        <div
                          className={`w-4 h-4 rounded-full  flex items-center justify-center ${
                            isSelected
                              ? "bg-plena-lime "
                              : "border-2 border-plena-muted"
                          }`}
                        >
                          {isSelected && (
                            <Check className="w-3 h-3 rounded-full" />
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer - Single Button */}
        <div className="p-3 border-t border-white/8 bg-plena-component">
          <div className="flex justify-end">
            <Button
              variant={"plena"}
              onClick={handleAddToWatchlist}
              disabled={selectedTokenIds.length === 0 || selectedTokensLoading}
              className="disabled:bg-transparent disabled:text-plena-muted disabled:border-plena-muted"
            >
              {selectedTokensLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Adding...
                </>
              ) : (
                "Add to Wishlist"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddTokenModal;
