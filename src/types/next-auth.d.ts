import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            id: string;
            role: "user" | "admin";
        } & DefaultSession["user"];
    }

    interface User {
        role: "user" | "admin";
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        role: "user" | "admin";
    }
}
