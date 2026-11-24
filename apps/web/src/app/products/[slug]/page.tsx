import { getProductBySlug, getProducts } from "@/lib/payload"
import { notFound } from "next/navigation"
import { ProductDetailView } from "@/components/product-detail-view"

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const relatedProducts = (await getProducts()).filter((p) => p.id !== product.id).slice(0, 4)

  return <ProductDetailView product={product} relatedProducts={relatedProducts} />
}
