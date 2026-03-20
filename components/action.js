'use server'
import { redirect } from "next/navigation"
import { request } from "./fetchingdata"


function sanitize(input) {
    return input.replace(/<[^>]*>?/gm, '').trim()
}


const emailRegex = /^\S+@\S+\.\S+$/

export async function submitRequest(prevState, formData) {
    const requested = {
        name: sanitize(formData.get('name')),
        email: sanitize(formData.get('email')),
        phone: sanitize(formData.get('phone')),
        address: sanitize(formData.get('address')),
        service: sanitize(formData.get('service')),
        others: sanitize(formData.get('other'))
    }


    if (!requested.name || !requested.phone || !requested.address || !requested.service) {
        return { message: 'Please fill all required fields' }
    }


    if (!emailRegex.test(requested.email)) {
        return { message: 'Invalid email address' }
    }


    await request(requested)

    redirect('/')
}