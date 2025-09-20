
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Loader } from '../components/Loader'

export const UserLoggedIn = ({ children }) => {
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user.isLoading && user.isAuthenticated) {
            navigate('/dashboard', { replace: true });
        }
    }, [user.isLoading, user.isAuthenticated, navigate]);

    if (user.isLoading) {
        return <Loader />;
    }

    return children;
}