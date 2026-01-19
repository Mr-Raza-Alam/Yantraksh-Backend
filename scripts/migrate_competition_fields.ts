import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.DATABASE_URL || "";

// Define a minimal Mongoose schema for Competition to talk to the existing collection
const CompetitionSchema = new mongoose.Schema({
    name: String,
    title: String,
    category: String,
    type: String,
    image: String,
    specs: [String],
    prize: mongoose.Schema.Types.Mixed
}, { strict: false });

const Competition = mongoose.model('Competition', CompetitionSchema, 'Competition');

const migrateFields = async () => {
    try {
        if (!MONGO_URI) {
            throw new Error("DATABASE_URL is not defined");
        }

        console.log("Connecting to MongoDB...");
        await mongoose.connect(MONGO_URI);
        console.log("Connected.");

        const competitions = await Competition.find({});
        console.log(`Found ${competitions.length} competitions.`);

        for (const comp of competitions) {
            const updates: any = {};
            const doc = comp.toObject();

            // 1. Fix Title (copy from name if missing)
            if (!doc.title && doc.name) {
                console.log(`Competition ${comp._id}: Setting title = name (${doc.name})`);
                updates.title = doc.name;
            } else if (!doc.title && !doc.name) {
                console.log(`Competition ${comp._id}: No name or title, setting default title`);
                updates.title = "Untitled Competition";
            }

            // 2. Fix Category
            if (!doc.category) {
                updates.category = "General";
            }

            // 3. Fix Type
            if (!doc.type) {
                updates.type = "SOLO"; // Default to SOLO
            }

            // 4. Fix Image
            if (!doc.image) {
                updates.image = "default-image";
            }

            // 5. Fix Specs
            if (!doc.specs) {
                updates.specs = [];
            }

            // 6. Fix Prize (ensure string)
            if (typeof doc.prize === 'number') {
                updates.prize = String(doc.prize);
            } else if (!doc.prize) {
                updates.prize = "0";
            }

            if (Object.keys(updates).length > 0) {
                console.log(`Updating ${comp._id} with:`, updates);
                await Competition.updateOne({ _id: comp._id }, { $set: updates });
            }
        }

        console.log("Migration complete.");
        process.exit(0);
    } catch (error) {
        console.error("Migration failed:", error);
        process.exit(1);
    }
};

migrateFields();
