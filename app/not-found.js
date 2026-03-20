import Link from "next/link";
export default function NotFound() {
    return (
        <div className="notfound-container">
            <h1 className="notfound-title">404</h1>

            <h2 className="notfound-subtitle">Page Not Found</h2>

            <p className="notfound-message">
                Sorry, the page you are looking for does not exist.
            </p>

            <Link href="/" className="notfound-button">
                Go Back Home
            </Link>
        </div>
    );
}