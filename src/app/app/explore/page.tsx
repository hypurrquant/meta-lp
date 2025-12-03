"use client";

import { useState, useMemo } from "react";
import {
  ArrowRight,
  Copy,
  Search,
  Shield,
  X,
  ChevronDown,
  Sparkles,
  Check,
} from "lucide-react";
import {
  explorePositions,
  chains,
  type ExplorePosition,
} from "@/data/mock-explore-positions";
import { cn } from "@/lib/utils";

type SortKey = "roi" | "apy" | "value";

// Chain colors
const chainColors: Record<string, string> = {
  Ethereum: "bg-blue-500",
  Arbitrum: "bg-sky-500",
  Base: "bg-blue-600",
  Optimism: "bg-red-500",
  Polygon: "bg-purple-500",
  HyperEVM: "bg-emerald-500",
};

// Simple Position Card for both mobile and desktop
function PositionCard({
  position,
  onCopy,
}: {
  position: ExplorePosition;
  onCopy: (position: ExplorePosition) => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-xl border border-border/50 bg-card/50 overflow-hidden">
      {/* Main Card - Always visible */}
      <div
        className="p-4 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        {/* Header Row */}
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
              <div className="flex items-center gap-2">
                <span className="font-semibold">{position.pool}</span>
                {position.isInsured && (
                  <Shield className="h-4 w-4 text-emerald-400" />
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {position.dex} • {position.chain}
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

        {/* Key Metrics - Always visible */}
        <div className="mt-4 grid grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">ROI</p>
            <p className="text-lg font-bold text-emerald-400">
              +{position.performance.roiPercent}%
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">APY</p>
            <p className="text-lg font-bold">{position.performance.apy}%</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Value</p>
            <p className="text-lg font-bold">
              ${(position.currentBalance.totalValueUsd / 1000).toFixed(1)}K
            </p>
          </div>
        </div>
      </div>

      {/* Expanded Details */}
      {expanded && (
        <div className="border-t border-border/50 p-4 bg-muted/20 space-y-4">
          {/* Performance */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Fees Earned</span>
              <span className="text-emerald-400">
                +${position.performance.feesEarned.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">IL Loss</span>
              <span className="text-red-400">
                -${position.performance.ilLoss.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Duration</span>
              <span>{position.durationDays} days</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status</span>
              <span
                className={
                  position.priceRange.inRange
                    ? "text-emerald-400"
                    : "text-amber-400"
                }
              >
                {position.priceRange.inRange ? "In Range" : "Out of Range"}
              </span>
            </div>
          </div>

          {/* Price Range Bar */}
          <div>
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>${position.priceRange.min.toLocaleString()}</span>
              <span className="text-emerald-400">
                ${position.priceRange.current.toLocaleString()}
              </span>
              <span>${position.priceRange.max.toLocaleString()}</span>
            </div>
            <div className="h-2 rounded-full bg-muted relative">
              <div
                className="absolute h-2 rounded-full bg-indigo-500/50"
                style={{ left: "15%", right: "15%" }}
              />
              <div
                className="absolute h-3 w-1 -top-0.5 rounded bg-emerald-400"
                style={{
                  left: `${
                    ((position.priceRange.current - position.priceRange.min) /
                      (position.priceRange.max - position.priceRange.min)) *
                      70 +
                    15
                  }%`,
                }}
              />
            </div>
          </div>

          {/* Copy Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onCopy(position);
            }}
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-indigo-500 py-3 text-sm font-medium text-white hover:bg-indigo-600 transition-colors"
          >
            <Copy className="h-4 w-4" />
            Copy This Strategy
          </button>
        </div>
      )}
    </div>
  );
}

// Simplified Copy Modal
function CopyModal({
  position,
  onClose,
}: {
  position: ExplorePosition;
  onClose: () => void;
}) {
  const [selectedChain, setSelectedChain] = useState(position.chain);
  const [enableInsurance, setEnableInsurance] = useState(position.isInsured);

  const needsBridge = selectedChain !== position.chain;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 p-0 sm:p-4">
      <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl border border-border bg-card">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between border-b border-border bg-card p-4">
          <div>
            <h2 className="text-lg font-bold">Copy Position</h2>
            <p className="text-sm text-muted-foreground">{position.pool}</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-muted"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {/* Original Performance */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
            <span className="text-sm text-emerald-400">Original ROI</span>
            <span className="text-lg font-bold text-emerald-400">
              +{position.performance.roiPercent}%
            </span>
          </div>

          {/* Chain Selection */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Deploy on
            </label>
            <select
              value={selectedChain}
              onChange={(e) => setSelectedChain(e.target.value)}
              className="w-full rounded-lg border border-border bg-background p-3"
            >
              {chains
                .filter((c) => c.id !== "all")
                .map((chain) => (
                  <option key={chain.id} value={chain.name}>
                    {chain.name}
                  </option>
                ))}
            </select>
            {needsBridge && (
              <p className="mt-2 text-sm text-amber-400 flex items-center gap-1">
                <ArrowRight className="h-4 w-4" />
                Bridge required
              </p>
            )}
          </div>

          {/* IL Insurance Toggle */}
          <div className="flex items-center justify-between p-3 rounded-lg border border-border">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-emerald-400" />
              <span className="text-sm font-medium">IL Insurance</span>
            </div>
            <button
              onClick={() => setEnableInsurance(!enableInsurance)}
              className={cn(
                "w-12 h-6 rounded-full transition-colors relative",
                enableInsurance ? "bg-emerald-500" : "bg-muted"
              )}
            >
              <div
                className={cn(
                  "absolute top-1 h-4 w-4 rounded-full bg-white transition-all",
                  enableInsurance ? "left-7" : "left-1"
                )}
              />
            </button>
          </div>

          {/* Action */}
          <button className="w-full flex items-center justify-center gap-2 rounded-lg bg-indigo-500 py-4 text-sm font-medium text-white hover:bg-indigo-600">
            <Check className="h-4 w-4" />
            {needsBridge ? "Bridge & Mint" : "Mint Position"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ExplorePage() {
  const [copyPosition, setCopyPosition] = useState<ExplorePosition | null>(null);
  const [chainFilter, setChainFilter] = useState("all");
  const [sortBy, setSortBy] = useState<SortKey>("roi");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter and sort
  const displayedPositions = useMemo(() => {
    let filtered = [...explorePositions];

    if (chainFilter !== "all") {
      filtered = filtered.filter(
        (p) => p.chain.toLowerCase() === chainFilter
      );
    }
    if (searchQuery) {
      filtered = filtered.filter((p) =>
        p.pool.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "roi":
          return b.performance.roiPercent - a.performance.roiPercent;
        case "apy":
          return b.performance.apy - a.performance.apy;
        case "value":
          return b.currentBalance.totalValueUsd - a.currentBalance.totalValueUsd;
        default:
          return 0;
      }
    });

    return filtered;
  }, [chainFilter, searchQuery, sortBy]);

  // Stats
  const avgRoi =
    explorePositions.reduce((sum, p) => sum + p.performance.roiPercent, 0) /
    explorePositions.length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/30 px-4 py-4">
        <h1 className="text-xl font-bold">Explore</h1>
        <p className="text-sm text-muted-foreground">
          Copy profitable LP strategies
        </p>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Quick Stats */}
        <div className="flex items-center gap-4 p-3 rounded-lg bg-card/50 border border-border/50">
          <div className="flex-1">
            <p className="text-xs text-muted-foreground">Avg ROI</p>
            <p className="text-lg font-bold text-emerald-400">
              +{avgRoi.toFixed(1)}%
            </p>
          </div>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground">Strategies</p>
            <p className="text-lg font-bold">{explorePositions.length}</p>
          </div>
          <div className="flex items-center gap-1 text-indigo-400">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">Live</span>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search pools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-border bg-background py-2.5 pl-10 pr-4 text-sm"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={chainFilter}
              onChange={(e) => setChainFilter(e.target.value)}
              className="flex-1 sm:flex-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm"
            >
              {chains.map((chain) => (
                <option key={chain.id} value={chain.id}>
                  {chain.name}
                </option>
              ))}
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortKey)}
              className="flex-1 sm:flex-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm"
            >
              <option value="roi">Sort: ROI</option>
              <option value="apy">Sort: APY</option>
              <option value="value">Sort: Value</option>
            </select>
          </div>
        </div>

        {/* Position Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {displayedPositions.map((position) => (
            <PositionCard
              key={position.id}
              position={position}
              onCopy={setCopyPosition}
            />
          ))}
        </div>

        {displayedPositions.length === 0 && (
          <div className="py-12 text-center">
            <Search className="h-12 w-12 mx-auto text-muted-foreground" />
            <p className="mt-4 text-muted-foreground">No positions found</p>
          </div>
        )}
      </div>

      {/* Copy Modal */}
      {copyPosition && (
        <CopyModal
          position={copyPosition}
          onClose={() => setCopyPosition(null)}
        />
      )}
    </div>
  );
}
