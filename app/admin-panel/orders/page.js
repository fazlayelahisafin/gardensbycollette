import classes from './page.module.css'
import { allOrders } from '@/components/fetchingdata';
import { toFix } from '@/components/tofix';
export const dynamic = 'force-dynamic';
export default async function Orders() {

    let sub;
    const orders = await allOrders()

    return (
        <div className={classes.container}>

            <h1 className={classes.title}>Orders List</h1>

            {
                orders.map(order => {
                    return (
                        order.status === 'paid' && <div key={order.id} className={classes.ordercard}>

                            <div className={classes.customerinfo}>
                                <h2>Customer Information</h2>

                                <p><strong>Name:</strong> {order.name}</p>
                                <p><strong>Phone:</strong>{order.phone}</p>
                                <p><strong>Address:</strong> {order.address}</p>
                                <p><strong>Postal:</strong> {order.postal}</p>
                                <p><strong>Status:</strong> {order.status}</p>
                            </div>


                            <div className={classes.orderitems}>

                                <div className={classes.headerrow}>
                                    <div>Item</div>
                                    <div>Quantity</div>
                                    <div>Price</div>
                                    <div>Total</div>

                                </div>
                                {
                                    JSON.parse(order.cartItem).map(item => {
                                        return (
                                            <div key={item.id} className={classes.itemrow}>
                                                <div>{item.title}</div>
                                                <div>{item.quantity}</div>
                                                <div>${item.price}</div>
                                                <div>${toFix(item.quantity * item.price)}</div>

                                            </div>
                                        )
                                    })
                                }

                            </div>

                            <div className={classes.pricesummary}>
                                <p> <strong>Subtotal: ${
                                    sub = toFix(JSON.parse(order.cartItem).reduce((acc, curr) => (acc + (curr.price * curr.quantity)), 0))
                                }</strong> </p>
                                <p><strong>GST (13%):${toFix(sub * 0.13)}</strong></p>
                                <p className={classes.total}><strong>Total:${toFix(sub + sub * 0.13)}</strong></p>
                            </div>
                            <hr></hr>
                        </div>


                    )
                })
            }

        </div>
    )
}