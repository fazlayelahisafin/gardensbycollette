'use client'

import Link from "next/link"
import { CartContext } from "./context"
import { useContext, useState, useEffect, useRef } from "react"
import { usePathname } from "next/navigation"

export default function Header() {

    const path = usePathname()
    const { cart } = useContext(CartContext)

    const [menuOpen, setMenuOpen] = useState(false)
    const menuRef = useRef(null)

    const toggleMenu = () => setMenuOpen(!menuOpen)
    const closeMenu = () => setMenuOpen(false)

    /* Close menu when clicking outside */
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return (
        <div className="navbar-wrapper">

            <div className="top-bar">
                <span>📍 123 Garden Street, Toronto</span>
                <span>☎ +1 (437) 555-1234</span>
                <span>✉ info@gardensbycollette.com</span>
            </div>

            <div className="header">

                <Link href="/" className="logo">
                    Gardens By Collette
                </Link>

                {/* Cart always visible */}

                {/* Hamburger */}
                <div className="hamburger" onClick={toggleMenu}>
                    ☰
                </div>

                {/* Menu (mobile / desktop hidden for cart link only) */}
                <div
                    ref={menuRef}
                    className={`header-right ${menuOpen ? "show" : ""}`}
                >

                    {/* Close button for mobile */}

                    <Link
                        href="/browse-flowers"
                        onClick={closeMenu}
                        className={path === '/browse-flowers' ? 'act' : undefined}
                    >
                        Browse Flowers
                    </Link>

                    <Link
                        href="/request-service"
                        onClick={closeMenu}
                        className={path === '/request-service' ? 'act' : undefined}
                    >
                        Request Service
                    </Link>

                    <Link
                        href="/my-cart"
                        className={`cart-link ${path === '/my-cart' ? 'act' : ''}`}
                    >
                        Cart ({cart.length})
                    </Link>

                    <Link
                        href="/admin-panel"
                        onClick={closeMenu}
                        className={path === '/admin-panel' ? 'act' : undefined}
                    >
                        Admin
                    </Link>

                </div>

            </div>

        </div>
    )
}