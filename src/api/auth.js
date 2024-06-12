import axios from 'axios';

const API_URL = 'https://moneyfulpublicpolicy.co.kr';

export const register = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 409) {
            throw new Error('이미 존재하는 아이디입니다.');
        } else {
            throw new Error('회원가입 중 오류가 발생했습니다.');
        }
    }
};

export const login = async (credentials) => {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
};

export const getUserInfo = async (token) => {
    const response = await axios.get(`${API_URL}/user`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};
