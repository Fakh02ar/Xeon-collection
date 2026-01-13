import type { Product } from "./types"

export const products: Product[] = [
  // T-Shirts (70 items)
  ...Array.from({ length: 70 }, (_, i) => ({
    id: `tshirt-${i + 1}`,
    title: `Premium T-Shirt #${i + 1}`,
    price: 29.99 + (i % 5) * 5,
    originalPrice: i % 3 === 0 ? 49.99 + (i % 5) * 5 : undefined,
    image: `/placeholder.svg?height=400&width=400&query=premium-tshirt-${i + 1}`,
    category: "T-Shirts" as const,
    description: `High-quality cotton t-shirt with modern design. Perfect for everyday wear. Available in multiple colors.`,
    colors: ["Black", "White", "Navy", "Gray", "Beige"],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.5 + (i % 2) * 0.5,
    reviews: 20 + (i % 50),
    inStock: i % 10 !== 0,
  })),

  // Hoodies (65 items)
  ...Array.from({ length: 65 }, (_, i) => ({
    id: `hoodie-${i + 1}`,
    title: `Premium Hoodie #${i + 1}`,
    price: 54.99 + (i % 5) * 5,
    originalPrice: i % 2 === 0 ? 79.99 + (i % 5) * 5 : undefined,
    image: `/placeholder.svg?height=400&width=400&query=premium-hoodie-${i + 1}`,
    category: "Hoodies" as const,
    description: `Cozy and stylish hoodie made from premium materials. Perfect for cold weather and casual outings.`,
    colors: ["Black", "Gray", "Navy", "Charcoal", "Olive"],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.7 + (i % 2) * 0.3,
    reviews: 30 + (i % 60),
    inStock: i % 8 !== 0,
  })),

  // Cotton Shirts (65 items)
  ...Array.from({ length: 65 }, (_, i) => ({
    id: `shirt-${i + 1}`,
    title: `Premium Cotton Shirt #${i + 1}`,
    price: 39.99 + (i % 5) * 5,
    originalPrice: i % 3 === 0 ? 59.99 + (i % 5) * 5 : undefined,
    image: `/placeholder.svg?height=400&width=400&query=premium-cotton-shirt-${i + 1}`,
    category: "Cotton Shirts" as const,
    description: `Elegant and breathable cotton shirt suitable for both casual and formal occasions.`,
    colors: ["White", "Black", "Light Blue", "Gray", "Cream"],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.6 + (i % 2) * 0.4,
    reviews: 25 + (i % 55),
    inStock: i % 9 !== 0,
  })),
]
