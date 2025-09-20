import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Loader } from '../components/Loader'

export const Auth = ({ children }) => {
    const user = useSelector((state) => state.user);
    const isAuthenticated = user.isAuthenticated;
    const isLoading = user.isLoading;
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            navigate('/login', { replace: true });
        }
    }, [isAuthenticated, isLoading, navigate]);

    if (isLoading) {
        return <Loader />;
    }
    if (!isAuthenticated) {
        return null;
    }

    return children;
}

