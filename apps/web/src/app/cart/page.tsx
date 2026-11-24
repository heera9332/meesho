"use client"

import { useCart } from "@/lib/cart-context"
import { useLocale } from "@/lib/locale-context"
import { getProductImage, getProductPrice, getProductCategory, getLocalizedTitle } from "@/lib/payload"
import Link from "next/link"
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag, ShieldCheck } from "lucide-react"

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, totalCount } = useCart()
  const { locale, t } = useLocale()

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-4">
        <div className="h-20 w-20 rounded-full bg-pink-50 dark:bg-pink-950/40 text-pink-600 flex items-center justify-center mx-auto">
          <ShoppingBag className="h-10 w-10" />
        </div>
        <h2 className="text-xl font-bold tracking-tight text-foreground">{t.cart.emptyTitle}</h2>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-sm mx-auto">
          {t.cart.emptySubtitle}
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 rounded-xl bg-pink-600 px-6 py-3 text-xs sm:text-sm font-semibold text-white shadow-md hover:bg-pink-700 transition-all"
        >
          <span>{t.cart.continueShopping}</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">{t.cart.title}</h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          {totalCount} {totalCount === 1 ? t.cart.item : t.cart.items}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Items List */}
        <div className="lg:col-span-8 space-y-4">
          {items.map((item) => {
            const price = getProductPrice(item.product)
            const imageUrl = getProductImage(item.product)
            const category = getProductCategory(item.product, locale)
            const title = getLocalizedTitle(item.product, locale)

            return (
              <div
                key={item.product.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl border bg-card shadow-xs"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={imageUrl}
                    alt={title}
                    className="h-24 w-24 rounded-lg object-cover bg-secondary flex-shrink-0"
                  />
                  <div className="space-y-1">
                    <Link
                      href={`/products/${item.product.slug}`}
                      className="font-medium text-sm hover:text-pink-600 transition-colors line-clamp-1"
                    >
                      {title}
                    </Link>
                    <p className="text-xs text-muted-foreground">{category}</p>
                    {item.selectedSize && (
                      <p className="text-xs text-muted-foreground">
                        {locale === "hi" ? "साइज़" : "Size"}: {item.selectedSize}
                      </p>
                    )}
                    <p className="text-sm font-bold text-pink-600">₹{price}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-0 pt-3 sm:pt-0">
                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="p-1.5 hover:bg-secondary text-muted-foreground"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="px-3 text-xs font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="p-1.5 hover:bg-secondary text-muted-foreground"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <span className="text-sm font-bold min-w-[70px] text-right">
                    ₹{price * item.quantity}
                  </span>

                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="text-muted-foreground hover:text-destructive p-1"
                    title={t.cart.remove}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Order Summary Checkout Card */}
        <div className="lg:col-span-4">
          <div className="p-6 rounded-2xl border bg-card shadow-md space-y-4 sticky top-24">
            <h3 className="font-bold text-base border-b pb-3">
              {locale === "hi" ? "मूल्य विवरण" : "Price Details"}
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-muted-foreground">
                <span>{t.cart.subtotal}</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-emerald-600 font-medium">
                <span>{t.cart.freeDelivery}</span>
                <span>{t.cart.free}</span>
              </div>
              <div className="border-t pt-2 flex justify-between text-base font-bold text-foreground">
                <span>{t.cart.total}</span>
                <span>₹{subtotal}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-pink-600 py-3 text-xs sm:text-sm font-semibold text-white shadow-md shadow-pink-600/20 hover:bg-pink-700 active:scale-98 transition-all"
            >
              <span>{t.cart.proceedToCheckout}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <div className="flex items-center justify-center gap-2 text-[11px] text-muted-foreground pt-2">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>{t.trust.securePayments}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
