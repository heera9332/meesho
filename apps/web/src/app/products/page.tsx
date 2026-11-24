import { getProducts, getCategories } from "@/lib/payload"
import { ProductsView } from "@/components/products-view"

interface ProductsPageProps {
  searchParams: Promise<{ category?: string }>
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { category } = await searchParams
  const products = await getProducts(category)
  const categories = await getCategories()

  return <ProductsView products={products} categories={categories} category={category} />
}
