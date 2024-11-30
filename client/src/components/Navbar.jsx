import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { FaBars, FaUserCircle } from 'react-icons/fa'; // Add icons for mobile toggle and user
import { IoLogOut } from 'react-icons/io5'; // Logout icon

const Navbar = ({ setCategory }) => {
    const { user, logoutUser } = useUser();

    return (
        <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-4">
            <div className="container mx-auto flex justify-between items-center">
                {/* Brand / Logo */}
                <div className="flex items-center space-x-6">
                    <span className="text-3xl font-semibold text-white tracking-wide">
                        NewsPage
                    </span>
                </div>

                {/* Toggle button for mobile */}
                <button
                    className="lg:hidden text-white focus:outline-none"
                    aria-label="Toggle navigation"
                    onClick={() => {
                        const navbarMenu = document.getElementById('navbarMenu');
                        navbarMenu.classList.toggle('hidden');
                    }}
                >
                    <FaBars className="w-7 h-7" />
                </button>

                {/* Navbar Links */}
                <div
                    className="hidden lg:flex space-x-8 items-center"
                    id="navbarMenu"
                >
                    {/* Category Links */}
                    <div className="space-x-6 flex">
                        {["technology", "business", "health", "sports", "entertainment"].map((category) => (
                            <button
                                key={category}
                                className="hover:text-gray-300 transition-all text-lg"
                                onClick={() => setCategory(category)}
                            >
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </button>
                        ))}
                    </div>

                    {/* Right Side: User Actions */}
                    <div className="flex items-center space-x-6">
                        {/* Update Category Link */}
                        <Link
                            to="/updateCategory"
                            className="hover:text-gray-300 flex items-center space-x-1 text-lg"
                        >
                            <FaUserCircle className="w-5 h-5" />
                            <span>Update Category</span>
                        </Link>

                        {user ? (
                            <>
                                <button
                                    onClick={logoutUser}
                                    className="bg-gradient-to-r from-indigo-900 to-purple-700 text-white hover:bg-indigo-800 font-semibold py-3 px-6 rounded-full flex items-center space-x-3 transition duration-200
"
                                >
                                    <IoLogOut className="w-5 h-5" />
                                    <span>Logout</span>
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="hover:text-gray-300 flex items-center space-x-1 text-lg"
                                >
                                    <span>Login</span>
                                </Link>
                                <Link
                                    to="/signin"
                                    className="hover:text-gray-300 flex items-center space-x-1 text-lg"
                                >
                                    <span>Sign In</span>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
