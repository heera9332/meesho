"use client"

import { useCart } from "@/lib/cart-context"
import { getProductImage, getProductPrice } from "@/lib/payload"
import { useState } from "react"
import Link from "next/link"
import { CheckCircle2, ShieldCheck, Truck, ArrowLeft, CreditCard, Banknote } from "lucide-react"

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart()
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "Aarav Sharma",
    phone: "9876543210",
    address: "Flat 402, Lotus Heights, MG Road",
    city: "Bangalore",
    state: "Karnataka",
    postalCode: "560001",
    paymentMethod: "cod",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSuccess(true)
    clearCart()
  }

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="h-20 w-20 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center mx-auto">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Order Placed Successfully!</h1>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
            Thank you for ordering with Meesho. Your order ID is <span className="font-semibold text-foreground">#MSH-94821</span>. We will notify you once shipped!
          </p>
        </div>

        <div className="p-4 rounded-xl border bg-card text-left max-w-sm mx-auto space-y-2 text-xs">
          <p className="font-semibold text-foreground">Shipping To:</p>
          <p className="text-muted-foreground">{formData.fullName}</p>
          <p className="text-muted-foreground">{formData.address}, {formData.city}, {formData.state} - {formData.postalCode}</p>
          <p className="text-muted-foreground">Phone: {formData.phone}</p>
        </div>

        <Link
          href="/products"
          className="inline-block rounded-xl bg-pink-600 px-6 py-3 text-xs sm:text-sm font-semibold text-white shadow-md hover:bg-pink-700 transition-all"
        >
          Continue Shopping
        </Link>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold">No Items to Checkout</h2>
        <p className="text-xs text-muted-foreground">Please add items to your cart before proceeding to checkout.</p>
        <Link href="/products" className="text-xs font-semibold text-pink-600 hover:underline">
          Browse Catalog
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <Link href="/cart" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-3">
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Cart</span>
        </Link>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Secure Checkout</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Details */}
        <form onSubmit={handlePlaceOrder} className="lg:col-span-8 space-y-6">
          {/* Shipping Address */}
          <div className="p-6 rounded-2xl border bg-card shadow-xs space-y-4">
            <h3 className="font-bold text-base border-b pb-3 flex items-center gap-2">
              <Truck className="h-4 w-4 text-pink-600" />
              <span>1. Delivery Address</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-medium text-foreground block mb-1">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full rounded-lg border bg-background px-3 py-2 text-xs focus:ring-2 focus:ring-pink-500 outline-none"
                />
              </div>
              <div>
                <label className="font-medium text-foreground block mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full rounded-lg border bg-background px-3 py-2 text-xs focus:ring-2 focus:ring-pink-500 outline-none"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="font-medium text-foreground block mb-1">Street Address</label>
                <input
                  type="text"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full rounded-lg border bg-background px-3 py-2 text-xs focus:ring-2 focus:ring-pink-500 outline-none"
                />
              </div>
              <div>
                <label className="font-medium text-foreground block mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full rounded-lg border bg-background px-3 py-2 text-xs focus:ring-2 focus:ring-pink-500 outline-none"
                />
              </div>
              <div>
                <label className="font-medium text-foreground block mb-1">Pincode</label>
                <input
                  type="text"
                  name="postalCode"
                  required
                  value={formData.postalCode}
                  onChange={handleChange}
                  className="w-full rounded-lg border bg-background px-3 py-2 text-xs focus:ring-2 focus:ring-pink-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="p-6 rounded-2xl border bg-card shadow-xs space-y-4">
            <h3 className="font-bold text-base border-b pb-3 flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-pink-600" />
              <span>2. Payment Option</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <label
                className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                  formData.paymentMethod === "cod"
                    ? "border-pink-600 bg-pink-50/50 dark:bg-pink-950/20 ring-1 ring-pink-600"
                    : "hover:bg-secondary"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={formData.paymentMethod === "cod"}
                  onChange={handleChange}
                  className="text-pink-600"
                />
                <div className="flex items-center gap-2">
                  <Banknote className="h-4 w-4 text-emerald-600" />
                  <div>
                    <span className="font-semibold block text-foreground">Cash on Delivery</span>
                    <span className="text-[11px] text-muted-foreground">Pay when delivered</span>
                  </div>
                </div>
              </label>

              <label
                className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                  formData.paymentMethod === "online"
                    ? "border-pink-600 bg-pink-50/50 dark:bg-pink-950/20 ring-1 ring-pink-600"
                    : "hover:bg-secondary"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="online"
                  checked={formData.paymentMethod === "online"}
                  onChange={handleChange}
                  className="text-pink-600"
                />
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-pink-600" />
                  <div>
                    <span className="font-semibold block text-foreground">UPI / Card / NetBanking</span>
                    <span className="text-[11px] text-muted-foreground">Instant payment</span>
                  </div>
                </div>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-pink-600 py-3.5 text-xs sm:text-sm font-semibold text-white shadow-md shadow-pink-600/20 hover:bg-pink-700 active:scale-98 transition-all"
          >
            Place Order • ₹{subtotal}
          </button>
        </form>

        {/* Order Summary Checkout Card */}
        <div className="lg:col-span-4">
          <div className="p-6 rounded-2xl border bg-card shadow-md space-y-4 sticky top-24">
            <h3 className="font-bold text-base border-b pb-3">Order Summary ({items.length} items)</h3>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {items.map((item) => {
                const price = getProductPrice(item.product)
                const imageUrl = getProductImage(item.product)

                return (
                  <div key={item.product.id} className="flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2">
                      <img
                        src={imageUrl}
                        alt=""
                        className="h-10 w-10 rounded-md object-cover bg-secondary"
                      />
                      <div>
                        <p className="font-medium line-clamp-1 max-w-[180px]">{item.product.title}</p>
                        <p className="text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-bold">₹{price * item.quantity}</span>
                  </div>
                )
              })}
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

            <div className="flex items-center gap-2 text-[11px] text-muted-foreground pt-2">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>100% Payment Security & Guaranteed Delivery</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
