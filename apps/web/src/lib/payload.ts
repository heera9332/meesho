import { Product, Category } from "@/types/ecommerce"

const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || "http://localhost:3001"

// Fallback high-quality mock data typed according to Payload's generated schema
export const MOCK_CATEGORIES: Category[] = [
  {
    id: 1,
    title: "Women's Ethnic",
    slug: "womens-ethnic",
    image: {
      id: 1,
      alt: "Women's Ethnic",
      url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80",
      updatedAt: "2026-11-23T00:00:00.000Z",
      createdAt: "2026-11-23T00:00:00.000Z",
    },
    displayType: "default",
    menuOrder: 1,
    isFeatured: true,
    subcategories: {
      totalDocs: 1240,
    },
    updatedAt: "2026-11-23T00:00:00.000Z",
    createdAt: "2026-11-23T00:00:00.000Z",
  },
  {
    id: 2,
    title: "Men's Fashion",
    slug: "mens-fashion",
    image: {
      id: 2,
      alt: "Men's Fashion",
      url: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=600&q=80",
      updatedAt: "2026-11-23T00:00:00.000Z",
      createdAt: "2026-11-23T00:00:00.000Z",
    },
    displayType: "default",
    menuOrder: 2,
    isFeatured: true,
    subcategories: {
      totalDocs: 850,
    },
    updatedAt: "2026-11-23T00:00:00.000Z",
    createdAt: "2026-11-23T00:00:00.000Z",
  },
  {
    id: 3,
    title: "Electronics & Tech",
    slug: "electronics",
    image: {
      id: 3,
      alt: "Electronics & Tech",
      url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
      updatedAt: "2026-11-23T00:00:00.000Z",
      createdAt: "2026-11-23T00:00:00.000Z",
    },
    displayType: "default",
    menuOrder: 3,
    isFeatured: true,
    subcategories: {
      totalDocs: 620,
    },
    updatedAt: "2026-11-23T00:00:00.000Z",
    createdAt: "2026-11-23T00:00:00.000Z",
  },
  {
    id: 4,
    title: "Home & Kitchen",
    slug: "home-kitchen",
    image: {
      id: 4,
      alt: "Home & Kitchen",
      url: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80",
      updatedAt: "2026-11-23T00:00:00.000Z",
      createdAt: "2026-11-23T00:00:00.000Z",
    },
    displayType: "default",
    menuOrder: 4,
    isFeatured: true,
    subcategories: {
      totalDocs: 940,
    },
    updatedAt: "2026-11-23T00:00:00.000Z",
    createdAt: "2026-11-23T00:00:00.000Z",
  },
  {
    id: 5,
    title: "Beauty & Wellness",
    slug: "beauty-wellness",
    image: {
      id: 5,
      alt: "Beauty & Wellness",
      url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80",
      updatedAt: "2026-11-23T00:00:00.000Z",
      createdAt: "2026-11-23T00:00:00.000Z",
    },
    displayType: "default",
    menuOrder: 5,
    isFeatured: true,
    subcategories: {
      totalDocs: 430,
    },
    updatedAt: "2026-11-23T00:00:00.000Z",
    createdAt: "2026-11-23T00:00:00.000Z",
  },
]

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    title: "Handcrafted Anarkali Kurta Set with Dupatta",
    slug: "handcrafted-anarkali-kurta-set",
    priceInUSD: 1299,
    priceInUSDEnabled: true,
    gallery: [
      {
        id: "1",
        image: {
          id: 101,
          alt: "Handcrafted Anarkali Kurta Set",
          url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
          updatedAt: "2026-11-23T00:00:00.000Z",
          createdAt: "2026-11-23T00:00:00.000Z",
        },
      },
      {
        id: "2",
        image: {
          id: 102,
          alt: "Handcrafted Anarkali Kurta Set alternate",
          url: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80",
          updatedAt: "2026-11-23T00:00:00.000Z",
          createdAt: "2026-11-23T00:00:00.000Z",
        },
      },
    ],
    categories: [MOCK_CATEGORIES[0]],
    _status: "published",
    updatedAt: "2026-11-23T00:00:00.000Z",
    createdAt: "2026-11-23T00:00:00.000Z",
  },
  {
    id: 2,
    title: "Premium Cotton Slim-Fit Casual Shirt",
    slug: "premium-cotton-slim-fit-shirt",
    priceInUSD: 649,
    priceInUSDEnabled: true,
    gallery: [
      {
        id: "1",
        image: {
          id: 201,
          alt: "Premium Cotton Slim-Fit Casual Shirt",
          url: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80",
          updatedAt: "2026-11-23T00:00:00.000Z",
          createdAt: "2026-11-23T00:00:00.000Z",
        },
      },
      {
        id: "2",
        image: {
          id: 202,
          alt: "Casual Shirt back",
          url: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80",
          updatedAt: "2026-11-23T00:00:00.000Z",
          createdAt: "2026-11-23T00:00:00.000Z",
        },
      },
    ],
    categories: [MOCK_CATEGORIES[1]],
    _status: "published",
    updatedAt: "2026-11-23T00:00:00.000Z",
    createdAt: "2026-11-23T00:00:00.000Z",
  },
  {
    id: 3,
    title: "Wireless ANC Bluetooth Over-Ear Headphones",
    slug: "wireless-anc-headphones",
    priceInUSD: 2499,
    priceInUSDEnabled: true,
    gallery: [
      {
        id: "1",
        image: {
          id: 301,
          alt: "Wireless ANC Headphones",
          url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
          updatedAt: "2026-11-23T00:00:00.000Z",
          createdAt: "2026-11-23T00:00:00.000Z",
        },
      },
      {
        id: "2",
        image: {
          id: 302,
          alt: "Headphones side view",
          url: "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80",
          updatedAt: "2026-11-23T00:00:00.000Z",
          createdAt: "2026-11-23T00:00:00.000Z",
        },
      },
    ],
    categories: [MOCK_CATEGORIES[2]],
    _status: "published",
    updatedAt: "2026-11-23T00:00:00.000Z",
    createdAt: "2026-11-23T00:00:00.000Z",
  },
  {
    id: 4,
    title: "Ceramic Minimalist Table Lamp & Planter",
    slug: "ceramic-minimalist-table-lamp",
    priceInUSD: 899,
    priceInUSDEnabled: true,
    gallery: [
      {
        id: "1",
        image: {
          id: 401,
          alt: "Ceramic Minimalist Table Lamp",
          url: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
          updatedAt: "2026-11-23T00:00:00.000Z",
          createdAt: "2026-11-23T00:00:00.000Z",
        },
      },
    ],
    categories: [MOCK_CATEGORIES[3]],
    _status: "published",
    updatedAt: "2026-11-23T00:00:00.000Z",
    createdAt: "2026-11-23T00:00:00.000Z",
  },
  {
    id: 5,
    title: "Organic Ayurvedic Glow Face Serum (30ml)",
    slug: "organic-ayurvedic-glow-serum",
    priceInUSD: 499,
    priceInUSDEnabled: true,
    gallery: [
      {
        id: "1",
        image: {
          id: 501,
          alt: "Organic Ayurvedic Glow Face Serum",
          url: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80",
          updatedAt: "2026-11-23T00:00:00.000Z",
          createdAt: "2026-11-23T00:00:00.000Z",
        },
      },
    ],
    categories: [MOCK_CATEGORIES[4]],
    _status: "published",
    updatedAt: "2026-11-23T00:00:00.000Z",
    createdAt: "2026-11-23T00:00:00.000Z",
  },
  {
    id: 6,
    title: "Classic Embroidered Pashmina Shawl",
    slug: "classic-embroidered-pashmina-shawl",
    priceInUSD: 1599,
    priceInUSDEnabled: true,
    gallery: [
      {
        id: "1",
        image: {
          id: 601,
          alt: "Classic Embroidered Pashmina Shawl",
          url: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&w=800&q=80",
          updatedAt: "2026-11-23T00:00:00.000Z",
          createdAt: "2026-11-23T00:00:00.000Z",
        },
      },
    ],
    categories: [MOCK_CATEGORIES[0]],
    _status: "published",
    updatedAt: "2026-11-23T00:00:00.000Z",
    createdAt: "2026-11-23T00:00:00.000Z",
  },
]

