'use client'
import { useRouter } from "next/navigation"
export default function Error() {
    const router = useRouter()
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Something went wrong</h1>
            <p style={styles.message}>
                An unexpected error occurred. Please try again.
            </p>

            <button onClick={() => router.push('/')} style={styles.button}>
                Try Again
            </button>
        </div>
    )
}

const styles = {
    container: {
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "#f4f4f4",
        textAlign: "center",
        padding: "20px"
    },
    title: {
        fontSize: "36px",
        marginBottom: "10px",
        color: "#2f4f2f"
    },
    message: {
        fontSize: "16px",
        color: "#555",
        marginBottom: "20px"
    },
    button: {
        padding: "10px 20px",
        fontSize: "16px",
        border: "none",
        background: "#2e7d32",
        color: "white",
        borderRadius: "6px",
        cursor: "pointer"
    }
}