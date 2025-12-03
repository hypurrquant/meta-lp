export interface TokenAmount {
  symbol: string;
  amount: number;
  valueUsd: number;
}

export interface Position {
  id: string;
  pool: string;
  dex: string;
  token0: string;
  token1: string;
  initialDeposit: {
    token0: TokenAmount;
    token1: TokenAmount;
    totalValueUsd: number;
    date: string;
  };
  currentPosition: {
    token0: TokenAmount;
    token1: TokenAmount;
    totalValueUsd: number;
  };
  feesEarned: number;
  ilLoss: number;
  insuranceClaim: number;
  realRoi: number;
  realRoiPercent: number;
  estimatedApy: number;
  daysActive: number;
  isInsured: boolean;
  compositionHistory: number[]; // token0 percentage over time
}

export const mockPositions: Position[] = [
  {
    id: "1",
    pool: "ETH/USDC",
    dex: "HyperSwap",
    token0: "ETH",
    token1: "USDC",
    initialDeposit: {
      token0: { symbol: "ETH", amount: 1.5, valueUsd: 3000 },
      token1: { symbol: "USDC", amount: 3000, valueUsd: 3000 },
      totalValueUsd: 6000,
      date: "2024-10-19",
    },
    currentPosition: {
      token0: { symbol: "ETH", amount: 1.2, valueUsd: 2400 },
      token1: { symbol: "USDC", amount: 3600, valueUsd: 3600 },
      totalValueUsd: 6000,
    },
    feesEarned: 450.32,
    ilLoss: 120.0,
    insuranceClaim: 96.0,
    realRoi: 426.32,
    realRoiPercent: 7.1,
    estimatedApy: 42.5,
    daysActive: 45,
    isInsured: true,
    compositionHistory: [50, 48, 46, 44, 42, 40, 38, 40, 42, 40, 38, 40],
  },
  {
    id: "2",
    pool: "HYPE/USDC",
    dex: "HyperDEX",
    token0: "HYPE",
    token1: "USDC",
    initialDeposit: {
      token0: { symbol: "HYPE", amount: 5000, valueUsd: 2500 },
      token1: { symbol: "USDC", amount: 2500, valueUsd: 2500 },
      totalValueUsd: 5000,
      date: "2024-09-15",
    },
    currentPosition: {
      token0: { symbol: "HYPE", amount: 4200, valueUsd: 2940 },
      token1: { symbol: "USDC", amount: 2800, valueUsd: 2800 },
      totalValueUsd: 5740,
    },
    feesEarned: 890.45,
    ilLoss: 150.45,
    insuranceClaim: 0,
    realRoi: 740.0,
    realRoiPercent: 14.8,
    estimatedApy: 68.2,
    daysActive: 79,
    isInsured: false,
    compositionHistory: [50, 52, 54, 52, 50, 48, 50, 52, 51, 52, 51, 51],
  },
  {
    id: "3",
    pool: "BTC/USDC",
    dex: "NovaSwap",
    token0: "BTC",
    token1: "USDC",
    initialDeposit: {
      token0: { symbol: "BTC", amount: 0.15, valueUsd: 10500 },
      token1: { symbol: "USDC", amount: 10500, valueUsd: 10500 },
      totalValueUsd: 21000,
      date: "2024-11-01",
    },
    currentPosition: {
      token0: { symbol: "BTC", amount: 0.12, valueUsd: 9600 },
      token1: { symbol: "USDC", amount: 12200, valueUsd: 12200 },
      totalValueUsd: 21800,
    },
    feesEarned: 1250.0,
    ilLoss: 450.0,
    insuranceClaim: 360.0,
    realRoi: 1160.0,
    realRoiPercent: 5.5,
    estimatedApy: 52.8,
    daysActive: 32,
    isInsured: true,
    compositionHistory: [50, 48, 46, 44, 45, 44, 43, 44, 45, 44, 44, 44],
  },
  {
    id: "4",
    pool: "ETH/HYPE",
    dex: "HyperSwap",
    token0: "ETH",
    token1: "HYPE",
    initialDeposit: {
      token0: { symbol: "ETH", amount: 0.5, valueUsd: 1000 },
      token1: { symbol: "HYPE", amount: 2000, valueUsd: 1000 },
      totalValueUsd: 2000,
      date: "2024-11-20",
    },
    currentPosition: {
      token0: { symbol: "ETH", amount: 0.55, valueUsd: 1100 },
      token1: { symbol: "HYPE", amount: 1800, valueUsd: 1260 },
      totalValueUsd: 2360,
    },
    feesEarned: 420.0,
    ilLoss: 60.0,
    insuranceClaim: 0,
    realRoi: 360.0,
    realRoiPercent: 18.0,
    estimatedApy: 156.2,
    daysActive: 13,
    isInsured: false,
    compositionHistory: [50, 49, 48, 47, 46, 47, 46, 47, 47, 46, 47, 47],
  },
];

export const portfolioSummary = {
  totalValueUsd: mockPositions.reduce(
    (sum, p) => sum + p.currentPosition.totalValueUsd,
    0
  ),
  totalFeesEarned: mockPositions.reduce((sum, p) => sum + p.feesEarned, 0),
  totalIlLoss: mockPositions.reduce((sum, p) => sum + p.ilLoss, 0),
  totalInsuranceClaims: mockPositions.reduce(
    (sum, p) => sum + p.insuranceClaim,
    0
  ),
  totalRealRoi: mockPositions.reduce((sum, p) => sum + p.realRoi, 0),
  positionCount: mockPositions.length,
  insuredCount: mockPositions.filter((p) => p.isInsured).length,
};
