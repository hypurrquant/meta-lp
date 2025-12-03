export interface TokenAmount {
  symbol: string;
  amount: number;
  valueUsd: number;
}

export interface AutomationSettings {
  autoRebalance: boolean;
  rebalanceThreshold?: number; // percentage out of range
  autoCompound: boolean;
  compoundFrequency?: "daily" | "weekly" | "threshold";
  compoundThreshold?: number; // minimum fees to compound
  stopLoss: boolean;
  stopLossPercent?: number;
  takeProfit: boolean;
  takeProfitPercent?: number;
}

export interface PriceRange {
  min: number;
  max: number;
  current: number;
  inRange: boolean;
}

export interface Position {
  id: string;
  pool: string;
  dex: string;
  chain: string;
  chainIcon: string;
  feeTier: number;
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
  priceRange: PriceRange;
  feesEarned: number;
  unclaimedFees: number;
  ilLoss: number;
  insuranceClaim: number;
  realRoi: number;
  realRoiPercent: number;
  estimatedApy: number;
  daysActive: number;
  isInsured: boolean;
  automation: AutomationSettings;
  compositionHistory: number[]; // token0 percentage over time
  lastRebalance?: string;
  lastCompound?: string;
}

export const mockPositions: Position[] = [
  {
    id: "1",
    pool: "ETH/USDC",
    dex: "Uniswap V3",
    chain: "Arbitrum",
    chainIcon: "arbitrum",
    feeTier: 0.3,
    token0: "ETH",
    token1: "USDC",
    initialDeposit: {
      token0: { symbol: "ETH", amount: 1.5, valueUsd: 3000 },
      token1: { symbol: "USDC", amount: 3000, valueUsd: 3000 },
      totalValueUsd: 6000,
      date: "2024-10-19",
    },
    currentPosition: {
      token0: { symbol: "ETH", amount: 1.2, valueUsd: 2640 },
      token1: { symbol: "USDC", amount: 3960, valueUsd: 3960 },
      totalValueUsd: 6600,
    },
    priceRange: {
      min: 1800,
      max: 2400,
      current: 2200,
      inRange: true,
    },
    feesEarned: 450.32,
    unclaimedFees: 125.50,
    ilLoss: 120.0,
    insuranceClaim: 96.0,
    realRoi: 426.32,
    realRoiPercent: 7.1,
    estimatedApy: 42.5,
    daysActive: 45,
    isInsured: true,
    automation: {
      autoRebalance: true,
      rebalanceThreshold: 5,
      autoCompound: true,
      compoundFrequency: "threshold",
      compoundThreshold: 100,
      stopLoss: false,
      takeProfit: false,
    },
    compositionHistory: [50, 48, 46, 44, 42, 40, 38, 40, 42, 40, 38, 40],
    lastRebalance: "2024-12-01",
    lastCompound: "2024-11-28",
  },
  {
    id: "2",
    pool: "HYPE/USDC",
    dex: "HyperSwap",
    chain: "HyperEVM",
    chainIcon: "hyperevm",
    feeTier: 0.3,
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
    priceRange: {
      min: 0.4,
      max: 0.8,
      current: 0.7,
      inRange: true,
    },
    feesEarned: 890.45,
    unclaimedFees: 234.20,
    ilLoss: 150.45,
    insuranceClaim: 0,
    realRoi: 740.0,
    realRoiPercent: 14.8,
    estimatedApy: 68.2,
    daysActive: 79,
    isInsured: false,
    automation: {
      autoRebalance: false,
      autoCompound: false,
      stopLoss: true,
      stopLossPercent: 15,
      takeProfit: true,
      takeProfitPercent: 25,
    },
    compositionHistory: [50, 52, 54, 52, 50, 48, 50, 52, 51, 52, 51, 51],
  },
  {
    id: "3",
    pool: "WBTC/USDC",
    dex: "Uniswap V3",
    chain: "Ethereum",
    chainIcon: "ethereum",
    feeTier: 0.3,
    token0: "WBTC",
    token1: "USDC",
    initialDeposit: {
      token0: { symbol: "WBTC", amount: 0.15, valueUsd: 10500 },
      token1: { symbol: "USDC", amount: 10500, valueUsd: 10500 },
      totalValueUsd: 21000,
      date: "2024-11-01",
    },
    currentPosition: {
      token0: { symbol: "WBTC", amount: 0.12, valueUsd: 9600 },
      token1: { symbol: "USDC", amount: 12200, valueUsd: 12200 },
      totalValueUsd: 21800,
    },
    priceRange: {
      min: 60000,
      max: 100000,
      current: 96000,
      inRange: true,
    },
    feesEarned: 1250.0,
    unclaimedFees: 450.00,
    ilLoss: 450.0,
    insuranceClaim: 360.0,
    realRoi: 1160.0,
    realRoiPercent: 5.5,
    estimatedApy: 52.8,
    daysActive: 32,
    isInsured: true,
    automation: {
      autoRebalance: true,
      rebalanceThreshold: 10,
      autoCompound: true,
      compoundFrequency: "weekly",
      stopLoss: true,
      stopLossPercent: 20,
      takeProfit: false,
    },
    compositionHistory: [50, 48, 46, 44, 45, 44, 43, 44, 45, 44, 44, 44],
    lastRebalance: "2024-11-25",
    lastCompound: "2024-11-30",
  },
  {
    id: "4",
    pool: "ETH/USDC",
    dex: "Aerodrome",
    chain: "Base",
    chainIcon: "base",
    feeTier: 0.05,
    token0: "ETH",
    token1: "USDC",
    initialDeposit: {
      token0: { symbol: "ETH", amount: 0.5, valueUsd: 1100 },
      token1: { symbol: "USDC", amount: 1100, valueUsd: 1100 },
      totalValueUsd: 2200,
      date: "2024-11-20",
    },
    currentPosition: {
      token0: { symbol: "ETH", amount: 0.48, valueUsd: 1056 },
      token1: { symbol: "USDC", amount: 1320, valueUsd: 1320 },
      totalValueUsd: 2376,
    },
    priceRange: {
      min: 2000,
      max: 2500,
      current: 2200,
      inRange: true,
    },
    feesEarned: 220.0,
    unclaimedFees: 76.00,
    ilLoss: 44.0,
    insuranceClaim: 0,
    realRoi: 176.0,
    realRoiPercent: 8.0,
    estimatedApy: 156.2,
    daysActive: 13,
    isInsured: false,
    automation: {
      autoRebalance: true,
      rebalanceThreshold: 3,
      autoCompound: true,
      compoundFrequency: "daily",
      stopLoss: false,
      takeProfit: false,
    },
    compositionHistory: [50, 49, 48, 47, 46, 47, 46, 47, 47, 46, 47, 47],
    lastCompound: "2024-12-02",
  },
  {
    id: "5",
    pool: "OP/USDC",
    dex: "Velodrome",
    chain: "Optimism",
    chainIcon: "optimism",
    feeTier: 0.3,
    token0: "OP",
    token1: "USDC",
    initialDeposit: {
      token0: { symbol: "OP", amount: 2000, valueUsd: 4000 },
      token1: { symbol: "USDC", amount: 4000, valueUsd: 4000 },
      totalValueUsd: 8000,
      date: "2024-10-25",
    },
    currentPosition: {
      token0: { symbol: "OP", amount: 1750, valueUsd: 3850 },
      token1: { symbol: "USDC", amount: 5200, valueUsd: 5200 },
      totalValueUsd: 9050,
    },
    priceRange: {
      min: 1.5,
      max: 2.8,
      current: 2.2,
      inRange: true,
    },
    feesEarned: 1320.0,
    unclaimedFees: 180.00,
    ilLoss: 270.0,
    insuranceClaim: 216.0,
    realRoi: 1266.0,
    realRoiPercent: 15.8,
    estimatedApy: 95.2,
    daysActive: 39,
    isInsured: true,
    automation: {
      autoRebalance: false,
      autoCompound: true,
      compoundFrequency: "threshold",
      compoundThreshold: 200,
      stopLoss: false,
      takeProfit: true,
      takeProfitPercent: 30,
    },
    compositionHistory: [50, 51, 52, 51, 50, 49, 48, 47, 46, 45, 44, 43],
    lastCompound: "2024-11-29",
  },
  {
    id: "6",
    pool: "ARB/USDC",
    dex: "Camelot",
    chain: "Arbitrum",
    chainIcon: "arbitrum",
    feeTier: 0.3,
    token0: "ARB",
    token1: "USDC",
    initialDeposit: {
      token0: { symbol: "ARB", amount: 3000, valueUsd: 2400 },
      token1: { symbol: "USDC", amount: 2400, valueUsd: 2400 },
      totalValueUsd: 4800,
      date: "2024-11-10",
    },
    currentPosition: {
      token0: { symbol: "ARB", amount: 2650, valueUsd: 2385 },
      token1: { symbol: "USDC", amount: 2750, valueUsd: 2750 },
      totalValueUsd: 5135,
    },
    priceRange: {
      min: 0.65,
      max: 1.1,
      current: 0.9,
      inRange: true,
    },
    feesEarned: 485.0,
    unclaimedFees: 95.00,
    ilLoss: 150.0,
    insuranceClaim: 0,
    realRoi: 335.0,
    realRoiPercent: 7.0,
    estimatedApy: 102.5,
    daysActive: 23,
    isInsured: false,
    automation: {
      autoRebalance: false,
      autoCompound: false,
      stopLoss: false,
      takeProfit: false,
    },
    compositionHistory: [50, 49, 48, 47, 48, 47, 46, 47, 46, 47, 46, 46],
  },
];

