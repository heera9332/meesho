"use client"

import { useCart } from "@/lib/cart-context"
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react"
import Link from "next/link"

export function CartSheet() {
  const { items, isSheetOpen, setIsSheetOpen, removeItem, updateQuantity, subtotal, totalCount } = useCart()

  if (!isSheetOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={() => setIsSheetOpen(false)}
      />

      {/* Slide-in Panel */}
      <div className="relative w-full max-w-md bg-background h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-pink-600" />
            <h2 className="text-base font-bold">Shopping Cart ({totalCount})</h2>
          </div>
          <button
            onClick={() => setIsSheetOpen(false)}
            className="rounded-full p-1.5 hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="h-16 w-16 rounded-full bg-pink-50 flex items-center justify-center text-pink-600 mb-4">
                <ShoppingBag className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-base">Your cart is empty</h3>
              <p className="text-xs text-muted-foreground mt-1 max-w-xs">
                Explore thousands of top-quality products with lowest prices and free delivery!
              </p>
              <button
                onClick={() => setIsSheetOpen(false)}
                className="mt-6 rounded-lg bg-pink-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-pink-700"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.product.id} className="flex gap-4 border-b pb-4">
                <img
                  src={item.product.images[0]}
                  alt={item.product.title}
                  className="h-20 w-20 rounded-lg object-cover bg-secondary"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-semibold line-clamp-1">{item.product.title}</h4>
                    <p className="text-xs font-bold text-pink-600 mt-1">₹{item.product.price}</p>
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
            ))
          )}
        </div>

        {/* Footer with Checkout CTA */}
        {items.length > 0 && (
          <div className="border-t p-6 bg-secondary/20 space-y-4">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-emerald-600 font-medium">
                <span>Shipping</span>
                <span>FREE</span>
              </div>
              <div className="flex justify-between text-sm font-bold pt-2 border-t text-foreground">
                <span>Total Amount</span>
                <span>₹{subtotal}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/cart"
                onClick={() => setIsSheetOpen(false)}
                className="flex items-center justify-center rounded-lg border bg-background py-2.5 text-xs font-semibold hover:bg-secondary transition-colors"
              >
                View Full Cart
              </Link>
              <Link
                href="/checkout"
                onClick={() => setIsSheetOpen(false)}
                className="flex items-center justify-center gap-1.5 rounded-lg bg-pink-600 py-2.5 text-xs font-semibold text-white hover:bg-pink-700 transition-colors shadow-xs"
              >
                <span>Checkout</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
