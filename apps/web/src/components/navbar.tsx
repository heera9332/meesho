"use client"

import Link from "next/link"
import { useState } from "react"
import { Search, ShoppingBag, Sparkles, ShieldCheck } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { useLocale } from "@/lib/locale-context"
import { LanguageSwitcher } from "./language-switcher"

export function Navbar() {
  const { totalCount, setIsSheetOpen } = useCart()
  const { t } = useLocale()
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur-md">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-pink-600 to-rose-500 py-1.5 px-4 text-center text-xs font-semibold text-white">
        <span className="flex items-center justify-center gap-2">
          <Sparkles className="h-3.5 w-3.5" />
          <span>{t.nav.topBanner}</span>
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="bg-gradient-to-br from-pink-600 to-rose-600 text-white font-extrabold text-2xl px-2.5 py-1 rounded-xl shadow-md">
              M
            </span>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">
                meesho
              </span>
              <span className="text-[10px] text-muted-foreground uppercase font-medium tracking-wider -mt-1">
                Ecommerce
              </span>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl mx-4 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder={t.nav.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-input bg-secondary/50 pl-10 pr-4 py-2 text-sm placeholder:text-muted-foreground focus:bg-background focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20 transition-all"
              />
            </div>
          </div>

          {/* Navigation Links & Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/products"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hidden sm:block"
            >
              {t.nav.shopAll}
            </Link>

            <a
              href="http://localhost:3001/admin"
              target="_blank"
              rel="noreferrer"
              className="hidden lg:flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md bg-secondary hover:bg-secondary/80 text-foreground transition-colors"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-pink-600" />
              {t.nav.payloadAdmin}
            </a>

            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Cart Trigger */}
            <button
              onClick={() => setIsSheetOpen(true)}
              className="relative p-2 rounded-full hover:bg-secondary transition-colors"
              aria-label={t.nav.cart}
            >
              <ShoppingBag className="h-5 w-5 text-foreground" />
              {totalCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-pink-600 text-[11px] font-bold text-white animate-scale-in">
                  {totalCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="pb-3 md:hidden">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder={t.nav.mobileSearchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-input bg-secondary/50 pl-10 pr-4 py-2 text-xs focus:bg-background focus:outline-none"
            />
          </div>
        </div>
      </div>
    </header>
  )
}
