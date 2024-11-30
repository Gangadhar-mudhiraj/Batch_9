import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { UserProvider, useUser } from './context/UserContext'; // Import useUser here
import Home from './components/Home';
import SignIn from './components/SignIn';
import Login from './components/Login';
import Navbar from './components/Navbar';
import { useState } from 'react';
import UpdateCategory from './components/UpdateCategory';

const ProtectedRoute = ({ children }) => {
  const { user } = useUser(); // Now useUser is defined here
  return user ? children : <Navigate to="/login" replace />;
};

const AppWrapper = () => {
  const [Category, setCategory] = useState("general")
  const navigate = useNavigate(); // Get navigate from useNavigate here

  return (
    <UserProvider navigate={navigate} >
      <Navbar setCategory={setCategory} />
      <Routes>
        <Route path="/login" element={<Login setCategory={setCategory} />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/home" element={<ProtectedRoute><Home Category={Category} /></ProtectedRoute>} />
        <Route path="/updateCategory" element={<ProtectedRoute><UpdateCategory setCategory={setCategory} /></ProtectedRoute>} />
        <Route path="*" element={<RedirectBasedOnUser />} />
      </Routes>
    </UserProvider>
  );
};

// Component for redirecting based on user state
const RedirectBasedOnUser = () => {
  const { user } = useUser();
  return <Navigate to={user ? "/home" : "/login"} replace />;
};

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
