"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  {
    name: "Products",
    href: "#",
    hasDropdown: true,
    items: [
      { name: "LP Explorer", href: "/app/explore" },
      { name: "Analytics", href: "/app/analytics" },
      { name: "Vaults", href: "/app/vaults" },
      { name: "IL Insurance", href: "/app/vaults" },
    ],
  },
  { name: "Pricing", href: "/pricing" },
  {
    name: "Resources",
    href: "#",
    hasDropdown: true,
    items: [
      { name: "Documentation", href: "/docs" },
      { name: "API Reference", href: "/docs/api" },
      { name: "Tutorials", href: "/docs/tutorials" },
      { name: "FAQ", href: "/faq" },
    ],
  },
  { name: "Blog", href: "/blog" },
  {
    name: "Company",
    href: "#",
    hasDropdown: true,
    items: [
      { name: "About", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Contact", href: "/contact" },
    ],
  },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600">
              <span className="text-sm font-bold text-white">K</span>
            </div>
            <span className="text-lg font-bold">KAIROS</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.hasDropdown && setOpenDropdown(item.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
                    openDropdown === item.name && "bg-accent text-foreground"
                  )}
                >
                  {item.name}
                  {item.hasDropdown && (
                    <ChevronDown className={cn(
                      "h-4 w-4 transition-transform",
                      openDropdown === item.name && "rotate-180"
                    )} />
                  )}
                </Link>
                {item.hasDropdown && item.items && openDropdown === item.name && (
                  <div className="absolute left-0 top-full pt-2">
                    <div className="min-w-[180px] rounded-xl border border-border/50 bg-card/95 p-2 shadow-xl backdrop-blur-xl">
                      {item.items.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Launch App Button */}
          <div className="hidden items-center lg:flex">
            <Link href="/app">
              <Button
                size="sm"
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
              >
                Launch App
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "lg:hidden",
            isOpen ? "block" : "hidden"
          )}
        >
          <div className="space-y-1 pb-4 pt-2">
            {navItems.map((item) => (
              <div key={item.name}>
                <button
                  onClick={() => item.hasDropdown && setOpenDropdown(openDropdown === item.name ? null : item.name)}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-base text-muted-foreground hover:bg-accent hover:text-foreground"
                >
                  {item.name}
                  {item.hasDropdown && (
                    <ChevronDown className={cn(
                      "h-4 w-4 transition-transform",
                      openDropdown === item.name && "rotate-180"
                    )} />
                  )}
                </button>
                {item.hasDropdown && item.items && openDropdown === item.name && (
                  <div className="ml-4 space-y-1">
                    {item.items.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className="block rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="flex flex-col gap-2 px-3 pt-4">
              <Link href="/app">
                <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600">
                  Launch App
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
