export interface HistoricalPosition {
  id: string;
  pool: string;
  dex: string;
  chain: string;
  chainIcon: string;

  creator: {
    address: string;
    shortAddress: string;
    totalPositions: number;
    avgRoi: number;
    winRate: number;
    totalValueManaged: number;
  };

  entryDate: string;
  exitDate: string;
  durationDays: number;

  initialValue: number;
  finalValue: number;
  feesEarned: number;
  ilLoss: number;
  netProfit: number;
  roiPercent: number;

  priceRange: {
    entryMin: number;
    entryMax: number;
    exitPrice: number;
  };

  strategy: "narrow" | "wide" | "dynamic";
  rebalanceCount: number;
}

export interface CreatorActivity {
  id: string;
  address: string;
  shortAddress: string;
  timestamp: string;
  type: "deposit" | "withdraw" | "rebalance" | "claim" | "swap" | "mint";
  chain: string;
  dex?: string;
  pool?: string;
  value: number;
  txHash: string;
  details: string;
}

export interface TopCreator {
  address: string;
  shortAddress: string;
  totalPositions: number;
  activePositions: number;
  totalValueManaged: number;
  avgRoi: number;
  winRate: number;
  totalFeesEarned: number;
  chains: string[];
  preferredDexes: string[];
  avgHoldingDays: number;
}

export interface AnalyticsOverview {
  totalHistoricalPositions: number;
  totalValueProcessed: number;
  avgRoi: number;
  avgDuration: number;
  topPerformingPool: string;
  topPerformingChain: string;
  totalCreatorsTracked: number;
  avgFeesPerPosition: number;
}

export const historicalPositions: HistoricalPosition[] = [
  {
    id: "hist-1",
    pool: "ETH/USDC",
    dex: "Uniswap V3",
    chain: "Arbitrum",
    chainIcon: "arbitrum",
    creator: {
      address: "0x742d35Cc6634C0532925a3b844Bc9e7595f2bD11",
      shortAddress: "0x742d...bD11",
      totalPositions: 45,
      avgRoi: 18.5,
      winRate: 89,
      totalValueManaged: 1250000,
    },
    entryDate: "2024-08-15",
    exitDate: "2024-10-20",
    durationDays: 66,
    initialValue: 25000,
    finalValue: 29500,
    feesEarned: 5200,
    ilLoss: 700,
    netProfit: 4500,
    roiPercent: 18.0,
    priceRange: {
      entryMin: 1750,
      entryMax: 2300,
      exitPrice: 2150,
    },
    strategy: "narrow",
    rebalanceCount: 3,
  },
  {
    id: "hist-2",
    pool: "WBTC/USDC",
    dex: "Uniswap V3",
    chain: "Ethereum",
    chainIcon: "ethereum",
    creator: {
      address: "0x8Ba1f109551bD432803012645Ac136ddd64DBA72",
      shortAddress: "0x8Ba1...BA72",
      totalPositions: 28,
      avgRoi: 22.3,
      winRate: 92,
      totalValueManaged: 890000,
    },
    entryDate: "2024-07-01",
    exitDate: "2024-09-15",
    durationDays: 76,
    initialValue: 50000,
    finalValue: 61500,
    feesEarned: 12800,
    ilLoss: 1300,
    netProfit: 11500,
    roiPercent: 23.0,
    priceRange: {
      entryMin: 55000,
      entryMax: 75000,
      exitPrice: 62000,
    },
    strategy: "wide",
    rebalanceCount: 1,
  },
  {
    id: "hist-3",
    pool: "HYPE/USDC",
    dex: "HyperSwap",
    chain: "HyperEVM",
    chainIcon: "hyperevm",
    creator: {
      address: "0x1234567890abcdef1234567890abcdef12345678",
      shortAddress: "0x1234...5678",
      totalPositions: 67,
      avgRoi: 35.2,
      winRate: 78,
      totalValueManaged: 450000,
    },
    entryDate: "2024-09-01",
    exitDate: "2024-11-01",
    durationDays: 61,
    initialValue: 10000,
    finalValue: 14200,
    feesEarned: 4800,
    ilLoss: 600,
    netProfit: 4200,
    roiPercent: 42.0,
    priceRange: {
      entryMin: 0.3,
      entryMax: 0.65,
      exitPrice: 0.55,
    },
    strategy: "dynamic",
    rebalanceCount: 8,
  },
  {
    id: "hist-4",
    pool: "OP/USDC",
    dex: "Velodrome",
    chain: "Optimism",
    chainIcon: "optimism",
    creator: {
      address: "0xabcdef1234567890abcdef1234567890abcdef12",
      shortAddress: "0xabcd...ef12",
      totalPositions: 34,
      avgRoi: 15.8,
      winRate: 85,
      totalValueManaged: 320000,
    },
    entryDate: "2024-08-20",
    exitDate: "2024-10-05",
    durationDays: 46,
    initialValue: 15000,
    finalValue: 17250,
    feesEarned: 2650,
    ilLoss: 400,
    netProfit: 2250,
    roiPercent: 15.0,
    priceRange: {
      entryMin: 1.4,
      entryMax: 2.2,
      exitPrice: 1.85,
    },
    strategy: "narrow",
    rebalanceCount: 2,
  },
  {
    id: "hist-5",
    pool: "ARB/USDC",
    dex: "Camelot",
    chain: "Arbitrum",
    chainIcon: "arbitrum",
    creator: {
      address: "0x742d35Cc6634C0532925a3b844Bc9e7595f2bD11",
      shortAddress: "0x742d...bD11",
      totalPositions: 45,
      avgRoi: 18.5,
      winRate: 89,
      totalValueManaged: 1250000,
    },
    entryDate: "2024-09-10",
    exitDate: "2024-11-15",
    durationDays: 66,
    initialValue: 8000,
    finalValue: 9120,
    feesEarned: 1420,
    ilLoss: 300,
    netProfit: 1120,
    roiPercent: 14.0,
    priceRange: {
      entryMin: 0.7,
      entryMax: 1.05,
      exitPrice: 0.88,
    },
    strategy: "wide",
    rebalanceCount: 0,
  },
  {
    id: "hist-6",
    pool: "ETH/USDC",
    dex: "Aerodrome",
    chain: "Base",
    chainIcon: "base",
    creator: {
      address: "0x9999888877776666555544443333222211110000",
      shortAddress: "0x9999...0000",
      totalPositions: 12,
      avgRoi: 28.4,
      winRate: 91,
      totalValueManaged: 180000,
    },
    entryDate: "2024-10-01",
    exitDate: "2024-11-20",
    durationDays: 50,
    initialValue: 20000,
    finalValue: 25600,
    feesEarned: 6200,
    ilLoss: 600,
    netProfit: 5600,
    roiPercent: 28.0,
    priceRange: {
      entryMin: 2000,
      entryMax: 2600,
      exitPrice: 2350,
    },
    strategy: "narrow",
    rebalanceCount: 4,
  },
];

