'use client'
import classes from './page.module.css';
import { useEffect, useContext } from 'react';
import { CartContext } from '@/components/context';
import { notFound, useRouter } from 'next/navigation';
export const dynamic = 'force-dynamic';

export default function SuccessPage() {
    const { setCart } = useContext(CartContext);
    const router = useRouter();

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const sessionId = searchParams.get('session_id');

        if (!sessionId) {
            notFound()
        }

        async function verifyPayment() {
            if (!sessionId) return;

            const res = await fetch(`/api/verify-payment?session_id=${sessionId}`);
            const data = await res.json();

            if (data.paid) {
                setCart([]);
            }

            setTimeout(() => router.push('/'), 2000);
        }

        verifyPayment();
    }, []);

    return (
        <div className={classes.container}>
            <div className={classes.card}>
                <div className={classes.checkmark}>✓</div>
                <h1 className={classes.title}>Payment Successful</h1>
                <p className={classes.subtitle}>
                    Your order has been placed successfully.
                </p>
            </div>
        </div>
    );
}