import React from 'react'
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Chirps } from '../client_types'
import { Button, Input, PageLayout } from '../components/common';
import { APIService } from '../services/APIService';
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

const Create = () => {

    // State Setting      ------------------------
    const [formFields, setFormFields] = useState({ content: string, tag: string, location: string });

    const [loading, setLoading] = useState(false);

    //const [isAuthed, setIsAuthed] = useState(null);

    let nav = useNavigate();
    const loc = useLocation()



    //   Handle Input Change    ------------------------

    const handleInputChange = (e) => {
        e.persist();
        setFormFields(s => ({
            ...s,
            [e.target.name]: e.target.value
        }))

    }

    //                 ------------------------

    //const [chirps, setChirps] = useState<Chirps[]>([]);
    //add API service
    useEffect(() => {

        return () => {

        }
    }, [])


    const handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true)

        const { content, tag, location } = formFields;

        if (!content || !tag)
            return alert('content or tag fields missing!');

        APIService('/api/chirps', 'POST',
            {
                
                content: content,
                tagid: tag,
                location: location
            })
            .then(data => {
                console.log(data);
                nav(`/`)
            })
            .catch(e => {
                console.log(e)
                alert(e);
                nav(`/login`)
            })




    }

    //                 ------------------------

    return (
        <PageLayout>

            <h1 className="display-3 m-5 text-center">Create</h1>

            <Form onSubmit={handleSubmit}>
                <span>What's on your mind?</span>

                {/* content */}
                <Input
                    value={formFields.content}
                    onChange={handleInputChange}
                    name="content"
                    type="text"
                    placeholder="your chirp"
                />
                {/* tag */}
                <Input
                    value={formFields.tag}
                    onChange={handleInputChange}
                    name="tag"
                    type="text"
                    placeholder="Add a #hashtag!"
                />


                {/* Location */}
                <Input
                    value= 'FL'//{formFields.location}
                    onChange={handleInputChange}
                    name="location"
                    type="text"
                    placeholder="Where are you writing from"
                />
                <Button large type="submit" disabled={loading}>
                    {loading ? 'Posting...' : 'Post Your Chirp'}
                </Button>



            </Form>

        </PageLayout>
    )
}



export default Create
