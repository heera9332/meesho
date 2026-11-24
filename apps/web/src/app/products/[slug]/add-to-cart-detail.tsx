"use client"

import { Product } from "@/types/ecommerce"
import { useCart } from "@/lib/cart-context"
import { useLocale } from "@/lib/locale-context"
import { ShoppingBag, Zap, Check } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function AddToCartDetail({ product }: { product: Product }) {
  const { addItem, setIsSheetOpen } = useCart()
  const { locale, t } = useLocale()
  const router = useRouter()
  const [selectedSize, setSelectedSize] = useState("M")
  const [isAdded, setIsAdded] = useState(false)

  const SIZES = ["S", "M", "L", "XL", "XXL"]

  const handleAddToCart = () => {
    addItem(product, 1, selectedSize)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  const handleBuyNow = () => {
    addItem(product, 1, selectedSize)
    router.push("/checkout")
  }

  return (
    <div className="space-y-4">
      {/* Select Size */}
      <div>
        <label className="text-xs font-semibold text-foreground block mb-2">
          {locale === "hi" ? "साइज़ चुनें" : "Select Size"}
        </label>
        <div className="flex gap-2">
          {SIZES.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`h-9 w-9 rounded-lg border text-xs font-bold transition-all ${
                selectedSize === size
                  ? "border-pink-600 bg-pink-50 text-pink-600 ring-2 ring-pink-500/20"
                  : "border-input bg-background hover:bg-secondary text-muted-foreground"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-2 gap-3 pt-2">
        <button
          onClick={handleAddToCart}
          className={`flex items-center justify-center gap-2 rounded-xl border py-3 px-4 text-xs sm:text-sm font-semibold transition-all ${
            isAdded
              ? "bg-emerald-600 text-white border-emerald-600"
              : "border-pink-600 text-pink-600 hover:bg-pink-50 active:scale-98"
          }`}
        >
          {isAdded ? (
            <>
              <Check className="h-4 w-4" />
              <span>{t.products.addedToCart}</span>
            </>
          ) : (
            <>
              <ShoppingBag className="h-4 w-4" />
              <span>{t.products.addToCart}</span>
            </>
          )}
        </button>

        <button
          onClick={handleBuyNow}
          className="flex items-center justify-center gap-2 rounded-xl bg-pink-600 py-3 px-4 text-xs sm:text-sm font-semibold text-white shadow-md shadow-pink-600/20 hover:bg-pink-700 active:scale-98 transition-all"
        >
          <Zap className="h-4 w-4" />
          <span>{locale === "hi" ? "अभी खरीदें" : "Buy Now"}</span>
        </button>
      </div>
    </div>
  )
}
