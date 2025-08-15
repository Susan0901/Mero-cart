import { createBrowserRouter } from "react-router-dom";
import Welcome from "../pages/Welcome";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/Dashboard";

export const Router = createBrowserRouter([
    {
        path: '/',
        element: <Welcome />
    },
    {
        path: '/login',
        element: <Login />
    }, {
        path: '/dashboard',
        element: <Dashboard />
    }
]);
