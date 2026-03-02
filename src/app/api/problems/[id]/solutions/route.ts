import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import { Solution } from "@/models/Solution";
import { User } from "@/models/User";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
    try {
        const { id: problemId } = await context.params;
        await connectToDatabase();

        // Ensure User model mapped for population
        User.find().limit(1).catch(() => { });

        const solutions = await Solution.find({ problemId })
            .populate("userId", "name image")
            .sort({ upvotes: -1, createdAt: -1 })
            .lean();

        const formatted = solutions.map((s: any) => ({
            ...s,
            upvoteCount: s.upvotes?.length || 0,
            authorName: s.userId?.name || "Unknown",
            authorImage: s.userId?.image
        }));

        return NextResponse.json({ solutions: formatted }, { status: 200 });
    } catch (error: any) {
        console.error("Error fetching solutions:", error);
        return NextResponse.json({ error: error.message || "Failed to fetch solutions" }, { status: 500 });
    }
}

export async function POST(req: Request, context: { params: Promise<{ id: string }> }) {
    try {
        const { id: problemId } = await context.params;
        const session = await getServerSession(authOptions);

        if (!session || !session.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const data = await req.json();
        const { title, content, code, language } = data;

        if (!title || !content || !code || !language) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        await connectToDatabase();

        const user = await User.findOne({ email: session.user.email }).lean();
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const newSolution = new Solution({
            userId: user._id,
            problemId,
            title,
            content,
            code,
            language,
            upvotes: []
        });

        await newSolution.save();

        return NextResponse.json({ message: "Solution published!", solution: newSolution }, { status: 201 });
    } catch (error: any) {
        console.error("Error publishing solution:", error);
        return NextResponse.json({ error: error.message || "Failed to publish solution" }, { status: 500 });
    }
}
