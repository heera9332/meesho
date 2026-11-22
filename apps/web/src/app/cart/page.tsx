"use client"

import { useCart } from "@/lib/cart-context"
import Link from "next/link"
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck } from "lucide-react"

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, totalCount, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="h-20 w-20 rounded-full bg-pink-50 text-pink-600 flex items-center justify-center mx-auto">
          <ShoppingBag className="h-10 w-10" />
        </div>
        <h1 className="text-2xl font-bold">Your Cart is Currently Empty</h1>
        <p className="text-xs text-muted-foreground max-w-sm mx-auto">
          You haven't added any items to your shopping cart yet. Start exploring great deals!
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 rounded-xl bg-pink-600 px-6 py-3 text-sm font-semibold text-white hover:bg-pink-700 shadow-md"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Shopping Cart</h1>
          <p className="text-xs text-muted-foreground">{totalCount} items in your basket</p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-muted-foreground hover:text-destructive transition-colors"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Items List */}
        <div className="lg:col-span-8 space-y-4">
          {items.map((item) => (
            <div
              key={item.product.id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl border bg-card shadow-xs"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.product.images[0]}
                  alt={item.product.title}
                  className="h-24 w-24 rounded-lg object-cover bg-secondary flex-shrink-0"
                />
                <div className="space-y-1">
                  <Link
                    href={`/products/${item.product.slug}`}
                    className="font-medium text-sm hover:text-pink-600 transition-colors line-clamp-1"
                  >
                    {item.product.title}
                  </Link>
                  <p className="text-xs text-muted-foreground">Category: {item.product.category}</p>
                  {item.selectedSize && (
                    <p className="text-xs text-muted-foreground">Size: {item.selectedSize}</p>
                  )}
                  <p className="text-sm font-bold text-pink-600">₹{item.product.price}</p>
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
                  ₹{item.product.price * item.quantity}
                </span>

                <button
                  onClick={() => removeItem(item.product.id)}
                  className="text-muted-foreground hover:text-destructive p-1"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-4">
          <div className="p-6 rounded-2xl border bg-card shadow-md space-y-4 sticky top-24">
            <h3 className="font-bold text-base border-b pb-3">Price Details</h3>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-muted-foreground">
                <span>Total Product Price</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Total Discounts</span>
                <span className="text-emerald-600">-₹0</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Delivery Fee</span>
                <span className="text-emerald-600 font-bold">FREE</span>
              </div>
              <div className="flex justify-between text-base font-bold text-foreground border-t pt-3">
                <span>Order Total</span>
                <span>₹{subtotal}</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/checkout"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-pink-600 py-3.5 text-sm font-bold text-white hover:bg-pink-700 shadow-md shadow-pink-600/20 active:scale-98 transition-all"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-muted-foreground justify-center pt-2">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>Safe & Secure 256-bit SSL Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
