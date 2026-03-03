import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import { Problem } from "@/models/Problem";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user?.email) {
            return NextResponse.json({ error: "You must be logged in to submit a question." }, { status: 401 });
        }

        await connectToDatabase();
        const data = await req.json();

        const { title, difficulty, category, language, description, template, testCases } = data;

        if (!title?.trim() || !description?.trim()) {
            return NextResponse.json({ error: "Title and description are required." }, { status: 400 });
        }

        if (!testCases || testCases.length === 0) {
            return NextResponse.json({ error: "At least one test case is required." }, { status: 400 });
        }

        const problemId = title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + "-" + Date.now().toString().slice(-6);

        const newProblem = new Problem({
            problemId,
            title,
            difficulty: difficulty || "Easy",
            category: category || "Custom",
            language: language || "javascript",
            description,
            template: template || "",
            testCases,
            status: "pending",
            submittedBy: session.user.name || session.user.email,
            authorName: session.user.name || "Community",
        });

        await newProblem.save();

        return NextResponse.json({ message: "Question submitted for review!", problem: newProblem }, { status: 201 });
    } catch (error: any) {
        console.error("Error submitting problem:", error);
        return NextResponse.json({ error: error.message || "Failed to submit question" }, { status: 500 });
    }
}
