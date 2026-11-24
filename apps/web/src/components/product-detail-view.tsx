"use client"

import { Product } from "@/types/ecommerce"
import { getProductImages, getProductPrice, getProductCategory, getProductVendor, getLocalizedTitle } from "@/lib/payload"
import { useLocale } from "@/lib/locale-context"
import Link from "next/link"
import { Star, ShieldCheck, Truck, RefreshCw, Store, BadgeCheck } from "lucide-react"
import { ProductCard } from "@/components/product-card"
import { AddToCartDetail } from "@/app/products/[slug]/add-to-cart-detail"

interface ProductDetailViewProps {
  product: Product
  relatedProducts: Product[]
}

export function ProductDetailView({ product, relatedProducts }: ProductDetailViewProps) {
  const { locale, t } = useLocale()

  const images = getProductImages(product)
  const price = getProductPrice(product)
  const categoryTitle = getProductCategory(product, locale)
  const vendor = getProductVendor(product)
  const displayTitle = getLocalizedTitle(product, locale)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          {t.products.home}
        </Link>
        <span>/</span>
        <Link href="/products" className="hover:text-foreground">
          {t.products.products}
        </Link>
        <span>/</span>
        <span className="text-foreground font-medium truncate max-w-xs">{displayTitle}</span>
      </div>

      {/* Main Product Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
        {/* Images Gallery */}
        <div className="md:col-span-6 space-y-4">
          <div className="relative aspect-square rounded-2xl overflow-hidden border bg-secondary/20 shadow-md">
            <img
              src={images[0]}
              alt={displayTitle}
              className="h-full w-full object-cover"
            />
          </div>

          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {images.map((img, i) => (
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
              {categoryTitle}
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground leading-snug">
              {displayTitle}
            </h1>

            {/* Ratings */}
            <div className="flex items-center gap-2 mt-3">
              <span className="inline-flex items-center gap-1 rounded bg-emerald-700 px-2 py-0.5 text-xs font-bold text-white">
                <span>4.8</span>
                <Star className="h-3 w-3 fill-current" />
              </span>
              <span className="text-xs text-muted-foreground">
                {t.products.ratingsReviews.replace("{ratings}", "240").replace("{reviews}", "85")}
              </span>
            </div>
          </div>

          {/* Pricing */}
          <div className="p-4 rounded-xl bg-secondary/40 border space-y-1">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-extrabold text-foreground">₹{price}</span>
            </div>
            <p className="text-xs text-muted-foreground">
              {locale === "hi" ? "सभी कर सहित • मुफ़्त डिलीवरी" : "Inclusive of all taxes • Free Delivery"}
            </p>
          </div>

          {/* Add to Cart Component */}
          <AddToCartDetail product={product} />

          {/* Multi-Vendor Seller Information */}
          {vendor && (
            <div className="flex items-center justify-between p-3.5 rounded-xl border bg-secondary/30">
              <div className="flex items-center gap-2.5">
                <Store className="h-5 w-5 text-pink-600 shrink-0" />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-foreground">{vendor.name}</span>
                    {vendor.isVerified && <BadgeCheck className="h-3.5 w-3.5 text-pink-600 shrink-0" />}
                  </div>
                  <span className="text-[10px] text-muted-foreground">{t.products.trustedSupplier}</span>
                </div>
              </div>
            </div>
          )}

          {/* Trust Guarantees */}
          <div className="grid grid-cols-3 gap-2 border-t pt-6 text-center">
            <div className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-secondary/30">
              <Truck className="h-5 w-5 text-pink-600" />
              <span className="text-[11px] font-semibold text-foreground">{t.trust.freeDelivery}</span>
              <span className="text-[10px] text-muted-foreground">{t.trust.freeDeliverySub}</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-secondary/30">
              <RefreshCw className="h-5 w-5 text-emerald-600" />
              <span className="text-[11px] font-semibold text-foreground">{t.trust.returns}</span>
              <span className="text-[10px] text-muted-foreground">{t.trust.returnsSub}</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-secondary/30">
              <ShieldCheck className="h-5 w-5 text-purple-600" />
              <span className="text-[11px] font-semibold text-foreground">
                {locale === "hi" ? "असली उत्पाद" : "Authentic Product"}
              </span>
              <span className="text-[10px] text-muted-foreground">{t.products.verifiedSupplier}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6 pt-8 border-t">
          <h2 className="text-xl font-bold tracking-tight text-foreground">{t.products.similarProducts}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
