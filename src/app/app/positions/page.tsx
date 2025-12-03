import { Plus } from "lucide-react";
import { PositionCard } from "@/components/app/position-card";
import { PortfolioSummary } from "@/components/app/portfolio-summary";
import { mockPositions, portfolioSummary } from "@/data/mock-positions";

export default function PositionsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/30 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">My Positions</h1>
            <p className="text-sm text-muted-foreground">
              Track and manage your LP positions across all DEXs
            </p>
          </div>
          <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:from-indigo-600 hover:to-purple-700">
            <Plus className="h-4 w-4" />
            New Position
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Portfolio Summary */}
        <PortfolioSummary summary={portfolioSummary} />

        {/* Positions List */}
        <div className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Active Positions</h2>
            <div className="flex gap-2">
              <select className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm">
                <option>All DEXs</option>
                <option>HyperSwap</option>
                <option>HyperDEX</option>
                <option>NovaSwap</option>
              </select>
              <select className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm">
                <option>Sort by: ROI</option>
                <option>Sort by: Value</option>
                <option>Sort by: Age</option>
              </select>
            </div>
          </div>

          <div className="grid gap-6">
            {mockPositions.map((position) => (
              <PositionCard key={position.id} position={position} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
