"use client"

import Link from "next/link"
import { Product } from "@/types/ecommerce"
import { useCart } from "@/lib/cart-context"
import { useLocale } from "@/lib/locale-context"
import { getProductImage, getProductPrice, getProductVendor, getLocalizedTitle } from "@/lib/payload"
import { Star, ShoppingBag, Check, BadgeCheck } from "lucide-react"
import { useState } from "react"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const { locale, t } = useLocale()
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 1500)
  }

  const price = getProductPrice(product)
  const imageUrl = getProductImage(product)
  const vendor = getProductVendor(product)
  const displayTitle = getLocalizedTitle(product, locale)

  return (
    <div className="group relative flex flex-col rounded-xl border bg-card overflow-hidden shadow-xs hover:shadow-lg transition-all duration-200">
      {/* Product Image */}
      <Link href={`/products/${product.slug}`} className="relative aspect-square w-full overflow-hidden bg-secondary/30">
        <img
          src={imageUrl}
          alt={displayTitle}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </Link>

      {/* Product Details */}
      <div className="flex flex-1 flex-col p-4 justify-between">
        <div>
          <Link href={`/products/${product.slug}`}>
            <h3 className="font-medium text-sm text-foreground line-clamp-2 group-hover:text-pink-600 transition-colors">
              {displayTitle}
            </h3>
          </Link>

          {vendor && (
            <div className="flex items-center gap-1 mt-1 text-[11px] text-muted-foreground">
              <span className="truncate max-w-[140px]">{vendor.name}</span>
              {vendor.isVerified && <BadgeCheck className="h-3 w-3 text-pink-600 shrink-0" />}
            </div>
          )}

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-1.5">
            <span className="inline-flex items-center gap-1 rounded bg-emerald-700 px-1.5 py-0.5 text-[11px] font-bold text-white">
              <span>4.7</span>
              <Star className="h-2.5 w-2.5 fill-current" />
            </span>
            <span className="text-[11px] text-muted-foreground">
              (150)
            </span>
          </div>
        </div>

        {/* Price & Add to Cart */}
        <div className="mt-4 pt-3 border-t flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold text-foreground">₹{price}</span>
            </div>
            <span className="text-[10px] text-emerald-600 font-semibold">{t.products.freeDeliveryBadge}</span>
          </div>

          <button
            onClick={handleAddToCart}
            className={`flex items-center justify-center p-2 rounded-lg transition-all ${
              isAdded
                ? "bg-emerald-600 text-white"
                : "bg-pink-600 text-white hover:bg-pink-700 active:scale-95 shadow-xs"
            }`}
            title={isAdded ? t.products.addedToCart : t.products.addToCart}
            aria-label={isAdded ? t.products.addedToCart : t.products.addToCart}
          >
            {isAdded ? <Check className="h-4 w-4" /> : <ShoppingBag className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </div>
  )
}
