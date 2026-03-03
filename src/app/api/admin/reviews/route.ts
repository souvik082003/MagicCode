import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import { Problem } from "@/models/Problem";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// GET: Fetch all pending submissions for admin review
export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user?.role !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectToDatabase();
        const pending = await Problem.find({ status: "pending" }).sort({ createdAt: -1 }).lean();

        return NextResponse.json({ problems: pending }, { status: 200 });
    } catch (error: any) {
        console.error("Error fetching pending reviews:", error);
        return NextResponse.json({ error: error.message || "Failed to fetch" }, { status: 500 });
    }
}

// PUT: Approve or reject a submission
export async function PUT(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user?.role !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectToDatabase();
        const { problemId, action } = await req.json();

        if (!problemId || !["approve", "reject"].includes(action)) {
            return NextResponse.json({ error: "Invalid request. Provide problemId and action (approve/reject)." }, { status: 400 });
        }

        const newStatus = action === "approve" ? "approved" : "rejected";
        const problem = await Problem.findOneAndUpdate(
            { problemId },
            { status: newStatus },
            { new: true }
        );

        if (!problem) {
            return NextResponse.json({ error: "Problem not found" }, { status: 404 });
        }

        return NextResponse.json({ message: `Problem ${newStatus} successfully`, problem }, { status: 200 });
    } catch (error: any) {
        console.error("Error updating review:", error);
        return NextResponse.json({ error: error.message || "Failed to update" }, { status: 500 });
    }
}
