"use client"

import { useCart } from "@/lib/cart-context"
import { useLocale } from "@/lib/locale-context"
import { getProductImage, getProductPrice, getLocalizedTitle } from "@/lib/payload"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@repo/ui/components/sheet"
import { ShoppingBag, Minus, Plus, Trash2, ArrowRight } from "lucide-react"
import Link from "next/link"

export function CartSheet() {
  const { items, removeItem, updateQuantity, isSheetOpen, setIsSheetOpen, subtotal, totalCount } = useCart()
  const { locale, t } = useLocale()

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetContent className="flex flex-col justify-between w-full sm:max-w-md p-6">
        {/* Header */}
        <div>
          <SheetHeader className="flex flex-row items-center justify-between border-b pb-4 mb-4 pr-8">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-pink-600" />
              <SheetTitle className="text-base font-bold">
                {t.cart.title} ({totalCount})
              </SheetTitle>
              <SheetDescription className="sr-only">
                {t.cart.title}
              </SheetDescription>
            </div>
          </SheetHeader>

          {/* Cart Item List */}
          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
            {items.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <ShoppingBag className="h-12 w-12 text-muted-foreground/30 mx-auto" />
                <p className="text-sm font-semibold text-foreground">{t.cart.emptyTitle}</p>
                <p className="text-xs text-muted-foreground">{t.cart.emptySubtitle}</p>
                <button
                  onClick={() => setIsSheetOpen(false)}
                  className="mt-2 text-xs font-semibold text-pink-600 hover:underline"
                >
                  {t.cart.continueShopping}
                </button>
              </div>
            ) : (
              items.map((item) => {
                const price = getProductPrice(item.product)
                const imageUrl = getProductImage(item.product)
                const title = getLocalizedTitle(item.product, locale)

                return (
                  <div key={item.product.id} className="flex gap-4 border-b pb-4">
                    <img
                      src={imageUrl}
                      alt={title}
                      className="h-20 w-20 rounded-lg object-cover bg-secondary"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-xs font-semibold line-clamp-1">{title}</h4>
                        <p className="text-xs font-bold text-pink-600 mt-1">₹{price}</p>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border rounded-md">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 hover:bg-secondary text-muted-foreground"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="px-2 text-xs font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 hover:bg-secondary text-muted-foreground"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="text-muted-foreground hover:text-destructive p-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>

        {/* Footer Subtotal & Action */}
        {items.length > 0 && (
          <div className="border-t pt-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{t.cart.subtotal}</span>
              <span className="font-bold text-foreground">₹{subtotal}</span>
            </div>
            <p className="text-[11px] text-muted-foreground">Shipping and taxes calculated at checkout.</p>
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/cart"
                onClick={() => setIsSheetOpen(false)}
                className="flex items-center justify-center rounded-xl border py-2.5 px-3 text-xs font-semibold hover:bg-secondary transition-all"
              >
                {t.cart.title}
              </Link>
              <Link
                href="/checkout"
                onClick={() => setIsSheetOpen(false)}
                className="flex items-center justify-center gap-1.5 rounded-xl bg-pink-600 py-2.5 px-3 text-xs font-semibold text-white shadow-md shadow-pink-600/20 hover:bg-pink-700 transition-all"
              >
                <span>{t.checkout.title}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
