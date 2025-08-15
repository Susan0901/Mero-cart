import { useEffect, useState } from 'react'
import GoogleAuth from '../../components/auth/GoogleAuth';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const { user, token } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (token && user?.isAdmin) navigate('/dashboard');
        if (token && !user?.isAdmin) navigate('/');
    }, [token]);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        remember_me: false
    });

    const disabled = !formData.email || !formData.password;

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData, [name]: type === 'checkbox' ? checked : value
        });
    }

    const handleLoginFormSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);

        try {
            const response = await axios.post('https://mero-cart.com/api/login', formData, {
                headers: {
                    Accept: 'application/json'
                }
            });

            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <form onSubmit={handleLoginFormSubmit}>
                <input type='email' name='email' placeholder='Email' value={formData.email} onChange={handleInputChange} />
                <input type='password' name='password' placeholder='Password' value={formData.password} onChange={handleInputChange} />
                <input type='checkbox' name='remember_me' value={formData.remember_me} onChange={handleInputChange} /> Remember me
                <button type="submit" disabled={disabled} className={`${(disabled) && 'bg-gray-400 text-gray-700 cursor-not-allowed opacity-50'}`}>Login</button>

            </form>

            <GoogleAuth />

        </div>
    )
}
