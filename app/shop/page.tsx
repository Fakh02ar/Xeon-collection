"use client"

import { useSearchParams } from "next/navigation"
import { useState, useMemo } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { products } from "@/lib/mock-products"
import { Suspense } from "react"
import { ShopContent } from "@/components/shop-content"

function ShopPageSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="aspect-square bg-secondary rounded-lg animate-pulse" />
        ))}
      </div>
    </div>
  )
}

export default function ShopPage() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category") || ""

  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [sortBy, setSortBy] = useState<string>("featured")
  const [currentPage, setCurrentPage] = useState<number>(1)

  const itemsPerPage = 12

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => {
      const matchesCategory = !selectedCategory || p.category === selectedCategory
      const matchesSearch =
        !searchQuery ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })

    // Sort products
    switch (sortBy) {
      case "newest":
        result = result.reverse()
        break
      case "price-low":
        result = result.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        result = result.sort((a, b) => b.price - a.price)
        break
      case "rating":
        result = result.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        break
      case "featured":
      default:
        result = result.sort((a, b) => (b.rating || 0) - (a.rating || 0))
    }

    return result
  }, [selectedCategory, searchQuery, sortBy])

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Page Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Shop</h1>
            <p className="text-lg text-foreground/70">Discover our collection of premium products</p>
          </div>

          <Suspense fallback={<ShopPageSkeleton />}>
            <ShopContent />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  )
}
