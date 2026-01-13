"use client"

import { useState } from "react"
import { Minus, Plus, ShoppingCart, Check } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import type { Product, CartItem } from "@/lib/types"

interface ProductSelectorProps {
  product: Product
}

export function ProductSelector({ product }: ProductSelectorProps) {
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState<"S" | "M" | "L" | "XL">("M")
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      ...product,
      selectedSize,
      selectedColor,
      quantity,
    }
    addItem(cartItem)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <div className="space-y-6">
      {/* Price Section */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl font-bold text-foreground">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <>
              <span className="text-xl text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
              <span className="bg-destructive text-destructive-foreground px-3 py-1 rounded-md text-sm font-semibold">
                Save {discountPercent}%
              </span>
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex text-yellow-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i}>{i < Math.floor(product.rating || 0) ? "★" : "☆"}</span>
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            {product.rating} ({product.reviews} reviews)
          </span>
        </div>
      </div>

      {/* Color Selector */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">Color</h3>
        <div className="flex gap-2 flex-wrap">
          {product.colors.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                selectedColor === color
                  ? "bg-foreground text-background"
                  : "bg-secondary text-foreground border border-border hover:border-foreground"
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      {/* Size Selector */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">Size</h3>
        <div className="grid grid-cols-4 gap-2">
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`py-3 rounded-lg font-semibold transition ${
                selectedSize === size
                  ? "bg-foreground text-background"
                  : "bg-secondary text-foreground border border-border hover:border-foreground"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity Selector */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">Quantity</h3>
        <div className="flex items-center border border-border rounded-lg w-fit">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="p-2 hover:bg-secondary transition"
            aria-label="Decrease quantity"
          >
            <Minus className="w-5 h-5" />
          </button>
          <span className="px-6 py-2 font-semibold">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="p-2 hover:bg-secondary transition"
            aria-label="Increase quantity"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Stock Status */}
      <div
        className={`p-3 rounded-lg text-sm font-medium ${product.inStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
      >
        {product.inStock ? "✓ In Stock" : "Out of Stock"}
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={!product.inStock}
        className={`w-full py-4 rounded-lg font-bold text-lg transition flex items-center justify-center gap-2 ${
          isAdded
            ? "bg-green-600 text-white"
            : product.inStock
              ? "bg-foreground text-background hover:bg-foreground/90"
              : "bg-muted text-muted-foreground cursor-not-allowed"
        }`}
      >
        {isAdded ? (
          <>
            <Check className="w-6 h-6" />
            Added to Cart
          </>
        ) : (
          <>
            <ShoppingCart className="w-6 h-6" />
            Add to Cart
          </>
        )}
      </button>

      {/* Product Description */}
      <div className="border-t border-border pt-6">
        <h3 className="text-sm font-semibold text-foreground mb-2">Description</h3>
        <p className="text-sm text-foreground/70 leading-relaxed">{product.description}</p>
      </div>

      {/* Shipping Info */}
      <div className="bg-secondary/50 p-4 rounded-lg space-y-2 text-sm">
        <p className="font-semibold text-foreground">Shipping & Returns</p>
        <p className="text-foreground/70">Free shipping on orders over $50. Easy 30-day returns.</p>
      </div>
    </div>
  )
}
