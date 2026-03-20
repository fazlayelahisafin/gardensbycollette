'use server'
import { redirect } from "next/navigation"
import { uploadFlower } from "./fetchingdata"
import { revalidatePath } from "next/cache"

export async function submitAction(formData) {
    const item = {
        title: formData.get('title'),
        description: formData.get('description'),
        price: formData.get('price'),
        stock: formData.get('stock'),
        image: formData.get('image'),

    }
    await uploadFlower(item)
    revalidatePath('/', 'layout')
    redirect('/browse-flowers')

}