import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { BASE_URL } from '../../constants/api';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function GoogleAuth() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleGoogleLoginSuccess = async (credentialResponse) => {
        const token = credentialResponse.credential;

        try {
            const response = await axios.post(`${BASE_URL}/auth/google`, { token }, {
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.status === 200) {
                login(response.data?.auth_user, response.data?.token, response.data?.message);
                if (response.data?.auth_user.isAdmin) {
                    setTimeout(() => {
                        navigate('/dashboard')
                    }, 2000);
                } else {
                    setTimeout(() => {
                        navigate('/')
                    }, 2000);
                }

            }
        } catch (error) {
            toast.error('Login failed');
        }
    };

    return <GoogleLogin onSuccess={handleGoogleLoginSuccess} onError={console.error} />;
}
