"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { CartItem, Product } from "@/types/ecommerce"

interface CartContextType {
  items: CartItem[]
  addItem: (product: Product, quantity?: number, size?: string) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  totalCount: number
  subtotal: number
  isSheetOpen: boolean
  setIsSheetOpen: (open: boolean) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  // Hydrate cart from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("meesho_cart")
      if (saved) {
        setItems(JSON.parse(saved))
      }
    } catch {
      // Ignore storage errors
    }
    setIsLoaded(true)
  }, [])

  // Persist cart to localStorage
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem("meesho_cart", JSON.stringify(items))
      } catch {
        // Ignore
      }
    }
  }, [items, isLoaded])

  const addItem = (product: Product, quantity = 1, size?: string) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...prev, { product, quantity, selectedSize: size }]
    })
    setIsSheetOpen(true)
  }

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId)
      return
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const totalCount = items.reduce((acc, item) => acc + item.quantity, 0)
  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalCount,
        subtotal,
        isSheetOpen,
        setIsSheetOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
