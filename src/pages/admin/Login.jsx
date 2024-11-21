import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/auth';
import styled from 'styled-components';
import ErrorModal from '../../components/ErrorModal';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await login(email, password);
            console.log('Login success: ', res);
            navigate('/admin/dashboard');
        } catch (err) {
            console.error('Login failed: ', err);
            if (err?.response?.statue === 403) {
                setErrorMessage(err.response.data.error.message);
                setIsModalOpen(true);
            }
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <Container>
            <Title>TODORIAN ADMIN LOGIN</Title>
            <LoginForm>
            <Input
            type="text"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            <Input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <LoginButton onClick={handleLogin}>로그인</LoginButton>
            </LoginForm>
            <ErrorModal isOpen={isModalOpen} onClose={closeModal} message={errorMessage} />
        </Container>
    );
};

export default AdminLogin;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f5f7fb;
    font-family: 'Arial', sans-serif;
`;

const Title = styled.div`
    font-size: 1.5rem;
    color: #a0a0a0;
    margin-bottom: 30px;
`;

const LoginForm = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f9f9f9;
    padding: 50px;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    width: 350px;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px 15px;
    margin: 10px 0;
    border-radius: 5px;
    border: 1px solid #d9d9d9;
    font-size: 1rem;
    box-sizing: border-box;
`;

const LoginButton = styled.button`
    width: 100%;
    padding: 12px 20px;
    margin-top: 15px;
    background-color: #4a4a4a;
    color: #ffffff;
    border: none;
    border-radius: 5px;
    font-size: 1.1rem;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #363636;
    }
`;