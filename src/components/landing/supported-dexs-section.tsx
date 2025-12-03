"use client";

// Major DEXs
const majorDexs = [
  { name: "Uniswap", gradient: "from-pink-500 to-pink-600" },
  { name: "Aerodrome", gradient: "from-blue-500 to-blue-600" },
  { name: "PancakeSwap", gradient: "from-amber-400 to-amber-500" },
  { name: "SushiSwap", gradient: "from-indigo-500 to-purple-600" },
  { name: "Curve", gradient: "from-red-500 to-red-600" },
  { name: "Balancer", gradient: "from-gray-700 to-gray-800" },
  { name: "Trader Joe", gradient: "from-red-400 to-orange-500" },
  { name: "Velodrome", gradient: "from-white to-gray-200" },
  { name: "Camelot", gradient: "from-amber-600 to-amber-700" },
  { name: "Raydium", gradient: "from-purple-500 to-blue-500" },
];

// HyperEVM DEXs
const hyperEvmDexs = [
  { name: "HyperSwap", gradient: "from-cyan-400 to-blue-500" },
  { name: "KittenSwap", gradient: "from-pink-400 to-rose-500" },
  { name: "HyperDEX", gradient: "from-purple-500 to-pink-500" },
  { name: "NovaSwap", gradient: "from-orange-500 to-red-500" },
  { name: "AstroFinance", gradient: "from-green-500 to-emerald-500" },
  { name: "VelocityDEX", gradient: "from-indigo-500 to-violet-500" },
];

// Chains
const chains = [
  { name: "Ethereum", color: "from-blue-400 to-blue-600" },
  { name: "Arbitrum", color: "from-blue-500 to-cyan-400" },
  { name: "Base", color: "from-blue-600 to-blue-700" },
  { name: "Optimism", color: "from-red-500 to-red-600" },
  { name: "Polygon", color: "from-purple-500 to-purple-600" },
  { name: "BNB Chain", color: "from-yellow-400 to-yellow-500" },
  { name: "Avalanche", color: "from-red-500 to-red-600" },
  { name: "Solana", color: "from-purple-400 to-green-400" },
  { name: "HyperEVM", color: "from-emerald-400 to-cyan-500" },
  { name: "Fantom", color: "from-blue-400 to-blue-500" },
  { name: "zkSync", color: "from-purple-500 to-indigo-600" },
  { name: "Scroll", color: "from-amber-500 to-orange-500" },
];

function MarqueeRow({ items, direction = "left", speed = 30 }: { items: typeof majorDexs; direction?: "left" | "right"; speed?: number }) {
  const duplicatedItems = [...items, ...items, ...items];

  return (
    <div className="relative flex overflow-hidden">
      <div
        className={`flex gap-4 ${direction === "left" ? "animate-marquee-left" : "animate-marquee-right"}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {duplicatedItems.map((item, index) => (
          <div
            key={`${item.name}-${index}`}
            className="flex shrink-0 items-center gap-3 rounded-full border border-border/50 bg-card/50 px-4 py-2 backdrop-blur-sm"
          >
            <div className={`flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br ${item.gradient}`}>
              <span className="text-xs font-bold text-white">{item.name.charAt(0)}</span>
            </div>
            <span className="text-sm font-medium">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChainMarquee() {
  const duplicatedChains = [...chains, ...chains, ...chains];

  return (
    <div className="relative flex overflow-hidden py-4">
      <div
        className="flex gap-6 animate-marquee-left"
        style={{ animationDuration: "40s" }}
      >
        {duplicatedChains.map((chain, index) => (
          <div
            key={`${chain.name}-${index}`}
            className="flex shrink-0 flex-col items-center gap-2"
          >
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${chain.color} shadow-lg`}>
              <span className="text-lg font-bold text-white">{chain.name.charAt(0)}</span>
            </div>
            <span className="text-xs text-muted-foreground">{chain.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SupportedDexsSection() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-indigo-400">
            Multichain Integration
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            One Interface. All DEXs.{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Multichain.
            </span>
          </p>
          <p className="mt-4 text-lg text-muted-foreground">
            Access every major DEX across all chains through KAIROS.
            Compare rates, track positions, and optimize yields seamlessly.
          </p>
        </div>

        {/* DEX Marquees */}
        <div className="mt-16 space-y-4">
          {/* Major DEXs - Row 1 */}
          <MarqueeRow items={majorDexs} direction="left" speed={35} />

          {/* HyperEVM + More DEXs - Row 2 */}
          <MarqueeRow items={[...hyperEvmDexs, ...majorDexs.slice(0, 4)]} direction="right" speed={40} />
        </div>

        {/* Chains Section */}
        <div className="mt-20">
          <div className="text-center mb-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-indigo-400">
              Supported Chains
            </p>
          </div>

          {/* Chain Marquee */}
          <ChainMarquee />
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 rounded-2xl border border-border/50 bg-card/30 p-8 backdrop-blur-sm">
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              20+
            </div>
            <p className="mt-1 text-sm text-muted-foreground">Integrated DEXs</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              12+
            </div>
            <p className="mt-1 text-sm text-muted-foreground">Supported Chains</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              1
            </div>
            <p className="mt-1 text-sm text-muted-foreground">Unified Interface</p>
          </div>
        </div>
      </div>

      {/* CSS for marquee animation */}
      <style jsx>{`
        @keyframes marquee-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        @keyframes marquee-right {
          0% {
            transform: translateX(-33.333%);
          }
          100% {
            transform: translateX(0);
          }
        }
        .animate-marquee-left {
          animation: marquee-left linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-right linear infinite;
        }
      `}</style>
    </section>
  );
}
