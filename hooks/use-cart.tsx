"use client"

import { createContext, useContext, useReducer, useEffect, useState, type ReactNode } from "react"
import type { CartItem } from "@/lib/types"

interface CartContextType {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string, size: string, color: string) => void
  updateQuantity: (id: string, size: string, color: string, quantity: number) => void
  clearCart: () => void
  total: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: { id: string; size: string; color: string } }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; size: string; color: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_FROM_STORAGE"; payload: CartItem[] }

function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.find(
        (item) =>
          item.id === action.payload.id &&
          item.selectedSize === action.payload.selectedSize &&
          item.selectedColor === action.payload.selectedColor,
      )
      if (existingItem) {
        return state.map((item) =>
          item.id === action.payload.id &&
          item.selectedSize === action.payload.selectedSize &&
          item.selectedColor === action.payload.selectedColor
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item,
        )
      }
      return [...state, action.payload]
    }
    case "REMOVE_ITEM":
      return state.filter(
        (item) =>
          !(
            item.id === action.payload.id &&
            item.selectedSize === action.payload.size &&
            item.selectedColor === action.payload.color
          ),
      )
    case "UPDATE_QUANTITY":
      return state.map((item) =>
        item.id === action.payload.id &&
        item.selectedSize === action.payload.size &&
        item.selectedColor === action.payload.color
          ? { ...item, quantity: Math.max(0, action.payload.quantity) }
          : item,
      )
    case "CLEAR_CART":
      return []
    case "LOAD_FROM_STORAGE":
      return action.payload
    default:
      return state
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(cartReducer, [])
  const [isHydrated, setIsHydrated] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("xeon-cart")
    if (stored) {
      try {
        dispatch({ type: "LOAD_FROM_STORAGE", payload: JSON.parse(stored) })
      } catch (e) {
        console.error("Failed to load cart from storage:", e)
      }
    }
    setIsHydrated(true)
  }, [])

  // Save to localStorage whenever items change
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("xeon-cart", JSON.stringify(items))
    }
  }, [items, isHydrated])

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const value: CartContextType = {
    items,
    addItem: (item) => dispatch({ type: "ADD_ITEM", payload: item }),
    removeItem: (id, size, color) => dispatch({ type: "REMOVE_ITEM", payload: { id, size, color } }),
    updateQuantity: (id, size, color, quantity) =>
      dispatch({ type: "UPDATE_QUANTITY", payload: { id, size, color, quantity } }),
    clearCart: () => dispatch({ type: "CLEAR_CART" }),
    total,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within CartProvider")
  }
  return context
}
