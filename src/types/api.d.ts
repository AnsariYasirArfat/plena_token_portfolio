interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
}

interface PaginationParams {
  page: number;
  perPage: number;
  total: number;
}

interface ApiError {
  message: string;
  status: number;
}

// CoinGecko API specific types
interface CoinGeckoApiParams {
  vs_currency?: string;
  order?: 'market_cap_desc' | 'market_cap_asc' | 'volume_desc' | 'volume_asc' | 'id_desc' | 'id_asc';
  per_page?: number;
  page?: number;
  sparkline?: boolean;
  price_change_percentage?: string;
  locale?: string;
}
