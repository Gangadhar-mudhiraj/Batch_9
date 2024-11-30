import express from 'express';
import passport from 'passport';
import { registerUser, loginUser, logoutUser, isLoggedIn, getCategory, addCategory } from '../controllers/user.controller.js';
import asyncHandler from '../utils/asyncHandler.js';

const router = express.Router();

// Register user route
router.post('/register', asyncHandler(registerUser));

// Login user route
router.post(
    '/login',
    passport.authenticate('local', { session: true }), // Authenticate using passport
    asyncHandler(loginUser)
);

// Logout user route (only accessible if logged in)
router.get('/logout', isLoggedIn, asyncHandler(logoutUser));

// Session route to check if the user is logged in
router.get('/session', isLoggedIn, (req, res) => {
    if (req.isAuthenticated()) {
        return res.json({ isLoggedIn: true, user: req.user });
    }
    return res.json({ isLoggedIn: false });
});


router.get("/category", isLoggedIn, getCategory)

router.post("/category", isLoggedIn, addCategory)

export default router;
