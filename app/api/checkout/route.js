import { selectedOrderByToken } from '@/components/fetchingdata';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
    const { token } = await req.json();

    const order = await selectedOrderByToken(token);
    if (!order || order.status !== 'pending') {
        return new Response(JSON.stringify({ error: 'Invalid or already processed order' }), { status: 400 });
    }

    const cart = JSON.parse(order.cartItem);

    const line_items = cart.map(item => ({
        price_data: {
            currency: 'cad',
            product_data: { name: item.title },
            unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/my-cart`,
        metadata: { orderId: order.id }
    });

    return Response.json({ url: session.url });
}