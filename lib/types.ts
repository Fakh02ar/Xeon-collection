export interface Product {
  id: string
  title: string
  price: number
  originalPrice?: number
  image: string
  category: "T-Shirts" | "Hoodies" | "Cotton Shirts"
  description: string
  colors: string[]
  sizes: ("S" | "M" | "L" | "XL")[]
  rating?: number
  reviews?: number
  inStock: boolean
}

export interface CartItem extends Product {
  selectedSize: "S" | "M" | "L" | "XL"
  selectedColor: string
  quantity: number
}

export interface CheckoutData {
  fullName: string
  email: string
  phone: string
  address: string
  city: string
}
