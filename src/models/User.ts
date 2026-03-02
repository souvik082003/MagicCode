import mongoose, { Schema, Document, models } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    password?: string;
    image?: string;
    xp: number;
    solvedProblems: string[];
    role: "user" | "admin";
    settings?: {
        defaultLanguage: string;
        theme: string;
        vimMode: boolean;
    };
}

const UserSchema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String }, // Optional for OAuth
        image: { type: String },
        xp: { type: Number, default: 0 },
        solvedProblems: [{ type: String }],
        role: { type: String, enum: ["user", "admin"], default: "user" },
        settings: {
            defaultLanguage: { type: String, default: 'javascript' },
            theme: { type: String, default: 'vs-dark' },
            vimMode: { type: Boolean, default: false },
        },
    },
    { timestamps: true }
);

export const User = models.User || mongoose.model<IUser>('User', UserSchema);
