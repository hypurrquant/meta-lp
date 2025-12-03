export interface VotePool {
  id: string;
  pool: string;
  dex: string;
  chain: string;
  chainIcon: string;
  feeTier: number;

  // Pool metrics
  tvl: number;
  volume24h: number;
  apy: number;
  avgRoi: number;

  // Voting stats
  totalVotes: number;
  voteWeight: number; // percentage of total votes
  userVotes: number;

  // Pool quality indicators
  qualityScore: number; // 1-100
  liquidityDepth: "high" | "medium" | "low";
  volatility: "low" | "medium" | "high";
  impermanentLossRisk: "low" | "medium" | "high";

  // Rewards
  estimatedRewards: number;
  rewardApy: number;

  isCurated: boolean;
  lastCuratedDate?: string;
}

export interface UserVoteInfo {
  totalVotingPower: number;
  usedVotingPower: number;
  availableVotingPower: number;
  stakedAmount: number;
  stakingApy: number;
  totalRewardsEarned: number;
  pendingRewards: number;
  votingPositions: {
    poolId: string;
    votes: number;
    percentage: number;
  }[];
}

export interface RewardHistory {
  id: string;
  date: string;
  amount: number;
  source: string;
  txHash: string;
}

export interface EpochInfo {
  currentEpoch: number;
  epochStartDate: string;
  epochEndDate: string;
  timeRemaining: string;
  totalVotes: number;
  totalRewardsPool: number;
  participatingUsers: number;
}

export const votePools: VotePool[] = [
  {
    id: "vote-1",
    pool: "ETH/USDC",
    dex: "Uniswap V3",
    chain: "Arbitrum",
    chainIcon: "arbitrum",
    feeTier: 0.05,
    tvl: 45200000,
    volume24h: 8900000,
    apy: 32.5,
    avgRoi: 18.2,
    totalVotes: 125000,
    voteWeight: 22.5,
    userVotes: 5000,
    qualityScore: 92,
    liquidityDepth: "high",
    volatility: "medium",
    impermanentLossRisk: "medium",
    estimatedRewards: 125,
    rewardApy: 15.2,
    isCurated: true,
    lastCuratedDate: "2024-11-28",
  },
  {
    id: "vote-2",
    pool: "WBTC/USDC",
    dex: "Uniswap V3",
    chain: "Ethereum",
    chainIcon: "ethereum",
    feeTier: 0.3,
    tvl: 32100000,
    volume24h: 5600000,
    apy: 28.4,
    avgRoi: 15.8,
    totalVotes: 98000,
    voteWeight: 17.6,
    userVotes: 0,
    qualityScore: 88,
    liquidityDepth: "high",
    volatility: "medium",
    impermanentLossRisk: "medium",
    estimatedRewards: 98,
    rewardApy: 12.8,
    isCurated: true,
    lastCuratedDate: "2024-11-25",
  },
  {
    id: "vote-3",
    pool: "HYPE/USDC",
    dex: "HyperSwap",
    chain: "HyperEVM",
    chainIcon: "hyperevm",
    feeTier: 0.3,
    tvl: 12800000,
    volume24h: 3200000,
    apy: 89.2,
    avgRoi: 35.5,
    totalVotes: 78000,
    voteWeight: 14.0,
    userVotes: 3000,
    qualityScore: 75,
    liquidityDepth: "medium",
    volatility: "high",
    impermanentLossRisk: "high",
    estimatedRewards: 78,
    rewardApy: 22.5,
    isCurated: true,
    lastCuratedDate: "2024-11-30",
  },
  {
    id: "vote-4",
    pool: "OP/USDC",
    dex: "Velodrome",
    chain: "Optimism",
    chainIcon: "optimism",
    feeTier: 0.3,
    tvl: 18500000,
    volume24h: 4200000,
    apy: 45.6,
    avgRoi: 21.3,
    totalVotes: 62000,
    voteWeight: 11.2,
    userVotes: 0,
    qualityScore: 82,
    liquidityDepth: "medium",
    volatility: "medium",
    impermanentLossRisk: "medium",
    estimatedRewards: 62,
    rewardApy: 14.5,
    isCurated: true,
    lastCuratedDate: "2024-11-22",
  },
  {
    id: "vote-5",
    pool: "ARB/USDC",
    dex: "Camelot",
    chain: "Arbitrum",
    chainIcon: "arbitrum",
    feeTier: 0.3,
    tvl: 15600000,
    volume24h: 3800000,
    apy: 52.3,
    avgRoi: 19.8,
    totalVotes: 54000,
    voteWeight: 9.7,
    userVotes: 2000,
    qualityScore: 79,
    liquidityDepth: "medium",
    volatility: "medium",
    impermanentLossRisk: "medium",
    estimatedRewards: 54,
    rewardApy: 13.2,
    isCurated: true,
    lastCuratedDate: "2024-11-20",
  },
  {
    id: "vote-6",
    pool: "ETH/USDC",
    dex: "Aerodrome",
    chain: "Base",
    chainIcon: "base",
    feeTier: 0.05,
    tvl: 28900000,
    volume24h: 6500000,
    apy: 38.7,
    avgRoi: 24.1,
    totalVotes: 72000,
    voteWeight: 13.0,
    userVotes: 1500,
    qualityScore: 85,
    liquidityDepth: "high",
    volatility: "medium",
    impermanentLossRisk: "low",
    estimatedRewards: 72,
    rewardApy: 16.8,
    isCurated: true,
    lastCuratedDate: "2024-11-29",
  },
  {
    id: "vote-7",
    pool: "USDC/USDT",
    dex: "Uniswap V3",
    chain: "Arbitrum",
    chainIcon: "arbitrum",
    feeTier: 0.01,
    tvl: 42000000,
    volume24h: 12400000,
    apy: 8.5,
    avgRoi: 8.2,
    totalVotes: 45000,
    voteWeight: 8.1,
    userVotes: 0,
    qualityScore: 95,
    liquidityDepth: "high",
    volatility: "low",
    impermanentLossRisk: "low",
    estimatedRewards: 45,
    rewardApy: 5.2,
    isCurated: true,
    lastCuratedDate: "2024-11-15",
  },
  {
    id: "vote-8",
    pool: "SOL/USDC",
    dex: "Orca",
    chain: "Solana",
    chainIcon: "solana",
    feeTier: 0.3,
    tvl: 8500000,
    volume24h: 2100000,
    apy: 65.4,
    avgRoi: 28.9,
    totalVotes: 22000,
    voteWeight: 4.0,
    userVotes: 0,
    qualityScore: 71,
    liquidityDepth: "medium",
    volatility: "high",
    impermanentLossRisk: "high",
    estimatedRewards: 22,
    rewardApy: 18.5,
    isCurated: false,
  },
];