// Central helper functions for UI rendering
const HINDI_CATEGORY_TITLES: Record<string, string> = {
  "womens-ethnic": "महिलाओं के एथनिक वस्त्र",
  "mens-fashion": "पुरुषों के फैशन",
  electronics: "इलेक्ट्रॉनिक्स और टेक",
  "home-kitchen": "घर और रसोई",
  "beauty-wellness": "सौंदर्य और स्वास्थ्य",
}

const HINDI_PRODUCT_TITLES: Record<string, string> = {
  "handcrafted-anarkali-kurta-set": "दुपट्टे के साथ हस्तनिर्मित अनारकली कुर्ता सेट",
  "premium-cotton-slim-fit-shirt": "प्रीमियम कॉटन स्लिम-फिट कैजुअल शर्ट",
  "wireless-anc-headphones": "वायरलेस ANC ब्लूटूथ ओवर-ईयर हेडफ़ोन",
  "ceramic-minimalist-table-lamp": "सिरेमिक मिनिमलिस्ट टेबल लैंप और प्लांटर",
  "organic-ayurvedic-glow-serum": "ऑर्गेनिक आयुर्वेदिक ग्लो फेस सीरम (30ml)",
  "classic-embroidered-pashmina-shawl": "क्लासिक कढ़ाईदार पश्मीना शॉल",
}

