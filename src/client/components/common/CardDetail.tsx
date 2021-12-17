import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';




const Card = ({  chirp_id, content, location, _created, username, tag_name  }) => {


    return (
        <StyledCard>

            <div className="">

                {/* {chirps.reverse().map(chirp => ( */}

                    <div key={`chirp-${chirp_id}`} className="row justify-content-center">

                        <div className="card col-12 col-md-6 shadow-lg m-3">
                            <h5 className="card-header"> {_created} </h5>
                            <div className="card-body">
                                <h5 className="card-title">{content} #{tag_name}</h5>
                                <p className="card-text">{location}</p>
                                <footer className="blockquote-footer">
                                    
                                created by: {username} 
                                
                                </footer>
                                

                                <Link to={`/chirps/${chirp_id}/edit`} className="btn mx-2 btn-primary">
                                    Edit?
                                </Link>
                            </div>
                        </div>
                    </div>
                {/* ))} */}
            </div>


        </StyledCard>
    )
}

const StyledCard = styled.article`

/* width: 90vw;
max-width:  300px; */
//background: var(--white)

footer{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
}
`

export default Card
