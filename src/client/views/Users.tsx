import React from 'react'
import { useState, useEffect } from 'react';
import {  useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import {  } from '../client_types'
import { APIService } from '../services/APIService';


const Users = () => {

    let nav = useNavigate();
    const [isAuthed, setIsAuthed] = useState(null);
    const loc = useLocation()

    

    useEffect(() => {
        
        return () => {
            
        }
    }, [])


    return (
        <div>
            Users
            
        </div>
    )
}



export default Users
