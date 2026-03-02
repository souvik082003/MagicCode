import mongoose, { Schema, Document, models } from 'mongoose';

export interface ISolution extends Document {
    userId: mongoose.Types.ObjectId;
    problemId: string;
    title: string;
    content: string; // Markdown explanation
    code: string;
    language: string;
    upvotes: mongoose.Types.ObjectId[];
}

const SolutionSchema = new Schema<ISolution>(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        problemId: { type: String, required: true, index: true },
        title: { type: String, required: true },
        content: { type: String, required: true },
        code: { type: String, required: true },
        language: { type: String, required: true },
        upvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    },
    { timestamps: true }
);

export const Solution = models.Solution || mongoose.model<ISolution>('Solution', SolutionSchema);
