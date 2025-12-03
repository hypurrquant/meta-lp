"use client";

import { useState, useMemo } from "react";
import {
  TrendingUp,
  Users,
  Activity,
  BarChart3,
  Copy,
  ChevronDown,
  Search,
} from "lucide-react";
import {
  historicalPositions,
  creatorActivities,
  topCreators,
  analyticsOverview,
  roiDistribution,
  chainPerformance,
  activityTypes,
  type HistoricalPosition,
  type TopCreator,
} from "@/data/mock-analytics";
import { cn } from "@/lib/utils";

// Chain colors
const chainColors: Record<string, string> = {
  Ethereum: "bg-blue-500",
  Arbitrum: "bg-sky-500",
  Base: "bg-blue-600",
  Optimism: "bg-red-500",
  Polygon: "bg-purple-500",
  HyperEVM: "bg-emerald-500",
};

// Historical Position Card
function PositionCard({ position }: { position: HistoricalPosition }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-xl border border-border/50 bg-card/50 overflow-hidden">
      <div
        className="p-4 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "h-10 w-10 rounded-lg flex items-center justify-center text-white text-xs font-bold",
                chainColors[position.chain] || "bg-gray-500"
              )}
            >
              {position.chain.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <span className="font-semibold">{position.pool}</span>
              <p className="text-xs text-muted-foreground">
                {position.dex} • {position.durationDays}d
              </p>
            </div>
          </div>
          <ChevronDown
            className={cn(
              "h-5 w-5 text-muted-foreground transition-transform",
              expanded && "rotate-180"
            )}
          />
        </div>

        {/* Key Metrics */}
        <div className="mt-4 grid grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">ROI</p>
            <p className="text-lg font-bold text-emerald-400">
              +{position.roiPercent}%
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Profit</p>
            <p className="text-lg font-bold">
              ${(position.netProfit / 1000).toFixed(1)}K
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Initial</p>
            <p className="text-lg font-bold">
              ${(position.initialValue / 1000).toFixed(0)}K
            </p>
          </div>
        </div>
      </div>

      {/* Expanded Details */}
      {expanded && (
        <div className="border-t border-border/50 p-4 bg-muted/20 space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Fees Earned</span>
              <span className="text-emerald-400">+${position.feesEarned.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">IL Loss</span>
              <span className="text-red-400">-${position.ilLoss.toLocaleString()}</span>
            </div>
          </div>

          {/* Creator Info */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-indigo-500 flex items-center justify-center text-[10px] font-bold text-white">
                {position.creator.shortAddress.slice(2, 4)}
              </div>
              <span className="text-sm">{position.creator.shortAddress}</span>
            </div>
            <span className="text-xs text-emerald-400">{position.creator.winRate}% win</span>
          </div>
        </div>
      )}
    </div>
  );
}

// Top Creator Card
function CreatorCard({ creator }: { creator: TopCreator }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-xl border border-border/50 bg-card/50 overflow-hidden">
      <div
        className="p-4 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-sm font-bold text-white">
              {creator.shortAddress.slice(2, 4)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">{creator.shortAddress}</span>
                <button className="text-muted-foreground hover:text-foreground">
                  <Copy className="h-3.5 w-3.5" />
                </button>
              </div>
              <p className="text-xs text-muted-foreground">
                {creator.totalPositions} positions • {creator.activePositions} active
              </p>
            </div>
          </div>
          <ChevronDown
            className={cn(
              "h-5 w-5 text-muted-foreground transition-transform",
              expanded && "rotate-180"
            )}
          />
        </div>

        {/* Key Metrics */}
        <div className="mt-4 grid grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Avg ROI</p>
            <p className="text-lg font-bold text-emerald-400">+{creator.avgRoi}%</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Win Rate</p>
            <p className="text-lg font-bold">{creator.winRate}%</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Managed</p>
            <p className="text-lg font-bold">${(creator.totalValueManaged / 1000).toFixed(0)}K</p>
          </div>
        </div>
      </div>

      {/* Expanded Details */}
      {expanded && (
        <div className="border-t border-border/50 p-4 bg-muted/20 space-y-3">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Fees Earned</span>
              <span className="text-emerald-400">${(creator.totalFeesEarned / 1000).toFixed(0)}K</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Avg Hold</span>
              <span>{creator.avgHoldingDays} days</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1">
            {creator.chains.map((chain) => (
              <span
                key={chain}
                className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground"
              >
                {chain}
              </span>
            ))}
            {creator.preferredDexes.map((dex) => (
              <span
                key={dex}
                className="rounded bg-indigo-500/20 px-2 py-0.5 text-xs text-indigo-400"
              >
                {dex}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Activity Item
function ActivityItem({ activity }: { activity: (typeof creatorActivities)[0] }) {
  const typeConfig = activityTypes.find((t) => t.type === activity.type);

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );
    if (diffHours < 1) return "Just now";
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.floor(diffHours / 24)}d ago`;
  };

  return (
    <div className="flex items-start gap-3 p-3">
      <div className={cn("rounded-lg p-2 bg-indigo-500/20")}>
        <Activity className="h-4 w-4 text-indigo-400" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium">{activity.shortAddress}</span>
          <span className="rounded px-1.5 py-0.5 text-xs bg-indigo-500/20 text-indigo-400">
            {typeConfig?.label}
          </span>
          <span className="text-xs text-muted-foreground">
            {formatTime(activity.timestamp)}
          </span>
        </div>
        {activity.pool && (
          <p className="mt-1 text-xs text-muted-foreground truncate">
            {activity.pool} • {activity.chain} • ${activity.value.toLocaleString()}
          </p>
        )}
      </div>
    </div>
  );
}

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState<"positions" | "creators" | "activity">("positions");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter based on search
  const filteredPositions = useMemo(() => {
    if (!searchQuery) return historicalPositions;
    return historicalPositions.filter(
      (p) =>
        p.pool.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.chain.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const filteredCreators = useMemo(() => {
    if (!searchQuery) return topCreators;
    return topCreators.filter((c) =>
      c.shortAddress.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/30 px-4 py-4">
        <h1 className="text-xl font-bold">Analytics</h1>
        <p className="text-sm text-muted-foreground">
          Historical data & tracking
        </p>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Overview Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="rounded-xl border border-border/50 bg-card/50 p-3">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-indigo-400" />
              <p className="text-xs text-muted-foreground">Positions</p>
            </div>
            <p className="text-lg font-bold mt-1">
              {analyticsOverview.totalHistoricalPositions.toLocaleString()}
            </p>
          </div>
          <div className="rounded-xl border border-border/50 bg-card/50 p-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-emerald-400" />
              <p className="text-xs text-muted-foreground">Avg ROI</p>
            </div>
            <p className="text-lg font-bold text-emerald-400 mt-1">
              +{analyticsOverview.avgRoi}%
            </p>
          </div>
          <div className="rounded-xl border border-border/50 bg-card/50 p-3">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-purple-400" />
              <p className="text-xs text-muted-foreground">Creators</p>
            </div>
            <p className="text-lg font-bold mt-1">
              {analyticsOverview.totalCreatorsTracked.toLocaleString()}
            </p>
          </div>
        </div>

        {/* ROI Distribution */}
        <div className="rounded-xl border border-border/50 bg-card/50 p-4">
          <h3 className="text-sm font-semibold">ROI Distribution</h3>
          <div className="mt-3 space-y-2">
            {roiDistribution.map((item) => (
              <div key={item.range} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span>{item.range}</span>
                  <span className="text-muted-foreground">{item.percentage}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted">
                  <div
                    className={cn(
                      "h-full rounded-full",
                      item.range === "< 0%" ? "bg-red-500" : "bg-emerald-500"
                    )}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chain Performance */}
        <div className="rounded-xl border border-border/50 bg-card/50 p-4">
          <h3 className="text-sm font-semibold">Chain Performance</h3>
          <div className="mt-3 space-y-2">
            {chainPerformance.map((chain) => (
              <div
                key={chain.chain}
                className="flex items-center justify-between p-2 rounded-lg bg-muted/30"
              >
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "h-6 w-6 rounded flex items-center justify-center text-[10px] font-bold text-white",
                      chainColors[chain.chain] || "bg-gray-500"
                    )}
                  >
                    {chain.chain.slice(0, 2).toUpperCase()}
                  </div>
                  <span className="text-sm">{chain.chain}</span>
                </div>
                <span className="text-sm font-semibold text-emerald-400">
                  +{chain.avgRoi}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search pools, addresses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-border bg-background py-2.5 pl-10 pr-4 text-sm"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-border pb-2">
          {[
            { key: "positions", label: "Positions" },
            { key: "creators", label: "Creators" },
            { key: "activity", label: "Activity" },
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

        {/* Tab Content */}
        {activeTab === "positions" && (
          <div className="grid gap-4 sm:grid-cols-2">
            {filteredPositions.map((position) => (
              <PositionCard key={position.id} position={position} />
            ))}
          </div>
        )}

        {activeTab === "creators" && (
          <div className="grid gap-4 sm:grid-cols-2">
            {filteredCreators.map((creator) => (
              <CreatorCard key={creator.address} creator={creator} />
            ))}
          </div>
        )}

        {activeTab === "activity" && (
          <div className="rounded-xl border border-border/50 bg-card/50 divide-y divide-border/50">
            {creatorActivities.map((activity) => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}
          </div>
        )}

        {activeTab === "positions" && filteredPositions.length === 0 && (
          <div className="py-12 text-center">
            <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground" />
            <p className="mt-4 text-muted-foreground">No positions found</p>
          </div>
        )}

        {activeTab === "creators" && filteredCreators.length === 0 && (
          <div className="py-12 text-center">
            <Users className="h-12 w-12 mx-auto text-muted-foreground" />
            <p className="mt-4 text-muted-foreground">No creators found</p>
          </div>
        )}
      </div>
    </div>
  );
}
