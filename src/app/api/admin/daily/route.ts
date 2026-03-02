import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import { DailyChallenge } from "@/models/DailyChallenge";
import { Problem } from "@/models/Problem";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// Get manual challenges
export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user?.role !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectToDatabase();

        // Fetch all problems for the dropdown
        const problems = await Problem.find({}).select("problemId title difficulty").lean();

        // Fetch existing manual configurations
        const challenges = await DailyChallenge.find({}).sort({ dateId: -1 }).lean();

        return NextResponse.json({ challenges, problems });
    } catch (error: any) {
        return NextResponse.json({ error: "Failed to fetch daily challenges" }, { status: 500 });
    }
}

// Set or Update a manual challenge
export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user?.role !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { dateId, problemId } = await req.json();

        if (!dateId || !problemId) {
            return NextResponse.json({ error: "dateId and problemId are required." }, { status: 400 });
        }

        await connectToDatabase();

        // Upsert the challenge for that date
        const updated = await DailyChallenge.findOneAndUpdate(
            { dateId },
            { problemId },
            { new: true, upsert: true }
        );

        return NextResponse.json({ message: "Daily challenge set.", challenge: updated });

    } catch (error: any) {
        return NextResponse.json({ error: "Failed to set daily challenge" }, { status: 500 });
    }
}

// Delete a manual challenge
export async function DELETE(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user?.role !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const dateId = searchParams.get("dateId");

        if (!dateId) {
            return NextResponse.json({ error: "dateId query parameter is required." }, { status: 400 });
        }

        await connectToDatabase();
        await DailyChallenge.findOneAndDelete({ dateId });

        return NextResponse.json({ message: "Daily challenge removed." });

    } catch (error: any) {
        return NextResponse.json({ error: "Failed to delete daily challenge" }, { status: 500 });
    }
}
