"use client"

import { useSearchParams } from "next/navigation"
import { useState, useMemo } from "react"
import { ShopFilters } from "./shop-filters"
import { ProductCard } from "./product-card"
import { products } from "@/lib/mock-products"

export function ShopContent() {
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
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Filters Sidebar */}
      <aside className="lg:col-span-1">
        <div className="sticky top-24 space-y-6">
          <ShopFilters
            selectedCategory={selectedCategory}
            searchQuery={searchQuery}
            sortBy={sortBy}
            onCategoryChange={(cat) => {
              setSelectedCategory(cat)
              setCurrentPage(1)
            }}
            onSearchChange={(query) => {
              setSearchQuery(query)
              setCurrentPage(1)
            }}
            onSortChange={setSortBy}
          />
        </div>
      </aside>

      {/* Products Grid */}
      <div className="lg:col-span-3">
        {paginatedProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-border rounded-lg text-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:bg-secondary transition"
                >
                  Previous
                </button>

                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-lg font-medium transition ${
                        currentPage === page
                          ? "bg-foreground text-background"
                          : "border border-border text-foreground hover:bg-secondary"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-border rounded-lg text-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:bg-secondary transition"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-foreground/70">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}
