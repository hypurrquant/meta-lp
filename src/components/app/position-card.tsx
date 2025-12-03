"use client";

import { Shield, TrendingDown, TrendingUp } from "lucide-react";
import type { Position } from "@/data/mock-positions";
import { cn } from "@/lib/utils";

interface PositionCardProps {
  position: Position;
}

// Token color mapping
const tokenColors: Record<string, { from: string; to: string }> = {
  ETH: { from: "from-blue-400", to: "to-blue-600" },
  USDC: { from: "from-green-400", to: "to-green-600" },
  BTC: { from: "from-orange-400", to: "to-orange-600" },
  HYPE: { from: "from-purple-400", to: "to-purple-600" },
};

function TokenBadge({ symbol }: { symbol: string }) {
  const colors = tokenColors[symbol] || { from: "from-gray-400", to: "to-gray-600" };
  return (
    <div
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br text-xs font-bold text-white ring-2 ring-background",
        colors.from,
        colors.to
      )}
    >
      {symbol.slice(0, 4)}
    </div>
  );
}

function CompositionChart({ history, token0, token1 }: { history: number[]; token0: string; token1: string }) {
  const colors0 = tokenColors[token0] || { from: "from-gray-400", to: "to-gray-600" };
  const colors1 = tokenColors[token1] || { from: "from-gray-400", to: "to-gray-600" };

  return (
    <div className="flex flex-col justify-center rounded-xl bg-muted/50 p-4">
      <div className="mb-2 text-xs text-muted-foreground">Portfolio Composition</div>
      <div className="flex h-20 items-end gap-0.5">
        {history.map((h, i) => (
          <div key={i} className="flex flex-1 flex-col gap-0.5">
            <div
              className={cn("rounded-t bg-gradient-to-t", colors0.from, colors0.to.replace("to-", "to-"))}
              style={{ height: `${h}%` }}
            />
            <div
              className={cn("rounded-b bg-gradient-to-t", colors1.from, colors1.to.replace("to-", "to-"))}
              style={{ height: `${100 - h}%` }}
            />
          </div>
        ))}
      </div>
      <div className="mt-2 flex justify-between text-xs text-muted-foreground">
        <span>Day 1</span>
        <span>Day {history.length * 4}</span>
      </div>
    </div>
  );
}

export function PositionCard({ position }: PositionCardProps) {
  const isPositiveRoi = position.realRoi >= 0;

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/80 p-5 backdrop-blur-sm transition-all hover:border-border hover:bg-card">
      {/* Glow Effect */}
      <div className="absolute -inset-px -z-10 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 opacity-0 blur-xl transition-opacity group-hover:opacity-100" />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            <TokenBadge symbol={position.token0} />
            <TokenBadge symbol={position.token1} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">{position.pool}</h3>
              <span className="rounded bg-indigo-500/20 px-2 py-0.5 text-xs text-indigo-400">
                {position.dex}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Active for {position.daysActive} days
            </p>
          </div>
        </div>
        {position.isInsured && (
          <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1">
            <Shield className="h-4 w-4 text-emerald-400" />
            <span className="text-sm font-medium text-emerald-400">Insured</span>
          </div>
        )}
      </div>

      {/* Position Details */}
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Initial Deposit</p>
            <div className="mt-1 space-y-0.5">
              <p className="text-sm">
                {position.initialDeposit.token0.amount} {position.token0}{" "}
                <span className="text-muted-foreground">
                  (${position.initialDeposit.token0.valueUsd.toLocaleString()})
                </span>
              </p>
              <p className="text-sm">
                {position.initialDeposit.token1.amount.toLocaleString()} {position.token1}
              </p>
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Current Position</p>
            <div className="mt-1 space-y-0.5">
              <p className="text-sm">
                {position.currentPosition.token0.amount} {position.token0}{" "}
                <span className="text-muted-foreground">
                  (${position.currentPosition.token0.valueUsd.toLocaleString()})
                </span>
              </p>
              <p className="text-sm">
                {position.currentPosition.token1.amount.toLocaleString()} {position.token1}
              </p>
            </div>
          </div>
        </div>

        <CompositionChart
          history={position.compositionHistory}
          token0={position.token0}
          token1={position.token1}
        />
      </div>

      {/* ROI Summary */}
      <div className="mt-5 grid grid-cols-2 gap-3 rounded-xl bg-muted/50 p-4 sm:grid-cols-4">
        <div>
          <p className="text-xs text-muted-foreground">Fees Earned</p>
          <p className="text-base font-semibold text-emerald-400">
            +${position.feesEarned.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">IL Loss</p>
          <p className="text-base font-semibold text-red-400">
            -${position.ilLoss.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Insurance</p>
          <p
            className={cn(
              "text-base font-semibold",
              position.insuranceClaim > 0 ? "text-emerald-400" : "text-muted-foreground"
            )}
          >
            {position.insuranceClaim > 0
              ? `+$${position.insuranceClaim.toLocaleString()}`
              : "N/A"}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Real ROI</p>
          <div className="flex items-center gap-1">
            {isPositiveRoi ? (
              <TrendingUp className="h-4 w-4 text-emerald-400" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-400" />
            )}
            <p
              className={cn(
                "text-base font-semibold",
                isPositiveRoi ? "text-emerald-400" : "text-red-400"
              )}
            >
              {isPositiveRoi ? "+" : ""}${position.realRoi.toLocaleString()}
            </p>
          </div>
          <p
            className={cn(
              "text-xs",
              isPositiveRoi ? "text-emerald-400" : "text-red-400"
            )}
          >
            ({isPositiveRoi ? "+" : ""}{position.realRoiPercent}%)
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Est. APY: <span className="font-medium text-foreground">{position.estimatedApy}%</span>
        </p>
        <div className="flex gap-2">
          <button className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm transition-colors hover:bg-muted">
            Manage
          </button>
          <button className="rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 px-3 py-1.5 text-sm text-white transition-colors hover:from-indigo-600 hover:to-purple-700">
            Add Liquidity
          </button>
        </div>
      </div>
    </div>
  );
}
