import React, { useEffect, useState } from 'react'
import { PageLayout } from '../components/common/PageLayout'
import Card from '../components/common/Card'
import { APIService } from '../services/APIService';
import { useLocation, useNavigate } from 'react-router';
import { Chirps } from '../client_types';

const Home = () => {

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

        // APIService(`/auth/validate`)
        //     .then(res => {
        //         const tokenStatus = res.one_user ? true : false;
        //         setIsAuthed(tokenStatus)
        //     })
        //     .catch(e => {
        //         setIsAuthed(false)
        //         console.log('bad token!');
        //         console.log(e);
        //     })


    }, [loc.pathname])





    return (
        <PageLayout>
            <h1 className="display-3 m-10 text-center">Home</h1>
            {chirps.reverse().map(chirp => (

                <Card
                    key={`chirp-${chirp.id}`}
                    id={chirp.id}
                    userid={chirp.userid}
                    content={chirp.content}
                    location={chirp.location}
                    _created={chirp._created}
                />

            ))}

            <p>
                Lorem
            </p>

        </PageLayout>
    )
}
export default Home;