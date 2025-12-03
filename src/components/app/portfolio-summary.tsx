"use client";

import { DollarSign, PiggyBank, Shield, TrendingUp } from "lucide-react";
import type { portfolioSummary as PortfolioSummaryType } from "@/data/mock-positions";

interface PortfolioSummaryProps {
  summary: typeof PortfolioSummaryType;
}

export function PortfolioSummary({ summary }: PortfolioSummaryProps) {
  const stats = [
    {
      label: "Total Value",
      value: `$${summary.totalValueUsd.toLocaleString()}`,
      icon: DollarSign,
      color: "text-foreground",
      bgColor: "bg-indigo-500/10",
      iconColor: "text-indigo-400",
    },
    {
      label: "Total Fees Earned",
      value: `+$${summary.totalFeesEarned.toLocaleString()}`,
      icon: PiggyBank,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      iconColor: "text-emerald-400",
    },
    {
      label: "Real ROI",
      value: `+$${summary.totalRealRoi.toLocaleString()}`,
      icon: TrendingUp,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      iconColor: "text-emerald-400",
    },
    {
      label: "Insured Positions",
      value: `${summary.insuredCount}/${summary.positionCount}`,
      icon: Shield,
      color: "text-foreground",
      bgColor: "bg-amber-500/10",
      iconColor: "text-amber-400",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-xl border border-border/50 bg-card/50 p-4 backdrop-blur-sm"
        >
          <div className="flex items-center gap-3">
            <div className={`rounded-lg ${stat.bgColor} p-2`}>
              <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className={`text-xl font-semibold ${stat.color}`}>{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
