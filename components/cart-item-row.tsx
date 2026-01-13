"use client"

import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2 } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import type { CartItem } from "@/lib/types"

interface CartItemRowProps {
  item: CartItem
}

export function CartItemRow({ item }: CartItemRowProps) {
  const { removeItem, updateQuantity } = useCart()

  const handleRemove = () => {
    removeItem(item.id, item.selectedSize, item.selectedColor)
  }

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemove()
    } else {
      updateQuantity(item.id, item.selectedSize, item.selectedColor, newQuantity)
    }
  }

  return (
    <div className="flex gap-4 py-6 border-b border-border">
      {/* Product Image */}
      <Link href={`/product/${item.id}`} className="flex-shrink-0">
        <div className="relative w-24 h-24 sm:w-32 sm:h-32 bg-secondary rounded-lg overflow-hidden">
          <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
        </div>
      </Link>

      {/* Product Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <Link href={`/product/${item.id}`} className="hover:text-foreground/70 transition">
            <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
          </Link>
          <p className="text-sm text-muted-foreground mb-2">{item.category}</p>
          <div className="flex gap-4 text-sm">
            <span className="text-muted-foreground">
              Size: <span className="text-foreground font-medium">{item.selectedSize}</span>
            </span>
            <span className="text-muted-foreground">
              Color: <span className="text-foreground font-medium">{item.selectedColor}</span>
            </span>
          </div>
        </div>

        {/* Price and Remove */}
        <div className="flex items-center justify-between">
          <span className="font-bold text-foreground">${(item.price * item.quantity).toFixed(2)}</span>
          <button
            onClick={handleRemove}
            className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition"
            aria-label="Remove item"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Quantity Control */}
      <div className="flex items-end">
        <div className="flex items-center border border-border rounded-lg">
          <button
            onClick={() => handleQuantityChange(item.quantity - 1)}
            className="p-2 hover:bg-secondary transition"
            aria-label="Decrease quantity"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="px-4 py-2 font-medium text-center w-12">{item.quantity}</span>
          <button
            onClick={() => handleQuantityChange(item.quantity + 1)}
            className="p-2 hover:bg-secondary transition"
            aria-label="Increase quantity"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
