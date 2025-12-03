import {
  BarChart3,
  Eye,
  Link2,
  MessageCircle,
  Shield,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "LP Analytics",
    description:
      "Track your LP position history with complete transparency. See exactly how your tokens shifted over time.",
    color: "from-indigo-500 to-indigo-600",
    iconColor: "text-indigo-400",
    bgColor: "bg-indigo-500/10",
  },
  {
    icon: TrendingUp,
    title: "Real ROI",
    description:
      "No more guessing. See your actual returns including fees earned, IL impact, and insurance payouts.",
    color: "from-emerald-500 to-emerald-600",
    iconColor: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
  },
  {
    icon: Eye,
    title: "Position Explorer",
    description:
      "Learn from successful LP providers. Analyze other positions and discover winning strategies.",
    color: "from-purple-500 to-purple-600",
    iconColor: "text-purple-400",
    bgColor: "bg-purple-500/10",
  },
  {
    icon: Shield,
    title: "IL Insurance",
    description:
      "Protect your positions from Impermanent Loss. Our modular insurance system covers up to 80% of IL.",
    color: "from-amber-500 to-amber-600",
    iconColor: "text-amber-400",
    bgColor: "bg-amber-500/10",
  },
  {
    icon: Zap,
    title: "Account Abstraction",
    description:
      "Smart accounts enable fully automated LP management. Set your strategy once and let automation handle rebalancing, compounding, and hedging.",
    color: "from-yellow-500 to-orange-500",
    iconColor: "text-yellow-400",
    bgColor: "bg-yellow-500/10",
    badge: "New",
  },
  {
    icon: MessageCircle,
    title: "Non-custodial Automation",
    description:
      "Your keys, your crypto. Automated strategies execute from your own wallet via Telegram—no deposits to third parties required.",
    color: "from-blue-400 to-blue-600",
    iconColor: "text-blue-400",
    bgColor: "bg-blue-500/10",
    badge: "New",
  },
  {
    icon: Link2,
    title: "Multichain DEX",
    description:
      "Access all major DEXs across multiple chains from one interface. Compare rates and execute seamlessly.",
    color: "from-cyan-500 to-cyan-600",
    iconColor: "text-cyan-400",
    bgColor: "bg-cyan-500/10",
  },
  {
    icon: Users,
    title: "Data-Driven Vaults",
    description:
      "Let our algorithms manage your LP. Automated strategies based on historical performance data.",
    color: "from-pink-500 to-pink-600",
    iconColor: "text-pink-400",
    bgColor: "bg-pink-500/10",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-24 sm:py-32">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-indigo-400">
            Features
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to LP with confidence
          </p>
          <p className="mt-4 text-lg text-muted-foreground">
            KAIROS provides the data and tools you need to make informed decisions
            about your liquidity positions.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-border hover:bg-card/80"
            >
              {/* Badge */}
              {"badge" in feature && feature.badge && (
                <div className="absolute right-4 top-4">
                  <span className="rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-2 py-0.5 text-xs font-medium text-white">
                    {feature.badge}
                  </span>
                </div>
              )}

              {/* Icon */}
              <div
                className={`inline-flex rounded-xl ${feature.bgColor} p-3`}
              >
                <feature.icon className={`h-6 w-6 ${feature.iconColor}`} />
              </div>

              {/* Content */}
              <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>

              {/* Hover Gradient */}
              <div
                className={`absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br ${feature.color} opacity-0 blur-xl transition-opacity group-hover:opacity-10`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
