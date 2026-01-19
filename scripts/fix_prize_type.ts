import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.DATABASE_URL || "";

// Define a minimal Mongoose schema for Competition to talk to the existing collection
const CompetitionSchema = new mongoose.Schema({
    prize: mongoose.Schema.Types.Mixed // Allow mixed type to read numbers
}, { strict: false }); // Strict false to ignore other fields

const Competition = mongoose.model('Competition', CompetitionSchema, 'Competition'); // Explicit collection name 'Competition'

const fixPrize = async () => {
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
            const prizeValue = comp.get('prize');
            if (typeof prizeValue === 'number') {
                console.log(`Updating competition ${comp._id}: prize ${prizeValue} -> string`);
                // Update using updateOne to force set specific field type if needed, 
                // but just saving as string should work if schema allows it or is stripped.
                // Best to directly update using id
                await Competition.updateOne(
                    { _id: comp._id },
                    { $set: { prize: String(prizeValue) } }
                );
            } else if (typeof prizeValue === 'string') {
                console.log(`Competition ${comp._id} already has string prize: ${prizeValue}`);
            } else {
                console.log(`Competition ${comp._id} has unknown prize type: ${typeof prizeValue}`);
                // Should default to string empty or 0 if null
                if (prizeValue === null || prizeValue === undefined) {
                    await Competition.updateOne(
                        { _id: comp._id },
                        { $set: { prize: "0" } }
                    );
                }
            }
        }

        console.log("Migration complete.");
        process.exit(0);
    } catch (error) {
        console.error("Migration failed:", error);
        process.exit(1);
    }
};

fixPrize();
