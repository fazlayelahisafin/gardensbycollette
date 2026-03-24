'use client'
import { useContext } from 'react'
import classes from './page.module.css'
import { CartContext } from '@/components/context'
import orderAction from '@/components/orderAction'
import { useRouter } from 'next/navigation'
export default function Checkout() {
    const router = useRouter()
    const { cart } = useContext(CartContext)
    const subtotal = cart.reduce((acc, curr) => acc + curr.quantity * curr.price, 0)

    async function handleSubmit(formData) {

        const token = await orderAction(cart, formData)
        const res = await fetch('/api/checkout', {
            method: 'POST',
            body: JSON.stringify({
                token
            })
        });

        const data = await res.json();
        window.location.href = data.url;

    }

    return (
        <div className={classes.body}>
            <div className={classes.checkoutcontainer}>
                <p onClick={() => router.push('/my-cart')}>Back</p>
                <h1>Checkout</h1>

                <div className={classes.ordersection}>

                    <h2>Your Order</h2>

                    <div className={classes.orderheader}>
                        <span>Item</span>
                        <span>Price</span>
                        <span>Quantity</span>
                        <span>Total</span>
                    </div>


                    {
                        (cart.length > 0) ? cart.map(item => {
                            return (
                                <div key={item.id} className={classes.orderrow}>
                                    <span>{item.title}</span>
                                    <span>${item.price}</span>
                                    <span>{item.quantity}</span>
                                    <span>${item.price * item.quantity}</span>
                                </div>)
                        }) : <p>No Item Selected</p>
                    }

                </div>

                <div className={classes.summary}>

                    {(cart.length > 0) && <> <div className={classes.pricerow}>
                        <span>Subtotal</span>
                        <span>${subtotal}</span>
                    </div>

                        <div className={classes.pricerow}>
                            <span>GST (13%)</span>
                            <span>${Number((subtotal * 0.13).toFixed(2))}</span>
                        </div>

                        <div className={classes.total}>
                            <span>Total Price</span>
                            <span>${Number((subtotal + (subtotal * 0.13)).toFixed(2))}</span>
                        </div>

                        {
                            cart.length > 0 && <div className={classes.deliverysection}>
                                <br></br>
                                <h2>Delivery Location</h2>
                                <form onSubmit={async (event) => {
                                    event.preventDefault();
                                    const formData = new FormData(event.target);
                                    await handleSubmit(formData)
                                }}  >
                                    <input type="text" name='name' placeholder="Full Name" required />
                                    <input type="text" name='phone' placeholder="Phone Number" required />
                                    <input type="text" name='address' placeholder="Address" required />
                                    <input type="text" name='postal' placeholder="Postal Code" required />
                                    <button type='submit' className={classes.orderbtn}>Pay Now</button>
                                </form>


                            </div>
                        }

                    </>
                    }

                </div>

            </div>
        </div>


    )
}