const mongoose = require("mongoose");

async function connectDB() {
    const uri =
        process.env.MONGO_URI ||
        process.env.MONGODB_URI;

    if (!uri) {
        throw new Error(
            "MongoDB URI is missing. Add MONGO_URI to backend/.env"
        );
    }

    try {
        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 10000,
            family: 4
        });

        console.log(
            "MongoDB connected successfully"
        );
    } catch (error) {
        console.error(
            "\nMongoDB connection failed."
        );

        console.error(
            "Check:"
        );

        console.error(
            "1. MongoDB Atlas Network Access"
        );

        console.error(
            "2. Database username/password"
        );

        console.error(
            "3. MONGO_URI in backend/.env"
        );

        console.error(
            "4. URL-encode special characters in your password"
        );

        console.error(
            "\nOriginal error:",
            error.message
        );

        throw error;
    }
}

module.exports = connectDB;