"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import classes from "./page.module.css";
export default function LoginPage() {

    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);

        const res = await signIn("credentials", {
            redirect: false,
            username: formData.get("name"),
            password: formData.get("password"),
        });

        if (res?.ok) {
            window.location.href = "/admin-panel";
        } else {
            alert("Invalid credentials");
        }
    }

    return (
        <div className={classes.container}>
            <form className={classes.card} onSubmit={handleSubmit}>
                <h1 className={classes.title}>Admin Login</h1>

                <input
                    name="name"
                    type="text"
                    placeholder="Username"
                    className={classes.input}
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    className={classes.input}
                />

                <button className={classes.button}>Login</button>
            </form>
        </div>
    );
}