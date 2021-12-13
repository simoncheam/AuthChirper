import React from 'react'
import { useState, useEffect } from 'react';
import {  useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { ChirpsJoined } from '../client_types'
import { APIService } from '../services/APIService';



const ChirpDetail = () => {

    let params = useParams();
    let navigate = useNavigate();

    const chirp_id = params.chirp_id
    let nav = useNavigate();

    const [isAuthed, setIsAuthed] = useState(null);
    const loc = useLocation()

    const [chirp, setChirp] = useState<ChirpsJoined>();
    const [chirpTag, setChirpTag] = useState<string>();


    useEffect(() => {

        APIService(`/api/chirps/${chirp_id}`)

        .then(data=>{
            data = data[0];
            setChirpTag(data)
            setChirp(data)
        })
        .catch(e=>{
            console.log(e);
        })



        
    }, [])

    if (!chirp ) { return <h1>LOADING...</h1> }



    return (
        <div>
            
        </div>
    )
}



export default ChirpDetail
