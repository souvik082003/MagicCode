import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '..', '.env.local') });

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    role: { type: String, default: "user" },
    password: { type: String }
}, { strict: false });

const User = mongoose.models.User || mongoose.model('User', userSchema);

async function main() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB.");

        // First, check if the old admin exists
        const oldAdmin = await User.findOne({ email: "souvik.2002@admin.dev" });
        if (oldAdmin) {
            console.log("Found old admin. Updating email to souvik.2003@admin.dev...");

            // Check if the new one already exists
            const existingNew = await User.findOne({ email: "souvik.2003@admin.dev" });
            if (existingNew) {
                console.log("User souvik.2003@admin.dev already exists. Elevating them and demoting the old one.");
                existingNew.role = "admin";
                await existingNew.save();

                oldAdmin.role = "user";
                await oldAdmin.save();
            } else {
                oldAdmin.email = "souvik.2003@admin.dev";
                await oldAdmin.save();
            }
            console.log("Admin email updated successfully.");
        } else {
            console.log("Old admin not found. Trying to see if souvik.2003@admin.dev exists.");
            const existingNew = await User.findOne({ email: "souvik.2003@admin.dev" });
            if (existingNew) {
                existingNew.role = "admin";
                await existingNew.save();
                console.log("Elevated souvik.2003@admin.dev to admin.");
            } else {
                console.log("Neither admin exists! You may need to run the seed script with the new email.");
            }
        }
    } catch (e) {
        console.error("Error:", e);
    } finally {
        await mongoose.disconnect();
    }
}

main();
