"use client"

import { useCart } from "@/lib/cart-context"
import { useState } from "react"
import Link from "next/link"
import { CheckCircle2, ShieldCheck, Truck, ArrowLeft } from "lucide-react"

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart()
  const [isOrdered, setIsOrdered] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "Aarav Sharma",
    phone: "9876543210",
    address: "Flat 402, Green Meadows Residency",
    city: "Bengaluru",
    postalCode: "560102",
    paymentMethod: "cod",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsOrdered(true)
    clearCart()
  }

  if (isOrdered) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="h-20 w-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <h1 className="text-3xl font-extrabold text-foreground">Order Successfully Placed!</h1>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          Thank you for shopping with us, <strong>{formData.fullName}</strong>! We've received your order and will dispatch it right away.
        </p>

        <div className="p-4 rounded-xl bg-secondary/50 border max-w-sm mx-auto text-left text-xs space-y-1">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Order ID:</span>
            <span className="font-mono font-bold">MEE-{Math.floor(100000 + Math.random() * 900000)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Payment:</span>
            <span className="font-semibold uppercase">{formData.paymentMethod === "cod" ? "Cash On Delivery" : "Online"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Delivery to:</span>
            <span>{formData.city} - {formData.postalCode}</span>
          </div>
        </div>

        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-pink-600 px-6 py-3 text-sm font-semibold text-white hover:bg-pink-700 shadow-md"
          >
            <span>Back to Store</span>
          </Link>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <h1 className="text-2xl font-bold">No Items to Checkout</h1>
        <p className="text-xs text-muted-foreground">Your cart is empty.</p>
        <Link href="/products" className="inline-block rounded-lg bg-pink-600 px-5 py-2.5 text-xs font-bold text-white">
          Browse Products
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Link href="/cart" className="flex items-center gap-1 hover:text-foreground">
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Cart</span>
        </Link>
      </div>

      <h1 className="text-2xl font-bold tracking-tight">Checkout & Shipping</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Shipping Form */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-2xl border bg-card shadow-xs space-y-4">
            <h3 className="font-bold text-base border-b pb-3 flex items-center gap-2">
              <Truck className="h-4 w-4 text-pink-600" />
              <span>Delivery Address</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold block">Full Name</label>
                <input
                  required
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full rounded-lg border bg-background px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-pink-500/20"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold block">Phone Number</label>
                <input
                  required
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full rounded-lg border bg-background px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-pink-500/20"
                />
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="font-semibold block">Street Address</label>
                <input
                  required
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full rounded-lg border bg-background px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-pink-500/20"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold block">City</label>
                <input
                  required
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full rounded-lg border bg-background px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-pink-500/20"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold block">Postal / PIN Code</label>
                <input
                  required
                  type="text"
                  value={formData.postalCode}
                  onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  className="w-full rounded-lg border bg-background px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-pink-500/20"
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="p-6 rounded-2xl border bg-card shadow-xs space-y-4">
            <h3 className="font-bold text-base border-b pb-3 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>Payment Option</span>
            </h3>

            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 rounded-xl border cursor-pointer hover:bg-secondary/40 transition-colors">
                <input
                  type="radio"
                  name="payment"
                  checked={formData.paymentMethod === "cod"}
                  onChange={() => setFormData({ ...formData, paymentMethod: "cod" })}
                  className="text-pink-600"
                />
                <div>
                  <span className="block text-xs font-bold">Cash On Delivery (COD)</span>
                  <span className="text-[11px] text-muted-foreground">Pay with cash or UPI upon delivery</span>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl border cursor-pointer hover:bg-secondary/40 transition-colors">
                <input
                  type="radio"
                  name="payment"
                  checked={formData.paymentMethod === "online"}
                  onChange={() => setFormData({ ...formData, paymentMethod: "online" })}
                  className="text-pink-600"
                />
                <div>
                  <span className="block text-xs font-bold">Stripe / Online UPI & Card</span>
                  <span className="text-[11px] text-muted-foreground">Secure payment processed via Payload CMS Stripe Adapter</span>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Order Summary Column */}
        <div className="lg:col-span-5">
          <div className="p-6 rounded-2xl border bg-card shadow-md space-y-4 sticky top-24">
            <h3 className="font-bold text-base border-b pb-3">Order Summary ({items.length} items)</h3>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.product.id} className="flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <img
                      src={item.product.images[0]}
                      alt=""
                      className="h-10 w-10 rounded-md object-cover bg-secondary"
                    />
                    <div>
                      <p className="font-medium line-clamp-1 max-w-[180px]">{item.product.title}</p>
                      <p className="text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-bold">₹{item.product.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-3 space-y-1.5 text-xs">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-emerald-600 font-medium">
                <span>Shipping</span>
                <span>FREE</span>
              </div>
              <div className="flex justify-between text-base font-bold text-foreground border-t pt-2">
                <span>Total Payable</span>
                <span>₹{subtotal}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-pink-600 py-3.5 text-sm font-bold text-white hover:bg-pink-700 shadow-md shadow-pink-600/20 active:scale-98 transition-all"
            >
              <span>Place Order (₹{subtotal})</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