export const creatorActivities: CreatorActivity[] = [
  {
    id: "act-1",
    address: "0x742d35Cc6634C0532925a3b844Bc9e7595f2bD11",
    shortAddress: "0x742d...bD11",
    timestamp: "2024-12-03T14:30:00Z",
    type: "mint",
    chain: "Arbitrum",
    dex: "Uniswap V3",
    pool: "ETH/USDC",
    value: 15000,
    txHash: "0xabc123...def456",
    details: "New position: $1,800 - $2,400 range",
  },
  {
    id: "act-2",
    address: "0x742d35Cc6634C0532925a3b844Bc9e7595f2bD11",
    shortAddress: "0x742d...bD11",
    timestamp: "2024-12-03T12:15:00Z",
    type: "claim",
    chain: "Arbitrum",
    dex: "Camelot",
    pool: "ARB/USDC",
    value: 245,
    txHash: "0xdef789...ghi012",
    details: "Claimed fees from ARB/USDC position",
  },
  {
    id: "act-3",
    address: "0x8Ba1f109551bD432803012645Ac136ddd64DBA72",
    shortAddress: "0x8Ba1...BA72",
    timestamp: "2024-12-03T10:45:00Z",
    type: "rebalance",
    chain: "Ethereum",
    dex: "Uniswap V3",
    pool: "WBTC/USDC",
    value: 48000,
    txHash: "0xghi345...jkl678",
    details: "Adjusted range: $92,000 - $105,000",
  },
  {
    id: "act-4",
    address: "0x1234567890abcdef1234567890abcdef12345678",
    shortAddress: "0x1234...5678",
    timestamp: "2024-12-03T09:20:00Z",
    type: "swap",
    chain: "HyperEVM",
    value: 5000,
    txHash: "0xjkl901...mno234",
    details: "Swapped 5,000 USDC for 7,142 HYPE",
  },
  {
    id: "act-5",
    address: "0x9999888877776666555544443333222211110000",
    shortAddress: "0x9999...0000",
    timestamp: "2024-12-03T08:00:00Z",
    type: "withdraw",
    chain: "Base",
    dex: "Aerodrome",
    pool: "ETH/USDC",
    value: 25600,
    txHash: "0xmno567...pqr890",
    details: "Full withdrawal - 28% ROI achieved",
  },
  {
    id: "act-6",
    address: "0xabcdef1234567890abcdef1234567890abcdef12",
    shortAddress: "0xabcd...ef12",
    timestamp: "2024-12-02T22:30:00Z",
    type: "deposit",
    chain: "Optimism",
    dex: "Velodrome",
    pool: "OP/USDC",
    value: 8500,
    txHash: "0xpqr123...stu456",
    details: "Added liquidity to existing position",
  },
  {
    id: "act-7",
    address: "0x742d35Cc6634C0532925a3b844Bc9e7595f2bD11",
    shortAddress: "0x742d...bD11",
    timestamp: "2024-12-02T18:45:00Z",
    type: "rebalance",
    chain: "Arbitrum",
    dex: "Uniswap V3",
    pool: "ETH/USDC",
    value: 32000,
    txHash: "0xstu789...vwx012",
    details: "Narrowed range: $2,100 - $2,350",
  },
  {
    id: "act-8",
    address: "0x1234567890abcdef1234567890abcdef12345678",
    shortAddress: "0x1234...5678",
    timestamp: "2024-12-02T15:00:00Z",
    type: "mint",
    chain: "HyperEVM",
    dex: "HyperSwap",
    pool: "HYPE/USDC",
    value: 12000,
    txHash: "0xvwx345...yza678",
    details: "New aggressive position: $0.55 - $0.90 range",
  },
];

