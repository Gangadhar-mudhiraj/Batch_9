import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // Importing useNavigate to redirect
import { IoMdWarning } from "react-icons/io";  // Icon for error message
import { FaCheckCircle } from "react-icons/fa";  // Icon for success message
import { FaArrowCircleRight } from "react-icons/fa";  // Icon for Submit button

const UpdateCategory = ({ setCategory }) => {
    const URL = `${import.meta.env.VITE_API_URL}/user/category`;  // Assuming you have an env variable for API URL
    const navigate = useNavigate();  // Initialize the useNavigate hook to navigate after success
    const [categoryInput, setCategoryInput] = useState("");  // Local state to manage category input
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Handle input change for select dropdown
    const handleCategoryChange = (e) => {
        setCategoryInput(e.target.value);  // Update local state with selected category
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!categoryInput.trim()) {
            setError("Category name is required");
            return;
        }

        setIsLoading(true);
        setError(null);
        setMessage(null);

        try {
            const response = await axios.post(
                URL,
                { category: categoryInput },
                { withCredentials: true }
            );

            // If successful, update category in parent component and display success message
            setCategory(categoryInput); // This updates the category in the parent component
            setMessage(response.data.message || "Category updated successfully!");

            // Clear category input field after successful submission
            setCategoryInput("");

            // Navigate to the home page after successful submission
            navigate("/home");

        } catch (error) {
            // Display error message from backend or default error message
            setError(error.response?.data?.message || "An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-6">
            {/* Welcome Section with Gradient */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-lg shadow-lg mb-6">
                <h2 className="text-2xl font-semibold text-center">Update or Add Category</h2>
            </div>

            {/* Category Form Section */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-lg mb-6">
                {/* Error and Success Messages */}
                {error && (
                    <div className="bg-red-100 text-red-800 p-5 mb-6 rounded-md flex items-center">
                        <IoMdWarning className="mr-3 text-2xl" />
                        <p>{error}</p>
                    </div>
                )}

                {message && (
                    <div className="bg-green-100 text-green-800 p-5 mb-6 rounded-md flex items-center">
                        <FaCheckCircle className="mr-3 text-2xl" />
                        <p>{message}</p>
                    </div>
                )}

                {/* Category Selection Form */}
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="category" className="block text-lg font-medium text-gray-700 mb-3">
                            Category Name
                        </label>
                        <div className="relative">
                            <select
                                id="category"
                                value={categoryInput}  // Using local state for input
                                onChange={handleCategoryChange}
                                className="w-full px-5 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select a category</option>
                                <option value="technology">Technology</option>
                                <option value="business">Business</option>
                                <option value="health">Health</option>
                                <option value="sports">Sports</option>
                                <option value="entertainment">Entertainment</option>
                                <option value="general">General</option>
                            </select>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className={`w-full py-3 px-5 rounded-md text-white ${isLoading ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-700'}`}
                        disabled={isLoading}
                    >
                        <FaArrowCircleRight className="mr-2 inline-block text-xl" />
                        {isLoading ? "Processing..." : "Submit"}
                    </button>
                </form>
            </div>

            {/* Footer Section */}
            <div className="bg-gray-200 p-4 rounded-lg shadow-lg text-center mt-6">
                <p className="text-lg text-gray-800">Bookmark your favorite news articles!</p>
            </div>
        </div>
    );
};

export default UpdateCategory;
