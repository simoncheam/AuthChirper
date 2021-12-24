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

      


    }, [loc.pathname])





    return (
        <PageLayout>
            
            <h1 className="display-1 m-10 text-center">Home</h1>
            {chirps.map(chirp => (

                <Card
                    key={`chirp-${chirp.id}`}
                    id={chirp.id}
                    userid={chirp.userid}
                    content={chirp.content}
                    location={chirp.location}
                    _created={chirp._created}
                    
                />

            ))}

            

        </PageLayout>
    )
}
export default Home;