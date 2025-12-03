"use client";

import {
  Shield,
  TrendingDown,
  TrendingUp,
  RefreshCw,
  Coins,
  TrendingDown as StopLossIcon,
  Target,
  Settings2,
  Zap,
} from "lucide-react";
import type { Position } from "@/data/mock-positions";
import { cn } from "@/lib/utils";

interface PositionCardProps {
  position: Position;
  onManage?: (position: Position) => void;
  onAutomate?: (position: Position) => void;
  selected?: boolean;
  onSelect?: (id: string) => void;
}

// Token color mapping
const tokenColors: Record<string, { from: string; to: string }> = {
  ETH: { from: "from-blue-400", to: "to-blue-600" },
  USDC: { from: "from-green-400", to: "to-green-600" },
  WBTC: { from: "from-orange-400", to: "to-orange-600" },
  BTC: { from: "from-orange-400", to: "to-orange-600" },
  HYPE: { from: "from-purple-400", to: "to-purple-600" },
  OP: { from: "from-red-400", to: "to-red-600" },
  ARB: { from: "from-cyan-400", to: "to-cyan-600" },
};


function TokenBadge({ symbol }: { symbol: string }) {
  const colors = tokenColors[symbol] || { from: "from-gray-400", to: "to-gray-600" };
  return (
    <div
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br text-xs font-bold text-white ring-2 ring-background",
        colors.from,
        colors.to
      )}
    >
      {symbol.slice(0, 3)}
    </div>
  );
}

function ChainBadge({ chain }: { chain: string }) {
  return (
    <div className="flex items-center gap-1 rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground">
      <div className="flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br from-gray-600 to-gray-800 text-[8px] font-bold text-white">
        {chain.slice(0, 2).toUpperCase()}
      </div>
      {chain}
    </div>
  );
}

function AutomationBadges({ automation }: { automation: Position["automation"] }) {
  const hasAutomation = automation.autoRebalance || automation.autoCompound || automation.stopLoss || automation.takeProfit;

  if (!hasAutomation) return null;

  return (
    <div className="flex flex-wrap gap-1">
      {automation.autoRebalance && (
        <div className="flex items-center gap-1 rounded-full bg-blue-500/20 px-2 py-0.5 text-xs text-blue-400">
          <RefreshCw className="h-3 w-3" />
          <span>Rebalance</span>
        </div>
      )}
      {automation.autoCompound && (
        <div className="flex items-center gap-1 rounded-full bg-purple-500/20 px-2 py-0.5 text-xs text-purple-400">
          <Coins className="h-3 w-3" />
          <span>Compound</span>
        </div>
      )}
      {automation.stopLoss && (
        <div className="flex items-center gap-1 rounded-full bg-red-500/20 px-2 py-0.5 text-xs text-red-400">
          <StopLossIcon className="h-3 w-3" />
          <span>Stop {automation.stopLossPercent}%</span>
        </div>
      )}
      {automation.takeProfit && (
        <div className="flex items-center gap-1 rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs text-emerald-400">
          <Target className="h-3 w-3" />
          <span>TP {automation.takeProfitPercent}%</span>
        </div>
      )}
    </div>
  );
}

