import * as dayjs from 'dayjs'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import styled, { ThemeContext } from 'styled-components';




const Card = ({  id, userid, content, location, _created, tag_name }) => {

    //const { id, setTheme } = useContext(ThemeContext);



    return (
        <StyledCard>

            <div className="">

                {/* {chirps.reverse().map(chirp => ( */}

                    <div key={`chirp-${id}`} className="row justify-content-center">

                        <div className="card col-12 col-md-6 shadow-lg m-3">
                            <h5 className="card-header mt-2"> {dayjs(_created).format('ddd MM/DD/YY @ hh:mm a')} </h5>
                            <div className="card-body">
                                <h5 className="card-title">{content} </h5>
                                <p className="card-text">{location}</p>
                                {/* <footer className="blockquote-footer">
                                    {userid}
                                 
                                
                                </footer> */}

                                <Link to={`/chirps/${id}/`} className="btn mx-2 btn-primary">
                                    Read More
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


background: var(--white)

footer{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
}
`

export default Card
