"use client"

import { ProductCard } from "./product-card"
import { products } from "@/lib/mock-products"

export function FeaturedProducts() {
  // Get best-selling products (first 8 with highest ratings)
  const featured = products.sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 8)

  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Best Sellers</h2>
          <p className="text-lg text-foreground/70">Discover our most popular products</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
