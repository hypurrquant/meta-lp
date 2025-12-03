export interface StableVault {
  id: string;
  name: string;
  description: string;
  token: string;
  tvl: number;
  apy: number;
  utilization: number;
  userDeposit: number;
  userEarned: number;
}

export interface LPVault {
  id: string;
  name: string;
  description: string;
  strategy: string;
  riskLevel: "conservative" | "balanced" | "growth" | "aggressive";

  totalCap: number;           // Total vault cap (e.g., $100)
  currentDeposit: number;     // Current total deposited
  targetRoi: number;          // Target ROI (3%)
  currentRoi: number;         // Current ROI

  status: "active" | "closing" | "completed";
  estimatedDays: number;
  startDate: string;
  endDate?: string;

  userDeposit?: number;
  userEarned?: number;
}

export interface VaultHistory {
  id: string;
  vaultName: string;
  strategy: string;
  finalRoi: number;
  durationDays: number;
  completedDate: string;
  totalDeposit: number;
}

export const stableVault: StableVault = {
  id: "stable-1",
  name: "Insurance Hedge Vault",
  description: "Provide margin for IL insurance hedge positions. Earn yield from insurance premiums.",
  token: "USDC",
  tvl: 820000,
  apy: 8.5,
  utilization: 65,
  userDeposit: 1000,
  userEarned: 42.5,
};

export const lpVaults: LPVault[] = [
  {
    id: "lp-1",
    name: "Conservative Alpha",
    description: "Low-risk strategy focusing on stable pairs and blue-chip assets. Minimal IL exposure with steady returns.",
    strategy: "Stable pairs, tight ranges, frequent rebalancing",
    riskLevel: "conservative",
    totalCap: 100,
    currentDeposit: 78,
    targetRoi: 3,
    currentRoi: 2.4,
    status: "active",
    estimatedDays: 2,
    startDate: "2024-11-28",
    userDeposit: 20,
    userEarned: 0.48,
  },
  {
    id: "lp-2",
    name: "Balanced Growth",
    description: "Moderate risk with diversified exposure across multiple pools. Balance between yield and safety.",
    strategy: "Mixed volatility pairs, adaptive ranges",
    riskLevel: "balanced",
    totalCap: 100,
    currentDeposit: 45,
    targetRoi: 3,
    currentRoi: 1.2,
    status: "active",
    estimatedDays: 5,
    startDate: "2024-11-30",
  },
  {
    id: "lp-3",
    name: "Growth Seeker",
    description: "Higher risk tolerance for potentially higher returns. Captures market momentum.",
    strategy: "Trending pairs, wider ranges, momentum-based",
    riskLevel: "growth",
    totalCap: 100,
    currentDeposit: 100,
    targetRoi: 3,
    currentRoi: 2.9,
    status: "closing",
    estimatedDays: 1,
    startDate: "2024-11-25",
  },
  {
    id: "lp-4",
    name: "Aggressive Yield",
    description: "Maximum yield potential with higher volatility exposure. For experienced DeFi users.",
    strategy: "High volatility pairs, concentrated liquidity",
    riskLevel: "aggressive",
    totalCap: 100,
    currentDeposit: 32,
    targetRoi: 3,
    currentRoi: 0.8,
    status: "active",
    estimatedDays: 7,
    startDate: "2024-12-01",
  },
  {
    id: "lp-5",
    name: "Passive Income",
    description: "Set-and-forget strategy with minimal maintenance. Optimized for consistent passive returns.",
    strategy: "Wide ranges, low rebalancing frequency",
    riskLevel: "conservative",
    totalCap: 100,
    currentDeposit: 92,
    targetRoi: 3,
    currentRoi: 2.1,
    status: "active",
    estimatedDays: 3,
    startDate: "2024-11-27",
    userDeposit: 15,
    userEarned: 0.32,
  },
];

export const vaultHistory: VaultHistory[] = [
  {
    id: "hist-1",
    vaultName: "Conservative Alpha #12",
    strategy: "conservative",
    finalRoi: 3.2,
    durationDays: 4,
    completedDate: "2024-11-27",
    totalDeposit: 100,
  },
  {
    id: "hist-2",
    vaultName: "Passive Income #8",
    strategy: "conservative",
    finalRoi: 3.0,
    durationDays: 6,
    completedDate: "2024-11-25",
    totalDeposit: 100,
  },
  {
    id: "hist-3",
    vaultName: "Aggressive Yield #5",
    strategy: "aggressive",
    finalRoi: 3.5,
    durationDays: 2,
    completedDate: "2024-11-24",
    totalDeposit: 100,
  },
  {
    id: "hist-4",
    vaultName: "Balanced Growth #7",
    strategy: "balanced",
    finalRoi: 3.1,
    durationDays: 5,
    completedDate: "2024-11-22",
    totalDeposit: 100,
  },
  {
    id: "hist-5",
    vaultName: "Growth Seeker #4",
    strategy: "growth",
    finalRoi: 3.0,
    durationDays: 3,
    completedDate: "2024-11-20",
    totalDeposit: 100,
  },
  {
    id: "hist-6",
    vaultName: "Conservative Alpha #11",
    strategy: "conservative",
    finalRoi: 3.1,
    durationDays: 5,
    completedDate: "2024-11-18",
    totalDeposit: 100,
  },
];

export const vaultStats = {
  totalVaultsCompleted: 45,
  averageRoi: 3.1,
  averageDuration: 4.2,
  totalValueProcessed: 4500,
  successRate: 100,
};

export const riskLevelInfo = {
  conservative: {
    label: "Conservative",
    color: "text-emerald-400 bg-emerald-500/20",
    description: "Low risk, stable returns",
  },
  balanced: {
    label: "Balanced",
    color: "text-blue-400 bg-blue-500/20",
    description: "Moderate risk and reward",
  },
  growth: {
    label: "Growth",
    color: "text-amber-400 bg-amber-500/20",
    description: "Higher risk, higher potential",
  },
  aggressive: {
    label: "Aggressive",
    color: "text-red-400 bg-red-500/20",
    description: "Maximum yield focus",
  },
};
