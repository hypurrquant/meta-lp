"use client";

import { useState, useMemo } from "react";
import {
  DollarSign,
  Shield,
  Vault,
  X,
  ChevronDown,
} from "lucide-react";
import { stableVault, lpVaults, type LPVault } from "@/data/mock-vaults";
import { cn } from "@/lib/utils";

const statusConfig = {
  active: { color: "text-emerald-400", bg: "bg-emerald-500", label: "Active" },
  closing: { color: "text-amber-400", bg: "bg-amber-500", label: "Closing" },
  completed: { color: "text-muted-foreground", bg: "bg-muted-foreground", label: "Closed" },
};

const riskConfig = {
  conservative: { color: "text-emerald-400", label: "Low" },
  balanced: { color: "text-blue-400", label: "Med" },
  growth: { color: "text-amber-400", label: "Med+" },
  aggressive: { color: "text-red-400", label: "High" },
};

// Vault Card Component
function VaultCard({
  vault,
  onDeposit,
}: {
  vault: LPVault;
  onDeposit: (vault: LPVault) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const status = statusConfig[vault.status];
  const risk = riskConfig[vault.riskLevel];
  const capacityPercent = (vault.currentDeposit / vault.totalCap) * 100;

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
            <div className="h-10 w-10 rounded-lg bg-indigo-500/20 flex items-center justify-center">
              <Vault className="h-5 w-5 text-indigo-400" />
            </div>
            <div>
              <h3 className="font-semibold">{vault.name}</h3>
              <div className="flex items-center gap-2 text-xs">
                <span className={status.color}>{status.label}</span>
                <span className="text-muted-foreground">•</span>
                <span className={risk.color}>{risk.label} Risk</span>
              </div>
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
            <p className="text-xs text-muted-foreground">Target ROI</p>
            <p className="text-lg font-bold text-emerald-400">
              {vault.targetRoi}%
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Current</p>
            <p className="text-lg font-bold">
              {vault.currentRoi}%
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Duration</p>
            <p className="text-lg font-bold">{vault.estimatedDays}d</p>
          </div>
        </div>

        {/* Capacity Bar */}
        <div className="mt-3">
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>Capacity</span>
            <span>{capacityPercent.toFixed(0)}%</span>
          </div>
          <div className="h-2 rounded-full bg-muted">
            <div
              className={cn(
                "h-full rounded-full transition-all",
                capacityPercent > 90 ? "bg-red-500" : "bg-indigo-500"
              )}
              style={{ width: `${capacityPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Expanded Details */}
      {expanded && (
        <div className="border-t border-border/50 p-4 bg-muted/20 space-y-4">
          <p className="text-sm text-muted-foreground">{vault.description}</p>

          {/* Strategy */}
          <div className="p-2 rounded-md bg-muted text-xs text-muted-foreground">
            {vault.strategy}
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Deposited</span>
              <span>${vault.currentDeposit}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Cap</span>
              <span>${vault.totalCap}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Start</span>
              <span>{vault.startDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Est. Days</span>
              <span>{vault.estimatedDays}d</span>
            </div>
          </div>

          {/* Deposit Button */}
          {vault.status === "active" && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeposit(vault);
              }}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-indigo-500 py-3 text-sm font-medium text-white hover:bg-indigo-600"
            >
              <DollarSign className="h-4 w-4" />
              Deposit
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// Deposit Modal
function DepositModal({
  vault,
  onClose,
}: {
  vault: LPVault;
  onClose: () => void;
}) {
  const [amount, setAmount] = useState("");
  const remaining = vault.totalCap - vault.currentDeposit;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 p-0 sm:p-4">
      <div className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl border border-border bg-card">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between border-b border-border bg-card p-4">
          <div>
            <h2 className="text-lg font-bold">Deposit to Vault</h2>
            <p className="text-sm text-muted-foreground">{vault.name}</p>
          </div>
          <button onClick={onClose} className="rounded-lg p-2 hover:bg-muted">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {/* Vault Info */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
            <span className="text-sm text-emerald-400">Target ROI</span>
            <span className="text-lg font-bold text-emerald-400">
              {vault.targetRoi}%
            </span>
          </div>

          {/* Amount Input */}
          <div>
            <label className="block text-sm font-medium mb-2">Amount (USDC)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full rounded-lg border border-border bg-background px-4 py-3 text-lg font-semibold"
            />
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>Available: ${remaining}</span>
            </div>
          </div>

          {/* Quick Amount */}
          <div className="grid grid-cols-4 gap-2">
            {[10, 25, 50, 100].map((val) => (
              <button
                key={val}
                onClick={() => setAmount(val.toString())}
                className="rounded-lg border border-border py-2 text-sm hover:bg-muted"
              >
                ${val}
              </button>
            ))}
          </div>

          {/* Info */}
          <div className="p-3 rounded-lg bg-muted/50 text-xs text-muted-foreground space-y-1">
            <div className="flex justify-between">
              <span>Estimated Duration</span>
              <span>{vault.estimatedDays} days</span>
            </div>
            <div className="flex justify-between">
              <span>Risk Level</span>
              <span className="capitalize">{vault.riskLevel}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 rounded-lg border border-border py-3 text-sm font-medium hover:bg-muted"
            >
              Cancel
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-indigo-500 py-3 text-sm font-medium text-white hover:bg-indigo-600">
              Deposit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VaultsPage() {
  const [depositVault, setDepositVault] = useState<LPVault | null>(null);
  const [showClosed, setShowClosed] = useState(false);

  const displayedVaults = useMemo(() => {
    return showClosed
      ? lpVaults
      : lpVaults.filter((v) => v.status !== "completed");
  }, [showClosed]);

  // Stats
  const totalTvl = lpVaults.reduce((sum, v) => sum + v.currentDeposit, 0);
  const avgRoi =
    lpVaults.reduce((sum, v) => sum + v.currentRoi, 0) / lpVaults.length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/30 px-4 py-4">
        <h1 className="text-xl font-bold">Vaults</h1>
        <p className="text-sm text-muted-foreground">
          Managed LP strategies
        </p>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-xl border border-border/50 bg-card/50 p-3">
            <p className="text-xs text-muted-foreground">Total TVL</p>
            <p className="text-lg font-bold">
              ${(totalTvl / 1000000).toFixed(1)}M
            </p>
          </div>
          <div className="rounded-xl border border-border/50 bg-card/50 p-3">
            <p className="text-xs text-muted-foreground">Avg ROI</p>
            <p className="text-lg font-bold text-emerald-400">
              {avgRoi.toFixed(1)}%
            </p>
          </div>
          <div className="rounded-xl border border-border/50 bg-card/50 p-3">
            <p className="text-xs text-muted-foreground">Vaults</p>
            <p className="text-lg font-bold">{lpVaults.length}</p>
          </div>
        </div>

        {/* Stable Vault Highlight */}
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <Shield className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <h3 className="font-semibold">{stableVault.name}</h3>
                <p className="text-xs text-emerald-400">No lock • Flexible</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-emerald-400">
                {stableVault.apy}%
              </p>
              <p className="text-xs text-muted-foreground">APY</p>
            </div>
          </div>
          <button className="mt-4 w-full flex items-center justify-center gap-2 rounded-lg bg-emerald-500 py-2.5 text-sm font-medium text-white hover:bg-emerald-600">
            <DollarSign className="h-4 w-4" />
            Deposit Stable
          </button>
        </div>

        {/* Filter */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">LP Vaults</h2>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={showClosed}
              onChange={(e) => setShowClosed(e.target.checked)}
              className="rounded"
            />
            <span className="text-muted-foreground">Show closed</span>
          </label>
        </div>

        {/* Vault Cards */}
        <div className="grid gap-4 sm:grid-cols-2">
          {displayedVaults.map((vault) => (
            <VaultCard
              key={vault.id}
              vault={vault}
              onDeposit={setDepositVault}
            />
          ))}
        </div>

        {displayedVaults.length === 0 && (
          <div className="py-12 text-center">
            <Vault className="h-12 w-12 mx-auto text-muted-foreground" />
            <p className="mt-4 text-muted-foreground">No vaults found</p>
          </div>
        )}
      </div>

      {/* Deposit Modal */}
      {depositVault && (
        <DepositModal
          vault={depositVault}
          onClose={() => setDepositVault(null)}
        />
      )}
    </div>
  );
}
