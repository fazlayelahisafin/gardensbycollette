'use server'
import { flowerDetails, orders } from "./fetchingdata";
import { notFound } from "next/navigation";
import crypto from 'crypto';

export default async function orderAction(cart, formData) {
    const token = crypto.randomUUID();
    function validation(text) {
        return (!text || text.trim() === '');
    }

    const orderItem = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        address: formData.get('address'),
        postal: formData.get('postal'),
        status: 'pending',
        token
    }
    if (validation(orderItem.name) || validation(orderItem.phone) ||
        validation(orderItem.address)
        || validation(orderItem.postal)

    ) {
        return notFound()

    } else {
        const validatedCart = [];
        for (const item of cart) {
            const flower = await flowerDetails(item.id);

            if (!flower) throw new Error("Invalid product");

            if (item.quantity <= 0 || item.quantity > flower.stock) {
                throw new Error("Invalid quantity");
            }

            validatedCart.push({
                id: flower.id,
                title: flower.title,
                price: flower.price,
                quantity: item.quantity
            });
        }
        orderItem.cartItem = JSON.stringify(validatedCart)
        orders(orderItem)
        return token

    }


}