import Link from "next/link"
import { Hero } from "@/components/hero"
import { ProductCard } from "@/components/product-card"
import { getProducts, getCategories } from "@/lib/payload"
import { ArrowRight, Flame, Sparkles, Tag } from "lucide-react"

export default async function HomePage() {
  const products = await getProducts()
  const categories = await getCategories()

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Showcase */}
      <Hero />

      {/* Categories Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-pink-600" />
              <span>Shop by Popular Categories</span>
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">Explore our most popular departments</p>
          </div>
          <Link
            href="/products"
            className="text-xs font-semibold text-pink-600 hover:text-pink-700 flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.slug}`}
              className="group flex flex-col items-center rounded-xl border bg-card p-4 text-center shadow-xs hover:shadow-md hover:border-pink-300 transition-all"
            >
              <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-full overflow-hidden bg-secondary mb-3 shadow-inner">
                <img
                  src={category.image}
                  alt={category.title}
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xs sm:text-sm font-semibold text-foreground group-hover:text-pink-600 transition-colors">
                {category.title}
              </h3>
              {category.itemCount && (
                <span className="text-[11px] text-muted-foreground mt-0.5">
                  {category.itemCount}+ items
                </span>
              )}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <Flame className="h-5 w-5 text-rose-500 fill-current" />
              <span>Trending Best Sellers</span>
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">Top rated products loved by thousands of shoppers</p>
          </div>
          <Link
            href="/products"
            className="text-xs font-semibold text-pink-600 hover:text-pink-700 flex items-center gap-1"
          >
            <span>See more deals</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Promo Banner Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-pink-600 via-rose-600 to-purple-700 p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold">
              <Tag className="h-3.5 w-3.5" />
              <span>Wholesale Pricing Guaranteed</span>
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Are you a Seller or Reseller?
            </h3>
            <p className="text-xs sm:text-sm text-white/90 max-w-xl">
              Manage your products, orders, categories, and customer data using the embedded Payload CMS powered by PostgreSQL.
            </p>
          </div>
          <a
            href="http://localhost:3001/admin"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-bold text-pink-600 hover:bg-white/95 shadow-md active:scale-95 transition-all whitespace-nowrap"
          >
            Access Payload Admin Panel
          </a>
        </div>
      </section>
    </div>
  )
}
