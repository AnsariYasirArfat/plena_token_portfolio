import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { COINGECKO_API_BASE_URL } from '../../utils/constants';

// Define the API slice using RTK Query
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: COINGECKO_API_BASE_URL,
    timeout: 10000,
  }),
  tagTypes: ['Token', 'Trending', 'Search'],
  endpoints: (builder) => ({
    // Get market data for tokens (with sparklines)
    getMarketData: builder.query<Token[], { 
      page?: number; 
      perPage?: number; 
      sparkline?: boolean;
    }>({
      query: ({ page = 1, perPage = 100, sparkline = true }) => ({
        url: '/coins/markets',
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: perPage,
          page: page,
          sparkline: sparkline,
          price_change_percentage: '24h',
        },
      }),
      providesTags: ['Token'],
    }),

    // Get trending tokens
    getTrendingTokens: builder.query<{ coins: TrendingToken[] }, void>({
      query: () => '/search/trending',
      providesTags: ['Trending'],
    }),

    // Search tokens
    searchTokens: builder.query<CoinGeckoSearchResponse, { query: string }>({
      query: ({ query }) => ({
        url: '/search',
        params: { query },
      }),
      providesTags: ['Search'],
    }),

    // Get specific token data (for sparklines and detailed info)
    getTokenData: builder.query<Token, { id: string }>({
      query: ({ id }) => ({
        url: `/coins/${id}`,
        params: {
          localization: false,
          tickers: false,
          market_data: true,
          community_data: false,
          developer_data: false,
          sparkline: true,
        },
      }),
      providesTags: (result, error, { id }) => [{ type: 'Token', id }],
    }),
  }),
});

// Export hooks for use in components
export const {
  useGetMarketDataQuery,
  useGetTrendingTokensQuery,
  useSearchTokensQuery,
  useGetTokenDataQuery,
} = apiSlice;
