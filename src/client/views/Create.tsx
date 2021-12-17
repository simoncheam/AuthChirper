import React from 'react'
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Chirps, CreateChirps, Tags } from '../client_types'
import { Button, Input, PageLayout } from '../components/common';
import { APIService } from '../services/APIService';


export const Form = styled.form`
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
    let nav = useNavigate();
    const loc = useLocation();

    // clarify for using for multiple routes? chirps and tags, is it appropriate to combine or separate

    const [formFields, setFormFields] = useState<CreateChirps>({
         content: '', 
         tagid: 0, 
         location: '' });

    const [loading, setLoading] = useState(false);
    const [tags, setTags] = useState<Tags[]>([]);
   
    
    //const [isAuthed, setIsAuthed] = useState(null);


    //   Handle Input Change    ------------------------

    

    const handleInputChange = (e) => {
        e.persist();
        setFormFields(s => ({
            ...s,  //previous fields
            [e.target.name]: e.target.value,
        }))
        console.log(formFields.tagid)
        console.log(formFields.content);
    }
  

    //                 ------------------------

    //const [chirps, setChirps] = useState<Chirps[]>([]);
    //add API service
    
    useEffect(() => {

        APIService(`/api/tags`)
        .then((t) => {
            setTags(t)
        })
        .catch(e => console.log(e))

    }, [])

    


    const handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true)

       console.log(formFields.content);
       console.log(formFields.tagid);


        if (!formFields.content || !formFields.tagid)
            return alert('content or tag fields missing!');

        APIService('/api/chirps', 'POST',
            
            formFields
        )
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
                

                    <label className="row" >🏷 Tag</label>
                    <select value={formFields.tagid} onChange={handleInputChange} className="form-control" name = "tagid">

                        <option value={0}> Select a Tag for your Chirp</option>

                        {tags.map(t => (
                            <option key={`tag-option-${t.id}`} value={Number(t.id)} >

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
