"use client";

import { useEffect, useState } from "react";

const stats = [
  {
    label: "Total Value Locked",
    value: 124500000,
    prefix: "$",
    suffix: "",
    format: "currency",
  },
  {
    label: "Positions Tracked",
    value: 12847,
    prefix: "",
    suffix: "",
    format: "number",
  },
  {
    label: "Average ROI",
    value: 34.7,
    prefix: "",
    suffix: "%",
    format: "percentage",
  },
  {
    label: "Insurance Pool",
    value: 8200000,
    prefix: "$",
    suffix: "",
    format: "currency",
  },
];

function formatValue(value: number, format: string): string {
  if (format === "currency") {
    if (value >= 1000000) {
      return (value / 1000000).toFixed(1) + "M";
    }
    return value.toLocaleString();
  }
  if (format === "percentage") {
    return value.toFixed(1);
  }
  return value.toLocaleString();
}

function AnimatedNumber({
  value,
  format,
}: {
  value: number;
  format: string;
}) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current += increment;
      if (step >= steps) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(current);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return <>{formatValue(displayValue, format)}</>;
}

export function StatsSection() {
  return (
    <section id="stats" className="relative py-24 sm:py-32">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent" />
        <div className="absolute left-1/4 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute right-1/4 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-indigo-400">
            Protocol Stats
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Trusted by thousands of LPs
          </p>
          <p className="mt-4 text-lg text-muted-foreground">
            Real-time metrics showcasing the growth and performance of Meta DEX.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 p-6 text-center backdrop-blur-sm"
            >
              {/* Gradient Border Effect */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10" />

              <div className="text-4xl font-bold">
                <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  {stat.prefix}
                  <AnimatedNumber value={stat.value} format={stat.format} />
                  {stat.suffix}
                </span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 rounded-2xl border border-border/50 bg-card/50 p-8 backdrop-blur-sm">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-400">99.9%</div>
              <p className="mt-1 text-sm text-muted-foreground">Uptime</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-400">&lt;0.5s</div>
              <p className="mt-1 text-sm text-muted-foreground">Average Response Time</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-400">5+</div>
              <p className="mt-1 text-sm text-muted-foreground">Integrated DEXs</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
