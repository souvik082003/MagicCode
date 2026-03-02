import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import { User } from "@/models/User";
import { Problem } from "@/models/Problem";
import { Submission } from "@/models/Submission";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user?.role !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectToDatabase();

        const [userCount, problemCount, submissionCount] = await Promise.all([
            User.countDocuments(),
            Problem.countDocuments(),
            Submission.countDocuments(),
        ]);

        return NextResponse.json({
            users: userCount,
            problems: problemCount,
            submissions: submissionCount,
        });

    } catch (error: any) {
        return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
    }
}
