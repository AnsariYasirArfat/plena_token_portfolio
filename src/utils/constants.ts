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
  '#10B981', // Green
  '#A78BFA', // Violet
  '#60A5FA', // Blue
  '#18C9DD', // Cyan
  '#FB923C', // Orange
  '#FB7185', // Red
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