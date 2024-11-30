// middlewares/auth.middleware.js
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next(); // User is authenticated, proceed to the next middleware/route handler
    }
    return res.status(401).json({
        success: false,
        message: 'Unauthorized access. Please log in.',
    });
};

export default isAuthenticated;
