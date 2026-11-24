import { HomeContent } from "@/components/home-content"
import { getCategories, getProducts } from "@/lib/payload"

export default async function HomePage() {
  const categories = await getCategories()
  const products = await getProducts()

  return <HomeContent categories={categories} products={products} />
}
