import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import { User } from "@/models/User";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectToDatabase();
        const user = await User.findOne({ email: session.user.email }).select("settings").lean();

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ settings: user.settings || {} });
    } catch (error: any) {
        return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const data = await req.json();

        await connectToDatabase();

        const updateObj: any = {};
        if (data.defaultLanguage !== undefined) updateObj['settings.defaultLanguage'] = data.defaultLanguage;
        if (data.theme !== undefined) updateObj['settings.theme'] = data.theme;
        if (data.vimMode !== undefined) updateObj['settings.vimMode'] = data.vimMode;

        const user = await User.findOneAndUpdate(
            { email: session.user.email },
            { $set: updateObj },
            { new: true }
        );

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Settings updated", settings: user.settings });
    } catch (error: any) {
        return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
    }
}
