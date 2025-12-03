import { Copy, ExternalLink, Filter, Search, Shield, Trophy } from "lucide-react";
import { leaderboardPositions, poolStats } from "@/data/mock-explore";
import { cn } from "@/lib/utils";

export default function ExplorePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/30 px-6 py-4">
        <div>
          <h1 className="text-2xl font-bold">Explore Positions</h1>
          <p className="text-sm text-muted-foreground">
            Discover winning strategies from top LP providers
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Pool Stats */}
        <div className="mb-8">
          <h2 className="mb-4 text-lg font-semibold">Top Pools</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {poolStats.map((pool) => (
              <div
                key={pool.pool}
                className="rounded-xl border border-border/50 bg-card/50 p-4 backdrop-blur-sm transition-all hover:border-border hover:bg-card/80"
              >
                <h3 className="font-semibold">{pool.pool}</h3>
                <div className="mt-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">TVL</span>
                    <span>${(pool.tvl / 1000000).toFixed(1)}M</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">24h Vol</span>
                    <span>${(pool.volume24h / 1000000).toFixed(1)}M</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Avg APY</span>
                    <span className="text-emerald-400">{pool.avgApy}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Positions</span>
                    <span>{pool.positions.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by address or pool..."
              className="w-full rounded-lg border border-border bg-background py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <select className="rounded-lg border border-border bg-background px-3 py-2 text-sm">
            <option>All DEXs</option>
            <option>HyperSwap</option>
            <option>HyperDEX</option>
            <option>NovaSwap</option>
            <option>AstroFinance</option>
            <option>VelocityDEX</option>
          </select>
          <select className="rounded-lg border border-border bg-background px-3 py-2 text-sm">
            <option>All Pools</option>
            <option>ETH/USDC</option>
            <option>HYPE/USDC</option>
            <option>BTC/USDC</option>
            <option>ETH/HYPE</option>
          </select>
          <select className="rounded-lg border border-border bg-background px-3 py-2 text-sm">
            <option>ROI: High to Low</option>
            <option>ROI: Low to High</option>
            <option>APY: High to Low</option>
            <option>Value: High to Low</option>
            <option>Duration: Longest</option>
          </select>
          <button className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm hover:bg-muted">
            <Filter className="h-4 w-4" />
            More Filters
          </button>
        </div>

        {/* Leaderboard */}
        <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm">
          <div className="border-b border-border/50 px-6 py-4">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-amber-400" />
              <h2 className="text-lg font-semibold">Position Leaderboard</h2>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50 text-left text-sm text-muted-foreground">
                  <th className="px-6 py-3 font-medium">Rank</th>
                  <th className="px-6 py-3 font-medium">Address</th>
                  <th className="px-6 py-3 font-medium">Pool</th>
                  <th className="px-6 py-3 font-medium">DEX</th>
                  <th className="px-6 py-3 font-medium text-right">Initial</th>
                  <th className="px-6 py-3 font-medium text-right">Current</th>
                  <th className="px-6 py-3 font-medium text-right">Real ROI</th>
                  <th className="px-6 py-3 font-medium text-right">APY</th>
                  <th className="px-6 py-3 font-medium text-right">Duration</th>
                  <th className="px-6 py-3 font-medium text-center">Insured</th>
                  <th className="px-6 py-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardPositions.map((position) => (
                  <tr
                    key={position.rank}
                    className="border-b border-border/50 transition-colors hover:bg-muted/50"
                  >
                    <td className="px-6 py-4">
                      <div
                        className={cn(
                          "flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold",
                          position.rank === 1 && "bg-amber-500/20 text-amber-400",
                          position.rank === 2 && "bg-slate-400/20 text-slate-400",
                          position.rank === 3 && "bg-orange-500/20 text-orange-400",
                          position.rank > 3 && "bg-muted text-muted-foreground"
                        )}
                      >
                        {position.rank}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm">{position.address}</span>
                        <button className="text-muted-foreground hover:text-foreground">
                          <Copy className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium">{position.pool}</td>
                    <td className="px-6 py-4">
                      <span className="rounded bg-indigo-500/20 px-2 py-0.5 text-xs text-indigo-400">
                        {position.dex}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-sm">
                      ${position.initialValueUsd.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right text-sm">
                      ${position.currentValueUsd.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="font-semibold text-emerald-400">
                        +{position.realRoiPercent}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-emerald-400">{position.estimatedApy}%</span>
                    </td>
                    <td className="px-6 py-4 text-right text-sm text-muted-foreground">
                      {position.durationDays}d
                    </td>
                    <td className="px-6 py-4 text-center">
                      {position.isInsured ? (
                        <Shield className="mx-auto h-4 w-4 text-emerald-400" />
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 px-3 py-1.5 text-xs font-medium text-white hover:from-indigo-600 hover:to-purple-700">
                          Copy
                        </button>
                        <button className="rounded-lg border border-border p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground">
                          <ExternalLink className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-border/50 px-6 py-4">
            <p className="text-sm text-muted-foreground">
              Showing 1-10 of 12,847 positions
            </p>
            <div className="flex gap-2">
              <button className="rounded-lg border border-border px-3 py-1.5 text-sm hover:bg-muted">
                Previous
              </button>
              <button className="rounded-lg border border-border px-3 py-1.5 text-sm hover:bg-muted">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
