"use client";

import { useState, useMemo } from "react";
import {
  ArrowUpDown,
  Clock,
  DollarSign,
  Info,
  Shield,
  Target,
  TrendingUp,
  Vault,
  X,
  Zap,
} from "lucide-react";
import { stableVault, lpVaults, vaultHistory, vaultStats, riskLevelInfo, type LPVault } from "@/data/mock-vaults";
import { cn } from "@/lib/utils";

type SortKey = "name" | "totalCap" | "currentRoi" | "status" | "riskLevel";
type SortOrder = "asc" | "desc";

const statusConfig = {
  active: { color: "text-emerald-400", bg: "bg-emerald-500", dotBg: "bg-emerald-500", label: "Active" },
  closing: { color: "text-amber-400", bg: "bg-amber-500", dotBg: "bg-amber-500", label: "Closing" },
  completed: { color: "text-muted-foreground", bg: "bg-muted-foreground", dotBg: "bg-muted-foreground", label: "Closed" },
};

const riskOrder = { conservative: 1, balanced: 2, growth: 3, aggressive: 4 };

// Vault Table Row Component
function VaultRow({
  vault,
  onDeposit,
}: {
  vault: LPVault;
  onDeposit: (vault: LPVault) => void;
}) {
  const riskInfo = riskLevelInfo[vault.riskLevel];
  const capacityPercent = (vault.currentDeposit / vault.totalCap) * 100;
  const roiPercent = (vault.currentRoi / vault.targetRoi) * 100;
  const remainingCap = vault.totalCap - vault.currentDeposit;
  const isFull = remainingCap <= 0;

  return (
    <tr className="group border-b border-border/30 transition-colors hover:bg-muted/30">
      {/* Vault Name & Strategy */}
      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          <div className={cn(
            "flex h-10 w-10 items-center justify-center rounded-xl",
            vault.riskLevel === "conservative" && "bg-emerald-500/20",
            vault.riskLevel === "balanced" && "bg-blue-500/20",
            vault.riskLevel === "growth" && "bg-amber-500/20",
            vault.riskLevel === "aggressive" && "bg-red-500/20"
          )}>
            <Vault className={cn(
              "h-5 w-5",
              vault.riskLevel === "conservative" && "text-emerald-400",
              vault.riskLevel === "balanced" && "text-blue-400",
              vault.riskLevel === "growth" && "text-amber-400",
              vault.riskLevel === "aggressive" && "text-red-400"
            )} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">{vault.name}</span>
              {vault.userDeposit && vault.userDeposit > 0 && (
                <span className="rounded-full bg-indigo-500/20 px-1.5 py-0.5 text-[10px] font-medium text-indigo-400">
                  DEPOSITED
                </span>
              )}
            </div>
            <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">{vault.strategy}</p>
          </div>
        </div>
      </td>

      {/* Risk Level */}
      <td className="px-4 py-4">
        <span className={cn("rounded-full px-2.5 py-1 text-xs font-medium", riskInfo.color)}>
          {riskInfo.label}
        </span>
      </td>

      {/* Status */}
      <td className="px-4 py-4">
        <div className="flex items-center gap-2">
          <div className={cn("h-2 w-2 rounded-full", statusConfig[vault.status].dotBg)} />
          <span className={cn("text-sm", statusConfig[vault.status].color)}>
            {statusConfig[vault.status].label}
          </span>
        </div>
      </td>

      {/* Capacity */}
      <td className="px-4 py-4">
        <div className="w-32">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">${vault.currentDeposit}</span>
            <span className="text-muted-foreground">/ ${vault.totalCap}</span>
          </div>
          <div className="mt-1.5 h-1.5 rounded-full bg-muted">
            <div
              className={cn(
                "h-full rounded-full transition-all",
                capacityPercent >= 100 ? "bg-amber-500" : "bg-gradient-to-r from-indigo-500 to-purple-500"
              )}
              style={{ width: `${Math.min(capacityPercent, 100)}%` }}
            />
          </div>
        </div>
      </td>

      {/* ROI Progress */}
      <td className="px-4 py-4">
        <div className="w-28">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-emerald-400">+{vault.currentRoi}%</span>
            <span className="text-muted-foreground">/ {vault.targetRoi}%</span>
          </div>
          <div className="mt-1.5 h-1.5 rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400"
              style={{ width: `${Math.min(roiPercent, 100)}%` }}
            />
          </div>
        </div>
      </td>

      {/* Est. Duration */}
      <td className="px-4 py-4">
        <span className="text-sm">{vault.estimatedDays}d</span>
      </td>

      {/* Your Position */}
      <td className="px-4 py-4">
        {vault.userDeposit && vault.userDeposit > 0 ? (
          <div className="text-right">
            <p className="font-medium">${vault.userDeposit}</p>
            <p className="text-xs text-emerald-400">+${vault.userEarned?.toFixed(2)}</p>
          </div>
        ) : (
          <span className="text-sm text-muted-foreground">-</span>
        )}
      </td>

      {/* Action */}
      <td className="px-4 py-4">
        {vault.status === "active" && !isFull ? (
          <button
            onClick={() => onDeposit(vault)}
            className="rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2 text-sm font-medium text-white transition-all hover:from-indigo-600 hover:to-purple-700"
          >
            Deposit
          </button>
        ) : vault.status === "active" && isFull ? (
          <span className="rounded-lg bg-muted px-4 py-2 text-sm text-muted-foreground">Full</span>
        ) : vault.status === "closing" ? (
          <span className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm text-amber-400">
            Closing
          </span>
        ) : (
          <span className="rounded-lg bg-muted px-4 py-2 text-sm text-muted-foreground">Closed</span>
        )}
      </td>
    </tr>
  );
}

