import * as React from 'react';
import styled from 'styled-components'



import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { Users } from '../client_types'
import { PageLayout, Button } from '../components/common';
import { APIService } from '../services/APIService';


const Register = () => {

    let nav = useNavigate();
    const [isAuthed, setIsAuthed] = useState(null);
    const loc = useLocation()

    //set user state

    const [userName, setUserName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>(null)

    //const [chirps, setChirps] = useState<Chirps[]>([]);

    const handleSubmitButton = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        //input validation
        if (!userName || !email || password == null)
            return alert('Fill out the fields please 🤦🏻‍♂️');

        
        APIService("/auth/register", 'POST', {
            name: userName,
            email: email,
            password: password

        })
            .then(data => {
                alert('welcome!')
                localStorage.setItem('token', data.token)
                nav(`/create`)

            })
            .catch(e=>{
                console.log(e);
            })

    };



    return (
        <>
        <PageLayout>

            
                <h1 className="display-3 mt-5 text-center">👋 Start Chirping Today! </h1>
                <div className="row mt-5 justify-content-center">

                    <div className="form-group col-6">
                        <input type="text" className="form-control m-2" placeholder="Choose your Username " value={userName} onChange={
                            (e: React.ChangeEvent<HTMLInputElement>) => setUserName(e.target.value)} />

                        <input type="text" className="form-control m-2" placeholder="email" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />

                        <input type="password" className="form-control m-2" placeholder="password" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />



                        <p> Privacy Policy: We hate spam and promise to keep your email address safe </p>

                        <Button large onClick={handleSubmitButton} className="btn btn-primary m-2 shadow ">Click to Create Account!
                        </Button>
                    </div>
                </div>

            
        </PageLayout>
        </>
    )
}

interface RegisterProps {

    email?: string;
    password?: string;
    large: boolean | string

}



export default Register
