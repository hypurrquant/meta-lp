"use client";

import { ArrowRight, BarChart3, MessageCircle, Shield, TrendingUp, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-16">
      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-3xl" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="mx-auto flex max-w-7xl flex-col items-center px-4 pt-20 sm:px-6 sm:pt-32 lg:px-8">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-sm text-indigo-400">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-500"></span>
          </span>
          Now Live on 12+ Chains
        </div>

        {/* Main Heading */}
        <h1 className="max-w-4xl text-center text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            DeFi Expert
          </span>
          -Level Yields.{" "}
          <br className="hidden sm:block" />
          Zero Expertise Needed.
        </h1>

        {/* Subheading */}
        <p className="mt-6 max-w-2xl text-center text-lg text-muted-foreground sm:text-xl">
          True passive income. Copy winning strategies, stay protected, and let your money work for you.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link href="/app">
            <Button
              size="lg"
              className="bg-gradient-to-r from-indigo-500 to-purple-600 px-8 text-base hover:from-indigo-600 hover:to-purple-700"
            >
              Launch App
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Feature Pills */}
        <div className="mt-16 flex flex-wrap justify-center gap-3">
          <div className="flex items-center gap-2 rounded-full border border-border/50 bg-card/50 px-4 py-2 backdrop-blur-sm">
            <BarChart3 className="h-4 w-4 text-indigo-400" />
            <span className="text-sm">Real ROI Tracking</span>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-border/50 bg-card/50 px-4 py-2 backdrop-blur-sm">
            <Shield className="h-4 w-4 text-emerald-400" />
            <span className="text-sm">IL Insurance</span>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-border/50 bg-card/50 px-4 py-2 backdrop-blur-sm">
            <TrendingUp className="h-4 w-4 text-purple-400" />
            <span className="text-sm">Multichain DEX</span>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 backdrop-blur-sm">
            <Zap className="h-4 w-4 text-yellow-400" />
            <span className="text-sm">Account Abstraction</span>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 backdrop-blur-sm">
            <MessageCircle className="h-4 w-4 text-blue-400" />
            <span className="text-sm">Non-custodial Automation</span>
          </div>
        </div>

        {/* Hero Visual - Mock LP Position Card */}
        <div className="mt-16 w-full max-w-3xl">
          <div className="relative rounded-2xl border border-border/50 bg-card/80 p-6 shadow-2xl backdrop-blur-sm">
            {/* Glow Effect */}
            <div className="absolute -inset-px -z-10 rounded-2xl bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 blur-xl" />

            {/* Card Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-blue-600 text-xs font-bold text-white ring-2 ring-background">
                    ETH
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-green-600 text-xs font-bold text-white ring-2 ring-background">
                    USDC
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">ETH / USDC</h3>
                    <span className="rounded bg-indigo-500/20 px-2 py-0.5 text-xs text-indigo-400">
                      Uniswap V3
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">Active for 45 days</p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-emerald-500/20 px-3 py-1">
                <Shield className="h-4 w-4 text-emerald-400" />
                <span className="text-sm font-medium text-emerald-400">IL Protected</span>
              </div>
            </div>

            {/* Total Value & Position */}
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div className="space-y-4">
                {/* Total Position Value */}
                <div className="rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 p-4">
                  <p className="text-sm text-muted-foreground">Total Position Value</p>
                  <p className="mt-1 text-3xl font-bold">$6,426.32</p>
                  <p className="mt-1 text-sm text-emerald-400">+$426.32 (+7.1%)</p>
                </div>
                {/* Current Composition - Hedged at lower tick, mostly ETH */}
                <div>
                  <p className="text-sm text-muted-foreground">Current Position (Hedged)</p>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-gradient-to-br from-blue-400 to-blue-600" />
                        <span className="text-sm">ETH</span>
                      </div>
                      <span className="text-sm font-medium">2.8 ETH ($5,600)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-gradient-to-br from-green-400 to-green-600" />
                        <span className="text-sm">USDC</span>
                      </div>
                      <span className="text-sm font-medium">826.32 USDC</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Range Chart - Fixed/Hedged Position */}
              <div className="flex flex-col justify-center rounded-xl bg-muted/50 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Price Range (Protected)</span>
                  <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-xs text-emerald-400">In Range</span>
                </div>
                {/* Range Visualization */}
                <div className="relative mt-2 h-20">
                  {/* Price range bar */}
                  <div className="absolute left-0 right-0 top-1/2 h-2 -translate-y-1/2 rounded-full bg-muted" />
                  {/* Active range */}
                  <div className="absolute left-[15%] right-[25%] top-1/2 h-2 -translate-y-1/2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
                  {/* Current price marker */}
                  <div className="absolute left-[35%] top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="flex flex-col items-center">
                      <div className="h-8 w-0.5 bg-emerald-400" />
                      <div className="mt-1 whitespace-nowrap text-xs text-emerald-400">$2,000</div>
                    </div>
                  </div>
                  {/* Lower tick - hedge point */}
                  <div className="absolute left-[15%] top-0 text-xs text-muted-foreground">
                    <div className="flex flex-col items-center">
                      <span>$1,800</span>
                      <span className="text-[10px] text-amber-400">Hedge</span>
                    </div>
                  </div>
                  {/* Upper tick */}
                  <div className="absolute right-[25%] top-0 text-xs text-muted-foreground">$2,400</div>
                </div>
                <p className="mt-4 text-center text-xs text-muted-foreground">
                  Lower tick hedge protects against downside
                </p>
              </div>
            </div>

            {/* ROI Summary */}
            <div className="mt-6 grid grid-cols-2 gap-4 rounded-xl bg-muted/50 p-4 sm:grid-cols-4">
              <div>
                <p className="text-xs text-muted-foreground">Fees Earned</p>
                <p className="text-lg font-semibold text-emerald-400">+$450.32</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">IL Loss</p>
                <p className="text-lg font-semibold text-red-400">-$120.00</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">IL Protected</p>
                <p className="text-lg font-semibold text-emerald-400">+$96.00</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Net Profit</p>
                <p className="text-lg font-semibold text-emerald-400">+$426.32</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
