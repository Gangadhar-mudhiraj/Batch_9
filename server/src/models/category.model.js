import mongoose from 'mongoose';

// Define the schema for Category
const categorySchema = new mongoose.Schema(
    {
        category: {
            type: String,
            required: true,
            trim: true,  // Optional: trims any leading/trailing spaces
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,  // Reference to a User document
            ref: 'User',  // Assuming you have a User model
            required: true,
        },
    },
    { timestamps: true }  // Automatically add createdAt and updatedAt fields
);

// Create the Mongoose model
const Category = mongoose.model('Category', categorySchema);

export default Category;
