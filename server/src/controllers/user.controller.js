import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import Category from "../models/category.model.js"
import asyncHandler from '../utils/asyncHandler.js';

// Function to validate user data
const validateUserData = (username, password) => {
    const errors = [];

    if (!username || typeof username !== 'string' || username.trim() === '') {
        errors.push('Username is required.');
    }
    if (!password || typeof password !== 'string' || password.length < 6) {
        errors.push('Password must be at least 6 characters long.');
    }

    return errors;
};

const getCategory = asyncHandler(async (req, res, next) => {
    try {
        // Check if user ID exists and is valid
        if (!req.user || !req.user._id) {
            return next(new ApiError(400, 'User ID is required'));
        }

        // Fetch categories for the logged-in user
        const data = await Category.find({ userId: req.user._id });

        // If no categories are found, return a 404 error
        if (data.length === 0) {
            return next(new ApiError(404, 'No categories found for this user'));
        }

        // Send successful response
        return res.status(200).json(new ApiResponse(200, { category: data }, 'Categories fetched successfully'));

    } catch (error) {
        // Catch any unexpected errors and pass them to the error handler
        return next(new ApiError(500, `An error occurred: ${error.message}`));
    }
});
// Register and log in user
const registerUser = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        // Validate user data
        const validationErrors = validateUserData(username, password);
        if (validationErrors.length > 0) {
            return next(new ApiError(400, 'Validation Error', validationErrors));
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return next(new ApiError(409, 'Username is already taken.'));
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, password: hashedPassword });

        // Log in the user immediately after registration
        req.login(user, (err) => {
            if (err) {
                return next(new ApiError(500, 'Error occurred during login after registration.', [err.message]));
            }

            return res.status(201).json(new ApiResponse(201, user, 'User registered and logged in successfully', {
                message: 'Welcome! Your account has been created and you are now logged in.',
            }));
        });
    } catch (error) {
        return next(new ApiError(500, 'An error occurred during registration.', [error.message]));
    }
};

// Login user
const loginUser = async (req, res, next) => {
    const { username, password } = req.body;

    // Validate user data
    const validationErrors = validateUserData(username, password);
    if (validationErrors.length > 0) {
        return next(new ApiError(400, 'Validation Error', validationErrors));
    }

    // If the user is authenticated, return user details
    if (req.isAuthenticated()) {
        return res.status(200).json(new ApiResponse(200, req.user, 'Logged in successfully', {
            message: 'Welcome back!',
        }));
    }

    // If the user is not authenticated, trigger an error
    return next(new ApiError(401, 'User authentication failed. Please check your credentials.'));
};

// Logout user
const logoutUser = async (req, res, next) => {
    console.log("Attempting to log out");

    req.logout((err) => {
        if (err) {
            console.error("Error during logout:", err);
            return next(new ApiError(500, 'Logout failed', [err.message]));
        }

        console.log("Logout successful, destroying session");

        req.session.destroy((err) => {
            if (err) {
                console.error("Error destroying session:", err);
                return next(new ApiError(500, 'Failed to destroy session', [err.message]));
            }

            console.log("Session destroyed, clearing cookie");
            res.clearCookie('connect.sid');  // Clear the session cookie

            return res.status(200).json(new ApiResponse(200, null, 'Successfully logged out'));
        });
    });
};


const addCategory = asyncHandler(async (req, res, next) => {
    const { _id: userId } = req.user;
    const { category } = req.body;

    // Validate that category is provided and is a string
    if (!category || typeof category !== 'string' || category.trim() === '') {
        return next(new ApiError(400, 'Category name is required and must be a non-empty string'));
    }

    try {
        // Trim category to avoid leading/trailing spaces
        const trimmedCategory = category.trim();
        console.log(trimmedCategory);

        // Check if the category already exists for this user
        const existingCategory = await Category.findOne({ userId, category: trimmedCategory });

        if (existingCategory) {
            // If the category exists, update it
            existingCategory.category = trimmedCategory;  // You can add other fields to update if necessary
            await existingCategory.save();  // Save the updated category

            // Respond with success
            return res.status(200).json(new ApiResponse(200, existingCategory, 'Category updated successfully'));
        }

        // If the category doesn't exist, create a new one
        const newCategory = new Category({
            userId,
            category: trimmedCategory,
        });

        // Save the new category to the database
        await newCategory.save();

        // Respond with success
        return res.status(201).json(new ApiResponse(201, newCategory, 'Category added successfully'));
    } catch (error) {
        // Catch any unexpected errors
        return next(new ApiError(500, `An error occurred: ${error.message}`));
    }
});



const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next(); // If authenticated, proceed to the next middleware/controller
    }
    // If not authenticated, trigger a 401 Unauthorized error using ApiError
    return next(new ApiError(401, 'You must be logged in to access this resource.'));
};

export { registerUser, loginUser, logoutUser, isLoggedIn, getCategory, addCategory };
