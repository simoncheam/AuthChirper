import * as express from 'express';
import tagsDB from '../../database/queries/';
import { ReqUser, Tags } from '../../types';

import {tokenCheck} from '../../middlewares/tokenCheck.mw'

const router = express.Router();

router.route('*')
.put(tokenCheck)
.delete(tokenCheck)



router.get('/', async (req, res) => {
    try {
        const all_tags = await tagsDB.get_all();
        res.status(200).json(all_tags);

    } catch (error) {
        res.status(500).json({ message: "A server errors occurred", error: error.sqlMessage });
    }
});


router.post('/', tokenCheck, async (req: ReqUser, res) => {


    const { name }: Tags = req.body;

    if (!name) {  // input validation
        return res.status(400).json({ message: "Fill out everything!" })
    }

    try {
        await tagsDB.create({ name });
        res.status(201).json({ message: "Tag created" });

    } catch (error) {
        res.status(500).json({ message: " A server error occurred", error: error.sqlMessage });
    }
});


//delete

router.delete('/:id', async (req, res) => {

    const id = Number(req.params.id);
    //const { tag_id, name } = req.body;

    try {
        await tagsDB.destroy(id) 
        res.status(200).json({ message: "Deleted Tag!" });

    } catch (error) {
        res.status(500).json({ message: "A server error occurred", error: error.sqlMessage });
    }
})


export default router;