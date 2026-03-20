'use client'
import { useContext } from 'react'
import classes from './page.module.css'
import { CartContext } from '@/components/context'
import AddtoCart from '@/components/addToCart'
import Link from 'next/link'
export default function MyCart() {
    const { cart, setCart } = useContext(CartContext)
    const subtotal = Number(cart?.reduce((acc, curr) => { return acc + curr.quantity * curr.price }, 0).toFixed(2))
    const gst = Number((subtotal * 0.13).toFixed(2));
    const total = Number((subtotal + gst).toFixed(2));
    function handleRemove(item) {
        setCart(flowers => {
            const updated = [...flowers]
            const filtered = updated.filter(flower => flower.id != item.id)
            return filtered
        })
    }

    return (
        <div className={classes.body}>
            <div className={classes.cartcontainer} >

                <h1>Your Cart</h1>

                <div className={classes.cartheader}>
                    <span>Flower</span>
                    <span>Base Price</span>
                    <span>Quantity</span>
                    <span>Total</span>
                    <span>Remove</span>
                </div>

                {
                    (cart.length > 0) ? cart.map(item => {
                        return (
                            <div key={item.id} className={classes.cartrow}>
                                <span className={classes.flowername} >{item.title}</span>
                                <span>${item.price}</span>

                                <div className={classes.quantitybox} >
                                    <div className={classes.minus} >
                                        <AddtoCart flower={item} amount={-1}>-</AddtoCart>
                                    </div>
                                    <span>{item.quantity}</span>
                                    <div className={classes.plus} >
                                        <AddtoCart flower={item} amount={1}>+</AddtoCart>
                                    </div>
                                </div>

                                <span className={classes.itemtotal} >${item.quantity * item.price}</span>

                                <button onClick={() => handleRemove(item)} className={classes.removebtn}>Remove</button>
                            </div>
                        )
                    }) : <p>No Item Selected</p>

                }

                {
                    (cart.length > 0) && <div className={classes.cartsummary} >
                        <h4>Sub-total:${subtotal}</h4>
                        <h4>GST:${gst}</h4>
                        <Link href="/my-cart/checkout" className={classes.checkout}>Checkout({total})</Link>
                    </div>
                }


            </div>
        </div>
    )
}