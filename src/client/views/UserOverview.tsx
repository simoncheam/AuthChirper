import * as React from 'react';
import { compareAsc, format } from 'date-fns'
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import { Chirps, Users, Tags } from '../client_types'
import { PageLayout } from '../components/common';
import { APIService } from '../services/APIService';


/*
Goal: 
- page lists all users
- click user to view detailed profile with user specific chirps
*/


const UserOverview = () => {

    let nav = useNavigate();
    let dtFormat = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: false
    });
    const [isAuthed, setIsAuthed] = useState(null);
    const loc = useLocation()

    const [users, setUsers] = useState<Users[]>([]);


    useEffect(() => {

        APIService(`/api/users`)

            .then(data => {
                setUsers(data);
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

    if (!users) { return <h1>LOADING...</h1> }




    return (
        <PageLayout>
            <h1 className="display-3 m-10 text-center">User Overview</h1>
            <div className="">

                {users.reverse().map(user => (

                    <div key={`user-${user.id}`} className="row justify-content-center">

                        <div className="card col-12 col-md-6 shadow-lg m-3">
                            <h5 className="card-header"> {user.name} </h5>
                            <div className="card-body">
                                {/* <h5 className="card-title">{user.email} </h5> */}
                                <p className="card-text"> Member since: {user._created.split('T')[0]}</p>
                                {/* <p className="card-text"> Member since: {dtFormat.format((user._created.toString()))}</p> */}


                                <Link to={`/users/${user.id}/`} className="btn mx-2 btn-primary">
                                    View Timeline
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>




        </PageLayout>
    )
}

export default UserOverview
