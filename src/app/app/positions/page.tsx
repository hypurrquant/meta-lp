"use client";

import { useState, useMemo } from "react";
import {
  Plus,
  RefreshCw,
  Coins,
  Shield,
  X,
  Zap,
  Target,
  TrendingDown,
  Settings2,
  ChevronDown,
} from "lucide-react";
import {
  mockPositions,
  portfolioSummary,
  chains,
  dexes,
  type Position,
  type AutomationSettings,
} from "@/data/mock-positions";
import { cn } from "@/lib/utils";

// Token color mapping
const tokenColors: Record<string, string> = {
  ETH: "bg-blue-500",
  USDC: "bg-green-500",
  WBTC: "bg-orange-500",
  BTC: "bg-orange-500",
  HYPE: "bg-purple-500",
  OP: "bg-red-500",
  ARB: "bg-cyan-500",
};

// Simplified Position Card
function SimplePositionCard({
  position,
  onManage,
  onAutomate,
}: {
  position: Position;
  onManage: (position: Position) => void;
  onAutomate: (position: Position) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const isPositiveRoi = position.realRoi >= 0;
  const hasAutomation = position.automation.autoRebalance || position.automation.autoCompound;

  return (
    <div className="rounded-xl border border-border/50 bg-card/50 overflow-hidden">
      {/* Main Card */}
      <div
        className="p-4 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              <div
                className={cn(
                  "h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold text-white ring-2 ring-background",
                  tokenColors[position.token0] || "bg-gray-500"
                )}
              >
                {position.token0.slice(0, 3)}
              </div>
              <div
                className={cn(
                  "h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold text-white ring-2 ring-background",
                  tokenColors[position.token1] || "bg-gray-500"
                )}
              >
                {position.token1.slice(0, 3)}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">{position.pool}</span>
                {position.isInsured && (
                  <Shield className="h-4 w-4 text-emerald-400" />
                )}
                {hasAutomation && (
                  <Zap className="h-4 w-4 text-indigo-400" />
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

        {/* Key Metrics */}
        <div className="mt-4 grid grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Value</p>
            <p className="text-lg font-bold">
              ${(position.currentPosition.totalValueUsd / 1000).toFixed(1)}K
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">ROI</p>
            <p className={cn(
              "text-lg font-bold",
              isPositiveRoi ? "text-emerald-400" : "text-red-400"
            )}>
              {isPositiveRoi ? "+" : ""}{position.realRoiPercent}%
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">APY</p>
            <p className="text-lg font-bold text-emerald-400">
              {position.estimatedApy}%
            </p>
          </div>
        </div>

        {/* Price Range Bar */}
        <div className="mt-3">
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>${position.priceRange.min.toLocaleString()}</span>
            <span className={position.priceRange.inRange ? "text-emerald-400" : "text-amber-400"}>
              {position.priceRange.inRange ? "In Range" : "Out of Range"}
            </span>
            <span>${position.priceRange.max.toLocaleString()}</span>
          </div>
          <div className="h-2 rounded-full bg-muted relative">
            <div
              className={cn(
                "h-full rounded-full",
                position.priceRange.inRange ? "bg-emerald-500" : "bg-amber-500"
              )}
              style={{
                width: `${Math.min(100, Math.max(0, ((position.priceRange.current - position.priceRange.min) / (position.priceRange.max - position.priceRange.min)) * 100))}%`
              }}
            />
          </div>
        </div>
      </div>

      {/* Expanded Details */}
      {expanded && (
        <div className="border-t border-border/50 p-4 bg-muted/20 space-y-4">
          {/* Performance Details */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Fees Earned</span>
              <span className="text-emerald-400">+${position.feesEarned.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">IL Loss</span>
              <span className="text-red-400">-${position.ilLoss.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Unclaimed</span>
              <span className="text-amber-400">${position.unclaimedFees.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Age</span>
              <span>{position.daysActive} days</span>
            </div>
          </div>

          {/* Automation Badges */}
          {(position.automation.autoRebalance || position.automation.autoCompound || position.automation.stopLoss || position.automation.takeProfit) && (
            <div className="flex flex-wrap gap-2">
              {position.automation.autoRebalance && (
                <span className="flex items-center gap-1 rounded-full bg-blue-500/20 px-2 py-1 text-xs text-blue-400">
                  <RefreshCw className="h-3 w-3" />
                  Rebalance
                </span>
              )}
              {position.automation.autoCompound && (
                <span className="flex items-center gap-1 rounded-full bg-purple-500/20 px-2 py-1 text-xs text-purple-400">
                  <Coins className="h-3 w-3" />
                  Compound
                </span>
              )}
              {position.automation.stopLoss && (
                <span className="flex items-center gap-1 rounded-full bg-red-500/20 px-2 py-1 text-xs text-red-400">
                  <TrendingDown className="h-3 w-3" />
                  Stop {position.automation.stopLossPercent}%
                </span>
              )}
              {position.automation.takeProfit && (
                <span className="flex items-center gap-1 rounded-full bg-emerald-500/20 px-2 py-1 text-xs text-emerald-400">
                  <Target className="h-3 w-3" />
                  TP {position.automation.takeProfitPercent}%
                </span>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAutomate(position);
              }}
              className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-border py-2.5 text-sm font-medium hover:bg-muted"
            >
              <Settings2 className="h-4 w-4" />
              Automate
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onManage(position);
              }}
              className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-indigo-500 py-2.5 text-sm font-medium text-white hover:bg-indigo-600"
            >
              Manage
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Automation Modal
function AutomationModal({
  position,
  onClose,
}: {
  position: Position;
  onClose: () => void;
}) {
  const [settings, setSettings] = useState<AutomationSettings>(position.automation);

  const updateSetting = <K extends keyof AutomationSettings>(
    key: K,
    value: AutomationSettings[K]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 p-0 sm:p-4">
      <div className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl border border-border bg-card">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between border-b border-border bg-card p-4">
          <div>
            <h2 className="text-lg font-bold">Automation</h2>
            <p className="text-sm text-muted-foreground">{position.pool}</p>
          </div>
          <button onClick={onClose} className="rounded-lg p-2 hover:bg-muted">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 space-y-3">
          {/* Auto Rebalance */}
          <div className="flex items-center justify-between p-3 rounded-lg border border-border">
            <div className="flex items-center gap-3">
              <RefreshCw className="h-5 w-5 text-blue-400" />
              <div>
                <p className="text-sm font-medium">Auto Rebalance</p>
                <p className="text-xs text-muted-foreground">When out of range</p>
              </div>
            </div>
            <button
              onClick={() => updateSetting("autoRebalance", !settings.autoRebalance)}
              className={cn(
                "w-12 h-6 rounded-full transition-colors relative",
                settings.autoRebalance ? "bg-blue-500" : "bg-muted"
              )}
            >
              <div
                className={cn(
                  "absolute top-1 h-4 w-4 rounded-full bg-white transition-all",
                  settings.autoRebalance ? "left-7" : "left-1"
                )}
              />
            </button>
          </div>

          {/* Auto Compound */}
          <div className="flex items-center justify-between p-3 rounded-lg border border-border">
            <div className="flex items-center gap-3">
              <Coins className="h-5 w-5 text-purple-400" />
              <div>
                <p className="text-sm font-medium">Auto Compound</p>
                <p className="text-xs text-muted-foreground">Reinvest fees</p>
              </div>
            </div>
            <button
              onClick={() => updateSetting("autoCompound", !settings.autoCompound)}
              className={cn(
                "w-12 h-6 rounded-full transition-colors relative",
                settings.autoCompound ? "bg-purple-500" : "bg-muted"
              )}
            >
              <div
                className={cn(
                  "absolute top-1 h-4 w-4 rounded-full bg-white transition-all",
                  settings.autoCompound ? "left-7" : "left-1"
                )}
              />
            </button>
          </div>

          {/* Stop Loss */}
          <div className="p-3 rounded-lg border border-border space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <TrendingDown className="h-5 w-5 text-red-400" />
                <div>
                  <p className="text-sm font-medium">Stop Loss</p>
                  <p className="text-xs text-muted-foreground">Auto withdraw</p>
                </div>
              </div>
              <button
                onClick={() => updateSetting("stopLoss", !settings.stopLoss)}
                className={cn(
                  "w-12 h-6 rounded-full transition-colors relative",
                  settings.stopLoss ? "bg-red-500" : "bg-muted"
                )}
              >
                <div
                  className={cn(
                    "absolute top-1 h-4 w-4 rounded-full bg-white transition-all",
                    settings.stopLoss ? "left-7" : "left-1"
                  )}
                />
              </button>
            </div>
            {settings.stopLoss && (
              <input
                type="number"
                value={settings.stopLossPercent || 15}
                onChange={(e) => updateSetting("stopLossPercent", Number(e.target.value))}
                placeholder="Loss %"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
              />
            )}
          </div>

          {/* Take Profit */}
          <div className="p-3 rounded-lg border border-border space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Target className="h-5 w-5 text-emerald-400" />
                <div>
                  <p className="text-sm font-medium">Take Profit</p>
                  <p className="text-xs text-muted-foreground">Auto exit</p>
                </div>
              </div>
              <button
                onClick={() => updateSetting("takeProfit", !settings.takeProfit)}
                className={cn(
                  "w-12 h-6 rounded-full transition-colors relative",
                  settings.takeProfit ? "bg-emerald-500" : "bg-muted"
                )}
              >
                <div
                  className={cn(
                    "absolute top-1 h-4 w-4 rounded-full bg-white transition-all",
                    settings.takeProfit ? "left-7" : "left-1"
                  )}
                />
              </button>
            </div>
            {settings.takeProfit && (
              <input
                type="number"
                value={settings.takeProfitPercent || 25}
                onChange={(e) => updateSetting("takeProfitPercent", Number(e.target.value))}
                placeholder="Profit %"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
              />
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 rounded-lg border border-border py-3 text-sm font-medium hover:bg-muted"
            >
              Cancel
            </button>
            <button
              onClick={onClose}
              className="flex-1 rounded-lg bg-indigo-500 py-3 text-sm font-medium text-white hover:bg-indigo-600"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Manage Modal
function ManageModal({
  position,
  onClose,
}: {
  position: Position;
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState<"add" | "remove" | "claim">("claim");

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 p-0 sm:p-4">
      <div className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl border border-border bg-card">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between border-b border-border bg-card p-4">
          <div>
            <h2 className="text-lg font-bold">Manage Position</h2>
            <p className="text-sm text-muted-foreground">{position.pool}</p>
          </div>
          <button onClick={onClose} className="rounded-lg p-2 hover:bg-muted">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {/* Position Summary */}
          <div className="grid grid-cols-2 gap-4 p-3 rounded-lg bg-muted/50">
            <div>
              <p className="text-xs text-muted-foreground">Value</p>
              <p className="text-lg font-bold">
                ${position.currentPosition.totalValueUsd.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Unclaimed</p>
              <p className="text-lg font-bold text-amber-400">
                ${position.unclaimedFees.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 rounded-lg border border-border p-1">
            {[
              { key: "claim", label: "Claim" },
              { key: "add", label: "Add" },
              { key: "remove", label: "Remove" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as typeof activeTab)}
                className={cn(
                  "flex-1 rounded-md py-2 text-sm font-medium transition-colors",
                  activeTab === tab.key
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === "claim" && (
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30 text-center">
                <p className="text-sm text-amber-400">Available to Claim</p>
                <p className="text-2xl font-bold text-amber-400 mt-1">
                  ${position.unclaimedFees.toLocaleString()}
                </p>
              </div>
            </div>
          )}

          {activeTab === "add" && (
            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground">
                  Add {position.token0}
                </label>
                <input
                  type="number"
                  placeholder="0.0"
                  className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">
                  Add {position.token1}
                </label>
                <input
                  type="number"
                  placeholder="0.0"
                  className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm"
                />
              </div>
            </div>
          )}

          {activeTab === "remove" && (
            <div className="space-y-4">
              <div className="grid grid-cols-4 gap-2">
                {[25, 50, 75, 100].map((pct) => (
                  <button
                    key={pct}
                    className="rounded-lg border border-border py-2 text-sm hover:bg-muted"
                  >
                    {pct}%
                  </button>
                ))}
              </div>
              <div className="p-3 rounded-lg bg-muted/50 text-sm">
                <p className="text-muted-foreground">You will receive:</p>
                <p className="mt-1">{position.currentPosition.token0.amount} {position.token0}</p>
                <p>{position.currentPosition.token1.amount.toLocaleString()} {position.token1}</p>
              </div>
            </div>
          )}

          {/* Action Button */}
          <button
            onClick={onClose}
            className="w-full rounded-lg bg-indigo-500 py-3 text-sm font-medium text-white hover:bg-indigo-600"
          >
            {activeTab === "claim" ? "Claim Fees" : activeTab === "add" ? "Add Liquidity" : "Remove Liquidity"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PositionsPage() {
  const [selectedChain, setSelectedChain] = useState("all");
  const [selectedDex, setSelectedDex] = useState("all");
  const [sortBy, setSortBy] = useState("roi");
  const [automationModal, setAutomationModal] = useState<Position | null>(null);
  const [manageModal, setManageModal] = useState<Position | null>(null);

  // Filter and sort positions
  const displayedPositions = useMemo(() => {
    const filtered = mockPositions.filter((p) => {
      if (selectedChain !== "all" && p.chain.toLowerCase() !== selectedChain) {
        return false;
      }
      if (selectedDex !== "all" && !p.dex.toLowerCase().includes(selectedDex)) {
        return false;
      }
      return true;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "roi":
          return b.realRoiPercent - a.realRoiPercent;
        case "value":
          return b.currentPosition.totalValueUsd - a.currentPosition.totalValueUsd;
        case "apy":
          return b.estimatedApy - a.estimatedApy;
        default:
          return 0;
      }
    });

    return filtered;
  }, [selectedChain, selectedDex, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/30 px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Positions</h1>
            <p className="text-sm text-muted-foreground">
              Manage your LP positions
            </p>
          </div>
          <button className="flex items-center gap-2 rounded-lg bg-indigo-500 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-600">
            <Plus className="h-4 w-4" />
            New
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Portfolio Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="rounded-xl border border-border/50 bg-card/50 p-3">
            <p className="text-xs text-muted-foreground">Total Value</p>
            <p className="text-lg font-bold">
              ${(portfolioSummary.totalValueUsd / 1000).toFixed(1)}K
            </p>
          </div>
          <div className="rounded-xl border border-border/50 bg-card/50 p-3">
            <p className="text-xs text-muted-foreground">Total ROI</p>
            <p className={cn(
              "text-lg font-bold",
              portfolioSummary.totalRealRoi >= 0 ? "text-emerald-400" : "text-red-400"
            )}>
              {portfolioSummary.totalRealRoi >= 0 ? "+" : ""}
              ${portfolioSummary.totalRealRoi.toLocaleString()}
            </p>
          </div>
          <div className="rounded-xl border border-border/50 bg-card/50 p-3">
            <p className="text-xs text-muted-foreground">Unclaimed</p>
            <p className="text-lg font-bold text-amber-400">
              ${portfolioSummary.totalUnclaimedFees.toLocaleString()}
            </p>
          </div>
          <div className="rounded-xl border border-border/50 bg-card/50 p-3">
            <p className="text-xs text-muted-foreground">Positions</p>
            <p className="text-lg font-bold">{mockPositions.length}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          <button className="flex items-center gap-1.5 whitespace-nowrap rounded-lg bg-amber-500/20 px-3 py-2 text-sm font-medium text-amber-400">
            <Coins className="h-4 w-4" />
            Claim All
          </button>
          <button className="flex items-center gap-1.5 whitespace-nowrap rounded-lg bg-purple-500/20 px-3 py-2 text-sm font-medium text-purple-400">
            <RefreshCw className="h-4 w-4" />
            Compound
          </button>
          <button className="flex items-center gap-1.5 whitespace-nowrap rounded-lg bg-indigo-500/20 px-3 py-2 text-sm font-medium text-indigo-400">
            <Zap className="h-4 w-4" />
            Auto Setup
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-2">
          <select
            value={selectedChain}
            onChange={(e) => setSelectedChain(e.target.value)}
            className="flex-1 sm:flex-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm"
          >
            {chains.map((chain) => (
              <option key={chain.id} value={chain.id}>
                {chain.name}
              </option>
            ))}
          </select>
          <select
            value={selectedDex}
            onChange={(e) => setSelectedDex(e.target.value)}
            className="flex-1 sm:flex-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm"
          >
            {dexes.map((dex) => (
              <option key={dex.id} value={dex.id}>
                {dex.name}
              </option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="flex-1 sm:flex-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm"
          >
            <option value="roi">Sort: ROI</option>
            <option value="value">Sort: Value</option>
            <option value="apy">Sort: APY</option>
          </select>
        </div>

        {/* Position Cards */}
        <div className="grid gap-4 sm:grid-cols-2">
          {displayedPositions.map((position) => (
            <SimplePositionCard
              key={position.id}
              position={position}
              onManage={setManageModal}
              onAutomate={setAutomationModal}
            />
          ))}
        </div>

        {displayedPositions.length === 0 && (
          <div className="py-12 text-center">
            <Plus className="h-12 w-12 mx-auto text-muted-foreground" />
            <p className="mt-4 text-muted-foreground">No positions found</p>
            <button className="mt-4 rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-600">
              Create Position
            </button>
          </div>
        )}
      </div>

      {/* Modals */}
      {automationModal && (
        <AutomationModal
          position={automationModal}
          onClose={() => setAutomationModal(null)}
        />
      )}
      {manageModal && (
        <ManageModal position={manageModal} onClose={() => setManageModal(null)} />
      )}
    </div>
  );
}