// Deposit Modal Component
function DepositModal({
  vault,
  onClose,
}: {
  vault: LPVault;
  onClose: () => void;
}) {
  const [amount, setAmount] = useState("");
  const riskInfo = riskLevelInfo[vault.riskLevel];
  const remainingCap = vault.totalCap - vault.currentDeposit;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Deposit to Vault</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4 flex items-center gap-3 rounded-xl bg-muted/50 p-4">
          <div className={cn(
            "flex h-12 w-12 items-center justify-center rounded-xl",
            vault.riskLevel === "conservative" && "bg-emerald-500/20",
            vault.riskLevel === "balanced" && "bg-blue-500/20",
            vault.riskLevel === "growth" && "bg-amber-500/20",
            vault.riskLevel === "aggressive" && "bg-red-500/20"
          )}>
            <Vault className={cn(
              "h-6 w-6",
              vault.riskLevel === "conservative" && "text-emerald-400",
              vault.riskLevel === "balanced" && "text-blue-400",
              vault.riskLevel === "growth" && "text-amber-400",
              vault.riskLevel === "aggressive" && "text-red-400"
            )} />
          </div>
          <div>
            <h3 className="font-semibold">{vault.name}</h3>
            <p className="text-sm text-muted-foreground">{riskInfo.label} Strategy</p>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium">Amount (USDC)</label>
            <div className="flex items-center gap-2 rounded-xl border border-border bg-background p-3">
              <DollarSign className="h-5 w-5 text-muted-foreground" />
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                max={remainingCap}
                className="flex-1 bg-transparent text-lg font-medium outline-none"
              />
              <button
                onClick={() => setAmount(remainingCap.toString())}
                className="rounded-lg bg-muted px-3 py-1.5 text-xs font-medium transition-colors hover:bg-muted/80"
              >
                MAX
              </button>
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
              <span>Remaining capacity: ${remainingCap}</span>
              <span>Balance: $10,000</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 rounded-xl bg-muted/30 p-4">
            <div>
              <p className="text-xs text-muted-foreground">Target ROI</p>
              <p className="mt-1 font-semibold text-emerald-400">{vault.targetRoi}%</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Current ROI</p>
              <p className="mt-1 font-semibold">{vault.currentRoi}%</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Est. Duration</p>
              <p className="mt-1 font-semibold">{vault.estimatedDays} days</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Risk Level</p>
              <p className={cn("mt-1 font-semibold", riskInfo.color.split(" ")[0])}>{riskInfo.label}</p>
            </div>
          </div>

          <div className="flex items-start gap-2 rounded-xl bg-indigo-500/10 p-3">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-indigo-400" />
            <p className="text-xs text-indigo-400">
              Vault auto-closes at {vault.targetRoi}% ROI. Your deposit and earnings will be returned automatically.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 rounded-xl border border-border py-3 font-medium transition-colors hover:bg-muted"
            >
              Cancel
            </button>
            <button
              disabled={!amount || parseFloat(amount) <= 0}
              className="flex-1 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 py-3 font-medium text-white transition-all hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50"
            >
              Deposit ${amount || "0"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sortable Header Component
function SortableHeader({
  label,
  sortKey,
  currentSort,
  onSort,
}: {
  label: string;
  sortKey: SortKey;
  currentSort: SortKey;
  onSort: (key: SortKey) => void;
}) {
  const isActive = currentSort === sortKey;

  return (
    <button
      onClick={() => onSort(sortKey)}
      className={cn(
        "flex items-center gap-1 text-left text-sm font-medium transition-colors",
        isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
      )}
    >
      {label}
      <ArrowUpDown className={cn("h-3.5 w-3.5", isActive && "text-indigo-400")} />
    </button>
  );
}

export default function VaultsPage() {
  const [activeTab, setActiveTab] = useState<"active" | "history">("active");
  const [sortKey, setSortKey] = useState<SortKey>("currentRoi");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [showClosed, setShowClosed] = useState(false);
  const [depositModal, setDepositModal] = useState<LPVault | null>(null);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("desc");
    }
  };

  const sortedVaults = useMemo(() => {
    const filtered = showClosed ? lpVaults : lpVaults.filter((v) => v.status !== "completed");
    const statusOrder: Record<string, number> = { active: 0, closing: 1, completed: 2 };

    return [...filtered].sort((a, b) => {
      let comparison = 0;

      switch (sortKey) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "totalCap":
          comparison = a.currentDeposit - b.currentDeposit;
          break;
        case "currentRoi":
          comparison = a.currentRoi - b.currentRoi;
          break;
        case "status":
          comparison = statusOrder[a.status] - statusOrder[b.status];
          break;
        case "riskLevel":
          comparison = riskOrder[a.riskLevel] - riskOrder[b.riskLevel];
          break;
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });
  }, [sortKey, sortOrder, showClosed]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/30 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Protocol Vaults</h1>
            <p className="text-sm text-muted-foreground">
              Data-driven LP strategies with auto-closing at 3% ROI
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-1.5">
              <span className="text-sm text-muted-foreground">Show Closed</span>
              <button
                onClick={() => setShowClosed(!showClosed)}
                className={cn(
                  "relative h-5 w-9 rounded-full transition-colors",
                  showClosed ? "bg-indigo-500" : "bg-muted"
                )}
              >
                <span
                  className={cn(
                    "absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white transition-transform",
                    showClosed && "translate-x-4"
                  )}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Stats Overview */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <div className="rounded-xl border border-border/50 bg-card/50 p-4">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Completed</p>
            </div>
            <p className="mt-1 text-2xl font-bold">{vaultStats.totalVaultsCompleted}</p>
          </div>
          <div className="rounded-xl border border-border/50 bg-card/50 p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-emerald-400" />
              <p className="text-sm text-muted-foreground">Avg ROI</p>
            </div>
            <p className="mt-1 text-2xl font-bold text-emerald-400">+{vaultStats.averageRoi}%</p>
          </div>
          <div className="rounded-xl border border-border/50 bg-card/50 p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Avg Duration</p>
            </div>
            <p className="mt-1 text-2xl font-bold">{vaultStats.averageDuration} days</p>
          </div>
          <div className="rounded-xl border border-border/50 bg-card/50 p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Processed</p>
            </div>
            <p className="mt-1 text-2xl font-bold">${vaultStats.totalValueProcessed.toLocaleString()}</p>
          </div>
          <div className="rounded-xl border border-border/50 bg-card/50 p-4">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-emerald-400" />
              <p className="text-sm text-muted-foreground">Success Rate</p>
            </div>
            <p className="mt-1 text-2xl font-bold text-emerald-400">{vaultStats.successRate}%</p>
          </div>
        </div>

        {/* Stable Vault */}
        <div className="mb-8">
          <div className="mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5 text-emerald-400" />
            <h2 className="text-lg font-semibold">Insurance Hedge Vault</h2>
          </div>
          <div className="overflow-hidden rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/5 to-emerald-500/10">
            <div className="grid lg:grid-cols-4">
              {/* Vault Info */}
              <div className="border-b border-emerald-500/20 p-6 lg:col-span-3 lg:border-b-0 lg:border-r">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">{stableVault.name}</h3>
                    <p className="mt-2 max-w-2xl text-muted-foreground">{stableVault.description}</p>
                  </div>
                  <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-sm font-medium text-emerald-400">
                    {stableVault.token}
                  </span>
                </div>

                <div className="mt-6 grid gap-6 sm:grid-cols-4">
                  <div className="rounded-xl bg-emerald-500/10 p-4">
                    <p className="text-xs text-emerald-400/70">Total Value Locked</p>
                    <p className="mt-1 text-2xl font-bold">${(stableVault.tvl / 1000).toFixed(0)}K</p>
                  </div>
                  <div className="rounded-xl bg-emerald-500/10 p-4">
                    <p className="text-xs text-emerald-400/70">Annual Yield</p>
                    <p className="mt-1 text-2xl font-bold text-emerald-400">{stableVault.apy}%</p>
                  </div>
                  <div className="rounded-xl bg-emerald-500/10 p-4">
                    <p className="text-xs text-emerald-400/70">Utilization</p>
                    <p className="mt-1 text-2xl font-bold">{stableVault.utilization}%</p>
                  </div>
                  <div className="rounded-xl bg-emerald-500/10 p-4">
                    <p className="text-xs text-emerald-400/70">Depositors</p>
                    <p className="mt-1 text-2xl font-bold">342</p>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Pool Utilization</span>
                    <span className="text-emerald-400">{stableVault.utilization}%</span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-emerald-500/20">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                      style={{ width: `${stableVault.utilization}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* User Position */}
              <div className="flex flex-col justify-between p-6">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Your Position</h4>
                  <div className="mt-4 space-y-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Deposited</p>
                      <p className="text-2xl font-bold">${stableVault.userDeposit.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Earned</p>
                      <p className="text-lg font-semibold text-emerald-400">+${stableVault.userEarned.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex gap-2">
                  <button className="flex-1 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 py-3 text-sm font-medium text-white transition-all hover:from-emerald-600 hover:to-emerald-700">
                    Deposit
                  </button>
                  <button className="flex-1 rounded-xl border border-emerald-500/30 py-3 text-sm font-medium transition-colors hover:bg-emerald-500/10">
                    Withdraw
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LP Vaults */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Vault className="h-5 w-5 text-indigo-400" />
              <h2 className="text-lg font-semibold">LP Strategy Vaults</h2>
              <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                {sortedVaults.length}
              </span>
            </div>
            <div className="flex rounded-lg border border-border bg-background p-1">
              <button
                onClick={() => setActiveTab("active")}
                className={cn(
                  "rounded-md px-4 py-1.5 text-sm font-medium transition-colors",
                  activeTab === "active" ? "bg-muted" : "text-muted-foreground hover:text-foreground"
                )}
              >
                Active
              </button>
              <button
                onClick={() => setActiveTab("history")}
                className={cn(
                  "rounded-md px-4 py-1.5 text-sm font-medium transition-colors",
                  activeTab === "history" ? "bg-muted" : "text-muted-foreground hover:text-foreground"
                )}
              >
                History
              </button>
            </div>
          </div>

          {activeTab === "active" ? (
            <div className="overflow-hidden rounded-xl border border-border/50 bg-card/50">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/50 bg-muted/30">
                      <th className="px-4 py-3 text-left">
                        <SortableHeader
                          label="Vault"
                          sortKey="name"
                          currentSort={sortKey}
                                                    onSort={handleSort}
                        />
                      </th>
                      <th className="px-4 py-3 text-left">
                        <SortableHeader
                          label="Risk"
                          sortKey="riskLevel"
                          currentSort={sortKey}
                                                    onSort={handleSort}
                        />
                      </th>
                      <th className="px-4 py-3 text-left">
                        <SortableHeader
                          label="Status"
                          sortKey="status"
                          currentSort={sortKey}
                                                    onSort={handleSort}
                        />
                      </th>
                      <th className="px-4 py-3 text-left">
                        <SortableHeader
                          label="Capacity"
                          sortKey="totalCap"
                          currentSort={sortKey}
                                                    onSort={handleSort}
                        />
                      </th>
                      <th className="px-4 py-3 text-left">
                        <SortableHeader
                          label="ROI"
                          sortKey="currentRoi"
                          currentSort={sortKey}
                                                    onSort={handleSort}
                        />
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Est.</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Your Position</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedVaults.map((vault) => (
                      <VaultRow
                        key={vault.id}
                        vault={vault}
                        onDeposit={setDepositModal}
                      />
                    ))}
                  </tbody>
                </table>
              </div>

              {sortedVaults.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12">
                  <Vault className="h-12 w-12 text-muted-foreground" />
                  <p className="mt-4 text-muted-foreground">No vaults found</p>
                </div>
              )}
            </div>
          ) : (
            <div className="overflow-hidden rounded-xl border border-border/50 bg-card/50">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/50 bg-muted/30">
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Vault</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Strategy</th>
                      <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Final ROI</th>
                      <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Duration</th>
                      <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Total</th>
                      <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Completed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vaultHistory.map((vault) => (
                      <tr key={vault.id} className="border-b border-border/30 last:border-0">
                        <td className="px-4 py-4 font-medium">{vault.vaultName}</td>
                        <td className="px-4 py-4">
                          <span className={cn(
                            "rounded-full px-2.5 py-1 text-xs font-medium capitalize",
                            riskLevelInfo[vault.strategy as keyof typeof riskLevelInfo]?.color
                          )}>
                            {vault.strategy}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-right">
                          <span className="font-semibold text-emerald-400">+{vault.finalRoi}%</span>
                        </td>
                        <td className="px-4 py-4 text-right">{vault.durationDays}d</td>
                        <td className="px-4 py-4 text-right">${vault.totalDeposit}</td>
                        <td className="px-4 py-4 text-right text-muted-foreground">{vault.completedDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Info Banner */}
          <div className="mt-6 flex items-start gap-3 rounded-xl border border-indigo-500/30 bg-indigo-500/10 p-4">
            <Zap className="mt-0.5 h-5 w-5 shrink-0 text-indigo-400" />
            <div className="text-sm">
              <p className="font-medium text-indigo-400">How LP Vaults Work</p>
              <p className="mt-1 text-muted-foreground">
                Each vault has a <strong>$100 total capacity</strong>. Multiple users deposit until full.
                At <strong>3% ROI</strong>, the vault auto-closes and returns deposits + earnings proportionally.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Deposit Modal */}
      {depositModal && (
        <DepositModal vault={depositModal} onClose={() => setDepositModal(null)} />
      )}
    </div>
  );
}
