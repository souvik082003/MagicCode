import mongoose, { Schema, Document, models } from 'mongoose';

export interface IDailyChallenge extends Document {
    dateId: string; // YYYY-MM-DD format
    problemId: string; // Ref to Problem model
}

const DailyChallengeSchema = new Schema<IDailyChallenge>(
    {
        dateId: { type: String, required: true, unique: true },
        problemId: { type: String, required: true }
    },
    { timestamps: true }
);

export const DailyChallenge = models.DailyChallenge || mongoose.model<IDailyChallenge>('DailyChallenge', DailyChallengeSchema);
