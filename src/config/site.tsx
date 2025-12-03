import {
  BarChart3,
  Compass,
  type LucideIcon,
  Vault,
  Vote,
  Wallet,
} from "lucide-react";

export type SiteConfig = typeof siteConfig;
export type Navigation = {
  icon: LucideIcon;
  name: string;
  href: string;
};

export const siteConfig = {
  title: "KAIROS - DeFi Expert-Level Yields",
  description:
    "True passive income. Copy winning LP strategies, stay protected with IL insurance, and let your money work for you.",
};

export const navigations: Navigation[] = [
  {
    icon: Wallet,
    name: "My Positions",
    href: "/app/positions",
  },
  {
    icon: Compass,
    name: "Explore",
    href: "/app/explore",
  },
  {
    icon: Vault,
    name: "Vaults",
    href: "/app/vaults",
  },
  {
    icon: Vote,
    name: "Vote",
    href: "/app/vote",
  },
  {
    icon: BarChart3,
    name: "Analytics",
    href: "/app/analytics",
  },
];
