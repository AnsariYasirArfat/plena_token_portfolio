interface WatchListState {
  tokens: TokenWithHoldings[];
  selectedTokens: string[];
  searchQuery: string;
  pagination: PaginationParams;
  isLoading: boolean;
  error: string | null;
}

interface WatchListFilters {
  search: string;
  sortBy: "name" | "price" | "change24h" | "value";
  sortOrder: "asc" | "desc";
}
