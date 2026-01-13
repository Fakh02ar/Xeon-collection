"use client"

import Link from "next/link"
import Image from "next/image"

const collections = [
  {
    id: 1,
    name: "T-Shirts",
    description: "Classic and modern designs",
    image: `/placeholder.svg?height=400&width=600&query=tshirt-collection`,
  },
  {
    id: 2,
    name: "Hoodies",
    description: "Comfortable and stylish",
    image: `/placeholder.svg?height=400&width=600&query=hoodie-collection`,
  },
  {
    id: 3,
    name: "Cotton Shirts",
    description: "Elegant and versatile",
    image: `/placeholder.svg?height=400&width=600&query=cotton-shirt-collection`,
  },
]

export function FeaturedCollections() {
  return (
    <section id="collections" className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Featured Collections</h2>
          <p className="text-lg text-foreground/70">Discover our curated selection of premium clothing</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              href={`/shop?category=${collection.name}`}
              className="group relative overflow-hidden rounded-lg h-64 md:h-72"
            >
              <Image
                src={collection.image || "/placeholder.svg"}
                alt={collection.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-foreground/40 group-hover:bg-foreground/30 transition" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                <h3 className="text-3xl font-bold text-background mb-2">{collection.name}</h3>
                <p className="text-background/90 text-sm">{collection.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