export function getLocalizedTitle(
  item: { title: string; slug?: string | null },
  locale: string = "en"
): string {
  if (locale === "hi" && item.slug && HINDI_PRODUCT_TITLES[item.slug]) {
    return HINDI_PRODUCT_TITLES[item.slug]
  }
  if (locale === "hi" && item.slug && HINDI_CATEGORY_TITLES[item.slug]) {
    return HINDI_CATEGORY_TITLES[item.slug]
  }
  return item.title
}

export function getProductImage(product: Product): string {
  const first = product.gallery?.[0]?.image
  if (first && typeof first === "object" && first.url) {
    return first.url
  }
  return "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
}

export function getProductImages(product: Product): string[] {
  const list = (product.gallery || [])
    .map((item) => (typeof item.image === "object" && item.image?.url ? item.image.url : null))
    .filter(Boolean) as string[]

  if (list.length > 0) return list
  return [getProductImage(product)]
}

export function getProductPrice(product: Product): number {
  if (typeof product.priceInUSD === "number") {
    return product.priceInUSD
  }
  return 0
}

export function getProductCategory(product: Product, locale: string = "en"): string {
  const first = product.categories?.[0]
  if (first && typeof first === "object" && first.title) {
    if (locale === "hi" && first.slug && HINDI_CATEGORY_TITLES[first.slug]) {
      return HINDI_CATEGORY_TITLES[first.slug]
    }
    return first.title
  }
  return locale === "hi" ? "सामान्य" : "General"
}

export function getCategoryImage(category: Category): string {
  if (category.image && typeof category.image === "object" && category.image.url) {
    return category.image.url
  }
  return "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80"
}

export function getProductVendor(product: Product): { name: string; isVerified: boolean } | null {
  if (product.vendor && typeof product.vendor === "object" && product.vendor.name) {
    return {
      name: product.vendor.name,
      isVerified: Boolean(product.vendor.isVerified),
    }
  }
  return null
}

export async function getProducts(categorySlug?: string, locale: string = "en"): Promise<Product[]> {
  try {
    const url = new URL(`${PAYLOAD_URL}/api/products`)
    url.searchParams.append("locale", locale)
    if (categorySlug) {
      url.searchParams.append("where[categories.slug][equals]", categorySlug)
    }
    const res = await fetch(url.toString(), {
      next: { revalidate: 60 },
      headers: { "Content-Type": "application/json" },
    })

    if (res.ok) {
      const data = await res.json()
      if (data?.docs && data.docs.length > 0) {
        return data.docs
      }
    }
  } catch {
    // Graceful fallback to mock data
  }

  if (categorySlug) {
    return MOCK_PRODUCTS.filter((p) =>
      p.categories?.some((c) => (typeof c === "object" ? c.slug === categorySlug : false))
    )
  }
  return MOCK_PRODUCTS
}

export async function getProductBySlug(slug: string, locale: string = "en"): Promise<Product | null> {
  try {
    const res = await fetch(`${PAYLOAD_URL}/api/products?where[slug][equals]=${slug}&locale=${locale}`, {
      next: { revalidate: 60 },
    })
    if (res.ok) {
      const data = await res.json()
      if (data?.docs && data.docs.length > 0) {
        return data.docs[0]
      }
    }
  } catch {
    // Fallback
  }

  return MOCK_PRODUCTS.find((p) => p.slug === slug) || null
}

export async function getCategories(locale: string = "en"): Promise<Category[]> {
  try {
    const res = await fetch(`${PAYLOAD_URL}/api/categories?sort=menuOrder&locale=${locale}`, {
      next: { revalidate: 300 },
    })
    if (res.ok) {
      const data = await res.json()
      if (data?.docs && data.docs.length > 0) {
        return data.docs
      }
    }
  } catch {
    // Fallback
  }
  return MOCK_CATEGORIES
}
