import React from 'react'
import { useState, useEffect } from 'react';
import {  useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { Chirps } from '../client_types'
import { APIService } from '../services/APIService';


const Edit = () => {

    let nav = useNavigate();
    const [isAuthed, setIsAuthed] = useState(null);
    const loc = useLocation()

    const [chirps, setChirps] = useState<Chirps[]>([]);

    useEffect(() => {
        
        return () => {
            
        }
    }, [])


    return (
        <div>
            <h1 className="display-3 m-3 text-center">Edit </h1>

            
        </div>
    )
}



export default Edit
