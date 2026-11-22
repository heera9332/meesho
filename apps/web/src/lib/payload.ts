import { Product, Category } from "@/types/ecommerce"

const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || "http://localhost:3001"

// Fallback high-quality mock data when Payload is not yet connected to PostgreSQL
export const MOCK_CATEGORIES: Category[] = [
  {
    id: "cat-1",
    title: "Women's Ethnic",
    slug: "womens-ethnic",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80",
    itemCount: 1240,
  },
  {
    id: "cat-2",
    title: "Men's Fashion",
    slug: "mens-fashion",
    image: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=600&q=80",
    itemCount: 850,
  },
  {
    id: "cat-3",
    title: "Electronics & Tech",
    slug: "electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    itemCount: 620,
  },
  {
    id: "cat-4",
    title: "Home & Kitchen",
    slug: "home-kitchen",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80",
    itemCount: 940,
  },
  {
    id: "cat-5",
    title: "Beauty & Wellness",
    slug: "beauty-wellness",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80",
    itemCount: 430,
  },
]

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    title: "Handcrafted Anarkali Kurta Set with Dupatta",
    slug: "handcrafted-anarkali-kurta-set",
    description: "Elegant silk blend Anarkali kurta with intricate embroidery work, paired with churidar and lightweight organza dupatta.",
    price: 1299,
    originalPrice: 2999,
    images: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80",
    ],
    category: "womens-ethnic",
    rating: 4.8,
    reviewsCount: 324,
    inStock: true,
    badge: "57% OFF",
  },
  {
    id: "prod-2",
    title: "Premium Cotton Slim-Fit Casual Shirt",
    slug: "premium-cotton-slim-fit-shirt",
    description: "100% breathable pure cotton shirt tailored for modern style, all-day comfort, and smart versatility.",
    price: 649,
    originalPrice: 1499,
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80",
    ],
    category: "mens-fashion",
    rating: 4.6,
    reviewsCount: 189,
    inStock: true,
    badge: "BESTSELLER",
  },
  {
    id: "prod-3",
    title: "Wireless ANC Bluetooth Over-Ear Headphones",
    slug: "wireless-anc-headphones",
    description: "Immersive high-fidelity audio with active noise cancellation, 40-hour battery life, and ultra-comfortable ear cushions.",
    price: 2499,
    originalPrice: 5999,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80",
    ],
    category: "electronics",
    rating: 4.9,
    reviewsCount: 612,
    inStock: true,
    badge: "HOT DEAL",
  },
  {
    id: "prod-4",
    title: "Ceramic Minimalist Table Lamp & Planter",
    slug: "ceramic-minimalist-table-lamp",
    description: "Warm atmospheric ambient lighting with handmade glazed ceramic base that doubles as a succulent planter.",
    price: 899,
    originalPrice: 1799,
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
    ],
    category: "home-kitchen",
    rating: 4.7,
    reviewsCount: 88,
    inStock: true,
  },
  {
    id: "prod-5",
    title: "Organic Ayurvedic Glow Face Serum (30ml)",
    slug: "organic-ayurvedic-glow-serum",
    description: "Enriched with saffron, kumkumadi tailam, and vitamin C for radiant, even-toned, and youthful skin.",
    price: 499,
    originalPrice: 999,
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1608248597359-59755490bf9e?auto=format&fit=crop&w=800&q=80",
    ],
    category: "beauty-wellness",
    rating: 4.9,
    reviewsCount: 450,
    inStock: true,
    badge: "TOP RATED",
  },
  {
    id: "prod-6",
    title: "Classic Embroidered Pashmina Shawl",
    slug: "classic-embroidered-pashmina-shawl",
    description: "Ultra-soft, feather-light traditional Kashmiri pashmina wool blend shawl with intricate floral embroidery.",
    price: 1599,
    originalPrice: 3499,
    images: [
      "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&w=800&q=80",
    ],
    category: "womens-ethnic",
    rating: 4.8,
    reviewsCount: 142,
    inStock: true,
  },
]

export async function getProducts(category?: string): Promise<Product[]> {
  try {
    const url = new URL(`${PAYLOAD_URL}/api/products`)
    if (category) {
      url.searchParams.append("where[category][equals]", category)
    }
    const res = await fetch(url.toString(), {
      next: { revalidate: 60 },
      headers: { "Content-Type": "application/json" },
    })

    if (res.ok) {
      const data = await res.json()
      if (data?.docs && data.docs.length > 0) {
        return data.docs.map((doc: any) => ({
          id: doc.id,
          title: doc.title,
          slug: doc.slug,
          description: doc.description || "",
          price: doc.priceInUSD ? doc.priceInUSD / 100 : doc.price || 0,
          originalPrice: doc.originalPrice,
          images: Array.isArray(doc.gallery)
            ? doc.gallery.map((g: any) => g.image?.url || g.url).filter(Boolean)
            : [doc.image?.url || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"],
          category: typeof doc.category === "object" ? doc.category?.slug : doc.category || "general",
          rating: 4.8,
          reviewsCount: 120,
          inStock: true,
        }))
      }
    }
  } catch {
    // Graceful fallback to mock data
  }

  if (category) {
    return MOCK_PRODUCTS.filter((p) => p.category === category)
  }
  return MOCK_PRODUCTS
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const res = await fetch(`${PAYLOAD_URL}/api/products?where[slug][equals]=${slug}`, {
      next: { revalidate: 60 },
    })
    if (res.ok) {
      const data = await res.json()
      if (data?.docs && data.docs.length > 0) {
        const doc = data.docs[0]
        return {
          id: doc.id,
          title: doc.title,
          slug: doc.slug,
          description: doc.description || "",
          price: doc.priceInUSD ? doc.priceInUSD / 100 : doc.price || 0,
          originalPrice: doc.originalPrice,
          images: Array.isArray(doc.gallery)
            ? doc.gallery.map((g: any) => g.image?.url || g.url).filter(Boolean)
            : [doc.image?.url || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"],
          category: typeof doc.category === "object" ? doc.category?.slug : doc.category || "general",
          rating: 4.8,
          reviewsCount: 120,
          inStock: true,
        }
      }
    }
  } catch {
    // Fallback
  }

  return MOCK_PRODUCTS.find((p) => p.slug === slug) || null
}

export async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${PAYLOAD_URL}/api/categories`, {
      next: { revalidate: 300 },
    })
    if (res.ok) {
      const data = await res.json()
      if (data?.docs && data.docs.length > 0) {
        return data.docs.map((doc: any) => ({
          id: doc.id,
          title: doc.title,
          slug: doc.slug,
          image: doc.image?.url || "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80",
        }))
      }
    }
  } catch {
    // Fallback
  }
  return MOCK_CATEGORIES
}
