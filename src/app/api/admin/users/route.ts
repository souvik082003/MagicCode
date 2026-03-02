import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import { User } from "@/models/User";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user?.role !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectToDatabase();

        const users = await User.find({})
            .select("name email role xp solvedProblems createdAt")
            .sort({ createdAt: -1 })
            .lean();

        return NextResponse.json({ users });
    } catch (error: any) {
        return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
    }
}
