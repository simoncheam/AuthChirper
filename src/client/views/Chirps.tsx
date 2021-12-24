import React from 'react'
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { Chirps } from '../client_types'
import { APIService } from '../services/APIService';


const Chirps = () => {

    let nav = useNavigate();
    const [isAuthed, setIsAuthed] = useState(null);
    const loc = useLocation()

    const [chirps, setChirps] = useState<Chirps[]>([]);

    useEffect(() => {

        APIService(`/api/chirps`)

            .then(data => {
                setChirps(data);
            })
            .catch(error => {
                console.log(error);
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

    if (!chirps) {
        return <h1>Loading...</h1>
    }


    return (
        <div className="row mt-5 justify-content-center">

            {/* Add authed conditions */}

            <h1 className="display-3 m-3 text-center">👋 Welcome To Chirpr</h1>


            <div className="">

                {chirps.reverse().map(chirp => (

                    <div key={`chirp-${chirp.id}`} className="row justify-content-center">

                        <div className="card col-12 col-md-6 shadow-lg m-3">
                            <h5 className="card-header"> {chirp._created} </h5>
                            <div className="card-body">
                                <h5 className="card-title">{chirp.content} </h5>
                                <p className="card-text">{chirp.location}</p>
                                <footer className="blockquote-footer">{chirp.userid} </footer>

                                <Link to={`/chirp/${chirp.id}/`} className="btn mx-2 btn-primary">
                                    Read More
                                    </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}



//export default Chirps
