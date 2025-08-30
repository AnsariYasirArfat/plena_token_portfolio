// Single Token interface for all use cases
interface Token {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
  sparkline_in_7d: {
    price: number[];
  };
}

// Extended token with user holdings data
interface TokenWithHoldings extends Token {
  holdings: number;
  value: number;
  percentage: number;
}

// Trending token from CoinGecko trending API
interface TrendingToken {
  item: {
    id: string;
    coin_id: number;
    name: string;
    symbol: string;
    market_cap_rank: number;
    thumb: string;
    small: string;
    large: string;
    slug: string;
    price_btc: number;
    score: number;
  };
}

// Search token from CoinGecko search API
interface SearchToken {
  id: string;
  name: string;
  symbol: string;
  market_cap_rank: number;
  thumb: string;
  large: string;
}

// Unified token interface for display
interface DisplayToken {
  id: string;
  name: string;
  symbol: string;
  image: string;
  market_cap_rank: number;
}

// API response types
interface CoinGeckoSearchResponse {
  coins: SearchToken[];
}

interface CoinGeckoTrendingResponse {
  coins: TrendingToken[];
  exchanges: unknown[];
  categories: unknown[];
  nfts: unknown[];
}
