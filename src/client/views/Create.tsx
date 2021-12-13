import React from 'react'
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Chirps, Tags } from '../client_types'
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
    justify-content: center;

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

    //Q: clarify for using for multiple routes? chirps and tags, is it appropriate to combine or separate

    const [formFields, setFormFields] = useState({
         content: string, 
         tag: 0, 
         location: string });

    const [loading, setLoading] = useState(false);
   // const [selectedTagId, setSelectedTagId] = useState(0);
    
    const [tags, setTags] = useState<Tags[]>([]);


    //const [isAuthed, setIsAuthed] = useState(null);

    let nav = useNavigate();
    const loc = useLocation()

    //   Handle Input Change    ------------------------

    //Q: clarify configuration handling multiple states

    const handleInputChange = (e) => {
        e.persist();
        setFormFields(s => ({
            ...s,
            [e.target.name]: e.target.value
        }))
        
    }
    setSelectedTagId(Number(e.target.value))
    console.log('dgdzrfg');

    //                 ------------------------

    //const [chirps, setChirps] = useState<Chirps[]>([]);
    //add API service
    
    useEffect(() => {


        APIService(`/api/tags`)
        .then((t) => {
            setTag(t)
        })
        .catch(e => console.log(e))

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
                location: location,
                tagid: selectedTagId
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
        <PageLayout >

            <h1 className="display-3 m-10 text-center">Create</h1>

            <div className="row justify-content-center">

                <Form onSubmit={handleSubmit} >
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
                    {/* <Input
                        value={formFields.tag}
                        onChange={handleInputChange}
                        name="tag"
                        type="text"
                        placeholder="Add a #hashtag!"
                    /> */}

                    <label className="row" >🏷 Tag</label>
                    <select value={selectedTagId} onChange={handleInputChange} className="form-control">

                        <option value={0}> Select a Tag for your Chirp</option>

                        {tag.map(t => (
                            <option key={`tag-option-${t.id}`} value={t.id}>

                                #{t.name}
                            </option>
                        ))}
                    </select>




                    {/* Location */}
                    <Input
                        value={formFields.location}
                        onChange={handleInputChange}
                        name="location"
                        type="text"
                        placeholder="Where are you writing from"
                    />
                    <Button large type="submit" disabled={loading}>
                        {loading ? 'Posting...' : 'Post Your Chirp'}
                    </Button>



                </Form>

            </div>

        </PageLayout>
    )
}



export default Create
