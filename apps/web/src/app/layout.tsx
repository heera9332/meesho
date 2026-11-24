import type { Metadata } from "next"
import "./globals.css"
import { CartProvider } from "@/lib/cart-context"
import { LocaleProvider } from "@/lib/locale-context"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CartSheet } from "@/components/cart-sheet"

export const metadata: Metadata = {
  title: "Meesho | Online Shopping & Ecommerce Storefront",
  description: "Shop fashion, electronics, home decor and more with best prices, free delivery and cash on delivery.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col antialiased">
        <LocaleProvider>
          <CartProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <CartSheet />
          </CartProvider>
        </LocaleProvider>
      </body>
    </html>
  )
}
