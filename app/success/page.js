'use client'
import classes from './page.module.css';
import { useEffect, useContext } from 'react';
import { CartContext } from '@/components/context';
import { useRouter, useSearchParams } from 'next/navigation';
export default function SuccessPage() {

    const { cart, setCart } = useContext(CartContext);
    const router = useRouter();
    const searchParams = useSearchParams();
    const sessionId = searchParams.get('session_id');


    useEffect(() => {
        async function verifyPayment() {
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