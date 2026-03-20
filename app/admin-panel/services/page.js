import { allServices } from "@/components/fetchingdata"
import classes from './page.module.css'
export default async function Services() {
    const service = await allServices()
    return (
        <div className={classes.body}>
            <div className={classes.container}>

                <h1>Requested Services</h1>
                {
                    service.map(service => {
                        return (
                            <div key={service.id} className={classes.requestrow}>
                                <div className={classes.id}>{service.id}</div>
                                <div className={classes.name}>{service.name}</div>
                                <div className={classes.email}>{service.email}</div>
                                <div className={classes.phone}> {service.phone}</div>
                                <div className={classes.address}>{service.address}</div>
                                <div className={classes.service}>{service.service}</div>
                                <div className={classes.others}>{service.others}</div>
                            </div>
                        )
                    })
                }

            </div>

        </div>

    )
}