interface PortfolioState {
  totalValue: number;
  lastUpdated: string;
  tokens: TokenWithHoldings[];
  isLoading: boolean;
  error: string | null;
}

interface PortfolioSummary {
  totalValue: number;
  totalChange24h: number;
  tokenDistribution: TokenDistribution[];
}

interface TokenDistribution {
  tokenId: string;
  symbol: string;
  name: string;
  percentage: number;
  value: number;
  color: string;
}
