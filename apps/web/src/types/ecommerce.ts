export interface Product {
  id: string
  title: string
  slug: string
  description?: string
  price: number
  originalPrice?: number
  images: string[]
  category: string
  rating?: number
  reviewsCount?: number
  inStock?: boolean
  badge?: string
}

export interface Category {
  id: string
  title: string
  slug: string
  image: string
  itemCount?: number
}

export interface CartItem {
  product: Product
  quantity: number
  selectedSize?: string
  selectedColor?: string
}

export interface Order {
  id: string
  items: CartItem[]
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered'
  createdAt: string
  shippingAddress: {
    fullName: string
    address: string
    city: string
    postalCode: string
    phone: string
  }
}