function PriceRangeBar({ priceRange }: { priceRange: Position["priceRange"] }) {
  const { min, max, current, inRange } = priceRange;
  const position = Math.min(100, Math.max(0, ((current - min) / (max - min)) * 100));

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>${min.toLocaleString()}</span>
        <span className={inRange ? "text-emerald-400" : "text-amber-400"}>
          ${current.toLocaleString()}
        </span>
        <span>${max.toLocaleString()}</span>
      </div>
      <div className="relative h-2 rounded-full bg-muted">
        <div
          className={cn(
            "absolute inset-y-0 left-0 rounded-full",
            inRange ? "bg-gradient-to-r from-emerald-500 to-emerald-400" : "bg-amber-500"
          )}
          style={{ width: `${position}%` }}
        />
        <div
          className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${position}%` }}
        >
          <div className={cn(
            "h-3 w-3 rounded-full border-2 border-background",
            inRange ? "bg-emerald-400" : "bg-amber-400"
          )} />
        </div>
      </div>
    </div>
  );
}

function CompositionChart({ history, token0, token1 }: { history: number[]; token0: string; token1: string }) {
  const colors0 = tokenColors[token0] || { from: "from-gray-400", to: "to-gray-600" };
  const colors1 = tokenColors[token1] || { from: "from-gray-400", to: "to-gray-600" };

  return (
    <div className="space-y-1">
      <div className="text-xs text-muted-foreground">Composition History</div>
      <div className="flex h-12 items-end gap-0.5">
        {history.map((h, i) => (
          <div key={i} className="flex flex-1 flex-col gap-0.5">
            <div
              className={cn("rounded-t bg-gradient-to-t opacity-80", colors0.from, colors0.to)}
              style={{ height: `${h}%` }}
            />
            <div
              className={cn("rounded-b bg-gradient-to-t opacity-80", colors1.from, colors1.to)}
              style={{ height: `${100 - h}%` }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function PositionCard({ position, onManage, onAutomate, selected, onSelect }: PositionCardProps) {
  const isPositiveRoi = position.realRoi >= 0;
  const hasAutomation = position.automation.autoRebalance || position.automation.autoCompound;

  return (
    <div className={cn(
      "group relative overflow-hidden rounded-2xl border bg-card/80 p-5 backdrop-blur-sm transition-all hover:bg-card",
      selected ? "border-indigo-500 ring-1 ring-indigo-500/50" : "border-border/50 hover:border-border"
    )}>
      {/* Selection Checkbox */}
      {onSelect && (
        <div className="absolute left-3 top-3">
          <input
            type="checkbox"
            checked={selected}
            onChange={() => onSelect(position.id)}
            className="h-4 w-4 rounded border-border bg-background text-indigo-500 focus:ring-indigo-500"
          />
        </div>
      )}

      {/* Glow Effect */}
      <div className="absolute -inset-px -z-10 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 opacity-0 blur-xl transition-opacity group-hover:opacity-100" />

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            <TokenBadge symbol={position.token0} />
            <TokenBadge symbol={position.token1} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">{position.pool}</h3>
              <span className="rounded bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
                {position.feeTier}%
              </span>
            </div>
            <div className="mt-0.5 flex items-center gap-2">
              <ChainBadge chain={position.chain} />
              <span className="text-xs text-muted-foreground">{position.dex}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-2">
            {position.isInsured && (
              <div className="flex items-center gap-1 rounded-full bg-emerald-500/20 px-2 py-0.5">
                <Shield className="h-3 w-3 text-emerald-400" />
                <span className="text-xs font-medium text-emerald-400">Insured</span>
              </div>
            )}
            {hasAutomation && (
              <div className="flex items-center gap-1 rounded-full bg-indigo-500/20 px-2 py-0.5">
                <Zap className="h-3 w-3 text-indigo-400" />
                <span className="text-xs font-medium text-indigo-400">Automated</span>
              </div>
            )}
          </div>
          <AutomationBadges automation={position.automation} />
        </div>
      </div>

      {/* Price Range */}
      <div className="mt-4">
        <PriceRangeBar priceRange={position.priceRange} />
      </div>

      {/* Position Details Grid */}
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="space-y-3">
          <div className="rounded-lg bg-muted/50 p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Initial</span>
              <span className="text-xs text-muted-foreground">{position.initialDeposit.date}</span>
            </div>
            <p className="mt-1 text-lg font-semibold">
              ${position.initialDeposit.totalValueUsd.toLocaleString()}
            </p>
            <div className="mt-1 text-xs text-muted-foreground">
              {position.initialDeposit.token0.amount} {position.token0} + {position.initialDeposit.token1.amount.toLocaleString()} {position.token1}
            </div>
          </div>

          <div className="rounded-lg bg-muted/50 p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Current</span>
              <span className={cn(
                "text-xs font-medium",
                isPositiveRoi ? "text-emerald-400" : "text-red-400"
              )}>
                {isPositiveRoi ? "+" : ""}{position.realRoiPercent}%
              </span>
            </div>
            <p className="mt-1 text-lg font-semibold">
              ${position.currentPosition.totalValueUsd.toLocaleString()}
            </p>
            <div className="mt-1 text-xs text-muted-foreground">
              {position.currentPosition.token0.amount} {position.token0} + {position.currentPosition.token1.amount.toLocaleString()} {position.token1}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <CompositionChart
            history={position.compositionHistory}
            token0={position.token0}
            token1={position.token1}
          />

          {/* ROI Summary */}
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="text-xs text-muted-foreground">Fees Earned</p>
              <p className="font-medium text-emerald-400">+${position.feesEarned.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Unclaimed</p>
              <p className="font-medium text-amber-400">${position.unclaimedFees.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">IL Loss</p>
              <p className="font-medium text-red-400">-${position.ilLoss.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Insurance</p>
              <p className={cn(
                "font-medium",
                position.insuranceClaim > 0 ? "text-emerald-400" : "text-muted-foreground"
              )}>
                {position.insuranceClaim > 0 ? `+$${position.insuranceClaim.toLocaleString()}` : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-4">
        <div className="flex items-center gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">APY: </span>
            <span className="font-medium text-emerald-400">{position.estimatedApy}%</span>
          </div>
          <div>
            <span className="text-muted-foreground">Age: </span>
            <span className="font-medium">{position.daysActive}d</span>
          </div>
          <div className="flex items-center gap-1">
            {isPositiveRoi ? (
              <TrendingUp className="h-4 w-4 text-emerald-400" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-400" />
            )}
            <span className={cn(
              "font-semibold",
              isPositiveRoi ? "text-emerald-400" : "text-red-400"
            )}>
              {isPositiveRoi ? "+" : ""}${position.realRoi.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onAutomate?.(position)}
            className="flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-sm transition-colors hover:bg-muted"
          >
            <Settings2 className="h-4 w-4" />
            Automate
          </button>
          <button
            onClick={() => onManage?.(position)}
            className="rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 px-3 py-1.5 text-sm text-white transition-colors hover:from-indigo-600 hover:to-purple-700"
          >
            Manage
          </button>
        </div>
      </div>
    </div>
  );
}
