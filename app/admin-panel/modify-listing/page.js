"use client";

import Link from "next/link";
import classes from "./page.module.css";

export default function ModifyListing() {
    return (
        <div className={classes.container}>

            <nav className={classes.nav}>
                <ul className={classes.navList}>
                    <li>
                        <Link href="/admin-panel/modify-listing/upload-flowers" className={classes.navLink}>
                            Upload Flowers
                        </Link>
                    </li>
                    <li>
                        <Link href="/admin-panel/modify-listing/delete-flowers" className={classes.navLink}>
                            Delete Flowers
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}