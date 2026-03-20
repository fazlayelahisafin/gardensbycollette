import { flowerDetails } from '@/components/fetchingdata'
import classes from './page.module.css'
import Image from 'next/image'
import AddtoCart from '@/components/addToCart'
export default async function Details({ params }) {
    const { id } = await params
    const flower = await flowerDetails(id)
    return (
        <>
            {
                flower && <div className={classes.container}>

                    <div className={classes['image-section']}>
                        <Image
                            src={flower.image}
                            alt="rose"
                            width={600}
                            height={400}
                            className="flower-image"
                        />
                    </div>

                    <div className={classes['details-section']}>
                        <h1> {flower.title}</h1>

                        <p className={classes.price}>${flower.price} </p>

                        <p className={classes.stock}>In Stock:{flower.stock}</p>

                        <p className={classes.description}>
                            {flower.description}
                        </p>

                        <AddtoCart flower={flower} amount={1}>Add to Cart</AddtoCart>

                    </div>

                </div>
            }
        </>
    )
}