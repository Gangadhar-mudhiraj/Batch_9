import { useState } from 'react';
import { useUser } from '../context/UserContext';
import { FaUserAlt, FaLock } from 'react-icons/fa'; // Icons for username and password

const Login = ({ setCategory }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { loginUser } = useUser();
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        // Client-side validation
        if (!username || !password) {
            setErrorMessage('Both fields are required.');
            return;
        }

        setErrorMessage(''); // Clear previous error message
        await loginUser(username, password, setCategory);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-800 to-purple-900">
            <form onSubmit={handleLogin} className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-96">
                <h1 className="text-3xl font-bold mb-6 text-center text-indigo-300">Login</h1>

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
                <div className="relative mb-6">
                    <FaLock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-md w-full pl-10 pr-3 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                    />
                </div>

                {/* Login button */}
                <button
                    type="submit"
                    className="bg-indigo-600 text-white py-3 rounded-md w-full hover:bg-indigo-700 transition duration-300 focus:ring-2 focus:ring-indigo-500"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
