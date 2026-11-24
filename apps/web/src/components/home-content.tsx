"use client"

import { Product, Category } from "@/types/ecommerce"
import { Hero } from "@/components/hero"
import { ProductCard } from "@/components/product-card"
import { getCategoryImage, getLocalizedTitle } from "@/lib/payload"
import { useLocale } from "@/lib/locale-context"
import { ArrowRight, ShieldCheck, Truck, RefreshCw, Headphones } from "lucide-react"
import Link from "next/link"

interface HomeContentProps {
  categories: Category[]
  products: Product[]
}

export function HomeContent({ categories, products }: HomeContentProps) {
  const { locale, t } = useLocale()

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Banner Carousel / Showcase */}
      <Hero />

      {/* Trust & Guarantee Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 sm:p-6 rounded-2xl bg-secondary/50 border shadow-xs">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-pink-100 text-pink-600 dark:bg-pink-950/50">
              <Truck className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-foreground">{t.trust.freeDelivery}</h4>
              <p className="text-[11px] text-muted-foreground">{t.trust.freeDeliverySub}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950/50">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-foreground">{t.trust.lowestPrices}</h4>
              <p className="text-[11px] text-muted-foreground">{t.trust.lowestPricesSub}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-950/50">
              <RefreshCw className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-foreground">{t.trust.returns}</h4>
              <p className="text-[11px] text-muted-foreground">{t.trust.returnsSub}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-950/50">
              <Headphones className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-foreground">{t.trust.support}</h4>
              <p className="text-[11px] text-muted-foreground">{t.trust.supportSub}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Top Categories Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              {t.categories.title}
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              {t.categories.subtitle}
            </p>
          </div>
          <Link
            href="/products"
            className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-pink-600 hover:text-pink-700 hover:underline"
          >
            <span>{t.categories.viewAll}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {categories.map((category) => {
            const categoryTitle = getLocalizedTitle(category, locale)
            return (
              <Link
                key={category.id}
                href={`/products?category=${category.slug}`}
                className="group flex flex-col items-center rounded-xl border bg-card p-4 text-center shadow-xs hover:shadow-md hover:border-pink-300 transition-all"
              >
                <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-full overflow-hidden bg-secondary mb-3 shadow-inner">
                  <img
                    src={getCategoryImage(category)}
                    alt={categoryTitle}
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-xs sm:text-sm font-semibold text-foreground group-hover:text-pink-600 transition-colors">
                  {categoryTitle}
                </h3>
                {category.subcategories?.totalDocs ? (
                  <span className="text-[11px] text-muted-foreground mt-0.5">
                    {category.subcategories.totalDocs}+ {t.categories.items}
                  </span>
                ) : null}
              </Link>
            )
          })}
        </div>
      </section>

      {/* Featured Products Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              {locale === "hi" ? "ट्रेंडिंग बजट डील्स" : "Trending Products For You"}
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              {locale === "hi" ? "दैनिक खरीदारी के लिए चुनिंदा उच्च रेटिंग वाले उत्पाद" : "Most loved products across India with authentic customer reviews"}
            </p>
          </div>
          <Link
            href="/products"
            className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-pink-600 hover:text-pink-700 hover:underline"
          >
            <span>{t.categories.viewAll}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Payload CMS Integration Highlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-transparent p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-pink-100 text-pink-700 dark:bg-pink-950 dark:text-pink-300 text-xs font-semibold">
              Full Stack Payload Architecture
            </span>
            <h3 className="text-xl font-bold text-foreground">
              Powered by Payload CMS 3.x & PostgreSQL (Multi-Locale Enabled)
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-xl">
              {locale === "hi"
                ? "पेलोड CMS के माध्यम से बहुभाषी उत्पाद, श्रेणियां और सामग्री प्रबंधित करें।"
                : "Manage multi-lingual products, categories, orders, and content using embedded Payload CMS powered by PostgreSQL."}
            </p>
          </div>
          <a
            href="http://localhost:3001/admin"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-foreground px-6 py-3 text-xs sm:text-sm font-semibold text-background shadow-md hover:opacity-90 active:scale-95 transition-all whitespace-nowrap"
          >
            {t.nav.payloadAdmin} →
          </a>
        </div>
      </section>
    </div>
  )
}
