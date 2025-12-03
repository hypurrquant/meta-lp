"use client";

import { BarChart3, PieChart, TrendingDown, TrendingUp } from "lucide-react";

const poolPerformance = [
  { pool: "ETH/USDC", avgRoi: 32.5, tvl: 45.2, volume: 8.9, risk: "Low" },
  { pool: "HYPE/USDC", avgRoi: 58.3, tvl: 12.8, volume: 3.2, risk: "Medium" },
  { pool: "BTC/USDC", avgRoi: 28.4, tvl: 32.1, volume: 5.6, risk: "Low" },
  { pool: "ETH/HYPE", avgRoi: 89.2, tvl: 8.5, volume: 2.1, risk: "High" },
  { pool: "USDC/USDT", avgRoi: 8.5, tvl: 28.9, volume: 12.4, risk: "Very Low" },
];

const marketOverview = [
  { label: "Total TVL", value: "$127.5M", change: "+12.3%", positive: true },
  { label: "24h Volume", value: "$32.2M", change: "+8.7%", positive: true },
  { label: "Active Positions", value: "4,808", change: "+156", positive: true },
  { label: "Avg IL", value: "-2.4%", change: "-0.3%", positive: true },
];

const riskColors: Record<string, string> = {
  "Very Low": "text-emerald-400 bg-emerald-500/20",
  Low: "text-green-400 bg-green-500/20",
  Medium: "text-amber-400 bg-amber-500/20",
  High: "text-red-400 bg-red-500/20",
};

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/30 px-6 py-4">
        <div>
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="text-sm text-muted-foreground">
            Deep insights into pool performance and market trends
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Market Overview */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {marketOverview.map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-border/50 bg-card/50 p-4 backdrop-blur-sm"
            >
              <p className="text-sm text-muted-foreground">{item.label}</p>
              <div className="mt-2 flex items-end justify-between">
                <p className="text-2xl font-bold">{item.value}</p>
                <div
                  className={`flex items-center gap-1 text-sm ${
                    item.positive ? "text-emerald-400" : "text-red-400"
                  }`}
                >
                  {item.positive ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  {item.change}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Pool Performance Table */}
          <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="border-b border-border/50 px-6 py-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-indigo-400" />
                <h2 className="text-lg font-semibold">Pool Performance</h2>
              </div>
            </div>
            <div className="p-6">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-muted-foreground">
                    <th className="pb-3 font-medium">Pool</th>
                    <th className="pb-3 font-medium text-right">Avg ROI</th>
                    <th className="pb-3 font-medium text-right">TVL</th>
                    <th className="pb-3 font-medium text-right">Risk</th>
                  </tr>
                </thead>
                <tbody>
                  {poolPerformance.map((pool) => (
                    <tr key={pool.pool} className="border-t border-border/50">
                      <td className="py-3 font-medium">{pool.pool}</td>
                      <td className="py-3 text-right text-emerald-400">
                        +{pool.avgRoi}%
                      </td>
                      <td className="py-3 text-right">${pool.tvl}M</td>
                      <td className="py-3 text-right">
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs ${riskColors[pool.risk]}`}
                        >
                          {pool.risk}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ROI Distribution Chart (Placeholder) */}
          <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="border-b border-border/50 px-6 py-4">
              <div className="flex items-center gap-2">
                <PieChart className="h-5 w-5 text-purple-400" />
                <h2 className="text-lg font-semibold">ROI Distribution</h2>
              </div>
            </div>
            <div className="flex h-[300px] items-center justify-center p-6">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-48 w-48 items-center justify-center rounded-full border-8 border-indigo-500/20">
                  <div className="flex h-32 w-32 items-center justify-center rounded-full border-8 border-purple-500/30">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600">
                      <span className="text-lg font-bold text-white">34%</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">Average Real ROI</p>
                <div className="mt-4 flex justify-center gap-4 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded bg-emerald-500"></div>
                    <span>Positive (78%)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded bg-red-500"></div>
                    <span>Negative (22%)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* IL Analysis */}
        <div className="mt-6 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm">
          <div className="border-b border-border/50 px-6 py-4">
            <h2 className="text-lg font-semibold">Impermanent Loss Analysis</h2>
          </div>
          <div className="p-6">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-lg bg-muted/50 p-4">
                <p className="text-sm text-muted-foreground">Average IL (All Pools)</p>
                <p className="mt-1 text-2xl font-bold text-red-400">-2.4%</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  Based on 12,847 positions
                </p>
              </div>
              <div className="rounded-lg bg-muted/50 p-4">
                <p className="text-sm text-muted-foreground">IL Insurance Saved</p>
                <p className="mt-1 text-2xl font-bold text-emerald-400">$1.2M</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  Total claims paid out
                </p>
              </div>
              <div className="rounded-lg bg-muted/50 p-4">
                <p className="text-sm text-muted-foreground">Lowest IL Pool</p>
                <p className="mt-1 text-2xl font-bold">USDC/USDT</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  -0.01% average IL
                </p>
              </div>
            </div>

            {/* IL by Pool Visual */}
            <div className="mt-6">
              <h3 className="mb-4 text-sm font-medium">IL by Pool (Last 30 Days)</h3>
              <div className="space-y-3">
                {[
                  { pool: "ETH/USDC", il: -2.8, width: 56 },
                  { pool: "HYPE/USDC", il: -4.2, width: 84 },
                  { pool: "BTC/USDC", il: -1.9, width: 38 },
                  { pool: "ETH/HYPE", il: -5.1, width: 100 },
                  { pool: "USDC/USDT", il: -0.01, width: 2 },
                ].map((item) => (
                  <div key={item.pool} className="flex items-center gap-4">
                    <span className="w-24 text-sm">{item.pool}</span>
                    <div className="flex-1">
                      <div className="h-4 rounded-full bg-muted">
                        <div
                          className="h-4 rounded-full bg-gradient-to-r from-red-500 to-red-400"
                          style={{ width: `${item.width}%` }}
                        ></div>
                      </div>
                    </div>
                    <span className="w-16 text-right text-sm text-red-400">
                      {item.il}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
