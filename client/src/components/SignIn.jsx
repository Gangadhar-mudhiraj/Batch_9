import { useState } from 'react';
import { useUser } from '../context/UserContext';
import { FaUserAlt, FaLock } from 'react-icons/fa'; // Icons for username and password

const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [reEnterPassword, setReEnterPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { registerUser } = useUser();
    const [errorMessage, setErrorMessage] = useState('');

    const handleSignIn = async (e) => {
        e.preventDefault();

        // Client-side validation
        if (!username || !password || !reEnterPassword) {
            setErrorMessage('All fields are required.');
            return;
        }

        if (password !== reEnterPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        }

        setErrorMessage(''); // Clear previous error message
        await registerUser(username, password);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-800 to-purple-900">
            <form onSubmit={handleSignIn} className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-96">
                <h1 className="text-3xl font-bold mb-6 text-center text-indigo-300">Sign In</h1>

                {/* Error message */}
                {errorMessage && <p className="text-red-500 text-xs italic mb-4">{errorMessage}</p>}

                {/* Username input */}
                <div className="relative mb-4">
                    <FaUserAlt className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-md w-full pl-10 pr-3 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                    />
                </div>

                {/* Password input */}
                <div className="relative mb-4">
                    <FaLock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-md w-full pl-10 pr-3 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                    />
                </div>

                {/* Re-enter Password input */}
                <div className="relative mb-6">
                    <FaLock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Re-enter Password"
                        value={reEnterPassword}
                        onChange={(e) => setReEnterPassword(e.target.value)}
                        className="bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-md w-full pl-10 pr-3 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                    />
                </div>

                {/* Show Password Toggle */}
                <div className="flex items-center mb-4">
                    <input
                        type="checkbox"
                        id="showPassword"
                        checked={showPassword}
                        onChange={() => setShowPassword(!showPassword)}
                        className="mr-2"
                    />
                    <label htmlFor="showPassword" className="text-sm text-gray-300">Show Password</label>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="bg-indigo-600 text-white py-3 rounded-md w-full hover:bg-indigo-700 transition duration-300 focus:ring-2 focus:ring-indigo-500"
                >
                    Register & Log In
                </button>
            </form>
        </div>
    );
};

export default SignIn;
