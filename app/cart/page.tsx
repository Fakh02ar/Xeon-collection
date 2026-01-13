"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CartItemRow } from "@/components/cart-item-row"
import { useCart } from "@/hooks/use-cart"

export default function CartPage() {
  const { items, total, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-foreground mb-8">Shopping Cart</h1>
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-lg text-foreground/70 mb-6">Your cart is empty</p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-lg font-semibold hover:bg-foreground/90 transition"
            >
              Continue Shopping
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-foreground/70 hover:text-foreground transition mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </Link>
            <h1 className="text-4xl font-bold text-foreground">Shopping Cart</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-lg p-6">
                {items.map((item) => (
                  <CartItemRow key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} item={item} />
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-secondary rounded-lg p-6 sticky top-24 space-y-6">
                <h2 className="text-2xl font-bold text-foreground">Order Summary</h2>

                {/* Summary Details */}
                <div className="space-y-3 text-sm border-b border-border pb-4">
                  <div className="flex justify-between text-foreground/70">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-foreground/70">
                    <span>Shipping</span>
                    <span>{total > 50 ? "Free" : "$9.99"}</span>
                  </div>
                  <div className="flex justify-between text-foreground/70">
                    <span>Tax</span>
                    <span>${(total * 0.08).toFixed(2)}</span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-foreground">Total</span>
                  <span className="text-2xl font-bold text-foreground">
                    ${(total + (total > 50 ? 0 : 9.99) + total * 0.08).toFixed(2)}
                  </span>
                </div>

                {/* Checkout Button */}
                <Link
                  href="/checkout"
                  className="w-full bg-foreground text-background py-3 rounded-lg font-bold hover:bg-foreground/90 transition text-center block"
                >
                  Proceed to Checkout
                </Link>

                {/* Continue Shopping */}
                <button
                  onClick={() => clearCart()}
                  className="w-full border-2 border-foreground text-foreground py-3 rounded-lg font-semibold hover:bg-foreground/5 transition"
                >
                  Clear Cart
                </button>

                {/* Info */}
                <div className="text-xs text-foreground/60 space-y-1">
                  <p>✓ Free shipping on orders over $50</p>
                  <p>✓ 30-day returns</p>
                  <p>✓ Cash on Delivery accepted</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
