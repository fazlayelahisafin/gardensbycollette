'use client'
import { CartContext } from "./context"
import { useContext } from "react"


export default function AddtoCart({ flower, amount, children }) {
    const { cart, setCart } = useContext(CartContext)

    function handleclick() {
        setCart(items => {

            const indexItem = items.findIndex(item => item.id === flower.id)
            const updated = [...items]
            if (indexItem != -1) {
                updated[indexItem] = {
                    id: flower.id,
                    title: flower.title,
                    price: flower.price,
                    stock: flower.stock,
                    quantity: (flower.stock > updated[indexItem].quantity) ? updated[indexItem].quantity + amount : updated[indexItem].quantity
                }
                return updated.filter(item => item.quantity > 0);
            }
            else {
                updated.push({ id: flower.id, title: flower.title, price: flower.price, stock: flower.stock, quantity: amount })
                return updated
            }
        })
    }

    return (
        <button className="addToCartBtn" onClick={handleclick}>
            {children}
        </button>
    )
}