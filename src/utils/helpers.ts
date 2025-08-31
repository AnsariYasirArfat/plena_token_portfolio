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
  if (tokens.length === 0) {
    return [];
  }

  const totalValue = calculatePortfolioTotal(tokens);

  // Calculate percentage for each token
  const tokensWithPercentage = tokens.map((token, index) => ({
    ...token,
    percentage: totalValue > 0 ? (token.value / totalValue) * 100 : 0,
    color: CHART_COLORS[index % CHART_COLORS.length],
  }));

  // Sort by percentage (highest first)
  const sortedTokens = tokensWithPercentage.sort(
    (a, b) => b.percentage - a.percentage
  );

  // Take top 5 tokens
  const top5Tokens = sortedTokens.slice(0, 5);

  // Calculate "Other" from remaining tokens
  const otherTokens = sortedTokens.slice(5);
  const otherPercentage = otherTokens.reduce(
    (sum, token) => sum + token.percentage,
    0
  );
  const otherValue = otherTokens.reduce((sum, token) => sum + token.value, 0);

  // Create distribution array
  const distribution: TokenDistribution[] = top5Tokens.map((token, index) => ({
    tokenId: token.id,
    symbol: token.symbol,
    name: token.name,
    percentage: token.percentage,
    value: token.value,
    color: CHART_COLORS[index % CHART_COLORS.length],
  }));

  // Add "Other" category if there are more than 5 tokens
  if (otherTokens.length > 0) {
    distribution.push({
      tokenId: "other",
      symbol: "",
      name: "Other",
      percentage: otherPercentage,
      value: otherValue,
      color: CHART_COLORS[CHART_COLORS.length - 1],
    });
  }

  return distribution;
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
