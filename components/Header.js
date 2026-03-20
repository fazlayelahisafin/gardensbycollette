'use client'
import Link from "next/link"
import { CartContext } from "./context"
import { useContext } from "react"
import { usePathname } from "next/navigation"

export default function Header() {
    const path = usePathname()
    const { cart } = useContext(CartContext)

    return (
        <div className="navbar-wrapper">


            <div className="top-bar">
                <span>📍 123 Garden Street, Toronto</span>
                <span>☎ +1 (437) 555-1234</span>
                <span>✉ info@gardensbycollette.com</span>
            </div>


            <div className="header">
                <Link href="/" className="logo">Gardens By Collette</Link>

                <div className="header-right">
                    <Link href="/browse-flowers" className={path === '/browse-flowers' ? 'act' : undefined} >Browse Flowers</Link>
                    <Link href="/request-service" className={path === '/request-service' ? 'act' : undefined} >Request Service</Link>
                    <Link href="/my-cart" className={path === '/my-cart' ? 'act' : undefined}>Cart ({cart.length})</Link>
                    <Link href="/admin-panel" className={path === '/admin-panel' ? 'act' : undefined}>Admin</Link>
                </div>
            </div>

        </div>
    )
}