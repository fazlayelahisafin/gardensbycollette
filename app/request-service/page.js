'use client'
import classes from './page.module.css'
import { submitRequest } from '@/components/action'
import SubmitReq from '@/components/submitReq'
import { useActionState } from 'react'

export default function RequestService() {
    const [state, formAction] = useActionState(submitRequest, { message: null })

    return (
        <div className={classes.body}>
            <div className={classes.formcontainer}>
                <form action={formAction} className={classes.requestform}>
                    <h1>Request a Service</h1>

                    <div className={classes.inputgroup}>
                        <label>Name</label>
                        <input name="name" type="text" placeholder="Enter your name" required />
                    </div>

                    <div className={classes.inputgroup}>
                        <label>Email</label>
                        <input name="email" type="email" placeholder="Enter your email" required />
                    </div>

                    <div className={classes.inputgroup}>
                        <label>Phone Number</label>
                        <input name="phone" type="text" placeholder="Enter phone number" required />
                    </div>

                    <div className={classes.inputgroup}>
                        <label>Address</label>
                        <input name="address" type="text" placeholder="Enter address" required />
                    </div>

                    <div className={classes.inputgroup}>
                        <label>Request Service</label>
                        <input name="service" type="text" placeholder="Service you want" required />
                    </div>

                    <div className={classes.inputgroup}>
                        <label>Other Queries</label>
                        <textarea name="other" placeholder="Write your message"></textarea>
                    </div>

                    {state.message && <p>{state.message}</p>}

                    <SubmitReq>Submit Request</SubmitReq>
                </form>
            </div>
        </div>
    )
}