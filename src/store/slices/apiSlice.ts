import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { COINGECKO_API_BASE_URL } from '@/utils/constants';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: COINGECKO_API_BASE_URL,
    timeout: 10000,
  }),
  tagTypes: ['Token', 'Trending', 'Search'],
  endpoints: (builder) => ({
   
    getMarketData: builder.query<Token[], { 
      page?: number; 
      perPage?: number; 
      sparkline?: boolean;
      ids?: string[]; 
    }>({
      query: ({ page = 1, perPage = 100, sparkline = true, ids }) => ({
        url: '/coins/markets',
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: perPage,
          page: page,
          sparkline: sparkline,
          price_change_percentage: '24h',
          ...(ids && { ids: ids.join(',') }), 
        },
      }),
      providesTags: (_result, _error, { ids }) => 
        ids ? ids.map(id => ({ type: 'Token', id })) : ['Token'],
    }),

    // Get trending tokens
    getTrendingTokens: builder.query<CoinGeckoTrendingResponse, void>({
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
      providesTags: (_result, _error, { id }) => [{ type: 'Token', id }],
    }),
  }),
});

export const {
  useGetMarketDataQuery,
  useGetTrendingTokensQuery,
  useSearchTokensQuery,
  useGetTokenDataQuery,
} = apiSlice;
