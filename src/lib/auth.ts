import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import GithubProvider from "next-auth/providers/github";
// import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import connectToDatabase from "./mongoose";
import { User } from "@/models/User";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "you@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Missing credentials");
                }

                await connectToDatabase();

                let user = await User.findOne({ email: credentials.email });

                // Seed admin user if it doesn't exist during login
                if (credentials.email === "souvik.2003@admin.dev" && credentials.password === "Souvik@2011") {
                    if (!user) {
                        const hashedPassword = await bcrypt.hash("Souvik@2011", 10);
                        user = await User.create({
                            name: "Souvik Admin",
                            email: "souvik.2003@admin.dev",
                            password: hashedPassword,
                            role: "admin",
                            xp: 0,
                        });
                    } else if (user.role !== "admin") {
                        // Upgrade existing account to admin if it was created before roles existed
                        user.role = "admin";
                        await user.save();
                    }
                }

                if (!user) {
                    throw new Error("User not found");
                }

                // If user registered with OAuth, they might not have a password
                if (!user.password) {
                    throw new Error("Please log in with your OAuth provider");
                }

                const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

                if (!isPasswordValid) {
                    throw new Error("Invalid password");
                }

                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    image: user.image,
                    role: user.role || "user",
                };
            }
        })
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user, trigger, session }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            if (trigger === "update" && session) {
                token = { ...token, ...session };
            }
            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.id as string;
                session.user.role = token.role as "user" | "admin";
            }
            return session;
        }
    },
    pages: {
        signIn: '/login', // We will create this page soon
        error: '/login',
    },
    secret: process.env.NEXTAUTH_SECRET,
};
