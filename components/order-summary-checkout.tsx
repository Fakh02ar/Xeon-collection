"use client"

import Image from "next/image"
import { useCart } from "@/hooks/use-cart"

export function OrderSummaryCheckout() {
  const { items, total } = useCart()

  const shipping = total > 50 ? 0 : 9.99
  const tax = total * 0.08
  const finalTotal = total + shipping + tax

  return (
    <div className="bg-secondary rounded-lg p-6 space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Order Summary</h2>

      {/* Items */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {items.map((item) => (
          <div
            key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
            className="flex gap-4 pb-4 border-b border-border"
          >
            <div className="relative w-16 h-16 flex-shrink-0 bg-background rounded-lg overflow-hidden">
              <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground truncate text-sm">{item.title}</p>
              <p className="text-xs text-muted-foreground">
                {item.selectedSize} / {item.selectedColor}
              </p>
              <p className="text-sm font-medium text-foreground mt-1">
                {item.quantity}x ${item.price.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Pricing */}
      <div className="space-y-3 border-t border-border pt-4">
        <div className="flex justify-between text-sm">
          <span className="text-foreground/70">Subtotal</span>
          <span className="text-foreground font-medium">${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-foreground/70">Shipping</span>
          <span className="text-foreground font-medium">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-foreground/70">Tax (8%)</span>
          <span className="text-foreground font-medium">${tax.toFixed(2)}</span>
        </div>
      </div>

      {/* Total */}
      <div className="border-t border-border pt-4 flex justify-between items-center">
        <span className="font-semibold text-foreground">Total</span>
        <span className="text-3xl font-bold text-foreground">${finalTotal.toFixed(2)}</span>
      </div>

      {/* Info */}
      <div className="bg-foreground/5 p-3 rounded-lg text-xs text-foreground/70 space-y-1">
        <p>✓ Free shipping on orders over $50</p>
        <p>✓ 30-day returns available</p>
        <p>✓ Estimated delivery: 3-5 business days</p>
      </div>
    </div>
  )
}
