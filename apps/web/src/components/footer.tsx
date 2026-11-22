import Link from "next/link"
import { Heart, Package, Shield, Truck } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-secondary/30 mt-20">
      {/* Guarantees Bar */}
      <div className="border-b bg-secondary/50">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-pink-100 text-pink-600 rounded-xl">
                <Truck className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold">Free Delivery</h4>
                <p className="text-xs text-muted-foreground">On all orders pan-India</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-emerald-100 text-emerald-600 rounded-xl">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold">Safe & Secure Payments</h4>
                <p className="text-xs text-muted-foreground">100% Payment Protection</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-100 text-blue-600 rounded-xl">
                <Package className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold">7 Days Easy Return</h4>
                <p className="text-xs text-muted-foreground">Instant refund directly to bank</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-purple-100 text-purple-600 rounded-xl">
                <Heart className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold">Lowest Price Guarantee</h4>
                <p className="text-xs text-muted-foreground">Direct from manufacturers</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h5 className="font-semibold text-sm mb-4">Shop by Category</h5>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li><Link href="/products?category=womens-ethnic" className="hover:text-foreground">Women Ethnic</Link></li>
              <li><Link href="/products?category=mens-fashion" className="hover:text-foreground">Men's Apparel</Link></li>
              <li><Link href="/products?category=electronics" className="hover:text-foreground">Electronics</Link></li>
              <li><Link href="/products?category=home-kitchen" className="hover:text-foreground">Home & Kitchen</Link></li>
              <li><Link href="/products?category=beauty-wellness" className="hover:text-foreground">Beauty & Wellness</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-sm mb-4">Customer Care</h5>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li><Link href="/cart" className="hover:text-foreground">Track Order</Link></li>
              <li><Link href="/checkout" className="hover:text-foreground">Shipping Policy</Link></li>
              <li><a href="#" className="hover:text-foreground">Return & Refund</a></li>
              <li><a href="#" className="hover:text-foreground">FAQ & Support</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-sm mb-4">Payload Monorepo</h5>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li><a href="http://localhost:3001/admin" target="_blank" rel="noreferrer" className="hover:text-foreground">Payload CMS Admin</a></li>
              <li><a href="http://localhost:3001/api/products" target="_blank" rel="noreferrer" className="hover:text-foreground">Products REST API</a></li>
              <li><a href="http://localhost:3001/api/graphql" target="_blank" rel="noreferrer" className="hover:text-foreground">GraphQL Endpoint</a></li>
              <li><span className="text-pink-600 font-medium">PostgreSQL Connected</span></li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-sm mb-4">Architecture</h5>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Powered by <strong>Bun 1.4</strong> + <strong>Turborepo</strong>. Latest <strong>Next.js App Router</strong> with <strong>Tailwind CSS</strong>, <strong>shadcn/ui</strong>, and <strong>Payload CMS 3.x</strong> with <strong>PostgreSQL</strong>.
            </p>
          </div>
        </div>

        <div className="border-t mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-muted-foreground gap-4">
          <p>© {new Date().getFullYear()} Meesho E-Commerce Monorepo. All rights reserved.</p>
          <p>Built with Bun, Turborepo, Payload CMS, Next.js & PostgreSQL.</p>
        </div>
      </div>
    </footer>
  )
}
