"use client"

import type React from "react"

import { useState } from "react"
import { ChevronRight } from "lucide-react"
import type { CheckoutData } from "@/lib/types"

interface CheckoutFormProps {
  onSubmit: (data: CheckoutData) => void
  isLoading: boolean
}

export function CheckoutForm({ onSubmit, isLoading }: CheckoutFormProps) {
  const [formData, setFormData] = useState<CheckoutData>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
  })

  const [errors, setErrors] = useState<Partial<CheckoutData>>({})

  const validateForm = () => {
    const newErrors: Partial<CheckoutData> = {}

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required"
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format"
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
    if (!formData.address.trim()) newErrors.address = "Address is required"
    if (!formData.city.trim()) newErrors.city = "City is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof CheckoutData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Shipping Information</h2>

      {/* Full Name */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">Full Name</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 ${
            errors.fullName ? "border-destructive focus:ring-destructive" : "border-border focus:ring-primary"
          }`}
          placeholder="John Doe"
        />
        {errors.fullName && <p className="text-sm text-destructive mt-1">{errors.fullName}</p>}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 ${
            errors.email ? "border-destructive focus:ring-destructive" : "border-border focus:ring-primary"
          }`}
          placeholder="john@example.com"
        />
        {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">Phone Number</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 ${
            errors.phone ? "border-destructive focus:ring-destructive" : "border-border focus:ring-primary"
          }`}
          placeholder="+1 (555) 000-0000"
        />
        {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone}</p>}
      </div>

      {/* Address */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">Shipping Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 ${
            errors.address ? "border-destructive focus:ring-destructive" : "border-border focus:ring-primary"
          }`}
          placeholder="123 Main Street"
        />
        {errors.address && <p className="text-sm text-destructive mt-1">{errors.address}</p>}
      </div>

      {/* City */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">City</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 ${
            errors.city ? "border-destructive focus:ring-destructive" : "border-border focus:ring-primary"
          }`}
          placeholder="New York"
        />
        {errors.city && <p className="text-sm text-destructive mt-1">{errors.city}</p>}
      </div>

      {/* Payment Method */}
      <div className="bg-secondary/50 p-4 rounded-lg">
        <h3 className="font-semibold text-foreground mb-2">Payment Method</h3>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-foreground rounded-full" />
          <span className="text-foreground">Cash on Delivery (COD)</span>
        </div>
        <p className="text-sm text-foreground/70 mt-2">Pay when you receive your order</p>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-foreground text-background py-3 rounded-lg font-bold hover:bg-foreground/90 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
      >
        {isLoading ? "Processing..." : "Place Order"}
        {!isLoading && <ChevronRight className="w-5 h-5" />}
      </button>
    </form>
  )
}
