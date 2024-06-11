import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register as registerApi } from '../api/auth';

const Register = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await registerApi({ id, password, nickname });
            navigate('/login');
        } catch (err) {
            setError('회원가입에 실패했습니다.');
        }
    };

    return (
        <div>
            <h2>회원가입</h2>
            <form onSubmit={handleRegister}>
                <div>
                    <label>아이디:</label>
                    <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
                </div>
                <div>
                    <label>비밀번호:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    <label>닉네임:</label>
                    <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} />
                </div>
                {error && <p>{error}</p>}
                <button type="submit">회원가입</button>
            </form>
            <button onClick={() => navigate('/login')}>로그인</button>
        </div>
    );
};

export default Register;
