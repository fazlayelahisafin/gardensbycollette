'use client'
import { ShowDeleteflower } from '@/components/fetchingdata'
import classes from './page.module.css'
import { useContext, useState } from 'react'
import { useRouter } from 'next/navigation'
import { handleDelete } from '@/components/handleDelete'
import { CartContext } from '@/components/context'
export default function DeleteFlowers() {
    const [item, setItem] = useState(null)
    const router = useRouter()
    const { setCart } = useContext(CartContext)
    async function handleSubmit(e) {
        e.preventDefault()
        const formData = new FormData(e.target)
        const title = formData.get('title')
        const gotItem = await ShowDeleteflower(title)
        setItem(gotItem)

    }

    return (
        <div className={classes.container}>

            <h1>Flower Manager</h1>

            <form className={classes.searchbox} onSubmit={handleSubmit} >
                <input type="text" name='title' placeholder="Enter Flower Title" />
                <button type='submit'>Search</button>

            </form>
            <p onClick={() => router.push('../modify-listing')}>Back</p>

            {
                item && <div className={classes.resultsection}>

                    <div className={classes.flowercard}>
                        <p><strong>ID:</strong>{item.id}</p>
                        <p><strong>Title:</strong>{item.title}</p>
                        <p><strong>Description:</strong>{item.description}</p>
                        <button className={classes.deletebtn} onClick={() => {
                            handleDelete(item.title)
                            setItem(null)
                            setCart([])
                        }}>Delete</button>

                    </div>
                </div>
            }

        </div>
    )
}