"use client"

import { useState } from "react"
import { redirect } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CheckoutForm } from "@/components/checkout-form"
import { OrderSummaryCheckout } from "@/components/order-summary-checkout"
import { OrderConfirmation } from "@/components/order-confirmation"
import { useCart } from "@/hooks/use-cart"
import type { CheckoutData } from "@/lib/types"

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderData, setOrderData] = useState<CheckoutData | null>(null)
  const [orderNumber, setOrderNumber] = useState<string>("")

  if (items.length === 0 && !orderData) {
    redirect("/cart")
  }

  const handleCheckoutSubmit = async (data: CheckoutData) => {
    setIsSubmitting(true)

    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Generate order number
    const number = `ORD-${Date.now()}`
    setOrderNumber(number)
    setOrderData(data)

    // Clear cart after successful order
    clearCart()

    setIsSubmitting(false)
  }

  // Show order confirmation
  if (orderData) {
    const finalTotal = total + (total > 50 ? 0 : 9.99) + total * 0.08
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <OrderConfirmation orderData={orderData} orderNumber={orderNumber} total={finalTotal} />
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // Show checkout form
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-foreground mb-12">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-lg p-6 md:p-8">
                <CheckoutForm onSubmit={handleCheckoutSubmit} isLoading={isSubmitting} />
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <OrderSummaryCheckout />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
