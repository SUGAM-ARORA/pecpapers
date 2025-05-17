import React, { useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {

    const { isSignedIn, isLoaded } = useUser();
    const navigate = useNavigate();
    console.log(isSignedIn,isLoaded)

    useState(() => {
        if (isLoaded && !isSignedIn) {
            navigate('/login');
        }
    }, [isLoaded, isSignedIn])

    return (
        <>
            {children}
        </>
    )
}

export default ProtectedRoute
