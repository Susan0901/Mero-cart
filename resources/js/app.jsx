import './bootstrap';
import '../css/app.css';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Router } from './routes/Router';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster } from 'react-hot-toast';
import { GOOGLE_CLIENT_ID } from './constants/api';
import { AuthProvider } from './context/AuthContext';

function App() {
    return (
        <AuthProvider>
            <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                <RouterProvider router={Router} />
                <Toaster position="top-right" />
            </GoogleOAuthProvider>
        </AuthProvider>

    );
}

createRoot(document.getElementById('root')).render(<App />);
