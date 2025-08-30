import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { localStorageService } from "@/services/localStorage";

// Load initial state from localStorage
const loadInitialState = (): WatchListState => {
  const stored = localStorageService.watchlist.load();
  
  if (stored) {
    return stored;
  }

  return {
    tokens: [],
    selectedTokens: [],
    searchQuery: "",
    pagination: {
      page: 1,
      perPage: 10,
      total: 0,
    },
    isLoading: false,
    error: null,
  };
};

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState: loadInitialState(),
  reducers: {
    // Add tokens to watchlist
    addTokens: (state, action: PayloadAction<Token[]>) => {
      const newTokens = action.payload.map((token) => ({
        ...token,
        holdings: 0,
        value: 0,
        percentage: 0,
      }));

      // Filter out duplicates
      const existingIds = new Set(state.tokens.map((t) => t.id));
      const uniqueNewTokens = newTokens.filter(
        (token) => !existingIds.has(token.id)
      );

      state.tokens.push(...uniqueNewTokens);
      state.pagination.total = state.tokens.length;

      localStorageService.watchlist.save(state);
    },

    // Remove token from watchlist
    removeToken: (state, action: PayloadAction<string>) => {
      state.tokens = state.tokens.filter(
        (token) => token.id !== action.payload
      );
      state.pagination.total = state.tokens.length;

      localStorageService.watchlist.save(state);
    },

    // Update token holdings
    updateHoldings: (
      state,
      action: PayloadAction<{ tokenId: string; holdings: number }>
    ) => {
      const { tokenId, holdings } = action.payload;
      const token = state.tokens.find((t) => t.id === tokenId);

      if (token) {
        token.holdings = holdings;
        token.value = token.current_price * holdings;

        localStorageService.watchlist.save(state);
      }
    },

    // Update token prices (from API)
    updateTokenPrices: (state, action: PayloadAction<Token[]>) => {
      const updatedTokens = action.payload;

      state.tokens = state.tokens.map((token) => {
        const updatedToken = updatedTokens.find((t) => t.id === token.id);
        if (updatedToken) {
          return {
            ...token,
            current_price: updatedToken.current_price,
            price_change_percentage_24h:
              updatedToken.price_change_percentage_24h,
            sparkline_in_7d: updatedToken.sparkline_in_7d,
            value: token.holdings * updatedToken.current_price,
          };
        }
        return token;
      });

      
      localStorageService.watchlist.save(state);
    },

    // Set search query
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },

    // Set selected tokens
    setSelectedTokens: (state, action: PayloadAction<string[]>) => {
      state.selectedTokens = action.payload;
    },

    // Update pagination
    setPagination: (state, action: PayloadAction<PaginationParams>) => {
      state.pagination = action.payload;
    },

    // Set loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    // Set error state
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    // Clear watchlist
    clearWatchlist: (state) => {
      state.tokens = [];
      state.selectedTokens = [];
      state.pagination.total = 0;
      localStorageService.watchlist.clear();
    },
  },
});

export const {
  addTokens,
  removeToken,
  updateHoldings,
  updateTokenPrices,
  setSearchQuery,
  setSelectedTokens,
  setPagination,
  setLoading,
  setError,
  clearWatchlist,
} = watchlistSlice.actions;

export default watchlistSlice.reducer;
