"use client";

import { useState } from "react";
import {
  TrendingUp,
  Clock,
  DollarSign,
  Users,
  Activity,
  BarChart3,
  ExternalLink,
  Copy,
  ChevronRight,
  Filter,
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

// Overview Stats Component
function OverviewStats() {
  const stats = [
    {
      label: "Total Positions Tracked",
      value: analyticsOverview.totalHistoricalPositions.toLocaleString(),
      icon: BarChart3,
      color: "text-indigo-400",
      bgColor: "bg-indigo-500/10",
    },
    {
      label: "Total Value Processed",
      value: `$${(analyticsOverview.totalValueProcessed / 1000000).toFixed(1)}M`,
      icon: DollarSign,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
    },
    {
      label: "Average ROI",
      value: `${analyticsOverview.avgRoi}%`,
      icon: TrendingUp,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
    },
    {
      label: "Avg Duration",
      value: `${analyticsOverview.avgDuration} days`,
      icon: Clock,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
    },
    {
      label: "Creators Tracked",
      value: analyticsOverview.totalCreatorsTracked.toLocaleString(),
      icon: Users,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
    },
    {
      label: "Avg Fees/Position",
      value: `$${analyticsOverview.avgFeesPerPosition.toLocaleString()}`,
      icon: Activity,
      color: "text-amber-400",
      bgColor: "bg-amber-500/10",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-xl border border-border/50 bg-card/50 p-4 backdrop-blur-sm"
        >
          <div className="flex items-center gap-3">
            <div className={cn("rounded-lg p-2", stat.bgColor)}>
              <stat.icon className={cn("h-5 w-5", stat.color)} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className="text-lg font-semibold">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ROI Distribution Chart
function RoiDistributionChart() {
  const maxPercentage = Math.max(...roiDistribution.map((d) => d.percentage));

  return (
    <div className="rounded-xl border border-border/50 bg-card/50 p-5">
      <h3 className="font-semibold">ROI Distribution</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Historical position returns breakdown
      </p>
      <div className="mt-4 space-y-3">
        {roiDistribution.map((item) => (
          <div key={item.range} className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span>{item.range}</span>
              <span className="text-muted-foreground">
                {item.count} ({item.percentage}%)
              </span>
            </div>
            <div className="h-2 rounded-full bg-muted">
              <div
                className={cn(
                  "h-full rounded-full transition-all",
                  item.range === "< 0%"
                    ? "bg-red-500"
                    : item.range.includes("30%")
                    ? "bg-emerald-500"
                    : "bg-indigo-500"
                )}
                style={{ width: `${(item.percentage / maxPercentage) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Chain Performance Table
function ChainPerformanceTable() {
  return (
    <div className="rounded-xl border border-border/50 bg-card/50 p-5">
      <h3 className="font-semibold">Chain Performance</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Average returns by chain
      </p>
      <div className="mt-4 space-y-2">
        {chainPerformance.map((chain) => (
          <div
            key={chain.chain}
            className="flex items-center justify-between rounded-lg bg-muted/30 p-3"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-gray-600 to-gray-800 text-xs font-bold text-white">
                {chain.chain.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <p className="font-medium">{chain.chain}</p>
                <p className="text-xs text-muted-foreground">
                  {chain.positionCount} positions
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-emerald-400">+{chain.avgRoi}%</p>
              <p className="text-xs text-muted-foreground">
                ${(chain.totalValue / 1000000).toFixed(1)}M TVP
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Historical Position Card
function HistoricalPositionCard({ position }: { position: HistoricalPosition }) {
  return (
    <div className="rounded-xl border border-border/50 bg-card/50 p-4 transition-colors hover:bg-card/80">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-semibold">{position.pool}</h4>
            <span className="rounded bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
              {position.chain}
            </span>
          </div>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {position.dex} • {position.durationDays} days
          </p>
        </div>
        <div className="text-right">
          <p className="text-lg font-semibold text-emerald-400">
            +{position.roiPercent}%
          </p>
          <p className="text-xs text-muted-foreground">
            +${position.netProfit.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-3 text-sm">
        <div>
          <p className="text-xs text-muted-foreground">Initial</p>
          <p className="font-medium">${position.initialValue.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Fees</p>
          <p className="font-medium text-emerald-400">
            +${position.feesEarned.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">IL Loss</p>
          <p className="font-medium text-red-400">
            -${position.ilLoss.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Creator Info */}
      <div className="mt-3 flex items-center justify-between border-t border-border/50 pt-3">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-[10px] font-bold text-white">
            {position.creator.shortAddress.slice(2, 4)}
          </div>
          <span className="text-sm text-muted-foreground">
            {position.creator.shortAddress}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            {position.creator.winRate}% win rate
          </span>
          <button className="rounded p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
            <ExternalLink className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Top Creator Card
function TopCreatorCard({ creator }: { creator: TopCreator }) {
  return (
    <div className="rounded-xl border border-border/50 bg-card/50 p-4 transition-colors hover:bg-card/80">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-sm font-bold text-white">
            {creator.shortAddress.slice(2, 4)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="font-medium">{creator.shortAddress}</p>
              <button className="text-muted-foreground hover:text-foreground">
                <Copy className="h-3.5 w-3.5" />
              </button>
            </div>
            <p className="text-sm text-muted-foreground">
              {creator.totalPositions} positions • {creator.activePositions} active
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-semibold text-emerald-400">
            +{creator.avgRoi}%
          </p>
          <p className="text-xs text-muted-foreground">avg ROI</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-2 text-center text-sm">
        <div className="rounded-lg bg-muted/50 p-2">
          <p className="font-semibold">{creator.winRate}%</p>
          <p className="text-xs text-muted-foreground">Win Rate</p>
        </div>
        <div className="rounded-lg bg-muted/50 p-2">
          <p className="font-semibold">
            ${(creator.totalValueManaged / 1000).toFixed(0)}K
          </p>
          <p className="text-xs text-muted-foreground">Managed</p>
        </div>
        <div className="rounded-lg bg-muted/50 p-2">
          <p className="font-semibold">
            ${(creator.totalFeesEarned / 1000).toFixed(0)}K
          </p>
          <p className="text-xs text-muted-foreground">Fees</p>
        </div>
        <div className="rounded-lg bg-muted/50 p-2">
          <p className="font-semibold">{creator.avgHoldingDays}d</p>
          <p className="text-xs text-muted-foreground">Avg Hold</p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-1">
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
  );
}

// Activity Feed Item
function ActivityItem({
  activity,
}: {
  activity: (typeof creatorActivities)[0];
}) {
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
    <div className="flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-muted/30">
      <div className={cn("rounded-lg p-2", typeConfig?.color.replace("bg-", "bg-") + "/20")}>
        <Activity className={cn("h-4 w-4", typeConfig?.color.replace("bg-", "text-"))} />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{activity.shortAddress}</span>
          <span
            className={cn(
              "rounded px-1.5 py-0.5 text-xs",
              typeConfig?.color.replace("bg-", "bg-") + "/20",
              typeConfig?.color.replace("bg-", "text-")
            )}
          >
            {typeConfig?.label}
          </span>
          <span className="text-xs text-muted-foreground">
            {formatTime(activity.timestamp)}
          </span>
        </div>
        <p className="mt-0.5 text-sm text-muted-foreground">{activity.details}</p>
        {activity.pool && (
          <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
            <span>{activity.pool}</span>
            <span>•</span>
            <span>{activity.chain}</span>
            {activity.dex && (
              <>
                <span>•</span>
                <span>{activity.dex}</span>
              </>
            )}
            <span>•</span>
            <span className="font-medium text-foreground">
              ${activity.value.toLocaleString()}
            </span>
          </div>
        )}
      </div>
      <button className="text-muted-foreground transition-colors hover:text-foreground">
        <ExternalLink className="h-4 w-4" />
      </button>
    </div>
  );
}

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState<"positions" | "creators" | "activity">(
    "positions"
  );
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/30 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Analytics</h1>
            <p className="text-sm text-muted-foreground">
              Historical LP position data and on-chain activity tracking
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-1.5">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search address..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
            <button className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-1.5 text-sm transition-colors hover:bg-muted">
              <Filter className="h-4 w-4" />
              Filters
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Overview Stats */}
        <OverviewStats />

        {/* Charts Row */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <RoiDistributionChart />
          <ChainPerformanceTable />
        </div>

        {/* Tabs */}
        <div className="mt-8 flex items-center gap-4 border-b border-border">
          <button
            onClick={() => setActiveTab("positions")}
            className={cn(
              "pb-3 text-sm font-medium transition-colors",
              activeTab === "positions"
                ? "border-b-2 border-indigo-500 text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Historical Positions
          </button>
          <button
            onClick={() => setActiveTab("creators")}
            className={cn(
              "pb-3 text-sm font-medium transition-colors",
              activeTab === "creators"
                ? "border-b-2 border-indigo-500 text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Top Creators
          </button>
          <button
            onClick={() => setActiveTab("activity")}
            className={cn(
              "pb-3 text-sm font-medium transition-colors",
              activeTab === "activity"
                ? "border-b-2 border-indigo-500 text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            On-Chain Activity
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === "positions" && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {historicalPositions.map((position) => (
                <HistoricalPositionCard key={position.id} position={position} />
              ))}
            </div>
          )}

          {activeTab === "creators" && (
            <div className="grid gap-4 sm:grid-cols-2">
              {topCreators.map((creator) => (
                <TopCreatorCard key={creator.address} creator={creator} />
              ))}
            </div>
          )}

          {activeTab === "activity" && (
            <div className="rounded-xl border border-border/50 bg-card/50">
              <div className="border-b border-border/50 px-4 py-3">
                <h3 className="font-semibold">Recent Activity</h3>
                <p className="text-sm text-muted-foreground">
                  Live on-chain activity from tracked creators
                </p>
              </div>
              <div className="divide-y divide-border/50">
                {creatorActivities.map((activity) => (
                  <ActivityItem key={activity.id} activity={activity} />
                ))}
              </div>
              <div className="border-t border-border/50 p-3">
                <button className="flex w-full items-center justify-center gap-2 rounded-lg py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                  Load More
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
