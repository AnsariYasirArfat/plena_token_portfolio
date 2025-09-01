import { useMemo, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import {
  useGetTrendingTokensQuery,
  useSearchTokensQuery,
  useGetMarketDataQuery,
} from "@/store/slices/apiSlice";
import { useAppDispatch } from "@/store/hook";
import { addTokens } from "@/store/slices/watchlistSlice";

function normalizeToken(token: TrendingToken | SearchToken): DisplayToken {
  if ("item" in token) {
    return {
      id: token.item.id,
      name: token.item.name,
      symbol: token.item.symbol,
      image: token.item.large,
      market_cap_rank: token.item.market_cap_rank,
    };
  }
  return {
    id: token.id,
    name: token.name,
    symbol: token.symbol,
    image: token.large,
    market_cap_rank: token.market_cap_rank,
  };
}

export function useTokenPicker() {
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

 const displayTokens: DisplayToken[] = useMemo(() => {
    if (debouncedSearch && searchData?.coins) {
      return searchData.coins.map(normalizeToken);
    }
    if (trendingData?.coins) {
      return trendingData.coins.map(normalizeToken);
    }
    return [];
  }, [debouncedSearch, searchData, trendingData]);

  return {
    isOpen,
    setIsOpen,
    searchQuery,
    setSearchQuery,
    debouncedSearch,
    displayTokens,
    trendingLoading,
    searchLoading,
    selectedTokenIds,
    handleTokenSelect,
    selectedTokensData,
    selectedTokensLoading,
    handleAddToWatchlist
  };
}
