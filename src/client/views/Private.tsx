import * as React from 'react';
import { Link } from 'react-router-dom';
import { PageLayout } from '../components/common';

const Private = () => {
    return (
        <>
        <PageLayout >


            <div>
                <h1 className="text-center display-1">Welcome to the exclusive VIP Area</h1>
            </div>
            <div className="mt-5 justify-content-center">

                <Link to={`/private/secret1/`} className="btn mx-2 btn-primary">Secret 1</Link>

                <Link to={`/private/vip/`} className="btn mx-2 btn-success">VIP ACCESS </Link>

                {/* <Link to={`/private/users/`} className="btn mx-2 btn-warning">Member Directory </Link> */}
            </div>


        </PageLayout>
        </>
    )
}

export default Private
