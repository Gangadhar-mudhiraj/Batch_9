import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

const UserContext = createContext();

export const UserProvider = ({ children, navigate }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });
    const [error, setError] = useState(null);
    const URI = import.meta.env.VITE_API_URL;

    // Register and login
    const registerUser = async (username, password, setCategory) => {
        try {
            const response = await axios.post(`${URI}/user/register`, { username, password }, { withCredentials: true });
            const userData = response.data.data;
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            const res = await axios.get(`${URI}/user/category`, { withCredentials: true })

            if (res.status != 201) {
                setCategory("general")
            } else {
                setCategory(res.data.category)
            }
            navigate('/home');
            setError(null);  // Reset error on success
        } catch (error) {
            setError(error.response?.data?.message || "Registration failed.");
            console.error("Registration error:", error);
        }
    };

    // Login
    const loginUser = async (username, password) => {
        try {
            const response = await axios.post(`${URI}/user/login`, { username, password }, { withCredentials: true });
            if (response.data?.data) { // assuming successful login data is in `data`
                const userData = response.data.data;
                setUser(userData);
                localStorage.setItem('user', JSON.stringify(userData));
                navigate('/home');
                setError(null);  // Reset error on success
            } else {
                setError(response?.data?.message || "Login failed.");
            }
        } catch (error) {
            setError(error.response?.data?.message || "Login failed.");
            console.error("Login error:", error);
        }
    };

    // Logout
    const logoutUser = async () => {
        try {
            const res = await axios.get(`${URI}/user/logout`, { withCredentials: true });
            console.log(res);

            setUser(null);
            localStorage.removeItem('user');
            navigate('/login');
            setError(null); // Reset error on logout success
        } catch (error) {
            setError("Logout failed.");
            console.error("Logout error:", error);
        }
    };

    useEffect(() => {
        const verifySession = async () => {
            const savedUser = localStorage.getItem('user');
            if (savedUser) {
                try {
                    const response = await axios.get(`${URI}/user/session`, { withCredentials: true });
                    if (response.data.isLoggedIn) {
                        setUser(JSON.parse(savedUser));
                    } else {
                        logoutUser();
                    }
                } catch (error) {
                    console.error("Session verification error:", error);
                    logoutUser();  // Force logout if session verification fails
                }
            }
        };

        verifySession();
        const intervalId = setInterval(verifySession, 5 * 60 * 1000); // check every 5 minutes
        return () => clearInterval(intervalId);
    }, []);

    return (
        <UserContext.Provider value={{ user, registerUser, loginUser, logoutUser, error }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};
