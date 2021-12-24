import { Route, Outlet, Navigate, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import React from 'react'
import { APIService, TOKEN_KEY } from '../../services/APIService';

const PrivateRoute = ({ children }: PrivateRouteProps) => {


    let navigate = useNavigate();
    const [loaded, setLoaded] = useState(false);
    const [isAuthed, setIsAuthed] = useState(null);

    useEffect(() => {

        const TOKEN = localStorage.getItem(TOKEN_KEY);
        console.log(TOKEN);


        if (!TOKEN) {
            navigate(`/login`)
        } else {
            APIService(`/auth/validate`)
                .then(res => {
                    const tokenStatus = res.one_user ? true : false;

                    setIsAuthed(tokenStatus)
                    setLoaded(true);

                })
                .catch(e => {
                    console.log('Your token is bad!');
                    console.log(e);
                    navigate(`/login`)
                })
        }

    }, [])

    if (!loaded) return <></>;




    return (
        <>
            {children}
            <Outlet />

        </>
    )
}

interface PrivateRouteProps {
    path?: string;
    exact?: boolean;
    children?: React.ReactNode;
}
export default PrivateRoute
