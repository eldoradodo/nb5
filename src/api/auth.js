import axios from 'axios';

const BASE_URL = 'https://moneyfulpublicpolicy.co.kr';

// 회원가입 API
export const register = async (userData) => {
    const response = await axios.post(`${BASE_URL}/register`, userData);
    return response.data;
};

// 로그인 API
export const login = async (credentials) => {
    const response = await axios.post(`${BASE_URL}/login`, credentials);
    return response.data;
};

// 사용자 정보 확인 API
export const getUserInfo = async (token) => {
    const response = await axios.get(`${BASE_URL}/user`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

// 프로필 변경 API
export const updateProfile = async (formData, token) => {
    const response = await axios.patch(`${BASE_URL}/profile`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
};
