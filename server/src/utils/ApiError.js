class ApiError extends Error {
    constructor(
        statuscode,
        message = "Something went wrong",
        errors = [],
        stack = ""
    ) {
        super(message);
        this.status = statuscode;
        this.data = null;
        this.success = false;
        this.errors = errors;
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }

    toJSON() {
        return {
            status: this.status,
            message: this.message, // Include the error message
            success: this.success,
            errors: this.errors,
            stack: this.stack, // Optionally include the stack trace (can be removed for security reasons)
        };
    }
}

export { ApiError };

// Example usage:
