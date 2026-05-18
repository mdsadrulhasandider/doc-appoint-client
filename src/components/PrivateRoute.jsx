import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import LoadingSpinner from './LoadingSpinner';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    // Show loading spinner while checking JWT session to prevent premature login redirection on reload
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-base-100">
                <LoadingSpinner />
            </div>
        );
    }

    // If logged in, grant access to children
    if (user) {
        return children;
    }

    // Redirect to login, storing the previous location in history state
    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
