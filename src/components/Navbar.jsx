import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const Navbar = () => {
    const { auth, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                {auth.isAuthenticated ? (
                    <>
                        <li><Link to="/profile">내 프로필</Link></li>
                        <li><button onClick={handleLogout}>로그아웃</button></li>
                    </>
                ) : (
                    <li><Link to="/login">로그인</Link></li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
