import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Admin Login",
            credentials: {
                username: {},
                password: {},
            },
            async authorize(credentials) {
                const validUser = process.env.ADMIN_USERNAME;

                if (credentials.username !== validUser) return null;
                const password = Buffer.from(process.env.ADMIN_PASSWORD_HASH, 'base64').toString('utf-8');
                const isValid = await bcrypt.compare(
                    credentials.password,
                    password
                );

                if (!isValid) return null;


                return { id: "1", name: "ch", role: "admin" };
            },
        }),
    ],

    session: { strategy: "jwt" },

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
            }
            return token;
        },

        async session({ session, token }) {
            session.user.role = token.role;
            return session;
        },
    },

    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };