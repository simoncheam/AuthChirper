import * as express from 'express';

import chirpsDB from '../../database/queries/chirps';
import chirpTagsDB from '../../database/queries/chirptags';
import { tokenCheck } from '../../middleware/tokenCheck.mw';

import { ReqUser } from '../../types'
//import { tokenCheck } from '../../middlewares/tokenCheck.mw'

const router = express.Router();

// !!! add high level tokencheck

// ✅ !!! need to add ChirpTagsJoined to get tag name
router.get('/', async (req, res) => {

    try {
        const all_chirps = await chirpsDB.get_all();
        res.status(200).json(all_chirps);

    } catch (error) {
        res.status(500).json({ message: "server error", error: error.sqlMessage })
    }

});

// ✅
router.get('/:id', async (req, res) => {

    const id = Number(req.params.id);

    console.log(`id: ${id}`);

    try {

        const [one_chirp] = await chirpsDB.get_one_by_id(id);

        if (!one_chirp) {
            res.status(404).json({ message: "Chirp not found!" })

        } else {
            console.log(one_chirp);
            res.status(200).json(one_chirp);
        }

    } catch (error) {
        res.status(500).json({ message: "A server errors occurred", error: error.sqlMessage });

    }

})

// ✅ 
router.post('/', tokenCheck, async (req: ReqUser, res) => {


    
    const userid = req.user.id;  //needs to match jwt.sign token prop (id: req.user.id)
    console.log(`INSIDE POST ROUTE - req.user.id: ${userid}`);

    //const pizza = req.user.pizza




    // need to move user id back to req user after auth done
    const { tagid, content, location } = req.body;

    console.log(`userid is: ${userid}`);

    //input validation
    if (!content || !tagid || !userid) {  //    "userid": 1,
        return res.status(400).json({ message: "Fill out everything!" })
    }


    try {

        const chirpResults = await chirpsDB.create({ content, userid, location });

        //adds tagid with returned Chirpid to Chirptags table (many to many relationship)

        await chirpTagsDB.create(tagid, chirpResults.insertId);

        res.status(201).json({ message: "Chirp created", id: chirpResults.insertId });

    } catch (error) {
        res.status(500).json({ message: "A server errors occurred", error: error.sqlMessage });
    }

});

// ✅ 
router.put('/:id', tokenCheck, async (req: ReqUser, res) => {

    const { location, content, tagid } = req.body;
    // console.log(`req.user.userid : ${req.user.id}`);

    //define userid by req.user
    const userid = req.user.id;
    console.log(userid);

    //define blog userid by blog query
    const chirp_id = req.params.id;
    // temp disable const [one_chirp] = (await chirpsDB.get_one_by_id(Number(chirp_id)))[0]; //grab item at index pos 0

    //const { u_id } = one_chirp;
    //let chirp_userid = u_id;

    // auth check needed !!!

    // if (userid != chirp_userid){
    //     return res.status(403).json({ message: "You are not authorized to edit this blog. You can only edit blogs you create." })
    // }

    console.log({ tagid, content, userid });// WORKS!
    //console.log({ tagid, content, a_id });
    console.log('INSIDE Chirp PUT ROUTER!');

    if (!tagid || !content || !userid) {
        return res.status(400).json({ message: "Fill out everything!" })
    }



    try {

        const id = Number(req.params.id);
        const chirpUpdateResults = await chirpsDB.update({ location, content, userid }, id, userid);

        

        
        
        // if we can edit the chirp, then we can update chirpTags
        if (chirpUpdateResults.affectedRows) {
            await chirpTagsDB.update(tagid, id);
            res.status(201).json({ message: "Updated Chirp!" });

       }else{
        res.status(401).json({ message: "Not authorized!" });


       }
       





    } catch (error) {

        res.status(500).json({ message: "A server errors occurred", error: error.sqlMessage });
    }

});
// ✅  this works
router.delete('/:id', async (req: ReqUser, res) => {

    const id = Number(req.params.id);


    const userid = req.user.id;


   
    try {

        // Add if(user id match check)

        await chirpTagsDB.destroy(id)

        await chirpsDB.destroy(id, userid)

        res.status(200).json({ message: "Deleted Chirp!" });

    } catch (error) {
        res.status(500).json({ message: "A server error occurred", error: error.sqlMessage });
    }
})

export default router;
