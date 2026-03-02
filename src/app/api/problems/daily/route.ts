import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import { Problem } from "@/models/Problem";
import { DailyChallenge } from "@/models/DailyChallenge";

export async function GET() {
    try {
        await connectToDatabase();

        // 1. Check if an admin has explicitly set a challenge for today
        const todayStr = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
        const manualChallenge = await DailyChallenge.findOne({ dateId: todayStr }).lean();

        if (manualChallenge) {
            return NextResponse.json({ problemId: manualChallenge.problemId }, { status: 200 });
        }

        // 2. Fallback to deterministic pseudo-random daily indexing
        const count = await Problem.countDocuments();
        if (count === 0) {
            return NextResponse.json({ error: "No problems available" }, { status: 404 });
        }

        // Use today's date string as a deterministic seed
        const today = new Date().toDateString();
        let hash = 0;
        for (let i = 0; i < today.length; i++) {
            hash = today.charCodeAt(i) + ((hash << 5) - hash);
        }

        // Ensure positive index
        const index = Math.abs(hash) % count;

        const problem = await Problem.findOne().skip(index).lean();

        if (!problem) {
            return NextResponse.json({ error: "Could not fetch daily problem" }, { status: 500 });
        }

        return NextResponse.json({ problemId: problem.problemId || problem._id }, { status: 200 });

    } catch (error: any) {
        console.error("Error fetching daily problem:", error);
        return NextResponse.json({ error: "Failed to fetch daily problem" }, { status: 500 });
    }
}
