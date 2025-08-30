import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  calculatePortfolioTotal,
  getLastUpdatedTime,
} from "@/utils/helpers";

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState: {
    totalValue: 0,
    lastUpdated: getLastUpdatedTime(),
    tokens: [] as TokenWithHoldings[],
    isLoading: false,
    error: null as string | null,
  } as PortfolioState,
  reducers: {
    // Update portfolio when watchlist changes
    updatePortfolio: (state, action: PayloadAction<TokenWithHoldings[]>) => {
      state.tokens = action.payload;
      state.totalValue = calculatePortfolioTotal(action.payload);
      state.lastUpdated = getLastUpdatedTime();
    },

    // Set loading state
    setPortfolioLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    // Set error state
    setPortfolioError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    // Refresh portfolio data
    refreshPortfolio: (state) => {
      state.lastUpdated = getLastUpdatedTime();
    },
  },
});

export const {
  updatePortfolio,
  setPortfolioLoading,
  setPortfolioError,
  refreshPortfolio,
} = portfolioSlice.actions;

export default portfolioSlice.reducer;
