"use client";
import Link from "next/link";
import { signOut } from "next-auth/react";
import classes from "./page.module.css";

export default function AdminPanel() {
    return (
        <div className={classes.container}>
            <h1 className={classes.title}>Admin Panel</h1>

            <nav className={classes.nav}>
                <ul className={classes.navList}>
                    <li>
                        <Link href="/admin-panel/orders" className={classes.navLink}>
                            Orders
                        </Link>
                    </li>
                    <li>
                        <Link href="/admin-panel/services" className={classes.navLink}>
                            Service
                        </Link>
                    </li>
                    <li>
                        <Link href="/admin-panel/modify-listing" className={classes.navLink}>
                            Modify Listing
                        </Link>
                    </li>
                </ul>
            </nav>
            <button
                className={classes.logoutButton}
                onClick={() => signOut({ callbackUrl: "/login" })}
            >
                Logout
            </button>

        </div>
    );
}