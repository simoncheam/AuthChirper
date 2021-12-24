import React from 'react'
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { Chirps, CreateChirps, Tags } from '../client_types'
import { Button, Input, PageLayout } from '../components/common';
import { APIService, TOKEN_KEY } from '../services/APIService';
import { Form } from './Create';


const Edit = () => {

    let params = useParams();
    let nav = useNavigate();
    //        ------------------------
    

    const chirp_id = params.chirp_id;
    const [isAuthed, setIsAuthed] = useState(null);
    const [loading, setLoading] = useState(false);
    const [tags, setTags] = useState<Tags[]>([]);




    const loc = useLocation()

    //        ------------------------


    const [formFields, setFormFields] = useState<CreateChirps>({
        content: '',
        tagid: 0,
        location: ''
    });


    const handleInputChange = (e) => {
        e.persist();
        setFormFields(s => ({
            ...s,  //previous fields
            [e.target.name]: e.target.value,
        }))

    }
    // need to update formfields tagid !!

    //        ------------------------


    useEffect(() => {

        APIService(`/api/tags`)
            .then((t) => {
                setTags(t)
            })
            .catch(e => console.log(e))

        APIService(`/api/chirps/${chirp_id}`)
            .then(data => {
                data = data[0]
                setFormFields({
                    ...data,
                    tagid: data.tag_id  // created new tagid prop from SP data
                })




            })
            .catch(e => console.log(e))




    }, [])
    if (!formFields.content) {
        return <h1>Loading...</h1>
    }

    //        ------------------------



    const handleUpdate = (e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true)

       


        if (!formFields.content || !formFields.tagid)
            return alert('content or tag fields missing!');

        APIService(`/api/chirps/${chirp_id}`, 'PUT',

            formFields
        )
            .then(data => {
                nav(`/chirps/${chirp_id}`)
                console.log(data);

            })
            .catch(e => {
                console.log(e)
                alert(e);
                nav(`/login`)
            })
    }





    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const token = localStorage.getItem(TOKEN_KEY);

        console.log(token);
        localStorage.setItem(TOKEN_KEY, token)

        if (confirm('Are you sure?')) {

        }
        APIService(`/api/chirps/${chirp_id}`, 'DELETE')

            .then(() => {
                nav(`/`)

            })
            .catch(e => {
                console.log(e)
                alert(e)
                nav(`/login`);
            })
    }






    return (
        <PageLayout>

            <h1 className="display-3 m-3 text-center">Edit </h1>

            <div className="row justify-content-center" >

                <Form onSubmit={handleUpdate} >
                    <span>Update your chirp?</span>

                    {/* content */}
                    <Input
                        value={formFields.content}
                        onChange={handleInputChange}
                        name="content"
                        type="text"
                        placeholder="your chirp"
                    />

                    <label className="row" >🏷 Tag</label>
                    <select value={formFields.tagid} onChange={handleInputChange} className="form-control" name="tagid">

                        <option value={0}> Update tag? (select below)</option>

                        {tags.map(t => (
                            <option key={`tag-option-${t.id}`} value={Number(t.id)} >

                                #{t.name}
                            </option>
                        ))}
                    </select>

                    {/* location */}
                    <label className="row" >📍 Location </label>
                    <Input
                        value={formFields.location}
                        onChange={handleInputChange}
                        name="location"
                        type="text"
                        placeholder="Where are you writing from"
                    />
                    <div className="m-2">

                        <Button large type="submit" disabled={loading}>
                            {loading ? 'Updating...' : 'Update Your Chirp'}
                        </Button>
                        <div className="m-2"></div>

                        <Button secondary type="button" disabled={loading}
                            onClick={handleDelete}
                        >
                            {loading ? 'Updating...' : 'Delete?'}
                        </Button>
                        <div className="m-2"></div>


                        <Button secondary type="button" disabled={loading}
                            onClick={() => nav(-1)}
                        >
                            {loading ? 'Updating...' : 'Go back?'}
                        </Button>


                    </div>


                </Form>

            </div>


        </PageLayout>
    )
}



export default Edit


