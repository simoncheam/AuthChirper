import React, { useState, useEffect } from 'react'

import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { Users } from '../client_types'
import { APIService } from '../services/APIService';
import { PageLayout, Input, PasswordInput, Button, Spinner } from '../components/common'
import styled from 'styled-components'
import PropTypes from 'prop-types';
import { string } from 'prop-types';


const Form = styled.form`
    width: 100%;
    max-width: 400px;
    background: white;
    border: 1px solid #eee;
    padding: 16px;
    box-sizing: border-box;
    color: black;
    border-radius: 4px;

    .alt-text{
        text-align: center;
        margin: 10px 0;
    }
    >${Button}:first-of-type{
        margin-top: 40px;

    }

    // ">" notes direct child of Input component
    >${Input}{
        margin-top: 20px;
    }

`


let timeout;



const Login = () => {

    let nav = useNavigate();
    const [isAuthed, setIsAuthed] = useState(null);
    const loc = useLocation()

    const [formFields, setFormFields] = useState<Users>({
        email: '',
        password: ''
    });

    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        e.persist();
        setFormFields(s => ({
            ...s,
            [e.target.name]: e.target.value
        }))

    }

 

    const handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true)


        // const { email, password } = formFields;


        // timeout = setTimeout(() => {
        //     setLoading(false)
        // }, 2000)

        if (!formFields.email || !formFields.password)
            return alert('Fill out all fields!🤦🏻‍♂️');

        APIService('/auth/login', 'POST', formFields)
            //        APIService('/auth/login', 'POST', { formFields })


            .then(data => {
                localStorage.setItem('token', data.token)

                nav(`/`)
                console.log(data);
            })
            .catch(e => console.log(e))

    }





    // const [email, setEmail] = useState<string>('');
    // const [password, setPassword] = useState<string>('');



    return (

        <PageLayout>


            <h1 className="display-3 m-10 text-center">Start Here</h1>

            <div className="row justify-content-center">


                <Form onSubmit={handleSubmit}>

                    {/* add ternary logic for loading state */}
                    {/* {loading ? <Spinner /> : */}
                    <>
                        <span>Login if you have an account</span>


                        <Input
                            value={formFields.email}
                            onChange={handleInputChange}
                            name="email"
                            type="text"
                            placeholder="Email"
                        />

                        <PasswordInput
                            value={formFields.password}
                            onChange={handleInputChange}
                            name="password"
                            type="password"
                        />
                    </>
                    {/* } */}
                    <Button large type="submit" disabled={loading}>
                        {loading ? 'Loading...' : 'Login'}
                    </Button>

                    {/* {!loading && */}
                    <>
                        <div className="alt-text">
                            or
                        </div>
                        <Button 
                        secondary type="button" 
                        onClick={() => nav("/register")}
                        >
                            Register
                        </Button>
                    </>
                    {/* } */}



                </Form>

            </div>


        </PageLayout>

    )
}


export interface LoginProps {

    email?: string;
    password?: string;

}




export default Login
