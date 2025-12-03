"use client";

import { useState, useMemo } from "react";
import {
  Vote,
  Clock,
  Star,
  X,
  Check,
  Crown,
  Lock,
  Gift,
  DollarSign,
} from "lucide-react";
import {
  votePools,
  userVoteInfo,
  epochInfo,
  type VotePool,
} from "@/data/mock-vote";
import { cn } from "@/lib/utils";

// Chain colors
const chainColors: Record<string, string> = {
  Ethereum: "bg-blue-500",
  Arbitrum: "bg-sky-500",
  Base: "bg-blue-600",
  Optimism: "bg-red-500",
  Polygon: "bg-purple-500",
  HyperEVM: "bg-emerald-500",
  Solana: "bg-purple-600",
};

// Plan colors
const planColors: Record<string, { bg: string; text: string; border: string }> = {
  pro: { bg: "bg-indigo-500/20", text: "text-indigo-400", border: "border-indigo-500/30" },
  premium: { bg: "bg-amber-500/20", text: "text-amber-400", border: "border-amber-500/30" },
  free: { bg: "bg-muted", text: "text-muted-foreground", border: "border-border" },
};

// Subscription Status Banner
function SubscriptionBanner({ isSubscribed, plan, expiresAt }: {
  isSubscribed: boolean;
  plan: string | null;
  expiresAt: string | null;
}) {
  if (isSubscribed && plan) {
    const colors = planColors[plan] || planColors.pro;
    return (
      <div className={cn("rounded-xl border p-4", colors.bg, colors.border)}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={cn("rounded-lg p-2", colors.bg)}>
              <Crown className={cn("h-5 w-5", colors.text)} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold capitalize">{plan} Member</span>
                <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium", colors.bg, colors.text)}>
                  Active
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Expires: {expiresAt}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Vote className={cn("h-5 w-5", colors.text)} />
            <span className={cn("font-bold", colors.text)}>1 Vote</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card/50 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-muted p-2">
            <Lock className="h-5 w-5 text-muted-foreground" />
          </div>
          <div>
            <span className="font-semibold">Free User</span>
            <p className="text-xs text-muted-foreground">
              Subscribe to unlock voting rights
            </p>
          </div>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-600">
          <Crown className="h-4 w-4" />
          Upgrade
        </button>
      </div>
    </div>
  );
}

// Pool Card Component
function PoolCard({
  pool,
  onVote,
  canVote,
  hasVoted,
}: {
  pool: VotePool;
  onVote: (pool: VotePool) => void;
  canVote: boolean;
  hasVoted: boolean;
}) {
  const isMyVote = pool.userVotes > 0;

  return (
    <div className={cn(
      "rounded-xl border bg-card/50 p-4",
      isMyVote ? "border-indigo-500/50" : "border-border/50"
    )}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "h-10 w-10 rounded-lg flex items-center justify-center text-white text-xs font-bold",
              chainColors[pool.chain] || "bg-gray-500"
            )}
          >
            {pool.chain.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">{pool.pool}</span>
              {pool.isCurated && (
                <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {pool.dex} • {pool.feeTier}%
            </p>
          </div>
        </div>
        {isMyVote && (
          <div className="flex items-center gap-1 rounded-full bg-indigo-500/20 px-2 py-1">
            <Check className="h-3 w-3 text-indigo-400" />
            <span className="text-xs font-medium text-indigo-400">Voted</span>
          </div>
        )}
      </div>

      {/* Metrics */}
      <div className="mt-4 grid grid-cols-3 gap-4">
        <div>
          <p className="text-xs text-muted-foreground">Votes</p>
          <p className="text-lg font-bold">{pool.totalVotes.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Weight</p>
          <p className="text-lg font-bold">{pool.voteWeight}%</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">TVL</p>
          <p className="text-lg font-bold">${(pool.tvl / 1000000).toFixed(1)}M</p>
        </div>
      </div>

      {/* Vote Weight Bar */}
      <div className="mt-3">
        <div className="h-2 rounded-full bg-muted">
          <div
            className={cn(
              "h-full rounded-full",
              isMyVote ? "bg-indigo-500" : "bg-muted-foreground/30"
            )}
            style={{ width: `${Math.min(pool.voteWeight * 4, 100)}%` }}
          />
        </div>
      </div>

      {/* Action */}
      {canVote && !hasVoted ? (
        <button
          onClick={() => onVote(pool)}
          className="mt-4 w-full flex items-center justify-center gap-2 rounded-lg bg-indigo-500 py-2.5 text-sm font-medium text-white hover:bg-indigo-600"
        >
          <Vote className="h-4 w-4" />
          Vote for this Pool
        </button>
      ) : isMyVote ? (
        <div className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-indigo-500/10 py-2.5 text-sm font-medium text-indigo-400">
          <Check className="h-4 w-4" />
          Your Vote
        </div>
      ) : hasVoted ? (
        <div className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-muted py-2.5 text-sm text-muted-foreground">
          Already Voted
        </div>
      ) : (
        <button
          disabled
          className="mt-4 w-full flex items-center justify-center gap-2 rounded-lg bg-muted py-2.5 text-sm text-muted-foreground cursor-not-allowed"
        >
          <Lock className="h-4 w-4" />
          Subscribe to Vote
        </button>
      )}
    </div>
  );
}

// Vote Confirmation Modal
function VoteModal({
  pool,
  onClose,
  onConfirm,
}: {
  pool: VotePool;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 p-0 sm:p-4">
      <div className="w-full max-w-md rounded-t-2xl sm:rounded-2xl border border-border bg-card">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border p-4">
          <div>
            <h2 className="text-lg font-bold">Confirm Vote</h2>
            <p className="text-sm text-muted-foreground">This action uses your vote for this epoch</p>
          </div>
          <button onClick={onClose} className="rounded-lg p-2 hover:bg-muted">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {/* Pool Info */}
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
            <div
              className={cn(
                "h-12 w-12 rounded-lg flex items-center justify-center text-white text-sm font-bold",
                chainColors[pool.chain] || "bg-gray-500"
              )}
            >
              {pool.chain.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">{pool.pool}</span>
                {pool.isCurated && (
                  <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {pool.dex} • {pool.chain}
              </p>
            </div>
          </div>

          {/* Vote Info */}
          <div className="p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/30">
            <div className="flex items-center justify-between">
              <span className="text-sm text-indigo-400">Your Vote</span>
              <span className="font-bold text-indigo-400">1 Vote</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              You can only vote once per epoch. Choose wisely!
            </p>
          </div>

          {/* Reward Info */}
          <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Gift className="h-4 w-4 text-emerald-400" />
                <span className="text-sm text-emerald-400">Est. Reward</span>
              </div>
              <span className="font-bold text-emerald-400">
                ${((1 / pool.totalVotes) * pool.estimatedRewards * 100).toFixed(2)}
              </span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Rewards distributed at end of epoch
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 rounded-lg border border-border py-3 text-sm font-medium hover:bg-muted"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-indigo-500 py-3 text-sm font-medium text-white hover:bg-indigo-600"
            >
              <Check className="h-4 w-4" />
              Confirm Vote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VotePage() {
  const [selectedPool, setSelectedPool] = useState<VotePool | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "curated" | "voted">("all");

  const { subscription } = userVoteInfo;
  const canVote = subscription.hasVotingRight && userVoteInfo.availableVotingPower > 0;
  const hasVoted = userVoteInfo.usedVotingPower > 0;

  // Filter pools
  const displayedPools = useMemo(() => {
    const filtered = [...votePools];
    if (activeTab === "curated") {
      return filtered.filter((p) => p.isCurated).sort((a, b) => b.voteWeight - a.voteWeight);
    } else if (activeTab === "voted") {
      return filtered.filter((p) => p.userVotes > 0);
    }
    return filtered.sort((a, b) => b.voteWeight - a.voteWeight);
  }, [activeTab]);

  const handleVoteConfirm = () => {
    // Here you would submit the vote
    setSelectedPool(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/30 px-4 py-4">
        <h1 className="text-xl font-bold">Vote</h1>
        <p className="text-sm text-muted-foreground">
          Direct protocol revenue to LP pools
        </p>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Subscription Status */}
        <SubscriptionBanner
          isSubscribed={subscription.isSubscribed}
          plan={subscription.plan}
          expiresAt={subscription.expiresAt}
        />

        {/* Epoch & Rewards Info */}
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Epoch */}
          <div className="rounded-xl border border-border/50 bg-card/50 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-amber-400" />
                <span className="text-sm text-muted-foreground">
                  Epoch {epochInfo.currentEpoch}
                </span>
              </div>
              <span className="text-lg font-bold text-amber-400">
                {epochInfo.timeRemaining}
              </span>
            </div>
            <div className="mt-3 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Participants</span>
              <span className="font-medium">{epochInfo.participatingUsers.toLocaleString()}</span>
            </div>
          </div>

          {/* Rewards Pool */}
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-emerald-400" />
                <span className="text-sm text-emerald-400">Rewards Pool</span>
              </div>
              <span className="text-lg font-bold text-emerald-400">
                ${epochInfo.totalRewardsPool.toLocaleString()}
              </span>
            </div>
            {hasVoted && userVoteInfo.pendingRewards > 0 && (
              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="text-emerald-400/70">Your Pending</span>
                <span className="font-medium text-emerald-400">
                  ${userVoteInfo.pendingRewards.toFixed(2)}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Vote Status */}
        {subscription.isSubscribed && (
          <div className={cn(
            "rounded-xl border p-4",
            hasVoted
              ? "border-indigo-500/30 bg-indigo-500/10"
              : "border-amber-500/30 bg-amber-500/10"
          )}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Vote className={cn("h-4 w-4", hasVoted ? "text-indigo-400" : "text-amber-400")} />
                <span className={cn("text-sm font-medium", hasVoted ? "text-indigo-400" : "text-amber-400")}>
                  {hasVoted ? "Vote Submitted" : "Vote Available"}
                </span>
              </div>
              <span className={cn("text-sm", hasVoted ? "text-indigo-400" : "text-amber-400")}>
                {hasVoted ? "1/1 Used" : "1/1 Available"}
              </span>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 border-b border-border pb-2">
          {[
            { key: "all", label: "All Pools" },
            { key: "curated", label: "Curated" },
            { key: "voted", label: "My Vote" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                activeTab === tab.key
                  ? "bg-indigo-500/20 text-indigo-400"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Pool Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {displayedPools.map((pool) => (
            <PoolCard
              key={pool.id}
              pool={pool}
              onVote={setSelectedPool}
              canVote={canVote}
              hasVoted={hasVoted}
            />
          ))}
        </div>

        {displayedPools.length === 0 && (
          <div className="py-12 text-center">
            <Vote className="h-12 w-12 mx-auto text-muted-foreground" />
            <p className="mt-4 text-muted-foreground">
              {activeTab === "voted"
                ? "You haven't voted yet"
                : "No pools found"}
            </p>
          </div>
        )}
      </div>

      {/* Vote Modal */}
      {selectedPool && (
        <VoteModal
          pool={selectedPool}
          onClose={() => setSelectedPool(null)}
          onConfirm={handleVoteConfirm}
        />
      )}
    </div>
  );
}
