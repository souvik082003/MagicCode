import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import { Solution } from "@/models/Solution";
import { User } from "@/models/User";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request, context: { params: Promise<{ id: string }> }) {
    try {
        const { id: solutionId } = await context.params;
        const session = await getServerSession(authOptions);

        if (!session || !session.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectToDatabase();

        const user = await User.findOne({ email: session.user.email }).lean();
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const solution = await Solution.findById(solutionId);
        if (!solution) {
            return NextResponse.json({ error: "Solution not found" }, { status: 404 });
        }

        // Toggle upvote
        const userIdStr = user._id.toString();
        const hasUpvoted = solution.upvotes.some((id: any) => id.toString() === userIdStr);

        if (hasUpvoted) {
            // Remove upvote
            solution.upvotes = solution.upvotes.filter((id: any) => id.toString() !== userIdStr);
        } else {
            // Add upvote
            solution.upvotes.push(user._id);
        }

        await solution.save();

        return NextResponse.json({
            message: hasUpvoted ? "Upvote removed" : "Upvoted!",
            upvotes: solution.upvotes.length,
            hasUpvoted: !hasUpvoted
        }, { status: 200 });

    } catch (error: any) {
        console.error("Error toggling upvote:", error);
        return NextResponse.json({ error: error.message || "Failed to toggle upvote" }, { status: 500 });
    }
}
