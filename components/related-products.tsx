"use client"

import { ProductCard } from "./product-card"
import { products } from "@/lib/mock-products"
import type { Product } from "@/lib/types"

interface RelatedProductsProps {
  product: Product
}

export function RelatedProducts({ product }: RelatedProductsProps) {
  // Get 4 related products from the same category
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .sort(() => Math.random() - 0.5)
    .slice(0, 4)

  if (related.length === 0) return null

  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
