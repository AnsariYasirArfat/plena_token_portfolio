import { CHART_COLORS } from "./constants";

export const calculateTokenValue = (
  price: number,
  holdings: number
): number => {
  return price * holdings;
};

export const calculatePortfolioTotal = (
  tokens: TokenWithHoldings[]
): number => {
  return tokens.reduce((total, token) => total + token.value, 0);
};

export const calculateTokenDistribution = (
  tokens: TokenWithHoldings[]
): TokenDistribution[] => {
  const totalValue = calculatePortfolioTotal(tokens);

  return tokens.map((token, index) => ({
    tokenId: token.id,
    symbol: token.symbol,
    name: token.name,
    percentage: totalValue > 0 ? (token.value / totalValue) * 100 : 0,
    value: token.value,
    color: CHART_COLORS[index % CHART_COLORS.length],
  }));
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export const formatPercentage = (value: number): string => {
  const sign = value >= 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
};

export const formatNumber = (value: number, decimals: number = 4): string => {
  return value.toFixed(decimals);
};

export const getLastUpdatedTime = (): string => {
  return new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
};

export const transformTrendingToken = (
  trendingToken: TrendingToken
): Partial<Token> => {
  return {
    id: trendingToken.item.id,
    symbol: trendingToken.item.symbol,
    name: trendingToken.item.name,
    image: trendingToken.item.large,
    market_cap_rank: trendingToken.item.market_cap_rank,
  };
};
