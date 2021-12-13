import React from 'react'
import { useState, useEffect } from 'react';
import {  useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import {  } from '../client_types'
import { APIService } from '../services/APIService';


const UserDetail = () => {

    let nav = useNavigate();
    const [isAuthed, setIsAuthed] = useState(null);
    const loc = useLocation()

    //const [chirps, setChirps] = useState<Chirps[]>([]);

    useEffect(() => {
        
        return () => {
            
        }
    }, [])


    return (
        <div>
            UserDetail
            
        </div>
    )
}



export default UserDetail
