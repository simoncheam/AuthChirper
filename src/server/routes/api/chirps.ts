import * as express from 'express';

import chirpsDB from '../../database/queries/chirps';

import { ReqUser } from '../../types'
//import { tokenCheck } from '../../middlewares/tokenCheck.mw'


const router = express.Router();

// !!! add high level tokencheck


router.get('/', async (req, res) => {

    try {
        const all_chirps = await chirpsDB.get_all();
        res.status(200).json(all_chirps);

    } catch (error) {
        res.status(500).json({ message: "server error", error: error.sqlMessage })
    }

});

router.get('/:id', async (req, res) => {

    const id = req.params.id;

    try {

        const [one_chirp] = await chirpsDB.get_one_by_id(Number(id));

        if (!one_chirp) {
            res.status(404).json({ message: "Chirp not found!" })

        } else {
            res.status(200).json(one_chirp);
        }
        
    } catch (error) {
        res.status(500).json({ message: "A server errors occurred", error: error.sqlMessage });

    }


})

// add token 
router.post('/', async (req: ReqUser, res) => {
    console.log('INSIDE POST BLOCK');

    const userid = req.user.userid;
    const { tagid, title, content } = req.body;

    console.log(`userid is: ${userid}`);

    //input validation
    if (!content || !title || !tagid) {  //    "userid": 1,
        return res.status(400).json({ message: "Fill out everything!" })
    }


    try {

        const chirpResults = await chirpsDB.create({ title, content, userid });

        //adds tagid with returned Chirpid to Chirptags table (many to many relationship)
        
        //await Chirptagz.create(tagid, blogResults.insertId);

        res.status(201).json({ message: "Chirp created", id: chirpResults.insertId });

    } catch (error) {
        res.status(500).json({ message: "A server errors occurred", error: error.sqlMessage });
    }

});

router.put('/:id', async (req: ReqUser, res) => {

    const { title, content, tagid } = req.body;
    console.log(`req.user.userid : ${req.user.userid}`);

    //define userid by req.user
    const userid = req.user.userid;

    //define blog userid by blog query
    const chirp_id = req.params.id;
    const [one_chirp] = (await chirpsDB.get_one_by_id(Number(chirp_id)))[0]; //grab item at index pos 0

    const { u_id } = one_chirp;
    let chirp_userid = u_id;


    if (userid != chirp_userid){
        return res.status(403).json({ message: "You are not authorized to edit this blog. You can only edit blogs you create." })

   
    }

        console.log({ title, content, userid });// WORKS!
    //console.log({ title, content, a_id });
    console.log('INSIDE BLOG PUT ROUTER!');

    if (!title || !content || !userid) {
        return res.status(400).json({ message: "Fill out everything!" })
    }

    // Something is messed up here:

    try {

        const id = Number(req.params.id);
        await chirpsDB.update({ title, content, userid }, id, userid);

        const blogid = id;

        // ! need to update
       // await blogtagz.update(tagid, blogid)


        res.status(201).json({ message: "Updated Blog!" });

    } catch (error) {

        res.status(500).json({ message: "A server errors occurred", error: error.sqlMessage });
    }

});


router.delete('/:id',  async (req: ReqUser, res) => {

    const id = Number(req.params.id);

    const { tagid } = req.body;

    //define userid by req.user
    const userid = req.user.userid;

    //define blog userid by blog query
    const chirp_id = req.params.id;
    const [one_chirp] = (await chirpsDB.get_one_by_id(Number(chirp_id)))[0]; //grab item at index pos 0

    const { a_id } = one_chirp;
    let blog_userid = a_id;

    if (userid != blog_userid){
        return res.status(403).json({ message: "You are not authorized to edit this blog. You can only edit blogs you create." })

    }

    try {

        // we need to delete: 

        await blogtagz.destroy(id) //needs to be deleted first tagid: BlogTags['tagid'], blogid: BlogTags['blogid']

        await blogz.destroy(id, userid)  /// need to delete blogtag id AND blogid( need blogtag query to delete blogid)  , 

        res.status(200).json({ message: "Deleted Blog!" });

    } catch (error) {
        res.status(500).json({ message: "A server error occurred", error: error.sqlMessage });
    }
})

export default router;
