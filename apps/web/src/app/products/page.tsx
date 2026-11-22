import { getProducts, getCategories } from "@/lib/payload"
import { ProductCard } from "@/components/product-card"
import Link from "next/link"
import { Filter, SlidersHorizontal } from "lucide-react"

interface ProductsPageProps {
  searchParams: Promise<{ category?: string }>
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { category } = await searchParams
  const products = await getProducts(category)
  const categories = await getCategories()

  const currentCategory = categories.find((c) => c.slug === category)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Breadcrumb & Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <span className="text-foreground font-medium">
            {currentCategory ? currentCategory.title : "All Products"}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              {currentCategory ? currentCategory.title : "All Products Catalog"}
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Showing {products.length} products with free delivery
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
          All Categories
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/products?category=${cat.slug}`}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              category === cat.slug
                ? "bg-pink-600 text-white shadow-xs"
                : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
            }`}
          >
            {cat.title}
          </Link>
        ))}
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="rounded-xl border border-dashed p-12 text-center my-8">
          <h3 className="font-semibold text-sm">No products found in this category</h3>
          <p className="text-xs text-muted-foreground mt-1">Try selecting another category or check back soon.</p>
          <Link
            href="/products"
            className="mt-4 inline-block rounded-lg bg-pink-600 px-4 py-2 text-xs font-semibold text-white"
          >
            View All Products
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
