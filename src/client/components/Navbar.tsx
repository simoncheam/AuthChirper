import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
//import { APIService } from '../services/APIService';



const Navbar = () => {

    let nav = useNavigate();
    const [isAuthed, setIsAuthed] = useState(null);

    useEffect(() => {





    }, [])








    return (
        <div className="bg-dark">

            <Link type="button" className="m-2 btn btn-outline-primary " to="/"> Home -TEST </Link>

            <Link type="button" className="m-2 btn btn-outline-primary " to="/register"> Register </Link>

            <Link type="button" className="m-2 btn btn-outline-primary " to="/login"> Login </Link>




        </div>
    )
}

export default Navbar
