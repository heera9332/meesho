import { getProductBySlug, getProducts } from "@/lib/payload"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Star, ShieldCheck, Truck, RefreshCw, ShoppingBag, Heart } from "lucide-react"
import { AddToCartDetail } from "./add-to-cart-detail"
import { ProductCard } from "@/components/product-card"

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const relatedProducts = (await getProducts()).filter((p) => p.id !== product.id).slice(0, 4)

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-foreground">Products</Link>
        <span>/</span>
        <span className="text-foreground font-medium truncate max-w-xs">{product.title}</span>
      </div>

      {/* Main Product Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
        {/* Images Gallery */}
        <div className="md:col-span-6 space-y-4">
          <div className="relative aspect-square rounded-2xl overflow-hidden border bg-secondary/20 shadow-md">
            <img
              src={product.images[0]}
              alt={product.title}
              className="h-full w-full object-cover"
            />
            {discountPercent && (
              <span className="absolute top-4 left-4 rounded-md bg-emerald-600 px-2.5 py-1 text-xs font-bold text-white shadow-md">
                {discountPercent}% OFF
              </span>
            )}
          </div>

          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {product.images.map((img, i) => (
                <div
                  key={i}
                  className="h-20 w-20 rounded-lg overflow-hidden border-2 border-pink-500 bg-secondary flex-shrink-0 cursor-pointer"
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info & Action */}
        <div className="md:col-span-6 space-y-6">
          <div>
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-secondary text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              {product.category}
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground leading-snug">
              {product.title}
            </h1>

            {/* Ratings */}
            <div className="flex items-center gap-2 mt-3">
              <span className="inline-flex items-center gap-1 rounded bg-emerald-700 px-2 py-0.5 text-xs font-bold text-white">
                <span>{product.rating ?? 4.8}</span>
                <Star className="h-3 w-3 fill-current" />
              </span>
              <span className="text-xs text-muted-foreground">
                {product.reviewsCount ?? 240} Ratings & 85 Reviews
              </span>
            </div>
          </div>

          {/* Pricing */}
          <div className="p-4 rounded-xl bg-secondary/40 border space-y-1">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-extrabold text-foreground">₹{product.price}</span>
              {product.originalPrice && (
                <span className="text-base text-muted-foreground line-through">
                  ₹{product.originalPrice}
                </span>
              )}
              {discountPercent && (
                <span className="text-sm font-bold text-emerald-600">
                  {discountPercent}% off
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground">Inclusive of all taxes • Free Delivery</p>
          </div>

          {/* Description */}
          {product.description && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-foreground">Product Details</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>
          )}

          {/* Add to Cart Component */}
          <AddToCartDetail product={product} />

          {/* Delivery & Trust Highlights */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t text-center">
            <div className="p-3 rounded-lg bg-card border flex flex-col items-center gap-1">
              <Truck className="h-4 w-4 text-pink-600" />
              <span className="text-[11px] font-semibold">Free Delivery</span>
              <span className="text-[10px] text-muted-foreground">Dispatched in 24 hrs</span>
            </div>
            <div className="p-3 rounded-lg bg-card border flex flex-col items-center gap-1">
              <RefreshCw className="h-4 w-4 text-pink-600" />
              <span className="text-[11px] font-semibold">7 Days Return</span>
              <span className="text-[10px] text-muted-foreground">No questions asked</span>
            </div>
            <div className="p-3 rounded-lg bg-card border flex flex-col items-center gap-1">
              <ShieldCheck className="h-4 w-4 text-pink-600" />
              <span className="text-[11px] font-semibold">Cash On Delivery</span>
              <span className="text-[10px] text-muted-foreground">Available on this item</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <section className="pt-12 border-t">
        <h2 className="text-xl font-bold tracking-tight mb-6">Similar Products You Might Like</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  )
}
