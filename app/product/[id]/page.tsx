"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductGallery } from "@/components/product-gallery"
import { ProductSelector } from "@/components/product-selector"
import { RelatedProducts } from "@/components/related-products"
import { products } from "@/lib/mock-products"
import { notFound } from "next/navigation"

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params
  const product = products.find((p) => p.id === id)

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Product Details */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Gallery */}
            <div>
              <ProductGallery image={product.image} title={product.title} />
            </div>

            {/* Product Info */}
            <div>
              <div className="mb-6">
                <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground">{product.title}</h1>
              </div>
              <ProductSelector product={product} />
            </div>
          </div>
        </div>

        {/* Related Products */}
        <RelatedProducts product={product} />
      </main>
      <Footer />
    </div>
  )
}
