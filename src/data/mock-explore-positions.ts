export interface ExplorePosition {
  id: string;
  chain: string;
  chainIcon: string;
  dex: string;
  pool: string;
  feeTier: number;
  token0: string;
  token1: string;

  initialPortfolio: {
    token0: { symbol: string; amount: number; valueUsd: number };
    token1: { symbol: string; amount: number; valueUsd: number };
    totalValueUsd: number;
    date: string;
  };

  currentBalance: {
    token0: { symbol: string; amount: number; valueUsd: number };
    token1: { symbol: string; amount: number; valueUsd: number };
    totalValueUsd: number;
  };

  priceRange: {
    min: number;
    max: number;
    current: number;
    inRange: boolean;
  };

  performance: {
    roiPercent: number;
    roiUsd: number;
    apy: number;
    feesEarned: number;
    ilLoss: number;
    insuranceClaim: number;
  };

  durationDays: number;
  isInsured: boolean;
}

export const explorePositions: ExplorePosition[] = [
  {
    id: "exp-1",
    chain: "Arbitrum",
    chainIcon: "arbitrum",
    dex: "Uniswap V3",
    pool: "ETH/USDC",
    feeTier: 0.3,
    token0: "ETH",
    token1: "USDC",
    initialPortfolio: {
      token0: { symbol: "ETH", amount: 2.5, valueUsd: 5000 },
      token1: { symbol: "USDC", amount: 5000, valueUsd: 5000 },
      totalValueUsd: 10000,
      date: "2024-09-15",
    },
    currentBalance: {
      token0: { symbol: "ETH", amount: 2.1, valueUsd: 4620 },
      token1: { symbol: "USDC", amount: 6850, valueUsd: 6850 },
      totalValueUsd: 11470,
    },
    priceRange: {
      min: 1800,
      max: 2400,
      current: 2200,
      inRange: true,
    },
    performance: {
      roiPercent: 14.7,
      roiUsd: 1470,
      apy: 65.4,
      feesEarned: 1820,
      ilLoss: 350,
      insuranceClaim: 0,
    },
    durationDays: 82,
    isInsured: false,
  },
  {
    id: "exp-2",
    chain: "Base",
    chainIcon: "base",
    dex: "Aerodrome",
    pool: "ETH/USDC",
    feeTier: 0.05,
    token0: "ETH",
    token1: "USDC",
    initialPortfolio: {
      token0: { symbol: "ETH", amount: 5.0, valueUsd: 10000 },
      token1: { symbol: "USDC", amount: 10000, valueUsd: 10000 },
      totalValueUsd: 20000,
      date: "2024-10-01",
    },
    currentBalance: {
      token0: { symbol: "ETH", amount: 4.2, valueUsd: 9240 },
      token1: { symbol: "USDC", amount: 14200, valueUsd: 14200 },
      totalValueUsd: 23440,
    },
    priceRange: {
      min: 1900,
      max: 2500,
      current: 2200,
      inRange: true,
    },
    performance: {
      roiPercent: 17.2,
      roiUsd: 3440,
      apy: 89.3,
      feesEarned: 4100,
      ilLoss: 660,
      insuranceClaim: 528,
    },
    durationDays: 66,
    isInsured: true,
  },
  {
    id: "exp-3",
    chain: "Ethereum",
    chainIcon: "ethereum",
    dex: "Uniswap V3",
    pool: "WBTC/USDC",
    feeTier: 0.3,
    token0: "WBTC",
    token1: "USDC",
    initialPortfolio: {
      token0: { symbol: "WBTC", amount: 0.5, valueUsd: 22500 },
      token1: { symbol: "USDC", amount: 22500, valueUsd: 22500 },
      totalValueUsd: 45000,
      date: "2024-08-20",
    },
    currentBalance: {
      token0: { symbol: "WBTC", amount: 0.42, valueUsd: 21000 },
      token1: { symbol: "USDC", amount: 32500, valueUsd: 32500 },
      totalValueUsd: 53500,
    },
    priceRange: {
      min: 38000,
      max: 52000,
      current: 50000,
      inRange: true,
    },
    performance: {
      roiPercent: 18.9,
      roiUsd: 8500,
      apy: 58.2,
      feesEarned: 9800,
      ilLoss: 1300,
      insuranceClaim: 1040,
    },
    durationDays: 108,
    isInsured: true,
  },
  {
    id: "exp-4",
    chain: "Arbitrum",
    chainIcon: "arbitrum",
    dex: "Camelot",
    pool: "ARB/USDC",
    feeTier: 0.3,
    token0: "ARB",
    token1: "USDC",
    initialPortfolio: {
      token0: { symbol: "ARB", amount: 5000, valueUsd: 4000 },
      token1: { symbol: "USDC", amount: 4000, valueUsd: 4000 },
      totalValueUsd: 8000,
      date: "2024-10-15",
    },
    currentBalance: {
      token0: { symbol: "ARB", amount: 4200, valueUsd: 3780 },
      token1: { symbol: "USDC", amount: 5450, valueUsd: 5450 },
      totalValueUsd: 9230,
    },
    priceRange: {
      min: 0.65,
      max: 1.1,
      current: 0.9,
      inRange: true,
    },
    performance: {
      roiPercent: 15.4,
      roiUsd: 1230,
      apy: 112.5,
      feesEarned: 1480,
      ilLoss: 250,
      insuranceClaim: 0,
    },
    durationDays: 52,
    isInsured: false,
  },
  {
    id: "exp-5",
    chain: "Base",
    chainIcon: "base",
    dex: "Aerodrome",
    pool: "USDC/USDbC",
    feeTier: 0.01,
    token0: "USDC",
    token1: "USDbC",
    initialPortfolio: {
      token0: { symbol: "USDC", amount: 25000, valueUsd: 25000 },
      token1: { symbol: "USDbC", amount: 25000, valueUsd: 25000 },
      totalValueUsd: 50000,
      date: "2024-07-01",
    },
    currentBalance: {
      token0: { symbol: "USDC", amount: 26200, valueUsd: 26200 },
      token1: { symbol: "USDbC", amount: 26100, valueUsd: 26100 },
      totalValueUsd: 52300,
    },
    priceRange: {
      min: 0.998,
      max: 1.002,
      current: 1.0,
      inRange: true,
    },
    performance: {
      roiPercent: 4.6,
      roiUsd: 2300,
      apy: 11.2,
      feesEarned: 2300,
      ilLoss: 0,
      insuranceClaim: 0,
    },
    durationDays: 158,
    isInsured: false,
  },
  {
    id: "exp-6",
    chain: "HyperEVM",
    chainIcon: "hyperevm",
    dex: "HyperSwap",
    pool: "HYPE/USDC",
    feeTier: 0.3,
    token0: "HYPE",
    token1: "USDC",
    initialPortfolio: {
      token0: { symbol: "HYPE", amount: 10000, valueUsd: 5000 },
      token1: { symbol: "USDC", amount: 5000, valueUsd: 5000 },
      totalValueUsd: 10000,
      date: "2024-11-01",
    },
    currentBalance: {
      token0: { symbol: "HYPE", amount: 8500, valueUsd: 5950 },
      token1: { symbol: "USDC", amount: 6800, valueUsd: 6800 },
      totalValueUsd: 12750,
    },
    priceRange: {
      min: 0.35,
      max: 0.85,
      current: 0.7,
      inRange: true,
    },
    performance: {
      roiPercent: 27.5,
      roiUsd: 2750,
      apy: 256.8,
      feesEarned: 3200,
      ilLoss: 450,
      insuranceClaim: 360,
    },
    durationDays: 35,
    isInsured: true,
  },
  {
    id: "exp-7",
    chain: "Optimism",
    chainIcon: "optimism",
    dex: "Velodrome",
    pool: "OP/USDC",
    feeTier: 0.3,
    token0: "OP",
    token1: "USDC",
    initialPortfolio: {
      token0: { symbol: "OP", amount: 3000, valueUsd: 6000 },
      token1: { symbol: "USDC", amount: 6000, valueUsd: 6000 },
      totalValueUsd: 12000,
      date: "2024-09-20",
    },
    currentBalance: {
      token0: { symbol: "OP", amount: 2600, valueUsd: 5720 },
      token1: { symbol: "USDC", amount: 8100, valueUsd: 8100 },
      totalValueUsd: 13820,
    },
    priceRange: {
      min: 1.5,
      max: 2.8,
      current: 2.2,
      inRange: true,
    },
    performance: {
      roiPercent: 15.2,
      roiUsd: 1820,
      apy: 72.4,
      feesEarned: 2150,
      ilLoss: 330,
      insuranceClaim: 0,
    },
    durationDays: 77,
    isInsured: false,
  },
  {
    id: "exp-8",
    chain: "Polygon",
    chainIcon: "polygon",
    dex: "QuickSwap",
    pool: "MATIC/USDC",
    feeTier: 0.3,
    token0: "MATIC",
    token1: "USDC",
    initialPortfolio: {
      token0: { symbol: "MATIC", amount: 8000, valueUsd: 4000 },
      token1: { symbol: "USDC", amount: 4000, valueUsd: 4000 },
      totalValueUsd: 8000,
      date: "2024-10-10",
    },
    currentBalance: {
      token0: { symbol: "MATIC", amount: 7200, valueUsd: 3960 },
      token1: { symbol: "USDC", amount: 5100, valueUsd: 5100 },
      totalValueUsd: 9060,
    },
    priceRange: {
      min: 0.4,
      max: 0.7,
      current: 0.55,
      inRange: true,
    },
    performance: {
      roiPercent: 13.25,
      roiUsd: 1060,
      apy: 85.6,
      feesEarned: 1280,
      ilLoss: 220,
      insuranceClaim: 0,
    },
    durationDays: 57,
    isInsured: false,
  },
];

export const chains = [
  { id: "all", name: "All Chains" },
  { id: "ethereum", name: "Ethereum" },
  { id: "arbitrum", name: "Arbitrum" },
  { id: "base", name: "Base" },
  { id: "optimism", name: "Optimism" },
  { id: "polygon", name: "Polygon" },
  { id: "hyperevm", name: "HyperEVM" },
];

export const dexes = [
  { id: "all", name: "All DEXs" },
  { id: "uniswap", name: "Uniswap V3" },
  { id: "aerodrome", name: "Aerodrome" },
  { id: "velodrome", name: "Velodrome" },
  { id: "camelot", name: "Camelot" },
  { id: "quickswap", name: "QuickSwap" },
  { id: "hyperswap", name: "HyperSwap" },
];
