import { ArrowRight, BarChart2, Droplets, MessageCircle, Shield, Wallet, Zap } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: Wallet,
    title: "Connect Wallet",
    description:
      "Connect your wallet to access your LP positions across all integrated DEXs.",
  },
  {
    step: "02",
    icon: BarChart2,
    title: "Analyze Positions",
    description:
      "View detailed analytics for all your positions including historical data, real ROI, and IL tracking.",
  },
  {
    step: "03",
    icon: Droplets,
    title: "Provide Liquidity",
    description:
      "Make informed decisions and provide liquidity to the best performing pools across multiple DEXs.",
  },
  {
    step: "04",
    icon: Shield,
    title: "Enable IL Protection",
    description:
      "Protect your positions with IL Insurance. Hedge at lower tick to minimize downside risk.",
  },
  {
    step: "05",
    icon: Zap,
    title: "Enable Account Abstraction",
    description:
      "Set up your smart account for fully automated LP management. Define your strategy once and let it execute automatically.",
  },
  {
    step: "06",
    icon: MessageCircle,
    title: "Non-custodial Control",
    description:
      "Manage everything via Telegram while keeping full custody. Monitor, rebalance, and adjust your positions—your keys, always.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-indigo-400">
            How It Works
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Start earning in 6 simple steps
          </p>
          <p className="mt-4 text-lg text-muted-foreground">
            KAIROS makes liquidity provision simple, transparent, and protected.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-16">
          <div className="relative">
            {/* Connection Line */}
            <div className="absolute left-8 top-0 hidden h-full w-px bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 lg:left-1/2 lg:block lg:-translate-x-1/2" />

            <div className="space-y-12 lg:space-y-0">
              {steps.map((step, index) => (
                <div key={step.step} className="relative lg:grid lg:grid-cols-2 lg:gap-8">
                  {/* Step Number - Desktop */}
                  <div
                    className={`hidden lg:absolute lg:left-1/2 lg:top-0 lg:flex lg:h-12 lg:w-12 lg:-translate-x-1/2 lg:items-center lg:justify-center lg:rounded-full lg:border-4 lg:border-background lg:bg-gradient-to-br lg:from-indigo-500 lg:to-purple-600`}
                  >
                    <span className="text-sm font-bold text-white">{step.step}</span>
                  </div>

                  {/* Content */}
                  <div
                    className={`lg:pr-8 ${
                      index % 2 === 1 ? "lg:col-start-2 lg:pl-8 lg:pr-0" : ""
                    }`}
                  >
                    <div
                      className={`flex items-start gap-4 rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm ${
                        index % 2 === 1 ? "lg:flex-row-reverse lg:text-right" : ""
                      }`}
                    >
                      {/* Icon */}
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20">
                        <step.icon className="h-6 w-6 text-indigo-400" />
                      </div>

                      {/* Text */}
                      <div>
                        {/* Step Number - Mobile */}
                        <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-indigo-500/20 px-2.5 py-0.5 text-xs font-medium text-indigo-400 lg:hidden">
                          Step {step.step}
                        </div>
                        <h3 className="text-lg font-semibold">{step.title}</h3>
                        <p className="mt-2 text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Empty column for alternating layout */}
                  {index % 2 === 0 && <div className="hidden lg:block" />}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <a
            href="/app"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-3 font-medium text-white transition-all hover:from-indigo-600 hover:to-purple-700"
          >
            Get Started Now
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
