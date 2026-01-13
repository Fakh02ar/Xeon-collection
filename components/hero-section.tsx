"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative h-150 md:h-180 flex items-center justify-center pt-16 overflow-hidden">
      
      {/* Background image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hod.jpg')" }}
        
      />

      {/* Overlay for readability */}
      {/* <div className="absolute inset-0 z-10 bg-gradient-to-br from-background/90 via-secondary/75 to-background/90" /> */}

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 text-center">
        <div className="space-y-6">

          {/* Main Heading */}
          <div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-4">
              <span className="text-balance">Xeon Collection</span>
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 text-balance mb-2">
              Premium Quality Clothing
            </p>
          </div>

          {/* Tagline */}
          <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto text-balance">
            Premium T-Shirts, Hoodies & Cotton Shirts for the modern lifestyle
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-foreground text-background px-8 py-3 rounded-lg font-semibold hover:bg-foreground/90 transition"
            >
              Shop Now
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              href="#collections"
              className="inline-flex items-center gap-2 border-2 border-foreground text-foreground px-8 py-3 rounded-lg font-semibold hover:bg-foreground/5 transition"
            >
              Explore Collections
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}
