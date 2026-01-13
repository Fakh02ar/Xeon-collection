"use client"

import Link from "next/link"
import { CheckCircle, Package, Mail, CreditCard } from "lucide-react"
import type { CheckoutData } from "@/lib/types"

interface OrderConfirmationProps {
  orderData: CheckoutData
  orderNumber: string
  total: number
}

export function OrderConfirmation({ orderData, orderNumber, total }: OrderConfirmationProps) {
  return (
    <div className="text-center space-y-8 py-12">
      {/* Success Icon */}
      <div className="flex justify-center">
        <div className="relative">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center animate-pulse">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
        </div>
      </div>

      {/* Success Message */}
      <div>
        <h2 className="text-4xl font-bold text-foreground mb-2">Order Placed Successfully!</h2>
        <p className="text-lg text-foreground/70">Thank you for your purchase</p>
      </div>

      {/* Order Number */}
      <div className="bg-secondary rounded-lg p-6">
        <p className="text-sm text-foreground/70 mb-2">Order Number</p>
        <p className="text-2xl font-bold text-foreground font-mono">{orderNumber}</p>
      </div>

      {/* Order Details */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Customer Info */}
        <div className="bg-secondary rounded-lg p-4">
          <Mail className="w-6 h-6 text-foreground mx-auto mb-3" />
          <p className="text-sm text-foreground/70 mb-1">Delivery To</p>
          <p className="font-semibold text-foreground">{orderData.fullName}</p>
          <p className="text-sm text-foreground/70">{orderData.address}</p>
          <p className="text-sm text-foreground/70">{orderData.city}</p>
        </div>

        {/* Payment Method */}
        <div className="bg-secondary rounded-lg p-4">
          <CreditCard className="w-6 h-6 text-foreground mx-auto mb-3" />
          <p className="text-sm text-foreground/70 mb-1">Payment Method</p>
          <p className="font-semibold text-foreground">Cash on Delivery</p>
          <p className="text-sm text-foreground/70">Pay when receiving</p>
        </div>

        {/* Total */}
        <div className="bg-secondary rounded-lg p-4">
          <Package className="w-6 h-6 text-foreground mx-auto mb-3" />
          <p className="text-sm text-foreground/70 mb-1">Total Amount</p>
          <p className="font-bold text-foreground text-2xl">${total.toFixed(2)}</p>
        </div>
      </div>

      {/* Estimated Delivery */}
      <div className="bg-secondary/50 rounded-lg p-6 space-y-2">
        <h3 className="font-semibold text-foreground">Estimated Delivery</h3>
        <p className="text-foreground/70">Your order will arrive in 3-5 business days</p>
        <p className="text-sm text-foreground/50">We'll send tracking information to {orderData.email}</p>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
        <Link
          href="/shop"
          className="inline-flex items-center justify-center px-8 py-3 bg-foreground text-background rounded-lg font-semibold hover:bg-foreground/90 transition"
        >
          Continue Shopping
        </Link>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-8 py-3 border-2 border-foreground text-foreground rounded-lg font-semibold hover:bg-foreground/5 transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}