export const portfolioSummary = {
  totalValueUsd: mockPositions.reduce(
    (sum, p) => sum + p.currentPosition.totalValueUsd,
    0
  ),
  totalFeesEarned: mockPositions.reduce((sum, p) => sum + p.feesEarned, 0),
  totalUnclaimedFees: mockPositions.reduce((sum, p) => sum + p.unclaimedFees, 0),
  totalIlLoss: mockPositions.reduce((sum, p) => sum + p.ilLoss, 0),
  totalInsuranceClaims: mockPositions.reduce(
    (sum, p) => sum + p.insuranceClaim,
    0
  ),
  totalRealRoi: mockPositions.reduce((sum, p) => sum + p.realRoi, 0),
  positionCount: mockPositions.length,
  insuredCount: mockPositions.filter((p) => p.isInsured).length,
  automatedCount: mockPositions.filter((p) => p.automation.autoRebalance || p.automation.autoCompound).length,
};

export const chains = [
  { id: "all", name: "All Chains" },
  { id: "ethereum", name: "Ethereum" },
  { id: "arbitrum", name: "Arbitrum" },
  { id: "base", name: "Base" },
  { id: "optimism", name: "Optimism" },
  { id: "hyperevm", name: "HyperEVM" },
];

export const dexes = [
  { id: "all", name: "All DEXs" },
  { id: "uniswap", name: "Uniswap V3" },
  { id: "aerodrome", name: "Aerodrome" },
  { id: "velodrome", name: "Velodrome" },
  { id: "camelot", name: "Camelot" },
  { id: "hyperswap", name: "HyperSwap" },
];
