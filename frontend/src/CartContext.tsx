import React, { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

export type CartItem = {
    id: number
    name: string
    price: number
    quantity: number
    image: string
}

type CartContextType = {
    cart: CartItem[]
    addToCart: (item: Omit<CartItem, 'quantity'>) => void
    removeFromCart: (id: number) => void
    updateQuantity: (id: number, quantity: number) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function useCart() {
    const ctx = useContext(CartContext)
    if (!ctx) throw new Error('useCart must be used within a CartProvider')
    return ctx
}

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([])

    function addToCart(item: Omit<CartItem, 'quantity'>) {
        setCart((prev) => {
            const existing = prev.find((i) => i.id === item.id)
            if (existing) {
                return prev.map((i) =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                )
            } else {
                return [...prev, { ...item, quantity: 1 }]
            }
        })
    }

    function removeFromCart(id: number) {
        setCart((prev) => prev.filter((i) => i.id !== id))
    }

    function updateQuantity(id: number, quantity: number) {
        setCart((prev) =>
            prev.map((i) =>
                i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i
            )
        )
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
            {children}
        </CartContext.Provider>
    )
} 