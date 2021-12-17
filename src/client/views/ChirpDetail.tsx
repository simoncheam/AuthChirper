import React from 'react'
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { ChirpsJoined } from '../client_types'
import { PageLayout } from '../components/common';
import Card from '../components/common/Card';
import CardDetail from '../components/common/CardDetail';
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

            .then(data => {
                data = data[0];
                setChirpTag(data)
                setChirp(data)
            })
            .catch(e => {
                console.log(e);
            });

        APIService(`/auth/validate`)
            .then(res => {
                const tokenStatus = res.one_user ? true : false;
                setIsAuthed(tokenStatus)
            })
            .catch(e => {
                setIsAuthed(false)
                console.log('bad token!');
                console.log(e);
            })







    }, [loc.pathname])

    if (!chirp) { return <h1>LOADING...</h1> }

    console.log(`chirp.chirp_id: ${chirp.chirp_id}`);

    return (
        <PageLayout>
            <h1 className="display-3 m-10 text-center">Chirp Detail</h1>
            <CardDetail
                chirp_id={chirp.chirp_id}
                content={chirp.content}
                username={chirp.u_name}
                _created={chirp.chirp_created}
                tag_name={chirp.tag_name}

            >

            </CardDetail>
            <div onClick={() => nav(-1)} className="btn mx-2 btn-primary">
                Go Back?
            </div>

        </PageLayout>
    )

}



export default ChirpDetail