export const userVoteInfo: UserVoteInfo = {
  totalVotingPower: 15000,
  usedVotingPower: 11500,
  availableVotingPower: 3500,
  stakedAmount: 5000,
  stakingApy: 12.5,
  totalRewardsEarned: 892.50,
  pendingRewards: 45.25,
  votingPositions: [
    { poolId: "vote-1", votes: 5000, percentage: 33.3 },
    { poolId: "vote-3", votes: 3000, percentage: 20.0 },
    { poolId: "vote-5", votes: 2000, percentage: 13.3 },
    { poolId: "vote-6", votes: 1500, percentage: 10.0 },
  ],
};

export const rewardHistory: RewardHistory[] = [
  {
    id: "reward-1",
    date: "2024-12-01",
    amount: 125.50,
    source: "Epoch 12 Rewards",
    txHash: "0xabc123...def456",
  },
  {
    id: "reward-2",
    date: "2024-11-24",
    amount: 118.25,
    source: "Epoch 11 Rewards",
    txHash: "0xdef789...ghi012",
  },
  {
    id: "reward-3",
    date: "2024-11-17",
    amount: 132.80,
    source: "Epoch 10 Rewards",
    txHash: "0xghi345...jkl678",
  },
  {
    id: "reward-4",
    date: "2024-11-10",
    amount: 108.45,
    source: "Epoch 9 Rewards",
    txHash: "0xjkl901...mno234",
  },
  {
    id: "reward-5",
    date: "2024-11-03",
    amount: 145.20,
    source: "Epoch 8 Rewards",
    txHash: "0xmno567...pqr890",
  },
];

export const epochInfo: EpochInfo = {
  currentEpoch: 13,
  epochStartDate: "2024-12-01",
  epochEndDate: "2024-12-08",
  timeRemaining: "4d 12h",
  totalVotes: 556000,
  totalRewardsPool: 25000,
  participatingUsers: 1842,
};

export const qualityScoreColors = {
  high: "text-emerald-400 bg-emerald-500/20",
  medium: "text-amber-400 bg-amber-500/20",
  low: "text-red-400 bg-red-500/20",
};

export const riskColors = {
  low: "text-emerald-400",
  medium: "text-amber-400",
  high: "text-red-400",
};
