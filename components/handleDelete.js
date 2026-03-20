'use server'
import { deleteFlower } from '@/components/fetchingdata'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
export async function handleDelete(title, setItem) {
    await deleteFlower(title)
    revalidatePath('/', 'layout')
    redirect('/browse-flowers')

}