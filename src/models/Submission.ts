import mongoose, { Schema, Document, models } from 'mongoose';

export interface ISubmission extends Document {
    userId: mongoose.Types.ObjectId;
    problemId: string;
    code: string;
    status: "Accepted" | "Wrong Answer" | "Compilation Error" | "Runtime Error";
    language: string;
}

const SubmissionSchema = new Schema<ISubmission>(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        problemId: { type: String, required: true },
        code: { type: String, required: true },
        status: { type: String, enum: ["Accepted", "Wrong Answer", "Compilation Error", "Runtime Error"], required: true },
        language: { type: String, required: true },
    },
    { timestamps: true }
);

export const Submission = models.Submission || mongoose.model<ISubmission>('Submission', SubmissionSchema);
