"use client"

import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/hooks/use-cart"

export function Header() {
  const { items } = useCart()
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-foreground rounded-sm flex items-center justify-center">
              <span className="text-background font-bold text-sm">XC</span>
            </div>
            <span className="hidden sm:inline font-bold text-lg text-foreground tracking-tight">Xeon Collection</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm text-foreground hover:text-foreground/70 transition">
              Home
            </Link>
            <Link href="/shop" className="text-sm text-foreground hover:text-foreground/70 transition">
              Shop
            </Link>
            <Link href="/" className="text-sm text-foreground hover:text-foreground/70 transition">
              About
            </Link>
            <Link href="/" className="text-sm text-foreground hover:text-foreground/70 transition">
              Contact
            </Link>
          </nav>

          {/* Cart Icon */}
          <Link href="/cart" className="relative">
            <ShoppingCart className="w-6 h-6 text-foreground hover:text-foreground/70 transition" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-foreground text-background rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  )
}
