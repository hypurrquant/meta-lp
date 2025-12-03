"use client";

import { useState, useMemo } from "react";
import {
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Copy,
  Search,
  Shield,
  TrendingUp,
  X,
  Clock,
  DollarSign,
  Percent,
  Activity,
  ChevronRight,
  Sparkles,
  Info,
  Check,
} from "lucide-react";
import {
  explorePositions,
  chains,
  dexes,
  type ExplorePosition,
} from "@/data/mock-explore-positions";
import { cn } from "@/lib/utils";

type SortKey = "pool" | "roi" | "apy" | "value" | "duration" | "fees";
type SortDirection = "asc" | "desc";

// Chain colors/icons
const chainColors: Record<string, string> = {
  Ethereum: "bg-blue-500/20 text-blue-400",
  Arbitrum: "bg-sky-500/20 text-sky-400",
  Base: "bg-blue-600/20 text-blue-300",
  Optimism: "bg-red-500/20 text-red-400",
  Polygon: "bg-purple-500/20 text-purple-400",
  HyperEVM: "bg-emerald-500/20 text-emerald-400",
};

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

// Position Table Row
function PositionTableRow({
  position,
  isExpanded,
  onToggle,
  onCopy,
}: {
  position: ExplorePosition;
  isExpanded: boolean;
  onToggle: () => void;
  onCopy: (position: ExplorePosition) => void;
}) {
  return (
    <>
      {/* Main Row */}
      <tr
        className={cn(
          "border-b border-border/30 cursor-pointer transition-colors",
          isExpanded ? "bg-muted/50" : "hover:bg-muted/30"
        )}
        onClick={onToggle}
      >
        {/* Pool */}
        <td className="px-4 py-4">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-lg text-xs font-bold",
                chainColors[position.chain] || "bg-gray-600 text-white"
              )}
            >
              {position.chain.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium">{position.pool}</span>
                <span className="rounded bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
                  {position.feeTier}%
                </span>
                {position.isInsured && (
                  <Shield className="h-3.5 w-3.5 text-emerald-400" />
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {position.dex} • {position.chain}
              </p>
            </div>
          </div>
        </td>

        {/* Value */}
        <td className="px-4 py-4 text-right">
          <p className="font-medium">
            ${position.currentBalance.totalValueUsd.toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground">
            from ${position.initialPortfolio.totalValueUsd.toLocaleString()}
          </p>
        </td>

        {/* ROI */}
        <td className="px-4 py-4 text-right">
          <p
            className={cn(
              "font-semibold",
              position.performance.roiPercent >= 0
                ? "text-emerald-400"
                : "text-red-400"
            )}
          >
            {position.performance.roiPercent >= 0 ? "+" : ""}
            {position.performance.roiPercent}%
          </p>
          <p className="text-xs text-muted-foreground">
            ${position.performance.roiUsd.toLocaleString()}
          </p>
        </td>

        {/* APY */}
        <td className="px-4 py-4 text-right">
          <p className="font-semibold text-emerald-400">
            {position.performance.apy}%
          </p>
        </td>

        {/* Fees Earned */}
        <td className="px-4 py-4 text-right">
          <p className="font-medium text-emerald-400">
            +${position.performance.feesEarned.toLocaleString()}
          </p>
          <p className="text-xs text-red-400">
            -${position.performance.ilLoss.toLocaleString()} IL
          </p>
        </td>

        {/* Duration */}
        <td className="px-4 py-4 text-center">
          <span className="font-medium">{position.durationDays}d</span>
        </td>

        {/* Price Range Status */}
        <td className="px-4 py-4 text-center">
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium",
              position.priceRange.inRange
                ? "bg-emerald-500/20 text-emerald-400"
                : "bg-amber-500/20 text-amber-400"
            )}
          >
            {position.priceRange.inRange ? "In Range" : "Out"}
          </span>
        </td>

        {/* Expand Icon */}
        <td className="px-4 py-4">
          <ChevronRight
            className={cn(
              "h-5 w-5 text-muted-foreground transition-transform",
              isExpanded && "rotate-90"
            )}
          />
        </td>
      </tr>

      {/* Expanded Detail Row */}
      {isExpanded && (
        <tr className="border-b border-border/30 bg-muted/30">
          <td colSpan={8} className="px-4 py-0">
            <div className="py-6">
              <div className="grid gap-6 lg:grid-cols-3">
                {/* Portfolio Details */}
                <div className="rounded-xl border border-border/50 bg-card/50 p-4">
                  <h4 className="mb-4 flex items-center gap-2 text-sm font-semibold">
                    <DollarSign className="h-4 w-4 text-indigo-400" />
                    Portfolio
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">
                        Initial ({position.initialPortfolio.date})
                      </p>
                      <div className="flex items-center justify-between text-sm">
                        <span>
                          {position.initialPortfolio.token0.amount}{" "}
                          {position.token0}
                        </span>
                        <span className="text-muted-foreground">
                          $
                          {position.initialPortfolio.token0.valueUsd.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>
                          {position.initialPortfolio.token1.amount.toLocaleString()}{" "}
                          {position.token1}
                        </span>
                        <span className="text-muted-foreground">
                          $
                          {position.initialPortfolio.token1.valueUsd.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="border-t border-border/50 pt-3">
                      <p className="text-xs text-muted-foreground mb-1">
                        Current
                      </p>
                      <div className="flex items-center justify-between text-sm">
                        <span>
                          {position.currentBalance.token0.amount.toFixed(2)}{" "}
                          {position.token0}
                        </span>
                        <span className="text-muted-foreground">
                          $
                          {position.currentBalance.token0.valueUsd.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>
                          {position.currentBalance.token1.amount.toLocaleString()}{" "}
                          {position.token1}
                        </span>
                        <span className="text-muted-foreground">
                          $
                          {position.currentBalance.token1.valueUsd.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Performance Breakdown */}
                <div className="rounded-xl border border-border/50 bg-card/50 p-4">
                  <h4 className="mb-4 flex items-center gap-2 text-sm font-semibold">
                    <Activity className="h-4 w-4 text-emerald-400" />
                    Performance Breakdown
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Fees Earned
                      </span>
                      <span className="font-medium text-emerald-400">
                        +${position.performance.feesEarned.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        IL Loss
                      </span>
                      <span className="font-medium text-red-400">
                        -${position.performance.ilLoss.toLocaleString()}
                      </span>
                    </div>
                    {position.performance.insuranceClaim > 0 && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          Insurance Claim
                        </span>
                        <span className="font-medium text-emerald-400">
                          +${position.performance.insuranceClaim.toLocaleString()}
                        </span>
                      </div>
                    )}
                    <div className="border-t border-border/50 pt-3 flex items-center justify-between">
                      <span className="font-medium">Net Profit</span>
                      <span className="font-semibold text-emerald-400">
                        +${position.performance.roiUsd.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Est. APY</span>
                      <span className="font-semibold text-emerald-400">
                        {position.performance.apy}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Price Range */}
                <div className="rounded-xl border border-border/50 bg-card/50 p-4">
                  <h4 className="mb-4 flex items-center gap-2 text-sm font-semibold">
                    <Percent className="h-4 w-4 text-purple-400" />
                    Price Range
                  </h4>
                  <div className="space-y-4">
                    {/* Visual Range */}
                    <div className="relative h-3 rounded-full bg-muted">
                      <div
                        className="absolute h-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                        style={{ left: "15%", right: "15%" }}
                      />
                      <div
                        className="absolute top-1/2 h-4 w-1 -translate-y-1/2 rounded bg-emerald-400"
                        style={{
                          left: `${
                            ((position.priceRange.current -
                              position.priceRange.min) /
                              (position.priceRange.max -
                                position.priceRange.min)) *
                              70 +
                            15
                          }%`,
                        }}
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div>
                        <p className="text-xs text-muted-foreground">Min</p>
                        <p className="font-medium">
                          ${position.priceRange.min.toLocaleString()}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-emerald-400">Current</p>
                        <p className="font-medium text-emerald-400">
                          ${position.priceRange.current.toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Max</p>
                        <p className="font-medium">
                          ${position.priceRange.max.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {position.isInsured && (
                      <div className="flex items-center gap-2 rounded-lg bg-emerald-500/10 p-2 text-sm text-emerald-400">
                        <Shield className="h-4 w-4" />
                        <span>IL Insurance Active</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>
                    Position opened on {position.initialPortfolio.date}
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onCopy(position);
                  }}
                  className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-2.5 text-sm font-medium text-white transition-all hover:from-indigo-600 hover:to-purple-700"
                >
                  <Copy className="h-4 w-4" />
                  Copy This Position
                </button>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

// Copy Position Modal
function CopyModal({
  position,
  onClose,
}: {
  position: ExplorePosition;
  onClose: () => void;
}) {
  const [selectedChain, setSelectedChain] = useState(position.chain);
  const [useSameRange, setUseSameRange] = useState(true);
  const [enableInsurance, setEnableInsurance] = useState(position.isInsured);
  const [amount0, setAmount0] = useState(
    position.initialPortfolio.token0.amount.toString()
  );
  const [amount1, setAmount1] = useState(
    position.initialPortfolio.token1.amount.toString()
  );

  const needsBridge = selectedChain !== position.chain;
  const token0Price =
    position.initialPortfolio.token0.valueUsd /
    position.initialPortfolio.token0.amount;
  const token1Price =
    position.initialPortfolio.token1.valueUsd /
    position.initialPortfolio.token1.amount;
  const totalDeposit =
    parseFloat(amount0) * token0Price + parseFloat(amount1) * token1Price;
  const insuranceFee = enableInsurance ? totalDeposit * 0.005 : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-border bg-card">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border p-6">
          <div>
            <h2 className="text-xl font-bold">Copy Position</h2>
            <p className="text-sm text-muted-foreground">
              Mint a new position with the same strategy
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Original Position Summary */}
          <div className="rounded-xl border border-indigo-500/30 bg-indigo-500/10 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-lg text-xs font-bold",
                    chainColors[position.chain]
                  )}
                >
                  {position.chain.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold">{position.pool}</p>
                  <p className="text-sm text-muted-foreground">
                    {position.dex} • {position.chain}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-emerald-400">
                  +{position.performance.roiPercent}% ROI
                </p>
                <p className="text-sm text-muted-foreground">
                  {position.performance.apy}% APY
                </p>
              </div>
            </div>
          </div>

          {/* Chain Selection */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Deploy Chain
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
              <div className="mt-3 flex items-center gap-2 rounded-lg bg-amber-500/10 p-3 text-sm text-amber-400">
                <ArrowRight className="h-4 w-4" />
                Bridge required from {position.chain} to {selectedChain}
              </div>
            )}
          </div>

          {/* Deposit Amount */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Deposit Amount
            </label>
            <div className="space-y-3">
              <div className="flex items-center gap-2 rounded-lg border border-border bg-background p-3">
                <span className="font-medium w-16">{position.token0}</span>
                <input
                  type="number"
                  value={amount0}
                  onChange={(e) => setAmount0(e.target.value)}
                  className="flex-1 bg-transparent text-right outline-none"
                />
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-border bg-background p-3">
                <span className="font-medium w-16">{position.token1}</span>
                <input
                  type="number"
                  value={amount1}
                  onChange={(e) => setAmount1(e.target.value)}
                  className="flex-1 bg-transparent text-right outline-none"
                />
              </div>
            </div>
          </div>

          {/* Price Range */}
          <div>
            <label className="mb-3 block text-sm font-medium">
              Price Range
            </label>
            <div className="space-y-2">
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  checked={useSameRange}
                  onChange={() => setUseSameRange(true)}
                  className="h-4 w-4 accent-indigo-500"
                />
                <span className="text-sm">
                  Use same range: ${position.priceRange.min.toLocaleString()} - $
                  {position.priceRange.max.toLocaleString()}
                </span>
              </label>
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  checked={!useSameRange}
                  onChange={() => setUseSameRange(false)}
                  className="h-4 w-4 accent-indigo-500"
                />
                <span className="text-sm">Custom range</span>
              </label>
            </div>
          </div>

          {/* IL Insurance */}
          <div className="rounded-xl border border-border/50 bg-muted/30 p-4">
            <label className="flex cursor-pointer items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-emerald-400" />
                <div>
                  <p className="font-medium">Enable IL Insurance</p>
                  <p className="text-xs text-muted-foreground">
                    Coverage: Up to 80% IL protected
                  </p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={enableInsurance}
                onChange={(e) => setEnableInsurance(e.target.checked)}
                className="h-5 w-5 accent-emerald-500"
              />
            </label>
          </div>

          {/* Summary */}
          <div className="rounded-xl border border-border/50 bg-muted/30 p-4">
            <h4 className="mb-3 font-medium">Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Deposit</span>
                <span className="font-medium">
                  ${totalDeposit.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Gas Fee (est.)</span>
                <span>~$2.50</span>
              </div>
              {enableInsurance && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    IL Insurance (0.5%)
                  </span>
                  <span>${insuranceFee.toFixed(2)}</span>
                </div>
              )}
              {needsBridge && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Bridge Fee (est.)
                  </span>
                  <span>~$1.00</span>
                </div>
              )}
              <div className="border-t border-border pt-2">
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>
                    $
                    {(
                      totalDeposit +
                      2.5 +
                      insuranceFee +
                      (needsBridge ? 1 : 0)
                    ).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 rounded-lg border border-border bg-background py-3 text-sm font-medium transition-colors hover:bg-muted"
            >
              Cancel
            </button>
            <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 py-3 text-sm font-medium text-white transition-all hover:from-indigo-600 hover:to-purple-700">
              <Check className="h-4 w-4" />
              {needsBridge ? "Bridge & Mint" : "Mint Position"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Stats Cards
function StatsCards() {
  const totalValue = explorePositions.reduce(
    (sum, p) => sum + p.currentBalance.totalValueUsd,
    0
  );
  const avgRoi =
    explorePositions.reduce((sum, p) => sum + p.performance.roiPercent, 0) /
    explorePositions.length;
  const avgApy =
    explorePositions.reduce((sum, p) => sum + p.performance.apy, 0) /
    explorePositions.length;
  const insuredCount = explorePositions.filter((p) => p.isInsured).length;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div className="rounded-xl border border-border/50 bg-card/50 p-4">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-indigo-500/10 p-2">
            <DollarSign className="h-5 w-5 text-indigo-400" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Total Value Tracked</p>
            <p className="text-lg font-semibold">
              ${(totalValue / 1000).toFixed(0)}K
            </p>
          </div>
        </div>
      </div>
      <div className="rounded-xl border border-border/50 bg-card/50 p-4">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-emerald-500/10 p-2">
            <TrendingUp className="h-5 w-5 text-emerald-400" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Average ROI</p>
            <p className="text-lg font-semibold text-emerald-400">
              +{avgRoi.toFixed(1)}%
            </p>
          </div>
        </div>
      </div>
      <div className="rounded-xl border border-border/50 bg-card/50 p-4">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-purple-500/10 p-2">
            <Percent className="h-5 w-5 text-purple-400" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Average APY</p>
            <p className="text-lg font-semibold text-purple-400">
              {avgApy.toFixed(1)}%
            </p>
          </div>
        </div>
      </div>
      <div className="rounded-xl border border-border/50 bg-card/50 p-4">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-emerald-500/10 p-2">
            <Shield className="h-5 w-5 text-emerald-400" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">IL Insured</p>
            <p className="text-lg font-semibold">
              {insuredCount}/{explorePositions.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ExplorePage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copyPosition, setCopyPosition] = useState<ExplorePosition | null>(
    null
  );
  const [chainFilter, setChainFilter] = useState("all");
  const [dexFilter, setDexFilter] = useState("all");
  const [sortKey, setSortKey] = useState<SortKey>("roi");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [searchQuery, setSearchQuery] = useState("");

  // Handle sort
  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("desc");
    }
  };

  // Filter and sort positions
  const displayedPositions = useMemo(() => {
    let filtered = [...explorePositions];

    // Apply filters
    if (chainFilter !== "all") {
      filtered = filtered.filter(
        (p) => p.chain.toLowerCase() === chainFilter
      );
    }
    if (dexFilter !== "all") {
      filtered = filtered.filter((p) =>
        p.dex.toLowerCase().includes(dexFilter)
      );
    }
    if (searchQuery) {
      filtered = filtered.filter((p) =>
        p.pool.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort
    filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortKey) {
        case "pool":
          comparison = a.pool.localeCompare(b.pool);
          break;
        case "roi":
          comparison = a.performance.roiPercent - b.performance.roiPercent;
          break;
        case "apy":
          comparison = a.performance.apy - b.performance.apy;
          break;
        case "value":
          comparison =
            a.currentBalance.totalValueUsd - b.currentBalance.totalValueUsd;
          break;
        case "duration":
          comparison = a.durationDays - b.durationDays;
          break;
        case "fees":
          comparison = a.performance.feesEarned - b.performance.feesEarned;
          break;
      }
      return sortDirection === "asc" ? comparison : -comparison;
    });

    return filtered;
  }, [chainFilter, dexFilter, searchQuery, sortKey, sortDirection]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/30 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Explore Positions</h1>
            <p className="text-sm text-muted-foreground">
              Discover profitable LP strategies and copy them with one click
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4 text-indigo-400" />
            <span>{explorePositions.length} strategies available</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <StatsCards />

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search pools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-border bg-background py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <select
            value={chainFilter}
            onChange={(e) => setChainFilter(e.target.value)}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
          >
            {chains.map((chain) => (
              <option key={chain.id} value={chain.id}>
                {chain.name}
              </option>
            ))}
          </select>
          <select
            value={dexFilter}
            onChange={(e) => setDexFilter(e.target.value)}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
          >
            {dexes.map((dex) => (
              <option key={dex.id} value={dex.id}>
                {dex.name}
              </option>
            ))}
          </select>
        </div>

        {/* Positions Table */}
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
                    label="Value"
                    sortKey="value"
                    currentSort={sortKey}
                    currentDirection={sortDirection}
                    onSort={handleSort}
                    align="right"
                  />
                  <SortableHeader
                    label="ROI"
                    sortKey="roi"
                    currentSort={sortKey}
                    currentDirection={sortDirection}
                    onSort={handleSort}
                    align="right"
                  />
                  <SortableHeader
                    label="APY"
                    sortKey="apy"
                    currentSort={sortKey}
                    currentDirection={sortDirection}
                    onSort={handleSort}
                    align="right"
                  />
                  <SortableHeader
                    label="Fees/IL"
                    sortKey="fees"
                    currentSort={sortKey}
                    currentDirection={sortDirection}
                    onSort={handleSort}
                    align="right"
                  />
                  <SortableHeader
                    label="Days"
                    sortKey="duration"
                    currentSort={sortKey}
                    currentDirection={sortDirection}
                    onSort={handleSort}
                    align="center"
                  />
                  <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground text-center">
                    Range
                  </th>
                  <th className="px-4 py-3 w-12"></th>
                </tr>
              </thead>
              <tbody>
                {displayedPositions.map((position) => (
                  <PositionTableRow
                    key={position.id}
                    position={position}
                    isExpanded={expandedId === position.id}
                    onToggle={() =>
                      setExpandedId(
                        expandedId === position.id ? null : position.id
                      )
                    }
                    onCopy={setCopyPosition}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {displayedPositions.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16">
              <Search className="h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No positions found</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Try adjusting your filters
              </p>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex items-start gap-2 rounded-lg border border-indigo-500/30 bg-indigo-500/10 p-4">
          <Info className="h-5 w-5 flex-shrink-0 text-indigo-400 mt-0.5" />
          <div className="text-sm text-indigo-400">
            <p className="font-medium">How it works</p>
            <p className="mt-1 text-indigo-400/80">
              Click on any row to see detailed performance breakdown. Find a
              strategy you like and copy it with one click - we&apos;ll handle the
              bridging and minting for you.
            </p>
          </div>
        </div>
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
