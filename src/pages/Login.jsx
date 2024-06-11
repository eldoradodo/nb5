import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Login = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login({ id, password });
            navigate('/');
        } catch (err) {
            setError('로그인에 실패했습니다.');
        }
    };

    return (
        <div>
            <h2>로그인</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>아이디:</label>
                    <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
                </div>
                <div>
                    <label>비밀번호:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                {error && <p>{error}</p>}
                <button type="submit">로그인</button>
            </form>
            <button onClick={() => navigate('/register')}>회원가입</button>
        </div>
    );
};

export default Login;
