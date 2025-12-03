"use client";

import { useState, useMemo } from "react";
import {
  Vote,
  Clock,
  Star,
  ChevronDown,
  ChevronUp,
  X,
  ExternalLink,
  Plus,
  Minus,
  Check,
  Sparkles,
  RotateCcw,
  RefreshCw,
  Info,
  Zap,
} from "lucide-react";
import {
  votePools,
  userVoteInfo,
  rewardHistory,
  epochInfo,
  type VotePool,
} from "@/data/mock-vote";
import { cn } from "@/lib/utils";

type SortKey = "pool" | "rewards" | "apr" | "voteWeight" | "userVotes" | "tvl";
type SortDirection = "asc" | "desc";

// Sortable Table Header Component
function SortableHeader({
  label,
  sortKey,
  currentSort,
  currentDirection,
  onSort,
  align = "left",
}: {
  label: string;
  sortKey: SortKey;
  currentSort: SortKey;
  currentDirection: SortDirection;
  onSort: (key: SortKey) => void;
  align?: "left" | "right" | "center";
}) {
  const isActive = currentSort === sortKey;

  return (
    <th
      className={cn(
        "cursor-pointer px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground",
        align === "right" && "text-right",
        align === "center" && "text-center"
      )}
      onClick={() => onSort(sortKey)}
    >
      <div
        className={cn(
          "inline-flex items-center gap-1",
          align === "right" && "flex-row-reverse"
        )}
      >
        {label}
        <span className="flex flex-col">
          <ChevronUp
            className={cn(
              "h-3 w-3 -mb-1",
              isActive && currentDirection === "asc"
                ? "text-indigo-400"
                : "text-muted-foreground/40"
            )}
          />
          <ChevronDown
            className={cn(
              "h-3 w-3 -mt-1",
              isActive && currentDirection === "desc"
                ? "text-indigo-400"
                : "text-muted-foreground/40"
            )}
          />
        </span>
      </div>
    </th>
  );
}

