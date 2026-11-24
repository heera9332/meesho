"use client"

import { Product, Category } from "@/types/ecommerce"
import { ProductCard } from "@/components/product-card"
import { getLocalizedTitle } from "@/lib/payload"
import { useLocale } from "@/lib/locale-context"
import Link from "next/link"

interface ProductsViewProps {
  products: Product[]
  categories: Category[]
  category?: string
}

export function ProductsView({ products, categories, category }: ProductsViewProps) {
  const { locale, t } = useLocale()

  const currentCategory = categories.find((c) => c.slug === category)
  const currentTitle = currentCategory
    ? getLocalizedTitle(currentCategory, locale)
    : t.products.catalogTitle

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Breadcrumb & Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
          <Link href="/" className="hover:text-foreground">
            {t.products.home}
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium truncate max-w-xs">{currentTitle}</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">{currentTitle}</h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              {t.products.showingProducts.replace("{count}", String(products.length))}
            </p>
          </div>
        </div>
      </div>

      {/* Category Pills Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <Link
          href="/products"
          className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
            !category
              ? "bg-pink-600 text-white shadow-xs"
              : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
          }`}
        >
          {t.products.allCategories}
        </Link>
        {categories.map((cat) => {
          const catTitle = getLocalizedTitle(cat, locale)
          return (
            <Link
              key={cat.id}
              href={`/products?category=${cat.slug}`}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                category === cat.slug
                  ? "bg-pink-600 text-white shadow-xs"
                  : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
              }`}
            >
              {catTitle}
            </Link>
          )
        })}
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="rounded-xl border border-dashed p-12 text-center my-8">
          <h3 className="font-semibold text-sm">{t.products.noProductsFound}</h3>
          <p className="text-xs text-muted-foreground mt-1">{t.products.noProductsSub}</p>
          <Link
            href="/products"
            className="mt-4 inline-block rounded-lg bg-pink-600 px-4 py-2 text-xs font-semibold text-white"
          >
            {t.products.viewAllProducts}
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
