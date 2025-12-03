"use client";

import { useState } from "react";
import {
  Plus,
  RefreshCw,
  Coins,
  Shield,
  X,
  Zap,
  Target,
  TrendingDown,
  Download,
  PlusCircle,
  MinusCircle,
  Settings2,
  CheckSquare,
  Square,
} from "lucide-react";
import { PositionCard } from "@/components/app/position-card";
import { PortfolioSummary } from "@/components/app/portfolio-summary";
import {
  mockPositions,
  portfolioSummary,
  chains,
  dexes,
  type Position,
  type AutomationSettings,
} from "@/data/mock-positions";
import { cn } from "@/lib/utils";

// Automation Modal Component
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-border bg-card p-6">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-6">
          <h2 className="text-xl font-bold">Automation Settings</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {position.pool} on {position.dex}
          </p>
        </div>

        <div className="space-y-6">
          {/* Auto Rebalance */}
          <div className="rounded-xl border border-border bg-muted/30 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-blue-500/20 p-2">
                  <RefreshCw className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-medium">Auto Rebalance</h3>
                  <p className="text-sm text-muted-foreground">
                    Automatically rebalance when price exits range
                  </p>
                </div>
              </div>
              <button
                onClick={() => updateSetting("autoRebalance", !settings.autoRebalance)}
                className={cn(
                  "relative h-6 w-11 rounded-full transition-colors",
                  settings.autoRebalance ? "bg-blue-500" : "bg-muted"
                )}
              >
                <span
                  className={cn(
                    "absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-transform",
                    settings.autoRebalance && "translate-x-5"
                  )}
                />
              </button>
            </div>
            {settings.autoRebalance && (
              <div className="mt-4 space-y-2">
                <label className="text-sm text-muted-foreground">
                  Rebalance threshold (% out of range)
                </label>
                <input
                  type="number"
                  value={settings.rebalanceThreshold || 5}
                  onChange={(e) =>
                    updateSetting("rebalanceThreshold", Number(e.target.value))
                  }
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
                />
              </div>
            )}
          </div>

          {/* Auto Compound */}
          <div className="rounded-xl border border-border bg-muted/30 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-purple-500/20 p-2">
                  <Coins className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="font-medium">Auto Compound</h3>
                  <p className="text-sm text-muted-foreground">
                    Reinvest earned fees automatically
                  </p>
                </div>
              </div>
              <button
                onClick={() => updateSetting("autoCompound", !settings.autoCompound)}
                className={cn(
                  "relative h-6 w-11 rounded-full transition-colors",
                  settings.autoCompound ? "bg-purple-500" : "bg-muted"
                )}
              >
                <span
                  className={cn(
                    "absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-transform",
                    settings.autoCompound && "translate-x-5"
                  )}
                />
              </button>
            </div>
            {settings.autoCompound && (
              <div className="mt-4 space-y-3">
                <div>
                  <label className="text-sm text-muted-foreground">Frequency</label>
                  <select
                    value={settings.compoundFrequency || "threshold"}
                    onChange={(e) =>
                      updateSetting(
                        "compoundFrequency",
                        e.target.value as "daily" | "weekly" | "threshold"
                      )
                    }
                    className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="threshold">At threshold</option>
                  </select>
                </div>
                {settings.compoundFrequency === "threshold" && (
                  <div>
                    <label className="text-sm text-muted-foreground">
                      Minimum fees to compound ($)
                    </label>
                    <input
                      type="number"
                      value={settings.compoundThreshold || 100}
                      onChange={(e) =>
                        updateSetting("compoundThreshold", Number(e.target.value))
                      }
                      className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Stop Loss */}
          <div className="rounded-xl border border-border bg-muted/30 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-red-500/20 p-2">
                  <TrendingDown className="h-5 w-5 text-red-400" />
                </div>
                <div>
                  <h3 className="font-medium">Stop Loss</h3>
                  <p className="text-sm text-muted-foreground">
                    Auto-withdraw if loss exceeds threshold
                  </p>
                </div>
              </div>
              <button
                onClick={() => updateSetting("stopLoss", !settings.stopLoss)}
                className={cn(
                  "relative h-6 w-11 rounded-full transition-colors",
                  settings.stopLoss ? "bg-red-500" : "bg-muted"
                )}
              >
                <span
                  className={cn(
                    "absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-transform",
                    settings.stopLoss && "translate-x-5"
                  )}
                />
              </button>
            </div>
            {settings.stopLoss && (
              <div className="mt-4 space-y-2">
                <label className="text-sm text-muted-foreground">Stop loss at (%)</label>
                <input
                  type="number"
                  value={settings.stopLossPercent || 15}
                  onChange={(e) =>
                    updateSetting("stopLossPercent", Number(e.target.value))
                  }
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
                />
              </div>
            )}
          </div>

          {/* Take Profit */}
          <div className="rounded-xl border border-border bg-muted/30 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-emerald-500/20 p-2">
                  <Target className="h-5 w-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-medium">Take Profit</h3>
                  <p className="text-sm text-muted-foreground">
                    Auto-withdraw when profit target reached
                  </p>
                </div>
              </div>
              <button
                onClick={() => updateSetting("takeProfit", !settings.takeProfit)}
                className={cn(
                  "relative h-6 w-11 rounded-full transition-colors",
                  settings.takeProfit ? "bg-emerald-500" : "bg-muted"
                )}
              >
                <span
                  className={cn(
                    "absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-transform",
                    settings.takeProfit && "translate-x-5"
                  )}
                />
              </button>
            </div>
            {settings.takeProfit && (
              <div className="mt-4 space-y-2">
                <label className="text-sm text-muted-foreground">
                  Take profit at (%)
                </label>
                <input
                  type="number"
                  value={settings.takeProfitPercent || 25}
                  onChange={(e) =>
                    updateSetting("takeProfitPercent", Number(e.target.value))
                  }
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
                />
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border border-border bg-background py-2.5 text-sm font-medium transition-colors hover:bg-muted"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="flex-1 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 py-2.5 text-sm font-medium text-white transition-colors hover:from-indigo-600 hover:to-purple-700"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}

// Manage Position Modal
function ManageModal({
  position,
  onClose,
}: {
  position: Position;
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState<"add" | "remove" | "claim">("add");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-border bg-card p-6">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-6">
          <h2 className="text-xl font-bold">Manage Position</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {position.pool} on {position.dex} ({position.chain})
          </p>
        </div>

        {/* Position Summary */}
        <div className="mb-6 rounded-xl border border-border bg-muted/30 p-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Current Value</p>
              <p className="text-lg font-semibold">
                ${position.currentPosition.totalValueUsd.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Unclaimed Fees</p>
              <p className="text-lg font-semibold text-amber-400">
                ${position.unclaimedFees.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-2 rounded-lg border border-border bg-muted/30 p-1">
          <button
            onClick={() => setActiveTab("add")}
            className={cn(
              "flex flex-1 items-center justify-center gap-2 rounded-md py-2 text-sm font-medium transition-colors",
              activeTab === "add"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <PlusCircle className="h-4 w-4" />
            Add
          </button>
          <button
            onClick={() => setActiveTab("remove")}
            className={cn(
              "flex flex-1 items-center justify-center gap-2 rounded-md py-2 text-sm font-medium transition-colors",
              activeTab === "remove"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <MinusCircle className="h-4 w-4" />
            Remove
          </button>
          <button
            onClick={() => setActiveTab("claim")}
            className={cn(
              "flex flex-1 items-center justify-center gap-2 rounded-md py-2 text-sm font-medium transition-colors",
              activeTab === "claim"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Coins className="h-4 w-4" />
            Claim
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "add" && (
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground">
                Add {position.token0}
              </label>
              <div className="mt-1 flex rounded-lg border border-border bg-background">
                <input
                  type="number"
                  placeholder="0.0"
                  className="flex-1 bg-transparent px-3 py-2.5 text-sm outline-none"
                />
                <button className="px-3 text-sm text-indigo-400">MAX</button>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Balance: 2.5 {position.token0}
              </p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">
                Add {position.token1}
              </label>
              <div className="mt-1 flex rounded-lg border border-border bg-background">
                <input
                  type="number"
                  placeholder="0.0"
                  className="flex-1 bg-transparent px-3 py-2.5 text-sm outline-none"
                />
                <button className="px-3 text-sm text-indigo-400">MAX</button>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Balance: 5,000 {position.token1}
              </p>
            </div>
          </div>
        )}

        {activeTab === "remove" && (
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground">
                Remove percentage
              </label>
              <div className="mt-2 grid grid-cols-4 gap-2">
                {[25, 50, 75, 100].map((pct) => (
                  <button
                    key={pct}
                    className="rounded-lg border border-border bg-background py-2 text-sm transition-colors hover:bg-muted"
                  >
                    {pct}%
                  </button>
                ))}
              </div>
            </div>
            <div className="rounded-lg border border-border bg-muted/30 p-3">
              <p className="text-xs text-muted-foreground">You will receive</p>
              <div className="mt-2 space-y-1">
                <p className="text-sm">
                  {position.currentPosition.token0.amount} {position.token0}
                </p>
                <p className="text-sm">
                  {position.currentPosition.token1.amount.toLocaleString()}{" "}
                  {position.token1}
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "claim" && (
          <div className="space-y-4">
            <div className="rounded-lg border border-border bg-muted/30 p-4">
              <p className="text-sm text-muted-foreground">Available to claim</p>
              <p className="mt-1 text-2xl font-bold text-amber-400">
                ${position.unclaimedFees.toLocaleString()}
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3">
              <Coins className="h-5 w-5 text-amber-400" />
              <p className="text-sm text-amber-400">
                Claim fees to add liquidity or withdraw
              </p>
            </div>
          </div>
        )}

        {/* Insurance Toggle */}
        <div className="mt-6 rounded-xl border border-border bg-muted/30 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-emerald-500/20 p-2">
                <Shield className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <h3 className="font-medium">IL Insurance</h3>
                <p className="text-sm text-muted-foreground">
                  {position.isInsured ? "Active - 80% IL coverage" : "Not active"}
                </p>
              </div>
            </div>
            <button
              className={cn(
                "relative h-6 w-11 rounded-full transition-colors",
                position.isInsured ? "bg-emerald-500" : "bg-muted"
              )}
            >
              <span
                className={cn(
                  "absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-transform",
                  position.isInsured && "translate-x-5"
                )}
              />
            </button>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={onClose}
            className="w-full rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 py-2.5 text-sm font-medium text-white transition-colors hover:from-indigo-600 hover:to-purple-700"
          >
            {activeTab === "add"
              ? "Add Liquidity"
              : activeTab === "remove"
              ? "Remove Liquidity"
              : "Claim Fees"}
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
  const [selectedPositions, setSelectedPositions] = useState<string[]>([]);
  const [automationModal, setAutomationModal] = useState<Position | null>(null);
  const [manageModal, setManageModal] = useState<Position | null>(null);

  // Filter positions
  const filteredPositions = mockPositions.filter((p) => {
    if (selectedChain !== "all" && p.chain.toLowerCase() !== selectedChain) {
      return false;
    }
    if (selectedDex !== "all" && !p.dex.toLowerCase().includes(selectedDex)) {
      return false;
    }
    return true;
  });

  // Sort positions
  const sortedPositions = [...filteredPositions].sort((a, b) => {
    switch (sortBy) {
      case "roi":
        return b.realRoiPercent - a.realRoiPercent;
      case "value":
        return b.currentPosition.totalValueUsd - a.currentPosition.totalValueUsd;
      case "apy":
        return b.estimatedApy - a.estimatedApy;
      case "age":
        return b.daysActive - a.daysActive;
      default:
        return 0;
    }
  });

  const toggleSelectPosition = (id: string) => {
    setSelectedPositions((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selectedPositions.length === sortedPositions.length) {
      setSelectedPositions([]);
    } else {
      setSelectedPositions(sortedPositions.map((p) => p.id));
    }
  };

  const totalUnclaimedFees = sortedPositions
    .filter((p) => selectedPositions.includes(p.id))
    .reduce((sum, p) => sum + p.unclaimedFees, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/30 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">My Positions</h1>
            <p className="text-sm text-muted-foreground">
              Manage your LP positions across all chains and DEXs
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted">
              <Download className="h-4 w-4" />
              Export
            </button>
            <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:from-indigo-600 hover:to-purple-700">
              <Plus className="h-4 w-4" />
              New Position
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Portfolio Summary */}
        <PortfolioSummary summary={portfolioSummary} />

        {/* Quick Actions */}
        <div className="mt-6 flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm font-medium text-amber-400 transition-colors hover:bg-amber-500/20">
            <Coins className="h-4 w-4" />
            Claim All Fees (${portfolioSummary.totalUnclaimedFees.toLocaleString()})
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm font-medium text-purple-400 transition-colors hover:bg-purple-500/20">
            <RefreshCw className="h-4 w-4" />
            Compound All
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-sm font-medium text-indigo-400 transition-colors hover:bg-indigo-500/20">
            <Zap className="h-4 w-4" />
            Setup Global Automation
          </button>
        </div>

        {/* Filters and Bulk Actions */}
        <div className="mt-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold">Active Positions</h2>
            <span className="rounded-full bg-muted px-2.5 py-0.5 text-sm text-muted-foreground">
              {sortedPositions.length}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={selectedChain}
              onChange={(e) => setSelectedChain(e.target.value)}
              className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm"
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
              className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm"
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
              className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm"
            >
              <option value="roi">Sort by: ROI</option>
              <option value="value">Sort by: Value</option>
              <option value="apy">Sort by: APY</option>
              <option value="age">Sort by: Age</option>
            </select>
          </div>
        </div>

        {/* Bulk Selection Bar */}
        <div className="mt-4 flex items-center justify-between rounded-lg border border-border bg-muted/30 px-4 py-2">
          <button
            onClick={selectAll}
            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {selectedPositions.length === sortedPositions.length ? (
              <CheckSquare className="h-4 w-4 text-indigo-400" />
            ) : (
              <Square className="h-4 w-4" />
            )}
            {selectedPositions.length === sortedPositions.length
              ? "Deselect All"
              : "Select All"}
          </button>

          {selectedPositions.length > 0 && (
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">
                {selectedPositions.length} selected
              </span>
              <div className="h-4 w-px bg-border" />
              <button className="flex items-center gap-1.5 rounded-lg bg-amber-500/20 px-3 py-1.5 text-sm text-amber-400 transition-colors hover:bg-amber-500/30">
                <Coins className="h-4 w-4" />
                Claim (${totalUnclaimedFees.toLocaleString()})
              </button>
              <button className="flex items-center gap-1.5 rounded-lg bg-purple-500/20 px-3 py-1.5 text-sm text-purple-400 transition-colors hover:bg-purple-500/30">
                <RefreshCw className="h-4 w-4" />
                Compound
              </button>
              <button className="flex items-center gap-1.5 rounded-lg bg-indigo-500/20 px-3 py-1.5 text-sm text-indigo-400 transition-colors hover:bg-indigo-500/30">
                <Settings2 className="h-4 w-4" />
                Automate
              </button>
            </div>
          )}
        </div>

        {/* Positions List */}
        <div className="mt-4 grid gap-6">
          {sortedPositions.map((position) => (
            <PositionCard
              key={position.id}
              position={position}
              selected={selectedPositions.includes(position.id)}
              onSelect={toggleSelectPosition}
              onAutomate={setAutomationModal}
              onManage={setManageModal}
            />
          ))}
        </div>

        {sortedPositions.length === 0 && (
          <div className="mt-8 flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 py-16">
            <div className="rounded-full bg-muted p-4">
              <Plus className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="mt-4 text-lg font-medium">No positions found</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {selectedChain !== "all" || selectedDex !== "all"
                ? "Try adjusting your filters"
                : "Create your first LP position to get started"}
            </p>
            <button className="mt-4 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:from-indigo-600 hover:to-purple-700">
              Explore Positions
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
