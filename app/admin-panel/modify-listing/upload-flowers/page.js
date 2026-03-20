'use client'
import { useRef, useState } from 'react'
import classes from './page.module.css'
import { submitAction } from '@/components/submitAction'
import { redirect } from 'next/navigation'
import SubmitReq from '@/components/submitReq'
export default function UploadFlowers() {
    const [selectedImg, setImage] = useState(null)
    const ref = useRef()
    function handleChange(event) {
        const file = event.target.files[0]
        if (file) {
            setImage(file)
        }

    }
    function handleClick() {
        ref.current.click();
    }
    return (
        <div className={classes.body}>
            <div className={classes.formcontainer}>

                <form className={classes.requestform} action={submitAction} >
                    <p onClick={() => { redirect('../modify-listing') }}>Back</p>
                    <h1>Add Flowers</h1>

                    <div className={classes.inputgroup}>
                        <label>Title</label>
                        <input name="title" type="text" placeholder="Enter Title" required />
                    </div>

                    <div className={classes.inputgroup}>
                        <label>Description</label>
                        <input name="description" type="text" placeholder="Enter description" />
                    </div>

                    <div className={classes.inputgroup}>
                        <label>Price</label>
                        <input name="price" type="number" placeholder="Enter Price" required />
                    </div>

                    <div className={classes.inputgroup}>
                        <label>Stock</label>
                        <input name="stock" type="number" placeholder="Enter Stock" required />
                    </div>

                    <div className={classes.inputgroupimage}>
                        <input onChange={handleChange}
                            ref={ref} accept="image/png, image/jpeg"
                            name="image"
                            type="file"
                            placeholder="image"
                            required />
                    </div>
                    <div className={classes.inputgroup}>
                        {selectedImg && <img src={URL.createObjectURL(selectedImg)}
                            alt='selected Image'
                            width={200} />}
                        <button onClick={handleClick} type='button'>Upload Image</button>
                    </div>
                    <SubmitReq>Submit This Item</SubmitReq>

                </form>

            </div>
        </div>

    )
}