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



    const { tagid, content, location } = req.body;


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

    //update fields and reqUser ID
    const { location, content, tagid } = req.body;
    const userid = req.user.id;

    //define blog userid by blog query
    const id = req.params.id;

    // auth check 

    const [one_chirp] = (await chirpsDB.get_one_by_id(Number(id)))[0];
    const { u_id } = one_chirp;

    if (userid != u_id) {
        return res.status(403).json({ message: "You are not authorized to edit this blog. You can only edit blogs you create." })
    }

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

        } else {
            res.status(401).json({ message: "Not authorized!" });
        }


    } catch (error) {
        res.status(500).json({ message: "A server errors occurred", error: error.sqlMessage });
    }

});
// ✅  this works
router.delete('/:id', tokenCheck, async (req: ReqUser, res) => {

    const id = Number(req.params.id);
    const userid = req.user.id;


    try {

        const [one_chirp] = (await chirpsDB.get_one_by_id(Number(id)))[0]; //grab item at index pos 0
        
        const { u_id } = one_chirp;

        if (userid != u_id) {
            return res.status(403).json({ message: "You are not authorized to edit this blog. You can only edit blogs you create." })
        }

            await chirpTagsDB.destroy(id)
            await chirpsDB.destroy(id, userid)

        res.status(200).json({ message: "Deleted Chirp!" });

    } catch (error) {
        res.status(500).json({ message: "A server error occurred", error: error.sqlMessage });
    }
})

export default router;
