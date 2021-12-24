import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from "react-router-dom";
import { Tags } from '../client_types'
import { Button, Input, PageLayout } from '../components/common';
import { APIService } from '../services/APIService';
import { Form } from './Create';

const CreateTag = () => {

    let nav = useNavigate();

    const [tags, setTags] = useState<Tags[]>([]);
    const [new_tag_name, setNewTag_name] = useState("");
    const [loading, setLoading] = useState(false);


    const handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!new_tag_name) return alert('Fill out the fields!')


        APIService(`/api/tags`, 'POST', {
            name: new_tag_name
        })
            .then(data => {
                nav(`/create`)
            })
            .catch(e => {
                console.log(e)
            })
    };

    useEffect(() => {
        APIService('/api/tags')
            .then(t => setTags(t))
            .catch(e => console.log(e))
    }, []);








    return (
        <PageLayout>
            <h1 className="display-3 m-10 text-center">Create New Tag</h1>

            <div className="row justify-content-center">

                <Form onSubmit={handleSubmit} >
                    <span>🏷 Tag Name:</span>

                    {/* tag */}
                    <Input
                        value={new_tag_name}
                        onChange={
                            (e: React.ChangeEvent<HTMLInputElement>) => {
                                e.preventDefault();
                                setNewTag_name(e.target.value);
                            }}

                        name="content"
                        type="text"
                        placeholder="enter new tag name"
                    />



                    <Button large type="submit" disabled={loading}>
                        {loading ? 'Creating Tag...' : 'Create Your Tag'}
                    </Button>



                </Form>





            </div>




        </PageLayout>
    )
}

export default CreateTag
