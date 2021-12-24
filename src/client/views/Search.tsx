import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from "react-router-dom";
import { Chirps, Tags, Users } from '../client_types'
import { Button, Input, PageLayout } from '../components/common';
import { APIService } from '../services/APIService';
import { Form } from './Create';

const Search = () => {

    let nav = useNavigate();

    // State tags, chirps, users       ------------------------
    const [tags, setTags] = useState<Tags[]>([]);
    const [users, setUsers] = useState<Users[]>([]);
    
    const [chirps, setChirps] = useState<Chirps[]>([]);
    const [results, setResults] = useState<Chirps[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    
    const [searchStatus, setSearchStatus] = useState(false);



    const [new_tag_name, setNewTag_name] = useState("");
    const [loading, setLoading] = useState(false);


    const handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!searchTerm) return alert('Fill out the fields!')


        // data that includes searchterm

        // Call search function


    };



    useEffect(() => {

        //filter for matches on searchTerm update
        const getMatches = getChirps(searchTerm);
        setResults(getMatches);


    }, [searchTerm])




    useEffect(() => {

        APIService('/api/tags')
            .then(t => setTags(t))
            .catch(e => {
                setSearchStatus(false)
                console.log(e)
            })


        APIService(`/api/chirps`)
            .then(data => {
                setChirps(data);
            })
            .catch(error => {
                console.log(error);
                setSearchStatus(false)

            });

        APIService(`/api/users`)
            .then(data => {
                setUsers(data);
            })
            .catch(error => {
                setSearchStatus(false)

                console.log(error);
            });

        // Add auth/validate router?



    }, []);


    if (!users || !chirps || !tags) { return <h1>LOADING...</h1> }

    const getChirps = (name: string) => {
        const matches = chirps.filter(chirp => chirp.content.toLowerCase().includes(name.toLowerCase()) || chirp.location.toLowerCase().includes(name.toLowerCase()))
        return matches;
    }

    return (
        <PageLayout>
            <h1 className="display-3 m-10 text-center">Search</h1>

            <div className="row justify-content-center">

                <Form onSubmit={handleSubmit} >
                    <span>What are you looking for?</span>

                    {/* tag */}
                    <Input
                        value={searchTerm}
                        onChange={
                            (e: React.ChangeEvent<HTMLInputElement>) => {
                                e.preventDefault();
                                setSearchTerm(e.target.value);
                            }}

                        name="content"
                        type="text"
                        placeholder="search by tag, user, or content..."
                        maxLength={36}
                    />



                    <Button large type="submit" disabled={loading}>
                        {loading ? 'Searching...' : 'Search'}
                    </Button>



                </Form>
                <h1 className="display-3 m-10 text-center">Your Search Results:</h1>
                
                
                <div className="row justify-content-center">
                    {!searchTerm &&

                    
                    }


                </div>




                {/* if search item = true, return cards with content match */}

                {searchStatus && (
                    <div> search results here
                    </div>
                )
                }





            </div>




        </PageLayout>
    )
}

export default Search