// Voting Power Card
function VotingPowerCard() {
  const votingPowerUsedPercent =
    (userVoteInfo.usedVotingPower / userVoteInfo.totalVotingPower) * 100;
  const availablePercent = 100 - votingPowerUsedPercent;

  return (
    <div className="rounded-xl border border-border/50 bg-card/50 p-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Vote className="h-5 w-5 text-indigo-400" />
            <h3 className="font-semibold">Your Voting Power</h3>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Stake more KAIROS to increase your voting power
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-indigo-500/20 px-4 py-2 text-sm font-medium text-indigo-400 transition-colors hover:bg-indigo-500/30">
          <Sparkles className="h-4 w-4" />
          Get More Power
        </button>
      </div>

      <div className="mt-6 flex items-end gap-8">
        {/* Main Power Display */}
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-bold text-indigo-400">
              {availablePercent.toFixed(1)}%
            </span>
            <span className="text-lg text-muted-foreground">Available</span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            {userVoteInfo.availableVotingPower.toLocaleString()} /{" "}
            {userVoteInfo.totalVotingPower.toLocaleString()} votes
          </p>
        </div>

        {/* Visual Bar */}
        <div className="flex-1">
          <div className="h-4 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all"
              style={{ width: `${votingPowerUsedPercent}%` }}
            />
          </div>
          <div className="mt-2 flex justify-between text-xs text-muted-foreground">
            <span>{votingPowerUsedPercent.toFixed(1)}% allocated</span>
            <span>{userVoteInfo.votingPositions.length} pools voted</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Epoch Info Card
function EpochInfoCard() {
  return (
    <div className="rounded-xl border border-border/50 bg-card/50 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="h-5 w-5 text-amber-400" />
        <h3 className="font-semibold">Epoch {epochInfo.currentEpoch}</h3>
        <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs text-emerald-400">
          Active
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider">
            Time Left
          </p>
          <p className="mt-1 text-xl font-semibold text-amber-400">
            {epochInfo.timeRemaining}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider">
            Total Votes
          </p>
          <p className="mt-1 text-xl font-semibold">
            {(epochInfo.totalVotes / 1000).toFixed(0)}K
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider">
            Rewards Pool
          </p>
          <p className="mt-1 text-xl font-semibold text-emerald-400">
            ${epochInfo.totalRewardsPool.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider">
            Participants
          </p>
          <p className="mt-1 text-xl font-semibold">
            {epochInfo.participatingUsers.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-border/50">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            {epochInfo.epochStartDate} → {epochInfo.epochEndDate}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-emerald-400 font-medium">
              ${userVoteInfo.pendingRewards.toFixed(2)} pending
            </span>
            <button className="rounded-lg bg-emerald-500/20 px-3 py-1 text-xs font-medium text-emerald-400 transition-colors hover:bg-emerald-500/30">
              Claim
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Vote Table Row
function VoteTableRow({
  pool,
  onVote,
  pendingVotes,
  onPendingVoteChange,
}: {
  pool: VotePool;
  onVote: (pool: VotePool) => void;
  pendingVotes: number;
  onPendingVoteChange: (poolId: string, votes: number) => void;
}) {
  const hasUserVotes = pool.userVotes > 0;
  const hasPendingChanges = pendingVotes !== pool.userVotes;

  return (
    <tr className="border-b border-border/30 transition-colors hover:bg-muted/30">
      {/* Pool */}
      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-gray-600 to-gray-800 text-xs font-bold text-white">
            {pool.chain.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium">{pool.pool}</span>
              <span className="rounded bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
                {pool.feeTier}%
              </span>
              {pool.isCurated && (
                <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {pool.dex} • {pool.chain}
            </p>
          </div>
        </div>
      </td>

      {/* Rewards */}
      <td className="px-4 py-4 text-right">
        <p className="font-medium text-emerald-400">
          ${pool.estimatedRewards.toLocaleString()}
        </p>
        <p className="text-xs text-muted-foreground">/epoch</p>
      </td>

      {/* APR */}
      <td className="px-4 py-4 text-right">
        <p className="font-medium">{pool.rewardApy}%</p>
        <p className="text-xs text-muted-foreground">vote APR</p>
      </td>

      {/* TVL */}
      <td className="px-4 py-4 text-right">
        <p className="font-medium">${(pool.tvl / 1000000).toFixed(1)}M</p>
      </td>

      {/* Global Weight */}
      <td className="px-4 py-4 text-center">
        <div className="inline-flex flex-col items-center">
          <span className="text-lg font-semibold">{pool.voteWeight}%</span>
          <div className="h-1.5 w-16 rounded-full bg-muted mt-1">
            <div
              className="h-full rounded-full bg-indigo-500"
              style={{ width: `${pool.voteWeight}%` }}
            />
          </div>
        </div>
      </td>

      {/* Your Votes */}
      <td className="px-4 py-4">
        <div className="flex items-center justify-end gap-2">
          <input
            type="number"
            value={pendingVotes}
            onChange={(e) =>
              onPendingVoteChange(
                pool.id,
                Math.max(0, parseInt(e.target.value) || 0)
              )
            }
            className={cn(
              "w-24 rounded-lg border bg-background px-3 py-1.5 text-right text-sm font-medium outline-none transition-colors",
              hasPendingChanges
                ? "border-indigo-500 bg-indigo-500/10"
                : "border-border"
            )}
          />
          {hasUserVotes && (
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              ({((pool.userVotes / epochInfo.totalVotes) * 100).toFixed(2)}%)
            </span>
          )}
        </div>
      </td>

      {/* Actions */}
      <td className="px-4 py-4">
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => onVote(pool)}
            className={cn(
              "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
              hasUserVotes
                ? "bg-muted text-foreground hover:bg-muted/80"
                : "bg-indigo-500 text-white hover:bg-indigo-600"
            )}
          >
            {hasUserVotes ? "Adjust" : "Vote"}
          </button>
          <button className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
            <ExternalLink className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}

// Vote Modal
function VoteModal({
  pool,
  onClose,
  onConfirm,
}: {
  pool: VotePool;
  onClose: () => void;
  onConfirm: (votes: number) => void;
}) {
  const [voteAmount, setVoteAmount] = useState(pool.userVotes || 0);
  const maxVotes = userVoteInfo.availableVotingPower + pool.userVotes;

  const setPercentage = (pct: number) => {
    setVoteAmount(Math.floor(maxVotes * (pct / 100)));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl border border-border bg-card p-6">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-6">
          <h2 className="text-xl font-bold">Allocate Votes</h2>
          <div className="mt-2 flex items-center gap-2">
            <span className="font-medium">{pool.pool}</span>
            <span className="rounded bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
              {pool.chain}
            </span>
          </div>
        </div>

        {/* Available Votes */}
        <div className="mb-6 rounded-xl border border-border bg-muted/30 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Available to allocate
            </span>
            <span className="font-semibold">{maxVotes.toLocaleString()}</span>
          </div>
          {pool.userVotes > 0 && (
            <p className="mt-1 text-xs text-muted-foreground">
              Includes {pool.userVotes.toLocaleString()} currently in this pool
            </p>
          )}
        </div>

        {/* Vote Amount Input */}
        <div className="mb-4">
          <label className="mb-2 block text-sm text-muted-foreground">
            Votes to allocate
          </label>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setVoteAmount(Math.max(0, voteAmount - 100))}
              className="rounded-lg border border-border bg-background p-2 transition-colors hover:bg-muted"
            >
              <Minus className="h-4 w-4" />
            </button>
            <input
              type="number"
              value={voteAmount}
              onChange={(e) =>
                setVoteAmount(
                  Math.min(maxVotes, Math.max(0, Number(e.target.value)))
                )
              }
              className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-center text-lg font-semibold outline-none focus:border-indigo-500"
            />
            <button
              onClick={() => setVoteAmount(Math.min(maxVotes, voteAmount + 100))}
              className="rounded-lg border border-border bg-background p-2 transition-colors hover:bg-muted"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Quick Select */}
        <div className="mb-6 grid grid-cols-4 gap-2">
          {[25, 50, 75, 100].map((pct) => (
            <button
              key={pct}
              onClick={() => setPercentage(pct)}
              className="rounded-lg border border-border bg-background py-2 text-sm transition-colors hover:bg-muted"
            >
              {pct}%
            </button>
          ))}
        </div>

        {/* Estimated Impact */}
        <div className="mb-6 rounded-xl border border-indigo-500/30 bg-indigo-500/10 p-4">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="h-4 w-4 text-indigo-400" />
            <span className="text-sm font-medium text-indigo-400">
              Vote Impact
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Your pool share</p>
              <p className="font-semibold">
                {((voteAmount / (pool.totalVotes + voteAmount - pool.userVotes)) * 100).toFixed(2)}%
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Est. rewards</p>
              <p className="font-semibold text-emerald-400">
                ${((voteAmount / pool.totalVotes) * pool.estimatedRewards).toFixed(2)}/epoch
              </p>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="mb-6 flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3">
          <Info className="h-4 w-4 flex-shrink-0 text-amber-400 mt-0.5" />
          <p className="text-xs text-amber-400">
            Vote changes take effect immediately but rewards are distributed at epoch end.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border border-border bg-background py-2.5 text-sm font-medium transition-colors hover:bg-muted"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm(voteAmount);
              onClose();
            }}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 py-2.5 text-sm font-medium text-white transition-colors hover:from-indigo-600 hover:to-purple-700"
          >
            <Check className="h-4 w-4" />
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

// My Votes Summary
function MyVotesSummary() {
  const totalAllocated = userVoteInfo.votingPositions.reduce(
    (sum, p) => sum + p.votes,
    0
  );

  return (
    <div className="rounded-xl border border-border/50 bg-card/50">
      <div className="border-b border-border/50 px-4 py-3 flex items-center justify-between">
        <h3 className="font-semibold">My Active Votes</h3>
        <span className="text-sm text-muted-foreground">
          {totalAllocated.toLocaleString()} votes across{" "}
          {userVoteInfo.votingPositions.length} pools
        </span>
      </div>
      <div className="p-4">
        <div className="space-y-3">
          {userVoteInfo.votingPositions.map((position) => {
            const pool = votePools.find((p) => p.id === position.poolId);
            if (!pool) return null;

            return (
              <div
                key={position.poolId}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span className="font-medium">{pool.pool}</span>
                  <span className="text-xs text-muted-foreground">
                    {pool.chain}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-2 rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-indigo-500"
                      style={{ width: `${position.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium w-16 text-right">
                    {position.votes.toLocaleString()}
                  </span>
                  <span className="text-xs text-muted-foreground w-12 text-right">
                    {position.percentage}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Reward History
function RewardHistoryTable() {
  return (
    <div className="rounded-xl border border-border/50 bg-card/50">
      <div className="border-b border-border/50 px-4 py-3">
        <h3 className="font-semibold">Reward History</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/30 text-left">
              <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Date
              </th>
              <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Source
              </th>
              <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground text-right">
                Amount
              </th>
              <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground text-right">
                Tx
              </th>
            </tr>
          </thead>
          <tbody>
            {rewardHistory.map((reward) => (
              <tr
                key={reward.id}
                className="border-b border-border/30 last:border-0"
              >
                <td className="px-4 py-3 text-sm">{reward.date}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  {reward.source}
                </td>
                <td className="px-4 py-3 text-sm text-right font-medium text-emerald-400">
                  +${reward.amount.toFixed(2)}
                </td>
                <td className="px-4 py-3 text-right">
                  <button className="text-muted-foreground transition-colors hover:text-foreground">
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function VotePage() {
  const [selectedPool, setSelectedPool] = useState<VotePool | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "curated" | "voted">("all");
  const [sortKey, setSortKey] = useState<SortKey>("voteWeight");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [pendingVotes, setPendingVotes] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    votePools.forEach((pool) => {
      initial[pool.id] = pool.userVotes;
    });
    return initial;
  });

  // Handle sort
  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("desc");
    }
  };

  // Handle pending vote change
  const handlePendingVoteChange = (poolId: string, votes: number) => {
    setPendingVotes((prev) => ({ ...prev, [poolId]: votes }));
  };

  // Reset all pending votes
  const handleResetVotes = () => {
    const reset: Record<string, number> = {};
    votePools.forEach((pool) => {
      reset[pool.id] = pool.userVotes;
    });
    setPendingVotes(reset);
  };

  // Check if there are pending changes
  const hasPendingChanges = useMemo(() => {
    return votePools.some((pool) => pendingVotes[pool.id] !== pool.userVotes);
  }, [pendingVotes]);

  // Filter and sort pools
  const displayedPools = useMemo(() => {
    let filtered = [...votePools];

    if (activeTab === "curated") {
      filtered = filtered.filter((p) => p.isCurated);
    } else if (activeTab === "voted") {
      filtered = filtered.filter((p) => p.userVotes > 0);
    }

    filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortKey) {
        case "pool":
          comparison = a.pool.localeCompare(b.pool);
          break;
        case "rewards":
          comparison = a.estimatedRewards - b.estimatedRewards;
          break;
        case "apr":
          comparison = a.rewardApy - b.rewardApy;
          break;
        case "voteWeight":
          comparison = a.voteWeight - b.voteWeight;
          break;
        case "userVotes":
          comparison = a.userVotes - b.userVotes;
          break;
        case "tvl":
          comparison = a.tvl - b.tvl;
          break;
      }
      return sortDirection === "asc" ? comparison : -comparison;
    });

    return filtered;
  }, [activeTab, sortKey, sortDirection]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/30 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Vote</h1>
            <p className="text-sm text-muted-foreground">
              Direct protocol emissions by voting for pools
            </p>
          </div>
          <div className="flex items-center gap-3">
            {hasPendingChanges && (
              <>
                <button
                  onClick={handleResetVotes}
                  className="flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset
                </button>
                <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:from-indigo-600 hover:to-purple-700">
                  <RefreshCw className="h-4 w-4" />
                  Submit Votes
                </button>
              </>
            )}
            <button className="flex items-center gap-2 rounded-lg bg-indigo-500/20 px-4 py-2 text-sm font-medium text-indigo-400 transition-colors hover:bg-indigo-500/30">
              <Sparkles className="h-4 w-4" />
              Stake KAIROS
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Top Cards */}
        <div className="grid gap-6 lg:grid-cols-2">
          <VotingPowerCard />
          <EpochInfoCard />
        </div>

        {/* Tabs and Filters */}
        <div className="flex items-center justify-between border-b border-border">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setActiveTab("all")}
              className={cn(
                "pb-3 text-sm font-medium transition-colors",
                activeTab === "all"
                  ? "border-b-2 border-indigo-500 text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              All Pools ({votePools.length})
            </button>
            <button
              onClick={() => setActiveTab("curated")}
              className={cn(
                "flex items-center gap-1.5 pb-3 text-sm font-medium transition-colors",
                activeTab === "curated"
                  ? "border-b-2 border-indigo-500 text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Star className="h-4 w-4" />
              Curated ({votePools.filter((p) => p.isCurated).length})
            </button>
            <button
              onClick={() => setActiveTab("voted")}
              className={cn(
                "pb-3 text-sm font-medium transition-colors",
                activeTab === "voted"
                  ? "border-b-2 border-indigo-500 text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              My Votes ({votePools.filter((p) => p.userVotes > 0).length})
            </button>
          </div>
        </div>

        {/* Vote Table */}
        <div className="rounded-xl border border-border/50 bg-card/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/30">
                <tr className="border-b border-border/30">
                  <SortableHeader
                    label="Pool"
                    sortKey="pool"
                    currentSort={sortKey}
                    currentDirection={sortDirection}
                    onSort={handleSort}
                  />
                  <SortableHeader
                    label="Rewards"
                    sortKey="rewards"
                    currentSort={sortKey}
                    currentDirection={sortDirection}
                    onSort={handleSort}
                    align="right"
                  />
                  <SortableHeader
                    label="APR"
                    sortKey="apr"
                    currentSort={sortKey}
                    currentDirection={sortDirection}
                    onSort={handleSort}
                    align="right"
                  />
                  <SortableHeader
                    label="TVL"
                    sortKey="tvl"
                    currentSort={sortKey}
                    currentDirection={sortDirection}
                    onSort={handleSort}
                    align="right"
                  />
                  <SortableHeader
                    label="Global %"
                    sortKey="voteWeight"
                    currentSort={sortKey}
                    currentDirection={sortDirection}
                    onSort={handleSort}
                    align="center"
                  />
                  <SortableHeader
                    label="Your Votes"
                    sortKey="userVotes"
                    currentSort={sortKey}
                    currentDirection={sortDirection}
                    onSort={handleSort}
                    align="right"
                  />
                  <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {displayedPools.map((pool) => (
                  <VoteTableRow
                    key={pool.id}
                    pool={pool}
                    onVote={setSelectedPool}
                    pendingVotes={pendingVotes[pool.id] || 0}
                    onPendingVoteChange={handlePendingVoteChange}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {displayedPools.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16">
              <Vote className="h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No pools found</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {activeTab === "voted"
                  ? "You haven't voted for any pools yet"
                  : "No pools match your criteria"}
              </p>
            </div>
          )}
        </div>

        {/* Bottom Section */}
        <div className="grid gap-6 lg:grid-cols-2">
          <MyVotesSummary />
          <RewardHistoryTable />
        </div>
      </div>

      {/* Vote Modal */}
      {selectedPool && (
        <VoteModal
          pool={selectedPool}
          onClose={() => setSelectedPool(null)}
          onConfirm={(votes) => handlePendingVoteChange(selectedPool.id, votes)}
        />
      )}
    </div>
  );
}
