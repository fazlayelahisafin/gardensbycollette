import Image from 'next/image';
import classes from './page.module.css'
import { allFlowers } from '@/components/fetchingdata'
import Link from 'next/link';
import AddtoCart from '@/components/addToCart';
export const dynamic = 'force-dynamic';
export default async function BrowseFlower() {
    const flowers = await allFlowers();
    return (
        <>
            <div className={classes['title-wrapper']}>
                <h1 className={classes['page-title']}>Flowers For Sale</h1>
            </div>
            {
                <main className={classes.container}>
                    <div className={classes['flower-grid']}>
                        {flowers.map(flower => (
                            (flower.stock > 0) && <div key={flower.id} className={classes.card}>
                                <div className={classes['image-wrapper']}>
                                    <Image
                                        src={flower.image}
                                        alt={flower.title}
                                        fill
                                        style={{ objectFit: 'cover', borderRadius: '12px 12px 0 0' }}
                                    />
                                </div>
                                <div className={classes['card-body']}>
                                    <h1>{flower.title}</h1>
                                    <p>{flower.description}</p>
                                    <p className={classes.price}>${flower.price}</p>
                                    <p className={classes.stock}>Stock: {flower.stock}</p>
                                    <div className={classes.butt}>
                                        <Link href={`/browse-flowers/${flower.id}`}>Details</Link>
                                    </div>
                                    <div>
                                        <AddtoCart flower={flower} amount={1}>Add to Cart</AddtoCart>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            }
        </>
    )
}