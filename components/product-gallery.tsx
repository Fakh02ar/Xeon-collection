"use client"

import Image from "next/image"
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ProductGalleryProps {
  image: string
  title: string
}

export function ProductGallery({ image, title }: ProductGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Generate 4 variations of the product image
  const images = [
    image,
    image.replace("query=", "query=alternate-"),
    image.replace("query=", "query=detail-"),
    image.replace("query=", "query=worn-"),
  ]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative bg-secondary rounded-lg overflow-hidden aspect-square">
        <Image
          src={images[currentImageIndex] || "/placeholder.svg"}
          alt={`${title} - View ${currentImageIndex + 1}`}
          fill
          className="object-cover"
          priority
        />

        {/* Navigation Buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background text-foreground p-2 rounded-full transition"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background text-foreground p-2 rounded-full transition"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail Gallery */}
      <div className="grid grid-cols-4 gap-2">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`relative aspect-square rounded-lg overflow-hidden transition-all ${
              currentImageIndex === index ? "ring-2 ring-foreground" : "opacity-60 hover:opacity-100"
            }`}
          >
            <Image src={img || "/placeholder.svg"} alt={`Thumbnail ${index + 1}`} fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}
