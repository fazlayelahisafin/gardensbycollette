import Stripe from 'stripe';
import { updateStatus } from '@/components/fetchingdata';
import { selectedOrder } from '@/components/fetchingdata';
import { flowerDetails, updateStock } from '@/components/fetchingdata';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export const POST = async (req) => {

    const sig = req.headers.get('stripe-signature');
    const body = await req.text();
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
        event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } catch (err) {
        return new Response(`Webhook Error: ${err.message}`, { status: 400 });
    }


    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const orderId = session.metadata.orderId;
        await updateStatus(orderId, 'paid');
        const order = await selectedOrder(orderId)
        const cart = JSON.parse(order.cartItem);

        await Promise.all(cart.map(async item => {
            const flower = await flowerDetails(item.id);
            const remainingstock = flower.stock - item.quantity;
            await updateStock(flower.id, remainingstock);
        }));

    }

    return new Response(JSON.stringify({ received: true }), { status: 200 });
};