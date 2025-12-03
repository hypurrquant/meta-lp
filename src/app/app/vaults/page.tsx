"use client";

import { ArrowUpRight, Info, Lock, Shield, TrendingUp, Vault } from "lucide-react";

const insuranceVault = {
  name: "IL Insurance Vault",
  description: "Deposit USDC to provide IL insurance coverage and earn yield",
  tvl: 8200000,
  apy: 8.5,
  utilization: 65,
  userDeposit: 10000,
  userEarned: 234.56,
  token: "USDC",
};

const managedVaults = [
  {
    id: "1",
    name: "Blue Chip LP Vault",
    description: "Conservative strategy focused on ETH/USDC and BTC/USDC pools",
    strategy: "Blue Chip Focus",
    tvl: 5200000,
    apy: 35.6,
    roi30d: 4.2,
    riskLevel: "Low",
    allocation: [
      { pool: "ETH/USDC", percentage: 50 },
      { pool: "BTC/USDC", percentage: 35 },
      { pool: "USDC/USDT", percentage: 15 },
    ],
    userDeposit: 5000,
    userEarned: 178.0,
  },
  {
    id: "2",
    name: "High Yield Vault",
    description: "Aggressive multi-pool strategy for maximum returns",
    strategy: "High Yield",
    tvl: 1800000,
    apy: 72.3,
    roi30d: 8.7,
    riskLevel: "Medium-High",
    allocation: [
      { pool: "ETH/HYPE", percentage: 40 },
      { pool: "HYPE/USDC", percentage: 35 },
      { pool: "ETH/USDC", percentage: 25 },
    ],
    userDeposit: 0,
    userEarned: 0,
  },
  {
    id: "3",
    name: "Stablecoin Yield Vault",
    description: "Low-risk stable pair farming with minimal IL",
    strategy: "Stable Pairs",
    tvl: 12400000,
    apy: 15.2,
    roi30d: 1.3,
    riskLevel: "Very Low",
    allocation: [
      { pool: "USDC/USDT", percentage: 60 },
      { pool: "USDC/DAI", percentage: 40 },
    ],
    userDeposit: 25000,
    userEarned: 312.5,
  },
];

const riskColors: Record<string, string> = {
  "Very Low": "text-emerald-400 bg-emerald-500/20",
  Low: "text-green-400 bg-green-500/20",
  Medium: "text-amber-400 bg-amber-500/20",
  "Medium-High": "text-orange-400 bg-orange-500/20",
  High: "text-red-400 bg-red-500/20",
};

