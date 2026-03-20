import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function GET(req) {
    const url = new URL(req.url);
    const sessionId = url.searchParams.get('session_id');

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    return new Response(JSON.stringify({ paid: session.payment_status === 'paid' }), { status: 200 });
}