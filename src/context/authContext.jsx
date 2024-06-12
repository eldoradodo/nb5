import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserInfo, login as loginApi, register as registerApi } from '../api/auth';

// AuthContext 생성
const AuthContext = createContext();

// AuthProvider 컴포넌트
export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ isAuthenticated: false, user: null, accessToken: null });
    const navigate = useNavigate();

    // 로그인 함수
    const login = async (credentials) => {
        const response = await loginApi(credentials);
        setAuth({ isAuthenticated: true, user: response.userId, accessToken: response.accessToken });
        localStorage.setItem('accessToken', response.accessToken);
    };

    // 로그아웃 함수
    const logout = () => {
        setAuth({ isAuthenticated: false, user: null, accessToken: null });
        localStorage.removeItem('accessToken');
        navigate('/login');
    };

    // 회원가입 함수
    const register = async (userData) => {
        await registerApi(userData);
    };

    // 인증 상태 확인 함수
    const checkAuth = async () => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            try {
                const response = await getUserInfo(token);
                setAuth({ isAuthenticated: true, user: response.id, accessToken: token });
            } catch (error) {
                logout();
            }
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ auth, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

// useAuth 훅
export const useAuth = () => useContext(AuthContext);