export const topCreators: TopCreator[] = [
  {
    address: "0x742d35Cc6634C0532925a3b844Bc9e7595f2bD11",
    shortAddress: "0x742d...bD11",
    totalPositions: 45,
    activePositions: 8,
    totalValueManaged: 1250000,
    avgRoi: 18.5,
    winRate: 89,
    totalFeesEarned: 156000,
    chains: ["Arbitrum", "Ethereum", "Base"],
    preferredDexes: ["Uniswap V3", "Camelot"],
    avgHoldingDays: 52,
  },
  {
    address: "0x8Ba1f109551bD432803012645Ac136ddd64DBA72",
    shortAddress: "0x8Ba1...BA72",
    totalPositions: 28,
    activePositions: 4,
    totalValueManaged: 890000,
    avgRoi: 22.3,
    winRate: 92,
    totalFeesEarned: 98000,
    chains: ["Ethereum", "Arbitrum"],
    preferredDexes: ["Uniswap V3"],
    avgHoldingDays: 68,
  },
  {
    address: "0x1234567890abcdef1234567890abcdef12345678",
    shortAddress: "0x1234...5678",
    totalPositions: 67,
    activePositions: 12,
    totalValueManaged: 450000,
    avgRoi: 35.2,
    winRate: 78,
    totalFeesEarned: 89000,
    chains: ["HyperEVM", "Arbitrum"],
    preferredDexes: ["HyperSwap", "Camelot"],
    avgHoldingDays: 28,
  },
  {
    address: "0x9999888877776666555544443333222211110000",
    shortAddress: "0x9999...0000",
    totalPositions: 12,
    activePositions: 3,
    totalValueManaged: 180000,
    avgRoi: 28.4,
    winRate: 91,
    totalFeesEarned: 42000,
    chains: ["Base", "Optimism"],
    preferredDexes: ["Aerodrome", "Velodrome"],
    avgHoldingDays: 45,
  },
  {
    address: "0xabcdef1234567890abcdef1234567890abcdef12",
    shortAddress: "0xabcd...ef12",
    totalPositions: 34,
    activePositions: 6,
    totalValueManaged: 320000,
    avgRoi: 15.8,
    winRate: 85,
    totalFeesEarned: 52000,
    chains: ["Optimism", "Base", "Arbitrum"],
    preferredDexes: ["Velodrome", "Aerodrome"],
    avgHoldingDays: 38,
  },
];

export const analyticsOverview: AnalyticsOverview = {
  totalHistoricalPositions: 1245,
  totalValueProcessed: 45000000,
  avgRoi: 21.4,
  avgDuration: 48,
  topPerformingPool: "HYPE/USDC",
  topPerformingChain: "HyperEVM",
  totalCreatorsTracked: 342,
  avgFeesPerPosition: 2850,
};

export const roiDistribution = [
  { range: "< 0%", count: 45, percentage: 3.6 },
  { range: "0-5%", count: 156, percentage: 12.5 },
  { range: "5-10%", count: 289, percentage: 23.2 },
  { range: "10-15%", count: 312, percentage: 25.1 },
  { range: "15-20%", count: 198, percentage: 15.9 },
  { range: "20-30%", count: 156, percentage: 12.5 },
  { range: "30%+", count: 89, percentage: 7.2 },
];

export const chainPerformance = [
  { chain: "Arbitrum", avgRoi: 19.2, positionCount: 423, totalValue: 15600000 },
  { chain: "Ethereum", avgRoi: 17.8, positionCount: 298, totalValue: 12400000 },
  { chain: "HyperEVM", avgRoi: 32.5, positionCount: 156, totalValue: 4800000 },
  { chain: "Base", avgRoi: 24.1, positionCount: 201, totalValue: 7200000 },
  { chain: "Optimism", avgRoi: 18.5, positionCount: 167, totalValue: 5000000 },
];

export const activityTypes = [
  { type: "mint", label: "Mint", color: "bg-emerald-500" },
  { type: "deposit", label: "Deposit", color: "bg-blue-500" },
  { type: "withdraw", label: "Withdraw", color: "bg-amber-500" },
  { type: "rebalance", label: "Rebalance", color: "bg-purple-500" },
  { type: "claim", label: "Claim", color: "bg-indigo-500" },
  { type: "swap", label: "Swap", color: "bg-pink-500" },
];
