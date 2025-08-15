import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(Cookies.get('auth_user') ? JSON.parse(Cookies.get('auth_user')) : null);
    const [token, setToken] = useState(Cookies.get('token') || null);

    const login = (userData, tokenData, message) => {
        Cookies.set('auth_user', JSON.stringify(userData));
        Cookies.set('token', tokenData);
        toast.success(message);
        setUser(userData);
        setToken(tokenData);
    }

    const logout = () => {
        Cookies.remove('auth_user');
        Cookies.remove('token');
        setUser(null);
        setToken(null);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            const currentToken = Cookies.get('token');
            const currentUser = Cookies.get('auth_user') ? JSON.parse(Cookies.get('auth_user')) : null;
            if (currentToken !== token) setToken(currentToken);
            if (currentUser !== user) setUser(currentUser)
        }, 500);

        return () => clearInterval(interval);
    }, [token, user]);

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