export default function VaultsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/30 px-6 py-4">
        <div>
          <h1 className="text-2xl font-bold">Vaults</h1>
          <p className="text-sm text-muted-foreground">
            Earn yield through IL insurance or managed LP strategies
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* IL Insurance Vault */}
        <div className="mb-8">
          <div className="mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5 text-emerald-400" />
            <h2 className="text-lg font-semibold">IL Insurance Vault</h2>
          </div>
          <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/5 to-emerald-500/10 p-6">
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Vault Info */}
              <div className="lg:col-span-2">
                <h3 className="text-xl font-semibold">{insuranceVault.name}</h3>
                <p className="mt-2 text-muted-foreground">
                  {insuranceVault.description}
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Value Locked</p>
                    <p className="text-xl font-bold">
                      ${(insuranceVault.tvl / 1000000).toFixed(1)}M
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">APY</p>
                    <p className="text-xl font-bold text-emerald-400">
                      {insuranceVault.apy}%
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Utilization</p>
                    <p className="text-xl font-bold">{insuranceVault.utilization}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Token</p>
                    <p className="text-xl font-bold">{insuranceVault.token}</p>
                  </div>
                </div>

                {/* Utilization Bar */}
                <div className="mt-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Pool Utilization</span>
                    <span>{insuranceVault.utilization}%</span>
                  </div>
                  <div className="mt-2 h-3 rounded-full bg-muted">
                    <div
                      className="h-3 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                      style={{ width: `${insuranceVault.utilization}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* User Position */}
              <div className="rounded-xl border border-border/50 bg-card/50 p-4">
                <h4 className="font-medium">Your Position</h4>
                <div className="mt-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Deposited</span>
                    <span className="font-medium">
                      ${insuranceVault.userDeposit.toLocaleString()} USDC
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Earned</span>
                    <span className="font-medium text-emerald-400">
                      +${insuranceVault.userEarned.toLocaleString()} USDC
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <button className="flex-1 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 py-2 text-sm font-medium text-white hover:from-emerald-600 hover:to-emerald-700">
                    Deposit
                  </button>
                  <button className="flex-1 rounded-lg border border-border py-2 text-sm font-medium hover:bg-muted">
                    Withdraw
                  </button>
                </div>
              </div>
            </div>

            {/* Info Banner */}
            <div className="mt-6 flex items-start gap-3 rounded-lg bg-emerald-500/10 p-4">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
              <div className="text-sm">
                <p className="font-medium text-emerald-400">How it works</p>
                <p className="mt-1 text-muted-foreground">
                  Your USDC is used to provide IL insurance coverage to LP providers.
                  When LPs experience impermanent loss, claims are paid from this pool.
                  In return, you earn a share of the insurance premiums paid by LPs.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Managed LP Vaults */}
        <div>
          <div className="mb-4 flex items-center gap-2">
            <Vault className="h-5 w-5 text-indigo-400" />
            <h2 className="text-lg font-semibold">Managed LP Vaults</h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {managedVaults.map((vault) => (
              <div
                key={vault.id}
                className="group rounded-2xl border border-border/50 bg-card/50 p-5 backdrop-blur-sm transition-all hover:border-border hover:bg-card/80"
              >
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">{vault.name}</h3>
                    <span
                      className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs ${riskColors[vault.riskLevel]}`}
                    >
                      {vault.riskLevel} Risk
                    </span>
                  </div>
                  <div className="rounded-lg bg-indigo-500/20 p-2">
                    <TrendingUp className="h-5 w-5 text-indigo-400" />
                  </div>
                </div>

                <p className="mt-3 text-sm text-muted-foreground">
                  {vault.description}
                </p>

                {/* Stats */}
                <div className="mt-4 grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">TVL</p>
                    <p className="font-semibold">
                      ${(vault.tvl / 1000000).toFixed(1)}M
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">APY</p>
                    <p className="font-semibold text-emerald-400">{vault.apy}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">30d ROI</p>
                    <p className="font-semibold text-emerald-400">+{vault.roi30d}%</p>
                  </div>
                </div>

                {/* Allocation */}
                <div className="mt-4">
                  <p className="mb-2 text-xs text-muted-foreground">Allocation</p>
                  <div className="flex gap-1">
                    {vault.allocation.map((item, index) => (
                      <div
                        key={item.pool}
                        className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                        style={{
                          width: `${item.percentage}%`,
                          opacity: 1 - index * 0.2,
                        }}
                        title={`${item.pool}: ${item.percentage}%`}
                      ></div>
                    ))}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {vault.allocation.map((item) => (
                      <span
                        key={item.pool}
                        className="rounded bg-muted px-1.5 py-0.5 text-xs"
                      >
                        {item.pool} ({item.percentage}%)
                      </span>
                    ))}
                  </div>
                </div>

                {/* User Position */}
                {vault.userDeposit > 0 && (
                  <div className="mt-4 rounded-lg bg-muted/50 p-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Your deposit</span>
                      <span>${vault.userDeposit.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Earned</span>
                      <span className="text-emerald-400">
                        +${vault.userEarned.toLocaleString()}
                      </span>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="mt-4 flex gap-2">
                  <button className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 py-2 text-sm font-medium text-white hover:from-indigo-600 hover:to-purple-700">
                    {vault.userDeposit > 0 ? "Manage" : "Deposit"}
                  </button>
                  <button className="rounded-lg border border-border p-2 hover:bg-muted">
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Coming Soon */}
        <div className="mt-8 rounded-2xl border border-dashed border-border/50 bg-muted/20 p-8 text-center">
          <Lock className="mx-auto h-12 w-12 text-muted-foreground/50" />
          <h3 className="mt-4 text-lg font-semibold">More Vaults Coming Soon</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            We&apos;re working on additional vault strategies including delta-neutral,
            options-based hedging, and cross-chain LP management.
          </p>
        </div>
      </div>
    </div>
  );
}
