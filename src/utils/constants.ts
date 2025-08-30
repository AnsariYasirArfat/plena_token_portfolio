// App constants
export const APP_NAME = 'Token Portfolio';

// API constants
export const COINGECKO_API_BASE_URL = 'https://api.coingecko.com/api/v3';
export const API_TIMEOUT = 10000;

// Pagination
export const DEFAULT_PAGE_SIZE = 10;
export const MAX_PAGE_SIZE = 100;

// Chart colors for donut chart
export const CHART_COLORS = [
  '#a9e851', // plena-lime
  '#8b5cf6', // purple
  '#06b6d4', // cyan
  '#f59e0b', // amber
  '#ef4444', // red
  '#ec4899', // pink
  '#3b82f6', // blue
  '#10b981', // emerald
];

// Local storage keys
export const STORAGE_KEYS = {
  WATCHLIST: 'plena_watchlist',
  HOLDINGS: 'plena_holdings',
  WALLET_CONNECTED: 'plena_wallet_connected',
} as const;

// Table columns
export const WATCHLIST_COLUMNS = [
  'token',
  'price',
  'change24h',
  'sparkline',
  'holdings',
  'value',
  'actions',
] as const;