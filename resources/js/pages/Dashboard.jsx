import { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const { user, token, logout } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (!token || !user?.isAdmin) navigate('/login');
    }, [token, navigate]);

    return (
        <div>
            {user?.name || 'Guest User'}
            {user && <button onClick={logout}>Logout</button>}
        </div>
    )
}
