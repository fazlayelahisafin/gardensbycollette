'use client'
import { createContext, useEffect, useState } from "react";
export const CartContext = createContext();
export default function Context({ children }) {

    const [cart, setCart] = useState([]);
    useEffect(() => {
        const saved = localStorage.getItem('cart');
        if (saved) {
            setCart(JSON.parse(saved))
        }
    }, [])

    useEffect(() => {
        if (cart.length > 0)
            localStorage.setItem('cart', JSON.stringify(cart))
        else localStorage.removeItem('cart')
    }, [cart])

    return (
        <CartContext.Provider value={{ cart, setCart }}>
            {children}
        </CartContext.Provider>
    )
}
