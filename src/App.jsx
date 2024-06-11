import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/authContext';

const queryClient = new QueryClient();

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <Router>
                    <Navbar />
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/" element={<Home />} />
                        <Route path="/profile" element={<Profile />} />
                    </Routes>
                </Router>
            </AuthProvider>
        </QueryClientProvider>
    );
};

export default App;
