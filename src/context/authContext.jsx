import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const AuthContext = createContext();

const API_URL = 'https://moneyfulpublicpolicy.co.kr';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get(`${API_URL}/user`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(response => {
                setUser(response.data);
            }).catch(() => {
                localStorage.removeItem('token');
                navigate('/login');
            });
        }
    }, [navigate]);

    const login = async (credentials) => {
        try {
            const response = await axios.post(`${API_URL}/login`, credentials);
            localStorage.setItem('token', response.data.accessToken);
            setUser(response.data);
            navigate('/');
        } catch (error) {
            throw new Error('로그인 실패: ' + error.response.data.message);
        }
    };

    const register = async (credentials) => {
        try {
            await axios.post(`${API_URL}/register`, credentials);
        } catch (error) {
            throw new Error('회원가입 실패: ' + error.response.data.message);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login');
    };

    const updateProfile = async (profileData) => {
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('avatar', profileData.avatar);
        formData.append('nickname', profileData.nickname);

        try {
            const response = await axios.patch(`${API_URL}/profile`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            });

            setUser(response.data);
        } catch (error) {
            throw new Error('프로필 업데이트 실패: ' + error.response.data.message);
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout, register, updateProfile }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
