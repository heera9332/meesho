import Link from "next/link"
import { ArrowRight, Sparkles, TrendingUp, Zap } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-pink-50/60 via-background to-background py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-100/80 border border-pink-200 text-pink-700 text-xs font-semibold">
              <Sparkles className="h-3.5 w-3.5 text-pink-600" />
              <span>Lowest Prices • Highest Quality</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1]">
              Smart Shopping, <br />
              <span className="bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 bg-clip-text text-transparent">
                Unbeatable Deals.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed">
              Discover millions of trendy ethnic wear, western fashion, electronics, and home essentials directly from verified manufacturers at wholesale rates.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-pink-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-pink-600/25 hover:bg-pink-700 active:scale-[0.98] transition-all"
              >
                <span>Explore Store</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <a
                href="http://localhost:3001/admin"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-input bg-card px-5 py-3.5 text-sm font-medium hover:bg-secondary transition-all"
              >
                <Zap className="h-4 w-4 text-pink-600" />
                <span>Open Payload CMS</span>
              </a>
            </div>

            {/* Micro Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t max-w-md">
              <div>
                <span className="block text-xl font-bold text-foreground">5M+</span>
                <span className="text-xs text-muted-foreground">Happy Customers</span>
              </div>
              <div>
                <span className="block text-xl font-bold text-foreground">50k+</span>
                <span className="text-xs text-muted-foreground">Unique Products</span>
              </div>
              <div>
                <span className="block text-xl font-bold text-foreground">₹0</span>
                <span className="text-xs text-muted-foreground">Delivery Charge</span>
              </div>
            </div>
          </div>

          {/* Right Visual Banner Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md rounded-2xl overflow-hidden shadow-2xl border bg-card">
              <img
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80"
                alt="Festive Fashion"
                className="w-full h-[420px] object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                <span className="inline-block px-2.5 py-1 rounded-md bg-pink-600 text-xs font-bold uppercase tracking-wider w-fit mb-2">
                  Special Offer
                </span>
                <h3 className="text-xl font-bold">Festive Ethnic Collection</h3>
                <p className="text-xs text-white/80 mt-1">Starting at just ₹499 with instant dispatch</p>
              </div>
            </div>

            {/* Floating Floating card */}
            <div className="absolute -bottom-4 -left-4 sm:bottom-6 sm:-left-6 bg-background border rounded-xl p-3 shadow-xl hidden sm:flex items-center gap-3">
              <div className="p-2 rounded-lg bg-pink-100 text-pink-600">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <span className="block text-xs font-bold">Trending Now</span>
                <span className="text-[11px] text-muted-foreground">7,400+ sold today</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
