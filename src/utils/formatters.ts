// Data formatting utilities
export const formatTokenName = (name: string, symbol?: string): string => {
  return symbol && symbol.trim()
    ? `${name} (${symbol.toUpperCase()})`
    : name;
};


export const formatPrice = (price: number): string => {
  if (price >= 1) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  } else {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 6,
      maximumFractionDigits: 6,
    }).format(price);
  }
};

export const formatMarketCap = (marketCap: number): string => {
  if (marketCap >= 1e12) {
    return `$${(marketCap / 1e12).toFixed(2)}T`;
  } else if (marketCap >= 1e9) {
    return `$${(marketCap / 1e9).toFixed(2)}B`;
  } else if (marketCap >= 1e6) {
    return `$${(marketCap / 1e6).toFixed(2)}M`;
  } else {
    return `$${marketCap.toLocaleString()}`;
  }
};

export const formatHoldings = (holdings: number): string => {
  if (holdings >= 1) {
    return holdings.toFixed(4);
  } else {
    return holdings.toFixed(6);
  }
};

export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};
