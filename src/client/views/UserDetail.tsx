import React from 'react'
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { ChirpsJoined, Users } from '../client_types'
import { PageLayout } from '../components/common';
import Card from '../components/common/Card';
import CardDetail from '../components/common/CardDetail';
import { APIService } from '../services/APIService';


const UserDetail = () => {

    const loc = useLocation()
    let nav = useNavigate();
    const [isAuthed, setIsAuthed] = useState(null);

    const [user, setUser] = useState<Users>();
    const [userChirps, setUserChirps] = useState<ChirpsJoined[]>([]);


    const TOKEN_KEY = 'token';
    const token = localStorage.getItem(TOKEN_KEY);

    let params = useParams();
    const user_id = params.user_id;  //!!! needs to match route path


    useEffect(() => {

        APIService(`/api/users/${user_id}`)
            .then(data => {

                setUser(data.one_user)

            })
            .catch(e => console.log(e))

        APIService(`/api/users/${user_id}`)
            .then(data => {
                // data=data;




                setUserChirps(data.user_chirps)
            })
            .catch(e => console.log(e))




    }, [])

    if (!user || !userChirps) { return <h1>LOADING...</h1> }


    return (
        <PageLayout>
            <div className="row mt-5 justify-content-center">
                
                    <h1 className="display-1 text-center"> {user.name} </h1>
                    <div className="row m-5">Hi my name is {user.name}, this is my personal bio. You can email me at {user.email} for more juicy details about my life. Have a nice day:)</div>

                    <div>{user.name}'s timeline...</div>

                        {/* {userChirps[0]} */}
                        {userChirps.map(chirp => (

                            <Card
                                key={`chirp-${chirp.id}`}
                                id={Number(chirp.chirp_id)}
                                userid = {chirp.u_id}
                                //username={chirp.u_name}
                                content={chirp.content}
                                location={chirp.location}
                                // _created={chirp.chirp_created.split('T')[0]}
                                _created={chirp.chirp_created}

                                tag_name={chirp.tag_name}

                            />

                        ))}






                    {/* <div className=" row justify-content-center">
                        <Link to={`/create`} className=" btn m-2 btn-success ">
                            Got Something Interesting To Say? Click Here To Share Your Ideas Today!
                        </Link>
                    </div> */}

                    <div onClick={() => nav(-1)} className="btn mt-2 btn-danger">
                        Go Back?
                    </div>
               
            </div>

        </PageLayout>
    )
}



export default UserDetail
