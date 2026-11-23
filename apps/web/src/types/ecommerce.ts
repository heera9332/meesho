import 'payload'
import type { Cart, Product } from '@repo/payload/types'

// Re-export all auto-generated collection & global types directly from Payload
export type * from '@repo/payload/types'

// Storefront CartItem derived directly from Payload's Cart items
export type CartItem = NonNullable<Cart['items']>[number] & {
  product: Product
  selectedSize?: string
  selectedColor?: string
}
