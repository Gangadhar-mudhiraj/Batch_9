import mongoose from 'mongoose';
import app from './app.js';

const PORT = process.env.PORT || 3000;

const connectDb = async () => {
    try {
        const mongoUri = process.env.MONGO_URI;

        // Ensure the MONGO_URI variable is properly defined
        if (!mongoUri) {
            throw new Error("MONGO_URI is not defined in the environment variables.");
        }

        // Connect to MongoDB
        await mongoose.connect(`${mongoUri}`);
        console.log('Connected to MongoDB Atlas');

        // Start the server
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error connecting to MongoDB Atlas:', error);
    }
}

connectDb();
