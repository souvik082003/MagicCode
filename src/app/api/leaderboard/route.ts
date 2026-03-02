import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import { User } from "@/models/User";

export async function GET() {
    try {
        await connectToDatabase();

        // Fetch top 100 users sorted by XP descending
        const users = await User.find({})
            .select("name email xp solvedProblems")
            .sort({ xp: -1 })
            .limit(100)
            .lean();

        const leaderboard = users.map((u: any, index: number) => ({
            rank: index + 1,
            name: u.name,
            xp: u.xp,
            solvedCount: u.solvedProblems?.length || 0,
            avatarInitials: u.name ? u.name[0].toUpperCase() : "U"
        }));

        return NextResponse.json({ leaderboard }, { status: 200 });
    } catch (error: any) {
        console.error("Error fetching leaderboard:", error);
        return NextResponse.json({ error: "Failed to fetch leaderboard" }, { status: 500 });
    }
}
